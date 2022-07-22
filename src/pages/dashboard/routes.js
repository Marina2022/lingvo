//PAGES
import Profile from "./profile";

import Courses from "./courses";
import NewCourse from "./courses/subpages/course-new";
import Course from "./courses/subpages/course-edit";

import Lessons from "./topics";
import NewLesson from "./topics/subpages/topic-new";
import CourseLessons from "./courses/subpages/course-themes";

import Exercises from "./topics/subpages/units";
import Exercise from "./topics/subpages/unit/unit";

const topicsRoutes = [
   { 
      component: NewLesson,
      path: "new",
   },
   { 
      component: Exercises,
      path: ":topicId",
      routes: [
         { 
            component: NewLesson,
            path: "edit",
         },
         { 
            component: Exercise,
            path: "units/new",
         },
         { 
            component: Exercise,
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
                  component: CourseLessons,
                  path: "topics",
                  routes: topicsRoutes
               }
            ]
         },
      ]
   },
   {
      component: Lessons,
      path: "topics",
      routes: topicsRoutes
   },
   {
      component: Profile,
      path: "profile",
   },
];

export default dashboardRoutes;
