import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

//BASE COMPONENTS
import Tab from "components/tab/Tab.component";
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
//TABS
import PublishedTopics from "./components/published-topics-tab/PublishedTopics.tab";
import DraftTopicsTab from "./components/draft-topics-tab/DraftTopics.tab";
//ACTIONS
import { getTopicsAsync } from "redux/topics/topics.actions";
//EFFECTS
import useInput from "effects/useInput.effect";
//IMAGES
import plusIcon from "assets/images/topics/plus.png";

const TopicsPage = (props) => {
   const { getTopicsAsync, publishedTopicsCount, draftTopicsCount } = props;
   const history = useHistory();

   const {
      inputState,
      handleInput,
      handleInvalidMessage,
      invalidMessages,
   } = useInput();

   useEffect(() => {
      getTopicsAsync();
      //eslint-disable-next-line
   }, []);

   const handleInputChange = (event) => {
      handleInput(event);
   };

   const list = [
      {
         eventKey: "topics",
         title: `Опубликованы ${publishedTopicsCount}`,
         content: <PublishedTopics />,
      },
      {
         eventKey: "chernoviki",
         title: `Черновики ${draftTopicsCount}`,
         content: <DraftTopicsTab />,
      },
   ];

   return (
      <div className="topics-page">
         <div className="topics-page__heading-block">
            <h1>Темы</h1>
            <div>
               <Input
                  name="search"
                  value={inputState.search}
                  error={invalidMessages}
                  onChange={handleInputChange}
                  onInvalid={handleInvalidMessage}
                  type="text"
                  placeholder="Поиск"
                  required
               />
            </div>
         </div>
         <div className="settings-panel">
            <Button
               onClick={() => history.push("/new-topic")}
               className="settings-panel__plus-icon"
               src={plusIcon}>
               Новая тема
            </Button>
         </div>
         <Tab tabsList={list} />
      </div>
   );
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
