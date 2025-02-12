import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import ProductDetails from "@/app/components/button";

// Define the custom type for `post`
type Post = {
  
  image?: SanityImageSource;
  _id: string;
  name: string;
  brand: string;
  type: string;
  fuelCapacity: string;
  transmission: string;
  seatingCapacity: string;
  pricePerDay: number;
  originalPrice: string;
  tags: string[];
  quantity: number;
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
  params: Promise<{ id: string }>; // Mark params as a Promise
}) {
  const { id } = await params; // Await the resolution of params
  const post: Post | null = await client.fetch<Post>(POST_QUERY, { id }, options);

  if (!post) {
    return <p>Post not found</p>;
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(500).height(205).url() || "/fallback-image.png"
    : "/fallback-image.png";


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
                Seating Capacity: {post?.seatingCapacity || "N/A"}
                <br />
                Transmission: {post?.transmission || "N/A"}
                <br />
                Type: {post?.type || "N/A"}
                <br />
                Fuel Capacity: {post?.fuelCapacity || "N/A"}
                <br />
                Tags: {post?.tags?.join(", ") || "None"}
              </p>
              <div className="flex">
                <span className="title-font text-xl font-bold text-gray-900">
                  PRICE/Day: {post?.originalPrice} {post?.pricePerDay || "0.00"}
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
