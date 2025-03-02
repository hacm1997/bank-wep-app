'use client'
import { LinkModel, useLinks } from "@/libs/hooks/use-links";
import { useState } from "react";
import styles from "@/libs/utils/pagination.module.css"
import ReactPaginate from "react-paginate";
import { CiCircleRemove } from "react-icons/ci";
import { AlertDeleteLinkModal } from "../modals/alert-delete-link-modal";

interface Props {
    handleShowAccount: (link_id: string) => void;
}

export const LinkList = ({ handleShowAccount }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { links, refetch } = useLinks({ page: currentPage, page_size: 10 })
    const [showModal, setShowModal] = useState(false);
    const [bankName, setBankName] = useState<string | undefined>(undefined)
    const [linkId, setLinkId] = useState<string | undefined>(undefined)

    const handlePageClick = (event: { selected: number }) => {
        setCurrentPage(event.selected + 1);
    };

    const handleShowModal = (name?: string, linkId?: string) => {
        setShowModal(!showModal);
        setBankName(name)
        setLinkId(linkId)
    };

    return (
        <div className='pl-[350px] flex flex-col gap-10 pt-[50px] w-[94%] items-center h-[100vh]' >
            <div>
                <h2 className='text-center text-[32px] font-bold'>List of banks partner</h2>
            </div>
            {!links ?
                <h1 className='text-center text-[38px] text-[#E4E4E7]'>Loading data...</h1>
                :
                <div className="relative overflow-x-auto w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Institution
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Access Mode
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {links && links.results.length > 0 && links.results.map((item: LinkModel) => (
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex gap-4">
                                        {item.institution}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.access_mode}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.status}
                                    </td>
                                    <td className="px-6 py-4 flex gap-4 items-center">
                                        <button
                                            className="p-2 rounded rounder-[20px] bg-transparent border-[1px] border-[#19B3A9] cursor-pointer"
                                            onClick={() => handleShowAccount(item.id)}
                                        >
                                            See accounts
                                        </button>
                                        <CiCircleRemove className='text-red-500 text-[30px] cursor-pointer' onClick={() => handleShowModal(item.institution, item.id)} />
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
                    pageCount={Math.ceil((links?.count ?? 0) / 10)}
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
                <AlertDeleteLinkModal handleShowModal={handleShowModal} name={bankName} link_id={linkId} refetch={refetch} />
            }
        </div>
    );
}