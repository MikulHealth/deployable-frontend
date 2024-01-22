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

const CanceledAppointmentsModal = ({ isOpen, onClose }) => {
  const [canceledAppointments, setCanceledAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedCanceledAppointment, setSelectedCanceledAppointment] = useState(null);

  useEffect(() => {
    const fetchCanceledAppointments = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8080/v1/appointment/canceledAppointments",
          config
        );

        if (response.data.success) {
          toast({
            title: "Canceled appointments fetched successfully",
            status: "success",
            duration: 6000,
          });
          setCanceledAppointments(response.data.data);
        } else {
          toast({
            title: "Request failed",
            description: response.message,
            status: "error",
            duration: 6000,
          });
          console.error("Failed to fetch canceled appointments");
        }
      } catch (error) {
        console.error("Error fetching canceled appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCanceledAppointments();
    }
  }, [isOpen]);

  const handleViewDetails = (id) => {
    const selectedAppointment = canceledAppointments.find((appointment) => appointment.id === id);
    setSelectedCanceledAppointment(selectedAppointment);
    setDetailsModalOpen(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md" borderRadius="0px">
        <ModalOverlay />
        <ModalContent maxH="80vh" overflowY="auto">
          <ModalHeader color="#A210C6">Canceled Appointments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Flex align="center" justify="center" height="200px">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <VStack align="start" spacing={4}>
                {canceledAppointments.map((appointment) => (
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
                        Canceled on:
                      </Text>
                      <Text marginLeft="5px" color="black">
                        {formatDateTime(appointment.canceledAt)}
                      </Text>
                    </Flex>
                    <Flex>
                      {/* <Button
                        marginLeft="280px"
                        color="white"
                        bg="gray"
                        onClick={() => handleViewDetails(appointment.id)}
                      >
                        Details
                      </Button> */}
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

      {/* CanceledAppointmentDetailsModal */}
      {/* {detailsModalOpen && (
        <CanceledAppointmentDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          appointment={selectedCanceledAppointment}
        />
      )} */}
    </>
  );
};

export default CanceledAppointmentsModal;

// Helper function to format date and time
const formatDateTime = (dateTimeString) => {
  const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
  return new Date(dateTimeString).toLocaleDateString(undefined, options);
};
