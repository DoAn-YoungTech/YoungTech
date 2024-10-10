import Image from "next/image";
import Link from 'next/link';

const AppLogin = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 mb-5 to-white h-screen flex items-center shadow-sm justify-center p-10">
      <div className="flex flex-col sm:flex-row w-full max-w-4xl bg-white rounded-lg border-2 border-blue-600 shadow-md overflow-hidden">
        <div className="hidden sm:flex items-center justify-center w-1/2 bg-gray-100">
          <Image 
            src="/images/logologin.JPG"  
            alt="Logo" 
            width={400}  
            height={100} 
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-semibold text-center text-blue-600 mb-6">Login</h1>
          <form id="loginForm" autoComplete="off">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" required placeholder="Enter your email" 
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition duration-200" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" required placeholder="Enter your password" 
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition duration-200" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-200">Sign In</button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">You don't have an account? <Link className="text-blue-600 hover:underline" href="/register">Register</Link></p>
          </div>
          <div className="mt-4 text-center text-gray-600">Or</div>
          <div className="flex justify-center mt-4">
            <button className="flex items-center justify-center border rounded-full p-2 mx-2 hover:bg-blue-50 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-blue-600" viewBox="0 0 24 24">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12c0 5.47 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7A10 10 0 0 0 22 12c0-5.53-4.5-10.02-10-10.02Z"/>
              </svg>
            </button>
            <button className="flex items-center justify-center border rounded-full p-2 mx-2 hover:bg-red-50 transition duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-red-600" viewBox="0 0 24 24">
                <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLogin;
