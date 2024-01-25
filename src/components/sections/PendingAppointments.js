import React, { useState, useEffect } from "react";
import userImageIcon from "../../assets/userImage.svg";
import EditAppointmentModal from "../sections/EditAppointmentModal";
import {
  VStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Flex,
  Spinner,
  useToast,
  Progress,
  Image,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";

const PendingAppointmentModal = ({ isOpen, onClose }) => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [cancellingAppointmentId, setCancellingAppointmentId] = useState(null);

  const fetchPendingAppointments = async () => {
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
        toast({
          title: "Request failed",
          description: response.message,
          status: "error",
          duration: 6000,
        });
        console.error("Failed to fetch pending appointments");
      }
    } catch (error) {
      console.error("Error fetching pending appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPendingAppointments = async () => {
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
          toast({
            title: response.data.message,
            status: "success",
            duration: 6000,
          });
          setPendingAppointments(response.data.data);
        } else {
          toast({
            title: "Request failed",
            description: response.message,
            status: "error",
            duration: 6000,
          });
          console.error("Failed to fetch pending appointments");
        }
      } catch (error) {
        console.error("Error fetching pending appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPendingAppointments();
    }
  }, [isOpen]);

  const fetchAndDisplayAppointmentDetails = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/findAppointmentDetails/${appointmentId}`;

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
  const handleEditAppointment = (appointmentId) => {
    setEditingAppointmentId(appointmentId);
    setEditModalOpen(true);
  };

  const handleBackToAllAppointments = () => {
    setDetailsModalOpen(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleViewMore = async (id) => {
    await fetchAndDisplayAppointmentDetails(id);
    console.log(`View more details for appointment with ID: ${id}`);
  };

  const handleCancelAppointment = (appointmentId) => {
    setCancellingAppointmentId(appointmentId);
    setConfirmationModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleCancelModalClose = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
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
        fetchPendingAppointments();
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
      // Close the confirmation modal
      setConfirmationModalOpen(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" borderRadius="0px">
        <ModalOverlay />
        <ModalContent maxH="80vh" overflowY="auto">
          <ModalHeader color="#A210C6">Pending Appointments</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginLeft="50px">
            <Progress size="xs" isIndeterminate />
            {loading ? (
              <Flex align="center" justify="center" height="200px">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <VStack align="start" spacing={4}>
                {pendingAppointments.map((appointment) => (
                  <Box key={appointment.id}>
                    <Flex>
                      <Text fontWeight="bold" color="black">
                        Care beneficiary:
                      </Text>
                      <Text marginLeft="5px" color="black">
                        {`${appointment.recipientFirstname} ${appointment.recipientLastname}`}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text fontWeight="bold" color="black">
                        Booked on:
                      </Text>
                      <Text marginLeft="5px" color="black">
                        {formatDateTime(appointment.createdAt)}
                      </Text>
                      <Text
                        fontSize="16px"
                        onClick={() => handleViewMore(appointment.id)}
                        style={{
                          marginLeft: "60px",
                          color: "#A210C6",
                          fontStyle: "italic",
                          cursor: "pointer",
                        }}
                        _hover={{ color: "#A210C6" }}
                      >
                        Details
                      </Text>
                      <Text
                        fontSize="16px"
                        onClick={() => handleCancelAppointment(appointment.id)}
                        style={{
                          marginLeft: "60px",
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
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {detailsModalOpen && selectedAppointment && (
        <Modal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          size="6xl"
        >
          <ModalOverlay />
          <ModalContent overflowY="auto">
            <ModalHeader color="#A210C6">Appointment Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Progress size="xs" isIndeterminate />
              <Flex>
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
                          Doctor's name:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.recipientDoctor ||
                            "Not availabe"}
                        </Text>
                      </Flex>
                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          Doctor's phone number:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {selectedAppointment.recipientPhoneNumber ||
                            "Not availabe"}
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
                          {formatDateTime(selectedAppointment.startDate) ||
                            "Not availabe"}
                        </Text>
                      </Flex>
                      <Flex marginTop="5px">
                        <Text fontWeight="bold" color="black">
                          End Date:
                        </Text>
                        <Text marginLeft="5px" color="black">
                          {formatDateTime(selectedAppointment.endDate) ||
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
                <Box marginLeft="40px">
                  <Image
                    src={selectedAppointment?.recipientImage || userImageIcon}
                    alt="User Image"
                    borderRadius="8px"
                    h="40vh"
                    w="15vw"
                  />
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <EditAppointmentModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        appointmentId={editingAppointmentId}
        onSave={(editedAppointment) => {
          setEditModalOpen(false);
        }}
      />
      {/* ConfirmationModal */}

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
    </>
  );
};

export default PendingAppointmentModal;

// Helper function to format date and time
const formatDateTime = (dateTimeString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateTimeString).toLocaleDateString(undefined, options);
};
