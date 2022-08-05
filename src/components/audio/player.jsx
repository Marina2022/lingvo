import React, { useState, useEffect } from "react";

const useAudio = (url) => {
   const [audio] = useState(new Audio(url));
   const [playing, setPlaying] = useState(false);
   const [readyState, setReadyState] = useState(0);

   const toggle = () => setPlaying(!playing);

   useEffect(() => {
      playing ? audio.play() : audio.pause();
   }, [audio, playing]);

   useEffect(() => {
      setReadyState(audio.readyState)
   }, [audio.readyState])

   useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
         audio.removeEventListener("ended", () => setPlaying(false));
      };
   }, [audio]);

   useEffect(() => {
      audio.addEventListener("loadeddata", () => {
         setReadyState(audio.readyState)
      });
      return () => {
         audio.removeEventListener("loadeddata", () => setReadyState(audio.readyState));
      };
   }, [audio]);

   return [toggle, playing, readyState];
};

const Player = ({ url, files, children }) => {
   const _url = url ? url : files ? files[0].url : undefined;

   const [toggle, playing, readyState] = useAudio(_url);

   return children({status: playing, readyState, onClick:toggle});
};

export const PlayerEmbedControls = ({source, children}) => {
   return <figure>
      <figcaption>{children}</figcaption>
         <audio controls 
            preload='metadata' 
            type={`audio/mpeg`}  
            src={source?.url}
            style= {{
               height: '2rem'
               //
               // https://opensource.apple.com/source/WebCore/WebCore-1889.1/css/mediaControls.css.auto.html
               // https://chromium.googlesource.com/chromium/blink/+/72fef91ac1ef679207f51def8133b336a6f6588f/Source/core/css/mediaControls.css
               //
               // audio::-webkit-media-controls-panel
               // audio::-webkit-media-controls-mute-button
               // audio::-webkit-media-controls-play-button
               // audio::-webkit-media-controls-timeline-container
               // audio::-webkit-media-controls-current-time-display
               // audio::-webkit-media-controls-time-remaining-display
               // audio::-webkit-media-controls-timeline
               // audio::-webkit-media-controls-volume-slider-container
               // audio::-webkit-media-controls-volume-slider
               // audio::-webkit-media-controls-seek-back-button
               // audio::-webkit-media-controls-seek-forward-button
               // audio::-webkit-media-controls-fullscreen-button
               // audio::-webkit-media-controls-rewind-button
               // audio::-webkit-media-controls-return-to-realtime-button
               // audio::-webkit-media-controls-toggle-closed-captions-button
            }}
            // Attention! IOs supports some audio formats only. Read IOs developer guide.
            // If you have 'Error' massage on a player controls probably you have hot suitable audio format
            // The line below for test purpose only
            // src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
            // onError={alert}
            >
            Your browser does not support <code>audio</code>
         </audio>
   </figure>
}
export default Player;
