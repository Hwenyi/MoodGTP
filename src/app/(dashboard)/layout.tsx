import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
    {name: 'Journals', href: '/journal'},
    {name: 'History', href: '/history'},
]

const DashboardLayout = ({ children }) => {
    return (
        <div className="h-screen w-screen flex">
            <aside className="w-[200px] h-full border-r border-black/10">
                <div className="px-4 my-4">
                    <span className="text-3xl">Mood</span>
                </div>
                <div>
                    <ul className="px-4">
                        {links.map((link) => (
                        <li key={link.name} className="text-xl my-4">
                            <Link href={link.href}>{link.name}</Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <div className="flex-1 h-full flex flex-col">
                <header className="h-[60px] border-b border-black/10 sticky top-0 bg-white z-10">
                    <nav className="px-4 h-full">
                        <div className="h-full px-6 flex items-center justify-end">
                            <UserButton />
                        </div>
                    </nav>
                </header>
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;