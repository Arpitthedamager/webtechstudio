import { notFound } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/home/main/Navbar";
import Cta from "@/components/home/main/cta/Cta";
import Footer from "@/components/home/main/Footer";
import Chip from "@/components/home/main/chip/chip";
import Breadcrumb from "@/components/Breadcrumb";

async function getProject(slug) {
  const projectsData = await import("@/lib/projects.json");
  return projectsData.projects.find((p) => p.id === slug);
}

// Metadata Function
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ Await params before using
  if (!slug) return { title: "Project Not Found | WebTech Studio" };

  const project = await getProject(decodeURIComponent(slug));

  if (!project) {
    return {
      title: "Project Not Found | WebTech Studio",
      description: "The requested project could not be found.",
    };
  }

  const projectUrl = `https://webtechstudio.site/projects/${project.id}`;

  return {
    title: `${project.name} | Web Tech Studio`,
    description: project.introduction,
    keywords: `Web Tech, ${project.name}, WebTech Studio, ${project.id}`,
    authors: [{ name: "WebTech Studio", url: "https://webtechstudio.site" }],
    alternates: { canonical: projectUrl },
    openGraph: {
      title: project.name,
      description: project.introduction,
      url: projectUrl,
      type: "article",
      siteName: "Web Tech Studio",
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.introduction,
      images: [project.thumbnail],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        "mainEntityOfPage": { "@type": "WebPage", "@id": projectUrl },
        "headline": project.name,
        "image": project.thumbnail,
        "datePublished": project.date,
        "dateModified": project.date,
        "author": { "@type": "Organization", "name": "WebTech Studio" },
        "publisher": {
          "@type": "Organization",
          "name": "WebTech Studio",
          "logo": { "@type": "ImageObject", "url": "https://webtechstudio.site/logo.png" },
        },
        "description": project.introduction,
      }),
    },
  };
}

// Static Params for Dynamic Routes
export function generateStaticParams() {
  const projectsData = require("@/lib/projects.json");
  return projectsData.projects.map((project) => ({
    slug: project.id,
  }));
}

// Project Page Component
export default async function ProjectPage({ params }) {
  const { slug } = await params; // ✅ Await params before using
  if (!slug) return notFound();

  const project = await getProject(decodeURIComponent(slug));

  if (!project) return notFound();


  return (
    <div className="min-h-screen min-w-9xl bg-black text-white">
      <Navbar />
      <section className="container mx-auto px-6 md:px-20 ">
      <Breadcrumb />
        <Chip text={project.name} isDark={true} />

        {/* Header */}
        <div className="flex text-4xl font-bold">
          <h1 className="text-4xl gap-2 font-bold">
            {project.name} - {project.tagline}
          </h1>
        </div>

        {/* Clickable Thumbnail */}
        <div className="mt-8 flex justify-center">
          <Link
            href={project.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Image
              src={project.thumbnail}
              alt={project.name}
              width={900} // This is ignored when `w-full` is used
              height={400} // This is still needed for proper aspect ratio
              className="w-full h-auto rounded-4xl shadow-4xl cursor-pointer object-cover transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* Technologies Used */}
        <div className="mt-8">
          <h2 className="text-4xl font-semibold">Technologies Used</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <Chip key={index} text={tech} isDark={true} />
            ))}
          </div>
        </div>

        {/* Introduction */}
        <div className="mt-6">
          <h2 className="text-4xl font-semibold">About the Project</h2>
          <p className="text-lg text-bluish-gray mt-6">
            {project.introduction}
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-4xl font-semibold">Key Features & Innovations</h2>
          <ul className="mt-4 space-y-3 text-bluish-gray">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="h-2 w-2 mt-2 mr-2 rounded-full bg-acua-marine"></div>
                <span>{feature.details}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges Section */}
        <div className="mt-12 px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl font-semibold">The Challenge</h2>
          <p className="mt-4 text-bluish-gray text-base md:text-lg">{project.challenges_overview}</p>
          <ul className="mt-4 space-y-3 text-bluish-gray">
            {project.challenges.map((challenge, index) => (
              <li key={index} className="flex  items-start gap-3">
                <div className="h-2 w-2 mt-2  mr-2 rounded-full  flex-shrink-0 bg-red-600"></div>
                <div>
                  <strong className="text-lg md:text-xl text-white">
                    {challenge.title}
                  </strong>
                  <span className="block text-base md:text-lg">{challenge.details}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Solutions Section */}
        <div className="mt-12 px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl font-semibold">Our Solution</h2>
          <p className="mt-4 text-bluish-gray text-base md:text-lg">{project.solutions_overview}</p>
          <ul className="mt-4 space-y-3 text-bluish-gray">
            {project.solutions.map((solution, index) => (
              <li key={index} className="flex  items-start gap-3">
                <div className="h-2 w-2 mt-2 mr-2 rounded-full flex-shrink-0 bg-acua-marine"></div>
                <div>
                  <strong className="text-lg md:text-xl text-white">{solution.title}</strong>
                  <span className="block text-base md:text-lg">{solution.details}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Why This Project Stands Out */}
        <div className="mt-12 px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl font-semibold">Why This Project Stands Out?</h2>
          <ul className="mt-4 space-y-3 text-bluish-gray">
            {project.why_stand_out.map((point, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-lg md:text-xl flex-shrink-0">🔹</span>
                <div>
                  <strong className="text-lg md:text-xl text-white">{point.title}</strong>
                  <span className="block text-base md:text-lg">{point.details}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>


        {/* Results Section */}
        <div className="mt-12">
          <h2 className="text-4xl font-semibold">The Results</h2>
          <div className="mt-4 text-bluish-gray space-y-4">
            {project.results.map((result, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-2xl ">          {index === 0 ? "🚀" : index === 1 ? "📈" : index === 2 ? "📊" : "📱"}
                </span>
                <div>
                  <strong className="text-xl text-white">
                    {result.title}:
                  </strong>
                  <p>{result.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mt-12">
          <h2 className="text-4xl font-semibold">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {project.gallery.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Project Image ${index + 1}`}
                width={800} // Image width (ignored when w-full is applied)
                height={450} // Aspect ratio maintained
                className={`rounded-4xl shadow-md w-full object-fill ${
                  index === 0 ? "md:col-span-2 md:h-[600px]" : "h-[400px]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      <Cta />
      <Footer />
    </div>
  );
}
