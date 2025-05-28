import Header from "@/components/header";
import ResumeIntro from "@/components/summary/resume-intro";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ResumenPage = async () => {
  const verifyCookies = await cookies();
  const token = verifyCookies.has("auth");
  if (!token) {
    redirect("/login");
  }
  return (
    <>
      <Header />
      <main className="w-full flex flex-col p-4 gap-4">
        <ResumeIntro />
      </main>
    </>
  );
};
export default ResumenPage;
