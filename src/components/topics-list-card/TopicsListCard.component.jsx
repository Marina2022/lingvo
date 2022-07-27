import React from "react";
import classNames from "classnames";

//BASE COMPONENTS
import LoaderWrapper from "../../components/loader-wrapper/LoaderWrapper.component";
// import DropDown from "../../components/drop-down/DropDown.component";
// //IMAGES
// import actionsIcon from "../../assets/images/list-card/actions-icon.png";
// import editIcon from "../../assets/images/list-card/edit-icon.png";

import { ReactComponent as ListTask } from "../../assets/images/icons/list-task.svg"
import { ReactComponent as TopicInfo } from "../../assets/images/icons/info-square.svg"
import { ReactComponent as Trash } from "../../assets/images/icons/trash3-fill.svg"
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { deleteTopicAsync } from "../../redux/topics/topics.actions";
import { connect } from "react-redux";

const TopicsListCard = (props) => {
   const {
      itemsList,
      isLoading,
      filter
      // actionItems,
      // onMenuClick,
      // onEditClick,
      // deleteTopicAsync,
   } = props;
   // const [isEditButtonVisible, toggleEditButtonVisibility] = useState(false);

   const editIconClasses = classNames({
      "edit-icon__block": true,
      // hidden: !isEditButtonVisible,
      // visible: isEditButtonVisible,
   });
   const navigate = useNavigate();

   return (
      <LoaderWrapper isLoading={isLoading}>
         <div className="list-card">
            {itemsList
               .filter(item => !filter || Object.values(item).join("|").toLowerCase().includes(filter.toLowerCase()))
               .map((item, idx) => (
               <div
                  // onMouseEnter={() =>
                  //    toggleEditButtonVisibility(!isEditButtonVisible)
                  // }
                  // onMouseLeave={() =>
                  //    toggleEditButtonVisibility(!isEditButtonVisible)
                  // }
                  key={idx}
                  className="list-card__item">
                  <div className="list-card__item--info-block">
                     <div className="time-block">{item?.createdDate}</div>
                     <div className="name-block">{item?.text}</div>
                     <div className="translate-info-block">
                        {item?.nativeLanguage?.value} -{" "}
                        {item?.foreignLanguage?.value}
                     </div>
                  </div>           
                  <div className="list-card__item--actions-block">
                     <div className={editIconClasses} 
                          title={t("trainings.training_list.menu.open")} 
                          onClick={() => navigate(`${item?.id}`)}
                     >
                        <ListTask width="24" height="24"/>
                     </div>
                     <div className={editIconClasses} 
                          title={t("trainings.training_list.menu.info")} 
                          onClick={() => navigate(`${item?.id}/edit`, {state:{topic:item}})}
                     >
                        <TopicInfo width="24" height="24"/>
                     </div>
                     <div className={editIconClasses} 
                          title={t("trainings.training_list.menu.trash")} 
                          onClick={() => window.confirm(t("messages.requests.is_sure")) && deleteTopicAsync(item?.id)}
                     >
                        <Trash width="24" height="24"/>
                     </div>
                     {/* <div
                        onClick={() =>
                           onEditClick ? onEditClick(item) : false
                        }
                        className={editIconClasses}>
                        <img src={editIcon} alt="editIcon" />
                     </div> */}
                     {/* {actionItems && (
                        <div
                           className="menu-block"
                           onClick={() =>
                              onMenuClick ? onMenuClick(item) : false
                           }>
                           <DropDown
                              src={actionsIcon}
                              menuItems={actionItems}
                           />
                        </div>
                     )} */}
                  </div>
               </div>
            ))}
         </div>
      </LoaderWrapper>
   );
};

const mapDispatchToProps = (dispatch) => ({
   deleteTopicAsync: (id) => dispatch(deleteTopicAsync(id)),
});

export default connect(mapDispatchToProps)(TopicsListCard);
