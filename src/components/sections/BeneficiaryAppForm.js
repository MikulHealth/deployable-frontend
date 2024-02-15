import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationIcon from "../../assets/LocationIcon.svg";
import CalenderIcon from "../../assets/CalenderIcon.svg";
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
  Image,
  Textarea,
  FormControl,
  FormLabel,
  Box,
  Text,
  InputLeftElement,
  InputRightElement,
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
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
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
    medicalReport: null,
    medicSpecialization: "",
    startDate: null,
    endDate: null,
    relationship: "",
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
    setSelectedStartDate(date);
    setFormPages({ ...formPages, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setFormPages({ ...formPages, endDate: date });
  };

  const handleFormSubmit = async () => {
    setLoading(true);

    if (!validateStartDates()) {
      setLoading(false);
      return;
    }

    const fieldNameMappings = {
      shift: "Shift",
      servicePlan: "Service Plan",
      startDate: "Start Date",
      endDate: "End Date",
      currentLocation: "Current Location",
      medicSpecialization: "Medic Specialization",
    };

    const requiredFields = [
      "shift",
      "servicePlan",
      "startDate",
      "endDate",
      "currentLocation",
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

        medicalReport: null,

        medicSpecialization: "",
        startDate: null,
        endDate: null,

        relationship: selectedBeneficiary.relationship || "",
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
            <Box>
              <Flex marginLeft="40px">
                <Box w="270px">
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Start Date
                  </FormLabel>
                  <Flex
                    h="6vh"
                    padding="5px"
                    paddingLeft="15px"
                    style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                  >
                  
                      <DatePicker
                        selected={selectedStartDate}
                        onChange={handleStartDateChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd-MM-yyyy"
                        placeholderText="preferred date to start"
                        className="form-control"
                        minDate={new Date()}
                      />
                     <Image
                      marginLeft="30px"
                      w="24px"
                      h="24px"
                      src={CalenderIcon}
                      alt="CalenderIcon"
                    />
                  </Flex>
                </Box>
                <Box w="270px" marginLeft="5px">
                  <FormLabel fontWeight="bold" marginTop="20px">
                    End Date
                  </FormLabel>
                  <Flex
                    h="6vh"
                    padding="5px"
                    paddingLeft="15px"
                    style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                  >
                 
                      <DatePicker
                        selected={selectedEndDate}
                        onChange={handleEndDateChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        dateFormat="dd-MM-yyyy"
                        placeholderText="preferred date to end"
                        className="form-control"
                        minDate={new Date()}
                        style={{ border: "none" }}
                      />
                  <Image
                      marginLeft="30px"
                      w="24px"
                      h="24px"
                      src={CalenderIcon}
                      alt="CalenderIcon"
                    />
                  </Flex>
                </Box>
              </Flex>
              <Flex>
                <Box marginLeft="40px">
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Shift{" "}
                  </FormLabel>
                  <Select
                    name="shift"
                    placeholder="select preferred shift"
                    w="270px"
                    value={formPages.shift}
                    onChange={handleInputChange}
                  >
                    <option value="Day Shift">Day Shift (8hrs)</option>
                    <option value="Night Shift">Night Shift (12hrs)</option>
                    <option value="Live in">Live in (24hrs)</option>
                  </Select>
                </Box>
                <Box marginLeft="5px">
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Service Plan{" "}
                  </FormLabel>
                  <Select
                    name="servicePlan"
                    placeholder="preferred service plan"
                    w="270px"
                    value={formPages.servicePlan}
                    onChange={handleInputChange}
                  >
                    <option value="Elderly care">Elderly care</option>
                    <option value="Postpartum care">Postpartum care</option>
                    <option value="Nanny care">Nanny care</option>
                    <option value="Recovery care">Recovery care</option>
                    <option value="Short home visit">Short home visit</option>
                  </Select>
                </Box>
              </Flex>
              <Flex>
                <Box marginLeft="40px">
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Type of caregiver{" "}
                  </FormLabel>
                  <Select
                    name="medicSpecialization"
                    placeholder="select preferred caregiver"
                    w="270px"
                    value={formPages.medicSpecialization}
                    onChange={handleInputChange}
                  >
                    <option value="Registered Nurse">Registered Nurse</option>
                    <option value="Assistant Nurse">Assistant Nurse</option>
                    <option value="Registered Midwife">
                      Registered Nurse/Midwife
                    </option>
                  </Select>
                </Box>
                <Box marginLeft="5px">
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Current Location{" "}
                  </FormLabel>
                 
                  <Flex>
                    <Input
                      name="currentLocation"
                      type="text"
                      placeholder="current Location"
                      value={formPages.currentLocation}
                      onChange={handleInputChange}
                      w="270px"
                    />
                      <Image
                      marginTop="10px"
                      marginLeft="-35px"
                      w="24px"
                      h="24px"
                      src={LocationIcon}
                      alt="LocationIcon"
                    />
                    </Flex>
                
                </Box>
              </Flex>
              <Box marginLeft="40px">
                <FormLabel fontWeight="bold" marginTop="20px">
                  Upload necessary document (test results, medical report,
                  scans, etc)
                </FormLabel>
                <InputGroup>
                  <Input
                    padding="5px"
                    name="medicalReport"
                    type="file"
                    onChange={handleInputChange}
                    w="550px"
                    placeholder="Upload necessary document"
                  />
                  {/* <InputRightElement
                    pointerEvents="none"
                    children={<FaFile color="gray.300" />}
                  /> */}
                </InputGroup>
              </Box>
              <Box marginLeft="40px">
                <FormLabel fontWeight="bold" marginTop="20px">
                  Health History{" "}
                </FormLabel>
                <Textarea
                  name="recipientHealthHistory"
                  type="text"
                  placeholder="share health history and any special need we should know"
                  value={formPages.recipientHealthHistory}
                  onChange={handleInputChange}
                  w="550px"
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
            onClick={() => handleFormSubmit()}
            borderRadius="100px"
            _hover={{ color: "" }}
          >
            {loading ? "Processing..." : "Book appointment"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookBeneficiaryAppointmentModal;
