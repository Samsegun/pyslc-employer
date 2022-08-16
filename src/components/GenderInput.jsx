import React, { useState, forwardRef } from "react";
import { useEffect } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

export const GenderSelectInput = forwardRef(
    (
        {
            options,
            selectedValue,
            setSelectedValue,
            setFormValue,
            required,
            label,
            errors,
            props,
        },
        ref
    ) => {
        const [showDropDown, setShowDropDown] = useState(false);

        // useEffect(() => {
        //     setFormValue("gender")
        // }, [])

        return (
            <div className='md:mt-5'>
                <label
                    htmlFor=''
                    className='relative text-sm font-medium text-normal md:text-base'>
                    {label}{" "}
                    {required && (
                        <span className='absolute text-3xl md:text-5xl w-10 ml-5 -mt-0.5 text-rose-600'>
                            *
                        </span>
                    )}
                </label>

                <div className='relative'>
                    <div
                        onClick={() => setShowDropDown(!showDropDown)}
                        className={`${
                            errors
                                ? "border border-red-500"
                                : "border-gray-400 border-transparent"
                        } mb-5 mt-2 w-full rounded bg-gray-100 overflow-hidden flex justify-between input text-sm md:text-base px-7 items-center cursor-pointer relative`}>
                        <div className='flex justify-between w-full'>
                            <span className=''>{selectedValue?.name}</span>
                            <FaChevronDown className='mt-1' />
                        </div>
                    </div>
                    <div
                        className={`${
                            showDropDown
                                ? "opacity-100 visible scale-100"
                                : "opacity-0 invisible scale-95"
                        } w-full absolute top-16 left-0 z-20 bg-white shadow-lg rounded-lg gap-y-4 py-1.5 duration-200 max-h-56 overflow-y-auto`}>
                        {options?.length > 0 &&
                            options.map(option => (
                                <div
                                    key={`${option?.name}`}
                                    onClick={() => {
                                        setShowDropDown(false);
                                        setSelectedValue(option);
                                        setFormValue("gender", option.value);
                                        // setFormValue("id_type", option.value);
                                    }}
                                    className={`text-gray-600 py-2.5 w-full ${
                                        option.value !== null &&
                                        "cursor-pointer hover:bg-gray-50 active:bg-gray-100"
                                    } px-7 font-medium`}>
                                    {option?.name}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
);
