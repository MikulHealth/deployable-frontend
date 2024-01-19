// import { useSelector } from 'react-redux';
// import React, { useState } from 'react';
// import Modal from 'react-modal'; // Import React Modal
// import Image from 'react-modal-image'; // Import React Modal Image (or use an alternative)
// import defaultImage from "../../assets/userImage.svg";
// import EditProfileModal from './EditUser';

// const UserModal = ({ isOpen, onClose }) => {
//   const user = useSelector((state) => state.userReducer.user);

//   const [isEditModalOpen, setEditModalOpen] = useState(false);

//   const handleEditClick = () => {
//     setEditModalOpen(true);
//     onClose();
//   };

//   const handleEditModalClose = () => {
//     setEditModalOpen(false);
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Profile Details" style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }, content: { width: '50%', margin: 'auto' } }}>
//       <div>
//         <h2>Profile Details</h2>
//         <button onClick={onClose}>Close</button>
//         <div>
//           <Image
//             small={user?.image || defaultImage}
//             large={user?.image || defaultImage}
//             alt="User Image"
//           />
//           <p>{`Name: ${user?.firstName} ${user?.lastName}`}</p>
//           <p>{`Address: ${user?.address}`}</p>
//           <p>{`Phone Number: ${user?.phoneNumber}`}</p>
//         </div>
//         <div>
//           {user && (
//             <button onClick={handleEditClick}>
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>

//       <EditProfileModal
//         isOpen={isEditModalOpen}
//         onRequestClose={handleEditModalClose}
//         user={user}
//       />
//     </Modal>
//   );
// };

// export default UserModal;
