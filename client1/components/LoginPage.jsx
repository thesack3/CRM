import { useState } from 'react';
import { useMutation } from '@apollo/client';
import styles from '../components/Login.module.css'
import Solarjpg from '../public/solarHero.jpg'
import Image from 'next/image'
import {REGISTER_USER} from '../mutations/userMutations'
import {GET_USERS} from '../queries/userQueries'


export default function LoginPage() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  


  const [registerUser] = useMutation(REGISTER_USER, {
    variables: { email, password},
    update(cache, {data: {registerUser}}){
      const {users} = cache.readQuery({
        query: GET_USERS
    });
    cache.writeQuery({
        query: GET_USERS,
        data: {users: [...users, registerUser]},
    });
    }
  });






  return (
    <div className={styles.main}>
        <div className={styles.imageSection}>
          <Image className={styles.image} src={Solarjpg} alt="Picture of the author" width={500} height={500} />
          
        </div>


        <div className={styles.formSection}>
            <h4> Welcome Back! </h4>
            <h3> Login to your account </h3>
           
            <p>Email </p>
           
           <input className={styles.inputBox} type={"text"} value={email} onChange={ (e) => setEmail(e.target.value)}/>
           <p> Password </p>
           
           <input className={styles.inputBox} type={"text"} value={password} onChange={ (e) => setPassword(e.target.value)} />
             <button onClick={registerUser} className={styles.registerButton}>
                Register
             </button>
        </div>
      




        </div>
  )
}
