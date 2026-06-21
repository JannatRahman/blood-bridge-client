// import { deleteEvent } from "@/lib/api/events/actions";
import { deleteRequest } from "@/lib/api/create-request/action";
import { Button, Modal } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteRequestModal = ({ isDeleteOpen, setIsDeleteOpen, id }) => {

  const router = useRouter();
  const handleDeleteRequest = async () => {
    const res = await deleteRequest(id);
    if (res?.deletedCount > 0) {
      router.refresh();
      toast.success("Request deleted successfully");
      setIsDeleteOpen(false)
    }
  }


  return (
    <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="dark text-white bg-[#7D0A0A] border border-white/10 p-6 rounded-2xl w-full max-w-md mx-auto">
            <Modal.Header className="text-white font-bold text-lg">Delete Donor Request</Modal.Header>
            <Modal.Body className="py-2">
              <p className="text-slate-300 text-sm">
                Are you sure you want to delete this request? This will permanently remove the listing and cannot be undone.
              </p>
            </Modal.Body>
            <Modal.Footer className="flex justify-end gap-3 pt-4">
              <Button variant="light"
              
              className="text-black bg-slate-200" onPress={() => setIsDeleteOpen(false)}>Cancel</Button>
              <Button color="danger" className=" text-black  bg-gradient-to-r from-red-300 to-red-700 font-bold" onPress={handleDeleteRequest}>Delete Request</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default DeleteRequestModal;