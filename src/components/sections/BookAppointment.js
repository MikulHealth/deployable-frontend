import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import SelfAppointmentModal from "./SelfAppointmentForm";
import BeneficiaryAppointmentModal from "./BeneficiaryAppForm";

const BookAppointmentModal = ({ isOpen, onClose }) => {
  const [isSelfAppointmentModalOpen, setSelfAppointmentModalOpen] = useState(false);
  const [isBeneficiaryAppointmentModalOpen, setBeneficiaryAppointmentModalOpen] = useState(false);
  const [pages, setPages] = useState(null);

  const handleOpenSelfAppointmentModal = (numPages) => {
    setPages(numPages);
    setSelfAppointmentModalOpen(true);
  };

  const handleCloseSelfAppointmentModal = () => {
    setSelfAppointmentModalOpen(false);
    setPages(null);
  };

  const handleOpenBeneficiaryAppointmentModal = (numPages) => {
    setPages(numPages);
    setBeneficiaryAppointmentModalOpen(true);
  };

  const handleCloseBeneficiaryAppointmentModal = () => {
    setBeneficiaryAppointmentModalOpen(false);
    setPages(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Book Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button onClick={() => handleOpenSelfAppointmentModal(2)}>Book for Self</Button>
          <Button ml={2} onClick={() => handleOpenBeneficiaryAppointmentModal(3)}>Book for Others</Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
        {isSelfAppointmentModalOpen && (
          <SelfAppointmentModal isOpen={isSelfAppointmentModalOpen} onClose={handleCloseSelfAppointmentModal} pages={pages} />
        )}
        {isBeneficiaryAppointmentModalOpen && (
          <BeneficiaryAppointmentModal isOpen={isBeneficiaryAppointmentModalOpen} onClose={handleCloseBeneficiaryAppointmentModal} pages={pages} />
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookAppointmentModal;
