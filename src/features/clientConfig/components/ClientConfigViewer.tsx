import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchClientConfig } from "../store/clientConfigSlice";
import { ClientConfig } from "../store/types";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { Check, Close } from "@mui/icons-material";

const ClientConfigViewer: React.FC = () => {
  const [clientId, setClientId] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.clientConfig
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientId) {
      dispatch(fetchClientConfig(Number(clientId)));
    }
  };

  const BooleanIcon = ({ value }: { value: boolean }) =>
    value ? (
      <Check sx={{ color: "success.main" }} />
    ) : (
      <Close sx={{ color: "error.main" }} />
    );

  const renderSection = (title: string, content: React.ReactNode) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
        {title}
      </Typography>
      {content}
    </Box>
  );

  const renderDeliveryMethods = (methods: ClientConfig["deliveryMethods"]) => (
    <List>
      {methods.map((method) => (
        <ListItem
          key={method.enum}
          sx={{
            bgcolor: "background.paper",
            mb: 1,
            borderRadius: 1,
          }}
        >
          <ListItemText primary={method.name} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={method.selected ? "Selected" : "Not Selected"}
              color={method.selected ? "success" : "default"}
              size="small"
            />
            {method.isDefault && (
              <Chip label="Default" color="primary" size="small" />
            )}
          </Box>
        </ListItem>
      ))}
    </List>
  );

  const renderBooleanGroup = (items: { label: string; value: boolean }[]) => (
    <Grid container spacing={2}>
      {items.map(({ label, value }) => (
        <Grid size={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              p: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <BooleanIcon value={value} />
            <Typography>{label}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 3, mb: 3, display: "flex", gap: 2 }}
      >
        <TextField
          type="number"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          label="Client ID"
          variant="outlined"
          fullWidth
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ minWidth: 120 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Fetch Config"
          )}
        </Button>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {data && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Client Configuration (ID: {data.clientId})
          </Typography>

          {renderSection(
            "Delivery Methods",
            renderDeliveryMethods(data.deliveryMethods)
          )}

          {renderSection(
            "Fulfillment Format",
            renderBooleanGroup([
              { label: "RFID", value: data.fulfillmentFormat.rfid },
              { label: "Print", value: data.fulfillmentFormat.print },
            ])
          )}

          {renderSection(
            "Printer",
            <Typography variant="body1">
              Printer ID: {data.printer.id}
            </Typography>
          )}

          {renderSection(
            "Printing Format",
            renderBooleanGroup([
              { label: "Format A", value: data.printingFormat.formatA },
              { label: "Format B", value: data.printingFormat.formatB },
            ])
          )}

          {renderSection(
            "Scanning",
            renderBooleanGroup([
              { label: "Scan Manually", value: data.scanning.scanManually },
              {
                label: "Scan When Complete",
                value: data.scanning.scanWhenComplete,
              },
            ])
          )}

          {renderSection(
            "Payment Methods",
            renderBooleanGroup([
              { label: "Cash", value: data.paymentMethods.cash },
              { label: "Credit Card", value: data.paymentMethods.creditCard },
              { label: "Comp", value: data.paymentMethods.comp },
            ])
          )}

          {renderSection(
            "Ticket Display",
            renderBooleanGroup([
              {
                label: "Left in Allotment",
                value: data.ticketDisplay.leftInAllotment,
              },
              { label: "Sold Out", value: data.ticketDisplay.soldOut },
            ])
          )}

          {renderSection(
            "Customer Info",
            renderBooleanGroup([
              { label: "Active", value: data.customerInfo.active },
              { label: "Basic Info", value: data.customerInfo.basicInfo },
              { label: "Address Info", value: data.customerInfo.addressInfo },
            ])
          )}
        </Paper>
      )}
    </Box>
  );
};

export default ClientConfigViewer;
