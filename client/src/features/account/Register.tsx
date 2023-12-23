import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import agent, { RegisterPayload } from "../../app/api/agent";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { REGEX_TEMPLATES } from "../../app/utils/regex";
import { toast } from "react-toastify";

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  function handleApiErrors(errors: string[]) {
    if (!errors) {
      return;
    }

    errors.forEach((error: string) => {
      if (error.toLowerCase().includes("password")) {
        setError("password", { message: error });
      } else if (error.toLowerCase().includes("email")) {
        setError("email", { message: error });
      } else if (error.toLowerCase().includes("username")) {
        setError("username", { message: error });
      }
    });
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "4",
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) =>
            agent.Account.register(data as RegisterPayload)
              .then(() => {
                toast.success("Registration successful!");
                navigate("/login");
              })
              .catch(handleApiErrors)
          )}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="User name"
            autoFocus
            autoComplete="given-name"
            {...register("username", { required: "User name is required" })}
            error={!!errors.username}
            helperText={errors?.username?.message as string}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: REGEX_TEMPLATES.EMAIL,
                message: "Not a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors?.email?.message as string}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: REGEX_TEMPLATES.PASSWORD,
                message: "Not a valid password",
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message as string}
          />

          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadingButton>
          <Grid container>
            <Grid item sx={{ mb: 4 }}>
              <Link to={"/login"}>{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
