import {FaExclamationTriangle} from 'react-icons/fa'
import {useRouter} from 'next/router'
import Link from 'next/link'
import styles from '../pages/NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.Notfound}>
        <FaExclamationTriangle size={'5em'} className='text-danger'/>
        <h1 className='text-danger'>404</h1>
        <p className='text-danger'>sorry, this page does not exist</p>

        <Link href='/' className='btn btn-primary'>
            Go Back
        </Link>
        
        </div>
  )
}
