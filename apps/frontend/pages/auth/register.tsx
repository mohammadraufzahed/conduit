import { Box, Button, Input, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";
import * as yup from "yup";
import httpClient from "../../libs/axios";
import jwt from "../../atoms/jwt";
import { useRecoilValue } from "recoil";

export default function RegisterPage() {
  const router = useRouter();
  const form = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is empty"),
      username: yup
        .string()
        .required("Username is empty")
        .min(5, "Username must be min 5 character")
        .max(20, "Username must be under 20 character"),
      email: yup
        .string()
        .email("Email is not valid")
        .required("Email is empty"),
      password: yup
        .string()
        .required("Password is empty")
        .min(8, "Password must be minimum 8 character"),
    }),
    async onSubmit(props) {
      return await httpClient
        .post("/users", {
          ...props,
        })
        .then(() => {
          toast("Registerd successfully", {
            position: "bottom-left",
            type: "success",
          });
          router.push("/auth/login");
        })
        .catch((e) => {
          toast(e.response.data.message, {
            position: "bottom-left",
            type: "error",
          });
        });
    },
  });
  const jwtToken = useRecoilValue(jwt);
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
          minHeight: 400,
          paddingBlock: 2,
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
          Register
        </Typography>
        <Input
          value={form.values.name}
          onChange={({ currentTarget }) =>
            form.setFieldValue("name", currentTarget.value)
          }
          error={form.errors.name ? true : false}
          placeholder="First Name"
          sx={{ width: "90%" }}
        />

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
          value={form.values.email}
          onChange={({ currentTarget }) =>
            form.setFieldValue("email", currentTarget.value)
          }
          error={form.errors.email ? true : false}
          type="email"
          placeholder="Email"
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
          variant="contained"
          sx={{ width: "90%" }}
          onClick={form.submitForm}
        >
          Register
        </Button>
        <Typography
          component="a"
          href="/auth/login"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            textDecoration: "none",
          }}
        >
          Already have a account?
        </Typography>
      </Box>
    </Box>
  );
}
