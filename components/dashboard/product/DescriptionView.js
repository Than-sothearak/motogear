"use client";

export default function DescriptionView({ content }) {

  return  <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content}}
    />
}
