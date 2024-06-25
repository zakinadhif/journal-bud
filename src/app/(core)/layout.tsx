import { Sidebar } from "@/components/layout/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background grid grid-cols-[16rem_1fr] min-h-screen">
      <Sidebar />
      {children}
    </div>
  );
}
