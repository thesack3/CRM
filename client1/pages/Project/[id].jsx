import {useRouter} from 'next/router'
import {useQuery} from '@apollo/client'
import {GET_PROJECT} from '../../queries/projectQueries'
import Spinner from '../../components/Spinner'
import Link from 'next/link'
import styles from './Projectdetail.module.css'

export default function Project() {
  
  const router = useRouter()
  const {query} = router;

  const id = query.id;
  const {data, loading, error} = useQuery(GET_PROJECT, {
    variables: { id }
  });


  
 if (loading) return <Spinner/>;
 if (error) return <p>Error: {error.message}</p>;


  return (
    <div>
{!loading && !error && (
  <div className={styles.ProjectDetailView}>
    <Link href="/" className={styles.backButton}>
      Back
      </Link>
      <h1>{data.project.name}</h1>
      <p>{data.project.description}</p>
      <p>{data.project.status}</p> 
     
    </div>
)}
{id}
      

    </div>
  )
}
