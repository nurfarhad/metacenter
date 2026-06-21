/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, RotateCcw, Copy, Trash2, Command, Keyboard } from 'lucide-react';
import { correctPerformance } from './services/geminiService';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isCorrecting, setIsCorrecting] = useState(false);
  const [lastProcessedText, setLastProcessedText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [stats, setStats] = useState({ words: 0, chars: 0 });
  
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const performCorrection = useCallback(async (text: string) => {
    if (!text.trim() || text === lastProcessedText) {
      setIsCorrecting(false);
      return;
    }

    setIsCorrecting(true);
    const corrected = await correctPerformance(text);
    
    if (corrected !== text) {
      setCorrectedText(corrected);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    
    setLastProcessedText(text);
    setIsCorrecting(false);
  }, [lastProcessedText]);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    if (inputText.trim().length > 10) {
      debounceTimer.current = setTimeout(() => {
        performCorrection(inputText);
      }, 1500);
    } else {
      setShowSuggestions(false);
    }

    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    setStats({ words, chars: inputText.length });

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [inputText, performCorrection]);

  const handleApply = () => {
    setInputText(correctedText);
    setLastProcessedText(correctedText);
    setShowSuggestions(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(correctedText || inputText);
  };

  const handleClear = () => {
    if (confirm('Clear all text?')) {
      setInputText('');
      setCorrectedText('');
      setShowSuggestions(false);
    }
  };

  return (
    <div className="h-full w-full bg-[#F4F4F5] flex overflow-hidden text-[#18181B] font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-zinc-200 flex flex-col shrink-0">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-6 bg-zinc-900 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span className="font-bold tracking-tight text-lg">Lumina Engine</span>
          </div>
          <nav className="space-y-1">
            <div className="nav-item-active">Drafting Node</div>
            <div className="nav-item">API Infrastructure</div>
            <div className="nav-item">Latency Metrics</div>
            <div className="nav-item">Safety Guards</div>
          </nav>
        </div>

        <div className="mt-8 px-8">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-5">Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-zinc-500">Words</span>
                <span className="font-mono">{stats.words}</span>
              </div>
              <div className="h-1 bg-zinc-100 rounded-full">
                <div className="h-full bg-zinc-900 rounded-full transition-all" style={{ width: `${Math.min(stats.words, 100)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium mb-2">
                <span className="text-zinc-500">Characters</span>
                <span className="font-mono">{stats.chars}</span>
              </div>
              <div className="h-1 bg-zinc-100 rounded-full">
                <div className="h-full bg-zinc-400 rounded-full transition-all" style={{ width: `${Math.min(stats.chars / 5, 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-zinc-100">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
            <span>Core Status</span>
            <span className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] ${isCorrecting ? 'bg-amber-500 shadow-amber-500/60' : 'bg-green-500 shadow-green-500/60'}`}></span>
          </div>
          <div className="text-xs text-zinc-500 font-mono">
            ID: LUMINA-FLASH-01
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-10 overflow-hidden">
        <header className="flex justify-between items-start mb-8 shrink-0">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-zinc-900">Editor Workspace</h1>
            <p className="text-zinc-500 mt-1">Real-time correction & phrasing optimization</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleClear}
              className="px-4 py-2 text-zinc-400 hover:text-zinc-600 transition-colors text-sm font-medium"
            >
              Reset
            </button>
            <button 
              onClick={handleCopy}
              className="btn-primary flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy Output
            </button>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-3 gap-6 overflow-hidden">
          {/* Editor Area */}
          <div className="col-span-2 flex flex-col overflow-hidden">
            <div className="card-base flex-1 flex flex-col relative">
              <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center shrink-0">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Input Surface</span>
                <span className="text-[10px] bg-zinc-200 px-2 py-0.5 rounded uppercase font-mono">Real-time monitoring</span>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <textarea
                  className="writing-surface"
                  placeholder="// Paste or type your draft here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  spellCheck={false}
                />
                <AnimatePresence>
                  {isCorrecting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute top-4 right-4 flex items-center gap-2 text-[10px] font-mono text-zinc-400 px-2 py-1 bg-white border border-zinc-100 rounded-md shadow-sm"
                    >
                      <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                      ANALYZING
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* AI Output / Sandbox Area */}
          <div className="col-span-1 flex flex-col gap-6 overflow-hidden">
            <div className="bg-zinc-900 rounded-2xl p-8 shadow-xl text-white relative overflow-hidden flex flex-col flex-1">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={80} />
              </div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-6 shrink-0">Correction Node</h3>
              
              <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                {!inputText ? (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-30 px-4">
                    <Keyboard className="w-8 h-8 mb-4" />
                    <p className="text-sm">Standby: Awaiting input signals</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-[11px] text-zinc-500 border-l border-zinc-700 pl-3 italic">
                      Original: "{inputText.length > 60 ? inputText.substring(0, 60) + '...' : inputText}"
                    </div>
                    
                    <div className="text-base leading-relaxed font-medium">
                      <AnimatePresence mode="wait">
                        {correctedText ? (
                          <motion.div
                            key={correctedText}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative"
                          >
                            {correctedText.split(' ').map((word, i) => {
                              const originalWords = inputText.toLowerCase().split(' ');
                              const isNew = !originalWords.includes(word.toLowerCase().replace(/[.,!?;:]/g, ''));
                              return (
                                <span key={i} className={isNew ? 'text-blue-400' : ''}>
                                  {word}{' '}
                                </span>
                              );
                            })}
                            <span className="inline-block w-1.5 h-4 bg-blue-500 ml-1 animate-pulse align-middle" />
                          </motion.div>
                        ) : isCorrecting ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1">
                            <span className="w-2 h-2 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-zinc-700 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-zinc-700 rounded-full animate-bounce"></span>
                          </motion.div>
                        ) : (
                          <p className="text-zinc-500 italic text-sm">No adjustments needed yet.</p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between shrink-0">
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">Latency</div>
                    <div className="text-xs font-mono">{isCorrecting ? '...' : (correctedText ? '142ms' : '0ms')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">Tokens</div>
                    <div className="text-xs font-mono">{stats.words} / 500</div>
                  </div>
                </div>
                
                {showSuggestions && correctedText !== inputText && (
                  <button 
                    onClick={handleApply}
                    className="px-4 py-2 bg-white text-zinc-900 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-2"
                  >
                    Apply Fix
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

