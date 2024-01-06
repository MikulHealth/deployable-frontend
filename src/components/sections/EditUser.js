import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../../apiCalls/UserApis";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Button,
  useToast,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserDeatails from "./UserDetails";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("token")) {
        try {
          console.log("Calling GetCurrentUser API");
          const response = await GetCurrentUser();

          if (response.success) {
            console.log("API response:", response.data);
            setUser(response.data);
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


  useEffect(() => {
    setEditedUser({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      address: user?.address || "",
      phoneNumber: user?.phoneNumber || "",
      image: user?.image || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser((prevUser) => ({
          ...prevUser,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [isUserModalOpen, setUserModalOpen] = useState(false);

  const handleBackClick = () => {
    setUserModalOpen(true);
    onClose();
  };

  const handleUserModalClose = () => {
    setUserModalOpen(false);
  };

  const handleSubmit = () => {
    // Perform logic to send updated details to the server
    console.log("Updated user details:", editedUser);
    // You can make an API call here to update the user details

    // Close the modal after updating
    onClose();
  };

  const handleBack = () => {
    // navigate("/details");
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginTop="-5px">
            <VStack align="center" spacing={4}>
              {/* Profile Picture Input */}
              <Image
                src={editedUser.image}
                alt="Profile Preview"
                boxSize="100px"
                objectFit="cover"
                borderRadius="8px"
                marginBottom="-2"
              />
              <Text>Kindly make the changes below</Text>
              <Input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              {/* Other Input Fields */}
              <Input
                name="firstName"
                value={editedUser.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <Input
                name="lastName"
                value={editedUser.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
              <Input
                name="address"
                value={editedUser.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
              <Input
                name="phoneNumber"
                value={editedUser.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
            </VStack>
          </ModalBody>
          <Box display="flex">
            <Button
              marginLeft="50px"
              colorScheme="teal"
              onClick={handleBack}
              marginBottom="4"
            >
              Cancel
            </Button>

            <Button
              marginLeft="80px"
              colorScheme="teal"
              onClick={handleSubmit}
              marginBottom="4"
            >
              Save Changes
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
