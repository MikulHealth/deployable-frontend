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
import logo from "../../assets/Whitelogo.png";
import SignUp from "../../assets/SignUp.svg";
import SelectCare from "../../assets/SelectService.svg";
import GetMatched from "../../assets/GetMatched.svg";
import ReceieveCare from "../../assets/RecieveCare.svg";
import WhatsAppIcon from "../../assets/WhatsApp.svg";
import FBIcon from "../../assets/FaceBookIcon.svg";
import IGIcon from "../../assets/InstagramIcon.svg";
import WHIcon from "../../assets/WAIcon.svg";
import AbtPic from "../../assets/AboutPic.svg";
import Wallet from "../../assets/Wallet.svg";
import Eye from "../../assets/Eye.svg";
import Persona from "../../assets/Pesona.svg";
import Safety from "../../assets/Safety.svg";
import Quality from "../../assets/Quality.svg";
import Flexible from "../../assets/Flexible.svg";
import Sylvia from "../../assets/Sylvia.svg";
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
  useEffect(() => {
    AOS.init();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Link to="/">Home</Link>
            <Link
              to="/about"
              style={{ textDecoration: "underline", color: "white" }}
            >
              About
            </Link>
            <Link to="/contact">Contact</Link>
            <Spacer />
            <Button onClick={onOpen} bg="white">
              Get started
            </Button>
            <Box w="5px" />
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

        <Box
          marginTop="-1px"
          bgImage={`url(${AbtPic})`}
          bgSize="cover"
          bgPosition="center"
          w="1350px"
          h="1140px"
        >
          <Text
            fontSize="64px"
            fontWeight="bold"
            textAlign="center"
            color="white"
            // marginLeft="3px"
            paddingTop="70px"
            textDecoration="underline"
            data-aos="fade-up"
            data-aos-duration="10000"
          >
            About Us
          </Text>
        </Box>
        <Box bg="#A210C6" paddingTop="60px" marginLeft="-40px">
          <Box h="60px" />
          <Box
            marginLeft="-510px"
            data-aos="fade-right"
            data-aos-duration="10000"
          >
            <Text
              fontSize="28px"
              fontFamily="body"
              color="white"
              marginLeft="-150px"
            >
              WHY USE MIKUL HEALTH?
            </Text>
            <Text fontSize="60px" fontFamily="body" color="balck">
              With Mikul Health, <br></br>
              your are assured of
            </Text>
          </Box>

          <Box h="60px" />
          <Box
            display="flex"
            marginLeft="80px"
            data-aos="fade-up"
            data-aos-duration="10000"
          >
            <Box w="70px" />
            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="100px">
                <Image
                  src={Wallet}
                  alt="Logo"
                  w="100px"
                  h="103px"
                  paddingTop="10px"
                />
              </Box>

              <Text
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
                marginTop="10px"
              >
                Affordability & <br></br>
                Accessibility
              </Text>
              <Text textAlign="center" marginTop="10px" color="white">
                We offer competitive pricing for homecare <br></br>
                services, making it affordable for everyone <br></br>
                to receive quality care. We also offer round-<br></br>
                the-clock availability of caregivers, making <br></br>
                it easy for you to get the care you need <br></br>
                when you need it.
              </Text>
            </Box>
            <Box w="20" />
            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="90px">
                <Image
                  src={Eye}
                  alt="Logo"
                  w="100px"
                  h="103px"
                  paddingTop="10px"
                />
              </Box>

              <Text
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
                marginTop="10px"
              >
                Viscibility & <br></br>
                Transperency{" "}
              </Text>
              <Text textAlign="center" marginTop="10px" color="white">
                We use state-of-the-art technology to <br></br>
                protect your personal and medical <br></br>
                information, ensuring that your data is <br></br>
                secure and confidential. Additionally, all our <br></br>
                caregivers are trained to maintain a safe <br></br>
                and secure environment in your home, <br></br>
                reducing the risk of accidents or incidents.
              </Text>
            </Box>
            <Box w="20" />

            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="100px">
                <Image
                  src={Persona}
                  alt="Logo"
                  w="100px"
                  h="103px"
                  paddingTop="20px"
                />
              </Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
                marginTop="20px"
              >
                Personalization
              </Text>
              <Text textAlign="center" marginTop="28px" color="white">
                 We offer personalized care plans based on <br></br>
                your individual needs and preferences,<br></br>
                ensuring that you receive the best possible care.
              </Text>
            </Box>
          </Box>

          <Box
            display="flex"
            marginLeft="90px"
            marginTop="50px"
            data-aos="fade-left"
            data-aos-duration="10000"
          >
            <Box w="50px" />
            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="100px">
                <Image
                  src={Safety}
                  alt="Logo"
                  w="100px"
                  h="103px"
                  paddingTop="10px"
                />
              </Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
                marginTop="10px"
              >
                Safety & Security
              </Text>
              <Text textAlign="center" marginTop="10px" color="white">
                All our caregivers are thoroughly screened <br></br>
                and background checks are carried out. We <br></br>
                do this to provide you with the assurance <br></br>
                that you're receiving safe and trustworthy care.
              </Text>
            </Box>
            <Box w="20" />
            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="90px">
                <Image
                  src={Quality}
                  alt="Logo"
                  w="100px"
                  h="103px"
                  paddingTop="10px"
                />
              </Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
                marginTop="10px"
              >
                Quality Care
              </Text>
              <Text textAlign="center" marginTop="10px" color="white">
                We ensure that all caregivers registered <br></br>
                with us meet high-quality standards, <br></br>
                ensuring that you receive the best possible <br></br>
                care at all times.
              </Text>
            </Box>
            <Box w="20" />
            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
            >
              <Box marginLeft="90px">
                <Image
                  src={Flexible}
                  alt="Logo"
                  w="100px"
                  h="103px"
                  paddingTop="10px"
                />
              </Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
                marginTop="10px"
              >
                Flexibility
              </Text>
              <Text textAlign="center" marginTop="10px" color="white">
                We offer flexible scheduling options that fit <br></br>
                your busy lifestyle, allowing you to receive <br></br>
                care when it's most convenient for you.
              </Text>
            </Box>
            <Box w="20" />
          </Box>
          <Box h="60px" />
        </Box>

        <Box bg="white">
          <Box h="60px" />
          <Box marginLeft="-450px">
            <Text
              fontSize="64px"
              fontFamily="body"
              color="black"
              marginLeft="-150px"
            >
              Meet Our Team
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
              data-aos="fade-left"
              data-aos-duration="10000"
            >
              <Box
                padding="25px"
                marginLeft="80px"
                boxShadow="0px 4px 8px rgba(162, 16, 198, 0.5)"
                borderRadius="10"
              >
                <Image src={Michael} alt="Logo" w="462px" h="422px" />
              </Box>

              <Box h="5" />
            </Box>
            <Box w="10" />

            <Box
              justifyContent="center"
              alignItems="center"
              padding="20px"
              borderRadius="20px"
              flexDirection="row"
              w="656px"
              h="275px"
              marginLeft="-70px"
              marginTop="50px"
              data-aos="fade-right"
              data-aos-duration="10000"
            >
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Michael Joshua. Co-founder, CEO
              </Text>
              <Text
                textAlign="center"
                marginTop="10px"
                fontSize="22px"
                fontFamily="Montserrat"
              >
                Software Engineer & a licensed nurse in Nigeria with<br></br>
                years of clinical experience in general nursing care <br></br>
                and patient management.<br></br>
                Passionate about innovative revolution in the health <br></br>
                industry, he has worked with two successful Health <br></br>
                Tech startups. He is also the founder of an NGO, Rophe <br></br>
                Global Foundation.
              </Text>
            </Box>
          </Box>
        </Box>

        <Box display="flex" marginLeft="100px">
          <Box
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            marginTop="80px"
            data-aos="fade-left"
            data-aos-duration="10000"
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              textAlign="center"
              marginLeft="5px"
            >
              Jim Ofodum. Co-founde, Growth
            </Text>
            <Text
              textAlign="center"
              marginTop="10px"
              fontSize="22px"
              fontFamily="Montserrat"
            >
              Ejimonye, popularly referred to as Jim, is a trained <br></br>
              financial technology professional who has worked <br></br>
              with top African payment & telecoms companies.<br></br>
              She co-founded a technology-enabled home cleaning <br></br>
              brand called FICHAYA and co-owns a young <br></br>
              professional's group called Konnect'd by Professionals.
            </Text>
          </Box>

          <Box
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            w="656px"
            h="275px"
            marginLeft="30px"
            data-aos="fade-right"
            data-aos-duration="10000"
          >
            <Box
              padding="25px"
              marginLeft="70px"
              boxShadow="0px 4px 8px rgba(162, 16, 198, 0.5)"
              borderRadius="10"
            >
              <Image
                src={Jim}
                alt="Logo"
                w="462px"
                h="422px"
                marginLeft="10px"
              />
            </Box>
          </Box>
        </Box>

        <Box display="flex" marginTop="200px">
          <Box
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            data-aos="fade-left"
            data-aos-duration="10000"
          >
            <Box
              marginLeft="150px"
              padding="25px"
              boxShadow="0px 4px 8px rgba(162, 16, 198, 0.5)"
              borderRadius="10"
            >
              <Image src={Hafsie} alt="Logo" w="462px" h="422px" />
            </Box>
          </Box>

          <Box
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            w="656px"
            h="275px"
            marginLeft="-40px"
            marginTop="50px"
            data-aos="fade-right"
            data-aos-duration="10000"
          >
            <Box h="5" />
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              Dr. Hafsat Jijiwa. Medical Director.
            </Text>
            <Text
              textAlign="center"
              marginTop="10px"
              fontSize="22px"
              fontFamily="Montserrat"
            >
              She holds a Bachelor of Medicine, Bachelor of Surgery <br></br>
              (M.B.B.S) from Gulf Medical University, U.A.E. <br></br>
              Dr. Jijiwa is a board certified family medicine <br></br>
              physician seasoned with exemplary patient care. She <br></br>
              has vast experience working with Home care <br></br>
              companies in the U.S and is also <br></br>
              passionate about public health.
            </Text>
          </Box>
        </Box>

        <Box display="flex" marginLeft="100px">
          <Box
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            marginTop="80px"
            data-aos="fade-left"
            data-aos-duration="10000"
            marginLeft="-5px"
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              textAlign="center"
              marginLeft="5px"
            >
              Dr. Sylvia Onoabhagbe. Product Designer
            </Text>
            <Text
              textAlign="center"
              marginTop="10px"
              fontSize="22px"
              fontFamily="Montserrat"
            >
              She holds a Doctor of Optometry (O. D) degree, <br></br>
              from the University of Benin, Edo state, Nigeria. <br></br>
              She spent the first few years of her career<br></br>
              working as a clinical optometrist, and has a lot of patient care
              experience. <br></br>
              She is also a trained product designer and is very<br></br>
              passionate about building healthcare solutions for everyone.
              <br></br>
            </Text>
          </Box>

          <Box
            justifyContent="center"
            alignItems="center"
            padding="20px"
            borderRadius="20px"
            flexDirection="row"
            w="656px"
            h="275px"
            marginLeft="30px"
            data-aos="fade-right"
            data-aos-duration="10000"
          >
            <Box
              padding="25px"
              marginLeft="2px"
              boxShadow="0px 4px 8px rgba(162, 16, 198, 0.5)"
              borderRadius="10"
            >
              <Image
                src={Sylvia}
                alt="Logo"
                w="462px"
                h="422px"
                marginLeft="10px"
              />
            </Box>
          </Box>
        </Box>

        <Box bg="white" marginTop="200px">
          <Box>
            <Text
              fontSize="48px"
              fontWeight="bold"
              fontFamily="body"
              color="black"
              marginTop="40px"
            >
              Medics
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
              marginLeft="150px"
            >
              <Box>
                <Image src={SignUp} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                1000+ Caregivers Onboarderd
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
              marginLeft="300px"
            >
              <Box>
                <Image src={SelectCare} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                500+ Vetted
              </Text>
              <Text textAlign="center">
                Now that you are a part <br />
                of our community, you <br />
                can find the kind of <br />
                service you need
              </Text>
            </Box>
          </Box>
          <Box h="60px" />
        </Box>

        <Box bg="white">
          <Box>
            <Text
              fontSize="48px"
              fontWeight="bold"
              fontFamily="body"
              color="black"
            >
              Partners
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
            >
              <Box marginLeft="20px">
                <Image src={SignUp} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Over 1000 Medics Onboarderd
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
            >
              <Box marginLeft="20px">
                <Image src={SelectCare} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Over 500 Vetted
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
            >
              <Box marginLeft="15px">
                <Image src={GetMatched} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Get Matched
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
            >
              <Box marginLeft="15px">
                <Image src={ReceieveCare} alt="Logo" w="200px" h="200px" />
              </Box>
              <Box h="5" />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Receive Care
              </Text>
            </Box>
          </Box>
          <Box h="60px" />
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
            <a href="https://example.com">
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
