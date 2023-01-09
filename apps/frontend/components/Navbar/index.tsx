import {
  AppBar,
  Box,
  Typography,
  Container,
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ClickAwayListener,
} from "@mui/material";
import { useRef, useState } from "react";

export default function Navbar() {
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return (
    <AppBar color="primary" style={{ paddingBlock: 15 }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        maxWidth="xl"
      >
        <Typography
          component="a"
          href="/"
          sx={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "white",
            cursor: "pointer",
          }}
          variant="h5"
          fontWeight="bold"
        >
          Conduit
        </Typography>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: 2,
            height: "100%",
          }}
        >
          <Typography
            component="a"
            href="/article/new"
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            New Article
          </Typography>
          <Typography
            component="a"
            href="/settings"
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            Settings
          </Typography>
          <Box>
            <Tooltip title="Profile" sx={{ cursor: "pointer" }}>
              <Avatar
                component="a"
                href="/profile"
                src="https://randomuser.me/api/portraits/men/54.jpg"
              />
            </Tooltip>
          </Box>
        </Box>
        <Box sx={{ display: { sm: "none" } }}>
          <Tooltip title="Profile">
            <IconButton onClick={() => setOpenMenu((open) => !open)}>
              <Avatar
                ref={avatarRef}
                sx={{ cursor: "pointer" }}
                src="https://randomuser.me/api/portraits/men/54.jpg"
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ marginTop: 1, display: { sm: "none" } }}
            anchorEl={avatarRef.current}
            open={openMenu}
            onClose={() => setOpenMenu(false)}
          >
            <MenuItem>New Article</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Profile</MenuItem>
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
}
