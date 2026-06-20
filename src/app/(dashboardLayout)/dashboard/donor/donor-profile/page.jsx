'use client'
import { uploadImage } from '@/app/utils/uploadImage';
import DashboardHeading from '@/components/DashboardHeading';
import { addProfile, updateProfile } from '@/lib/api/profile/action';
import { myProfile } from '@/lib/api/profile/data';
import { useSession } from '@/lib/auth-client';
import { Button, Card, CardHeader, Input } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaImage, FaUser, FaMapMarkerAlt, FaTint, FaMapPin, FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { Camera, Person } from '@gravity-ui/icons';

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

const DonorProfile = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    const setProfileData = async () => {
      
        const profileData = await myProfile(session.user.email);
        setProfile(profileData);

      //   if (profileData) {
      //     reset({
      //       name: profileData.name,
      //       district: profileData.district,
      //       upazila: profileData.upazila,
      //       bloodGroup: profileData.bloodGroup
      //     });
        
      // }
    };
    setProfileData();
  }, [session, ]);

  const onProfileSubmit = async (data) => {
    try {
      setIsUploading(true);

      const imageFile = data.image[0];
      const imageUrl = await uploadImage(imageFile)

      const profileData = {
        name: data.name,
        image: imageUrl,
        district: data.district,
        upazila: data.upazila,
        bloodGroup: data.bloodGroup,
        email: session.user.email,
      };

      if (!profile) {
        const res = await addProfile(profileData);
        if (res?.insertedId) {
          toast.success("Profile added successfully!");
        }

      } else {

        const updatedRes = await updateProfile(profileData, profile._id);
        if (updatedRes?.modifiedCount > 0) {

          toast.success("Profile updated successfully!");
        }

      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  return (

    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">

      <DashboardHeading title='My Donor Profile' description='Update Your Profile' />



      <form onSubmit={handleSubmit(onProfileSubmit)} className="mt-8 max-w-5xl space-y-6">



        {/* Header Banner / Profile Card */}

        <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 p-6 shadow-sm">

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">

            <div className="flex flex-col items-center gap-4 sm:flex-row text-center sm:text-left">

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

                {/* {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>} */}

              </div>

              <div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">

                  <h2 className="text-2xl font-bold text-slate-800">{profile?.name || "New Donor"}</h2>



                </div>

                <p className="text-sm text-slate-500 mt-1">{session?.user?.email}</p>

              </div>

            </div>



            {/* Image input hidden inside a clean action button */}



            {/* <input

              {...register("image", { required: !profile ? "Image is Required" : false })}

              type="file"

              accept="image/*"

              id="image"

              className="hidden"

            /> */}

          </div>

          {/* {errors.image && <p className="text-red-500 text-xs mt-2 text-center sm:text-left">{errors.image.message}</p>} */}

        </div>



        {/* Profile Details Grid Card */}

        <Card className="border border-slate-100 bg-white shadow-sm rounded-2xl" radius="lg">

          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 p-6">

            <div>

              <h3 className="text-lg font-bold text-slate-800">Profile details</h3>

              <p className="text-slate-400 text-xs mt-0.5">Manage and update your donor information details below.</p>

            </div>

          </CardHeader>



          <div className="p-6">

            {/* Clean input fields grid layout matching reference structure */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">



              {/* Full Name */}

              <div className="space-y-1">

                <Input

                  {...register("name", { required: "Name is Required" })}
                  id="name"
                  label="Full Name"
                  labelPlacement="outside"
                  placeholder="e.g. John Doe"
                  startContent={<FaUser className="text-slate-400 text-sm mr-1" />}
                  className="w-full"
                  variant="bordered"
                  radius="md"

                />

                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

              </div>
              {/* Blood Group */}

              <div className="space-y-1">

                <Input
                  {...register("bloodGroup", { required: "Blood Group is Required" })}
                  id="bloodGroup"
                  label="Blood Group"
                  labelPlacement="outside"
                  placeholder="e.g. O+"
                  startContent={<FaTint className="text-red-500 text-sm mr-1" />}
                  className="w-full"
                  variant="bordered"
                  radius="md"

                />
                {errors.bloodGroup && <p className="text-red-500 text-xs">{errors.bloodGroup.message}</p>}

              </div>
              {/* District */}

              <div className="space-y-1">

                <Input

                  {...register("district", { required: "District is Required" })}
                  id="district"
                  label="District"
                  labelPlacement="outside"
                  placeholder="e.g. Dhaka"
                  startContent={<FaMapMarkerAlt className="text-slate-400 text-sm mr-1" />}
                  className="w-full"
                  variant="bordered"
                  radius="md"

                />

                {errors.district && <p className="text-red-500 text-xs">{errors.district.message}</p>}

              </div>
              {/* Upazila */}

              <div className="space-y-1">
                <Input
                  {...register("upazila", { required: "Upazila is Required" })}
                  id="upazila"
                  label="Upazila"
                  labelPlacement="outside"
                  placeholder="e.g. Mirpur"
                  startContent={<FaMapPin className="text-slate-400 text-sm mr-1" />}
                  className="w-full"
                  variant="bordered"
                  radius="md"
                />
                {errors.upazila && <p className="text-red-500 text-xs">{errors.upazila.message}</p>}
              </div>
            </div>
            {/* Save Action Bar */}
            <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-slate-100">

              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-10 px-6 shadow-sm" radius="md">
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};
export default DonorProfile;