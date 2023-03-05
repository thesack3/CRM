import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Papa from 'papaparse';

import { ADD_LEAD } from '../../mutations/leadMutations';


// const CsvUpload = (props) => {
  


function CsvUpload(props) {


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    lastName: '',
    description: '',
    phone: '',
    phoneStatus: '',
    emailInvalid: '',
    GloballyOptedOutOfEmail: '',
    GloballyOptedOutOfBuyerAgentEmail: '',
    GloballyOptedOutOfListingAgentEmail: '',
    GloballyOptedOutOfLenderEmail: '',
    GloballyOptedOutOfAlerts: '',
    OptInDate: '',
    BuyerAgentCategory: '',
    ListingAgentCategory: '',
    LenderCategory: '',
    BuyerAgent: '',
    ListingAgent: '',
    Lender: '',
    OriginalSource: '',
    OriginalCampaign: '',
    LastAgentNote: '',
    eAlerts: '',
    VisitTotal: '',
    listingviewcount: '',
    AvgListingPrice: '',
    NextCallDue: '',
    LastAgentCallDate: '',
    LastLenderCallDate: '',
    FirstVisitDate: '',
    LastVisitDate: '',
    RegisterDate: '',
    LeadType: '',
    AgentSelected: '',
    LenderOptIn: '',
    Address: '',
    City: '',
    State: '',
    ZipCode: '',
    Tags: '',
    Link: '',
    Birthday: '',
    HomeClosingDate: ''
  });


  const [addLead, { Leadloading, error, Leaddata }] = useMutation(ADD_LEAD);


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
  
    });
  };





  const handleLeadSubmit = (e) => {
    e.preventDefault();

    //    Loop through the data and submit each lead
    //     using the Apollo Client

    addLead({
      variables: formData,
    }).then((res) => {
      setFormData({
        firstName: '',
        email: '',
        lastName: '',
        description: '',
        phone: '',
        
        //      ...rest of the form fields
      });
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });


    console.log("Lead Submitted!");
  }



  const handleFileUpload = (event) => {
   //  alert('File uploaded!');
    const file = event.target.files[0];
    setLoading(true);
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
      //  console.log(results.data);
        props.handleData(results.data)
    
      },
    });
  };

  const handleUpload = () => {
    setLoading(true);

    // Check Uploaded EALERTS

    data.forEach((lead) => {
      console.log(lead);
    });
    alert('File uploaded!');
  
    // UPLOAD LEADS TO DATABASE: 

    // ============
    // data.forEach((lead) => {
    //   addLead({
    //     variables: {
    //       firstName: lead.firstName,
    //       email: lead.email,
    //       lastName: lead.lastName,
    //       description: lead.description,
    //       phone: lead.phone,
    //       phoneStatus: lead.phoneStatus,
    //       emailInvalid: lead.emailInvalid,
    //       GloballyOptedOutOfEmail: lead.GloballyOptedOutOfEmail,
    //       GloballyOptedOutOfBuyerAgentEmail: lead.GloballyOptedOutOfBuyerAgentEmail,
    //       GloballyOptedOutOfListingAgentEmail: lead.GloballyOptedOutOfListingAgentEmail,
    //       GloballyOptedOutOfLenderEmail: lead.GloballyOptedOutOfLenderEmail,
    //       GloballyOptedOutOfAlerts: lead.GloballyOptedOutOfAlerts,
    //       OptInDate: lead.OptInDate,
    //       BuyerAgentCategory: lead.BuyerAgentCategory,
    //       ListingAgentCategory: lead.ListingAgentCategory,
    //       LenderCategory: lead.LenderCategory,
    //       BuyerAgent: lead.BuyerAgent,
    //       ListingAgent: lead.ListingAgent,
    //       Lender: lead.Lender,
    //       OriginalSource: lead.OriginalSource,
    //       OriginalCampaign: lead.OriginalCampaign,
    //       LastAgentNote: lead.LastAgentNote,
    //       eAlerts: lead.eAlerts,
    //       VisitTotal: lead.VisitTotal,
    //       listingviewcount: lead.listingviewcount,
    //       AvgListingPrice: lead.AvgListingPrice,
    //       NextCallDue: lead.NextCallDue,
    //       LastAgentCallDate: lead.LastAgentCallDate,
    //       LastLenderCallDate: lead.LastLenderCallDate,
    //       FirstVisitDate: lead.FirstVisitDate,
    //       LastVisitDate: lead.LastVisitDate,
    //       RegisterDate: lead.RegisterDate,
    //       LeadType: lead.LeadType,
    //       AgentSelected: lead.AgentSelected,
    //       LenderOptIn: lead.LenderOptIn,
    //       Address: lead.Address,
    //       City: lead.City,
    //       State: lead.State,
    //       ZipCode: lead.ZipCode,
    //       Tags: lead.Tags,
    //       Link: lead.Link,
    //       Birthday: lead.Birthday,
    //       HomeClosingDate: lead.HomeClosingDate
    //     }
    //   }).then((res) => {
    //     console.log(res);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // });
  
    setLoading(false);
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {loading && <p>Loading...</p>}
      {data && (
        <button onClick={handleFileUpload}>
          Upload
        </button>
      )}
    </div>
  );
};

export default CsvUpload;
