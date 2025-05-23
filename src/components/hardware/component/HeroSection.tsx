"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Chip from "@/components/home/main/chip/chip";
import { hardwareData } from "@/lib/hardware";

const HeroSection = () => {
  const products = hardwareData.products;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-black text-white py-20 px-6 md:px-20">
      {/* ✅ Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 lg:space-x-24"
      >
        <Chip text="Hardware" isDark={true} />

        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Explore Our POS Hardware
          </h2>
          <p className="text-bluish-gray max-w-lg text-sm md:text-base mt-4">
            Discover our range of high-performance POS hardware designed to enhance your business operations.
            From barcode scanners to complete kits — we’ve got it covered.
          </p>
        </div>

       
      </motion.div>

      {/* ✅ Grid Showcase */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-12 max-w-9xl mx-auto"
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
          >
            <Link
              href={`/Hardware/${product.id}`}
              className="block rounded-4xl overflow-hidden group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={450}
                className="w-full h-[620px] object-cover rounded-3xl border border-gray-800"
              />
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={
                  hoveredIndex === index
                    ? { y: "0%", opacity: 1 }
                    : { y: "100%", opacity: 0 }
                }
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[85%] flex flex-col justify-center gap-4 backdrop-blur-lg bg-black/40 rounded-2xl px-4 py-6"
                >
                 <p className="text-xs sm:text-sm border-2 rounded-4xl w-fit px-3 py-1 sm:py-2 text-white border-[var(--acua-marine)] hover:bg-[var(--acua-marine)]">
                  {product.name}
                  </p>
                  <div className="flex items-center justify-center gap-2">

                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold underline">
                  {product.description}
                </h3>
                <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="h-6 sm:h-8 w-6 sm:w-8"
                    >
                      <path
                        d="M3.11924 19.4526C1.93134 15.0043 3.08225 10.0615 6.57198 6.57175C11.779 1.36476 20.2212 1.36476 25.4282 6.57175C30.6351 11.7787 30.6351 20.2209 25.4282 25.4279C21.9384 28.9177 16.9956 30.0686 12.5473 28.8807M20.0002 20V12M20.0002 12H12.0002M20.0002 12L6.66667 25.3332"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default HeroSection;