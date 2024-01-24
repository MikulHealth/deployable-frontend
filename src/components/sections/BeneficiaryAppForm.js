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
const BeneficiaryAppointmentModal = ({ isOpen, onClose }) => {
    const toast = useToast();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.userReducer);
    const [loading, setLoading] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedDob, setSelectedDob] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
  
    const [page1FormData, setPage1FormData] = useState({
      recipientFirstname: "",
      recipientLastname: "",
      recipientPhoneNumber: "",
      recipientGender: "",
      recipientDOB: "",
      currentLocation: "",
      shift: "",
    });
  
    const [page2FormData, setPage2FormData] = useState({
      relationship: "",
      language: "",
      recipientDoctor: "",
      recipientDoctorNumber: "",
      recipientHospital: "",
      medicalReport: "",
    });
  
    const [page3FormData, setPage3FormData] = useState({
      recipientHealthHistory: "",
      recipientImage: "",
      startDate: "",
      endDate: "",
    });
  
    const [page4FormData, setPage4FormData] = useState({
      kinName: "",
      kinNumber: "",
    });
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
  
    const handlePreviousPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };
  
    const handleStartDateChange = (date) => {
      setSelectedStartDate(date);
    };
  
    const handleEndDateChange = (date) => {
      setSelectedEndDate(date);
    };
  
    const handleDobChange = (date) => {
      setSelectedDob(date);
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      switch (currentPage) {
        case 1:
          setPage1FormData((prevData) => ({ ...prevData, [name]: value }));
          break;
        case 2:
          setPage2FormData((prevData) => ({ ...prevData, [name]: value }));
          break;
        case 3:
          setPage3FormData((prevData) => ({ ...prevData, [name]: value }));
          break;
        case 4:
          setPage4FormData((prevData) => ({ ...prevData, [name]: value }));
          break;
        default:
          break;
      }
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
  
        const formatDateWithDayAdjustment = (selectedDate) => {
          if (!selectedDate) return "";
  
          // Add one day to the selected date
          const adjustedDate = new Date(selectedDate);
          adjustedDate.setDate(adjustedDate.getDate() + 1);
  
          return adjustedDate.toISOString().split("T")[0];
        };
  
        const formDataWithDates = {
          ...page1FormData,
          ...page2FormData,
          ...page3FormData,
          ...page4FormData,
          startDate: formatDateWithDayAdjustment(selectedStartDate),
          endDate: formatDateWithDayAdjustment(selectedEndDate),
          recipientDOB: formatDateWithDayAdjustment(selectedDob),
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
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="#A210C6">Book Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {currentPage === 1 && (
            <FormControl marginLeft="80px">
              <Box>
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
                <Flex>
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
                      <option value="Nanny care">Nanny care</option>
                    </Select>
                  </Box>
                </Flex>
              </Box>
            </FormControl>
          )}
          {currentPage === 2 && (
            <FormControl marginLeft="40px">
              <Flex marginLeft="50px">
                <Box>
                  <FormLabel marginTop="20px">
                    Relationship with beneficiary{" "}
                  </FormLabel>
                  <Select
                    name="relationship"
                    placeholder="Select the appropriate relationship type"
                    w="250px"
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
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">Preferred Language</FormLabel>
                  <Select
                    name="language"
                    placeholder="Select preferred language"
                    w="250px"
                    onChange={handleInputChange}
                  >
                    <option value="eng">English</option>
                    <option value="igbo">Igbo</option>
                    <option value="yoruba">Yoruba</option>
                    <option value="housa">Hausa</option>
                    <option value="Pigeon">Pidgeon</option>
                    <option value="other">Others</option>
                  </Select>
                </Box>
              </Flex>
              <Box marginLeft="50px">
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
                    <FormLabel marginTop="20px">
                      Doctor's phone number{" "}
                    </FormLabel>
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
                    <FormLabel marginTop="20px">
                      Upload medical report{" "}
                    </FormLabel>
                    <Input
                      name="medicalReport"
                      type="file"
                      onChange={handleInputChange}
                      w="250px"
                    />
                  </Box>
                </Flex>
              </Box>
            </FormControl>
          )}
          {currentPage === 3 && (
            <FormControl marginLeft="40px">
              <Box marginLeft="50px">
                <Box>
                  <FormLabel marginTop="20px">Health History </FormLabel>
                  <Textarea
                    name="recipientHealthHistory"
                    type="text"
                    placeholder="Please share health history and any special need we should be aware of"
                    onChange={handleInputChange}
                    w="500px"
                  />
                </Box>
                <Box marginLeft="5px">
                  <FormLabel marginTop="20px">
                    Upload beneficiary's picture{" "}
                  </FormLabel>
                  <Input
                    name="recipientImage"
                    type="file"
                    placeholder="Recipient Image"
                    onChange={handleInputChange}
                    w="500px"
                  />
                </Box>

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
              </Box>
            </FormControl>
          )}
          {currentPage === 4 && (
            <FormControl marginLeft="40px">
              <Box marginLeft="50px">
                <Flex marginTop="1px">
                  <Box>
                    <FormLabel marginTop="20px">Next of kin </FormLabel>
                    <Input
                      name="kinName"
                      type="text"
                      placeholder="Next of kin name"
                      onChange={handleInputChange}
                      w="250px"
                    />
                  </Box>
                  <Box marginLeft="5px">
                    <FormLabel marginTop="20px">Phone number </FormLabel>
                    <Input
                      name="kinNumber"
                      type="text"
                      placeholder="Next of kin phone number"
                      onChange={handleInputChange}
                      w="250px"
                    />
                  </Box>
                </Flex>
              </Box>
            </FormControl>
          )}
        </ModalBody>
        <ModalFooter>
          {currentPage > 1 && currentPage < 4 && (
            <Button
              bg="gray"
              color="white"
              onClick={handlePreviousPage}
              marginRight="5px"
            >
              Previous
            </Button>
          )}
          {currentPage < 4 && (
            <Button
              bg="#A210C6"
              color="white"
              onClick={handleNextPage}
              marginRight="5px"
            >
              Next
            </Button>
          )}
          {currentPage === 4 && (
            <>
              <Button
                bg="gray"
                color="white"
                onClick={handlePreviousPage}
                marginRight="5px"
              >
                Previous
              </Button>
              <Button
                isLoading={loading}
                loadingText="Processing..."
                marginLeft="5px"
                bg="#A210C6"
                color="white"
                onClick={handleOpenConfirmation}
              >
                {loading ? "Processing..." : "Submit"}
              </Button>
            </>
          )}
          {currentPage === 4 && (
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
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BeneficiaryAppointmentModal;
