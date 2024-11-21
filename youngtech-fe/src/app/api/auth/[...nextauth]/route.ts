import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decode } from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
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
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Nếu có user, lưu các thông tin từ user vào token
      if (user) {
        // Giải mã JWT token nếu cần
        const decoded = decode(user.accessToken);

        token.accessToken = user.accessToken;
        token.role = decoded?.role || "guest";  // Default 'guest' if no role
        token.id = decoded?.id;  // Lưu ID từ decoded token
        token.email = decoded?.email;  // Lưu email nếu cần
      }
      return token;
    },
    async session({ session, token }) {
      // Lưu thông tin vào session để trả về client
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.email = token.email;
      
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",  // Sử dụng JWT cho session
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
