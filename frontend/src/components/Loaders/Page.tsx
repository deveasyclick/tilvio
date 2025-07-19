import { Skeleton } from '../ui/skeleton';

const PageLoader: React.FC = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E293B] p-4 space-y-4">
        <Skeleton className="h-10 w-32 mb-4" /> {/* Logo */}
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-5/6" />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col bg-[#0F172A]">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-700">
          <Skeleton className="h-10 w-24" /> {/* Filter button */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-64" /> {/* Search */}
            <Skeleton className="h-8 w-8 rounded-full" /> {/* Theme toggle */}
            <Skeleton className="h-10 w-10 rounded-full" /> {/* Profile */}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
                <Skeleton className="h-3 w-1/3 mx-auto" />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLoader;
