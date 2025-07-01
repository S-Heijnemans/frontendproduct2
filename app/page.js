import FetchData from "@/app/components/FetchData"
import CreateData from "./components/CreateData";
import LandingPage from "./page/LandingPage";
import LoginPage from "./page/LoginPage";
import ProfileShow from "./components/profile/ProfileShow";
import Searchbar from "./components/Searchbar";
export default function Home() {
  return (
    <>
      <Searchbar />
      <FetchData />
      <CreateData/>
      <LandingPage/>
      <ProfileShow />
      <LoginPage/>
    </>
  );
}