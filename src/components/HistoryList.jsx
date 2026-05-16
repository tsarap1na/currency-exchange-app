import { Box, Typography, Paper, Chip } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";

export default function HistoryList({ entries }) {
  if (entries.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6, color: "#888" }}>
        <HistoryIcon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
        <Typography variant="body1">No conversions yet</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {entries.map((entry, index) => (
        <Paper
          key={index}
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#f8faff",
            borderColor: "#e0e8ff",
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {entry.amount} {entry.fromCurrency.toUpperCase()} ={" "}
              <span style={{ color: "#1976d2" }}>
                {entry.result} {entry.toCurrency.toUpperCase()}
              </span>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {entry.date}
            </Typography>
          </Box>
          <Chip
            label={`${entry.fromCurrency.toUpperCase()} → ${entry.toCurrency.toUpperCase()}`}
            size="small"
            sx={{ bgcolor: "#e3f0ff", color: "#1976d2", fontWeight: 600 }}
          />
        </Paper>
      ))}
    </Box>
  );
}