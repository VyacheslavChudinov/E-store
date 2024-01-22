import { Box, Typography } from "@mui/material";

export default function About() {
  const titleStyles = {
    display: "flex",
    justifyContent: "center",
    sx: { mb: "50px", mt: "50px" },
  };

  return (
    <Box>
      <Typography variant="h3" {...titleStyles}>
        Welcome to E-Store!
      </Typography>
      <Typography variant="h5">
        At E-Store, we're not just retailers; we're riders, dreamers, and
        creators just like you. Born in the heart of the mountains, our journey
        began with a simple passion: to bring the highest quality snowboarding
        gear and apparel to those who share an undying love for snowboarding.
      </Typography>

      <Typography variant="h3" {...titleStyles}>
        Our Mission
      </Typography>
      <Typography variant="h5">
        Our mission is simple yet profound: to empower every snowboarder to push
        their limits and experience the ultimate thrill that snowboarding has to
        offer. Whether you're carving the slopes for the first time or you're a
        seasoned pro chasing the next big thrill, we're here to equip you with
        top-tier snowboards and gear that make every moment unforgettable.
      </Typography>
    </Box>
  );
}
