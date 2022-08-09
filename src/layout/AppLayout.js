import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "./Sidebar";
import UserSidebar from "./UserSidebar";
import { DahboardMobileNav } from "./DashboardMbNav";

const AppLayout = ({ children, navTab }) => {
    const location = useLocation();

    const isEmployee = location?.pathname?.includes("user");

    return (
        <div
            style={{ maxWidth: "100vw" }}
            className='flex w-screen h-screen max-h-screen overflow-x-hidden'>
            {isEmployee ? <UserSidebar /> : <Sidebar />}
            <DahboardMobileNav />

            <main
                className='flex-1 w-full max-w-full max-h-screen min-h-screen overflow-y-auto mobiles:p-6 overscroll-x-hidden mobiles:mt-20'
                // className="flex-1 w-full h-screen max-w-full max-h-screen overflow-y-auto mobiles:p-6 overscroll-x-hidden mobiles:mt-20"
            >
                <Navbar />
                {navTab && (
                    <div className='bg-gray-100 w-full flex py-5 px-10 2xl:px-[76px] mobiles:hidden'>
                        {navTab?.map((nav, i) => {
                            return (
                                <Link
                                    key={i}
                                    to={nav.link}
                                    className='mr-5 text-gray-600 cursor-pointer  nav-tab'>
                                    {nav.name}
                                </Link>
                            );
                        })}
                    </div>
                )}

                <div className='py-[70px] px-10 2xl:px-[76px] mobiles:p-0'>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AppLayout;
