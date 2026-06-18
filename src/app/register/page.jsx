'use client';

import React, { useState, useMemo } from 'react';
import {
  Input,
  Select,
  ListBox,
  Label,
  Button,
} from '@heroui/react';

// Import Gravity UI Icons
import {
  Person,
  Envelope,
  Smartphone,
  MapPin,
  Lock,
  ArrowChevronRight,
  Eye,
  EyeClosed,
  Heart,
  Shield,
  Camera
} from '@gravity-ui/icons';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

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
const GENDERS = ['Male', 'Female', 'Other'];
const ROLES = ['Donor', 'Volunteer'];

export default function RegistrationForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      district: '',
      districtId: '',
      upazila: '',
      upazilaId: '',
      role: 'Donor',
      bloodGroup: '',
      password: '',
      confirmPassword: '',
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const watchDistrictId = watch('districtId');
  const watchDistrict = watch('district');
  const watchRole = watch('role');
  const watchBloodGroup = watch('bloodGroup');
  const watchPassword = watch('password');

  const filteredUpazilas = useMemo(() => {
    if (!watchDistrictId) return [];
    return UPAZILAS.filter((up) => up.districtId === watchDistrictId);
  }, [watchDistrictId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setIsUploading(true);

    try {
      let imageUrl = "";
      const file = data.image?.[0];

      // 1. First, upload the image if it exists to get the URL string
      if (file) {
        const imgFormData = new FormData();
        imgFormData.append('image', file);

        const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: imgFormData
        });

        const result = await response.json();
        if (result.success) {
          imageUrl = result.data.url;
        } else {
          throw new Error("ImgBB upload failed");
        }
      }


      const { data: signUpData, error: signUpError } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.fullName,
        role: data.role,
        image: imageUrl || undefined,


        metadata: {
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          district: data.district,
          districtId: data.districtId,
          upazila: data.upazila,
          upazilaId: data.upazilaId,
          role: data.role,
          bloodGroup: data.bloodGroup,
        }
      });

      if (signUpError) {
       toast.error('Registration failed')

      } else {
        toast.success('Registration successful')
      }

    } catch (error) {
      console.error("Error during registration flow:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 border border-2 border-[#7D0A0A]">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#7D0A0A] tracking-tight mb-2">
            Join the Lifesaving Community
          </h1>
          <p className="text-sm text-gray-500">
            Create an account to become a donor and save lives
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Image upload workflow */}
          <div className="flex flex-col items-center justify-center mb-6">
            <label htmlFor="image" className="relative group cursor-pointer flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center relative">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Preview Avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Person className="w-8 h-8 text-gray-400" />
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                  <Camera className="text-white w-5 h-5" />
                </div>
              </div>
              <div className="absolute bottom-6 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 flex items-center justify-center pointer-events-none">
                <Camera className="text-gray-600 w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-semibold text-gray-700 mt-2">Profile Photo</span>
            </label>

            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              {...register("image", {
                required: 'Image is required',
                onChange: handleImageChange
              })}
            />
            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Full Name</span>
              <Input
                {...register("fullName", { required: 'Name is required' })}
                placeholder="Enter Your Name"
                startContent={<Person className="text-gray-400 w-4 h-4" />}
                className="w-full"
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName?.message}
                classNames={{
                  inputWrapper: "h-12 border border-gray-200 focus-within:border-gray-400"
                }}
              />
              {
                errors.name && <p className="text-red-500">{errors.name.message}</p>
              }
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Email Address</span>
              <Input
                {...register("email", { required: 'Email is required' })}
                type="email"
                placeholder="donor@gmail.com"
                startContent={<Envelope className="text-gray-400 w-4 h-4" />}
                className="w-full"
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                classNames={{
                  inputWrapper: "h-12 border border-gray-200 focus-within:border-gray-400"
                }}
              />
              {
                errors.name && <p className="text-red-500">{errors.name.message}</p>
              }
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Phone Number</span>
              <Input
                {...register("phoneNumber", {
                  required: 'Number is required',
                  maxLength: { value: 11, message: "Must be exactly 11 digits" },
                  minLength: { value: 11, message: "Must be exactly 11 digits" }
                })}
                type="tel"
                placeholder="01822334455"
                startContent={<Smartphone className="text-gray-400 w-4 h-4" />}
                className="w-full"
                isInvalid={!!errors.phoneNumber}
                errorMessage={errors.phoneNumber?.message}
                classNames={{
                  inputWrapper: "h-12 border border-pink-200 bg-blue-50/40 focus-within:border-pink-300"
                }}
              />
              {
                errors.name && <p className="text-red-500">{errors.name.message}</p>
              }
            </div>

            {/* Gender Field */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Gender</span>
              <Select
                aria-label="Gender"
                placeholder="Select Gender"
                className="w-full"
                isInvalid={!!errors.gender}
                errorMessage={errors.gender?.message}
                selectedKeys={watch('gender') ? [watch('gender')] : []}
                onSelectionChange={(keys) => setValue('gender', Array.from(keys)[0]?.toString() || '', { shouldValidate: true })}
              >
                <Select.Trigger className="h-12 border border-gray-200 rounded-xl px-3 flex items-center gap-2 bg-white w-full text-left">
                  <Person className="text-gray-400 w-4 h-4" />
                  <Select.Value />
                  <Select.Indicator className="ml-auto" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {GENDERS.map((gender) => (
                      <ListBox.Item id={gender} key={gender} textValue={gender}>
                        {gender}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
              {/* Register hidden input field for form binding natively */}
              <input type="hidden" {...register("gender", { required: 'Gender is required' })} />
              {
                errors.name && <p className="text-red-500">{errors.name.message}</p>
              }
            </div>

            {/* District Field */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">District</span>
              <Select
                aria-label="District"
                placeholder="Select District"
                className="w-full"
                isInvalid={!!errors.districtId}
                errorMessage={errors.districtId?.message}
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
                <Select.Trigger className="h-12 border border-gray-200 rounded-xl px-3 flex items-center gap-2 bg-white w-full text-left">
                  <MapPin className="text-gray-400 w-4 h-4" />
                  <Select.Value />
                  <Select.Indicator className="ml-auto" />
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
              <input type="hidden" {...register("districtId", { required: 'District is required' })} />
              {
                errors.name && <p className="text-red-500">{errors.name.message}</p>
              }
            </div>

            {/* Upazila Dependent Field */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Upazila</span>
              <Select
                aria-label="Upazila"
                placeholder={watchDistrictId ? "Select Upazila" : "Choose district first"}
                disabledKeys={!watchDistrictId ? ["disabled-state"] : []}
                className="w-full"
                isInvalid={!!errors.upazilaId}
                errorMessage={errors.upazilaId?.message}
                selectedKeys={watch('upazilaId') ? [watch('upazilaId')] : []}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0]?.toString() || '';
                  const upazila = UPAZILAS.find((u) => u.id === val);
                  setValue('upazilaId', val, { shouldValidate: true });
                  setValue('upazila', upazila?.name || '');
                }}
              >
                <Select.Trigger
                  className={`h-12 border border-gray-200 rounded-xl px-3 flex items-center gap-2 bg-white w-full text-left ${!watchDistrict ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                >
                  <MapPin className="text-gray-400 w-4 h-4" />
                  <Select.Value />
                  <Select.Indicator className="ml-auto" />
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
              <input type="hidden" {...register("upazilaId", { required: 'Upazila is required' })} />
              {
                errors.name && <p className="text-red-500">{errors.name.message}</p>
              }
            </div>

          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-700">Select Your Role</span>

            <div className="grid grid-cols-2 gap-4">
              {ROLES.map((role) => {
                const isSelected = watchRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setValue('role', role)}
                    className={`h-12 rounded-xl font-bold border text-sm transition-all flex items-center justify-center gap-2
                      ${isSelected
                        ? 'border-[#7D0A0A] bg-[#7D0A0A] text-white shadow-md'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {role === 'Donor' ? (
                      <Heart className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#7D0A0A]'}`} />
                    ) : (
                      <Shield className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                    )}
                    {role}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Blood Group Grid Buttons */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-700">Blood Group</span>
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
                        ? 'border-[#7D0A0A] bg-[#BF3131] text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
            {errors.bloodGroup && <p className="text-xs text-red-500 mt-1">{errors.bloodGroup.message}</p>}
            <input type="hidden" {...register("bloodGroup", { required: 'Blood Group is required' })} />
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Password</span>
              <Input
                {...register("password", {
                  required: 'Password is required',
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  maxLength: { value: 20, message: "Maximum 20 characters" }
                })}
                type={showPassword ? "text" : "password"}
                placeholder="........"
                startContent={<Lock className="text-gray-400 w-4 h-4 flex-shrink-0" />}
                endContent={
                  <button
                    className="focus:outline-none flex items-center justify-center h-full text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                className="w-full"
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                classNames={{
                  inputWrapper: "h-12 border border-gray-200 focus-within:border-gray-400 flex items-center justify-between",
                  input: "w-full"
                }}
              />
              {
                errors.name && <p className="text-red-500">{errors.name.message}</p>
              }
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Confirm Password</span>
              <Input
                {...register("confirmPassword", {
                  required: 'Please confirm your password',
                  validate: (value) => value === watchPassword || "Passwords do not match"
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="........"
                startContent={<ArrowChevronRight className="text-gray-400 w-4 h-4 flex-shrink-0" />}
                endContent={
                  <button
                    className="focus:outline-none flex items-center justify-center h-full text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                }
                className="w-full"
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword?.message}
                classNames={{
                  inputWrapper: "h-12 border border-gray-200 focus-within:border-gray-400 flex items-center justify-between",
                  input: "w-full"
                }}
              />
              {
                errors.name && <p className="text-red-500">{errors.name.message}</p>
              }
            </div>

          </div>

          {/* Submit Action */}
          <Button
            type="submit"
            isLoading={isUploading}
            className="w-full h-12 bg-[#7D0A0A] text-white font-bold text-base rounded-xl hover:bg-[#BF3131] transition-colors mt-4 shadow-sm"
          >
            {isUploading ? "Uploading Image..." : "Complete Registration"}
          </Button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="#login" className="text-[#7D0A0A] font-bold hover:underline">
              Login here
            </a>
          </div>

        </form>
      </div>
    </div>
  );
}