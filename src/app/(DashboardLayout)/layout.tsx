"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "@/app/(DashboardLayout)/layout/header/Header";
import Sidebar from "@/app/(DashboardLayout)/layout/sidebar/Sidebar";
import Footer from "./layout/footer/page";
import "../global.css";
import Admin from "../admin/page"; // Import correctly

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; 

  return (
    <MainWrapper className="mainwrapper">
      {token ? (
        <>
          {/* Sidebar */}
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          
          {/* Main Wrapper */}
          <PageWrapper className="page-wrapper">
            {/* Header */}
            <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
            
            {/* PageContent */}
            <Container
              sx={{
                paddingTop: "20px",
                maxWidth: "1200px",
              }}
            >
              {/* Page Route */}
              <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
              
              {/* Footer */}
              <Footer />
            </Container>
          </PageWrapper>
        </>
      ) : (
        <Admin /> // Render Admin component when token is not present
      )}
    </MainWrapper>
  );
}
