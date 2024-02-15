
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaFile,
  FaCalendarAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  InputGroup,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  InputRightElement,
  Image,
  Box,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import BeneficiariesModal from "./Beneficiaries";
import LocationIcon from "../../assets/LocationIcon.svg";
import CalenderIcon from "../../assets/CalenderIcon.svg";


const AddBeneficiaryForm = ({ isOpen, onClose, openBeneficiariesModal }) => {
  const [selectedDob, setSelectedDob] = useState(null);
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
      setSelectedDob(value);
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

  const handleDOBChange = (date) => {
    setSelectedDob(date);
    setFormData({ ...formData, recipientDOB: date });
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
      const formattedDate = selectedDob
        ? selectedDob.toISOString().split('T')[0]
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
                <InputGroup>
                  <Input
                    name="recipientFirstname"
                    placeholder="first name"
                    value={formData.recipientFirstname}
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
                    marginLeft="5px"
                    placeholder="last name"
                    value={formData.recipientLastname}
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
                    value={formData.recipientGender}
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
                      value={formData.recipientPhoneNumber}
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
