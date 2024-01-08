import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { GetCurrentUser } from "../../apiCalls/UserApis";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Import axios for making API calls
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Image,
  Text,
  Button,
  ModalFooter,
} from '@chakra-ui/react';
import defaultImage from "../../assets/userImage.svg";
import EditProfileModal from './EditUser';  

const UserDetailsModal = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect to make the API call on mount
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

  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
    onClose();
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="center" spacing={4}>
              <Image
                src={user?.image || defaultImage}
                alt="User Image"
                borderRadius="8px"
                h="45vh"
                w="20vw"
              />
              <Text>{`Name: ${user?.firstName} ${user?.lastName}`}</Text>
              <Text>{`Home address: ${user?.address}`}</Text>
              <Text>{`Email: ${user?.email}`}</Text>
              <Text>{`Phone Number: ${user?.phoneNumber}`}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button bg="#A210C6" color="white" onClick={handleEditClick}>
              Edit Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* New EditProfileModal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
      />
    </>
  );
};

export default UserDetailsModal;
