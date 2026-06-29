'use server'

import { authClient } from "@/lib/auth-client";
import { deleteMutation, serverMutation } from "../server"


export const createRequest = async (data) => {
  const {data: token} = await authClient.token()
  // console.log(token)
  const resData = await serverMutation('/api/create-request', 'POST', data);
  return resData;
}


export const updateRequest = async (data, id) => {
  // console.log(data, id)
  const resData = await serverMutation(`/api/edit-request/${id}`, 'PATCH', data);
  return resData;
}


export const deleteRequest = async ( id) => {
  
  const resData = await deleteMutation(`/api/delete-request/${id}`);
  
  return resData;
}