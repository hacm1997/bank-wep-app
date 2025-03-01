import Link from 'next/link'
import { MdHome, MdLogout } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillBank } from "react-icons/ai";
import { Logout } from '@/libs/shared/api/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/libs/context/auth';

interface Props {
    isMenuOpen: boolean;
}
export const VerticalMenu = ({ isMenuOpen }: Props) => {
    const router = useRouter()
    const { user } = useAuth()

    const handlerLogout = () => {
        Logout().then(() => {
            alert('Hasta pronto!')
            router.push('/')
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <div className={`fixed top-10 left-0 h-screen w-64 bg-[#14171F] border-none transition-transform duration-300 lg:block ${isMenuOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0`}>
            <div className="pt-10 px-4 space-y-4">
                <div className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                    <FaCheckCircle className='text-[#E4E4E7] text-[20px]' />
                    <span>Usuario: <br /><strong>{user}</strong></span>
                </div>

                <Link href="/dashboard" aria-label="dashboard"
                    className="relative px-4 py-3 flex items-center space-x-4 rounded-lg text-[#E4E4E7] bg-gradient-to-r from-sky-600 to-cyan-400">
                    <MdHome className='text-[#E4E4E7] text-[20px]' />
                    <span className="-mr-1 font-medium">Inicio</span>
                </Link>

                <Link href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                    <AiFillBank className='text-[#E4E4E7] text-[20px]' />
                    <span>Bancos</span>
                </Link>
                {/* <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                    <i className="fas fa-exchange-alt"></i>
                    <span>Transacciones</span>
                </a>
                <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
                    <i className="fas fa-user"></i>
                    <span>Mi cuenta</span>
                </a> */}
                <a onClick={handlerLogout} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group cursor-pointer">
                    <MdLogout className='text-[#E4E4E7] text-[20px]' />
                    <span>Cerrar sesión</span>
                </a>
            </div>
        </div>
    )
}
