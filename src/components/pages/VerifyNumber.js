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
        <Box overflow="hidden" alignContent="center" alignItems="center" marginTop="30px">
          <Text
            fontFamily="body"
            fontSize="32px"
            color="#A210C6"
            marginTop="50px"
          >
            Verify you phone number
          </Text>
          <Text
            fontFamily="Montserrat"
            fontSize="20px"
            color="black"
            marginTop="30px"
          >
            Please input the 6 digit code sent to phone number +23470xxxxxxxx
          </Text>
          <HStack marginLeft="250px" marginTop="50px">
            <PinInput type="alphanumeric" mask>
              <PinInputField w="140px" h="125px" />
              <PinInputField w="140px" h="125px" />
              <PinInputField w="140px" h="125px" />
              <PinInputField w="140px" h="125px" />
              <PinInputField w="140px" h="125px" />
              <PinInputField w="140px" h="125px" />
            </PinInput>
          </HStack>
          <Text fontSize="20px" fontFamily="Montserrat" marginTop="20px">
            Didn’t receive a code? {" "}
            <ChakraLink fontStyle="italic" href="/resend-otp" color="#A210C6">
              resend code
            </ChakraLink>
          </Text>
          <ChakraLink href="/verify-otp">
            <Button
              w="250px"
              h="50px"
              bg="#A210C6"
              marginTop="20px"
              color="white"
            >
              Verify
            </Button>
          </ChakraLink>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LandingPage;
