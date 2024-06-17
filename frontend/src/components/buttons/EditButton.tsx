type EditButtonProps = {
  onClick: () => void;
};

function EditButton({ onClick }: EditButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center w-20 h-10 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-[#5c18b0] rounded-[2px] shadow-md group uppercase"
      style={{
        backgroundColor: "#3a0e7b",
        lineHeight: "40px",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        fontSize: "12px"
      }}
    >
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white transition duration-300 transform bg-[#5c18b0] -translate-x-full group-hover:translate-x-0 ease">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 20h9m-9-9h.01m-1.757 3.757l1.415-1.414m0 0a2 2 0 010-2.828l7.07-7.071a2 2 0 012.828 0l1.414 1.414a2 2 0 010 2.828l-7.071 7.071a2 2 0 01-2.828 0z"
          />
        </svg>
      </span>
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
        Edit
      </span>
      <span className="relative invisible">Edit</span>
    </button>
  );
}

export default EditButton;
