import Link from 'next/link';
import Layout from '../components/Layout';
import { Container, Grid, Typography } from '@mui/material';

const termsCondition = () => {
  return (
    <Layout title="Terms and Conditions">
      <Container maxWidth="md">
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <Typography variant="h1" align="center" gutterBottom>
              Terms and Conditions of Use
            </Typography>
            <Typography variant="body1">
              <br />
              Last updated September, 2023
              <br /> {'  '} If you continue to browse and use ask-quote.com you
              are agreeing to comply with and be bound by the following terms
              and conditions of use, which together with our privacy policy
              govern ask-quote.com`&apos`s relationship with you in relation to
              ask-quote.com.
              <br />
              The term &quot;ask-quote.com&quot; or &quot;us&quot; or
              &quot;we&quot; refers to the owner of the website. The term
              &quot;you&quot; refers to the user or viewer of ask-quote.com.
              <br /> The use of askquote.com is subject to the following terms
              of use:
              <br /> - The content of the pages of ask-quote.com is for your
              general information and use only. It is subject to change without
              notice.
              <br />
              - Neither we nor any third parties provide any warranty or
              guarantee as to the accuracy, timeliness, performance,
              completeness or suitability of the information and materials found
              or offered on ask-quote.com for any particular purpose. You
              acknowledge that such information and materials may contain
              inaccuracies or errors and we expressly exclude liability for any
              such inaccuracies or errors to the fullest extent permitted by
              law.
              <br />
              - Your use of any information or materials on ask-quote.com is
              entirely at your own risk, for which we shall not be liable. It
              shall be your own responsibility to ensure that any products,
              services or information available through ask-quote.com meet your
              specific requirements.
              <br />
              - ask-quote.com contains material which is owned by or licensed to
              us. This material includes, but is not limited to, the design,
              layout, look, appearance and graphics. Reproduction is prohibited
              other than in accordance with the copyright notice, which forms
              part of these terms and conditions.
              <br />- All trademarks reproduced in ask-quote.com, which are not
              the property of, or licensed to the operator, are acknowledged on
              the website.
              <br />
              - Unauthorised use of ask-quote.com may give to a claim for
              damages and/or be a criminal offence.
              <br />
              - From time to time ask-quote.com may also include links to other
              websites. These links are provided for your convenience to provide
              further information. They do not signify that we endorse the
              website(s). We have no responsibility for the content of the
              linked website(s).
              <br />- You may not create a link to ask-quote.com from another
              website or document without ask-quote.com&apos;s prior written
              consent.
              <br />
              - Your use of ask-quote.com and any dispute arising out of such
              use of the website is subject to the laws of England and Wales.
              <br />- ask-quote.com is a free service to assist homeowners in
              connecting with local service providers. All contractors/providers
              are independent and askquote.com does not warrant or guarantee any
              work performed. It is the responsibility of the homeowner to
              verify that the hired contractor furnishes the necessary license
              and insurance required for the work being performed. All persons
              depicted in a photo or video are actors or models and not
              contractors listed on ask-quote.com.
              <br />
              <Typography variant="h1" align="center" gutterBottom>
                Privacy Policy
              </Typography>
              <br /> ask-quote.com collects and uses the personal information
              that you submit online as described herein. ask-quote.com reserves
              the right to modify the terms of this policy at any time. Such
              modifications shall become effective immediately upon posting.
              Your continued use of, or registration with, ask-quote.com shall
              constitute your acceptance of these terms. If you do not agree to
              the terms of this policy, in whole or in part, you are not
              authorized to use the website and should terminate registration by
              following the opt-out instructions.
              <br />
              Please visit our dedicated{' '}
              <Link href="/privacyPolicy" passHref>
                Privacy Policy
              </Link>{' '}
              section for more detailed information.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default termsCondition;
