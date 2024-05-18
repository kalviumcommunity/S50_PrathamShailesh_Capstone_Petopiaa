import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import { FilePicker } from "evergreen-ui";
import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

function Rehome() {
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    image: "",
    price: "",
    description: "",
  });


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const speciesOptions = ["Dog", "Cat", "Bird", "Rabbit"];
  const breedOptions = {
    Dog: [
      "German Shepherd",
      "Labrador Retriever",
      "Golden Retriever",
      "Poodle",
    ],
    Cat: ["Persian", "Siamese", "Maine Coon", "Bengal"],
    Bird: ["Parrot", "Canary", "Cockatiel", "Lovebird"],
    Rabbit: ["Holland Lop", "Netherland Dwarf", "Mini Rex", "Lionhead"],
  };
  const genderOptions = ["Male", "Female"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const decodedToken = parseJwt(token);
      const userId = decodedToken.userId;

      const formDataWithUserId = {
        ...formData,
        userId: userId,
      };

      const response = await axios.post(
        "http://localhost:3000/rehome",
        formDataWithUserId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      navigate("/MainPage");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const handleImageChange = (files) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setFormData({
        ...formData,
        image: e.target.result,
      });
    };

    reader.readAsDataURL(files[0]);
  };
  console.log(formData);

  return (
    <div className="sm:col-span-2 bg-gray-100 h-screen flex">
    <div className="sm:w-1/3 hidden sm:flex sm:bg-blue-300 sm:justify-center sm:items-center">
      <h1 className="logo text-5xl font-bold">
        <span className="text-pink-600">P</span>ETOPIA
      </h1>
    </div>
    <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto p-8">
      <h1 className="text-center text-3xl">Rehome Your Pet Form</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8">
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name of the Pet"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4 relative z-20">
            <Listbox
              value={formData.species}
              onChange={(value) => setFormData({ ...formData, species: value })}
              required
            >
              <div className="relative mt-1">
                <Listbox.Button
                  className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                  required
                >
                  <span className="block truncate">
                    {formData.species ? formData.species : "Select Species"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-20">
                    {speciesOptions.map((species, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={species}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {species}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="mb-4 relative z-10">
            <Listbox
              value={formData.breed}
              onChange={(value) => setFormData({ ...formData, breed: value })}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {formData.breed ? formData.breed : "Select Breed"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-10">
                    {formData.species &&
                      breedOptions[formData.species].map((breed, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={breed}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {breed}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="mb-4">
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Age of the Pet"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="10"
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <Listbox
              value={formData.gender}
              onChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">
                    {formData.gender ? formData.gender : "Select Gender"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {genderOptions.map((gender, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={gender}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {gender}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="color"
              name="color"
              placeholder="Color"
              value={formData.color}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <FilePicker
              multiple
              width={300}
              onChange={(files) => {
                console.log(files);
                handleImageChange(files);
              }}
              placeholder="Add pet image"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price in INR"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        </div>
      </div>{" "}
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 opacity-75 flex items-center justify-center">
          <div className="spinner-border text-white" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rehome;