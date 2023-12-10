import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function ErrorsPage() {
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors testing page
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => agent.ApiErrors.get400Error()}
        >
          Test 400 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.ApiErrors.get401Error()}
        >
          Test 401 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.ApiErrors.get404Error()}
        >
          Test 404 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.ApiErrors.get500Error()}
        >
          Test 500 error
        </Button>
        <Button
          variant="contained"
          onClick={() => agent.ApiErrors.getValidationError()}
        >
          Test validation error
        </Button>
      </ButtonGroup>
    </Container>
  );
}
