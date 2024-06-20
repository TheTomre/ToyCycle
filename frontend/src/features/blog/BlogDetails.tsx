/* eslint-disable react/no-danger */
import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faPinterestP
} from "@fortawesome/free-brands-svg-icons";
import { blogPosts } from "./blogPosts"; // Adjust the path according to your project structure

function BlogDetails(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id.toString() === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(post.title);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="relative h-96 bg-cover bg-center bg-no-repeat rounded-b-lg shadow-lg"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-white text-center">
            {post.title}
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/4 lg:pr-8">
            <button
              onClick={() => window.history.back()}
              className="mb-4 text-[#5c18b0] hover:underline flex items-center"
              aria-label="Back to Blog"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back to
              Blog
            </button>
            <div className="flex items-center text-gray-600 mb-4">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-2 text-[#70e2d2]"
                aria-hidden="true"
              />
              <p>{post.date}</p>
            </div>
            <div
              className="prose max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
              aria-label="Blog content"
            />
          </div>
          <aside className="lg:w-1/4 mt-8 lg:mt-0">
            <div className="sticky top-32 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center">
                Share this article
              </h3>
              <div className="flex justify-around mb-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                  aria-label="Share on Facebook"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition duration-300"
                  aria-label="Share on Twitter"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition duration-300"
                  aria-label="Share on LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${post.image}&description=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300"
                  aria-label="Share on Pinterest"
                >
                  <FontAwesomeIcon icon={faPinterestP} />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;
