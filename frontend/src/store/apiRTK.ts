// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { API_BASE_URL, ENDPOINT } from "../lib/consts";
// import { User } from "../features/user/userTypes";

// type SearchParams = {
//   value?: string;
//   limit?: number;
//   offset?: number;
// };

// type ResponceData = {
//   data: any;
// };

// export const serviceAPI = createApi({
//   reducerPath: "serviceAPI",
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_BASE_URL
//   }),
//   endpoints: builder => ({
//     createNewUser: builder.query<ResponceData, Pick<User, "auth0Id" | "email">>(
//       {
//         query: ({ auth0Id, email }) => ({
//           method: "POST",
//           url: ENDPOINT.me,
//           params: { auth0Id, email },
//           headets: {
//             "Content-Type": "application/json"
//           }
//         })
//       }
//     )
//     // getComicsById: builder.query<IResponseData, string>({
//     //   query: (id: string) => ({
//     //     url: `${ENDPOINT.users}/${id}`,
//     //     params: {
//     //       ts,
//     //       hash: md5(`${ts}${PRIVATE_API_KEY}${PUBLIC_API_KEY}`),
//     //       apikey: PUBLIC_API_KEY
//     //     }
//     //   })
//     // })
//   })
// });

// export const { useCreateNewUserQuery } = serviceAPI;
