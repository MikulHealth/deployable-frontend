import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react";

const ShortNurseVisitModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Short nurse Care</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>This is the modal content for short nurse Care service.</Text>
          {/* Add more content as needed */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShortNurseVisitModal;
