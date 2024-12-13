import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decode,sign } from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        // Lấy thông tin từ Google và tạo userName nếu không có
        const user = {
          id: profile.sub,  // Google user ID
          email: profile.email,
          name: profile.name || profile.email.split('@')[0], // Nếu không có tên thì dùng email để tạo userName
          picture: profile.picture,
          password: Math.random().toString(36).slice(-8), // Tạo mật khẩu mặc định (Google không trả về mật khẩu)
        };
        return user;
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // Return user object on successful login
        }
        return null; // Return null if login fails
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Nếu có user, lưu các thông tin từ user vào token
      if (user) {
      
        if (account?.provider === "google") {
          // Tạo accessToken khi login bằng Google
          token.accessToken = sign(
            { id: user.id, email: user.email, role: "user" }, // Tạo JWT token với id, email, và role
            process.env.NEXTAUTH_SECRET!, // Sử dụng secret để ký JWT token
            { expiresIn: "2m" } // Thời gian hết hạn của accessToken (1 giờ)
          );
          token.role = "user"; // Gán role mặc định là 'user'
          token.email = user.email;
          token.id = user.id;
        } else {
          const decoded = decode(user.accessToken);
          token.accessToken = user.accessToken;
          token.role = decoded?.role || "guest"; // Default role là 'guest'
          token.id = decoded?.id; // Lưu ID từ decoded token
          token.email = decoded?.email; // Lưu email nếu cần
        }  
      }
      return token;
    },
    async session({ session, token }) {
      // Lưu thông tin vào session để trả về client
      session.accessToken = token.accessToken;
      session.user.role = token.role || "guest";
      session.user.id = token.id || null;
      session.user.email = token.email || null;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Sử dụng JWT cho session
  },
  pages: {
    signIn: "/auth/signin", // Trang đăng nhập tùy chỉnh nếu cần
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
