import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { InputField } from "../../components/Input";
import { CustomSelect } from "../../components/Select";
import {
  changePassword,
  getAllCompanyPolicy,
  getCompanyPolicy,
} from "../../utils/ApiRequests";
import { toast } from "react-toastify";
import { getUserDataFromStorage } from "../../utils/ApiUtils";

const LegalInfo = () => {
  const initPasswordForm = {
    email: "",
    new_password: "",
    confirm_password: "",
  };

  const [changingPassword, setPasswordChanging] = useState(false);
  const [passwordForm, setPasswordForm] = useState(initPasswordForm);
  const userData = getUserDataFromStorage();

  const { company } = userData;

  useEffect(() => {
    const getPolicy = async () => {
      try {
        const res = await getAllCompanyPolicy();
      } catch (error) {}
    };
    getPolicy();
  }, []);

  const handlePasswordChange = (type, e) => {
    const { name, value } = e.target;
    const newFormData = { ...passwordForm };
    type ? (newFormData[type][name] = value) : (newFormData[name] = value);
    setPasswordForm(newFormData);
  };

  const submitPasswordChange = async (e) => {
    e.preventDefault();
    setPasswordChanging(true);

    try {
      await changePassword(passwordForm);
      setPasswordChanging(false);
      toast.success("Password changed successfull");
      setPasswordForm(initPasswordForm);
    } catch (error) {
      toast.error("An error occured");
    }
  };

  return (
    <div className="my-5">
      <h2 className="text-2xl">Company legal infomation</h2>

      <div className="my-8">
        <form>
          <div className="w-full flex mobiles:block">
            <div className="w-1/3 mobiles:w-full mr-5 mobiles:mr-0">
              <InputField
                label="Company Name"
                required
                value={company?.name}
                placeholder="Staff full name "
                type="text"
                readOnly
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="Payment email"
                required
                value={company?.email}
                placeholder="Staff full name "
                type="text"
                readOnly
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="RC Number "
                required
                value={company?.rc_number}
                placeholder="Staff full name "
                type="text"
                readOnly
              />
            </div>
          </div>
          <div className="w-full flex mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="TIN number"
                required
                value={company?.tax_identification_number}
                placeholder="Staff full name "
                type="text"
                readOnly
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="Number of Employees"
                required
                placeholder="Staff full name "
                type="text"
                readOnly
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full mobiles:mr-0">
              <InputField
                label="Total Payroll Size  "
                required
                placeholder="Staff full name "
                type="text"
                readOnly
              />
            </div>
          </div>
          <div className="w-full flex mobiles:block">
            <div className="w-2/3 mobiles:w-full">
              <InputField
                label="Business Address"
                required
                value={company?.address}
                placeholder="Staff full name "
                type="text"
                readOnly
              />
            </div>
          </div>
          <Button type="submit" disabled buttonText="Update  changes" />
        </form>

        <div className="text-xl mt-8">Policy Info</div>
        <div className="__policy-form mb-8">
          <form>
            <div className="flex mobiles:block">
              <div className="w-1/3 mr-5  mobiles:w-full mobiles:mr-0">
                <div className="mt-5">
                  <label>Salary date (every month)</label>
                  <div className="select-pay mb-5 mt-2">
                    <select
                      // onChange={handleChange}
                      name="salary_date"
                      className="bg-gray-200 px-5 py-3 w-full rounded "
                    >
                      <option value="">Select option</option>
                      <option value="first_week">First Week</option>
                      <option value="second_week">Second Week</option>
                      <option value="last_week"> Last Week</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-1/3 mr-5  mobiles:w-full mobiles:mr-0">
                <InputField
                  type="text"
                  value="50%"
                  readOnly
                  label="Salary withdrawal (%)"
                  placeholder="choose date"
                  required
                />
              </div>
              {/* <div className="w-1/3 mr-5 mt-5 mobiles:w-full mobiles:mr-0">
                <CustomSelect
                  options={["Bt Employee", "By Employer"]}
                  label="Payment fees"
                  initValue="Select option"
                />
              </div> */}
            </div>
            <div className="mt-5">
              <Button type="submit" buttonText="Update  changes" />
            </div>
          </form>
        </div>
      </div>

      <div className="my-8">
        <div className="text-2xl my-4">Change Password</div>

        <form onSubmit={submitPasswordChange}>
          <div className="w-full flex mobiles:block">
            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                required
                label="Your email"
                value={passwordForm.email}
                type="email"
                name="email"
                onChange={(e) => handlePasswordChange(null, e)}
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                required
                label="New Password"
                value={passwordForm.new_password}
                type="password"
                name="new_password"
                onChange={(e) => handlePasswordChange(null, e)}
              />
            </div>
            <div className="w-1/3 mr-5 mobiles:w-full">
              <InputField
                required
                label="Confirm Password"
                value={passwordForm.confirm_password}
                type="password"
                name="confirm_password"
                onChange={(e) => handlePasswordChange(null, e)}
              />
            </div>
          </div>
          <div className="mt-3">
            <Button loading={changingPassword} buttonText="Change Password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LegalInfo;
