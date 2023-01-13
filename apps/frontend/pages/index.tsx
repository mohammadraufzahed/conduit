import { TabPanelUnstyled } from "@mui/base";
import { Avatar, Box, Container, Tab, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import PostBox from "../components/PostBox";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [activeFeed, setActiveFeed] = useState<"global" | "personal">("global");
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
