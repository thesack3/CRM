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
    HomeClosingDate: '',
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
    })
      .then((res) => {
        setFormData({
          firstName: '',
          email: '',
          lastName: '',
          description: '',
          phone: '',

          //      ...rest of the form fields
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('Lead Submitted!');
  };

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
        props.handleData(results.data);
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

    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {loading && <p>Loading...</p>}
      {data && <button onClick={handleFileUpload}>Upload</button>}
    </div>
  );
}

export default CsvUpload;
