import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "../app-sidebar/AppSidebar";



const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div>

        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default MainLayout
