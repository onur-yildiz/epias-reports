import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOutlined from "@mui/icons-material/LockOutlined";
import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { setUser } from "../store/authSlice";
import { useAppDispatch } from "../hooks";
import { useLazyRegister } from "../services/userService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useLazyRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const credentials = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
    } as RegisterCredentials;
    if (!credentials.email || !credentials.password || !credentials.name)
      return;

    try {
      const user = await register(credentials).unwrap();
      dispatch(setUser(user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={() => navigate("/login")}>
                Already have an account? Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
