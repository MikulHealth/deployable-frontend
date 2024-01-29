import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/userSlice";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GetCurrentUser } from "../../apiCalls/UserApis";
import { Link } from "react-router-dom";

import {
  Box,
  useToast,
  extendTheme,
  ChakraProvider,
  Text,
  Link as ChakraLink,
  HStack,
  Spacer,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  Image,
} from "@chakra-ui/react";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
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

const PaymentConfirmationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);

  const [paymentData, setPaymentData] = useState({
    email: "", // Initialize email as an empty string
    amount: 500000,
    reference: appointmentId,
    name: "", // Initialize name as an empty string
    phone: "", // Initialize phone as an empty string
    publicKey: "pk_test_be79821835be2e8689484980b54a9785c8fa0778",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          console.log("Calling GetCurrentUser API");
          const response = await GetCurrentUser();

          if (response.success) {
            console.log("API response:", response.data);
            setUser(response.data);

            const storedPaymentData = localStorage.getItem("appointmentId");

            setAppointmentId(storedPaymentData);
            setPaymentData({
              email: user?.email,
              amount: 500000,
              reference: storedPaymentData,
              name: user?.firstName + " " + user?.lastName,
              phone: user?.phoneNumber,
              publicKey: "pk_test_be79821835be2e8689484980b54a9785c8fa0778",
            });
            console.log("This is user", user?.firstName);
          } else {
            console.error("API request failed:", response.error);
          }
        } catch (error) {
          console.error("Error in GetCurrentUser API:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  const handlePaymentSuccess = (response) => {
    verifyPayment();
    onClose();
  };

  const handlePaymentFailure = (error) => {
    toast({
      title: "Payment Failed",
      description: "There was an issue processing your payment.",
      status: "error",
      duration: 6000,
    });
  };

  const verifyPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const appointmentId = localStorage.getItem("appointmentId");

      const apiUrl = `http://localhost:8080/v1/payment/verify/${appointmentId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });
      console.log(response.data);

      if (response.data.status === true) {
        toast({
          title: "Payment verified",
          description: response.data.message,
          status: "success",
          duration: 6000,
        });
        console.log("Payment verified successfully", response.data.data);
        navigate("/dashboard");
      } else {
        toast({
          title: "Verification failed",
          description: response.data.message,
          status: "error",
          duration: 6000,
        });
        console.error("Payment verification failed");
        localStorage.removeItem("appointmentId");
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred during payment verification:", error);
      navigate("/dashboard");
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
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
            <ChakraLink fontStyle="italic" href="/dashboard" color="#A210C6">
              <Button bg="white">Dashboad</Button>
            </ChakraLink>
          </HStack>
        </Box>
        <Box
          marginLeft="350px"
          marginTop="50px"
          w="50vw"
          h="70vh"
          // bg="#F6E4FC"
          borderRadius="10px"
        >
          <Text
            fontSize="32px"
            fontFamily="body"
            color="#A210C6"
            paddingTop="15px"
            // marginLeft="-370px"
          >
            Confirm Payment
          </Text>
          <form onSubmit={handlePayment}>
            <Text marginLeft="70px" bg="#F6E4FC" marginBottom="30px" w="40vw">
              Hi {user?.firstName}, kindly pay the sum of 250,000 to proceed
              with your booking.<br></br> You would be matched with a caregiver
              within 48hrs<br></br>upon a successful payment.
            </Text>
            <FormControl isRequired>
              <Box marginLeft="20px" alignContent="center">
                <FormLabel marginLeft="290px">Your name</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={paymentData.email}
                  onChange={handleInputChange}
                  required
                  w="500"
                />
                <FormLabel marginLeft="290px">Your name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={paymentData.name}
                  onChange={handleInputChange}
                  required
                  w="500"
                />
                <FormLabel marginLeft="270px">Your phone number</FormLabel>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={paymentData.phone}
                  onChange={handleInputChange}
                  required
                  w="500"
                />
              </Box>
              <Flex marginTop="30px" marginLeft="200px">
                <Box mr={3}>
                  <Button
                    bg="#A210C6"
                    color="white"
                    onClick={handlePayment}
                    isLoading={loading}
                  >
                    <Box color="white">
                      {/* Use the retrieved paymentData */}
                      <PaystackButton
                        {...paymentData}
                        text="Make Payment"
                        className="submits"
                        onSuccess={handlePaymentSuccess}
                        onClose={handlePaymentFailure}
                      />
                    </Box>
                  </Button>
                </Box>
                <Box>
                  <Button color="white" bg="gray" as={Link} to="/dashboard">
                    Cancel payment
                  </Button>
                </Box>
              </Flex>
            </FormControl>
          </form>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default PaymentConfirmationModal;
