import NavMainpage from "../Mainpage/Nav-Mainpage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { URL } from "../Constant/api";
function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }
        const response = await axios.get(`${URL}/users`, {
n
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User data response:", response.data);
        setUserData(response.data);
        setUsername(response.data.User_Name);
        setEmail(response.data.Email);
        setAddress(response.data.Address || "");

        const postsResponse = await axios.get(`${URL}/rehome`, {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userId = response.data._id;
        const userPosts = postsResponse.data.filter(
          (post) => post.userId === userId
        );
        setUserPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const updatedUserData = {
        User_Name: username,
        Email: email,
        Address: address,
      };

      if (address !== userData.Address) {
        updatedUserData.Address = address;
      }

      const response = await axios.put(
        `${URL}/users`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data);
      setEditMode(false);
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const openModal = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPostToDelete(null);
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      await axios.delete(`${URL}/rehome/${postToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          userId: userData._id,
        },
      });

      setUserPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postToDelete)
      );
      closeModal();
      console.log("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      closeModal();
    }
  };

  return (
    <>
      <NavMainpage />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-blue-200 shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">User Profile</h2>
              <p className="text-gray-500">Welcome to your profile</p>
            </div>
            <div className="flex items-center">
              {editMode && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
                  onClick={handleSaveProfile}
                >
                  Save
                </button>
              )}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
                onClick={toggleEditMode}
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          {userData && (
            <>
              <div className="flex items-center mb-4">
                <img
                  src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
                  alt="Profile"
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">
                    {editMode ? (
                      <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      />
                    ) : (
                      userData.User_Name
                    )}
                  </h3>
                  <p>
                    {editMode ? (
                      <input
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      />
                    ) : (
                      userData.Email
                    )}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Address</h3>
                {editMode ? (
                  <textarea
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Add your address"
                    className="border border-gray-300 rounded-md px-2 py-1 w-full"
                    rows="3"
                  ></textarea>
                ) : (
                  <p>{address || "Add your address"}</p>
                )}
              </div>
            </>
          )}
          <div className="py-3">
            <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
            <div className="grid grid-cols-3 gap-4">
              {userPosts.length === 0 ? (
                <div className="col-span-3 flex items-center justify-center h-full">
                  <p className="text-lg text-gray-600">No posts found.</p>
                </div>
              ) : (
                userPosts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                    style={{ maxWidth: "300px" }}
                  >
                    <img
                      src={post.image}
                      alt={post.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {post.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {post.description}
                      </p>
                    </div>
                    <div className="p-4 flex justify-end">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => openModal(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
