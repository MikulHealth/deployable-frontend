import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
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
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Coloredlogo from "../../assets/LogoColoured.svg";
import "../../styles/pages/LandingPage.css";
import logo from "../../assets/Whitelogo.png";

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
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const handleInputChange = (index, value) => {
    setInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };

 

  const resendOtp = async () => {
    const number = localStorage.getItem("phoneNumber");
    const verifyNumberResponse = await axios.post(
      "http://localhost:8080/api/v1/sms/verify-number",
      {
        phoneNumber: number, // Use the user's phone number
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const enteredOtp = inputs.join("");
      const number = localStorage.getItem("phoneNumber");

      const response = await axios.post(
        "http://localhost:8080/api/v1/sms/verify-otp",
        {
          phoneNumber: number,
          otpNumber: enteredOtp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      toast({
        title: "Verification Successful",
        description: "Your phone number has been verified. Kindly login with the new number",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);

    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Wrong or expired OTP,  confirm the code sent or click 'resend code' for a new code",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    AOS.init();
  }, []);


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
        <Box
          overflow="hidden"
          alignContent="center"
          alignItems="center"
          marginTop="30px"
        >
          <Text
            fontFamily="body"
            fontSize="32px"
            color="#A210C6"
            marginTop="50px"
          >
            Verify your phone number
          </Text>
          <Text
            fontFamily="Montserrat"
            fontSize="20px"
            color="black"
            marginTop="30px"
          >
            Please input the 6 digit code sent to your phone number
          </Text>
          <HStack marginLeft="250px" marginTop="50px">
            <PinInput type="alphanumeric" mask={["1", "2", "3", "4", "5", "6"]}>
              {inputs.map((input, index) => (
                <PinInputField
                  key={index}
                  w="140px"
                  h="125px"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  value={input}
                />
              ))}
            </PinInput>
          </HStack>
          <Text fontSize="20px" fontFamily="Montserrat" marginTop="20px">
            Didn’t receive a code?{" "}
            <Button
              fontStyle="italic"
              color="#A210C6"
              onClick={resendOtp}
              isLoading={loading} // Display loading spinner when loading is true
             
            >
              resend code
            </Button>
          </Text>
          {/* <ChakraLink href="/verify-otp"> */}
          <Button
            w="250px"
            h="50px"
            bg="#A210C6"
            marginTop="20px"
            color="white"
            onClick={handleVerify} // Call handleVerify when the button is clicked
            isLoading={loading} // Display loading spinner when loading is true
            loadingText="Verifying..."
          >
            Verify
          </Button>
          {/* </ChakraLink> */}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LandingPage;
