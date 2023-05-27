import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import verifyImage from '../assets/images/iconImages/emailVerify.png';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function NonVerifiedPage() {
  return (
    <>
      <Helmet>
        <title> Verify | RH - CRM </title>
      </Helmet>
      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Please verify your email
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We appreciate your cooperation in verifying your email address. Please click the button below to verify your
            email address.
          </Typography>
          <img src={verifyImage} style={{ height: 260, margin: '40px 0' }} alt="verify" />
          {/* <Button to="/" size="large" variant="contained" component={RouterLink}>
            Verify
          </Button> */}
        </StyledContent>
      </Container>
    </>
  );
}
