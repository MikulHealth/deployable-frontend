import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../../apiCalls/UserApis";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/userSlice";
import AppointmentPage from "./AppointmentPage";
import familyIcon from "../../assets/family.svg";
import BookAppointmentModal from "../sections/BookAppointment";
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
import Wallet from "../../assets/Wallet.svg";
import Help from "../../assets/Help.svg";
import SettingsIcon from "../../assets/SettingsIcon.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HelpIcon from "../../assets/HelpIcon.svg";
import userImageIcon from "../../assets/userImage.svg";
import NurseAndPatient from "../../assets/NurseAndPatient.svg";
import NotificationIcon from "../../assets/notification.svg";
import "../../styles/pages/LandingPage.css";
import SettingsModal from "../sections/Settings";
import WalletModal from "../sections/Wallet";
import HelpModal from "../sections/Help";
import BeneficiariesModal from "../sections/Beneficiaries";
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
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [isBeneficiariesModalOpen, setBeneficiariesModalOpen] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
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
  const pendingAppointments = user?.numberOfPendingAppointments;
  const activeAppointments = user?.numberOfActiveAppointments;
  const completedAppointments = user?.numberOfCompletedAppointments;
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showViewAllModal, setShowViewAllModal] = useState(false);

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

  const handleOpenAppointmentModal = () => {
    setShowAppointmentModal(true);
  };

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
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

  const handleBeneficiariesButtonClick = () => {
    setBeneficiariesModalOpen(true);
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

  const handleOpenWalletModal = () => {
    setShowWalletModal(true);
  };
  const handleCloseWalletModal = () => {
    setShowWalletModal(false);
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
          <Box width="25%" p={3} color="white" h="100vh">
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
                p={3}
                borderRadius="md"
                w="17vw"
                bg="#A210C6"
              >
                <Image
                  marginLeft="45px"
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
                  _hover={{ color: "white" }}
                  marginLeft="15px"
                  color="white"
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

              <Flex alignItems="center" marginTop="30px" marginLeft="-54px">
                <Image
                  marginLeft="10px"
                  w="20px"
                  h="20px"
                  src={Wallet}
                  alt="Settings"
                />
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

              <Flex alignItems="center" marginTop="30px" marginLeft="-60px">
                <Image
                  marginLeft="10px"
                  w="20px"
                  h="20px"
                  src={Help}
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
            <Box
              borderRight="2px solid #A210C6"
              height="104%"
              marginX={3}
              marginTop="-599px"
            />
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
                  bg="#D087E2"
                  w="50vw"
                  h="20vh"
                  borderRadius="10px"
                  display="flex"
                >
                  <Box>
                    {" "}
                    <Text
                      fontSize="20px"
                      fontFamily="body"
                      color="black"
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
                      color="#A210C6"
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
                    marginLeft="440px"
                    marginTop="18px"
                  />
                </Box>

                <Box>
                  <Box display="flex" marginTop="30px">
                    <Box bg="#F6C5FF" w="24.5vw" h="20vh" borderRadius="10px">
                      {" "}
                      <Text
                        fontSize="20px"
                        fontFamily="body"
                        color="black"
                        marginTop="10px"
                        style={{ marginLeft: "-80px" }}
                      >
                        Book Appointment
                      </Text>
                      <Text fontSize="16px" style={{ marginLeft: "-55px" }}>
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
                        color="#A210C6"
                        onClick={handleOpenAppointmentModal}
                        _hover={{ color: "#A210C6" }}
                      >
                        Book now
                      </Text>
                    </Box>
                    <Box
                      bg="#F6E4FC"
                      w="24.5vw"
                      h="20vh"
                      marginLeft="10px"
                      borderRadius="10px"
                      onClick={handleBeneficiariesButtonClick}
                    >
                      {" "}
                      <Text
                        fontSize="20px"
                        fontFamily="body"
                        color="black"
                        marginTop="10px"
                        style={{ marginLeft: "-130px" }}
                      >
                        Beneficiaries
                      </Text>
                      <Text fontSize="16px" style={{ marginLeft: "-45px" }}>
                        Your friends and loved ones
                      </Text>
                      <Text
                        fontSize="16px"
                        style={{
                          marginLeft: "130px",
                          marginTop: "30px",
                          fontStyle: "italic",
                          cursor: "pointer",
                        }}
                        color="#A210C6"
                        _hover={{ color: "#A210C6" }}
                      >
                        view all
                      </Text>
                    </Box>
                  </Box>
                  <Box display="flex" marginTop="30px">
                    <Box bg="#F6E4FC" w="24.5vw" h="20vh" borderRadius="10px">
                      {" "}
                      <Text
                        fontSize="20px"
                        fontFamily="body"
                        color="black"
                        marginTop="10px"
                        style={{ marginLeft: "-135px" }}
                      >
                        Our services
                      </Text>
                      <Text fontSize="16px" style={{ marginLeft: "-30px" }}>
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
                        color="#A210C6"
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
                      bg="#F6C5FF"
                      w="24.5vw"
                      h="20vh"
                      marginLeft="10px"
                      borderRadius="10px"
                    >
                      {" "}
                      <Text
                        fontSize="20px"
                        fontFamily="body"
                        color="black"
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
                        color="#A210C6"
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
          <VStack width="25%" spacing={3} h="100vh">
            <Box marginLeft="90px" marginTop="10px">
              <Flex marginLeft="50px">
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

              <Box
                marginLeft="-85px"
                marginTop="65px"
                borderRadius="10px"
                h="40vh"
                w="20vw"
              >
                <Box paddingTop="5px" bg="#F6C5FF" borderRadius="10" h="25vh">
                  <Text
                    fontSize="20px"
                    fontFamily="body"
                    color="black"
                    marginTop="20px"
                    marginLeft="20px"
                  >
                    Activity log in numbers
                  </Text>
                  <ul style={{ paddingLeft: "20px", marginTop: "7px" }}>
                    <li style={{ listStyleType: "none" }}>
                      <Text
                        marginLeft="-9px"
                        style={{
                          fontStyle: "italic",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                        color="black"
                        _hover={{ color: "#A210C6" }}
                      >
                        Pending appointments: {pendingAppointments}
                      </Text>
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      <Text
                        marginTop="5px"
                        marginLeft="-26px"
                        style={{
                          fontStyle: "italic",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                        color="black"
                        _hover={{ color: "#A210C6" }}
                      >
                        Active appointments: {activeAppointments}
                      </Text>
                    </li>
                    <li style={{ listStyleType: "none" }}>
                      <Text
                        marginTop="5px"
                        marginLeft="-32px"
                        style={{
                          marginLeft: "5px",
                          fontStyle: "italic",
                          cursor: "pointer",
                          fontSize: "16px",
                        }}
                        color="black"
                        _hover={{ color: "#A210C6" }}
                      >
                        Completed appointments: {completedAppointments}
                      </Text>
                    </li>
                  </ul>
                </Box>

                <Box marginTop="-28px" bg="#F6E4FC" borderRadius="10" h="43vh">
                  <Text
                    fontSize="20px"
                    fontFamily="body"
                    color="black"
                    marginTop="40px"
                    marginLeft="-75px"
                  >
                    Article title
                  </Text>
                  <Text
                    style={{
                      fontStyle: "italic",
                    }}
                  >
                    Lorem Ipsum Dolor Sit Amet{" "}
                  </Text>

                  <Image
                    src={familyIcon}
                    alt="Nurse and Patient"
                    w="150px"
                    h="150px"
                    marginLeft="70px"
                    marginTop="20px"
                  />
                  <Text
                    fontSize="18px"
                    style={{
                      marginLeft: "125px",
                      marginTop: "15px",
                      fontStyle: "italic",
                      cursor: "pointer",
                      color: "#A210C6",
                    }}
                    _hover={{ color: "#A210C6" }}
                  >
                    Read more
                  </Text>
                </Box>
              </Box>
            </Box>

            <SettingsModal
              isOpen={showSettingsModal}
              onClose={handleCloseSettingsModal}
            />
            <BeneficiariesModal
              isOpen={isBeneficiariesModalOpen}
              onClose={() => setBeneficiariesModalOpen(false)}
            />

            <HelpModal isOpen={showHelpModal} onClose={handleCloseHelpModal} />
            {/* <UserModal isOpen={showUserModal} onClose={handleCloseUserModal} /> */}
          </VStack>
        )}
        {showAppointmentPage && (
          <Box
            position="fixed"
            top="0"
            left="23%"
            width="80%"
            height="100%"
            backgroundColor="white"
            zIndex="1000"
          >
            <AppointmentPage />
          </Box>
        )}


        {showWalletModal && (
          <Box
            position="fixed"
            top="0"
            left="23%"
            width="80%"
            height="100%"
            backgroundColor="white"
            zIndex="1000"
          >
            <WalletModal />
          </Box>
        )}

        {/* {showDashboard && <AppointmentPage />} */}
      </Flex>
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={handleCloseUserDetailsModal}
        defaultImage={userImageIcon}
      />
      <BookAppointmentModal
        isOpen={showAppointmentModal}
        onClose={handleCloseAppointmentModal}
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
