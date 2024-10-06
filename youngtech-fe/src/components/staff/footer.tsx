export default function StaffFooter() {
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Phần thông tin bản quyền */}
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Staff Portal. All Rights Reserved.
          </p>
          
          {/* Liên kết điều hướng */}
          <ul className="flex space-x-4 mt-2 md:mt-0">
            <li>
              <a href="/privacy" className="hover:text-blue-400">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms" className="hover:text-blue-400">Terms of Service</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-400">Contact Us</a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
  