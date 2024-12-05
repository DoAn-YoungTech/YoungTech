import React from "react";

import AddressSupplier from "./address";
import NameSupplier from "./nameSupplier";
import Email from "./email";
import PhoneNumber from "./phoneNumber";
const FormLayout = () => {
  return (
    <>
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-2">
          <NameSupplier />
          <PhoneNumber />
        </div>
        <div className="grid grid-cols-2">
          <Email />
          <AddressSupplier />
        </div> 
      </form>
    </>
  );
};

export default FormLayout;
