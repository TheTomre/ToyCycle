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
      <div className="toy-card">
        <img src={toy.image} alt={toy.name} />
        <h3>{toy.name}</h3>
        <p>{toy.description}</p>
      </div>
    </div>
  );
}

export default ToyCard;
