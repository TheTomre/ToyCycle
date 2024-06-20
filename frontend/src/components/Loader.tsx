function Loader({ className }: { className?: string }) {
  return (
    <div
      className={`absolute min-w-[100%] min-h-[100%] flex pt-[8rem] justify-center opacity-100 z-10 bg-purple-50 ${className}`}
    >
      <span className="loader" />
    </div>
  );
}

export default Loader;
