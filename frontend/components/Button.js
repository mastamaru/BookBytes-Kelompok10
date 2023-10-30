import { useMemo } from "react";

export default function Button({ type }) {
  let style = "font-sans";
  switch (type) {
    case "Masuk":
      style += " bg-[#FBB91C] stroke-3";
  }
}
