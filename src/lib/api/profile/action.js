'use server'

import { serverMutation } from "../server"

export const addProfile = async () => {
  const resData = await serverMutation('/api/donations', 'POST', data);
  return resData;
}
export const updateProfile = async (data, id) => {
  console.log(data, id)
  const resData = await serverMutation(`/api/donations/${id}`, 'PATCH', data);
  return resData;
}