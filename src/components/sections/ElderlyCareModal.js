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
} from "@chakra-ui/react";

const ElderlyCareModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent marginTop="30px">
        <ModalHeader>ELDERLY CARE</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" marginLeft="155px" color="#A210C6">
            STANDARD ALL-INCLUSIVE CARE FOR AGED PEOPLE OVER 60 YEARS OLD.
          </Text>
          <Flex
            marginBottom="30px"
            marginTop="50px"
            marginLeft="8px"
            alignItems="center"
          >
            <Box
              borderColor="#A210C6"
              borderRadius="10px"
              style={{
                cursor: "pointer",
                boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
              }}
              w="35vw"
              h="70vh"
            >
              <Text
                color="black"
                fontWeight="bold"
                marginTop="20px"
                marginLeft="158px"
              >
                8 Hours Shift
              </Text>
              <Divider my={1} borderColor="black.500" />
              <Text ml="15px" fontSize="16px" mt="5px">
                Comprehensive nursing care for elderly individuals, 
                focusing on their unique needs and promoting overall
                well-being.
              </Text>
              <Flex mt="15px" direction="column">
                <Box ml="20px" fontSize="16px">
                  <Text>- Vital signs check</Text>
                  <Text>- Oral care</Text>
                  <Text>- Serving/feeding food</Text>
                  <Text>- Light body/muscle massage</Text>
                  <Text>- Blood sugar monitoring</Text>
                  <Text>- Serving of medication</Text>
                  <Text>- Assistance with daily activities</Text>
                  <Text>- Wound dressing/Wound care (where applicable)</Text>
                  <Text>- Catheter care (where applicable)</Text>
                  <Text>- Ostomy care (where applicable)</Text>

                  <Text>- Emotional and companionship support</Text>
                  <Text>- Insurance against theft & damage. (Coming soon)</Text>
                </Box>
              </Flex>
            </Box>
            <Box
              style={{
                cursor: "pointer",
                boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
              }}
              marginTop="-20px"
              borderRadius="10px"
              marginLeft="30px"
              bg="#A210C6"
              w="35vw"
              h="70vh"
            >
              <Text
                color="white"
                fontWeight="bold"
                marginTop="20px"
                marginLeft="156px"
              >
                24 Hours Shift
              </Text>
              <Divider my={1} borderColor="white" />
              <Text color="white" ml="15px" fontSize="16px" mt="5px">
                Comprehensive nursing care for elderly individuals, 
                focusing on their unique needs and promoting overall
                well-being.
              </Text>
              <Flex mt="15px" direction="column">
                <Box color="white" ml="20px" fontSize="16px">
                  <Text>- Vital signs check</Text>
                  <Text>- Oral care</Text>
                  <Text>- Serving/feeding food</Text>
                  <Text>- Light body/muscle massage</Text>
                  <Text>- Blood sugar monitoring</Text>
                  <Text>- Serving of medication</Text>
                  <Text>- Assistance with daily activities</Text>
                  <Text>- Wound dressing/Wound care (where applicable)</Text>
                  <Text>- Catheter care (where applicable)</Text>
                  <Text>- Ostomy care (where applicable)</Text>
                  <Text>- Emotional and companionship support</Text>
                  <Text>- Insurance against theft & damage. (Coming soon)</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ElderlyCareModal;
