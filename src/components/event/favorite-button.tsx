"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { isUserFavorite, addFavorite, removeFavorite } from "@/lib/actions";
import { useEffect, useState, useTransition } from "react";

type FavoriteButtonProps = {
  eventId: string;
  userId: string;
} & React.ComponentProps<typeof Button>;
export default function FavoriteButton({
  eventId,
  userId,
  className,
  variant,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleFavorite = () => {
    startTransition(async () => {
      if (favorite) {
        const { error } = await removeFavorite(eventId, userId);
        if (error) {
          throw new Error(error?.message);
        } else {
          setFavorite(false);
        }
      } else if (!favorite) {
        const { error } = await addFavorite(eventId);
        if (error) {
          throw new Error(error?.message);
        } else {
          setFavorite(true);
        }
      }
    });
  };

  useEffect(() => {
    const checkIsFavorite = async () => {
      if (!userId) return;

      const { data } = await isUserFavorite(eventId, userId);
      if (data) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    };
    checkIsFavorite();
  }, [eventId, userId]);

  if (!userId) return null;

  return (
    <Button
      size="icon"
      variant={variant || "ghost"}
      className={cn("rounded-full max-md:h-8 max-md:w-8 group/fav ", className)}
      aria-label="Favorite"
      aria-describedby="Save event to favorite"
      onClick={toggleFavorite}
      disabled={isPending}
      aria-disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Heart
          className={`group-hover/fav:scale-110 transition-transform ${favorite ? "fill-primary text-primary" : ""}`}
        />
      )}
    </Button>
  );
}
