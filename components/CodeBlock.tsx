"use client"

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="relative rounded-lg bg-muted p-4 overflow-x-auto">
        <button
          onClick={copyToClipboard}
          className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}