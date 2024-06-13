import Search from "../../components/Search";
import ToyList from "./ToyList";

function ToysPage() {
  return (
    <>
      <Search
        onSubmit={() => {}}
        placeholder="Search for toys..."
        onReset={() => {}}
      />
      <ToyList />
    </>
  );
}

export default ToysPage;
