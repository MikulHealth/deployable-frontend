
  // return (    
    // <Modal isOpen={isOpen} onClose={onClose} size="6xl">
    //   <ModalOverlay />
    //   <ModalContent marginTop="3px">
    //     <ModalHeader color="#A210C6">Book Appointment</ModalHeader>
    //     <FormControl marginLeft="350px" display="flex" alignItems="center">
    //       <FormLabel htmlFor="book-for-self" mb="0">
    //         Book for yourself
    //       </FormLabel>
    //       <Switch
    //         id="book-for-self"
    //         onChange={handleBookForSelfChange}
    //         isChecked={bookForSelf}
    //       />
    //     </FormControl>
    //     <ModalCloseButton />
    //     <ModalBody>
    //       {bookForSelf ? (
    //         <FormControl>
    //           <Flex>
    //             <Box>
    //               <Flex marginLeft="50px" marginTop="1px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">
    //                     Personal Doctor's name{" "}
    //                   </FormLabel>
    //                   <Input
    //                     name="recipientDoctor"
    //                     type="text"
    //                     placeholder="Personal Doctor's name"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //                 <Box marginLeft="50px">
    //                   <FormLabel marginTop="20px">
    //                     Doctor's phone number{" "}
    //                   </FormLabel>
    //                   <Input
    //                     name="recipientDoctorNumber"
    //                     type="tel"
    //                     placeholder="Personal Doctor's phone number"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //               </Flex>
    //               <Flex marginLeft="50px" marginTop="1px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">Personal hospital </FormLabel>
    //                   <Input
    //                     name="recipientHospital"
    //                     type="text"
    //                     placeholder="Hospital name"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //                 <Box marginLeft="50px">
    //                   <FormLabel marginTop="20px">
    //                     Upload medical report{" "}
    //                   </FormLabel>
    //                   <Input
    //                     name="medicalReport"
    //                     type="file"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //               </Flex>
    //               <Flex marginLeft="50px" marginTop="1px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">Health History </FormLabel>
    //                   <Textarea
    //                     name="recipientHealthHistory"
    //                     type="text"
    //                     placeholder="Health History"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //                 <Box marginLeft="50px">
    //                   <FormLabel marginTop="20px">Current Location </FormLabel>
    //                   <Input
    //                     name="currentLocation"
    //                     type="text"
    //                     placeholder="Current Location"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //               </Flex>
    //             </Box>
    //             <Box>
    //               <Box marginLeft="50px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">Shift </FormLabel>
    //                   <Select
    //                     name="shift"
    //                     placeholder="Select preferred shift"
    //                     w="250px"
    //                     onChange={handleInputChange}
    //                   >
    //                     <option value="Day Shift">Day Shift (8hrs)</option>
    //                     <option value="Night Shift">Night Shift (12hrs)</option>
    //                     <option value="Live in">Live in (24hrs)</option>
    //                   </Select>
    //                 </Box>
    //                 <Box marginLeft="5px">
    //                   <FormLabel marginTop="20px">Service Plan </FormLabel>
    //                   <Select
    //                     name="servicePlan"
    //                     placeholder="preferred service plan"
    //                     w="250px"
    //                     onChange={handleInputChange}
    //                   >
    //                     <option value="Elderly care">Elderly care</option>
    //                     <option value="Postpartum care">Postpartum care</option>
    //                     <option value="Recovery care">Recovery care</option>
    //                   </Select>
    //                 </Box>
    //               </Box>

    //               <Box marginLeft="50px">
    //                 <Box w="250px">
    //                   <FormLabel marginTop="20px">Start Date</FormLabel>
    //                   <DatePicker
    //                     name="startDate"
    //                     selected={selectedStartDate}
    //                     onChange={(date) => handleStartDateChange(date)}
    //                     peekNextMonth
    //                     showMonthDropdown
    //                     showYearDropdown
    //                     dropdownMode="select"
    //                     dateFormat="yyyy-MM-dd"
    //                     placeholderText="preferred date to start"
    //                     className="form-control"
    //                   />
    //                 </Box>
    //                 <Box w="250px" marginLeft="5px">
    //                   <FormLabel marginTop="20px">End Date</FormLabel>
    //                   <DatePicker
    //                     name="endDate"
    //                     selected={selectedEndDate}
    //                     onChange={(date) => handleEndDateChange(date)}
    //                     peekNextMonth
    //                     showMonthDropdown
    //                     showYearDropdown
    //                     dropdownMode="select"
    //                     dateFormat="yyyy-MM-dd"
    //                     placeholderText="preferred date to end"
    //                     className="form-control"
    //                   />
    //                 </Box>{" "}
    //               </Box>
    //             </Box>
    //           </Flex>
    //         </FormControl>
    //       ) : (
    //         <FormControl>
    //           <Flex>
    //             <Box>
    //               <FormLabel> Enter Beneficiary name</FormLabel>
    //               <Flex>
    //                 <Input
    //                   name="recipientFirstname"
    //                   placeholder="First name"
    //                   onChange={handleInputChange}
    //                   w="250px"
    //                 />
    //                 <Input
    //                   name="recipientLastname"
    //                   marginLeft="2px"
    //                   placeholder="Last name"
    //                   onChange={handleInputChange}
    //                   w="250px"
    //                 />
    //               </Flex>
    //               <Flex direction="row" justify="space-between">
    //                 <Box>
    //                   <FormLabel marginTop="20px">Gender </FormLabel>
    //                   <Select
    //                     name="recipientGender"
    //                     placeholder="Select your gender"
    //                     w="250px"
    //                     onChange={handleInputChange}
    //                   >
    //                     <option value="Male">Male</option>
    //                     <option value="Female">Female</option>
    //                   </Select>
    //                 </Box>
    //                 <Box marginLeft="5px" w="250px">
    //                   <FormLabel marginTop="20px">Date of Birth</FormLabel>
    //                   <DatePicker
    //                     name="recipientDOB"
    //                     selected={selectedDob}
    //                     onChange={(date) => handleDobChange(date)}
    //                     maxDate={new Date()}
    //                     peekNextMonth
    //                     showMonthDropdown
    //                     showYearDropdown
    //                     dropdownMode="select"
    //                     dateFormat="yyyy-MM-dd"
    //                     placeholderText="Select your date of birth"
    //                     className="form-control"
    //                   />
    //                 </Box>
    //               </Flex>
    //               <Flex marginTop="1px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">Contact Number </FormLabel>
    //                   <Input
    //                     name="recipientPhoneNumber"
    //                     type="tel"
    //                     placeholder="Beneficiary PhoneNumber"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>

    //                 <Box marginLeft="5px">
    //                   <FormLabel marginTop="20px">Current Location </FormLabel>
    //                   <Input
    //                     name="currentLocation"
    //                     type="text"
    //                     placeholder="Current Location"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //               </Flex>
    //               <Flex marginTop="1px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">Next of kin </FormLabel>
    //                   <Input
    //                     name="kinName"
    //                     type="text"
    //                     placeholder="Next of kin name"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //                 <Box marginLeft="5px">
    //                   <FormLabel marginTop="20px">Phone number </FormLabel>
    //                   <Input
    //                     name="kinNumber"
    //                     type="text"
    //                     placeholder="Next of kin phone number"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //               </Flex>
    //               <Flex>
    //                 <Box>
    //                   <FormLabel marginTop="20px">
    //                     Relationship with beneficiary{" "}
    //                   </FormLabel>
    //                   <Select
    //                     name="relationship"
    //                     placeholder="Select the appropriate relationship type"
    //                     w="250px"
    //                     onChange={handleInputChange}
    //                   >
    //                     <option value="Mum">Mum</option>
    //                     <option value="Dad">Dad</option>

    //                     <option value="Wife">Wife</option>
    //                     <option value="Husband">Husband</option>

    //                     <option value="Sister">Sister</option>
    //                     <option value="Brother">Brother</option>
    //                     <option value="Uncle">Uncle</option>
    //                     <option value="Aunt">Aunt</option>
    //                     <option value="Son">Son</option>
    //                     <option value="Daughter">Daughter</option>
    //                     <option value="Niece">Niece</option>
    //                     <option value="Nephew">Nephew</option>
    //                     <option value="Cousin">Cousin</option>
    //                     <option value="Friend">Friend</option>
    //                     <option value="Colleague">Colleague</option>
    //                     <option value="Neighbour">Neighbour</option>

    //                     <option value="MotherInLaw">Mother in-law</option>
    //                     <option value="FatherInLaw">Father in-law</option>
    //                     <option value="Grandmother">Grand mother</option>
    //                     <option value="Grandfather">Grand father</option>
    //                   </Select>
    //                 </Box>
    //                 <Box>
    //                   <FormLabel marginTop="20px">Preferred Language</FormLabel>
    //                   <Select
    //                     name="language"
    //                     placeholder="Select preferred language"
    //                     w="250px"
    //                     onChange={handleInputChange}
    //                   >
    //                     <option value="eng">English</option>
    //                     <option value="igbo">Igbo</option>
    //                     <option value="yoruba">Yoruba</option>
    //                     <option value="housa">Hausa</option>
    //                     <option value="Pigeon">Pidgeon</option>
    //                     <option value="other">Others</option>
    //                   </Select>
    //                 </Box>
    //               </Flex>
    //             </Box>
    //             <Box marginLeft="50px">
    //               <Flex marginTop="1px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">
    //                     Personal Doctor's name{" "}
    //                   </FormLabel>
    //                   <Input
    //                     name="recipientDoctor"
    //                     type="text"
    //                     placeholder="Personal Doctor's name"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //                 <Box marginLeft="5px">
    //                   <FormLabel marginTop="20px">
    //                     Doctor's phone number{" "}
    //                   </FormLabel>
    //                   <Input
    //                     name="recipientDoctorNumber"
    //                     type="text"
    //                     placeholder="Personal Doctor's phone number"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //               </Flex>
    //               <Flex marginTop="1px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">Personal hospital </FormLabel>
    //                   <Input
    //                     name="recipientHospital"
    //                     type="text"
    //                     placeholder="Hospital name"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //                 <Box marginLeft="5px">
    //                   <FormLabel marginTop="20px">
    //                     Upload medical report{" "}
    //                   </FormLabel>
    //                   <Input
    //                     name="medicalReport"
    //                     type="file"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //               </Flex>
    //               <Flex marginTop="1px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">Health History </FormLabel>
    //                   <Input
    //                     name="recipientHealthHistory"
    //                     type="text"
    //                     placeholder="Health History"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //                 <Box marginLeft="5px">
    //                   <FormLabel marginTop="20px">Upload picture </FormLabel>
    //                   <Input
    //                     name="recipientImage"
    //                     type="file"
    //                     placeholder="Recipient Image"
    //                     onChange={handleInputChange}
    //                     w="250px"
    //                   />
    //                 </Box>
    //               </Flex>

    //               <Flex marginTop="1px">
    //                 <Box>
    //                   <FormLabel marginTop="20px">Shift </FormLabel>
    //                   <Select
    //                     name="shift"
    //                     placeholder="Select preferred shift"
    //                     w="250px"
    //                     onChange={handleInputChange}
    //                   >
    //                     <option value="Day Shift">Day Shift (8hrs)</option>
    //                     <option value="Night Shift">Night Shift (12hrs)</option>
    //                     <option value="Live in">Live in (24hrs)</option>
    //                   </Select>
    //                 </Box>
    //                 <Box marginLeft="5px">
    //                   <FormLabel marginTop="20px">Service Plan </FormLabel>
    //                   <Select
    //                     name="servicePlan"
    //                     placeholder="preferred service plan"
    //                     w="250px"
    //                     onChange={handleInputChange}
    //                   >
    //                     <option value="Elderly care">Elderly care</option>
    //                     <option value="Postpartum care">
    //                       Postpartum care (New mum)
    //                     </option>
    //                     <option value="Recovery care">Nanny care</option>
    //                     <option value="Recovery care">Recovery care</option>
    //                   </Select>
    //                 </Box>
    //               </Flex>

    //               <Flex marginTop="1px">
    //                 <Box w="250px">
    //                   <FormLabel marginTop="20px">Start Date</FormLabel>
    //                   <DatePicker
    //                     name="startDate"
    //                     selected={selectedStartDate}
    //                     onChange={(date) => handleStartDateChange(date)}
    //                     peekNextMonth
    //                     showMonthDropdown
    //                     showYearDropdown
    //                     dropdownMode="select"
    //                     dateFormat="yyyy-MM-dd"
    //                     placeholderText="preferred date to start"
    //                     className="form-control"
    //                   />
    //                 </Box>
    //                 <Box w="250px" marginLeft="5px">
    //                   <FormLabel marginTop="20px">End Date</FormLabel>
    //                   <DatePicker
    //                     name="endDate"
    //                     selected={selectedEndDate}
    //                     onChange={(date) => handleEndDateChange(date)}
    //                     peekNextMonth
    //                     showMonthDropdown
    //                     showYearDropdown
    //                     dropdownMode="select"
    //                     dateFormat="yyyy-MM-dd"
    //                     placeholderText="preferred date to end"
    //                     className="form-control"
    //                   />
    //                 </Box>{" "}
    //               </Flex>
    //             </Box>
    //           </Flex>
    //         </FormControl>
    //       )}
    //     </ModalBody>
    //     <ModalFooter>
    //       <Button bg="gray" color="white" onClick={onClose}>
    //         Cancel
    //       </Button>
    //       <Button
    //         isLoading={loading}
    //         loadingText="Processing..."
    //         marginLeft="5px"
    //         bg="#A210C6"
    //         color="white"
    //         onClick={handleFormSubmit}
    //       >
    //         {loading ? "Processing..." : "Submit"}
    //       </Button>
    //     </ModalFooter>
    //   </ModalContent>
    // </Modal>
  // );
