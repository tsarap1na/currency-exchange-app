import { Container, Typography, Box, Paper, Divider } from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import HistoryIcon from "@mui/icons-material/History";
import PublicIcon from "@mui/icons-material/Public";

const features = [
  {
    icon: <CurrencyExchangeIcon sx={{ color: "#1976d2" }} />,
    title: "Real-time exchange rates",
    desc: "Rates are fetched live from the open-source currency API with support for 150+ currencies.",
  },
  {
    icon: <HistoryIcon sx={{ color: "#1976d2" }} />,
    title: "Conversion history",
    desc: "Every conversion you make is saved in your session so you can review past results.",
  },
  {
    icon: <PublicIcon sx={{ color: "#1976d2" }} />,
    title: "150+ currencies",
    desc: "From USD and EUR to exotic currencies - we've got them all covered.",
  },
];

export default function About() {
  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
        About Currency Exchange
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A simple, fast currency converter.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {features.map(({ icon, title, desc }) => (
          <Paper key={title} variant="outlined" sx={{ p: 3, borderRadius: 2, display: "flex", gap: 2 }}>
            <Box sx={{ mt: 0.3 }}>{icon}</Box>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
              <Typography variant="body2" color="text.secondary">{desc}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

    </Container>
  );
}