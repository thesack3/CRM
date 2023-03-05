
import {BsFillTrashFill } from 'react-icons/bs'
import {AiFillCheckCircle, AiFillSave} from 'react-icons/ai'
import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { Checkbox, CircularProgress, Fab } from '@mui/material';

import { updateLeadMutation } from '../mutations/leadMutations';


function CellBox({params, rowId, setRowId, item }) {
  
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [highlighted, setHighlighted] = useState(false);
    const [highlightField, setHighlightField] = useState(null);



    const [updateLead, { Leadloading, error, Leaddata }] = useMutation(updateLeadMutation);
    const handleUpdateLead = async (leadId, first, Email, last) => {
        try {
         const result = await   updateLead({
            variables: {
              id: leadId,
              firstName: first,
              email: Email,
              lastName: last
            }
          });
      
          console.log("Lead Updated");
          console.log(result.data.updateLead);
      
        //   let updatedField = '';
        //   if (first !== params.row.firstName) {
        //     updatedField = 'firstName';
        //   } else if (last !== params.row.lastName) {
        //     updatedField = 'lastName';
        //   } else if (Email !== params.row.email) {
        //     updatedField = 'email';
        //   }
          
        //   setHighlightField(result.data.updateLead[updatedField]);
          
      
        return result.data.updateLead;
        } catch (error) {
          console.log("Failed updating the lead");
          console.log(error);
          return null;
        }
      };
      

    useEffect(() => {

        console.log(params.row)
        const {firstName, id, email , lastName} = params.row;

        handleUpdateLead(id, firstName,email , lastName ).then((res) => {
           //  alert("Lead Updated")
            console.log("Lead Updated")
                 console.log(res)

                 if (item === 1) {
                    const {firstName} = params.row;
                    setHighlightField(firstName);
                }else if (item === 2) {
                    const {lastName} = params.row;
                    setHighlightField(lastName);
                }else if (item === 3) {
                    const {email} = params.row;
                    setHighlightField(email);
                }


               
        }).catch((err) => {
            console.log(err)
        })






        // if (item === 1) {

       

        // }else if (item === 2) {
        //     const {lastName} = params.row;
        //     setHighlightField(lastName);
        // }else if (item === 3) {
        //     const {email} = params.row;
        //     setHighlightField(email);
        // }else if (item === 4) {
        //     const {phone} = params.row;
        //     setHighlightField(phone);
        // }else if (item === 5) {
        //     const {phoneStatus} = params.row;
        //     setHighlightField(phoneStatus);
        // }else if (item === 6) {
        //     const {emailInvalid} = params.row;
        //     setHighlightField(emailInvalid);
        // }else if (item === 7) {
        //     const {GloballyOptedOutOfEmail} = params.row;
        //     setHighlightField(GloballyOptedOutOfEmail);
        // }else if (item === 8) {
        //     const {GloballyOptedOutOfBuyerAgentemail} = params.row;
        //     setHighlightField(GloballyOptedOutOfBuyerAgentemail);
        // }else if (item === 9) {
        //     const {GloballyOptedOutOfLenderEmail} = params.row;
        //     setHighlightField(GloballyOptedOutOfLenderEmail);
        // }else if (item === 10) {
        //     const {GloballyOptedOutOfAlerts} = params.row;
        //     setHighlightField(GloballyOptedOutOfAlerts);
        // }
      
    
      return () => {
        
      }
    }, [])



    


    const [ActiveItem, setActiveItem] = useState(item);
  
    const handleMouseEnter = () => {
        // handleSubmit();
    };
  
    const handleMouseLeave = () => {


        
        setSuccess(true);
        handleSubmit();
 
    };


    const handleInputChange = (event) => {
        const newValue = event.target.value;
        handleSubmit(newValue);
      };

const handleSubmit = async () => {
    setHighlighted(true);
    setLoading(true);
    setSuccess(false);

    const { id, firstName, email, lastName } = params.row;

    let updatedField = '';
    if (item === 1) {
      updatedField = 'firstName';
    } else if (item === 2) {
      updatedField = 'lastName';
    } else if (item === 3) {
      updatedField = 'email';
    }

    try {
      const result = await handleUpdateLead(id, firstName, email, lastName);
      console.log("Lead Updated");
      console.log(result);
      setHighlightField(result.data.updateLead[updatedField]);
      setSuccess(true);
    } catch (error) {
      console.log("Failed updating the lead");
      console.log(error);
      setSuccess(false);
    }

    setLoading(false);
    setTimeout(() => {
      setHighlighted(false);
    }, 400);
};

    // const handleSubmit = async () => {

    //     setHighlighted(true);
    //     //   handleMouseEnter();
    
    //     console.log('submitting');
    //     // console.log(params);
    //     // console.log(params.row);
    //     // DEPENDING ON WHICH FIELD ID IS CLICKED, IT WILL RETURN THE VALUE OF THAT FIELD


    //     const {id, State, Birthday, firstName} = params.row;

    //     if (item === 1) {
    //         const {firstName} = params.row;
    //         //  alert(firstName);
    //         setHighlightField(firstName);
    //     }else if (item === 2) {
    //         const {lastName} = params.row;
    //         setHighlightField(lastName);
    //     }else if (item === 3) {
    //         const {email} = params.row;
    //         setHighlightField(email);

    //     }

    //     console.log(id);
    //     console.log(State);
    //     console.log(Birthday);
    //     console.log(firstName);


        
    //     // setLoading(true);
    //     // setSuccess(false);
    //     // // GraphQL mutation to update the user
    //     // // using the Apollo Client
    //     // setSuccess(true);
    //     // setLoading(false);

    //     setTimeout(() => {
    //         setHighlighted(false)
    //       }, 400);
      
         
    // };

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
            backgroundColor: highlighted ? '#8effb1' : '#00000',

            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'background-color 0.5s ease-in-out',
        }}
      >
        {success ? (

         
<p> {highlightField} </p>
        ) : (
            <p> {highlightField} </p>
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

export default CellBox;






