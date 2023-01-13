import { Avatar, Box, Typography } from "@mui/material";

export default function PostBox() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        paddingBlock: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar src="https://randomuser.me/api/portraits/men/54.jpg" />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <Typography
            component="span"
            variant="h6"
            fontWeight="normal"
            fontSize={12}
            color={(theme) => theme.palette.text.primary}
          >
            Mohammad Raufzahed
          </Typography>
          <Typography
            component="span"
            variant="caption"
            fontSize={10}
            color={(theme) => theme.palette.grey[700]}
          >
            December 9, 2022
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{ textDecoration: "none" }}
          color={(theme) => theme.palette.text.primary}
          variant="h5"
          fontWeight="bold"
          component="a"
          href="/article/mohammad"
        >
          Try to transmit the HTTP card, maybe it will override the multi-byte
          hard drive!
        </Typography>
      </Box>
      <Box>
        <Typography
          color={(theme) => theme.palette.text.primary}
          variant="body2"
          sx={{ maxWidth: 1440 }}
        >
          Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut
          cupiditate est facere omnis possimus. Tenetur similique nemo illo
          soluta molestias facere quo. Ipsam totam facilis delectus nihil quidem
          soluta vel est omnis.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          component="a"
          variant="button"
          href="/article/mohammad"
          sx={{
            fontWeight: "lighter",
            textDecoration: "none",
            fontSize: 10,
            ":hover": (theme) => ({
              color: theme.palette.primary.main,
            }),
            color: (theme) => theme.palette.text.primary,
          }}
        >
          Read more...
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => (
            <Typography
              key={a}
              component="a"
              href="/tag/s"
              variant="caption"
              sx={{
                color: (theme) => theme.palette.text.primary,
                textDecoration: "none",
                border: 1,
                borderColor: (theme) => theme.palette.text.secondary,
                paddingBlock: 0.2,
                paddingInline: 0.4,
                borderRadius: 2,
                ":hover": (theme) => ({
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                }),
              }}
            >
              #tag
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
