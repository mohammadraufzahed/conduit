import { Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Container
      component="footer"
      maxWidth={false}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBlock: 1,
        background: (theme) => theme.palette.primary.main,
      }}
    >
      <Typography variant="h6" color="white" fontSize={12} fontWeight="bold">
        Made with love by Mohammad Raufzahed
      </Typography>
    </Container>
  );
};

export default Footer;
