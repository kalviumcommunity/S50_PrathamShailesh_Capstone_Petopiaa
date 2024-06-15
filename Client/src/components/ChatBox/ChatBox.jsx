import NavMainpage from "../Mainpage/Nav-Mainpage";
import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { FiSearch, FiSend } from "react-icons/fi";
import io from "socket.io-client";
import { useLocation } from "react-router-dom"; 

function ChatBox() {
  const innerDivRef = useRef(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState("");
  const [roomId, setRoomId] = useState("");
  const token = localStorage.getItem("token");

  const location = useLocation();
  const socket = useMemo(() => io("http://localhost:4000"), []);

  const scrollToBottom = useCallback(() => {
    if (innerDivRef.current) {
      innerDivRef.current.scrollTop = innerDivRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/chat",{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChatMessages();
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", async (newMessage) => {
      const existingMessage = conversations.some(
        (conv) =>
          conv.participants.includes(newMessage.senderId) &&
          conv.participants.includes(newMessage.receiverId) &&
          conv.messages.some((msg) => msg.timestamp === newMessage.timestamp)
      );

      if (!existingMessage) {
        setConversations((prevConversations) => {
          const updatedConversations = [...prevConversations];
          const conversationIndex = updatedConversations.findIndex(
            (conv) =>
              conv.participants.includes(newMessage.senderId) &&
              conv.participants.includes(newMessage.receiverId)
          );

          if (conversationIndex !== -1) {
            updatedConversations[conversationIndex].messages.push(newMessage);
          } else {
            updatedConversations.push({
              participants: [newMessage.senderId, newMessage.receiverId],
              messages: [newMessage],
            });
          }

          return updatedConversations;
        });

        scrollToBottom();
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, conversations, scrollToBottom]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        
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
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');

    if (userId) {
      handleChatSelect(userId);
    }
  }, [location.search, conversations]);

  const currentUser = user;

  const handleChatSelect = (chatId) => {
    const room = [currentUser, chatId].sort();
    const newRoom = room.join("-");
    socket.emit("joinRoom", newRoom);
    setRoomId(newRoom);
    setSelectedChat(chatId);
  };

  const sendMessage = async () => {
    if (selectedChat && message.trim() !== "") {
      const newMessage = {
        roomId: roomId,
        senderId: currentUser,
        receiverId: selectedChat,
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      const updatedConversations = conversations.map((conv) => {
        if (
          conv.participants.includes(selectedChat) &&
          conv.participants.includes(currentUser)
        ) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage], 
          };
        }
        return conv;
      });

      setConversations(updatedConversations);

      socket.emit("sendMessage", newMessage);

      try {
        await axios.put("http://localhost:3000/chat", {
          participants: [currentUser, selectedChat],
          messages: updatedConversations.find(
            (conv) =>
              conv.participants.includes(selectedChat) &&
              conv.participants.includes(currentUser)
          ).messages,
        }, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });
      } catch (error) {
        console.error("Error updating message in the database:", error);
      }
      setMessage("");
      scrollToBottom();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat, conversations, scrollToBottom]);

  const renderMessages = () => {
    if (selectedChat && currentUser) {
      const selectedConversation = conversations.find(
        (conv) =>
          conv.participants.includes(selectedChat) &&
          conv.participants.includes(currentUser)
      );

      if (selectedConversation && selectedConversation.messages) {
        return selectedConversation.messages.map((message, index) => {
          return (
            <div
              key={index}
              className={`flex ${
                message.senderId === currentUser
                  ? "justify-end"
                  : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-md rounded-lg px-4 py-2 ${
                  message.senderId === currentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } shadow-md`}
                style={{ wordWrap: "break-word" }}
              >
                {message.message}
              </div>
            </div>
          );
        });
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
        const userName = conv.participants.find(
          (participant) => participant !== currentUser
        );
        if (userName) {
          return (
            <div
              key={index}
              className={`p-4 border-b border-t border-blue-100 hover:bg-blue-400 cursor-pointer transition-colors duration-200 ${
                selectedChat === userName ? "bg-blue-200" : ""
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
        <div className="w-1/4 border-r bg-blue-100">
          <div className="p-4 flex justify-between items-center">
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
        <div className="flex-grow overflow-hidden bg-white flex flex-col relative">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {currentChatName}
            </h2>
          </div>
          <div
            className="overflow-hidden px-6"
            style={{ maxHeight: "calc(100vh - 320px)" }}
          >
            <div
              className="overflow-y-auto scrollbar-hide"
              style={{ maxHeight: "calc(100vh - 320px)" }}
              ref={innerDivRef}
            >
              <div className="pt-6">{renderMessages()}</div>
            </div>
          </div>

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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
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
