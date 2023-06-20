// //
// import * as React from 'react';
// import {
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Typography,
//   Alert,
//   Snackbar,
// } from '@mui/material';
// import { useQuery, useMutation } from '@apollo/client';
// import { useMemo, useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
// import moment from 'moment';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import UsersActions from '../UsersActions';
// import styles from './Datagrid.module.css';
// import CellBox from '../CellBox';
// import { GET_CLIENTS } from '../../queries/clientQueres';
// import { GET_LEADS } from '../../queries/leadQueries';
// import ProfileDetailsPage from '../ProfileDetailsPage';
// import { updateLeadMutation } from '../../mutations/leadMutations';
// import { SEND_EMAILS_MUTATION } from '../../mutations/bulkEmail';
// import EditCellBox from '../CellBoxes/EdtableCellBox';
// import EmailActionModal from '../modals/EmalActionModal';
// import AddNote from '../modals/AddNote';
// import AddeAlert from '../modals/AddeAlert';
// import ProfileP from '../Profile/ProfileP';
// import CategoryBoxView from '../inputs/SearchCategory';
// import TagBoxView from '../inputs/SearchTagBoxView';
// import AddLeadModal from '../modals/AddLead';
// import AddCSVLeadModal from '../modals/AddCSVLeadModal';
// import AddTagModal from '../modals/AddTag';
// import AddCategoryModal from '../modals/AddCategory';
// import CategoryGrid from '../inputs/CategoryInput';
// import AutoSelect from '../AutoSelect';
// import { GET_CATEGORIES } from '../../queries/categoryQueries';
// import { GET_TAGS } from '../../queries/tagQueries';

// export default function DataGridProCSV(props) {
//   const [open, setOpen] = React.useState(false);

//   const [tags, setTags] = useState([]);

//   const [columnSetting, setColumnSeting] = useState([{ 0: 'true', 1: 'false', 2: 'false' }]);
//   const [refetchCategories, setRefetchCategories] = useState('');
//   const [refetchTag, setRefetchTag] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [selectedColumns, setSelectedColumns] = useState([
//     'id',
//     'firstName',
//     'email',
//     'lastName',
//     'Profile',
//     'OriginalSource',
//     'phone',
//     'phoneStatus',
//     'emailInvalid',
//     'GloballyOptedOutOfEmail',
//     'OriginalSource',
//     'BuyerAgent',
//     'GloballyoptedOutOfBuyerAgentEmail',
//     'GloballyoptedOutOfListingAgentEmail',
//     'GloballyoptedOutOfLenderEmail',
//     'GloballyoptedOutOfAlerts',
//     'OptInDate',
//     'BuyerAgentCategory',
//     'ListingAgentCategory',
//     'LenderCategory',
//     'BuyerAgent',
//     'ListingAgent',
//     'Lender',
//     'tags',
//     'OriginalCampaign',
//     'LastAgentNote',
//     'eAlerts',
//     'VisitTotal',
//     'listingviewcount',
//     'AvgListingPrice',
//     'NextCallDue',
//     'LastAgentCallDate',
//     'LastLenderCallDate',
//     'FirstVisitDate',
//     'LastVisitDate',
//     'RegisterDate',
//     'LeadType',
//     'AgentSelected',
//     'LenderOptIn',
//     'Address',
//     'City',
//     'tags',
//     'categories',
//     'State',
//     'Zip',
//     'Link',
//     'Birthday',
//     'HomeClosingDate',
//   ]);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const [gridRef, setGridRef] = useState({});
//   const [openSnack, setOpenSnack] = React.useState(false);

//   const [sendEmails, { loading: Emailsloading, error: Emailerror, data: emaildata }] =
//     useMutation(SEND_EMAILS_MUTATION);
//   const [rowSelectedUsers, setRowSelectedUsers] = useState(['dominiqmartinez13@gmail.com', 'unhashlabs@gmail.com']);
//   const [responseData, setResponseData] = useState([]);
//   const { loading: graphQLClientsLoading, error: graphQLClientsError, data, refetch } = useQuery(GET_LEADS);
//   const { loading: tagsLoading, error: tagsError, data: tagsData } = useQuery(GET_TAGS);
//   const { loading: categoriesLoading, error: categoriesError, data: categoriesList } = useQuery(GET_CATEGORIES);
//   const [updateLead, { loading }] = useMutation(updateLeadMutation);
//   console.log('tags-----------------', tagsData);
//   const updateCategories = async (list, id, type) => {

//     console.log("type------------", list);
//     const entries = list?.map((x) => x.title);
//     console.log('entries-------, ', entries);
//     if (type === 'categories') {
//       await updateLead({
//         variables: {
//           id,
//           categories: entries,
//         },
//       });
//     }
//     if (type === 'tags') {
//       await updateLead({
//         variables: {
//           id,
//           tags: entries,
//         },
//       });
//     }
//   };

//   const [pageSize, setPageSize] = useState(5);
//   const [rowId, setRowId] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleCellEditStart = (params) => {
//     console.log('Cell edit started:', params);
//     // alert(`Cell edit started: row ${params.id}, field ${params.field}`);
//   };

//   const handleCellEditCommit = (params, getRow) => {
//     console.log('Cell edit commited:', params);
//   };

//   const rows = [];

//   const handleSendEmails = async (Emails, Subject, Body) => {
//     try {
//       const { data } = await sendEmails({
//         variables: {
//           emails: Emails,
//           subject: Subject,
//           body: Body,
//         },
//       });
//       console.log(data); // do something with the returned data
//     } catch (e) {
//       console.error(e); // handle errors
//     }
//   };

//   const apiRef = React.useRef(null);

//   const handleRowSelection = (params) => {
//     const selectedEmails = params.map((id) => {
//       const row = responseData.find((r) => r.id === id);
//       return row.email;
//     });
//     setRowSelectedUsers(selectedEmails);
//   };

//   useEffect(() => {
//     if (data?.leads) {
//       // console.log(props.UserData)

//       const usersWithIds = data?.leads.map((user, index) => {
//         const Tags = user.tags.map((item, index) => {
//           return item.title;
//         });

//         const Categories = user.categories.map((item, index) => {
//           return item.title;
//         });

//         const OGTags = user.tags.map((item, index) => {
//           return item.id;
//         });

//         const OGCategories = user.categories.map((item, index) => {
//           return item.id;
//         });

//         console.log(Categories);
//         console.log(Tags);

//         // alert("user!")

//         return { ...user, Uid: index, tags: Tags, categories: Categories, ogTags: OGTags, ogCategories: OGCategories };
//       });

//       setResponseData(usersWithIds);
//     }
//   }, [data?.leads, data]);

//   const columns = useMemo(
//     () => [
//       {
//         field: 'Profile',
//         headerName: 'Profile',
//         width: 150,
//         editable: true,
//         renderCell: (params) => <ProfileDetailsPage row={params.row.Uid} {...{ params }} />,
//       },
//       { field: 'id', headerName: 'ID', width: 250, editable: true, hide: true },
//       {
//         field: 'firstName',
//         headerName: 'First Name',
//         width: 180,
//         editable: true,
//         type: 'text',
//         renderCell: (params) => (
//           <Box
//             sx={{
//               width: '100%',

//               borderTop: 'none',
//               borderBottom: 'none',
//               borderLeft: '1px solid lightgray',
//               borderRight: 'none',
//               overflow: 'hidden',
//               display: 'flex',
//               justifyContent: 'center',
//             }}
//           >
//             <CellBox successCheck={() => setOpenSnack(true)} item={1} {...{ params, rowId, setRowId }} />
//           </Box>
//         ),
//       },
//       {
//         field: 'lastName',
//         headerName: 'Last Name',
//         width: 180,
//         editable: true,
//         renderCell: (params) => (
//           <Box
//             sx={{
//               width: '100%',
//               borderTop: 'none',
//               borderBottom: 'none',
//               borderLeft: '1px solid lightgray',
//               borderRight: 'none',
//               overflow: 'hidden',
//               display: 'flex',
//               justifyContent: 'center',
//             }}
//           >
//             <CellBox item={2} {...{ params, rowId, setRowId }} />
//           </Box>
//         ),

//         hide: true,
//       },
//       {
//         field: 'email',
//         headerName: 'Email',
//         width: 250,
//         editable: true,
//         renderCell: (params) => (
//           <Box
//             sx={{
//               width: '100%',
//               height: '100%',
//               borderTop: 'none',
//               borderBottom: 'none',
//               borderLeft: '1px solid lightgray',
//               borderRight: 'none',
//               overflow: 'hidden',
//               display: 'flex',
//               justifyContent: 'center',
//             }}
//           >
//             <CellBox item={3} {...{ params, rowId, setRowId }} />
//           </Box>
//         ),
//       },
//       {
//         field: 'phone',
//         headerName: 'Phone',
//         width: 180,
//         editable: true,
//         renderCell: (params) => (
//           <Box
//             sx={{
//               width: '100%',
//               height: '100%',
//               borderTop: 'none',
//               borderBottom: 'none',
//               borderLeft: '1px solid lightgray',
//               borderRight: 'none',
//               display: 'flex',
//               justifyContent: 'center',
//             }}
//           >
//             <CellBox item={4} {...{ params, rowId, setRowId }} />
//           </Box>
//         ),

//         hide: true,
//       },
//       {
//         field: 'phoneStatus',
//         headerName: 'Phone Status',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={5} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'emailInvalid',
//         headerName: 'Email Invalid',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={6} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'GloballyOptedOutOfEmail',
//         headerName: 'GloballyOptedOutOfEmail',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={7} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'GloballyOptedOutOfBuyerAgentEmail',
//         headerName: 'GloballyOptedOutOfBuyerAgentEmail',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={8} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'GloballyOptedOutOfListingAgentEmail',
//         headerName: 'GloballyOptedOutOfListingAgentEmail',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={9} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'GloballyOptedOutOfLenderEmail',
//         headerName: 'GloballyOptedOutOfLenderEmail',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={10} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'GloballyOptedOutOfAlerts',
//         headerName: 'GloballyOptedOutOfAlerts',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={11} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'OptInDate',
//         headerName: 'OptInDate',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={12} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'BuyerAgentCategory',
//         headerName: 'BuyerAgentCategory',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={13} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'ListingAgentCategory',
//         headerName: 'ListingAgentCategory',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={14} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'LenderCategory',
//         headerName: 'LenderCategory',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={15} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'BuyerAgent',
//         headerName: 'BuyerAgent',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={16} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'ListingAgent',
//         headerName: 'ListingAgent',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={17} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'Lender',
//         headerName: 'Lender',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={18} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'OriginalSource',
//         headerName: 'OriginalSource',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={19} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'OriginalCampaign',
//         headerName: 'OriginalCampaign',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={20} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'Last Agent Note',
//         headerName: 'LastAgentNote',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={21} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'eAlerts',
//         headerName: 'E Alerts',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={22} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'VisitTotal',
//         headerName: 'Visit Total',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={23} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'listingviewcount',
//         headerName: 'Listing View Count',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={24} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'AvgListingPrive',
//         headerName: 'Avg. Listing Prive',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={25} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'NextCallDue',
//         headerName: 'Next Call Due',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={26} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'LastAgentCalDate',
//         headerName: 'LastAgentCalDate',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={27} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'LastLenderCallDate',
//         headerName: 'LastLenderCallDate',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={28} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'FirstVisitDate',
//         headerName: 'Firs tVisit Date',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={29} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'LastVisitDate',
//         headerName: 'Last Visit Date',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={30} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'RegisterDate',
//         headerName: 'RegisterDate',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={31} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'LeadType',
//         headerName: 'LeadType',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={32} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'AgentSelected',
//         headerName: 'AgentSelected',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={33} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'LenderOptIn',
//         headerName: 'Lender OptIn',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={34} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'Address',
//         headerName: 'Address',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={35} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'City',
//         headerName: 'City',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={36} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'State',
//         headerName: 'State',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={37} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'ZipCode',
//         headerName: 'Lender',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={38} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'Link',
//         headerName: 'Link',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={39} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'Birthday',
//         headerName: 'Birthday',
//         width: 120,
//         editable: true,
//         renderCell: (params) => <CellBox item={40} {...{ params, rowId, setRowId }} />,
//         hide: true,
//       },
//       {
//         field: 'HomeClosingDate',
//         headerName: 'HomeClosingDate',
//         width: 120,
//         editable: true,
//         renderCell: (params) => (
//           <Box
//             sx={{
//               width: '100%',
//               height: '100%',
//               borderTop: 'none',
//               borderBottom: 'none',
//               borderLeft: '1px solid lightgray',
//               borderRight: 'none',
//             }}
//           >
//             <CellBox item={41} {...{ params, rowId, setRowId }} />
//           </Box>
//         ),

//         hide: true,
//       },
//       {
//         field: 'tags',
//         headerName: 'Tags',
//         width: 370,
//         editable: true,
//         renderCell: (params) => (
//           <Box
//             sx={{
//               width: '100%',
//               height: '100%',
//               borderTop: 'none',
//               borderBottom: 'none',
//               borderLeft: '1px solid lightgray',
//               borderRight: 'none',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             {/* <CellBox item={42} {...{ params, rowId, setRowId }} /> */}
//             <AutoSelect
//               data={params.row}
//               type="tags"
//               label="Add Tags"
//               list={tagsData && tagsData?.tags}
//               defaultValues={params.row.tagsData?.map((x) => {
//                 return {
//                   title: x || '',
//                 };
//               })}
//               handleUpdate={(value, id, type) => updateCategories(value, id, type)}
//             />
//             {/* <TagBoxView
//               defaultValues={params.row.tags}
//               Lead={params.row}
//               successCheck={() => {
//                 console.log('hello');
//               }}
//             /> */}
//           </Box>
//         ),
//       },
//       {
//         field: 'categories',
//         headerName: 'Categories',
//         width: 370,
//         editable: true,
//         renderCell: (params) => (
//           <Box
//             sx={{
//               width: '100%',
//               height: '100%',
//               borderTop: 'none',
//               borderBottom: 'none',
//               borderLeft: '1px solid lightgray',
//               borderRight: '1px solid black',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <AutoSelect
//               data={params.row}
//               label="Add Categories"
//               type="categories"
//               list={categoriesList && categoriesList?.categories}
//               defaultValues={params.row.categories?.map((x) => {
//                 return {
//                   title: x || '',
//                 };
//               })}
//               handleUpdate={(value, id, type) => updateCategories(value, id, type)}
//             />
//             {/* <CategoryBoxView
//               defaultValues={params.row.categories}
//               Lead={params.row}
//               successCheck={() => {
//                 console.log('hello');
//               }}
//             /> */}
//           </Box>
//         ),
//       },
//       { field: 'Uid', headerName: 'UID', width: 100, editable: true, hide: true },
//     ],
//     [rowId, categoriesList, tags]
//   );

//   const handlePageSizeChange = (params) => {
//     setPageSize(params.pageSize);
//   };

//   const handleEditRowsModelChange = (params) => {
//     const updatedData = [...responseData];
//     params.forEach((cell) => {
//       const { field, id, value } = cell;
//       const row = updatedData.find((r) => r.id === id);
//       row[field] = value;
//     });

//     setResponseData(updatedData);
//   };

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const [filteredData, setFilteredData] = useState([]);
//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenSnack(false);
//   };
//   useEffect(() => {
//     const filteredRows = responseData.filter((row) => {
//       const matched = Object.values(row).some((value) => {
//         return String(value).toLowerCase().includes(searchQuery.toLowerCase());
//       });

//       const categoryMatched =
//         categories.length === 0 ||
//         categories.some((category) => {
//           return row.categories.includes(category);
//         });

//       return matched && categoryMatched;
//     });

//     setFilteredData(filteredRows);
//   }, [responseData, searchQuery, categories]);

//   // ...
//   console.log('filteredData----------------', filteredData);
//   <DataGridPro
//     rows={filteredData}
//     // ...
//   />;

//   // const handleVisibility=()=>{
//   //  const a= columns.filter((column) => selectedColumns.includes(column.field))
//   //  console.log('a-------------------', a);
//   // }
//   return (
//     <div style={{ height: 600, width: '100%' }}>
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginTop: '40px',
//         }}
//       >
//         <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
//           <AddLeadModal handleRefetch={refetch} />

//           {/* // TODO PUT BACK */}
//           <AddCSVLeadModal />
//           <AddTagModal callback={() => setRefetchTag(new Date().getTime())} />
//           <AddCategoryModal callback={() => setRefetchCategories(new Date().getTime())} />
//         </Box>

//         <Box flex>
//           <Button variant="outlined" style={{ marginRight: 16 }}>
//             Export
//           </Button>
//           <Button
//             variant="outlined"
//             disabled={rowSelectedUsers.length === 0}
//             onClick={() => handleSendEmails(rowSelectedUsers, 'Test Subject', 'This is a test email body')}
//           >
//             Send Email
//           </Button>
//         </Box>
//       </div>

//       <div style={{ height: 540, width: '100%' }}>
//         {/* DATA GRID PRO  */}
//         <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
//           <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//             Updated Lead!
//           </Alert>
//         </Snackbar>
//         <Box sx={{ position: 'relative', top: '30px', overflowX: 'scroll', width: '100%' }}>
//           <CategoryGrid remote={(e) => setCategories(e)} callback={refetchCategories} />
//         </Box>
//         <Box sx={{ height: '100%' }}>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'flex-end',
//               position: 'relative',
//               top: '60px',
//               right: '16px',
//               zIndex: '2',
//               maxWidth: '330px',
//               marginLeft: 'auto',
//             }}
//           >
//             <Typography variant="h6" style={{ marginRight: 16 }}>
//               User Fields
//             </Typography>
//             <TextField
//               size="small"
//               variant="outlined"
//               label="Search"
//               value={searchQuery}
//               onChange={handleSearchInputChange}
//             />
//           </Box>

//           <DataGridPro
//             sx={{
//               backgroundColor: '#f9fafb',
//               paddingTop: '14px',
//               paddingLeft: '14px',
//               '& .MuiDataGrid-toolbarContainer': {
//                 marginBottom: '20px',
//               },
//               '& .MuiDataGrid-columnHeaderTitleContainer': {
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               },
//             }}
//             rows={filteredData}
//             columns={columns.filter((column) => selectedColumns.includes(column.field))}
//             pageSize={pageSize}
//             disableVirtualization
//             rowHeight={70}
//             rowsPerPageOptions={[10]}
//             checkboxSelection
//             disableSelectionOnClick
//             apiRef={apiRef}
//             onSelectionModelChange={handleRowSelection}
//             onPageSizeChange={handlePageSizeChange}
//             // onCellEditCommit={(params) => setRowId(params.id)}
//             onCellEditCommit={handleCellEditCommit} // Add this line
//             onCellEditStart={handleCellEditStart} // Add this line
//             components={{ Toolbar: GridToolbar }}
//             // onColumnVisibilityModelChange={handleVisibility}
//             componentsProps={{
//               toolbar: {
//                 selectedColumns,
//                 setSelectedColumns,
//                 gridRef,
//                 setGridRef,
//               },
//             }}
//           />
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'start',
//               position: 'relative',
//               bottom: '55px',
//               marginLeft: '20px',
//             }}
//           >
//             <Typography variant="h6" sx={{ marginRight: '20px' }}>
//               Rows per page:
//             </Typography>
//             <TextField
//               size="small"
//               select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               variant="outlined"
//               style={{ width: 80 }}
//             >
//               {[5, 10, 25].map((size) => (
//                 <MenuItem key={size} value={size}>
//                   {size}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Box>
//           <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleCloseSnackbar}>
//             <Alert
//               onClose={handleCloseSnackbar}
//               severity="success"
//               sx={{ width: '90vw', backgroundColor: 'green', color: 'white' }}
//             >
//               Updated Lead!
//             </Alert>
//           </Snackbar>
//         </Box>
//       </div>
//     </div>
//   );
// }
