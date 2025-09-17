"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <h1 className="text-4xl font-bold mb-4">🚀 Multi-Tenant Notes App</h1>
        <p className="text-lg mb-6">
          Secure note-taking for teams with Free & Pro plans.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300"
          >
            Register
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="p-10 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Why Choose Our Notes App?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">🔑 Multi-Tenancy</h3>
            <p>Strict isolation between tenants (Acme, Globex, etc).</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">🛡️ Role-based Access</h3>
            <p>Admins invite & upgrade, members manage notes.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">⚡ Free vs Pro Plans</h3>
            <p>Free → 3 notes. Pro → Unlimited notes.</p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="p-10 text-center">
        <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Free Plan</h3>
            <p className="mb-4">Limited to 3 notes per tenant.</p>
            <button
              onClick={() => router.push("/register")}
              className="px-6 py-2 bg-gray-200 font-semibold rounded-lg hover:bg-gray-300"
            >
              Get Started
            </button>
          </div>
          <div className="p-6 border rounded-lg shadow-md bg-yellow-100">
            <h3 className="font-semibold text-xl mb-2">Pro Plan</h3>
            <p className="mb-4">Unlimited notes + priority support.</p>
            <button
              onClick={() => router.push("/upgrade")}
              className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4 text-center bg-gray-800 text-white text-sm">
        © {new Date().getFullYear()} Multi-Tenant Notes App | Built with ❤️ on Next.js + Express
      </footer>
    </div>
  );
}
