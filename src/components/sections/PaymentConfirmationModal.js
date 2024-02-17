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
  Skeleton,
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
  const { user } = useSelector((state) => state.userReducer);
  const storedPaymentData = localStorage.getItem("appointmentId");
  const costOfService = localStorage.getItem("costOfService");
  const [paymentData, setPaymentData] = useState({
    email: user.email || "",
    amount: costOfService,
    reference: storedPaymentData,
    name: `${user.firstName || ""} ${user.lastName || ""}`,
    phone: user.phoneNumber || "",
    publicKey: "pk_test_be79821835be2e8689484980b54a9785c8fa0778",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const formattedCost = (cost) => {
    // Divide costOfService by 100 to represent the amount in naira
    const costInNaira = cost / 100;
  
    // Format the costOfService as naira with the last two zeros separated by a dot
    const formattedCost = "₦ " + costInNaira.toLocaleString("en-NG", { maximumFractionDigits: 2 });
  
    return formattedCost;
  };
  

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
          description: "We will match you with a suitable caregiver soon.",
          status: "success",
          duration: 8000,
        });
        localStorage.removeItem("costOfService");
        console.log("Payment verified successfully", response.data.data);
        setPaymentData({
          email: "",
          amount: " ",
          reference: " ",
          name: " ",
          phone: " ",
          publicKey: " ",
        });

        setTimeout(() => {
          window.location.reload();
        }, 3000);
        navigate("/dashboard");
      } else {
        toast({
          title: "Verification failed",
          description: response.data.message,
          status: "error",
          duration: 6000,
        });
        console.error("Payment verification failed");
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred during payment verification:", error);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    navigate("/dashboard");
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
                Hi {user?.firstName}, kindly pay the sum of {formattedCost(costOfService)} to proceed
                with your booking.<br></br> You would be matched with a
                caregiver within 48hrs<br></br>upon a successful payment.
              </Text>
              <FormControl isRequired>
                <Box marginLeft="20px" alignContent="center">
                  <FormLabel marginLeft="270px">Your email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={paymentData.email}
                    onChange={handleInputChange}
                    required
                    w="500"
                  />
                  <FormLabel marginLeft="290px">Your full name</FormLabel>
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
                    <Button color="white" bg="gray" onClick={handleCancel}>
                      Cancel payment
                    </Button>
                  </Box>
                </Flex>
              </FormControl>
            </form>
          </Box>
        </Box>
      {/* )} */}
    </ChakraProvider>
  );
};

export default PaymentConfirmationModal;
