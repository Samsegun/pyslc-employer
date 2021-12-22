import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";
import UserSidebar from "./UserSidebar";

const AppLayout = ({ children, navTab }) => {
  const location = useLocation();

  const isEmployee = location?.pathname?.includes("user");

  return (
    <div
      style={{ maxWidth: "100vw" }}
      className="h-screen max-h-screen overflow-x-hidden w-screen flex"
    >
      {isEmployee ? <UserSidebar /> : <Sidebar />}

      <main className="h-screen mobiles:p-4 max-w-full w-full overscroll-x-hidden max-h-screen flex-1 overflow-y-auto">
        <Navbar />
        {navTab && (
          <div className="bg-gray-100 w-full flex py-5 px-8">
            {navTab?.map((nav) => {
              return (
                <Link
                  to={nav.link}
                  className=" nav-tab text-gray-600 mr-5 cursor-pointer"
                >
                  {nav.name}
                </Link>
              );
            })}
          </div>
        )}

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
