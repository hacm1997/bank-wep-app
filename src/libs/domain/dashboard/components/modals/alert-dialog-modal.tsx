import { useAuth } from '@/libs/context/auth'
import { createLink } from '@/libs/shared/api/link'
import React from 'react'
import { toast } from 'react-toastify'

interface Props {
    handleShowModal: () => void
    bankName?: string
    bankDisplayName?: string
}

export const AlertDialogModal = ({ handleShowModal, bankName, bankDisplayName }: Props) => {
    const { user } = useAuth()

    const handlerCreateLink = () => {
        const toastId = toast.loading("Adding bank...");
        if (bankName && user) {
            createLink(bankName, user).then(() => {
                toast.update(toastId, {
                    render: "Bank added to parnet list successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                handleShowModal()
            }).catch((error) => {
                console.error(error)
                toast.update(toastId, {
                    render: "Failed to add bank to parnet list",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            })
        } else {
            toast.error('Bank name and user details not provided')
        }
    }
    return (
        <div className='flex justify-center w-full relative '>
            <div id="popup-modal" className="overflow-y-auto overflow-x-hidden fixed top-[36%] z-50 justify-center items-center">
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        <button onClick={handleShowModal} type="button" className="absolute cursor-pointer top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Add {bankDisplayName} bank to partner list?</h3>
                            <button onClick={handlerCreateLink} type="button" className="text-white bg-[#1c7eda] hover:bg-[#1463ac] cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, add
                            </button>
                            <button onClick={handleShowModal} type="button" className="cursor-pointer py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
