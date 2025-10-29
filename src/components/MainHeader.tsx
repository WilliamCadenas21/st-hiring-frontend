import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const MainHeader: React.FC = () => {
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Client Configuration
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              bgcolor:
                location.pathname === "/" ? "primary.dark" : "transparent",
            }}
          >
            View Config
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/edit"
            sx={{
              textDecoration: "none",
              bgcolor:
                location.pathname === "/edit" ? "primary.dark" : "transparent",
            }}
          >
            Edit Config
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainHeader;
