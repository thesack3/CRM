import {BsFillTrashFill } from 'react-icons/bs'
import {AiFillCheckCircle, AiFillSave} from 'react-icons/ai'
import { useState } from 'react'
import { Box } from '@mui/system';
import { Checkbox, CircularProgress, Fab } from '@mui/material';






function UsersActions({params, rowId, setRowId}) {


    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);


    const handleSubmit = async () => {


        console.log('submitting');
        console.log(params.id);
        const {id,} = params;
        
        setLoading(true);
        setSuccess(false);
        // GraphQL mutation to update the user
        // using the Apollo Client
        setSuccess(true);
        setLoading(false);
    };


    const handleDelete = async() => {
        setLoading(true);
        setSuccess(false);
        // GraphQL mutation to delete the user
        // using the Apollo Client
        setSuccess(true);
        setLoading(false);
    };



   return (
                    <Box
                    sx={{m:1,
                    position: 'relative'}} >
                {success ? (<Fab
                sx={{  width: 30,
                       height: 30,
                       backgroundColor: '#1cff82',   }}>
                    <AiFillCheckCircle/> 
                    </Fab>): (<Fab
                sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: '#13ff23',
                }}
                disabled={params.id !== rowId || loading}
                onClick={handleSubmit}

                >
                    <AiFillSave/> 
                    </Fab>
                    
    )}
{loading && (

<CircularProgress size={40}
sx={{
    color: '#1cff82',
    position: 'absolute',
    top: -2,
    left: -5,
    zIndex: 1,
}}/>

)}
    </Box>
  )
}

export default UsersActions