'use server'
import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getUser = async () => {
   const session = await auth.api.getSession({
    headers: await headers()
  })
  

  if (session?.user) {
    return {
      ...session.user,
      role: session.user.role || 'Donor'
    };
  }

  return null;
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
  const userRole = user?.role || 'Donor';

  if (!user || userRole.toLowerCase() !== role.toLowerCase()) {
    redirect('/unauthorized')
  }
}