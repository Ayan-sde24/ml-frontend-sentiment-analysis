import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader2, Send } from 'lucide-react'

export function InputBox({ text, setText, onSubmit, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 animate-fade-in z-10 relative">
      <div className="relative w-full max-w-2xl group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative glass-panel rounded-2xl p-2 flex flex-col bg-gray-900/40">
          <Textarea 
            className="min-h-[120px] resize-none border-0 focus-visible:ring-0 bg-transparent text-lg placeholder:text-gray-400 p-4"
            placeholder="What's happening? Enter tweet to analyze sentiment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <div className="flex justify-between items-center p-2 border-t border-gray-800">
            <span className="text-xs text-gray-500 ml-2">Press enter to analyze</span>
            <Button
              className="rounded-full px-6 transition-all duration-300 hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
              onClick={onSubmit}
              disabled={!text.trim() || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing
                </>
              ) : (
                <>
                  Analyze
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
