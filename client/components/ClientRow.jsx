import {FaTrash } from 'react-icons/fa'
import styles from './ClientRow.module.css'
import { useMutation } from '@apollo/client'
import {DELETE_CLIENT} from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQueries'




export default function ClientRow({client}) {

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id : client.id },
    // refetchQueries: [{ query: GET_CLIENTS}]
    update(cache, {data: {deleteClient}}){ 
      //get query from the cache
      const {clients} = cache.readQuery({
        query: GET_CLIENTS});
      //setting clients in cache to filter out the client with ID we want to delete
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {clients: clients.filter(client => client.id != deleteClient.id)},
        })

    }
  });
  return (
    <tr className={styles.row}>
        <td> { client.name} </td>
        <td> { client.email} </td>
        <td> { client.phone} </td>
        <td> 
            <button className='btn btn-danger brn-sm'> 

                <FaTrash onClick={deleteClient}/>

            </button>
            
             </td>
    </tr>
  )
}
