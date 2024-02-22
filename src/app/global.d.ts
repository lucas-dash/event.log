import type { Database } from "@/lib/types/database.types";

declare global {
  type Profile = Database["public"]["Tables"]["profile"]["Row"];
  type Event = Database["public"]["Tables"]["event"]["Row"];
  type Favorite = Database["public"]["Tables"]["favorite"]["Row"];
  type Joined = Database["public"]["Tables"]["joined"]["Row"];
}
