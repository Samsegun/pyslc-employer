import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Table } from "antd";
import { CustomTag } from "../../components/CustomTag";
import { RiWalletFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { getAllCompanyPolicy, getPaymentLogs } from "../../utils/ApiRequests";
import { toast } from "react-toastify";
import { toCurrency, truncateString } from "../../utils/helpers";

const PaymentSummary = () => {
  const [paymentList, setPaymentList] = useState();
  const [fetchingData, setFetchingData] = useState(true);
  const [policyResponse, setPolicyResponse] = useState();
  useEffect(() => {
    const fetchPaymentLogs = async () => {
      try {
        const response = await getPaymentLogs();
        const resetData = response.data.payload.paymentLogs?.map(
          (resData, i) => {
            const date = new Date(resData.created_at);
            return {
              key: i,
              id: resData.id,
              paymemtID: truncateString(resData.id, 8),
              amount: parseInt(resData.amount),
              totalPayable: toCurrency(resData.amount),
              totalPay:
                resData.amount_remaining === null
                  ? toCurrency(resData.amount)
                  : toCurrency(
                      parseInt(resData.amount) -
                        parseInt(resData.amount_remaining)
                    ),
              month: date.toLocaleString("default", { month: "long" }),
              status: resData.completed === "no" ? "Unpaid" : "Paid",
              dateYear: `${date.toLocaleString("default", {
                month: "long",
              })} ${date.getFullYear()}`,
              amount_remaining: resData.amount_remaining,
            };
          }
        );
        setPaymentList(resetData);
        setFetchingData(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    const fetchPolicy = async () => {
      try {
        const res = await getAllCompanyPolicy();
        res.data.payload.data.length > 0 &&
          setPolicyResponse(res.data.payload.data[0]);
      } catch (error) {
        toast.error("An error occured, please try again");
      }
    };
    fetchPaymentLogs();
    fetchPolicy();
  }, []);

  const salaryDate =
    policyResponse?.salary_date === "last_week"
      ? "Last Week"
      : policyResponse?.salary_date === "first_week"
      ? "First Week"
      : policyResponse?.salary_date;

  const totalWithdrawals = paymentList?.reduce(
    (acc, num) => acc + num.amount,
    0
  );

  const totalDue = paymentList
    ?.filter((data) => typeof data.amount_remaining == "string")
    .reduce((acc, num) => parseInt(acc) + parseInt(num.amount_remaining), 0);

  const history = useHistory();
  const columns = [
    {
      title: "Payment Id",
      dataIndex: "paymemtID",
    },
    {
      title: "Total Payable ",
      dataIndex: "totalPayable",
    },
    {
      title: "Total Pay",
      dataIndex: "totalPay",
    },
    {
      title: "Month ",
      dataIndex: "month",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span>
          <CustomTag
            text={status}
            isDanger={status === "Unpaid"}
            isSuccess={status === "Paid"}
          />
        </span>
      ),
    },
    {
      title: "Pay",
      dataIndex: "pay",
      render: (text, record) => (
        <div
          className="flex rounded px-3 py-1 cursor-pointer"
          style={{
            color: "white",
            background: "#1C6AF4",
            width: "100px",
          }}
          onClick={() => {
            history.push(`/payments/account-info/${record.id}`);
          }}
        >
          <RiWalletFill className="my-auto mr-1" /> Pay Now
        </div>
      ),
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   render: () => <BsThreeDotsVertical />,
    // },
  ];

  return (
    <div className="__wrapper">
      <div className="header">
        <h2 className="text-2xl">Payments summary </h2>
      </div>

      <div className="box__wrapper flex w-full mobiles:block">
        <div className="border border-gray-100 p-5 mr-5 my-3 rounded-xl w-1/4 mobiles:w-full">
          <h2 className="text-2xl">Total withdrawals </h2>
          <p className="text-normal">
            {" "}
            {paymentList && paymentList[0]?.dateYear}
          </p>
          <h2 className="text-2xl font-semibold">
            {toCurrency(totalWithdrawals)}
          </h2>
        </div>
        <div className="border border-gray-100 p-5 mr-5 my-3 rounded-xl w-1/4 mobiles:w-full">
          <h2 className="text-2xl">Payment Due </h2>
          <p className="text-normal">
            {paymentList && paymentList[0]?.dateYear}
          </p>
          <h2 className="text-2xl font-semibold">{toCurrency(totalDue)}</h2>
        </div>
        <div className="border border-gray-100 p-5 mr-5 my-3 rounded-xl w-1/4 mobiles:w-full">
          <h2 className="text-2xl">Due Date </h2>
          <p className="text-normal">{salaryDate || "N/A"}</p>
        </div>
      </div>

      <div className="text-2xl mt-16 mb-3">Withdrawal Payments</div>
      <div className="employee-table my-8">
        <Table
          columns={columns}
          dataSource={paymentList}
          loading={fetchingData}
        />
      </div>
    </div>
  );
};

export default PaymentSummary;
