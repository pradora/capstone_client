// import { createSlice } from "@reduxjs/toolkit";
// import { api } from "../app/api";

// //session storage key
// const CREDENTIALS = "credentials";

// function storeToken(state, { payload }) {
//     state.credentials = { token: payload.token, user: { ...payload.user } };
//     window.sessionStorage.setItem(
//         CREDENTIALS,
//         JSON.stringify({
//             token: payload.token,
//             user: { ...payload.user }
//         })
//     )
// }

// const UserSlice = createSlice({
//     name: "user",
//     initialState: {
//         credentials: JSON.parse(window.sessionStorage.getItem(CREDENTIALS)) || {
//             token: "",
//             user: {
//                 userId: null,
//                 admin: false,
//             }
//         }
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         // modify user data and use mutations
//         builder.addCase(api.endpoints.login.fulfilled, storeToken);
//         // builder.addCase(api.endpoints.register.fulfilled, storeToken);
//         builder.addCase(api.endpoints.edit.fulfilled, (state, { payload }) => {
//             state.credentials = {
//                 ...state.credentials,
//                 user: payload
//             }
//         });
//         builder.addCase(api.endpoints.logout.fulfilled, (state) => {
//             state.credentials = {
//                 token: "",
//                 user: { userId: null, admin: false }
//             };
//             window.sessionStorage.removeItem(CREDENTIALS)
//         });
//     }

// });

export const { setUser } = UserSlice.actions;



export default UserSlice.reducer;





// const UserSlice = createSlice({
//     name: "user",
//     initialState: {
//         user: null,
//         token: null,
//     },
//     reducers: {
//         setUser(state, action) {
//             state.user = action.payload.name;
//             state.token = action.payload.token;
//             localStorage.setItem('user', JSON.stringify(action.payload.user));
//             localStorage.setItem('token', action.payload.token);
//         },
//         clearUser(state) {
//             state.user = null;
//             state.token = null;
//             localStorage.removeItem('user');
//             localStorage.removeItem('token');
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addMatcher(
//             api.endpoints.getSingleUser.matchFulfilled,
//             (state, { payload }) => {
//                 state.user = {
//                     ...state,
//                     userData: payload,
//                 }
//             }
//         );
//     },
// });
// export const { setUser , clearUser } = UserSlice.actions;

// export default UserSlice.reducer;