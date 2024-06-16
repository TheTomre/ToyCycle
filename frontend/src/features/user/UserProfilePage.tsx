import { useState } from "react";
import { useUpdateUser, useGetUser } from "../auth/apiService/UserApi";
import UserProfileForm from "./UserProfileForm";
import UserToys from "./UserToys";
import Loader from "../../components/Loader";
import { User } from "./userTypes";

function UserProfilePage() {
  const { currentUser, isLoading: isGetLoading } = useGetUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();
  const [activeTab, setActiveTab] = useState("profile");

  // if (isGetLoading) {
  //   return <Loader />;
  // }

  // if (!currentUser) {
  //   return <span>Unable to load user profile</span>;
  // }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 min-h-[100vh]">
      {isGetLoading && <Loader />}
      {currentUser === undefined && !isGetLoading ? (
        <span>Unable to load user profile</span>
      ) : (
        <>
          <div className="flex border-b-2 border-gray-200">
            <button
              className={`px-6 py-2 -mb-0.5 text-lg font-semibold transition duration-300 ${
                activeTab === "profile"
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-500 border-b-4 border-transparent hover:text-blue-600 hover:border-blue-300"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </button>
            <button
              className={`px-6 py-2 -mb-0.5 text-lg font-semibold transition duration-300 ${
                activeTab === "toys"
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-500 border-b-4 border-transparent hover:text-blue-600 hover:border-blue-300"
              }`}
              onClick={() => setActiveTab("toys")}
            >
              My Toys
            </button>
          </div>
          <div className="mt-4">
            {activeTab === "profile" && (
              <UserProfileForm
                currentUser={currentUser as User}
                onSave={updateUser}
                isLoading={isUpdateLoading}
              />
            )}
            {activeTab === "toys" && <UserToys />}
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfilePage;
