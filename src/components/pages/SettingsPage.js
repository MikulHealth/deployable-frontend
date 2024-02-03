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
import RightArrow from "../../assets/RightArrow.svg";
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
  Divider,
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
import SettingsIcon from "../../assets/SettingsIconWhite.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HomeIcon from "../../assets/HomeBlack.svg";
import ProfileIcon from "../../assets/ProfileIcone.svg";
import ProfileIconWhite from "../../assets/ProfileIconWh.svg";
import PasswordIcon from "../../assets/PasswordIcon.svg";
import HelppIcon from "../../assets/HelppIcon.svg";
import NotificationIconn from "../../assets/Notification.Icon.svg";

import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOpenHelpModal = () => {};

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
  };

  const handleOpenEditProfileDashboard = () => {
    navigate("/edit-prifile");
  };


  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  return (
    <ChakraProvider>
      <Box width="25%" p={3} h="90vh">
        <Image
          src={logo}
          alt="Logo"
          w="160px"
          h="60px"
          marginLeft="90px"
          marginTop="10px"
        />

        <VStack spacing={3} align="center" mt={5}>
          <Flex marginTop="50px" alignItems="center">
            <Image
              marginLeft="-47px"
              w="20px"
              h="20px"
              src={HomeIcon}
              alt="HomeIcon"
            />

            <Text
              marginLeft="15px"
              color="black"
              fontSize="24px"
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
            marginTop="10px"
            // bg="#A210C6"
            w="15vw"
            p={3}
            borderRadius="md"
          >
            <Image
              marginLeft="15px"
              w="20px"
              h="20px"
              src={AppointmentsIcon}
              alt="Appointments"
            />
            <Text
              marginLeft="15px"
              fontSize="24px"
              color="black"
              onClick="handleOpenAppointmentsModal"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "" }}
            >
              Appointments
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="10px" marginLeft="-48px">
            <Image w="20px" h="20px" src={Wallet} alt="wallet" />
            <Text
              marginLeft="15px"
              color="black"
              fontSize="24px"
              onClick={handleOpenWalletModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Wallet
            </Text>
          </Flex>

          <Flex
            alignItems="center"
            bg="#A210C6"
            w="15vw"
            p={3}
            borderRadius="md"
            marginTop="30px"
            marginLeft="28px"
          >
            <Image
              marginLeft="1px"
              w="20px"
              fontSize="24px"
              h="20px"
              src={SettingsIcon}
              alt="Settings"
            />
            <Text
              marginLeft="15px"
              color="white"
              fontSize="24px"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "" }}
            >
              Settings
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px" marginLeft="-60px">
            <Image marginLeft="10px" w="20px" h="20px" src={Help} alt="Help" />
            <Text
              marginLeft="15px"
              color="black"
              fontSize="24px"
              onClick={handleOpenHelpModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Help
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="70px" marginLeft="-55px">
            <Image
              marginLeft="10px"
              w="20px"
              h="20px"
              src={LogoutIcon}
              alt="Logout"
            />
            <Text
              onClick={handleOpenLogoutModal}
              fontSize="24px"
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
          height="113%"
          marginX={3}
          marginTop="-615px"
        />
      </Box>
      <Box
        position="fixed"
        top="0"
        left="25%"
        width="85%"
        height="100%"
        backgroundColor="white"
        zIndex="1000"
      >
        <Flex>
          <Text
            fontSize="36px"
            fontFamily="body"
            color="#A210C6"
            marginLeft="60px"
            marginTop="30px"
          >
            Settings
          </Text>
          <Flex
            marginLeft="650px"
            style={{
              cursor: "pointer",
            }}
            _hover={{ color: "#A210C6" }}
          >
            <Box marginTop="30px">
              <Image
                src={NotificationIcon}
                alt="Notificatio icon"
                h="26px"
                w="30px"
                marginBottom="10px"
              />
            </Box>

            <Box marginLeft="10px" marginTop="30px">
              {user?.image ? (
                <Link onClick={handleOpenUserDetailsModal}>
                  <Image
                    borderRadius="100px"
                    h="29px"
                    w="30px"
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
                    h="19px"
                    w="20px"
                    borderRadius="100%"
                  />
                </Link>
              )}
            </Box>
          </Flex>
        </Flex>
        <Box width="25%" p={3} h="80vh">
          <Text marginLeft="-160px" fontSize="24px">
            Account
          </Text>

          <Box>
            <Flex
              marginTop="25px"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
              onClick={handleOpenEditProfileDashboard}
            >
              <Image
                src={ProfileIcon}
                alt="Profile Icon"
                boxSize="50px"
                marginBottom="2%"
                h="50px"
                w="50px"
                borderRadius="100%"
              />
              <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                Profile
              </Text>
              <Image
                marginLeft="135px"
                marginTop="20px"
                w="10px"
                h="15px"
                src={RightArrow}
                alt="right arrow"
              />
            </Flex>
            <Divider my={1} borderColor="black.500" />
          </Box>
          <Box>
            {" "}
            <Flex
              marginTop="25px"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              <Image
                src={PasswordIcon}
                alt="Password Icon"
                boxSize="50px"
                marginBottom="2%"
                h="50px"
                w="50px"
                borderRadius="100%"
              />
              <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                Change password
              </Text>
              <Image
                marginLeft="32px"
                marginTop="20px"
                w="10px"
                h="15px"
                src={RightArrow}
                alt="right arrow"
              />
            </Flex>
            <Divider my={1} borderColor="black.500" />{" "}
          </Box>
          <Box>
            {" "}
            <Flex
              marginTop="25px"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              <Image
                src={NotificationIconn}
                alt="Notification Icon"
                boxSize="50px"
                marginBottom="2%"
                h="50px"
                w="50px"
                borderRadius="100%"
              />
              <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                Notification Settings
              </Text>
              <Image
                marginLeft="10px"
                marginTop="20px"
                w="10px"
                h="15px"
                src={RightArrow}
                alt="right arrow"
              />
            </Flex>
            <Divider my={1} borderColor="black.500" />{" "}
          </Box>
          <Box>
            {" "}
            <Flex
              marginTop="25px"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              <Image
                src={HelppIcon}
                alt="Profile Icon"
                boxSize="50px"
                marginBottom="2%"
                h="50px"
                w="50px"
                borderRadius="100%"
              />
              <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                Help
              </Text>
              <Image
                marginLeft="146px"
                marginTop="20px"
                w="10px"
                h="15px"
                src={RightArrow}
                alt="right arrow"
              />
            </Flex>
            <Divider my={1} borderColor="black.500" />{" "}
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};
export default SettingsPage;
