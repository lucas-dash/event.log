"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { isUserFavorite, addFavorite, removeFavorite } from "@/lib/actions";
import { memo, useCallback, useEffect, useState, useTransition } from "react";

type FavoriteButtonProps = {
  eventId: string;
  userId: string;
} & React.ComponentProps<typeof Button>;

const FavoriteButton = memo(function FavoriteButton({
  eventId,
  userId,
  className,
  variant,
}: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

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

  const checkIsFavorite = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await isUserFavorite(eventId, userId);
    if (data) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
    setLoading(false);
  }, [userId, eventId]);

  useEffect(() => {
    checkIsFavorite();
  }, [checkIsFavorite]);

  if (!userId) return null;

  return (
    <Button
      size="icon"
      variant={variant || "ghost"}
      className={cn("rounded-full max-md:h-9 max-md:w-9 group/fav ", className)}
      aria-label="Favorite"
      aria-describedby="Save event to favorite"
      onClick={toggleFavorite}
      disabled={isPending || loading}
      aria-disabled={isPending || loading}
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
});

export default FavoriteButton;
