import { FaHandHoldingMedical, FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { FaHandHoldingDollar, FaPaw } from "react-icons/fa6";
import useAuth from "../../Hooks/UseAuth";
import { CgProfile } from "react-icons/cg";
import useAdmin from "../../Hooks/useAdmin";
import Loading from "../../Shared/Loading/Loading";


const Dashboard = () => {
  // const [cart] = useCart();

   const [isAdmin, isAdminLoading] = useAdmin();

  const { user } = useAuth();

  if(isAdminLoading){
    return <Loading></Loading>
  }

  return (
    <div className="md:flex">
      {/* dashboard side bar */}
      <div className="md:w-64 min-h-screen  gradient-red text-white">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li className="text-center mb-3">Admin Home</li>
              <hr />
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allPets">
                  <FaPaw></FaPaw>
                  All Pets
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allDonation">
                  <FaHandHoldingDollar></FaHandHoldingDollar>
                  All Donation
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
          <li>
            <NavLink to="/dashboard/createDonationCampaign">
              <FaHandHoldingDollar></FaHandHoldingDollar>
              Create Donation Campaign
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addedDonation">
              <FaHandHoldingDollar></FaHandHoldingDollar>
              My Donation Campaign
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myDonation">
              <FaHandHoldingDollar></FaHandHoldingDollar>
              My Donation{" "}
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
