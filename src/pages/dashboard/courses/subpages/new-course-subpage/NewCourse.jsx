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

import "./_newcourse.scss";

const NewCoursePage = () => {
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
               <BackArrow text="Курсы" />
               <h1>Создание курса</h1>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={12}>
               <Form>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <Input
                        name="text"
                        value=""
                        label="Название курса"
                        type="text"
                        placeholder="Курс 10"
                        required
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} lg={6}>
                     <TagsInput
                        fullWidth
                        variant="outlined"
                        id="tags"
                        name="tags"
                        placeholder="#hashtags"
                        label="Теги"
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="foreignLanguage"
                        label="Изучаемый язык"
                        placeholder="Выберите язык"
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3} lg={3}>
                     <Select
                        name="nativeLanguage"
                        label="Родной язык"
                        placeholder="Выберите язык"
                        required
                     />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2} lg={2}>
                     <Input
                        name="text"
                        value=""
                        label="Цена"
                        type="text"
                        placeholder="1000 Р"
                        required
                     />
                  </GridItem>
                  <div className="new-course-themes">
                     <div className="new-course-themes__title">
                        <div className="h2">Темы курса</div>
                        <Button
                           onClick={() => history.push("/new-course")}
                           className="settings-panel__plus-icon"
                           src={plusIcon}>
                           Добавить темы
                        </Button>
                     </div>
                     <div className="new-course-themes__wrapper">
                        <p>Темы еще не добавлены</p>
                     </div>
                  </div>
                  <Grid
                     className="new-course-public "
                     component="label"
                     container
                     alignItems="center"
                     spacing={1}>
                     <Grid item>
                        <AntSwitch
                           checked={isCoursePublic}
                           onChange={changeCourseStatus}
                           name="checkedC"
                        />
                     </Grid>
                     <Grid className="new-course-public__label" item>
                        Сделать курс публичным
                     </Grid>
                  </Grid>
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
               </Form>
            </GridItem>
         </GridContainer>
      </div>
   );
};
export default NewCoursePage;
