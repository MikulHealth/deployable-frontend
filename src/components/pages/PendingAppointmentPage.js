import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookAppointmentModal from "../sections/BookAppointment";
import CanceledAppointmentsModal from "../sections/CanceledAppointments";
import Help from "../../assets/Help.svg";
import axios from "axios";
import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Input,
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
  extendTheme,
  Link,
  FormControl,
  Divider,
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
import HomeIcon from "../../assets/HomeBlack.svg";
import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";
import HelppIcon from "../../assets/HelppIcon.svg";
import serviceIcon from "../../assets/ServiceIcon.svg";

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

const PendingAppointmentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showViewAllModal, setShowViewAllModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showCanceledModal, setShowCanceledModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showSearchAppointmentsModal, setShowSearchAppointmentsModal] =
    useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState(null);

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
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

  const help = () => {
    navigate("/help");
  };

  const handleOpenSettingsModal = () => {
    navigate("/settings");
  };

  const Services = () => {
    navigate("/services");
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleCancelAppointment = (appointmentId) => {
    setCancellingAppointmentId(appointmentId);
    setConfirmationModalOpen(true);
  };

  const handleCancelModalClose = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
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

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await axios.get(
        "http://localhost:8080/v1/appointment/pendingAppointments",
        config
      );

      if (response.data.success) {
        setPendingAppointments(response.data.data);
      } else {
        console.error("Failed to fetch appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [toast]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const fetchAndDisplayAppointmentDetails = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/findPendingAppointmentDetails/${appointmentId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });

      if (response && response.data && response.data.success) {
        console.log("Appointment details:", response.data.data);
        setSelectedAppointment(response.data.data.data);
        setDetailsModalOpen(true);
      } else {
        console.error("Error fetching appointment details");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching appointment details:",
        error
      );
    }
  };

  const handleConfirmation = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/cancelAppointment/${cancellingAppointmentId}`;

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

  const handleViewMore = async (id) => {
    await fetchAndDisplayAppointmentDetails(id);
    console.log(`View more details for appointment with ID: ${id}`);
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

  const handleOpenDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <ChakraProvider theme={customTheme}>
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
          <Flex marginTop="50px" alignItems="center">
            <Image
              marginLeft="-45px"
              w="20px"
              h="20px"
              src={HomeIcon}
              alt="HomeIcon"
            />

            <Text
              marginLeft="14px"
              color="black"
              onClick={() => {
                handleOpenDashboard();
              }}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
              fontSize="18px"
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
              marginLeft="25px"
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
              fontSize="18px"
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
              fontSize="18px"
            >
              Wallet
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px" marginLeft="-60px">
            <Image
              marginLeft="23px"
              w="20px"
              h="20px"
              src={serviceIcon}
              alt="Help"
            />
            <Text
              marginLeft="15px"
              color="black"
              onClick={Services}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
              fontSize="18px"
            >
              Service
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px" marginLeft="-46px">
            <Image
              marginLeft="18px"
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
              fontSize="18px"
            >
              Settings
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
            fontSize="28px"
            fontFamily="heading"
            color="#A210C6"
            marginLeft="30px"
            marginTop="30px"
          >
            Appointments
          </Text>
          <Flex
            marginLeft="700px"
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

        <Box
          marginLeft="15px"
          marginTop="30px"
          border="1px solid gray"
          borderRadius="md"
          padding="3px"
          w="70vw"
        >
          <Flex marginLeft="10px">
            <SearchIcon boxSize={4} marginRight="10px" marginTop="5px" />
            <Text
              fontSize="16px"
              fontFamily="body"
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
          marginTop="20px"
          marginLeft="15px"
          bg="#A210C6"
          w="70vw"
          h="30vh"
          borderRadius="20px"
          display="flex"
        >
          <Box marginLeft="-30px" color="white">
            <Text
              fontSize="20px"
              fontFamily="heading"
              marginTop="15px"
              marginLeft="-60px"
            >
              Hello {user?.firstName},
            </Text>
            <Text
              fontFamily="body"
              fontSize="15px"
              marginLeft="83px"
              marginTop="5px"
            >
              Would you like to book an appointment
            </Text>
            <Text
              fontFamily="body"
              fontSize="15px"
              marginTop="2px"
              marginLeft="6px"
            >
              for yourself or a loved one?
            </Text>

            <Button
              onClick={handleOpenAppointmentModal}
              bg="white"
              color="#A210C6"
              fontFamily="body"
              marginTop="30px"
              _hover={{ color: "" }}
              marginLeft="-70px"
              borderRadius="100px"
            >
              Book now
            </Button>
          </Box>
          <Box>
            <Image
              src={familyIcon}
              alt="family icon"
              h="150px"
              w="150px"
              marginTop="20px"
              marginBottom="10px"
              marginLeft="400px"
            />
          </Box>
        </Flex>

        <Box marginLeft="-10px">
          <Flex marginTop="30px">
            <Text
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
              marginLeft="30px"
              onClick={handleOpenAppointmentsModal}
            >
              All
            </Text>{" "}
            <Text
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                textDecorationThickness: "5px",
              }}
              _hover={{ color: "#A210C6" }}
              marginLeft="50px"
            >
              Pending
            </Text>{" "}
            <Text
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
              marginLeft="50px"
            >
              Active
            </Text>
            <Text
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
              marginLeft="50px"
            >
              Completed
            </Text>
          </Flex>
          <Divider
            marginTop="-10%"
            marginLeft="2%"
            my={4}
            borderColor="gray.500"
            width="60%"
          />
          <Box
            className="all-appointment"
            marginLeft="2%"
            w="40vw"
            h="30vh"
            overflow="scroll"
          >
            {loading ? (
              <LoadingSpinner />
            ) : pendingAppointments.length === 0 ? (
              <Text>
                You have no appointments yet. Click{" "}
                <Button onClick={handleOpenAppointmentModal}>Book now</Button>{" "}
                to begin.
              </Text>
            ) : (
              <VStack align="start" spacing={4}>
                {pendingAppointments.map((appointment) => (
                  <Box key={appointment.id}>
                    <Flex>
                      <Text fontWeight="bold" color="black">
                        Care beneficiary:
                      </Text>
                      <Text marginLeft="5px" color="black">
                        {`${appointment.appointment.recipientFirstname} ${appointment.appointment.recipientLastname}`}
                      </Text>
                    </Flex>
                    <Flex >
                      <Text fontWeight="bold" color="black">
                        Booked on:
                      </Text>
                      <Text marginLeft="5px" color="black">
                        {formatDateTime(appointment.createdAt)}
                      </Text>
                      <Text
                        marginLeft="40px"
                        fontSize="16px"
                        onClick={() => handleViewMore(appointment.id)}
                        style={{
                          color: "#A210C6",
                          fontStyle: "italic",
                          cursor: "pointer",
                        }}
                        _hover={{ color: "#A210C6" }}
                      >
                        Details
                      </Text>
                      <Text
                        marginLeft="40px"
                        fontSize="16px"
                        onClick={() => handleCancelAppointment(appointment.id)}
                        style={{
                          color: "red",
                          fontStyle: "italic",
                          cursor: "pointer",
                        }}
                        _hover={{ color: "#A210C6" }}
                      >
                        Cancel
                      </Text>
                    </Flex>

                    <Divider my={4} borderColor="gray.500" />
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </Box>
        <Box marginLeft="900px" marginTop="-60px">
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
      <BookAppointmentModal
        isOpen={showAppointmentModal}
        onClose={handleCloseAppointmentModal}
      />
      <CanceledAppointmentsModal
        isOpen={showCanceledModal}
        onClose={() => setShowCanceledModal(false)}
      />
      <SearchAppointmentsModal
        isOpen={showSearchAppointmentsModal}
        onClose={handleCloseSearchAppointmentsModal}
      />

      {detailsModalOpen && selectedAppointment && (
        <Modal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          size="3xl"
        >
          <ModalOverlay />
          <ModalContent overflowY="auto">
            <ModalHeader color="#A210C6">Appointment Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Progress size="xs" isIndeterminate />
              <Flex marginLeft="30px">
                <Box>
                  <Flex>
                    <Box marginRight="20px">
                      <Flex>
                        <Text fontWeight="bold" color="black">
                          Care beneficiary:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.recipientFirstname &&
                          selectedAppointment.recipientLastname
                            ? `${selectedAppointment.recipientFirstname} ${selectedAppointment.recipientLastname}`
                            : "Not available"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Phone Number:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.recipientPhoneNumber ||
                            "Not available"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Gender:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.recipientGender ||
                            "Not available"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Date of Birth:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {formatDate(selectedAppointment.recipientDOB) ||
                            "Not available"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Current Location:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.currentLocation ||
                            "Not availabe"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Next of kin name:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.kinName || "Not available"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Next of kin number:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.kinNumber || "Not availabe"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Language:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.language || "Not available"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Relationship:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.relationship || "Not availabe"}
                        </Text>
                      </Flex>
                      <Flex marginTop="5px" marginBottom="10px">
                        <Text fontWeight="bold" color="black">
                          Booked on:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {formatDateTime(selectedAppointment.createdAt)}
                        </Text>
                      </Flex>
                    </Box>

                    <Box marginLeft="30px">
                      <Flex marginTop="2px">
                        <Text fontWeight="bold" color="black">
                          Shift:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.shift || "Not availabe"}
                        </Text>
                      </Flex>
                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Hospital:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.recipientHospital ||
                            "Not availabe"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Service Plan
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.servicePlan || "Not availabe"}
                        </Text>
                      </Flex>
                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Cost of service
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.costOfService || "Not availabe"}
                        </Text>
                      </Flex>
                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Start Date:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {formatDate(selectedAppointment.startDate) ||
                            "Not availabe"}
                        </Text>
                      </Flex>
                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          End Date:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {formatDate(selectedAppointment.endDate) ||
                            "Not availabe"}
                        </Text>
                      </Flex>
                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Medical Report:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.medicalReport || "Not availabe"}
                        </Text>
                      </Flex>
                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Paid:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.paid ? "Yes" : "No"}
                        </Text>
                      </Flex>

                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Health History:
                        </Text>
                        <Text
                          marginLeft="5px"
                          color="black"
                          maxW="300px"
                          maxH="1000px"
                        >
                          {selectedAppointment.recipientHealthHistory ||
                            "Not available"}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

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
            <ModalBody>
              Are you sure you want to cancel this appointment?
            </ModalBody>
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
    </ChakraProvider>
  );
};

export default PendingAppointmentPage;
