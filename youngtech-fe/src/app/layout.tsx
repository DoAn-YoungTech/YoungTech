
// app/layout.tsx

import React from 'react';
import '../app/globals.css'; // Nhập tệp CSS toàn cục của bạn ở đây

export const metadata = {
  title: 'Tiêu đề trang web của bạn',
  description: 'Mô tả trang web của bạn',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (

    <html lang="en"> 
      <body>
          {children}
      </body>
    </html>
  );
};

export default RootLayout;
