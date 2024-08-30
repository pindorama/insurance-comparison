import React from "react";
import TariffList from "./components/TariffList";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import "./i18n/i18n";

const App: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{t("title")}</Typography>
          <Button color="inherit" onClick={() => changeLanguage("de")}>
            DE
          </Button>
          <Button color="inherit" onClick={() => changeLanguage("en")}>
            EN
          </Button>
        </Toolbar>
      </AppBar>
      <TariffList />
    </>
  );
};

export default App;
