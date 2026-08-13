import Hero from "./components/Hero";
import CardGrid from "./components/CardGrid";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CardGrid />
      <Footer />
    </div>
  );
}