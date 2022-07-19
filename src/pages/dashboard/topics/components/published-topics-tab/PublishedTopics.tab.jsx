import { t } from "i18next";
import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS
import TopicsListCard from "../../../../../components/topics-list-card/TopicsListCard.component";
//ACTIONS
import {
   deleteTopicAsync,
   setSelectedTopic,
} from "../../../../../redux/topics/topics.actions";

const PublishedTopicsTab = (props) => {
   const {
      publishedTopics,
      isTopicsLoading,
      setSelectedTopic,
      deleteTopicAsync,
      selectedTopic,
   } = props;
   const navigate = useNavigate();

   const onConfirm = () => {
      if (window.confirm(t("requests.is_sure"))) {
         deleteTopicAsync(selectedTopic?.id);
      }
   };

   const actionItems = [
      {
         name: t("actions.edit"),
         action: () => navigate(`/topics/${selectedTopic?.id}/edit`),
      },
      { name: t("actions.delete"), action: () => onConfirm() },
   ];

   const onEditIconCLick = (topic) => {
      setSelectedTopic(topic);
      navigate(`/topics/${topic?.id}/units`);
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
