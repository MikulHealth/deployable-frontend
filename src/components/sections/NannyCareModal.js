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
} from "@chakra-ui/react";

const NannyCareModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent marginTop="30px">
        <ModalHeader>NANNY CARE</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text marginLeft="230px" color="#A210C6">
            Mikul health Nanny Care Service [Live-in care]
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
                Professional care services provided by trained nannies for
                children of all ages.
              </Text>
              <Flex mt="15px" direction="column">
                <Box ml="20px" fontSize="16px">
                  <Text>- Babysitting</Text>
                  <Text>- Feeding and meal preparation</Text>
                  <Text>- Diaper changing</Text>
                  <Text>- Bathing and grooming</Text>
                  <Text>- Playtime and educational activities</Text>
                  <Text>- Bedtime routines</Text>
                  <Text>- Monitoring and ensuring safety</Text>
                  <Text>- Transportation (to school, appointments, etc.)</Text>
                  <Text>- Household chores related to children</Text>
                  <Text>- Overnight care</Text>
                  <Text>- Special needs care</Text>
                  <Text>- Event childcare</Text>
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
                Professional care services provided by trained nannies for
                children of all ages.
              </Text>
              <Flex mt="15px" direction="column">
                <Box color="white" ml="20px" fontSize="16px">
                  <Text>- Babysitting</Text>
                  <Text>- Feeding and meal preparation</Text>
                  <Text>- Diaper changing</Text>
                  <Text>- Bathing and grooming</Text>
                  <Text>- Playtime and educational activities</Text>
                  <Text>- Bedtime routines</Text>
                  <Text>- Monitoring and ensuring safety</Text>
                  <Text>- Transportation (to school, appointments, etc.)</Text>
                  <Text>- Household chores related to children</Text>
                  <Text>- Overnight care</Text>
                  <Text>- Special needs care</Text>
                  <Text>- Event childcare</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NannyCareModal;
