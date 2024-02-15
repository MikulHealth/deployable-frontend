import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LocationIcon from "../../assets/LocationIcon.svg";
import CalenderIcon from "../../assets/CalenderIcon.svg";
import {
  FaMapMarkerAlt,
  FaFile,
  FaCalendarAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  ModalFooter,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
  Progress,
  Flex,
  Box,
  Select,
  useToast,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";

const BeneficiaryAppointmentModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedDob, setSelectedDob] = useState(null);
  const [addToBeneficiaryList, setAddToBeneficiaryList] = useState(false);
  const [formFields, setFormFields] = useState({
    recipientFirstname: "",
    recipientLastname: "",
    recipientPhoneNumber: "",
    recipientGender: "",
    recipientDOB: "",
    currentLocation: "",
    shift: "",
    servicePlan: "",
    medicSpecialization: "",
    startDate: "",
    endDate: "",
    relationship: "",
    medicalReport: "",
  });

  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormFields((prevFields) => ({
  //     ...prevFields,
  //     [name]: value,
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "DOB") {
      setSelectedDob(value);
      setFormFields({
        ...formFields,
        recipientDOB: value,
      });
    } else {
      setFormFields({
        ...formFields,
        [name]: value,
      });
    }
  };
  

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setFormFields({ ...formFields, startDate: date });
  };

  const handleDOBChange = (date) => {
    setSelectedDob(date);
    setFormFields({ ...formFields, recipientDOB: date });
  };


  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setFormFields({ ...formFields, endDate: date });
  };

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
        ...formFields,
        startDate: formatDateWithDayAdjustment(formFields.startDate),
        endDate: formatDateWithDayAdjustment(formFields.endDate),
        recipientDOB: formatDateWithDayAdjustment(formFields.recipientDOB),
        customerPhoneNumber: user?.phoneNumber,
        customerId: user?.id,
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

  

  const handleSwitchChange = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiUrl = "http://localhost:8080/v1/appointment/addNewBeneficiary";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const formatDateWithDayAdjustment = (selectedDate) =>
      formatDateToUTC(new Date(selectedDate));

      const formDataWithDates = {
        ...formFields,
        recipientDOB: formatDateWithDayAdjustment(formFields.recipientDOB),
        customerPhoneNumber: user?.phoneNumber,
        customerId: user?.id,
      };

      const requestBody = JSON.stringify(formDataWithDates);

      const response = await axios.post(apiUrl, requestBody, { headers });

      if (response.data.success) {
        setLoading(false);
        toast({
          title: "Beneficiary Added",
          status: "success",
          duration: 6000,
        });
        
      } else {
        setLoading(false);
        console.error("Error adding beneficiary");
        const errorMessage = response.data
          ? response.data.message
          : "Unknown error";
        toast({
          title: "Adding beneficiary failed",
          description: errorMessage,
          status: "error",
          duration: 6000,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      toast({
        title: "Error adding beneficiary",
        description: error.response?.data?.message || "Unknown error",
        status: "error",
        duration: 6000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="#A210C6">Book Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl marginLeft="40px">
            <Box>
              <FormLabel fontWeight="bold">Enter Beneficiary details</FormLabel>
              <Flex>
                <InputGroup>
                  <Input
                    name="recipientFirstname"
                    placeholder="first name"
                    value={formFields.recipientFirstname}
                    onChange={handleInputChange}
                    w="270px"
                  />
                  <InputRightElement marginRight="45px" pointerEvents="none">
                    <FaUser color="gray.300" />
                  </InputRightElement>
                </InputGroup>
                <InputGroup>
                  <Input
                    name="recipientLastname"
                    marginLeft="-35px"
                    placeholder="last name"
                    value={formFields.recipientLastname}
                    onChange={handleInputChange}
                    w="270px"
                  />
                  <InputRightElement marginRight="80px" pointerEvents="none">
                    <FaUser color="gray.300" />
                  </InputRightElement>
                </InputGroup>
              </Flex>
              <Flex>
                <Box>
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Gender{" "}
                  </FormLabel>
                  <Select
                    name="recipientGender"
                    placeholder="select gender"
                    w="270px"
                    value={formFields.recipientGender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </Box>
                <Box marginLeft="5px" w="270px">
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Date of Birth
                  </FormLabel>
                  <Flex
                    h="6vh"
                    padding="5px"
                    paddingLeft="15px"
                    style={{ border: "1px solid #ccc", borderRadius: "5px" }}
                  >
                    {" "}
                    <DatePicker
                      name="recipientDOB"
                      selected={selectedDob}
                      onChange={handleDOBChange}
                      maxDate={new Date()}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="dd-MM-yyyy"
                      placeholderText="select date of birth"
                      className="form-control"
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
              <Flex marginTop="1px">
                <Box>
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Contact Number{" "}
                  </FormLabel>
                  <InputGroup>
                    <Input
                      name="recipientPhoneNumber"
                      type="tel"
                      placeholder="recipient phone number"
                      value={formFields.recipientPhoneNumber}
                      onChange={handleInputChange}
                      w="270px"
                    />
                    <InputRightElement pointerEvents="none">
                      <FaPhoneAlt color="gray.300" />
                    </InputRightElement>
                  </InputGroup>
                </Box>
                <Box marginLeft="5px">
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Relationship with beneficiary{" "}
                  </FormLabel>
                  <Select
                    name="relationship"
                    placeholder="Select the appropriate relationship type"
                    w="270px"
                    onChange={handleInputChange}
                  >
                    <option value="Mum">Mum</option>
                    <option value="Dad">Dad</option>
                    <option value="Wife">Wife</option>
                    <option value="Husband">Husband</option>
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Uncle">Uncle</option>
                    <option value="Aunt">Aunt</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Niece">Niece</option>
                    <option value="Nephew">Nephew</option>
                    <option value="Cousin">Cousin</option>
                    <option value="Friend">Friend</option>
                    <option value="Colleague">Colleague</option>
                    <option value="Neighbour">Neighbour</option>
                    <option value="MotherInLaw">Mother in-law</option>
                    <option value="FatherInLaw">Father in-law</option>
                    <option value="Grandmother">Grand mother</option>
                    <option value="Grandfather">Grand father</option>
                  </Select>
                </Box>
              </Flex>
              <Flex marginLeft="5px">
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
              <Flex marginLeft="5px">
                <Box>
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
                    value={formFields.servicePlan}
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
              <Flex marginLeft="5px">
                <Box>
                  <FormLabel fontWeight="bold" marginTop="20px">
                    Type of caregiver{" "}
                  </FormLabel>
                  <Select
                    name="medicSpecialization"
                    placeholder="select preferred caregiver"
                    w="270px"
                    value={formFields.medicSpecialization}
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
                  <InputGroup>
                    <Flex>
                      <Input
                        name="currentLocation"
                        type="text"
                        placeholder="current Location"
                        value={formFields.currentLocation}
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
                  </InputGroup>
                </Box>
              </Flex>
              <Box marginLeft="5px">
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
              <Box marginLeft="5px">
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
            <Flex marginTop="10px" marginLeft="350px">
              <Text color="#A210C6" fontStyle="italic">
                Add to beneficiary list?
              </Text>
              <Switch
                marginLeft="10px"
                colorScheme="green"
                isChecked={addToBeneficiaryList}
                onChange={() => {
                  setAddToBeneficiaryList(!addToBeneficiaryList); // Update the state first
                  if (!addToBeneficiaryList) {
                    handleSwitchChange();
                  }
                }}
              />
            </Flex>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            borderRadius="100px"
            isLoading={loading}
            loadingText="Processing..."
            bg="#A210C6"
            color="white"
            onClick={handleFormSubmit}
          >
            {loading ? "Processing..." : "Book appointment"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BeneficiaryAppointmentModal;
