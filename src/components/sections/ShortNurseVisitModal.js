import React from "react";
import {
  Modal,
  ModalOverlay,
  Box,
  Flex,
  ModalContent,
  ModalHeader,
  Divider,
  ModalBody,
  ModalCloseButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const ShortNurseVisitModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent marginTop="30px">
        <ModalHeader>SHORT HOME VISIT</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" marginLeft="80px" color="#A210C6">
            Mikul health Short Nursing-Care Service [3 hours Maximun]
          </Text>
          <Text fontWeight="bold" marginLeft="150px" color="#A210C6">
            Exclusively provided by a licensed nurse.
          </Text>
          <Flex
            marginBottom="30px"
            marginTop="50px"
            marginLeft="15px"
            alignItems="center"
          >
             <Tooltip borderRadius="100px" bg="#A210C6" label="Click on the box to book" aria-label="daily tooltip">
           
            <Box
              style={{
                cursor: "pointer",
                boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
                transition: "transform 0.3s ease-in-out",
              }}
              marginTop="-30px"
              borderRadius="10px"
              marginLeft="55px"
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
                marginTop="30px"
                marginLeft="210px"
                fontSize="18px"
              >
               DAILY
              </Text>
              <Divider my={1} borderColor="white"  />
              <Text color="white" ml="15px" fontSize="16px" mt="5px">
                Professional nursing care provided for short-term visits to
                address specific healthcare needs.
              </Text>
              <Flex mt="15px" direction="column">
                <Box mb="10px" color="white" ml="20px" fontSize="16px">
                  <Text>- Wound dressing/Wound care</Text>
                  <Text>- Vital signs check</Text>
                  <Text>- Injection administration</Text>
                  <Text>- Health assessment</Text>
                  <Text>- Patient education</Text>
                  <Text>- Catheter care</Text>
                  <Text>- Ostomy care</Text>
                  <Text>- IV therapy</Text>
                  <Text>- Blood glucose monitoring</Text>
                </Box>
              </Flex>
              <Divider my={1} borderColor="white" />
              <Text
                color="white"
                fontWeight="bold"
                marginTop="10px"
                marginLeft="200px"
                fontSize="24px"
              >
                ₦15,000
              </Text>
            </Box>
            </Tooltip>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShortNurseVisitModal;
