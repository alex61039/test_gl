import React from "react";
import axios from "axios";
import {IActions} from '../models/actionsType'


const baseURL = process.env["REACT_APP_BASE_URL"] as string

export const getActionById = async (id: number) => {
    try{
        const action = await axios.get(baseURL + `/actions/${id}`).then(res => res.data);
        return action
    }catch (e) {
        console.log(e)
    }
}

export const getAllActions = async (page: number) => {
    try{
        const actions = await axios.get(baseURL + `/actions/?page=${page}`).then(res => res.data);
        return actions;
    }catch (e) {
        console.log(e);
    }
}

export const createAction = async (newAction:IActions) => {
    try{
        const action = await axios.post(baseURL + '/actions', newAction ).then(res => res.data);
        return action;
    }catch (e) {
        console.log(e)
    }
}
export const updateAction = async (updAction: IActions) => {
    try{
        const action = await axios.put(baseURL + '/actions', updAction).then(res => res.data);
        return action;
    }catch (e) {
        console.log(e)
    }
}

export const deleteAction = async (id: number) => {
    try{
        const action = await axios.delete(baseURL + `/actions/${id}`).then(res => res.data);
        return action;
    }catch (e) {
        console.log(e);
    }
}

export const searchByName = async (searchName: string, page: number) => {

    try {
        const actions = await axios.get(baseURL + '/actionSearch/', {
            params: {
                name: searchName,
                page: page
            }
        }  ).then(res => res.data);
        return actions;
    } catch (e) {
        console.log(e);
    }
}

export const getAllGitf = async () => {
    try{
        const gifts = await axios.get(baseURL + '/gift').then(res => res.data);
        return gifts;
    }catch (e) {
        console.log(e)
    }
}
