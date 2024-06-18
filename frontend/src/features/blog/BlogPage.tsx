import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  summary: string;
  image: string;
  link: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Lifecycle of Our Educational Wooden Toys",
    date: "December 28, 2023",
    summary:
      "Have you ever wondered what happens to our educational wooden toys after they're retired from our subscription boxes? Something we don’t speak of often, is that we are one of the...",
    image: "/blogImage1.webp",
    link: "/blogs/1"
  },
  {
    id: 2,
    title: "Why I Love Our Ethical and Sustainable Packaging",
    date: "November 16, 2023",
    summary:
      "Things that might seem trivial, like the bags we pack our toys in, can actually have a significant impact as we scale. An impact on the people who make them...",
    image: "/blogImage2.webp",
    link: "/blogs/2"
  },
  {
    id: 3,
    title: "Sustainable Gardening for Kids: Helping Them Bloom",
    date: "January 5, 2024",
    summary:
      "In today’s world, encouraging a sense of responsibility for the environment in our children is more important than ever. Sustainable gardening is a good way to teach children about taking care of the planet...",
    image: "/blogImage3.webp",
    link: "/blogs/3"
  },
  {
    id: 4,
    title: "Educational Play: The Importance of Learning Through Play",
    date: "February 20, 2024",
    summary:
      "Play is a crucial part of a child's development. Educational play combines fun and learning, helping children develop cognitive, physical, and social skills...",
    image: "/blogImage4.webp",
    link: "/blogs/4"
  },
  {
    id: 5,
    title: "The Joy of Wooden Toys: Why They’re a Timeless Choice",
    date: "March 15, 2024",
    summary:
      "Wooden toys have been cherished for generations. They are not only durable and environmentally friendly but also stimulate creativity and imagination...",
    image: "/blogImage5.webp",
    link: "/blogs/5"
  },
  {
    id: 6,
    title: "The Future of Play: Trends in Toy Innovation",
    date: "April 10, 2024",
    summary:
      "The toy industry is constantly evolving. From STEM toys to interactive playsets, discover the latest trends that are shaping the future of play...",
    image: "/blogImage6.webp",
    link: "/blogs/6"
  }
];

function BlogPage(): React.ReactElement {
  const navigate = useNavigate();

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    link: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(link);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <header className="text-center py-4">
        <h1 className="text-4xl font-bold text-gray-800">Latest News</h1>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col justify-between"
            >
              <a
                href={post.link}
                onClick={e => {
                  e.preventDefault();
                  navigate(post.link);
                }}
                onKeyDown={event => handleKeyDown(event, post.link)}
                tabIndex={0}
                className="block"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover mb-4 cursor-pointer"
                />
              </a>
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-[#3a0e7b] mb-2">
                    {post.title}
                  </h2>
                  <div className="flex items-center text-gray-600 mb-4">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="mr-2 text-[#70e2d2]"
                    />
                    <p>{post.date}</p>
                  </div>
                  <p className="text-gray-700 mb-4">{post.summary}</p>
                </div>
                <div className="flex justify-end">
                  <Link
                    to={post.link}
                    className="text-[#5c18b0] hover:underline mt-4"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
