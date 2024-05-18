import axios from "axios";
import { useEffect, useState } from "react";
import NavMainpage from "../Mainpage/Nav-Mainpage";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not authenticated");
        }
        const response = await axios.get("http://localhost:3000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("User data response:", response.data);
        setUserData(response.data);
        setUsername(response.data.User_Name);
        setEmail(response.data.Email);
        setAddress(response.data.Address || "");

        const postsResponse = await axios.get("http://localhost:3000/rehome", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("Posts data response:", postsResponse.data);
        const userId = response.data._id;
        // console.log("User ID:", userId);

        const userPosts = postsResponse.data.filter(
          (post) => post.userId === userId
        );
        // console.log("User Posts:", userPosts);
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
        "http://localhost:3000/users",
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

  const dummyPosts = [
    { id: 1, title: "Post 1", content: "Content of Post 1" },
    { id: 2, title: "Post 2", content: "Content of Post 2" },
    { id: 3, title: "Post 3", content: "Content of Post 3" },
  ];

  return (
    <>
      <NavMainpage />
      <div className="container mx-auto px-4 py-8 ">
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
              {userPosts.map((post) => (
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
                    <h3 className="text-lg font-semibold mb-2">{post.name}</h3>
                    <p className="text-sm text-gray-600">{post.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
