import React, { useState, useEffect } from "react";
import { GetCurrentUser, UpdateCustomer } from "../../apiCalls/UserApis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetUser } from "../../redux/userSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentModal from "../sections/AppointmentForm";
import AllAppointments from "../sections/AllAppointments"; // Adjust the import path

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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import userImageIcon from "../../assets/userImage.svg";
import NotificationIcon from "../../assets/notification.svg";
import familyIcon from "../../assets/family.svg";
import UserDetailsModal from "../sections/UserDetails";
import LoadingSpinner from "../../utils/Spiner";

const AppointmentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.userReducer);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
   const [showViewAllModal, setShowViewAllModal] = useState(false);  

  

  const handleOpenUserDetailsModal = () => {
    setShowUserDetailsModal(true);
  };

  const handleCloseUserDetailsModal = () => {
    setShowUserDetailsModal(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleOpenAppointmentModal = () => {
    setShowAppointmentModal(true);
  };

  const handleCloseAppointmentModal = () => {
    setShowAppointmentModal(false);
  };

  return (
    <ChakraProvider>
      <Box>
        <Flex>
          <Text
            fontSize="28px"
            fontFamily="body"
            color="#A210C6"
            marginLeft="60px"
            marginTop="30px"
          >
            Appointments
          </Text>
          <Flex marginLeft="600px">
            <Box marginTop="30px">
              <Image
                src={NotificationIcon}
                alt="Notificatio icon"
                h="25px"
                w="25px"
                marginTop="10px"
                marginBottom="10px"
              />
            </Box>

            <Box marginLeft="10px" marginTop="30px">
              {user?.image ? (
                <Link onClick={handleOpenUserDetailsModal}>
                  <Image
                    borderRadius="100px"
                    h="40px"
                    w="40px"
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
                    h="40px"
                    w="40px"
                    borderRadius="100%"
                  />
                </Link>
              )}
            </Box>
          </Flex>
        </Flex>
        <Box
          marginLeft="70px"
          marginTop="40px"
          border="1px solid gray"
          borderRadius="md"
          padding="3px"
          w="60vw"
        >
          <Flex marginLeft="10px">
            <SearchIcon boxSize={4} marginRight="10px" marginTop="5px" />
            <DatePicker
              name="DOB"
              selected={selectedDate}
              onChange={handleDateChange}
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="yyyy-MM-dd"
              placeholderText="search by date"
              className="form-control"
              style={{
                fontStyle: "italic",
                border: "1px solid #ced4da",
                borderRadius: "4px",
              }}
            />
          </Flex>
        </Box>
        <Flex
          marginLeft="70px"
          marginTop="20px"
          bg="#F6E4FC"
          w="60vw"
          h="30vh"
          padding="5px"
          borderRadius="4px"
        >
          <Box>
            <Text
              fontSize="20px"
              fontFamily="body"
              color="black"
              marginTop="15px"
              marginLeft="-250px"
            >
              Hello {user?.firstName},
            </Text>
            <Text fontSize="15px" marginLeft="15px" marginTop="5px">
              You have no appointments yet. Would you like to book one
            </Text>
            <Text fontSize="15px" marginTop="2px" marginLeft="-195px">
              for yourself or a loved one?
            </Text>
            <Button
              onClick={handleOpenAppointmentModal}
              bg="#A210C6"
              color="white"
              marginLeft="-220px"
              marginTop="30px"
            >
              Book appointment
            </Button>
          </Box>
          <Box>
            <Image
              src={familyIcon}
              alt="family icon"
              h="150px"
              w="150px"
              marginTop="20px"
              marginBottom="10px"
              marginLeft="160px"
            />
          </Box>
        </Flex>
        <Box marginLeft="69px">
          <Box display="flex" marginTop="30px">
            <Box bg="#F6E4FC" w="29vw" h="15vh" borderRadius="10px"  cursor="pointer"
              onClick={() => setShowViewAllModal(true)} // Open "View All Appointments" modal
           >
              {" "}
              <Text
                fontSize="20px"
                fontFamily="body"
                color="#A210C6"
                marginTop="10px"
                style={{ marginLeft: "-195px" }}
              >
                All Appointments
              </Text>
              
              <Text
                fontSize="16px"
                style={{
                  marginLeft: "250px",
                  marginTop: "25px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                View all
              </Text>
            </Box>
            <Box
              bg="#F6E4FC"
              w="29vw"
              h="15vh"
              marginLeft="26px"
              borderRadius="10px"
            >
              {" "}
              <Text
                fontSize="20px"
                fontFamily="body"
                color="#A210C6"
                marginTop="10px"
                style={{ marginLeft: "-155px" }}
              >
               Active Appointments
              </Text>
             
              <Text
                fontSize="16px"
                style={{
                  marginLeft: "250px",
                  marginTop: "25px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                View
              </Text>
            </Box>
          </Box>
          <Box display="flex" marginTop="30px">
            <Box bg="#F6E4FC" w="29vw" h="15vh" borderRadius="10px">
              {" "}
              <Text
                fontSize="20px"
                fontFamily="body"
                color="#A210C6"
                marginTop="10px"
                style={{ marginLeft: "-125px" }}
              >
                Completed Appointments
              </Text>
             
              <Text
                fontSize="16px"
                style={{
                  marginLeft: "250px",
                  marginTop: "25px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
                // onClick={() => setShowServicesModal(true)}
              >
              View 
              </Text>
              {/* <ServicesModal
                isOpen={showServicesModal}
                onClose={() => setShowServicesModal(false)}
              /> */}
            </Box>
            <Box
              bg="#F6E4FC"
              w="29vw"
              h="15vh"
              marginLeft="26px"
              borderRadius="10px"
            >
              {" "}
              <Text
                fontSize="20px"
                fontFamily="body"
                color="#A210C6"
                marginTop="10px"
                style={{ marginLeft: "-125px" }}
              >
                 Cancelled Appointments
              </Text>
              
              <Text
                fontSize="16px"
                style={{
                  marginLeft: "250px",
                  marginTop: "25px",
                  fontStyle: "italic",
                  cursor: "pointer",
                }}
                _hover={{ color: "#A210C6" }}
              >
                View 
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <UserDetailsModal
        isOpen={showUserDetailsModal}
        onClose={handleCloseUserDetailsModal}
      />
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={handleCloseAppointmentModal}
      />
       <AllAppointments
        isOpen={showViewAllModal}
        onClose={() => setShowViewAllModal(false)}
      />
    </ChakraProvider>
  );
};

export default AppointmentPage;