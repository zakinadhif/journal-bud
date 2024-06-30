import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-background min-h-screen font-serif">
      <Navbar />
      {children}
    </div>
  );
}
