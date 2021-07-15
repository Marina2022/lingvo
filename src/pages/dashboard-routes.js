//PAGES
import TopicPage from "./dashboard/topics/Topics.page";
import ProfilePage from "./dashboard/profile/Profile.page";
import CoursesPage from "./dashboard/courses/Courses.Page";
import NewCoursePage from "./dashboard/courses/subpages/new-course-subpage/NewCourse";
//SUBPAGES
import NewTopicSubpage from "./dashboard/topics/subpages/new-topic-subpage/NewTopic.subpage";
import UnitSubpage from "./dashboard/topics/subpages/unit-subpage/Unit.subpage";
import AddEditUnitSubpage from "./dashboard/topics/subpages/add-edit-unit-subpage/AddEditUnit.subpage";

const dashboardRoutes = [
   {
      component: CoursesPage,
      path: "/courses",
   },
   {
      component: NewCoursePage,
      path: "/new-course",
   },
   {
      component: TopicPage,
      path: "/topics",
   },
   {
      component: ProfilePage,
      path: "/profile",
   },
   {
      component: NewTopicSubpage,
      path: "/new-topic",
   },
   {
      component: NewTopicSubpage,
      path: "/topics/:id/edit",
   },
   {
      component: UnitSubpage,
      path: "/topics/:id/units",
   },
   {
      component: AddEditUnitSubpage,
      path: "/topics/:topicID/units/:unitID/edit",
   },
   {
      component: AddEditUnitSubpage,
      path: "/topics/:topicID/units/new",
   },
];

export default dashboardRoutes;
