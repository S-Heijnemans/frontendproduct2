'use client'

import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    if (!searchTerm.trim()) {
      setLoading(false);
      return;
    }

    try {
      const usersRef = collection(db, "Users");
      const lowerTerm = searchTerm.toLowerCase();
      const q = query(
        usersRef,
        where("displayName", ">=", lowerTerm),
        where("displayName", "<=", lowerTerm + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);

      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setResults(users);
    } catch (err) {
      setError("Fout bij zoeken: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-6">
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Zoek naar gebruikers..."
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">
          Zoek
        </button>
      </form>

      {loading && <p>Bezig met zoeken...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {results.length > 0 && (
        <ul className="border rounded p-2 space-y-2">
          {results.map((user) => (
            <li key={user.id} className="border-b pb-1">
              <p><strong>Naam:</strong> {user.displayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && !loading && searchTerm && (
        <p>Geen gebruikers gevonden.</p>
      )}
    </div>
  );
}
