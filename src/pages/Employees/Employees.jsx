/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button } from "../../components/Button/Button";
import { GreyButton } from "../../components/Button/GreyButton";
// import { Table } from 'antd';
import { useHistory } from "react-router-dom";
import OptionsMenu from "../../components/TableOptionMenu";
import {
    deleteEmployee,
    getAllEmployees,
    getEmployeeInfoList,
} from "../../utils/ApiRequests";
import { BsFilter } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { EmployeeTab } from "../../components/EmployeeTab";
import { EmployeeCard } from "../../components/EmployeeCard";
import { toast } from "react-toastify";

export const Employees = () => {
    const [employees, setEmployees] = useState();
    const [salaryBalance, setSalaryBalance] = useState();
    const [fetchingData, setFetchingData] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchAllEmployees = async () => {
            try {
                const getData = await Promise.all([
                    getEmployeeInfoList(),
                    getAllEmployees(),
                ]);

                const returnedData = getData.map(
                    item => item.data.payload.data
                );

                const employeeSalaryBalance = returnedData[0];
                const res = returnedData[1];

                // const res = await getAllEmployees();
                // console.log(res);

                const restructuredData = res.map((data, i) => {
                    return {
                        key: i,
                        id: data.id,
                        // empId: data.employee_id,
                        name: `${data.first_name} ${data.last_name}`,
                        // email: data.email,
                        // phone: data.phone_number,
                        // bankDetails: data.bankDetails.bank_name,
                        salary: `NGN ${parseInt(
                            data.workDetails.staff_salary
                        ).toLocaleString("en-NG")}`,
                        status: data.status,
                        dateAdded: `${new Date(
                            data.created_at
                        ).toLocaleDateString()}`,
                    };
                });

                // const restructuredData = res.data.payload.data?.map(
                //     (data, i) => {
                //         return {
                //             key: i,
                //             id: data.employee_id,
                //             name: `${data.fullname}`,
                //             // email: data.email,
                //             // phone: data.phone_number,
                //             // bankDetails: data.bankDetails.bank_name,
                //             salary: `NGN ${parseInt(data.salary).toLocaleString(
                //                 "en-NG"
                //             )}`,
                //             balance: `NGN ${parseInt(
                //                 data.salary_balance
                //             ).toLocaleString("en-NG")}`,
                //         };
                //     }
                // );
                setEmployees(restructuredData);
                setSalaryBalance(employeeSalaryBalance);
                setFetchingData(false);
            } catch (error) {
                toast.error("An error occurred.");
                console.log(error);
                setFetchingData(false);
            }
        };
        fetchAllEmployees();
    }, []);

    const history = useHistory();

    // const columns = [
    //     {
    //         title: "Full Name ",
    //         dataIndex: "name",
    //     },
    //     // {
    //     //   title: "Phone & email",
    //     //   dataIndex: "phoneEmail",
    //     //   render: (text, record) => {
    //     //     return (
    //     //       <div>
    //     //         <div className="text-normal">{record.phone}</div>
    //     //         <div className="text-normal">{record.email}</div>
    //     //       </div>
    //     //     );
    //     //   },
    //     // },
    //     // {
    //     //   title: "Bank Details",
    //     //   dataIndex: "bankDetails",
    //     // },
    //     {
    //         title: "Salary ",
    //         dataIndex: "salary",
    //     },
    //     {
    //         title: "Salary balance",
    //         dataIndex: "balance",
    //     },
    //     {
    //         title: "Action",
    //         dataIndex: "action",
    //     },
    // ];

    const columns = [
        {
            title: "Full Name ",
            dataIndex: "name",
        },
        {
            title: "Salary ",
            dataIndex: "salary",
        },
        {
            title: "Salary Balance",
            dataIndex: "salary balance",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Date Added",
            dataIndex: "date added",
        },
        {
            title: "Action",
            dataIndex: "action",
        },
    ];

    const gotoDetailsPage = () => {
        history.push("/employee/1");
    };

    const handleClick = param => {
        console.log("param", param);
    };

    const handleDelete = async id => {
        setDeleting(true);
        try {
            const res = await deleteEmployee(id);
            setDeleting(false);
        } catch (error) {
            toast.error("can't delete, an error occurred");
            setDeleting(false);
        }
    };
    const handleViewDetails = id => {
        history.push(`/employee/${id}`);
    };

    const tableOptions = [
        {
            name: "Activate",
            onClick: handleClick,
        },
        {
            name: "Deactivate",
            onClick: handleDelete,
        },
        {
            name: "View Details",
            onClick: handleViewDetails,
        },
    ];

    return (
        <div>
            <div className='flex justify-between w-full -mt-2 table-header mobiles:block'>
                {/* <EmployeeTab /> */}
                <div className='flex items-center justify-between w-full'>
                    <div className='my-auto text-xl font-semibold text-black capitalize mobiles:mt-3 mobiles:hidden'>
                        Employees payroll Report
                    </div>
                    {/* <Button buttonText='Pay Full Payroll' base /> */}
                </div>
                <div className='justify-between hidden mt-5 mb-3 mobiles:flex'>
                    <div className='my-auto text-normal '>
                        Employees payroll Report
                    </div>
                    {/* <div className='flex filter-search-wrapper'>
                        <BsFilter
                            style={{ background: "#F9F9F9" }}
                            className='p-1 mr-2 '
                            size='32px'
                        />
                        <AiOutlineSearch
                            style={{ background: "#F9F9F9" }}
                            className='p-1 ml-2'
                            size='32px'
                        />
                    </div> */}
                </div>
            </div>
            <div className='flex table-actions'>
                <div className='mr-5'>
                    <GreyButton
                        buttonText='Create single staff +'
                        onClick={() => history.push("/employee/create")}
                    />
                </div>
                {/* <div className="mr-5">
          <GreyButton
            buttonText="Create bulk staff "
            onClick={() => history.push("/employee/upload")}
          />
        </div> */}
            </div>

            <div className='relative mt-6'>
                <table className='w-full text-sm text-left text-gray-500 border'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                        <tr className='border-b'>
                            <th scope='col' className='p-6'>
                                <div className='flex items-center'>
                                    <input
                                        id='checkbox-all'
                                        type='checkbox'
                                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                                    />
                                    <label
                                        htmlFor='checkbox-all'
                                        className='sr-only'>
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            {columns.map(({ title }, i) => (
                                <th key={i} scope='col' className='px-6 py-3'>
                                    {title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {employees?.map(
                            (
                                {
                                    id,
                                    name,
                                    salary,
                                    // empId,
                                    status,
                                    dateAdded,
                                },
                                idx
                            ) => {
                                return (
                                    <tr
                                        key={id}
                                        className='bg-white border-b last:border-none hover:bg-gray-50 cursor-pointer'
                                        onClick={() => handleViewDetails(id)}>
                                        <td className='w-4 p-6'>
                                            <div className='flex items-center'>
                                                <input
                                                    id='checkbox-table-1'
                                                    type='checkbox'
                                                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
                                                />
                                                <label
                                                    htmlFor='checkbox-table-1'
                                                    className='sr-only'>
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>{name}</td>
                                        <td className='px-6 py-4'>{salary}</td>
                                        <td className='px-6 py-4'>
                                            NGN{" "}
                                            {salaryBalance &&
                                                parseInt(
                                                    salaryBalance[idx]
                                                        .salary_balance
                                                ).toLocaleString("en-NG")}
                                        </td>
                                        <td className='px-6 py-4 '>
                                            {status === "pending" ? (
                                                <div
                                                    className='bg-red-200 py-1.5 text-center font-semibold rounded-md text-red-700 w-28 text-sm
                                     '>
                                                    Pending
                                                </div>
                                            ) : (
                                                <div
                                                    className='bg-green-200 py-1.5 text-center font-semibold rounded-md text-green-700 w-28 text-sm
                                        '>
                                                    Onboarded
                                                </div>
                                            )}
                                        </td>
                                        <td className='px-6 py-4'>
                                            {dateAdded}
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center'>
                                                <OptionsMenu
                                                    options={tableOptions}
                                                    param={id}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
            {/* <div className="hidden mobiles:block"> */}
            <div className='hidden'>
                <EmployeeCard gotoDetailsPage={gotoDetailsPage} />
                <EmployeeCard gotoDetailsPage={gotoDetailsPage} />
            </div>
        </div>
    );
};
