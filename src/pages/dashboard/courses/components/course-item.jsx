import React from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { t } from "i18next";
import { DeleteOutline } from "@mui/icons-material";

/**
 * 
 * @param {{
 *    courseStatus: Boolean, 
 *    courseName: String, 
 *    courseInfo: String, 
 *    courseTrainings: String, 
 *    coursePrice: String, 
 *    onOpen: Function, 
 *    onDelete: Function 
 * }} param0 
 * @returns 
 */
const CourseItem = ({courseStatus, courseName, courseInfo, courseTrainings, coursePrice, onOpen, onDelete}) => {

   return <Card sx={{ 
      minWidth: 215, 
      backgroundColor: courseStatus ? 'lightskyblue' : 'lightgray',
      }}>
      <CardContent>
         
         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>{courseInfo}</Typography>
         <Typography component="div" variant="h6" onClick={onOpen} sx={{
            color: "Chocolate",
            '&:hover': {
               cursor: 'pointer',
               opacity: 0.75
            } 
         }}>
            {courseName}
         </Typography>
         <Typography sx={{ mb: 1.5 }} color="text.secondary">
         {
            courseStatus ? t("courses.course.states.published") : t("courses.course.states.unpublished")
         }
         </Typography>
         <Grid container alignItems="flex-end" justifyContent="space-between">
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               {courseTrainings}
               {/* <br />
               {coursePrice} */}
            </Typography>         
            <DeleteOutline onClick={onDelete} color="primary" sx={{
               '&:hover': {
                  cursor: 'pointer',
                  opacity: 0.75,
                  transform: 'scale(1.5)'
               } 
            }}/>
         </Grid>
      </CardContent>
   </Card>
} 

export default CourseItem;
