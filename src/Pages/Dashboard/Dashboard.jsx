import { FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";


const Dashboard = () => {
  // const [cart] = useCart();

//   const [isAdmin] = useAdmin();

  const { user } = useAuth();

  return (
    <div className="md:flex">
      {/* dashboard side bar */}
      <div className="md:w-64 min-h-screen  gradient-red text-white">
        <ul className="menu p-4">
          {/* {isAdmin ? (
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
          )} */}
          {/* shared nav links */}
          <li className="text-center mb-3">Donor Home</li>
          <hr />
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>

        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <p className="text-4xl uppercase border-y-4 py-4 text-center">
          {" "}
          Welcome {user?.name}
        </p>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
