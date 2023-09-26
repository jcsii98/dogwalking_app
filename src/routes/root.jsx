import AuthPage from "../components/authPage";
export default function Root() {
  return (
    <>
      <div className="bg-slate-400 w-screen h-screen overflow-hidden">
        <div className="w-full h-full flex justify-center items-center">
          <AuthPage />
        </div>
      </div>
    </>
  );
}
