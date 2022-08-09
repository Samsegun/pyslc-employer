import React, { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { BsThreeDotsVertical } from "react-icons/bs";

const OptionsMenu = ({ options, param, customClass }) => {
    const [show, setShow] = useState(false);

    const tdc = useRef();
    useClickOutside(tdc, () => {
        setShow(false);
    });

    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <div ref={tdc} className={`w-16 my-auto absolute ${customClass}`}>
            <BsThreeDotsVertical
                onClick={handleToggle}
                className='mx-auto'
                size='18px'
            />
            {show && (
                <ul
                    style={{ top: "80%", left: "", textAlign: "left" }}
                    className='absolute z-10 w-32 text-xs text-left bg-white rounded shadow-xl '>
                    {options?.map((option, i) => {
                        return (
                            <li
                                key={i}
                                onClick={() => {
                                    option.onClick(param);
                                    handleToggle();
                                }}
                                className='px-4 py-3 border-gray-200 cursor-pointer hover:bg-gray-100'>
                                {option.name}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default OptionsMenu;
