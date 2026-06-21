import { serverFetch } from "../server"

export const myRequest = async (email) => {
  const result = await serverFetch(`/api/my-request/${email}`);
  console.log(result);

  return result;
}