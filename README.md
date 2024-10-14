yountech



my-nextjs-app/
├── .gitignore                # Các tệp và thư mục không cần thiết khi đẩy lên Git
├── package.json              # Thông tin dự án, các phụ thuộc
├── README.md                 # Hướng dẫn sử dụng và thông tin về dự án
├── next.config.js            # Cấu hình tùy chỉnh cho Next.js
├── public/                   # Tệp tĩnh (hình ảnh, favicon, ...)
│   ├── images/               # Thư mục chứa hình ảnh
│   └── favicon.ico           # Tệp favicon
├── src/                      # Thư mục chứa mã nguồn chính của ứng dụng
│   ├── admin/                # Thư mục chứa mã nguồn giao diện quản trị
│   │   ├── components/       # Các component dành cho admin
│   │   │   ├── Dashboard.js   # Component Dashboard
│   │   │   └── UserList.js    # Component danh sách người dùng
│   │   ├── hooks/            # Các custom hooks dành cho admin
│   │   ├── pages/            # Các trang dành cho admin
│   │   │   ├── _app.js        # Tệp tùy chỉnh App cho admin
│   │   │   ├── index.js       # Trang chính admin
│   │   │   └── users.js       # Trang danh sách người dùng
│   │   ├── styles/           # Các tệp CSS dành cho admin
│   │   └── utils/            # Các hàm tiện ích dành cho admin
│   ├── user/                 # Thư mục chứa mã nguồn giao diện người dùng
│   │   ├── components/       # Các component dành cho người dùng
│   │   │   ├── Header.js      # Component Header
│   │   │   ├── Footer.js      # Component Footer
│   │   │   └── ProductCard.js  # Component sản phẩm
│   │   ├── hooks/            # Các custom hooks dành cho người dùng
│   │   ├── pages/            # Các trang dành cho người dùng
│   │   │   ├── _app.js        # Tệp tùy chỉnh App cho người dùng
│   │   │   ├── index.js       # Trang chính người dùng
│   │   │   └── products.js     # Trang danh sách sản phẩm
│   │   ├── styles/           # Các tệp CSS dành cho người dùng
│   │   └── utils/            # Các hàm tiện ích dành cho người dùng
│   ├── hooks/                # Các custom hooks có thể tái sử dụng giữa admin và user
│   ├── layouts/              # Thư mục chứa các layout
│   │   ├── AdminLayout.js     # Layout cho admin
│   │   └── UserLayout.js      # Layout cho người dùng
│   └── types/                # Thư mục chứa các tệp định nghĩa kiểu (TypeScript)
│       └── index.d.ts         # Định nghĩa kiểu chung cho dự án
