import { Box, Button, Input, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import * as yup from "yup";
import jwt from "../../atoms/jwt";
import httpClient from "../../libs/axios";
import { useEffect } from "react";

export default function LoginPage() {
  const [jwtToken, setJwt] = useRecoilState(jwt);
  const router = useRouter();
  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    }),
    async onSubmit(props) {
      return await httpClient
        .post("/auth/login", { ...props })
        .then((res) => {
          toast("Logged in sucessfully", {
            position: "bottom-left",
            type: "success",
          });
          setJwt(res.data.access_token);
          router.push("/");
        })
        .catch((e) =>
          toast(e.response.data.message, {
            position: "bottom-left",
            type: "error",
          })
        );
    },
  });
  useEffect(() => {
    if (jwtToken) router.push("/");
  }, [jwtToken]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "87vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: 400,
          width: "90%",
          maxWidth: 400,
          background: (theme) => theme.palette.grey[100],
          borderRadius: 4,
          border: "1px solid",
          borderColor: (theme) => theme.palette.primary.main,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          fontSize={32}
          color={(theme) => theme.palette.text.primary}
        >
          Login
        </Typography>
        <Input
          value={form.values.username}
          onChange={({ currentTarget }) =>
            form.setFieldValue("username", currentTarget.value)
          }
          error={form.errors.username ? true : false}
          placeholder="Username"
          sx={{ width: "90%" }}
        />
        <Input
          value={form.values.password}
          onChange={({ currentTarget }) =>
            form.setFieldValue("password", currentTarget.value)
          }
          error={form.errors.password ? true : false}
          type="password"
          placeholder="Password"
          sx={{ width: "90%" }}
        />
        <Button
          disabled={!form.isValid}
          onClick={form.submitForm}
          variant="contained"
          sx={{ width: "90%" }}
        >
          Login
        </Button>
        <Typography
          component="a"
          href="/auth/register"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            textDecoration: "none",
          }}
        >
          Need an account?
        </Typography>
      </Box>
    </Box>
  );
}
