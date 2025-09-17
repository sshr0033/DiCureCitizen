import { useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { sectionStyles, cardStyles, buttonStyles } from "../styles";

import PrivacyImg from "../assets/privacy.jpg";
import RespectImg from "../assets/respect.jpg";
import DigitalLiteracy from "../assets/literacy.jpg";
import Contribution from "../assets/contribution.jpg";

const cards = [
  {
    id: 1,
    image: PrivacyImg,
    title: "Latest Scam 1",
    text: "Do not overshare any of your private details...",
    details: "Privacy is essential in the digital world...",
  },
  {
    id: 2,
    image: RespectImg,
    title: "Latest Scam 2",
    text: "Always be courteous to others online...",
    details: "Respect builds safe spaces online...",
  },
  {
    id: 3,
    image: DigitalLiteracy,
    title: "Latest Scam 3",
    text: "Keep yourself updated with the latest tools...",
    details: "Being digitally literate means...",
  },
  {
    id: 4,
    image: Contribution,
    title: "Latest Scam 4",
    text: "Be a positive digital citizen...",
    details: "Positive contributions foster collaboration...",
  },
];

export default function Article() {
  const [flippedCard, setFlippedCard] = useState(null);

  const handleFlip = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <Box id="learnCitizenship" component="section" sx={sectionStyles.articleSection}>
      <Typography variant="h4" fontWeight={800}>
        Get to know the latest trending scams around Australia <br /> & how to avoid them.
      </Typography>

      <Swiper
        modules={[Navigation]}
        navigation
        loop
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          600: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        style={{ padding: "40px 20px" }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <Box sx={cardStyles.container}>
              <Box sx={cardStyles.inner(flippedCard === card.id)}>
                <Card sx={cardStyles.front}>
                  <Box component="img" src={card.image} alt={card.title} sx={cardStyles.image} />
                  <CardContent sx={cardStyles.content}>
                    <Box>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.text}
                      </Typography>
                    </Box>
                    <Button variant="contained" onClick={() => handleFlip(card.id)} sx={buttonStyles.learnMore}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

              
                <Card sx={cardStyles.back}>
                  <CardContent sx={cardStyles.content}>
                    <Box>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.details}
                      </Typography>
                    </Box>
                    <Button variant="contained" onClick={() => handleFlip(card.id)} sx={buttonStyles.back}>
                      Back
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
