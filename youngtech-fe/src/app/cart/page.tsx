"use client"
import CartPage from "@/components/MainCart"
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  console.log(session)
  return (
    
  <CartPage/>
  )
}
export default page
