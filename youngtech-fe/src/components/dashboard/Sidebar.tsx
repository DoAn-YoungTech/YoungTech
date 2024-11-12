"use client"
import { usePathname, useRouter } from "next/navigation";
import {
  BadgeCheck,
  Bell,
  BookOpen,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  LogOut,
  Settings2,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {IoIosPeople } from "react-icons/io";
import { GiJerusalemCross } from "react-icons/gi";
import { FaBusinessTime,FaClipboardList,FaWarehouse,FaFileInvoice } from "react-icons/fa";
import { GrCatalog } from "react-icons/gr";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
   
    {
      title: "Quản lý nhân viên",
      url: "quanly-nhanvien",
      icon: IoIosPeople ,
     
    },
    {
      title: "Quản lý bán hàng",
      url: "quanly-banhang",
      icon: GiJerusalemCross,
      items: [
        {
          title: "Bán hàng",
          url: "quanly-banhang/ban-hang",
        },
        {
          title: "Đơn hàng chưa xử lý",
          url: "quanly-banhang/donhang-chua-xuly",
        },
        {
          title: "danh sách hóa đơn",
          url: "quanly-banhang/danhsach-hoadon",
        }
      ],
    },
    {
      title: "Quản lý kinh doanh",
      url: "quanly-kinhdoanh",
      icon: FaBusinessTime,
      items: [
        {
          title: "Giá bán lẻ",
          url: "quanly-kinhdoanh/giaban-le",
        },
        {
          title: "Danh thu và lợi nhuận",
          url: "quanly-kinhdoanh/danhthu-loinhuan",
        },
        {
          title: "Thông tin khách hàng",
          url: "quanly-kinhdoanh/thongtin-khachhang",
        }
      ],
    },
    {
      title: "Danh mục sản phẩm",
      url: "quanly-danhmuc-sanpham",
      icon: GrCatalog,
    
    },
    {
      title: "Quản lý nhà cung cấp",
      url: "quanly-nha-cungcap",
      icon: FaClipboardList,
    
    },
    {
      title: "Quản lý nhập kho hàng",
      url: "quanly-nhap-khohang",
      icon: FaWarehouse,
    
    },
    {
      title: "Danh sách hóa đơn",
      url: "quanly-hoadon",
      icon: FaFileInvoice,
    
    },
    
  ],
 
 
}

export default function SiderbarAdmin() {
  const pathname = usePathname();
  const router = useRouter()
  return (
      <Sidebar className="bg-gray-900   text-slate-300" variant="inset">
        <SidebarHeader className="bg-gray-900 text-slate-300">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square  bg-white size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4 text-black" />
                  </div>
                  <div className=" flex justify-between items-center text-left text-sm leading-tight">
                    <span className="truncate text-xl text-white font-semibold">Dashboard</span>
                  
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="bg-gray-900 text-slate-300">
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton className="py-5 hover:bg-transparent!important hover:text-white" asChild tooltip={item.title}>
                      <button type="button" className={`${
                                      pathname.includes(item.url)
                                        ? "bg-blue-600 hover:bg-blue-600 text-white"
                                        :""
                                    }`} onClick={() => router.push(`/dashboard/${item.url}`)}>
                        <item.icon />
                        <span className="text-[16px] font-semibold">{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton className="py-5 hover:bg-gray-900 hover:text-white" asChild>
                                  <button type="button"
                                  className={`${
                                    pathname.includes(subItem.url)
                                      ? "bg-blue-600 hover:bg-blue-600 text-white"
                                      :""
                                  }`}
                                  onClick={() => router.push(`/dashboard/${subItem.url}`)}>
                                    <span className="text-[16px] font-semibold">{subItem.title}</span>
                                  </button>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
         
        </SidebarContent>
      </Sidebar>
     
    
  )
}