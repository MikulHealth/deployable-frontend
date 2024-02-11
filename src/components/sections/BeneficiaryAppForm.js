import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  InputLeftAddon,
  InputGroup,
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
  Text,
  Flex,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BookBeneficiaryAppointmentModal = ({
  isOpen,
  onClose,
  selectedBeneficiary,
}) => {
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [formPages, setFormPages] = useState({
    recipientFirstname: "",
    recipientLastname: "",
    recipientGender: "",
    recipientDOB: null,
    recipientPhoneNumber: "",
    currentLocation: "",
    shift: "",
    servicePlan: "",
    recipientHospital: "",
    medicalReport: null,
    recipientHealthHistory: "",
    medicSpecialization: "",
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
    const fieldNameMappings = {
      shift: "Shift",
      servicePlan: "Service Plan",
      recipientHospital: "Personal hospital",
      startDate: "Start Date",
      endDate: "End Date",
      currentLocation: "Current Location",
      recipientHealthHistory: "Health History",
      medicSpecialization: "Medic Specialization",
    };

    const requiredFields = [
      "shift",
      "servicePlan",
      "recipientHospital",
      "startDate",
      "endDate",
      "currentLocation",
      "recipientHealthHistory",
      "medicSpecialization",
    ];

    for (const fieldName of requiredFields) {
      if (!formPages[fieldName]) {
        setLoading(false);
        toast({
          title: `${fieldNameMappings[fieldName]} is required`,
          description: `Please fill in the ${fieldNameMappings[fieldName]} field.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }

    if (!validateStartDates()) {
      setLoading(false);
      return;
    }

    // if (!validateNigerianPhoneNumber(formPages.recipientDoctorNumber)) {
    //   setLoading(false);
    //   toast({
    //     title: "Invalid Phone Number",
    //     description: "Please enter a valid Nigerian phone number.",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //   });
    //   return;
    // }

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
          title: "Appointment Saved",
          status: "success",
          duration: 6000,
        });
        const id = response.data.data.id;
        localStorage.setItem("appointmentId", id);
        setTimeout(() => {
          navigate("/make-payment");
        }, 1000);
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

  const validateStartDates = () => {
    if (!formPages.startDate || !formPages.endDate) {
      toast({
        title: "Appointment Dates Required",
        description: "Please select both start and end dates.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };
  const validateNigerianPhoneNumber = (phoneNumber) => {
    // Regular expression to match Nigerian phone numbers
    const nigerianPhoneNumberRegex = /^(?:\+234|234)([789]\d{9})$/;
    return nigerianPhoneNumberRegex.test(phoneNumber);
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
        recipientHospital: "",
        medicalReport: null,
        recipientHealthHistory: "",
        medicSpecialization: "",
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
          <FormControl isRequired>
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
                    isRequired
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
                    isRequired
                  >
                    <option value="Elderly care">Elderly care</option>
                    <option value="Postpartum care">Postpartum care</option>
                    <option value="Recovery care">Recovery care</option>
                    <option value="Nanny care">Nanny care</option>
                    <option value="Short home visit">Short home visit</option>
                  </Select>
                </Box>
              </Flex>
              <Box marginLeft="50px">
                <FormLabel marginTop="20px">Type of caregiver </FormLabel>
                <Select
                  name="medicSpecialization"
                  placeholder="Select preferred caregiver"
                  w="250px"
                  value={formPages.medicSpecialiation}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="Registered Nurse">Registered Nurse</option>
                  <option value="Assistant Nurse">Assistant Nurse</option>
                  <option value="Registered Midwife">
                    Registered Nurse/Midwife
                  </option>
                </Select>
              </Box>
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
                  <FormLabel marginTop="20px">
                    Upload medical report (optional){" "}
                  </FormLabel>
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
                    dateFormat="dd-MM-yyyy"
                    placeholderText="preferred date to start"
                    className="form-control"
                    minDate={new Date()}
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
                    dateFormat="dd-MM-yyyy"
                    placeholderText="preferred date to end"
                    className="form-control"
                    minDate={new Date()}
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
                  isRequired
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
                  isRequired
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
            onClick={handleFormSubmit}
          >
            {loading ? "Processing..." : "Submit"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookBeneficiaryAppointmentModal;
