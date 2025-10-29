import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import MainHeader from "./MainHeader";

const MainLayout: React.FC = () => {
  return (
    <>
      <MainHeader />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
