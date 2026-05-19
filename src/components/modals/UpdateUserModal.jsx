"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  Button, 
  Input, 
  Modal
} from "@heroui/react";
import { BiSolidEdit, BiUser } from "react-icons/bi";
import { toast } from "react-toastify";


export default function UpdateUserModal({ user }) {
  // শুরুতে এটি অবশ্যই false থাকবে যাতে সরাসরি দেখা না যায়
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      setName(user?.name || "");
      setImage(user?.image || "");
    }
  }, [isOpen, user]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await authClient.updateUser({ name, image });
      toast.success("Profile updated 🎉");
      setIsOpen(false);
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      toast.error(err.message || "Update failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* আপডেট বাটন - ছবির মতো হালকা ব্যাকগ্রাউন্ড */}
      <Button 
        onPress={() => setIsOpen(true)} 
        radius="full" 
        className="bg-[#EEEFF2] text-[#0070F3] font-semibold px-6 py-2 border-none"
      >
       <BiSolidEdit className="text-lg" /> Update Profile
      </Button>

      {/* মোডালটি কন্ডিশনালি রেন্ডার করা হয়েছে */}
      {isOpen && (
        <Modal 
          isOpen={true} 
          onOpenChange={(open) => setIsOpen(open)}
          placement="center"
          backdrop="blur"
          // এটি নিশ্চিত করবে যে মোডালটি কার্ডের নিচে না গিয়ে স্ক্রিনের একদম উপরে ভাসবে
          className="z-[9999]"
        >
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <section className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
              {/* হেডার */}
              <div className="flex flex-col gap-2 mb-6">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                  <BiUser className="text-blue-500 text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-900"> Update User</h2>
              </div>

              {/* ইনপুট বডি */}
              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Name:</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    variant="bordered"
                    className="font-medium w-60 md:w-75"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Image URL:</label>
                  <Input
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    variant="bordered"
                    className="font-medium"
                  />
                </div>
              </div>

              {/* ফুটার বাটনসমূহ */}
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