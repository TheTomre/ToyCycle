import { useNavigate } from "react-router-dom";
import { Button } from "./UI/button";
import { useAppDispatch } from "../hooks/redux";
import { setAgeCategory } from "../features/toy/toySlice";

type CategoryItemProps = {
  title: string;
  link?: string;
  styles?: string;
  filterForApi: string;
};
function CategoryItem({
  title,
  styles,
  link,
  filterForApi
}: CategoryItemProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const hangleClick = () => {
    dispatch(setAgeCategory([filterForApi]));
    if (link) navigate(`${link}`);
  };

  return (
    <Button
      onClick={hangleClick}
      className={`px-3 py-2 sm:px-6 sm:py-4 h-auto w-auto font-mono tracking-tight bg-[#3a0e7b] hover:scale-105 hover:bg-[#3a0e7b] transition-all duration-300 text-white ${styles}`}
    >
      {title}
    </Button>
  );
}

export default CategoryItem;
