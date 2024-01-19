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
} from "@chakra-ui/react";
import axios from "axios";

const AppointmentModal = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState([]);

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
          setAppointments(response.data.data);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
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

  const handleViewMore = (id) => {
    // Implement logic to show more details for the selected appointment
    console.log(`View more details for appointment with ID: ${id}`);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" borderRadius="0px">
      <ModalOverlay />
      <ModalContent maxH="80vh" overflowY="auto">
        <ModalHeader color="#A210C6">All your appointments.</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
                  <Text marginLeft="5px" color="black">{formatDate(appointment.createdAt)}</Text>
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
        </ModalBody>
        <ModalFooter>
          <Button marginRight="280px" colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppointmentModal;
