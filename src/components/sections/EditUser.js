import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
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
  Progress,
  useToast,
  Image,
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import UserDeatails from "./UserDetails";
import LoadingSpinner from "../../utils/Spiner";
import UpdatePhoneNumber from "./UpdatePhoneNumber";

const EditProfileModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [image, setPic] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
    image: "",
  });
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const toast = useToast();

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
      email: user?.email || "",
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

  const handleImageChange = async (image, editedUser, setEditedUser) => {
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

        setEditedUser({
          ...editedUser,
          image: imageData.url.toString(),
        });
        setImageLoading(false);
        console.log(imageData.url.toString());
      } catch (err) {
        console.log(err);
        setImageLoading(false);
      }
    } else {
      // toast.error("Please select an image");

      return;
    }
  };

  const handlePhoneModalOpen = () => {
    setPhoneModalOpen(true);
    onClose();
  };

  const handlePhoneModalClose = () => {
    setPhoneModalOpen(false);
  };

  const handleBack = () => {
    onClose();
  };

  const handleOpenConfirmationModal = () => {
    setConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModalOpen(false);
  };

  const handleSubmit = async () => {
    handleCloseConfirmationModal(); // Close the confirmation modal
    setLoading(true);
    try {
      await handleImageChange(image, editedUser, setEditedUser);
      const response = await UpdateCustomer(editedUser, toast, setLoading, "You will be re-directed to the dashboard");

      if (response.success) {
        setLoading(false);
        console.log("User details updated successfully:", response.data);
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
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody marginTop="-2px">
          <Progress size='xs' isIndeterminate />
            <VStack align="center" spacing={4}>
              <Text marginLeft="2px" marginTop="2px">
                Only update the field(s) you want to change before saving the
                change(s)
              </Text>
              <Flex direction="row" justify="space-between">
                <Image
                  src={editedUser.image}
                  alt="Profile Preview"
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="8px"
                  marginBottom="-2"
                />

                <FormLabel marginLeft="8px" marginTop="2px">
                  Update picture <br />
                  (only PNG and JPG files are accepted)
                </FormLabel>
              </Flex>
              <Input
                name="image"
                marginLeft="-6px"
                w="398px"
                type="file"
                accept="image/*"
                placeholder="Image"
                onChange={(e) => {
                  handleImageChange(
                    e.target.files[0],
                    editedUser,
                    setEditedUser
                  );
                }}
              />
              {imageLoading && <LoadingSpinner size={20} />}

              <Flex direction="row" justify="space-between" w="100%">
                <FormControl>
                  <Input
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />
                </FormControl>
                <FormControl>
                  <Input
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                </FormControl>
              </Flex>

              <Input
                name="address"
                value={editedUser.address}
                onChange={handleInputChange}
                placeholder="Home address"
              />

              <Flex direction="row" justify="space-between" w="100%">
                <FormControl>
                  <Input
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    placeholder="email address"
                  />
                </FormControl>
                <FormControl>
                  <Button onClick={handlePhoneModalOpen}>
                    Change phone number
                  </Button>
                </FormControl>
              </Flex>
            </VStack>
          </ModalBody>
          <Box display="flex">
            <Button
              marginLeft="50px"
              bg="gray"
              onClick={handleBack}
              marginBottom="4"
              color="white"
            >
              Cancel
            </Button>

            <Button
              marginLeft="130px"
              bg="#A210C6"
              onClick={handleOpenConfirmationModal} // Open confirmation modal
              marginBottom="4"
              color="white"
              isLoading={loading}
              loadingText="Updating..."
            >
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </Box>
        </ModalContent>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Changes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to save the changes?
          </ModalBody>
          <Box display="flex" justifyContent="flex-end" p="2">
            <Button
              mr={3}
              onClick={handleCloseConfirmationModal}
              colorScheme="gray"
              color="#A210C6"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="white" bg="#A210C6" isLoading={loading}>
              Save Changes
            </Button>
          </Box>
        </ModalContent>
      </Modal>

      <UpdatePhoneNumber
        isOpen={isPhoneModalOpen}
        onClose={handlePhoneModalClose}
      />
    </>
  );
};

export default EditProfileModal;
