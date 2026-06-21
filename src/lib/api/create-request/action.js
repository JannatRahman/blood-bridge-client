'use server'

import { serverMutation } from "../server"

export const createRequest = async (data) => {
  const resData = await serverMutation('/api/create-request', 'POST', data);
  return resData;
}
export const updateRequest = async (data, id) => {
  console.log(data, id)
  const resData = await serverMutation(`/api/edit-request/${id}`, 'PATCH', data);
  return resData;
}