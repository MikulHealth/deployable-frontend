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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  Link,
  Divider,
  Select,
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
import UpdatePhoneNumber from "../sections/UpdatePhoneNumber";

const EdithProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setPic] = useState();
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    dob: user?.dob,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    address: user?.address,
    gender: user?.gender,
    image: user?.image,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name !== "dob") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      handleDOBChange(value);
    }
  };

  const handleDOBChange = (dobValue) => {
    // Check if 'dobValue' is provided, if not, use the current date
    const newDate = dobValue ? new Date(dobValue) : new Date();

    // Update the 'selectedDate' state
    setSelectedDate(newDate);

    // Update the 'formData' with the formatted date or an empty string if 'dobValue' is falsy
    setFormData({
      ...formData,
      dob: dobValue ? newDate.toISOString().split("T")[0] : "",
    });
  };

  const handleOpenConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleOpenHelpModal = () => {};

  const handleOpenWalletModal = () => {
    navigate("/wallet");
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);

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

  const handleOpenSettingsModal = () => {
    navigate("/settings");
  };

  const handleChangePassowrdModal = () => {
    navigate("/change-password");
  };

  const handleOpenNotificationssModal = () => {
    navigate("/notification-settings");
  };


  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handlePhoneModalOpen = () => {
    setPhoneModalOpen(true);
  };

  const handlePhoneModalClose = () => {
    setPhoneModalOpen(false);
  };

  const handleImageChange = async (image, formData, setFormData) => {
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
      return;
    }
  };

  const handleSubmit = async () => {
    handleCloseConfirmationModal();
    setLoading(true);
    try {
      await handleImageChange(image, formData, setFormData);

      // Add one day to the selected date
      const modifiedDate = selectedDate
        ? new Date(selectedDate.getTime() + 86400000)
        : null;

      // Format the modified date to match the backend expectations
      const formattedDate = modifiedDate
        ? modifiedDate.toISOString().split("T")[0]
        : "";

      const dataToSend = {
        ...formData,
        dob: formattedDate,
      };

      const response = await UpdateCustomer(
        dataToSend,
        toast,
        setLoading,
        "You will be re-directed to the dashboard"
      );

      if (response.success) {
        setLoading(false);
        console.log("User details updated successfully:", response.data);
        setTimeout(() => {}, 7000);
        navigate("/dashboard");
        window.location.reload();
      } else {
        console.error("Failed to update user details:", response.error);
      }
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
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
            <Image marginLeft="2px" w="20px" h="20px" src={Help} alt="Help" />
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
                marginLeft="-25px"
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
                  marginLeft="-20px"
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
                  marginLeft="130px"
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
                onClick={handleChangePassowrdModal}
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
          <Box marginLeft="420px" width="10%" p={3} h="80vh">
            <Box className="edit-profile">
              <VStack width="30vw" marginLeft="-400px" spacing={-10}>
                <Text fontSize="20px">Edit profile</Text>
                <FormControl>
                  <FormLabel fontSize="16px">First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData?.firstName}
                    onChange={handleInputChange}
                    borderColor="black"
                    _hover={{ color: "" }}
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
                    _hover={{ color: "" }}
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
                      selected={
                        selectedDate ||
                        (formData.dob ? new Date(formData.dob) : null)
                      }
                      onChange={(date) => handleDOBChange(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/yyyy"
                      maxDate={new Date()}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      value={formatDate(formData.dob)}
                      style={{
                        marginTop: "40px",
                        marginLeft: "50px",
                        display: "",
                      }}
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
                    _hover={{ color: "" }}
                  />
                </FormControl>
                <FormControl marginTop="15px">
                  <FormLabel fontSize="16px">Home Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    value={formData?.address}
                    onChange={handleInputChange}
                    borderColor="black"
                    _hover={{ color: "" }}
                  />
                </FormControl>
                {/* <FormControl marginTop="15px">
                  <FormLabel>Gender </FormLabel>
                  <Select
                    name="gender"
                    placeholder="Select your gender"
                    w="240px"
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </FormControl> */}
                <Button
                  marginTop="10px"
                  color="white"
                  bg="#A210C6"
                  onClick={handleOpenConfirmationModal}
                  _hover={{ color: "white" }}
                >
                  Save changes
                </Button>
              </VStack>
            </Box>
          </Box>
          <Box marginLeft="-80px" width="15%">
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
                {formData.image ? (
                  <Image
                    borderRadius="5px"
                    h="100px"
                    w="100px"
                    src={formData.image}
                    alt="User Image"
                  />
                ) : (
                  <Image
                    src={userImageIcon}
                    alt="User Image Icon"
                    boxSize="50px"
                    marginBottom="2%"
                    h="100px"
                    w="100px"
                    borderRadius="100%"
                  />
                )}
              </Box>
              <Input
                marginTop="40px"
                marginBottom="20px"
                id="fileInput"
                name="image"
                type="file"
                accept="image/*"
                borderColor="black"
                _hover={{ color: "" }}
                onChange={(e) => {
                  handleImageChange(e.target.files[0], formData, setFormData);
                }}
              />
            </Box>
            <Flex marginTop="55px">
              {imageLoading && <LoadingSpinner size={20} />}
              <Button
                fontSize="15px"
                borderColor="#A210C6"
                marginLeft="60px"
                _hover={{ color: "" }}
                onClick={handleOpenConfirmationModal}
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
              _hover={{ color: "" }}
              onClick={handlePhoneModalOpen}
            >
              Change phone number
            </Button>
          </Box>
        </Flex>
      </Box>
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Changes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to save the changes?</ModalBody>
          <Box display="flex" justifyContent="flex-end" p="2">
            <Button
              mr={3}
              onClick={handleCloseConfirmationModal}
              colorScheme="gray"
              color="#A210C6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="white"
              bg="#A210C6"
              isLoading={loading}
            >
              Confirm
            </Button>
          </Box>
        </ModalContent>
      </Modal>
      <UpdatePhoneNumber
        isOpen={isPhoneModalOpen}
        onClose={handlePhoneModalClose}
      />
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={handleCloseUserDetailsModal}
      />
    </ChakraProvider>
  );
};
export default EdithProfilePage;
