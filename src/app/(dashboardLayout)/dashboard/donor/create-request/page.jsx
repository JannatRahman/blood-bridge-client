'use client';

import DashboardHeading from '@/components/DashboardHeading';
import { createRequest } from '@/lib/api/create-request/action';
import { useSession } from '@/lib/auth-client';
import { Envelope, Heart, MapPin, Person, Shield, Smartphone, Calendar, Clock } from '@gravity-ui/icons';
import { Button, Input, ListBox, Select, TextArea, Card } from '@heroui/react';
import { redirect } from 'next/navigation';
import React, { useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

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

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const DonorCreateRequestPage = () => {
  const { data: session } = useSession();

  const { register, handleSubmit, watch, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      requesterName: '',
      requesterEmail: '',
      recipientName: '',
      recipientDistrict: '',
      recipientDistrictId: '',
      recipientUpazila: '',
      recipientUpazilaId: '',
      hospitalName: '',
      fullAddress: '',
      bloodGroup: '',
      donationDate: '',
      donationTime: '',
      requestMessage: '',
      status: 'Pending'
    }
  });

  useEffect(() => {
    if (session?.user) {
      setValue('requesterName', session.user.name || '');
      setValue('requesterEmail', session.user.email || '');
    }
  }, [session, setValue]);

  const watchDistrictId = watch('recipientDistrictId');
  const watchDistrict = watch('recipientDistrict');
  const watchBloodGroup = watch('bloodGroup');

  const filteredUpazilas = useMemo(() => {
    if (!watchDistrictId) return [];
    return UPAZILAS.filter((up) => up.districtId === watchDistrictId);
  }, [watchDistrictId]);

  const onSubmit = async (data) => {
    const updateData = { ...data };
    const result = await createRequest(updateData);
    if (result.insertedId) {
      toast.success('Donor Request Created Successfully...');
      redirect('/requests');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 selection:bg-red-100 selection:text-red-900">
      <div className="max-w-4xl mx-auto">
        <DashboardHeading 
          title="Create Blood Request" 
          description="Provide full patient details to request an immediate blood donation stream." 
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="mt-8 p-6 md:p-10 bg-white border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] rounded-3xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

              {/* SECTION 1: REQUESTER AUTH DATA */}
              <motion.div 
                variants={itemVariants}
                className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/60 rounded-2xl p-5 md:p-6"
              >
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-wide">Your Account Details</h3>
                    <p className="text-xs text-slate-500 mt-1">Auto-filled from secure active login. Profile fields are read-only.</p>
                  </div>
                  <span className="text-[10px] bg-slate-200/70 text-slate-700 font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Auto-filled
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Requester Name</span>
                    <Input
                      readOnly
                      value={watch('requesterName')}
                      placeholder="Authenticated User Name"
                      startContent={<Person className="text-slate-400 w-4 h-4 mr-1" />}
                      className="w-full"
                      classNames={{
                        inputWrapper: "h-12 border border-slate-200 bg-slate-50/50 cursor-not-allowed text-slate-600 shadow-none rounded-xl"
                      }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Requester Email</span>
                    <Input
                      readOnly
                      value={watch('requesterEmail')}
                      placeholder="authenticated-user@gmail.com"
                      startContent={<Envelope className="text-slate-400 w-4 h-4 mr-1" />}
                      className="w-full"
                      classNames={{
                        inputWrapper: "h-12 border border-slate-200 bg-slate-50/50 cursor-not-allowed text-slate-600 shadow-none rounded-xl"
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* SECTION 2: EDITABLE FORM CORE */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-800">Donation Request Details</h2>
                  <p className="text-xs text-slate-400 mt-1">All matching available records will be paired with active surrounding donors.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  {/* Recipient Name */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      Recipient Name <span className="text-red-500">*</span>
                    </span>
                    <Controller
                      name="recipientName"
                      control={control}
                      rules={{ required: 'Recipient Name is required' }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter Recipient Patient's Name"
                          startContent={<Person className="text-slate-400 w-4 h-4 mr-1" />}
                          className="w-full"
                          isInvalid={!!errors.recipientName}
                          errorMessage={errors.recipientName?.message}
                          classNames={{
                            inputWrapper: "h-12 border border-slate-200 focus-within:border-slate-400 bg-white shadow-none rounded-xl transition-all text-sm"
                          }}
                        />
                      )}
                    />
                  </div>

                  {/* Hospital Name */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      Hospital Name <span className="text-red-500">*</span>
                    </span>
                    <Input
                      {...register("hospitalName", { required: 'Hospital Name is required' })}
                      placeholder="e.g., Dhaka Medical College Hospital"
                      startContent={<Shield className="text-slate-400 w-4 h-4 mr-1" />}
                      className="w-full"
                      isInvalid={!!errors.hospitalName}
                      errorMessage={errors.hospitalName?.message}
                      classNames={{
                        inputWrapper: "h-12 border border-slate-200 focus-within:border-slate-400 bg-white shadow-none rounded-xl transition-all text-sm"
                      }}
                    />
                  </div>

                  {/* Recipient District */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      Recipient District <span className="text-red-500">*</span>
                    </span>
                    <Select
                      aria-label="Recipient District"
                      placeholder="Select District"
                      className="w-full"
                      isInvalid={!!errors.recipientDistrictId}
                      errorMessage={errors.recipientDistrictId?.message}
                      selectedKeys={watchDistrictId ? [watchDistrictId] : []}
                      onSelectionChange={(keys) => {
                        const val = Array.from(keys)[0]?.toString() || '';
                        const selectedDistrict = DISTRICTS.find((dist) => dist.id === val);
                        setValue('recipientDistrictId', val, { shouldValidate: true });
                        setValue('recipientDistrict', selectedDistrict?.name || '');
                        setValue('recipientUpazilaId', '');
                        setValue('recipientUpazila', '');
                      }}
                    >
                      <Select.Trigger className="h-12 border border-slate-200 focus-within:border-slate-400 rounded-xl px-4 flex items-center gap-2 bg-white w-full text-left text-sm transition-all shadow-none">
                        <MapPin className="text-slate-400 w-4 h-4 mr-1" />
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
                    <input type="hidden" {...register("recipientDistrictId", { required: 'Recipient District is required' })} />
                  </div>

                  {/* Recipient Upazila */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      Recipient Upazila <span className="text-red-500">*</span>
                    </span>
                    <Select
                      aria-label="Recipient Upazila"
                      placeholder={watchDistrictId ? "Select Upazila" : "Choose district first"}
                      disabledKeys={!watchDistrictId ? ["disabled-state"] : []}
                      className="w-full"
                      isInvalid={!!errors.recipientUpazilaId}
                      errorMessage={errors.recipientUpazilaId?.message}
                      selectedKeys={watch('recipientUpazilaId') ? [watch('recipientUpazilaId')] : []}
                      onSelectionChange={(keys) => {
                        const val = Array.from(keys)[0]?.toString() || '';
                        const upazila = UPAZILAS.find((u) => u.id === val);
                        setValue('recipientUpazilaId', val, { shouldValidate: true });
                        setValue('recipientUpazila', upazila?.name || '');
                      }}
                    >
                      <Select.Trigger
                        className={`h-12 border border-slate-200 rounded-xl px-4 flex items-center gap-2 bg-white w-full text-left text-sm transition-all shadow-none ${!watchDistrict ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''}`}
                      >
                        <MapPin className="text-slate-400 w-4 h-4 mr-1" />
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
                    <input type="hidden" {...register("recipientUpazilaId", { required: 'Recipient Upazila is required' })} />
                  </div>

                  {/* Full Address Details Line */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      Full Address Line <span className="text-red-500">*</span>
                    </span>
                    <Input
                      {...register("fullAddress", { required: 'Full address lines are required' })}
                      placeholder="e.g., House 24, Road 4, Dhanmondi, Dhaka"
                      startContent={<MapPin className="text-slate-400 w-4 h-4 mr-1" />}
                      className="w-full"
                      isInvalid={!!errors.fullAddress}
                      errorMessage={errors.fullAddress?.message}
                      classNames={{
                        inputWrapper: "h-12 border border-slate-200 focus-within:border-slate-400 bg-white shadow-none rounded-xl text-sm"
                      }}
                    />
                  </div>

                  {/* Donation Date */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      Donation Date <span className="text-red-500">*</span>
                    </span>
                    <Input
                      type="date"
                      {...register("donationDate", { required: "Donation Date is required" })}
                      startContent={<Calendar className="text-slate-400 w-4 h-4 mr-1" />}
                      isInvalid={!!errors.donationDate}
                      errorMessage={errors.donationDate?.message}
                      classNames={{
                        inputWrapper: "h-12 border border-slate-200 focus-within:border-slate-400 bg-white shadow-none rounded-xl text-sm"
                      }}
                    />
                  </div>

                  {/* Donation Time */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                      Donation Time <span className="text-red-500">*</span>
                    </span>
                    <Input
                      type="time"
                      {...register("donationTime", { required: "Donation Time is required" })}
                      startContent={<Clock className="text-slate-400 w-4 h-4 mr-1" />}
                      isInvalid={!!errors.donationTime}
                      errorMessage={errors.donationTime?.message}
                      classNames={{
                        inputWrapper: "h-12 border border-slate-200 focus-within:border-slate-400 bg-white shadow-none rounded-xl text-sm"
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              <hr className="border-slate-100 my-2" />

              {/* Blood Group Grid Selection Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col gap-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  Required Blood Group <span className="text-red-500">*</span>
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                  {BLOOD_GROUPS.map((group) => {
                    const isSelected = watchBloodGroup === group;
                    return (
                      <motion.button
                        key={group}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setValue('bloodGroup', group, { shouldValidate: true })}
                        className={`h-12 rounded-xl font-bold border text-sm transition-all flex items-center justify-center shadow-none
                          ${isSelected
                            ? 'border-red-600 bg-gradient-to-br from-red-600 to-[#7D0A0A] text-white shadow-md shadow-red-900/10'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                      >
                        {group}
                      </motion.button>
                    );
                  })}
                </div>
                {errors.bloodGroup && <p className="text-xs text-red-500 mt-1">{errors.bloodGroup.message}</p>}
                <input type="hidden" {...register("bloodGroup", { required: 'Blood Group configuration is required' })} />
              </motion.div>

              {/* Request Message Detailed Text Block Area Field */}
              <motion.div variants={itemVariants} className="w-full flex flex-col gap-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  Request Message (Detailed Reason) <span className="text-red-500">*</span>
                </span>
                <Controller
                  name="requestMessage"
                  control={control}
                  rules={{
                    required: "Detailed reason is required",
                    minLength: {
                      value: 5,
                      message: "Please write at least 5 characters detailing the medical reason.",
                    },
                  }}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder="Explain the patient condition and why they require blood at this moment..."
                      minRows={4}
                      isInvalid={!!errors.requestMessage}
                      errorMessage={errors.requestMessage?.message}
                      classNames={{
                        inputWrapper: "border border-slate-200 focus-within:border-slate-400 bg-white shadow-none rounded-xl text-sm p-4"
                      }}
                    />
                  )}
                />
              </motion.div>

              {/* Submit Request Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                  type="submit"
                  as={motion.button}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full h-13 bg-gradient-to-r from-red-700 to-[#7D0A0A] text-white font-bold text-base rounded-xl hover:opacity-95 transition-all shadow-md shadow-red-900/10 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  Submit Donation Request
                </Button>
              </motion.div>

            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DonorCreateRequestPage;