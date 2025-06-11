import FetchData from "@/app/components/FetchData"
import CreateData from "./components/CreateData";
import LandingPage from "./page/LandingPage";
import LoginPage from "./page/LoginPage";
export default function Home() {
  return (
    <>
      <FetchData />
      <CreateData/>
      <LandingPage/>
      <LoginPage/>
    </>
  );
}