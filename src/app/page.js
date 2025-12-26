import Home from "@/components/HomePage/Home";

export const dynamic = "force-static";

export async function generateMetadata() {
  const canonicalUrl = `https://shorif-osman-hadi.netlify.app/`;
  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function App() {
  return (
    <>
      <Home />
    </>
  );
}
