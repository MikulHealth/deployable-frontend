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
} from "@chakra-ui/react";
import userImageIcon from "../../assets/userImage.svg";
import NotificationIcon from "../../assets/notification.svg";
import familyIcon from "../../assets/family.svg";
import UserDetailsModal from "../sections/UserDetails";
import LoadingSpinner from "../../utils/Spiner";
import Wallet from "../../assets/Wallet.svg";
import logo from "../../assets/LogoColoured.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentWhite.svg";
import HelpIcon from "../../assets/HelpIcon.svg";
import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";

const AppointmentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showViewAllModal, setShowViewAllModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showCanceledModal, setShowCanceledModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
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

  const handleOpenHelpModal = () => {};

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
  };

  const handleOpenWalletModal = () => {
    navigate("/wallet");
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
              marginLeft="5px"
              w="20px"
              h="20px"
              src={HelpIcon}
              alt="HomeIcon"
            />

            <Text
              marginLeft="-30px"
              color="black"
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

          <Flex
            alignItems="center"
            marginTop="30px"
            bg="#A210C6"
            w="15vw"
            p={3}
            borderRadius="md"
          >
            <Image
              marginLeft="20px"
              w="20px"
              h="20px"
              src={AppointmentsIcon}
              alt="Appointments"
            />
            <Text
              marginLeft="15px"
              color="white"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "" }}
            >
              Appointments
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px" marginLeft="-46px">
            <Image w="20px" h="20px" src={Wallet} alt="wallet" />
            <Text
              marginLeft="15px"
              color="black"
              onClick={handleOpenWalletModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
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
            Appointments
          </Text>
          <Flex marginLeft="600px">
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
          marginLeft="70px"
          marginTop="40px"
          border="1px solid gray"
          borderRadius="md"
          padding="3px"
          w="60vw"
        >
          <Flex marginLeft="10px">
            <SearchIcon boxSize={4} marginRight="10px" marginTop="5px" />
            <Text
              fontSize="16px"
              style={{
                marginLeft: "5px",
                marginTop: "2px",
                fontStyle: "italic",
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
              onClick={handleOpenSearchAppointmentsModal}
            >
              Search Appointment by date
            </Text>
          </Flex>
        </Box>

        <Flex
          marginTop="30px"
          marginLeft="70px"
          bg="#A210C6"
          w="60vw"
          h="30vh"
          borderRadius="20px"
          display="flex"
        >
          <Box color="white">
            <Text
              fontSize="20px"
              fontFamily="body"
              marginTop="15px"
              marginLeft="-250px"
            >
              Hello {user?.firstName},
            </Text>
            <Text fontSize="15px" marginLeft="15px" marginTop="5px">
              You have no appointments yet. Would you like to book one
            </Text>
            <Text fontSize="15px" marginTop="2px" marginLeft="-195px">
              for yourself or a loved one?
            </Text>
            <Flex marginLeft="10px">
              <Button
                onClick={handleOpenAppointmentModal}
                bg="#A210C6"
                color="white"
                marginTop="30px"
              >
                Book appointment
              </Button>
              <Button
                onClick={() => setShowViewAllModal(true)}
                bg="#A210C6"
                color="white"
                marginLeft="5px"
                marginTop="30px"
              >
                All appointment
              </Button>
            </Flex>
          </Box>
          <Box>
            <Image
              src={familyIcon}
              alt="family icon"
              h="150px"
              w="150px"
              marginTop="20px"
              marginBottom="10px"
              marginLeft="160px"
            />
          </Box>
        </Flex>
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
    </ChakraProvider>
  );
};

export default AppointmentPage;
