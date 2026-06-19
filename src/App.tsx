import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Search,
  Code2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Zap,
  BookOpen,
  ChevronRight,
  Target,
  Cpu,
  TrendingUp,
} from 'lucide-react';
import {
  findsDataset,
  ATTRIBUTES,
  exampleToArray,
  computeFindSSteps,
  type HypothesisState,
} from './data/findsData';

const STEP_INTERVAL_MS = 1500;

const CODE_SNIPPET = `import numpy as np
import pandas as pd

data = pd.read_csv('finds_dataset.csv')

def train(concepts, target):
  # 1. Initialize specific hypothesis
  #    with first positive example
  for i, val in enumerate(target):
    if val == "Yes":
      specific_h = concepts[i]
      break
  # 2. Generalize when needed
  for i, h in enumerate(concepts):
    if target[i] == "Yes":
      for x in range(len(specific_h)):
        if h[x] != specific_h[x]:
          specific_h[x] = "?"
  return specific_h

concepts = np.array(data.iloc[:, 0:-1])
target = np.array(data.iloc[:, -1])
print(train(concepts, target))`;

export default function App() {
  const steps = useMemo(() => computeFindSSteps(), []);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, STEP_INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, steps.length]);

  const currentState: HypothesisState | null =
    currentStep >= 0 ? steps[currentStep] : null;
  const currentExample =
    currentStep >= 0 ? findsDataset[steps[currentStep].step] : null;

  const stepBack = () => {
    setIsPlaying(false);
    setCurrentStep((s) => Math.max(-1, s - 1));
  };
  const stepForward = () => {
    setIsPlaying(false);
    setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  };
  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(-1);
  };
  const togglePlay = () => {
    if (currentStep >= steps.length - 1) setCurrentStep(-1);
    setIsPlaying((p) => !p);
  };

  const isFinished = currentStep === steps.length - 1;
  const positiveCount = findsDataset.filter((d) => d.target === 'Yes').length;
  const negativeCount = findsDataset.filter((d) => d.target === 'No').length;
  const progress =
    currentStep < 0 ? 0 : ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0118] text-white">
      {/* Animated gradient background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-purple-600/20 blur-3xl" />
        <div
          className="absolute top-1/3 -right-40 h-96 w-96 animate-pulse rounded-full bg-pink-600/20 blur-3xl"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute -bottom-40 left-1/3 h-96 w-96 animate-pulse rounded-full bg-cyan-600/20 blur-3xl"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative">
        {/* Header */}
        <header className="border-b border-white/5 bg-black/40">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
              <Search className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">
                Find-S Algorithm
              </h1>
              <p className="text-xs text-white/50">
                Specific Hypothesis Learning · Interactive Visualizer
              </p>
            </div>
            <button
              onClick={() => setShowCode((s) => !s)}
              className="ml-auto flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white"
            >
              <Code2 className="h-3.5 w-3.5" />
              {showCode ? 'Hide Code' : 'View Code'}
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Hero */}
          <div className="group relative mb-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-orange-900/40 p-8">
            {/* Decorative gradient line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[11px] font-medium text-purple-300">
                  <Sparkles className="h-3 w-3" /> Concept Learning
                </div>
                <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                  From examples to a{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    specific hypothesis
                  </span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  The{' '}
                  <span className="font-semibold text-purple-300">Find-S</span>{' '}
                  algorithm initializes the hypothesis with the first positive
                  example, then generalizes it by replacing differing attributes
                  with{' '}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-pink-300">
                    ?
                  </code>{' '}
                  whenever a new positive example doesn't match.
                </p>
              </div>
              <div className="flex gap-3 lg:flex-col">
                <div className="flex-1 rounded-xl border border-white/10 bg-black/40 px-5 py-4 lg:min-w-[140px]">
                  <p className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
                    {findsDataset.length}
                  </p>
                  <p className="text-xs text-white/50">Examples</p>
                </div>
                <div className="flex-1 rounded-xl border border-white/10 bg-black/40 px-5 py-4 lg:min-w-[140px]">
                  <p className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-3xl font-bold text-transparent">
                    {ATTRIBUTES.length}
                  </p>
                  <p className="text-xs text-white/50">Attributes</p>
                </div>
                <div className="flex-1 rounded-xl border border-white/10 bg-black/40 px-5 py-4 lg:min-w-[140px]">
                  <p className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-3xl font-bold text-transparent">
                    {positiveCount}/{negativeCount}
                  </p>
                  <p className="text-xs text-white/50">Yes / No</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Dataset Table */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-black/40">
                <div className="flex items-center gap-3 border-b border-white/5 px-6 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-1 ring-purple-400/30">
                    <BookOpen className="h-4 w-4 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">EnjoySport Dataset</h3>
                    <p className="text-xs text-white/50">
                      Training examples · Click a row to jump
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-white/40">
                        <th className="px-4 py-3 text-left font-medium">#</th>
                        {ATTRIBUTES.map((a) => (
                          <th key={a} className="px-2 py-3 text-center font-medium">
                            {a}
                          </th>
                        ))}
                        <th className="px-4 py-3 text-center font-medium">Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {findsDataset.map((ex, i) => {
                        const stepIdx = steps.findIndex((s) => s.step === i);
                        const isActive = stepIdx === currentStep;
                        const isPast = stepIdx !== -1 && stepIdx < currentStep;
                        const isFuture = stepIdx > currentStep;
                        const isNegative = ex.target === 'No';
                        return (
                          <tr
                            key={i}
                            onClick={() => {
                              setIsPlaying(false);
                              setCurrentStep(stepIdx);
                            }}
                            className={`cursor-pointer border-b border-white/5 transition ${
                              isActive
                                ? 'bg-gradient-to-r from-purple-500/15 to-pink-500/10'
                                : isPast
                                ? 'bg-white/[0.02]'
                                : isFuture
                                ? 'opacity-30'
                                : ''
                            } hover:bg-white/5 ${
                              isNegative ? 'text-white/60' : ''
                            }`}
                          >
                            <td className="px-4 py-3 font-mono text-xs text-white/40">
                              E{i}
                            </td>
                            {exampleToArray(ex).map((v, vi) => {
                              let changed = false;
                              if (isActive)
                                changed = currentState!.changedAttrs[vi];
                              return (
                                <td key={vi} className="px-2 py-3 text-center">
                                  <span
                                    className={`inline-block rounded px-2 py-0.5 font-mono text-xs transition ${
                                      changed
                                        ? 'bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/50'
                                        : isNegative
                                        ? 'text-white/50'
                                        : 'text-white/90'
                                    }`}
                                  >
                                    {v}
                                  </span>
                                </td>
                              );
                            })}
                            <td className="px-4 py-3 text-center">
                              {ex.target === 'Yes' ? (
                                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-300">
                                  <CheckCircle2 className="h-3 w-3" /> Yes
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-300">
                                  <XCircle className="h-3 w-3" /> No
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Event Log */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/40">
                <div className="flex items-center gap-3 border-b border-white/5 px-6 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 ring-1 ring-yellow-400/30">
                    <Zap className="h-4 w-4 text-yellow-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Execution Log</h3>
                    <p className="text-xs text-white/50">
                      Step-by-step algorithm trace
                    </p>
                  </div>
                </div>

                <div className="max-h-80 space-y-1.5 overflow-y-auto p-4">
                  {steps.map((s, idx) => {
                    const ex = findsDataset[s.step];
                    const active = idx === currentStep;
                    const past = idx < currentStep;
                    const future = idx > currentStep;

                    let borderColor = 'border-white/10';
                    let bgColor = 'bg-white/[0.02]';
                    let accentColor = 'text-white/50';
                    let eventLabel = 'Processing';
                    let eventIcon = <ArrowRight className="h-3.5 w-3.5" />;

                    if (s.event === 'init') {
                      borderColor = 'border-emerald-500/30';
                      bgColor = 'bg-emerald-500/5';
                      accentColor = 'text-emerald-300';
                      eventIcon = <Sparkles className="h-3.5 w-3.5" />;
                      eventLabel = 'Initialize';
                    } else if (s.event === 'positive-mismatch') {
                      borderColor = 'border-amber-500/30';
                      bgColor = 'bg-amber-500/5';
                      accentColor = 'text-amber-300';
                      eventIcon = <Zap className="h-3.5 w-3.5" />;
                      eventLabel = 'Generalize';
                    } else if (s.event === 'skipped') {
                      borderColor = 'border-white/10';
                      bgColor = 'bg-white/[0.02]';
                      accentColor = 'text-rose-300';
                      eventIcon = <XCircle className="h-3.5 w-3.5" />;
                      eventLabel = 'Skip (Negative)';
                    }

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setIsPlaying(false);
                          setCurrentStep(idx);
                        }}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${borderColor} ${bgColor} ${
                          active ? 'ring-1 ring-amber-400/40' : ''
                        } ${future ? 'opacity-25' : ''} ${
                          past && !active ? 'opacity-70' : ''
                        } hover:bg-white/5`}
                      >
                        <div className={`mt-0.5 ${accentColor}`}>{eventIcon}</div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="font-mono text-white/40">
                              Step {idx + 1}
                            </span>
                            <ChevronRight className="h-3 w-3 text-white/30" />
                            <span className={`font-semibold ${accentColor}`}>
                              {eventLabel}
                            </span>
                            <span className="text-white/40">
                              · Example {s.step} (
                              {ex.target === 'Yes' ? '✓' : '✗'})
                            </span>
                          </div>
                          <p className="mt-1.5 break-all font-mono text-xs text-white/80">
                            h = [
                            {s.hypothesis
                              .map((h) => (h === '?' ? '?' : h))
                              .join(', ')}
                            ]
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {currentStep === -1 && (
                    <div className="rounded-lg border border-dashed border-white/10 p-5 text-center text-xs text-white/40">
                      Press{' '}
                      <span className="font-semibold text-purple-300">Play</span>{' '}
                      or{' '}
                      <span className="font-semibold text-pink-300">
                        Step Forward
                      </span>{' '}
                      to start the algorithm
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-6 lg:col-span-2">
              {/* Current Example */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    Current Example
                  </h3>
                  {currentExample ? (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        currentExample.target === 'Yes'
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                          : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                      }`}
                    >
                      {currentExample.target === 'Yes' ? 'Positive' : 'Negative'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                      Not Started
                    </span>
                  )}
                </div>
                {currentExample ? (
                  <div className="grid grid-cols-3 gap-2">
                    {exampleToArray(currentExample).map((v, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-white/10 bg-white/[0.03] p-2"
                      >
                        <p className="text-[10px] uppercase tracking-wider text-white/40">
                          {ATTRIBUTES[i]}
                        </p>
                        <p
                          className={`mt-0.5 truncate font-mono text-xs font-medium ${
                            currentState?.changedAttrs[i]
                              ? 'text-rose-300'
                              : 'text-white/90'
                          }`}
                        >
                          {v}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-6 text-center text-xs text-white/30">—</p>
                )}
              </div>

              {/* Hypothesis State */}
              <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 via-black/40 to-pink-900/20">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

                <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                  <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-purple-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    Specific Hypothesis
                  </h3>
                  {isFinished && (
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                      ✓ Final
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 p-4">
                  {ATTRIBUTES.map((attr, i) => {
                    const value = currentState?.hypothesis[i];
                    const isWildcard = value === '?' || value === '∅';
                    const changed = currentState?.changedAttrs[i];
                    return (
                      <div
                        key={attr}
                        className={`rounded-lg border p-3 transition-all ${
                          !value
                            ? 'border-white/10 bg-white/[0.02]'
                            : isWildcard
                            ? 'border-purple-400/30 bg-purple-500/10'
                            : 'border-white/10 bg-white/[0.03]'
                        } ${
                          changed && currentState?.event !== 'skipped'
                            ? 'border-pink-400/60 ring-1 ring-pink-400/30'
                            : ''
                        }`}
                      >
                        <p className="text-[10px] uppercase tracking-wider text-white/40">
                          {attr}
                        </p>
                        <p
                          className={`mt-1 font-mono text-xl font-bold ${
                            !value
                              ? 'text-white/30'
                              : isWildcard
                              ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                              : 'text-white'
                          }`}
                        >
                          {value ?? '∅'}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-white/5 bg-black/40 p-4">
                  <p className="text-[10px] uppercase tracking-wider text-purple-400/70">
                    Vector Form
                  </p>
                  <p className="mt-1 break-all font-mono text-sm text-white/90">
                    [{currentState?.hypothesis.join(', ') ?? '—'}]
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-white/50">
                  Playback Controls
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={reset}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                    title="Reset"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    onClick={stepBack}
                    disabled={currentStep < 0}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    title="Step Back"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 font-semibold text-white transition hover:from-purple-400 hover:via-pink-400 hover:to-orange-400"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />{' '}
                        {currentStep >= steps.length - 1 ? 'Replay' : 'Play'}
                      </>
                    )}
                  </button>
                  <button
                    onClick={stepForward}
                    disabled={currentStep >= steps.length - 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    title="Step Forward"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-xs text-white/50">
                    <span>
                      Step {currentStep + 1} / {steps.length}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Preview */}
          {showCode && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-black/60">
              <div className="flex items-center gap-3 border-b border-white/5 px-6 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 ring-1 ring-cyan-400/30">
                  <Code2 className="h-4 w-4 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Python Source</h3>
                  <p className="text-xs text-white/50">
                    The Find-S implementation
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto p-4">
                <pre className="font-mono text-sm leading-relaxed">
                  <code>
                    {CODE_SNIPPET.split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="mr-4 inline-block w-6 select-none text-right text-white/20">
                          {i + 1}
                        </span>
                        <span className="text-white/80">{line}</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          )}

          {/* Bottom info cards */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-5 transition hover:border-purple-500/30">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-purple-500/10 transition group-hover:bg-purple-500/20" />
              <div className="relative">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 ring-1 ring-purple-400/30">
                  <Target className="h-4 w-4 text-purple-300" />
                </div>
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  Algorithm Type
                </h4>
                <p className="mt-1 font-semibold text-white">Concept Learning</p>
                <p className="mt-1 text-xs text-white/50">
                  Most specific hypothesis
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-5 transition hover:border-pink-500/30">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-pink-500/10 transition group-hover:bg-pink-500/20" />
              <div className="relative">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-pink-500/20 ring-1 ring-pink-400/30">
                  <Cpu className="h-4 w-4 text-pink-300" />
                </div>
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  Space Complexity
                </h4>
                <p className="mt-1 font-mono font-semibold text-white">O(n)</p>
                <p className="mt-1 text-xs text-white/50">
                  Single hypothesis vector
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-5 transition hover:border-orange-500/30">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-orange-500/10 transition group-hover:bg-orange-500/20" />
              <div className="relative">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20 ring-1 ring-orange-400/30">
                  <TrendingUp className="h-4 w-4 text-orange-300" />
                </div>
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  Time Complexity
                </h4>
                <p className="mt-1 font-mono font-semibold text-white">O(m · n)</p>
                <p className="mt-1 text-xs text-white/50">
                  m examples, n attributes
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-5 transition hover:border-cyan-500/30">
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-cyan-500/10 transition group-hover:bg-cyan-500/20" />
              <div className="relative">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 ring-1 ring-cyan-400/30">
                  <Zap className="h-4 w-4 text-cyan-300" />
                </div>
                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  Limitation
                </h4>
                <p className="mt-1 font-semibold text-white">Noisy Data</p>
                <p className="mt-1 text-xs text-white/50">
                  Requires consistent data
                </p>
              </div>
            </div>
          </div>

          <footer className="mt-8 pb-8 text-center text-xs text-white/40">
            Built with React · Tailwind CSS · TypeScript
          </footer>
        </main>
      </div>
    </div>
  );
}
