"use client";

import { useState } from "react";
import type { ConsiderationPage } from "@/lib/types/strapi";

interface Props {
  data: ConsiderationPage | null;
}

export function ConsiderationQuizSection({ data }: Props): React.ReactElement {
  const title = data?.quizTitle ?? null;
  const description = data?.quizDescription ?? null;
  const questions = data?.quizQuestions ?? [];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [completed, setCompleted] = useState(false);

  if (questions.length === 0) {
    return <></>;
  }

  const titleLines = (title ?? "").split("\n");
  const firstLine = titleLines[0];
  const restLines = titleLines.slice(1).join("\n");

  const current = questions[step];
  const options = Array.isArray(current?.options) ? current.options : [];
  const isLast = step === questions.length - 1;
  const selected = answers[step] ?? null;

  const select = (option: string): void => {
    setAnswers((prev) => ({ ...prev, [step]: option }));
  };

  const next = (): void => {
    if (isLast) {
      setCompleted(true);
    } else {
      setStep((prev) => Math.min(prev + 1, questions.length - 1));
    }
  };

  return (
    <section className="bg-neutral-950 text-white py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — title + description */}
          <div>
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight tracking-tight whitespace-pre-line">
                <span className="text-primary">{firstLine}</span>
                {restLines && (
                  <>
                    {"\n"}
                    {restLines}
                  </>
                )}
              </h2>
            )}
            {description && (
              <p className="mt-6 text-base lg:text-lg leading-relaxed text-white/70 whitespace-pre-line">
                {description}
              </p>
            )}
          </div>

          {/* Right — quiz card */}
          <div className="rounded-2xl bg-neutral-900 ring-1 ring-white/10 p-8 lg:p-10">
            {/* Progress stepper */}
            <div className="flex items-center mb-8">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`h-2.5 w-2.5 flex-none rounded-full transition-colors ${
                      i <= step || completed ? "bg-primary" : "bg-white/20"
                    }`}
                  />
                  {i < questions.length - 1 && (
                    <div
                      className={`h-px flex-1 mx-1 transition-colors ${
                        i < step || completed ? "bg-primary" : "bg-white/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {completed ? (
              <div className="py-8 text-center">
                <p className="text-2xl font-serif font-bold">Thanks!</p>
                <p className="mt-3 text-white/70">
                  We have everything we need to start the conversation.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                  Question {step + 1} of {questions.length}
                </p>
                <p className="text-lg lg:text-xl font-semibold leading-snug mb-6">
                  {current?.question}
                </p>
                <div className="space-y-3">
                  {options.map((option) => {
                    const active = selected === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => select(option)}
                        className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                          active
                            ? "border-primary bg-primary/10"
                            : "border-white/15 hover:border-white/40"
                        }`}>
                        <span
                          className={`flex h-4 w-4 flex-none items-center justify-center rounded-full border ${
                            active ? "border-primary" : "border-white/40"
                          }`}>
                          {active && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={next}
                  disabled={!selected}
                  className="mt-8 w-full bg-primary text-black px-8 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                  {isLast ? "Finish" : "Next"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
