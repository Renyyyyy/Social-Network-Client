import { createBrowserRouter } from "react-router-dom";
import UsersComponent from "./components/forms/usersComponent/UsersComponent";
import AuthChecker from "./components/forms/authChecker/AuthChecker";
import ProfilePage from "./components/forms/profileForm/ProfilePage";
import Layout from "./components/layout/Layout";
import FollowersList from "./components/forms/FollowPages/followersList/FollowersList";
import FollowingList from "./components/forms/FollowPages/followingList/FollowingList";
import NewsFeed from "./components/forms/newsFeed/NewsFeed";

const BASE_NAME = "";

const router = createBrowserRouter(
  [
    {
      element: <AuthChecker />,
      children: [
        {
          path: "/",
          element: <AuthChecker />,
        },
        {
          element: <Layout />,
          children: [
            {
              path: "/profile/:id",
              element: <ProfilePage />,
            },
            {
              path: "/users",
              element: <UsersComponent />,
            },
            {
              path: "/followers",
              element: <FollowersList />,
            },
            {
              path: "/following",
              element: <FollowingList />,
            },
            {
              path: "/newsfeed",
              element: <NewsFeed />,
            },
          ],
        },
        {
          path: "/login",
          element: <AuthChecker form="login" />,
        },
        {
          path: "/registration",
          element: <AuthChecker form="registration" />,
        },
      ],
    },
    {
      path: "*",
      element: <AuthChecker />,
    },
  ],
  { basename: BASE_NAME }
);

export default router;
