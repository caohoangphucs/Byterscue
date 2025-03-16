import Header from "../components/common/Header";
import ConnectedAccounts from "../components/settings/ConnectedAccounts";
import DangerZone from "../components/settings/DangerZone";
import Notifications from "../components/settings/Notifications";
import Profile from "../components/settings/Profile";
import Security from "../components/settings/Security";
import { useSelector } from "react-redux";
import LogIn from "../components/settings/LogIn"; // Đảm bảo tên component viết hoa

const SettingsPage = () => {
  const isLogin = useSelector((state) => state.isLogin);

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <Header title="Settings" />
      {isLogin ? (
        <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
          <Profile />
          <Notifications />
          <Security />
          <ConnectedAccounts />
          <DangerZone />
        </main>
      ) : (
        <div className="flex items-center justify-center h-full">
          <LogIn /> {/* Đảm bảo tên component viết hoa */}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
