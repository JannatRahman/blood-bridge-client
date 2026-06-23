"use client";

import { baseUrl } from "@/lib/api/baseUrl";
// 1. FIX: Import authClient directly so authClient.useSession() is valid
import { authClient } from "@/lib/auth-client";
import {
  Modal,
  Button,
  Input,
  useOverlayState,
} from "@heroui/react";

const DonateModal = ({ donation }) => {
  const state = useOverlayState();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // 2. FIX: Removed the duplicate/broken declaration block here
  const handleConfirmDonation = async () => {
    if (!user) {
      alert("You must be logged in to confirm a donation request.");
      return;
    }

    const donationInfo = {
      donorName: user.name,
      donorEmail: user.email,
      status: "Inprogress",
    };

    try {

      const response = await fetch(`${baseUrl}/api/single-request/${donation._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationInfo),
      });

      if (response.ok) {
        alert("Thank you! You have successfully stepped up to donate.");
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to register donation.");
      }
    } catch (error) {
      console.error("Error updating donation request:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Button
        className="w-full bg-[#7D0A0A] text-white p-2 font-semibold rounded-xl"
        onPress={state.open}
      >
        Donate Now ❤️
      </Button>

      <Modal
      className=' '
        isOpen={state.isOpen}
        onOpenChange={state.setOpen}
        placement="center"
      >
        <Modal.Backdrop variant="opaque">
          <Modal.Container>
            <Modal.Dialog>
              {({ close }) => (
                <>
                  <Modal.Header className="text-xl font-bold">
                    Confirm Blood Donation
                  </Modal.Header>

                  <Modal.Body className="space-y-4">
                    {/* 3. FIX: Added ?. so it safely falls back to "" if loading */}
                    <Input
                      label="Donor Name"
                      value={user?.name || ""}
                      readOnly
                    />

                    <Input
                      label="Donor Email"
                      value={user?.email || ""}
                      readOnly
                    />

                    <Input
                      label="Recipient"
                      value={donation?.recipientName || ""}
                      readOnly
                    />

                    <Input
                      label="Blood Group"
                      value={donation?.bloodGroup || ""}
                      readOnly
                    />
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      variant="light"
                      onPress={close}
                    >
                      Cancel
                    </Button>

                    <Button
                    className='bg-[#7D0A0A]'
                      color="danger"
                      onPress={() => {
                        handleConfirmDonation();
                        close();
                      }}
                    >
                      Confirm Donation
                    </Button>
                  </Modal.Footer>
                </>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

export default DonateModal;