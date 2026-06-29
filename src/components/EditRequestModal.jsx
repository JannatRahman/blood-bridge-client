import { updateRequest } from "@/lib/api/create-request/action";
import { Button, Form, Input, Label, Modal } from "@heroui/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const updateData = {
      ...data
    }
    // console.log(data);
    const result = await updateRequest(updateData, editingRequest?._id)

    // console.log(result);

    if (result.modifiedCount) {

      toast.success(' Request Updated Successfully...')

      redirect('/dashboard/donor/my-request')
    }
  }


  return (
    <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="dark text-white bg-[#7D0A0A] border border-white/10 p-6 rounded-2xl w-full max-w-lg mx-auto">
            <div className="p-6">
              <Form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-full"
              >
                {/* Name Input */}
                <div className="grid grid-cols-1 gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      defaultValue={editingRequest?.recipientName}
                      label="Recipient Name"
                      className="w-full 
                      text-black
                      bg-white border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                      labelPlacement="outside"
                      placeholder="e.g. John Doe"
                      {...register("name", {
                        required: "Name is required",
                      })}
                    />

                  </div>
                </div>

                {/* Location Dropdown Selection */}
                <div className="grid grid-cols-1 gap-4 w-full">
                  <div className="w-full">
                    <Label htmlFor="districts">Location</Label>
                    <select
                      id="districts"
                      defaultValue={editingRequest?.recipientDistrict || ""}
                      {...register("districts", { required: "District is required" })}
                      className="w-full bg-white border border-white/10 text-black hover:border-pink-500/50 focus:border-pink-500 p-3 rounded-xl mt-1 outline-none"
                    >
                      <option value="" disabled className="bg-slate-950 text-slate-400">Select a District</option>
                      {DISTRICTS.map((dis) => (
                        <option key={dis.id} value={dis.name} className="bg-slate-950 text-white">
                          {dis.name}
                        </option>
                      ))}
                    </select>
                    
                  </div>
                </div>

                {/* Date + Blood Group Row Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      defaultValue={editingRequest?.donationDate}
                      className="w-full bg-white
                      text-black
                      border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                      type="date"
                      label="Date"
                      labelPlacement="outside"
                      {...register("date", {
                        required: "Date is required",
                      })}
                    />

                  </div>

                  <div>
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Input
                      id="bloodGroup"
                      defaultValue={editingRequest?.bloodGroup}
                      type="text"
                      label="Available Blood Group"
                      labelPlacement="outside"
                      placeholder="e.g. A+"
                      className="w-full bg-white
                      text-black
                      border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                      {...register("bloodGroup", {
                        required: "Blood Group is required",
                      })}
                    />

                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-red-300 to-red-700 text-black font-bold h-11 px-6 shadow-lg shadow-pink-500/10 w-full"
                  radius="lg"
                >
                  Update Request Now
                </Button>
              </Form>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditRequestModal;