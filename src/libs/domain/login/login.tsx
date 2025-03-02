'use client'

import { authLogin } from '@/libs/shared/api/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Login() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        userNameEmail: '',
        password: '',
    })

    const handlerForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const id = toast.loading('Logging in......')
        authLogin(formData.userNameEmail, formData.password).then(() => {
            toast.update(id, {
                render: "Login successfully, Welcome!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            router.push('/dashboard')
        }).catch((err) => {
            console.error(err)
            alert('')
            toast.update(id, {
                render: "Incorrect username or password!",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-[95vh]">
                <h1 className='font-bold text-[32px] py-6'>BankApp Managment</h1>
                <div className="flex justify-center w-[80%] md:w-[70%] xl:w-[25%] rounded-[8px] transition-all duration-75 hover:shadow-cyan-glow bg-[#1A1E28] ">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full p-8">
                        <h2 className='text-center text-[24px] pb-2 font-semibold'>Welcome!</h2>
                        <input
                            className="h-[40px] bg-transparent border-[1px] border-[#1c7eda] p-2 rounded-md"
                            type="text"
                            placeholder="Email o username"
                            name="userNameEmail"
                            value={formData.userNameEmail}
                            onChange={handlerForm}
                            required
                        />
                        <input
                            className="h-[40px] bg-transparent border-[1px] border-[#1c7eda] p-2 rounded-md"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handlerForm}
                            required
                        />
                        <div className='flex gap-4 justify-between'>
                            <Link href='signup' title='signup' className='w-[44%]'>
                                <button
                                    type="button"
                                    className="w-full cursor-pointer font-semibold h-[40px] bg-[#8f8f8f] text-white rounded-md mt-2 transition-all duration-150 hover:bg-[#646464]"
                                >
                                    Sign up
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="w-[44%] cursor-pointer font-semibold h-[40px] bg-[#1c7eda] text-white rounded-md mt-2 transition-all duration-150 hover:bg-[#1463ac]"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
