import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  extendTheme,
  Text,
} from "@chakra-ui/react";

const customTheme = extendTheme({
    components: {
      Link: {
        baseStyle: {
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
    fonts: {
      body: "Montserrat, sans-serif",
      heading: "Gill Sans MT, sans-serif",
    },
  });

const PayForAppointmentModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handlePayment = () => {
    navigate("/make-payment");
  };

  return (
    <Modal theme={customTheme} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Attention!</ModalHeader>
        <ModalBody>
          <Text>
            {" "}
            Your pending appointment has not been paid for, kindly make payment to
            get matched with a caregiver.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button   bg="#A210C6" color="white" mr={3} onClick={handlePayment}>
            Pay for appointment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PayForAppointmentModal;
