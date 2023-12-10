import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function Errors() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationErrors() {
    agent.ApiErrors.getValidationError().catch((errors) =>
      setValidationErrors(errors)
    );
  }

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
        <Button variant="contained" onClick={getValidationErrors}>
          Test validation error
        </Button>
      </ButtonGroup>

      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((validationError) => (
              <ListItem key={validationError}>
                <ListItemText>{validationError}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
