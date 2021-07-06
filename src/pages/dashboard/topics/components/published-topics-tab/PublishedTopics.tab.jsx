import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

//BASE COMPONENTS
import TopicsListCard from "components/topics-list-card/TopicsListCard.component";
//ACTIONS
import {
   deleteTopicAsync,
   setSelectedTopic,
} from "redux/topics/topics.actions";

const PublishedTopicsTab = (props) => {
   const {
      publishedTopics,
      isTopicsLoading,
      setSelectedTopic,
      deleteTopicAsync,
      selectedTopic,
   } = props;
   const history = useHistory();

   const onConfirm = () => {
      if (window.confirm("Вы уверены?")) {
         deleteTopicAsync(selectedTopic?.id);
      }
   };

   const actionItems = [
      {
         name: "Редактировать",
         action: () => history.push(`/topics/${selectedTopic?.id}/edit`),
      },
      { name: "Удалить", action: () => onConfirm() },
   ];

   const onEditIconCLick = (topic) => {
      setSelectedTopic(topic);
      history.push(`/topics/${topic?.id}/units`);
   };

   return (
      <div className="published-topics-tab">
         <TopicsListCard
            itemsList={publishedTopics}
            isLoading={isTopicsLoading}
            actionItems={actionItems}
            onMenuClick={setSelectedTopic}
            onEditClick={onEditIconCLick}
         />
      </div>
   );
};

const mapStateToProps = (props) => {
   const { topics } = props;
   return {
      publishedTopics: topics.publishedTopics,
      isTopicsLoading: topics.isTopicsLoading,
      selectedTopic: topics.selectedTopic,
   };
};

const mapDispatchToProps = (dispatch) => ({
   deleteTopicAsync: (id) => dispatch(deleteTopicAsync(id)),
   setSelectedTopic: (topic) => dispatch(setSelectedTopic(topic)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishedTopicsTab);
