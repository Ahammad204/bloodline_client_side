import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home/Home";
import Main from "../Main/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path:"/",
        element: <Home></Home>
      },{
        path:"/login",
        element:<Login></Login>
      },{
        path:"/register",
        element:<Register></Register>
      }
    ]
  },
]);