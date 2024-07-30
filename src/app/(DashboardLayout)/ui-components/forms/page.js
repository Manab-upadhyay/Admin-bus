'use client';
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import BusDetails from "../buttons/page";
import Modal from "../buttons/Modal";

const Updatebus = () => {
  const [details, setDetails] = useState({
    busId: '',
    destination: '',
    starting: '',
    via: [],
    timing: '',
  });
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleBusIdChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setDetails({ ...details, busId: value });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!details.busId || !details.destination || !details.starting || !details.via.length || !details.timing) {
      setError('All fields are required');
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    try {
      const data = {
        busId: `S-${details.busId}`,
        destination: details.destination,
        starting: details.starting,
        via: details.via,
        timing: details.timing,
      };
      const res = await fetch('http://localhost:6969/api/bus/update', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });
      const result = await res.json();
      console.log(result);
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
      <form className="max-w-md mx-auto">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Update Bus
          </span>
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}

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
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            onChange={(e) => setDetails({ ...details, via: e.target.value.split(',') })}
            value={details.via.join(',')}
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

        <div className="relative z-0 w-full mb-10 group">
          <input
            type="text"
            name="timing"
            id="timing"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            onChange={(e) => setDetails({ ...details, timing: e.target.value })}
            value={details.timing}
            placeholder=" "
            required
          />
          <label
            htmlFor="timing"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Timing
          </label>
        </div>

        <div className="flex justify-center items-center mt-6">
          <button
            type="submit"
            onClick={handleClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <button
            className="relative inline-flex items-center justify-center p-0.5 ml-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            onClick={back}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <IoIosArrowRoundBack className="inline-block w-5 h-5" />
            </span>
          </button>
        </div>
      </form>
      <Modal show={showModal} handleClose={handleClose} handleConfirm={handleConfirm}>
        <h2 className="text-xl font-bold mb-4">Confirm Update Bus</h2>
        <p>Are you sure you want to update  this bus?</p>
      </Modal>
    </>
  );
};

export default Updatebus;
