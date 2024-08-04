'use client'
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Button,
} from "@mui/material";
import BaseCard from "../../components/shared/DashboardCard";
import Addbus from "../buttons/addbus";
import Updatebus from "../forms/page";
import Deletebus from "../forms/deletebus";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BusDetails = () => {
  const [bus, setBus] = useState([]);
  const [addclicked, setaddClicked] = useState(false);
  const [upclicked, setupClicked] = useState(false);
  const [delclicked, setdelClicked] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:6969/api/buslist");
        const result = await res.json();
        setBus(result);
      } catch (error) {
        console.error("Error fetching bus data:", error);
      }
    }
    getData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Running":
        return "success.main"; // green
      case "Stopped":
      case "Cancelled":
        return "error.main"; // red
      default:
        return "default"; // default color
    }
  };

  const handleAddBusClick = () => {
    setaddClicked(true);
  };

  const handleUpdateBusClick = () => {
    setupClicked(true);
  };

  const handleDeleteBusClick = () => {
    setdelClicked(true);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log(value)
    setSearch(value);
    if (value === "") {
      setIsSearched(false);
      setFilteredBuses([]);
    } else {
      const filtered = bus.filter((b) =>
        b.busId.includes(value) ||
        b.starting.includes(value) ||
        b.destination.includes(value)
      );
      console.log("searched bus",filtered)
      setFilteredBuses(filtered);
      setIsSearched(true);
    }
  };

  if (addclicked) {
    return <Addbus />;
  }

  if (upclicked) {
    return <Updatebus />;
  }

  if (delclicked) {
    return <Deletebus />;
  }
  function handdleSubmit(e){
    e.preventDefault();

  }

  return (
    <BaseCard title="Bus List">
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
      <form className="max-w-lg mx-54" onSubmit={handdleSubmit}>
        <div className="flex relative">
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <button
            id="dropdown-button"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
            onClick={toggleDropdown}
          >
            All categories
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          {dropdownVisible && (
            <div id="dropdown" className="z-10 absolute top-full left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                <li>
                  <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    ID
                  </button>
                </li>
                <li>
                  <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Starting
                  </button>
                </li>
                <li>
                  <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    Destination
                  </button>
                </li>
                
              </ul>
            </div>
          )}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search busid, starting and destination"
              required
              onChange={handleSearchChange}
              value={search}
            />
            <button
            
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      <Button onClick={handleAddBusClick}>Add Bus</Button>
      <Button onClick={handleUpdateBusClick}>Update Bus</Button>
      <Button onClick={handleDeleteBusClick}>Delete</Button>

      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
          maxHeight: 500,
          overflowY: 'auto'
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Bus ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Starting
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Destination
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Via
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Start Time
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Fuel Consumption (L)
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(isSearched ? filteredBuses : bus).map((buses) => (
              <TableRow >
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {buses.busId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {buses.starting}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {buses.destination}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                  {buses?.via?.map((v, index) => (
            <React.Fragment key={index}>
              {v}
              {index < buses.via.length - 1 && ", "}
            </React.Fragment>
          ))}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: getStatusColor(buses.status),
                      color: "#fff",
                    }}
                    size="small"
                    label={buses.status}
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    {buses.timing}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={500} variant="h6">
                    {buses.fuelConsumption}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default BusDetails;
