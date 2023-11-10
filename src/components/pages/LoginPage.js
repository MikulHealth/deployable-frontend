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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Login1 from "../../assets/Login1.svg";
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

  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <a href="/">
            <Image src={logo} alt="Logo" w="100px" h="30px" />
            </a>
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
        <Box display="flex">
          <Box>
            <Image src={Login1} alt="Logo" w="715px" h="1024px" />
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
              marginTop="30px"
              marginLeft="20px"
            >
              Login to your account
            </Text>
            <FormControl isRequired marginTop="20px" marginLeft="100px">
              {/* <FormLabel marginTop="20px">Email address</FormLabel> */}
              <Input placeholder="Enter Email" />
              <InputGroup size="md" marginTop="30px">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box marginTop="10px">
                <ChakraLink
                  margingLeft="150px"
                  fontStyle="italic"
                  href="/forgot-password"
                  color="#A210C6"
                >
                  forgot password?
                </ChakraLink>
              </Box>

              <ChakraLink href="/join-complete">
                <Button w="350px" bg="#A210C6" marginTop="20px" color="white">
                  Login
                </Button>
              </ChakraLink>

              <Text fontSize="16px" fontFamily="Montserrat" marginTop="10px">
                Dont have an account?{" "}
                <ChakraLink onClick={onOpen} fontStyle="italic" color="#A210C6">
                  Sign Up
                </ChakraLink>
              </Text>

              <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent bg="gray">
                  <ChakraLink
                    fontStyle="italic"
                    href="/customer-signUp"
                    color="#A210C6"
                  >
                    <Button
                      marginTop="30px"
                      marginLeft="80px"
                      bg="gray"
                      color="black"
                      w="300px"
                      border="1px solid white" 
                    >
                      Sign up
                    </Button>
                  </ChakraLink>
                  <ChakraLink fontStyle="italic" href="/join" color="#A210C6">
                    <Button
                       marginTop="30px"
                       marginLeft="80px"
                       bg="gray"
                       color="black"
                       w="300px"
                       border="1px solid white" 
                    >
                      Sign up as medic
                    </Button>
                  </ChakraLink>
                  <ModalCloseButton />

                  <ModalFooter>
                    <Button
                      marginTop="30px"
                      marginLeft="200px"
                      bg="black"
                      color="white"
                      mr={3}
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LandingPage;
