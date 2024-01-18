import { Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography variant="h3" gutterBottom>
        Not found
      </Typography>
      <Button fullWidth component={Link} to={"/catalog"}>
        Go back to catalog
      </Button>
    </Container>
  );
}
