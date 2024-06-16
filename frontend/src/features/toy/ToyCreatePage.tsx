import ToyCreateForm from "./Form/ToyCreateForm";
import { useCreateToy } from "./ToyAPI/ToyAPI";

function ToyCreatePage() {
  const { createToy } = useCreateToy();
  return (
    <div>
      {/* <ToyCreateForm onSave={createToy} isLoading={isLoading} /> */}
      <ToyCreateForm onSave={createToy} />
    </div>
  );
}

export default ToyCreatePage;
