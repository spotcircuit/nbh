'use client'

import React, { useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { cn } from '@/src/lib/utils'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
  className?: string
  disabled?: boolean
  apiKey?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Start typing...',
  height = 400,
  className,
  disabled = false,
  apiKey = 'your-tinymce-api-key', // Replace with actual API key
}) => {
  const editorRef = useRef<any>(null)

  return (
    <div className={cn('rich-text-editor', className)}>
      <Editor
        apiKey={apiKey}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={(newValue) => onChange(newValue)}
        disabled={disabled}
        init={{
          height,
          menubar: false,
          placeholder,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
            'fullscreen', 'insertdatetime', 'media', 'table', 'help',
            'wordcount', 'emoticons', 'codesample'
          ],
          toolbar: 
            'undo redo | formatselect | ' +
            'bold italic underline strikethrough | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | ' +
            'link image media | ' +
            'removeformat help',
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; 
              font-size: 16px;
              line-height: 1.6;
              color: #1e293b;
              padding: 12px;
            }
            p { margin: 0 0 1em 0; }
            h1 { font-size: 2em; margin: 0.67em 0; }
            h2 { font-size: 1.5em; margin: 0.75em 0; }
            h3 { font-size: 1.17em; margin: 0.83em 0; }
            h4 { margin: 1.12em 0; }
            h5 { font-size: 0.83em; margin: 1.5em 0; }
            h6 { font-size: 0.75em; margin: 1.67em 0; }
            a { color: #0891b2; text-decoration: underline; }
            a:hover { color: #0e7490; }
            ul, ol { margin: 0 0 1em 2em; }
            blockquote { 
              border-left: 4px solid #e2e8f0; 
              padding-left: 1em; 
              margin: 1em 0;
              color: #64748b;
            }
            code { 
              background: #f1f5f9; 
              padding: 2px 4px; 
              border-radius: 3px;
              font-family: 'Courier New', monospace;
            }
            pre { 
              background: #f1f5f9; 
              padding: 1em; 
              border-radius: 6px;
              overflow-x: auto;
            }
            table { 
              border-collapse: collapse; 
              width: 100%; 
              margin: 1em 0;
            }
            th, td { 
              border: 1px solid #e2e8f0; 
              padding: 0.5em 1em;
              text-align: left;
            }
            th { 
              background: #f8fafc;
              font-weight: 600;
            }
          `,
          skin: 'oxide',
          content_css: 'default',
          branding: false,
          promotion: false,
          statusbar: true,
          elementpath: false,
          resize: true,
          autosave_interval: '30s',
          autosave_prefix: 'tinymce-autosave-{path}{query}-{id}-',
          autosave_restore_when_empty: false,
          image_caption: true,
          image_advtab: true,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
          contextmenu: 'link image table',
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
          toolbar_mode: 'sliding',
          toolbar_sticky: true,
        }}
      />
    </div>
  )
}

export default RichTextEditor