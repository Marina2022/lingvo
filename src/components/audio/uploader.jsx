import { Grid } from "@mui/material";
import { t } from "i18next";
import React from "react";
import DropZone from "../drop-zone/DropZone.component";
import { PlayerEmbedControls } from "./player";


const UploadAudio = ({ handleFiles, files }) => 
   <Grid item xs={12} container spacing={2}>
      <Grid item xs={12}>
         <DropZone
            title={t("tasks.task.voice_sources.upload.title")}
            handleFiles={handleFiles}
            files={files}
            accept={{'audio/mpeg':['.mp3','.ogg']}}
         />
      </Grid>
      <Grid item xs={12} container justifyContent="center">
      <PlayerEmbedControls source={files && files[0] ? files[0] : {}} />
      </Grid>
   </Grid>

export default UploadAudio