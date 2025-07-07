'use client'

import { useState } from 'react'
import Tesseract from 'tesseract.js'

export default function Uploader() {
  const [loading, setLoading] = useState(false)

  const handleImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setLoading(true)

    const { data: { text } } = await Tesseract.recognize(file, 'eng')
    console.log('OCR result:', text)

    const res = await fetch('/api/parse-roster', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })

    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'roster.ics'
    a.click()

    setLoading(false)
  }

  return (
    <div>
      <label style={{
        display: 'inline-block',
        padding: '0.75rem 1.25rem',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '0.9rem',
        cursor: 'pointer',
        borderRadius: '3px',
        marginBottom: '1rem'
      }}>
        Upload Image
        <input type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
      </label>
      {loading && <p>⏳ Processing image...</p>}
    </div>
  )
}
