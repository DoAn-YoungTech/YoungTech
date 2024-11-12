import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    SidebarTrigger,
  } from "@/components/ui/sidebar"
  import { Separator } from "@/components/ui/separator"

import SearchAdmin from './SearchAdmin'
  
const HeaderAdmin = () => {
  return (
    <header className="flex h-16 w-full shrink-0 items-center gap-2">
    <div className="flex w-[70%] items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
            Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage className='font-semibold'>Home</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
   <SearchAdmin/>
  </header>
  )
}

export default HeaderAdmin
