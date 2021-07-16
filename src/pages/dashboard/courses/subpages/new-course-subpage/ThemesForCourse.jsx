import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

//BASE COMPONENTS
import Tab from "components/tab/Tab.component";
import Input from "components/input/Input.component";
import Button from "components/button/Button.component";
import GridContainer from "../../../../../components/grid-container/GridContainer.component";
import GridItem from "../../../../../components/grid-item/GridItem.component";
import BackArrow from "../../../../../components/back-arrow/BackArrow.component";
import Form from "../../../../../components/form/Form.component";
import TagsInput from "../../../../../components/tags-input/TagsInput.component";
import Select from "../../../../../components/select/Select.component";
import { Switch } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { checkForEmptyProperties } from "../../../../../utilities/helper-functions";
import plusIcon from "../../../../../assets/images/topics/plus.png";
import Checkbox from "react-custom-checkbox";

import Pagination from "../../components/Pagination/Pagination";

import "./_newcourse.scss";

const ThemesForCourse = () => {
   const history = useHistory();

   const [isCoursePublic, setCoursePublic] = useState(false);

   const changeCourseStatus = () => {
      setCoursePublic(!isCoursePublic);
   };
   const AntSwitch = withStyles((theme) => ({
      root: {
         width: 28,
         height: 16,
         padding: 0,
         display: "flex",
      },
      switchBase: {
         padding: 2,
         color: "#FFFFFF",
         "&$checked": {
            transform: "translateX(12px)",
            color: theme.palette.common.white,
            "& + $track": {
               opacity: 1,
               backgroundColor: theme.palette.primary.main,
               borderColor: theme.palette.primary.main,
            },
         },
      },
      thumb: {
         width: 12,
         height: 12,
         boxShadow: "none",
      },
      track: {
         border: `1px solid #CFD8DF`,
         borderRadius: 16 / 2,
         opacity: 1,
         backgroundColor: "#CFD8DF",
      },
      checked: {},
   }))(Switch);

   return (
      <div className="new-topic-subpage">
         <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <BackArrow text="Создание курса" />
               <div className="courses-page__heading-block">
                  <h1>Темы для курса</h1>
                  <div>
                     <Input
                        name="search"
                        type="text"
                        placeholder="Поиск"
                        required
                     />
                  </div>
               </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}></GridItem>
            <div className="course-theme-wrapper">
               <div className="course-theme-item">
                  <div className="course-theme-item__date">12 мар 2019</div>
                  <div className="course-theme-item__title">
                     Holidays and traditions of different countries
                  </div>
                  <div className="course-theme-item__langs">
                     Русский — Английский
                  </div>

                  <Checkbox
                     className="custom-checkbox"
                     checked={false}
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
            </div>
         </GridContainer>
         <div className="courses-theme-bottom">
            <Pagination />
            <div>
               <Button
                  onClick={() => history.push("/new-topic")}
                  className="settings-panel__plus-icon">
                  Создать тему
               </Button>
               <Button className="btn-theme">Вставить тему</Button>
            </div>
         </div>
         <GridItem
            xs={12}
            sm={12}
            md={6}
            lg={6}
            className="new-topic-subpage__buttons-block">
            <GridItem xs={12} sm={12} md={2} lg={2}>
               <Button className="save-button">Сохранить</Button>
            </GridItem>
            <GridItem xs={12} sm={12} md={2} lg={2}>
               <Button className="cancel-button">Отмена</Button>
            </GridItem>
         </GridItem>
      </div>
   );
};
export default ThemesForCourse;
