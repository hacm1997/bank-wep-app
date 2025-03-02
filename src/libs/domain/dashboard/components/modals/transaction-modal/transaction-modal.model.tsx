export interface TransactionModalProps {
    transaction_id?: string;
    modalIsOpen: boolean;
    closeModal: () => void;
}