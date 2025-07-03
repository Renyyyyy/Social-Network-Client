import { createBrowserRouter } from "react-router-dom";
import UsersComponent from "./components/forms/usersComponent/UsersComponent";
import AuthChecker from "./components/forms/authChecker/AuthChecker";


const BASE_NAME = '';

const router = createBrowserRouter([
    {
        path: "/users",
        element: <UsersComponent/>,
    },
    {
        path: "/",
        element: <AuthChecker/>,
    },
    {
        path: "*",
        element: <AuthChecker/>,
    }
], {basename: BASE_NAME}
)

export default router;