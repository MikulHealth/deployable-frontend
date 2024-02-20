import { axiosInstance } from "./index";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export const GetCurrentUser = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.get(
      // "https://spedire.onrender.com/api/v1/user/getCurrentUser",
      "http://localhost:8080/v1/angel/getCurrentUser",
      config
    );
    console.log(response.data + "this is response from getCurrentUser");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
 
};

export const UpdateCustomer = async (editedUser, toast, setLoading, toastMessage) => {
	try {
	  const config = {
		headers: {
		  Authorization: `Bearer ${localStorage.getItem("token")}`,
		},
	  };
  
	  setLoading(true); 
  
	  const response = await axios.put(
		"http://localhost:8080/v1/angel/updateCustomer",
		editedUser,
		config
	  );
  
	  setLoading(false);
  
	  if (response && response.data) {
		toast({
		  title: "Update Successful",
		  description: toastMessage || response.data.message,
		  status: "success",
		  duration: 6000,
		  isClosable: true,
		});
		return { success: true, data: response.data };
	  } else {
		console.error("Invalid response:", response);
		toast({
		  title: "Update Failed",
		  description: "Invalid response from the server",
		  status: "error",
		  duration: 5000,
		  isClosable: true,
		});
		return { success: false, error: "Invalid response from the server" };
	  }
	} catch (error) {
	  console.error("Failed to update user details:", error);
	  toast({
		title: "Update Failed",
		description: error.response?.data || "Unknown error occurred",
		status: "error",
		duration: 5000,
		isClosable: true,
	  });
	  setLoading(false); 
	  return { success: false, error: error.response?.data || "Unknown error occurred" };
	}
  };
  