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
} from "@chakra-ui/react";

const ShortNurseVisitModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent marginTop="30px">
        <ModalHeader>SHORT HOME VISIT</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text marginLeft="100px" color="#A210C6">
            Mikul health Short Nursing-Care Service [3 hours Maximun]
          </Text>
          <Flex
            marginBottom="30px"
            marginTop="50px"
            marginLeft="15px"
            alignItems="center"
          >
           
            <Box
              style={{
                cursor: "pointer",
                boxShadow: "0px 4px 8px rgba(162, 16, 198, 0.4)",
              }}
              marginTop="-20px"
              borderRadius="10px"
              marginLeft="55px"
              bg="#A210C6"
              w="35vw"
              h="70vh"
            >
              <Text
                color="white"
                fontWeight="bold"
                marginTop="20px"
                marginLeft="200px"
              >
                DAILY
              </Text>
              <Divider my={1} borderColor="white" />
              <Text color="white" ml="15px" fontSize="16px" mt="5px">
                Professional nursing care provided for short-term visits to
                address specific healthcare needs.
              </Text>
              <Flex mt="15px" direction="column">
                <Box color="white" ml="20px" fontSize="16px">
                  <Text>- Wound dressing/Wound care</Text>
                  <Text>- Medication administration</Text>
                  <Text>- Vital signs check</Text>
                  <Text>- Injection administration</Text>
                  <Text>- Health assessment</Text>
                  <Text>- Symptom management</Text>
                  <Text>- Patient education</Text>
                  <Text>- Catheter care</Text>
                  <Text>- Ostomy care</Text>
                  <Text>- IV therapy</Text>
                  <Text>- Blood glucose monitoring</Text>
                  <Text>- Dressing changes</Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShortNurseVisitModal;
