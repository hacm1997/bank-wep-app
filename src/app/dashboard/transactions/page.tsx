import { AuthProvider } from "@/libs/context/auth";
import MainLayout from "@/libs/domain/dashboard/components/layout/main-layout";
import { Transactions } from "@/libs/domain/dashboard/components/transactions/transactions";

interface TransactionsPageProps {
    searchParams: {
        link_id?: string;
        account_id?: string;
    };
}

export default async function Home({ searchParams }: TransactionsPageProps) {
    const { link_id, account_id } = await searchParams;

    return (
        <AuthProvider>
            <MainLayout>
                <Transactions linkId={link_id} accountId={account_id} />
            </MainLayout>
        </AuthProvider>

    );
}
