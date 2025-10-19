import { useEffect, useState, useMemo } from "react";
import { User } from "@/lib/types/user";
import { verifySignature } from "@/utils/crypto";

export function useValidateUsers(data?: User[]) {
  const [validUsers, setValidUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Create a stable dependency - only changes when actual data changes
  const dataKey = useMemo(() => {
    if (!data || data.length === 0) return "empty";
    return data.map(u => u.id).join(",");
  }, [data]);

  useEffect(() => {
    let mounted = true;

    async function validate() {
      if (!data || !Array.isArray(data) || data.length === 0) {
        if (mounted) {
          setValidUsers([]);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.all(
          data.map(async (user) => {
            try {
              const ok = await verifySignature(user.email, user.signature);
              return ok ? user : null;
            } catch (error) {
              console.error(`Verification failed for ${user.email}:`, error);
              return null;
            }
          })
        );

        if (mounted) {
          setValidUsers(results.filter((u): u is User => u !== null));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    validate();

    return () => {
      mounted = false;
    };
  }, [dataKey]);

  return { validUsers, loading };
}