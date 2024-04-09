import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { Home } from "../common/home";
import { getUserLogin } from "./auth-service";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { IResolveParams, LoginSocialGoogle } from "reactjs-social-login";
import { Google } from "@mui/icons-material";

const Login = () => {
  const { t } = useTranslation();
  const [userData, setUserData] = useState<any>();
  const [mfaValue, setMfaValue] = useState<any>();
  const navigate = useNavigate();

  const { isLoading: isUpdateLoading, mutate: getLoginUser } = useMutation<
    any,
    Error
  >(
    async () => {
      if (userData) {
        return await getUserLogin(userData);
      }
    },
    {
      onSuccess: (res: any) => {
        console.log("updated successfully");
        navigate("/dashboard");
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  const handleMFA = () => {

  }

  useEffect(() => {
    if (userData) {
      getLoginUser();
    }
  }, [userData]);

  return (
    <Grid container spacing={2} style={{ height: "100vh" }}>
      <Grid item xs={8}>
        <Home />
      </Grid>
      <Grid item xs={4} spacing={2}>
        <Box height="15%">
          <Typography
            color={"#191970"}
            variant="h5"
            marginTop={5}
            fontWeight="bold"
            className="auth-welcome"
          >
            {t("User Login")}
          </Typography>
        </Box>
        <Box height="55%">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(data: any) => {
              setUserData(data);
              // getUserLogin(data);
            }}
          >
            {(formik: any) => (
              <form onSubmit={formik.handleSubmit}>
                <Grid>
                  <TextField
                    id="email"
                    name="email"
                    label="email"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    required
                    helperText={
                      formik.errors.email &&
                      formik.touched.email &&
                      formik.errors.email
                    }
                  />
                </Grid>
                <br />
                <Grid>
                  <TextField
                    id="password"
                    name="password"
                    label="password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    required
                    helperText={
                      formik.touched.password && !formik.values.password
                        ? "Password mandatory"
                        : ""
                    }
                  />
                  {formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password}
                </Grid>
                <br />
                <Grid>
                  <TextField
                    id="mfa"
                    name="mfa"
                    label="Multi factor auth code"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.mfa}
                    required
                    helperText={
                      formik.touched.mfa && !formik.values.mfa
                        ? "Enter the 6 digit MFA code"
                        : ""
                    }
                  />
                  {formik.errors.mfa &&
                    formik.touched.mfa &&
                    formik.errors.mfa}
                </Grid>
                <br />
                <Grid>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ backgroundColor: "#191970" }}
                    disabled={formik.isSubmitting}
                  >
                    Submit
                  </Button>
                  <NavLink to="/sign-up" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#191970" }}
                    >
                      Sign in
                    </Button>
                  </NavLink>
                  <NavLink
                    to="/forgot-password"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography color={"#191970"}>forgot password?</Typography>
                  </NavLink>
                  <Grid><Typography>OR</Typography></Grid>
                  <Grid>
                    <LoginSocialGoogle
                      client_id="1043116758259-0rjgl2irub8sempl72pl6t2fa766ftkq.apps.googleusercontent.com"
                      access_type="offline"
                      onResolve={({ provider, data }: IResolveParams) => {
                        console.log(provider, 'Provider');
                        console.log(data, "data")
                      }}
                      onReject={(err)=>{
                        console.log(err)
                      }}
                      >
                        Sign in with Google <Google></Google>
                      </LoginSocialGoogle>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
