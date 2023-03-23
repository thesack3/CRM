import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function EmailVerification() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { email, token } = router.query;
    setEmail(email);
    setToken(token);

    // Send a request to the server to verify the email and token
    // If the email and token are valid, setIsLoading to false
    // If the email and token are invalid, setIsError to true and setErrorMessage to the appropriate error message
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <>
      <p>Email: {email}</p>
      <p>Token: {token}</p>
      <form>
        <input type="password" placeholder="Password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default EmailVerification;
