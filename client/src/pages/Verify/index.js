import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import { VERIFY_EMAIL } from '../../mutations/userMutations';
import { setAlert } from '../../redux/slice/alertSlice';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function VerifyPage() {
  const dispatch = useDispatch();
  const { token } = useParams();
  const navigate = useNavigate();

  const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL);
  const handleVerify = async () => {
    try {
      if (!token) return;
      const { data } = await verifyEmail({ variables: { token } });
      if (data?.verifyEmail?.emailVerified) {
        dispatch(setAlert({ type: 'info', message: 'Your email has been verified, please login ' }));
      }
      navigate('/login', { replace: true });
    } catch (error) {
      dispatch(setAlert({ type: 'error', message: error.message }));
    }
  };

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
          <Box
            component="img"
            src="/assets/Images/covers/cover_3.jpg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
          <Button size="large" variant="contained" onClick={() => handleVerify()}>
            Verify
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
