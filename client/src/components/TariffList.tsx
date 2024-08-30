import React, { useState, useEffect } from "react";
import axios from "axios";
import TariffCard from "./TariffCard";
import { Tariff } from "../types/Tariff";
import {
  Grid,
  Container,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

// Helper function to remove duplicates based on id
const removeDuplicates = (tariffs: Tariff[]): Tariff[] => {
  const uniqueTariffs = tariffs.reduce((acc, current) => {
    const isDuplicate = acc.find((tariff) => tariff.id === current.id);
    if (!isDuplicate) {
      acc.push(current);
    }
    return acc;
  }, [] as Tariff[]);
  return uniqueTariffs;
};

const TariffList: React.FC = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  // Sorting and filtering states
  const [sortCriteria, setSortCriteria] = useState<string>("jahresbeitrag");
  const [filterCriteria, setFilterCriteria] = useState<string>("");

  const fetchTariffs = async () => {
    try {
      const response = await axios.get("/api/tarife");
      const newTariffs = response.data.data;

      // Remove duplicates and set unique tariffs
      const uniqueTariffs = removeDuplicates([...tariffs, ...newTariffs]);
      setTariffs(uniqueTariffs);
      setLoading(false); // Loading is complete
    } catch (err) {
      setError("Failed to fetch tariffs. Please try again later.");
      setLoading(false); // Stop loading when error occurs
    }
  };

  // Sort and Filter the tariffs based on selected criteria
  const getFilteredAndSortedTariffs = () => {
    let filteredTariffs = tariffs;

    // Apply filter
    if (filterCriteria) {
      filteredTariffs = filteredTariffs.filter((tariff) =>
        tariff.attributes.gesellschaft
          .toLowerCase()
          .includes(filterCriteria.toLowerCase())
      );
    }

    // Apply sorting
    if (sortCriteria === "jahresbeitrag") {
      filteredTariffs.sort(
        (a, b) => a.attributes.jahresbeitrag - b.attributes.jahresbeitrag
      );
    } else if (sortCriteria === "deckungssumme") {
      filteredTariffs.sort(
        (a, b) => a.attributes.deckungssumme - b.attributes.deckungssumme
      );
    }

    return filteredTariffs;
  };

  // Dynamically get the list of companies for the filter dropdown
  const availableCompanies = Array.from(
    new Set(tariffs.map((tariff) => tariff.attributes.gesellschaft))
  );

  // If the selected filterCriteria is no longer valid, reset it
  useEffect(() => {
    if (filterCriteria && !availableCompanies.includes(filterCriteria)) {
      setFilterCriteria("");
    }
  }, [availableCompanies, filterCriteria]);

  // Fetch tariffs once when the component loads and set a 5-second interval
  useEffect(() => {
    fetchTariffs();

    const interval = setInterval(fetchTariffs, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ textAlign: "center", marginTop: "20px" }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Box my={2}>
        {/* Header for Sorting and Filtering */}
        <Typography variant="h4" gutterBottom>
          {t("versicherungstarife")}
        </Typography>

        <FormControl
          variant="outlined"
          style={{ marginRight: "20px", minWidth: 200 }}
        >
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            label="Sort by"
          >
            <MenuItem value="jahresbeitrag">
              Annual Premium (Jahresbeitrag)
            </MenuItem>
            <MenuItem value="deckungssumme">
              Coverage Amount (Deckungssumme)
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel id="filter-label">Filter by Company</InputLabel>
          <Select
            labelId="filter-label"
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
            label="Filter by Company"
          >
            <MenuItem value="">All Companies</MenuItem>
            {/* Dynamically create filter options based on the available companies */}
            {availableCompanies.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2}>
        {getFilteredAndSortedTariffs().map((tariff) => (
          <Grid item xs={12} sm={6} md={4} key={tariff.id}>
            <TariffCard tariff={tariff} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TariffList;
