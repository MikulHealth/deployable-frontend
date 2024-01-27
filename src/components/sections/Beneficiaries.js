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
  Progress,
  Spinner,
  useToast,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import AddBeneficiaryForm from "./AddBeneficiaryFom";
import BookBeneficiaryAppointmentModal from "./BeneficiaryAppForm";

const BeneficiariesModal = ({ isOpen, onClose }) => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [isAddBeneficiaryFormOpen, setAddBeneficiaryFormOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedBeneficiaryId, setSelectedBeneficiaryId] = useState(null);
  const [isBookAppointmentModalOpen, setBookAppointmentModalOpen] =
    useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);

  const handleRemoveBeneficiary = (beneficiaryId) => {
    setSelectedBeneficiaryId(beneficiaryId);
    setConfirmationModalOpen(true);
  };

  const handleOpenAddBeneficiaryForm = () => {
    setAddBeneficiaryFormOpen(true);
    // onClose();
  };

  const handleOpenBookAppointmentModal = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setBookAppointmentModalOpen(true);
  };

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:8080/v1/appointment/findAllBeneficiaries",
          config
        );

        if (response.data.success) {
          toast({
            title: response.data.message,
            status: "success",
            duration: 6000,
          });
          setBeneficiaries(response.data.data);
        } else {
          toast({
            title: "Request failed",
            description: response.message,
            status: "error",
            duration: 6000,
          });
          console.error("Failed to fetch beneficiaries");
        }
      } catch (error) {
        console.error("Error fetching beneficiaries:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchBeneficiaries();
    }
  }, [isOpen]);

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleConfirmRemoveBeneficiary = async () => {
    // Perform the remove beneficiary logic here
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:8080/v1/appointment/removeBeneficiary/${selectedBeneficiaryId}`,
        config
      );

      if (response.data.success) {
        toast({
          title: response.data.message,
          status: "success",
          duration: 6000,
        });
        // Update the list of beneficiaries after removal
        const updatedBeneficiaries = beneficiaries.filter(
          (beneficiary) => beneficiary.id !== selectedBeneficiaryId
        );
        setBeneficiaries(updatedBeneficiaries);
      } else {
        toast({
          title: "Request failed",
          description: response.message,
          status: "error",
          duration: 6000,
        });
        console.error("Failed to remove beneficiary");
      }
    } catch (error) {
      toast({
        title: "Request failed",
        description: "Error removing beneficiary:",
        status: "error",
        duration: 6000,
      });
      console.error("Error removing beneficiary:", error);
    } finally {
      setConfirmationModalOpen(false);
      setSelectedBeneficiaryId(null);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" borderRadius="0px">
        <ModalOverlay />
        <ModalContent maxH="80vh" overflowY="auto">
          <ModalHeader color="#A210C6">Beneficiaries</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginLeft="40px">
            <Progress marginBottom="20px" size="xs" isIndeterminate />
            {loading ? (
              <Flex align="center" justify="center" height="200px">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <VStack align="start" spacing={4}>
                {beneficiaries.map((beneficiary) => (
                  <Box key={beneficiary.id}>
                    <Flex>
                      <Box>
                        <Flex>
                          <Text fontWeight="bold" color="black">
                            Beneficiary Name:{" "}
                          </Text>
                          <Text color="black" marginLeft="5px">
                            {`${
                              beneficiary.recipientFirstName || "Not available"
                            } ${
                              beneficiary.recipientLastName || "Not available"
                            }`}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text fontWeight="bold" color="black">
                            Phone Number:{" "}
                          </Text>
                          <Text color="black" marginLeft="5px">
                            {beneficiary.recipientPhoneNumber ||
                              "Not available"}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text fontWeight="bold" color="black">
                            Gender:{" "}
                          </Text>
                          <Text marginLeft="5px" color="black">
                            {beneficiary.recipientGender || "Not available"}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text fontWeight="bold" color="black">
                            Date of Birth:{" "}
                          </Text>
                          <Text marginLeft="5px" color="black">
                            {formatDate(beneficiary.recipientDOB) ||
                              "Not availabe"}
                          </Text>
                        </Flex>

                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Next of kin name:
                          </Text>
                          <Text marginLeft="5px" color="black">
                            {beneficiary.kinName || "Not available"}
                          </Text>
                        </Flex>

                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Next of kin number:
                          </Text>
                          <Text marginLeft="5px" color="black">
                            {beneficiary.kinNumber || "Not availabe"}
                          </Text>
                        </Flex>

                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Language:
                          </Text>
                          <Text marginLeft="5px" color="black">
                            {beneficiary.language || "Not available"}
                          </Text>
                        </Flex>

                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Relationship:
                          </Text>
                          <Text marginLeft="5px" color="black">
                            {beneficiary.relationship || "Not availabe"}
                          </Text>
                        </Flex>
                        <Flex marginTop="5px">
                          <Text fontWeight="bold" color="black">
                            Added on:
                          </Text>
                          <Text marginLeft="5px" color="black">
                            {formatDateTime(beneficiary.createdAt) ||
                              "Not availabe"}
                          </Text>
                        </Flex>
                      </Box>
                      <Flex marginTop="185px">
                        <Box>
                          <Text
                            fontSize="17px"
                            style={{
                              marginLeft: "30px",
                              marginTop: "30px",
                              color: "#A210C6",
                              fontStyle: "italic",
                              cursor: "pointer",
                            }}
                            _hover={{ color: "#A210C6" }}
                            onClick={() =>
                              handleOpenBookAppointmentModal(beneficiary)
                            }
                          >
                            Book appointment
                          </Text>
                        </Box>
                        <Box>
                          <Text
                            fontSize="17px"
                            onClick={() =>
                              handleRemoveBeneficiary(beneficiary.id)
                            }
                            style={{
                              marginLeft: "20px",
                              marginTop: "30px",
                              color: "red",
                              fontStyle: "italic",
                              cursor: "pointer",
                            }}
                            _hover={{ color: "#A210C6" }}
                          >
                            Remove beneficiary
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                    <Divider my={4} borderColor="gray.500" />
                  </Box>
                ))}
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleOpenAddBeneficiaryForm}
              color="white"
              bg="#A210C6"
            >
              Add Beneficiary
            </Button>
            {isAddBeneficiaryFormOpen && (
              <AddBeneficiaryForm
                isOpen={isAddBeneficiaryFormOpen}
                onClose={() => setAddBeneficiaryFormOpen(false)}
              />
            )}
            {isBookAppointmentModalOpen && (
              <BookBeneficiaryAppointmentModal
                isOpen={isBookAppointmentModalOpen}
                onClose={() => setBookAppointmentModalOpen(false)}
                selectedBeneficiary={selectedBeneficiary}
              />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isConfirmationModalOpen && (
        <Modal
          isOpen={isConfirmationModalOpen}
          onClose={() => setConfirmationModalOpen(false)}
          size="sm"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmation</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to remove this beneficiary?</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                onClick={handleConfirmRemoveBeneficiary}
              >
                Confirm
              </Button>
              <Button
                variant="ghost"
                onClick={() => setConfirmationModalOpen(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default BeneficiariesModal;
