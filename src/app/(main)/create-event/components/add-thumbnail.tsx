import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddThumbnail() {
  return (
    <div className="bg-secondary-light dark:bg-copy-light-dark rounded-xl min-h-[120px] flex items-center justify-center flex-col">
      <Label className="text-secondary-content dark:text-copy text-base font-semibold">
        Select Image
      </Label>
      <Input type="file" className="w-max" placeholder="Select Image" />
    </div>
  );
}
