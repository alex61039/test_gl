import React from "react";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getActionById, getAllActions, createAction, updateAction, getAllGitf, deleteAction, searchByName} from './help'
import {IActions, ISearch} from "../models/actionsType";


const baseURL = process.env["REACT_APP_BASE_URL"] as string;

export const actionsApi = createApi({
    reducerPath: 'actionsApi',
    tagTypes: ['actions', 'gifts'],
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    refetchOnFocus: true,
    endpoints: (build: any) => ({

        getId: build.query({
            queryFn: async (id: number) => {
             const action = await getActionById(id);
                return {data: action}
            },
            providesTags: ['actions']
        }),
        getAllActions: build.query({
            queryFn: async (page: number) => {
                const actions = await getAllActions(page);
                return {data: actions}
            },
            providesTags: ['actions']
        }),
        createAction: build.mutation({
            queryFn: async (newAction: IActions) => {
                const action = await createAction(newAction);
                return {data: action}
            },
            invalidatesTags: ['actions']
        }),
        updateAction: build.mutation({
            queryFn: async (action: IActions) => {
                const updAction = await updateAction(action);
                return {data: updAction}
            },
            invalidatesTags: ['actions']
        }),
        deleteAction: build.mutation({
            queryFn: async (id: number) => {
                const delAction = await deleteAction(id);
                return {data: delAction};
            },
            invalidatesTags: ['actions']
        }),
        searchActionByName: build.query({
            queryFn: async (arg: ISearch) => {
                const action = await searchByName(arg.searchStr, arg.page);
                return {data: action}
            }
          /*  queryFn: async (search: string, page:number) => {
                const actions = await searchByName(search, 2);
                return {data: actions}
            }*/
        }),
        getAllGift: build.query({
            queryFn: async () => {
                const gifts = await getAllGitf();
                return {data: gifts}
            },
            providesTags: ['gifts']
        })

    })
});

export const {useGetIdQuery,
                    useGetAllActionsQuery,
                    useLazyGetIdQuery,
                    useLazyGetAllActionsQuery,
                    useCreateActionMutation,
                    useUpdateActionMutation,
                    useDeleteActionMutation,
                    useLazySearchActionByNameQuery,
                    useLazyGetAllGiftQuery} = actionsApi
