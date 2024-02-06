import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react";

const NannyCareModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nanny Care</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>This is the modal content for nanny Care service.</Text>
          {/* Add more content as needed */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NannyCareModal;
