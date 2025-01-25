import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import ProductDetails from "@/app/components/button";

// Define the custom type for `post`
type Post = {
  _id: string;
  name: string;
  pricePerDay: string;
  image?: SanityImageSource;
  seating_capacity?: number;
  transmission?: string;
  type?: string;
  fuel_capacity?: string;
  tags?: string[];
  currency?: string;
};

const POST_QUERY = `*[_type == "car" && _id == $id][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await client.fetch<Post>(POST_QUERY, { id: params.id }, options);

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(500).height(205).url()
    : "/fallback-image.png";

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={post?.name}
              className="lg:w-1/2 w-full lg:h-auto h-auto object-contain rounded"
              src={postImageUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">MORENT</h2>
              <h1 className="text-gray-900 text-3xl font-bold title-font mb-1">{post?.name}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {/* Star Icons */}
                  {[...Array(4)].map((_, index) => (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed">
                Seating Capacity: {post?.seating_capacity}
                <br />
                Transmission: {post?.transmission}
                <br />
                Type: {post?.type}
                <br />
                Fuel Capacity: {post?.fuel_capacity}
                <br />
                Tags: {post?.tags?.join(", ")}
              </p>
              <div className="flex">
                <span className="title-font text-xl font-bold text-gray-900">
                  PRICE/Day: {post?.currency}
                  {post?.pricePerDay} 
                </span>
                <ProductDetails post={post} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}