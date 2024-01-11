// LogoutModal.js
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Logout Confirmation</ModalHeader>
        <ModalBody>
          Are you sure you want to logout?
        </ModalBody>
        <ModalFooter>
          <Button color="white" bg="#A210C6" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button color="#A210C6" onClick={onConfirm}>Logout</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
