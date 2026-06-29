'use server'
import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getUser = async () => {
   const session = await auth.api.getSession({
    headers: await headers()
  })
  console.log('session', session);

  return session?.user || null;
}
export const getUserToken = async () => {
   const session = await auth.api.getSession({
    headers: await headers()
  })
  
  return session?.session?.token || null;
}
// console.log('session', session);

export const roleValidator = async (role) => {

  const user = await getUser();
  // console.log(role, user?.role)

  if(!user || user.role !== role) {
    redirect('/unauthorized')
  }
}