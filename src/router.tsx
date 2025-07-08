import { createBrowserRouter } from "react-router-dom";
import UsersComponent from "./components/forms/usersComponent/UsersComponent";
import AuthChecker from "./components/forms/authChecker/AuthChecker";
import ProfilePage from "./components/forms/profileForm/ProfilePage";

const BASE_NAME = "";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AuthChecker />,
    },
    {
      path: "/profile/:id",
      element: <ProfilePage />,
    },
    {
      path: "/users",
      element: <UsersComponent />,
    },
    {
      path: "/login",
      element: <AuthChecker form="login" />,
    },
    {
      path: "/registration",
      element: <AuthChecker form="registration" />,
    },
    {
      path: "*",
      element: <AuthChecker />,
    },
  ],
  { basename: BASE_NAME }
);

export default router;
