// // mySlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const mySlice = createSlice({
//   name: 'mySlice',
//   initialState: {
//     loading: false,
//     error: null,
//     data: null,
//   },
//   reducers: {
//     startMutation: (state) => {
//       state.loading = true;
//       state.error = null;
//       state.data = null;
//     },
//     mutationSuccess: (state, action) => {
//       state.loading = false;
//       state.error = null;
//       state.data = action.payload;
//     },
//     mutationFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.data = null;
//     },
//   },
// });

// export const { startMutation, mutationSuccess, mutationFailure } = mySlice.actions;

// export const mutationThunk = (mutationParams) => async (dispatch) => {
//   try {
//     dispatch(startMutation());

//     // Perform your mutation logic here
//     const response = await api.post('/graphql', mutationParams);

//     // Assuming the response contains the mutated data
//     dispatch(mutationSuccess(response.data));
//   } catch (error) {
//     dispatch(mutationFailure(error.message));
//   }
// };

// export default mySlice.reducer;
