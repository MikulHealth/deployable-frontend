// AddBeneficiaryForm.js
import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import BeneficiariesModal from "./Beneficiaries";


const AddBeneficiaryForm = ({ isOpen, onClose, openBeneficiariesModal }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.userReducer);
  const [isBeneficiary, setBeneficiary] = useState(false);

  const [formData, setFormData] = useState({
    customerPhoneNumber: user.phoneNumber,
    recipientFirstname: "",
    recipientLastname: "",
    recipientPhoneNumber: "",
    recipientGender: "",
    recipientDOB: "",
    kinName: "",
    KinNumber: "",
    language: "",
    relationship: "",
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "DOB") {
      setSelectedDate(value);
      setFormData({
        ...formData,
        recipientDOB: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleAddBeneficiary = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Format the date to match the backend expectations
      const formattedDate = selectedDate
        ? selectedDate.toISOString().split('T')[0]
        : '';
  
      const dataToSend = {
        ...formData,
        recipientDOB: formattedDate,
      };
  
      const response = await axios.post(
        "http://localhost:8080/v1/appointment/addNewBeneficiary",
        dataToSend,
        config
      );
  
      if (response.data.success) {
        setLoading(false);
        toast({
          title: response.data.message,
          status: "success",
          duration: 6000,
        });
        onClose();
      } else {
        setLoading(false);
        toast({
          title: response.data.message,
          description: response.message,
          status: "error",
          duration: 6000,
        });
        console.error("Failed to add beneficiary");
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error adding a new beneficiary",
        description: "Beneficiary may exist already",
        status: "error",
        duration: 6000,
      });
      console.error("Error adding beneficiary:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" borderRadius="0px">
      <ModalOverlay />
      <ModalContent maxH="80vh" overflowY="auto">
        <ModalHeader color="#A210C6">Add Beneficiary</ModalHeader>
        <ModalCloseButton />
        <ModalBody marginLeft="45px">
          <VStack align="start" spacing={4}>
            <FormControl w="40vw">
              <FormLabel> Enter Beneficiary name</FormLabel>
              <Flex>
                <Input
                  name="recipientFirstName"
                  placeholder="First name"
                  onChange={handleInputChange}
                  w="250px"
                />
                <Input
                  name="recipientLastName"
                  marginLeft="5px"
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
                <Box marginLeft="10px">
                  <FormLabel marginTop="20px">Date of Birth</FormLabel>
                  <DatePicker
                    name="DOB"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
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
                    w="500px"
                  />
                </Box>
              </Flex>

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
                    name="KinNumber"
                    type="tel"
                    placeholder="Next of kin phone number"
                    onChange={handleInputChange}
                    w="250px"
                  />
                </Box>
              </Flex>
              <Flex>
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
                    <option value="English">English</option>
                          <option value="Igbo">Igbo</option>
                          <option value="Yoruba">Yoruba</option>
                          <option value="Housa">Hausa</option>
                          <option value="Pigeon">Pidgeon</option>
                          <option value="Others">Others</option>
                  </Select>
                </Box>
              </Flex>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Box marginRight="20px">
            <Button onClick={onClose} color="black" ml={3}>
              Cancel
            </Button>
            <Button
              marginLeft="10px"
              color="white"
              bg="#A210C6"
              isLoading={loading}
              loadingText="Saving..."
              onClick={handleAddBeneficiary}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
      {isBeneficiary && (
    <BeneficiariesModal
      isOpen={isBeneficiary}
      onClose={() => setBeneficiary(false)}
    />
  )}
    </Modal>
  )
};

export default AddBeneficiaryForm;
