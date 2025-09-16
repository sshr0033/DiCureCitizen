import { useState } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";


import PrivacyImg from "../assets/privacy.jpg";
import RespectImg from "../assets/respect.jpg";
import DigitalLiteracy from "../assets/literacy.jpg";
import Contribution from "../assets/contribution.jpg";

const cards = [
  {
    id: 1,
    image: PrivacyImg,
    title: "Protect Your Privacy",
    text: "Do not overshare any of your private details. Before sharing any details online think — 'Would you share this in person?' Protecting yourself is one of the major aspects of digital citizenship.",
    details:
      "To be filled after discussion with mentor.",
  },
  {
    id: 2,
    image: RespectImg,
    title: "Respectful Communication",
    text: "Always be courteous to others online. Do not go in rage and spill out things that can affect the other person. Use emoticons to show your feelings.",
    details:
      "To be filled after discussion with mentor.",
    },
  {
    id: 3,
    image: DigitalLiteracy,
    title: "Digital Literacy",
    text: "Keep yourself updated with the latest digital tools and practices. This helps you stay safe and aware in an evolving online world.",
    details:
      "To be filled after discussion with mentor.",
     },
  {
    id: 4,
    image: Contribution,
    title: "Positive Contribution",
    text: "Be a positive digital citizen by contributing respectfully and constructively in online communities.",
    details:
      "To be filled after discussion with mentor.",  },
];

export default function Article() {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  return (
    <Box id="articles" component="section" sx={{ py: 15, textAlign: "center" }}>
      <Typography variant="h4" fontWeight={800} >
        Understanding Digital Citizenship: Stay safe online
      </Typography>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={2}
        slidesPerView={3}
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        style={{ padding: "40px 20px" }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <Card
              sx={{
                width: "90%",
                height: 420,
                mx: "auto",
                boxShadow: 4,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={card.image}
                alt={card.title}
                sx={{ width: "100%", height: 180, objectFit: "cover" }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.text}
                  </Typography>
                </Box>

                <Button
  variant="contained"
  onClick={() => handleOpen(card)}
  sx={{
    px: 6,
    py: 2,
    borderRadius: "50px",       
    bgcolor: "#eae8da",        
    fontWeight: 700,
    color: "black",
    fontSize: "1.1rem",         
    textTransform: "none",      
    "&:hover": { bgcolor: "#3a4a1c", color: "white" },
    width: "fit-content",       
    alignSelf: "center",
          
    mt: 2,
  }}
>
  Learn More
</Button>

              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

  

<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
  {selectedCard && (
    <>
      <DialogTitle sx={{ fontWeight: 700, position: "relative" }}>
        {selectedCard.title}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">{selectedCard.details}</Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
  <Button
    onClick={handleClose}
    variant="contained"
    sx={{
      px: 4,
      py: 1,
      borderRadius: "50px",
      bgcolor: "#4c5f26",
      fontWeight: 700,
      "&:hover": { bgcolor: "#3a4a1c", color: "white" },
    }}
  >
    Close
  </Button>
</DialogActions>

    </>
  )}
</Dialog>

    </Box>
  );
}
