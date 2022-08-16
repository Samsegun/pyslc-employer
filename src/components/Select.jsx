import React from "react";

export const CustomSelect = ({ options, label, initValue, onChange, name }) => {
    return (
        <div>
            <label>{label}</label>
            <div className='mt-2 mb-5 select-pay'>
                <select
                    name={name}
                    className='w-full px-5 py-4 bg-gray-100 rounded '
                    onChange={onChange}>
                    <option value=''>{initValue}</option>
                    {options.map(option => {
                        return (
                            <option value={option.value}>{option.label}</option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};
