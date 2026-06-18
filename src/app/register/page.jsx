'use client';

import React, { useState, useMemo } from 'react';
import {
  Input,
  Select,
  ListBox,
  Label,
  Button,
  Avatar
} from '@heroui/react';

// Import Gravity UI Icons
import {
  Person,
  Envelope,
  Smartphone,
  MapPin,
  Lock,
  Camera,
  ArrowChevronRight,
  Eye,
  EyeClosed
} from '@gravity-ui/icons';

const DISTRICTS = [
  { id: "1", name: "Cumilla" },
  { id: "2", name: "Feni" },
  { id: "3", name: "Brahmanbaria" },
  { id: "4", name: "Rangamati" },
  { id: "5", name: "Noakhali" },
  { id: "6", name: "Chandpur" },
  { id: "7", name: "Lakshmipur" },
  { id: "8", name: "Chattogram" },
  { id: "9", name: "Coxsbazar" },
  { id: "10", name: "Khagrachhari" },
  { id: "11", name: "Bandarban" },
  { id: "12", name: "Sirajganj" },
  { id: "13", name: "Pabna" },
  { id: "14", name: "Bogura" },
  { id: "15", name: "Rajshahi" },
  { id: "16", name: "Natore" },
  { id: "17", name: "Joypurhat" },
  { id: "18", name: "Chapainawabganj" },
  { id: "19", name: "Naogaon" },
  { id: "20", name: "Jashore" },
  { id: "21", name: "Satkhira" },
  { id: "22", name: "Meherpur" },
  { id: "23", name: "Narail" },
  { id: "24", name: "Chuadanga" },
  { id: "25", name: "Kushtia" },
  { id: "26", name: "Magura" },
  { id: "27", name: "Khulna" },
  { id: "28", name: "Bagerhat" },
  { id: "29", name: "Jhenaidah" },
  { id: "30", name: "Jhalakathi" },
  { id: "31", name: "Patuakhali" },
  { id: "32", name: "Pirojpur" },
  { id: "33", name: "Barisal" },
  { id: "34", name: "Bhola" },
  { id: "35", name: "Barguna" },
  { id: "36", name: "Sylhet" },
  { id: "37", name: "Moulvibazar" },
  { id: "38", name: "Habiganj" },
  { id: "39", name: "Sunamganj" },
  { id: "40", name: "Narsingdi" },
  { id: "41", name: "Gazipur" },
  { id: "42", name: "Shariatpur" },
  { id: "43", name: "Narayanganj" },
  { id: "44", name: "Tangail" },
  { id: "45", name: "Kishoreganj" },
  { id: "46", name: "Manikganj" },
  { id: "47", name: "Dhaka" },
  { id: "48", name: "Munshiganj" },
  { id: "49", name: "Rajbari" },
  { id: "50", name: "Madaripur" },
  { id: "51", name: "Gopalganj" },
  { id: "52", name: "Faridpur" },
  { id: "53", name: "Panchagarh" },
  { id: "54", name: "Dinajpur" },
  { id: "55", name: "Lalmonirhat" },
  { id: "56", name: "Nilphamari" },
  { id: "57", name: "Gaibandha" },
  { id: "58", name: "Thakurgaon" },
  { id: "59", name: "Rangpur" },
  { id: "60", name: "Kurigram" },
  { id: "61", name: "Sherpur" },
  { id: "62", name: "Mymensingh" },
  { id: "63", name: "Jamalpur" },
  { id: "64", name: "Netrokona" }
];

const UPAZILAS = [
  { id: "1", districtId: "1", name: "Debidwar" },
  { id: "2", districtId: "1", name: "Barura" },
  { id: "3", districtId: "1", name: "Brahmanpara" },
  { id: "4", districtId: "1", name: "Chandina" },
  { id: "5", districtId: "1", name: "Chauddagram" },
  { id: "6", districtId: "1", name: "Daudkandi" },
  { id: "7", districtId: "1", name: "Homna" },
  { id: "8", districtId: "1", name: "Laksam" },
  { id: "9", districtId: "1", name: "Muradnagar" },
  { id: "10", districtId: "1", name: "Nangalkot" },
  { id: "11", districtId: "1", name: "Comilla Sadar" },
  { id: "12", districtId: "1", name: "Meghna" },
  { id: "13", districtId: "1", name: "Monohargonj" },
  { id: "14", districtId: "1", name: "Sadarsouth" },
  { id: "15", districtId: "1", name: "Titas" },
  { id: "16", districtId: "1", name: "Burichang" },
  { id: "17", districtId: "1", name: "Lalmai" },
  { id: "18", districtId: "2", name: "Chhagalnaiya" },
  { id: "19", districtId: "2", name: "Feni Sadar" },
  { id: "20", districtId: "2", name: "Sonagazi" },
  { id: "21", districtId: "2", name: "Fulgazi" },
  { id: "22", districtId: "2", name: "Parshuram" },
  { id: "23", districtId: "2", name: "Daganbhuiyan" },
  { id: "24", districtId: "3", name: "Brahmanbaria Sadar" },
  { id: "25", districtId: "3", name: "Kasba" },
  { id: "26", districtId: "3", name: "Nasirnagar" },
  { id: "27", districtId: "3", name: "Sarail" },
  { id: "28", districtId: "3", name: "Ashuganj" },
  { id: "29", districtId: "3", name: "Akhaura" },
  { id: "30", districtId: "3", name: "Nabinagar" },
  { id: "31", districtId: "3", name: "Bancharampur" },
  { id: "32", districtId: "3", name: "Bijoynagar" },
  { id: "33", districtId: "4", name: "Rangamati Sadar" },
  { id: "34", districtId: "4", name: "Kaptai" },
  { id: "35", districtId: "4", name: "Kawkhali" },
  { id: "36", districtId: "4", name: "Baghaichari" },
  { id: "37", districtId: "4", name: "Barkal" },
  { id: "38", districtId: "4", name: "Langadu" },
  { id: "39", districtId: "4", name: "Rajasthali" },
  { id: "40", districtId: "4", name: "Belaichari" },
  { id: "41", districtId: "4", name: "Juraichari" },
  { id: "42", districtId: "4", name: "Naniarchar" },
  { id: "43", districtId: "5", name: "Noakhali Sadar" },
  { id: "44", districtId: "5", name: "Companiganj" },
  { id: "45", districtId: "5", name: "Begumganj" },
  { id: "46", districtId: "5", name: "Hatia" },
  { id: "47", districtId: "5", name: "Subarnachar" },
  { id: "48", districtId: "5", name: "Kabirhat" },
  { id: "49", districtId: "5", name: "Senbug" },
  { id: "50", districtId: "5", name: "Chatkhil" },
  { id: "51", districtId: "5", name: "Sonaimori" },
  { id: "52", districtId: "6", name: "Haimchar" },
  { id: "53", districtId: "6", name: "Kachua" },
  { id: "54", districtId: "6", name: "Shahrasti" },
  { id: "55", districtId: "6", name: "Chandpur Sadar" },
  { id: "56", districtId: "6", name: "Matlab South" },
  { id: "57", districtId: "6", name: "Hajiganj" },
  { id: "58", districtId: "6", name: "Matlab North" },
  { id: "59", districtId: "6", name: "Faridgonj" },
  { id: "60", districtId: "7", name: "Lakshmipur Sadar" },
  { id: "61", districtId: "7", name: "Kamalnagar" },
  { id: "62", districtId: "7", name: "Raipur" },
  { id: "63", districtId: "7", name: "Ramgati" },
  { id: "64", districtId: "7", name: "Ramganj" },
  { id: "65", districtId: "8", name: "Rangunia" },
  { id: "66", districtId: "8", name: "Sitakunda" },
  { id: "67", districtId: "8", name: "Mirsharai" },
  { id: "68", districtId: "8", name: "Patiya" },
  { id: "69", districtId: "8", name: "Sandwip" },
  { id: "70", districtId: "8", name: "Banshkhali" },
  { id: "71", districtId: "8", name: "Boalkhali" },
  { id: "72", districtId: "8", name: "Anwara" },
  { id: "73", districtId: "8", name: "Chandanaish" },
  { id: "74", districtId: "8", name: "Satkania" },
  { id: "75", districtId: "8", name: "Lohagara" },
  { id: "76", districtId: "8", name: "Hathazari" },
  { id: "77", districtId: "8", name: "Fatikchhari" },
  { id: "78", districtId: "8", name: "Raozan" },
  { id: "79", districtId: "8", name: "Karnafuli" },
  { id: "80", districtId: "9", name: "Coxsbazar Sadar" },
  { id: "81", districtId: "9", name: "Chakaria" },
  { id: "82", districtId: "9", name: "Kutubdia" },
  { id: "83", districtId: "9", name: "Ukhiya" },
  { id: "84", districtId: "9", name: "Moheshkhali" },
  { id: "85", districtId: "9", name: "Pekua" },
  { id: "86", districtId: "9", name: "Ramu" },
  { id: "87", districtId: "9", name: "Teknaf" },
  { id: "88", districtId: "10", name: "Khagrachhari Sadar" },
  { id: "89", districtId: "10", name: "Dighinala" },
  { id: "90", districtId: "10", name: "Panchari" },
  { id: "91", districtId: "10", name: "Laxmichhari" },
  { id: "92", districtId: "10", name: "Mohalchari" },
  { id: "93", districtId: "10", name: "Manikchari" },
  { id: "94", districtId: "10", name: "Ramgarh" },
  { id: "95", districtId: "10", name: "Matiranga" },
  { id: "96", districtId: "10", name: "Guimara" },
  { id: "97", districtId: "11", name: "Bandarban Sadar" },
  { id: "98", districtId: "11", name: "Alikadam" },
  { id: "99", districtId: "11", name: "Naikhongchhari" },
  { id: "100", districtId: "11", name: "Rowangchhari" },
  { id: "101", districtId: "11", name: "Lama" },
  { id: "102", districtId: "11", name: "Ruma" },
  { id: "103", districtId: "11", name: "Thanchi" },
  { id: "104", districtId: "12", name: "Belkuchi" },
  { id: "105", districtId: "12", name: "Chauhali" },
  { id: "106", districtId: "12", name: "Kamarkhand" },
  { id: "107", districtId: "12", name: "Kazipur" },
  { id: "108", districtId: "12", name: "Raigonj" },
  { id: "109", districtId: "12", name: "Shahjadpur" },
  { id: "110", districtId: "12", name: "Sirajganj Sadar" }
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const GENDERS = ['Male', 'Female', 'Other'];

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    district: '',
    upazila: '',
    bloodGroup: '',
    password: '',
    confirmPassword: '',
  });

  const filteredUpazilas = useMemo(() => {
    if (!formData.district) return [];
    return UPAZILAS.filter(up => up.districtId === formData.district);
  }, [formData.district]);

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'district') {
        updated.upazila = '';
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Registration:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 border border-gray-100">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#dd3333] tracking-tight mb-2">
            Join the Lifesaving Community
          </h1>
          <p className="text-sm text-gray-500">
            Create an account to become a donor and save lives
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Avatar Area */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="relative group cursor-pointer">
              <Avatar
                icon={<Person className="w-8 h-8 text-gray-400" />}
                className="w-24 h-24 bg-orange-50/50 border border-dashed border-gray-200"
              />
              <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md border border-gray-100 flex items-center justify-center">
                <Camera className="text-gray-600 w-3.5 h-3.5" />
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-700 mt-2">Profile Photo</span>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Full Name</span>
              <Input
                type="text"
                placeholder="Donor"
                startContent={<Person className="text-gray-400 w-4 h-4" />}
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full"
                classNames={{ 
                  inputWrapper: "h-12 border border-gray-200 focus-within:border-gray-400" 
                }}
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Email Address</span>
              <Input
                type="email"
                placeholder="donor@gmail.com"
                startContent={<Envelope className="text-gray-400 w-4 h-4" />}
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full"
                classNames={{ 
                  inputWrapper: "h-12 border border-gray-200 focus-within:border-gray-400" 
                }}
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Phone Number</span>
              <Input
                type="tel"
                placeholder="01822334455"
                startContent={<Smartphone className="text-gray-400 w-4 h-4" />}
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="w-full"
                classNames={{
                  inputWrapper: "h-12 border border-pink-200 bg-blue-50/40 focus-within:border-pink-300"
                }}
              />
            </div>

            {/* Gender Field via v3 Compound Design */}
            <div className="flex flex-col gap-1.5">
              <Select 
                placeholder="Select Gender" 
                value={formData.gender} 
                onChange={(val) => handleChange('gender', val)}
                className="w-full"
              >
                <Label className="text-sm font-semibold text-gray-700">Gender</Label>
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
            </div>

            {/* District Field via v3 Compound Design */}
            <div className="flex flex-col gap-1.5">
              <Select 
                placeholder="Select District" 
                value={formData.district} 
                onChange={(val) => handleChange('district', val)}
                className="w-full"
              >
                <Label className="text-sm font-semibold text-gray-700">District</Label>
                <Select.Trigger className="h-12 border border-gray-200 rounded-xl px-3 flex items-center gap-2 bg-white w-full text-left">
                  <MapPin className="text-gray-400 w-4 h-4" />
                  <Select.Value />
                  <Select.Indicator className="ml-auto" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {DISTRICTS.map((dist) => (
                      <ListBox.Item id={dist.id} key={dist.id} textValue={dist.name}>
                        {dist.name}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Upazila Dependent Field via v3 Compound Design */}
            <div className="flex flex-col gap-1.5">
              <Select 
                placeholder={formData.district ? "Select Upazila" : "Choose district first"} 
                value={formData.upazila} 
                onChange={(val) => handleChange('upazila', val)}
                disabledKeys={!formData.district ? ["disabled-state"] : []}
                className="w-full"
              >
                <Label className="text-sm font-semibold text-gray-700">Upazila</Label>
                <Select.Trigger 
                  className={`h-12 border border-gray-200 rounded-xl px-3 flex items-center gap-2 bg-white w-full text-left ${!formData.district ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}`}
                >
                  <MapPin className="text-gray-400 w-4 h-4" />
                  <Select.Value />
                  <Select.Indicator className="ml-auto" />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {formData.district ? (
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
            </div>

          </div>

          {/* Blood Group Grid Buttons */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-gray-700">Blood Group</span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {BLOOD_GROUPS.map((group) => {
                const isSelected = formData.bloodGroup === group;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => handleChange('bloodGroup', group)}
                    className={`h-11 rounded-xl font-bold border text-sm transition-all flex items-center justify-center
                      ${isSelected
                        ? 'border-[#dd3333] bg-[#dd3333] text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Password</span>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="........"
                startContent={<Lock className="text-gray-400 w-4 h-4 flex-shrink-0" />}
                endContent={
                  <button
                    className="focus:outline-none flex items-center justify-center h-full text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeClosed className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                }
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full"
                classNames={{ 
                  inputWrapper: "h-12 border border-gray-200 focus-within:border-gray-400 flex items-center justify-between",
                  input: "w-full" 
                }}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-gray-700">Confirm Password</span>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="........"
                startContent={<ArrowChevronRight className="text-gray-400 w-4 h-4 flex-shrink-0" />}
                endContent={
                  <button
                    className="focus:outline-none flex items-center justify-center h-full text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeClosed className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                }
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className="w-full"
                classNames={{ 
                  inputWrapper: "h-12 border border-gray-200 focus-within:border-gray-400 flex items-center justify-between",
                  input: "w-full" 
                }}
              />
            </div>

          </div>

          {/* Submit Action */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#e53935] text-white font-bold text-base rounded-xl hover:bg-[#d32f2f] transition-colors mt-4 shadow-sm"
          >
            Complete Registration
          </Button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="#login" className="text-[#e53935] font-bold hover:underline">
              Login here
            </a>
          </div>

        </form>
      </div>
    </div>
  );
}