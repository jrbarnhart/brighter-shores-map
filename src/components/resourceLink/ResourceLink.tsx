import { ResourceNode, Thing } from "@/lib/types";
import React, { SetStateAction } from "react";

export default function ResourceLink({
  ...props
}: {
  text: string;
  resource: ResourceNode | null;
  setExpandedCardThing: React.Dispatch<SetStateAction<Thing | null>>;
}) {
  const { text, resource, setExpandedCardThing } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCardThing(resource ? { type: "resource", ...resource } : null);
  };

  return (
    <a
      className="underline text-sidebar-accent"
      onClick={handleClick}
      href={`/${resource?.baseName ?? ""}`}
    >
      {text}
    </a>
  );
}
