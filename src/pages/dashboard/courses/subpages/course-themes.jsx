import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//BASE COMPONENTS

import Input from "../../../../components/input/Input.component";
import Button from "../../../../components/button/Button.component";
import GridContainer from "../../../../components/grid-container/GridContainer.component";
import GridItem from "../../../../components/grid-item/GridItem.component";
import BackArrow from "../../../../components/back-arrow/BackArrow.component";

import Checkbox from "react-custom-checkbox";

import Pagination from "../components/pagination";

import "./course-new";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { t } from "i18next";

const ThemesForCourse = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { nativeLanguageId, foreignLanguageId } = useSelector(
      (state) => state.drafts
   );
   const { publishedTopics } = useSelector((state) => state.topics);

   const [topics, setTopics] = useState(
      useSelector((state) => state.drafts.topics)
   );
   return (
      <div className="new-topic-subpage">
         <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <BackArrow text={t("courses.course.creation")} />
               <div className="courses-page__heading-block">
                  <h1>{t("tranings.list")}</h1>
                  <div>
                     <Input
                        name="search"
                        type="text"
                        placeholder={t("actions.search")}
                        required
                     />
                  </div>
               </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}></GridItem>
            <div className="course-theme-wrapper">
               {publishedTopics
                  .filter(
                     (t) =>
                        t.nativeLanguage.id === nativeLanguageId + 1 &&
                        t.foreignLanguage.id === foreignLanguageId + 1
                  )
                  .map((topic) => (
                     <div className="course-theme-item" key={topic.id}>
                        <div className="course-theme-item__date">
                           {topic.published}
                        </div>
                        <div className="course-theme-item__title">
                           {topic.text}
                        </div>
                        <div className="course-theme-item__langs">
                           {`${topic.nativeLanguage.value} — ${topic.foreignLanguage.value}`}
                        </div>

                        <Checkbox
                           className="custom-checkbox"
                           checked={
                              topics.filter((t) => t.id === topic.id).length !==
                              0
                                 ? true
                                 : false
                           }
                           onChange={(e) => {
                              if (!e) {
                                 setTopics(
                                    topics.filter((t) => t.id !== topic.id)
                                 );
                              } else {
                                 setTopics([...topics, topic]);
                              }
                           }}
                           icon={
                              <svg
                                 width="15"
                                 height="12"
                                 viewBox="0 0 15 12"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                 <path
                                    d="M1 4.79995L5.8 9.59995L14.2 1.19995"
                                    stroke="white"
                                    strokeWidth="2"
                                 />
                              </svg>
                           }
                           backgroundColor="red"
                           borderColor="transparent"
                           borderRadius={6}
                           size={24}
                        />
                     </div>
                  ))}
            </div>
         </GridContainer>
         <div className="courses-theme-bottom">
            <Pagination />
            <div>
               <Button
                  onClick={() => navigate("/topics/new")}
                  className="settings-panel__plus-icon">
                  {t("actions.create")}
               </Button>
               <Button
                  className="btn-theme"
                  onClick={() => {
                     console.log(topics);
                     dispatch({
                        type: "ADD_TOPICS_TO_COURSE",
                        payload: topics,
                     });
                     navigate(-1);
                  }}>
                  {t("actions.add")}
               </Button>
            </div>
         </div>
         <GridItem
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="new-topic-subpage__buttons-block">
            <GridItem xs={12} sm={12} md={2} lg={2}>
               <Button className="save-button">{t("actions.save")}</Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={2} lg={2}>
               <Button className="cancel-button">{t("actions.cancel")}</Button>
            </GridItem>
         </GridItem>
      </div>
   );
};
export default ThemesForCourse;
