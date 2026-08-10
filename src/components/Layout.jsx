import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import FloatingAction from "@/components/FloatingAction";

export default function Layout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-[260px] flex flex-col min-h-screen">
        <main className="flex-1 pt-16 lg:pt-0">
          <Outlet />
        </main>
        <Footer />
      </div>
      <FloatingAction />
    </div>
  );
}