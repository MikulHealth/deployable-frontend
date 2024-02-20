import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDisclosure,
  Box,
  Input,
  Button,
  Link as ChakraLink,
  HStack,
  Spacer,
  Image,
  extendTheme,
  ChakraProvider,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Divider,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import "animate.css";
import logo from "../../assets/Whitelogo.png";
import MHNurse from "../../assets/MHNurse.svg";
import Bar from "../../assets/Bar.svg";
import Elderly from "../../assets/ElderlyCare.svg";
import PostPaturm from "../../assets/Postpatum.svg";
import Recovery from "../../assets/RecoveryCare.svg";
import Online from "../../assets/OnlineConsult.svg";
import Doctor from "../../assets/Doctor.svg";
import SignUp from "../../assets/SignUp.svg";
import SelectCare from "../../assets/SelectService.svg";
import GetMatched from "../../assets/GetMatched.svg";
import ReceieveCare from "../../assets/RecieveCare.svg";
import CenterMed from "../../assets/CenterMedic.svg";
import Kudirat from "../../assets/Kudirat.svg";
import Joy from "../../assets/Josy.svg";
import Adeola from "../../assets/Adeola.svg";
import Gift from "../../assets/Gift.svg";
import Folder from "../../assets/Folder.svg";
import WhatsAppIcon from "../../assets/WhatsApp.svg";
import FBIcon from "../../assets/FaceBookIcon.svg";
import IGIcon from "../../assets/InstagramIcon.svg";
import WHIcon from "../../assets/WAIcon.svg";
import Shade from "../../assets/LandingShade.svg";
import Shade1 from "../../assets/landingShade1.svg";
import "../../styles/pages/LandingPage.css";
import AOS from "aos";
import "aos/dist/aos.css";

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
  useEffect(() => {
    AOS.init();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [timeoutId, setTimeoutId] = useState(null);

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const handleSwitchToggle = () => {
    setIsSwitchOn((prev) => !prev);
  };

  const handleMouseOver = () => {
    // Open the modal when the user hovers over the button
    onOpen();
  };

  const handleMouseOut = () => {
    // Close the modal when the user moves the cursor away from the button
    onClose();
  };

  return (
    <ChakraProvider theme={customTheme}>
      <Box>
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
            <Spacer />
            <Spacer />
            <Spacer />
            <Link
              to="/"
              style={{ textDecoration: "underline", color: "white" }}
            >
              Home
            </Link>

            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Spacer />
            <Button
              bg="white"
              color="#A210C6"
              //  onMouseOver={handleMouseOver}
              //  onMouseOut={handleMouseOut}
              onClick={onOpen}
            >
              Get started
            </Button>
          </HStack>
        </Box>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="gray">
            <ChakraLink fontStyle="italic" href="/login" color="#A210C6">
              <Button
                marginTop="30px"
                marginLeft="80px"
                bg="gray"
                color="black"
                w="300px"
                border="1px solid white"
              >
                Login
              </Button>
            </ChakraLink>
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

        <Box h="60px" />
        <Box>
          {/* <Image
            src={Shade}
            alt="Logo"
            marginTop="550px"
            w="1759px"
            h="219px"
          />
          <Image
            src={Shade1}
            alt="Logo"
            marginTop="650px"
            w="1759px"
            h="219px"
          /> */}
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
                <Box h="20px"></Box>
                <Button
                  bg="#A210C6"
                  color="white"
                  //  onMouseOver={handleMouseOver}
                  //  onMouseOut={handleMouseOut}
                  onClick={onOpen}
                >
                  Get started
                </Button>
              </Box>
            </HStack>
            <Spacer />
            <Box className="animate__animated animate__fadeIn animate__slow">
              <Image src={MHNurse} alt="Logo" w="642px" h="710px" />
            </Box>
          </Box>
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
              className="box"
              data-aos="fade-up"
              data-aos-duration="6000"
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
              className="box"
              data-aos="fade-down"
              data-aos-duration="6000"
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
              className="box"
              data-aos="fade-up"
              data-aos-duration="6000"
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
              className="box"
              data-aos="fade-down"
              data-aos-duration="6000"
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
              <Box
                marginLeft="70px"
                className="box"
                data-aos="zoom-out"
                data-aos-duration="10000"
              >
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
                  <ChakraLink href="/join" color="#A210C6">
                    <Button bg="white">Join us</Button>
                  </ChakraLink>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box h="60px" />
        </Box>
        <Divider />
        <Box bg="white">
          <Box h="60px" />
          <Box>
            <Text
              fontSize="48px"
              fontWeight="bold"
              fontFamily="body"
              color="black"
            >
              How it works
            </Text>
            <Box h="5" />
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
              data-aos="flip-left"
              data-aos-duration="30000"
            >
              <Box marginLeft="20px">
                <Image src={SignUp} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Sign up
              </Text>
              <Text textAlign="center">
                Getting started is quick <br />
                and easy. Sign up with <br />
                us to receive premium <br />
                care
              </Text>
            </Box>
            <Box w="10" />
            <Box
              bg="white"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
              data-aos="flip-left"
              data-aos-duration="30000"
            >
              <Box marginLeft="20px">
                <Image src={SelectCare} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Select Care
              </Text>
              <Text textAlign="center">
                Now that you are a part <br />
                of our community, you <br />
                can find the kind of <br />
                service you need
              </Text>
            </Box>
            <Box w="10" />
            <Box
              bg="white"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
              data-aos="flip-right"
              data-aos-duration="30000"
            >
              <Box marginLeft="15px">
                <Image src={GetMatched} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Get Matched
              </Text>
              <Text textAlign="center">
                Personalized care, just a <br />
                click away. We match <br />
                you to a professional <br />
                tailored to your needs
              </Text>
            </Box>
            <Box w="10" />
            <Box
              bg="white"
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
              data-aos="flip-right"
              data-aos-duration="30000"
            >
              <Box marginLeft="15px">
                <Image src={ReceieveCare} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Receive Care
              </Text>
              <Text textAlign="center">
                Getting started is quick <br />
                and easy. Sign up with <br />
                us to receive premium <br />
                care
              </Text>
            </Box>
          </Box>
          <Box h="60px" />
        </Box>

        <Box bg="white">
          <Divider />
          <Box h="60px" />
          <Box>
            <Text
              fontSize="48px"
              fontWeight="bold"
              fontFamily="Montserrat"
              color="black"
            >
              Testimonials
            </Text>
            <Text fontSize="28px" fontFamily="body" color="black">
              Here is what our clients have to say about us
            </Text>
            <Box h="5" />
          </Box>
          <Box h="20px" />
          <Box display="flex" marginLeft="100px">
            <Box w="70px" />

            <Box marginRight="-110">
              <Box
                justifyContent="center"
                alignItems="center"
                padding="20px"
                borderRadius="20px"
                flexDirection="row"
              >
                <Box marginLeft="2px">
                  <Image
                    src={Kudirat}
                    alt="Logo"
                    w="398px"
                    h="191px"
                    data-aos="fade-left"
                    data-aos-duration="10000"
                  />
                </Box>
              </Box>
              <Box w="10" />

              <Box
                justifyContent="center"
                alignItems="center"
                padding="20px"
                borderRadius="20px"
                flexDirection="row"
              >
                <Box marginRight="40px">
                  <Image
                    src={Adeola}
                    alt="Logo"
                    w="398px"
                    h="191px"
                    data-aos="fade-right"
                    data-aos-duration="10000"
                  />
                </Box>
                <Box h="5" />
              </Box>
            </Box>

            <Box w="-20px" />

            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box>
                <Image
                  src={CenterMed}
                  alt="Logo"
                  w="306px"
                  h="413px"
                  data-aos="zoom-in"
                  data-aos-duration="10000"
                />
              </Box>
              <Box h="5" />
            </Box>

            <Box w="-20px" />
            <Box marginLeft="-110px">
              <Box
                justifyContent="center"
                alignItems="center"
                padding="20px"
                borderRadius="20px"
                flexDirection="row"
              >
                <Box marginRight="40px">
                  <Image
                    src={Joy}
                    alt="Logo"
                    w="398px"
                    h="191px"
                    data-aos="fade-left"
                    data-aos-duration="10000"
                  />
                </Box>
              </Box>
              <Box w="10" />
              <Box
                justifyContent="center"
                alignItems="center"
                padding="20px"
                borderRadius="20px"
                flexDirection="row"
              >
                <Box marginRight="10px">
                  <Image
                    src={Gift}
                    alt="Logo"
                    w="398px"
                    h="191px"
                    data-aos="fade-right"
                    data-aos-duration="10000"
                  />
                </Box>
                <Box h="5" />
              </Box>
            </Box>
          </Box>
          <Box h="60px" />
        </Box>

        <Box bg="white">
          <Divider />
          <Box h="60px" />
          <Box>
            <Text
              fontSize="48px"
              fontWeight="bold"
              fontFamily="Montserrat"
              color="black"
            >
              Frequently Asked Questions
            </Text>
            <Box h="5" />
          </Box>
          <Box h="20px" />
          <Box display="flex" marginLeft="80px">
            <Box w="70px" />

            <Box>
              <Accordion
                allowToggle
                w="520px"
                data-aos="fade-down"
                data-aos-duration="10000"
              >
                <AccordionItem
                  p={4}
                  my={5}
                  fontSize="24px"
                  className="custom-accordion-item"
                >
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" fontSize="21px">
                        How do I get matched with a medic?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel className="custom-accordion-panel">
                    Upon a successful registeration, you can request and get
                    matched to a medic to recieve care by booking any of the
                    services we offer from your dashboard.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem
                  p={4}
                  my={5}
                  fontSize="24px"
                  className="custom-accordion-item"
                >
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" fontSize="21px">
                        How safe am I?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    className="custom-accordion-panel"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    To ensure you are safe while you receive care from any
                    Mikul&nbsp;Health care provider, we make sure our caregivers
                    are vetted and their background checked. We also have an
                    insurance policy for any theft and damages during the course
                    of our service.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem
                  p={4}
                  my={5}
                  fontSize="24px"
                  className="custom-accordion-item"
                >
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" fontSize="21px">
                        Can I request for a replacement?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel className="custom-accordion-panel">
                    Yes you can have a replacement when asigned a caregiver that
                    you do not like. We can provide a replace within 72 hours
                    upon your request for a replacement.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem
                  p={4}
                  my={5}
                  fontSize="24px"
                  className="custom-accordion-item"
                >
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" fontSize="21px">
                        How long does it take to receive care?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel className="custom-accordion-panel">
                    Upon booking and making payment for the choosen service, you
                    would receive care within 48 hours.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem
                  p={4}
                  my={5}
                  fontSize="24px"
                  className="custom-accordion-item"
                >
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" fontSize="21px">
                        Can I get a customized service plan?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel className="custom-accordion-panel">
                    Yes, aside our standadized service plans. We also have
                    provision for customizing a service plan that would best
                    suit you or your loved according to the peculiarity of the
                    care needs.
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem
                  p={4}
                  my={5}
                  fontSize="18px"
                  className="custom-accordion-item"
                >
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left" fontSize="21px">
                        How qualified are the medics?
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel className="custom-accordion-panel">
                    <Text>
                      We work with Registred Nurses and Medical Docters who are
                      acreditated and certified with valid licenses and a proven
                      record of good conduct and expertise. We also ensure that
                      our Nurse assistant caregivers are well trained.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>

            <Box w="-20px" />
            <Box>
              <Box
                bg="white"
                justifyContent="center"
                alignItems="center"
                padding="20px"
                borderRadius="20px"
                flexDirection="row"
              >
                <Box marginRight="30px">
                  <Image
                    src={Folder}
                    alt="Logo"
                    w="551px"
                    h="280px"
                    data-aos="fade-left"
                    data-aos-duration="10000"
                  />
                </Box>
              </Box>

              <Box
                bg="white"
                justifyContent="center"
                alignItems="center"
                padding="20px"
                borderRadius="20px"
                flexDirection="row"
              >
                <Box marginRight="30px">
                  <Image
                    src={Folder}
                    alt="Logo"
                    w="551px"
                    h="280px"
                    data-aos="fade-right"
                    data-aos-duration="10000"
                  />
                </Box>
                <Box marginLeft="480px" marginTop="-75px">
                  <a href="https://example.com">
                    <Image
                      src={WhatsAppIcon}
                      alt="Logo"
                      w="150px"
                      h="147px"
                      data-aos="fade-down"
                      data-aos-duration="10000"
                    />
                  </a>
                </Box>
                <Box h="5" />
              </Box>
            </Box>
          </Box>
          <Box h="40px" />
        </Box>
        <Box marginLeft="300px" marginBottom="80px" bg="#D087E2" padding="40px" w="750px" borderRadius="10px">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0" fontFamily="body" fontSize="20px">
              Don't want to miss out on any information? Subscribe to our newsletter
            </FormLabel>
            <Switch
              size="lg"
              id="email-alerts"
              isChecked={isSwitchOn}
              onChange={handleSwitchToggle}
              colorScheme={isSwitchOn ? 'green' : 'gray'}
            />
          </FormControl>

          {isSwitchOn && (
            <form >
              <FormControl marginLeft="150px" w="400px" marginTop="10px">
                <Input type="email" id="email" placeholder="Enter your email" />
              </FormControl>
              <Button type="submit" mt="4" color="white" bg="#A210C6" marginLeft="-45px">
                Subscribe
              </Button>
            </form>
          )}
        </Box>
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
            <a href="/contact">
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
                FAQs
              </Text>
            </a>
            <a href="/join">
              <Text
                fontFamily="Montserrat"
                color="white"
                fontSize="20px"
                marginTop="40px"
              >
                Join Mikul Health
              </Text>
            </a>
            <a href="https://wa.me/2347032579006">
              <Text
                fontFamily="Montserrat"
                color="white"
                fontSize="20px"
                marginTop="40px"
              >
                Terms and Privacy policy
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
              <a href="https://web.facebook.com/mikulhealthcare/?_rdc=1&_rdr://example.com">
                <Image
                  src={FBIcon}
                  alt="Logo"
                  w="32px"
                  h="32px"
                  marginTop="40px"
                  marginLeft="20px"
                />
              </a>
              <a href="https://www.instagram.com/mikulhealth/">
                <Image
                  src={IGIcon}
                  alt="Logo"
                  w="32px"
                  h="32px"
                  marginTop="40px"
                  marginLeft="20px"
                />
              </a>
              <a href="https://wa.me/message/3VO5QNBR2AB4L1://example.com">
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
