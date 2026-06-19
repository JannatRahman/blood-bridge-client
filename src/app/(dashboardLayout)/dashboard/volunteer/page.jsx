
import { Card, Button } from "@heroui/react";
import {  FaUsers,  } from "react-icons/fa"
import { GiBlood, GiMoneyStack } from "react-icons/gi";


const VolunteerDashboard = async () => {
  const stats = {
    totalEvents: 15,
    totalAttendees: 450,
    totalRevenue: 25000,
    totalSoldTickets: 780,
  };

  // const user = await getUser();
  // const isPremium = user?.isPremium;




  return (
    <div className="space-y-6 mt-6 flex justify-center">
      {/* <DashboardHeading
                title="Overview"
                description="Dashboard Overview" /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 items-center flex justify-between">
            <div className="p-3.5 bg-pink-500/10 text-pink-400 rounded-2xl border border-pink-500/20"><FaUsers size={24} /></div>
            <div className="space-y-1">
              <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Total Donors</span>
              <h2 className="text-3xl font-extrabold text-white">{stats.totalEvents}</h2>
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex  items-center justify-between">
            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20"><GiMoneyStack size={24} /></div>
            <div className="space-y-1">
              <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Total Funding</span>
              <h2 className="text-3xl font-extrabold text-white">{stats.totalAttendees}</h2>
            </div>
            
          </div>
        </Card>
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex  items-center justify-between ">
             <div className=" p-3.5 bg-red-500/10 text-red-600 rounded-2xl border border-red-500/50"><GiBlood size={24} /></div>
            <div className="space-y-1">
              <span className="text-slate-600 text-xs font-bold uppercase tracking-wider  pl-12">Blood Requests</span>
              <h2 className="text-3xl font-extrabold text-white">{`$${stats.totalRevenue.toFixed(2)}`}</h2>
            </div>
           
          </div>
        </Card>
      </div>

    
        {/* <Card className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent relative overflow-hidden" radius="lg">
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><FaCrown className="text-yellow-400" /> Unlock Unlimited Event Creation</h3>
              <p className="text-slate-400 text-xs max-w-xl leading-relaxed">Standard organizer accounts are limited to <strong>3 events</strong>. Upgrade to our Premium Package for <strong>$49.00</strong> to host unlimited events.</p>
            </div>

          </div>
        </Card> */}
  
        {/* <Card className="border border-green-500/20 bg-gradient-to-r from-green-500/5 via-amber-600/5 to-transparent relative overflow-hidden" radius="lg">
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-10">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><FaCrown className="text-green-400" /> Welcome to premium dashboard</h3>
              <p className="text-slate-400 text-xs max-w-xl leading-relaxed">You can create more then 3 events now...</p>
            </div>

          </div>
        </Card> */}
 
    </div>
  )
}

export default VolunteerDashboard;