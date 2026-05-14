import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";

export default function App() {
  const [currencies, setCurrencies] = useState({});
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("eur");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currenciesLoading, setCurrenciesLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/currencies.json`);
        if (!response.ok) throw new Error("Failed to load currencies");
        const data = await response.json();
        setCurrencies(data);
      } catch (err) {
        setError("Could not load currency list. Please try again later.");
      } finally {
        setCurrenciesLoading(false);
      }
    };
    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(`${BASE_URL}/currencies/${fromCurrency}.min.json`);
      if (!response.ok) throw new Error("Failed to fetch exchange rates");
      const data = await response.json();
      const rate = data[fromCurrency][toCurrency];
      if (rate === undefined) throw new Error(`Exchange rate not available for ${toCurrency}`);
      setResult((amount * rate).toFixed(4));
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const currencyOptions = Object.entries(currencies).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ textAlign: "center", mb: 3 }}>
          I want to convert
        </Typography>

        {currenciesLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>

            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setResult(null);
              }}
              slotProps={{ htmlInput: { min: 0 } }}
              fullWidth
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>From</InputLabel>
                <Select
                  value={fromCurrency}
                  label="From"
                  onChange={(e) => {
                    setFromCurrency(e.target.value);
                    setResult(null);
                  }}
                >
                  {currencyOptions.map(([code, name]) => (
                    <MenuItem key={code} value={code}>
                      {code.toUpperCase()} — {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button 
                variant="outlined"
                onClick={handleSwap}
                sx={{ minWidth: 48, height: 56, px: 1 }}
              >
                <SwapHorizIcon />
              </Button>

              <FormControl fullWidth>
                <InputLabel>To</InputLabel>
                <Select
                  value={toCurrency}
                  label="To"
                  onChange={(e) => {
                    setToCurrency(e.target.value);
                    setResult(null);
                  }}
                >
                  {currencyOptions.map(([code, name]) => (
                    <MenuItem key={code} value={code}>
                      {code.toUpperCase()} — {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={handleConvert}
              disabled={loading || !amount || amount <= 0}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Convert"}
            </Button>

            {result !== null && (
              <Paper
                variant="outlined"
                sx={{ p: 3, textAlign: "center", borderRadius: 2, bgcolor: "#f0f7ff" }}
              >
                <Typography variant="h6" color="text.secondary">
                  {amount} {fromCurrency.toUpperCase()} =
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {result} {toCurrency.toUpperCase()}
                </Typography>
              </Paper>
            )}

            {error && <Alert severity="error">{error}</Alert>}
          </Box>
        )}
      </Paper>
    </Container>
  );
}