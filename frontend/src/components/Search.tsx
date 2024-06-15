import { FormEvent, useState } from "react";
import { GrClose } from "react-icons/gr";
import { Button } from "./UI/button";
import { useAppDispatch } from "../hooks/redux";
import { setSearchQuery } from "../features/toy/toySlice";

function Search() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const handleClearSearch = () => {
    setSearch("");
    dispatch(setSearchQuery(""));
  };

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchQuery(search));
  };

  return (
    <form
      onSubmit={e => handlerSubmit(e)}
      className="flex px-2 py-4 sm:px-4 sm:py-6 bg-[#70e2d2] justify-center items-center"
    >
      <div className="relative">
        <input
          type="text"
          name="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-1 h-10 w-56 sm:w-96 shadow-none border-0 bg-white placeholder:text-gray-500 font-sans  text-[#280b5f] focus:ring-0 focus:border-0"
          placeholder="Search by name, brand or description"
        />

        {!!search && (
          <Button
            type="button"
            onClick={handleClearSearch}
            variant="ghost"
            className="p-2 text-[10px] shadow-none absolute top-[2px] right-1"
          >
            <GrClose size={18} className="text-[#280b5f] hidden md:block" />
          </Button>
        )}
      </div>
      <Button
        type="submit"
        className="px-4 min-h-[40px] font-mono uppercase text-[#280b5f] py-2 h-inherit shadow-none hover:bg-[#1ae0c6]"
      >
        Search
      </Button>
    </form>
  );
}

export default Search;
