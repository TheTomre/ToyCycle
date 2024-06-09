function Home() {
  return (
    <main>
      <section id="hero" className="bg-indigo-100 text-center py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl text-[#3a0e7b] font-mono font-bold mb-4">
            Welcome to ToyCycle
          </h2>
          <p className="mb-4">
            Exchange toys, earn tokens, and foster a sustainable toy community.
          </p>
          <a
            href="#signup"
            className="bg-[#fff24f] text-[#3a0e7b] px-4 py-2 rounded hover:bg-[#ffca4f]"
          >
            Get Started
          </a>
        </div>
      </section>

      <section id="about" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl text-[#3a0e7b] font-mono font-bold mb-4">
            About ToyCycle
          </h2>
          <p className="max-w-2xl mx-auto">
            ToyCycle is a dynamic platform aimed at fostering a community-based
            toy exchange. Our goal is to enable families to exchange toys or use
            tokens as a flexible, gamified currency within the platform.
          </p>
        </div>
      </section>

      <section id="features" className="bg-indigo-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl text-[#3a0e7b] font-mono font-bold mb-4">
            Features
          </h2>
          <ul className="list-disc list-inside max-w-2xl mx-auto text-left">
            <li>
              User Management: Full CRUD operations for user accounts, including
              registration, profile updates, and soft deletion.
            </li>
            <li>
              Toy Management: Post, update, or remove toy listings with detailed
              descriptions, images, and category tags.
            </li>
            <li>
              Token System: Earn tokens by listing toys and spend tokens to
              claim toys from others, with a transparent transaction history.
            </li>
          </ul>
        </div>
      </section>

      <section id="how-it-works" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl text-[#3a0e7b] font-mono font-bold mb-4">
            How It Works
          </h2>
          <ol className="list-decimal list-inside max-w-2xl mx-auto text-left">
            <li>Register for a free account and create your profile.</li>
            <li>List toys you want to exchange or browse available toys.</li>
            <li>
              Use tokens to claim toys from others or convert your toys into
              tokens if an exchange is not immediately available.
            </li>
            <li>
              Manage your toy listings and token balance easily through your
              dashboard.
            </li>
          </ol>
        </div>
      </section>

      <section id="contact" className="bg-indigo-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl text-[#3a0e7b] font-mono font-bold mb-4">
            Contact Us
          </h2>
          <p>
            If you have any questions or need support, please contact us at{" "}
            <a
              href="mailto:support@toycycle.com"
              className="text-green-500 hover:underline"
            >
              support@toycycle.com
            </a>
            .
          </p>
        </div>
      </section>

      <section id="signup" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
          <p>
            Join ToyCycle today and start exchanging toys with our community!
          </p>
          <a
            href="#signup"
            className="inline-block bg-[#fff24f] m-4 text-[#3a0e7b] px-4 py-2 rounded hover:bg-[#ffca4f]"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;
