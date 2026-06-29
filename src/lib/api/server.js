import { baseUrl } from "./baseUrl"
import { getUserToken } from "./session";

export const authHeader = async () => {
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};

  return header;
}

export const serverMutation = async (path, method, data) => {
  // console.log(data);

  const res = await fetch(`${baseUrl}${path}`,
    {
      method: method,
      headers: {
        'Content-type': 'application/json',
        ...(await authHeader())

      },
      body: JSON.stringify(data)
    }
  );
  return res.json();
}


export const deleteMutation = async (path) => {
  const res = await fetch(`${baseUrl}${path}`,
    {
      method: 'DELETE',
      headers: await authHeader()
    }
  );
  return res.json();
}


export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`,
    { cache: 'no-store' },

  );
  return res.json();
}

export const protectedFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`,
    {
      headers: await authHeader(),
    },
    { cache: 'no-store' }
  );
  return res.json();
}