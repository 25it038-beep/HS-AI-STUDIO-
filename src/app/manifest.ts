import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HS AI Solutions - One Ecosystem. Infinite AI Possibilities.",
    short_name: "HS AI Solutions",
    description:
      "Build, secure, automate, learn, and innovate with a growing collection of AI-powered solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/logo.jpeg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
