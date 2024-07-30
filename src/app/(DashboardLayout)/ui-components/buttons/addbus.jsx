'use client';

import { useState } from "react";
import Busdetails from "./page";
import Modal from "./Modal"; // Import the Modal component
import { IoIosArrowRoundBack } from "react-icons/io";

const Addbus = () => {
  const [details, setDetails] = useState({
    busId: '',
    destination: '',
    starting: '',
    via: '',
    time: '',
    status: ''
  });
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [error, setError] = useState(''); // State to manage error messages

  const handleBusIdChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setDetails({ ...details, busId: value });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
  
    if (!details.busId || !details.destination || !details.starting || !details.via || !details.time || !details.status) {
      setError('All fields are required.');
      return;
    }
    setError('');
    setShowModal(true); 
  };

  const handleConfirm = async () => {
   
    try {
      const data = {
        busId: `S-${details.busId}`,
        destination: details.destination,
        starting: details.starting,
        via: details.via,
        status: details.status,
        timing: details.time
      };
      console.log(data);
      const res = await fetch('http://localhost:6969/api/addBus', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      });
      const result = await res.json();
      if (result.message=="Bus alredy exists") {
        setError(result.message);
      } if(result.message=="successfully added") {
        setDetails({
          busId: '',
          destination: '',
          starting: '',
          via: '',
          timing: '',
          status: ''
        });
        setClicked(true);
      }
     
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    setShowModal(false); // Close the modal
  };

  const handleClose = () => {
    setShowModal(false); // Close the modal without confirming
  };

  if (clicked) {
    return <Busdetails />;
  }

  const back = () => {
    setClicked(true);
  };

  return (
    <>
      <form className="max-w-md mx-auto">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Add Bus</span>
        </h1>
        {error && (
          <p className="mb-4 text-red-500">{error}</p>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <div className="flex items-center">
            <span className="text-sm text-gray-900 dark:text-white">S-</span>
            <input
              type="text"
              name="busId"
              id="busId"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={handleBusIdChange}
              value={details.busId}
              placeholder=" "
              required
            />
          </div>
          <label
            htmlFor="busId"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Bus Number
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="destination"
            id="destination"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={(e) => setDetails({ ...details, destination: e.target.value })}
            value={details.destination}
            placeholder=" "
            required
          />
          <label
            htmlFor="destination"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Destination
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="starting"
            id="starting"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={(e) => setDetails({ ...details, starting: e.target.value })}
            value={details.starting}
            placeholder=" "
            required
          />
          <label
            htmlFor="starting"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Starting
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="via"
            id="via"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={(e) => setDetails({ ...details, via: e.target.value })}
            value={details.via}
            placeholder=" "
            required
          />
          <label
            htmlFor="via"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Via (comma separated)
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="status"
            id="status"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={(e) => setDetails({ ...details, status: e.target.value })}
            value={details.status}
            placeholder=" "
            required
          />
          <label
            htmlFor="status"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Status
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="time"
            id="time"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={(e) => setDetails({ ...details, time: e.target.value })}
            value={details.time}
            placeholder=" "
            required
          />
          <label
            htmlFor="time"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Time (24 hours)
          </label>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <button
            type="button"
            onClick={handleClick}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            type="button"
            onClick={back}
            className="mt-4 bg-gray-600 text-white px-4 py-2 rounded flex items-center"
          >
            <IoIosArrowRoundBack className="mr-1" />
            Back
          </button>
        </div>
      </form>

      <Modal show={showModal} handleClose={handleClose} handleConfirm={handleConfirm}>
        <h2 className="text-xl font-bold mb-4">Confirm Add Bus</h2>
        <p>Are you sure you want to add this bus?</p>
      </Modal>
    </>
  );
};

export default Addbus;
