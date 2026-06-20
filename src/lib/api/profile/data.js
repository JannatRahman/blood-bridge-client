import { serverFetch } from "../server"

export const myProfile = async (email) => {
  const result = await serverFetch(`/api/donation/${email}`)
  return result;
}