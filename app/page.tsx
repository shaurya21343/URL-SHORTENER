import { Button } from "@/components/ui/button"; // if using ShadCN
import { Input } from "@/components/ui/input";
import CreateURL from "@/components/CreateURL";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Simplify Your Links
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Shorten, customize, and track your URLs with ease.
        </p>
        <CreateURL />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">🔗 Instant Shortening</h3>
            <p>Generate short links in a single click—no login required.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">📊 Click Analytics</h3>
            <p>Track how many times your links are clicked and from where.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🎨 Custom URLs</h3>
            <p>Create branded, memorable links with custom slugs.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
     
    </main>
  );
}