import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import BusDetails from "../buttons/page";
import Modal from "../buttons/Modal";

export default function Deletebus() {
  const [delbusid, setdelbusid] = useState("");
  const [timing, settiming] = useState("");
  const [clicked, setclicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleBusIdChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setdelbusid(value);
    }
  };

  const handleTimeChange = (e) => {
    settiming(e.target.value);
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
      const data = { busId: `S-${delbusid}`, timing: timing };
      const res = await fetch("http://localhost:6969/api/delete", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
      });
      const result = await res.json();
      if(result.message=="success"){
        console.log(result);
        setclicked(true);
      }
     if(result.message=="no bus found"){
      setError(result.message)
     }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const back = () => {
    setclicked(true);
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
            Enter Bus id
          </label>
          <div className="flex items-center">
            <span className="text-sm text-gray-900 dark:text-white">S-</span>
            <input
              type="text"
              id="bus-id"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              onChange={handleBusIdChange}
              value={delbusid}
              required
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-10 group">
          <label
            htmlFor="timing"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter time
          </label>
          <input
            type="text"
            id="timing"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            onChange={handleTimeChange}
            value={timing}
            required
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
        <h2 className="text-xl font-bold mb-4">Confirm Add Bus</h2>
        <p>Are you sure you want to add this bus?</p>
      </Modal>
    </>
  );
}
