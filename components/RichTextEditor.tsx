// components/RichTextEditor.tsx

"use client"

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css'; // Import Quill's Snow theme

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const handleChange = (content: string) => {
    onChange(content);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      ['link', 'image'],
      ['blockquote', 'code-block'],
      [{ 'direction': 'rtl' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'size': ['small', 'medium', 'large', 'huge'] }],
      ['clean']
    ],
  };

  return (
    <div className="border p-2 rounded-md">
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={handleChange}
        modules={modules}
        theme="snow"
        className="min-h-[300px]"
      />
    </div>
  );
};

export { RichTextEditor };
