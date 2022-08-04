import React, { useEffect, useState } from "react";

//BASE COMPONENTS
import MicRecorder from "mic-recorder-to-mp3";

//ACTIONS
import { Grid, Typography } from "@mui/material";

import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import { PlayerEmbedControls } from "../units/player";
import Button from "../../../components/button/Button.component";
import { t } from "i18next";


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

/**
 * 
 * @param {{text:String, handleFiles:Function}} param0 
 * @param param0.text file name
 * @returns 
 */
const RecordAudio = ({ text,  handleFiles }) => {

   const [isRecording, toggleIsRecording] = useState(false);
   const [isBlocked, toggleIsBlocked] = useState(false);
   const [files, setFiles] = useState([])

   useEffect(() => {
      try {
         navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(() => {
               toggleIsBlocked(false)
            })
            .catch(e => {
               toggleIsBlocked(true)
               console.log(`${e.name}: ${e.message}`, e)
               alert(`${e.name}: ${e.message}`)
            })
      } catch (e) {
         toggleIsBlocked(true)
         console.error(e)
         alert(`${e.name}: ${e.message}`)
      }
   }, []);

   const start = () => {
      if (isBlocked) {
         console.log("Permission Denied");
      } else {
         Mp3Recorder.start()
            .then(() => toggleIsRecording(true))
            .catch(e => console.error(e));
      }
   };

   const stop = () => {
      Mp3Recorder.stop()
         .getMp3()
         .then(([buffer, blob]) => {
            const fileName = `${text.substring(0, 20)}-${new Date(Date.now()).toISOString()}.mp3`
            const file = new File(buffer, fileName, {
               type: blob.type,
               lastModified: Date.now()
            });
            file.url = URL.createObjectURL(file)

            setFiles([file])

            handleFiles(blob, [file])

            toggleIsRecording(false);
         })
         .catch((e) => console.log(e));
   };

   return (
      <Grid item xs={12} container spacing={2} justifyContent="center" sx={{pb:'2rem'}}>
         
         <Grid item xs={12} sm={10} md={8} container justifyContent="center">
            <Typography justifyContent="center">If you are silent people don’t understand what you feel</Typography>
         </Grid>

         <Grid item xs={12} sm={10} md={8} container spacing={4} justifyContent="center">

            <Grid item xs={12} container spacing={4} justifyContent="center">
               <Grid item xs={6} md={5} lg={4} container justifyContent="center">
               {
                  <Button variant="contained" color="secondary" onClick={start} 
                          disabled={isBlocked || isRecording} 
                          sx={{ width:'100%', '&:hover': { cursor:'pointer' } }}
                          src={<GraphicEqOutlinedIcon />}
                  >                     
                     {t("actions.record")}
                  </Button>
               }
               </Grid>
               <Grid item  xs={6} md={5} lg={4} container justifyContent="center">
                  <Button variant="contained" color="secondary" onClick={stop} 
                          disabled={!isRecording} 
                          sx={{ width:'100%', '&:hover': { cursor:'pointer' } }}
                          src={<StopCircleOutlinedIcon />}
                  >                     
                     {t("actions.stop")}
                  </Button>
               </Grid>         
            </Grid> 
            <Grid item xs={12} container justifyContent="center">
               <PlayerEmbedControls source={files[0]} />
            </Grid>

         </Grid>
      </Grid>
   );
};

export default RecordAudio;
