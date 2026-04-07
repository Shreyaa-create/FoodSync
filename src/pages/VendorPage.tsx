import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { VendorDashboard } from '@/components/VendorDashboard';

export default function VendorPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role="vendor" />
      <div className="flex-1 flex flex-col">
        <TopBar role="vendor" />
        <main className="flex-1 overflow-auto">
          <VendorDashboard />
        </main>
      </div>
    </div>
  );
}
