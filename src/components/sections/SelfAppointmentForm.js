import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../../utils/Spiner";
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
  Textarea,
} from "@chakra-ui/react";
import { SetUser } from "../../redux/userSlice";

const SelfAppointmentModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookForSelf, setBookForSelf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedDob, setSelectedDob] = useState(null);

  const formatDateToUTC = (selectedDate) => {
    if (!selectedDate) return "";

    // Add one day to the selected date
    const adjustedDate = new Date(selectedDate);
    adjustedDate.setDate(adjustedDate.getDate() + 1);

    return adjustedDate.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    currentLocation: "",
    shift: "",
    recipientDoctor: "",
    recipientDoctorNumber: "",
    recipientHospital: "",
    recipientIllness: "",
    recipientHealthHistory: "",
    servicePlan: "",
    startDate: "",
    endDate: "",
    medicalReport: "",
  });

  const [formPages, setFormPages] = useState([
    {
      currentLocation: "",
      shift: "",
      startDate: "",
      endDate: "",
      servicePlan: "",
      recipientHealthHistory: "",
    },
    {
      recipientDoctor: "",
      recipientDoctorNumber: "",
      recipientHospital: "",
      medicalReport: "",
    },
  ]);

  const handleStartDateChange = (date) => {
    updateFormData("startDate", date);
  };

  const handleEndDateChange = (date) => {
    updateFormData("endDate", date);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const updateFormData = (name, value) => {
    setFormPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage - 1][name] = value;
      return updatedPages;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
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
        kinName: user?.kinName,
        kinNumber: user?.kinNumber,
      };
  
      const formDataWithDates = {
        ...formPages[0],
        startDate: formatDateWithDayAdjustment(selectedStartDate),
        endDate: formatDateWithDayAdjustment(selectedEndDate),
        recipientDOB: formatDateWithDayAdjustment(selectedDob), 
        customerPhoneNumber: user?.phoneNumber,
        ...userFieldsForBookForSelf,
        ...formPages[1],
      };
  
      const requestBody = JSON.stringify(formDataWithDates);
  
      const response = await axios.post(apiUrl, requestBody, { headers });
  
      if (response && response.data) {
        setLoading(false);
  
        toast({
          title: "Booked successfully",
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
  
  const handleOpenConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleConfirmSubmit = () => {
    handleFormSubmit();
    handleCloseConfirmation();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="#A210C6">Book Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            {currentPage === 1 && (
              <Box>
                <Flex marginLeft="50px">
                  <Box w="250px">
                    <FormLabel marginTop="20px">Start Date</FormLabel>
                    <DatePicker
                      name="startDate"
                      selected={formPages[0].startDate}
                      onChange={(e) => handleStartDateChange(e)}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Preferred date to start"
                      className="form-control"
                    />
                  </Box>
                  <Box w="250px" marginLeft="5px">
                    <FormLabel marginTop="20px">End Date</FormLabel>
                    <DatePicker
                      name="endDate"
                      selected={formPages[0].endDate}
                      onChange={(e) => handleEndDateChange(e)}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Preferred date to end"
                      className="form-control"
                    />
                  </Box>
                </Flex>
                <Flex>
                  <Box marginLeft="50px">
                    <FormLabel marginTop="20px">Shift </FormLabel>
                    <Select
                      name="shift"
                      placeholder="Select preferred shift"
                      w="250px"
                      value={formPages[0].shift}
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
                      placeholder="Preferred service plan"
                      w="250px"
                      value={formPages[0].servicePlan}
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="Elderly care">Elderly care</option>
                      <option value="Postpartum care">Postpartum care</option>
                      <option value="Nanny care">Nanny care</option>
                      <option value="Recovery care">Recovery care</option>
                    </Select>
                  </Box>
                </Flex>
                <Box marginLeft="50px">
                  <FormLabel marginTop="20px">Current Location </FormLabel>
                  <Input
                    name="currentLocation"
                    type="text"
                    placeholder="Current Location"
                    value={formPages[0].currentLocation}
                    onChange={(e) => handleInputChange(e)}
                    w="500px"
                  />
                </Box>

                <Flex marginLeft="50px">
                  <Box>
                    <FormLabel marginTop="20px">Health History </FormLabel>
                    <Textarea
                      name="recipientHealthHistory"
                      type="text"
                      placeholder="Please share health history and any special need we should be aware of"
                      value={formPages[0].recipientHealthHistory}
                      onChange={(e) => handleInputChange(e)}
                      w="500px"
                    />
                  </Box>
                </Flex>
              </Box>
            )}
            {currentPage === 2 && (
              <Box>
                <Flex>
                  <Box>
                    <FormLabel marginTop="20px">
                      Personal Doctor's name{" "}
                    </FormLabel>
                    <Input
                      name="recipientDoctor"
                      type="text"
                      placeholder="Personal Doctor's name"
                      value={formPages[1].recipientDoctor}
                      onChange={(e) => handleInputChange(e)}
                      w="250px"
                    />
                  </Box>
                  <Box marginLeft="50px">
                    <FormLabel marginTop="20px">
                      Doctor's phone number{" "}
                    </FormLabel>
                    <Input
                      name="recipientDoctorNumber"
                      type="tel"
                      placeholder="Personal Doctor's phone number"
                      value={formPages[1].recipientDoctorNumber}
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
                      value={formPages[1].recipientHospital}
                      onChange={(e) => handleInputChange(e)}
                      w="250px"
                    />
                  </Box>
                  <Box marginLeft="50px">
                    <FormLabel marginTop="20px">
                      Upload medical report{" "}
                    </FormLabel>
                    <Input
                      name="medicalReport"
                      type="file"
                      onChange={(e) => handleInputChange(e)}
                      w="250px"
                    />
                  </Box>
                </Flex>
              </Box>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {currentPage === 1 ? (
            <Button
              bg="#A210C6"
              color="white"
              onClick={handleNextPage}
              // marginRight="5px"
            >
              Next
            </Button>
          ) : (
            <Button
              bg="gray"
              color="white"
              onClick={handlePreviousPage}
              marginRight="5px"
            >
              Previous
            </Button>
          )}
          {currentPage === 2 && (
            <>
              <Button
                isLoading={loading}
                loadingText="Processing..."
                bg="#A210C6"
                color="white"
                onClick={handleOpenConfirmation}
              >
                {loading ? "Processing..." : "Submit"}
              </Button>
              <Modal
                isOpen={isConfirmationOpen}
                onClose={handleCloseConfirmation}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Confirm Submission</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    Are you sure you want to submit the form? <br></br>
                    Please note that you would have to make payment immidiately
                    after submit before we can match you with a caregiver.
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={handleConfirmSubmit}
                    >
                      Confirm
                    </Button>
                    <Button onClick={handleCloseConfirmation}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SelfAppointmentModal;
