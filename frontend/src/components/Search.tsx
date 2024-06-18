import { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button } from "./UI/button";
import { useAppDispatch } from "../hooks/redux";
import { setSearchQuery } from "../features/toy/toySlice";

function Search() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchQuery(search));
  };

  return (
    <div className="bg-[#3c0e88] py-3">
      <div className="flex justify-center">
        <form
          onSubmit={handlerSubmit}
          className="flex justify-between items-center w-full max-w-7xl"
        >
          <div className="relative flex items-center flex-grow">
            <FaSearch
              className="absolute left-10 text-white opacity-75"
              size={20}
            />
            <input
              type="text"
              name="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-20 py-3 w-full h-12 text-white placeholder:text-md bg-[#5c18b0] placeholder-purple-200 italic border-none focus:outline-none"
              placeholder="I'm looking for..."
            />
          </div>
          <Button
            type="submit"
            className=" px-8 border-l-2 border-[#7e21f0] py-3 bg-[#5c18b0] h-12 font-mono text-white font-semibold rounded-md hover:bg-[#7e21f0] transition-all duration-200"
          >
            SEARCH
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Search;
