import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

const navLinks = [
  { label: "Converter", to: "/" },
  { label: "History", to: "/history" },
  { label: "About", to: "/about" },
];

export default function Header() {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: "#1a1a2e", borderBottom: "1px solid #2d2d4e" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CurrencyExchangeIcon sx={{ color: "#00d4ff" }} />
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#fff", letterSpacing: 1 }}>
            Currency Exchange
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {navLinks.map(({ label, to }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              end
              sx={{
                color: "#aaa",
                fontWeight: 500,
                borderRadius: 2,
                "&.active": {
                  color: "#00d4ff",
                  bgcolor: "rgba(0,212,255,0.08)",
                },
                "&:hover": {
                  color: "#fff",
                  bgcolor: "rgba(255,255,255,0.06)",
                },
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}