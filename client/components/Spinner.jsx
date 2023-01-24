
import styles from '../components/Spinner.module.css'
import {DotLoader} from 'react-spinners'

export default function Spinner() {
  return (
    <div className={styles.spinner}>


<div className={styles.SpinnerBoarder}>
    

    <span> 
    <DotLoader/>
    </span>
</div>

    </div>
  )
}
