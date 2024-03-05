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
import { getSearchPlace } from "@/lib/get-search-place";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Asterisk, Loader2, MapPin } from "lucide-react";
import { SearchPlaceType } from "@/lib/types/search-place";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

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

    const [places, setPlaces] = useState<SearchPlaceType | undefined>();
    const [loading, setLoading] = useState(false);
    const debounceSearch = useDebounce(address, 1000);

    useEffect(() => {
      const getPlaces = async (search_text: string) => {
        setLoading(true);
        if (search_text !== "") {
          setSuggest(true);

          const res: SearchPlaceType = await getSearchPlace(search_text);
          // console.log(res);
          setPlaces(res);

          setLoading(false);
        } else {
          setLoading(false);
          setPlaces(undefined);
        }
      };

      getPlaces(debounceSearch);
    }, [debounceSearch]);

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
          className={cn("w-full", className)}
          ref={ref}
          {...props}
        />
        <div
          className={`absolute top-[60px] z-50 bg-background dark:bg-background-dark rounded-lg w-full min-h-6 border border-border dark:border-border-dark shadow-base p-2 overflow-hidden ${suggest ? "flex" : "hidden"} flex-col gap-2`}
          ref={suggestRef}
        >
          {loading && places ? (
            <Loader2 className="animate-spin" />
          ) : (
            places?.features?.map((place) => {
              return (
                <Button
                  className="flex justify-start w-full text-xs px-1.5"
                  type="button"
                  key={place.id}
                  variant="ghost"
                  onClick={() => {
                    setCoord(place.geometry.coordinates);
                    setAddress(place.place_name);
                    setSuggest(false);
                  }}
                >
                  <div className="flex">
                    <MapPin size={16} className="mr-2" />
                  </div>

                  {place.place_name}
                </Button>
              );
            })
          )}
        </div>
      </div>
    );
  },
);

export default SearchPlacesInput;
