import { AuthProvider } from "@/libs/context/auth";
import MainLayout from "@/libs/domain/dashboard/components/layout/main-layout";
import { Transactions } from "@/libs/domain/dashboard/components/transactions/transactions";

export default async function Home({
    searchParams
}: { searchParams: Promise<Record<string, string | undefined>> }) {
    const resolvedParams = await searchParams;
    const { link_id, account_id } = resolvedParams;

    return (
        <AuthProvider>
            <MainLayout>
                <Transactions linkId={link_id} accountId={account_id} />
            </MainLayout>
        </AuthProvider>

    );
}
