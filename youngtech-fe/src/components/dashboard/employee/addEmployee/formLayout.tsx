import React from "react";

import EmailEmployee from "./email";
import NameEmployee from "./nameEmployee";
import PhoneNumber from "./phoneNumber";
import PassEmployee from "./password";
const FormLayoutEmployee = () => {
  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-2">
          <NameEmployee />
          <PhoneNumber />
        </div>
        <div className="grid grid-cols-2">
          <EmailEmployee />
          <PassEmployee />
        </div>
      </form>
    </>
  );
};

export default FormLayoutEmployee;
