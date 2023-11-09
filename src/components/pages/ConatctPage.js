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
  Textarea,
} from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../assets/Whitelogo.png";
import SignUp from "../../assets/SignUp.svg";
import SelectCare from "../../assets/SelectService.svg";
import GetMatched from "../../assets/GetMatched.svg";
import ReceieveCare from "../../assets/RecieveCare.svg";
import WhatsAppIcon from "../../assets/WhatsApp.svg";
import FBIcon from "../../assets/FaceBookIcon.svg";
import IGIcon from "../../assets/InstagramIcon.svg";
import WHIcon from "../../assets/WAIcon.svg";
import AddressIcon from "../../assets/Address.svg";
import EmailIcon from "../../assets/Email.svg";
import PhoneIcon from "../../assets/Phone.svg";
import MHSteth from "../../assets/MHSteth.svg";
import Michael from "../../assets/Michael.svg";
import Jim from "../../assets/Jim.svg";
import Hafsie from "../../assets/Hafsie.svg";
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

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <Box overflow="hidden">
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
          </HStack>
        </Box>

        <Box marginTop="80px" bg="white" marginLeft="-400px" display="flex">
          <Box marginLeft="500px">
            <Text
              fontSize="28px"
              fontWeight="bold"
              textAlign="center"
              color="#A210C6"
              paddingTop="70px"
              data-aos="fade-left"
              data-aos-duration="10000"
            >
              CONTACT US
            </Text>
            <Text
              fontSize="64px"
              fontWeight="bold"
              textAlign="center"
              color="#A210C6"
              marginLeft="5px"
              paddingTop="10px"
            >
              We would like to<br></br>
              hear from you
            </Text>
            <Text
              fontSize="16px"
              textAlign="center"
              color="#A210C6"
              marginLeft="5px"
              paddingTop="10px"
            >
              You’re one click away from getting the medical help you need. Fill{" "}
              <br></br>
              the form to let us know how we can help you.
            </Text>
          </Box>

          <Box
            bg="white"
            marginLeft="100px"
            marginRight="-150px"
            marginTop="80px"
            w="523px"
            h="692px"
            overflow="hidden"
            boxShadow={`0px 0px 1px 2px #ECCFF4`}
            className="animate__animated animate__fadeIn animate__slow"
          >
            <FormControl padding="40px">
              <Input
                type="fullenane"
                value={input}
                onChange={handleInputChange}
                marginTop="50px"
                placeholder="Fullname"
                bg="#FADCFF"
              />

              <Input
                type="email"
                value={input}
                onChange={handleInputChange}
                marginTop="50px"
                placeholder="Email"
                bg="#FADCFF"
              />

              <Input
                type="Phone number"
                value={input}
                onChange={handleInputChange}
                marginTop="50px"
                placeholder="Phone number"
                bg="#FADCFF"
              />

              <Textarea
                type="Message"
                value={input}
                onChange={handleInputChange}
                placeholder="How can we help"
                marginTop="50px"
                bg="#FADCFF"
              />
            </FormControl>
            <Button
              bg="#A210C6"
              color="white"
              marginTop="10px"
              marginLeft="-300px"
            >
              Send message
            </Button>
          </Box>
        </Box>

        <Box
          bg="#A210C6"
          paddingTop="60px"
          marginLeft="-5px"
          marginTop="-250px"
          display="flex"
          color="white"
        >
          <Box marginLeft="200px" marginTop="350px">
            <Image
              src={AddressIcon}
              alt="Logo"
              w="42px"
              h="42px"
              marginLeft="80px"
            />
            <Text
              fontSize="48px"
              fontFamily="body"
              color="white"
              marginLeft="50px"
              marginTop="-50px"
            >
              Address
            </Text>
            <Text marginLeft="80px" fontSize="28px">
              Polystar Building, 4th Floor,<br></br>
              2nd Roundabout, <br></br>
              Lekki Phase 1, Lagos State, <br></br>
              Nigeria
            </Text>
          </Box>

          <Box marginLeft="200px" marginTop="350px" marginBottom="200px">
            <Image
              src={EmailIcon}
              alt="Logo"
              w="42px"
              h="47px"
              marginLeft="-45px"
            />
            <Text
              fontSize="38px"
              fontFamily="body"
              color="white"
              marginTop="-50px"
              marginLeft="-180px"
            >
              Email
            </Text>
            <Text fontSize="22px" marginLeft="-20px">
              support@mikulhealth.com
            </Text>
            <Box marginTop="10px">
              <Image
                src={PhoneIcon}
                alt="Logo"
                w="42px"
                h="42px"
                marginLeft="-50px"
              />
              <Text
                fontSize="38px"
                fontFamily="body"
                color="white"
                marginTop="-50px"
              >
                Phone/WhatsApp
              </Text>
              <Text fontSize="22px" marginLeft="-110px">
                +2349160596636
              </Text>
            </Box>
          </Box>
        </Box>

        <Box bg="#A210C6">
          <Image
            src={MHSteth}
            alt="Logo"
            w="1369px"
            h="645px"
            marginLeft="10px"
            data-aos="fade-left"
            data-aos-duration="10000"
          />
          <a href="https://example.com">
            <Image
              src={WhatsAppIcon}
              alt="Logo"
              w="250px"
              h="250px"
              marginTop="-10"
              marginLeft="1100px"
              paddingBottom="100px"
              data-aos="fade-right"
              data-aos-duration="10000"
            />
          </a>
        </Box>

        <Box h="10px" bg="white"></Box>

        {/* Footer */}
        <Box
          bg="#A210C6"
          display="flex"
          w="1441"
          h="543"
          pd="48px, 84px, 32px, 60px"
        >
          <Box marginLeft="40px" marginTop="40px">
            <Text fontFamily="body" color="white" fontSize="32px">
              MIKUL HEALTH
            </Text>
            <Text
              fontFamily="Montserrat"
              color="white"
              fontSize="20px"
              marginTop="40px"
            >
              We leverage technological <br></br>
              advancement to provide care<br></br>
              for you and your loved ones.
            </Text>
          </Box>
          <Box marginLeft="380px" marginTop="40px">
            <Text
              fontFamily="body"
              color="white"
              fontSize="32px"
              textDecoration="underline"
            >
              Quick Links
            </Text>
            <a href="/about">
              <Text
                fontFamily="Montserrat"
                color="white"
                fontSize="20px"
                marginTop="40px"
              >
                About
              </Text>
            </a>
            <a href="https://example.com">
              <Text
                fontFamily="Montserrat"
                color="white"
                fontSize="20px"
                marginTop="40px"
              >
                Contact us
              </Text>
            </a>
            <a href="https://example.com">
              <Text
                fontFamily="Montserrat"
                color="white"
                fontSize="20px"
                marginTop="40px"
              >
                Support
              </Text>
            </a>
            <a href="https://example.com">
              <Text
                fontFamily="Montserrat"
                color="white"
                fontSize="20px"
                marginTop="40px"
              >
                FAQs
              </Text>
            </a>
            <a href="https://example.com">
              <Text
                fontFamily="Montserrat"
                color="white"
                fontSize="20px"
                marginTop="40px"
              >
                Join Mikul Health
              </Text>
            </a>
          </Box>
          <Box marginLeft="300px" marginTop="40px">
            <Text
              fontFamily="body"
              color="white"
              fontSize="32px"
              textDecoration="underline"
            >
              Socials
            </Text>
            <Box marginLeft="5px" display="flex">
              <a href="https://example.com">
                <Image
                  src={FBIcon}
                  alt="Logo"
                  w="32px"
                  h="32px"
                  marginTop="40px"
                  marginLeft="20px"
                />
              </a>
              <a href="https://example.com">
                <Image
                  src={IGIcon}
                  alt="Logo"
                  w="32px"
                  h="32px"
                  marginTop="40px"
                  marginLeft="20px"
                />
              </a>
              <a href="https://example.com">
                <Image
                  src={WHIcon}
                  alt="Logo"
                  w="32px"
                  h="32px"
                  marginTop="40px"
                  marginLeft="20px"
                />
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default LandingPage;
