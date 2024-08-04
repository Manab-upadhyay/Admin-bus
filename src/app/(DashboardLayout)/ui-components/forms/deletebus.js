import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import BusDetails from "../buttons/page";
import Modal from "../buttons/modal";
import AutocompleteInput from "../buttons/autocom"; // Import the AutocompleteInput component
import TimePicker from 'react-time-picker';
import moment from 'moment';

export default function Deletebus() {
  const [delbusid, setDelbusid] = useState("");
  const [timing, setTiming] = useState("");
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [busIdSuggestions, setBusIdSuggestions] = useState([]);
  const [time, setTime] = useState("");

  const fetchSuggestions = (query) => {
    const suggestions = ["S-1", "S-2", "S-3", "S-4", "S-5", "S-6", "S-7", "S-8", "S-9", "S-10", "S-11", "S-12", "S-13", "S-14", "S-15", "S-16", "S-17", "S-18", "S-19"];
    return suggestions.filter(suggestion => 
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSuggestionsFetchRequested = (value) => {
    const suggestions = fetchSuggestions(value);
    setBusIdSuggestions(suggestions);
  };

  const handleSuggestionsClearRequested = () => {
    setBusIdSuggestions([]);
  };

  const handleBusIdChange = (e, value) => {
    setDelbusid(value);
  };

  const handleTimeChange = (value) => {
    const formattedTime = moment(value, 'HH:mm').format('hh:mm a').toUpperCase();
    setTiming(formattedTime);
    setTime(value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (!delbusid || !timing) {
      setError("All fields are required");
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    try {
      const data = { busId: delbusid, timing: timing };
      const res = await fetch("http://localhost:6969/api/delete", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await res.json();
      if(result.message === "success") {
        console.log(result);
        setClicked(true);
      } else if(result.message === "no bus found") {
        setError(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const back = () => {
    setClicked(true);
  };

  if (clicked) {
    return <BusDetails />;
  }

  return (
    <>
      <h3 className="mb-4 text-1xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Delete Bus
        </span>
      </h3>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="bus-id"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Bus ID
          </label>
          <AutocompleteInput
            suggestions={busIdSuggestions}
            value={delbusid}
            onChange={handleBusIdChange}
            onSuggestionsFetchRequested={(value) => handleSuggestionsFetchRequested(value)}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
         
          />
        </div>

        <div className="relative z-0 w-full mb-10 group">
          <label
            htmlFor="timing"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Time
          </label>
          <TimePicker
            onChange={handleTimeChange}
            value={time}
            format="hh:mm a"
            className="my-10"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            onClick={handleDelete}
            className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            className="relative inline-flex items-center justify-start px-3 py-2 overflow-hidden font-medium transition-all bg-blue-600 rounded-lg group mx-2"
            onClick={back}
          >
            <IoIosArrowRoundBack className="w-6 h-6 text-white" />
            <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white ml-2">
              Back
            </span>
          </button>
        </div>
      </form>
      <Modal show={showModal} handleClose={handleClose} handleConfirm={handleConfirm}>
        <h2 className="text-xl font-bold mb-4">Confirm Delete Bus</h2>
        <p>Are you sure you want to delete this bus?</p>
      </Modal>
    </>
  );
}
