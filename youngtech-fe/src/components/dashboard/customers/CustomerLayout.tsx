import React from 'react';

const CustomerLayout = ({children } : {children : React.ReactNode}) => {
    return (
        <div className="table-products bg-[#282F36] rounded-xl" >
            {children}
        </div>
    );
}
export default CustomerLayout;
