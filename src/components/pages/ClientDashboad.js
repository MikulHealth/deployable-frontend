import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../../apiCalls/UserApis";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/userSlice";
import AppointmentPage from "./AppointmentPage";
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
  Skeleton,
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
import NurseAndPatient from "../../assets/NurseAndPatient.svg";
import NotificationIcon from "../../assets/notification.svg";
import "../../styles/pages/LandingPage.css";
import SettingsModal from "../sections/Settings";
import AppointmentsModal from "../sections/AppointmentForm";
import HelpModal from "../sections/Help";
// import UserModal from "../sections/UserDetailspage";
import UserDetailsModal from "../sections/UserDetails";
import ServicesPage from "./Services";
import ServicesModal from "../sections/ServicePageModal";
import { Link } from "react-router-dom";
import LogoutModal from "../sections/LogoutModal";
import LoadingSpinner from "../../utils/Spiner";

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
  const [activePage, setActivePage] = useState("home");

  const [showAppointmentPage, setShowAppointmentPage] = useState(false);
  const [showDashboard, setShowDashbaord] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showUserModal, setUserModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const balance = 0.0;
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

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
        } finally {
          setLoading(false);
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
    setShowAppointmentPage(true);
  };

  const handleOpenDashboard = () => {
    navigate("/dashboard");
    window.location.reload();
  };
  // const handleCloseAppointmentsModal = () => {
  //   setShowAppointmentsModal(false);
  // };

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

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflowY="scroll" height="100vh">
        {/* First Section (Left) */}
        {loading ? (
          <Skeleton height="100vh" width="25%" />
        ) : (
          <Box bg="#F6E4FC" width="25%" p={3} color="white" h="100vh">
            <Image
              src={logo}
              alt="Logo"
              w="160px"
              h="60px"
              marginLeft="90px"
              marginTop="10px"
            />

            <VStack spacing={3} align="center" mt={5}>
              <Flex
                marginTop="50px"
                bg="white"
                p={3}
                borderRadius="md"
                w="17vw"
              >
                <Image
                  marginLeft="65px"
                  w="20px"
                  h="20px"
                  src={HelpIcon}
                  alt="HelpIcon"
                />

                <Text
                  onClick={() => {
                    handleOpenDashboard();
                    setActivePage("home");
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                  marginLeft="15px"
                  color="black"
                >
                  Dashbaord
                </Text>
              </Flex>
              {/* <Flex
                borderRadius="md"
                p={3}
                w="17vw"
                alignItems="center"
                marginTop="30px"
                // bg={activePage ? "white" : "#F6E4FC"}
              > */}
              <Flex alignItems="center" marginTop="30px" marginLeft="-46px">
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
                  onClick={() => {
                    handleOpenAppointmentsModal();
                    // setActivePage("appointments");
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                >
                  Appointments
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
                    setActivePage("appointments");
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                >
                  Settings
                </Text>
              </Flex>

              <Flex alignItems="center" marginTop="30px" marginLeft="-54px">
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
                  onClick={handleOpenSettingsModal}
                  style={{
                    cursor: "pointer",
                  }}
                  _hover={{ color: "#A210C6" }}
                >
                  Wallet
                </Text>
              </Flex>

              <Flex alignItems="center" marginTop="30px" marginLeft="-60px">
                <Image
                  marginLeft="10px"
                  w="20px"
                  h="20px"
                  src={HelpIcon}
                  alt="Help"
                />
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
          </Box>
        )}

        {loading ? (
          <Flex
            align="center"
            justify="center"
            width="50%"
            height="100vh"
            // bg="white"
          >
            <LoadingSpinner size={100} />
          </Flex>
        ) : (
          //  Second Section (Middle)
          <VStack align="center" width="50%" h="100vh">
            <Box>
              <Box>
                <Text
                  fontSize="32px"
                  fontFamily="body"
                  color="#A210C6"
                  marginTop="30px"
                  marginLeft="-370px"
                >
                  Hello {user?.firstName},
                </Text>
                <Text marginLeft="-380px">How are you doing today?</Text>
              </Box>
              <Box>
                <Box
                  marginTop="50px"
                  bg="#F6E4FC"
                  w="40vw"
                  h="20vh"
                  borderRadius="10px"
                  display="flex"
                >
                  <Box>
                    {" "}
                    <Text
                      fontSize="20px"
                      fontFamily="body"
                      color="#A210C6"
                      marginTop="10px"
                      style={{ marginLeft: "5px" }}
                    >
                      My Wallet
                    </Text>
                    <Text fontSize="16px" style={{ marginLeft: "20px" }}>
                      Balance: ₦{balance.toFixed(2)}
                    </Text>
                    <Text
                      fontSize="16px"
                      style={{
                        marginLeft: "-18px",
                        marginTop: "28px",
                        fontStyle: "italic",
                        cursor: "pointer",
                      }}
                      _hover={{ color: "#A210C6" }}
                    >
                      Details
                    </Text>
                  </Box>

                  <Image
                    src={NurseAndPatient}
                    alt="Nurse and Patient"
                    w="100px"
                    h="100px"
                    marginLeft="280px"
                    marginTop="18px"
                  />
                </Box>
                <Box>
                  <Box display="flex" marginTop="30px">
                    <Box bg="#F6E4FC" w="19.5vw" h="20vh" borderRadius="10px">
                      {" "}
                      <Text
                        fontSize="20px"
                        fontFamily="body"
                        color="#A210C6"
                        marginTop="10px"
                        style={{ marginLeft: "-35px" }}
                      >
                        Book Appointment
                      </Text>
                      <Text fontSize="16px" style={{ marginLeft: "-12px" }}>
                        Schedule your appointment
                      </Text>
                      <Text
                        fontSize="16px"
                        style={{
                          marginLeft: "130px",
                          marginTop: "30px",
                          fontStyle: "italic",
                          cursor: "pointer",
                        }}
                        _hover={{ color: "#A210C6" }}
                      >
                        Book now
                      </Text>
                    </Box>
                    <Box
                      bg="#F6E4FC"
                      w="19.5vw"
                      h="20vh"
                      marginLeft="10px"
                      borderRadius="10px"
                    >
                      {" "}
                      <Text
                        fontSize="20px"
                        fontFamily="body"
                        color="#A210C6"
                        marginTop="10px"
                        style={{ marginLeft: "-130px" }}
                      >
                        Refferals
                      </Text>
                      <Text fontSize="16px" style={{ marginLeft: "2px" }}>
                        Refer friends and earn rewards
                      </Text>
                      <Text
                        fontSize="16px"
                        style={{
                          marginLeft: "130px",
                          marginTop: "30px",
                          fontStyle: "italic",
                          cursor: "pointer",
                        }}
                        _hover={{ color: "#A210C6" }}
                      >
                        Learn more
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" marginTop="30px">
                    <Box bg="#F6E4FC" w="19.5vw" h="20vh" borderRadius="10px">
                      {" "}
                      <Text
                        fontSize="20px"
                        fontFamily="body"
                        color="#A210C6"
                        marginTop="10px"
                        style={{ marginLeft: "-105px" }}
                      >
                        Our services
                      </Text>
                      <Text fontSize="16px" style={{ marginLeft: "2px" }}>
                        Explore a variety of our services
                      </Text>
                      <Text
                        fontSize="16px"
                        style={{
                          marginLeft: "130px",
                          marginTop: "30px",
                          fontStyle: "italic",
                          cursor: "pointer",
                        }}
                        _hover={{ color: "#A210C6" }}
                        onClick={() => setShowServicesModal(true)}
                      >
                        View services
                      </Text>
                      <ServicesModal
                        isOpen={showServicesModal}
                        onClose={() => setShowServicesModal(false)}
                      />
                    </Box>
                    <Box
                      bg="#F6E4FC"
                      w="19.5vw"
                      h="20vh"
                      marginLeft="10px"
                      borderRadius="10px"
                    >
                      {" "}
                      <Text
                        fontSize="20px"
                        fontFamily="body"
                        color="#A210C6"
                        marginTop="10px"
                        style={{ marginLeft: "-125px" }}
                      >
                        Medical Report
                      </Text>
                      <Text fontSize="16px" style={{ marginLeft: "-50px" }}>
                        Access and view your reports
                      </Text>
                      <Text
                        fontSize="16px"
                        style={{
                          marginLeft: "130px",
                          marginTop: "30px",
                          fontStyle: "italic",
                          cursor: "pointer",
                        }}
                        _hover={{ color: "#A210C6" }}
                      >
                        View reports
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </VStack>
        )}
        {loading ? (
          <Skeleton height="100vh" width="25%" />
        ) : (
          //  Third Section (Right)
          <VStack bg="#F6E4FC" width="25%" spacing={3} h="100vh">
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
            <Box marginLeft="90px" marginTop="10px">
              <Box>
                {user?.image ? (
                  <Link onClick={handleOpenUserDetailsModal}>
                    <Image
                      borderRadius="8px"
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
                <Box marginLeft="-85px" marginTop="10px">
                  <Link onClick={handleOpenUserDetailsModal}>
                    <Text
                      fontSize="18px"
                      style={{
                        cursor: "pointer",
                      }}
                      _hover={{ color: "#A210C6" }}
                      color="#A210C6"
                    >
                      <Text>Profile</Text>
                    </Text>
                  </Link>
                </Box>
              </Box>

              <Box
                marginLeft="-85px"
                marginTop="20px"
                borderRadius="10px"
                h="45vh"
                w="20vw"
              >
                <Box paddingTop="5px" bg="white" borderRadius="10" h="25vh">
                  <Text
                    fontSize="20px"
                    fontFamily="body"
                    color="#A210C6"
                    marginTop="20px"
                    marginLeft="20px"
                  >
                    Activity Log
                  </Text>
                  <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>
                    <li style={{ listStyleType: "none" }}>
                      <Text>No. of booking: 0</Text>
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      <Text>No. of care received: 0</Text>
                    </li>
                  </ul>
                </Box>

                <Box marginTop="10px" bg="white" borderRadius="10" h="25vh">
                  <Text
                    fontSize="20px"
                    fontFamily="body"
                    color="#A210C6"
                    marginTop="30px"
                    marginLeft="20px"
                  >
                    Appointments
                  </Text>
                  <Text
                    style={{
                      fontStyle: "italic",
                    }}
                  >
                    You have no appointment at the moment:{" "}
                  </Text>
                </Box>
              </Box>
            </Box>

            <SettingsModal
              isOpen={showSettingsModal}
              onClose={handleCloseSettingsModal}
            />

            <HelpModal isOpen={showHelpModal} onClose={handleCloseHelpModal} />
            {/* <UserModal isOpen={showUserModal} onClose={handleCloseUserModal} /> */}
          </VStack>
        )}
        {showAppointmentPage && (
          <Box
            position="fixed"
            top="0"
            left="25%"
            width="75%"
            height="100%"
            backgroundColor="white"
            zIndex="1000"
          >
            <AppointmentPage />
          </Box>
        )}

        {/* {showDashboard && <AppointmentPage />} */}
      </Flex>
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={handleCloseUserDetailsModal}
        defaultImage={userImageIcon}
      />
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />
    </ChakraProvider>
  );
};

export default ClientDash;
