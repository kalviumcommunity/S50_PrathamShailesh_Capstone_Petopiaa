import { faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Tablist } from "evergreen-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Frame_1__4_-removebg-preview.png";

function NavMainpage() {
  const [showSetting, setSetting] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const tabs = ["Home", "Rehome a Pet", "About", "Contact"];

  const handleTabSelect = (index) => {
    setSelectedIndex(index);
    switch (index) {
      case 0:
        navigate("/MainPage");
        break;
      case 1:
        navigate("/Rehome");
        break;
      
      default:
        break;
    }
  };

  const rehome = () => {
    navigate("/Rehome");
  };

  const toggleSetting = () => {
    setSetting(!showSetting);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const profile = () => {
    navigate("/Profile");
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={logo} alt="" className="h-16 " />
            </div>
            <div className="flex items-center space-x-4 lg:space-x-10">
              <button className="lg:hidden" onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <Tablist
                marginBottom={0}
                className="hidden md:flex hidden x:flex"
              >
                {tabs.map((tab, index) => (
                  <Tab
                    key={tab}
                    isSelected={index === selectedIndex}
                    onSelect={() => handleTabSelect(index)}
                    fontSize={16}
                    margin={10}
                    className={
                      index === selectedIndex
                        ? "selected-tab"
                        : "unselected-tab"
                    }
                  >
                    {tab}
                  </Tab>
                ))}
              </Tablist>

              <div className="relative">
                <button
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={toggleSetting}
                  aria-label="Settings"
                >
                  <FontAwesomeIcon icon={faCog} />
                </button>
                {showSetting && (
                  <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-48">
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={profile}
                      >
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" onClick={profile}>
                <img
                  src="https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-social-media-user-vector-portrait-unknown-human-image-default-avatar-profile-flat-icon-184330869.jpg"
                  alt="Profile Picture"
                  className="h-8 w-8 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showMenu && (
        <div className="lg:hidden bg-white fixed inset-y-0 left-0 w-64 z-50 shadow-md">
          <div className="p-4">
            <a
              href="#"
              className="block text-gray-600 hover:text-gray-800 py-2"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-gray-800 py-2"
              onClick={rehome}
            >
              Rehome a Pet
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-gray-800 py-2"
            >
              About
            </a>
            <a
              href="#"
              className="block text-gray-600 hover:text-gray-800 py-2"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default NavMainpage;
