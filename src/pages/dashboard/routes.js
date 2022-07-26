//PAGES
import Profile from "./profile";

import Courses from "./courses";
import NewCourse from "./courses/subpages/course-new";
import Course from "./courses/subpages/course-edit";

import Tranings from "./topics";
import NewTraning from "./topics/subpages/topic";
import CourseTranings from "./courses/subpages/course-themes";

import Tasks from "./topics/subpages/units";
import Task from "./topics/subpages/unit/unit";

const topicsRoutes = [
   { 
      component: NewTraning,
      path: "new",
   },
   { 
      component: Tasks,
      path: ":topicId",
      routes: [
         { 
            component: NewTraning,
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
                  component: CourseTranings,
                  path: "topics",
                  routes: topicsRoutes
               }
            ]
         },
      ]
   },
   {
      component: Tranings,
      path: "topics",
      routes: topicsRoutes
   },
   {
      component: Profile,
      path: "profile",
   },
];

export default dashboardRoutes;
