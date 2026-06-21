"use client";

import {
  Modal,
  Button,
  Input,
  useOverlayState,
} from "@heroui/react";

const DonateModal = ({ donation }) => {
  // HeroUI v3 replaces useDisclosure with useOverlayState
  const state = useOverlayState();

  // Get these from your auth context
  const user = {
    name: "John Doe",
    email: "john@gmail.com",
  };

  const handleConfirmDonation = async () => {
    const donationInfo = {
      donorName: user.name,
      donorEmail: user.email,
      status: "Inprogress",
    };

    console.log(donationInfo);

    // PATCH API HERE
    // await axios.patch(`/donation/${donation._id}`, donationInfo)
  };

  return (
    <>
      <Button
        size="lg"
        color="danger"
        className="w-full md:w-auto"
        onPress={state.open}
      >
        Donate Now ❤️
      </Button>

      {/* Main Modal container */}
      <Modal>
        {/* Backdrop overlay configuration */}
        <Modal.Backdrop variant="opaque">
          {/* Container coordinates open/close state */}
          <Modal.Container
            isOpen={state.isOpen}
            onOpenChange={state.setOpen}
            placement="center"
          >
            {/* Dialog contains the render logic and provides the 'close' method */}
            <Modal.Dialog>
              {({ close }) => (
                <>
                  <Modal.Header>
                    Confirm Blood Donation
                  </Modal.Header>

                  <Modal.Body>
                    <Input
                      label="Donor Name"
                      value={user.name}
                      isReadOnly
                    />

                    <Input
                      label="Donor Email"
                      value={user.email}
                      isReadOnly
                    />

                    <Input
                      label="Recipient"
                      value={donation?.recipientName || ""}
                      isReadOnly
                    />

                    <Input
                      label="Blood Group"
                      value={donation?.bloodGroup || ""}
                      isReadOnly
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