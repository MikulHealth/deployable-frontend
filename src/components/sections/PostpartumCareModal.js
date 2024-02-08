import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Divider,
  ModalHeader,
  Box,
  Flex,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";

const PostpartumCareModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent marginTop="30px">
        <ModalHeader>POSTPATUM CARE</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Text fontWeight="bold" marginLeft="240px" color="#A210C6">
            PREMIUM CARE (4 WEEKS INTENSIVE CARE)
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
                Specialized care for new babies mothers during the postpartum
                period, providing support for physical and emotional recovery.
              </Text>
              <Flex mt="15px" direction="column">
                <Box ml="20px" fontSize="16px">
                  <Text>- Blood pressure & pulse monitoring</Text>
                  <Text>- Blood sugar monitoring</Text>
                  <Text>- Post-Operative Wound Care</Text>
                  <Text>- Episiotomy Care</Text>
                  <Text>- Light Massage</Text>
                  <Text>- Health Education</Text>
                  <Text>- Physical & Emotional Support</Text>
                  <Text>- Sitz Bath</Text>
                  <Text>- Baby Grooming</Text>
                  <Text>- Baby Umbilical Care</Text>
                  <Text>- Insurance against theft & damage. [Coming soon]</Text>
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
                Specialized care for new babies mothers during the postpartum
                period, providing support for physical and emotional recovery.
              </Text>
              <Flex mt="15px" direction="column">
                <Box color="white" ml="20px" fontSize="16px">
                  <Text>- Blood pressure & pulse monitoring</Text>
                  <Text>- Blood sugar monitoring</Text>
                  <Text>- Post-Operative Wound Care</Text>
                  <Text>- Episiotomy Care</Text>
                  <Text>- Light Massage</Text>
                  <Text>- Health Education</Text>
                  <Text>- Physical & Emotional Support</Text>
                  <Text>- Sitz Bath</Text>
                  <Text>- Baby Grooming</Text>
                  <Text>- Baby Umbilical Care</Text>
                  <Text>- Insurance against theft & damage. [Coming soon]</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostpartumCareModal;
