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
  Progress,
  Switch,
  Flex,
  Box,
  Select,
  useToast,
  Textarea,
} from "@chakra-ui/react";

const BeneficiaryAppointmentModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [progressBarValue, setProgressBarValue] = useState(25);

  const [formPages, setFormPages] = useState([
    {
      recipientFirstname: "",
      recipientLastname: "",
      recipientPhoneNumber: "",
      recipientGender: "",
      recipientDOB: "",
      currentLocation: "",
      shift: "",
    },
    {
      relationship: "",
      language: "",
      recipientDoctor: "",
      recipientDoctorNumber: "",
      recipientHospital: "",
      medicalReport: "",
    },
    {
      recipientHealthHistory: "",
      recipientImage: "",
      startDate: "",
      endDate: "",
    },
    {
      kinName: "",
      kinNumber: "",
    },
  ]);

  const handleStartDateChange = (date) => {
    updateFormData("startDate", date);
  };

  const handleEndDateChange = (date) => {
    updateFormData("endDate", date);
  };

  const handleDobChange = (date) => {
    updateFormData("recipientDOB", date);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setProgressBarValue((currentPage + 1) * (100 / totalPages));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setProgressBarValue((currentPage - 1) * (100 / totalPages));
    }
  };

  const updateFormData = (name, value) => {
    setFormPages((prevPages) => {
      const updatedPages = [...prevPages];
      updatedPages[currentPage - 1][name] = value;
      return updatedPages;
    });
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

        const formDataWithDates = {
          ...formPages[0],
          ...formPages[1],
          ...formPages[2],
          ...formPages[3],
          startDate: formatDateWithDayAdjustment(formPages[2].startDate),
          endDate: formatDateWithDayAdjustment(formPages[2].endDate),
          recipientDOB: formatDateWithDayAdjustment(formPages[0].recipientDOB),
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

  const totalPages = 4;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="#A210C6">Book Appointment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Progress hasStripe value={progressBarValue} colorScheme="gray" />
          <Progress size="xs" isIndeterminate />
          <FormControl>
            {currentPage === 1 && (
              <FormControl marginLeft="40px">
                <Box>
                  <FormLabel> Enter Beneficiary name</FormLabel>
                  <Flex>
                    <Input
                      name="recipientFirstname"
                      placeholder="First name"
                      value={formPages[0].recipientFirstname}
                      onChange={(e) => handleInputChange(e)}
                      w="250px"
                    />
                    <Input
                      name="recipientLastname"
                      marginLeft="2px"
                      placeholder="Last name"
                      value={formPages[0].recipientLastname}
                      onChange={(e) => handleInputChange(e)}
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
                        value={formPages[0].recipientGender}
                        onChange={(e) => handleInputChange(e)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Select>
                    </Box>
                    <Box marginLeft="5px" w="250px">
                      <FormLabel marginTop="20px">Date of Birth</FormLabel>
                      <DatePicker
                        name="recipientDOB"
                        selected={formPages[0].recipientDOB}
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
                        value={formPages[0].recipientPhoneNumber}
                        onChange={(e) => handleInputChange(e)}
                        w="250px"
                      />
                    </Box>

                    <Box marginLeft="5px">
                      <FormLabel marginTop="20px">Current Location </FormLabel>
                      <Input
                        name="currentLocation"
                        type="text"
                        placeholder="Current Location"
                        value={formPages[0].currentLocation}
                        onChange={(e) => handleInputChange(e)}
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
                        placeholder="preferred service plan"
                        w="250px"
                        value={formPages[0].servicePlan}
                        onChange={(e) => handleInputChange(e)}
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
              <Box marginLeft="30px">
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
            {currentPage === 3 && (
              <Box>
                <FormControl marginLeft="10px">
                  <Box marginLeft="50px">
                    <Box>
                      <FormLabel marginTop="20px">Health History </FormLabel>
                      <Textarea
                        name="recipientHealthHistory"
                        type="text"
                        placeholder="Please share health history and any special need we should be aware of"
                        value={formPages[2].recipientHealthHistory}
                        onChange={(e) => handleInputChange(e)}
                        w="500px"
                      />
                    </Box>
              
                    <Flex marginTop="1px">
                      <Box w="250px">
                        <FormLabel marginTop="20px">Start Date</FormLabel>
                        <DatePicker
                          name="startDate"
                          selected={formPages[2].startDate}
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
                          selected={formPages[2].endDate}
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
                  </Box>
                </FormControl>
              </Box>
            )}
            {currentPage === 4 && (
              <Box>
                <FormControl marginLeft="5px">
                  <Box marginLeft="50px">
                    <Flex marginTop="1px">
                      <Box>
                        <FormLabel marginTop="20px">Next of kin </FormLabel>
                        <Input
                          name="kinName"
                          type="text"
                          placeholder="Next of kin name"
                          value={formPages[3].kinName}
                          onChange={(e) => handleInputChange(e)}
                          w="250px"
                        />
                      </Box>
                      <Box marginLeft="5px">
                        <FormLabel marginTop="20px">Phone number </FormLabel>
                        <Input
                          name="kinNumber"
                          type="text"
                          placeholder="Next of kin phone number"
                          value={formPages[3].kinNumber}
                          onChange={(e) => handleInputChange(e)}
                          w="250px"
                        />
                      </Box>
                    </Flex>
                    <Flex marginTop="1px">
                      <Box>
                        <FormLabel marginTop="20px">
                          Relationship with beneficiary{" "}
                        </FormLabel>
                        <Select
                          name="relationship"
                          placeholder="Select the appropriate relationship type"
                          w="250px"
                          onChange={(e) => handleInputChange(e)}
                          value={formPages[3].relationship}
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
                        <FormLabel marginTop="20px">
                          Preferred Language
                        </FormLabel>
                        <Select
                          name="language"
                          placeholder="Select preferred language"
                          w="250px"
                          onChange={(e) => handleInputChange(e)}
                          value={formPages[3].language}
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
                  </Box>
                </FormControl>
              </Box>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {currentPage > 1 && (
            <Button color="white" bg="gray" mr={3} onClick={handlePreviousPage}>
              Previous
            </Button>
          )}
          {currentPage < 4 ? (
            <Button color="white" bg="#A210C6" mr={3} onClick={handleNextPage}>
              Next
            </Button>
          ) : (
            <>
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
                    after submition before we can match you with a caregiver.
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
                    <Button
                      bg="gray"
                      color="white"
                      onClick={handleCloseConfirmation}
                    >
                      Cancel
                    </Button>
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

export default BeneficiaryAppointmentModal;
