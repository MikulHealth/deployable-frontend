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
import PendingAppointmentDetailsModal from "./PendingAppointmentDetailsModal"; // Import your PendingAppointmentDetailsModal component
import ConfirmationModal from "./ConfirmationModal"; // Import your ConfirmationModal component

const PendingAppointmentModal = ({ isOpen, onClose }) => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [selectedPendingAppointment, setSelectedPendingAppointment] = useState(null);
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

  const handleViewDetails = (id) => {
    const selectedAppointment = pendingAppointments.find((appointment) => appointment.id === id);
    setSelectedPendingAppointment(selectedAppointment);
    setDetailsModalOpen(true);
  };

  const handleCancelAppointment = (appointmentId) => {
    setCancellingAppointmentId(appointmentId);
    setConfirmationModalOpen(true);
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
          <ModalBody>
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
                        onClick={() => handleViewDetails(appointment.id)}
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
            <Button colorScheme="purple" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* PendingAppointmentDetailsModal
      {detailsModalOpen && (
        <PendingAppointmentDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          appointment={selectedPendingAppointment}
        />
      )} */}

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
             <Button colorScheme="red"onClose={() => setConfirmationModalOpen(false)}>
               Confirm
             </Button>
             <Button marginLeft="5px" onClick={handleConfirmation}>Cancel</Button>
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
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
  return new Date(dateTimeString).toLocaleDateString(undefined, options);
};
