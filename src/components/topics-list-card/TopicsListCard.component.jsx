import React from "react";
import classNames from "classnames";

//BASE COMPONENTS
import LoaderWrapper from "components/loader-wrapper/LoaderWrapper.component";
import DropDown from "components/drop-down/DropDown.component";
//IMAGES
import actionsIcon from "assets/images/list-card/actions-icon.png";
import editIcon from "assets/images/list-card/edit-icon.png";

const TopicsListCard = (props) => {
   const {
      itemsList,
      isLoading,
      actionItems,
      onMenuClick,
      onEditClick,
   } = props;
   // const [isEditButtonVisible, toggleEditButtonVisibility] = useState(false);

   const editIconClasses = classNames({
      "edit-icon__block": true,
      // hidden: !isEditButtonVisible,
      // visible: isEditButtonVisible,
   });

   // console.log(isEditButtonVisible);

   return (
      <LoaderWrapper isLoading={isLoading}>
         <div className="list-card">
            {itemsList.map((item, idx) => (
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
                     <div
                        onClick={() =>
                           onEditClick ? onEditClick(item) : false
                        }
                        className={editIconClasses}>
                        <img src={editIcon} alt="editicon" />
                     </div>
                     {actionItems && (
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
                     )}
                  </div>
               </div>
            ))}
         </div>
      </LoaderWrapper>
   );
};

export default TopicsListCard;
