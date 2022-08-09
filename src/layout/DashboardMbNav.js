import React, { useRef, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import { useClickOutside } from "../hooks/useClickOutside";
import { FaFolder } from "react-icons/fa";
import { HiBriefcase } from "react-icons/hi";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { MdArrowBackIosNew, MdKeyboardArrowDown } from "react-icons/md";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { MdAnalytics } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa";
import { useSelector } from "react-redux";
import { persistSelector } from "../slices/persist";
import { logout } from "../utils/ApiUtils";

export const DahboardMobileNav = () => {
    const tdc = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useSelector(persistSelector);
    const [show, setShow] = useState(false);

    const history = useHistory();

    useClickOutside(tdc, () => {
        setShowMenu(false);
    });

    const location = useLocation();
    const isEmployee = location?.pathname?.includes("user");

    const menuItems = [
        {
            path: "/dashboard",
            Icon: AiFillHome,
            name: "Dashboard",
        },
        {
            path: "/employee",
            Icon: FaFolder,
            name: "Employees",
        },
        {
            path: "/withdrawals",
            Icon: MdAnalytics,
            name: "Withdrawals",
        },
        {
            path: "/payments",
            Icon: HiBriefcase,
            name: "Payments",
        },
        {
            path: "/legal-info",
            Icon: FaCommentDots,
            name: "Support",
        },
        {
            path: "/settings",
            Icon: AiFillSetting,
            name: "Settings",
        },
    ];

    const userMenuList = [
        {
            path: "/user/dashboard",
            Icon: AiFillHome,
            name: "Dashboard",
        },
        {
            path: "/user/withdrawals",
            Icon: MdAnalytics,
            name: "Withdrawals",
        },
        {
            path: "/user/attendance",
            Icon: HiBriefcase,
            name: "Withdrawals",
        },
        {
            path: "/user/settings",
            Icon: AiFillSetting,
            name: "Settings",
        },
    ];

    const activeMenuList = isEmployee ? userMenuList : menuItems;

    const handleLogout = () => {
        if (location.pathname.startsWith("/user")) {
            history.push("/user/login");
        } else {
            logout();
            history.push("/login");
        }
    };

    return (
        <div
            ref={tdc}
            //   style={{ position: "relative", left: "" }}
            className={`w-3/5 relative z-50 my-auto hidden mobiles:block pt-8  pb-5 mobiles:fixed ${
                !showMenu ? "w-full px-6" : "h-full sidebar_bg"
                // className={`w-3/5 relative z-10 shadow-lg my-auto hidden mobiles:block pt-8  pb-5  bg-white mobiles:fixed ${
                //     !showMenu ? "w-full px-6" : "h-full sidebar_bg"
            }`}>
            <div
                className={`absolute z-40 top-0 left-0 min-h-[63px] w-[100vw] bg-white shadow-lg 
				flex items-center justify-between 
				${!showMenu ? "block" : "hidden"}`}>
                <RiMenuLine
                    style={{ fontSize: "28px" }}
                    className='ml-4'
                    onClick={() => {
                        setShowMenu(!showMenu);
                        setShow(false);
                    }}
                />

                {/* user icon */}
                <div
                    onClick={() => setShow(!show)}
                    className='flex items-center bg-gray-100 rounded w-[196px] h-[61px] pl-4 cursor-pointer'>
                    <img
                        src={require("../assets/imgs/user-payslice.jpg")}
                        alt='notification'
                        width='38'
                        height='41'
                        className='object-cover'
                    />
                    <div className='my-auto ml-2 text-gray-400'>
                        <h3 className='w-20 mb-0 text-base font-semibold text-gray-400 truncate'>{`${user?.first_name} ${user?.last_name}`}</h3>
                        <p className='font-light text-[10px] mb-0 capitalize'>
                            {user?.section} account
                        </p>
                    </div>
                    <MdKeyboardArrowDown className='my-auto w-5 h-5 ml-3 text-[#737A91]' />
                </div>
            </div>

            {/* logout button */}
            <div
                className={`absolute z-10 w-[150px] mr-6 text-xs font-semibold text-left bg-white border-gray-200 rounded shadow-xl -right-36 top-[4.5rem] transition-transform duration-300 ${
                    show ? "translate-y-0" : "-translate-y-32"
                }`}
                // className='absolute z-10 w-[150px] mr-6 text-xs font-semibold text-left bg-white border-gray-200 rounded shadow-xl -right-36 top-[4.5rem]'
            >
                <div
                    className='px-4 py-3 text-xl border-gray-200 cursor-pointer hover:bg-gray-100'
                    onClick={handleLogout}>
                    Logout
                </div>
            </div>

            {showMenu && (
                <div className='relative w-full h-full px-4'>
                    <div className='mt-10'>
                        <img
                            src={
                                require("../assets/svgs/payslice-logo.svg")
                                    .default
                            }
                            className='w-3/4 pb-12 '
                            alt=''
                        />
                    </div>
                    {activeMenuList?.map(item => {
                        return (
                            <div className='my-2 mb__menu-item' key={item.path}>
                                <NavLink
                                    to={item.path}
                                    activeClassName='sidebar_active rounded'
                                    className='flex p-2'
                                    onClick={() => setShowMenu(false)}>
                                    <item.Icon
                                        fill='#FFFFFF'
                                        className='my-auto'
                                    />{" "}
                                    <div className='my-auto ml-3 font-normal text-white'>
                                        {item.name}
                                    </div>
                                </NavLink>
                            </div>
                        );
                    })}
                    <div
                        className='absolute flex object-bottom'
                        style={{ bottom: "100px", left: "12px" }}
                        onClick={() => setShowMenu(false)}>
                        <MdArrowBackIosNew fill='#FFFFFF' className='my-auto' />{" "}
                        <div className='my-auto ml-2 text-white'>
                            Collapse Panel
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
