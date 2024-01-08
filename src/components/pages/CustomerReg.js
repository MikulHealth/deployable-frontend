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
import Customer from "../../assets/UserSignUp.svg";
import Shade from "../../assets/Shade.svg";
import logo from "../../assets/Whitelogo.png";
import "../../styles/pages/LandingPage.css";
import LoadingSpinner from "../../utils/Spiner";

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
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setPic] = useState();
  const [show, setShow] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
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
    await postImage(image, formData, setFormData);
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/v1/angel/join",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("phoneNumber", formData.phoneNumber);
      console.log(response);
      toast({
        title: "Registration Successful",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      const verifyNumberResponse = await axios.post(
        "http://localhost:8080/api/v1/sms/verify-number",
        {
          phoneNumber: formData.phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("phoneNumber", formData.phoneNumber);
      // Handle the response for the second API call as needed
      console.log(verifyNumberResponse);

      setTimeout(() => {
        navigate("/verify-number");
      }, 5000);
      // Redirect or perform other actions based on the response
    } catch (error) {
      toast({
        title: "Registration Failed",
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

  const postImage = async (image, formData, setFormData) => {
    setImageLoading(true);
    if (image === undefined) {
      // toast.error("Please select an image")
      return;
    }
    console.log(image);
    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "profileImage");
      data.append("cloud_name", "dmfewrwla");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dmfewrwla/image/upload",
          {
            method: "post",
            body: data,
          }
        );

        const imageData = await response.json();

        setFormData({
          ...formData,
          image: imageData.url.toString(),
        });
        setImageLoading(false);
        console.log(imageData.url.toString());
      } catch (err) {
        console.log(err);
        setImageLoading(false);
      }
    } else {
      // toast.error("Please select an image");

      return;
    }
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
        <Box display="flex">
          <Box>
            <Image src={Customer} alt="Logo" w="715px" h="1024px" />
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
              Create your account
            </Text>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired marginTop="20px" marginLeft="100px">
                <FormLabel>First name</FormLabel>
                <Input
                  name="firstName"
                  placeholder="First name"
                  onChange={handleInputChange}
                />
                <FormLabel marginTop="20px">Last name</FormLabel>
                <Input
                  name="lastName"
                  placeholder="Last name"
                  onChange={handleInputChange}
                />
                <FormLabel marginTop="20px">Email address</FormLabel>
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={handleInputChange}
                />
                <FormLabel marginTop="20px">Home address</FormLabel>
                <Input
                  name="address"
                  placeholder="Home address"
                  type="address"
                  onChange={handleInputChange}
                />
                <FormLabel marginTop="20px">Gender </FormLabel>
                <Select
                 name="gender"
                  placeholder="Select your gender"
                  w="205px"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  onChange={handleInputChange}
                </Select>
                <InputGroup marginTop="20px">
                  <InputLeftAddon children="+234" />
                  <Input
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone number"
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <InputGroup size="md" marginTop="20px">
                  <Input
                    name="password"
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={handleInputChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <InputGroup size="md" marginTop="20px">
                  <Input
                    name="confirmPassword"
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Confirm password"
                    onChange={handleInputChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <FormLabel marginLeft="10px" marginTop="30px">
                  Upload headshort (only PNG and JPG files are accepted)
                </FormLabel>
                <Input
                  name="image"
                  marginLeft="-123px"
                  w="422px"
                  type="file"
                  accept="image/*"
                  placeholder="Image"
                  onChange={(e) => {
                    postImage(e.target.files[0], formData, setFormData);
                  }}
                />
                {imageLoading && <LoadingSpinner size={20} />}

                <ChakraLink href="/join-complete">
                  <Button
                    type="submit"
                    w="350px"
                    bg="#A210C6"
                    marginTop="20px"
                    color="white"
                    isLoading={loading}
                    loadingText="Registering..."
                  >
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </ChakraLink>

                <Text fontSize="16px" fontFamily="Montserrat" marginTop="10px">
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
