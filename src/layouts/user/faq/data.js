import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export const questions = [
    {
        question: "How often should I call the leads?",
        answer:"Leads should be called 4-5 times per day for at least 7 days. In doing so you greatly increase the change of getting an appointment/sale.",
    },
    {
        question: "What is a rejected lead?",
        answer: 
            <>
                <MDTypography variant="text" fontWeight="bold">A rejected lead is a lead that falls into one of the following:
                </MDTypography>  
         <MDBox component="ul" m={0} pl={4} mb={2}>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
           Number does not connect
          </MDTypography>
        </MDBox>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Out of area
          </MDTypography>
        </MDBox>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Incorrect details
          </MDTypography>
        </MDBox>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Blatant Hoax
          </MDTypography>
        </MDBox>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Outside of agreed criteria
          </MDTypography>
        </MDBox>
      </MDBox>
        
        </>
        
        ,
    },
    {
        question: "What is your replacement policy for leads?",
        answer:"We offer a full replacement policy on rejected leads, we do our upmost to ensure the least amount of dead or invalid numbers pull through.",
    },
    {
        question: "What reasons can I reject a lead? ",
      answer:
        <>
                <MDTypography variant="text" fontWeight="bold">What's Included.
                </MDTypography>  
         <MDBox component="ul" m={0} pl={4} mb={2}>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
           Number does not connect
          </MDTypography>
        </MDBox>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Out of area
          </MDTypography>
        </MDBox>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Incorrect details
          </MDTypography>
        </MDBox>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Blatant Hoax
          </MDTypography>
        </MDBox>
      </MDBox>
        
            
             <MDTypography variant="text" fontWeight="bold">What's Not included.
                </MDTypography>  
         <MDBox component="ul" m={0} pl={4} mb={2}>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
           Prospect did not answer the phone.
          </MDTypography>
        </MDBox>
        <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Client chose not to pursue your offer.
          </MDTypography>
        </MDBox>
      </MDBox>
        </>,
    },
    {
        question: "What sort of conversion rate should we be aiming for?",
        answer: "25-30%",
    },
    {
        question: "How long will it take to deliver all the leads? ",
        answer:"This is dependant on how many leads you order, whether you have daily/ weekly caps on delivery and your geographical region.",
    },
     {
        question: "How is a lead replaced?",
        answer: "As long as the account manager has been given 72 hours notice - We replace leads by delivering new leads into your dashboard.",
    },
    {
        question: "I wasn’t able to get into contact with a lead? What do I do? ",
        answer:"We recommend calling leads 4-5 times per day for at least 7 days to get the best results and increased contact rate. If a number does not dial then we will replace that lead.",
    },
     {
        question: "How can I increase my contact rate?",
        answer: "By calling the lead within 5 minutes of it being received and calling the lead 4-5 times per day for at least 7 days. You can also email, text and whatsapp the lead.",
    },
    {
        question: "How will I know when a new lead has arrived? ",
        answer:"You will receive email notifications.",
    },
     {
        question: "How can I receive more leads?",
        answer: "Top up your credits and increase volume / delivery cap",
    },
    {
        question: "Are your leads qualified and verified? ",
        answer:"Yes, all leads are qualified using extensive criteria and they are email and phone verified.",
    },
    {
        question: "How do I view the lead details? ",
        answer:"Within the dashboard.",
    },
     {
        question: "I’ve stopped receiving leads, what do I do?",
        answer: "Check you have enough credits / balance before calling or emailing your account manager.",
    },
    {
        question: "Can I export my leads? ",
        answer:"Yes, export is available through the export button.",
    },
    {
        question: "Can I archive leads?",
        answer: "Yes, you can archive the leads with the Toggle button given at the extreme right of the rows in the table. ",
    },
    {
        question: "How can i search my leads? ",
        answer:"Search field is given in leads Table and your all Leads List Shoen on Table",
    },
    {
        question: "How do I report an invalid lead?",
        answer: "Mark it as invalid on the dashboard and email mike@nmg.group.",
    },
    {
        question: "How much do leads cost? ",
        answer:"Lead costs depend on level of geotargeting and criteria.",
    },
     {
        question: "Are the leads genuine?",
        answer: "Yes.",
    },
    {
        question: "Lead isn’t interested anymore, can I get another one? ",
        answer:"No. A lead which falls within the criteria and does not require it to be replaced for whatever reason, is a valid lead we have sent to you.",
    },
      {
        question: "Where do your leads come from?",
        answer: "Google, Bing and Facebook.",
    },
    {
        question: "Why should I buy your leads? ",
        answer: <>
            <MDTypography variant="text"><MDTypography variant="text" fontWeight="medium">High Intent</MDTypography> - The leads we generate have shown real interest in your product</MDTypography><br/>
            <MDTypography variant="text"><MDTypography variant="text" fontWeight="medium">Live </MDTypography> - Leads get sent to you in real time</MDTypography><br/>
            <MDTypography variant="text"><MDTypography variant="text" fontWeight="medium">Exclusive </MDTypography> - We do not share the same lead with multiple companies</MDTypography><br/>
            <MDTypography variant="text"><MDTypography variant="text" fontWeight="medium">Phone and Email Verified </MDTypography> - We verify all numbers and emails to increase contact rate</MDTypography><br/>
            <MDTypography variant="text"><MDTypography variant="text" fontWeight="medium">High conversion</MDTypography> - Our average conversion rate is 30%</MDTypography><br/>
            <MDTypography variant="text"><MDTypography variant="text" fontWeight="medium">SMS</MDTypography> - We send 5 text messages to each lead within the first 3 days</MDTypography><br/>
           </>
    },
     {
        question: "What is a lead?",
        answer: "Someone who has shown interest in your product(s)",
    },
    {
        question: "What happens when I run out of credit? ",
        answer:"You need to top up more to receive leads",
    },
]
    
