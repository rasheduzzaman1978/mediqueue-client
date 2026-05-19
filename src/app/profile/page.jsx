"use client";

import UpdateUserModal from "@/components/modals/UpdateUserModal";
import { authClient } from "@/lib/auth-client";
import { Avatar, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  // ✅ correct redirect (client side)
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="animate-pulse font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) return null; // prevent UI flash

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-105 border border-gray-100 shadow-sm bg-white rounded-[2.5rem] p-10 overflow-visible">
        <div className="flex flex-col items-center">

          <div className="mb-4">
            <Avatar size="lg">
              <Avatar.Image
                alt="User"
                src={user?.image}
                name={user?.name}
                referrerPolicy="no-referrer"
              />
              <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
            </Avatar>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">
              {user?.name || "User"}
            </h1>
            <p className="text-gray-500 text-base">
              {user?.email}
            </p>
          </div>

          <div className="w-full flex justify-center">
            <UpdateUserModal user={user} />
          </div>

        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;