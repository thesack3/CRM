import  { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useParams, useLocation} from 'react-router-dom';
// @muis
import { useMutation } from '@apollo/client';
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
import { VERIFY_EMAIL } from '../../mutations/userMutations';


// ----------------------------------------------------------------------


const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


// ----------------------------------------------------------------------

export default function VerifyPage({ userToken }) {
  const { token } = useParams();

const [verifyEmail, { data, loading, error }] = useMutation(VERIFY_EMAIL);

 const [tokenKey, setTokenKey] = useState(null);
    

  //  The example url format being queried would be:s
  
  useEffect(() => {


    setTokenKey(token);

    if(tokenKey){
      alert(tokenKey);
    }


    if (userToken) {
      const tokenParts = userToken.split('.');
      if (tokenParts.length === 3) {
        const decodedToken = JSON.parse(atob(tokenParts[1]));
        setTokenKey(decodedToken._id);
        alert(decodedToken._id);
       
      }
    }
   

      
      
  }, [verifyEmail, userToken]);



  const VerifyEmail = ({ userToken }) => {


alert("Verifying email!");
    alert(userToken);


    verifyEmail({
      variables: {
        tokenKey,
      },
    }).then((res) => {
      console.log(res);
      alert(res);
    }).catch((err) => {
      console.log(err);
      alert(err);
    });


  }




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
            We appreciate your cooperation in verifying your email address. Please click the button below to verify your email address.
          </Typography>

          <Box
            component="img"
            src="/assets/Images/covers/cover_3.jpg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/" size="large" variant="contained" component={RouterLink} onClick={VerifyEmail}>
            Verify
          </Button>
        </StyledContent>
      </Container>
    </>
  );
}
