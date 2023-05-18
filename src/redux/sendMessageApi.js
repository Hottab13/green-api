import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./authSlice";

export const sendMessageApi = createApi({
  reducerPath: "sendMessage",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `waInstance${data.IdInstance}/sendMessage/${data.apiTokenInstance}`,
        method: "POST",
        body: {
          chatId: data.senderNumber + "@c.us",
          message: data.message,
        },
      }),
    }),
    getMessage: builder.mutation({
      query: (data) =>
        `waInstance${data.IdInstance}/receiveNotification/${data.apiTokenInstance}`,
    }),
  }),
});

export const { useSendMessageMutation, useGetMessageMutation } = sendMessageApi;
