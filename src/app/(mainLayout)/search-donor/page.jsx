"use client";

import React, { useState, useMemo } from 'react';
import DonationCard from '@/components/DonationCard';
import { baseUrl } from '@/lib/api/baseUrl';
import { Magnifier } from '@gravity-ui/icons';
import { FaHistory } from 'react-icons/fa';
import { Button } from '@heroui/react';
import { router } from 'better-auth/api';
import { useRouter } from 'next/navigation';

// --- DATA ARRAYS ---
const DISTRICTS = [
  { id: "1", name: "Cumilla" }, { id: "2", name: "Feni" }, { id: "3", name: "Brahmanbaria" },
  { id: "4", name: "Rangamati" }, { id: "5", name: "Noakhali" }, { id: "6", name: "Chandpur" },
  { id: "7", textValue: "Satkhira", name: "Satkhira" }, { id: "22", name: "Meherpur" },
  { id: "23", name: "Narail" }, { id: "24", name: "Chuadanga" }, { id: "25", name: "Kushtia" },
  { id: "26", name: "Magura" }, { id: "27", name: "Khulna" }, { id: "28", name: "Bagerhat" },
  { id: "29", name: "Jhenaidah" }, { id: "30", name: "Jhalakathi" }, { id: "31", textValue: "Patuakhali", name: "Patuakhali" },
  { id: "32", name: "Pirojpur" }, { id: "33", name: "Barisal" }, { id: "34", name: "Bhola" },
  { id: "35", name: "Barguna" }, { id: "36", name: "Sylhet" }, { id: "37", name: "Moulvibazar" },
  { id: "38", name: "Habiganj" }, { id: "39", name: "Sunamganj" }, { id: "40", name: "Narsingdi" },
  { id: "41", name: "Gazipur" }, { id: "42", name: "Shariatpur" }, { id: "43", name: "Narayanganj" },
  { id: "44", name: "Tangail" }, { id: "45", name: "Kishoreganj" }, { id: "46", name: "Manikganj" },
  { id: "47", name: "Dhaka" }, { id: "48", name: "Munshiganj" }, { id: "49", name: "Rajbari" },
  { id: "50", name: "Madaripur" }, { id: "51", name: "Gopalganj" }, { id: "52", name: "Faridpur" },
  { id: "53", name: "Panchagarh" }, { id: "54", name: "Dinajpur" }, { id: "55", name: "Lalmonirhat" },
  { id: "56", name: "Nilphamari" }, { id: "57", name: "Gaibandha" }, { id: "58", textValue: "Thakurgaon", name: "Thakurgaon" },
  { id: "59", name: "Rangpur" }, { id: "60", name: "Kurigram" }, { id: "61", name: "Sherpur" },
  { id: "62", name: "Mymensingh" }, { id: "63", name: "Jamalpur" }, { id: "64", name: "Netrokona" }
];

const UPAZILAS = [
  { id: "1", districtId: "1", name: "Debidwar" }, { id: "2", districtId: "1", name: "Barura" },
  { id: "3", districtId: "1", name: "Brahmanpara" }, { id: "4", districtId: "1", name: "Chandina" },
  { id: "5", districtId: "1", name: "Chauddagram" }, { id: "6", districtId: "1", name: "Daudkandi" },
  { id: "7", districtId: "1", name: "Homna" }, { id: "8", districtId: "1", name: "Laksam" },
  { id: "9", districtId: "1", name: "Muradnagar" }, { id: "10", districtId: "1", name: "Nangalkot" },
  { id: "11", districtId: "1", name: "Comilla Sadar" }, { id: "12", districtId: "1", name: "Meghna" },
  { id: "13", districtId: "1", name: "Monohargonj" }, { id: "14", districtId: "1", name: "Sadarsouth" },
  { id: "15", districtId: "1", name: "Titas" }, { id: "16", districtId: "1", name: "Burichang" },
  { id: "17", districtId: "1", name: "Lalmai" }, { id: "18", districtId: "2", name: "Chhagalnaiya" },
  { id: "19", districtId: "2", name: "Feni Sadar" }, { id: "20", districtId: "2", name: "Sonagazi" },
  { id: "21", districtId: "2", name: "Fulgazi" }, { id: "22", districtId: "2", name: "Parshuram" },
  { id: "23", districtId: "2", name: "Daganbhuiyan" }, { id: "24", districtId: "3", name: "Brahmanbaria Sadar" },
  { id: "25", districtId: "3", name: "Kasba" }, { id: "26", districtId: "3", name: "Nasirnagar" },
  { id: "27", districtId: "3", name: "Sarail" }, { id: "28", districtId: "3", name: "Ashuganj" },
  { id: "29", districtId: "3", name: "Akhaura" }, { id: "30", districtId: "3", name: "Nabinagar" },
  { id: "31", districtId: "3", name: "Bancharampur" }, { id: "32", districtId: "3", name: "Bijoynagar" },
  { id: "33", districtId: "4", name: "Rangamati Sadar" }, { id: "34", districtId: "4", name: "Kaptai" },
  { id: "35", districtId: "4", name: "Kawkhali" }, { id: "36", districtId: "4", name: "Baghaichari" },
  { id: "37", districtId: "4", name: "Barkal" }, { id: "38", districtId: "4", name: "Langadu" },
  { id: "39", districtId: "4", name: "Rajasthali" }, { id: "40", districtId: "4", name: "Belaichari" },
  { id: "41", districtId: "4", name: "Juraichari" }, { id: "42", districtId: "4", name: "Naniarchar" },
  { id: "43", districtId: "5", name: "Noakhali Sadar" }, { id: "44", districtId: "5", name: "Companiganj" },
  { id: "45", districtId: "5", name: "Begumganj" }, { id: "46", districtId: "5", name: "Hatia" },
  { id: "47", districtId: "5", name: "Subarnachar" }, { id: "48", districtId: "5", name: "Kabirhat" },
  { id: "49", districtId: "5", name: "Senbug" }, { id: "50", districtId: "5", textValue: "Chatkhil", name: "Chatkhil" },
  { id: "51", districtId: "5", name: "Sonaimori" }, { id: "52", districtId: "6", name: "Haimchar" },
  { id: "53", districtId: "6", name: "Kachua" }, { id: "54", districtId: "6", name: "Shahrasti" },
  { id: "55", districtId: "6", name: "Chandpur Sadar" }, { id: "56", districtId: "6", name: "Matlab South" },
  { id: "57", districtId: "6", name: "Hajiganj" }, { id: "58", districtId: "6", name: "Matlab North" },
  { id: "59", districtId: "6", name: "Faridgonj" }, { id: "60", districtId: "7", name: "Lakshmipur Sadar" },
  { id: "61", districtId: "7", name: "Kamalnagar" }, { id: "62", districtId: "7", name: "Raipur" },
  { id: "63", districtId: "7", name: "Ramgati" }, { id: "64", districtId: "7", name: "Ramganj" },
  { id: "65", districtId: "8", name: "Rangunia" }, { id: "66", districtId: "8", name: "Sitakunda" },
  { id: "67", districtId: "8", name: "Mirsharai" }, { id: "68", districtId: "8", name: "Patiya" },
  { id: "69", districtId: "8", name: "Sandwip" }, { id: "70", districtId: "8", name: "Banshkhali" },
  { id: "71", districtId: "8", name: "Boalkhali" }, { id: "72", districtId: "8", name: "Anwara" },
  { id: "73", districtId: "8", name: "Chandanaish" }, { id: "74", districtId: "8", textValue: "Satkania", name: "Satkania" },
  { id: "75", districtId: "8", name: "Lohagara" }, { id: "76", districtId: "8", name: "Hathazari" },
  { id: "77", districtId: "8", name: "Fatikchhari" }, { id: "78", districtId: "8", name: "Raozan" },
  { id: "79", districtId: "8", name: "Karnafuli" }, { id: "80", districtId: "9", name: "Coxsbazar Sadar" },
  { id: "81", districtId: "9", name: "Chakaria" }, { id: "82", districtId: "9", name: "Kutubdia" },
  { id: "83", districtId: "9", name: "Ukhiya" }, { id: "84", districtId: "9", name: "Moheshkhali" },
  { id: "85", districtId: "9", name: "Pekua" }, { id: "86", districtId: "9", name: "Ramu" },
  { id: "87", districtId: "9", textValue: "Teknaf", name: "Teknaf" }, { id: "88", districtId: "10", name: "Khagrachhari Sadar" },
  { id: "89", districtId: "10", name: "Dighinala" }, { id: "90", districtId: "10", name: "Panchari" },
  { id: "91", districtId: "10", name: "Laxmichhari" }, { id: "92", districtId: "10", name: "Mohalchari" },
  { id: "93", districtId: "10", name: "Manikchari" }, { id: "94", districtId: "10", name: "Ramgarh" },
  { id: "95", districtId: "10", name: "Matiranga" }, { id: "96", districtId: "10", name: "Guimara" },
  { id: "97", districtId: "11", name: "Bandarban Sadar" }, { id: "98", districtId: "11", name: "Alikadam" },
  { id: "99", districtId: "11", name: "Naikhongchhari" }, { id: "100", districtId: "11", name: "Rowangchhari" },
  { id: "101", districtId: "11", name: "Lama" }, { id: "102", districtId: "11", name: "Ruma" },
  { id: "103", districtId: "11", name: "Thanchi" }, { id: "104", districtId: "12", name: "Belkuchi" },
  { id: "105", districtId: "12", name: "Chauhali" }, { id: "106", districtId: "12", name: "Kamarkhand" },
  { id: "107", districtId: "12", name: "Kazipur" }, { id: "108", districtId: "12", name: "Raigonj" },
  { id: "109", districtId: "12", name: "Shahjadpur" }, { id: "110", districtId: "12", name: "Sirajganj Sadar" }
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function  SearchDonor({searchParams}) {
 
  const [bloodGroup, setBloodGroup] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState(''); // Tracks names now (e.g., "Cumilla")
  const [upazilaName, setUpazilaName] = useState('');
  console.log(selectedDistrictName, upazilaName, bloodGroup)

  const [donors, setDonors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const filteredUpazilas = useMemo(() => {
    if (!selectedDistrictName) return [];

    // Find the district object that matches our selected string name
    const matchingDistrict = DISTRICTS.find((d) => d.name === selectedDistrictName);
    if (!matchingDistrict) return [];

    // Filter upazilas using that district's numeric ID
    return UPAZILAS.filter((up) => up.districtId === matchingDistrict.id);
  }, [selectedDistrictName]);

  const handleDistrictChange = (e) => {
    setSelectedDistrictName(e.target.value); // Saves name string directly
    setUpazilaName('');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    //   try {
    //     const queryParams = new URLSearchParams({
    //       bloodGroup: bloodGroup,
    //       districts: selectedDistrictName, // Directly passes the district name string
    //       upazila: upazilaName
    //     }).toString();

    //     const res = await fetch(`${baseUrl}/api/donation-request?${queryParams}`);
    //     const data = await res.json();
    //     setDonors(data);
    //   } catch (error) {
    //     console.error("Error fetching filtered data:", error);
    //   } finally {
    //     setLoading(false);
    //   }
  };
  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (bloodGroup) {
      params.set("bloodGroup", bloodGroup);
    }
    if (upazilaName) {
      params.set("upazilaName", upazilaName);
    }
    if (selectedDistrictName) {
      params.set("selectedDistrictName", selectedDistrictName);
    }
    router.push(`/search-donor?${params.toString()}`);
  };

  const handleReset = () => {
    setBloodGroup("");
    setSelectedDistrictName("");
    setUpazilaName("");
    // router.push("/events")
  }

  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* --- SEARCH FORM --- */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-1">Find Blood Donors</h2>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">

            {/* Blood Group */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider pl-1">Blood Group</label>
              <select
                required
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              >
                <option value="">Select Group</option>
                {BLOOD_GROUPS.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider pl-1">District</label>
              <select
                required
                value={selectedDistrictName}
                onChange={handleDistrictChange}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
              >
                <option value="">Select District</option>
                {DISTRICTS.map((dist) => (
                  <option key={dist.id} value={dist.name}>{dist.name}</option>
                ))}
              </select>
            </div>

            {/* Dependent Upazila */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider pl-1">Upazila</label>
              <select
                required
                disabled={!selectedDistrictName}
                value={upazilaName}
                onChange={(e) => setUpazilaName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {!selectedDistrictName ? 'Choose District First' : 'Select Upazila'}
                </option>
                {filteredUpazilas.map((upz) => (
                  <option key={upz.id} value={upz.name}>{upz.name}</option>
                ))}
              </select>
            </div>

            {/* Search Action Button */}
            <div className='flex gap-3 items-center'>
              <button
                onClick={handleApplyFilters}
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white font-medium text-sm rounded-xl h-[42px] flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-70"
              >
                <Magnifier size={16} />
                {loading ? 'Searching...' : 'Search'}
              </button>
              <Button
                onClick={handleReset}
                variant="bordered"
                className="border-white/10 hover:border-white/20 hover:bg-white/5 text-white font-semibold h-12 transition-all duration-200 px-4 min-w-0"
                title="Reset Filters"
              >
                <FaHistory size={13} className="text-slate-400 hover:text-white" />
              </Button>
            </div>

          </form>
        </div>

        {/* --- DYNAMIC RESULTS SECTION --- */}
        <div className="pt-4">
          {!hasSearched && (
            <div className="text-center py-16 bg-white/40 rounded-3xl border border-dashed border-gray-200 max-w-xl mx-auto">
              <p className="text-gray-500 text-sm font-medium">
                Fill out the filter parameters above to view available emergency donor requests.
              </p>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-rose-600 rounded-full" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {hasSearched && !loading && donors.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-xl mx-auto">
              <p className="text-gray-900 font-semibold text-lg">No Results Found</p>
              <p className="text-gray-500 text-sm mt-1">
                We could not find any pending donation matching those parameters. Try another area.
              </p>
            </div>
          )}

          {hasSearched && !loading && donors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {donors.map((donation) => (
                <DonationCard
                  key={donation._id?.$oid || donation._id}
                  request={donation}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}