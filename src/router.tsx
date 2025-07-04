import { createBrowserRouter } from "react-router-dom";
import UsersComponent from "./components/forms/usersComponent/UsersComponent";
import AuthChecker from "./components/forms/authChecker/AuthChecker";
import ProfilePage from "./components/forms/profileForm/ProfilePage";
import LoginForm from './components/forms/loginForm/LoginForm';
import RegistrationForm from './components/forms/registartionForm/RegistrationForm';

const BASE_NAME = '';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthChecker />,
    children: [
      {
        path: "profile/:id",
        element: <ProfilePage />
      },
      {
        path: "users",
        element: <UsersComponent />
      },
      {
        path: "",
        element: <div>Home Page</div>
      }
    ]
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
  }
], { basename: BASE_NAME });

export default router;