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
import { agent } from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
  const [validationError, setValidationError] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((err) => setValidationError(err));
  }

  return (
    <Container>
      <Typography> TESTING PAGE</Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get400Error().catch((err) => console.log(err))
          }
        >
          BAD REQUEST - 400 TestError
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get401Error().catch((err) => console.log(err))
          }
        >
          Unauthorized access -401 TestError
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get404Error().catch((err) => console.log(err))
          }
        >
          NOT-FOUND-404 TestError
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get500Error().catch((err) => console.log(err))
          }
        >
          Test SERVER TestError
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Validation TestError
        </Button>
      </ButtonGroup>

      {validationError.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationError.map((err) => {
              return (
                <ListItem key={err}>
                  <ListItemText>{err}</ListItemText>
                </ListItem>
              );
            })}
          </List>
        </Alert>
      )}
    </Container>
  );
}
