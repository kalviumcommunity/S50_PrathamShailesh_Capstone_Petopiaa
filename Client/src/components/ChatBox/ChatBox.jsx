import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiSend } from "react-icons/fi";
import io from "socket.io-client";
import NavMainpage from "../Mainpage/Nav-Mainpage";
import axios from "axios";

function ChatBox() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [select, setSelect] = useState(false);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([
    {
      _id: "617ef77a4a37d2f0b621ec9f",
      participants: ["Shailesh", "Pratham"],
      messages: [
        {
          _id: "617ef77a4a37d2f0b621ec9g",
          senderId: "Pratham",
          receiverId: "Shailesh",
          message: "Hey Bob, how's it going?",
          timestamp: "2024-04-24T11:00:00Z",
        },
        {
          _id: "617ef77a4a37d2f0b621ec9h",
          senderId: "Shailesh",
          receiverId: "Pratham",
          message: "Hey Alice, I'm good, thanks!",
          timestamp: "2024-04-24T11:01:00Z",
        },
      ],
    },
    {
      _id: "617ef77a4a37d2f0b621ec9i",
      participants: ["Shahbaz", "David"],
      messages: [
        {
          _id: "617ef77a4a37d2f0b621ec9j",
          senderId: "Shahbaz",
          receiverId: "David",
          message: "Hi David, how was your day?",
          timestamp: "2024-04-24T12:00:00Z",
        },
        {
          _id: "617ef77a4a37d2f0b621ec9k",
          senderId: "David",
          receiverId: "Shahbaz",
          message: "Hey Eva, it was pretty good, thanks for asking!",
          timestamp: "2024-04-24T12:01:00Z",
        },
      ],
    },
  ]);
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState("");

  const socket = useMemo(() => io("http://localhost:4000"), []);

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
        setUser(response.data.User_Name);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const currentUser = user;

  const handleChatSelect = (chatId) => {
    const room = [currentUser, chatId].sort();
    const newRoom = room.join('-');
    socket.emit("joinRoom", newRoom);
    setRoomId(newRoom);
    setSelectedChat(chatId);
  };

  const sendMessage = () => {
    if (selectedChat && message.trim() !== "") {
      const newMessage = {
        roomId: roomId,
        senderId: currentUser,
        receiverId: selectedChat,
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      const updatedConversations = [...conversations];

      const conversationIndex = updatedConversations.findIndex((conv) =>
        conv.participants.includes(selectedChat)
      );

      if (conversationIndex !== -1) {
        const updatedConversation = { ...updatedConversations[conversationIndex] };
        updatedConversation.messages.push(newMessage);
        updatedConversations[conversationIndex] = updatedConversation;
        setConversations(updatedConversations); // Corrected typo here
      }

      socket.emit("sendMessage", newMessage);
      console.log(conversations)

      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setConversations((prevConversations) => {
        const updatedConversations = [...prevConversations];
        const conversationIndex = updatedConversations.findIndex((conv) =>
          conv.participants.includes(newMessage.senderId)
        );
        if (conversationIndex !== -1) {
          updatedConversations[conversationIndex].messages.push(newMessage);
        }
        return updatedConversations;
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);

  const getUserName = (participants, userId) => {
    return participants.find((participant) => participant !== currentUser);
  };

  const renderMessages = () => {
    if (selectedChat) {
      const selectedConversation = conversations.find((conv) =>
        conv.participants.includes(selectedChat)
      );
      if (selectedConversation && selectedConversation.messages) {
        return selectedConversation.messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.senderId === currentUser ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-md rounded-lg px-4 py-2 ${
                message.senderId === currentUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } shadow-md`}
            >
              {message.message}
            </div>
          </div>
        ));
      }
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <div className="text-center">Select a chat to view messages</div>
      </div>
    );
  };

  const renderChats = () => {
    return conversations.map((conv, index) => {
      if (conv.participants.includes(currentUser)) {
        const userName = getUserName(conv.participants, selectedChat);
        if (userName) {
          return (
            <div
              key={index}
              className={`p-4 border-b hover:bg-gray-200 cursor-pointer transition-colors duration-200 ${
                selectedChat === userName ? "bg-gray-300" : ""
              }`}
              onClick={() => handleChatSelect(userName)}
            >
              <span className="text-gray-800">{userName}</span>
            </div>
          );
        }
      }
      return null;
    });
  };

  const currentChatName = selectedChat ? selectedChat : "Chat";

  return (
    <div className="overflow-hidden h-screen">
      <NavMainpage />
      <div className="flex bg-gray-100 h-full relative">
        <div className="w-1/4 border-r bg-white">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
            <div className="flex items-center">
              <TextField
                variant="outlined"
                placeholder="Search"
                size="small"
                InputProps={{
                  endAdornment: (
                    <Button variant="contained" color="primary" size="small">
                      <FiSearch size={20} />
                    </Button>
                  ),
                }}
              />
            </div>
          </div>
          <div className="overflow-y-auto">{renderChats()}</div>
        </div>
        <div className="flex-grow overflow-hidden px-4 bg-white flex flex-col relative pt-2">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {currentChatName}
            </h2>
          </div>
          <div className="overflow-y-auto flex-grow">{renderMessages()}</div>
          <div
            className="absolute bottom-12 left-0 right-0"
            style={{ marginBottom: "3rem" }}
          >
            <div className="p-4 bg-white rounded-lg shadow-md">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <TextField
                    variant="outlined"
                    placeholder="Type a message..."
                    fullWidth
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FiSend />}
                    onClick={sendMessage}
                  >
                    Send
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;