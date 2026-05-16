import { Container, Typography, Box, Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHistory } from "../context/HistoryContext";
import HistoryList from "../components/HistoryList";

export default function History() {
  const { history, clearHistory } = useHistory();

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Conversion History
        </Typography>
        {history.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={clearHistory}
          >
            Clear all
          </Button>
        )}
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {history.length} conversion{history.length !== 1 ? "s" : ""} total
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <HistoryList entries={history} />
    </Container>
  );
}