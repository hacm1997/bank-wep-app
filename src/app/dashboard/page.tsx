import { AuthProvider } from "@/libs/context/auth";
import { HomeComponent } from "@/libs/domain/dashboard/components/home/home";
import MainLayout from "@/libs/domain/dashboard/components/layout/main-layout";

export default async function Home() {

    return (
        <AuthProvider>
            <MainLayout>
                <HomeComponent />
            </MainLayout>
        </AuthProvider>
    );
}