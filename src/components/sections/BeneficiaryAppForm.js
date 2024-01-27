import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // Other Chakra UI components
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  ModalFooter,
  Button,
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Box,
  Flex,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const BookBeneficiaryAppointmentModal = ({
  isOpen,
  onClose,
  selectedBeneficiary,
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [formPages, setFormPages] = useState({
    recipientFirstname: "",
    recipientLastname: "",
    recipientGender: "",
    recipientDOB: null,
    recipientPhoneNumber: "",
    currentLocation: "",
    shift: "",
    servicePlan: "",
    recipientDoctor: "",
    recipientDoctorNumber: "",
    recipientHospital: "",
    medicalReport: null,
    recipientHealthHistory: "",
    startDate: null,
    endDate: null,
    kinName: "",
    kinNumber: "",
    relationship: "",
    language: "",
  });

  const formatDateToUTC = (selectedDate) => {
    if (!selectedDate) return "";

    // Use isNaN to check if the selectedDate is a valid date object
    if (isNaN(new Date(selectedDate))) {
      console.error("Invalid date:", selectedDate);
      return "";
    }

    // Add one day to the selected date
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    return adjustedDate.toISOString().split("T")[0];
  };

  const handleOpenConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const handleConfirmSubmit = () => {
    handleFormSubmit();
    handleCloseConfirmation();
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormPages({ ...formPages, [name]: value });
  };

  const handleStartDateChange = (date) => {
    setFormPages({ ...formPages, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setFormPages({ ...formPages, endDate: date });
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = "http://localhost:8080/v1/appointment/save";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const formatDateWithDayAdjustment = (selectedDate) =>
        formatDateToUTC(new Date(selectedDate));

      const formDataWithDates = {
        ...formPages,
        startDate: formatDateWithDayAdjustment(formPages.startDate),
        endDate: formatDateWithDayAdjustment(formPages.endDate),
        customerPhoneNumber: user.phoneNumber,
      };

      const requestBody = JSON.stringify(formDataWithDates);

      const response = await axios.post(apiUrl, requestBody, { headers });

      if (response.data.success) {
        setLoading(false);

        toast({
          title: "Appointment Booked",
          description: response.data.message,
          status: "success",
          duration: 6000,
        });

        onClose();
      } else {
        setLoading(false);

        console.error("Error booking appointment");
        const errorMessage = response.data
          ? response.data.message
          : "Unknown error";
        toast({
          title: "Booking failed",
          description: errorMessage,
          status: "error",
          duration: 6000,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      toast({
        title: "Error booking appointment",
        description: error.response?.data?.message || "Unknown error",
        status: "error",
        duration: 6000,
      });
    }
  };

  useEffect(() => {
    // Set initial form values based on the selected beneficiary
    if (selectedBeneficiary) {
      setFormPages({
        recipientFirstname: selectedBeneficiary.recipientFirstName || "",
        recipientLastname: selectedBeneficiary.recipientLastName || "",
        recipientGender: selectedBeneficiary.recipientGender || "",
        recipientDOB: selectedBeneficiary.recipientDOB
          ? new Date(selectedBeneficiary.recipientDOB)
          : null,
        recipientPhoneNumber: selectedBeneficiary.recipientPhoneNumber || "",
        currentLocation: "",
        shift: "",
        servicePlan: "",
        recipientDoctor: "",
        recipientDoctorNumber: "",
        recipientHospital: "",
        medicalReport: null,
        recipientHealthHistory: "",
        startDate: null,
        endDate: null,
        kinName: selectedBeneficiary.kinName || "",
        kinNumber: selectedBeneficiary.kinNumber || "",
        relationship: selectedBeneficiary.relationship || "",
        language: selectedBeneficiary.language || "",
      });
    }
  }, [selectedBeneficiary]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader color="#A210C6">
          Book Appointment for{" "}
          {`${selectedBeneficiary.recipientFirstName || ""} ${
            selectedBeneficiary.recipientLastName || ""
          }`}
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Box marginLeft="40px">
              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">Shift </FormLabel>
                  <Select
                    name="shift"
                    placeholder="Select preferred shift"
                    w="250px"
                    value={formPages.shift}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="Day Shift">Day Shift (8hrs)</option>
                    <option value="Night Shift">Night Shift (12hrs)</option>
                    <option value="Live in">Live in (24hrs)</option>
                  </Select>
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Service Plan </FormLabel>
                  <Select
                    name="servicePlan"
                    placeholder="preferred service plan"
                    w="250px"
                    value={formPages.servicePlan}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="Elderly care">Elderly care</option>
                    <option value="Postpartum care">Postpartum care</option>
                    <option value="Recovery care">Recovery care</option>
                    <option value="Nanny care">Nanny care</option>
                  </Select>
                </Box>
              </Flex>
              <Flex>
                <Box>
                  <FormLabel marginTop="20px">
                    Personal Doctor's name{" "}
                  </FormLabel>
                  <Input
                    name="recipientDoctor"
                    type="text"
                    placeholder="Personal Doctor's name"
                    value={formPages.recipientDoctor}
                    onChange={(e) => handleInputChange(e)}
                    w="250px"
                  />
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Doctor's phone number </FormLabel>
                  <Input
                    name="recipientDoctorNumber"
                    type="tel"
                    placeholder="Personal Doctor's phone number"
                    value={formPages.recipientDoctorNumber}
                    onChange={(e) => handleInputChange(e)}
                    w="250px"
                  />
                </Box>
              </Flex>
              <Flex>
                <Box>
                  <FormLabel marginTop="20px">Personal hospital </FormLabel>
                  <Input
                    name="recipientHospital"
                    type="text"
                    placeholder="Hospital name"
                    value={formPages.recipientHospital}
                    onChange={(e) => handleInputChange(e)}
                    w="250px"
                  />
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Upload medical report </FormLabel>
                  <Input
                    name="medicalReport"
                    type="file"
                    onChange={(e) => handleInputChange(e)}
                    w="250px"
                  />
                </Box>
              </Flex>
              <Flex marginTop="1px">
                <Box w="250px">
                  <FormLabel marginTop="20px">Start Date</FormLabel>
                  <DatePicker
                    name="startDate"
                    selected={formPages.startDate}
                    onChange={(e) => handleStartDateChange(e)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="preferred date to start"
                    className="form-control"
                  />
                </Box>
                <Box w="250px" marginLeft="5px">
                  <FormLabel marginTop="20px">End Date</FormLabel>
                  <DatePicker
                    name="endDate"
                    selected={formPages.endDate}
                    onChange={(e) => handleEndDateChange(e)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="preferred date to end"
                    className="form-control"
                  />
                </Box>{" "}
              </Flex>
              <Box marginLeft="5px">
                <FormLabel marginTop="20px">Current Location </FormLabel>
                <Input
                  name="currentLocation"
                  type="text"
                  placeholder="Current Location"
                  value={formPages.currentLocation}
                  onChange={(e) => handleInputChange(e)}
                  w="500px"
                />
              </Box>
              <Box>
                <FormLabel marginTop="20px">Health History </FormLabel>
                <Textarea
                  name="recipientHealthHistory"
                  type="text"
                  placeholder="Please share health history and any special need we should be aware of"
                  value={formPages.recipientHealthHistory}
                  onChange={(e) => handleInputChange(e)}
                  w="500px"
                />
              </Box>
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={loading}
            loadingText="Processing..."
            bg="#A210C6"
            color="white"
            mr={3}
            onClick={handleOpenConfirmation}
          >
            {loading ? "Processing..." : "Submit"}
          </Button>
        </ModalFooter>
        <Modal isOpen={isConfirmationOpen} onClose={handleCloseConfirmation}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Submission</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Are you sure you want to submit the form? <br></br>
              Please note that you would have to make payment immidiately after
              submition before we can match you with a caregiver.
            </ModalBody>
            <ModalFooter>
              <Button
                bg="#A210C6"
                color="white"
                mr={3}
                onClick={handleConfirmSubmit}
              >
                Confirm
              </Button>
              <Button bg="gray" color="white" onClick={handleCloseConfirmation}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ModalContent>
    </Modal>
  );
};

export default BookBeneficiaryAppointmentModal;
