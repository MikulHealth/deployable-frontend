import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalBody,
  Box,
  Flex,
  ModalCloseButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const NannyCareModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent marginTop="30px">
        <ModalHeader>NANNY CARE</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Text fontWeight="bold" marginLeft="360px" color="#A210C6">
           MONTHLY PLAN
          </Text>
          <Text fontWeight="bold" marginLeft="260px" color="#A210C6">
            MIKUL HEALTH NANNY CARE SERVICE
          </Text>
          <Text fontWeight="bold" marginLeft="220px" color="#A210C6">
            EXCLUSIVELY PROVIDED BY A PROFESSIONAL NANNY.
          </Text>
          <Flex
            marginBottom="30px"
            marginTop="30px"
            marginLeft="8px"
            alignItems="center"
          >
             <Tooltip borderRadius="100px" bg="#A210C6" label="Click on the box to book" aria-label="8 hours tooltip">
           
            <Box
            className="8hrs-box"
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
                Professional care services provided by trained nannies for
                children of all ages.
              </Text>
              <Flex mt="15px" direction="column">
                <Box ml="20px" fontSize="16px">
                  <Text>- Babysitting</Text>
                  <Text>- Feeding and meal preparation</Text>
                  <Text>- Bathing and grooming</Text>
                  <Text>- Playtime and educational activities</Text>
                  <Text>- Bedtime routines</Text>
                  <Text>- Transportation (to school, appointments, etc.)</Text>
                  <Text>- Household chores related to children</Text>
                </Box>
              </Flex>
              <Flex>
                <Divider my={1} borderColor="black.500" />
                <Text
                  color="#A210C6"
                  fontWeight="bold"
                  marginTop="10px"
                  marginLeft="-340px"
                  fontSize="24px"
                >
                  ₦70,000
                </Text>
                <Text marginTop="18px" marginLeft="5px">
                  excluding pre-nanny test
                </Text>
              </Flex>
            </Box>
            </Tooltip>
            <Tooltip borderRadius="100px" bg="#A210C6" label="Click on the box to book " aria-label="24hrs hours tooltip">
            <Box
            className="24hrs-box"
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
                Professional care services provided by trained nannies for
                children of all ages.
              </Text>
              <Flex mt="15px" direction="column">
                <Box color="white" ml="20px" fontSize="16px">
                <Text>- Babysitting</Text>
                  <Text>- Feeding and meal preparation</Text>
                  <Text>- Bathing and grooming</Text>
                  <Text>- Playtime and educational activities</Text>
                  <Text>- Bedtime routines</Text>
                  <Text>- Transportation (to school, appointments, etc.)</Text>
                  <Text>- Household chores related to children</Text>
                </Box>
              </Flex>
              <Flex>
                <Divider my={1} borderColor="white" />
                <Text
                  color="white"
                  fontWeight="bold"
                  marginTop="10px"
                  marginLeft="-340px"
                  fontSize="24px"
                >
                  ₦90,000
                </Text>
                <Text  color="white" marginTop="18px" marginLeft="5px">
                  excluding pre-nanny test
                </Text>
              </Flex>
            </Box>
            </Tooltip>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NannyCareModal;
