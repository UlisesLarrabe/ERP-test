import ArrowLeftIcon from "@/icons/arrow-left-icon";
import Link from "next/link";
import React from "react";

const GoBackSection = ({ href, title }: { href: string; title: string }) => {
  return (
    <section className="flex gap-4">
      <Link
        href={href}
        className="text-eerie-black px-4 py-2 rounded-lg border border-eerie-black cursor-pointer font-bold"
      >
        <ArrowLeftIcon />
      </Link>
      <h1 className="text-4xl font-bold">{title}</h1>
    </section>
  );
};

export default GoBackSection;
