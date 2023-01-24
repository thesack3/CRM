import { useState } from "react"
import {FaUser} from 'react-icons/fa'
import {useMutation} from '@apollo/client'
import { Button,  Modal} from 'react-bootstrap'
import {ADD_CLIENT} from '../mutations/clientMutations'
import { GET_CLIENTS } from "../queries/clientQueries"
import styles from '../components/AddClients.module.css'




export default function AddClientModal() {

    //Input fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const [addClient] = useMutation(ADD_CLIENT, {

        variables: {name, email, phone},
        update(cache, {data: {addClient}}){
            const {clients} = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {clients: [...clients, addClient]},
            });
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();


        if(!name || !email || !phone){
            alert('Please fill in all fields')
        }
        addClient(name, email, phone);
        setName('');
        setEmail('');
        setPhone('');
        console.log(name, email, phone);
    };




    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
       Add Lead
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Lead</Modal.Title>
      </Modal.Header>
      <Modal.Body>




        I will not close if you click outside me. Don't even try to press

      <form>

      <div className={styles.formRow}>
            <label className={styles.label}>
                    Name
                    </ label>
                    <input value={name} onChange={(e)=> setName(e.target.value)} className={styles.input} type={"text"}/>
                  
      </div>
      <div className={styles.formRow}>

            <label className={styles.label}>
                    Email
                    </ label>
                    <input value={email} onChange={(e)=> setEmail(e.target.value)} className={styles.input} type={"text"}/>
              
      </div>

          <div className={styles.formRow}>

                    <label className={styles.label}>
                        Phone Number
                    </label>
                    <input value={phone} onChange={(e)=> setPhone(e.target.value)} className={styles.input} type={"text"}/>
                </div>

<div className={styles.submitButton}>
     <Button type="submit" onClick={onSubmit}> Submit</Button>
</div>

             
      </form>


     
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Import CSV</Button>
      </Modal.Footer>
    </Modal>
  </>
  
  )
}
