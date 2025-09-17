"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InviteMember() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [inviteLink, setInviteLink] = useState("");
  const [sending, setSending] = useState(false); // loading for invite

  // Load token and tenant info
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!storedToken) {
      router.push("/login");
      return;
    }

    if (storedRole !== "admin") {
      alert("❌ Only admins can invite members");
      router.push("/notes");
      return;
    }

    setToken(storedToken);

    // Fetch tenant info safely
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenants`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(async (res) => {
        const text = await res.text(); // read as text first
        try {
          return JSON.parse(text); // parse JSON safely
        } catch (err) {
          
          throw new Error("Invalid JSON from server");
        }
      })
      .then((data) => {
        console.log("Tenant data:", data);
        if (data?.slug) {
          setSlug(data.slug);
        } else {
          setMessage("❌ Tenant slug not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching tenant:", err);
        setMessage("❌ Error fetching tenant info");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleInvite = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter a valid email");
      return;
    }

    if (!slug) {
      setMessage("❌ Tenant slug not loaded yet");
      return;
    }

    setSending(true);
    const fetchUrl = `${process.env.NEXT_PUBLIC_API_URL}/invites/${slug}/invite`;
    console.log("Inviting via URL:", fetchUrl);

    try {
      const res = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Backend returned non-JSON:", text);
        setMessage("❌ Server error, see console");
        return;
      }

      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        setInviteLink(data.inviteLink);
        setEmail("");
        console.log("Invite Link:", data.inviteLink);
      } else {
        setMessage(`❌ ${data.message || "Failed to send invite"}`);
      }
    } catch (err) {
      console.error("Error sending invite:", err);
      setMessage("❌ Network/server error");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading tenant info...</p>;
  }

  return (
    <div className="container mt-5">
      <h2>Invite a Member</h2>
      <form onSubmit={handleInvite} className="mb-3">
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Enter member's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!slug || sending}
        >
          {sending ? "Sending..." : "Send Invite"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {inviteLink && (
        <p>
          Invite Link:{" "}
          <a href={inviteLink} target="_blank" rel="noopener noreferrer">
            {inviteLink}
          </a>
        </p>
      )}

      <button
        className="btn btn-secondary mt-2"
        onClick={() => router.push("/notes")}
      >
        Back to Notes
      </button>
    </div>
  );
}
