import { AppBar, Toolbar, Typography, Button, Switch } from "@mui/material";

interface Props {
  onChangeHandler: () => void;
  dark: boolean;
}

export default function Header({ onChangeHandler, dark }: Props) {
  return (
    <AppBar sx={{ mb: 4 }} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ReStore
        </Typography>
        <Switch checked={dark} onChange={onChangeHandler} color="secondary" />
        <Button size="large" color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
