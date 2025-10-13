
export interface Question {
  id: number;
  time: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
  correction: string;
}

{/** Quiz Questions for the "Interactive quiz" */}

export const questions: Question[] = [
  {
    id: 0,
    time: 82,
    question: "What should he do in this situation?",
    options: [
      "Click the link immediately to claim the cashback before it expires",
      "Check if he actually made a recent purchase or reward transaction, and verify through the shopping app",
      "Forward the message to his friends to see if they received it too",
      "Reply to the message asking for confirmation",
    ],
    correct:
      "Check if he actually made a recent purchase or reward transaction, and verify through the shopping app",
    explanation:
      "He should always verify messages claiming rewards or cashback through the official shopping app or account rather than clicking suspicious links.",
  correction:
      "Think about safer ways to confirm a cashback offer — can he check it from an official source instead of clicking a link?",
  
    },
  {
    id: 1,
    time: 111,
    question: "What should he do in this situation?",
    options: [
      "Call the bank and verify if the account is locked",
      "Click the link immediately to revive the bank account",
      "Reply to the sender asking for further steps",
      "Forget about paying the bill",
    ],
    correct: "Call the bank and verify if the account is locked",
    explanation:
      "When receiving messages about account issues, directly contact the bank using official channels — never click unknown links.",
          correction:
      "Consider how he could confirm if the message is genuine without using the link provided.",

  },
  {
    id: 2,
    time: 143,
    question:
      "What steps should he follow while setting his password? (Select the options that apply.)",
    options: [
      "Continue creating the password in front of another person.",
      "Choose a strong password with a mix of letters, numbers, and symbols that's unique to this account",
      "Ask your friend to set up the same password for him",
      "Reuse an old password from his social media accounts",
      "Create a password without anyone else viewing to maintain the privacy",
    ],
    correct:
      "Choose a strong password with a mix of letters, numbers, and symbols that's unique to this account",
    explanation:
      "He should create a strong, private password using a mix of characters and ensure nobody else can see it.",
          correction:
      "Think about what makes a password secure — should it be easy or hard to guess, and should others see it?",
  },
   {
    id: 3,
    time: 164,
    question:
      "What steps should he follow while setting his password? (Select the options that apply.)",
    options: [
      "Continue creating the password in front of another person.",
      "Choose a strong password with a mix of letters, numbers, and symbols that's unique to this account",
      "Ask your friend to set up the same password for him",
      "Reuse an old password from his social media accounts",
      "Create a password without anyone else viewing to maintain the privacy",
    ],
    correct:
      "Create a password without anyone else viewing to maintain the privacy",
    explanation:
      "Always make sure that your password is hidden and unique, never share it with anyone.",
     correction:
      "Think about privacy — would you like someone to post your photo without asking you first?",

  },
  {
    id: 4,
    time: 201,
    question: "What should she do in this situation?",
    options: [
      "Ignore her friend's feelings and post the picture on social media",
      "Do not post a picture without the person's consent",
      "Share it on her friend's group to make fun of him",
      "Click some more pictures and make a collage of him",
    ],
    correct: "Do not post a picture without the person's consent",
    explanation:
      "Always ask for consent before sharing someone's photo online — this respects privacy and digital citizenship values.",
      correction:
      "Before sharing, how could she make sure the message is true or fake?",
  },
  {
    id: 5,
    time: 253,
    question: "What should she do before sharing this message?",
    options: [
      "Forward it to the study group so they can apply quickly",
      "Contact her university to verify the message",
      "Add 'not sure if true' and send it to warn people anyway",
      "Ignore it but save the message in case it's real",
    ],
    correct: "Contact her university to verify the message",
    explanation:
      "Before forwarding messages about offers or opportunities, always verify the information with the official source.",
      correction:
      "Ask yourself — how might others feel if they read this comment?",
  },
  {
    id: 6,
    time: 300,
       question: "What should she do?",
    options: [
      "Delete her social media account to avoid the bullying",
      "Grow her confidence and block them",
      "Respond to the comments",
      "Contact the commenters and connect with them",
    ],
    correct: "Grow her confidence and block them",
    explanation:
      "She should block the bullies, avoid engaging with them, and stay confident — it's the best digital resilience practice.",
   correction:
      "Think about what's the healthiest way to deal with bullies — does replying help, or ignoring and blocking work better?",

  },
    
  {
    id: 7,
    time: 331,
     question: "What should he do before posting this comment?",
    options: [
      "Go ahead and post it, it's just his opinion",
      "Add an emoji so it looks funny instead of rude",
      "Stop and think if the comment might upset someone before posting",
      "Delete his account completely",
    ],
    correct: "Stop and think if the comment might upset someone before posting",
    explanation:
      "Think critically before posting online — ensure your comment is respectful and won't harm or offend others.",
         correction:
      "Maybe pause for a second — how could his words affect others if they see the comment?",
  
  },
    
  {
    id: 8,
    time: 363,
    question: "What should he do before using the picture?",
    options: [
      "Acknowledge the use of the picture",
      "Since it's found on the internet, use it as he pleases",
      "Use pictures from a different website",
      "Use Generative AI to create a similar picture",
    ],
    correct: "Acknowledge the use of the picture",
    explanation:
      "Always give credit to the creator when using online images to respect copyright and ownership.",
   correction:
      "Think — does finding an image online automatically mean you can use it freely?",
  },
  {
    id: 9,
    time: 406,
 question: "What should he do?",
    options: [
      "Continue maintaining the same screen time to maintain the weekly average",
      "Reduce the screen time because it is not a good digital citizen practice",
      "Start using an iPad to split the screen time",
      "Throw his phone to become anti-digital",
    ],
    correct:
      "Reduce the screen time because it is not a good digital citizen practice",
    explanation:
      "Balancing digital use helps improve well-being and sets a good example for responsible digital citizenship.",
      correction:
      "Think about healthy screen habits — would spending less time on devices be better for him?",
  },
  
];


export const scenarioTimes = [54, 87, 118, 153, 170, 215, 269, 309, 342, 375];
