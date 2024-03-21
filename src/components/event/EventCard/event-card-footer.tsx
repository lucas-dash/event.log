import TagsRenderer from "@/components/tags-renderer";
import { Typography } from "@/components/ui/typography";
import { currencyFormat } from "@/lib/utils";
import { Ticket } from "lucide-react";

type EventCardFooterProps = {
  tags: string[];
  price: string;
  price_from: boolean;
  isFree: boolean;
};
export default function EventCardFooter({
  tags,
  price,
  isFree,
  price_from,
}: EventCardFooterProps) {
  return (
    <footer className="flex items-center gap-2">
      <TagsRenderer eventTags={tags[0]} />
      <Typography variant="muted" className="flex items-center gap-1">
        <Ticket size={20} />
        {currencyFormat(price, price_from, isFree)}
      </Typography>
    </footer>
  );
}
