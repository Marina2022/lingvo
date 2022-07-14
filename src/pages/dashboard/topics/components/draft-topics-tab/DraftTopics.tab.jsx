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

const DraftTopicsTab = (props) => {
   const {
      draftTopics,
      isTopicsLoading,
      setSelectedTopic,
      deleteTopicAsync,
      selectedTopic,
   } = props;
   const navigate = useNavigate();

   const onConfirm = () => {
      if (window.confirm("Вы уверены?")) {
         deleteTopicAsync(selectedTopic?.id);
      }
   };

   const actionItems = [
      {
         name: "Редактировать",
         action: () => navigate(`/topics/${selectedTopic?.id}/edit`),
      },
      { name: "Удалить", action: () => onConfirm() },
   ];

   const onEditIconCLick = (topic) => {
      setSelectedTopic(topic);
      navigate(`/topics/${topic?.id}/units`);
   };

   return (
      <div className="draft-topics-tab">
         <TopicsListCard
            itemsList={draftTopics}
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
      draftTopics: topics.draftTopics,
      isTopicsLoading: topics.isTopicsLoading,
      selectedTopic: topics.selectedTopic,
   };
};

const mapDispatchToProps = (dispatch) => ({
   deleteTopicAsync: (id) => dispatch(deleteTopicAsync(id)),
   setSelectedTopic: (topic) => dispatch(setSelectedTopic(topic)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DraftTopicsTab);
