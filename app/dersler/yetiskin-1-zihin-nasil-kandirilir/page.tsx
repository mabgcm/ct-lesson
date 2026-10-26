"use client";

import { useEffect, useRef, useState } from "react";
import {
  ETHICS_TEXT,
  FARK_ET,
  HOOK_AFTER,
  HOOK_MESSAGE,
  HOOK_OPTIONS,
  INTRO_PARAGRAPHS,
  MATCH_CORRECT,
  MATCH_PAIRS,
  MATCH_WRONG,
  MICRO_1,
  MICRO_2,
  MICRO_3,
  MINI_QUIZ_1,
  MINI_QUIZ_2,
  MINI_QUIZ_3,
  OBJECTIVES,
  POLL_EXPLANATION,
  POLL_MESSAGE,
  POLL_OPTIONS,
  TRAP_COMPLETE,
  TRAP_SENTENCES,
  TRAP_WRONG,
  type MicroLesson,
  type QuizQuestion,
} from "./lesson-data";
import {
  BRANCH_CHOICES,
  CLOSING_POINTS,
  EMAIL_BOOSTERS,
  EXIT_ALL_CORRECT,
  EXIT_QUESTIONS,
  EXIT_SOME_WRONG,
  JOURNAL_EXAMPLE,
  JOURNAL_FIELDS,
  JOURNAL_SAVED,
  REVERSE_DONE,
  REVERSE_EXAMPLE_BREAKDOWN,
  REVERSE_EXAMPLE_MESSAGE,
  REVERSE_TECHNIQUES,
  REVERSE_TRIGGERS,
  RUBRIC_QUESTIONS,
  SCENARIO_CLOSING,
  SCENARIO_TEXT,
  TRANSFER_MODEL,
  TRANSFER_TEXT,
} from "./lesson-data-2";

const PROGRESS_KEY = "zihin-kalkani-ders1-ilerleme";
const DATA_KEY = "zihin-kalkani-ders1-veri";
const SLIDE_KEY = "zihin-kalkani-ders1-slayt";
const VISITED_KEY = "zihin-kalkani-ders1-ziyaret-edilen";

const SLIDES = [
  { id: "giris", title: "Başlangıç" },
  { id: "etik", title: "Etik sözleşme" },
  { id: "farket", title: "FARK ET" },
  { id: "hedefler", title: "Bu derste ne öğreneceksin" },
  { id: "kanca", title: "İlk mesaj" },
  { id: "mikro-1-1", title: "Hızlı düşünme 1 / 3" },
  { id: "mikro-1-2", title: "Hızlı düşünme 2 / 3" },
  { id: "mikro-1-3", title: "Hızlı düşünme 3 / 3" },
  { id: "mikro-1-eslestirme", title: "Hızlı düşünme — Dene" },
  { id: "mikro-1-soru", title: "Kısa soru" },
  { id: "mikro-2-1", title: "Onay önyargısı 1 / 3" },
  { id: "mikro-2-2", title: "Onay önyargısı 2 / 3" },
  { id: "mikro-2-3", title: "Onay önyargısı 3 / 3" },
  { id: "mikro-2-tuzak", title: "Onay önyargısı — Dene" },
  { id: "mikro-2-soru", title: "Kısa soru" },
  { id: "mikro-3-1", title: "Duygu tuzağı 1 / 3" },
  { id: "mikro-3-2", title: "Duygu tuzağı 2 / 3" },
  { id: "mikro-3-3", title: "Duygu tuzağı 3 / 3" },
  { id: "mikro-3-tahmin", title: "Duygu tuzağı — Dene" },
  { id: "mikro-3-soru", title: "Kısa soru" },
  { id: "senaryo-1", title: "Bir mesaj geldi" },
  { id: "senaryo-2", title: "Seçim yap" },
  { id: "tersine-1", title: "Kendin yaz 1 / 4" },
  { id: "tersine-2", title: "Kendin yaz 2 / 4" },
  { id: "tersine-3", title: "Kendin yaz 3 / 4" },
  { id: "tersine-4", title: "Kendin yaz 4 / 4" },
  { id: "cikis", title: "Kısa kontrol" },
  { id: "transfer-1", title: "Başka bir alanda dene" },
  { id: "transfer-2", title: "FARK ET ile yaz 1 / 2" },
  { id: "transfer-3", title: "FARK ET ile yaz 2 / 2" },
  { id: "rubrik-1", title: "Kendini değerlendir 1 / 2" },
  { id: "rubrik-2", title: "Kendini değerlendir 2 / 2" },
  { id: "gunluk-1", title: "Günlüğüne yaz 1 / 2" },
  { id: "gunluk-2", title: "Günlüğüne yaz 2 / 2" },
  { id: "kapanis-1", title: "Bu derste 3 şeyi öğrendin" },
  { id: "kapanis-2", title: "Sonraki adım" },
];

const SLIDE_KEY_V2 = "zihin-kalkani-ders1-slayt-v2";
const VISITED_KEY_V2 = "zihin-kalkani-ders1-ziyaret-edilen-v2";
// Eski 15 slaytlık düzenden yeni düzene geçiş haritası (eski indeks -> yeni indeks).
const OLD_SLIDE_TO_NEW: Record<number, number> = {
  0: 0, 1: 4, 2: 5, 3: 8, 4: 10, 5: 13, 6: 15, 7: 18, 8: 20, 9: 22, 10: 26, 11: 27, 12: 30, 13: 32, 14: 34,
};
// Eski tamamlanma kimlikleri -> yeni kimlikler.
const OLD_DONE_TO_NEW: Record<string, string[]> = {
  giris: ["giris", "etik", "farket", "hedefler"],
  kanca: ["kanca"],
  "mikro-1-metin": ["mikro-1-1", "mikro-1-2", "mikro-1-3"],
  "mikro-1-etkilesim": ["mikro-1-eslestirme", "mikro-1-soru"],
  "mikro-2-metin": ["mikro-2-1", "mikro-2-2", "mikro-2-3"],
  "mikro-2-etkilesim": ["mikro-2-tuzak", "mikro-2-soru"],
  "mikro-3-metin": ["mikro-3-1", "mikro-3-2", "mikro-3-3"],
  "mikro-3-etkilesim": ["mikro-3-tahmin", "mikro-3-soru"],
  senaryo: ["senaryo-1", "senaryo-2"],
  tersine: ["tersine-1", "tersine-2", "tersine-3", "tersine-4"],
  cikis: ["cikis"],
  transfer: ["transfer-1", "transfer-2", "transfer-3"],
  rubrik: ["rubrik-1", "rubrik-2"],
  gunluk: ["gunluk-1", "gunluk-2"],
  kapanis: ["kapanis-1", "kapanis-2"],
};

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function Tick({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-stone-900 text-white ${
        size === "lg" ? "h-9 w-9" : "h-7 w-7"
      }`}
    >
      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M4 10.5 8.5 15 16 5.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Feedback({ kind, children }: { kind: "ok" | "note"; children: React.ReactNode }) {
  return (
    <div
      role="status"
      className="mt-4 flex gap-3 rounded-2xl border border-stone-900 bg-zinc-50 p-4 leading-7 shadow-sm"
    >
      {kind === "ok" ? (
        <Tick />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-stone-900 font-bold"
        >
          !
        </span>
      )}
      <div className="min-w-0">
        <p className="font-semibold">{kind === "ok" ? "Doğru:" : "Not:"}</p>
        <div>{children}</div>
      </div>
    </div>
  );
}

function Slide({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-baslik`}>
      <h1 id={`${id}-baslik`} className="text-3xl font-bold leading-snug">
        {title}
      </h1>
      <div className="mt-6 space-y-5 leading-8 text-zinc-800">{children}</div>
    </section>
  );
}

function ChoiceButtons({
  options,
  selected,
  onSelect,
  label,
  answerIndex = null,
  showResult = false,
}: {
  options: string[];
  selected: number | null;
  onSelect: (index: number) => void;
  label: string;
  answerIndex?: number | null;
  showResult?: boolean;
}) {
  return (
    <div role="group" aria-label={label} className="mt-3 flex flex-col gap-3">
      {options.map((option, index) => {
        const letter = String.fromCharCode(65 + index);
        const isCorrect = showResult && answerIndex === index;
        const isWrongSelected =
          showResult && selected === index && answerIndex !== index;
        const isSelected = selected === index;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelect(index)}
            className={`flex min-h-14 items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left text-base shadow-sm transition hover:shadow ${
              isCorrect
                ? "border-emerald-700 bg-emerald-50"
                : isWrongSelected
                  ? "border-red-300 bg-red-50"
                  : isSelected
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-zinc-300 bg-white hover:border-stone-400"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-bold ${
                isCorrect
                  ? "border-emerald-700 bg-emerald-700 text-white"
                  : isWrongSelected
                    ? "border-red-400 bg-white text-red-700"
                    : isSelected
                      ? "border-white bg-white text-stone-900"
                      : "border-zinc-300 bg-stone-100 text-stone-700"
              }`}
            >
              {letter}
            </span>
            <span className="min-w-0 flex-1 pt-1 leading-6">{option}</span>
            {isCorrect && (
              <span aria-hidden="true" className="shrink-0 pt-1">
                <Tick />
              </span>
            )}
            {isWrongSelected && (
              <span
                aria-hidden="true"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold text-red-700"
              >
                ✕
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function SingleQuiz({
  quiz,
  title,
  onCorrect,
  selected,
  onSelect,
}: {
  quiz: QuizQuestion;
  title: string;
  onCorrect: () => void;
  selected: number | null;
  onSelect: (index: number | null) => void;
}) {
  const answered = selected !== null;
  const correct = selected === quiz.answerIndex;
  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-stone-50 p-5 shadow-sm">
      <p className="inline-flex items-center rounded-full bg-stone-900 px-3 py-1 text-xs font-bold text-white">
        {title}
      </p>
      <p className="mt-3 text-zinc-700">
        Az önce okuduğun kısım hakkında tek soru.
      </p>
      <p className="mt-3 text-lg font-semibold leading-7">{quiz.question}</p>
      <ChoiceButtons
        options={quiz.options}
        selected={selected}
        answerIndex={quiz.answerIndex}
        showResult={answered}
        onSelect={(i) => {
          onSelect(i);
          if (i === quiz.answerIndex) onCorrect();
        }}
        label={title}
      />
      {answered && correct && <Feedback kind="ok">{quiz.correctFeedback}</Feedback>}
      {answered && !correct && (
        <div>
          <Feedback kind="note">{quiz.wrongFeedback}</Feedback>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="mt-4 inline-flex min-h-12 items-center rounded-xl border-2 border-stone-900 bg-white px-5 text-sm font-semibold"
          >
            Tekrar dene
          </button>
        </div>
      )}
    </div>
  );
}


function QuickCheck({
  question,
  options,
  answerIndex,
  correctFeedback,
  wrongFeedback,
  selected,
  onSelect,
}: {
  question: string;
  options: string[];
  answerIndex: number;
  correctFeedback: string;
  wrongFeedback: string;
  selected: number | null;
  onSelect: (index: number | null) => void;
}) {
  const answered = selected !== null;
  const correct = selected === answerIndex;
  return (
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-stone-50 p-5 shadow-sm">
      <p className="inline-flex items-center rounded-full bg-stone-900 px-3 py-1 text-xs font-bold text-white">
        Kısa soru
      </p>
      <p className="mt-3 text-lg font-semibold leading-7">{question}</p>
      <ChoiceButtons
        options={options}
        selected={selected}
        answerIndex={answerIndex}
        showResult={answered}
        onSelect={(i) => onSelect(i)}
        label="Kısa soru"
      />
      {answered && correct && <Feedback kind="ok">{correctFeedback}</Feedback>}
      {answered && !correct && (
        <div>
          <Feedback kind="note">{wrongFeedback}</Feedback>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="mt-4 inline-flex min-h-12 items-center rounded-xl border-2 border-stone-900 bg-white px-5 text-sm font-semibold"
          >
            Tekrar dene
          </button>
        </div>
      )}
    </div>
  );
}

const MATCH_CATEGORIES = ["Hızlı düşünme", "Yavaş düşünme"] as const;

function MatchingGame({
  onComplete,
  initialMatched,
  onMatchedChange,
}: {
  onComplete: () => void;
  initialMatched: Record<number, string>;
  onMatchedChange: (next: Record<number, string>) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, string>>(initialMatched);
  const [wrong, setWrong] = useState(false);
  const [drag, setDrag] = useState<{
    index: number;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const completedRef = useRef(false);

  const updateMatched = (next: Record<number, string>) => {
    setMatched(next);
    onMatchedChange(next);
  };

  const place = (index: number, category: string) => {
    const pair = MATCH_PAIRS[index];
    if (pair.answer === category) {
      const next = { ...matched, [index]: category };
      updateMatched(next);
      setSelected(null);
      setWrong(false);
      if (Object.keys(next).length === MATCH_PAIRS.length && !completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    } else {
      setWrong(true);
      setSelected(null);
    }
  };

  useEffect(() => {
    if (!drag) return;
    const onMove = (e: PointerEvent) => {
      const start = startRef.current;
      const moved =
        !!start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 8;
      setDrag((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY, moved } : prev));
      if (moved) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const zone = el?.closest?.("[data-drop-category]");
        setHoverCategory(zone?.getAttribute("data-drop-category") ?? null);
      }
    };
    const onUp = () => {
      setDrag((prev) => {
        if (prev?.moved && hoverCategory) place(prev.index, hoverCategory);
        else if (prev && !prev.moved) {
          setSelected((cur) => (cur === prev.index ? null : prev.index));
        }
        return null;
      });
      setHoverCategory(null);
      startRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag?.index, drag?.moved, hoverCategory, matched]);

  const unmatched = MATCH_PAIRS.map((pair, i) => ({ pair, i })).filter(
    ({ i }) => !matched[i],
  );

  return (
    <div>
      <p className="mt-2 text-zinc-700">
        Bir durumu tutup doğru kutuya sürükle. Sürükleyemezsen kartı seç, sonra
        kutunun altındaki düğmeye dokun.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-stone-500">Durumlar</p>
          <div className="mt-3 flex flex-col gap-3" role="group" aria-label="Eşleştirilecek durumlar">
            {unmatched.map(({ pair, i }) => (
              <div
                key={pair.situation}
                role="button"
                tabIndex={0}
                aria-pressed={selected === i}
                aria-label={`${pair.situation}. Sürüklemek için tut, seçmek için dokun veya Enter'a bas.`}
                onPointerDown={(e) => {
                  startRef.current = { x: e.clientX, y: e.clientY };
                  setDrag({ index: i, x: e.clientX, y: e.clientY, moved: false });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected((cur) => (cur === i ? null : i));
                  }
                }}
                className={`flex min-h-14 cursor-grab touch-none items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left leading-6 shadow-sm transition active:cursor-grabbing ${
                  drag?.index === i && drag.moved
                    ? "opacity-40"
                    : selected === i
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-zinc-300 bg-white hover:border-stone-400"
                }`}
              >
                <span aria-hidden="true" className="shrink-0 text-lg leading-none opacity-60">
                  ⋮⋮
                </span>
                <span className="min-w-0 flex-1">{pair.situation}</span>
              </div>
            ))}
            {unmatched.length === 0 && (
              <p className="rounded-2xl border border-zinc-200 bg-stone-50 p-4 text-zinc-600">
                Tüm durumlar yerleştirildi.
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {MATCH_CATEGORIES.map((cat) => {
            const placed = MATCH_PAIRS.map((pair, i) => ({ pair, i })).filter(
              ({ i }) => matched[i] === cat,
            );
            const isHover = hoverCategory === cat;
            return (
              <div
                key={cat}
                data-drop-category={cat}
                className={`min-h-40 rounded-2xl border-2 p-4 transition ${
                  isHover
                    ? "border-stone-900 bg-stone-100 shadow-md"
                    : "border-dashed border-zinc-300 bg-stone-50"
                }`}
              >
                <p className="flex items-center justify-between font-bold">
                  {cat}
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-stone-500">
                    {placed.length} yerleşti
                  </span>
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {placed.map(({ pair, i }) => (
                    <div
                      key={pair.situation}
                      className="flex items-start gap-2 rounded-xl border border-zinc-200 bg-white p-3 text-sm leading-6"
                    >
                      <Tick />
                      <span className="min-w-0 flex-1">{pair.situation}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = { ...matched };
                          delete next[i];
                          updateMatched(next);
                        }}
                        className="inline-flex min-h-11 shrink-0 items-center rounded-lg border border-zinc-300 px-3 text-xs font-semibold"
                      >
                        Geri al
                      </button>
                    </div>
                  ))}
                  {placed.length === 0 && (
                    <p className="rounded-xl bg-white p-3 text-sm text-zinc-500">
                      Buraya sürükleyip bırak.
                    </p>
                  )}
                </div>
                {selected !== null && (
                  <button
                    type="button"
                    onClick={() => place(selected, cat)}
                    className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-stone-900 px-4 text-sm font-semibold text-white"
                  >
                    Seçili durumu buraya yerleştir
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {drag?.moved && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-50 max-w-72 -translate-y-1/2 rounded-2xl bg-stone-900 px-4 py-3 text-white shadow-xl"
          style={{ left: drag.x + 16, top: drag.y }}
        >
          {MATCH_PAIRS[drag.index].situation}
        </div>
      )}
      {wrong && <Feedback kind="note">{MATCH_WRONG}</Feedback>}
      {Object.keys(matched).length === MATCH_PAIRS.length && (
        <Feedback kind="ok">{MATCH_CORRECT}</Feedback>
      )}
    </div>
  );
}

function MicroLessonBlock({ lesson }: { lesson: MicroLesson }) {
  return (
    <div>
      {lesson.paragraphs.map((p, i) => (
        <p key={i} className="mt-3 leading-7 text-zinc-800">
          {p}
        </p>
      ))}
      <figure className="mt-5 rounded-2xl border border-zinc-200 bg-stone-50 p-5 shadow-sm">
        <figcaption className="font-semibold">{lesson.diagramTitle}</figcaption>
        <p className="mt-2 leading-7 text-zinc-700">{lesson.diagram}</p>
      </figure>
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `alan-${label.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <div className="mt-3">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      {hint && <p className="text-sm text-zinc-600">{hint}</p>}
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-2 w-full rounded-xl border-2 border-zinc-300 bg-white p-4 text-base outline-none transition focus:border-stone-900 focus:ring-2 focus:ring-stone-200"
      />
    </div>
  );
}

export default function Lesson1Page() {
  const [loaded, setLoaded] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [data, setData] = useState<Record<string, string>>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const [showSlides, setShowSlides] = useState(false);
  const [hookChoice, setHookChoice] = useState<number | null>(null);
  const [marked, setMarked] = useState<string[]>([]);
  const [trapWrong, setTrapWrong] = useState(false);
  const [pollChoice, setPollChoice] = useState<number | null>(null);
  const [branchChoice, setBranchChoice] = useState<string | null>(null);
  const [branchTried, setBranchTried] = useState<string[]>([]);
  const [showReverseExample, setShowReverseExample] = useState(false);
  const [reverseSaved, setReverseSaved] = useState(false);
  const [exitIndex, setExitIndex] = useState(0);
  const [exitSelected, setExitSelected] = useState<number | null>(null);
  const [exitMissed, setExitMissed] = useState<number[]>([]);
  const [exitFinished, setExitFinished] = useState(false);
  const [transferSaved, setTransferSaved] = useState(false);
  const [showTransferModel, setShowTransferModel] = useState(false);
  const [rubric, setRubric] = useState<Record<number, number>>({});
  const [rubricSaved, setRubricSaved] = useState(false);
  const [showJournalExample, setShowJournalExample] = useState(false);
  const [journalSaved, setJournalSaved] = useState(false);

  const completeSlide = (id: string) =>
    setDone((prev) => ({ ...prev, [id]: true }));

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, index));
    if (clamped > currentSlide) completeSlide(SLIDES[currentSlide].id);
    setCurrentSlide(clamped);
    setVisited((prev) => (prev.includes(clamped) ? prev : [...prev, clamped]));
  };

  useEffect(() => {
    const storedDone = readStored<Record<string, boolean>>(PROGRESS_KEY, {});
    const migrated: Record<string, boolean> = {};
    for (const [id, value] of Object.entries(storedDone)) {
      if (!value) continue;
      const mapped = OLD_DONE_TO_NEW[id];
      if (mapped) {
        for (const nid of mapped) migrated[nid] = true;
      } else if (SLIDES.some((s) => s.id === id)) {
        migrated[id] = true;
      }
    }
    setDone(migrated);
    const stored = readStored<Record<string, string>>(DATA_KEY, {});
    setData(stored);
    setReverseSaved(Boolean(stored["tersine-metin"]));
    setTransferSaved(Boolean(stored["transfer-metin"]));
    setJournalSaved(Boolean(stored["gunluk-olay"]));
    // Önce yeni (v2) konum denenir; yoksa eski 15 slaytlık konum
    // haritayla yeni düzendeki karşılığına taşınır. Böylece eski
    // ilerlemesi olan öğrenci boş veya yanlış bir slayta düşmez.
    const storedSlideV2 = readStored<number>(SLIDE_KEY_V2, -1);
    const storedSlideOld = readStored<number>(SLIDE_KEY, -1);
    const storedVisitedV2 = readStored<number[]>(VISITED_KEY_V2, []);
    const storedVisitedOld = readStored<number[]>(VISITED_KEY, []);
    const validVisitedV2 = storedVisitedV2.filter(
      (i) => typeof i === "number" && i >= 0 && i < SLIDES.length,
    );
    const mappedVisitedOld = storedVisitedOld
      .filter((i) => typeof i === "number" && OLD_SLIDE_TO_NEW[i] !== undefined)
      .map((i) => OLD_SLIDE_TO_NEW[i]);
    const validVisited = validVisitedV2.length
      ? validVisitedV2
      : Array.from(new Set(mappedVisitedOld));
    let start = 0;
    if (
      typeof storedSlideV2 === "number" &&
      storedSlideV2 >= 0 &&
      storedSlideV2 < SLIDES.length
    ) {
      start = storedSlideV2;
    } else if (
      typeof storedSlideOld === "number" &&
      OLD_SLIDE_TO_NEW[storedSlideOld] !== undefined
    ) {
      start = OLD_SLIDE_TO_NEW[storedSlideOld];
    } else {
      const firstIncomplete = SLIDES.findIndex((s) => !migrated[s.id]);
      start = firstIncomplete === -1 ? SLIDES.length - 1 : firstIncomplete;
    }
    setCurrentSlide(start);
    setVisited(validVisited.length ? validVisited : [start]);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(done));
      window.localStorage.setItem(DATA_KEY, JSON.stringify(data));
    } catch {
      // Tarayıcı depolaması kullanılamıyorsa ilerleme yalnızca oturumda kalır.
    }
  }, [done, data, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(SLIDE_KEY_V2, JSON.stringify(currentSlide));
    } catch {
      // Yoksay: slayt konumu yalnızca oturumda kalır.
    }
  }, [currentSlide, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(VISITED_KEY_V2, JSON.stringify(visited));
    } catch {
      // Yoksay: ziyaret edilen slaytlar yalnızca oturumda kalır.
    }
  }, [visited, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "TEXTAREA" ||
          target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowRight") goTo(currentSlide + 1);
      if (e.key === "ArrowLeft") goTo(currentSlide - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, loaded]);

  const setField = (key: string, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  // Mini quiz cevapları da yazılan diğer cevaplarla aynı yerde saklanır,
  // böylece slayt değiştirilse bile cevap sıfırlanmaz.
  const quizSelected = (key: string): number | null => {
    const raw = data[key];
    if (raw === undefined || raw === "") return null;
    const parsed = Number.parseInt(raw, 10);
    return Number.isNaN(parsed) ? null : parsed;
  };
  const quizSet = (key: string, index: number | null) =>
    setField(key, index === null ? "" : String(index));

  // Eşleştirme yerleşimleri de aynı depoda tutulur; slayttan çıkıp
  // dönüldüğünde yerleşimler sıfırlanmaz.
  const savedMatched = (() => {
    try {
      const parsed = JSON.parse(data["eslestirme"] ?? "{}") as Record<string, string>;
      const out: Record<number, string> = {};
      for (const [k, v] of Object.entries(parsed)) {
        const n = Number.parseInt(k, 10);
        if (!Number.isNaN(n) && typeof v === "string") out[n] = v;
      }
      return out;
    } catch {
      return {};
    }
  })();

  const doneCount = SLIDES.filter((s) => done[s.id]).length;
  const targetsFound = TRAP_SENTENCES.filter(
    (s) => s.target && marked.includes(s.id),
  ).length;
  const weakestRubric =
    rubricSaved && Object.keys(rubric).length === RUBRIC_QUESTIONS.length
      ? RUBRIC_QUESTIONS.reduce((min, _, i) =>
          (rubric[i] ?? 5) < (rubric[min] ?? 5) ? i : min,
        0)
      : null;
  const maxVisited = visited.length ? Math.max(...visited) : 0;
  const canJump = (index: number) =>
    visited.includes(index) || !!done[SLIDES[index].id] || index === maxVisited + 1;

  // Not: Slaytlar, kaydedilmiş konum yüklenmeden önce de sunucuda
  // çizilir (varsayılan slayt 1); yükleme etkisi ardından kaydedilmiş
  // slayta geçer. Böylece sayfa ilk açılışta boş bir "Yükleniyor…"
  // ekranı göstermez. Kaydetme etkileri `loaded` olmadan çalışmaz, bu
  // yüzden varsayılan durum depolanmış ilerlemenin üzerine yazılmaz.
  const nav = (
    <div className="mt-10 flex items-center justify-between gap-3 border-t border-stone-200 pt-6">
      <button
        type="button"
        disabled={currentSlide === 0}
        onClick={() => goTo(currentSlide - 1)}
        className="inline-flex min-h-12 items-center rounded-xl border border-stone-300 bg-white px-5 text-sm font-semibold disabled:opacity-40"
      >
        ← Önceki
      </button>
      <button
        type="button"
        disabled={currentSlide === SLIDES.length - 1}
        onClick={() => goTo(currentSlide + 1)}
        className="inline-flex min-h-12 items-center rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white disabled:opacity-40"
      >
        Sonraki →
      </button>
    </div>
  );

  const renderSlide = () => {
    const slideId = SLIDES[currentSlide].id;
    const paras = (list: string[], from: number, to: number) =>
      list.slice(from, to).map((p, i) => (
        <p key={i} className="mt-3 leading-7 text-zinc-800 first:mt-0">{p}</p>
      ));
    const diagram = (lesson: MicroLesson) => (
      <figure className="mt-5 rounded-2xl border border-zinc-200 bg-stone-50 p-5 shadow-sm">
        <figcaption className="font-semibold">{lesson.diagramTitle}</figcaption>
        <p className="mt-2 leading-7 text-zinc-700">{lesson.diagram}</p>
      </figure>
    );
    const quick = (
      key: string,
      question: string,
      options: string[],
      answerIndex: number,
      correctFeedback: string,
      wrongFeedback: string,
    ) => (
      <QuickCheck
        question={question}
        options={options}
        answerIndex={answerIndex}
        correctFeedback={correctFeedback}
        wrongFeedback={wrongFeedback}
        selected={quizSelected(key)}
        onSelect={(i) => quizSet(key, i)}
      />
    );
    switch (slideId) {
      case "giris":
        return (
          <Slide id="giris" title="Başlangıç">
            {paras(INTRO_PARAGRAPHS, 0, 3)}
            {quick(
              "peki-giris",
              "Bu derste neyi öğrenmeyeceksin?",
              ["Sihirli bir korunma yöntemi", "Teknikleri ismiyle tanımak", "Durup kendi değerlerinle karar vermek"],
              0,
              "Doğru. Sihir yok; teknikleri tanıyıp durmayı öğreneceksin.",
              "Tekrar dene. Dersin başında “sihirli bir korunma yöntemi öğrenmeyeceksin” deniyor.",
            )}
          </Slide>
        );
      case "etik":
        return (
          <Slide id="etik" title="Etik sözleşme">
            {paras(ETHICS_TEXT, 0, 2)}
            {quick(
              "peki-etik",
              "Öğrendiğin teknikleri başkalarını yönlendirmek için kullanmalısın, doğru mu yanlış mı?",
              ["Doğru", "Yanlış"],
              1,
              "Yanlış. Teknikleri kendini korumak için kullanacaksın, başkalarını yönlendirmek için değil.",
              "Tekrar dene. Etik sözleşmeye bak: bir tekniği tanımak, onu kullanma hakkı vermez.",
            )}
          </Slide>
        );
      case "farket":
        return (
          <Slide id="farket" title="FARK ET">
            <p className="text-zinc-700">Her karara aynı 6 adımla bakacağız.</p>
            <ol className="mt-3 space-y-2">
              {FARK_ET.map((s) => (
                <li key={s.letter} className="rounded-lg border border-zinc-200 p-3">
                  <strong>{s.letter} — {s.name}:</strong> {s.question}
                </li>
              ))}
            </ol>
            {quick(
              "peki-farket",
              "“Bu mesaj benden tam olarak ne istiyor?” hangi adımdır?",
              ["Fren", "Amaç", "Referans"],
              1,
              "Doğru. Amaç, mesajın senden ne istediğini sorar.",
              "Tekrar dene. Fren durmayı, Referans kim söylediğini sorar.",
            )}
          </Slide>
        );
      case "hedefler":
        return (
          <Slide id="hedefler" title="Bu derste ne öğreneceksin">
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
              {OBJECTIVES.map((o) => <li key={o}>{o}</li>)}
            </ul>
            {quick(
              "peki-hedef",
              "Acele bir kararda söyleyeceğin cümle ne?",
              ["Dur, burada ne oluyor?", "Hemen karar ver", "Herkes ne yapıyorsa onu yap"],
              0,
              "Doğru. Bu cümle, kararını yavaş moda taşır.",
              "Tekrar dene. Dersin başındaki cümleyi hatırla: “Dur, burada ne oluyor?”",
            )}
          </Slide>
        );
      case "kanca":
        return (
          <Slide id="kanca" title="İlk mesaj">
            <p className="text-zinc-700">Önce mesajı oku, sonra ilk tepkini seç.</p>
            <div className="mt-3 rounded-lg border border-stone-900 p-4" aria-label="Kurgusal indirim mesajı örneği">
              {HOOK_MESSAGE.map((line, i) => (
                <p key={i} className={i === 0 ? "font-bold" : "mt-1"}>{line}</p>
              ))}
              <p className="mt-3 inline-block rounded-lg bg-stone-900 px-4 py-2 font-semibold text-white">
                ŞİMDİ SATIN AL
              </p>
            </div>
            <p className="mt-4 font-semibold">Bu mesajı okuduğunda ilk tepkin ne oldu?</p>
            <ChoiceButtons
              options={HOOK_OPTIONS}
              selected={hookChoice}
              onSelect={(i) => { setHookChoice(i); completeSlide("kanca"); }}
              label="İlk tepkin"
            />
            {hookChoice !== null && <Feedback kind="note">{HOOK_AFTER}</Feedback>}
          </Slide>
        );
      case "mikro-1-1":
        return (
          <Slide id="mikro-1-1" title="Hızlı düşünme 1 / 3">
            {paras(MICRO_1.paragraphs, 0, 3)}
            {quick(
              "peki-m1-1",
              "Bir sözleşmeyi okumak hangi düşünmedir?",
              ["Hızlı düşünme", "Yavaş düşünme"],
              1,
              "Doğru. Sözleşme okumak bilinçli ve yavaştır.",
              "Tekrar dene. Hızlı düşünme otomatiktir; sözleşme okumak bilinçli bir iştir.",
            )}
          </Slide>
        );
      case "mikro-1-2":
        return (
          <Slide id="mikro-1-2" title="Hızlı düşünme 2 / 3">
            {paras(MICRO_1.paragraphs, 3, 6)}
            {quick(
              "peki-m1-2",
              "“Son adet” yazısı seni hangi modda tutar?",
              ["Hızlı düşünme", "Yavaş düşünme"],
              0,
              "Doğru. Geri sayım ve “son adet” hızlı modda tutar.",
              "Tekrar dene. Acele tetikleyicileri hızlı modda tutar; o modda kanıt aramazsın.",
            )}
          </Slide>
        );
      case "mikro-1-3":
        return (
          <Slide id="mikro-1-3" title="Hızlı düşünme 3 / 3">
            {paras(MICRO_1.paragraphs, 6, 7)}
            {diagram(MICRO_1)}
            {quick(
              "peki-m1-3",
              "Acele hissettiğinde ilk adım nedir?",
              ["Hemen almak", "Fren: durmak", "Başkalarına sormak"],
              1,
              "Doğru. Fren, kararını yavaş moda taşır.",
              "Tekrar dene. Kural: acele hissettiğinde dur.",
            )}
          </Slide>
        );
      case "mikro-1-eslestirme":
        return (
          <Slide id="mikro-1-eslestirme" title="Hızlı düşünme — Dene">
            <h3 className="text-lg font-bold">Dene</h3>
            <p className="mt-2 text-zinc-700">Her durumu doğru düşünme türüyle eşleştir.</p>
            <MatchingGame
              onComplete={() => completeSlide("mikro-1-eslestirme")}
              initialMatched={savedMatched}
              onMatchedChange={(next) => setField("eslestirme", JSON.stringify(next))}
            />
          </Slide>
        );
      case "mikro-1-soru":
        return (
          <Slide id="mikro-1-soru" title="Kısa soru">
            <SingleQuiz
              quiz={MINI_QUIZ_1}
              title="Kısa soru"
              onCorrect={() => {}}
              selected={quizSelected("mini-1")}
              onSelect={(i) => quizSet("mini-1", i)}
            />
          </Slide>
        );
      case "mikro-2-1":
        return (
          <Slide id="mikro-2-1" title="Onay önyargısı 1 / 3">
            {paras(MICRO_2.paragraphs, 0, 2)}
            {quick(
              "peki-m2-1",
              "Zaten inandığın bilgiyi seçmek nedir?",
              ["Onay önyargısı", "Duygu tuzağı"],
              0,
              "Doğru. Zaten inandığın bilgiyi seçmek onay önyargısıdır.",
              "Tekrar dene. Duygu tuzağı duyguyu yükseltir; burada mesele hangi bilginin seçildiğidir.",
            )}
          </Slide>
        );
      case "mikro-2-2":
        return (
          <Slide id="mikro-2-2" title="Onay önyargısı 2 / 3">
            {paras(MICRO_2.paragraphs, 2, 4)}
            {diagram(MICRO_2)}
            {quick(
              "peki-m2-2",
              "“Herkes böyle düşünüyor” hissi neden oluşur?",
              ["Herkes gerçekten aynı şeyi düşündüğü için", "Yalnızca aynı fikirdeki içerikleri gördüğün için"],
              1,
              "Doğru. Gördüğün, kendi fikrinin yansıması olabilir; herkesin fikri değil.",
              "Tekrar dene. Algoritmalar ve seçilmiş yorumlar sana sürekli aynı fikirdeki içerikleri gösterir.",
            )}
          </Slide>
        );
      case "mikro-2-3":
        return (
          <Slide id="mikro-2-3" title="Onay önyargısı 3 / 3">
            {paras(MICRO_2.paragraphs, 4, 6)}
            {quick(
              "peki-m2-3",
              "Bir iddia seni hemen rahatlattıysa ne yapmalısın?",
              ["Karşıt kanıtı aramak", "Yalnızca doğrulayan yorumları okumak"],
              0,
              "Doğru. Karşıt kanıtı aramak, fikrinden vazgeçmek değil; fikrini test etmektir.",
              "Tekrar dene. Yalnızca doğrulayan bilgiyi okumak, onay önyargısını güçlendirir.",
            )}
          </Slide>
        );
      case "mikro-2-tuzak":
        return (
          <Slide id="mikro-2-tuzak" title="Onay önyargısı — Dene">
            <h3 className="text-lg font-bold">Dene</h3>
            <p className="mt-2 text-zinc-700">Onay önyargısını besleyen 3 cümleyi işaretle.</p>
            <p className="mt-2 text-sm font-semibold text-stone-500">
              Bulunan: {targetsFound} / 3
            </p>
            <div className="mt-3 flex flex-col gap-3" role="group" aria-label="İşaretlenecek cümleler">
              {TRAP_SENTENCES.map((s) => {
                const isMarked = marked.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={isMarked}
                    onClick={() => {
                      if (s.target) {
                        if (isMarked) {
                          setMarked(marked.filter((id) => id !== s.id));
                        } else {
                          const next = [...marked, s.id];
                          setMarked(next);
                          setTrapWrong(false);
                          if (TRAP_SENTENCES.filter((x) => x.target && next.includes(x.id)).length === 3) completeSlide("mikro-2-tuzak");
                        }
                      } else {
                        setTrapWrong(true);
                      }
                    }}
                    className={`flex min-h-16 items-start gap-3 rounded-2xl border-2 px-4 py-3 text-left shadow-sm transition hover:shadow ${
                      isMarked ? "border-stone-900 bg-stone-50" : "border-zinc-300 bg-white hover:border-stone-400"
                    }`}
                  >
                    {isMarked ? (
                      <Tick size="lg" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-zinc-300 bg-white text-zinc-400"
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                          <path d="M4 10.5 8.5 15 16 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-zinc-600">{s.user}</span>
                      <span className="mt-1 block leading-6">{s.text}</span>
                      <span className={`mt-2 block text-sm font-bold ${isMarked ? "text-stone-900" : "text-zinc-500"}`}>
                        {isMarked ? "✓ İşaretlendi — tekrar dokunursan kalkar" : "İşaretlemek için dokun"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            {trapWrong && <Feedback kind="note">{TRAP_WRONG}</Feedback>}
            {targetsFound === 3 && (
              <div>
                {TRAP_SENTENCES.filter((s) => s.target).map((s) => (
                  <Feedback key={s.id} kind="ok">{s.explanation}</Feedback>
                ))}
                <Feedback kind="ok">{TRAP_COMPLETE}</Feedback>
              </div>
            )}
          </Slide>
        );
      case "mikro-2-soru":
        return (
          <Slide id="mikro-2-soru" title="Kısa soru">
            <SingleQuiz
              quiz={MINI_QUIZ_2}
              title="Kısa soru"
              onCorrect={() => {}}
              selected={quizSelected("mini-2")}
              onSelect={(i) => quizSet("mini-2", i)}
            />
          </Slide>
        );
      case "mikro-3-1":
        return (
          <Slide id="mikro-3-1" title="Duygu tuzağı 1 / 3">
            {paras(MICRO_3.paragraphs, 0, 2)}
            {quick(
              "peki-m3-1",
              "Duygu yükselince ne geri plana düşer?",
              ["Kanıt arama ve maliyet hesaplama", "Duygunun kendisi"],
              0,
              "Doğru. Duygu yükselince kanıt arama geri plana düşer.",
              "Tekrar dene. Duygu kararın kendisi haline gelir; kanıt arama geri plana düşer.",
            )}
          </Slide>
        );
      case "mikro-3-2":
        return (
          <Slide id="mikro-3-2" title="Duygu tuzağı 2 / 3">
            {paras(MICRO_3.paragraphs, 2, 5)}
            {quick(
              "peki-m3-2",
              "Duygu tuzağında önce ne yükseltilir, sonra ne sunulur?",
              ["Önce çözüm, sonra duygu", "Önce duygu, sonra hemen çözüm"],
              1,
              "Doğru. Önce duygu yükseltilir, sonra çözüm aceleyle sunulur.",
              "Tekrar dene. Sıra: korkut, sonra “hemen al” de.",
            )}
          </Slide>
        );
      case "mikro-3-3":
        return (
          <Slide id="mikro-3-3" title="Duygu tuzağı 3 / 3">
            {paras(MICRO_3.paragraphs, 5, 6)}
            {diagram(MICRO_3)}
            {quick(
              "peki-m3-3",
              "Korku hissettiğinde ilk ne yaparsın?",
              ["Hemen karar vermek", "Duyguyu adlandırıp durmak"],
              1,
              "Doğru. Duyguyu adlandırmak hızı keser, sonra FARK ET ile bakarsın.",
              "Tekrar dene. Duygu yüksekken verilen karar, duygunun kararıdır.",
            )}
          </Slide>
        );
      case "mikro-3-tahmin":
        return (
          <Slide id="mikro-3-tahmin" title="Duygu tuzağı — Dene">
            <h3 className="text-lg font-bold">Dene</h3>
            <p className="mt-2 text-zinc-700">Mesajı oku:</p>
            <blockquote className="mt-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 leading-7 shadow-sm">
              {POLL_MESSAGE}
            </blockquote>
            <p className="mt-3 font-semibold">Bu mesajın devamında büyük olasılıkla ne olur?</p>
            <ChoiceButtons
              options={POLL_OPTIONS}
              selected={pollChoice}
              onSelect={(i) => { setPollChoice(i); completeSlide("mikro-3-tahmin"); }}
              label="Tahmin"
            />
            {pollChoice !== null && (
              <Feedback kind="ok">
                {POLL_EXPLANATION.map((p, i) => <p key={i} className="mt-2 first:mt-0">{p}</p>)}
              </Feedback>
            )}
          </Slide>
        );
      case "mikro-3-soru":
        return (
          <Slide id="mikro-3-soru" title="Kısa soru">
            <SingleQuiz
              quiz={MINI_QUIZ_3}
              title="Kısa soru"
              onCorrect={() => {}}
              selected={quizSelected("mini-3")}
              onSelect={(i) => quizSet("mini-3", i)}
            />
          </Slide>
        );
      case "senaryo-1":
        return (
          <Slide id="senaryo-1" title="Bir mesaj geldi">
            {paras(SCENARIO_TEXT, 0, 3)}
            {quick(
              "peki-senaryo",
              "Bu sayfada seni acele ettiren nedir?",
              ["Geri sayım, “son 3 adet” ve kalabalık notu", "Ayakkabının rengi"],
              0,
              "Doğru. Geri sayım ve “son adet”, hızlı modda tutan tetikleyicilerdir.",
              "Tekrar dene. Sayfadaki geri sayım ve “son 3 adet” yazısına bak.",
            )}
          </Slide>
        );
      case "senaryo-2":
        return (
          <Slide id="senaryo-2" title="Seçim yap">
            <p className="leading-7 text-zinc-800">{SCENARIO_TEXT[3]}</p>
            {branchChoice === null ? (
              <ChoiceButtons
                options={BRANCH_CHOICES.map((c) => c.label)}
                selected={null}
                onSelect={(i) => {
                  const c = BRANCH_CHOICES[i];
                  setBranchChoice(c.id);
                  setBranchTried((prev) => prev.includes(c.id) ? prev : [...prev, c.id]);
                }}
                label="Senaryo seçimleri"
              />
            ) : (
              <div>
                {(() => {
                  const c = BRANCH_CHOICES.find((x) => x.id === branchChoice)!;
                  const triedAllNonBest = BRANCH_CHOICES.filter((x) => !x.isBest).every((x) => branchTried.includes(x.id));
                  return (
                    <div className="mt-4 rounded-2xl border-2 border-stone-900 bg-stone-50 p-5 shadow-sm">
                      <p className="text-sm font-bold text-stone-500">Sonuç</p>
                      <p className="mt-2 font-semibold">Seçimin: {c.label}</p>
                      <p className="mt-2 leading-7">{c.result}</p>
                      <Feedback kind="note">{c.feedback}</Feedback>
                      {!c.isBest && (
                        <button
                          type="button"
                          onClick={() => setBranchChoice(null)}
                          className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-stone-900 px-4 text-sm font-semibold"
                        >
                          Farklı bir seçim dene
                        </button>
                      )}
                      {c.isBest && (
                        <div>
                          <Feedback kind="ok">{SCENARIO_CLOSING}</Feedback>
                          <button
                            type="button"
                            onClick={() => completeSlide("senaryo-2")}
                            className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white"
                          >
                            Devam et
                          </button>
                        </div>
                      )}
                      {!c.isBest && triedAllNonBest && (
                        <div className="mt-3">
                          <Feedback kind="ok">{SCENARIO_CLOSING}</Feedback>
                          <button
                            type="button"
                            onClick={() => completeSlide("senaryo-2")}
                            className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white"
                          >
                            Devam et
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </Slide>
        );
      case "tersine-1":
        return (
          <Slide id="tersine-1" title="Kendin yaz 1 / 4">
            <p className="leading-7 text-zinc-800">
              Şimdi sıra sende. Öğrendiğin tekniklerden birini kullanarak,
              zayıflatılmış (abartısız, tuzağı açıkça görülebilen) bir manipülatif
              mesaj yaz. Amacın insanları kandırmak değil; tekniğin nasıl çalıştığını
              içeriden görmek. O yüzden mesajın kurgusal ve zararsız olsun, gerçek
              bir ürün veya kişi adı kullanma.
            </p>
            <p className="mt-3 font-semibold">1. Bir teknik seç:</p>
            <ChoiceButtons
              options={REVERSE_TECHNIQUES}
              selected={REVERSE_TECHNIQUES.indexOf(data["tersine-teknik"] ?? "") >= 0 ? REVERSE_TECHNIQUES.indexOf(data["tersine-teknik"]!) : null}
              onSelect={(i) => setField("tersine-teknik", REVERSE_TECHNIQUES[i])}
              label="Teknik seçimi"
            />
            <Field label="2. Zayıf mesajını yaz (2–3 cümle)" value={data["tersine-metin"] ?? ""} onChange={(v) => setField("tersine-metin", v)} />
          </Slide>
        );
      case "tersine-2":
        return (
          <Slide id="tersine-2" title="Kendin yaz 2 / 4">
            <p className="text-zinc-700">Mesajında hangi tetikleyiciyi kullanıyorsun? İşaretle.</p>
            <fieldset className="mt-4">
              <legend className="font-semibold">Tuzakları işaretle: Hangi tetikleyiciyi kullanıyor?</legend>
              <div className="mt-2 flex flex-col gap-2">
                {REVERSE_TRIGGERS.map((t) => {
                  const chosen = (data["tersine-tetikleyiciler"] ?? "").split(",").filter(Boolean);
                  const on = chosen.includes(t);
                  return (
                    <label
                      key={t}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 py-2 shadow-sm transition hover:shadow ${
                        on ? "border-stone-900 bg-stone-50" : "border-zinc-300 bg-white hover:border-stone-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={on}
                        onChange={() => {
                          const next = on ? chosen.filter((x) => x !== t) : [...chosen, t];
                          setField("tersine-tetikleyiciler", next.join(","));
                        }}
                      />
                      {on ? (
                        <Tick />
                      ) : (
                        <span aria-hidden="true" className="h-7 w-7 shrink-0 rounded-full border-2 border-zinc-300" />
                      )}
                      <span className="font-medium">{t}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </Slide>
        );
      case "tersine-3":
        return (
          <Slide id="tersine-3" title="Kendin yaz 3 / 4">
            <p className="text-zinc-700">Aynı mesajı FARK ET ile boz — ilk 3 adım:</p>
            {FARK_ET.slice(0, 3).map((s) => (
              <Field
                key={s.name}
                label={s.name}
                hint={s.question}
                value={data[`tersine-${s.name}`] ?? ""}
                onChange={(v) => setField(`tersine-${s.name}`, v)}
              />
            ))}
          </Slide>
        );
      case "tersine-4":
        return (
          <Slide id="tersine-4" title="Kendin yaz 4 / 4">
            <p className="text-zinc-700">Aynı mesajı FARK ET ile boz — son 3 adım:</p>
            {FARK_ET.slice(3, 6).map((s) => (
              <Field
                key={s.name}
                label={s.name}
                hint={s.question}
                value={data[`tersine-${s.name}`] ?? ""}
                onChange={(v) => setField(`tersine-${s.name}`, v)}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                if ((data["tersine-metin"] ?? "").trim()) {
                  setReverseSaved(true);
                  completeSlide("tersine-4");
                }
              }}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white"
            >
              Kaydet
            </button>
            {(data["tersine-metin"] ?? "").trim() === "" && (
              <p className="mt-2 text-sm text-zinc-600">Kaydetmek için önce 1. adımda mesajını yaz.</p>
            )}
            {reverseSaved && <Feedback kind="ok">{REVERSE_DONE}</Feedback>}
            <button
              type="button"
              onClick={() => setShowReverseExample((v) => !v)}
              aria-expanded={showReverseExample}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-stone-900 px-4 text-sm font-semibold"
            >
              Örneği gör
            </button>
            {showReverseExample && (
              <div className="mt-3 rounded-lg border border-zinc-200 p-4">
                <p className="leading-7"><strong>Örnek mesaj (duygu tuzağı):</strong> {REVERSE_EXAMPLE_MESSAGE}</p>
                <p className="mt-3 font-semibold">Bozma:</p>
                <ul className="mt-2 space-y-1">
                  {REVERSE_EXAMPLE_BREAKDOWN.map((b) => <li key={b} className="leading-7">{b}</li>)}
                </ul>
              </div>
            )}
          </Slide>
        );
      case "cikis":
        return (
          <Slide id="cikis" title="Kısa kontrol">
            <p className="text-zinc-700">
              3 kısa soru. Yanlış cevaplarsan o konuyu kısaca tekrar ederiz.
            </p>
            {!exitFinished ? (
              <div className="mt-4">
                <p className="font-semibold">
                  Soru {exitIndex + 1} / 3 — {EXIT_QUESTIONS[exitIndex].technique}
                </p>
                <p className="mt-2 font-semibold">{EXIT_QUESTIONS[exitIndex].question}</p>
                <ChoiceButtons
                  options={EXIT_QUESTIONS[exitIndex].options}
                  selected={exitSelected}
                  answerIndex={EXIT_QUESTIONS[exitIndex].answerIndex}
                  showResult={exitSelected !== null}
                  onSelect={(i) => setExitSelected(i)}
                  label={`Kısa kontrol soru ${exitIndex + 1}`}
                />
                {exitSelected !== null && (
                  <div>
                    <Feedback kind={exitSelected === EXIT_QUESTIONS[exitIndex].answerIndex ? "ok" : "note"}>
                      {EXIT_QUESTIONS[exitIndex].explanation}
                    </Feedback>
                    <button
                      type="button"
                      onClick={() => {
                        const q = EXIT_QUESTIONS[exitIndex];
                        if (exitSelected !== q.answerIndex) setExitMissed((prev) => [...prev, exitIndex]);
                        if (exitIndex < 2) {
                          setExitIndex(exitIndex + 1);
                          setExitSelected(null);
                        } else {
                          setExitFinished(true);
                          completeSlide("cikis");
                        }
                      }}
                      className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white"
                    >
                      {exitIndex < 2 ? "Sonraki soru" : "Sonucu gör"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {exitMissed.length === 0 ? (
                  <Feedback kind="ok">{EXIT_ALL_CORRECT}</Feedback>
                ) : (
                  <div>
                    <Feedback kind="note">{EXIT_SOME_WRONG}</Feedback>
                    {exitMissed.map((mi) => (
                      <div key={mi} className="mt-4 rounded-2xl border-2 border-stone-900 bg-stone-50 p-5 shadow-sm">
                        <p className="text-sm font-bold text-stone-500">Kısa tekrar</p>
                        <h3 className="mt-1 font-bold">{EXIT_QUESTIONS[mi].remedialTitle}</h3>
                        <p className="mt-2 leading-7">{EXIT_QUESTIONS[mi].remedialText}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Slide>
        );
      case "transfer-1":
        return (
          <Slide id="transfer-1" title="Başka bir alanda dene">
            <p className="leading-7 text-zinc-800">
              Şimdi aynı beceriyi alışveriş dışında bir alanda dene.
            </p>
            <blockquote className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 leading-7">
              {TRANSFER_TEXT}
            </blockquote>
            {quick(
              "peki-transfer",
              "Bu mesaj senden ne istiyor?",
              ["Hemen ürünü satın almanı", "Sakin sakin araştırmanı"],
              0,
              "Doğru. Mesaj, “stoklar tükenmeden dene” diyerek hemen satın almanı istiyor.",
              "Tekrar dene. “Stoklar tükenmeden sen de dene, yoksa geç kalırsın!” cümlesine bak.",
            )}
          </Slide>
        );
      case "transfer-2":
        return (
          <Slide id="transfer-2" title="FARK ET ile yaz 1 / 2">
            <p className="text-zinc-700">Her adıma 1–2 cümle yaz — ilk 3 adım:</p>
            {FARK_ET.slice(0, 3).map((s) => (
              <Field
                key={s.name}
                label={s.name}
                hint={s.question}
                value={data[`transfer-${s.name}`] ?? ""}
                onChange={(v) => setField(`transfer-${s.name}`, v)}
              />
            ))}
          </Slide>
        );
      case "transfer-3":
        return (
          <Slide id="transfer-3" title="FARK ET ile yaz 2 / 2">
            <p className="text-zinc-700">Her adıma 1–2 cümle yaz — son 3 adım:</p>
            {FARK_ET.slice(3, 6).map((s) => (
              <Field
                key={s.name}
                label={s.name}
                hint={s.question}
                value={data[`transfer-${s.name}`] ?? ""}
                onChange={(v) => setField(`transfer-${s.name}`, v)}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                setTransferSaved(true);
                completeSlide("transfer-3");
              }}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white"
            >
              Kaydet
            </button>
            {transferSaved && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowTransferModel((v) => !v)}
                  aria-expanded={showTransferModel}
                  className="inline-flex min-h-11 items-center rounded-lg border border-stone-900 px-4 text-sm font-semibold"
                >
                  Model cevabı gör
                </button>
                {showTransferModel && (
                  <ul className="mt-3 space-y-1 rounded-lg border border-zinc-200 p-4">
                    {TRANSFER_MODEL.map((m) => <li key={m} className="leading-7">{m}</li>)}
                  </ul>
                )}
              </div>
            )}
          </Slide>
        );
      case "rubrik-1":
        return (
          <Slide id="rubrik-1" title="Kendini değerlendir 1 / 2">
            <p className="text-zinc-700">
              Kendi analizini puanla. Her soruya 1 (zayıf) ile 5 (güçlü) arasında puan ver.
            </p>
            {RUBRIC_QUESTIONS.slice(0, 4).map((q, i) => (
              <div key={q.name} className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                <p className="font-semibold">
                  {q.name} {q.detail}
                </p>
                <div className="mt-3 flex gap-2" role="group" aria-label={`${q.name} puanı`}>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={rubric[i] === value}
                      onClick={() => setRubric((prev) => ({ ...prev, [i]: value }))}
                      className={`flex min-h-12 min-w-12 flex-1 items-center justify-center rounded-full border-2 text-base font-bold transition ${
                        rubric[i] === value
                          ? "border-stone-900 bg-stone-900 text-white"
                          : "border-zinc-300 bg-white hover:border-stone-400"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <p className="mt-2 flex justify-between text-xs text-zinc-500">
                  <span>1 — Zayıf</span>
                  <span>5 — Güçlü</span>
                </p>
              </div>
            ))}
          </Slide>
        );
      case "rubrik-2":
        return (
          <Slide id="rubrik-2" title="Kendini değerlendir 2 / 2">
            <p className="text-zinc-700">Devamı:</p>
            {RUBRIC_QUESTIONS.slice(4, 7).map((q, idx) => {
              const i = idx + 4;
              return (
                <div key={q.name} className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                  <p className="font-semibold">
                    {q.name} {q.detail}
                  </p>
                  <div className="mt-3 flex gap-2" role="group" aria-label={`${q.name} puanı`}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={rubric[i] === value}
                        onClick={() => setRubric((prev) => ({ ...prev, [i]: value }))}
                        className={`flex min-h-12 min-w-12 flex-1 items-center justify-center rounded-full border-2 text-base font-bold transition ${
                          rubric[i] === value
                            ? "border-stone-900 bg-stone-900 text-white"
                            : "border-zinc-300 bg-white hover:border-stone-400"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 flex justify-between text-xs text-zinc-500">
                    <span>1 — Zayıf</span>
                    <span>5 — Güçlü</span>
                  </p>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => { setRubricSaved(true); completeSlide("rubrik-2"); }}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white"
            >
              Kaydet
            </button>
            {rubricSaved && weakestRubric !== null && (
              <Feedback kind="note">
                En düşük puanı alan soru: {RUBRIC_QUESTIONS[weakestRubric].name} — {RUBRIC_QUESTIONS[weakestRubric].detail} En düşük puanı alan soru, bir dahaki analizinde dikkat edeceğin sorudur. Onu bir kenara not et. Bir dahaki sefere analiz yaparken önce o soruya bak.
              </Feedback>
            )}
          </Slide>
        );
      case "gunluk-1":
        return (
          <Slide id="gunluk-1" title="Günlüğüne yaz 1 / 2">
            <p className="leading-7 text-zinc-800">
              Şimdi kendi hayatından 1 örneği FARK ET ile yaz. Yazıların sende kalır.
            </p>
            <button
              type="button"
              onClick={() => setShowJournalExample((v) => !v)}
              aria-expanded={showJournalExample}
              className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-stone-900 px-4 text-sm font-semibold"
            >
              Örneği gör
            </button>
            {showJournalExample && (
              <ul className="mt-3 space-y-1 rounded-lg border border-zinc-200 p-4">
                {JOURNAL_EXAMPLE.map((e) => <li key={e} className="leading-7">{e}</li>)}
              </ul>
            )}
            {JOURNAL_FIELDS.slice(0, 3).map((f) => (
              <Field
                key={f.key}
                label={f.label}
                hint={f.hint}
                value={data[`gunluk-${f.key}`] ?? ""}
                onChange={(v) => setField(`gunluk-${f.key}`, v)}
              />
            ))}
          </Slide>
        );
      case "gunluk-2":
        return (
          <Slide id="gunluk-2" title="Günlüğüne yaz 2 / 2">
            <p className="text-zinc-700">Devamı:</p>
            {JOURNAL_FIELDS.slice(3, 6).map((f) => (
              <Field
                key={f.key}
                label={f.label}
                hint={f.hint}
                value={data[`gunluk-${f.key}`] ?? ""}
                onChange={(v) => setField(`gunluk-${f.key}`, v)}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                if ((data["gunluk-olay"] ?? "").trim()) {
                  setJournalSaved(true);
                  completeSlide("gunluk-2");
                }
              }}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-stone-900 px-4 text-sm font-semibold text-white"
            >
              Kaydet
            </button>
            {(data["gunluk-olay"] ?? "").trim() === "" && (
              <p className="mt-2 text-sm text-zinc-600">Kaydetmek için önce 1. adımda olayı yaz.</p>
            )}
            {journalSaved && <Feedback kind="ok">{JOURNAL_SAVED}</Feedback>}
          </Slide>
        );
      case "kapanis-1":
        return (
          <Slide id="kapanis-1" title="Bu derste 3 şeyi öğrendin">
            <ol className="mt-2 list-decimal space-y-2 pl-5 leading-7 text-zinc-800">
              {CLOSING_POINTS.map((p) => <li key={p}>{p}</li>)}
            </ol>
            <p className="mt-4 font-semibold">
              Bundan sonra tek cümlen var: “Dur, burada ne oluyor?”
            </p>
            {quick(
              "peki-kapanis",
              "Acele bir kararda ilk cümlen ne olmalı?",
              ["Dur, burada ne oluyor?", "Hemen karar ver"],
              0,
              "Doğru. Bu cümleyi hatırlarsan, bu ders görevini yapmış demektir.",
              "Tekrar dene. Dersin kapanış cümlesine bak.",
            )}
          </Slide>
        );
      case "kapanis-2":
        return (
          <Slide id="kapanis-2" title="Sonraki adım">
            <p className="mt-2 text-zinc-700">
              Ders bitti. Her e-posta tek eylem içerir, uzun metin içermez.
            </p>
            <ul className="mt-3 space-y-3">
              {EMAIL_BOOSTERS.map((e) => (
                <li key={e.when} className="rounded-lg border border-zinc-200 p-4">
                  <p className="font-semibold">{e.when}: {e.title}</p>
                  <p className="mt-1 leading-7 text-zinc-700">{e.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-zinc-600">
              Not: Bu ilk sürümde e-posta gönderimi henüz kurulmamıştır; yukarıdaki
              görevler, sistem kurulduğunda gönderilecek güçlendirmelerin
              içeriğidir.
            </p>
            <a href="/" onClick={() => completeSlide("kapanis-2")} className="mt-4 inline-flex min-h-12 items-center rounded-xl bg-stone-900 px-5 text-sm font-semibold text-white">
              Ana sayfaya dön
            </a>
          </Slide>
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-stone-100 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200"
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={SLIDES.length}
          aria-label="Ders ilerlemesi"
        >
          <div
            className="h-full rounded-full bg-stone-900"
            style={{ width: `${(doneCount / SLIDES.length) * 100}%` }}
          />
        </div>
        <p className="mt-5 text-center text-sm font-medium text-stone-500">
          Zihin Nasıl Kandırılır? · Slayt {currentSlide + 1} / {SLIDES.length}
        </p>
        <main className="mt-4 rounded-3xl bg-white p-6 shadow-sm sm:p-10">
          {renderSlide()}
          {nav}
        </main>
        <div className="mt-5 text-center">
          <button
            type="button"
            aria-expanded={showSlides}
            onClick={() => setShowSlides((v) => !v)}
            className="inline-flex min-h-11 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold"
          >
            Slaytlar
          </button>
          {showSlides && (
            <ol className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-2 text-left sm:grid-cols-2">
              {SLIDES.map((s, i) => {
                const enabled = canJump(i);
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      disabled={!enabled}
                      onClick={() => {
                        goTo(i);
                        setShowSlides(false);
                      }}
                      aria-current={i === currentSlide ? "true" : undefined}
                      className={`min-h-11 w-full rounded-xl border px-4 py-2 text-left text-sm ${
                        i === currentSlide
                          ? "border-stone-900 bg-stone-900 text-white"
                          : enabled
                            ? "border-stone-300 bg-white"
                            : "border-stone-200 bg-stone-50 text-stone-400"
                      }`}
                    >
                      {i + 1}. {s.title}
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
        <p className="mt-5 text-center text-sm text-stone-500">
          Yazıların sende kalır.
        </p>
      </div>
    </div>
  );
}
