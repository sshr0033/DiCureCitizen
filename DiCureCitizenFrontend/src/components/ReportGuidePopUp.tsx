import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogContent,
  Slide,
  Button,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";

import BlockIcon from "@mui/icons-material/Block";

const steps = [
  {
    title: "Identify the Scam",
    icon: <ReportProblemOutlinedIcon sx={{ fontSize: 60, color: "error.main" }} />,
    accordions: [
      {
        label: "Financial Scam",
        content:(<> <ul> Immediately call your bank and block your card/account. <br/>
        Open your banking app <br/>
        → go to “Card Services” <br/>
        → select “Block Card”. <br/>
        If unsure, call your bank's official number. </ul></>)

      },
      {
        label: "Privacy Scam",
        content:(<>  <ul>Change all your important passwords immediately (email, banking, social media). <br/>
        <b>Use a strong password</b> <br/> A Strong Password is at least 12 characters with numbers, symbols, and mixed case. 
        <br/>Log out of all devices after reset of the password.</ul></>)
         
      },
      {
        label: "Tech Support Scam",
        content: (<>  
        <ul>Never install apps or share your screen when asked on a call. <br/>
        If you did, uninstall the app immediately and reset your device. <br/>
        Consider running an antivirus scan if it is downloaded from a trusted source. </ul>
     </>)
         },
    ],
  },
  {
    title: " Report to Authorities",
    icon: <PhoneInTalkOutlinedIcon sx={{ fontSize: 60, color: "info.main" }} />,
    accordions: [
      {
        label: "Bank Helpline",
        content:(<>Call your bank's fraud helpline if your financial details were asked.
        <br/> They can freeze accounts/cards.
    </>)
            },
      {
        label: "Cyber Crime Portal",
        content:(<> Report scams to cyber.gov.au. and tell them what happened</>)
          
      },
      {
        label: "Local Police",
        content:(<>
          If urgent or if money has been stolen, <br/>call your local police helpline immediately.</>)
      },
    ],
  },
  {
    title: "Block the Number",
    icon: <BlockIcon sx={{ fontSize: 60, color: "success.main" }} />,
    accordions: [
      {
        label: "Phone Settings",
        content:(<> Go to your phone's call log, <br/> Select the scam number, and choose 'Block CALLER'</>)
         
      },
      
      {
        label: "Warn Others",
        content: (<>Inform friends/family about the scam so they don't fall victim to the same call.</>)
      },
    ],
  },
];

const Transition = React.forwardRef(function Transition(
  props: React.ComponentProps<typeof Slide>,
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReportGuidePopUp: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [step, setStep] = useState(0);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
    >
      <DialogContent sx={{ py: 4 }}>
        <Box textAlign="center" mb={2}>
          {steps[step].icon}
          <Typography variant="h5" fontWeight={800} mt={1}>
            {steps[step].title}
          </Typography>
        </Box>

        {steps[step].accordions.map((a, i) => (
          <Accordion key={i} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{a.label}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{a.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        
        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          <Button
            variant="outlined"
            disabled={step === 0}
            onClick={() => setStep((s) => s - 1)}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (step < steps.length - 1) {
                setStep((s) => s + 1);
              } else {
                onClose();
                setStep(0);
              }
            }}
          >
            {step === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          mt={2}
        >
          Step {step + 1} of {steps.length}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ReportGuidePopUp;
