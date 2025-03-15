'use client'
import { BanksModel, useBanks } from '@/libs/hooks/use-banks'
import Image from 'next/image'
import React, { useState } from 'react'
import { AiFillBank } from 'react-icons/ai'
import ReactPaginate from 'react-paginate';
import { SlActionRedo } from "react-icons/sl";
import styles from "@/libs/utils/pagination.module.css"
import { AlertDialogModal } from '../modals/alert-dialog-modal'
// import { IoMdInformationCircleOutline } from "react-icons/io";

export const HomeComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { banks } = useBanks({ page: currentPage, page_size: 10 })
    const [showModal, setShowModal] = useState(false);
    const [bankName, setBankName] = useState<string | undefined>(undefined)
    const [bankDisplayName, setBankDisplayName] = useState<string | undefined>(undefined)

    const handleShowModal = (name?: string, displayName?: string) => {
        setShowModal(!showModal);
        setBankName(name)
        setBankDisplayName(displayName)
    };

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected + 1);
    };

    const TableBodyRows = () => {
        return (
            banks && banks.results.length > 0 && banks.results.map((item: BanksModel) => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-4">
                        {item.icon_logo ?
                            <Image src={item.icon_logo} width={25} height={25} alt={item.display_name} />
                            :
                            <AiFillBank className='text-[#E4E4E7] text-[20px]' />
                        }
                        <span>{item.display_name}</span>
                    </th>
                    <td className="px-6 py-4">
                        {item.name}
                    </td>
                    <td className="px-6 py-4">
                        {item.type}
                    </td>
                    <td className="px-6 py-4">
                        {item.country_code}
                    </td>
                    <td className="px-6 py-4 flex gap-4">
                        <SlActionRedo className='text-[#E4E4E7] text-[20px] cursor-pointer' title='register bank' onClick={() => handleShowModal(item.name, item.display_name)} />
                        {/* <IoMdInformationCircleOutline className='text-[#E4E4E7] text-[20px] cursor-pointer' title='view details' /> */}
                    </td>
                </tr>
            ))
        )
    }

    return (
        <div className='pl-[20px] md:pl-[350px] flex flex-col gap-10 pt-[50px] w-[94%] items-center h-[100vh]' >
            <div>
                <h2 className='text-center text-[32px] font-bold'>List of banks / institutions</h2>
            </div>
            {!banks ?
                <h1 className='text-center text-[38px] text-[#E4E4E7]'>Loading data...</h1>
                :
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Institution / Bank
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Country code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableBodyRows />
                        </tbody>
                    </table>
                </div>
            }
            <div className='pt-2'>
                <ReactPaginate
                    breakLabel="..."
                    pageCount={Math.ceil((banks?.count ?? 0) / 10)}
                    // forcePage={pageInfo?.currentPage}
                    previousLabel={"<"}
                    nextLabel={">"}
                    onPageChange={handlePageClick}
                    containerClassName={styles.paginationsBtns}
                    previousClassName={styles.prevBtn}
                    nextClassName={styles.nextBtn}
                    disabledClassName={styles.paginationsDisable}
                    activeClassName={styles.paginationsActive}
                />
            </div>
            {showModal &&
                <AlertDialogModal handleShowModal={handleShowModal} bankName={bankName} bankDisplayName={bankDisplayName} />
            }
        </div>
    )
}
