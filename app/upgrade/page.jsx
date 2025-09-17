
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function UpgradePage() {
//   const router = useRouter();
//   const [token, setToken] = useState(null);
//   const [plan, setPlan] = useState("free");
//   const [slug, setSlug] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [upgrading, setUpgrading] = useState(false);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (!storedToken) {
//       router.push("/login");
//       return;
//     }
//     setToken(storedToken);
//     fetchTenant(storedToken);
//   }, [router]);

//   // Fetch tenant info using GET /tenants/upgrade
//   const fetchTenant = async (authToken) => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tenants/upgrade`, {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setPlan(data.plan);
//         setSlug(data.slug); // Important: used for POST /upgrade
//       console.log("Fetched tenant:",data);
//       } else {
//         toast.error(data.message || "Failed to fetch tenant info");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error fetching tenant info");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Upgrade tenant plan
//   const handleUpgrade = async () => {
//     if (!slug) {
//       toast.error("Tenant slug missing!");
//       return;
//     }

//     setUpgrading(true);
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/tenants/${slug}/upgrade`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await res.json();
//       if (res.ok) {
//         toast.success("✅ Tenant upgraded to Pro!");
//         setPlan("pro");
//       } else {
//         toast.error(data.message || "Failed to upgrade");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error upgrading plan");
//     } finally {
//       setUpgrading(false);
//     }
//   };

//   if (loading) return <p className="text-center mt-5">Loading...</p>;
// console.log("Frontend slug:", slug);

//   return (
//     <div className="container mt-5 text-center">
//       <h2>Tenant Plan</h2>
//       <p>
//         Current Plan: <strong>{plan}</strong>
//       </p>

//       {plan === "free" ? (
//         <button
//           className="btn btn-success"
//           onClick={handleUpgrade}
//           disabled={upgrading || !slug || plan === "pro"}
//         >
//           {upgrading ? "Upgrading..." : "Upgrade to Pro"}
//         </button>
//       ) : (
//         <p className="text-success">✅ You are on the Pro plan</p>
//       )}

//       <button
//         className="btn btn-secondary mt-3"
//         onClick={() => router.push("/notes")}
//       >
//         Back to Notes
//       </button>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpgradePage() {
  const router = useRouter();
  const [tenant, setTenant] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedTenant = localStorage.getItem("tenant");
    const storedRole = localStorage.getItem("role");

    if (!storedToken) {
      router.push("/login");
      return;
    }

    setToken(storedToken);
    setRole(storedRole);
    if (storedTenant) setTenant(JSON.parse(storedTenant));
  }, [router]);

  const handleUpgrade = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/tenants/${tenant.slug}/upgrade`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Tenant upgraded to Pro!");
        const updatedTenant = { ...tenant, plan: "pro" };
        setTenant(updatedTenant);
        localStorage.setItem("tenant", JSON.stringify(updatedTenant));
      } else {
        alert(data.message || "Upgrade failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error upgrading tenant");
    }
  };

  if (!tenant) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-3">Tenant Plan</h2>
        <p className="text-center fs-5">
          Current Plan:{" "}
          <span
            className={
              tenant.plan === "pro" ? "badge bg-success" : "badge bg-warning text-dark"
            }
          >
            {tenant.plan}
          </span>
        </p>

        <div className="d-flex justify-content-center mt-4">
          {/* Only Admin can see upgrade button */}
          {role === "admin" && tenant.plan === "free" && (
            <button className="btn btn-success me-2" onClick={handleUpgrade}>
              Upgrade to Pro
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={() => router.push("/notes")}
          >
            Back to Notes
          </button>
        </div>
      </div>
    </div>
  );
}

