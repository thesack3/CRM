
// export default function DataGridProCSV(props) {

//     const [selectedColumns, setSelectedColumns] = useState(['id', 'firstName', 'email', 'lastName', 'Profile']);
  
//     const [gridRef, setGridRef] = useState({});
  
//     const [count, setCount] = useState(0);

//     const [sendEmails, { Emailsloading, Emailerror, emaildata }] = useMutation(SEND_EMAILS_MUTATION);
  
//     const [ rowSelectedUsers, setrowSelectedUsers] = useState(['dominiqmartinez13@gmail.com', 'unhashlabs@gmail.com'])
  
//     const [ChartData,setData] = useState(props.data)
//     const { loading, error, graphQLClients} = useQuery(GET_LEADS)
//     const [ResponseData, setResponseData] = useState(null);
//     const { data } = useDemoData({
//       dataSet: 'Commodity',
//       rowLength: 100000,
//       editable: true,
//     });
  
//     const rows = [
   
//     ];
  
//     const handleSendEmails = async (Emails, Subject, Body) => {
//       try {
//         const { data } = await sendEmails({
//           variables: {
//             emails: Emails,
//             subject: Subject,
//             body: Body,
    
//           },
//         });
//         console.log(data); // do something with the returned data
//       } catch (e) {
//         console.error(e); // handle errors
//       }
//     };

  
//     // const gridRef = React.useRef(null);
  
//     const handleRowSelection = (params) => {
  
//       const selectedEmails = params.map((id) => {
//         const row = ResponseData.find((r) => r.id === id);
//         return row.email;
      
//       });
  
//       console.log(selectedEmails)
//       setrowSelectedUsers(selectedEmails);
  
  
  
//     };
    
  
  
//     React.useEffect(() => {
  
//       if(props.UserData){ 
//           // console.log(props.UserData)
          
     
//         const usersWithIds = props.UserData.map((user, index) => {
//           return { ...user, Uid: index};
//         });

//         setResponseData(usersWithIds)
//     }
//         else{
//           setResponseData(rows)
//         }
//     }, [props.UserData, rows])
//       const [pageSize , setpageSize] = useState(5);
//       const [rowId, setRowId ]= useState(null)
//           const columns = useMemo(
//             () => [
//               // {field: 'Actions', headerName: 'actions', width: 130, renderCell: (params) =>  <UsersActions{...{params, rowId, setRowId}}/>},
//               {field: 'Profile', headerName: 'Profile', width: 150,  editable: true, renderCell: (params) =>  <ProfileDetailsPage row={params.row.Uid} {...{params }}   />},
//               {field: 'id', headerName: 'ID', width: 250,  editable: true},
//               {field: 'firstName', headerName: 'First Name', width: 180,  editable: true, renderCell: (params) =>  <CellBox item={1} {...{params, rowId, setRowId }}/>},
//               {field: 'lastName', headerName: 'last Name', width: 180,  editable: true, renderCell: (params) =>  <CellBox item={2} {...{params, rowId, setRowId }}/>},
//               //  {field: 'firstName', headerName: 'firstName', width: 120,  editable: true},
//               {field: 'email', headerName: 'email', width: 250,  editable: true , renderCell: (params) =>  <CellBox item={3} {...{params, rowId, setRowId }}/>},
//               {field: 'phone', headerName: 'phone', width: 180,  editable: true , renderCell: (params) =>  <CellBox item={4} {...{params, rowId, setRowId }}/>},
//               {field: 'phoneStatus', headerName: 'phoneStatus', width: 120,  editable: true , renderCell: (params) =>  <CellBox item={5} {...{params, rowId, setRowId }}/>},
//               {field: 'emailInvalid', headerName: 'emailInvalid', width: 120,  editable: true , renderCell: (params) =>  <CellBox item={6} {...{params, rowId, setRowId }}/>},
//               {field: 'GloballyOptedOutOfEmail', headerName: 'GloballyOptedOutOfEmail', width: 120,  editable: true , renderCell: (params) =>  <CellBox item={7} {...{params, rowId, setRowId }}/>},
//               {field: 'GloballyOptedOutOfBuyerAgentEmail', headerName: 'GloballyOptedOutOfBuyerAgentEmail', width: 120,  editable: true , renderCell: (params) =>  <CellBox item={8} {...{params, rowId, setRowId }}/>},
//               {field: 'GloballyOptedOutOfLenderEmail', headerName: 'GloballyOptedOutOfLenderEmail', width: 120,  editable: true , renderCell: (params) =>  <CellBox item={9} {...{params, rowId, setRowId }}/>},
//               {field: 'GloballyOptedOutOfAlerts', headerName: 'GloballyOptedOutOfAlerts', width: 120,  editable: true , renderCell: (params) =>  <CellBox item={10} {...{params, rowId, setRowId }}/>},
//               {field: 'OptInDate', headerName: 'OptInDate', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={11} {...{params, rowId, setRowId }}/>},
//               {field: 'BuyerAgentCategory', headerName: 'BuyerAgentCategory', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={13} {...{params, rowId, setRowId }}/>},
//               {field: 'ListingAgentCategory', headerName: 'ListingAgentCategory', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={15} {...{params, rowId, setRowId }}/>},
//               {field: 'LenderCategory', headerName: 'LenderCategory', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={16} {...{params, rowId, setRowId }}/>},
//               {field: 'BuyerAgent', headerName: 'BuyerAgent', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={17} {...{params, rowId, setRowId }}/>},
//               {field: 'Lender', headerName: 'Lender', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={18} {...{params, rowId, setRowId }}/>},
//               {field: 'ListingAgent', headerName: 'ListingAgent', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={19} {...{params, rowId, setRowId }}/>},
//               {field: 'OriginalSource', headerName: 'OriginalSource', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={20} {...{params, rowId, setRowId }}/>},
//               {field: 'OriginalCampaign', headerName: 'OriginalCampaign', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={21} {...{params, rowId, setRowId }}/>},
//               {field: 'LastAgentNote', headerName: 'LastAgentNote', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={22} {...{params, rowId, setRowId }}/>},
//               {field: 'eAlerts', headerName: 'eAlerts', width: 120,  editable: true, renderCell: (params) =>  <CellBox item={23} {...{params, rowId, setRowId }}/>},
//               {field: 'VisitTotal', headerName: 'VisitTotal', width: 120,  editable: true},
//               {field: 'listingviewcount', headerName: 'listingviewcount', width: 120,  editable: true},
//               {field: 'AvgListingPrice', headerName: 'AvgListingPrice', width: 120,  editable: true},
//               {field: 'NextCallDue', headerName: 'NextCallDue', width: 120,  editable: true},
//               {field: 'LastAgentCallDate', headerName: 'LastAgentCallDate', width: 120,  editable: true},
//               {field: 'LastLenderCallDate', headerName: 'LastLenderCallDate', width: 170,  editable: true},
//               {field: 'FirstVisitDate', headerName: 'FiFirstVisitDate', width: 160,  editable: true},
//               {field: 'LastVisitDate', headerName: 'LastVisitDate', width: 120,  editable: true},
//               {field: 'RegisterDate', headerName: 'RegisterDate', width: 120,  editable: true},
//               {field: 'LeadType', headerName: 'LeadType', width: 120,  editable: true},
//               {field: 'AgentSelected', headerName: 'Last AgentSelected', width: 170,  editable: true},
//               {field: 'LenderOptIn', headerName: 'LenderOptIn', width: 120,  editable: true},
//               {field: 'Address', headerName: 'Address', width: 120,  editable: true},
//               {field: 'City', headerName: 'City', width: 120,  editable: true},
//               {field: 'State', headerName: 'State', width: 120,  editable: true},
//               {field: 'ZipCode', headerName: 'ZipCode', width: 120,  editable: true},
//               {field: 'Tags', headerName: 'Tags', width: 120,  editable: true},
//               {field: 'Link', headerName: 'Link', width: 120,  editable: true},
//               {field: 'Birthday', headerName: 'Birthday', width: 120,  editable: true},
//               {field: 'HomeClosingDate', headerName: 'Home Closing Date', width: 160,  editable: true},
           
//          ], [rowId])
  
//         //  / Define your filter options
//          const filterOptions = [
//            { value: 'firstName', label: 'First Name' },
//            { value: 'lastName', label: 'Last Name' },
//            { value: 'age', label: 'Age' },
//          ];
         
  
  
//     return (
//       <Box sx={{ height: 520, width: '100%'}}>
  
//       <Box sx={{display: 'flex', flexDirection:'row'}}>
  
//       <EmailActionModal Massemails={rowSelectedUsers}/>
  
//       <AddNote/>
  
//       <AddeAlert/>
  
  
//   </Box>
  

  
//   <Box sx={{margin: '20px'}}> 
  
  
//   <FormControl>
//           <InputLabel>Filtered Columns</InputLabel>
//           <Select
//             multiple
//             value={selectedColumns}
//             onChange={(e) => setSelectedColumns(e.target.value)}
//             renderValue={(selected) => selected.join(', ')}
//           >
//             {columns.map((column) => (
//               <MenuItem key={column.field} value={column.field}>
//                 {column.headerName}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
  
//   </Box>
  
  
//   {/* <AddCSVCall/> */}
//         {ResponseData?(
//         <DataGridPro
//           ref={(grid) => setGridRef(grid)}
//           onSelectionModelChange={handleRowSelection}
//           columns={columns.filter((c) => selectedColumns.includes(c.field))}
//           rows={ResponseData} 
//           rowHeight={50}
//           onCellEditCommit={(params) => setRowId(params.id)}
//           checkboxSelection
//           disableSelectionOnClick
          
//         />): ( <div>No Data</div>)}
   
//       </Box>
//     );
//   }
  
  
  
  
  
  
  
  
  