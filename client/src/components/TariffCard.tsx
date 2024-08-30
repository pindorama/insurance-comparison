import React from "react";
import { Tariff } from "../types/Tariff";
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

interface TariffCardProps {
  tariff: Tariff;
}

const TariffCard: React.FC<TariffCardProps> = ({ tariff }) => {
  const { t } = useTranslation();
  const {
    gesellschaft,
    tarifname,
    deckungssumme,
    jahresbeitrag,
    erfuellungsgrad,
  } = tariff.attributes;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {tarifname}
        </Typography>
        <Divider style={{ marginBottom: "10px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>{t("gesellschaft")}:</strong> {gesellschaft}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>{t("deckungssumme")}:</strong>{" "}
              {deckungssumme.toLocaleString()} €
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>{t("jahresbeitrag")}:</strong> {jahresbeitrag} €
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>{t("erfuellungsgrad")}:</strong> {erfuellungsgrad}%
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TariffCard;
