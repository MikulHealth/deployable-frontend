import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../../apiCalls/UserApis";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/userSlice";
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
import HelppIcon from "../../assets/HelppIcon.svg";
import serviceIcon from "../../assets/ServiceIcon.svg";
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
import HelpModal from "../sections/Help";
import BeneficiariesModal from "../sections/Beneficiaries";
import UserDetailsModal from "../sections/UserDetails";
import ServicesPage from "./Services";
import ServicesModal from "../sections/ServicePageModal";
import { Link } from "react-router-dom";
import LogoutModal from "../sections/LogoutModal";
import LoadingSpinner from "../../utils/Spiner";
import FundWalletModal from "../sections/Wallet";

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
  const [isBeneficiariesModalOpen, setBeneficiariesModalOpen] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
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
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

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

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  const handleOpenAppointmentModal = () => {
    setShowAppointmentModal(true);
  };

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
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
          setShowSkeleton(false);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const handleOpenSettingsModal = () => {
    navigate("/settings");
  };

  const handleOpenWalletModal = () => {
    navigate("/wallet");
  };

  const help = () => {
    navigate("/help");
  };

  const handleOpenDashboard = () => {
    navigate("/dashboard");
    // window.location.reload();
  };

  const handleOpenHelpModal = () => {
    setShowHelpModal(true);
  };

  const handleCloseHelpModal = () => {
    setShowHelpModal(false);
  };

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Flex overflowY="scroll" height="100vh">
        <Box width="25%" p={3} color="white" h="100vh">
          <Image
            src={logo}
            alt="Logo"
            w="160px"
            h="60px"
            marginLeft="90px"
            marginTop="10px"
            onClick={reloadPage}
            style={{
              cursor: "pointer",
            }}
            _hover={{ color: "" }}
          />

          <VStack spacing={3} align="center" mt={5}>
            <Flex
              marginTop="50px"
              p={3}
              borderRadius="md"
              bg="#A210C6"
              w="15vw"
            >
              <Image
                marginLeft="37px"
                w="20px"
                h="20px"
                src={HelpIcon}
                alt="HelpIcon"
              />

              <Text
                onClick={() => {
                  handleOpenDashboard();
                }}
                style={{
                  cursor: "pointer",
                }}
                _hover={{ color: "white" }}
                marginLeft="15px"
                color="white"
                fontSize="18px"
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
                onClick={() => {
                  handleOpenAppointmentsModal();
                }}
                style={{
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
                fontSize="18px"
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
                fontSize="18px"
              >
                Wallet
              </Text>
            </Flex>

            <Flex alignItems="center" marginTop="30px" marginLeft="-46px">
              <Image
                marginLeft="8px"
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
                fontSize="18px"
              >
                Settings
              </Text>
            </Flex>

            <Flex alignItems="center" marginTop="30px" marginLeft="-60px">
              <Image
                marginLeft="15px"
                w="20px"
                h="20px"
                src={serviceIcon}
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
                fontSize="18px"
              >
                Service
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
                fontSize="18px"
              >
                Logout
              </Text>
            </Flex>
          </VStack>
          <Box
            borderRight="2px solid #A210C6"
            height="104%"
            marginX={3}
            marginTop="-620px"
          />
        </Box>
        {showSkeleton ? (
          <Skeleton marginLeft="-25px" height="100vh" width="50%" />
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
                  bg="#A210C6"
                  w="50vw"
                  h="25vh"
                  borderRadius="20px"
                >
                  {" "}
                  <Box marginLeft="-460px" paddingTop="5px">
                    <Text
                      fontSize="14px"
                      fontFamily="body"
                      color="white"
                      marginTop="10px"
                      style={{ marginLeft: "5px" }}
                    >
                      Mikul Health Savings Account
                    </Text>
                    <Text color="white" fontSize="12px" marginLeft="-130px">
                      ₦{balance.toFixed(2)}
                    </Text>
                  </Box>
                  <Flex marginLeft="10px" marginTop="45px">
                    <Box w="15vw" color="white" marginTop="5px">
                      <Text marginLeft="-120px" fontSize="12px">
                        Wallet ID:
                      </Text>
                      <Text fontSize="16px">Wema Bank 0124536789</Text>
                    </Box>
                    <Flex marginLeft="250px">
                      <Box w="8vw" color="white">
                        <Text fontSize="14px">Total funded</Text>
                        <Text color="white" fontSize="12px" marginLeft="-44px">
                          ₦{balance.toFixed(2)}
                        </Text>
                      </Box>
                      <Box w="8vw" color="white" marginLeft="10px">
                        <Text fontSize="14px">Total spent</Text>
                        <Text color="white" fontSize="12px" marginLeft="-34px">
                          ₦{balance.toFixed(2)}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
                <Box>
                  <Button
                    borderRadius="15px"
                    color="#A210C6"
                    marginLeft="520px"
                    marginTop="-270px"
                    onClick={handleOpenWalletModal}
                    bg="white"
                  >
                    Open wallet
                  </Button>
                </Box>

                <Box marginTop="-8px">
                  <Box display="flex">
                    <Box bg="#F6E4FC" w="24.5vw" h="20vh" borderRadius="10px">
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
                  <Box display="flex" marginTop="15px">
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
                      bg="#F6E4FC"
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
        {showSkeleton ? (
          <Skeleton marginLeft="5px" height="100vh" width="25%" />
        ) : (
          //  Third Section (Right)
          <VStack width="25%" spacing={3} h="100vh">
            <Box marginLeft="90px" marginTop="10px">
              <Flex marginLeft="50px">
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
                marginTop="75px"
                borderRadius="10px"
                h="40vh"
                w="20vw"
              >
                <Box paddingTop="5px" bg="#F6E4FC" borderRadius="10" h="25vh">
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
                          cursor: "pointer",
                          fontSize: "14px",
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
                          cursor: "pointer",
                          fontSize: "14px",
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

                          cursor: "pointer",
                          fontSize: "14px",
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
              <Box marginLeft="140px" marginTop="-330px">
                <Image
                onClick={help}
                  src={HelppIcon}
                  alt="Logo"
                  w="70px"
                  h="70px"
                  style={{
                    cursor: "pointer",
                    animation: "zoomInOut 2s infinite alternate", // 2 seconds duration, infinite loop
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

            <BeneficiariesModal
              isOpen={isBeneficiariesModalOpen}
              onClose={() => setBeneficiariesModalOpen(false)}
            />

            <HelpModal isOpen={showHelpModal} onClose={handleCloseHelpModal} />
          </VStack>
        )}
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
