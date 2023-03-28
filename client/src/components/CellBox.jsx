
import {BsFillTrashFill } from 'react-icons/bs'
import {AiFillCheckCircle, AiFillSave} from 'react-icons/ai'
import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import { Checkbox, CircularProgress, Fab } from '@mui/material';

import { updateLeadMutation } from '../mutations/leadMutations';

function CellBox({params, rowId, setRowId, item }) {
  
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [highlighted, setHighlighted] = useState(false);
    const [highlightField, setHighlightField] = useState(null);


    const [arrayCell, setArrayCell] = useState([]);


    const [updateLead, { Leadloading, error, Leaddata }] = useMutation(updateLeadMutation);


    const handleUpdateLead = async (leadId, first, Email, last, Tags) => {
        try {
            setHighlighted(true);
         const result = await updateLead({
            variables: {
              id: leadId,
              firstName: first,
              email: Email,
              lastName: last,
              tags: Tags
            }
          }).then((res) => {

         
          // console.log(result.data.updateLead);
            console.log(res)
          }).catch((err) => {
            console.log("error updating lead.");
        console.log(err)
            console.log(err)
          });

     
          return result
        // return result.data.updateLead;
        } catch (error) {
          console.log("Failed updating the lead");
          console.log(error);
          return null;
        }finally{
            console.log("Lead Updated");
            setHighlighted(false);
        }
      };
      

    useEffect(() => {
        

        console.log(params.row)
        

        // TODO : ADD TAGS TO THE RENDER
        const {firstName, id, email ,
           lastName, phone, phoneStatus, 
           emailInvalid, GLoballyOptedOutOfEmail, 
           GloballyOptedOutOfBuyerAgentEmail, 
          GloballyOptedOutOfBuyerListingAgentEmail, 
          GloballyOptedOutOfLenderEmail, GloballyOptedOutOfAlerts,
          OptInDate,BuyerAgentCategory,ListingAgentCategory, 
          LenderCategory,BuyerAgent,ListingAgent,Lender,
          OriginalSource,OriginalCampaign,LastAgentNote, 
          eAlerts, VisitTotal, listingviewcount, AvgListingPrice, 
          NextCallDue, LastAgentCallDate, LastLenderCallDate, 
          FirstVisitDate, LastVisitDate, RegisterDate, LeadType, 
          AgentSelected, LenderOptIn, Address , City, State, 
          ZipCode, Link, Birthday, HomeClosingDate 
          } = params.row;


        
       handleUpdateLead(id, firstName,email , lastName ).then((res) => {
            // alert("Lead Updated")
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
                }else if (item === 4) {
                    const {phone} = params.row;
                    setHighlightField(phone);
                }else if (item === 5) {
                    const {phoneStatus} = params.row;
                    setHighlightField(phoneStatus);
                }else if (item === 6) {
                    const {emailInvalid} = params.row;
                    setHighlightField(emailInvalid);
                }else if (item === 7) {
                    const {GloballyOptedOutOfEmail} = params.row;
                    setHighlightField(GloballyOptedOutOfEmail);
                }else if (item === 8) {
                    const {GloballyOptedOutOfBuyerAgentemail} = params.row;
                    setHighlightField(GloballyOptedOutOfBuyerAgentemail);
                }else if (item === 9) {
                    const {GloballyOptedOutOfListingAgentEmail} = params.row;
                    setHighlightField(GloballyOptedOutOfListingAgentEmail);
                }else if (item === 10) {
                    const {GloballyOptedOutOfLenderEmail} = params.row;
                    setHighlightField(GloballyOptedOutOfLenderEmail);  
                }else if (item === 11) {
                    const {GloballyOptedOutOfAlerts} = params.row;
                    setHighlightField(GloballyOptedOutOfAlerts);
                }else if (item === 12) {
                    const {OptInDate} = params.row;
                    setHighlightField(OptInDate);
                }else if (item === 13) {
                    const {BuyerAgentCategory} = params.row;
                    setHighlightField(BuyerAgentCategory);
                }else if (item === 14) {
                    const {ListingAgentCategory} = params.row;
                    setHighlightField(ListingAgentCategory);
                }else if (item === 15) {
                    const {LenderCategory} = params.row;
                    setHighlightField(LenderCategory);
                }else if (item === 16) {
                    const {BuyerAgent} = params.row;
                    setHighlightField(BuyerAgent);
                }else if (item === 17) {
                    const {ListingAgent} = params.row;
                    setHighlightField(ListingAgent);
                }else if (item === 18) {
                    const {Lender} = params.row;
                    setHighlightField(Lender);  
                }else if (item === 19) {
                    const {OriginalSource} = params.row;
                    setHighlightField(OriginalSource);
                }else if (item === 20) {
                    const {OriginalCampaign} = params.row;
                    setHighlightField(OriginalCampaign);
                }else if (item === 21) {
                    const {LastAgentNote} = params.row;
                    setHighlightField(LastAgentNote); 
                }else if (item === 22) {  
                    const {eAlerts} = params.row;
                    setHighlightField(eAlerts);  
                }else if (item === 23) {  
                    const {VisitTotal} = params.row;
                    setHighlightField(VisitTotal);  
                }else if (item === 24) {  
                    const {listingviewcount} = params.row;
                    setHighlightField(listingviewcount);
                }else if (item === 25) {
                    const {AvgListingPrive} = params.row;
                    setHighlightField(AvgListingPrive); 
                }else if (item === 26) {
                    const {NextCallDue} = params.row;
                    setHighlightField(NextCallDue); 
                }else if (item === 27) {
                    const {LastAgentCalDate} = params.row;
                    setHighlightField(LastAgentCalDate);
                }else if (item === 28) {
                    const {LastLenderCallDate} = params.row;
                    setHighlightField(LastLenderCallDate);
                }else if (item === 29) {
                    const {FirstVisitDate} = params.row;
                    setHighlightField(FirstVisitDate);
                }else if (item === 30) {
                    const {LastVisitDate} = params.row;
                    setHighlightField(LastVisitDate);
                }
                else if (item === 31) {
                  const {RegisterDate} = params.row;
                  setHighlightField(RegisterDate);
                }
                else if (item === 32) {
                  const {LeadType} = params.row;
                  setHighlightField(LeadType);
                }
                else if (item === 33) {
                  const {AgentSelected} = params.row;
                  setHighlightField(AgentSelected);
                }
                  else if (item === 34) {
                    const {LenderOptIn} = params.row;
                    setHighlightField(LenderOptIn);
                }
                else if (item === 35) {
                  const {Address} = params.row;
                  setHighlightField(Address);
                }
                else if (item === 36) {
                              const {City} = params.row;
                              setHighlightField(City);
                 }
               else if (item === 37) {
                            const {State} = params.row;
                            setHighlightField(State);
                }    
                 else if (item === 38) {
                          const {ZipCode} = params.row;
                        setHighlightField(ZipCode);
                }     
                else if (item === 39) {
                          const {Link} = params.row;
                          setHighlightField(Link);
                }      
                else if (item === 40) {
                        const {Birthday} = params.row;
                        setHighlightField(Birthday);
                    }    
                  else if (item === 41) {
                      const {HomeClosingDate} = params.row;
                      setHighlightField(HomeClosingDate);
                  }else if (item === 42) {
                      const {tags} = params.row;
                      
                      if (tags != null && tags.length > 0) {
                        // console.log(tags)
                        // alert("Tags!")
                        
    
                        const tagsArray = tags.map((tag) => {
                            return tag.title;
                            }
                        )

                        setArrayCell(tagsArray);


                        
                      }else{ 
                        // setHighlightField("No Tags");
                      }



                  }
                  else if (item === 43) {
                    const {categories} = params.row;
                    
                    if (categories != null && categories.length > 0) {

                        console.log(categories)
                        // alert("Categories!")


                  
                      const categoriesArray = categories.map((category) => {
                        return category.title;
                        } )

                        setArrayCell(categoriesArray);
                      
                    }else{ 
                    //   setHighlightField("No Categories");
                    }



                }
    
                }).catch((err) => {
            console.log(err)
         })

      return () => {
        
      }
    }, [params.value])


  
    const handleMouseEnter = () => {
        // handleSubmit();
    };
  
    const handleMouseLeave = () => {


        
        setSuccess(true);
        // handleSubmit();
 
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
             backgroundColor: highlighted ? '#8effb1' : '#00000',
           // backgroundColor: highlighted ? '#00000' : '#00000',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'background-color 0.5s ease-in-out',
        }}
      >
        {item === 42 || 43 ?  (

            <Box sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>

        {arrayCell.map((tag) => (
            <Box sx={{fontWeight: 'bold'}}> 
                 <p style={{padding: '5px'}}> {tag} </p>
                </Box>
           
        ))}

            </Box>

         
        ) : (
          null
        )}

        {item !== 42 || 43 ?  (    <p> {highlightField} </p>): (null)}




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



export default React.memo(CellBox);








