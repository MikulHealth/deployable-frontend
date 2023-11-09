import React from "react";
import { useState, useEffect } from "react";
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
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

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
            <Image src={logo} alt="Logo" w="100px" h="30px" />
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
            <FormControl isRequired marginTop="20px" marginLeft="125px">
              <Box display="flex" marginTop="20px">
                <Box>
                  <FormLabel>NIN ID</FormLabel>
                  <Input placeholder="NIN ID" htmlSize={20} width="auto" />
                </Box>
                <Box>
                  <FormLabel>Guaranto's Name</FormLabel>
                  <Input
                    placeholder="Full name"
                    htmlSize={20}
                    width="auto"
                    marginLeft="10px"
                  />
                </Box>
              </Box>
              <Box display="flex" marginTop="30px">
                <Box>
                  <FormLabel>Guarantor's email address</FormLabel>
                  <Input
                    placeholder="email address"
                    htmlSize={20}
                    width="auto"
                  />
                </Box>
                <Box>
                  <FormLabel>Guaranto's Phone number</FormLabel>
                  <Input
                    placeholder="Phone number"
                    htmlSize={20}
                    width="auto"
                    marginLeft="10px"
                  />
                </Box>
              </Box>
              <Box display="flex" marginTop="30px">
                <Select placeholder="Medic Type" w="205px">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <Box>
                  <Select
                    placeholder="Specialization"
                    w="205px"
                    marginLeft="10px"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Box>
              </Box>
              <Box display="flex" marginTop="30px">
                <Select placeholder="Your Bank name" w="205px">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
                <Box>
                  <Input
                    placeholder="Account number"
                    htmlSize={20}
                    width="auto"
                    marginLeft="10px"
                  />
                </Box>
              </Box>

              <FormControl marginLeft="-5px">
                <FormLabel marginLeft="10px" marginTop="30px">
                  Upload CV
                </FormLabel>
                <Input
                  marginLeft="-123px"
                  w="422px"
                  type="file"
                  onChange={handleFileChange}
                />

                <FormLabel marginLeft="10px" marginTop="30px">
                  Upload valid licence
                </FormLabel>
                <Input
                  marginLeft="-123px"
                  w="422px"
                  type="file"
                  onChange={handleFileChange}
                />

                <FormLabel marginLeft="10px" marginTop="30px">
                  Upload headshort (only PNG and JPG files are accepted)
                </FormLabel>
                <Input
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
                marginLeft="-123px"
                w="350px"
                bg="#A210C6"
                marginTop="20px"
                color="white"
              >
                Create account
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
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LandingPage;
