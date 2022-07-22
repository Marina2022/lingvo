import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

//BASE COMPONENTS
import Tab from "../../../components/tab/Tab.component";
import Input from "../../../components/input/Input.component";
import Button from "../../../components/button/Button.component";
//TABS
import PublishedTopics from "./components/topics-published";
import DraftTopicsTab from "./components/topics-draft";
//ACTIONS
import { getTopicsAsync } from "../../../redux/topics/topics.actions";
//EFFECTS
import useInput from "../../../effects/useInput.effect";
//IMAGES
import plusIcon from "../../../assets/images/topics/plus.png";
import { t } from 'i18next'
import { BuildBreadcrumbs } from "../layout/breadcrumbs";

const TopicsPage = (props) => {
   const { getTopicsAsync, publishedTopicsCount, draftTopicsCount } = props;
   const navigate = useNavigate();

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput();

   useEffect(() => {
      getTopicsAsync();
   }, [getTopicsAsync]);

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const list = [
      {
         eventKey: "topics",
         title: t("lessons.topic_list.published", {count:publishedTopicsCount}),
         content: <PublishedTopics />,
      },
      {
         eventKey: "drafts",
         title: t("lessons.topic_list.drafts", {count:draftTopicsCount}),
         content: <DraftTopicsTab />,
      },
   ];

   const [crumbs, setCrumbs] = useState([{ key: 0, name: t("lessons.title"), path: "topics" }]);

   const outlet = useOutlet()

   useEffect(() => {
      if (!outlet) {
         setCrumbs([{ key: 0, name: t("lessons.title"), path: "topics" }])
      }
   }
   , [outlet])

   const TopicBody = () => {
      return <>
         <div className="topics-page__heading-block">
            <div>
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
            </div>
            <div className="settings-panel">
               <Button
                  onClick={() => navigate("/topics/new")}
                  className="settings-panel__plus-icon"
                  src={plusIcon}>
                  {t("actions.create")}
               </Button>
            </div>
         </div>
         <Tab tabsList={list} />
      </>
   }

   return (
      <div className="topics-page">
         <BuildBreadcrumbs crumbs={crumbs} />
         {
            outlet ?
            // shows child element
            <Outlet context={[crumbs, setCrumbs, 0]}/> : 
            // shows topic element
            <TopicBody />
         }
      </div>
   )
   
};

const mapStateToProps = (state) => {
   const { topics } = state;

   return {
      publishedTopicsCount: topics.publishedTopicsCount,
      draftTopicsCount: topics.draftTopicsCount,
   };
};

const mapDispatchToProps = (dispatch) => ({
   getTopicsAsync: () => dispatch(getTopicsAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicsPage);
