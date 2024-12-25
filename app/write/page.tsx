"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RichTextEditor } from '@/components/RichTextEditor'
import { Modal } from '@/components/ui/modal'
import CodeBlock from '@/components/CodeBlock'

interface ArticleData {
  title: string
  content: string
  tags: string[]
  codeBlocks: Array<{ language: string; code: string }>
}

export default function WritePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ArticleData>({
    title: '',
    content: '',
    tags: [],
    codeBlocks: []
  })
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [showCodeEditor, setShowCodeEditor] = useState(false)
  const [currentCode, setCurrentCode] = useState({ language: 'javascript', code: '' })

  const handleInputChange = (field: keyof ArticleData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'tags' ? value.split(',').map(tag => tag.trim()) : value
    }))
  }

  const addCodeBlock = () => {
    if (currentCode.code.trim()) {
      setFormData(prev => ({
        ...prev,
        codeBlocks: [...prev.codeBlocks, { ...currentCode }]
      }))
      setCurrentCode({ language: 'javascript', code: '' })
      setShowCodeEditor(false)
    }
  }

  const validateForm = (): boolean => {
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required')
      return false
    }
    return true
  }

  const handleSubmit = async (endpoint: string, successMessage: string) => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error?.message || 'Operation failed')
      }

      toast.success(successMessage)
      if (endpoint === 'articles') router.push('/')
      if (endpoint === 'drafts') setIsDraft(true)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Write Article</h1>
      
      <form className="space-y-6" onSubmit={e => {
        e.preventDefault()
        handleSubmit('articles', 'Article published successfully!')
      }}>
        <Input
          type="text"
          placeholder="Article Title"
          value={formData.title}
          onChange={e => handleInputChange('title', e.target.value)}
          required
          className="text-lg"
        />

        <Textarea
          placeholder="Tags (comma-separated)"
          value={formData.tags.join(', ')}
          onChange={e => handleInputChange('tags', e.target.value)}
          className="resize-none"
        />

        <RichTextEditor 
          value={formData.content} 
          onChange={value => handleInputChange('content', value)}
        />

        <div className="space-y-4">
          {formData.codeBlocks.map((block, index) => (
            <CodeBlock 
              key={index}
              code={block.code}
              language={block.language}
            />
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => setShowCodeEditor(true)}
        >
          Add Code Block
        </Button>

        <div className="flex justify-between items-center gap-4">
          <Button 
            type="button"
            variant="outline"
            onClick={() => setShowPreview(true)}
            disabled={loading}
          >
            Preview
          </Button>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleSubmit('drafts', 'Draft saved successfully!')}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Draft'}
            </Button>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>
      </form>

      <Modal isOpen={showCodeEditor} onClose={() => setShowCodeEditor(false)}>
        <div className="space-y-4">
          <select
            className="w-full p-2 border rounded"
            value={currentCode.language}
            onChange={e => setCurrentCode(prev => ({ ...prev, language: e.target.value }))}
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>
          
          <Textarea
            value={currentCode.code}
            onChange={e => setCurrentCode(prev => ({ ...prev, code: e.target.value }))}
            placeholder="Enter your code here..."
            className="font-mono h-64"
          />
          
          <Button onClick={addCodeBlock}>Add Code Block</Button>
        </div>
      </Modal>

      <Modal isOpen={showPreview} onClose={() => setShowPreview(false)}>
        <article className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold">{formData.title}</h2>
          <div 
            dangerouslySetInnerHTML={{ __html: formData.content }} 
            className="mt-4"
          />
          <div className="space-y-4 mt-4">
            {formData.codeBlocks.map((block, index) => (
              <CodeBlock 
                key={index}
                code={block.code}
                language={block.language}
              />
            ))}
          </div>
        </article>
        <Button 
          onClick={() => setShowPreview(false)} 
          className="mt-4"
        >
          Close
        </Button>
      </Modal>

      {isDraft && (
        <p className="mt-4 text-sm text-muted-foreground">
          Draft saved successfully. You can publish it later.
        </p>
      )}
    </div>
  )
}