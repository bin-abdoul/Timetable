import { api } from "./api";

interface User {
  _id: string;
  firstName: string;
  surName: string;
  email: string;
  phoneNumber: string;
  role: 'Admin' | 'User' | 'Moderator';
  gender: string;
  homeAddress: string;
  dob: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<unknown, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    signup: builder.mutation<
      unknown,
      {
        email: string;
        password: string;
        firstName: string;
        surName: string;
        phoneNumber: string;
        homeAddress: string;
        gender: string;
        dob: string;
        role: string;
      }
    >({
      query: (credentials) => ({
        url: "/auth/create-account",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    usersList: builder.query< User[], void>({
      query: () => ({
        url: "/auth/users-list",
        method: "GET",
      }),
      providesTags: ["User"],
      transformResponse: (response: any) => response.data,
    }),

    updateUserRole: builder.mutation<unknown, 
    {
      userId: string;
      newRole: 'User' | 'Moderator';
    }>({
      query: ({ userId, newRole }) => ({
        url: "/auth/update-user-role",
        method: "PUT",
        body: { userId, newRole },
      }),
      invalidatesTags: ["User"],
    }),
    userInfo: builder.query<User, string>({
      query: (userId) => ({
        url: `/auth/user/${userId}`,
        method: "GET",
      }),
      providesTags : ["User"],
      transformResponse: (response: any) => response.data,
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useUsersListQuery, useUpdateUserRoleMutation, useUserInfoQuery} = authApi;
