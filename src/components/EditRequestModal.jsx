import { updateRequest } from "@/lib/api/create-request/action";
import { Button, Form, Input, Modal } from "@heroui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";

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

const EditRequestModal = ({ isModalOpen, setIsModalOpen, editingRequest }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const updateData = { ...data };
      const result = await updateRequest(updateData, editingRequest?._id);
      
      if (result?.modifiedCount) {
        toast.success('Request Updated Successfully...');
        setIsModalOpen(false);
      } else {
        toast.error('No updates were made.');
      }
    } catch (err) {
      toast.error('Failed to update request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Centralized class overrides for HeroUI Inputs to ensure high-fidelity match
  const customInputClasses = {
    label: "text-slate-300 text-sm font-medium mb-1",
    input: "text-white placeholder:text-slate-500",
    inputWrapper: [
      "bg-slate-900/60",
      "border",
      "border-white/10",
      "hover:border-pink-500/40",
      "focus-within:!border-pink-500",
      "transition-all",
      "duration-200",
      "h-12",
      "rounded-xl"
    ],
  };

  return (
    <Modal 
      isOpen={isModalOpen} 
      onOpenChange={setIsModalOpen}
      backdrop="blur"
      placement="center"
      className="dark text-white bg-slate-950 border border-white/10 rounded-2xl max-w-lg mx-4 overflow-hidden"
    >
      <div className="flex flex-col w-full">
        {/* Header Section */}
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-indigo-400 bg-clip-text text-transparent">
            Edit Donation Request
          </h2>
          <p className="text-xs text-slate-400 mt-1">Update recipient details and scheduling constraints below.</p>
        </div>

        {/* Form Fields Body */}
        <Form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Recipient Name Input */}
          <div className="w-full flex flex-col">
            <span className="text-slate-300 text-sm font-medium mb-1.5">Recipient Name</span>
            <Input
              id="name"
              defaultValue={editingRequest?.recipientName}
              variant="bordered"
              classNames={customInputClasses}
              placeholder="e.g. John Doe"
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              {...register("name", { required: "Name is required" })}
            />
          </div>

          {/* Location Custom Dropdown Select */}
          <div className="w-full flex flex-col">
            <label htmlFor="districts" className="text-slate-300 text-sm font-medium mb-1.5">
              Location / District
            </label>
            <select
              id="districts"
              defaultValue={editingRequest?.recipientDistrict || ""}
              {...register("districts", { required: "District is required" })}
              className="w-full h-12 bg-slate-900/60 border border-white/10 text-white hover:border-pink-500/40 focus:border-pink-500 p-3 rounded-xl outline-none transition-all duration-200 text-sm"
            >
              <option value="" disabled className="bg-slate-950 text-slate-500">Select a District</option>
              {DISTRICTS.map((dis) => (
                <option key={dis.id} value={dis.id} className="bg-slate-950 text-white">
                  {dis.name}
                </option>
              ))}
            </select>
            {errors.districts && (
              <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.districts.message}</p>
            )}
          </div>

          {/* Grid Layout: Date & Blood Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col">
              <span className="text-slate-300 text-sm font-medium mb-1.5">Donation Date</span>
              <Input
                id="date"
                type="date"
                defaultValue={editingRequest?.donationDate}
                variant="bordered"
                classNames={customInputClasses}
                isInvalid={!!errors.date}
                errorMessage={errors.date?.message}
                {...register("date", { required: "Date is required" })}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-slate-300 text-sm font-medium mb-1.5">Blood Group</span>
              <Input
                id="bloodGroup"
                type="text"
                placeholder="e.g. A+"
                defaultValue={editingRequest?.bloodGroup}
                variant="bordered"
                classNames={customInputClasses}
                isInvalid={!!errors.bloodGroup}
                errorMessage={errors.bloodGroup?.message}
                {...register("bloodGroup", { required: "Blood Group is required" })}
              />
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-6 w-full">
            <Button 
              variant="light" 
              className="text-slate-400 hover:text-white hover:bg-white/5 font-medium px-4"
              onPress={() => setIsModalOpen(false)}
              isDisabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold h-11 px-6 shadow-lg shadow-pink-500/10 hover:opacity-95 active:scale-[0.98] transition-all"
              radius="xl"
            >
              Update Request Now
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default EditRequestModal;