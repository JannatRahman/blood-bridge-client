"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { FaHistory, FaSlidersH, FaHeartbeat } from 'react-icons/fa';
import { Button, Card, Label } from '@heroui/react';
import { useRouter, useSearchParams } from 'next/navigation';

const DISTRICTS = [
  { id: "1", name: "Cumilla" }, { id: "2", name: "Feni" }, { id: "3", name: "Brahmanbaria" },
  { id: "4", name: "Rangamati" }, { id: "5", name: "Noakhali" }, { id: "6", name: "Chandpur" },
  { id: "7", name: "Lakshmipur" }, { id: "8", name: "Chattogram" }, { id: "9", name: "Coxsbazar" },
  { id: "10", name: "Khagrachhari" }, { id: "11", name: "Bandarban" }, { id: "12", name: "Sirajganj" },
  { id: "13", name: "Pabna" }, { id: "14", name: "Bogura" }, { id: "15", name: "Rajshahi" },
  { id: "16", name: "Natore" }, { id: "17", name: "Joypurhat" }, { id: "18", name: "Chapainawabganj" },
  { id: "19", name: "Naogaon" }, { id: "20", name: "Jashore" }, { id: "21", textValue: "Satkhira", name: "Satkhira" },
  { id: "22", name: "Meherpur" }, { id: "23", name: "Narail" }, { id: "24", name: "Chuadanga" },
  { id: "25", name: "Kushtia" }, { id: "26", name: "Magura" }, { id: "27", name: "Khulna" },
  { id: "28", name: "Bagerhat" }, { id: "29", name: "Jhenaidah" }, { id: "30", name: "Jhalakathi" },
  { id: "31", textValue: "Patuakhali", name: "Patuakhali" }, { id: "32", name: "Pirojpur" }, { id: "33", name: "Barisal" },
  { id: "34", name: "Bhola" }, { id: "35", name: "Barguna" }, { id: "36", name: "Sylhet" },
  { id: "37", name: "Moulvibazar" }, { id: "38", name: "Habiganj" }, { id: "39", name: "Sunamganj" },
  { id: "40", name: "Narsingdi" }, { id: "41", name: "Gazipur" }, { id: "42", name: "Shariatpur" },
  { id: "43", name: "Narayanganj" }, { id: "44", name: "Tangail" }, { id: "45", name: "Kishoreganj" },
  { id: "46", name: "Manikganj" }, { id: "47", name: "Dhaka" }, { id: "48", name: "Munshiganj" },
  { id: "49", name: "Rajbari" }, { id: "50", name: "Madaripur" }, { id: "51", name: "Gopalganj" },
  { id: "52", name: "Faridpur" }, { id: "53", name: "Panchagarh" }, { id: "54", name: "Dinajpur" },
  { id: "55", name: "Lalmonirhat" }, { id: "56", name: "Nilphamari" }, { id: "57", name: "Gaibandha" },
  { id: "58", textValue: "Thakurgaon", name: "Thakurgaon" }, { id: "59", name: "Rangpur" }, { id: "60", name: "Kurigram" },
  { id: "61", name: "Sherpur" }, { id: "62", name: "Mymensingh" }, { id: "63", name: "Jamalpur" },
  { id: "64", name: "Netrokona" }
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

export default function FilterComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [recipientDistrict, setrecipientDistrict] = useState(searchParams.get("recipientDistrict") || "");
  const [bloodGroup, setBloodGroup] = useState(searchParams.get("bloodGroup") || "");
  const [recipientUpazila, setRecipientUpazila] = useState(searchParams.get("recipientUpazila") || "");

  useEffect(() => {
    setrecipientDistrict(searchParams.get("recipientDistrict") || "");
    setBloodGroup(searchParams.get("bloodGroup") || "");
    setRecipientUpazila(searchParams.get("recipientUpazila") || "");
  }, [searchParams]);

  const filteredUpazilas = useMemo(() => {
    if (!recipientDistrict) return [];
    const matchingDistrict = DISTRICTS.find((d) => d.name === recipientDistrict);
    if (!matchingDistrict) return [];
    return UPAZILAS.filter((up) => up.districtId === matchingDistrict.id);
  }, [recipientDistrict]);

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (bloodGroup) params.set("bloodGroup", bloodGroup);
    if (recipientUpazila) params.set("recipientUpazila", recipientUpazila);
    if (recipientDistrict) params.set("recipientDistrict", recipientDistrict);

    // FIX: Push to the current window location path dynamically, not hardcoded /search-donor
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setBloodGroup("");
    setrecipientDistrict("");
    setRecipientUpazila("");
    router.push(window.location.pathname);
  };

  return (
    <div className="w-full relative z-10 mb-8">
      <Card className="bg-white/80 border border-slate-200/60 backdrop-blur-md p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl" radius="none">
        <div className="gap-5 grid grid-cols-1 md:grid-cols-4 items-stretch md:items-end">

          {/* Blood Group */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Blood Group</Label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all cursor-pointer shadow-sm"
            >
              <option value="">Select Group</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">District</Label>
            <select
              value={recipientDistrict}
              onChange={(e) => {
                setrecipientDistrict(e.target.value);
                setRecipientUpazila("");
              }}
              className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all cursor-pointer shadow-sm"
            >
              <option value="">Select District</option>
              {DISTRICTS.map((dist) => (
                <option key={dist.id} value={dist.name}>{dist.name}</option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Upazila / Thana</Label>
            <select
              disabled={!recipientDistrict}
              value={recipientUpazila}
              onChange={(e) => setRecipientUpazila(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all disabled:bg-slate-50 disabled:text-slate-400 cursor-pointer shadow-sm"
            >
              <option value="">
                {!recipientDistrict ? 'Choose District First' : 'Select Upazila'}
              </option>
              {filteredUpazilas.map((upz) => (
                <option key={upz.id} value={upz.name}>{upz.name}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 w-full mt-2 md:mt-0">
            <Button
              onClick={handleApplyFilters}
              className="flex-grow bg-rose-600 hover:bg-rose-700 text-white font-semibold h-10 text-sm shadow-md rounded-xl"
              startContent={<FaSlidersH size={13} />}
            >
              Apply Filters
            </Button>
            <Button
              onClick={handleReset}
              variant="bordered"
              className="border-slate-200 bg-white text-slate-500 h-10 px-3 min-w-10 w-10 rounded-xl shadow-sm"
            >
              <FaHistory size={13} />
            </Button>
          </div>

        </div>
      </Card>
    </div>
  );
}