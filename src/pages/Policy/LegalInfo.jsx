/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { InputField, SelectInput } from "../../components/Input";
import { CustomSelect } from "../../components/Select";
import {
    changePassword,
    getAllCompanyPolicy,
    getCompanyPolicy,
    updateCompanyInfo,
    updateCompanyPolicy,
} from "../../utils/ApiRequests";
import { toast } from "react-toastify";
import { getUserDataFromStorage } from "../../utils/ApiUtils";
import { useDispatch, useSelector } from "react-redux";
import { persistSelector, setUser } from "../../slices/persist";
import { useMemo } from "react";

const LegalInfo = () => {
    const { user } = useSelector(persistSelector);
    const dispatch = useDispatch();

    const initPasswordForm = {
        email: user.email,
        new_password: "",
        confirm_password: "",
    };
    const initCompanyChangeForm = {
        email: user.company.email,
        id: user.company.id,
        name: user.company.name,
        industry: user.company.industry,
        tax_identification_number: user.company.tax_identification_number,
        rc_number: user.company.rc_number,
        address: user.company.address,
        phone_number: user.company.phone_number,
        registered_business_name: user.company.registered_business_name,
    };

    const salaryDates = useMemo(
        () => [
            { id: 0, name: "First Week", value: "first_week" },
            { id: 1, name: "Second Week", value: "second_week" },
            { id: 2, name: "Last Week", value: "last_week" },
        ],
        []
    );

    // const salaryDates = [
    //     { id: 0, name: "First Week", value: "first_week" },
    //     { id: 1, name: "Second Week", value: "second_week" },
    //     { id: 2, name: "Last Week", value: "last_week" },
    // ];

    const [companyPolicyInfo, setCompanyPolicyInfo] = useState(null);

    const [selectedValue, setSelectedValue] = useState(salaryDates[0]);

    const [changingPassword, setPasswordChanging] = useState(false);
    const [changingCompanyInfo, setCompanyInfoChanging] = useState(false);
    const [changingCompanyPolicy, setCompanyPolicyChanging] = useState(false);

    const [passwordForm, setPasswordForm] = useState(initPasswordForm);
    const [companyChangeForm, setComanyChangeForm] = useState(
        initCompanyChangeForm
    );

    const company = user?.company;

    useEffect(() => {
        const getPolicy = async () => {
            try {
                const res = await getAllCompanyPolicy();
                if (res.data.payload.data.length > 0) {
                    const {
                        id,
                        company_id,
                        salary_date,
                        salary_withdrawal_percentage,
                        payroll_size,
                    } = res?.data?.payload?.data[0];
                    setCompanyPolicyInfo({
                        id,
                        company_id,
                        salary_date,
                        salary_withdrawal_percentage,
                        payroll_size,
                    });
                    setSelectedValue(
                        salaryDates[
                            salaryDates.findIndex(
                                item => item.value === salary_date
                            )
                        ]
                    );
                }
            } catch (error) {
                toast.error("An error occurred");
            }
        };
        getPolicy();
    }, [salaryDates]);

    const handlePasswordChange = (type, e) => {
        const { name, value } = e.target;
        const newFormData = { ...passwordForm };
        type ? (newFormData[type][name] = value) : (newFormData[name] = value);
        setPasswordForm(newFormData);
    };

    const submitPasswordChange = async e => {
        e.preventDefault();
        setPasswordChanging(true);

        try {
            await changePassword(passwordForm);
            setPasswordChanging(false);
            toast.success("Password changed successful");
            setPasswordForm(initPasswordForm);
        } catch (error) {
            toast.error("An error occurred");
            setPasswordChanging(false);
        }
    };

    const handleCompanyInfoChange = e => {
        const { name, value } = e.target;
        const newFormData = { ...companyChangeForm };
        newFormData[name] = value;
        // console.log(newFormData);
        setComanyChangeForm(newFormData);
    };

    const submitCompanyInfoChange = async e => {
        e.preventDefault();
        setCompanyInfoChanging(true);

        try {
            const res = await updateCompanyInfo(companyChangeForm);
            setCompanyInfoChanging(false);
            toast.success("Company Info changed successful");

            dispatch(setUser({ ...user, company: res.data.payload.data }));
        } catch (error) {
            toast.error("An error occurred");
            setCompanyInfoChanging(false);
        }
    };

    const payrollSizeChange = e => {
        const { value } = e.target;

        setCompanyPolicyInfo({
            ...companyPolicyInfo,
            payroll_size: value ? parseInt(value) : 0,
        });
    };

    const salaryDateChange = (id, value) => {
        setCompanyPolicyInfo({
            ...companyPolicyInfo,
            salary_date: value,
        });
    };

    const submitCompanyPolicyChange = async e => {
        e.preventDefault();
        setCompanyPolicyChanging(true);

        // setCompanyPolicyInfo({
        //     ...companyPolicyInfo,
        //     salary_date: newSalaryDate,
        //     payroll_size: newPayrollSize,
        // });
        console.log(companyPolicyInfo);

        try {
            const res = await updateCompanyPolicy(
                companyPolicyInfo.id,
                companyPolicyInfo
            );
            setCompanyPolicyChanging(false);
            toast.success("Policy Info updated");
        } catch (error) {
            toast.error("An error occurred");
            setCompanyPolicyChanging(false);
        }
    };

    return (
        <div className=''>
            <div className='my-auto text-xl font-semibold text-black capitalize'>
                Company legal information
            </div>

            <div className='my-8'>
                <form onSubmit={submitCompanyInfoChange}>
                    <div className='flex w-full mobiles:block'>
                        <div className='w-1/3 mr-5 mobiles:w-full mobiles:mr-0'>
                            <InputField
                                label='Company Name'
                                name='name'
                                required
                                defaultValue={company?.name}
                                // placeholder='Comapny Name '
                                type='text'
                                onChange={e => handleCompanyInfoChange(e)}
                                // readOnly
                            />
                        </div>
                        <div className='w-1/3 mr-5 mobiles:w-full mobiles:mr-0'>
                            <InputField
                                label='Payment email'
                                name='email'
                                required
                                defaultValue={company?.email}
                                placeholder='Comapny Email '
                                type='text'
                                onChange={e => handleCompanyInfoChange(e)}
                                // readOnly
                            />
                        </div>
                        <div className='w-1/3 mr-5 mobiles:w-full mobiles:mr-0'>
                            <InputField
                                label='RC Number '
                                name='rc_number'
                                required
                                defaultValue={company?.rc_number}
                                placeholder='RC Number '
                                type='text'
                                onChange={e => handleCompanyInfoChange(e)}
                                // readOnly
                            />
                        </div>
                    </div>
                    <div className='flex w-full mobiles:block'>
                        <div className='w-1/3 mr-5 mobiles:w-full mobiles:mr-0'>
                            <InputField
                                label='TIN number'
                                name='tax_identification_number'
                                required
                                defaultValue={
                                    company?.tax_identification_number
                                }
                                placeholder='TIN number '
                                type='text'
                                onChange={e => handleCompanyInfoChange(e)}
                                // readOnly
                            />
                        </div>

                        <div className='w-1/3 mobiles:w-full'>
                            <InputField
                                label='Business Address'
                                name='address'
                                required
                                defaultValue={company?.address}
                                placeholder='Business Address'
                                type='text'
                                onChange={e => handleCompanyInfoChange(e)}
                                // readOnly
                            />
                        </div>
                        {/* <div className='w-1/3 mr-5 mobiles:w-full mobiles:mr-0'> */}
                        {/* an input field with a default value of 
							null,0 or false can't be updated with a new value. Hence,
							this approach was used to render total no. of employees */}
                        {/* {totalNoOfEmployees && (
                                <InputField
                                    label='Number of Employees'
									name="payroll_size"
                                    required
                                    defaultValue={totalNoOfEmployees}
                                    placeholder='Number of Employees '
                                    type='text'
                                    onChange={e => handleCompanyInfoChange(e)}
                                    // readOnly
                                />
                            )} */}
                        {/* </div> */}
                        {/* <div className='w-1/3 mr-5 mobiles:w-full mobiles:mr-0'>
                            <InputField
                                label='Total Payroll Size  '
                                required
                                defaultValue={"0"}
                                placeholder='Total Payroll Size '
                                type='text'
                                onChange={e => handleCompanyInfoChange(e)}
                                // readOnly
                            />
                        </div> */}
                    </div>
                    {/* <div className='flex w-full mobiles:block'>
                        <div className='w-2/3 mobiles:w-full'>
                            <InputField
                                label='Business Address'
                                required
                                defaultValue={company?.address}
                                placeholder='Business Address'
                                type='text'
                                onChange={e => handleCompanyInfoChange(e)}
                                // readOnly
                            />
                        </div>
                    </div> */}
                    <Button
                        type='submit'
                        loading={changingCompanyInfo}
                        // disabled
                        buttonText='Update  changes'
                        base
                    />
                </form>

                <div className='mt-8 text-xl font-semibold'>Policy Info</div>
                <div className='mb-8 __policy-form'>
                    <form onSubmit={submitCompanyPolicyChange}>
                        <div className='flex mobiles:block'>
                            <div className='w-1/3 mr-5 mobiles:w-full mobiles:mr-0'>
                                <div className='mt-5'>
                                    <SelectInput
                                        label='Salary date (every month)'
                                        required
                                        options={salaryDates}
                                        selectedValue={selectedValue}
                                        setSelectedValue={setSelectedValue}
                                        setFormValue={salaryDateChange}
                                    />
                                </div>
                            </div>
                            <div className='w-1/3 mr-5 mobiles:w-full mobiles:mr-0'>
                                <InputField
                                    type='text'
                                    value='50%'
                                    readOnly
                                    label='Salary withdrawal (%)'
                                    placeholder='choose date'
                                    required
                                />
                            </div>

                            {/* an input field with a default value of 
							null,0 or false can't be updated with a new value. Hence,
							this approach was used to render total no. of employees */}
                            {companyPolicyInfo && (
                                <InputField
                                    label='Number of Employees'
                                    name='payroll_size'
                                    required
                                    defaultValue={
                                        companyPolicyInfo?.payroll_size
                                    }
                                    placeholder='Number of Employees '
                                    type='text'
                                    onChange={e => payrollSizeChange(e)}
                                    // readOnly
                                />
                            )}
                            {/* <div className="w-1/3 mt-5 mr-5 mobiles:w-full mobiles:mr-0">
                <CustomSelect
                  options={["Bt Employee", "By Employer"]}
                  label="Payment fees"
                  initValue="Select option"
                />
              </div> */}
                        </div>
                        <div className='mt-5'>
                            <Button
                                type='submit'
                                loading={changingCompanyPolicy}
                                buttonText='Update  changes'
                                base
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* change password */}
            <div className='my-8'>
                <div className='my-4 text-2xl font-semibold'>
                    Change Password
                </div>

                <form onSubmit={submitPasswordChange}>
                    <div className='flex w-full mobiles:block'>
                        {/* <div className="w-1/3 mr-5 mobiles:w-full">
							<InputField
								required
								label="Your email"
								value={passwordForm.email}
								type="email"
								name="email"
								onChange={(e) => handlePasswordChange(null, e)}
							/>
						</div> */}
                        <div className='w-1/3 mr-5 mobiles:w-full'>
                            <InputField
                                required
                                label='New Password'
                                value={passwordForm.new_password}
                                type='password'
                                name='new_password'
                                onChange={e => handlePasswordChange(null, e)}
                            />
                        </div>
                        <div className='w-1/3 mr-5 mobiles:w-full'>
                            <InputField
                                required
                                label='Confirm Password'
                                value={passwordForm.confirm_password}
                                type='password'
                                name='confirm_password'
                                onChange={e => handlePasswordChange(null, e)}
                            />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <Button
                            loading={changingPassword}
                            buttonText='Change Password'
                            base
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LegalInfo;
