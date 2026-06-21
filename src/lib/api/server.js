import { baseUrl } from "./baseUrl"

export const serverMutation= async (path, method, data) => {
  console.log(data);

const res = await fetch(`${baseUrl}${path}`,
 { 
  method: method,
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify(data)
  }
);
return res.json(); 
}


export const serverFetch= async (path) => {
const res = await fetch(`${baseUrl}${path}`);
return res.json(); 
}