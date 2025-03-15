'use client'
import ReactPaginate from "react-paginate"
import { TransactionsProps } from "./transactions.model"
import { TransactionModel, useTransactions } from "@/libs/hooks/use-transactions"
import { useState } from "react";
import styles from "@/libs/utils/pagination.module.css"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { formatNumber } from "@/libs/utils/general-functions";
import { TransactionModal } from "../modals/transaction-modal";

export const Transactions = ({ linkId, accountId }: TransactionsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { transactions, accountKpi } = useTransactions({ link_id: linkId, account_id: accountId, page_size: 10, page: currentPage })
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [transactionId, setTransactionId] = useState<string | undefined>(undefined)

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected + 1);
    };

    const hanldeModal = (transaction_id?: string) => {
        setModalIsOpen(!modalIsOpen);
        setTransactionId(transaction_id)
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const TableBodyRows = () => {
        return (
            transactions && transactions.results.length > 0 && transactions.results.map((item: TransactionModel) => (
                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-4">
                        {item.account.institution.name} {/*({item.account.institution.type})*/}
                    </th>
                    <td className="px-6 py-4">
                        {item.category}
                    </td>
                    <td className="px-6 py-4">
                        {item.type}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                        <span className={item.status === 'PENDING' ? 'text-amber-400' : item.status === 'PROCESSED' ? 'text-emerald-400' : 'text-red-500'}>
                            {item.status}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        {item.amount}
                    </td>
                    <td className="px-6 py-4">
                        {item.balance}
                    </td>
                    <td className="px-6 py-4 flex gap-4 items-center">
                        <IoMdInformationCircleOutline
                            className='text-[#E4E4E7] text-[26px] cursor-pointer' title='See details'
                            onClick={() => hanldeModal(item.id)}
                        />
                    </td>
                </tr>
            ))
        )
    }

    return (
        <div className='pl-[20px] md:pl-[350px] flex flex-col gap-10 pt-[50px] w-[94%] items-center h-[100vh]' >
            <div className='flex flex-col gap-4'>
                <h2 className='text-center text-[32px] font-bold'>KPI</h2>
                <div className="flex flex-wrap gap-4">
                    <div className="px-4 py-3 flex items-center space-x-4 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 text-[#E4E4E7] font-bold">
                        <span>Balance: {accountKpi?.balance && formatNumber(accountKpi?.balance)}</span>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-4 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 text-[#E4E4E7] font-bold">
                        <span>Revenues: {accountKpi?.revenues && formatNumber(accountKpi?.revenues)}</span>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-4 rounded-lg bg-gradient-to-r from-sky-600 to-cyan-500 text-[#E4E4E7] font-bold">
                        <span>Expenses: {accountKpi?.expenses && formatNumber(accountKpi?.expenses)}</span>
                    </div>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <Link href='/dashboard/links' title="Banks Links">
                    <IoArrowBackCircleOutline className='text-[#E4E4E7] text-[26px] cursor-pointer' title='back' />
                </Link>
                <h2 className='text-center text-[32px] font-bold'>Transactions List</h2>
            </div>
            {!transactions ?
                <h1 className='text-center text-[38px] text-[#E4E4E7]'>Loading transactions data...</h1>
                :
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Institution
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Balance
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <TableBodyRows />
                        </tbody>
                    </table>
                </div>
            }
            <div className='pt-0'>
                <ReactPaginate
                    breakLabel="..."
                    pageCount={Math.ceil((transactions?.count ?? 0) / 10)}
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
            <TransactionModal modalIsOpen={modalIsOpen} transaction_id={transactionId} closeModal={closeModal} />
        </div>
    )
}
