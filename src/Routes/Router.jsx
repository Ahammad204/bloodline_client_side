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
import EditDonationRequest from "../Pages/Dashboard/EditDonationRequestPage/EditDonationRequestPage";
import DonationRequestDetails from "../Pages/Dashboard/DonationRequestDetails/DonationRequestDetails";
import MyDonationRequest from "../Pages/Dashboard/MyDonationRequest/MyDonationRequest";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllBloodDonationRequestPage from "../Pages/Dashboard/AllBloodDonationRequestPage/AllBloodDonationRequestPage";

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
      },{
        path:"/dashboard/edit-donation-request/:id",
        element: <EditDonationRequest/>
      },{
        path:"/dashboard/donation-request/:id",
        element:<DonationRequestDetails/>
      },{
        path:"/dashboard/my-donation-requests",
        element:<MyDonationRequest/>
      },{
        path:"/dashboard/admin",
        element:<AdminDashboard/>
      },{
        path:"/dashboard/users",
        element:<AllUsers/>
      },{
        path:"/dashboard/all-blood-donation-request",
        element: <AllBloodDonationRequestPage/>
      }
    ]
  }
]);