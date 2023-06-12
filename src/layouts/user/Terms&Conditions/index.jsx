import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { getTermsAndConditions } from 'services/User.Services';

function TermsandConditions() {

  const [terms, setTerms] = useState("")

  useEffect(() => {
    const callbackFn = async () => {
      const result = await getTermsAndConditions();
      const { data } = result.data;
      setTerms(data);
    };
    callbackFn();
  }, []);

  return (
    <MDBox my={3}>
      <Grid container spacing={3} display="flex" alignItem="center" justifyContent="center">

        <Grid item xs={12} lg={8}>
          <MDBox mt={1} mb={6}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={8}>
                <MDTypography variant="h2" align="center" fontWeight="bold" gutterBottom>
                  Narwhal Group Limited
                </MDTypography>
                <MDBox mb={2}>
                  <MDTypography variant="body2" align="center" color="text">
                    General Terms & Conditions
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} md={12}>

                <MDTypography variant="text" fontWeight="medium">1. Definitions and Interpretation
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDTypography variant="text" fontWeight="medium">1.1 In these Conditions the following definitions apply:
                  </MDTypography>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1} ml={2}>

                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Applicable Law<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means all applicable laws, legislation, statutory instruments,
                      regulations and governmental guidance having binding force whether
                      local or national or international in any relevant jurisdiction;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Bribery Laws <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the Bribery Act 2010 and all Applicable Laws in
                      connection with bribery or anti-corruption;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Business Day<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means a day other than a Saturday, Sunday or bank or public
                      holiday;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Client <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the named party in the Contract which has agreed to
                      purchase the Services from Narwhal Group and whose details are set
                      out in the Order;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Commencement Date <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} the date set out in the Scope of Works;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Conditions <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means Narwhal Group ’s terms and conditions of supply set
                      out in this document;


                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Confidential Information<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means any commercial, financial or technical information,
                      information relating to the Services, plans, know-how or trade
                      secrets which is obviously confidential in nature or has been
                      identified as confidential, or which is developed by a party in
                      performing its obligations under, or otherwise pursuant to the
                      Contract;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Contract<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the agreement between Narwhal Group and the
                      Client for the supply and purchase of Services incorporating these
                      Conditions, the Order and the Scope of Works and including all their
                      respective schedules, attachments and annexures;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Fees <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} has the meaning set out in clause 6 ;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Force Majeure <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} has the meaning set out in clause 12 ;
                    </MDTypography>




                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Intellectual Property Rights<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} trade names, design rights, rights in get-up, rights in goodwill,
                      rights in software, rights in Confidential Information, rights to
                      invention, rights to sue for passing off, domain names and all other
                      intellectual property rights and similar rights and, in each case:
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      (a) whether registered or not; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      (b) including any applications to protect or register such rights; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      (c) including all renewals and extensions of such rights or
                      applications; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      (d) whether vested, contingent or future; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      (e) to which the relevant party is or may be entitled, and<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      (f) in whichever part of the world existing. <br />
                    </MDTypography>

                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Leads<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the contact details of third-party prospects who have
                      completed an enquiry form and submitted this enquiry via one of
                      Narwhal Group’s website or marketing channels and which have
                      been delivered to the Client via email or API;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Minimum Term<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the period of time for which Narwhal Group are to
                      supply the Services to the Client as set out in the Scope of Works
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Narwhal Group<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means Narwhal Group Limited a company incorporated and
                      registered in England and Wales with company number 13603579
                      whose registered address is at 2 Charnwood House, Marsh Road,
                      Bristol, BS3 2NA;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Order<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the order for the Services from Narwhal Group
                      placed by the Client;
                    </MDTypography>

                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Renewal Period<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the period of time for which Narwhal Group are to
                      supply the Services to the Client after the Minimum Term has expired
                      and as set out in the Scope of Work;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Scope of Works <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the description of the Services to be provided to the
                      Client by Narwhal Group as set out or referred to in the Contract;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Services<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the services (including where appropriate lead
                      generation services) set out in the Scope of Works and to be
                      performed by Narwhal Group for the Client in accordance with the
                      Contract;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Term<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means the length of this Contract as set out in the Scope of
                      Works;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      VAT <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "} means value added tax under the Value Added Taxes Act
                      1994 or any other similar sale or fiscal tax applying to the sale of the
                      Services; and
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="bold" verticalAlign="middle">
                      Website<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      {"  "}means the Client’s website for which Narwhal Group are
                      providing the Services and as set out in the Scope of Works.
                    </MDTypography>
                  </MDBox>
                </MDBox>

                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="medium">1.2  In these Conditions, unless the context requires otherwise:
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to the Contract includes these Conditions, the Scope of Works and their respective
                      schedules, appendices and annexes (if any);
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Any clause, schedule or other headings in these Conditions is included for convenience only and
                      shall have no effect on the interpretation of the Conditions;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to a ‘party’ includes that party’s personal representatives, successors and permitted
                      assigns;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to a ‘person’ includes a natural person, corporate or unincorporated body (in each
                      case whether or not having separate legal personality) and that person’s personal
                      representatives, successors and permitted assigns;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to a ‘company’ includes any company, corporation or other body corporate,
                      wherever and however incorporated or established
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to a gender includes each other gender;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Words in the singular include the plural and vice versa;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Any words that follow ‘include’, ‘includes’, ‘including’, ‘in particular’ or any similar words and
                      expressions shall be construed as illustrative only and shall not limit the sense of any word,
                      phrase, term, definition or description preceding those words;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to ‘writing’ or ‘written’ includes any method of reproducing words in a legible and
                      non-transitory form;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to legislation is a reference to that legislation as amended, extended, re-enacted or
                      consolidated from time to time;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to information is to information of any kind in any form or medium, whether formal
                      or informal, written or unwritten, for example, computer software or programs, data, drawings,
                      ideas, knowledge, procedures, source codes or object codes, technology or trade secrets;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to pounds or £ is to an amount in Great British Pounds;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to legislation includes all subordinate legislation made under that legislation; and
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A reference to any English action, remedy, method of judicial proceeding, court, official, legal
                      document, legal status, legal doctrine, legal concept or thing shall, in respect of any jurisdiction
                      other than England, be deemed to include a reference to that which most nearly approximates
                      to the English equivalent in that jurisdiction
                    </MDTypography>
                  </MDBox>
                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>
              {/* Application of these Conditions */}
              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">2. Application of these Conditions
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      These Conditions apply to and form part of the Contract between Narwhal Group and the Client. They
                      supersede any previously issued terms and conditions of purchase or supply.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      No terms or conditions endorsed on, delivered with, or contained in the Client’s purchase conditions,
                      order, confirmation of order, specification or other document shall form part of the Contract except to
                      the extent that Narwhal Group otherwise agrees in writing.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group may accept or reject an Order at its discretion. An Order shall not be accepted, and no
                      binding obligation to supply any Services shall arise, until the earlier of:-<br />

                      <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                        (a)  The Client signing the Scope of Works; or
                      </MDTypography>

                      <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                        (b)  Narwhal Group performing the Services or notifying the Client that they are ready to be
                        performed (as the case may be).
                      </MDTypography>

                    </MDTypography>
                  </MDBox>


                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Rejection by Narwhal Group of an Order, including any communication that may accompany such
                      rejection, shall not constitute a counter-offer capable of acceptance by the Client.ces or notifying the Client that they are ready to be
                      performed (as the case may be).
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group may issue quotations to the Client from time to time. Quotations are invitations to treat
                      only. They are not an offer to supply Services and are incapable of being accepted by the Client.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Marketing and other promotional material relating to the Services are illustrative only and do not form
                      part of the Contract.
                    </MDTypography>
                  </MDBox>
                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>


              {/* commencement and term */}

              <Grid item xs={12} md={12}>
                <MDTypography variant="text" fontWeight="bold">3. Commencement and Term
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The Services shall be provided under these Conditions from the Commencement Date for the Minimum
                      Term and thereafter for further Renewal Periods until it is terminated:-<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (a)  By Narwhal Group giving the client not less than Zero calendar days written notice; or
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (b)  By the client giving Narwhal Group not less than thirty calendar days written notice expiring at
                      the end of the Minimum Term or at the end of any subsequent Renewal Period as appropriate;
                      or
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (c)   In accordance with clause 16 (Termination) of this Contract.
                    </MDTypography>
                  </MDBox>
                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>

              {/* Narwhal Group’s Obligation */}

              <Grid item xs={12} md={12}>

                <MDTypography variant="text" fontWeight="bold">4. Narwhal Group’s Obligations
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group shall:<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (a) Provide the Services with reasonable skill and care, commensurate with the prevailing industry
                      standards of the specific Service requested and in accordance with the Scope of Works and the
                      Contract;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (b)  Provide campaign reporting and other information to Client via email (or such other method
                      agreed by Client);
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (c)   Act in accordance with all reasonable instructions given to it by the Client provided such
                      instructions are compatible with the scope of the Services, as defined in these Conditions;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (d)  Be entitled to perform any of the obligations undertaken by it through suitably qualified and
                      skilled sub-contractors. Any act or omission of such sub-contractor shall, for the purposes of the
                      Contract, be deemed to be an act or omission of Narwhal Group;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (e)  Use all reasonable endeavours to accommodate any reasonable changes in the scope contained
                      within the Scope of Works which may be requested by the Client, subject to the Client’s
                      acceptance of any related reasonable changes to the Fees which may be due as a result of such
                      changes.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Time of performance of the Services is not of the essence. Narwhal Group shall use its reasonable
                      endeavours to meet estimated dates for performance, but any such dates are approximate only.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group shall not be liable for any delay or failure of performance caused by the Client’s failure to
                      provide Narwhal Group with adequate instructions for performance or otherwise relating to the Services
                      or Force Majeure.
                    </MDTypography>
                  </MDBox>
                </MDBox>


              </Grid>
              {/* Lead Generation Services */}

              <Grid item xs={12} md={12}>

                <MDTypography variant="text" fontWeight="bold">5. Lead Generation Services
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group shall supply the Leads to the Client via agreed transfer protocol of API or encrypted data
                      transfer, in accordance with the Client’s requirements set out in the Scope of Works.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Leads sent to the email address provided by the Client (until Narwhal Group are notified of any other
                      email address) will be deemed to have been delivered to the Client whether actually received of not.
                      Narwhal Group will not be liable for any losses resulting from Leads sent successfully to the correct email
                      address but are rejected or filtered due to spam/junk folders by the Client’s email provider.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group will not sell on, manipulate, process or otherwise interfere with the data captured for the
                      Client in any way other than to design the marketing activity to generate and capture leads for the Client.
                      The captured data will therefore be fully owned and controlled by the Client.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group does not warrant that the data provided in any Lead is suitable for the business purpose
                      for which it is being purchased and/or that it would result in sales/generation of business for the Client.
                      Narwhal Group is responsible for generating the data per the Scope of Works and the Order. For the
                      avoidance of doubt, it is the Client’s responsibility to ensure the suitability of the data and the
                      effectiveness of the same for the business generation/marketing plans of the Client.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group warrants that: <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      each of the relevant individuals has provided his or her consent pursuant to the Data Protection
                      Act 1998 permitting the use of personal data contained within the Leads as contemplated in this
                      Contract by registering at the relevant online registration page at such URL or advertising
                      platforms (such as Facebook or Instagram) as Narwhal Group shall advise from time to time; and  <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      the Leads shall not be registered with the Telephone Preference Service, Fax Preference Service
                      or Mail Preference Service.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A Client may give notice to Narwhal Group to temporarily suspend all or part of the lead generation
                      service in any Renewal Period by providing 30 days’ notice in writing. The Client shall pay for the Services
                      carried out up to the date of suspension and shall pay Narwhal Group’s reasonable and unavoidable costs
                      in complying with the suspension request. The Client may request a resumption of the lead generation
                      service by providing 48 hours’ notice in writing to Narwhal Group.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      In the event the Contract is terminated by either party as a result of the Client’s request for a suspension,
                      the Client shall indemnify Narwhal Group against any costs, damages, loss (including loss of profit incurred
                      by Narwhal Group), claims or proceedings arising out the suspension and termination of the Contract.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group shall give a written guarantee as to price and for the numbers of Leads generated. Leads
                      will be replaced for free if the Client discovers within 48 hours of the provision of the Leads that:<br />
                    </MDTypography>


                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      a. there is an invalid phone number;<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      b. there is duplicate data; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      c. the data is false; and <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      d. the data is hoax data<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      For the avoidance of doubt this will not include Leads which have been validly provided and the person(s)
                      contacted vis the Lead deny submitting their data to Narwhal Group.
                    </MDTypography>

                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Leads will not be replaced for free by Narwhal Group where a prospect has submitted their information
                      but simply decides not to answer or return any attempts at contact made by the Client. A Lead with which
                      the Client is unable to make contact or who changes their mind about speaking with the Client after
                      submitting the form does not qualify for free replacement data.
                    </MDTypography>
                  </MDBox>
                </MDBox>


              </Grid>

              {/* 6th one */}

              <Grid item xs={12} md={12}>

                <MDTypography variant="text" fontWeight="bold">6. Client’s Obligations
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The Client shall:<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      a.  pay all Fees and additional charges in accordance with this Contract; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      b. ensure that Narwhal Group has unrestricted access to such electronic systems and materials,
                      and promptly provide Narwhal Group with all assistance, directions, instructions or information,
                      reasonably required by Narwhal Group to perform the Services; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      c. provide timely updates on any information relevant to the Services. Any delay in the Services
                      resulting from the Client’s failure to comply with this provision shall not be the responsibility or
                      fault of Narwhal Group;
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      With regard to a Client’s Website:<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      a.regular maintenance; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      b.monthly backups; and; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      c. payments to its website hosting and maintenance provider where applicable to ensure
                      compliance with clauses 6.2.1.1 and 6.2.1.2 above.;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      the Client hereby warrants and represents that its Website and use of the Services for the
                      marketing of products and services of the Client shall be for legitimate business purposes, in
                      compliance with all applicable laws and regulations, and that Client has obtained all necessary
                      approvals, consents and permissions from any relevant authority or third party.
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      the Client accepts sole responsibility for all content and information provided to Narwhal Group
                      and warrants and represents the accuracy and completeness of such information.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group is an online marketing agency and may rely, subject to the Client’s prior written approval
                      and consent, on third parties to perform the Services. Unless otherwise provided for in these Conditions
                      or in the Scope of Works, Narwhal Group is not responsible for the performance of such services by third
                      parties
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      With regard to Leads:
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      a. the Client shall provide information to Narwhal Group on a daily basis in terms of lead quality
                      and volume;<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      b. the Client warrants that it is regulated by the Financial Services Authority (or such other relevant
                      regulatory body) to utilise the Leads generated by Narwhal Group in the ordinary course of its
                      business and shall indemnify and keep Narwhal Group indemnified against all losses, costs,
                      damages, claims and expenses arising as result of a breach of this warranty;<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      c. Leads provided to the Client are for the Clients sole use. The Client agrees to reply to the Leads
                      in a timely manner (i.e. within 72 hours) and process the Leads with care, duty and
                      professionalism and full disclosure to the prospect;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      d. the Client hereby indemnifies and shall keep indemnified Narwhal Group for any and all loss,
                      costs, liabilities and expenses as may be incurred by Narwhal Group directly or indirectly because
                      of any misuse of the Leads or any part thereof.
                    </MDTypography>

                  </MDBox>
                </MDBox>
              </Grid>

              {/* 7th one */}


              <Grid item xs={12} md={12}>

                <MDTypography variant="text" fontWeight="bold">7. Fees, Invoicing and Payment
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The fees payable for the Services shall be as set out in the Scope of Works or where no such provision is
                      set out, shall be calculated in accordance with Narwhal Group ’s scale of charges in force from time to
                      time (the Fees).
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The fees are exclusive of:<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      a.  VAT (or equivalent sales tax). The Client shall pay any applicable VAT to Narwhal Group on
                      receipt of a valid VAT invoice.<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      b. out of pocket expenses (which are to be agreed in advance by the parties);<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      c. the provision of the Services in languages other than English;<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      d.surcharges for payment methods, taxes and duties<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      which shall be charged in addition to Narwhal Group ’s standard Fees
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group shall invoice the Client for the Services in accordance with the Scope of Work.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The Client shall: <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (a) Pay all invoices in full without deduction or set-off, in cleared funds within 14 days of the
                      date of each invoice or in line with the payment terms detailed in the proposal, whichever is
                      less; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (b) Pay all invoices to the bank account nominated by Narwhal Group via the agreed payment
                      method, either BACs, credit or debit card or a payment processing provider such as Stripe or
                      Go Cardless (Payment Providers); and  <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (c) The Client warrants and represents that where it pays the Fees by credit card, debit card or a
                      Payment Provider that there are sufficient funds on any credit card, debit card or bank
                      account registered with Narwhal Group to pay for all Fees and any charges payable under
                      this Contract.
                    </MDTypography>

                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Where payment is to be taken via a Payment Provider, the relevant Payment Provider’s terms of service
                      shall apply to this Contract and the Client agrees to be bound by those terms as may be modified by the
                      Payment Provider from time to time. As a condition of Narwhal Group enabling payment to be taken via a
                      Payment Provider, the Client shall provide to Narwhal Group accurate and complete information related
                      to the Client’s use of the payment processing services provided by the Payment Provider. The Client
                      further gives permission to Narwhal Group (and the Payment Provider) to charge your on file bank
                      account, credit card, debit card or other approved method of payment for the Fees.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Time of payment is of the essence. Where sums are due under these Conditions are not paid in full by the
                      due date:
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      a. Narwhal Group may suspend all or any of its obligations under these Conditions until the
                      payment is received after giving at least 7 days’ notice to the Client of its intention to
                      suspend with reasons. Any period of suspension will entitle Narwhal Group to any
                      reasonable costs it incurs as well as an extension of time for completion of the Services; <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      b. Narwhal Group may, without limiting its other rights, charge interest on such sums at 8% a
                      year above the base rate of the Bank of England from time to time in force, and <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      c. interest shall accrue on a daily basis and apply from the due date for payment until actual
                      payment in full, whether before or after judgment.
                    </MDTypography>

                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group may increase the Fees at any time by giving the Client not less than 15 Business Days’
                      notice in writing provided that the increase does not exceed 5% of the Fees in effect immediately prior to
                      the increase.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Not with standing clause above, Narwhal Group may increase the Fees with immediate effect by written
                      notice to the Client where there is an increase in the direct cost to Narwhal Group of supplying the
                      relevant Services which exceeds 5% and which is due to any factor beyond the control of Narwhal Group .
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>

              {/* 8th on3 */}
              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">8. Intellectual Property
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group shall retain ownership of any and all Intellectual Property Rights that may subsist in
                      anything produced by Narwhal Group in the course of providing the Services including Leads.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      In consideration of payment for the Services, Narwhal Group grants to the Client a non- exclusive
                      transferable worldwide licence to use for the purposes of the Services, the Intellectual Property Rights in
                      the Services and all other materials created by Narwhal Group pursuant to these Conditions. For the
                      avoidance of the doubt, the Client may not reproduce, modify or sell to any third party the content of the
                      Services and any other materials created by Narwhal Group .
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group acknowledges that the Client owns all Intellectual Property Rights relating to the Website
                      created or provided by the Client in connection with the Services. The Client grants a non-exclusive nontransferable worldwide licence to Narwhal Group for all purposes relating to the performance of the
                      Services relating to the Website.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      In complying with the provisions of clause 8.2, Narwhal Group shall undertake to execute any such
                      agreements and perform any such actions that may be necessary to put such licences into effect and shall
                      exclusively bear any costs associated therewith.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Except as expressly agreed above, no Intellectual Property Rights of either party are transferred or
                      licensed as a result of these Conditions.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Subject to the foregoing, each party shall be entitled to use in any way it deems fit any skills, techniques
                      or know-how acquired or developed or used in connection with this Contract provided always that such
                      skills, techniques or know-how do not infringe the other party’s Intellectual Property Rights now or in the
                      future or disclose or breach the confidentiality of the other party’s Confidential Information.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group shall assert all moral rights arising out of Chapter IV of the Copyright, Designs and
                      Patents Act 1988.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group shall be entitled to refer to performance of the Services for the Client and include the
                      Client’s trademarks in Narwhal Group ’s marketing activities if the Client gives its express consent in
                      writing (such consent not to be unreasonably withheld).
                    </MDTypography>
                  </MDBox>

                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>

              {/* 9th one */}
              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">9. Data Privacy
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Each party warrants and represents that it has adopted and implements a privacy policy in compliance
                      with the requirements under the Data Protection Act 2018 in respect of all personal data provided to the
                      other party in connection with the Services or otherwise under this Contract. Without limitation, all
                      necessary consent has been obtained by the Client from individuals for the purposes of performing the
                      Services.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group will engage third parties to perform specific parts of the Services, including paid
                      campaigns on third party platforms (Third Parties). For specific information regarding the use of third
                      parties, please refer to Narwhal Group ’s privacy notice. Specific terms and conditions may apply to the
                      products and services supplied by Third Parties.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Narwhal Group is not responsible for any information transmitted by Third Parties or liable for any
                      reliance the Client makes upon the information or statements conveyed by Third Parties (or in relation to
                      dealings with Third Parties), nor is Narwhal Group responsible for the accuracy of any advertisements or
                      marketing provided by Third Parties.
                    </MDTypography>
                  </MDBox>
                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>


              {/* 10th one */}
              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">10. Confidentiality
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Each party undertakes that it shall keep confidential all Confidential Information and that it shall not use
                      or disclose the other party’s Confidential Information to any person, except as permitted by clause below:-
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A party may:
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (a) Subject to clause 10.5, disclose any Confidential Information to any of its employees, officers,
                      representatives or advisers (Representatives) who need to know the relevant Confidential
                      Information for the purposes of the performance of any obligations under this Contract,
                      provided that such party ensures that each Representative to whom Confidential Information is
                      disclosed is aware of its confidential nature and agrees to comply with this clause 10 as if it were
                      a party;<br />
                    </MDTypography>

                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (b) Disclose any Confidential Information as may be required by law, any court, any governmental,
                      regulatory or supervisory authority (including any securities exchange) or any other authority of
                      competent jurisdiction to be disclosed; and <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (c) Subject to clause 10.5, use Confidential Information only to perform any obligations under this
                      Contract. <br />
                    </MDTypography>


                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      This clause shall remain in force for a period of five years from the date of the Contract and, if longer,
                      three years after termination of the Contract.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The Client shall not make any public announcement or disclose any information regarding the Contract,
                      except to the extent required by law or regulatory authority.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      To the extent any Confidential Information is protected data (as would be processed in accordance with
                      clause 9.1) such Confidential Information may be disclosed or used only to the extent such disclosure or
                      use is in compliance with and does not conflict with any of the provisions of clause 9
                    </MDTypography>
                  </MDBox>
                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>

              {/* 11th one */}
              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">11.  Anti-bribery
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      For the purposes of this clause 10 the expressions ‘adequate procedures’ and ‘associated with’ shall be
                      construed in accordance with the Bribery Act 2010 and legislation or guidance published under it.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Each party shall comply with applicable Bribery Laws including ensuring that it has in place adequate
                      procedures to prevent bribery and ensure that:
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (a) All of that party’s personnel; <br />
                    </MDTypography>

                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (b) All others associated with that party; and <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (c) All of that party’s sub-contractors; <br />
                    </MDTypography>

                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      involved in performing the Contract so comply.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Without limitation to clause 10.2, neither party shall make or receive any bribe (as defined in the Bribery
                      Act 2010) or other improper payment, or allow any such to be made or received on its behalf, either in
                      the United Kingdom or elsewhere, and shall implement and maintain adequate procedures to ensure that
                      such bribes or payments are not made or received directly or indirectly on its behalf.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The Client shall immediately notify Narwhal Group as soon as it becomes aware of a breach by the Client
                      of any of the requirements in this clause 10.
                    </MDTypography>
                  </MDBox>
                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>

              {/* 12 th one */}

              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">12. Dispute Resolution
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      If any dispute arises between the Client and Narwhal Group in connection with this Contract (Dispute),
                      then either party may notify the other of the Dispute with a notice (Dispute Notice) which: (a) includes or
                      is accompanied by full and detailed particulars of the Dispute; and (b) is delivered within 14 days of the
                      circumstances giving rise to the Dispute first occurring.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Within 14 days after a Dispute Notice is given, a representative (with the authority to resolve the dispute)
                      of the Client and Narwhal Group must meet to discuss and seek to resolve the Dispute.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      If the Dispute has not been resolved within 14 days of the first meeting of the representatives, then the
                      matter shall be referred to the managing directors (or persons of equivalent seniority). The managing
                      directors (or equivalent) will meet within 7 days to discuss the dispute and attempt to resolve it.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      If the dispute has not been resolved within 14 days of the first meeting of the managing directors (or
                      equivalent) under clause 12.3, then the matter may be referred to mediation in accordance with the
                      London Court of International Arbitration Mediation Rules.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      A party must not bring court proceedings in respect of any Dispute unless it first complies with the
                      requirements of the dispute resolution mechanism outlined in this clause, provided that nothing in this
                      clause prevents either party from instituting court proceedings to seek urgent injunctive, interlocutory or
                      declaratory relief in respect of a Dispute.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Despite the existence of a Dispute, the parties must continue to perform their respective obligations
                      under this Contract and any related agreements save for where Narwhal Group have suspended the
                      Services in accordance with clause 5.6. Where the Contract has been suspended in accordance with
                      clause 5.6 Narwhal Group will not be required perform the Services until payment has been made in
                      accordance and/or the Dispute is resolved.
                    </MDTypography>
                  </MDBox>
                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>

              {/* 13 th one */}


              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">13. Force Majeure </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Neither party shall be liable for any failure or delay to performance of obligations under this Contract if
                      such failure or delay results from any cause that is beyond the reasonable control of that Party including
                      power failure, industrial action, civil unrest, fire, flood, storms, earthquakes, acts of terrorism, acts of
                      war, governmental action or any other event that is beyond the control of the party in q.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      In the event that any party cannot perform their obligations hereunder as a result of force majeure for a
                      continuous period of 1 month, the other party may at its discretion terminate this Contract by written
                      notice at the end of that period.
                    </MDTypography>
                  </MDBox>

                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>
              {/* 
              14 th one */}

              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">14. Indemnity and insurance  </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The Client shall indemnify, and keep indemnified, Narwhal Group from and against any losses, damages,
                      liability, costs (including legal fees) and expenses incurred by Narwhal Group as a result of or in
                      connection with the Client’s breach of any of the Client’s obligations under the Contract.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The Client shall have in place contracts of insurance with reputable insurers incorporated in the United
                      Kingdom to cover its obligations under these Conditions. On request, the Client shall supply, so far as is
                      reasonable, evidence of the maintenance of the insurance and all of its terms from time to time
                      applicable. The Client shall on request assign to Narwhal Group Ltd the benefit of such insurance.
                    </MDTypography>
                  </MDBox>

                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>

              {/* 15 th
             non e */}


              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">15. Liability  </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Subject always to the Scope of Works, whilst Narwhal Group does not guarantee traffic to the Website or
                      any specific results from the Services it does undertake to use its best endeavours to maximise the results
                      of the Services for the benefit of the Client. This Contract is not a service level agreement.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      To the extent permitted by law, by accepting the Services, the Client acknowledges and represents that
                      the Client is not a consumer and unless otherwise provided for within these Conditions or in the Scope of
                      Works, no refund is payable in any circumstances whatsoever.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Nothing in the Services constitutes any recommendations or advice from Narwhal Group regarding the
                      marketing or promotion of the Client’s products or services and any marketing campaign shall remain the
                      Client’s commercial decision in its absolute discretion.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      In no circumstances will either party be liable for any consequential or indirect damages, loss of profits,
                      or any other similar or analogous loss resulting from the provisions of the Services whether based on
                      warranty, contract, tort, negligence, in equity or any other legal theory and each parties total maximum
                      liability to the other, for a breach of these Conditions, including any breach of any indemnity, shall not
                      exceed the Fee.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The Client shall indemnify Narwhal Group for, and hold it harmless against any loss, damage, costs,
                      expenses, liability, deduction, contribution, assessment or claim (including reasonable legal costs) arising
                      in connection with any access to the Website.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Each party acknowledges that it has not relied on any representation, warranty or statement made by
                      any other party, other than as set out in this Contract.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Nothing in this Contract shall limit or exclude the liability of either party for death or personal injury
                      resulting from its negligence, fraud or fraudulent misrepresentation.
                    </MDTypography>
                  </MDBox>

                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>

              {/* 16 th one */}
              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">16. Termination </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Without prejudice to clause 3.1 above, either party may immediately terminate the Contract by giving
                      written notice to the other party if:
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (a) Any sum owing to that party by the other party under any of the provisions of the Contract is not
                      paid within 14 Business Days of the due date for payment; <br />
                    </MDTypography>

                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (b) The other party commits any other breach of any of the provisions of the Contract and, if the
                      breach is capable of remedy, fails to remedy it within 14 Business Days after being given written
                      notice giving full particulars of the breach and requiring it to be remedied;<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (c) The other party makes any voluntary arrangement with its creditors or being a company,
                      becomes subject to an administration order (within the meaning of the Insolvency Act 1986); <br />
                    </MDTypography>

                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (d) The other party, being an individual or firm, has a bankruptcy order made against it or, being a
                      company, goes into liquidation (except for the purposes of bona fide amalgamation or reconstruction and in such a manner that Narwhal Group resulting therefrom effectively agrees to
                      be bound by or assume the obligations imposed on that other party under the Contract); <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (e) Anything analogous to any of the foregoing under the law of any jurisdiction occurs in relation to
                      the other party;
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (f) That other party ceases, or threatens to cease, to carry on business; or <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (g) Control of that other party is acquired by any person or connected persons not having control of
                      that other Party on the date of the Contract. For the purposes of this Clause 16, “control” and
                      “connected persons” shall have the meanings ascribed thereto by Sections 1124 and 1122
                      respectively of the Corporation Tax Act 2010.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      For the purposes of clause 16.1.2, a breach shall be considered capable of remedy if the Party in breach
                      can comply with the provision in question in all respects.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The rights to terminate the Contract shall not prejudice any other right or remedy of either party in
                      respect of the breach concerned (if any) or any other breach.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      On termination of this Contract for any reason:
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (a) Narwhal Group shall immediately stop the performance of all Services unless expressly
                      requested otherwise in relation to all or part of the Services by the Client in writing; <br />
                    </MDTypography>

                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (b) Narwhal Group shall promptly invoice the Client for all Services performed but not yet invoiced;<br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (c) Without prejudice to any additional obligations under Narwhal Group ’s privacy notice, the
                      parties shall within five Business Days return any materials of the other party then in its
                      possession or control; <br />
                    </MDTypography>

                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (d) All rights granted to the Client under this Contract shall immediately cease; and <br />
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      (e) The Client shall ensure it removes any website reporting or software access previously provided
                      to Narwhal Group
                      <br />
                    </MDTypography>
                  </MDBox>


                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>


              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">17. Electronic Communication and Notices
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      In this clause, ‘electronic communication’ has the meaning given to that term in Electronic
                      Communications Act 2000 and the Electronic Signatures Regulations 2002.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      The parties acknowledge and agree that this Contract can be executed (including digitally or by
                      counterpart) and conveyed by electronic communication. A consent, notice or communication under this
                      Contract is effective if conveyed by electronic communication and must be sent to the parties’ contact
                      details as specified in the Scope of Works.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Each party may be required to provide an original of such agreement or counterpart as soon as
                      reasonably possible following request.
                    </MDTypography>
                  </MDBox>

                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>


              <Grid item xs={12} md={12}>
                {/* 1.2 terms & condition */}
                <MDTypography variant="text" fontWeight="bold">18. General
                </MDTypography>
                <MDBox component="ul" m={0} pl={4} mb={2}>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Relationship. The parties are independent persons and are not partners, principal and agent or
                      employer and employee and the Contract does not establish any joint venture, trust, fiduciary or other
                      relationship between them, other than the contractual relationship expressly provided for in it. None of
                      the parties shall have, nor shall represent that they have, any authority to make any commitments on
                      the other party’s behalf.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Set off. Narwhal Group shall be entitled to set-off under the Contract any liability which it has or any
                      sums which it owes to the Client under the Contract. The Client shall pay all sums that it owes to
                      Narwhal Group under the Contract without any set-off, counterclaim, deduction or withholding of any
                      kind, save as may be required by law.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Assignment. The Client may not assign, subcontract or encumber any right or obligation under the
                      Contract, in whole or in part, without Narwhal Group’s prior written consent, such consent not to be
                      unreasonably withheld or delayed.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Variation. Narwhal Group may from time to time change these Conditions without giving the Client
                      notice, but Narwhal Group will use its reasonable endeavours to inform the Client as soon as is
                      reasonably possible of any such changes.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Entire agreement. The parties agree that the Contract constitutes the entire agreement between them
                      and supersedes all previous agreements, understandings and arrangements between them, whether in
                      writing or oral in respect of its subject matter. Each party acknowledges that it has not entered into the
                      Contract in reliance on, and shall have no remedies in respect of, any representation or warranty that is
                      not expressly set out in the Contract. No party shall have any claim for innocent or negligent
                      misrepresentation on the basis of any statement in the Contract. Nothing in these Conditions purports
                      to limit or exclude any liability for fraud.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Third party rights. A person who is not a party to this Contract has no right under the Contracts (Rights
                      of Third Parties) Act 1999 to enforce this Contract, provided that this clause does not affect a right or
                      remedy of a person which otherwise exists or is available.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Waiver. No clause of this Contract will be deemed waived and no breach excused unless such waiver or
                      consent is provided in writing. A single or partial exercise of a right, power or remedy does not prevent
                      another or further exercise of that or another right, power or remedy.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Further Action. Each party must do anything reasonably necessary (including executing agreements and
                      documents) to give full effect to this Contract, including in connection with any claim or proceedings
                      brought against a part as a result of any breach of this Contract.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Liability for Expenses. Each party must pay its own expenses incurred in negotiating, executing,
                      stamping and registering this Contract.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Inconsistency. If this Contract is inconsistent with any other preceding document or agreement
                      between the parties, the Scope of Works prevails to the extent of the inconsistency.
                    </MDTypography>
                  </MDBox>
                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Counterparts. This Contract may be executed in any number of counterparts. All counterparts together
                      will be taken to constitute one instrument.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Severability. If any provision of the Contract (or part of any provision) is or becomes illegal, invalid or
                      unenforceable, the legality, validity and enforceability of any other provision of the Contract shall not
                      be affected. If any provision of the Contract (or part of any provision) is or becomes illegal, invalid or
                      unenforceable but would be legal, valid and enforceable if some part of it was deleted or modified, the
                      provision or part-provision in question shall apply with the minimum such deletions or modifications as
                      may be necessary to make the provision legal, valid and enforceable. In the event of such deletion or
                      modification, the parties shall negotiate in good faith in order to agree the terms of a mutually
                      acceptable alternative provision.
                    </MDTypography>
                  </MDBox>

                  <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                    <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                      Governing Law and jurisdiction: The Contract and any dispute or claim arising out of, or in connection
                      with, it, its subject matter or formation (including non-contractual disputes or claims) shall be governed
                      by, and construed in accordance with, the laws of England and Wales. The parties irrevocably agree that
                      the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising
                      out of, or in connection with, the Contract, its subject matter or formation (including non-contractual
                      disputes or claims)
                    </MDTypography>
                  </MDBox>


                </MDBox>

                {/* 1.2 terms & condition */}
              </Grid>

              {/* <Grid item xs={12} md={12}>
                <MDBox
                  sx={{ pl: 4 }}
                  dangerouslySetInnerHTML={{ __html: terms?.content }}
                />
              </Grid> */}
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>

  );
}

export default TermsandConditions;
