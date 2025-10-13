import { Typography } from "@mui/material";

{/** Lessons for the "Learn digital citizenship cards */}

export interface Lesson {
  id: string;
  title: string;
  subtitle: React.ReactNode;

  bullets: string[];
  smsFrom: string;
  riskySMS: string;
  safeSMS: string;
  highlight: string[];
  theme: string;
}

export const LESSONS: Lesson[] = [
  {
    id: "privacy",
    title: "Safety & Security",
    subtitle: (
      <>
        Privacy is the right and ability to control personal information online,
        and security is protecting that information from unauthorized access,
        damage, and theft. Both are crucial for safe digital citizenship. Imagine
        it like{" "}
        <b>
          locking the doors to your house and not sharing your keys with
          strangers.
        </b>{" "}
        Every time you think of sharing your personal information online, ask
        yourself: Would you share it in person? Would you give your house keys
        to a stranger?
        <br />
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: "green", fontWeight: "bold", mt: 2 }}
        >
          What can you do to protect your privacy and security online?
        </Typography>
      </>
    ),
    bullets: [
      "Never click on suspicious links or attachments in emails, messages, or websites.",
      "No bank or government agency will ever ask for OTPs online—do not share them with anyone.",
      "Always open a website by typing the URL yourself or using a trusted bookmark.",
    ],
    smsFrom: "ODS-6725 (Commonwealth Bank)",
    riskySMS:
      "Your account will be locked in 24 hrs due to suspicious activity near a location 2455 km away from you. Verify now: http://fakebank-login.com/verify",
    safeSMS:
      "Don't click links in unexpected messages. If concerned, go to your bank's official app or website directly to check your account status.",
    highlight: ["fakebank-login.com", "Verify now"],
    theme: "#FFF4F3",
  },
  {
    id: "literacy",
    title: "Digital Literacy",
    subtitle: (
      <>
        Digital literacy is your ability to find, create, and understand
        information online. It equips you to locate, interpret, and evaluate
        information from any source.
        <br />
        After reading something, think about its credibility—{" "}
        <b>How true are the facts stated inside the message?</b> Will forwarding
        this affect someone's reputation? Practicing critical thinking is key
        to digital literacy.
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: "green", fontWeight: "bold", mt: 2 }}
        >
          What can you do to improve your digital literacy?
        </Typography>
      </>
    ),
    bullets: [
      "Do not forward or share chain messages without verifying them first.",
      "Always cross-check with trusted fact-checking sites.",
      "Verify information about government services, health, or safety from official websites.",
    ],
    smsFrom: "Family Group Chat",
    riskySMS:
      "The new Australian government policy allows free electricity for all citizens. Forward this to friends and family to let them know the offer.",
    safeSMS:
      "Stop and verify — this sounds too good to be true. Check official government websites or trusted news sources.",
    highlight: ["Forward this", "free electricity"],
    theme: "#FFF8E7",
  },
  {
    id: "respect",
    title: "Respect & Empathy",
    subtitle: (
      <>
        Always remember there’s a human being with feelings on the other side of
        the screen. Respect means treating others with kindness and empathy.
        Respect their privacy and digital property.{" "}
        <b>
          Before sending a message, ask yourself — would you feel okay receiving
          it? Is there a more respectful way to say what you mean?
        </b>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: "green", fontWeight: "bold", mt: 2 }}
        >
          What can you do to be respectful and empathetic digitally?
        </Typography>
      </>
    ),
    bullets: [
      "Behave in virtual spaces with the same respect you would in person.",
      "Do not share anything without the person’s consent.",
      "Pause before posting or sharing anything that could hurt or offend someone.",
    ],
    smsFrom: "Our Group Chat",
    riskySMS: "LOL look at this funny video of Auntie May dancing!",
    safeSMS:
      "Respectfully stop. This isn’t okay. Please delete it. You shouldn’t forward anyone’s video without consent.",
    highlight: ["Auntie May", "funny video"],
    theme: "#EFFEFF",
  },
  {
    id: "legal",
    title: "Legal & Ethical Use",
    subtitle: (
      <>
        Digital citizenship also means using technology legally and ethically.
        That includes respecting copyright, giving credit where it’s due, and
        not misusing digital resources.{" "}
        <b>
          Imagine writing a library book and someone else reads it, returns it,
          and then claims they wrote it themselves — that’s the same as copying
          content online.
        </b>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: "green", fontWeight: "bold", mt: 2 }}
        >
          How can you use digital content legally and ethically?
        </Typography>
      </>
    ),
    bullets: [
      "Always give credit to authors, photographers, or content creators.",
      "Do not download or share pirated movies, songs, or software.",
      "Respect intellectual-property rights — ask before using others’ work and give credit.",
    ],
    smsFrom: "Movie Download Group",
    riskySMS:
      "Hey! Download the latest movie for free here: http://freemovies-download.com",
    safeSMS:
      "This is illegal. Instead, watch through official apps like Netflix, Stan, or borrow from a library.",
    highlight: ["Download for free", "freemovies-download.com"],
    theme: "#FFF0FA",
  },
  {
    id: "awareness",
    title: "Privacy Awareness",
    subtitle: (
      <>
        Privacy awareness means understanding how much of your personal data is
        visible online and what others can do with it.{" "}
        <b>
          Your data is valuable — treat it like your wallet. Would you open your
          wallet on a public platform?
        </b>{" "}
        Every app, website, or service collects information about you; being
        aware helps you stay safe and make smarter choices.
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: "green", fontWeight: "bold", mt: 2 }}
        >
          What can you do to stay privacy-aware?
        </Typography>
      </>
    ),
    bullets: [
      "Check app permissions before installing — does a torch app really need your contacts?",
      "Limit what you share publicly on social media. Use privacy settings wisely.",
      "Regularly review your app and account privacy settings to ensure they match your comfort level.",
    ],
    smsFrom: "Unknown Number",
    riskySMS:
      "You are eligible for a $200 gift card! Just enter your full name, address, and Medicare number to claim.",
    safeSMS:
      "Never share sensitive information like ID, Medicare, or tax file numbers in messages.",
    highlight: ["Medicare number", "full name"],
    theme: "#F0FFF0",
  },
];
