import { useState } from "react";
import supabase from "../../services/supabase";

export default function LogoutButton() {
  const [error, setError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    setIsSigningOut(true);
    setError("");

    const { error } = await supabase.auth.signOut({
      scope: "local",
    });

    if (error) {
      setError(error.message);
    }

    setIsSigningOut(false);
  }

  return (
    <div>
      <button type="button" onClick={handleLogout} disabled={isSigningOut}>
        {isSigningOut ? "Signing out..." : "Sign Out"}
      </button>

      {error && <p role="alert">{error}</p>}
    </div>
  );
}
