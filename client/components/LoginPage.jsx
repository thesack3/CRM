import styles from '../components/Login.module.css'

export default function LoginPage() {
  return (
    <div className={styles.main}>
        <div className={styles.imageSection}>
            Image
        </div>


        <div className={styles.formSection}>
            <h4> Welcome Back! </h4>
            <h3> Login to your account </h3>
            <p> Full Name </p>
           
            <input className={styles.inputBox} type={"text"}/>
            <p>Email </p>
           
           <input className={styles.inputBox} type={"text"}/>
           <p> Role </p>
           
           <input className={styles.inputBox} type={"text"}/>
             <button className={styles.registerButton}>
                Register
             </button>
        </div>
      




        </div>
  )
}
