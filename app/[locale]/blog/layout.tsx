import { setRequestLocale } from "next-intl/server";
// import Footer from "@/components/footer";
import SiteHeader from "@/components/site-header";

// blog 子樹用傳統「頂部 nav + 底部 footer」;首頁是左右欄版型,自帶導覽。
export default async function BlogLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}
