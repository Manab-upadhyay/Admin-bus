"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Badge,
} from "@mui/material";
import BaseCard from "../../components/shared/DashboardCard";
import Modal from "../buttons/modal";
import { MdDelete } from "react-icons/md";

const Report = () => {
  const [report, setReport] = useState([]);
  const [newReports, setNewReports] = useState(false);
  const [model, setModel] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:6969/api/reports");
        const result = await res.json();
        setReport(result);
        setNewReports(true); // Set new reports to true when new data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getData();
  }, []);

  const handleReportClick = () => {
    setNewReports(false); // Reset new reports status when the section is clicked
  };

  function handleClose() {
    setModel(false);
  }

  async function handleConfirm() {
    try {
      const res = await fetch("http://localhost:6969/api/delete/report", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });
      const result = await res.json();
      console.log(result);

      setModel(false);
      setReport(report.filter((rep) => rep._id !== id));
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  }

  function handleDelete(rid) {
    setId(rid);
    setModel(true);
  }

  return (
    <BaseCard
      title={
        <Badge color="secondary" variant="dot" invisible={!newReports}>
          App Reports
        </Badge>
      }
      onClick={handleReportClick}
    >
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
          maxHeight: 400, // Set a maximum height for the container
          overflowY: 'auto', // Enable vertical scrolling
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
                  Username
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Description
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report?.map((rep) => (
              <TableRow key={rep?._id}>
                <TableCell>
                  <div className="flex justify-start">
                    <MdDelete 
                      onClick={() => handleDelete(rep._id)}
                      className="my-1 cursor-pointer"
                    />
                    <Typography fontSize="15px" fontWeight={500}>
                      {rep?.name}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {rep?.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {rep?.description}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal show={model} handleClose={handleClose} handleConfirm={handleConfirm}>
        <p>Do you want to delete this report?</p>
      </Modal>
    </BaseCard>
  );
};

export default Report;
