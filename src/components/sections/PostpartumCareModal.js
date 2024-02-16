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
  Tooltip,
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
          <Text fontWeight="bold" marginLeft="360px" color="#A210C6">
            MONTHLY PLAN
          </Text>
          <Text fontWeight="bold" marginLeft="150px" color="#A210C6">
            PREMIUM CARE FOR MOTHER AND CHILD (4 WEEKS INTENSIVE CARE)
          </Text>
          <Text fontWeight="bold" marginLeft="200px" color="#A210C6">
            EXCLUSIVELY PROVIDED BY A LICENSED NURSE/MIDWIFE.
          </Text>
          <Flex
            marginBottom="30px"
            marginTop="30px"
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
                Specialized care for new babies and mothers during the postpartum
                period, providing support for physical and emotional recovery.
              </Text>
              <Flex mt="15px" direction="column">
                <Box ml="20px" fontSize="16px">
                <Text>- Blood pressure & pulse monitoring</Text>
                  <Text>- Blood sugar monitoring</Text>
                  <Text>- Post-Operative Wound Care</Text>
                  <Text>- Episiotomy Care</Text>             
                  <Text>- Physical & Emotional Support</Text>
                  <Text>- Sitz Bath</Text>
                  <Text>- Baby Grooming</Text>   
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
                  ₦200,000
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
                Specialized care for new babies and mothers during the postpartum
                period, providing support for physical and emotional recovery.
              </Text>
              <Flex mt="15px" direction="column">
                <Box color="white" ml="20px" fontSize="16px">
                  <Text>- Blood pressure & pulse monitoring</Text>
                  <Text>- Blood sugar monitoring</Text>
                  <Text>- Post-Operative Wound Care</Text>
                  <Text>- Episiotomy Care</Text>             
                  <Text>- Physical & Emotional Support</Text>
                  <Text>- Sitz Bath</Text>
                  <Text>- Baby Grooming</Text>                            
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

export default PostpartumCareModal;
