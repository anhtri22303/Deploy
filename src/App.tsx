import { Route, BrowserRouter as Router, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/AuthPages/SignIn";
import Blank from "./pages/Blank";
import Ecommerce from "./pages/Dashboard/ECommerce";
import NotFound from "./pages/OtherPage/NotFound";
import BasicTables from "./pages/Tables/BasicTables";
import UserProfiles from "./pages/Users/UserProfiles";
import Users from "./pages/Users/Users";
import Members from "./pages/Users/Members";
import Register from "./components/Auth_Firebase/register";
import Guest from "./pages/Guest";
import WaitingRoom from "./pages/Game/WaitingRoom";
import Setting from "./pages/Game/Setting";
import Scoreboard from "./pages/Game/Scoreboard";

import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import MatchHistory from "./pages/Game/MatchHistory";
import Invite from "./pages/Game/QRpage";


export default function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Admin route */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<BasicTables />} />
            <Route path="/dashboard" element={<Ecommerce />} />
            <Route path="/users" element={<Users />} />
            <Route path="/members" element={<Members />} />
            <Route path="/tables" element={<BasicTables />} />
            <Route path="/users/profile" element={<UserProfiles />} />
            <Route path="/users/new" element={<Register />} />
            <Route path="/matchs" element={<MatchHistory />} />

          {/* Ui Elements */}
            <Route path="/blank" element={<Blank />} />
            
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
          </Route>
          
          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
          </Route>

          {/* Guest Layout */}
            <Route path="/1" element={<Guest />} />
            <Route path="/waiting-room/:tableId" element={<WaitingRoom />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/Scoreboard" element={<Scoreboard />} />
            <Route path="/qrCode" element={<Invite />} />
           
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </>
  );
}
