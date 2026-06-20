import DashboardHeading from '@/components/DashboardHeading';
import { Envelope, Heart, MapPin, Person, Shield, Smartphone } from '@gravity-ui/icons';
import { Button, Input , ListBox, Select} from '@heroui/react';
import React from 'react';

const DonorCreateRequestPage = () => {
  return (
    <div>
      <DashboardHeading title='Create Request' description='Create Donor Request'/>
      <form  className="space-y-6">
      
                {/* Image upload workflow */}
               
      
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
      
               
      
                {/* Submit Action */}
                <Button
                  type="submit"
                 
                  className="w-full h-12 bg-[#7D0A0A] text-white font-bold text-base rounded-xl hover:bg-[#BF3131] transition-colors mt-4 shadow-sm"
                >
                 Create Request
                </Button>
      
                
      
              </form>
    </div>
  );
};

export default DonorCreateRequestPage;