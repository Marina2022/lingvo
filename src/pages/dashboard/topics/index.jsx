import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

//BASE COMPONENTS
import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";
//ACTIONS
import { getTopicsAsync } from "../../../redux/topics/topics.actions";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//IMAGES
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { t } from 'i18next'
import { BuildBreadcrumbs } from "../layout/breadcrumbs";
import TopicList from "./topic-list";
import { Box, Tabs, Tab, Grid } from "@mui/material";
import AudioFileIcon from '@mui/icons-material/AudioFile';

const TopicsBody = (props) => {

   const {
      stateTopicsPublishedTopics,
      stateTopicsPublishedTopicsCount, 
      
      stateTopicsDraftTopics,
      stateTopicsDraftTopicsCount,
      
      stateTopicsIsTopicsLoading,

      dispatchGetTopicsAsync, 
   } = props

   useEffect(() => { dispatchGetTopicsAsync() }, [dispatchGetTopicsAsync]);   

   const navigate = useNavigate();

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput();

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const tabList = [
      {
         eventKey: "topics",
         title: t("trainings.training_list.published", {count:stateTopicsPublishedTopicsCount}),
         itemsList: stateTopicsPublishedTopics,

      },
      {
         eventKey: "drafts",
         title: t("trainings.training_list.drafts", {count:stateTopicsDraftTopicsCount}),
         itemsList: stateTopicsDraftTopics
      },
   ];
         
   const [value, setValue] = React.useState(0);
   
   const handleChange = (event, newValue) => {
      setValue(newValue);
    }

   return <>
         <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sm={8}>
               <Input
                  name="search"
                  value={inputState.search}
                  error={invalidMessages}
                  onChange={handleInputChange}
                  onInvalid={handleInvalidMessage}
                  type="text"
                  placeholder={t("actions.search")}
                  required
               />
            </Grid>
            <Grid item xs={12} sm={4}>
               <Button
                  onClick={() => navigate("/topics/new")}
                  variant='contained'
                  src={<AddOutlinedIcon/>}>
                  {t("actions.create")}
               </Button>
            </Grid>
            <Grid item xs={12} sx={{ paddingTop: '2rem !important'}}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                     value={value}
                     onChange={handleChange}
                     aria-label="basic tabs example"
                  >
                  {
                     tabList.map((item, idx) => 
                        <Tab label={item?.title} 
                           key={`simple-tab-${idx}`} 
                           id={`simple-tab-${idx}`} 
                           aria-controls={`simple-tabpanel-${idx}`} 
                        />
                     )
                  }
                  </Tabs>
               </Box>
               {
                  tabList.map((item, idx) =>
                     <Grid container flexDirection='column'
                           role='tabpanel'
                           value={value}
                           index={idx}
                           key={`tab-panel-${idx}`} 
                           hidden={JSON.parse(value) !== JSON.parse(idx)}
                           id={`simple-tabpanel-${idx}`}
                           aria-labelledby={`simple-tab-${idx}`}
                     >
                        <TopicList 
                           filter={inputState.search} 
                           itemsList={item.itemsList} 
                           isLoading={stateTopicsIsTopicsLoading} 
                        />
                     </Grid>
                  )
               }

            </Grid>
         </Grid>
   </>
}

const Topics = (props) => {

   const [crumbs, setCrumbs] = useState([{ key: 0, name: t("trainings.title"), path: "topics", icon: <AudioFileIcon fontSize="small" />}]);

   const outlet = useOutlet()

   useEffect(() => {
      // console.log("check Topics => ", t("trainings.title"), outlet);
      if (!outlet) {
         setCrumbs([{ key: 0, name: t("trainings.title"), path: "topics", icon: <AudioFileIcon fontSize="small" /> }])
      }
   }
   , [outlet])

   return (
      <Grid container spacing={2} sx={{ justifyContent: 'center', alignContent: 'flex-start', padding: '2rem 1rem', flexGrow:undefined, flexBasis:undefined }}>
         <Grid item xs={12} sm={9}>
            <BuildBreadcrumbs crumbs={crumbs} />
         </Grid>
         <Grid item xs={12} sm={9}>
            {
               outlet ?
               // shows child element
               <Outlet context={[crumbs, setCrumbs, 0]}/> : 
               // shows topic element
               <TopicsBody {...props} />
            }
         </Grid>
      </Grid>
   )
   
};

const mapStateToProps = (state) => {
   const { topics } = state;

   return {
      stateTopicsPublishedTopics: topics.publishedTopics,
      stateTopicsPublishedTopicsCount: topics.publishedTopicsCount,

      stateTopicsDraftTopics: topics.draftTopics,
      stateTopicsDraftTopicsCount: topics.draftTopicsCount,

      stateTopicsIsTopicsLoading: topics.isTopicsLoading,
   };
};

const mapDispatchToProps = (dispatch) => ({
   dispatchGetTopicsAsync: () => dispatch(getTopicsAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
