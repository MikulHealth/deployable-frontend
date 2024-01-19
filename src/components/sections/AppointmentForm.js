import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  Switch,
  Flex,
  Box,
  Select,
  useToast,
} from "@chakra-ui/react";
import { SetUser } from "../../redux/userSlice";

const AppointmentsModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookForSelf, setBookForSelf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedDob, setSelectedDob] = useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const handleDobChange = (date) => {
    setSelectedDob(date);
  };

  const formatDateToUTC = (selectedDate) => {
    if (!selectedDate) return "";

    // Add one day to the selected date
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    return adjustedDate.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    recipientFirstname: "",
    recipientLastname: "",
    recipientPhoneNumber: "",
    customerPhoneNumber: user?.phoneNumber,
    recipientGender: "",
    recipientDOB: "",
    currentLocation: "",
    shift: "",
    recipientDoctor: "",
    recipientDoctorNumber: "",
    recipientHospital: "",
    recipientIllness: "",
    recipientHealthHistory: "",
    servicePlan: "",
    recipientImage: "",
    startDate: "",
    endDate: "",
    medicalReport: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleBookForSelfChange = () => {
    setBookForSelf((prevBookForSelf) => !prevBookForSelf);
  };

  useEffect(() => {
    if (isOpen && bookForSelf) {
      setFormData({
        currentLocation: "",
        shift: "",
        recipientDoctor: "",
        recipientDoctorNumber: "",
        recipientHospital: "",
        recipientHealthHistory: "",
        servicePlan: "",
        startDate: "",
        endDate: "",
        medicalReport: "",
      });
    } else {
      setFormData({
        recipientFirstname: "",
        recipientLastname: "",
        recipientPhoneNumber: "",
        customerPhoneNumber: "",
        recipientGender: "",
        recipientDOB: "",
        recipientImage: "",
        currentLocation: "",
        shift: "",
        recipientDoctor: "",
        recipientDoctorNumber: "",
        recipientHospital: "",
        recipientHealthHistory: "",
        servicePlan: "",
        startDate: "",
        endDate: "",
        medicalReport: "",
      });
    }
  }, [isOpen, bookForSelf, user]);

  useEffect(() => {
    setFormData({
      recipientFirstname: "",
      recipientLastname: "",
      recipientPhoneNumber: "",
      customerPhoneNumber: "",
      recipientGender: "",
      recipientDOB: "",
      recipientImage: "",
      currentLocation: "",
      shift: "",
      recipientDoctor: "",
      recipientDoctorNumber: "",
      recipientHospital: "",
      recipientHealthHistory: "",
      servicePlan: "",
      startDate: "",
      endDate: "",
      medicalReport: "",
    });
    setSelectedDate(null);
    setBookForSelf(false);
  }, [isOpen]);

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

      const userFieldsForBookForSelf = bookForSelf
        ? {
            recipientFirstname: user?.firstName,
            recipientLastname: user?.lastName,
            recipientPhoneNumber: user?.phoneNumber,
            recipientGender: user?.gender,
            recipientDOB: user?.dob,
            recipientImage: user?.image,
          }
        : {};

      const formDataWithDates = {
        ...formData,
        startDate: formatDateWithDayAdjustment(selectedStartDate),
        endDate: formatDateWithDayAdjustment(selectedEndDate),
        ...(bookForSelf ? {} : { recipientDOB: formatDateWithDayAdjustment(selectedDob) }),
        customerPhoneNumber: user?.phoneNumber,
        ...userFieldsForBookForSelf,
      };

      const requestBody = JSON.stringify(formDataWithDates);

      const response = await axios.post(apiUrl, requestBody, { headers });

      if (response && response.data) {
        setLoading(false);

        toast({
          title: "Appointment booked successfully",
          description: response.data.message,
          status: "success",
          duration: 6000,
        });

        onClose();
      } else {
        setLoading(false);

        console.error("Error booking appointment");
        const errorMessage = response.data ? response.data.message : "Unknown error";
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
  
  
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="#A210C6">Book Appointment</ModalHeader>
        <FormControl marginLeft="350px" display="flex" alignItems="center">
          <FormLabel htmlFor="book-for-self" mb="0">
            Book for yourself
          </FormLabel>
          <Switch
            id="book-for-self"
            onChange={handleBookForSelfChange}
            isChecked={bookForSelf}
          />
        </FormControl>
        <ModalCloseButton />
        <ModalBody>
          {bookForSelf ? (
            <FormControl>
              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">
                    Personal Doctor's name{" "}
                  </FormLabel>
                  <Input
                    name="recipientDoctor"
                    type="text"
                    placeholder="Personal Doctor's name"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Doctor's phone number </FormLabel>
                  <Input
                    name="recipientDoctorNumber"
                    type="text"
                    placeholder="Personal Doctor's phone number"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
              </Flex>
              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">Personal hospital </FormLabel>
                  <Input
                    name="recipientHospital"
                    type="text"
                    placeholder="Hospital name"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Upload medical report </FormLabel>
                  <Input
                    name="medicalReport"
                    type="file"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
              </Flex>
              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">Health History </FormLabel>
                  <Input
                    name="recipientHealthHistory"
                    type="text"
                    placeholder="Health History"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Current Location </FormLabel>
                  <Input
                    name="currentLocation"
                    type="text"
                    placeholder="Current Location"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
              </Flex>

              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">Shift </FormLabel>
                  <Select
                    name="shift"
                    placeholder="Select preferred shift"
                    w="250px"
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  >
                    <option value="Elderly care">Elderly care</option>
                    <option value="Postpartum care">Postpartum care</option>
                    <option value="Recovery care">Recovery care</option>
                  </Select>
                </Box>
              </Flex>

              <Flex marginTop="1px">
                <Box w="250px">
                  <FormLabel marginTop="20px">Start Date</FormLabel>
                  <DatePicker
                    name="startDate"
                    selected={selectedStartDate}
                    onChange={(date) => handleStartDateChange(date)}
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
                    selected={selectedEndDate}
                    onChange={(date) => handleEndDateChange(date)}
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
            </FormControl>
          ) : (
            <FormControl>
              <FormLabel> Enter Beneficiary name</FormLabel>
              <Flex>
                <Input
                  name="recipientFirstname"
                  placeholder="First name"
                
                  onChange={handleInputChange}
                  w="250px"
                />
                <Input
                  name="recipientLastname"
                  marginLeft="2px"
                  placeholder="Last name"
                  onChange={handleInputChange}
                  w="250px"
                />
              </Flex>
              <Flex direction="row" justify="space-between">
                <Box>
                  <FormLabel marginTop="20px">Gender </FormLabel>
                  <Select
                    name="recipientGender"
                    placeholder="Select your gender"
                    w="250px"
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </Box>
                <Box marginLeft="5px" w="250px">
                  <FormLabel marginTop="20px">Date of Birth</FormLabel>
                  <DatePicker
                    name="recipientDOB"
                    selected={selectedDob}
                    onChange={(date) => handleDobChange(date)}
                    maxDate={new Date()}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select your date of birth"
                    className="form-control"
                  />
                </Box>
              </Flex>
              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">Contact Number </FormLabel>
                  <Input
                    name="recipientPhoneNumber"
                    type="tel"
                    placeholder="Beneficiary PhoneNumber"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>

                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Current Location </FormLabel>
                  <Input
                    name="currentLocation"
                    type="text"
                    placeholder="Current Location"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
              </Flex>

              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">
                    Personal Doctor's name{" "}
                  </FormLabel>
                  <Input
                    name="recipientDoctor"
                    type="text"
                    placeholder="Personal Doctor's name"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Doctor's phone number </FormLabel>
                  <Input
                    name="recipientDoctorNumber"
                    type="text"
                    placeholder="Personal Doctor's phone number"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
              </Flex>
              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">Personal hospital </FormLabel>
                  <Input
                    name="recipientHospital"
                    type="text"
                    placeholder="Hospital name"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Upload medical report </FormLabel>
                  <Input
                    name="medicalReport"
                    type="file"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
              </Flex>
              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">Health History </FormLabel>
                  <Input
                    name="recipientHealthHistory"
                    type="text"
                    placeholder="Health History"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Upload picture </FormLabel>
                  <Input
                    name="recipientImage"
                    type="file"
                    placeholder="Recipient Image"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
              </Flex>

              <Flex marginTop="1px">
                <Box>
                  <FormLabel marginTop="20px">Shift </FormLabel>
                  <Select
                    name="shift"
                    placeholder="Select preferred shift"
                    w="250px"
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  >
                    <option value="Elderly care">Elderly care</option>
                    <option value="Postpartum care">Postpartum care</option>
                    <option value="Recovery care">Recovery care</option>
                  </Select>
                </Box>
              </Flex>

              <Flex marginTop="1px">
                <Box w="250px">
                  <FormLabel marginTop="20px">Start Date</FormLabel>
                  <DatePicker
                    name="startDate"
                    selected={selectedStartDate}
                    onChange={(date) => handleStartDateChange(date)}
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
                    selected={selectedEndDate}
                    onChange={(date) => handleEndDateChange(date)}
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
            </FormControl>
          )}
        </ModalBody>
        <ModalFooter>
          <Button bg="gray" color="white" onClick={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={loading}
            loadingText="Processing..."
            marginLeft="5px"
            bg="#A210C6"
            color="white"
            onClick={handleFormSubmit}
          >
            {loading ? "Processing..." : "Submit"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AppointmentsModal;