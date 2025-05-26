import Header from "@/components/header";
import ResumeIntro from "@/components/summary/resume-intro";

const ResumenPage = async () => {
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
