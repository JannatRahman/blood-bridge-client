import { getUser } from '@/lib/api/session';
import { redirect } from 'next/navigation';

export default async function DashboardRootPage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const role = (user.role || 'Donor').toLowerCase();

  if (role === 'admin') {
    redirect('/dashboard/admin');
  } else if (role === 'volunteer') {
    redirect('/dashboard/volunteer');
  } else {
    redirect('/dashboard/donor');
  }
}
