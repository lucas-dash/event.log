"use client";

import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useState, useTransition } from "react";
import { addFavorite, removeFavorite } from "./actions";

type FavoriteButtonProps = {
  event_id: string;
  user_id: string;
  favoriteRes: PostgrestSingleResponse<{
    event_id: string;
    user_id: string;
  }>;
};
export default function FavoriteButton({
  event_id,
  favoriteRes,
  user_id,
}: FavoriteButtonProps) {
  const { data: isFavorite } = favoriteRes;

  const [favorite, setFavorite] = useState(Boolean(isFavorite));
  const [isPending, startTransition] = useTransition();

  const toggleFavorite = () => {
    startTransition(async () => {
      if (favorite) {
        const { error } = await removeFavorite(event_id, user_id);
        if (error) {
          throw new Error(error?.message);
        } else {
          setFavorite(false);
        }
      } else if (!favorite) {
        const { error } = await addFavorite(event_id);
        if (error) {
          throw new Error(error?.message);
        } else {
          setFavorite(true);
        }
      }
    });
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className="rounded-full"
      aria-label="Favorite"
      aria-describedby="Add event to favorite"
      onClick={toggleFavorite}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Heart
          className={`${favorite ? "fill-primary transition-colors" : ""}`}
        />
      )}
    </Button>
  );
}
