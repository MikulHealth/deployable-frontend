import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react";

const PostpartumCareModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Postpartum Care</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>This is the modal content for Postpartum Care service.</Text>
          {/* Add more content as needed */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostpartumCareModal;
