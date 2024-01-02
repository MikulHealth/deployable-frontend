// ClientDash.js
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
import "../../styles/pages/LandingPage.css";
import SettingsModal from "../sections/Settings";
import AppointmentsModal from "../sections/Appointments";
import HelpModal from "../sections/Help";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);

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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userDetails();
    } else {
      navigate("/login");
    }
  }, []);

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

  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflowY="scroll" height="100vh">
        {/* First Section (Left) */}
        <Box width="25%" p={3} color="white" h="100vh">
          <Image
            src={logo}
            alt="Logo"
            w="100px"
            h="30px"
            marginLeft="20px"
            marginTop="10px"
          />

          {/* Appointments Button */}
          <VStack spacing={3} align="center" mt={5}>
            <Button
              marginTop="50px"
              leftIcon={<Image src={AppointmentsIcon} alt="Appointments" />}
              onClick={handleOpenAppointmentsModal}
              colorScheme="teal"
            >
              Appointments
            </Button>

            {/* Help Button */}
            <Button
              leftIcon={<Image src={HelpIcon} alt="Help" />}
              onClick={handleOpenHelpModal}
              colorScheme="teal"
            >
              Help
            </Button>

            {/* Settings Button */}
            <Button
              leftIcon={<Image src={SettingsIcon} alt="Settings" />}
              onClick={handleOpenSettingsModal}
              colorScheme="teal"
            >
              Settings
            </Button>

            {/* Logout Button */}
            <Button
              leftIcon={<Image src={LogoutIcon} alt="Logout" />}
              onClick={() => console.log("Logout clicked")} // Add your logout logic here
              colorScheme="teal"

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
               Welcome {user?.firstName},
              </Text>
            </Box>
            <Image src={Customer} alt="Logo" w="715px" h="100vh" />
            <Image src={Shade} alt="Logo" w="715px" h="1024px" marginTop="-900px" />
          </Box>
        </VStack>

        {/* Third Section (Right) */}
        <VStack width="25%" spacing={3} h="100vh">
          {/* Use the Modals */}
          <SettingsModal isOpen={showSettingsModal} onClose={handleCloseSettingsModal} />
          <AppointmentsModal isOpen={showAppointmentsModal} onClose={handleCloseAppointmentsModal} />
          <HelpModal isOpen={showHelpModal} onClose={handleCloseHelpModal} />
        </VStack>
      </Flex>
    </ChakraProvider>
  );
};

export default ClientDash;
