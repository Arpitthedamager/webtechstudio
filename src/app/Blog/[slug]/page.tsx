import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import blogs from "./data";
import Navbar from "@/app/components/main/Navbar";
import Footer from "@/app/components/main/Footer";
import Cta from "@/app/components/main/cta/Cta";

type BlogType = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  sections: {
    heading?: string;
    content?: string;
    shortQA?: { question: string; answer: string }[];
    faqs?: { question: string; answer: string }[];
    keypoints?: { point: string; explanation: string; link?: string }[];
    longAnswer?: { point: string; explanation: string }[];
    conclusion?: string;
  }[];
};

// ✅ Define `PageProps` Type
interface PageProps {
  params: { slug?: string };
}

// ✅ Fix `generateMetadata`
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params; // ✅ Ensure params are awaited
  if (!resolvedParams?.slug) return {}; // ✅ Prevent errors

  const slug = resolvedParams.slug;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};

  return {
    title: `${blog.title} | WebTech Studio`,
    description: `Read our latest insights on ${blog.category}. Learn more about ${blog.title} at WebTech Studio.`,
    openGraph: {
      title: `${blog.title} | WebTech Studio`,
      description: `Learn about ${blog.title} in our latest blog.`,
      url: `https://webtechstudio.site/blog/${slug}`,
      type: "article",
      images: [{ url: blog.image, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | WebTech Studio`,
      description: `Discover ${blog.title} and more on our blog.`,
      images: [blog.image],
    },
  };
}

// ✅ Fix `BlogPage`
export default async function BlogPage({ params }: PageProps) {
  const resolvedParams = await params; // ✅ Ensure params are awaited
  if (!resolvedParams?.slug) return notFound(); // ✅ Ensure params exist

  const slug = resolvedParams.slug;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return notFound();

  return (
    <>
      <Navbar />
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 md:px-20 max-w-9xl">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold">{blog.title}</h1>
            <div className="text-bluish-gray text-lg flex justify-between mt-2">
              <h3 className=" px-4 py-2 bg-text-bg text-white rounded-full">
                {blog.category}
              </h3>
              <h4>{blog.date}</h4>
            </div>
          </header>

          {/* Blog Image */}
          <div className="mt-6 relative w-full h-[400px] rounded-4xl overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Blog Content */}
          <div className="mt-10 space-y-10">
            {blog.sections.map((section, index) => (
              <BlogSection key={index} section={section} />
            ))}
          </div>
        </div>
        <Cta />
      </section>
      <Footer />
    </>
  );
}

// Blog Section Component
const BlogSection = ({ section }: { section: BlogType["sections"][0] }) => (
  <div className="space-y-4">
    {section.heading && (
      <h2 className="text-4xl font-semibold text-white">{section.heading}</h2>
    )}
    {section.content && <p className="text-gray-300">{section.content}</p>}

    {/* FAQs */}
    {section.shortQA?.map((qa, i) => (
      <div key={i} className="border-l-4 border-yellow-500 pl-4 py-2">
        <p className="font-semibold text-gray-200">{qa.question}</p>
        <p className="text-gray-300">{qa.answer}</p>
      </div>
    ))}

    {/* Keypoints */}
    {section.keypoints?.map((kp, i) => (
      <div key={i} className="bg-gray-900 p-4 rounded-lg">
        <p className="text-lg font-bold text-blue-400">{kp.point}</p>
        <p className="text-gray-300">
          {kp.explanation}{" "}
          {kp.link && (
            <Link href={kp.link} className="text-blue-500 hover:underline">
              Read more
            </Link>
          )}
        </p>
      </div>
    ))}

    {/* Long Answer */}
    {section.longAnswer?.map((la, i) => (
      <div key={i} className="p-4 bg-gray-800 rounded-lg">
        <p className="text-lg font-bold text-green-400">{la.point}</p>
        <p className="text-gray-300">{la.explanation}</p>
      </div>
    ))}

    {/* Conclusion */}
    {section.conclusion && (
      <p className="text-lg text-gray-400 italic border-l-4 border-blue-500 pl-4">
        {section.conclusion}
      </p>
    )}
  </div>
);
