
import logo from "./assets/Whitelogo.png";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import AboutPage from "./components/pages/AboutPage";
import ConatactPage from "./components/pages/ConatctPage";
import MedicRegPage from "./components/pages/MedicRegPage";
import MedicRegPage2 from "./components/pages/MedicRegPage2";
import VerifyNumber from "./components/pages/VerifyNumber";
import VerifyMedicNumber from "./components/pages/VerifyMedicNumber";
import MedicRegConfirmation from "./components/pages/MedicConfirmationPage";
import CustomerReg from "./components/pages/CustomerReg";
import Login from "./components/pages/LoginPage";
import ForgotPassword from "./components/pages/ForgotPassowrd";
import ResetPassword from "./components/pages/ResetPassword";
import ClientDash from "./components/pages/ClientDashboad";
import AppointmentPage from "./components/pages/AppointmentPage";
import UserDetailsModal from "./components/sections/UserDetails";
import VerifyOtpDash from "./components/sections/VerifyOTP";
import PaymentConfirmationModal from "./components/sections/PaymentConfirmationModal";
import WalletPage from "./components/pages/WalletPage";
import SettingsPage from "./components/pages/SettingsPage";
import EdithProfilePage from "./components/pages/EdithProfilePage";
import ChangePasswordPage from "./components/pages/ChangePasswordPage"
import NotificationSettingsPage from "./components/pages/NotificationSettingsPage";
import HelpPage from "./components/pages/HelpPage";
import ServicePage from "./components/pages/ServicePage";
import CreditPage from "./components/pages/CreditWalletPage";
import DebitPage from "./components/pages/DebitWalletPage";
import { DeleteIcon } from "@chakra-ui/icons";
import PendingAppointmentPage from "./components/pages/PendingAppointmentPage";
import ActiveAppointmentPage from "./components/pages/ActiveAppointmentPage";
import CustomizeServicePage from "./components/pages/CustomizeServicePage";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ConatactPage />}></Route>
          <Route path="/join" element={<MedicRegPage />}></Route>
          <Route path="/join-complete" element={<MedicRegPage2 />}></Route>
          <Route path="/verify-number" element={<VerifyNumber />}></Route>
          <Route
            path="/verify-medic-number"
            element={<VerifyMedicNumber />}
          ></Route>
          <Route path="/medic-reg" element={<MedicRegPage2 />}></Route>
          <Route
            path="/confirm-medic-reg"
            element={<MedicRegConfirmation />}
          ></Route>
          <Route path="/customer-signUp" element={<CustomerReg />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/dashboard" element={<ClientDash />}></Route>
          <Route path="/details" element={<UserDetailsModal />}></Route>
          <Route path="/verifyPhone" element={<VerifyOtpDash />}></Route>
          <Route path="/make-payment" element={<PaymentConfirmationModal />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/edit-profile" element={<EdithProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/notification-settings" element={<NotificationSettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/credit" element={<CreditPage />} />
          <Route path="/debit" element={<DebitPage />} />
          <Route path="/pending-appointments" element={<PendingAppointmentPage />} />
          <Route path="/active-appointments" element={<ActiveAppointmentPage />} />
          <Route path="/customize-service" element={<CustomizeServicePage />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;
