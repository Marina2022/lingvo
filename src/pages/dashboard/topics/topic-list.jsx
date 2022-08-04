import React from "react";

//BASE COMPONENTS
import LoaderWrapper from "../../../components/loader-wrapper/LoaderWrapper.component";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { deleteTopicAsync } from "../../../redux/topics/topics.actions";
import { connect } from "react-redux";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

const TopicList = (props) => {
   const {
      itemsList,
      isLoading,
      filter,
      dispatchDeleteTopicAsync,
   } = props;

   const navigate = useNavigate();

   return (
      <LoaderWrapper isLoading={isLoading}>
      {
         itemsList
            .filter(item => !filter || Object.values(item).join("|").toLowerCase().includes(filter.toLowerCase()))
            .map((item, idx) => (

            <Card key={idx} sx={{ 
               mt: '1em', 
               display:'flex', 
               flexDirection:'row', 
               justifyContent:"space-between", 
               alignItems:"center"               
            }}>
               <CardContent sx={{ color: 'dimgray', '> *' : { padding: '0.3rem' } }}>

                  <Typography 
                     sx={{ fontSize: '1.2rem', fontWeight: 'medium', color:"Chocolate", '&:hover': { cursor: 'pointer', color: 'sandybrown' } }}
                     onClick={() => navigate(`${item?.id}`)}
                  >
                     {item?.text}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75em'}}>
                     {`${item?.nativeLanguage?.value} - ${item?.foreignLanguage?.value}`}
                  </Typography>
                  <Typography sx={{ color: 'lightgray', fontSize: '0.75em'}}>
                     {(new Date(item?.createdDate)).toLocaleString()}
                  </Typography>

               </CardContent>

               <CardActions sx={{ 
                  '>*': { 
                     size: 'small', 
                     '>*': { 
                        '&:hover': { transform: 'scale(1.5)' }
                     }
                  }
               }}>
                  <Button  title={t("trainings.training_list.menu.info")} 
                        onClick={() => navigate(`${item?.id}/edit`, {state:{topic:item}})}
                  >
                     <SettingsOutlinedIcon />
                  </Button>
                  <Button title={t("trainings.training_list.menu.trash")} 
                        onClick={() => window.confirm(t("messages.confirm.is_sure")) && dispatchDeleteTopicAsync(item?.id)}
                  >
                     <DeleteOutlinedIcon />
                  </Button>
               </CardActions>
            </Card>
         ))
      }
      </LoaderWrapper>
   );
};

const mapDispatchToProps = (dispatch) => ({
   dispatchDeleteTopicAsync: (id) => dispatch(deleteTopicAsync(id)),
});

export default connect(null, mapDispatchToProps)(TopicList);
