import React from "react";
import {
  Modal,
  ModalOverlay,
  Divider,
  Box,
  Flex,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const RecoveryCareModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent marginTop="30px">
        <ModalHeader>RECOVERY CARE</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" marginLeft="360px" color="#A210C6">
            MONTHLY PLAN
          </Text>
          <Text fontWeight="bold" marginLeft="110px" color="#A210C6">
            ALL-INCLUSIVE CARE FOR PATIENTS WHO ARE RECOVERING FROM SURGERY OR A
            <Text fontWeight="bold" marginLeft="130px" color="#A210C6">
              LONG TIME/CRITICAL ILLNESS AT THE HOSPITAL
            </Text>
          </Text>
          <Text fontWeight="bold" marginLeft="240px" color="#A210C6">
            EXCLUSIVELY PROVIDED BY A LICENSED NURSE.
          </Text>
          <Flex
            marginBottom="30px"
            marginTop="50px"
            marginLeft="8px"
            alignItems="center"
          >
            <Tooltip
              borderRadius="100px"
              bg="#A210C6"
              label="Click on the box to book"
              aria-label="8 hours tooltip"
            >
              <Box
                borderColor="#A210C6"
                borderRadius="10px"
                style={{
                  cursor: "pointer",
                  boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                  transition: "transform 0.3s ease-in-out",
                }}
                w="35vw"
                h="60vh"
                _hover={{
                  transform: "translateY(-10px)",
                }}
              >
                <Text
                  color="#A210C6"
                  fontWeight="bold"
                  marginTop="40px"
                  marginLeft="20px"
                  fontSize="18px"
                >
                  8 Hours Daily 5 Days in a Week for a Month
                </Text>
                <Divider my={1} borderColor="black.500" />
                <Text ml="15px" fontSize="16px" mt="5px">
                  All-inclusive care for patients who are recovering from
                  surgery or a long time/critical illness at the hospital
                </Text>

                <Flex mt="15px" direction="column">
                  <Box ml="20px" fontSize="16px">
                    <Text>- Vital signs check</Text>
                    <Text>- Serving/feeding food</Text>
                    <Text>- Blood sugar monitoring</Text>
                    <Text>- Serving of medication</Text>
                    <Text>- Wound dressing/Wound care (where applicable)</Text>
                    <Text>- Bed bathing (where applicable)</Text>
                    <Text>- Catheter care (where applicable)</Text>
                  </Box>
                </Flex>
                <Divider my={1} borderColor="black.500" />
                <Text
                  color="#A210C6"
                  fontWeight="bold"
                  marginTop="10px"
                  marginLeft="150px"
                  fontSize="24px"
                >
                  ₦200,000
                </Text>
              </Box>
            </Tooltip>
            <Tooltip
              borderRadius="100px"
              bg="#A210C6"
              label="Click on the box to book"
              aria-label="24hrs hours tooltip"
            >
              <Box
                style={{
                  cursor: "pointer",
                  boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                  transition: "transform 0.3s ease-in-out",
                }}
                marginTop="-20px"
                borderRadius="10px"
                marginLeft="30px"
                bg="#A210C6"
                w="35vw"
                h="60vh"
                _hover={{
                  transform: "translateY(-10px)",
                }}
              >
                <Text
                  color="white"
                  fontWeight="bold"
                  marginTop="40px"
                  marginLeft="50px"
                  fontSize="18px"
                >
                  24 Hours Daily 30 Days in a Month
                </Text>
                <Divider my={1} borderColor="white" />
                <Text color="white" ml="15px" fontSize="16px" mt="5px">
                  All-inclusive care for patients who are recovering from
                  surgery or a long time/critical illness at the hospital
                </Text>
                <Flex mt="15px" direction="column">
                  <Box color="white" ml="20px" fontSize="16px">
                    <Text>- Vital signs check</Text>
                    <Text>- Serving/feeding food</Text>
                    <Text>- Blood sugar monitoring</Text>
                    <Text>- Serving of medication</Text>
                    <Text>- Wound dressing/Wound care (where applicable)</Text>
                    <Text>- Bed bathing (where applicable)</Text>
                    <Text>- Catheter care (where applicable)</Text>
                  </Box>
                </Flex>
                <Divider my={1} borderColor="white" />
                <Text
                  color="white"
                  fontWeight="bold"
                  marginTop="5px"
                  marginLeft="150px"
                  fontSize="24px"
                >
                  ₦250,000
                </Text>
              </Box>
            </Tooltip>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RecoveryCareModal;
