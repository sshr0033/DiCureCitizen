import { useState } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { sectionStyles, cardStyles, buttonStyles } from "../styles";


import FraudImg from "../assets/Realestate.png";
import PropertyImg from "../assets/shock.jpeg";
import BankImg from "../assets/cardscam.jpeg";
import AtoImg from "../assets/readdocu.jpeg";


const cards = [
  {
    id: 1,
    title: "Fraudulent Investments",
    image: FraudImg,
    text: "Beware of 'Too Good to be True' investments promising high returns...",
    details:
      "ABC News revealed Australians lost nearly $8M to GIM Trading, which promised safe bond investments but never invested the funds. A retired couple lost $750,000. ASIC described this as one of the most serious financial deceptions in recent years. Always verify on ASIC’s register and consult a licensed advisor.",
    source:
      "https://www.abc.net.au/news/2025-09-15/gim-trading-alleged-fraud-investors-bonds/105747410",
  },
  {
    id: 2,
    title: "Property Scams on the Rise",
    image: PropertyImg,
    text: "Hackers intercept property settlement emails and steal deposits...",
    details:
      "Realestate.com.au reported losses rising from $13M in 2021 to $43.2M in 2024, with scams still increasing. Scammers impersonate solicitors and request urgent deposits to fake accounts. A Sydney couple lost $970,000. Always confirm bank details directly with your solicitor or agent before transferring money.",
    source:
      "https://www.realestate.com.au/news/popular-property-scam-on-rise-as-nearly-every-aussie-fooled/",
  },
  {
    id: 3,
    title: "Fake Bank Messages",
    image: BankImg,
    text: "Phishing texts or emails disguised as official bank alerts...",
    details:
      "Commonwealth Bank warned customers of phishing scams causing $91M in losses in 2024. Messages ask users to redeem points or verify activity via malicious links. These mimic official bank communications, tricking especially seniors. Remember: your bank will never ask you to confirm details via SMS/email links.",
    source:
      "https://www.commbank.com.au/support/security/latest-scams-and-security-alerts.html",
  },
  {
    id: 4,
    title: "Government Refund Traps",
    image: AtoImg,
    text: "Scammers pose as ATO agents offering easy GST refunds...",
    details:
      "Over 57,000 people lodged false GST refund claims under 'Operation Protego', costing ~$2B. Victims were tricked via social media into sham businesses. A 62-year-old man was left with $72K debt. Always check refund schemes on the ATO’s official site and never trust ‘easy refund’ offers online.",
    source:
      "https://www.news.com.au/finance/money/costs/tax-scam-victims-face-crushing-debts-in-australias-largest-gst-fraud/news-story/31e4a7f967339040ceec7fe7b5961874",
  },
];

export default function Article() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleFlip = (id: number) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <Box id="articles" component="section" sx={sectionStyles.articleSection}>
      <Typography variant="h4" fontWeight={800} textAlign="center">
        Get to know the latest trending scams around Australia <br /> & how to avoid them.
      </Typography>

      <Swiper
        modules={[Navigation]}
        navigation
        loop
        pagination={false} 
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
                {/* FRONT OF CARD */}
                <Card sx={cardStyles.front}>
                  <Box
                    component="img"
                    src={card.image}
                    alt={card.title}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <CardContent sx={cardStyles.content}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.text}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleFlip(card.id)}
                      sx={buttonStyles.learnMore}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                {/* BACK OF CARD */}
                <Card sx={cardStyles.back}>
                  <CardContent sx={cardStyles.content}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {card.details}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        href={card.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ flex: 1 }}
                      >
                        Get Source
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleFlip(card.id)}
                        sx={{ flex: 1 }}
                      >
                        Back
                      </Button>
                    </Box>
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
