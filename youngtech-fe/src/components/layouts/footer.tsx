

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-white mb-3 border-t-2 text-black">
        <div className="container mx-auto py-10">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Company Info */}
            <div>
              {/* Dùng thẻ <img /> hoặc component <Image /> */}
              <h4 className="text-lg font-semibold mb-4">Website cùng tập đoàn</h4>
              
              <p className="text-sm">
                Điện Máy Xanh - Siêu thị điện máy số 1 Việt Nam.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Thông tin</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:underline">Giới thiệu công ty</a></li>
                <li><a href="#" className="hover:underline">Tuyển dụng</a></li>
                <li><a href="#" className="hover:underline">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:underline">Chính sách đổi trả</a></li>
              </ul>
            </div>

            {/* Customer Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Hỗ trợ khách hàng</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:underline">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="hover:underline">Trung tâm bảo hành</a></li>
                <li><a href="#" className="hover:underline">Câu hỏi thường gặp</a></li>
              </ul>
            </div>

            {/* Contact & Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
              <p className="text-sm">Hotline: 1800 1061</p>
              <p className="text-sm">Email: cskh@dienmayxanh.com</p>
              <div className="mt-4">
                <a href="#" className="inline-block mr-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/1384/1384015.png" className="w-6 h-6" alt="Facebook" />
                </a>
                <a href="#" className="inline-block mr-4">
                  <img src="https://cdn-icons-png.flaticon.com/512/1384/1384014.png" className="w-6 h-6" alt="YouTube" />
                </a>
                <a href="#" className="inline-block">
                  <img src="https://cdn-icons-png.flaticon.com/512/1384/1384017.png" className="w-6 h-6" alt="Instagram" />
                </a>
              </div>
            </div>

          </div>

          {/* Copyright
          <div className="mt-10 border-t border-blue-300 pt-4 text-center text-sm">
            <p>&copy; 2024 Điện Máy Xanh. All rights reserved.</p>
          </div> */}
        </div>
      </footer>
      <div className="w-[90%] m-auto">
          <p className="py-5 text-gray-500 text-[12px]">© 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH & ĐT TP.HCM cấp ngày 02/01/2007. GPMXH: 21/GP-BTTTT do Bộ Thông Tin và Truyền Thông cấp ngày 11/01/2021.
          Địa chỉ: 128 Trần Quang Khải, P.Tân Định, Q.1, TP.Hồ Chí Minh. Địa chỉ liên hệ và gửi chứng từ: Lô T2-1.2, Đường D1, Đ. D1, P.Tân Phú, TP.Thủ Đức, TP.Hồ Chí Minh. Điện thoại: 028 38125960. Email: cskh@thegioididong.com. Chịu trách nhiệm nội dung: Huỳnh Văn Tốt. Email: hotrotmdt@thegioididong.com. Xem chính sách sử dụng</p>
      </div>
    </>
  )
}

export default Footer;
