
// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function NotesPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [notes, setNotes] = useState([]);
//   const [newNote, setNewNote] = useState("");
//   const [editingNoteId, setEditingNoteId] = useState(null);
//   const [editingContent, setEditingContent] = useState("");
//   const [token, setToken] = useState(null);
//   const [tenantPlan, setTenantPlan] = useState("free");
//   const [tenant, setTenant] = useState(null);

//   // useEffect(() => {
//   //   const storedToken = localStorage.getItem("token");
//   //   const storedTenant = localStorage.getItem("tenant");

//   //   if (!storedToken) {
//   //     router.push("/login");
//   //     return;
//   //   }

//   //   setToken(storedToken);
//   //   if (storedTenant) setTenant(JSON.parse(storedTenant));

//   //   fetchNotes(storedToken);
//   // }, [router]);

//   useEffect(() => {
//   const storedToken = localStorage.getItem("token");
//   const storedTenant = localStorage.getItem("tenant");

//   if (!storedToken) {
//     router.push("/login");
//     return;
//   }

//   setToken(storedToken);

//   if (storedTenant) {
//     try {
//       setTenant(JSON.parse(storedTenant)); 
//     } catch (err) {
//       console.error("Error parsing tenant:", err);
//       localStorage.removeItem("tenant"); 
//     }
//   }

//   fetchNotes(storedToken);
// }, [router]);


//   const fetchNotes = async (authToken) => {
//     try {
//       const res = await fetch("http://localhost:5000/notes", {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setNotes(data.notes || data || []);
//         setTenantPlan(data.tenantPlan || "free");
//       } else {
//         alert(data.message || "Failed to fetch notes");
//         if (res.status === 401) router.push("/login");
//       }
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching notes");
//       setLoading(false);
//     }
//   };

//   const handleAddNote = async () => {
//     if (!newNote.trim()) return;
//     if (tenantPlan === "free" && notes.length >= 3) {
//       alert("You reached your Free plan limit. Upgrade to Pro!");
//       return;
//     }
//     try {
//       const res = await fetch("http://localhost:5000/notes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ title: newNote, content: newNote }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setNotes((prev) => [...prev, data.note]);

//         setNewNote("");
//       } else {
//         alert(data.message || "Failed to add note");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error adding note");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this note?")) return;
//     try {
//       const res = await fetch(`http://localhost:5000/notes/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) setNotes(notes.filter((note) => note._id !== id));
//       else {
//         const data = await res.json();
//         alert(data.message || "Failed to delete note");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting note");
//     }
//   };

//   const startEditing = (note) => {
//     setEditingNoteId(note._id);
//     setEditingContent(note.content);
//   };

//   const cancelEditing = () => {
//     setEditingNoteId(null);
//     setEditingContent("");
//   };

//   const saveEdit = async () => {
//     console.log("Editing note ID:", editingNoteId);
//     if (!editingContent.trim()) return;
//     try {
//       const res = await fetch(`http://localhost:5000/notes/${editingNoteId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ content: editingContent }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setNotes(notes.map((note) =>
//           note._id === editingNoteId ? data : note
//         ));
//         cancelEditing();
//       } else {
//         alert(data.message || "Failed to update note");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error updating note");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("tenant");
//     localStorage.removeItem("role");
//     router.push("/login");
//   };

//   const handleUpgrade = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/tenants/upgrade", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert("Upgraded to Pro!");
//         setTenantPlan("pro");
//       } else {
//         alert(data.message || "Failed to upgrade");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error upgrading plan");
//     }
//   };

//   if (loading) return <p className="text-center mt-5">Loading...</p>;

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>Notes {tenant ? `(${tenant.name})` : ""}</h1>
//         <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//       </div>

//       <div className="mb-3 d-flex">
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="New note..."
//           value={newNote}
//           onChange={(e) => setNewNote(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={handleAddNote}>Add</button>
//       </div>

//       {tenantPlan === "free" && notes.length >= 3 && (
//         <div className="alert alert-warning d-flex justify-content-between align-items-center">
//           Free plan limit reached!
//           <button className="btn btn-success btn-sm" onClick={handleUpgrade}>
//             Upgrade to Pro
//           </button>
//         </div>
//       )}

//       {notes.length === 0 ? (
//         <p>No notes yet.</p>
//       ) : (
//         <ul className="list-group">
//           {notes.map((note,index) => (
//             <li key={note._id ||index} className="list-group-item d-flex justify-content-between align-items-center">
//               {editingNoteId === note._id ? (
//                 <div className="d-flex w-100">
//                   <input
//                     type="text"
//                     className="form-control me-2"
//                     value={editingContent}
//                     onChange={(e) => setEditingContent(e.target.value)}
//                   />
//                   <button className="btn btn-sm btn-success me-1" onClick={saveEdit}>Save</button>
//                   <button className="btn btn-sm btn-secondary" onClick={cancelEditing}>Cancel</button>
//                 </div>
//               ) : (
//                 <>
//                   <span>{note.content || note.title}</span>
//                   <div>
//                     <button className="btn btn-sm btn-warning me-1" onClick={() => startEditing(note)}>Edit</button>
//                     <button className="btn btn-sm btn-danger" onClick={() => handleDelete(note._id)}>Delete</button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [token, setToken] = useState(null);
  const [tenantPlan, setTenantPlan] = useState("free");
  const [tenant, setTenant] = useState(null);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token");
  //   const storedTenant = localStorage.getItem("tenant");

  //   if (!storedToken) {
  //     router.push("/login");
  //     return;
  //   }

  //   setToken(storedToken);
  //   if (storedTenant) setTenant(JSON.parse(storedTenant));

  //   fetchNotes(storedToken);
  // }, [router]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedTenant = localStorage.getItem("tenant");

    if (!storedToken) {
      router.push("/login");
      return;
    }

    setToken(storedToken);

    if (storedTenant) {
      try {
        setTenant(JSON.parse(storedTenant));
      } catch (err) {
        console.error("Error parsing tenant:", err);
        localStorage.removeItem("tenant");
      }
    }

    fetchNotes(storedToken);
  }, [router]);


  const fetchNotes = async (authToken) => {
    try {
      const res = await fetch("http://localhost:5000/notes", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        setNotes(data.notes || data || []);
        setTenantPlan(data.tenantPlan || "free");
      } else {
        alert(data.message || "Failed to fetch notes");
        if (res.status === 401) router.push("/login");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error fetching notes");
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    if (tenantPlan === "free" && notes.length >= 3) {
      alert("You reached your Free plan limit. Upgrade to Pro!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newNote, content: newNote }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotes((prev) => [...prev, data.note]);

        setNewNote("");
      } else {
        alert(data.message || "Failed to add note");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding note");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      const res = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setNotes(notes.filter((note) => note._id !== id));
      else {
        const data = await res.json();
        alert(data.message || "Failed to delete note");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting note");
    }
  };

  const startEditing = (note) => {
    setEditingNoteId(note._id);
    setEditingContent(note.content);
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditingContent("");
  };

  const saveEdit = async () => {
    console.log("Editing note ID:", editingNoteId);
    if (!editingContent.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/notes/${editingNoteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editingContent }),
      });
      const data = await res.json();
      if (res.ok) {
        setNotes(notes.map((note) =>
          note._id === editingNoteId ? data : note
        ));
        cancelEditing();
      } else {
        alert(data.message || "Failed to update note");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating note");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tenant");
    localStorage.removeItem("role");
    router.push("/login");
  };

  // const handleUpgrade = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/tenants/upgrade", {
  //       method: "POST",
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       alert("Upgraded to Pro!");
  //       setTenantPlan("pro");
  //     } else {
  //       alert(data.message || "Failed to upgrade");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error upgrading plan");
  //   }
  // };
  const handleUpgrade = async () => {
    try {
      if (!tenant?.slug) {
        alert("Tenant not found");
        return;
      }

      const res = await fetch(
        `http://localhost:5000/tenants/${tenant.slug}/upgrade`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Upgraded to Pro!");
        setTenantPlan("pro");

        // also update localStorage so Upgrade page shows correctly
        localStorage.setItem(
          "tenant",
          JSON.stringify({ ...tenant, plan: "pro" })
        );
        setTenant({ ...tenant, plan: "pro" });
      } else {
        alert(data.message || "❌ Failed to upgrade");
      }
    } catch (err) {
      console.error(err);
      alert("Error upgrading plan");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Notes {tenant ? `(${tenant.name})` : ""}</h1>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="New note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddNote}>Add</button>
      </div>

      {/* {tenantPlan === "free" && notes.length >= 3 && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          Free plan limit reached!
          <button className="btn btn-success btn-sm" onClick={handleUpgrade}>
            Upgrade to Pro
          </button>
        </div>
      )} */}
      {tenantPlan === "free" && notes.length >= 3 && (
        <div className="alert alert-warning d-flex justify-content-between align-items-center">
          Free plan limit reached!
          <button
            className="btn btn-success btn-sm"
            onClick={() => router.push("/upgrade")}
          >
            Go to Upgrade
          </button>
        </div>
      )}


      {notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul className="list-group">
          {notes.map((note, index) => (
            <li key={note._id || index} className="list-group-item d-flex justify-content-between align-items-center">
              {editingNoteId === note._id ? (
                <div className="d-flex w-100">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <button className="btn btn-sm btn-success me-1" onClick={saveEdit}>Save</button>
                  <button className="btn btn-sm btn-secondary" onClick={cancelEditing}>Cancel</button>
                </div>
              ) : (
                <>
                  <span>{note.content || note.title}</span>
                  <div>
                    <button className="btn btn-sm btn-warning me-1" onClick={() => startEditing(note)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(note._id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
