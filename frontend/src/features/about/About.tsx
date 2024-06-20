function About() {
  return (
    <div className="px-5 sm:px-10 md:px-36 w-full max-w-[1440px] mx-auto pt-20 pb-32 space-y-10">
      <div className="flex gap-8 font-sans w-full min-h-44">
        <div className="bg-contain bg-[url('./assets/icons/we.svg')] flex-[1_1_0] bg-no-repeat hidden lg:block" />
        <div className="flex-[5_1_0]">
          <h3 className="font-mono tracking-tight text-2xl text-[#3a0e7b] pb-4">
            Who We Are
          </h3>
          <p className="font-sans text-lg">
            Toy Cycle was created to give you a simple platform to sell your old
            and unwanted toys and get an instant cash valuation. We strive to
            offer the most competitive prices while also offering a great
            customer experience. We were shocked about the amount of working but
            unwanted toys that get sent to landfill each year in the Israel. We
            know we can all do better to give a new life to your unwanted toys,
            toy-exchange offers you a hassle free way to sell your toys to us,
            and we deal with the hassle of finding them a new home.
          </p>
        </div>
      </div>
      <div className="flex gap-8 font-sans w-full flex-row-reverse justify-between min-h-44">
        <div className="bg-contain bg-[url('./assets/icons/target.svg')] flex-[1_1_0] bg-no-repeat hidden lg:block" />
        <div className="flex-[5_1_0]">
          <h3 className="font-mono tracking-tight text-2xl text-[#3a0e7b] pb-4">
            Our Mission
          </h3>
          <p className="font-sans text-lg">
            When we receive your unwanted toys and have paid you for them, it’s
            up to us to find them a new home where they can be used again. We do
            this by checking the condition and repairing to bring your toys back
            to life so that they are ready to be re-sold. We then catalog and
            store these items in our facility. Some toys are sold directly by
            ourselves on third party sites, some are held as spares or repairs.
            If we have excess items or items that have not sold, we sell them in
            bulk, donate to local charities or as a last resort responsibly
            recycle them.
          </p>
        </div>
      </div>
      <div>
        <div className="flex gap-8 font-sans w-full min-h-44">
          <div className="bg-contain bg-[url('./assets/icons/why.svg')] flex-[1_1_0] bg-no-repeat hidden lg:block" />
          <div className="flex-[5_1_0]">
            <h3 className="font-mono tracking-tight text-2xl text-[#3a0e7b] pb-4">
              Why use Toy Cycle?
            </h3>
            <p className="font-sans text-lg">
              We aim to offer a platform to buy unwanted toys in an easy, fast
              and safe environment. We maintain an active list of unwanted toys
              we are currently looking to buy and ensure our offered prices are
              competitive We have simplified our buying process so you can just
              weigh or count your unwanted toys, enter it into our site, and
              receive a calculated valuation of the expected price we will pay.
              We offer free shipping and a no-obligation service.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-8 font-sans w-full flex-row-reverse min-h-44">
          <div className="bg-contain bg-[url('./assets/icons/recycle.svg')] flex-[1_1_0] bg-no-repeat hidden lg:block" />
          <div className="flex-[5_1_0]">
            <h3 className="font-mono tracking-tight text-2xl text-[#3a0e7b] pb-4">
              Eco-friendly Recycling
            </h3>
            <p className="font-sans text-lg">
              Unfortunately, most of the toys manufactured in the past 40 years
              have contained lots of plastic. Many of which do not degrade and
              end up in landfill. It is estimated that over 8 million working
              toys enter landfill every year in the Israel. Our aim is to take
              these unwanted toys and give them a new home and to avoid
              landfill. In the rare circumstance where a toy cannot be resold or
              donated, we strip it for spare parts to help repair other toys and
              dispose of the remaining parts responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
