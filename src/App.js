import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import Register from "./pages/RegisterPage/Register";
import HotdealDetails from "./pages/HotdealDetails/HotdealDetails";
import ListRotation from "./pages/ListRotation/ListRotation";
import GuidePage from "./pages/GuidePage/GuidePage";
import ListGift from "./pages/ListGift/ListGift";
import PrizeRules from "./pages/PrizeRules/PrizeRules";
import GuideTakeAPhoto from "./pages/GuideTakeAPhoto/GuideTakeAPhoto";
import ParticipateHistory from "./pages/ParticipateHistory/ParticipateHistory";
import ListPromotion from "./pages/ListPromotion/ListPromotion";
import InforCustomer from "./pages/InforCustomer/InforCustomer";
import SpinTheWheel from "./pages/SpinTheWheel/SpinTheWheel";
import Success from "./pages/Success/Success";
import AnnouncePrize from "./pages/AnnouncePrize/AnnouncePrize";
import ConfirmOTP from "./pages/ConfirmOTP/ConfirmOTP";
import UpdateCustomerInfo from "./pages/UpdateCustomerInfo/UpdateCustomerInfo";
import ProtectedRoute from "./HOC/ProtectedLayout/ProtectedRoute";
import { userDataLocal } from "./services/localService/localService";
import { setAuthorization } from "./services/apiService/configURL";
import {
  isLocalhost,
  isMobileDevice,
  isWebKitBrowser,
} from "./services/deviceModel";
import NoAccessBrowser from "./pages/NoAccessBrowser/NoAccessBrowser";
import ListNotify from "./pages/ListNotify/ListNotify";
import ListGiftForCustomer from "./pages/PagePublicList/ListGiftForCustomer";
import LoginPassword from "./pages/LoginPage/LoginPassword";
import RegisterNew from "./pages/RegisterPage/RegisterNew";
import ForgotPass from "./pages/RegisterPage/ForgotPass";
import { QueryClient, QueryClientProvider } from "react-query";
import ChangePassword from "./component/RegisterComponent/ChangePassword";
import ConfirmOtpRegister from "./pages/ConfirmOTP/ConfirmOtpRegister";
import { useState } from "react";
import { detectIncognito } from "detectincognitojs";
import { useEffect } from "react";
import GuideTakeAPhotoNew from "./pages/GuideTakeAPhoto/GuideTakeAPhotoNew";

function App() {
  let { token } = userDataLocal.get();
  setAuthorization(token);
  let access = false;
  let mobileDevice = isMobileDevice();
  let webKitBrowser = isWebKitBrowser();
  const [isPrivate, setIsPrivate] = useState(false)
  useEffect(()=>{
    detectIncognito().then((result) => {
      if (result.isPrivate === false) {
        setIsPrivate(true)
      }
    });
  },[])

  if ((mobileDevice && !webKitBrowser) || isLocalhost()) {
    access = true;
  }
  const queryClient = new QueryClient();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {access && isPrivate ? (
        <div className="App">
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <Route path="/:appcode?" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login-password" element={<LoginPassword />} />
                <Route path="/confirm-otp" element={<ConfirmOTP />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-new" element={<RegisterNew />} />
                <Route path="/forgot-password" element={<ForgotPass />} />
                <Route path="/list-notify/:tick?" element={<ListNotify />} />
                <Route path="/deal-details/:id" element={<HotdealDetails />} />
                <Route path="/guide" element={<GuidePage />} />
                <Route path="/prize-rules" element={<PrizeRules />} />
                <Route
                  path="/confirm-otp-register"
                  element={<ConfirmOtpRegister />}
                />
                <Route
                  path="/guide-takeaphoto/:campaignId?"
                  element={<GuideTakeAPhoto />}
                />
                <Route
                  path="/guide-takeaphoto-new/:campaignId?"
                  element={<GuideTakeAPhotoNew />}
                />
                <Route
                  path="/participate-history/:tick?"
                  element={<ParticipateHistory />}
                />
                <Route path="/list-promotion" element={<ListPromotion />} />
                <Route
                  path="/list-for-customer/:id/:tick"
                  element={<ListGiftForCustomer />}
                />
                <Route path="/infor-customer" element={<InforCustomer />} />
                <Route path="/wheel-success" element={<Success />} />
                <Route path="/announce-prize" element={<AnnouncePrize />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/list-gift/:tick?" element={<ListGift />} />
                  <Route
                    path="/update-customer-info/:tick?"
                    element={<UpdateCustomerInfo />}
                  />
                  <Route
                    path="/change-password/:tick?"
                    element={<ChangePassword />}
                  />
                  <Route path="/list-rotation" element={<ListRotation />} />
                  <Route path="/wheel/:id" element={<SpinTheWheel />} />
                </Route>
              </Routes>
            </QueryClientProvider>
          </BrowserRouter>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NoAccessBrowser />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
