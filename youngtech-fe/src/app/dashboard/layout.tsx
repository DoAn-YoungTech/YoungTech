
import HeaderAdmin from "@/components/dashboard/HeaderAdmin";
import SiderbarAdmin from "@/components/dashboard/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
<>
 <SidebarProvider>
 <SiderbarAdmin/>
 <SidebarInset > 
  <HeaderAdmin/>
 <main className="w-full flex justify-center">
       <section className="w-[90%]">
      
       {children}
       </section>
      </main>
      </SidebarInset>
    </SidebarProvider>
</>
     
     
   
  );
}
