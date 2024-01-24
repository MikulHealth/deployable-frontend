import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Progress,
  Box,
  Button,
} from "@chakra-ui/react";
import SelfAppointmentModal from "./SelfAppointmentForm";
import BeneficiaryAppointmentModal from "./BeneficiaryAppForm";

const BookAppointmentModal = ({ isOpen, onClose }) => {
  const [isSelfAppointmentModalOpen, setSelfAppointmentModalOpen] =
    useState(false);
  const [
    isBeneficiaryAppointmentModalOpen,
    setBeneficiaryAppointmentModalOpen,
  ] = useState(false);
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
        <ModalHeader color="#A210C6">Book appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Progress size="xs" isIndeterminate />
          <Box marginTop="20px">
          <Button
            bg="gray"
            color="white"
            onClick={() => handleOpenSelfAppointmentModal(2)}
          >
            Book for self
          </Button>
          <Button
            bg="gray"
            color="white"
            ml={2}
            onClick={() => handleOpenBeneficiaryAppointmentModal(3)}
          >
            Book for others
          </Button>
          </Box>
         
        </ModalBody>
        <ModalFooter></ModalFooter>
        {isSelfAppointmentModalOpen && (
          <SelfAppointmentModal
            isOpen={isSelfAppointmentModalOpen}
            onClose={handleCloseSelfAppointmentModal}
            pages={pages}
          />
        )}
        {isBeneficiaryAppointmentModalOpen && (
          <BeneficiaryAppointmentModal
            isOpen={isBeneficiaryAppointmentModalOpen}
            onClose={handleCloseBeneficiaryAppointmentModal}
            pages={pages}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default BookAppointmentModal;
