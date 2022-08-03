//PAGES
import Profile from "./profile";

import Courses from "./courses";
import NewCourse from "./courses/subpages/course-new";
import Course from "./courses/subpages/course-edit";

import Trainings from "./topics";
import Training from "./topic";
import CourseTrainings from "./courses/subpages/course-themes";

import Tasks from "./units";
import Task from "./unit";

const topicsRoutes = [
   { 
      component: Training,
      path: "new",
   },
   { 
      component: Tasks,
      path: ":topicId",
      routes: [
         { 
            component: Training,
            path: "edit",
         },
         { 
            component: Task,
            path: "units/new",
         },
         { 
            component: Task,
            path: "units/:unitId",
         },
      ]
   },
]

const dashboardRoutes = [
   {
      component: Courses,
      path: "courses",
      routes: [
         { 
            component: NewCourse,
            path: "new",
         },
         { 
            component: Course,
            path: ":courseId",
            routes: [
               { 
                  component: CourseTrainings,
                  path: "topics",
                  routes: topicsRoutes
               }
            ]
         },
      ]
   },
   {
      component: Trainings,
      path: "topics",
      routes: topicsRoutes
   },
   {
      component: Profile,
      path: "profile",
   },
];

export default dashboardRoutes;
