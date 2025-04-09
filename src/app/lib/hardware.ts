// src/app/lib/hardware.ts

export interface HardwareProduct {
  id: string;
  name: string;
  price: string;
  description: string;
  details: string;
  image: string;
  gallery: string[];
  link: string;
}

export const hardwareData: { products: HardwareProduct[] } = {
  products: [
    {
      id: "barcode-scanner",
      name: "Wireless Barcode Scanner",
      price: "₹1,799",
      description:
        "Fast, reliable barcode scanning for gym check-ins and inventory.",
      details:
        "Plug-and-play USB wireless scanner, 1D/2D barcode compatible. Works with all major POS software.",
      image: "/hardware/barcode-scanner.webp",
      gallery: [
        "/hardware/barcode-scanner.webp",
        "/hardware/barcode-scanner-2.webp",
      ],
      link: "https://example.com/wireless-scanner",
    },
    {
      id: "complete-kit",
      name: "Complete POS Kit",
      price: "₹28,999",
      description:
        "All-in-one POS kit: scanner, printer, monitor, and software preloaded.",
      details:
        "Perfect for gym receptions. Includes touch monitor, printer, barcode scanner, and software.",
      image: "/hardware/complete-kit.webp",
      gallery: [
        "/hardware/complete-kit.webp",
        "/hardware/complete-kit-2.webp",
      ],
      link: "https://example.com/complete-kit",
    },
  ],
};
