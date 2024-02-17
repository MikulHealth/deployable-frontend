import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../../utils/Spiner";
import LocationIcon from "../../assets/LocationIcon.svg";
import CalenderIcon from "../../assets/CalenderIcon.svg";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Progress,
  Image,
  Flex,
  Box,
  Select,
  useToast,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { SetUser } from "../../redux/userSlice";

const SelfAppointmentModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedDob, setSelectedDob] = useState(null);
  const [formFields, setFormFields] = useState({
    startDate: null,
    endDate: null,
    shift: "",
    servicePlan: "",
    currentLocation: "",
    medicalReport: "",
    costOfService: "",
    recipientHealthHistory: "",
    costOfService: "",
  });

  const navigate = useNavigate();

  const formatDateToUTC = (selectedDate) => {
    if (!selectedDate) return "";

    // Add one day to the selected date
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    return adjustedDate.toISOString().split("T")[0];
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setFormFields({ ...formFields, startDate: date });
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setFormFields({ ...formFields, endDate: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
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

      const userFieldsForBookForSelf = {
        recipientFirstname: user?.firstName,
        recipientLastname: user?.lastName,
        recipientPhoneNumber: user?.phoneNumber,
        recipientGender: user?.gender,
        recipientDOB: user?.dob,
        recipientImage: user?.image,
      };

      const formDataWithDates = {
        ...formFields,
        startDate: formatDateWithDayAdjustment(selectedStartDate),
        endDate: formatDateWithDayAdjustment(selectedEndDate),
        recipientDOB: formatDateWithDayAdjustment(selectedDob),
        customerPhoneNumber: user?.phoneNumber,
        customerId: user?.id,

        ...userFieldsForBookForSelf,
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
        localStorage.setItem("costOfService", formFields.costOfService);
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

  const validateForm = () => {
    if (
      !formFields.startDate ||
      !formFields.endDate ||
      !formFields.shift ||
      !formFields.servicePlan ||
      !formFields.currentLocation ||
      !formFields.medicSpecialization ||
      !formFields.recipientHealthHistory
    ) {
      toast({
        title: "Please fill all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const calculateServiceCost = () => {
    const { servicePlan, shift } = formFields;

    let costOfService = 0;

    switch (servicePlan) {
      case "Elderly care by a Licensed Nurse":
        costOfService = shift === "Day Shift" ? 18000000 : 22000000;
        break;
      case "Elderly care by a Nurse Assistant":
        costOfService = shift === "Day Shift" ? 12000000 : 15000000;
        break;
      case "Postpartum care":
        costOfService = shift === "Day Shift" ? 20000000 : 25000000;
        break;
      case "Recovery care":
        costOfService = shift === "Day Shift" ? 20000000 : 25000000;
        break;
      case "Nanny care":
        costOfService = shift === "Day Shift" ? 7000000 : 9000000;
        break;
      case "Short home visit":
        costOfService = 1500000;
        break;
      default:
        costOfService = 0;
        break;
    }

    setFormFields({ ...formFields, costOfService });
  };

  useEffect(() => {
    calculateServiceCost();
  }, [formFields.servicePlan, formFields.shift]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="#A210C6">Book Appointment</ModalHeader>
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
                    paddingTop="5px"
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
                    paddingTop="5px"
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
                    Service Plan{" "}
                  </FormLabel>
                  <Select
                    name="servicePlan"
                    placeholder="preferred service plan"
                    w="270px"
                    value={formFields.servicePlan}
                    onChange={handleInputChange}
                  >
                    <option
                      value="Elderly care by a Licensed Nurse"
                      style={{ marginTop: "5px" }}
                    >
                      Elderly care by a Licensed Nurse
                    </option>
                    <option
                      value="Elderly care by a Nurse Assistant"
                      style={{ marginTop: "5px" }}
                    >
                      Elderly care by a Nurse Assistant
                    </option>
                    <option
                      value="Postpartum care"
                      style={{ marginTop: "5px" }}
                    >
                      Postpartum care by a Licensed Nurse/Midwife
                    </option>
                    <option value="Nanny care" style={{ marginTop: "5px" }}>
                      Nanny service by a Professional Nanny
                    </option>
                    <option value="Recovery care" style={{ marginTop: "5px" }}>
                      Recovery care by a Licensed Nurse
                    </option>
                    <option
                      value="Short home visit"
                      style={{ marginTop: "5px" }}
                    >
                      Short home visit by a Licensed Nurse
                    </option>
                  </Select>
                </Box>

                <Box marginLeft="5px">
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Shift{" "}
                  </FormLabel>
                  <Select
                    name="shift"
                    placeholder="select preferred shift"
                    w="270px"
                    value={formFields.shift}
                    onChange={handleInputChange}
                  >
                    <option value="Day Shift">Day Shift (8hrs)</option>

                    <option value="Live in (24hrs)">
                      Live-in shift (24hrs)
                    </option>
                  </Select>
                </Box>
              </Flex>

              <Box marginLeft="40px">
                <FormLabel fontWeight="bold" marginTop="20px">
                  Current Location{" "}
                </FormLabel>
                <Flex>
                  <Input
                    name="currentLocation"
                    type="text"
                    placeholder="current Location"
                    value={formFields.currentLocation}
                    onChange={handleInputChange}
                    w="550px"
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
                  value={formFields.recipientHealthHistory}
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

export default SelfAppointmentModal;
