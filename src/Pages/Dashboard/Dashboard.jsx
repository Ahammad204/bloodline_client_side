import { FaHandHoldingMedical, FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { FaHandHoldingUsd } from "react-icons/fa";

import { CgProfile } from "react-icons/cg";
import useAdmin from "../../Hooks/useAdmin";
import Loading from "../../Shared/Loading/Loading";
import useVolunteer from "../../Hooks/useVolunteer";
import useAuth from "../../Hooks/useAuth";



const Dashboard = () => {
  // const [cart] = useCart();

   const [isAdmin, isAdminLoading] = useAdmin();
   const [isVolunteer, isVolunteerLoading] = useVolunteer();

  const { user } = useAuth();

  if(isAdminLoading || isVolunteerLoading){
    return <Loading></Loading>
  }

  return (
    <div className="md:flex">
      {/* dashboard side bar */}
      <div className="md:w-64 min-h-screen  gradient-red text-white">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
               <li ><NavLink className=" mb-3 flex justify-center text-center w-full"  to="/dashboard/admin">Admin Home</NavLink></li>
              <hr />
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-blood-donation-request">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  All Blood Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/content-management">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  Content Management
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/content-management/add-blog">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  Add Blog
                </NavLink>
              </li>
              <div className="divider"></div>
            </>
          ) : (
            <></>
          )}
             {isAdmin || isVolunteer ? (
            <>
               <li ><NavLink className=" mb-3 flex justify-center text-center w-full"  to="/dashboard/volunteer">Volunteer Home</NavLink></li>
              <hr />
              <li>
                <NavLink to="/dashboard/all-blood-donation-request">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  All Blood Donation Request
                </NavLink>
              </li>
                <li>
                <NavLink to="/dashboard/content-management">
                  <FaHandHoldingUsd></FaHandHoldingUsd>
                  Content Management
                </NavLink>
              </li>
              
              <div className="divider"></div>
            </>
          ) : (
            <></>
          )}
          
          {/* shared nav links */}
          <li ><NavLink className=" mb-3 flex justify-center text-center w-full"  to="/dashboard">Donor Home</NavLink></li>
          <hr />
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/dashboard/profile">
              <CgProfile />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/create-donation-request">
              <FaHandHoldingMedical />
              Create donation request
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-donation-requests">
              <FaHandHoldingMedical />
              My Donation Request
            </NavLink>
          </li>
         
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <p className="text-4xl uppercase border-y-4 py-4 text-center gradient-red">
          {" "}
          Welcome {user?.name}
        </p>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
