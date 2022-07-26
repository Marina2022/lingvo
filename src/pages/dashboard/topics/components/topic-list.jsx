// import { t } from "i18next";
import React from "react";
import { connect } from "react-redux";

//BASE COMPONENTS
import TopicsListCard from "../../../../components/topics-list-card/TopicsListCard.component";

const TopicList = (props) => {
   const {
      published,
      publishedTopics,
      draftTopics,
      isTopicsLoading,
      filter,
   } = props;

   return (
      <div className="published-topics-tab">
         <TopicsListCard
            itemsList={published ? publishedTopics : draftTopics}
            isLoading={isTopicsLoading}
            filter={filter}
         />
      </div>
   );
};

const mapStateToProps = (props) => {
   const { topics } = props;
   return {
      publishedTopics: topics.publishedTopics,
      draftTopics: topics.draftTopics,
      isTopicsLoading: topics.isTopicsLoading,
   };
};

export default connect(mapStateToProps)(TopicList);
