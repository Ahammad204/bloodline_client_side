import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/navlogo.png";
import useAuth from "../../Hooks/useAuth";


const Navbar = () => {
  const { user, logout } = useAuth();
  console.log("from navbar", user);

  // const setDarkMode = () => {
  //   document.querySelector("body").setAttribute("data-theme", "dark");
  //   localStorage.setItem("selectedTheme", "dark");
  // };
  // const setLightMode = () => {
  //   document.querySelector("body").setAttribute("data-theme", "light");
  //   localStorage.setItem("selectedTheme", "light");
  // };

  // const selectedTheme = localStorage.getItem("selectedTheme");
  // if (selectedTheme === "dark") {
  //   setDarkMode();
  // }

  // const toggoleTheme = (e) => {
  //   if (e.target.checked) setDarkMode();
  //   else setLightMode();
  // };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "gradient-red text-white px-3 py-2 rounded"
      : "hover:bg-gray-200 px-3 py-2 rounded";

  const navLink = (
    <>
      <li>
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/Search" className={getNavLinkClass}>
          Find Donor
        </NavLink>
      </li>
      <li>
        <NavLink to="/donation-request" className={getNavLinkClass}>
          Donation Request
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" className={getNavLinkClass}>
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink to="/funding" className={getNavLinkClass}>
          Fund
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-500 rounded-box w-52"
            >
              {navLink}
            </ul>
          </div>
          <a className="  normal-case text-xl">
            <img src={logo} alt="" className="h-16 w-auto" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end md:gap-3">
          {/* <label className="swap swap-rotate">
            
            <input
              onChange={toggoleTheme}
              defaultChecked={selectedTheme === "light"}
              type="checkbox"
            />

            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label> */}

          {user?.email ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.avatar} alt={user.name} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52"
              >
                <li>
                  <NavLink
                    to={
                      user?.role === "admin"
                        ? "/dashboard/admin"
                        : user?.role === "volunteer"
                        ? "/dashboard/volunteer"
                        : "/dashboard"
                    }
                    className={({ isActive }) =>
                      `${getNavLinkClass({
                        isActive,
                      })} flex justify-center text-center w-full`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <button className="btn btn-sm  btn-ghost" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn text-white border-none bg-[#E59285] hover:bg-[#E59285]">
                Login Now
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
