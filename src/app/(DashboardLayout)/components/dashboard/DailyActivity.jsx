import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import DashboardCard from "../shared/DashboardCard";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const UserActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("http://localhost:6969/api/getUsers");
        const res1 = await fetch("http://localhost:6969/api/reports");
        const result = await res.json();
        const result1 = await res1.json();

        const filteredLogin = result
          .filter((log) => log.lastLogin)
          .map((log) => ({
            time: new Date(log.lastLogin).toLocaleTimeString(),
            date: new Date(log.lastLogin).toLocaleDateString(),
            timestamp: new Date(log.lastLogin),
            color: "success.main",
            text: "User logged in",
            category: "login",
          }));

        const filteredReports = result1.map((report) => ({
          time: new Date(report.date).toLocaleTimeString(),
          date: new Date(report.date).toLocaleDateString(),
          timestamp: new Date(report.date),
          color: "error.main",
          text: "User reported",
          category: "report",
        }));

        const combinedActivities = [...filteredLogin, ...filteredReports];

        // Sort combined activities by timestamp in descending order
        combinedActivities.sort((a, b) => b.timestamp - a.timestamp);

        setActivities(combinedActivities);
        console.log("Combined activities: ", combinedActivities);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getData();
  }, []);

  const categoriesCount = activities.reduce((acc, activity) => {
    const category = activity.category || "other"; // Default to "other" if no category exists
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoriesCount),
    datasets: [
      {
        label: "# of Activities",
        data: Object.values(categoriesCount),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardCard title="User Activity">
      <Timeline
        sx={{
          p: 0,
          maxHeight: 400, // Set a maximum height for the container
          overflowY: "auto",
        }}
      >
        {activities.map((activity, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                flex: "0",
              }}
            >
              {activity.date} {activity.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                variant="outlined"
                sx={{
                  borderColor: activity.color,
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              color="text.secondary"
              sx={{
                fontSize: "14px",
              }}
            >
              {activity.text}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <div>
        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
          User Activity Breakdown
        </h3>
        <Pie data={data} />
      </div>
    </DashboardCard>
  );
};

export default UserActivity;
