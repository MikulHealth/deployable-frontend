import React from "react";
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
} from "@chakra-ui/react";
import logo from "../../assets/Whitelogo.png";
import MHNurse from "../../assets/MHNurse.svg";
import Bar from "../../assets/Bar.svg";
import Elderly from "../../assets/ElderlyCare.svg";
import PostPaturm from "../../assets/Postpatum.svg";
import Recovery from "../../assets/RecoveryCare.svg";
import Online from "../../assets/OnlineConsult.svg";
import Doctor from "../../assets/Doctor.svg";

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
  return (
    <ChakraProvider theme={customTheme}>
      <Box>
        <Box bg="#A210C6" p={3} color="white">
          <HStack spacing={10}>
            <Box w="5px" />
            <Image src={logo} alt="Logo" w="100px" h="30px" />
            <Spacer />
            <Spacer />
            <Spacer />
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/join">Join us</Link>
            <Spacer />
            <Button bg="white">Get Started</Button>
            <Box w="5px" />
          </HStack>
        </Box>
        <Box h="60px" />
        <Box display="flex">
          <HStack spacing={8} alignItems="center">
            <Box w="25px" />
            <Box>
              <Text fontSize="6xl" fontWeight="bold" fontFamily="body">
                <span style={{ color: "#A210C6" }}>Healthcare</span> that you{" "}
                <br />
                deserve at your
                <br />
                fingertips
              </Text>
              <Text fontSize="20px" color="#A210C6" fontFamily="Montserrat">
                We source carefully trained medics to help <br />
                you and your loved ones on their health
                <br />
                journey.
              </Text>
              <Button bg="#A210C6" color="white">
                Get Started
              </Button>
            </Box>
          </HStack>
          <Spacer />
          <Box>
            <Image src={MHNurse} alt="Logo" w="642px" h="710px" />
          </Box>
          <Spacer />
        </Box>
        <Box h="60px" />
        <Box bg="#A210C6">
        <Box h="60px" />
          <Box>
            <Text
              fontSize="48px"
              fontWeight="bold"
              fontFamily="body"
              color="white"
            >
              Our Services
            </Text>
          </Box>
          <Box h="20px" />
          <Box display="flex">
            <Box w="70px" />
            <Box
              bg="white"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="40px">
                <Image src={PostPaturm} alt="Logo" w="100px" h="30px" />
              </Box>

              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Post-Partum Care
              </Text>
              <Text textAlign="center">
                Get personalized health care <br />
                support for you and your <br />
                newborn.
              </Text>
            </Box>
            <Box w="20" />
            <Box
              bg="white"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="50px">
                <Image src={Elderly} alt="Logo" w="100px" h="30px" />
              </Box>

              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Elderly Care
              </Text>
              <Text textAlign="center">
                Get expert home care services <br />
                for your elderly parents and
                <br />
                loved ones.
              </Text>
            </Box>
            <Box w="20" />
            <Box
              bg="white"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="60px">
                <Image src={Recovery} alt="Logo" w="100px" h="30px" />
              </Box>

              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Recovery Care
              </Text>
              <Text textAlign="center">
                Receive professional in-home <br />
                care after discharge from a <br />
                Hospital or Rehabilitation Centre.
              </Text>
            </Box>
            <Box w="20" />
            <Box
              bg="white"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="50px">
                <Image src={Online} alt="Logo" w="100px" h="30px" />
              </Box>

              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Online Consult
              </Text>
              <Text textAlign="center">
                Get care from qualified <br />
                medical professionals from the <br />
                comfort of your home.
              </Text>
            </Box>
          </Box>
          <Box h="60px" />
          <Box>
            <Box display="flex">
              <Box marginLeft="100px">
                <Image src={Doctor} alt="Logo" w="563px" h="652px" />
              </Box>
              <Box>
                <Box h="150px" />
                <Box>
                  <Text
                    fontSize="6xl"
                    fontWeight="bold"
                    fontFamily="body"
                    color="white"
                  >
                    Join the Future of Healthcare
                  </Text>
                  <Text fontSize="20px" color="white" fontFamily="Montserrat">
                    Empower healthcare innovation and <br />
                    shape the future of Healthcare delivery <br />
                    with Mikul Health
                  </Text>
                  <Box h="25px" />
                  <Button bg="white" color="black">
                    Join us
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LandingPage;
