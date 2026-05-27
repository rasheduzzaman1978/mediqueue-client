"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

import {
  Button,
  Input,
  Modal,
} from "@heroui/react";

import { BiSolidEdit, BiUser } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function UpdateUserModal({ user }) {
  // modal open state
  const [isOpen, setIsOpen] = useState(false);

  // form states
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // loading state
  const [isLoading, setIsLoading] = useState(false);

  // open হলে user data set হবে
  useEffect(() => {
    if (isOpen && user) {
      setName(user?.name || "");
      setImage(user?.image || "");
    }
  }, [isOpen, user]);

  // submit handler
  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await authClient.updateUser({
        name,
        image,
      });

      toast.success("Profile updated 🎉");

      setIsOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (err) {
      toast.error(err.message || "Update failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Update Button */}
      <Button
        onPress={() => setIsOpen(true)}
        radius="full"
        className="bg-[#EEEFF2] text-[#0070F3] font-semibold px-6 py-2 border-none"
      >
        <BiSolidEdit className="text-lg" />
        Update Profile
      </Button>

      {/* Modal */}
      {isOpen && (
        <Modal
          isOpen={true}
          onOpenChange={(open) => setIsOpen(open)}
          placement="center"
          backdrop="blur"
          className="z-[9999]"
        >
          {/* Overlay */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">

            {/* Modal Card */}
            <section className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">

              {/* Close Icon */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition duration-200"
              >
                <IoClose size={28} />
              </button>

              {/* Header */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                  <BiUser className="text-blue-500 text-2xl" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                  Update User
                </h2>

                <p className="text-sm text-gray-500">
                  Update your profile information
                </p>
              </div>

              {/* Form */}
              <div className="space-y-5 text-left">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Name
                  </label>

                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    variant="bordered"
                    className="font-medium"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Image URL
                  </label>

                  <Input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    variant="bordered"
                    className="font-medium"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex gap-3 justify-end mt-8">

                <Button
                  variant="light"
                  onPress={() => setIsOpen(false)}
                  className="font-semibold text-blue-500"
                >
                  Cancel
                </Button>

                <Button
                  onPress={handleSubmit}
                  className="bg-blue-500 text-white font-semibold px-8 rounded-xl shadow-md"
                  isLoading={isLoading}
                >
                  Save
                </Button>

              </div>
            </section>
          </div>
        </Modal>
      )}
    </>
  );
}