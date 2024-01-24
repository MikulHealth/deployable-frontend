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
  Image,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";

const AppointmentModal = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false); 
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8080/v1/appointment/allAppointments",
          config
        );

        if (response.data.success) {
          toast({
            title: "All appointments fetched successfully",
            status: "success",
            duration: 6000,
          });
          setAppointments(response.data.data);
        } else {
          toast({
            title: "Request failed",
            description: response.message,
            status: "error",
            duration: 6000,
          });
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

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
      const apiUrl = `http://localhost:8080/v1/appointment/findAppointmentDetails/${appointmentId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });

      if (response && response.data && response.data.success) {
        console.log("Appointment details:", response.data.data);
        // toast({
        //     title: "Deatils fetched successfully",
        //     description: response.data.message,
        //     status: "success",
        //     duration: 6000,
        //   });
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
  const handleViewMore = async (id) => {
    await fetchAndDisplayAppointmentDetails(id);
    onClose(); // Close the initial modal
    console.log(`View more details for appointment with ID: ${id}`);
  };

  const handleBackToAllAppointments = () => {
    setDetailsModalOpen(false);
    setTimeout(() => {
      onClose();
    }, 100);
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

  const handleEditAppointment = (appointmentId) => {
    setEditingAppointmentId(appointmentId);
    setEditModalOpen(true);
  };

  const handleCancelRequest = async (appointmentId) => {
    // Open the confirmation modal before canceling
    setConfirmationModalOpen(true);
    // Set the appointment ID to be canceled
    setEditingAppointmentId(appointmentId);
  };

  const handleCancelConfirmation = async () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);

    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/cancelAppointment/${editingAppointmentId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(apiUrl, {}, { headers });

      if (response && response.data && response.data.success) {
        toast({
          title: response.data.message,
          status: "success",
          duration: 6000,
        });
        // Optionally, you can refresh the appointments list after canceling
        // fetchData();
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
    }
  };

  const handleCancelModalClose = () => {
    // Close the confirmation modal
    setConfirmationModalOpen(false);
    // Clear the editing appointment ID
    setEditingAppointmentId(null);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md" borderRadius="0px">
        <ModalOverlay />
        <ModalContent maxH="80vh" overflowY="auto">
          <ModalHeader color="#A210C6">All your appointments.</ModalHeader>
          <ModalCloseButton />
          <ModalBody  marginLeft="15px">
            {loading ? (
              <Flex align="center" justify="center" height="200px">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <VStack align="start" spacing={4}>
                {appointments.map((appointment) => (
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
                    </Flex>
                    <Flex>
                      <Button
                        marginLeft="280px"
                        color="white"
                        bg="gray"
                        onClick={() => handleViewMore(appointment.id)}
                      >
                        Details
                      </Button>
                    </Flex>
                      <Divider my={4} borderColor="gray.500" /> 
                  </Box>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {detailsModalOpen && selectedAppointment && (
        <Modal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent overflowY="auto">
          <ModalHeader color="#A210C6">Appointment Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box>
                <Flex>
                  <Box>
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
                        Health History:
                      </Text>
                      <Text marginLeft="5px" color="black">
                        {selectedAppointment.recipientHealthHistory ||
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
                  </Box>
                </Flex>
              </Box>
              <Box marginLeft="55px">
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
    </>
  );
};

export default AppointmentModal;
