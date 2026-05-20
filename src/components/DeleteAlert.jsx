"use client";

import { BsTrash2 } from "react-icons/bs";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function DeleteAlert({ tutor }) {

  const { _id, tutorName } = tutor;

  const router = useRouter();

  const handleDelete = async () => {

    try {

      const res = await fetch(
        `http://127.0.0.1:5000/tutors/${_id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      console.log(data);

      if (data.success) {

        toast.success("Tutor deleted successfully");

        router.push("/tutors");

        router.refresh();

      } else {

        toast.error("Delete failed");
      }

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>

      {/* Open Modal Button */}
      <Button
        className="text-red-500 rounded-none"
        variant="outline"
      >
        <BsTrash2 size={16} />

        Delete
      </Button>

      {/* Modal */}
      <AlertDialog.Backdrop>

        <AlertDialog.Container>

          <AlertDialog.Dialog className="sm:max-w-[400px]">

            <AlertDialog.CloseTrigger />

            {/* Header */}
            <AlertDialog.Header>

              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>
                Delete tutor permanently?
              </AlertDialog.Heading>

            </AlertDialog.Header>

            {/* Body */}
            <AlertDialog.Body>

              <p>
                This will permanently delete
                <strong> {tutorName} </strong>
                and all of its data.
                This action cannot be undone.
              </p>

            </AlertDialog.Body>

            {/* Footer */}
            <AlertDialog.Footer>

              <Button
                slot="close"
                variant="tertiary"
              >
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
              >
                Delete
              </Button>

            </AlertDialog.Footer>

          </AlertDialog.Dialog>

        </AlertDialog.Container>

      </AlertDialog.Backdrop>

    </AlertDialog>
  );
}