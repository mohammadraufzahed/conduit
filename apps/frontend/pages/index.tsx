import { Box, Container, Tab, Tabs } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import jwt from "../atoms/jwt";
import profile from "../atoms/profile";
import PostBox from "../components/PostBox";
import httpClient from "../libs/axios";
import { User } from "../types/user";

export default function Home() {
  const [activeFeed, setActiveFeed] = useState<"global" | "personal">("global");
  const setUser = useSetRecoilState(profile);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const jwtToken = useRecoilValue(jwt);
  const userQuery = useQuery(
    ["profile"],
    () => httpClient.get<User>("/users").then((res) => res.data),
    {
      enabled: loggedIn,
    }
  );
  useEffect(() => {
    if (userQuery.data) setUser(userQuery.data);
  }, [userQuery.data]);
  useEffect(() => {
    if (jwtToken) setLoggedIn(true);
    else setLoggedIn(false);
  }, [jwtToken]);
  return (
    <>
      <Head>
        <title>Conduit | A place to write</title>
      </Head>
      <Container
        sx={{
          height: "86vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
        maxWidth="xl"
      >
        <Box sx={{ borderBottom: 1, borderBottomColor: "#0000001f" }}>
          <Tabs
            value={activeFeed}
            onChange={(e, v) => {
              setActiveFeed(v);
            }}
          >
            <Tab label="Personal Feeds" value="personal" />
            <Tab label="Global Feeds" value="global" />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <PostBox key={i} />
          ))}
        </Box>
      </Container>
    </>
  );
}
