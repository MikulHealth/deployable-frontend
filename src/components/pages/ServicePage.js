import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RightArrow from "../../assets/RightArrow.svg";
import Help from "../../assets/Help.svg";

import ElderlyCareModal from "../sections/ElderlyCareModal";
import PostpartumCareModal from "../sections/PostpartumCareModal";
import RecoveryCareModal from "../sections/RecoveryCareModal";
import NannyCareModal from "../sections/NannyCareModal";
import ShortNurseVisitModal from "../sections/ShortNurseVisitModal";

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
  extendTheme,
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
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HomeIcon from "../../assets/HomeBlack.svg";
import HelppIcon from "../../assets/HelppIcon.svg";
import LogoutModal from "../sections/LogoutModal";
import serviceIcon from "../../assets/WhiteServiceIcon.svg";

const customTheme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
  fonts: {
    body: "Montserrat, sans-serif",
    heading: "Gill Sans MT, sans-serif",
  },
});

const ServicePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [showElderlyCareModal, setShowElderlyCareModal] = useState(false);
  const [showPostpartumCareModal, setShowPostpartumCareModal] = useState(false);
  const [showRecoveryCareModal, setShowRecoveryCareModal] = useState(false);
  const [showNannyCareModal, setShowNannyCareModal] = useState(false);
  const [showShortCareModal, setShowShortCareModal] = useState(false);

  const handleOpenElderlyCareModal = () => {
    setShowElderlyCareModal(true);
  };

  const handleOpenRecoveryCareModal = () => {
    setShowRecoveryCareModal(true);
  };

  const handleOpenPostpatumCareModal = () => {
    setShowPostpartumCareModal(true);
  };

  const handleOpenNannyCareModal = () => {
    setShowNannyCareModal(true);
  };

  const handleOpenShortCareModal = () => {
    setShowShortCareModal(true);
  };

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handleOpenHelpModal = () => {};

  const handleOpenWalletModal = () => {
    navigate("/wallet");
  };

  const help = () => {
    navigate("/help");
  };

  const handleOpenSettingsModal = () => {
    navigate("/settings");
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

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  return (
    <ChakraProvider theme={customTheme}>
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
            marginTop="20px"
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

          <Flex alignItems="center" marginTop="20px" marginLeft="-48px">
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

          <Flex
            bg="#A210C6"
            w="15vw"
            p={3}
            borderRadius="md"
            alignItems="center"
            marginTop="20px"
            marginLeft="28px"
          >
            <Image
              marginLeft="13px"
              w="20px"
              h="20px"
              src={serviceIcon}
              alt="Help"
            />
            <Text
              marginLeft="15px"
              color="white"
              fontSize="18px"
              onClick={handleOpenHelpModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "" }}
            >
              Service
            </Text>
          </Flex>

          <Flex
            alignItems="center"
            marginTop="20px"
            w="15vw"
            p={3}
            borderRadius="md"
          >
            <Image
              marginLeft="26px"
              w="20px"
              fontSize="24px"
              h="20px"
              src={SettingsIcon}
              alt="Settings"
            />
            <Text
              marginLeft="15px"
              color="black"
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

          <Flex alignItems="center" marginTop="80px" marginLeft="-55px">
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
              color="#A210C6"
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
            fontFamily="heading"
            color="#A210C6"
            marginLeft="60px"
            marginTop="30px"
          >
            Services
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

        <Box marginLeft="20px" marginTop="60px">
          <Box
            marginTop="20px"
            marginLeft="8px"
            h="12vh"
            w="65vw"
            borderRadius="15px"
            paddingBottom="5px"
            style={{
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
            }}
            _hover={{ color: "#A210C6" }}
            onClick={handleOpenElderlyCareModal}
          >
            <Flex>
              <Box marginLeft="30px" marginTop="20px">
                <Text fontSize="24px">Elderly care</Text>
              </Box>
              <Image
                marginLeft="670px"
                marginTop="25px"
                w="30px"
                h="30px"
                src={RightArrow}
                alt="Settings"
              />
            </Flex>
          </Box>

          <Box
            marginTop="20px"
            marginLeft="8px"
            h="12vh"
            w="65vw"
            borderRadius="15px"
            paddingBottom="5px"
            style={{
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
            }}
            _hover={{ color: "#A210C6" }}
            onClick={handleOpenPostpatumCareModal}
          >
            <Flex>
              <Box marginLeft="30px" marginTop="20px">
                <Text fontSize="24px">Postpartum care</Text>
              </Box>
              <Image
                marginLeft="612px"
                marginTop="25px"
                w="30px"
                h="30px"
                src={RightArrow}
                alt="Settings"
              />
            </Flex>
          </Box>

          <Box
            marginTop="20px"
            marginLeft="8px"
            h="12vh"
            w="65vw"
            borderRadius="15px"
            paddingBottom="5px"
            style={{
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
            }}
            _hover={{ color: "#A210C6" }}
            onClick={handleOpenRecoveryCareModal}
          >
            <Flex>
              <Box marginLeft="30px" marginTop="20px">
                <Text fontSize="24px">Recovery care</Text>
              </Box>
              <Image
                marginLeft="640px"
                marginTop="25px"
                w="30px"
                h="30px"
                src={RightArrow}
                alt="Settings"
              />
            </Flex>
          </Box>

          <Box
            marginTop="20px"
            marginLeft="8px"
            h="12vh"
            w="65vw"
            borderRadius="15px"
            paddingBottom="5px"
            style={{
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
            }}
            _hover={{ color: "#A210C6" }}
            onClick={handleOpenNannyCareModal}
          >
            <Flex>
              <Box marginLeft="28px" marginTop="20px">
                <Text fontSize="24px">Nanny services</Text>
              </Box>
              <Image
                marginLeft="630px"
                marginTop="25px"
                w="30px"
                h="30px"
                src={RightArrow}
                alt="Settings"
              />
            </Flex>
          </Box>

          <Box
            marginTop="20px"
            marginLeft="8px"
            h="12vh"
            w="65vw"
            borderRadius="15px"
            paddingBottom="5px"
            style={{
              cursor: "pointer",
              boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
            }}
            _hover={{ color: "#A210C6" }}
            onClick={handleOpenShortCareModal}
          >
            <Flex>
              <Box marginLeft="30px" marginTop="20px">
                <Text fontSize="24px">Short home visit</Text>
              </Box>
              <Image
                marginLeft="620px"
                marginTop="25px"
                w="30px"
                h="30px"
                src={RightArrow}
                alt="Settings"
              />
            </Flex>
          </Box>
          <Box marginLeft="905px" marginTop="-50px">
            <Image
              onClick={help}
              src={HelppIcon}
              alt="Logo"
              w="70px"
              h="70px"
              style={{
                cursor: "pointer",
                animation: "zoomInOut 2s infinite alternate",
              }}
            />

            <style>
              {`
          @keyframes zoomInOut {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.2);
            }
          }
        `}
            </style>
          </Box>
        </Box>
      </Box>
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={handleCloseUserDetailsModal}
      />
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />

      <ElderlyCareModal
        isOpen={showElderlyCareModal}
        onClose={() => setShowElderlyCareModal(false)}
      />
      <PostpartumCareModal
        isOpen={showPostpartumCareModal}
        onClose={() => setShowPostpartumCareModal(false)}
      />
      <NannyCareModal
        isOpen={showNannyCareModal}
        onClose={() => setShowNannyCareModal(false)}
      />
      <RecoveryCareModal
        isOpen={showRecoveryCareModal}
        onClose={() => setShowRecoveryCareModal(false)}
      />
      <ShortNurseVisitModal
        isOpen={showShortCareModal}
        onClose={() => setShowShortCareModal(false)}
      />
    </ChakraProvider>
  );
};
export default ServicePage;
