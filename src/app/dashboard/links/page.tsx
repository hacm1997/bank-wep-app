import { AuthProvider } from "@/libs/context/auth";
import MainLayout from "@/libs/domain/dashboard/components/layout/main-layout";
import { LinkContainer } from "@/libs/domain/dashboard/components/links/link-container";

export default async function Home() {

    return (
        <AuthProvider>
            <MainLayout>
                <LinkContainer />
            </MainLayout>
        </AuthProvider>
    );
}