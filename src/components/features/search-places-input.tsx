"use client";

import {
  Dispatch,
  forwardRef,
  HTMLAttributes,
  Ref,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Asterisk, MapPin } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const places = [
  {
    id: 1,
    title: "Suggest Address",
    coordination: [10, 30],
  },
  {
    id: 2,
    title: "Suggesttino places",
    coordination: [16, 90],
  },
];

type Props = {
  setCoord: Dispatch<SetStateAction<number[]>>;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
} & HTMLAttributes<HTMLInputElement>;

const SearchPlacesInput = forwardRef(
  (
    { setCoord, address, setAddress, className, ...props }: Props,
    ref: Ref<HTMLInputElement>,
  ) => {
    const [suggest, setSuggest] = useState(false);
    const suggestRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        const target = event.target as Node;

        if (suggestRef.current && !suggestRef.current.contains(target)) {
          setSuggest(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [suggestRef]);

    return (
      <div className="relative space-y-2">
        <Label htmlFor="address" className="flex">
          Address
          <Asterisk size={12} className="text-primary" />
        </Label>

        <Input
          id="address"
          placeholder="Search address"
          autoComplete="street-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onFocus={() => setSuggest(true)}
          className={cn("w-full", className)}
          ref={ref}
          {...props}
        />
        <div
          className={`absolute top-[60px] z-50 bg-background dark:bg-background-dark rounded-lg w-full border border-border dark:border-border-dark shadow-base p-2 ${suggest ? "flex" : "hidden"}  flex-col gap-2`}
          ref={suggestRef}
        >
          {places.map((place) => {
            return (
              <Button
                className="justify-start"
                type="button"
                key={place.id}
                variant="ghost"
                onClick={() => {
                  setCoord(place.coordination);
                  setAddress(place.title);
                  setSuggest(false);
                }}
              >
                <MapPin size={16} className="mr-2" />
                {place.title}
              </Button>
            );
          })}
        </div>
      </div>
    );
  },
);

export default SearchPlacesInput;
