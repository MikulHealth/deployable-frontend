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
import WebIcon from "../../assets/WebIcon.svg";
import EmailIcon from "../../assets/EmailIcon.svg";
import TextIcon from "../../assets/TextIcon.svg";

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
  Switch,
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
import NotificationIconn from "../../assets/ColoredNotificationIcon.svg";
import Bar from "../../assets/ColoredBar.svg";
import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";
import serviceIcon from "../../assets/ServiceIcon.svg";

const NotificationSettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [webAppNotification, setWebAppNotification] = useState(false);
  const [emailNotification, setEmailNotification] = useState(false);
  const [textNotification, setTextNotification] = useState(false);

  const handleWebAppNotificationChange = () => {
    // Update the state
    setWebAppNotification(!webAppNotification);

    // Make an API call to update the backend with the new setting
    // You may need to replace 'updateWebAppNotificationSetting' with your actual API call
    // The second parameter (true/false) represents the new setting
    // updateWebAppNotificationSetting(!webAppNotification);
  };
  const handleEmailNotificationChange = () => {
    // Update the state
    setEmailNotification(!emailNotification);

    // Make an API call to update the backend with the new setting
    // You may need to replace 'updateWebAppNotificationSetting' with your actual API call
    // The second parameter (true/false) represents the new setting
    // updateWebAppNotificationSetting(!webAppNotification);
  };
  const handleTextppNotificationChange = () => {
    // Update the state
    setTextNotification(!textNotification);

    // Make an API call to update the backend with the new setting
    // You may need to replace 'updateWebAppNotificationSetting' with your actual API call
    // The second parameter (true/false) represents the new setting
    // updateWebAppNotificationSetting(!webAppNotification);
  };

  useEffect(() => {
    // Fetch the user's notification settings from the backend
    // Replace 'fetchNotificationSettings' with your actual API call
    // Update the state accordingly
    // const notificationSettings = fetchNotificationSettings();
    // setWebAppNotification(notificationSettings.webApp);
    // setEmailNotification(notificationSettings.email);
    // setTextNotification(notificationSettings.text);
  }, []);

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
    navigate("/edit-profile");
  };
  const handleOpenSettingsModal = () => {
    navigate("/settings");
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  const handleChangePassowrdModal = () => {
    navigate("/change-password");
  };

  const help = () => {
    navigate("/help");
  };

  const Services = () => {
    navigate("/services");
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
              fontSize="18px"
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
              marginLeft="25px"
              w="20px"
              h="20px"
              src={AppointmentsIcon}
              alt="Appointments"
            />
            <Text
              marginLeft="15px"
              fontSize="18px"
              color="black"
              onClick={handleOpenAppointmentsModal}
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
              fontSize="18px"
              onClick={handleOpenWalletModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Wallet
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px" marginLeft="-60px">
            <Image marginLeft="13px" w="20px" h="20px" src={serviceIcon} alt="Help" />
            <Text
              marginLeft="15px"
              color="black"
              fontSize="18px"
              onClick={Services}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Service
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
              marginLeft="10px"
              w="20px"
              fontSize="24px"
              h="20px"
              src={SettingsIcon}
              alt="Settings"
            />
            <Text
              marginLeft="15px"
              color="white"
              fontSize="18px"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "" }}
              onClick={handleOpenSettingsModal}
            >
              Settings
            </Text>
          </Flex>

  

          <Flex alignItems="center" marginTop="100px" marginLeft="-55px">
            <Image
              marginLeft="15px"
              w="20px"
              h="20px"
              src={LogoutIcon}
              alt="Logout"
            />
            <Text
              onClick={handleOpenLogoutModal}
              fontSize="18px"
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
          marginTop="-590px"
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
        <Flex>
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
                onClick={handleChangePassowrdModal}
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
                marginLeft="-25px"
              >
                <Image
                  src={Bar}
                  alt="Profile Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="50px"
                  w="50px"
                  borderRadius="100%"
                />
                <Image
                  src={NotificationIconn}
                  alt="Notification Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  marginLeft="-20px"
                  h="50px"
                  w="50px"
                  borderRadius="100%"
                />
                <Text
                  color="#A210C6"
                  fontSize="20px"
                  marginLeft="5px"
                  marginTop="10px"
                >
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
              onClick={help}
            >
              <Image
                src={Help}
                alt="Notification Icon"
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
                marginLeft="145px"
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
          <Box
            marginTop="10px"
            className="notification-settings"
            marginLeft="50px"
            width="35%"
            p={3}
            h="80vh"
          >
            {" "}
            <Text fontSize="20px">Notification settings</Text>{" "}
            <VStack spacing={4}>
              <Flex marginTop="30px" alignItems="center">
                <Image
                  src={WebIcon}
                  alt="Web Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="24px"
                  w="30px"
                  borderRadius="100%"
                />
                <Text marginLeft="10px" fontSize="16px">
                  WebApp Push Notifications
                </Text>
                <Switch
                 style={{
                    backgroundColor: webAppNotification ? "purple.500" : "gray.400",
                  }}
                  marginLeft="60px"
                  isChecked={webAppNotification}
                  onChange={handleWebAppNotificationChange}
                />
              </Flex>
              <Text marginTop="-15px" marginLeft="20px" fontSize="14px">
                Receive push notifications on appointments
              </Text>
              <Text marginTop="-15px" marginLeft="-95px" fontSize="14px">
                {" "}
                and updates via webapp.
              </Text>
              <Flex marginTop="5px" alignItems="center">
                <Image
                  src={EmailIcon}
                  alt="Email Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="24px"
                  w="30px"
                  borderRadius="100%"
                />
                <Text marginLeft="10px" fontSize="16px">
                  Email notifications
                </Text>
                <Switch
                  marginLeft="125px"
                  isChecked={emailNotification}
                  onChange={handleEmailNotificationChange}
                />
              </Flex>
              <Text marginTop="-15px" marginLeft="20px" fontSize="14px">
                Receive push notifications on appointments
              </Text>
              <Text marginTop="-15px" marginLeft="-112px" fontSize="14px">
                {" "}
                and updates via email
              </Text>
              <Flex marginLeft="3px" marginTop="5px" alignItems="center">
                <Image
                  src={TextIcon}
                  alt="Text Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="24px"
                  w="30px"
                  borderRadius="100%"
                />
                <Text marginLeft="10px" fontSize="16px">
                  Text message notifications
                </Text>
                <Switch
                
                  marginLeft="70px"
                  isChecked={textNotification}
                  onChange={handleTextppNotificationChange}
                />
              </Flex>
              <Text marginTop="-15px" marginLeft="20px" fontSize="14px">
                Receive push notifications on appointments
              </Text>
              <Text marginTop="-15px" marginLeft="-123px" fontSize="14px">
                {" "}
                and updates via text
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Box>
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={handleCloseUserDetailsModal}
      />
    </ChakraProvider>
  );
};
export default NotificationSettingsPage;
