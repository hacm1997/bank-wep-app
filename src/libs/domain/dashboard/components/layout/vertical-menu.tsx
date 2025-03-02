import Link from 'next/link'
import { MdLogout } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { Logout } from '@/libs/shared/api/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/libs/context/auth';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { toast } from 'react-toastify';

interface Props {
    isMenuOpen: boolean;
}
export const VerticalMenu = ({ isMenuOpen }: Props) => {
    const router = useRouter()
    const pathname = usePathname();
    const { user } = useAuth()

    const handlerLogout = () => {
        const id = toast.loading('Logut in process...')
        Logout().then(() => {
            toast.update(id, {
                render: "Logout successfully, good bye!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            router.push('/')
        }).catch((error) => {
            console.error(error)
        })
    }

    const isActive = (path: string) => pathname === path;

    return (
        <div className={`fixed top-10 left-0 h-screen w-64 bg-[#14171F] border-none transition-transform duration-300 lg:block ${isMenuOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0`}>
            <div className="pt-10 px-4 space-y-4">
                <div className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                    <FaCheckCircle className='text-[#E4E4E7] text-[20px]' />
                    <span>User: <br />
                        <strong>{user && user.length > 12 ? user.slice(0, 12) + "..." : user}</strong>
                    </span>
                </div>

                <Link href="/dashboard" aria-label="dashboard"
                    className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg 
                        ${isActive("/dashboard") ? "bg-gradient-to-r from-sky-600 to-cyan-400 text-[#E4E4E7]" : "text-gray-500 hover:bg-gray-800"}`}>
                    <AiFillBank className='text-[#E4E4E7] text-[20px]' />
                    <span className="-mr-1 font-medium">Institutions / Banks</span>
                </Link>

                <Link href="/dashboard/links" className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg 
                    ${isActive("/dashboard/links") ? "bg-gradient-to-r from-sky-600 to-cyan-400 text-[#E4E4E7]" : "text-gray-500 hover:bg-gray-800"}`}>
                    <FaArrowRightArrowLeft className='text-[#E4E4E7] text-[20px]' />
                    <span>Partner Banks</span>
                </Link>

                <a onClick={handlerLogout} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group cursor-pointer">
                    <MdLogout className='text-[#E4E4E7] text-[20px]' />
                    <span>Logout</span>
                </a>
            </div>
        </div>
    )
}
