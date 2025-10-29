import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientConfigViewer from "./features/clientConfig/components/ClientConfigViewer";
import EditClientConfigPage from "./features/editClientConfig/pages/EditClientConfigPage";
import MainLayout from "./components/MainLayout";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ClientConfigViewer />} />
            <Route path="edit" element={<EditClientConfigPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
