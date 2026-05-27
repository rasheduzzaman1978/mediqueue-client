"use client";

import { BsTrash2 } from "react-icons/bs";

import {
  AlertDialog,
  Button,
} from "@heroui/react";

import { useRouter } from "next/navigation";

import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";

export function DeleteAlert({
  tutor,
}) {

  const {
    _id,
    tutorName,
  } = tutor;

  const router = useRouter();

  // ==================================================
  // DELETE TUTOR
  // ==================================================

  const handleDelete =
    async () => {

      try {

        // ================= GET JWT TOKEN =================

        const {
          data: tokenData,
        } =
          await authClient.token();

        // ================= DELETE REQUEST =================

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/tutors/${_id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${tokenData?.token}`,
            },
          }
        );

        const data =
          await res.json();

        // ================= SUCCESS =================

        if (
          res.ok &&
          data.success
        ) {

          toast.success(
            `${tutorName} deleted successfully`
          );

          router.push(
            "/tutors"
          );

          router.refresh();

        } else {

          toast.error(
            data.message ||
            "Delete failed"
          );
        }

      } catch (error) {

        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  return (

    <AlertDialog>

      {/* ================= OPEN BUTTON ================= */}

      <Button
        className="
          text-red-500
          rounded-none
        "
        variant="outline"
      >

        <BsTrash2 size={16} />

        Delete

      </Button>

      {/* ================= MODAL ================= */}

      <AlertDialog.Backdrop>

        <AlertDialog.Container>

          <AlertDialog.Dialog
            className="
              sm:max-w-[400px]
            "
          >

            <AlertDialog.CloseTrigger />

            {/* ================= HEADER ================= */}

            <AlertDialog.Header>

              <AlertDialog.Icon
                status="danger"
              />

              <AlertDialog.Heading>

                Delete tutor permanently?

              </AlertDialog.Heading>

            </AlertDialog.Header>

            {/* ================= BODY ================= */}

            <AlertDialog.Body>

              <p>

                This will permanently delete

                <strong>
                  {" "}
                  {tutorName}{" "}
                </strong>

                and all of its data.

                This action cannot be undone.

              </p>

            </AlertDialog.Body>

            {/* ================= FOOTER ================= */}

            <AlertDialog.Footer>

              {/* CANCEL */}

              <Button
                slot="close"
                variant="light"
              >

                Cancel

              </Button>

              {/* DELETE */}

              <Button
                onClick={
                  handleDelete
                }
                slot="close"
                color="danger"
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