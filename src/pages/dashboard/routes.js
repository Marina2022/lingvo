//PAGES
import Profile from "./profile";

import Courses from "./courses";
import Course from "./course";

import Trainings from "./topics";
import Training from "./topic";

import Tasks from "./units";
import Task from "./unit";

const dashboardRoutes = [
   {
      component: Courses,
      path: "courses",
      routes: [
         { 
            component: Course,
            path: "new",
         },
         { 
            component: Course,
            path: ":courseId",
            routes: [
               { 
                  component: Tasks,
                  path: "topics/:topicId",
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
         },
      ]
   },
   {
      component: Trainings,
      path: "topics",
      routes: [
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
   },
   {
      component: Profile,
      path: "profile",
   },
];

export default dashboardRoutes;
