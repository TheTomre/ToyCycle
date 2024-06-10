import { useUpdateUserQuery } from "../auth/apiService/UserApi";
import UserProfileForm from "./UserProfileForm";

function UserProfilePage() {
  const { updateUser, isLoading } = useUpdateUserQuery();

  return <UserProfileForm onSave={updateUser} isLoading={isLoading} />;
}

export default UserProfilePage;
