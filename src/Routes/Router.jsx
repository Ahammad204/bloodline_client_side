import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home/Home";
import Main from "../Main/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Error from "../Pages/Error/Error";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import DashboardProfile from "../Pages/Dashboard/DashboardProfile/DashboardProfile";
import CreateDonationRequest from "../Pages/Dashboard/createDonationRequest/createDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
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
  },{
    path:"/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <Error></Error>,
    children:[
      {
        path:"/dashboard",
        element: <DashboardHome/>
      },{
        path:"/dashboard/profile",
        element:<DashboardProfile/>
      },{
        path:"/dashboard/create-donation-request",
        element:<CreateDonationRequest/>
      }
    ]
  }
]);