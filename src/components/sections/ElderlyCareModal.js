import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  Flex,
  Button,
  Divider,
  Link,
  ModalBody,
  ModalCloseButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const ElderlyCareModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent marginTop="30px">
        <ModalHeader>ELDERLY CARE</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" marginLeft="360px" color="#A210C6">
            MONTHLY PLAN
          </Text>
          <Text fontWeight="bold" marginLeft="155px" color="#A210C6">
            STANDARD ALL-INCLUSIVE CARE FOR AGED PEOPLE OVER 60 YEARS OLD.
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
                h="65vh"
                marginTop="10px"
                _hover={{
                  transform: "translateY(-10px)",
                }}
              >
                <Text
                  color="black"
                  fontWeight="bold"
                  marginTop="20px"
                  marginLeft="40px"
                >
                  8 Hours Daily 5 Days in a Week for a Month
                </Text>
                <Text
                  color="black"
                  fontWeight="bold"
                  marginTop="5px"
                  marginLeft="90px"
                >
                  Provided by a Nurse Assistant
                </Text>
                <Divider my={1} borderColor="black.500" />
                <Text ml="15px" fontSize="16px" mt="5px">
                  Comprehensive nursing care for elderly individuals, focusing
                  on their unique needs and promoting overall well-being.
                </Text>
                <Flex mt="15px" direction="column">
                  <Box ml="20px" fontSize="16px">
                    <Text>- Vital signs check</Text>
                    <Text>- Serving/feeding food</Text>
                    <Text>- Blood sugar monitoring</Text>
                    <Text>- Serving of medication</Text>
                    <Text>- Assistance with daily activities</Text>
                    <Text>- Wound dressing/Wound care (where applicable)</Text>
                    <Text>- Catheter care (where applicable)</Text>
                    <Text>- Emotional and companionship support</Text>
                  </Box>
                </Flex>
                <Divider my={1} borderColor="black.500" />
                <Text
                  color="#A210C6"
                  fontWeight="bold"
                  marginTop="5px"
                  marginLeft="150px"
                  fontSize="24px"
                >
                  ₦120,000
                </Text>
              </Box>
            </Tooltip>
            <Tooltip
              borderRadius="100px"
              bg="#A210C6"
              label="Click on the box to book"
              aria-label="8 hours tooltip"
            >
              <Box
                style={{
                  cursor: "pointer",
                  boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                  transition: "transform 0.3s ease-in-out",
                }}
                marginTop="-10px"
                borderRadius="10px"
                marginLeft="30px"
                bg="#A210C6"
                w="35vw"
                h="65vh"
                _hover={{
                  transform: "translateY(-10px)",
                }}
              >
                <Text
                  color="white"
                  fontWeight="bold"
                  marginTop="20px"
                  marginLeft="80px"
                >
                  24 Hours Daily 30 Days in a month
                </Text>
                <Text
                  color="white"
                  fontWeight="bold"
                  marginTop="5px"
                  marginLeft="100px"
                >
                  Provided by a Nurse Assistant
                </Text>
                <Divider my={1} borderColor="white" />
                <Text color="white" ml="15px" fontSize="16px" mt="5px">
                  Comprehensive nursing care for elderly individuals, focusing
                  on their unique needs and promoting overall well-being.
                </Text>
                <Flex mt="15px" direction="column">
                  <Box color="white" ml="20px" fontSize="16px">
                    <Text>- Vital signs check</Text>
                    <Text>- Serving/feeding food</Text>
                    <Text>- Blood sugar monitoring</Text>
                    <Text>- Serving of medication</Text>
                    <Text>- Assistance with daily activities</Text>
                    <Text>- Wound dressing/Wound care (where applicable)</Text>
                    <Text>- Catheter care (where applicable)</Text>
                    <Text>- Emotional and companionship support</Text>
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
                  ₦150,000
                </Text>
              </Box>
            </Tooltip>
          </Flex>
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
                marginTop="10px"
                w="35vw"
                h="65vh"
                _hover={{
                  transform: "translateY(-10px)",
                }}
              >
                <Text
                  color="black"
                  fontWeight="bold"
                  marginTop="20px"
                  marginLeft="40px"
                >
                  8 Hours Daily 5 Days in a Week for a Month
                </Text>
                <Text
                  color="black"
                  fontWeight="bold"
                  marginTop="5px"
                  marginLeft="100px"
                >
                  Provided by a Licensed Nurse
                </Text>
                <Divider my={1} borderColor="black.500" />
                <Text ml="15px" fontSize="16px" mt="5px">
                  Comprehensive nursing care for elderly individuals, focusing
                  on their unique needs and promoting overall well-being.
                </Text>
                <Flex mt="15px" direction="column">
                  <Box ml="20px" fontSize="16px">
                    <Text>- Vital signs check</Text>
                    <Text>- Serving/feeding food</Text>
                    <Text>- Blood sugar monitoring</Text>
                    <Text>- Serving of medication</Text>
                    <Text>- Assistance with daily activities</Text>
                    <Text>- Wound dressing/Wound care (where applicable)</Text>
                    <Text>- Catheter care (where applicable)</Text>
                    <Text>- Emotional and companionship support</Text>
                  </Box>
                </Flex>
                <Divider my={1} borderColor="black.500" />
                <Text
                  color="#A210C6"
                  fontWeight="bold"
                  marginTop="5px"
                  marginLeft="150px"
                  fontSize="24px"
                >
                  ₦180,000
                </Text>
              </Box>
            </Tooltip>
            <Tooltip
              borderRadius="100px"
              bg="#A210C6"
              label="Click on the box to book"
              aria-label="8 hours tooltip"
            >
              <Box
                style={{
                  cursor: "pointer",
                  boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                  transition: "transform 0.3s ease-in-out",
                }}
                marginTop="-10px"
                borderRadius="10px"
                marginLeft="30px"
                bg="#A210C6"
                w="35vw"
                h="65vh"
                _hover={{
                  transform: "translateY(-10px)",
                }}
              >
                <Text
                  color="white"
                  fontWeight="bold"
                  marginTop="20px"
                  marginLeft="75px"
                >
                  24 Hours Daily 30 Days in a month
                </Text>
                <Text
                  color="white"
                  fontWeight="bold"
                  marginTop="5px"
                  marginLeft="100px"
                >
                  Provided by a Licensed Nurse
                </Text>
                <Divider my={1} borderColor="white" />
                <Text color="white" ml="15px" fontSize="16px" mt="5px">
                  Comprehensive nursing care for elderly individuals, focusing
                  on their unique needs and promoting overall well-being.
                </Text>
                <Flex mt="15px" direction="column">
                  <Box color="white" ml="20px" fontSize="16px">
                    <Text>- Vital signs check</Text>
                    <Text>- Serving/feeding food</Text>
                    <Text>- Blood sugar monitoring</Text>
                    <Text>- Serving of medication</Text>
                    <Text>- Assistance with daily activities</Text>
                    <Text>- Wound dressing/Wound care (where applicable)</Text>
                    <Text>- Catheter care (where applicable)</Text>
                    <Text>- Emotional and companionship support</Text>
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
                  ₦220,000
                </Text>
              </Box>
            </Tooltip>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ElderlyCareModal;
