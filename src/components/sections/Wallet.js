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
import Transfer from "../../assets/TransferPayment.svg";
import Online from "../../assets/OnlinePayment.svg";
import RightArrow from "../../assets/RightArrow.svg";
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const balance = 0.0;
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
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

  const handleCloseOnlinePaymentModal = () => {
    setShowOnlinePaymentModal(false);
  };

  const [showSearchAppointmentsModal, setShowSearchAppointmentsModal] =
    useState(false);

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOpenAppointmentModal = () => {
    setShowAppointmentModal(true);
  };

  const handleOpenSearchAppointmentsModal = () => {
    setShowSearchAppointmentsModal(true);
  };

  const handleCloseSearchAppointmentsModal = () => {
    setShowSearchAppointmentsModal(false);
  };

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
  };

  return (
    <ChakraProvider>
      <Box>
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
                // onClick={() => setShowServicesModal(true)}
              >
                View
              </Text>
              {/* <ServicesModal
                isOpen={showServicesModal}
                onClose={() => setShowServicesModal(false)}
              /> */}
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
      <BookAppointmentModal
        isOpen={showAppointmentModal}
        onClose={handleCloseAppointmentModal}
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
      <SearchAppointmentsModal
        isOpen={showSearchAppointmentsModal}
        onClose={handleCloseSearchAppointmentsModal}
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
        bankDetails={{ bankName: "XYZ Bank", accountNumber: "0123456789" }} // Replace with actual bank details
      />
      <OnlinePaymentModal
        isOpen={showOnlinePaymentModal}
        onClose={handleCloseOnlinePaymentModal}
      />
    </ChakraProvider>
  );
};

export default WalletPage;
