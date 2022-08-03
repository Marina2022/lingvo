import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { t } from "i18next";

const CourseItem = (props) => {
   const {courseStatus, courseName, courseInfo, courseTrainings, coursePrice} = props

   return <Card sx={{ 
      minWidth: 235, 
      backgroundColor: courseStatus ? 'lightskyblue' : 'lightgray',
      '&:hover': {
         cursor: 'pointer',
         opacity: 0.75
      } 
      }}>
      <CardContent>
         
         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{courseInfo}</Typography>
         <Typography variant="h6" component="div">{courseName}</Typography>
         <Typography sx={{ mb: 1.5 }} color="text.secondary">
         {
            courseStatus ? t("states.published") : t("states.draft")
         }
         </Typography>
         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {courseTrainings}
            <br />
            {coursePrice}
         </Typography>         
      </CardContent>
   </Card>
} 

export default CourseItem;
