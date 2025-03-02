import React from 'react'
import Modal from 'react-modal'
import { TransactionModalProps } from './transaction-modal.model'
import { useTransactions } from '@/libs/hooks/use-transactions'

export default function TransactionModal({ modalIsOpen, transaction_id, closeModal }: TransactionModalProps) {
    const { transactionDetails } = useTransactions({ transaction_id: transaction_id })

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1A1E28'
        },
    };
    return (
        <Modal
            isOpen={modalIsOpen}
            contentLabel="Transaction Details"
            onRequestClose={closeModal}
            style={customStyles}
        >
            {!transactionDetails ?
                <h1 className='text-center text-[38px] text-[#E4E4E7]'>Loading transaction details...</h1>
                :
                <div>
                    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Transaction details: {transactionDetails?.account.name}</h2>
                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                        <li>
                            Institution: {transactionDetails?.account.institution.name} ({transactionDetails?.account.institution.type})
                        </li>
                        <li>
                            Created at: {transactionDetails?.created_at}
                        </li>
                        <li>
                            Amount: {transactionDetails?.amount}
                        </li>
                        <li>
                            Currency: {transactionDetails?.currency}
                        </li>
                        <li>
                            Description: {transactionDetails?.description}
                        </li>
                        <li>
                            Category: {transactionDetails?.category}
                        </li>
                        <li>
                            Sub category: {transactionDetails?.subcategory}
                        </li>
                        <li>
                            Merchant Name: {transactionDetails?.merchant.name}
                        </li>
                        <li>
                            Status: <span className={transactionDetails?.status === 'PENDING' ? 'text-amber-400' : transactionDetails?.status === 'PROCESSED' ? 'text-emerald-400' : 'text-red-500'}>{transactionDetails?.status}</span>
                        </li>
                    </ul>
                    <div className='pt-4 flex justify-center'>
                        <button
                            onClick={() => closeModal()}
                            type="button"
                            className="w-[44%] cursor-pointer font-semibold h-[40px] bg-[#1c7eda] text-white rounded-md mt-2 transition-all duration-150 hover:bg-[#1463ac]"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            }

        </Modal>
    )
}
