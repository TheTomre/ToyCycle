type ToyProps = {
  toy: {
    name: string;
    description: string;
    image: string;
  };
};

function ToyCard({ toy }: ToyProps) {
  return (
    <div>
      <div className="w-[300px] toy-card bg-gray-200 p-4 rounded-lg shadow-md">
        <img
          className=" sm:w-auto object-cover"
          src={toy.image}
          alt={toy.name}
        />
        <h3 className="text-xl font-bold mt-2">{toy.name}</h3>
        <p className="text-gray-600">{toy.description}</p>
      </div>
    </div>
  );
}

export default ToyCard;
