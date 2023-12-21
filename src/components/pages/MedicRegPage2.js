import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Link as ChakraLink,
  HStack,
  Spacer,
  Image,
  extendTheme,
  ChakraProvider,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Textarea,
  useToast,
  Select,
} from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Nurse from "../../assets/Nurse.svg";
import Shade from "../../assets/Shade.svg";
import logo from "../../assets/Whitelogo.png";
import "../../styles/pages/LandingPage.css";

const customTheme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
  fonts: {
    body: "Gill Sans MT, sans-serif",
    heading: "Gill Sans MT, sans-serif",
  },
});

const LandingPage = () => {
  const [formData, setFormData] = useState({
    NIN: "",
    license: "",
    guarantorName: "",
    guarantorPhone: "",
    guarantorEmail: "",
    medicType: "",
    specialization: "",
    CVCopy: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    homeAddress: "",
    phoneNumber: localStorage.getItem("phoneNumber"),
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const toast = useToast();
  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/angel/verify-medic",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle response as needed
      console.log(response);
      toast({
        title: "Successful",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/confirm-medic-reg");
      }, 3000);
      // Redirect or perform other actions based on the response
    } catch (error) {
      toast({
        title: "Failed",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      // Set loading back to false regardless of success or failure
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const handleFileChange = (event) => {
    // Access the selected file using event.target.files
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    // Perform any additional logic or state updates as needed
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box overflowY="scroll" height="100vh">
        <Box
          bg="#A210C6"
          p={3}
          color="white"
          position="sticky"
          top="0"
          zIndex="1000"
          borderBottom="1px solid white"
        >
          <HStack spacing={10}>
            <Box w="5px" />
            <a href="/">
              <Image src={logo} alt="Logo" w="100px" h="30px" />
            </a>
            <Spacer />
            <Spacer />
            <Spacer />
            <Spacer />
            <ChakraLink fontStyle="italic" href="/" color="#A210C6">
              <Button bg="white">Home</Button>
            </ChakraLink>
          </HStack>
        </Box>
        <Box display="flex" overflow="hidden">
          <Box>
            <Image src={Nurse} alt="Logo" w="715px" h="1024px" />
            <Image
              src={Shade}
              alt="Logo"
              w="715px"
              h="1024px"
              marginTop="-900px"
            />
          </Box>
          <Box>
            <Text
              fontSize="32px"
              fontFamily="body"
              color="#A210C6"
              marginTop="80px"
              marginLeft="10px"
            >
              Complete Registration
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired marginTop="20px" marginLeft="125px">
                <Box display="flex" marginTop="20px">
                  <Box>
                    <FormLabel>Your Home address</FormLabel>
                    <Input
                      name="homeAddress"
                      placeholder="Home address"
                      htmlSize={20}
                      width="auto"
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Guaranto's Name</FormLabel>
                    <Input
                      name="gurantorName"
                      placeholder="Full name"
                      htmlSize={20}
                      width="auto"
                      marginLeft="10px"
                      onChange={handleInputChange}
                    />
                  </Box>
                </Box>
                <Box display="flex" marginTop="30px">
                  <Box>
                    <FormLabel>Guarantor's email address</FormLabel>
                    <Input
                      name="guarantorEmail"
                      placeholder="email address"
                      htmlSize={20}
                      width="auto"
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <FormLabel>Guarantor's Phone number</FormLabel>
                    <Input
                      name="guarantorPhone"
                      placeholder="Phone number"
                      htmlSize={20}
                      width="auto"
                      marginLeft="10px"
                      onChange={handleInputChange}
                    />
                  </Box>
                </Box>
                <Box name="medicType" display="flex" marginTop="30px">
                  <Select placeholder="Medic Type" w="205px">
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    onChange={handleInputChange}
                  </Select>
                  <Box>
                    <Select
                      name="specialization"
                      placeholder="Specialization"
                      w="205px"
                      marginLeft="10px"
                    >
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                      onChange={handleInputChange}
                    </Select>
                  </Box>
                </Box>
                <Box display="flex" marginTop="30px">
                  <Select
                    name="bankName"
                    placeholder="Your Bank name"
                    w="205px"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    onChange={handleInputChange}
                  </Select>
                  <Box>
                    <Input
                      name="accountNumber"
                      placeholder="Account number"
                      htmlSize={20}
                      width="auto"
                      marginLeft="10px"
                      onChange={handleInputChange}
                    />
                  </Box>
                </Box>

                <Box display="flex" marginTop="30px">
                  <Box >
                    <Input
                      name="accountName"
                      placeholder="Account Name"
                      htmlSize={20}
                      width="auto"
                     
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box>
                    <Input
                      name="NIN"
                      placeholder="NIN ID"
                      htmlSize={20}
                      width="auto"
                      marginLeft="10px"
                    />
                  </Box>
                  </Box>
                  <FormLabel marginLeft="10px" marginTop="30px">
                    Upload CV
                  </FormLabel>
                  <Input
                    name="CVCopy"
                    marginLeft="-123px"
                    w="422px"
                    type="file"
                    onChange={handleFileChange}
                  />
               

                <FormControl marginLeft="-5px">
                  <FormLabel marginLeft="10px" marginTop="30px">
                    Upload valid licence
                  </FormLabel>
                  <Input
                    name="License"
                    marginLeft="-123px"
                    w="422px"
                    type="file"
                    onChange={handleFileChange}
                  />

                  <FormLabel marginLeft="10px" marginTop="30px">
                    Upload headshort (only PNG and JPG files are accepted)
                  </FormLabel>
                  <Input
                    name="image"
                    marginLeft="-123px"
                    w="422px"
                    type="file"
                    onChange={handleFileChange}
                  />
                </FormControl>
                <Text
                  marginLeft="-123px"
                  fontSize="18px"
                  fontFamily="Montserrat"
                  marginTop="20px"
                  // fontWeight="bold"
                >
                  By clicking the “create account” button, you agree to our{" "}
                  <br></br>
                  <ChakraLink fontStyle="italic" href="/login" color="#A210C6">
                    terms and conditions
                  </ChakraLink>
                </Text>
                <Button
                  type="submit"
                  w="350px"
                  bg="#A210C6"
                  marginTop="20px"
                  marginLeft="-140px"
                  color="white"
                  isLoading={loading}
                  loadingText="Creating..."
                >
                  {loading ? "Loading..." : "Create Account"}
                </Button>
                <Text
                  marginLeft="-123px"
                  fontSize="16px"
                  fontFamily="Montserrat"
                  marginTop="10px"
                  fontWeight="bold"
                >
                  Already have an account?{" "}
                  <ChakraLink fontStyle="italic" href="/login" color="#A210C6">
                    Login
                  </ChakraLink>
                </Text>
              </FormControl>
            </form>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LandingPage;
