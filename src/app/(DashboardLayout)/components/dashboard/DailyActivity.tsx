import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import DashboardCard from "../shared/DashboardCard";

const activities = [
  {
    time: "08:00",
    color: "success.main",
    text: "Bus #102 started route",
  },
  {
    time: "08:15",
    color: "secondary.main",
    text: "Bus #104 maintenance check completed",
  },
  {
    time: "08:30",
    color: "primary.main",
    text: "Bus #110 delayed due to traffic",
  },
  {
    time: "08:45",
    color: "warning.main",
    text: "Bus #101 reached capacity",
  },
  {
    time: "09:00",
    color: "error.main",
    text: "Bus #103 breakdown reported",
  },
];

const BusTractionActivity = () => {
  return (
    <DashboardCard title="Bus Traction Activity">
      <Timeline
        sx={{
          p: 0,
        }}
      >
        {activities.map((activity) => (
          <TimelineItem key={activity.time}>
            <TimelineOppositeContent
              sx={{
                fontSize: "12px",
                fontWeight: "700",
                flex: "0",
              }}
            >
              {activity.time}
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
    </DashboardCard>
  );
};

export default BusTractionActivity;
