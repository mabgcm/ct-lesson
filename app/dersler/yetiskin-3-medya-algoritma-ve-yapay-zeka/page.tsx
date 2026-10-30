"use client";

import { useEffect, useRef, useState } from "react";
import {
  ETHICS_TEXT,
  FARK_ET,
  HOOK_AFTER,
  HOOK_MESSAGE,
  HOOK_RETURN,
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

const PROGRESS_KEY = "zihin-kalkani-ders3-ilerleme";
const DATA_KEY = "zihin-kalkani-ders3-veri";
const SLIDE_KEY = "zihin-kalkani-ders3-slayt";
const VISITED_KEY = "zihin-kalkani-ders3-ziyaret-edilen";

const SLIDES = [
  { id: "giris", title: "Başlangıç" },
  { id: "etik", title: "Etik sözleşme" },
  { id: "farket", title: "FARK ET" },
  { id: "hedefler", title: "Bu derste ne öğreneceksin" },
  { id: "kanca", title: "İlk mesaj" },
  { id: "mikro-1-1", title: "Seçilmiş istatistikler 1 / 3" },
  { id: "mikro-1-2", title: "Seçilmiş istatistikler 2 / 3" },
  { id: "mikro-1-3", title: "Seçilmiş istatistikler 3 / 3" },
  { id: "mikro-1-eslestirme", title: "Seçilmiş istatistikler — Dene" },
  { id: "mikro-1-soru", title: "Kısa soru" },
  { id: "mikro-2-1", title: "Algoritma baloncuğu 1 / 3" },
  { id: "mikro-2-2", title: "Algoritma baloncuğu 2 / 3" },
  { id: "mikro-2-3", title: "Algoritma baloncuğu 3 / 3" },
  { id: "mikro-2-tuzak", title: "Algoritma baloncuğu — Dene" },
  { id: "mikro-2-soru", title: "Kısa soru" },
  { id: "mikro-3-1", title: "Yapay zekâ içeriği 1 / 3" },
  { id: "mikro-3-2", title: "Yapay zekâ içeriği 2 / 3" },
  { id: "mikro-3-3", title: "Yapay zekâ içeriği 3 / 3" },
  { id: "mikro-3-tahmin", title: "Yapay zekâ içeriği — Dene" },
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
      className={`flex shrink-0 items-center justify-center rounded-full bg-iris-bolt text-white ${
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
      className="mt-4 flex gap-3 rounded-lg border border-iris-bolt bg-chalk-canvas p-4 leading-7 shadow-sm"
    >
      {kind === "ok" ? (
        <Tick />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-iris-bolt font-bold"
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

// Ders 2'de mesajlar görsel yerine metin kartı olarak gösterilir.
// (Ders 1'deki MessageImage bileşeni gelecekteki görsel mesajlar için duruyor.)
function TextMessage({ label, lines }: { label: string; lines: string[] }) {
  return (
    <figure
      aria-label={label}
      className="overflow-hidden rounded-lg border border-mist-border bg-white shadow-sm"
    >
      <div className="border-b border-mist-border bg-chalk-canvas px-4 py-2 text-sm font-semibold text-slate-veil">
        {label}
      </div>
      <div className="space-y-3 p-4">
        {lines.map((line, i) => (
          <p key={i} className="leading-7 text-ink-charcoal">
            {line}
          </p>
        ))}
      </div>
    </figure>
  );
}

// Öğrencinin kural cümlesi: vurgu kutusu.
function RuleBox({ text }: { text: string }) {
  return (
    <div className="mt-4 rounded-lg border-2 border-iris-bolt bg-lilac-wash p-4 shadow-sm">
      <p className="text-sm font-bold text-deep-indigo">Kural</p>
      <p className="mt-1 font-semibold leading-7">{text}</p>
    </div>
  );
}

// Slayt bazlı ses ve şema görselleri. Ders 3 için henüz ses ve görsel
// yüklenmedi; Matt seslendirmeleri ve şemaları eklediğinde bu harita
// public/sesler/ders3 ve public/gorseller/ders3 yollarıyla doldurulacak.
const SLIDE_MEDIA: Record<string, { audio?: string; diagram?: { src: string; label: string; alt: string; lines: string[] } }> = {
  // Ders 2'de henüz seslendirme ve şema görseli yok; eklendiğinde bu harita doldurulacak.
};

// Ders mesajlarının ekran görüntüsü: tıklayınca ekranı kaplayan tam boyut görünüm.
function MessageImage({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  lines: string[];
  label: string;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <figure aria-label={label} className="overflow-hidden rounded-lg border border-mist-border bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`${label} — tam boyutta gör`}
          className="block w-full cursor-zoom-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" className="mx-auto block w-full max-w-md" />
        </button>
        <figcaption className="border-t border-mist-border bg-chalk-canvas px-4 py-2 text-center text-sm text-slate-veil">
          Büyütmek için görsele dokun
        </figcaption>
      </figure>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Kapat"
            className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white text-xl font-bold"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}

// Görseli olmayan mesajlar için aynı dilde telefon/gönderi çerçevesi.
function ScreenshotFrame({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-mist-border bg-white shadow-sm">
      <div className="border-b border-mist-border bg-chalk-canvas px-4 py-2 text-sm font-semibold text-slate-veil">
        {header}
      </div>
      <div className="p-4 leading-7">{children}</div>
    </div>
  );
}

function FlashcardDeck({
  cards,
  label,
}: {
  cards: { front: string; back: string }[];
  label: string;
}) {
  const [order, setOrder] = useState<number[]>(cards.map((_, i) => i));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Record<number, boolean>>({});
  const current = order[index];
  const card = cards[current];
  const knownCount = Object.values(known).filter(Boolean).length;
  const shuffle = () => {
    const next = [...order];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    setOrder(next);
    setIndex(0);
    setFlipped(false);
  };
  return (
    <div className="mt-5" role="group" aria-label={label}>
      <p className="inline-flex items-center rounded-full bg-iris-bolt px-3 py-1 text-xs font-semibold text-white">
        Kartlar
      </p>
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-label={flipped ? "Kartın ön yüzünü göster" : "Kartı çevir"}
        className="mt-3 flex min-h-56 w-full flex-col items-center justify-center rounded-lg border border-mist-border bg-white p-6 text-center shadow-[rgba(40,46,62,0.1)_0px_4px_16px_0px]"
      >
        <span className="text-xs font-semibold text-slate-veil">
          {flipped ? "Cevap" : "Kart"}
        </span>
        <span className="mt-3 text-xl font-semibold leading-8 text-ink-charcoal">
          {flipped ? card.back : card.front}
        </span>
        <span className="mt-4 text-sm text-slate-veil">Çevirmek için karta dokun</span>
      </button>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => { setIndex(index - 1); setFlipped(false); }}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-mist-border bg-white px-4 text-sm font-semibold disabled:opacity-40"
        >
          ← Önceki
        </button>
        <span className="shrink-0 text-sm font-semibold text-slate-veil">
          {index + 1} / {cards.length}
        </span>
        <button
          type="button"
          disabled={index === cards.length - 1}
          onClick={() => { setIndex(index + 1); setFlipped(false); }}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-mist-border bg-white px-4 text-sm font-semibold disabled:opacity-40"
        >
          Sonraki →
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={shuffle}
          className="inline-flex min-h-11 items-center rounded-full border border-mist-border bg-white px-4 text-sm font-semibold"
        >
          Karıştır
        </button>
        <span className="text-sm text-slate-veil">Bildim: {knownCount} / {cards.length}</span>
      </div>
      {flipped && (
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={() => setKnown((prev) => ({ ...prev, [current]: true }))}
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-iris-bolt px-4 text-sm font-semibold text-white"
          >
            <Tick /> Bildim
          </button>
          <button
            type="button"
            onClick={() => setKnown((prev) => ({ ...prev, [current]: false }))}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-mist-border bg-white px-4 text-sm font-semibold"
          >
            Tekrar çalış
          </button>
        </div>
      )}
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
  const media = SLIDE_MEDIA[id];
  return (
    <section id={id} aria-labelledby={`${id}-baslik`}>
      <h1 id={`${id}-baslik`} className="text-3xl font-semibold leading-snug">
        {title}
      </h1>
      <div className="mt-6 space-y-5 leading-8 text-ink-charcoal">
        {media?.audio && (
          <div className="rounded-lg border border-mist-border bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-deep-indigo">
              Dinle — bu bölümün seslendirmesi
            </p>
            {/* Slayt değişince oynatıcı sıfırlanır, eski ses çalmaya devam etmez. */}
            <audio
              key={media.audio}
              controls
              preload="none"
              src={media.audio}
              className="mt-2 w-full"
            >
              Tarayıcın ses çalmayı desteklemiyor.
            </audio>
          </div>
        )}
        {media?.diagram && (
          <MessageImage
            src={media.diagram.src}
            label={media.diagram.label}
            alt={media.diagram.alt}
            lines={media.diagram.lines}
          />
        )}
        {children}
      </div>
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
            className={`flex min-h-14 items-start gap-3 rounded-lg border-2 px-4 py-3 text-left text-base shadow-sm transition hover:shadow ${
              isCorrect
                ? "border-iris-bolt bg-lilac-wash"
                : isWrongSelected
                  ? "border-mist-border bg-white"
                  : isSelected
                    ? "border-iris-bolt bg-iris-bolt text-white"
                    : "border-mist-border bg-white hover:border-fog-mist"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 font-bold ${
                isCorrect
                  ? "border-iris-bolt bg-iris-bolt text-white"
                  : isWrongSelected
                    ? "border-mist-border bg-white text-ink-charcoal"
                    : isSelected
                      ? "border-white bg-white text-ink-charcoal"
                      : "border-mist-border bg-chalk-canvas text-deep-indigo"
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
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-chalk-canvas font-bold text-ink-charcoal"
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
    <div className="mt-8 rounded-lg border border-mist-border bg-chalk-canvas p-5 shadow-sm">
      <p className="inline-flex items-center rounded-full bg-iris-bolt px-3 py-1 text-xs font-semibold text-white">
        Öğren
      </p>
      <p className="mt-3 text-deep-indigo">
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
      {!answered && (
        <button
          type="button"
          onClick={() => onSelect(-1)}
          className="mt-4 inline-flex min-h-11 items-center rounded-full border border-mist-border bg-white px-5 text-sm font-semibold text-iris-bolt"
        >
          Bilmiyorum
        </button>
      )}
      {selected === -1 && (
        <div>
          <Feedback kind="note">{quiz.correctFeedback}</Feedback>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="mt-4 inline-flex min-h-11 items-center rounded-full border-2 border-iris-bolt bg-white px-5 text-sm font-semibold"
          >
            Tekrar dene
          </button>
        </div>
      )}
      {answered && selected !== -1 && correct && <Feedback kind="ok">{quiz.correctFeedback}</Feedback>}
      {answered && selected !== -1 && !correct && (
        <div>
          <Feedback kind="note">{quiz.wrongFeedback}</Feedback>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="mt-4 inline-flex min-h-12 items-center rounded-xl border-2 border-iris-bolt bg-white px-5 text-sm font-semibold"
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
    <div className="mt-8 rounded-lg border border-mist-border bg-chalk-canvas p-5 shadow-sm">
      <p className="inline-flex items-center rounded-full bg-iris-bolt px-3 py-1 text-xs font-semibold text-white">
        Öğren
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
      {!answered && (
        <button
          type="button"
          onClick={() => onSelect(-1)}
          className="mt-4 inline-flex min-h-11 items-center rounded-full border border-mist-border bg-white px-5 text-sm font-semibold text-iris-bolt"
        >
          Bilmiyorum
        </button>
      )}
      {selected === -1 && (
        <div>
          <Feedback kind="note">{correctFeedback}</Feedback>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="mt-4 inline-flex min-h-11 items-center rounded-full border-2 border-iris-bolt bg-white px-5 text-sm font-semibold"
          >
            Tekrar dene
          </button>
        </div>
      )}
      {answered && selected !== -1 && correct && <Feedback kind="ok">{correctFeedback}</Feedback>}
      {answered && selected !== -1 && !correct && (
        <div>
          <Feedback kind="note">{wrongFeedback}</Feedback>
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="mt-4 inline-flex min-h-12 items-center rounded-xl border-2 border-iris-bolt bg-white px-5 text-sm font-semibold"
          >
            Tekrar dene
          </button>
        </div>
      )}
    </div>
  );
}

const MATCH_CATEGORIES: string[] = ["Sağlam istatistik", "Seçilmiş istatistik"];

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
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("zihin-kalkani-ders3-eslestirme-en-iyi-sure");
      if (raw) setBest(Number.parseInt(raw, 10));
    } catch { /* yoksay */ }
  }, []);
  const allMatched = Object.keys(matched).length === MATCH_PAIRS.length;
  useEffect(() => {
    if (!running || allMatched) return;
    const id = window.setInterval(() => setSeconds((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [running, allMatched]);
  useEffect(() => {
    if (!allMatched || seconds === 0) return;
    if (best === null || seconds < best) {
      setBest(seconds);
      try {
        window.localStorage.setItem("zihin-kalkani-ders3-eslestirme-en-iyi-sure", String(seconds));
      } catch { /* yoksay */ }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMatched]);
  const fmt = (v: number) => `${Math.floor(v / 60)}:${String(v % 60).padStart(2, "0")}`;
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const completedRef = useRef(false);

  const updateMatched = (next: Record<number, string>) => {
    setMatched(next);
    onMatchedChange(next);
  };

  const place = (index: number, category: string) => {
    const pair = MATCH_PAIRS[index];
    if (pair.answer === category) {
      setRunning(true);
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
      <p className="inline-flex items-center rounded-full bg-iris-bolt px-3 py-1 text-xs font-semibold text-white">
        Eşleştir
      </p>
      <p className="mt-3 text-sm font-semibold text-slate-veil">
        Süre: {fmt(seconds)}{best !== null ? ` · En iyi süre: ${fmt(best)}` : ""}
      </p>
      <p className="mt-2 text-deep-indigo">
        Bir cümleyi tutup doğru kutuya sürükle. Sürükleyemezsen kartı seç, sonra
        kutunun altındaki düğmeye dokun. Yanlış eşleşme süre cezası vermez; yalnızca ipucu gösterir.
      </p>
      <div className="mt-5">
        <div>
          <p className="text-sm font-bold text-slate-veil">Cümleler</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2" role="group" aria-label="Eşleştirilecek cümleler">
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
                className={`flex min-h-14 cursor-grab touch-none items-center gap-3 rounded-lg border-2 px-4 py-3 text-left leading-6 shadow-sm transition active:cursor-grabbing ${
                  drag?.index === i && drag.moved
                    ? "opacity-40"
                    : selected === i
                      ? "border-iris-bolt bg-iris-bolt text-white"
                      : "border-mist-border bg-white hover:border-fog-mist"
                }`}
              >
                <span aria-hidden="true" className="shrink-0 text-lg leading-none opacity-60">
                  ⋮⋮
                </span>
                <span className="min-w-0 flex-1">{pair.situation}</span>
              </div>
            ))}
            {unmatched.length === 0 && (
              <p className="rounded-lg border border-mist-border bg-chalk-canvas p-4 text-slate-veil">
                Tüm cümleler yerleştirildi.
              </p>
            )}
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {MATCH_CATEGORIES.map((cat) => {
            const placed = MATCH_PAIRS.map((pair, i) => ({ pair, i })).filter(
              ({ i }) => matched[i] === cat,
            );
            const isHover = hoverCategory === cat;
            return (
              <div
                key={cat}
                data-drop-category={cat}
                className={`min-h-40 rounded-lg border-2 p-4 transition ${
                  isHover
                    ? "border-iris-bolt bg-chalk-canvas shadow-md"
                    : "border-dashed border-mist-border bg-chalk-canvas"
                }`}
              >
                <p className="flex items-center justify-between font-bold">
                  {cat}
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-veil">
                    {placed.length} yerleşti
                  </span>
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {placed.map(({ pair, i }) => (
                    <div
                      key={pair.situation}
                      className="rounded-lg border border-mist-border bg-white p-3 text-sm leading-6"
                    >
                      <div className="flex items-start gap-2">
                        <Tick />
                        <span className="min-w-0 flex-1">{pair.situation}</span>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const next = { ...matched };
                            delete next[i];
                            updateMatched(next);
                          }}
                          className="inline-flex min-h-11 items-center rounded-lg border border-mist-border px-3 text-xs font-semibold"
                        >
                          Geri al
                        </button>
                      </div>
                    </div>
                  ))}
                  {placed.length === 0 && (
                    <p className="rounded-xl bg-white p-3 text-sm text-slate-veil">
                      Buraya sürükleyip bırak.
                    </p>
                  )}
                </div>
                {selected !== null && (
                  <button
                    type="button"
                    onClick={() => place(selected, cat)}
                    className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-iris-bolt px-4 text-sm font-semibold text-white"
                  >
                    Seçili cümleyi buraya yerleştir
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
          className="pointer-events-none fixed z-50 max-w-72 -translate-y-1/2 rounded-lg bg-iris-bolt px-4 py-3 text-white shadow-xl"
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
        <p key={i} className="mt-3 leading-7 text-ink-charcoal">
          {p}
        </p>
      ))}
      <figure className="mt-5 rounded-lg border border-mist-border bg-chalk-canvas p-5 shadow-sm">
        <figcaption className="font-semibold">{lesson.diagramTitle}</figcaption>
        <p className="mt-2 leading-7 text-deep-indigo">{lesson.diagram}</p>
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
      {hint && <p className="text-sm text-slate-veil">{hint}</p>}
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="mt-2 w-full rounded border-2 border-mist-border bg-white p-4 text-base outline-none transition focus:border-iris-bolt focus:ring-2 focus:ring-lilac-wash"
      />
    </div>
  );
}

export default function Lesson3Page() {
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
    const valid: Record<string, boolean> = {};
    for (const [id, value] of Object.entries(storedDone)) {
      if (value && SLIDES.some((s) => s.id === id)) valid[id] = true;
    }
    setDone(valid);
    const stored = readStored<Record<string, string>>(DATA_KEY, {});
    setData(stored);
    setReverseSaved(Boolean(stored["tersine-metin"]));
    setTransferSaved(Boolean(stored["transfer-metin"]));
    setJournalSaved(Boolean(stored["gunluk-olay"]));
    const storedSlide = readStored<number>(SLIDE_KEY, -1);
    const storedVisited = readStored<number[]>(VISITED_KEY, []).filter(
      (i) => typeof i === "number" && i >= 0 && i < SLIDES.length,
    );
    let start = 0;
    if (
      typeof storedSlide === "number" &&
      storedSlide >= 0 &&
      storedSlide < SLIDES.length
    ) {
      start = storedSlide;
    } else {
      const firstIncomplete = SLIDES.findIndex((s) => !valid[s.id]);
      start = firstIncomplete === -1 ? SLIDES.length - 1 : firstIncomplete;
    }
    setCurrentSlide(start);
    setVisited(storedVisited.length ? storedVisited : [start]);
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
      window.localStorage.setItem(SLIDE_KEY, JSON.stringify(currentSlide));
    } catch {
      // Yoksay: slayt konumu yalnızca oturumda kalır.
    }
  }, [currentSlide, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
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
  const targetTotal = TRAP_SENTENCES.filter((s) => s.target).length;
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
    <div className="mt-10 flex items-center justify-between gap-3 border-t border-mist-border pt-6">
      <button
        type="button"
        disabled={currentSlide === 0}
        onClick={() => goTo(currentSlide - 1)}
        className="inline-flex min-h-12 items-center rounded-full border border-mist-border bg-white px-5 text-sm font-semibold disabled:opacity-40"
      >
        ← Önceki
      </button>
      <button
        type="button"
        disabled={currentSlide === SLIDES.length - 1}
        onClick={() => goTo(currentSlide + 1)}
        className="inline-flex min-h-12 items-center rounded-full bg-iris-bolt px-5 text-sm font-semibold text-white disabled:opacity-40"
      >
        Sonraki →
      </button>
    </div>
  );

  const renderSlide = () => {
    const slideId = SLIDES[currentSlide].id;
    const paras = (list: string[], from: number, to: number) =>
      list.slice(from, to).map((p, i) => (
        <p key={i} className="mt-3 leading-7 text-ink-charcoal first:mt-0">{p}</p>
      ));
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
              "Bu derste kaç teknik öğreneceksin?",
              ["3", "5", "1"],
              0,
              "Doğru: seçilmiş istatistikler, algoritma baloncuğu, yapay zekâ içeriği.",
              "Tekrar dene. Dersin başında 3 teknik sayılıyor.",
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
            <p className="text-deep-indigo">Her karara aynı 6 adımla bakacağız.</p>
            <FlashcardDeck
              label="FARK ET kartları"
              cards={FARK_ET.map((s) => ({ front: `${s.letter} — ${s.name}`, back: s.question }))}
            />
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
            <ul className="mt-2 list-disc space-y-1 pl-5 text-deep-indigo">
              {OBJECTIVES.map((o) => <li key={o}>{o}</li>)}
            </ul>
            <FlashcardDeck
              label="Teknik kartları"
              cards={[
                { front: "Seçilmiş istatistikler", back: MICRO_1.diagram },
                { front: "Algoritma baloncuğu", back: MICRO_2.diagram },
                { front: "Yapay zekâ içeriği", back: MICRO_3.diagram },
              ]}
            />
            {quick(
              "peki-hedef",
              "Viral bir gönderi gördüğünde ilk ne yapmalısın?",
              ["Kaynağı ve kanıtı sormak", "Hemen paylaşmak"],
              0,
              "Doğru. Kaynak ve kanıt sorusu, viral içeriğe karşı ilk kalkandır.",
              "Tekrar dene. Beğeni sayısı kanıt değildir; kaynağı sor.",
            )}
          </Slide>
        );
      case "kanca":
        return (
          <Slide id="kanca" title="İlk mesaj">
            <p className="text-deep-indigo">Önce mesajı oku, sonra ilk tepkini seç.</p>
            <TextMessage label="Kurgusal viral gönderi" lines={HOOK_MESSAGE} />
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
          <Slide id="mikro-1-1" title="Seçilmiş istatistikler 1 / 3">
            {paras(MICRO_1.paragraphs, 0, 2)}
            {quick(
              "peki-m1-1",
              "Seçilmiş istatistikte ne gizlenir?",
              ["Örneklem ve karşılaştırma", "Yüzde işareti"],
              0,
              "Doğru. Örneklem sayısı, karşılaştırma grubu ve kaynak gizlenir; sadece yüzde gösterilir.",
              "Tekrar dene. Yüzde duruyor; peki ya kaç kişi, neyle karşılaştırıldı?",
            )}
          </Slide>
        );
      case "mikro-1-2":
        return (
          <Slide id="mikro-1-2" title="Seçilmiş istatistikler 2 / 3">
            {paras(MICRO_1.paragraphs, 2, 4)}
            {quick(
              "peki-m1-2",
              "“%90 memnun!” cümlesinde asıl soru ne?",
              ["Kaç kişiye soruldu?", "Ünlem işareti neden var?"],
              0,
              "Doğru. Örneklem yoksa yüzde bir süstür.",
              "Tekrar dene. Yüzdeye değil, eksiklere bak: kaç kişi?",
            )}
          </Slide>
        );
      case "mikro-1-3":
        return (
          <Slide id="mikro-1-3" title="Seçilmiş istatistikler 3 / 3">
            {paras(MICRO_1.paragraphs, 4, 6)}
            {quick(
              "peki-m1-3",
              "“2 kat daha etkili!” cümlesinde ne eksik?",
              ["Başlangıç değeri ve karşılaştırma", "Hiçbir şey"],
              0,
              "Doğru. %1'den %2'ye çıkış da 2 kattır; başlangıç değeri olmadan “2 kat” boştur.",
              "Tekrar dene. Neyin 2 katı? Başlangıç değeri ne?",
            )}
            <RuleBox text={MICRO_1.rule} />
          </Slide>
        );
      case "mikro-1-eslestirme":
        return (
          <Slide id="mikro-1-eslestirme" title="Seçilmiş istatistikler — Dene">
            <h3 className="text-lg font-bold">Dene</h3>
            <p className="mt-2 text-deep-indigo">Her cümleyi doğru kutuya yerleştir: sağlam istatistik mi, seçilmiş istatistik mi?</p>
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
          <Slide id="mikro-2-1" title="Algoritma baloncuğu 1 / 3">
            {paras(MICRO_2.paragraphs, 0, 2)}
            {quick(
              "peki-m2-1",
              "Algoritma sana neyi gösterir?",
              ["İlgilendiğin yönde içerikleri", "Rastgele her şeyi"],
              0,
              "Doğru. Tıkladığın ve beğendiğin şeylerin benzerleri gelir.",
              "Tekrar dene. Akışın, ilgilendiklerine göre seçilir.",
            )}
          </Slide>
        );
      case "mikro-2-2":
        return (
          <Slide id="mikro-2-2" title="Algoritma baloncuğu 2 / 3">
            {paras(MICRO_2.paragraphs, 2, 4)}
            {quick(
              "peki-m2-2",
              "“Herkes böyle düşünüyor” hissi akışta neden oluşur?",
              ["Hep aynı fikirdeki içerikleri gördüğün için", "Herkes gerçekten aynı şeyi düşündüğü için"],
              0,
              "Doğru. Gördüğün herkes değil, senin gibi düşünenlerin seçilmiş grubudur.",
              "Tekrar dene. Balonun içindeyken karşıt görüşle karşılaşmazsın.",
            )}
          </Slide>
        );
      case "mikro-2-3":
        return (
          <Slide id="mikro-2-3" title="Algoritma baloncuğu 3 / 3">
            {paras(MICRO_2.paragraphs, 4, 6)}
            {quick(
              "peki-m2-3",
              "Balonun dışında olduğunu nasıl anlarsın?",
              ["Karşıt görüşle de karşılaştığında", "Çok beğeni aldığında"],
              0,
              "Doğru. Karşıt görüş görmek, balonun dışına çıktığının işaretidir.",
              "Tekrar dene. Beğeni sayısı değil, görüş çeşitliliği önemli.",
            )}
            <RuleBox text={MICRO_2.rule} />
          </Slide>
        );
      case "mikro-2-tuzak":
        return (
          <Slide id="mikro-2-tuzak" title="Algoritma baloncuğu — Dene">
            <h3 className="text-lg font-bold">Dene</h3>
            <p className="mt-2 text-deep-indigo">Baloncuğu gösteren 2 cümleyi işaretle.</p>
            <p className="mt-2 text-sm font-semibold text-slate-veil">
              Bulunan: {targetsFound} / {targetTotal}
            </p>
            <p className="text-deep-indigo">İncelediğin mesaj:</p>
            <TextMessage label="Akış özetin" lines={TRAP_SENTENCES.map((x) => `${x.user}: ${x.text}`)} />
            <p className="text-deep-indigo">Şimdi bu cümlelerden baloncuğu gösterenleri aşağıda işaretle.</p>
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
                          if (TRAP_SENTENCES.filter((x) => x.target && next.includes(x.id)).length === targetTotal) completeSlide("mikro-2-tuzak");
                        }
                      } else {
                        setTrapWrong(true);
                      }
                    }}
                    className={`flex min-h-16 items-start gap-3 rounded-lg border-2 px-4 py-3 text-left shadow-sm transition hover:shadow ${
                      isMarked ? "border-iris-bolt bg-chalk-canvas" : "border-mist-border bg-white hover:border-fog-mist"
                    }`}
                  >
                    {isMarked ? (
                      <Tick size="lg" />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-mist-border bg-white text-fog-mist"
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                          <path d="M4 10.5 8.5 15 16 5.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-veil">{s.user}</span>
                      <span className="mt-1 block leading-6">{s.text}</span>
                      <span className={`mt-2 block text-sm font-bold ${isMarked ? "text-ink-charcoal" : "text-slate-veil"}`}>
                        {isMarked ? "✓ İşaretlendi — tekrar dokunursan kalkar" : "İşaretlemek için dokun"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
            {trapWrong && <Feedback kind="note">{TRAP_WRONG}</Feedback>}
            {targetsFound === targetTotal && (
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
          <Slide id="mikro-3-1" title="Yapay zekâ içeriği 1 / 3">
            {paras(MICRO_3.paragraphs, 0, 2)}
            {quick(
              "peki-m3-1",
              "Yapay zekâ ile üretilmiş içerikte ilk ne kontrol edilir?",
              ["Kaynak ve orijinal", "Beğeni sayısı"],
              0,
              "Doğru. “Bunu kim yayınladı, orijinali nerede?” en güçlü kontroldür.",
              "Tekrar dene. Beğeni sayısı, içeriğin gerçek olduğunu göstermez.",
            )}
          </Slide>
        );
      case "mikro-3-2":
        return (
          <Slide id="mikro-3-2" title="Yapay zekâ içeriği 2 / 3">
            {paras(MICRO_3.paragraphs, 2, 4)}
            {quick(
              "peki-m3-2",
              "Gerçek gibi görünen bir videoya neden hemen inanmamalısın?",
              ["Yapay zekâ gerçekçi video üretebildiği için", "Videolar her zaman gerçektir"],
              0,
              "Doğru. “Gerçek gibi görünmek” artık gerçek olduğu anlamına gelmiyor.",
              "Tekrar dene. “Gözümle gördüm” refleksi, yapay zekâ çağında yetmez.",
            )}
          </Slide>
        );
      case "mikro-3-3":
        return (
          <Slide id="mikro-3-3" title="Yapay zekâ içeriği 3 / 3">
            {paras(MICRO_3.paragraphs, 4, 6)}
            {quick(
              "peki-m3-3",
              "Şüpheli bir içeriğe karşı en güçlü savunma ne?",
              ["Kanıt ne, kaynak kim diye sormak", "Yorumları okumak"],
              0,
              "Doğru. FARK ET'in Kanıt ve Referans adımları, yapay zekâ çağında eskisinden de önemli.",
              "Tekrar dene. Yorumlar da balonun parçası olabilir; kaynağa bak.",
            )}
            <RuleBox text={MICRO_3.rule} />
          </Slide>
        );
      case "mikro-3-tahmin":
        return (
          <Slide id="mikro-3-tahmin" title="Yapay zekâ içeriği — Dene">
            <h3 className="text-lg font-bold">Dene</h3>
            <p className="mt-2 text-deep-indigo">Mesajı oku:</p>
            <TextMessage label="Viral video" lines={[POLL_MESSAGE]} />
            <p className="mt-3 font-semibold">Sence bu videonun devamında ne var?</p>
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
            <p className="leading-7 text-ink-charcoal">{SCENARIO_TEXT[0]}</p>
            <TextMessage label="Arkadaş mesajı" lines={[SCENARIO_TEXT[1]]} />
            <p className="leading-7 text-ink-charcoal">{SCENARIO_TEXT[2]}</p>
            {quick(
              "peki-senaryo",
              "Bu mesajda hangi teknikler birlikte çalışıyor?",
              ["Sahte otorite + seçilmiş istatistik + balon + acele", "Yalnızca indirim bilgisi"],
              0,
              "Doğru. Anonim videodaki ünlü (sahte otorite), “%93” (seçilmiş istatistik), “herkes konuşuyor” (balon) ve “yarın zam” (acele) bir arada.",
              "Tekrar dene. Mesajdaki video kaynağı, “%93”, “herkes” ve “yarın zam” cümlelerine bak.",
            )}
          </Slide>
        );
      case "senaryo-2":
        return (
          <Slide id="senaryo-2" title="Seçim yap">
            <p className="leading-7 text-ink-charcoal">{SCENARIO_TEXT[3]}</p>
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
                    <div className="mt-4 rounded-lg border-2 border-iris-bolt bg-chalk-canvas p-5 shadow-sm">
                      <p className="text-sm font-bold text-slate-veil">Sonuç</p>
                      <p className="mt-2 font-semibold">Seçimin: {c.label}</p>
                      <p className="mt-2 leading-7">{c.result}</p>
                      <Feedback kind="note">{c.feedback}</Feedback>
                      {!c.isBest && (
                        <button
                          type="button"
                          onClick={() => setBranchChoice(null)}
                          className="mt-3 inline-flex min-h-11 items-center rounded-full border border-iris-bolt px-4 text-sm font-semibold"
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
                            className="mt-3 inline-flex min-h-11 items-center rounded-full bg-iris-bolt px-4 text-sm font-semibold text-white"
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
                            className="mt-3 inline-flex min-h-11 items-center rounded-full bg-iris-bolt px-4 text-sm font-semibold text-white"
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
            <p className="leading-7 text-ink-charcoal">
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
            <p className="text-deep-indigo">Mesajında hangi öğeleri kullanıyorsun? İşaretle.</p>
            <fieldset className="mt-4">
              <legend className="font-semibold">Öğeleri işaretle: Hangilerini kullanıyorsun?</legend>
              <div className="mt-2 flex flex-col gap-2">
                {REVERSE_TRIGGERS.map((t) => {
                  const chosen = (data["tersine-tetikleyiciler"] ?? "").split(",").filter(Boolean);
                  const on = chosen.includes(t);
                  return (
                    <label
                      key={t}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-2 shadow-sm transition hover:shadow ${
                        on ? "border-iris-bolt bg-chalk-canvas" : "border-mist-border bg-white hover:border-fog-mist"
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
                        <span aria-hidden="true" className="h-7 w-7 shrink-0 rounded-full border-2 border-mist-border" />
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
            <p className="text-deep-indigo">Aynı mesajı FARK ET ile boz — ilk 3 adım:</p>
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
            <p className="text-deep-indigo">Aynı mesajı FARK ET ile boz — son 3 adım:</p>
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
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-iris-bolt px-4 text-sm font-semibold text-white"
            >
              Kaydet
            </button>
            {(data["tersine-metin"] ?? "").trim() === "" && (
              <p className="mt-2 text-sm text-slate-veil">Kaydetmek için önce 1. adımda mesajını yaz.</p>
            )}
            {reverseSaved && <Feedback kind="ok">{REVERSE_DONE}</Feedback>}
            <button
              type="button"
              onClick={() => setShowReverseExample((v) => !v)}
              aria-expanded={showReverseExample}
              className="mt-4 inline-flex min-h-11 items-center rounded-full border border-iris-bolt px-4 text-sm font-semibold"
            >
              Örneği gör
            </button>
            {showReverseExample && (
              <ScreenshotFrame header="Örnek mesaj">
                <p className="leading-7"><strong>Örnek mesaj (seçilmiş istatistik + balon onayı):</strong> {REVERSE_EXAMPLE_MESSAGE}</p>
                <p className="mt-3 font-semibold">Bozma:</p>
                <ul className="mt-2 space-y-1">
                  {REVERSE_EXAMPLE_BREAKDOWN.map((b) => <li key={b} className="leading-7">{b}</li>)}
                </ul>
              </ScreenshotFrame>
            )}
          </Slide>
        );
      case "cikis":
        return (
          <Slide id="cikis" title="Kısa kontrol">
            <p className="inline-flex items-center rounded-full bg-iris-bolt px-3 py-1 text-xs font-semibold text-white">
              Test
            </p>
            <p className="mt-3 text-deep-indigo">
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
                      className="mt-3 inline-flex min-h-11 items-center rounded-full bg-iris-bolt px-4 text-sm font-semibold text-white"
                    >
                      {exitIndex < 2 ? "Sonraki soru" : "Sonucu gör"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="mt-4 rounded-lg border border-mist-border bg-white p-5 shadow-[rgba(40,46,62,0.1)_0px_4px_16px_0px]">
                  <p className="text-lg font-semibold">Sonuç: {3 - exitMissed.length} / 3 doğru</p>
                  <p className="mt-2 leading-7">
                    Bildiklerin: {EXIT_QUESTIONS.filter((_, i) => !exitMissed.includes(i)).map((q) => q.technique).join(", ") || "Henüz yok — tekrarlarla güçlenir."}
                  </p>
                  <p className="mt-2 leading-7">
                    Daha çalışman gerekenler: {exitMissed.map((mi) => EXIT_QUESTIONS[mi].technique).join(", ") || "Yok — üçünü de bildin."}
                  </p>
                </div>
                {exitMissed.length === 0 ? (
                  <Feedback kind="ok">{EXIT_ALL_CORRECT}</Feedback>
                ) : (
                  <div>
                    <Feedback kind="note">{EXIT_SOME_WRONG}</Feedback>
                    {exitMissed.map((mi) => (
                      <div key={mi} className="mt-4 rounded-lg border-2 border-iris-bolt bg-chalk-canvas p-5 shadow-sm">
                        <p className="text-sm font-bold text-slate-veil">Kısa tekrar</p>
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
            <p className="leading-7 text-ink-charcoal">
              Şimdi aynı 3 tekniği haberlerde bul. Aşağıdaki kurgusal haberi FARK ET ile analiz et.
            </p>
            <TextMessage label="Kurgusal haber" lines={TRANSFER_TEXT} />
            {quick(
              "peki-transfer",
              "Bu haberdeki ankette ne sorunlu?",
              ["Örneklem küçük ve soru yönlendirici", "Hiçbir şey"],
              0,
              "Doğru. 200 kişi belediyenin kendi sitesinde; soru da “yeşil alan ister misiniz?” diye yönlendirici.",
              "Tekrar dene. Anketin nerede, kaç kişiyle yapıldığına ve sorunun kendisine bak.",
            )}
          </Slide>
        );
      case "transfer-2":
        return (
          <Slide id="transfer-2" title="FARK ET ile yaz 1 / 2">
            <p className="text-deep-indigo">Her adıma 1–2 cümle yaz — ilk 3 adım:</p>
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
            <p className="text-deep-indigo">Her adıma 1–2 cümle yaz — son 3 adım:</p>
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
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-iris-bolt px-4 text-sm font-semibold text-white"
            >
              Kaydet
            </button>
            {transferSaved && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowTransferModel((v) => !v)}
                  aria-expanded={showTransferModel}
                  className="inline-flex min-h-11 items-center rounded-full border border-iris-bolt px-4 text-sm font-semibold"
                >
                  Model cevabı gör
                </button>
                {showTransferModel && (
                  <ul className="mt-3 space-y-1 rounded-lg border border-mist-border p-4">
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
            <p className="text-deep-indigo">
              Kendi analizini puanla. Her soruya 1 (zayıf) ile 5 (güçlü) arasında puan ver.
            </p>
            {RUBRIC_QUESTIONS.slice(0, 4).map((q, i) => (
              <div key={q.name} className="mt-5 rounded-lg border border-mist-border bg-white p-4 shadow-sm">
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
                          ? "border-iris-bolt bg-iris-bolt text-white"
                          : "border-mist-border bg-white hover:border-fog-mist"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <p className="mt-2 flex justify-between text-xs text-slate-veil">
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
            <p className="text-deep-indigo">Devamı:</p>
            {RUBRIC_QUESTIONS.slice(4, 7).map((q, idx) => {
              const i = idx + 4;
              return (
                <div key={q.name} className="mt-5 rounded-lg border border-mist-border bg-white p-4 shadow-sm">
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
                            ? "border-iris-bolt bg-iris-bolt text-white"
                            : "border-mist-border bg-white hover:border-fog-mist"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 flex justify-between text-xs text-slate-veil">
                    <span>1 — Zayıf</span>
                    <span>5 — Güçlü</span>
                  </p>
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => { setRubricSaved(true); completeSlide("rubrik-2"); }}
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-iris-bolt px-4 text-sm font-semibold text-white"
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
            <p className="leading-7 text-ink-charcoal">
              Şimdi kendi hayatından 1 örneği FARK ET ile yaz. Yazıların sende kalır.
            </p>
            <button
              type="button"
              onClick={() => setShowJournalExample((v) => !v)}
              aria-expanded={showJournalExample}
              className="mt-3 inline-flex min-h-11 items-center rounded-full border border-iris-bolt px-4 text-sm font-semibold"
            >
              Örneği gör
            </button>
            {showJournalExample && (
              <ScreenshotFrame header="Örnek günlük girişi">
                <ul className="space-y-1">
                  {JOURNAL_EXAMPLE.map((e) => <li key={e} className="leading-7">{e}</li>)}
                </ul>
              </ScreenshotFrame>
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
            <p className="text-deep-indigo">Devamı:</p>
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
              className="mt-4 inline-flex min-h-11 items-center rounded-full bg-iris-bolt px-4 text-sm font-semibold text-white"
            >
              Kaydet
            </button>
            {(data["gunluk-olay"] ?? "").trim() === "" && (
              <p className="mt-2 text-sm text-slate-veil">Kaydetmek için önce 1. adımda olayı yaz.</p>
            )}
            {journalSaved && <Feedback kind="ok">{JOURNAL_SAVED}</Feedback>}
          </Slide>
        );
      case "kapanis-1":
        return (
          <Slide id="kapanis-1" title="Bu derste 3 şeyi öğrendin">
            <ol className="mt-2 list-decimal space-y-2 pl-5 leading-7 text-ink-charcoal">
              {CLOSING_POINTS.map((p) => <li key={p}>{p}</li>)}
            </ol>
            <div className="mt-4 rounded-lg border border-mist-border bg-chalk-canvas p-5 shadow-sm">
              <p className="text-sm font-bold text-slate-veil">Dersin başına dön</p>
              {HOOK_RETURN.map((p, i) => (
                <p key={i} className="mt-2 leading-7">{p}</p>
              ))}
            </div>
            <p className="mt-4 font-semibold">
              Bundan sonra üç sorun var: “Kaç kişide ölçüldü?”, “Akışım bana ne göstermiyor?” ve “Orijinali nerede?”
            </p>
            {quick(
              "peki-kapanis",
              "Yüzdeyi görünce ilk iki sorun ne?",
              ["Kaç kişi, neyle karşılaştırıldı?", "Kaç beğeni almış?"],
              0,
              "Doğru. Bu iki soruyu hatırlarsan, bu ders görevini yapmış demektir.",
              "Tekrar dene. Dersin kapanış özetine bak.",
            )}
          </Slide>
        );
      case "kapanis-2":
        return (
          <Slide id="kapanis-2" title="Sonraki adım">
            <p className="mt-2 text-deep-indigo">
              Ders bitti. Her e-posta tek eylem içerir, uzun metin içermez.
            </p>
            <ul className="mt-3 space-y-3">
              {EMAIL_BOOSTERS.map((e) => (
                <li key={e.when} className="overflow-hidden rounded-lg border border-mist-border bg-white shadow-sm">
                  <div className="border-b border-mist-border bg-chalk-canvas px-4 py-2 text-sm font-semibold text-slate-veil">
                    {e.when}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold">{e.title}</p>
                    <p className="mt-1 leading-7 text-deep-indigo">{e.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-veil">
              Not: Bu ilk sürümde e-posta gönderimi henüz kurulmamıştır; yukarıdaki
              görevler, sistem kurulduğunda gönderilecek güçlendirmelerin
              içeriğidir.
            </p>
            <a href="/" onClick={() => completeSlide("kapanis-2")} className="mt-4 inline-flex min-h-12 items-center rounded-full bg-iris-bolt px-5 text-sm font-semibold text-white">
              Ana sayfaya dön
            </a>
          </Slide>
        );
      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-chalk-canvas px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-mist-border"
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={SLIDES.length}
          aria-label="Ders ilerlemesi"
        >
          <div
            className="h-full rounded-full bg-iris-bolt"
            style={{ width: `${(doneCount / SLIDES.length) * 100}%` }}
          />
        </div>
        <p className="mt-5 text-center text-sm font-medium text-slate-veil">
          Medya, Algoritma ve Yapay Zekâ · Slayt {currentSlide + 1} / {SLIDES.length}
        </p>
        <main className="mt-4 rounded-lg bg-white p-6 shadow-[rgba(40,46,62,0.1)_0px_4px_16px_0px] sm:p-10">
          {renderSlide()}
          {nav}
        </main>
        <div className="mt-5 text-center">
          <button
            type="button"
            aria-expanded={showSlides}
            onClick={() => setShowSlides((v) => !v)}
            className="inline-flex min-h-11 items-center rounded-full border border-mist-border bg-white px-5 text-sm font-semibold"
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
                          ? "border-iris-bolt bg-iris-bolt text-white"
                          : enabled
                            ? "border-mist-border bg-white"
                            : "border-mist-border bg-chalk-canvas text-fog-mist"
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
        <p className="mt-5 text-center text-sm text-slate-veil">
          Yazıların sende kalır.
        </p>
      </div>
    </div>
  );
}
