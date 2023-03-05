
import {BsFillTrashFill } from 'react-icons/bs'
import {AiFillCheckCircle, AiFillSave} from 'react-icons/ai'
import { useState } from 'react'
import { Box } from '@mui/system';
import { Checkbox, CircularProgress, Fab } from '@mui/material';


function UsersActions({params, rowId, setRowId}) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [highlighted, setHighlighted] = useState(false);
  
    const handleMouseEnter = () => {
      setHighlighted(true);
    };
  
    const handleMouseLeave = () => {
      setHighlighted(false);
    };

    const handleSubmit = async () => {
        console.log('submitting');
        // console.log(params);
        console.log(params.row);
        const {id, State, Birthday} = params.row;
        console.log(id);
        console.log(State);
        console.log(Birthday);


        
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
            m:1,
            position: 'relative',
            backgroundColor: highlighted ? '#1cff82' : '#00000',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'background-color 0.5s ease-in-out',
        }}
      >
        {success ? (
            <Fab
                sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: '#1cff82',
                }}
            >
                <AiFillCheckCircle/> 
            </Fab>
        ) : (
            <Fab
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
            <CircularProgress
                size={40}
                sx={{
                    color: '#1cff82',
                    position: 'absolute',
                    top: -2,
                    left: -5,
                    zIndex: 1,
                }}
            />
        )}
    </Box>
  );
}

export default UsersActions;







// function UsersActions({params, rowId, setRowId}) {


//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState(false);

//         const [highlighted, setHighlighted] = useState(false);
      
//         const handleMouseEnter = () => {
//           setHighlighted(true);
//         };
      
//         const handleMouseLeave = () => {
//           setHighlighted(false);
//         };
      


//     const handleSubmit = async () => {


//         console.log('submitting');
//         console.log(params);
//         console.log(params.id);
//         const {id,} = params;
        
//         setLoading(true);
//         setSuccess(false);
//         // GraphQL mutation to update the user
//         // using the Apollo Client
//         setSuccess(true);
//         setLoading(false);







        
//     };


//     const handleDelete = async() => {
//         setLoading(true);
//         setSuccess(false);
//         // GraphQL mutation to delete the user
//         // using the Apollo Client
//         setSuccess(true);
//         setLoading(false);
//     };



//    return (
//               <Box
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                 sx={{
//                     m:1,
//                     position: 'relative',
//                     backgroundColor: highlighted ? '#1cff82' : '#00000',
//                     height: '100%',
//                     width: '100%',
//                     display: 'flex',
//                    justifyContent: 'center',
//                     alignItems: 'center',
                    
//                     }} >
//                 {success ? (<Fab
//                 sx={{  width: 30,
//                        height: 30,
//                        backgroundColor: '#1cff82',   }}>
//                     <AiFillCheckCircle/> 
//                     </Fab>): (<Fab
//                 sx={{
//                     width: 30,
//                     height: 30,
//                     backgroundColor: '#13ff23',
//                 }}
//                 disabled={params.id !== rowId || loading}
//                 onClick={handleSubmit}

//                 >
//                     <AiFillSave/> 
//                     </Fab>
                    
//     )}
// {loading && (

// <CircularProgress size={40}
// sx={{
//     color: '#1cff82',
//     position: 'absolute',
//     top: -2,
//     left: -5,
//     zIndex: 1,
// }}/>

// )}
//     </Box>
//   )
// }

// export default UsersActions