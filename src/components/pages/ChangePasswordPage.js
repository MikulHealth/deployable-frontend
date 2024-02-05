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

import { PhoneIcon, AddIcon, WarningIcon, SearchIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  VStack,
  Input,
  Button,
  useToast,
  InputGroup,
  InputRightElement,
  Image,
  Box,
  Text,
  IconButton,
  Flex,
  Link,
  Divider,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
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
import PasswordIcon from "../../assets/ColoredNotificationIcon.svg";
import HelppIcon from "../../assets/HelppIcon.svg";
import NotificationIconn from "../../assets/Notification.Icon.svg";
import Bar from "../../assets/ColoredBar.svg";

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
  const handleOpenSettingsModal = () => {
    navigate("/settings");
  };

  const handleOpenEditProfileDashboard = () => {
    navigate("/edit-profile");
  };

  const handleChangePassowrdModal = () => {
    navigate("/change-password");
  };

  const handleOpenAppointmentsModal = () => {
    navigate("/appointment");
  };

  const handleOpenNotificationssModal = () => {
    navigate("/notification-settings");
  };


  const validate = (values) => {
    let errors = {};
  
    if (!values.oldPassword) errors.oldPassword = "*Required";
  
    if (!values.newPassword) errors.newPassword = "*Required";
    else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}/.test(
        values.newPassword
      )
    )
      errors.newPassword =
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long";
  
    if (!values.confirmPassword) errors.confirmPassword = "*Required";
    else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}/.test(
        values.confirmPassword
      )
    )
      errors.confirmPassword =
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 8 characters long";
  
    if (values.newPassword !== values.confirmPassword)
      errors.confirmPassword = "Password do not match";
  
    return errors;
  };


  const handleSaveChanges = async () => {
    // Validate passwords
    const validationErrors = validate({ oldPassword, newPassword, confirmPassword });

    if (Object.keys(validationErrors).length > 0) {
      // Display validation errors using toast messages
      Object.values(validationErrors).forEach((error) => {
        toast({
          title: "Validation Error",
          description: error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
      return;
    }

    // API call to update the password
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8080/v1/angel/change-password", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const responseData = await response.json(); // Parse the response JSON

      if (response.ok && responseData.success) {
        toast({
          title: "Password Updated",
          description: response.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("API error:", responseData.message);
        toast({
          title: "Password reset failed",
          description: responseData.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Network error:", error.message);
      toast({
        title: "Network Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // Reset the form fields after saving changes
    // setOldPassword("");
    // setNewPassword("");
    // setConfirmPassword("");
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
              fontSize="18px"
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
              marginLeft="25px"
              w="20px"
              h="20px"
              src={AppointmentsIcon}
              alt="Appointments"
            />
            <Text
              marginLeft="15px"
              fontSize="18px"
              color="black"
              onClick={handleOpenAppointmentsModal}
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
              fontSize="18px"
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
              marginLeft="10px"
              w="20px"
              fontSize="24px"
              h="20px"
              src={SettingsIcon}
              alt="Settings"
            />
            <Text
              marginLeft="15px"
              color="white"
              fontSize="18px"
              style={{
                cursor: "pointer",
              }}
              _hover={{ color: "" }}
              onClick={handleOpenSettingsModal}
            >
              Settings
            </Text>
          </Flex>

          <Flex alignItems="center" marginTop="30px" marginLeft="-60px">
            <Image marginLeft="5px" w="20px" h="20px" src={Help} alt="Help" />
            <Text
              marginLeft="15px"
              color="black"
              fontSize="18px"
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
              marginLeft="15px"
              w="20px"
              h="20px"
              src={LogoutIcon}
              alt="Logout"
            />
            <Text
              onClick={handleOpenLogoutModal}
              fontSize="18px"
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
            onClick={handleOpenSettingsModal}
          >
            <Box marginTop="30px">
              <Image
                src={NotificationIcon}
                alt="Notificatio icon"
                h="26px"
                w="30px"
                marginBottom="10px"
              />
            </Box>

            <Box marginLeft="10px" marginTop="30px">
              {user?.image ? (
                <Link onClick={handleOpenUserDetailsModal}>
                  <Image
                    borderRadius="100px"
                    h="29px"
                    w="30px"
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
                onClick={handleOpenEditProfileDashboard}
              >
                <Image
                  src={ProfileIcon}
                  alt="Profile Icon"
                  boxSize="50px"
                  marginBottom="2%"
                  h="50px"
                  w="50px"
                  borderRadius="100%"
                />
                <Text fontSize="20px" marginLeft="5px" marginTop="10px">
                  Profile
                </Text>
                <Image
                  marginLeft="135px"
                  marginTop="20px"
                  w="10px"
                  h="15px"
                  src={RightArrow}
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
                marginLeft="-25px"
              >
                {" "}
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
                  src={PasswordIcon}
                  alt="Password Icon"
                  marginLeft="-20px"
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
                  Change password
                </Text>
                <Image
                  marginLeft="35px"
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
                onClick={handleOpenNotificationssModal}
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
          </Box>
          <Box
            marginTop="30px"
            className="change-password"
            marginLeft="50px"
            width="35%"
            p={3}
            h="80vh"
          >
            {" "}
            <VStack spacing={3} align="center">
            <Text fontSize="20px">Change password</Text>
              <FormControl>
                <FormLabel>Old Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    borderColor="black"
                    _hover={{ color: "" }}
                  />

                  <InputRightElement width="4.5rem">
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      onClick={handleToggleOldPassword}
                      icon={showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                    />
                    {/* <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleToggleOldPassword}
                      bg="gray"
                      color="white"
                    >
                      {showOldPassword ? "Hide" : "Show"}
                    </Button> */}
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    borderColor="black"
                    _hover={{ color: "" }}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      onClick={handleToggleNewPassword}
                      icon={showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Confirm New Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    borderColor="black"
                    _hover={{ color: "" }}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      onClick={handleToggleConfirmPassword}
                      icon={showConfirmPassword ? <HiEyeOff /> : <HiEye />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button color="white" bg="#A210C6" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};
export default ChangePasswordPage;
