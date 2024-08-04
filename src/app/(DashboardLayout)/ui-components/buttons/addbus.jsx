import { useEffect, useState } from "react";
import Busdetails from "./page";
import Modal from "./modal"; // Import the Modal component
import AutocompleteInput from "./autocom"; // Import the AutocompleteInput component
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css'; // Import TimePicker CSS
import 'react-clock/dist/Clock.css'; // Import Clock CSS for TimePicker
import { IoIosArrowRoundBack } from "react-icons/io";
import moment from 'moment';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


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
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [busIdSuggestions, setBusIdSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [startingSuggestions, setStartingSuggestions] = useState([]);
  const [viaSuggestions, setViaSuggestions] = useState([]);
  const [statusSuggestions, setStatusSuggestions] = useState([]);
  const [viaList, setViaList] = useState([]);

  useEffect(() => {
    console.log("Timing is:", details.time);
  }, [details.time]);

  const fetchSuggestions = (query, type) => {
    let suggestions = [];
    switch(type) {
      case 'busId':
        suggestions = ["S-1", "S-2", "S-3", "S-4", "S-5", "S-6", "S-7", "S-8", "S-9", "S-10", "S-11", "S-12", "S-13", "S-14", "S-15", "S-16", "S-17", "S-18", "S-19"];
        break;
      case 'starting':
        suggestions = ["SOT", "SC.block", "Gate", "Irongmara", "Silchar", "Hilakandi"];
        break;
      case 'destination':
        suggestions = ["SOT", "SC.block", "Gate", "Irongmara", "Silchar", "Hilakandi"];
        break;
      case 'via':
        suggestions = ["Amul point", "Gate", "Irongmara", "Silcoore", "Rangirkhari", "SC.block", "SOT"];
        break;
      case 'status':
        suggestions = ["Running", "Stopped"];
        break;
      default:
        suggestions = [];
    }
    return suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleChange = (e, value, field) => {
    setDetails({ ...details, [field]: value });
  };

  const handleSuggestionsFetchRequested = (value, setSuggestions, type) => {
    const suggestions = fetchSuggestions(value, type);
    setSuggestions(suggestions);
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (!details.busId || !details.destination || !details.starting || viaList.length === 0 || !details.time || !details.status) {
      setError('All fields are required.');
      return;
    }
    if(details.starting===details.destination){
      setError("Starting and destination cannot be same ")
    }
    else{
    setError('');
    setShowModal(true);
    }
  };

  const handleConfirm = async () => {
    try {
      const data = {
        busId: details.busId,
        destination: details.destination,
        starting: details.starting,
        via: viaList.join(', '),
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
      if (result.message === "Bus already exists") {
        setError(result.message);
        toast.error("bus exists")

      } else if (result.message === "successfully added") {
        setDetails({
          busId: '',
          destination: '',
          starting: '',
          via: '',
          time: '',
          status: ''
        });
        setViaList([]);
        setClicked(true);
       
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (clicked) {
    return <Busdetails />;
    toast.success("Bus added succesfully")
  }

  const back = () => {
    setClicked(true);
  };

  const handleViaChange = (e, value) => {
    setDetails({ ...details, via: value });
  };

  const handleAddVia = () => {
    if (details.via && !viaList.includes(details.via)) {
      setViaList([...viaList, details.via]);
      setDetails({ ...details, via: '' });
    }
  };

  const handleTimeChange = (value) => {
    let formattedTime = moment(value, 'HH:mm').format('hh:mm a');
    formattedTime = formattedTime.toUpperCase();
    console.log("Selected time:", formattedTime); // Log time in 12-hour format
    setDetails({ ...details, time: formattedTime });
  };

  return (
    <>
      <form className="max-w-md mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Add Bus</span>
        </h1>
        {error && (
          <p className="mb-4 text-red-500">{error}</p>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <AutocompleteInput
            suggestions={busIdSuggestions}
            value={details.busId}
            onChange={(e, value) => handleChange(e, value, 'busId')}
            onSuggestionsFetchRequested={(value) => handleSuggestionsFetchRequested(value, setBusIdSuggestions, 'busId')}
            onSuggestionsClearRequested={() => setBusIdSuggestions([])}
            placeholder="Bus Number"
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <AutocompleteInput
            suggestions={destinationSuggestions}
            value={details.destination}
            onChange={(e, value) => handleChange(e, value, 'destination')}
            onSuggestionsFetchRequested={(value) => handleSuggestionsFetchRequested(value, setDestinationSuggestions, 'destination')}
            onSuggestionsClearRequested={() => setDestinationSuggestions([])}
            placeholder="Destination"
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <AutocompleteInput
            suggestions={startingSuggestions}
            value={details.starting}
            onChange={(e, value) => handleChange(e, value, 'starting')}
            onSuggestionsFetchRequested={(value) => handleSuggestionsFetchRequested(value, setStartingSuggestions, 'starting')}
            onSuggestionsClearRequested={() => setStartingSuggestions([])}
            placeholder="Starting Point"
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <AutocompleteInput
            suggestions={viaSuggestions}
            value={details.via}
            onChange={handleViaChange}
            onSuggestionsFetchRequested={(value) => handleSuggestionsFetchRequested(value, setViaSuggestions, 'via')}
            onSuggestionsClearRequested={() => setViaSuggestions([])}
            placeholder="Via"
          />
          <button type="button" onClick={handleAddVia} className="mt-2 text-blue-500 hover:underline">Add Via Point</button>
          <div className="mt-2">
            {viaList.map((via, index) => (
              <div key={index} className="inline-block mr-2 p-1 bg-gray-200 rounded">
                {via}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Timing
          </label>
          <TimePicker
            onChange={handleTimeChange}
            value={details.time}
            format="hh:mm:a"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <AutocompleteInput
            suggestions={statusSuggestions}
            value={details.status}
            onChange={(e, value) => handleChange(e, value, 'status')}
            onSuggestionsFetchRequested={(value) => handleSuggestionsFetchRequested(value, setStatusSuggestions, 'status')}
            onSuggestionsClearRequested={() => setStatusSuggestions([])}
            placeholder="Status"
          />
        </div>
        <div className="flex justify-center space-x-5">
          <button
            onClick={back}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
          >
            <IoIosArrowRoundBack />
          </button>
          <button
            onClick={handleClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
      <Modal show={showModal} handleClose={handleClose} handleConfirm={handleConfirm}>
      
      <h2 className="text-lg font-bold">Confirm Details</h2>
        <p><strong>Bus ID:</strong> {details.busId}</p>
        <p><strong>Destination:</strong> {details.destination}</p>
        <p><strong>Starting Point:</strong> {details.starting}</p>
        <p><strong>Via:</strong> {viaList.join(', ')}</p>
        <p><strong>Status:</strong> {details.status}</p>
        <p><strong>Timing:</strong> {details.time}</p>
    </Modal>
    </>
  );
};

export default Addbus;
