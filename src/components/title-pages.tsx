import PlusIcon from "@/icons/plus-icon";
import Link from "next/link";
import React from "react";

const TitlePages = ({
  title,
  href,
  button,
}: {
  title: string;
  href?: string;
  button?: string;
}) => {
  return (
    <section className="flex justify-between">
      <h1 className="text-4xl font-bold ">{title}</h1>
      {href && button && (
        <Link
          href={href}
          className="bg-eerie-black flex justify-center items-center gap-2 h-18 md:h-full text-snow px-4 py-2 rounded-lg cursor-pointer"
        >
          <PlusIcon />
          {button}
        </Link>
      )}
    </section>
  );
};

export default TitlePages;
