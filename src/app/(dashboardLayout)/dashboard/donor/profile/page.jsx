'use client'


import { useSession } from "@/lib/auth-client";
import { MapPin } from "@gravity-ui/icons";
import { Card, ListBox, Select } from "@heroui/react";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const DISTRICTS = [
  { id: "1", name: "Cumilla" }, { id: "2", name: "Feni" }, { id: "3", name: "Brahmanbaria" },
  { id: "4", name: "Rangamati" }, { id: "5", name: "Noakhali" }, { id: "6", name: "Chandpur" },
  { id: "7", name: "Lakshmipur" }, { id: "8", name: "Chattogram" }, { id: "9", name: "Coxsbazar" },
  { id: "10", name: "Khagrachhari" }, { id: "11", name: "Bandarban" }, { id: "12", name: "Sirajganj" },
  { id: "13", name: "Pabna" }, { id: "14", name: "Bogura" }, { id: "15", name: "Rajshahi" },
  { id: "16", name: "Natore" }, { id: "17", name: "Joypurhat" }, { id: "18", name: "Chapainawabganj" },
  { id: "19", name: "Naogaon" }, { id: "20", name: "Jashore" }, { id: "21", name: "Satkhira" },
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
  { id: "73", districtId: "8", name: "Chandanaish" }, { id: "74", districtId: "8", name: "Satkania" },
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

const DonorProfile = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      district: '',
      districtId: '',
      upazila: '',
      upazilaId: '',
      bloodGroup: '',
      role: 'Donor',
    }
  });

  // Hydrate data when session loads
  useEffect(() => {
    if (session?.user) {
      reset({
        fullName: session.user.name || 'Graziele Lopes',
        email: session.user.email || 'graziele@gmail.com',
        phoneNumber: session.user.phone || '(11) 9141-8888',
        district: 'Dhaka',
        districtId: '47',
        upazila: 'Dhaka Sadar',
        upazilaId: '',
        bloodGroup: 'O+',
        role: 'Donor',
      });
    }
  }, [session, reset]);

  const watchDistrictId = watch('districtId');
  const watchDistrict = watch('district');
  const watchBloodGroup = watch('bloodGroup');
  const formValues = watch();

  const filteredUpazilas = useMemo(() => {
    if (!watchDistrictId) return [];
    return UPAZILAS.filter((up) => up.districtId === watchDistrictId);
  }, [watchDistrictId]);

  const onSubmit = async (data) => {
    console.log("Saving records to Database...", data);
    // Add database request handler logic here 
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-12">
      {/* Banner / Header Element Styling */}
      <div className="h-44 bg-gradient-to-r from-rose-100 via-green-50 to-rose-200 relative w-full mb-16">
        <div className="absolute -bottom-12 left-6 md:left-12 flex items-end gap-4">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-sm relative">
            <Image
              src={session?.user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"}
              fill
              sizes="96px"
              className="object-cover"
              alt="Avatar Profile Picture"
            />
          </div>
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-800">{formValues.fullName || "User Profile"}</h1>
              
            </div>
            <p className="text-xs text-gray-500 mt-1">Start Date: 27 Jan 2025</p>
          </div>
        </div>

        {/* Global Action View State Toggle Buttons */}
        <div className="absolute bottom-4 right-6 md:right-12">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-white cursor-pointer hover:bg-red-700 
              hover:text-white
              text-gray-700 text-sm font-medium rounded-lg border border-gray-200 shadow-sm transition-all flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-red-700
                text-white
                 cursor-pointer
                text-sm font-medium rounded-lg border border-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="px-4 py-2 bg-white cursor-pointer
                hover:bg-rose-100
                text-black text-sm font-medium rounded-lg shadow-sm transition-all"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="p-6 md:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Profile Details</h2>
              <p className="text-xs text-gray-400 mt-0.5">Manage your structural information and local records parameters.</p>
            </div>

            {/* Profile Fields Organized in Grid Infrastructure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
              
              {/* Full Name field */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-400">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    {...register("fullName", { required: "Name is required" })}
                    className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm focus:outline-emerald-500"
                  />
                ) : (
                  <span className="text-sm font-semibold text-gray-700 h-11 flex items-center">{formValues.fullName || "—"}</span>
                )}
                {errors.fullName && <p className="text-xs text-red-500 mt-0.5">{errors.fullName.message}</p>}
              </div>

              {/* Email Address Field (Always Read Only) */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-400">Email</label>
                <div className="h-11 flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">{formValues.email || "—"}</span>
                  
                </div>
              </div>

              {/* Phone Number Field */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-400">Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    {...register("phoneNumber", { required: "Phone number is required" })}
                    className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm focus:outline-emerald-500"
                  />
                ) : (
                  <div className="h-11 flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">{formValues.phoneNumber || "—"}</span>
                    
                  </div>
                )}
                {errors.phoneNumber && <p className="text-xs text-red-500 mt-0.5">{errors.phoneNumber.message}</p>}
              </div>

              {/* District Select Input Node */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-400">District</label>
                {isEditing ? (
                  <Select
                    aria-label="District"
                    placeholder="Select District"
                    className="w-full"
                    selectedKeys={watchDistrictId ? [watchDistrictId] : []}
                    onSelectionChange={(keys) => {
                      const val = Array.from(keys)[0]?.toString() || '';
                      const selectedDistrict = DISTRICTS.find((dist) => dist.id === val);
                      setValue('districtId', val, { shouldValidate: true });
                      setValue('district', selectedDistrict?.name || '');
                      setValue('upazilaId', '');
                      setValue('upazila', '');
                    }}
                  >
                    <Select.Trigger className="h-11 border border-gray-200 rounded-xl px-3 flex items-center gap-2 bg-white w-full text-left text-sm">
                      <MapPin className="text-gray-400 w-4 h-4" />
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {DISTRICTS.map((dist) => (
                          <ListBox.Item id={dist.id} key={dist.id} textValue={dist.name || dist.textValue}>
                            {dist.name || dist.textValue}
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                ) : (
                  <span className="text-sm font-semibold text-gray-700 h-11 flex items-center">{formValues.district || "—"}</span>
                )}
                <input type="hidden" {...register("districtId", { required: 'District is required' })} />
                {errors.districtId && <p className="text-xs text-red-500 mt-0.5">{errors.districtId.message}</p>}
              </div>

              {/* Dependent Upazila Input Select Node */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-400">Upazila / City</label>
                {isEditing ? (
                  <Select
                    aria-label="Upazila"
                    placeholder={watchDistrictId ? "Select Upazila" : "Choose district first"}
                    disabledKeys={!watchDistrictId ? ["disabled-state"] : []}
                    className="w-full"
                    selectedKeys={watch('upazilaId') ? [watch('upazilaId')] : []}
                    onSelectionChange={(keys) => {
                      const val = Array.from(keys)[0]?.toString() || '';
                      const upazila = UPAZILAS.find((u) => u.id === val);
                      setValue('upazilaId', val, { shouldValidate: true });
                      setValue('upazila', upazila?.name || '');
                    }}
                  >
                    <Select.Trigger
                      className={`h-11 border border-gray-200 rounded-xl px-3 flex items-center gap-2 bg-white w-full text-left text-sm ${!watchDistrict ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                    >
                      <MapPin className="text-gray-400 w-4 h-4" />
                      <Select.Value />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {watchDistrict ? (
                          filteredUpazilas.map((up) => (
                            <ListBox.Item id={up.id} key={up.id} textValue={up.name}>
                              {up.name}
                            </ListBox.Item>
                          ))
                        ) : (
                          <ListBox.Item id="disabled-state" textValue="Choose district first">
                            Choose district first
                          </ListBox.Item>
                        )}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                ) : (
                  <span className="text-sm font-semibold text-gray-700 h-11 flex items-center">{formValues.upazila || "—"}</span>
                )}
                <input type="hidden" {...register("upazilaId", { required: 'Upazila is required' })} />
                {errors.upazilaId && <p className="text-xs text-red-500 mt-0.5">{errors.upazilaId.message}</p>}
              </div>

              {/* User Account Role Type Field */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-400">Account Type</label>
                <div className="h-11 flex items-center">
                  <span className="text-sm font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                    {formValues.role}
                  </span>
                </div>
              </div>

            </div>

            <hr className="border-gray-100" />

            {/* Blood Group Grid UI Section */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-bold text-gray-700">Blood Group Selection</span>
              {isEditing ? (
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {BLOOD_GROUPS.map((group) => {
                    const isSelected = watchBloodGroup === group;
                    return (
                      <button
                        key={group}
                        type="button"
                        onClick={() => setValue('bloodGroup', group, { shouldValidate: true })}
                        className={`h-11 rounded-xl font-bold border text-sm transition-all flex items-center justify-center
                          ${isSelected
                            ? 'border-red-700 bg-red-600 text-white shadow-sm'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                      >
                        {group}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex">
                  <span className="h-11 px-6 bg-red-50 text-red-600 font-extrabold text-base rounded-xl flex items-center justify-center border border-red-100 shadow-sm">
                    {formValues.bloodGroup || "Not Provided"}
                  </span>
                </div>
              )}
              <input type="hidden" {...register("bloodGroup", { required: 'Blood Group is required' })} />
              {errors.bloodGroup && <p className="text-xs text-red-500 mt-1">{errors.bloodGroup.message}</p>}
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default DonorProfile;