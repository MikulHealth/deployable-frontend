import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RightArrow from "../../assets/RightArrow.svg";
import Help from "../../assets/Help.svg";
import axios from "axios";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Progress,
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
import CustomizeServiceModal from "../sections/CustomizeServiceModal";

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

const CustomizeServicePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [customizedServices, setCustomizedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

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

  const handlebackToService = () => {
    navigate("/services");
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

  const handleOpenCustomizeModal = () => {
    navigate("/dashboard");
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  const handleCancelModalClose = () => {
    setConfirmationModalOpen(false);
  };

  const handleConfirmation = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/deleteService/${deleteServiceId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(apiUrl, {}, { headers });

      if (response.data.success) {
        toast({
          title: response.data.message,
          status: "success",
          duration: 6000,
        });
        fetchData();
      } else {
        toast({
          title: "Error canceling appointment",
          description: response.data.message,
          status: "error",
          duration: 6000,
        });
        console.error("Error canceling appointment");
      }
    } catch (error) {
      console.error("An error occurred while canceling appointment:", error);
    } finally {
      setConfirmationModalOpen(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleDeleteService = (serviceId) => {
    setDeleteServiceId(serviceId);
    setConfirmationModalOpen(true);
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formattedDateTime = new Date(dateTimeString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDateTime;
  };

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(
        "http://localhost:8080/v1/appointment/all-customized-services",
        config
      );

      if (response.data.success) {
        setCustomizedServices(response.data.data);
      } else {
        console.error("Failed to fetch custom services");
      }
    } catch (error) {
      console.error("Error fetching custom services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [toast]);

  const handleOpenCustomizePlanFormModal = () => {
    setShowCustomizeModal(true);
  };

  const handleCloseAppointmentModal = () => {
    setShowCustomizeModal(false);
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
            marginLeft="30px"
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
        <Box w="70vw" h="80vh">
          <Flex>
            <Box>
              <Text fontSize="18px" marginLeft="30px" marginTop="5px">
                Welcome to the custom service section! Here, you have the
              </Text>
              <Text fontSize="18px" marginLeft="10px" marginTop="3px" marginBottom="20px">
                flexibility to tailor services according to your preferences.
              </Text>
            </Box>
            <Button
              onClick={handlebackToService}
              borderColor="#A210C6"
              borderWidth="1px"
              color="#A210C6"
              fontFamily="body"
              marginTop="10px"
              _hover={{ color: "" }}
              marginLeft="200px"
              borderRadius="100px"
            >
              Back to other services
            </Button>
          </Flex>

          <Box
            className="all-customized-services"
            marginLeft="2%"
            w="64vw"
            h="75vh"
            overflow="scroll"
            marginTop="10px"
          >
            {loading ? (
              <LoadingSpinner />
            ) : customizedServices.length === 0 ? (
              <Flex alignItems="center">
                <Text marginLeft="60px" marginTop="30px">
                  You have no customized plan yet. Click{" "}
                </Text>
                <Text
                  style={{
                    color: "#A210C6",
                    fontStyle: "italic",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  marginTop="30px"
                  marginLeft="5px"
                  onClick={handleOpenCustomizePlanFormModal}
                >
                  customize service
                </Text>
                <Text marginLeft="5px" marginTop="30px">
                  to begin.
                </Text>
              </Flex>
            ) : (
              <VStack marginTop="10px" align="start" spacing={4}>
                {customizedServices.map((service) => (
                  <Box marginTop="20px" key={service.id}>
                    <Box
                      padding="40px"
                      style={{
                        cursor: "pointer",
                        // boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                      }}
                      borderColor="#A210C6"
                      borderWidth="2px"
                      p={4}
                      borderRadius="2xl"
                      // h="50vh"
                      w="40vw"
                    >
                      <Box>
                        <Box marginLeft="90px">
                          <Flex>
                            <Text fontWeight="bold" color="black">
                              Name:
                            </Text>
                            <Text marginLeft="5px" color="black">
                              {`${service.name}`}
                            </Text>

                            <Flex marginLeft="45px">
                              <Text fontWeight="bold" color="black">
                                Frequency:
                              </Text>
                              <Text marginLeft="5px" color="black">
                                {`${service.frequency}`}
                              </Text>
                            </Flex>
                          </Flex>
                          <Flex>
                            <Flex>
                              <Text fontWeight="bold" color="black">
                                Duration:
                              </Text>
                              <Text marginLeft="5px" color="black">
                                {`${service.duration}`}
                              </Text>
                            </Flex>
                            <Flex marginLeft="85px">
                              <Text fontWeight="bold" color="black">
                                Shift:
                              </Text>
                              <Text marginLeft="5px" color="black">
                                {`${service.shift}`}
                              </Text>
                            </Flex>
                          </Flex>
                        </Box>
                      </Box>
                      <Box marginLeft="-25px" marginTop="3px">
                        <Flex direction="column">
                          <Text
                            fontWeight="bold"
                            color="black"
                            marginTop="10px"
                          >
                            Selected Services:
                          </Text>

                          {service.selectedServices.map((selectedService) => (
                            <Text ml="20px" key={selectedService} color="black">
                              {selectedService}
                            </Text>
                          ))}
                        </Flex>
                      </Box>

                      <Flex marginLeft="80px" marginTop="10px">
                        <Text fontWeight="bold" color="black">
                          Created on:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {formatDateTime(service.createdAt)}
                        </Text>
                      </Flex>
                      <Box marginLeft="-15px" marginTop="20px">
                        <Button
                          fontSize="16px"
                          // bg="#A210C6"
                          color="#A210C6"
                          onClick={handleOpenCustomizePlanFormModal}
                          style={{
                            fontStyle: "italic",
                            cursor: "pointer",
                          }}
                          _hover={{ color: "#A210C6" }}
                        >
                          Book plan
                        </Button>
                        <Button
                          marginLeft="120px"
                          fontSize="16px"
                          // bg="gray"
                          color="red"
                          onClick={() => handleDeleteService(service.id)}
                          style={{
                            fontStyle: "italic",
                            cursor: "pointer",
                          }}
                          _hover={{ color: "" }}
                        >
                          Delete plan
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Button
                  color="green"
                  marginTop="20px"
                  marginBottom="50px"
                  onClick={handleOpenCustomizePlanFormModal}
                >
                  Add another plan
                </Button>
              </VStack>
            )}
          </Box>
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
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={handleCloseUserDetailsModal}
      />
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
      />{" "}
      {confirmationModalOpen && (
        <Modal
          isOpen={confirmationModalOpen}
          onClose={handleCancelModalClose}
          size="md"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to delete this service?</ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleCancelModalClose}>
                No
              </Button>
              <Button marginLeft="5px" onClick={handleConfirmation}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <CustomizeServiceModal
        isOpen={showCustomizeModal}
        onClose={handleCloseAppointmentModal}
      />
    </ChakraProvider>
  );
};
export default CustomizeServicePage;
