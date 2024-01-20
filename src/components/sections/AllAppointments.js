import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import axios from "axios";

const AppointmentModal = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

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

  const fetchAppointmentDetails = async (appointmentId) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = `http://localhost:8080/v1/appointment/findAppointmentDetails/${appointmentId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });

      if (response && response.data) {
        console.log("Appointment details:", response.data.data);
        setSelectedAppointment(response.data.data);
        setDetailsModalOpen(true); // Open the details modal
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

  const handleViewMore = (id) => {
    fetchAppointmentDetails(id);
    onClose(); // Close the initial modal
    console.log(`View more details for appointment with ID: ${id}`);
  };

  const handleBackToAllAppointments = () => {
    setDetailsModalOpen(false);
    setTimeout(() => {
        onClose(); // This will open the main appointments modal
        // If you want to fetch appointment details again, you may need to pass the appointment ID to this function.
        // fetchAppointmentDetails(appointmentId);
      }, 100);
  };


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md" borderRadius="0px">
        <ModalOverlay />
        <ModalContent maxH="80vh" overflowY="auto">
          <ModalHeader color="#A210C6">All your appointments.</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                        Created on:
                      </Text>
                      <Text marginLeft="5px" color="black">
                        {formatDate(appointment.createdAt)}
                      </Text>
                    </Flex>
                    <Button
                      marginLeft="280px"
                      color="white"
                      bg="gray"
                      onClick={() => handleViewMore(appointment.id)}
                    >
                      View More
                    </Button>
                  </Box>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button marginRight="280px" colorScheme="red" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {detailsModalOpen && selectedAppointment && (
        <Modal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} size="md" borderRadius="0px">
          <ModalOverlay />
          <ModalContent maxH="80vh" overflowY="auto">
            <ModalHeader color="#A210C6">Appointment Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Flex>
                  <Text fontWeight="bold" color="black">
                    Care beneficiary:
                  </Text>
                  <Text marginLeft="5px" color="black">
                    {`${selectedAppointment.recipientFirstname} ${selectedAppointment.recipientLastname}`}
                  </Text>
                </Flex>
                <Box marginTop="4">
              <Text fontWeight="bold" color="black">
                Care beneficiary:
              </Text>
              <Text color="black">
                {`${selectedAppointment.recipientFirstname} ${selectedAppointment.recipientLastname}`}
              </Text>

              <Text fontWeight="bold" color="black">
                Phone Number:
              </Text>
              <Text color="black">
                {selectedAppointment.recipientPhoneNumber}
              </Text>

              <Text fontWeight="bold" color="black">
                Gender:
              </Text>
              <Text color="black">{selectedAppointment.recipientGender}</Text>

              <Text fontWeight="bold" color="black">
                Date of Birth:
              </Text>
              <Text color="black">
                {selectedAppointment.recipientDOB}
              </Text>

              <Text fontWeight="bold" color="black">
                Image:
              </Text>
              <Text color="black">{selectedAppointment.recipientImage}</Text>

              <Text fontWeight="bold" color="black">
                Current Location:
              </Text>
              <Text color="black">
                {selectedAppointment.currentLocation}
              </Text>

              <Text fontWeight="bold" color="black">
                Doctor:
              </Text>
              <Text color="black">
                {selectedAppointment.recipientDoctor}
              </Text>

              <Text fontWeight="bold" color="black">
                Hospital:
              </Text>
              <Text color="black">
                {selectedAppointment.recipientHospital}
              </Text>

              <Text fontWeight="bold" color="black">
                Health History:
              </Text>
              <Text color="black">
                {selectedAppointment.recipientHealthHistory}
              </Text>

              <Text fontWeight="bold" color="black">
                Start Date:
              </Text>
              <Text color="black">
                {selectedAppointment.startDate}
              </Text>

              <Text fontWeight="bold" color="black">
                End Date:
              </Text>
              <Text color="black">
                {selectedAppointment.endDate}
              </Text>

              <Text fontWeight="bold" color="black">
                Medical Report:
              </Text>
              <Text color="black">
                {selectedAppointment.medicalReport}
              </Text>

              <Text fontWeight="bold" color="black">
                Created At:
              </Text>
              <Text color="black">
                {selectedAppointment.createdAt}
              </Text>

              <Text fontWeight="bold" color="black">
                Accepted:
              </Text>
              <Text color="black">
              {/* {selectedAppointment.isAccepted ? selectedAppointment.isAccepted.toString() : 'N/A'} */}
              </Text>
            </Box>
                <Button
                  marginTop="4"
                  colorScheme="blue"
                  onClick={handleBackToAllAppointments}
                >
                  Back to All Appointments
                </Button>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default AppointmentModal;
