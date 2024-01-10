import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Box,
  Text,
  Button,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import LoadingSpinner from "../../utils/Spiner";
import { useNavigate } from "react-router-dom";

const SettingsModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const [editedUser, setEditedUser] = useState({
    phoneNumber: "",
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
      phoneNumber: user?.phoneNumber || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleBack = () => {
    onClose();
  };


  const handleVerify = async () => {
    try {
      setLoading(true);
      localStorage.setItem("phoneNumber", editedUser.phoneNumber);
      const number = localStorage.getItem("phoneNumber");
      const verifyNumberResponse = await axios.post(
        "http://localhost:8080/api/v1/sms/verify-number",
        {
          phoneNumber: number,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      toast({
        title: "OTP Sent",
        description: verifyNumberResponse.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/verifyPhone");
      }, 5000);
      // Redirect or perform other actions based on the response
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      // Set loading back to false regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update phone Number</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Kindly enter a valid phone number, as you would have to verify the
            phone number with secret code that would be sent to the number upon
            submition.
          </Text>
          <FormControl>
            <Input
              name="phoneNumber"
              value={editedUser.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Box display="flex">
            <Button
            //   marginLeft="200px"
              bg="gray"
              onClick={handleBack}
              marginBottom="4"
              color="white"
            >
              Cancel
            </Button>

            <Button
              marginLeft="150px"
              bg="#A210C6"
              onClick={handleVerify}
              marginBottom="4"
              color="white"
              isLoading={loading}
              loadingText="Updating..."
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
