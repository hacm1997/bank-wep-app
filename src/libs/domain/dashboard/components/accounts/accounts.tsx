import { AccountModel, useAccount } from '@/libs/hooks/use-account'
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import styles from "@/libs/utils/pagination.module.css"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Link from 'next/link';

interface Props {
    linkId: string
    handleBack: () => void
}

export const Accounts = ({ linkId, handleBack }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { accounts } = useAccount({ link_id: linkId, page: currentPage, page_size: 10 })

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected + 1);
    };

    return (
        <div className='pl-[350px] flex flex-col gap-10 pt-[50px] w-[94%] items-center h-[100vh]' >

            <div className='flex gap-4 items-center'>
                <IoArrowBackCircleOutline className='text-[#E4E4E7] text-[26px] cursor-pointer' onClick={handleBack} title='back to parnet bank list' />
                <h2 className='text-center text-[32px] font-bold'>Accounts List</h2>
            </div>
            {!accounts ?
                <h1 className='text-center text-[38px] text-[#E4E4E7]'>Loading data...</h1>
                :
                <div className="relative overflow-x-auto w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bank / institution
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Balance Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts && accounts.results.length > 0 && accounts.results.map((item: AccountModel) => (
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-4">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.institution.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.type}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.balance_type}
                                    </td>
                                    <td className="px-6 py-4 flex gap-4 items-center">
                                        <Link href={`/dashboard/transactions?link_id=${linkId}&account_id=${item.id}`}>
                                            <button
                                                className="p-2 rounded rounder-[20px] bg-transparent border-[1px] border-[#19B3A9] cursor-pointer"
                                            >
                                                See transactions
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
            <div className='pt-2'>
                <ReactPaginate
                    breakLabel="..."
                    pageCount={Math.ceil((accounts?.count ?? 0) / 10)}
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
            {/*showModal &&
                <AlertDeleteLinkModal handleShowModal={handleShowModal} name={bankName} link_id={linkId} refetch={refetch} />
            */}
        </div>
    )
}
