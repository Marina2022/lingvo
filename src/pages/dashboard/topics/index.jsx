import React, { useEffect } from "react";
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
import TopicList from "./topic-list";
import { Box, Tabs, Tab, Grid } from "@mui/material";
import { Home } from "@mui/icons-material";
import { compareObjects } from "../../../utilities/helper-functions";

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
                  onClick={() => navigate("new")}
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
                           setFilter={(newFilter) => handleInput({target:{name:'search',value: newFilter.toLowerCase()}})}
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

const Topics = ({
   crumbsProps:[crumbs, setCrumbs],
   ...otherProps
}) => {

   const outlet = useOutlet()

   useEffect(() => {
      const initCrumb = { key: 0, name: t("trainings.title"), path: "topics", icon: <Home fontSize="small" /> }
      // console.log("check Topics => ", t("trainings.title"), outlet);
      if (crumbs.length === 0 || !compareObjects(crumbs[0], initCrumb)) {
         setCrumbs([initCrumb])
      }
   }
   , [crumbs, setCrumbs])

   return (
      outlet ?
      // shows child element
      <Outlet context={[crumbs, setCrumbs, 0]}/> : 
      // shows topic element
      <TopicsBody {...otherProps} />
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
