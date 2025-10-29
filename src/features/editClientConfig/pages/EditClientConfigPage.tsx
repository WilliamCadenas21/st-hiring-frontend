import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import EditClientConfigForm from "../components/EditClientConfigForm";
import { ClientConfig } from "../../clientConfig/store/types";
import NotificationSnackbar from "../../../components/NotificationSnackbar";
import { updateClientConfig } from "../../clientConfig/store/clientConfigThunks";

const EditClientConfigPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { data: currentConfig, error } = useSelector(
    (state: RootState) => state.clientConfig
  );
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (values: ClientConfig) => {
    try {
      await dispatch(updateClientConfig(values)).unwrap();
      setNotification({
        open: true,
        message: "Configuration updated successfully!",
        severity: "success",
      });
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setNotification({
        open: true,
        message: "Failed to update configuration",
        severity: "error",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  if (!currentConfig) {
    return (
      <Container>
        <Box sx={{ py: 4 }}>
          <Typography>
            Please load a client configuration first from the main page.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <EditClientConfigForm
          initialValues={currentConfig}
          onSubmit={handleSubmit}
          error={error}
        />
        <NotificationSnackbar
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={handleCloseNotification}
        />
      </Box>
    </Container>
  );
};

export default EditClientConfigPage;
