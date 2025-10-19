import { useEffect, useState } from "react";
import { User } from "@/lib/types/user";
import { verifySignature } from "@/utils/crypto";

export function useValidateUsers(data?: User[]) {
  const [validUsers, setValidUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function validate() {
      if (!data || !Array.isArray(data)) {
        setValidUsers([]);
        return;
      }

      setLoading(true);
      try {
        const results = await Promise.all(
          data.map(async (user) => {
            try {
              const ok = await verifySignature(user.email, user.signature);
              return ok ? user : null;
            } catch {
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
  }, [data]);

  return { validUsers, loading };
}
