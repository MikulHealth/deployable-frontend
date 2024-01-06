import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../../apiCalls/UserApis";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/userSlice";
import {
  Box,
  Button,
  Flex,
  VStack,
  Image,
  extendTheme,
  ChakraProvider,
  Text,
  useToast,
} from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Customer from "../../assets/UserSignUp.svg";
import Shade from "../../assets/Shade.svg";
import logo from "../../assets/LogoColoured.svg";
import HomeIcon from "../../assets/Home.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HelpIcon from "../../assets/HelpIcon.svg";
import userImageIcon from "../../assets/userImage.svg";
import NotificationIcon from "../../assets/notification.svg";
import "../../styles/pages/LandingPage.css";
import SettingsModal from "../sections/Settings";
import AppointmentsModal from "../sections/Appointments";
import HelpModal from "../sections/Help";
import UserModal from "../sections/UserDetailspage";
import UserDetailsModal from "../sections/UserDetails"

import { Link } from "react-router-dom";

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
    body: "Gill Sans MT, sans-serif",
    heading: "Gill Sans MT, sans-serif",
  },
});

const ClientDash = () => {
  const [loading, setLoading] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAppointmentsModal, setShowAppointmentsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showUserModal, setUserModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  

  const userDetails = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(SetUser(response.data));
      }
      console.log("This is user" + JSON.stringify(user));
    } catch (error) {
      alert(error.response);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("orderId");

    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          console.log("Calling GetCurrentUser API");
          const response = await GetCurrentUser();

          if (response.success) {
            console.log("API response:", response.data);
            dispatch(SetUser(response.data));
          } else {
            console.error("API request failed:", response.error);
          }
        } catch (error) {
          console.error("Error in GetCurrentUser API:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, []); 

  const handleOpenUserDetails = () => {
    navigate("/user-details"); 
  };

  const handleOpenSettingsModal = () => {
    setShowSettingsModal(true);
  };

  const handleCloseSettingsModal = () => {
    setShowSettingsModal(false);
  };

  const handleOpenAppointmentsModal = () => {
    setShowAppointmentsModal(true);
  };

  const handleCloseAppointmentsModal = () => {
    setShowAppointmentsModal(false);
  };

  const handleOpenHelpModal = () => {
    setShowHelpModal(true);
  };

  const handleCloseHelpModal = () => {
    setShowHelpModal(false);
  };

  const handleOpenUserModal = () => {
    setUserModal(true);
  };

  const handleCloseUserModal = () => {
    setUserModal(false);
  };

   // Function to open the modal
   const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  // Function to close the modal
  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflowY="scroll" height="100vh">
        {/* First Section (Left) */}
        <Box width="25%" p={3} color="white" h="100vh" >
          <Image
            src={logo}
            alt="Logo"
            w="100px"
            h="30px"
            marginLeft="20px"
            marginTop="10px"
          />

          <VStack spacing={3} align="center" mt={5}>
            <Box
              marginTop="50px"
              bg="white"
              p={3}
              borderRadius="md"
              display="flex"
              alignItems="center"
              w="17vw"
            >
              <Image marginLeft="65px" src={HelpIcon} alt="HelpIcon" />
              <Text marginLeft="15px" color="black">
                HOME
              </Text>
            </Box>

            <Button
              marginTop="30px"
              leftIcon={<Image src={AppointmentsIcon} alt="Appointments" />}
              onClick={handleOpenAppointmentsModal}
              // colorScheme="teal"
              // color="#A210C6"
            >
              Appointments
            </Button>

            <Button
              leftIcon={<Image src={SettingsIcon} alt="Settings" />}
              onClick={handleOpenSettingsModal}
              // colorScheme="teal"
              marginTop="30px"
              // color="#A210C6"
            >
              Settings
            </Button>
            <Button
              leftIcon={<Image src={HelpIcon} alt="Help" />}
              onClick={handleOpenHelpModal}
              // colorScheme="teal"
              marginTop="30px"
              // color="#A210C6"
            >
              Help
            </Button>

            {/* Logout Button */}
            <Button
              leftIcon={<Image src={LogoutIcon} alt="Logout" />}
              onClick={handleLogout}
             
              marginTop="140px"
            >
              Logout
            </Button>
          </VStack>
        </Box>

        {/* Second Section (Middle) */}
        <VStack align="center" width="50%" h="100vh">
          <Box>
            <Box>
              <Text
                fontSize="32px"
                fontFamily="body"
                color="#A210C6"
                marginTop="30px"
                marginLeft="20px"
              >
                Hello {user?.firstName},
              </Text>
              <p>How are you doing today?</p>
            </Box>
            <Image src={Customer} alt="Logo" w="715px" h="80vh" />
          </Box>
        </VStack>

        {/* Third Section (Right) */}
        <VStack width="25%" spacing={3} h="100vh" >
          <Box marginTop="30px" marginLeft="200px">
            <Image
              src={NotificationIcon}
              alt="Notificatio icon"
              h="25px"
              w="25px"
              marginTop="10px"
              marginBottom="10px"
            />
          </Box>
          <Box marginTop="10px">
            {user?.image ? (
              <Link  onClick={handleOpenUserDetailsModal}>
                <Image
                  borderRadius="full"
                  h="100px"
                  w="100px"
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
                  h="100px"
                  w="100px"
                  borderRadius="50%"
                /> 
              </Link>
            )}
            <Box marginTop="10px">
              <Link onClick={handleOpenUserDetailsModal} >
                <Button color="#A210C6">
                  <Text>Profile</Text>
                </Button>
              </Link>
            </Box>
          </Box>

          <SettingsModal
            isOpen={showSettingsModal}
            onClose={handleCloseSettingsModal}
          />
          <AppointmentsModal
            isOpen={showAppointmentsModal}
            onClose={handleCloseAppointmentsModal}
          />
          <HelpModal isOpen={showHelpModal} onClose={handleCloseHelpModal} />
          <UserModal isOpen={showUserModal} onClose={handleCloseUserModal} />
        </VStack>
      </Flex>
       <UserDetailsModal
       isOpen={showUserDetailsModal}
       onClose={handleCloseUserDetailsModal}
       defaultImage={userImageIcon}
     />
    </ChakraProvider>
  );
};

export default ClientDash;
