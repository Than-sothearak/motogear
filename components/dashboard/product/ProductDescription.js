"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

export default function ProductDescription({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "• Intel i7 Processor\n• 16GB RAM\n• 512GB SSD",
      }),
    ],
    content: `<p>Example Text</p>`,
    immediatelyRender: false, // ✅ IMPORTANT
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null; // ✅ Prevent hydration mismatch

  return (
    <div className="border rounded-md p-3 min-h-[160px] bg-white">
        <div className="flex gap-2 mb-2">
  <button
    type="button"
    onClick={() => editor.chain().focus().toggleBold().run()}
    className="px-2 py-1 rounded"
  >
    B
  </button>

  <button
    type="button"
    onClick={() => editor.chain().focus().toggleBulletList().run()}
    className="px-2 py-1 rounded"
  >
    • List
  </button>
</div>
  <EditorContent
    editor={editor}
    className="prose max-w-none focus:outline-none"
  />
</div>

  );
}
