import React, { useState, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";

//BASE COMPONENTS
import IsVisible from "../../components/is-visible/IsVisible.component";
//IMAGES
import micIcon from "../../assets/images/components/mic-icon.png";
import stopIcon from "../../assets/images/components/stop-icon.png";
import recordingIcon from "../../assets/images/components/recording-icon.png";
import playIcon from "../../assets/images/icons/play-circle.svg"

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const MicrophoneButton = ({ onClick }) => (
   <div onClick={onClick} className="microphone-button flex-center">
      <img src={micIcon} alt="micicon" />
   </div>
);

const RecordingButton = () => (
   <div className="recording-button flex-center">
      <img src={recordingIcon} alt="recordingIcon" />
   </div>
);

const StopButton = ({ onClick }) => (
   <div onClick={onClick} className="stop-button flex-center">
      <img src={stopIcon} alt="stopIcon" />
   </div>
);

const PlayButton = ({ onClick }) => (
   <div onClick={onClick} className="microphone-button flex-center">
      <img src={playIcon} alt="playIcon" />
   </div>
)

const AudioRecorder = ({
   recordName = "audio",
   language,
   setFileData,
   fileData,
}) => {
   const [isRecording, toggleIsRecording] = useState(false);
   const [isBlocked, toggleIsBlocked] = useState(false);
   const [isStopped, toggleIsStopped] = useState(false)
   const [blobData, setBlobData] = useState(undefined)

   useEffect(() => {
      navigator.mediaDevices.getUserMedia(
         { audio: true },
         () => {
            toggleIsBlocked(false);
         },
         () => {
            toggleIsBlocked(false);
         }
      );
   }, []);

   useEffect(() => {
      if (recordName) {
         setFileData({ ...fileData, name: `${recordName}.mp3` });
      }
      //eslint-disable-next-line
   }, [recordName, setFileData]);

   const start = () => {
      if (isBlocked) {
         console.log("Permission Denied");
      } else {
         setBlobData(undefined)
         toggleIsStopped(false)
         Mp3Recorder.start()
            .then(() => {
               toggleIsRecording(true);
            })
            .catch((e) => console.error(e));
      }
   };

   const stop = () => {
      Mp3Recorder.stop()
         .getMp3()
         .then(([buffer, blob]) => {
            const reader = new FileReader();
            reader.onload = () => {
               setFileData({
                  name: `${recordName}.mp3`,
                  data: reader.result,
                  language,
               });
            };
            reader.readAsDataURL(blob);
            setBlobData(blob)
            toggleIsRecording(false);
            toggleIsStopped(true);
         })
         .catch((e) => console.log(e));
   };

   const play = () => {
      try {
         const url = URL.createObjectURL(blobData)
         const player = new Audio(url)
         player.play()
      } catch (e) {
         console.error(e);
      }
   }

   return (
      <div className="custom-recorder flex-center">
         <IsVisible isVisible={!isRecording}>
            <MicrophoneButton onClick={start} />
         </IsVisible>
         <IsVisible isVisible={isRecording}>
            <RecordingButton />
            <StopButton onClick={stop} />
         </IsVisible>
         <IsVisible isVisible={isStopped}>
            <PlayButton onClick={play} />
         </IsVisible>
      </div>
   );
};

export default AudioRecorder;
