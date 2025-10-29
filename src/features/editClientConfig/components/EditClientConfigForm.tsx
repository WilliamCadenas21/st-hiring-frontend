import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ClientConfig } from "../../clientConfig/store/types";

const validationSchema = Yup.object().shape({
  clientId: Yup.number().required("Client ID is required"),
  deliveryMethods: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Name is required"),
      enum: Yup.string().required("Enum is required"),
      order: Yup.number().required("Order is required"),
      isDefault: Yup.boolean(),
      selected: Yup.boolean(),
    })
  ),
  fulfillmentFormat: Yup.object().shape({
    rfid: Yup.boolean(),
    print: Yup.boolean(),
  }),
  printer: Yup.object().shape({
    id: Yup.string().required("Printer ID is required"),
  }),
  printingFormat: Yup.object().shape({
    formatA: Yup.boolean(),
    formatB: Yup.boolean(),
  }),
  scanning: Yup.object().shape({
    scanManually: Yup.boolean(),
    scanWhenComplete: Yup.boolean(),
  }),
  paymentMethods: Yup.object().shape({
    cash: Yup.boolean(),
    creditCard: Yup.boolean(),
    comp: Yup.boolean(),
  }),
  ticketDisplay: Yup.object().shape({
    leftInAllotment: Yup.boolean(),
    soldOut: Yup.boolean(),
  }),
  customerInfo: Yup.object().shape({
    active: Yup.boolean(),
    basicInfo: Yup.boolean(),
    addressInfo: Yup.boolean(),
  }),
});

interface EditClientConfigFormProps {
  initialValues: ClientConfig;
  onSubmit: (values: ClientConfig) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const EditClientConfigForm: React.FC<EditClientConfigFormProps> = ({
  initialValues,
  onSubmit,
  isLoading = false,
  error = null,
}) => {
  const renderCheckboxGroup = (
    title: string,
    fields: { name: string; label: string }[],
    baseFieldPath: string
  ) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {fields.map(({ name, label }) => (
          <Grid size={4} key={name}>
            <Field name={`${baseFieldPath}.${name}`}>
              {({ field }: any) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label={label}
                />
              )}
            </Field>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await onSubmit(values);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, isSubmitting }) => (
        <Form>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Edit Client Configuration
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid size={12}>
                <Field name="clientId">
                  {({ field, meta }: any) => (
                    <TextField
                      {...field}
                      label="Client ID"
                      variant="outlined"
                      fullWidth
                      disabled
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                {renderCheckboxGroup(
                  "Fulfillment Format",
                  [
                    { name: "rfid", label: "RFID" },
                    { name: "print", label: "Print" },
                  ],
                  "fulfillmentFormat"
                )}
              </Grid>

              <Grid size={12}>
                <Field name="printer.id">
                  {({ field, meta }: any) => (
                    <TextField
                      {...field}
                      label="Printer ID"
                      variant="outlined"
                      fullWidth
                      error={meta.touched && meta.error}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                {renderCheckboxGroup(
                  "Printing Format",
                  [
                    { name: "formatA", label: "Format A" },
                    { name: "formatB", label: "Format B" },
                  ],
                  "printingFormat"
                )}
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                {renderCheckboxGroup(
                  "Scanning Options",
                  [
                    { name: "scanManually", label: "Scan Manually" },
                    { name: "scanWhenComplete", label: "Scan When Complete" },
                  ],
                  "scanning"
                )}
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                {renderCheckboxGroup(
                  "Payment Methods",
                  [
                    { name: "cash", label: "Cash" },
                    { name: "creditCard", label: "Credit Card" },
                    { name: "comp", label: "Comp" },
                  ],
                  "paymentMethods"
                )}
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                {renderCheckboxGroup(
                  "Ticket Display",
                  [
                    { name: "leftInAllotment", label: "Left in Allotment" },
                    { name: "soldOut", label: "Sold Out" },
                  ],
                  "ticketDisplay"
                )}
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                {renderCheckboxGroup(
                  "Customer Info",
                  [
                    { name: "active", label: "Active" },
                    { name: "basicInfo", label: "Basic Info" },
                    { name: "addressInfo", label: "Address Info" },
                  ],
                  "customerInfo"
                )}
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || isLoading}
                sx={{ minWidth: 150 }}
              >
                {isSubmitting || isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Box>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default EditClientConfigForm;
