// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Typography from '@mui/material/Typography';

// export default function CRMUserDashboard() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         {/* Top buttons */}
//         <Grid item xs={1}>
//           <Button variant="outlined">Leads</Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button variant="outlined">Follow-ups</Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button variant="outlined">Drips</Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button variant="outlined">Website</Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button variant="outlined">Settings</Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button variant="outlined">Marketing</Button>
//         </Grid>
//         <Grid item xs={1}>
//           <Button variant="outlined">Reporting</Button>
//         </Grid>
//         <Grid item xs={5}></Grid>

//         {/* Filters and selectors */}
//         <Grid item xs={5}>
//           <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
//               <Typography variant="subtitle1" sx={{ mr: 1 }}>Filter by</Typography>
//               <Select value="" displayEmpty>
//                 <MenuItem value="" disabled>Select</MenuItem>
//                 <MenuItem value="assigned">Assigned</MenuItem>
//               </Select>
//             </Box>
//             <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
//               <Typography variant="subtitle1" sx={{ mr: 1 }}>Filter by</Typography>
//               <Select value="" displayEmpty>
//                 <MenuItem value="" disabled>Select</MenuItem>
//                 <MenuItem value="tagged">Tagged</MenuItem>
//               </Select>
//             </Box>
//             <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
//               <Typography variant="subtitle1" sx={{ mr: 1 }}>Filter by</Typography>
//               <Select value="" displayEmpty>
//                 <MenuItem value="" disabled>Select</MenuItem>
//                 <MenuItem value="status">Status</MenuItem>
//               </Select>
//             </Box>
//           </Box>
//         </Grid>

//         <Grid item xs={6}>
//           <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//             <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
//               <Typography variant="subtitle1" sx={{ mr: 1 }}>Sort by</Typography>
//               <Select value="" displayEmpty>
//                 <MenuItem value="" disabled>Select</MenuItem>
//                 <MenuItem value="date-created">Date created</MenuItem>
//               </Select>
//             </Box>
//             <Box sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
//               <Typography variant
