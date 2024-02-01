import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookAppointmentModal from "../sections/BookAppointment";
import AllAppointments from "../sections/AllAppointments";
import PendingAppointmentModal from "../sections/PendingAppointments";
import CanceledAppointmentsModal from "../sections/CanceledAppointments";
import Help from "../../assets/Help.svg";

import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Input,
  Button,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  Link,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import userImageIcon from "../../assets/userImage.svg";
import NotificationIcon from "../../assets/notification.svg";
import familyIcon from "../../assets/family.svg";
import UserDetailsModal from "../sections/UserDetails";
import logo from "../../assets/LogoColoured.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HelpIcon from "../../assets/HelpIcon.svg";
import SettingsModal from "../sections/Settings";
import HelpModal from "../sections/Help";
import Transfer from "../../assets/TransferPayment.svg";
import Online from "../../assets/OnlinePayment.svg";
import AppointmentPage from "../pages/AppointmentPage";
import RightArrow from "../../assets/RightArrow.svg";
import Wallet from "../../assets/WalletWhite.svg";
import LoadingSpinner from "../../utils/Spiner";
import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";

const FundWalletModal = ({
  isOpen,
  onClose,
  onBankTransfer,
  onOnlinePayment,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" borderRadius="15px">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginLeft="200px">Fund Wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            marginLeft="8px"
            border="1px solid black"
            h="12vh"
            w="37vw"
            borderRadius="15px"
            paddingBottom="5px"
          >
            <Flex>
              <Image
                marginLeft="15px"
                marginTop="15px"
                w="50px"
                h="50px"
                src={Transfer}
                alt="Settings"
              />
              <Box marginLeft="10px" padding="10px" paddingBottom="10px">
                <Text>Via Bank Transfer</Text>
                <Text>Direct bank transfer to your Mikul wallet account</Text>
              </Box>
              <Image
                marginLeft="15px"
                marginTop="25px"
                w="30px"
                h="30px"
                src={RightArrow}
                onClick={onBankTransfer}
                alt="Settings"
                style={{
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              />
            </Flex>
          </Box>
          <Box
            marginTop="15px"
            marginLeft="8px"
            border="1px solid black"
            h="12vh"
            w="37vw"
            marginBottom="15px"
            borderRadius="15px"
          >
            <Flex>
              <Image
                marginLeft="15px"
                marginTop="15px"
                w="50px"
                h="50px"
                src={Online}
                alt="Settings"
              />
              <Box marginLeft="10px" padding="10px" paddingBottom="10px">
                <Text>Online Payment</Text>
                <Text>Fund your Mikul wallet with a debit card</Text>
              </Box>
              <Image
                marginLeft="70px"
                marginTop="25px"
                w="30px"
                h="30px"
                src={RightArrow}
                alt="Settings"
                style={{
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
                onClick={onOnlinePayment}
              />
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const BankTransferModal = ({ isOpen, onClose, bankDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Bank Transfer Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Bank Name: {bankDetails.bankName}</Text>
          <Text>Account Number: {bankDetails.accountNumber}</Text>
          {/* Add other bank details as needed */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const OnlinePaymentModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Online Payment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Add online payment button or form */}
          <Button>Proceed to Online Payment</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const WalletPage = () => {
  const [showFundWalletModal, setShowFundWalletModal] = useState(false);
  const [showBankTransferModal, setShowBankTransferModal] = useState(false);
  const [showOnlinePaymentModal, setShowOnlinePaymentModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const balance = 0.0;
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showViewAllModal, setShowViewAllModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showCanceledModal, setShowCanceledModal] = useState(false);
  // Add these lines to your existing state declarations

  const handleOpenFundWalletModal = () => {
    setShowFundWalletModal(true);
  };

  const handleCloseFundWalletModal = () => {
    setShowFundWalletModal(false);
  };

  const handleOpenBankTransferModal = () => {
    setShowBankTransferModal(true);
  };

  const handleCloseBankTransferModal = () => {
    setShowBankTransferModal(false);
  };

  const handleOpenOnlinePaymentModal = () => {
    setShowOnlinePaymentModal(true);
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    // Close the logout confirmation modal
    setShowLogoutModal(false);

    // Perform the actual logout
    localStorage.removeItem("token");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("orderId");
    navigate("/");
  };

  const handleOpenDashboard = () => {
    navigate("/dashboard");
    window.location.reload();
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };


  const handleCloseOnlinePaymentModal = () => {
    setShowOnlinePaymentModal(false);
  };

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOpenWalletModal = () => {
    setShowWalletModal(true);
  };

  const handleOpenHelpModal = () => {
  
  };

  const handleOpenSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
  };

  return (
    <ChakraProvider>
      <Box width="25%" p={3} h="100vh">
        <Image
          src={logo}
          alt="Logo"
          w="160px"
          h="60px"
          marginLeft="90px"
          marginTop="10px"
        />

        <VStack spacing={3} align="center" mt={5}>
          <Flex marginTop="50px">
            <Image
              marginLeft="45px"
              w="20px"
              h="20px"
              src={HelpIcon}
              alt="HomeIcon"
            />

            <Text
              marginLeft="15px"
              color="white"
              onClick={() => {
                handleOpenDashboard();
              }}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Home
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px">
            <Image
              marginLeft="10px"
              w="20px"
              h="20px"
              src={AppointmentsIcon}
              alt="Appointments"
            />
            <Text
              marginLeft="15px"
              color="black"
              onClick={handleOpenAppointmentsModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Appointments
            </Text>
          </Flex>

          <Flex
            alignItems="center"
            marginTop="30px"
            marginLeft="-10px"
            bg="#A210C6"
            w="10vw"
            p={3}
            borderRadius="md"
          >
            <Image
              marginLeft="5px"
              w="20px"
              h="20px"
              src={Wallet}
              alt="wallet"
             
            />
            <Text
              marginLeft="15px"
              color="white"
              onClick={handleOpenWalletModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "white" }}
            >
              Wallet
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px" marginLeft="-46px">
            <Image
              marginLeft="10px"
              w="20px"
              h="20px"
              src={SettingsIcon}
              alt="Settings"
            />
            <Text
              marginLeft="15px"
              color="black"
              onClick={() => {
                handleOpenSettingsModal();
              }}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Settings
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px" marginLeft="-60px">
            <Image marginLeft="10px" w="20px" h="20px" src={Help} alt="Help" />
            <Text
              marginLeft="15px"
              color="black"
              onClick={handleOpenHelpModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Help
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="100px" marginLeft="-55px">
            <Image
              marginLeft="10px"
              w="20px"
              h="20px"
              src={LogoutIcon}
              alt="Logout"
            />
            <Text
              onClick={handleOpenLogoutModal}
              marginLeft="15px"
              color="black"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Logout
            </Text>
          </Flex>
        </VStack>
        <Box
          borderRight="2px solid #A210C6"
          height="104%"
          marginX={3}
          marginTop="-599px"
        />
      </Box>
      <Box
        position="fixed"
        top="0"
        left="23%"
        width="80%"
        height="100%"
        backgroundColor="white"
        zIndex="1000"
      >
        <Flex>
          <Text
            fontSize="28px"
            fontFamily="body"
            color="#A210C6"
            marginLeft="60px"
            marginTop="30px"
          >
            Wallet
          </Text>
          <Flex marginLeft="670px">
            <Box marginTop="30px">
              <Image
                src={NotificationIcon}
                alt="Notificatio icon"
                h="25px"
                w="25px"
                marginTop="10px"
                marginBottom="10px"
              />
            </Box>

            <Box marginLeft="10px" marginTop="30px">
              {user?.image ? (
                <Link onClick={handleOpenUserDetailsModal}>
                  <Image
                    borderRadius="100px"
                    h="40px"
                    w="40px"
                    src={user?.image}
                    alt="User Image"
                  />
                </Link>
              ) : (
                <Link onClick={handleOpenUserDetailsModal}>
                  <Image
                    src={userImageIcon}
                    alt="User Image Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="40px"
                    w="40px"
                    borderRadius="100%"
                  />
                </Link>
              )}
            </Box>
          </Flex>
          
        </Flex>

        <Box
          marginTop="80px"
          marginLeft="70px"
          bg="#A210C6"
          w="60vw"
          h="30vh"
          borderRadius="20px"
          display="flex"
        >
          <Box>
            {" "}
            <Flex marginLeft="30">
              <Box color="white">
                <Text
                  fontSize="20px"
                  fontFamily="body"
                  marginTop="25px"
                  style={{ marginLeft: "5px" }}
                >
                  My Wallet
                </Text>
                <Text fontSize="16px" style={{ marginLeft: "20px" }}>
                  Balance: ₦{balance.toFixed(2)}
                </Text>
              </Box>
              <Box>
                <Button
                  borderRadius="15px"
                  color="#A210C6"
                  marginLeft="470px"
                  marginTop="30px"
                  onClick={handleOpenFundWalletModal}
                  bg="white"
                >
                  Fund wallet
                </Button>
              </Box>
            </Flex>
            <Box color="white" marginTop="55px" marginLeft="-390px">
              <Text fontSize="16px" marginLeft="-175px">
                Wallet ID:
              </Text>
              <Text fontSize="16px" marginLeft="-88px">
                XYZ Bank 0124536789
              </Text>
            </Box>
          </Box>
        </Box>

        <Box marginLeft="69px">
          <Box display="flex" marginTop="30px">
            <Box
              bg="#F6E4FC"
              w="29vw"
              h="15vh"
              borderRadius="10px"
              cursor="pointer"
              onClick={() => setShowPendingModal(true)}
            >
              {" "}
              <Text
                fontSize="20px"
                fontFamily="body"
                color="#A210C6"
                marginTop="10px"
                style={{ marginLeft: "-150px" }}
              >
                Pending Appointments
              </Text>
              <Text
                fontSize="16px"
                style={{
                  marginLeft: "250px",
                  marginTop: "25px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                View all
              </Text>
            </Box>
            <Box
              bg="#F6E4FC"
              w="29vw"
              h="15vh"
              marginLeft="26px"
              borderRadius="10px"
            >
              {" "}
              <Text
                fontSize="20px"
                fontFamily="body"
                color="#A210C6"
                marginTop="10px"
                style={{ marginLeft: "-155px" }}
              >
                Active Appointments
              </Text>
              <Text
                fontSize="16px"
                style={{
                  marginLeft: "250px",
                  marginTop: "25px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                View
              </Text>
            </Box>
          </Box>
          <Box display="flex" marginTop="30px">
            <Box bg="#F6E4FC" w="29vw" h="15vh" borderRadius="10px">
              {" "}
              <Text
                fontSize="20px"
                fontFamily="body"
                color="#A210C6"
                marginTop="10px"
                style={{ marginLeft: "-125px" }}
              >
                Completed Appointments
              </Text>
              <Text
                fontSize="16px"
                style={{
                  marginLeft: "250px",
                  marginTop: "25px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                View
              </Text>
            </Box>
            <Box
              bg="#F6E4FC"
              w="29vw"
              h="15vh"
              marginLeft="26px"
              borderRadius="10px"
              cursor="pointer"
              onClick={() => setShowCanceledModal(true)}
            >
              {" "}
              <Text
                fontSize="20px"
                fontFamily="body"
                color="#A210C6"
                marginTop="10px"
                style={{ marginLeft: "-125px" }}
              >
                Cancelled Appointments
              </Text>
              <Text
                fontSize="16px"
                style={{
                  marginLeft: "250px",
                  marginTop: "25px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                View
              </Text>
            </Box>
          </Box>
        </Box>

      </Box>
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={handleCloseUserDetailsModal}
      />
      <PendingAppointmentModal
        isOpen={showPendingModal}
        onClose={() => setShowPendingModal(false)}
      />
      <CanceledAppointmentsModal
        isOpen={showCanceledModal}
        onClose={() => setShowCanceledModal(false)}
      />
      <AllAppointments
        isOpen={showViewAllModal}
        onClose={() => setShowViewAllModal(false)}
      />
      <FundWalletModal
        isOpen={showFundWalletModal}
        onClose={handleCloseFundWalletModal}
        onBankTransfer={handleOpenBankTransferModal}
        onOnlinePayment={handleOpenOnlinePaymentModal}
      />
      <BankTransferModal
        isOpen={showBankTransferModal}
        onClose={handleCloseBankTransferModal}
        bankDetails={{ bankName: "XYZ Bank", accountNumber: "0123456789" }}
      />
      <OnlinePaymentModal
        isOpen={showOnlinePaymentModal}
        onClose={handleCloseOnlinePaymentModal}
      />
    </ChakraProvider>
  );
};

export default WalletPage;
