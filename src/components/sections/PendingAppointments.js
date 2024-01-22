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
            title: "Pending appointments fetched successfully",
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
    // onClose(); // Close the initial modal
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
        // Optionally, you can refresh the pending appointments list after canceling
        // fetchPendingAppointments();
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
          <ModalBody marginLeft="25px">
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
                        Created on:
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
                      <Button
                        marginLeft="8px"
                        colorScheme="red"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        Cancel Appointment
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            {/* <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {detailsModalOpen && selectedAppointment && (
        <Modal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          size="xl"
          marginTop="-10px"
        >
          <ModalOverlay />
          <ModalContent overflowY="auto">
            <ModalHeader color="#A210C6">Appointment Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
                      {selectedAppointment.recipientGender || "Not available"}
                    </Text>
                  </Flex>

                  <Flex marginTop="5px">
                    <Text fontWeight="bold" color="black">
                      Date of Birth:
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {formatDate(selectedAppointment.DOB) || "Not available"}
                    </Text>
                  </Flex>

                  <Flex marginTop="5px">
                    <Text fontWeight="bold" color="black">
                      Current Location:
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {selectedAppointment.currentLocation || "Not availabe"}
                    </Text>
                  </Flex>
                  <Flex marginTop="5px">
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
                      {selectedAppointment.recipientDoctor || "Not availabe"}
                    </Text>
                  </Flex>
                  <Flex marginTop="5px">
                    <Text fontWeight="bold" color="black">
                      Doctor's phone number:
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {selectedAppointment.recipientPhoneNumber || "Not availabe"}
                    </Text>
                  </Flex>
                  <Flex marginTop="5px">
                    <Text fontWeight="bold" color="black">
                      Hospital:
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {selectedAppointment.recipientHospital || "Not availabe"}
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
                  <Flex marginTop="5px">
                    <Text fontWeight="bold" color="black">
                      Created on:
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {formatDateTime(selectedAppointment.createdAt)}
                    </Text>
                  </Flex>

                  <Flex>
                    {/* <Button
                      marginTop="4px"
                      colorScheme="blue"
                      onClick={handleBackToAllAppointments}
                    >
                      All appointments
                    </Button> */}

                    <Button
                      marginTop="4px"
                      marginLeft="4px"
                      colorScheme="blue"
                      onClick={() =>
                        handleEditAppointment(selectedAppointment.id)
                      }
                    >
                      Edit appointment
                    </Button>
                  </Flex>
                </Box>
                <Box marginLeft="5px">
                  {selectedAppointment?.image ? (
                    <Image
                      borderRadius="8px"
                      h="35vh"
                      w="15vw"
                      src={selectedAppointment?.image}
                      alt="Image"
                    />
                  ) : (
                    <Image
                      src={userImageIcon}
                      alt="Image Icon"
                      boxSize="50px"
                      marginBottom="2%"
                      h="35vh"
                      w="15vw"
                      borderRadius="50%"
                    />
                  )}
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
          // Handle the API call to save the edited appointment
          // Update your state or trigger a refetch of appointments
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
              <Button
                colorScheme="red"
               
                onClick={handleCancelModalClose}
              >
                No
              </Button>
              <Button  marginLeft="5px" onClick={handleConfirmation}>Yes</Button>
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
