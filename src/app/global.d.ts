import type { Database } from "@/lib/types/database.types";

declare global {
  type Profile = Database["public"]["Tables"]["profile"]["Row"];
  type Covers = Database["public"]["Tables"]["covers"]["Row"];
  type EventType = Database["public"]["Tables"]["event"]["Row"];
  type Favorite = Database["public"]["Tables"]["favorite"]["Row"];
  type Joined = Database["public"]["Tables"]["joined"]["Row"];
  type Tags = Database["public"]["Tables"]["tags"]["Row"];
}
