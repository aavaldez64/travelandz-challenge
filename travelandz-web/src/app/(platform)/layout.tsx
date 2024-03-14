import { auth } from "@/auth.config";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Providers } from "@/stores/Providers";

export default async function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await auth())!;
  return (
    <Providers>
      <div className="flex flex-col w-full h-full min-h-screen">
        <Header username={session.user.userData.username} />
        <main className="h-full flex-1 flex justify-center">{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}
