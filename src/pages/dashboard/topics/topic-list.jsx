import React from "react";

//BASE COMPONENTS
import LoaderWrapper from "../../../components/loader-wrapper/LoaderWrapper.component";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { deleteTopicAsync } from "../../../redux/topics/topics.actions";
import { connect } from "react-redux";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import { toDigestString } from "../../../utilities/helper-functions";
import TagList from "../../../components/tag-list";

/**
 * 
 * @param {{
 *       itemsList: Array<Object>,
 *       isLoading: Boolean,
 *       filter: String,
 *       navPrefix: String,
 *       onDelete: Function
 *    }} param0 
 * @returns 
 */
const TopicList = ({
   itemsList,
   isLoading,
   filter,
   setFilter,
   navPrefix = '',
   onDelete
}) => {
   const navigate = useNavigate();

   if (navPrefix && !navPrefix.endsWith('/')) {
      navPrefix = `${navPrefix}/`
   }

   const filterLC = filter ? filter.toLowerCase() : filter

   return (
      <LoaderWrapper isLoading={isLoading}>
      {
         itemsList
            .filter(item => !filterLC || toDigestString(item).includes(filterLC))
            .sort(({text:a},{text:b}) => a < b ? -1 : a > b ? 1 : 0)
            .map((item, idx) => (

            <Card key={idx} sx={{ 
               mt: '1em', 
               display:'flex', 
               flexDirection:'row', 
               justifyContent:"space-between", 
               alignItems:"center"               
            }}>
               <CardContent sx={{ flex: 1, color: 'dimgray', '> *' : { padding: '0.3rem' } }}>
                  <Grid container>
                     <Grid item xs={12}>
                        <Typography 
                           sx={{ fontSize: '1.2rem', fontWeight: 'medium', color:"Chocolate", '&:hover': { cursor: 'pointer', color: 'sandybrown' } }}
                           onClick={() => navigate(`${navPrefix}${item?.id}`)}
                        >
                           {item?.text}
                        </Typography>
                     </Grid>
                     <Grid item xs={12} container justifyContent="space-between">
                        <Grid item xs={6}>
                           <Typography sx={{ fontSize: '0.75em'}}>
                              {`${item?.nativeLanguage?.value} - ${item?.foreignLanguage?.value}`}
                           </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="end">
                           <Typography sx={{ color: 'lightgray', fontSize: '0.75em'}}>
                              {(new Date(item?.createdDate)).toLocaleString()}
                           </Typography>
                        </Grid>
                     </Grid>
                     <TagList tags={item.tags} onClick={({name}) => { setFilter && setFilter(name) }}/>
                  </Grid>
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
                        onClick={() => navigate(`${navPrefix}${item?.id}/edit`, {state:{topic:item}})}
                  >
                     <SettingsOutlinedIcon />
                  </Button>
                  <Button title={t("trainings.training_list.menu.trash")} disabled={!onDelete}
                        onClick={() => onDelete && window.confirm(t("messages.confirm.deleteItem")) && onDelete(item.id)}
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
