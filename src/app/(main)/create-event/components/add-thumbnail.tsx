import { Typography } from "@/components/ui/typography";

export default function AddThumbnail() {
  return (
    <div className="bg-copy-light dark:bg-copy-light-dark rounded-xl min-h-[120px] flex items-center justify-center">
      <Typography className="text-copy-dark dark:text-copy font-medium">
        Select Image
      </Typography>
    </div>
  );
}
