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
  Divider,
} from "@chakra-ui/react";
import axios from "axios";

const BeneficiariesModal = ({ isOpen, onClose }) => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" borderRadius="0px">
      <ModalOverlay />
      <ModalContent maxH="80vh" overflowY="auto">
        <ModalHeader color="#A210C6">Beneficiaries</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Flex align="center" justify="center" height="200px">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <VStack align="start" spacing={4}>
              {beneficiaries.map((beneficiary) => (
                <Box key={beneficiary.id}>
                  <Flex>
                    <Text fontWeight="bold" color="black">
                      Beneficiary Name:{" "}
                    </Text>
                    <Text color="black" marginLeft="5px">
                      {`${beneficiary.recipientFirstName} ${beneficiary.recipientLastName}`}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" color="black">
                      Phone Number:{" "}
                    </Text>
                    <Text color="black" marginLeft="5px">
                      {beneficiary.recipientPhoneNumber}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" color="black">
                      Gender:{" "}
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {beneficiary.recipientGender}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" color="black">
                      Date of Birth:{" "}
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {beneficiary.recipientDOB}
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
                      Current Location:{" "}
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {beneficiary.currentLocation}
                    </Text>
                    </Flex>
                  <Flex>
                    <Text fontWeight="bold" color="black">
                      Shift:{" "}
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {beneficiary.shift}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" color="black">
                      Doctor:{" "}
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {beneficiary.recipientDoctor}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" color="black">
                      Hospital:{" "}
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {beneficiary.recipientHospital}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" color="black">
                      Health History:{" "}
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {beneficiary.recipientHealthHistory}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text fontWeight="bold" color="black">
                      Service Plan:{" "}
                    </Text>
                    <Text marginLeft="5px" color="black">
                      {beneficiary.servicePlan}
                    </Text>
                  </Flex>
                  <Divider my={4} borderColor="gray.500" /> 
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
  );
};

export default BeneficiariesModal;
