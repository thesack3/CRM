import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
// @mui

import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useMutation } from '@apollo/client';

import { REGISTER_USER } from '../../../mutations/userMutations';
import { GET_USERS } from '../../../queries/userQueries';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function Signupform() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_USER, {
    variables: { email, password },
    update(cache, { data: { registerUser } }) {
      const { users } = cache.readQuery({
        query: GET_USERS,
      });
      cache.writeQuery({
        query: GET_USERS,
        data: { users: [...users, registerUser] },
      });
    },
  });

  const handleClick = () => {
    // navigate('/dashboard', { replace: true });
    // navigate('/verify', { replace: true });
    navigate('/nonverified', { replace: true });

    registerUser({ variables: { email, password } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(email)
    // console.log(password)
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} name="email" label="Email address" />

        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Register
      </LoadingButton>
    </>
  );
}
