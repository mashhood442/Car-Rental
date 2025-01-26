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

// Function to generate static params (similar to getStaticPaths)
export async function generateStaticParams() {
  // Fetch all car IDs from Sanity
  const posts: { _id: string }[] = await client.fetch(`*[_type == "car"]{ _id }`);

  return posts.map((post) => ({
    id: post._id, // Must match the dynamic segment [id]
  }));
}

const POST_QUERY = `*[_type == "car" && _id == $id][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

// Dynamic route for individual products
export default async function PostPage({
  params,
}: {
  params: { id: string }; // Matches the dynamic segment [id]
}) {
  let post: Post | null = null; // Initialize `post` variable
  let postImageUrl: string = "/fallback-image.png"; // Initialize `postImageUrl` variable

  try {
    post = await client.fetch<Post>(POST_QUERY, { id: params.id }, options);

    if (post?.image) {
      postImageUrl = urlFor(post.image)?.width(500).height(205).url() || "/fallback-image.png";
    }
  } catch (error) {
    console.error("Error loading product:", error);
  } finally {
    console.log("Fetch attempt completed.");
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={post?.name || "Product image"}
              className="lg:w-1/2 w-full lg:h-auto h-auto object-contain rounded"
              src={postImageUrl}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">MORENT</h2>
              <h1 className="text-gray-900 text-3xl font-bold title-font mb-1">{post?.name}</h1>
              <p className="leading-relaxed">
                Seating Capacity: {post?.seating_capacity || "N/A"}
                <br />
                Transmission: {post?.transmission || "N/A"}
                <br />
                Type: {post?.type || "N/A"}
                <br />
                Fuel Capacity: {post?.fuel_capacity || "N/A"}
                <br />
                Tags: {post?.tags?.join(", ") || "None"}
              </p>
              <div className="flex">
                <span className="title-font text-xl font-bold text-gray-900">
                  PRICE/Day: {post?.currency || "$"} {post?.pricePerDay || "0.00"}
                </span>
                {post && <ProductDetails post={post} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
