import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { NGODashboard } from '@/components/NGODashboard';

export default function NGOPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role="ngo" />
      <div className="flex-1 flex flex-col">
        <TopBar role="ngo" />
        <main className="flex-1 overflow-auto">
          <NGODashboard />
        </main>
      </div>
    </div>
  );
}
