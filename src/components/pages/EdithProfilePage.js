import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookAppointmentModal from "../sections/BookAppointment";
import AllAppointments from "../sections/AllAppointments";
import PendingAppointmentModal from "../sections/PendingAppointments";
import CanceledAppointmentsModal from "../sections/CanceledAppointments";
import RightArrow from "../../assets/RightArrow.svg";
import Help from "../../assets/Help.svg";
import Bar from "../../assets/ColoredBar.svg";
import DateIcon from "../../assets/DateIcon.svg";

import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Input,
  Button,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  Link,
  Divider,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import userImageIcon from "../../assets/userImage.svg";
import NotificationIcon from "../../assets/notification.svg";
import familyIcon from "../../assets/family.svg";
import UserDetailsModal from "../sections/UserDetails";
import LoadingSpinner from "../../utils/Spiner";
import Wallet from "../../assets/Wallet.svg";
import logo from "../../assets/LogoColoured.svg";
import SettingsIcon from "../../assets/SettingsIconWhite.svg";
import LogoutIcon from "../../assets/Logout.svg";
import AppointmentsIcon from "../../assets/AppointmentIcon.svg";
import HomeIcon from "../../assets/HomeBlack.svg";
import ProfileIcon from "../../assets/ProfileIcone.svg";
import ProfileIconWhite from "../../assets/ProfileIconWh.svg";
import PasswordIcon from "../../assets/PasswordIcon.svg";
import HelppIcon from "../../assets/HelppIcon.svg";
import ColorArrowIcon from "../../assets/RightArrowColor.svg";
import NotificationIconn from "../../assets/Notification.Icon.svg";

import SearchAppointmentsModal from "../sections/SearchAppointmentByDate";

const EdithProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    dateOfBirth: user?.dateOfBirth,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    homeAddress: user?.homeAddress,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleSave = async () => {
    try {
      // Make an API call to update the user profile
      const updatedUser = await UpdateCustomer(formData);

      // Update the Redux state with the new user data
      dispatch(SetUser(updatedUser));

      toast({
        title: "Profile Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error Updating Profile",
        description: "An error occurred while updating the profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handleOpenHelpModal = () => {};

  const handleOpenWalletModal = () => {
    navigate("/wallet");
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    // Close the logout confirmation modal
    setShowLogoutModal(false);

    // Perform the actual logout
    localStorage.removeItem("token");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("orderId");
    navigate("/");
  };

  const handleOpenDashboard = () => {
    navigate("/dashboard");
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  return (
    <ChakraProvider>
      <Box width="25%" p={3} h="90vh">
        <Image
          src={logo}
          alt="Logo"
          w="160px"
          h="60px"
          marginLeft="90px"
          marginTop="10px"
        />

        <VStack spacing={3} align="center" mt={5}>
          <Flex marginTop="50px" alignItems="center">
            <Image
              marginLeft="-47px"
              w="20px"
              h="20px"
              src={HomeIcon}
              alt="HomeIcon"
            />

            <Text
              marginLeft="15px"
              color="black"
              fontSize="24px"
              onClick={() => {
                handleOpenDashboard();
              }}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Home
            </Text>
          </Flex>

          <Flex
            alignItems="center"
            marginTop="10px"
            // bg="#A210C6"
            w="15vw"
            p={3}
            borderRadius="md"
          >
            <Image
              marginLeft="15px"
              w="20px"
              h="20px"
              src={AppointmentsIcon}
              alt="Appointments"
            />
            <Text
              marginLeft="15px"
              fontSize="24px"
              color="black"
              onClick="handleOpenAppointmentsModal"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "" }}
            >
              Appointments
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="10px" marginLeft="-48px">
            <Image w="20px" h="20px" src={Wallet} alt="wallet" />
            <Text
              marginLeft="15px"
              color="black"
              fontSize="24px"
              onClick={handleOpenWalletModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Wallet
            </Text>
          </Flex>

          <Flex
            alignItems="center"
            bg="#A210C6"
            w="15vw"
            p={3}
            borderRadius="md"
            marginTop="30px"
            marginLeft="28px"
          >
            <Image
              marginLeft="1px"
              w="20px"
              fontSize="24px"
              h="20px"
              src={SettingsIcon}
              alt="Settings"
            />
            <Text
              marginLeft="15px"
              color="white"
              fontSize="24px"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "" }}
            >
              Settings
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px" marginLeft="-60px">
            <Image marginLeft="10px" w="20px" h="20px" src={Help} alt="Help" />
            <Text
              marginLeft="15px"
              color="black"
              fontSize="24px"
              onClick={handleOpenHelpModal}
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Help
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="70px" marginLeft="-55px">
            <Image
              marginLeft="10px"
              w="20px"
              h="20px"
              src={LogoutIcon}
              alt="Logout"
            />
            <Text
              onClick={handleOpenLogoutModal}
              fontSize="24px"
              marginLeft="15px"
              color="black"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "#A210C6" }}
            >
              Logout
            </Text>
          </Flex>
        </VStack>
        <Box
          borderRight="2px solid #A210C6"
          height="113%"
          marginX={3}
          marginTop="-615px"
        />
      </Box>
      <Box
        position="fixed"
        top="0"
        left="25%"
        width="85%"
        height="100%"
        backgroundColor="white"
        zIndex="1000"
      >
        <Flex>
          <Text
            fontSize="36px"
            fontFamily="body"
            color="#A210C6"
            marginLeft="60px"
            marginTop="30px"
          >
            Settings
          </Text>
          <Flex
            marginLeft="650px"
            style={{
              cursor: "pointer",
            }}
            _hover={{ color: "#A210C6" }}
          >
            <Box marginTop="30px">
              <Image
                src={NotificationIcon}
                alt="Notificatio icon"
                h="16px"
                w="20px"
                marginBottom="10px"
              />
            </Box>

            <Box marginLeft="10px" marginTop="30px">
              {user?.image ? (
                <Link onClick={handleOpenUserDetailsModal}>
                  <Image
                    borderRadius="100px"
                    h="19px"
                    w="20px"
                    src={user?.image}
                    alt="User Image"
                  />
                </Link>
              ) : (
                <Link onClick={handleOpenUserDetailsModal}>
                  <Image
                    src={userImageIcon}
                    alt="User Image Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="19px"
                    w="20px"
                    borderRadius="100%"
                  />
                </Link>
              )}
            </Box>
          </Flex>
        </Flex>
        <Flex>
          <Box width="25%" p={3} h="80vh">
            <Text marginLeft="-160px" fontSize="24px">
              Account
            </Text>

            <Box>
              <Flex
                marginTop="25px"
                style={{
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                <Image
                  src={Bar}
                  alt="Profile Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="50px"
                  w="50px"
                  borderRadius="100%"
                />

                <Image
                  src={ProfileIconWhite}
                  alt="Profile Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="50px"
                  w="50px"
                  borderRadius="100%"
                />
                <Text
                  color="#A210C6"
                  fontSize="20px"
                  marginLeft="5px"
                  marginTop="10px"
                >
                  Profile
                </Text>
                <Image
                  marginLeft="135px"
                  marginTop="20px"
                  w="10px"
                  h="15px"
                  src={ColorArrowIcon}
                  alt="right arrow"
                />
              </Flex>
              <Divider my={1} borderColor="black.500" />
            </Box>
            <Box>
              {" "}
              <Flex
                marginTop="25px"
                style={{
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                <Image
                  src={PasswordIcon}
                  alt="Password Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="50px"
                  w="50px"
                  borderRadius="100%"
                />
                <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                  Change password
                </Text>
                <Image
                  marginLeft="32px"
                  marginTop="20px"
                  w="10px"
                  h="15px"
                  src={RightArrow}
                  alt="right arrow"
                />
              </Flex>
              <Divider my={1} borderColor="black.500" />{" "}
            </Box>
            <Box>
              {" "}
              <Flex
                marginTop="25px"
                style={{
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                <Image
                  src={NotificationIconn}
                  alt="Notification Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="50px"
                  w="50px"
                  borderRadius="100%"
                />
                <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                  Notification Settings
                </Text>
                <Image
                  marginLeft="10px"
                  marginTop="20px"
                  w="10px"
                  h="15px"
                  src={RightArrow}
                  alt="right arrow"
                />
              </Flex>
              <Divider my={1} borderColor="black.500" />{" "}
            </Box>
            <Box>
              {" "}
              <Flex
                marginTop="25px"
                style={{
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                <Image
                  src={HelppIcon}
                  alt="Profile Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="50px"
                  w="50px"
                  borderRadius="100%"
                />
                <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                  Help
                </Text>
                <Image
                  marginLeft="146px"
                  marginTop="20px"
                  w="10px"
                  h="15px"
                  src={RightArrow}
                  alt="right arrow"
                />
              </Flex>
              <Divider my={1} borderColor="black.500" />{" "}
            </Box>
          </Box>
          <Box marginLeft="50px" width="35%" p={3} h="80vh"></Box>

          <Box marginTop="10px" className="edit-profile">
            <VStack marginLeft="-400px" spacing={1}>
              <Text fontSize="20px">Edit profile</Text>
              <FormControl>
                <FormLabel fontSize="16px">First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  value={formData?.firstName}
                  onChange={handleInputChange}
                  borderColor="black"
                />
              </FormControl>
              <FormControl marginTop="15px">
                <FormLabel fontSize="16px">Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  value={formData?.lastName}
                  onChange={handleInputChange}
                  borderColor="black"
                />
              </FormControl>
              <FormControl marginTop="15px">
                <FormLabel fontSize="16px">Date of Birth</FormLabel>
                <Flex
                  border="1px solid black"
                  borderRadius="6px"
                  marginLeft="-5px"
                  h="7vh"
                  w="30vw"
                >
                  <Box marginRight="15px"></Box>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="dd/mm/yyyy"
                    style={{ marginTop: "40px", marginLeft: "50px" }}
                  />
                  <Image
                    marginTop="10px"
                    marginLeft="180px"
                    h="24px"
                    w="24px"
                    src={DateIcon}
                    alt="Date icon"
                  />
                </Flex>
              </FormControl>
              <FormControl marginTop="15px">
                <FormLabel fontSize="16px">Email Address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  borderColor="black"
                />
              </FormControl>
              <FormControl marginTop="15px">
                <FormLabel fontSize="16px">Home Address</FormLabel>
                <Input
                  type="text"
                  name="homeAddress"
                  value={formData?.homeAddress}
                  onChange={handleInputChange}
                  borderColor="black"
                />
              </FormControl>
              <Button
                marginTop="10px"
                color="white"
                bg="#A210C6"
                onClick={handleSave}
              >
                Save changes
              </Button>
            </VStack>
          </Box>
          <Box width="15%">
            <Box
              borderRadius="10px"
              marginTop="30px"
              marginLeft="40px"
              p={3}
              h="150px"
              w="180px"
              bg="white"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            >
              {" "}
              <Box marginLeft="25px" marginTop="10px">
                {user?.image ? (
                  <Link onClick={handleOpenUserDetailsModal}>
                    <Image
                      borderRadius="5px"
                      h="100px"
                      w="100px"
                      src={user?.image}
                      alt="User Image"
                    />
                  </Link>
                ) : (
                  <Link onClick={handleOpenUserDetailsModal}>
                    <Image
                      src={userImageIcon}
                      alt="User Image Icon"
                      boxSize="50px"
                      marginBottom="2%"
                      h="100px"
                      w="100px"
                      borderRadius="100%"
                    />
                  </Link>
                )}
              </Box>
            </Box>
            <Flex marginTop="20px">
              <Button
                fontSize="15px"
                borderColor="#A210C6"
                marginLeft="60px"
                _hover={{ color: "#A210C6" }}
              >
                Change picture
              </Button>
              <Button fontSize="15px" color="red" marginLeft="70px">
                Delete picture
              </Button>
            </Flex>
            <Button
              bg="gray"
              color="white"
              marginTop="5px"
              marginLeft="35px"
              style={{}}
              _hover={{ color: "#A210C6" }}
            >
              Change phone number
            </Button>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};
export default EdithProfilePage;
