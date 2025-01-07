import { UserButton } from "@clerk/nextjs";

const DashboardLayout = ({ children }) => {
    return (
        <div className="h-screen w-full relative">
            <aside className="w-[200px] fixed top-0 left-0 h-full border-r border-black/10">
                <div className="px-4 my-4">
                    <span className="text-3xl">Mood</span>
                </div>
                <div>
                </div>
            </aside>
            <div className="pl-[200px] h-full">
                <header className="h-[60px] border-b border-black/10">
                    <div className="h-full w-full px-6 flex items-center justify-end">
                        <UserButton />
                    </div>
                </header>
                <main className="h-[calc(100vh-60px)] overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;