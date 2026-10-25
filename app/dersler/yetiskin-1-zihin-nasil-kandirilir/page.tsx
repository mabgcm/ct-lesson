"use client";

import { useEffect, useState } from "react";
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
  { id: "giris", title: "Giriş ve Etik Sözleşmesi" },
  { id: "kanca", title: "Kanca" },
  { id: "mikro-1-metin", title: "Mikro ders 1 metni — Hızlı düşünme" },
  { id: "mikro-1-etkilesim", title: "Mikro ders 1 etkileşimi — Eşleştirme ve mini quiz 1" },
  { id: "mikro-2-metin", title: "Mikro ders 2 metni — Onay önyargısı" },
  { id: "mikro-2-etkilesim", title: "Mikro ders 2 etkileşimi — Tuzağı işaretle ve mini quiz 2" },
  { id: "mikro-3-metin", title: "Mikro ders 3 metni — Duygu tuzağı" },
  { id: "mikro-3-etkilesim", title: "Mikro ders 3 etkileşimi — Tahmin anketi ve mini quiz 3" },
  { id: "senaryo", title: "Dallanan Senaryo" },
  { id: "tersine", title: "Tersine Yazma" },
  { id: "cikis", title: "Çıkış Bileti" },
  { id: "transfer", title: "Transfer Görevi" },
  { id: "rubrik", title: "Öz Rubrik" },
  { id: "gunluk", title: "Karar Günlüğü" },
  { id: "kapanis", title: "Kapanış" },
];

function readStored<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function Feedback({ kind, children }: { kind: "ok" | "note"; children: React.ReactNode }) {
  return (
    <div
      role="status"
      className="mt-3 rounded-lg border border-zinc-900 bg-zinc-50 p-4 leading-7"
    >
      <p className="font-semibold">{kind === "ok" ? "Doğru:" : "Not:"}</p>
      <div>{children}</div>
    </div>
  );
}

function Slide({
  id,
  title,
  done,
  onComplete,
  children,
}: {
  id: string;
  title: string;
  done: boolean;
  onComplete: () => void;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-baslik`} className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id={`${id}-baslik`} className="text-2xl font-bold">
          {title}
        </h2>
        <span className="text-sm font-semibold">
          {done ? "Tamamlandı" : "Tamamlanmadı"}
        </span>
      </div>
      <div className="mt-4">{children}</div>
      {!done && (
        <button
          type="button"
          onClick={onComplete}
          className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-zinc-900 px-4 text-sm font-semibold"
        >
          Bu slaydı tamamlandı olarak işaretle
        </button>
      )}
    </section>
  );
}

function ChoiceButtons({
  options,
  selected,
  onSelect,
  label,
}: {
  options: string[];
  selected: number | null;
  onSelect: (index: number) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="mt-3 flex flex-col gap-2">
      {options.map((option, index) => (
        <button
          key={option}
          type="button"
          aria-pressed={selected === index}
          onClick={() => onSelect(index)}
          className={`min-h-11 rounded-lg border px-4 py-2 text-left text-base ${
            selected === index
              ? "border-zinc-900 bg-zinc-900 text-white"
              : "border-zinc-300 bg-white"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function SingleQuiz({
  quiz,
  title,
  onCorrect,
}: {
  quiz: QuizQuestion;
  title: string;
  onCorrect: () => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === quiz.answerIndex;
  return (
    <div className="mt-6 rounded-lg border border-zinc-200 p-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-zinc-700">
        Kısa bir pekiştirme sorusu. Bu bir sınav değil; az önce öğrendiğin
        tekniği kendi başına geri çağırman için.
      </p>
      <p className="mt-3 font-semibold">{quiz.question}</p>
      <ChoiceButtons
        options={quiz.options}
        selected={selected}
        onSelect={(i) => {
          setSelected(i);
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
            onClick={() => setSelected(null)}
            className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-zinc-900 px-4 text-sm font-semibold"
          >
            Tekrar dene
          </button>
        </div>
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
      <figure className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
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
        className="mt-1 w-full rounded-lg border border-zinc-300 p-3 text-base"
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
  const [hookChoice, setHookChoice] = useState<number | null>(null);
  const [matchSelected, setMatchSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<Record<number, string>>({});
  const [matchWrong, setMatchWrong] = useState(false);
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
    setDone((prev) => {
      const next = { ...prev, [id]: true };
      if (id === "mikro-1-etkilesim") next["mikro-1"] = true;
      if (id === "mikro-2-etkilesim") next["mikro-2"] = true;
      if (id === "mikro-3-etkilesim") next["mikro-3"] = true;
      return next;
    });

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, index));
    setCurrentSlide(clamped);
    setVisited((prev) => (prev.includes(clamped) ? prev : [...prev, clamped]));
  };

  useEffect(() => {
    const storedDone = readStored<Record<string, boolean>>(PROGRESS_KEY, {});
    const migrated: Record<string, boolean> = { ...storedDone };
    if (storedDone["mikro-1"]) {
      migrated["mikro-1-metin"] = true;
      migrated["mikro-1-etkilesim"] = true;
    }
    if (storedDone["mikro-2"]) {
      migrated["mikro-2-metin"] = true;
      migrated["mikro-2-etkilesim"] = true;
    }
    if (storedDone["mikro-3"]) {
      migrated["mikro-3-metin"] = true;
      migrated["mikro-3-etkilesim"] = true;
    }
    setDone(migrated);
    const stored = readStored<Record<string, string>>(DATA_KEY, {});
    setData(stored);
    setReverseSaved(Boolean(stored["tersine-metin"]));
    setTransferSaved(Boolean(stored["transfer-metin"]));
    setJournalSaved(Boolean(stored["gunluk-olay"]));
    const storedSlide = readStored<number>(SLIDE_KEY, -1);
    const storedVisited = readStored<number[]>(VISITED_KEY, []);
    const validVisited = storedVisited.filter(
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
  const slideNav = (label: string) => (
    <div aria-label={label} className="flex flex-wrap items-center justify-between gap-3">
      <p role="status" className="font-semibold">
        Slayt {currentSlide + 1} / {SLIDES.length} — {SLIDES[currentSlide].title}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={currentSlide === 0}
          onClick={() => goTo(currentSlide - 1)}
          className="inline-flex min-h-11 items-center rounded-lg border border-zinc-900 px-4 text-sm font-semibold disabled:opacity-50"
        >
          Önceki
        </button>
        <button
          type="button"
          disabled={currentSlide === SLIDES.length - 1}
          onClick={() => goTo(currentSlide + 1)}
          className="inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white disabled:opacity-50"
        >
          Sonraki
        </button>
      </div>
    </div>
  );

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <Slide id="giris" title="Giriş ve Etik Sözleşmesi" done={!!done.giris} onComplete={() => completeSlide("giris")}>
            {INTRO_PARAGRAPHS.map((p, i) => (
              <p key={i} className="mt-3 leading-7 text-zinc-800">{p}</p>
            ))}
            <div className="mt-4 rounded-lg border border-zinc-900 bg-zinc-50 p-4">
              <h3 className="font-bold">Etik sözleşme</h3>
              {ETHICS_TEXT.map((p, i) => (
                <p key={i} className="mt-2 leading-7 text-zinc-700">{p}</p>
              ))}
            </div>
            <h3 className="mt-5 text-lg font-bold">FARK ET</h3>
            <p className="mt-2 text-zinc-700">
              Bu kursta her karara aynı 6 adımla bakacağız. Adı: FARK ET.
            </p>
            <ol className="mt-3 space-y-2">
              {FARK_ET.map((s) => (
                <li key={s.letter} className="rounded-lg border border-zinc-200 p-3">
                  <strong>{s.letter} — {s.name}:</strong> {s.question}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-zinc-700">
              Bu 6 adımı bu derste 3 kez birlikte uygulayacağız, sonra kendi
              örneğinde sen uygulayacaksın.
            </p>
            <h3 className="mt-5 text-lg font-bold">Öğrenme hedefleri</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700">
              {OBJECTIVES.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </Slide>
        );
      case 1:
        return (
          <Slide id="kanca" title="Kanca" done={!!done.kanca} onComplete={() => completeSlide("kanca")}>
            <p className="text-zinc-700">
              Önce şu mesajı oku. Henüz analiz etme, tekniği arama. Sadece ilk
              tepkinin ne olduğunu fark et.
            </p>
            <div className="mt-3 rounded-lg border border-zinc-900 p-4" aria-label="Kurgusal indirim mesajı örneği">
              {HOOK_MESSAGE.map((line, i) => (
                <p key={i} className={i === 0 ? "font-bold" : "mt-1"}>{line}</p>
              ))}
              <p className="mt-3 inline-block rounded-lg bg-zinc-900 px-4 py-2 font-semibold text-white">
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
      case 2:
        return (
          <Slide id="mikro-1-metin" title="Mikro ders 1 metni — Hızlı düşünme" done={!!done["mikro-1-metin"]} onComplete={() => completeSlide("mikro-1-metin")}>
            <MicroLessonBlock lesson={MICRO_1} />
          </Slide>
        );
      case 3:
        return (
          <Slide id="mikro-1-etkilesim" title="Mikro ders 1 etkileşimi — Eşleştirme ve mini quiz 1" done={!!done["mikro-1-etkilesim"]} onComplete={() => completeSlide("mikro-1-etkilesim")}>
            <h3 className="text-lg font-bold">Etkileşim 1 — Eşleştirme</h3>
            <p className="mt-2 text-zinc-700">Her durumu doğru düşünme türüyle eşleştir.</p>
            <p className="mt-2 text-sm text-zinc-600">
              Önce bir durumu seç, sonra “Hızlı düşünme” veya “Yavaş düşünme”
              düğmesine bas. Sürükleme gerekmez.
            </p>
            <div className="mt-3 flex flex-col gap-2" role="group" aria-label="Eşleştirilecek durumlar">
              {MATCH_PAIRS.map((pair, i) => (
                <button
                  key={pair.situation}
                  type="button"
                  aria-pressed={matchSelected === i}
                  disabled={Boolean(matched[i])}
                  onClick={() => setMatchSelected(i)}
                  className={`min-h-11 rounded-lg border px-4 py-2 text-left ${
                    matched[i] ? "border-zinc-900 bg-zinc-50" : matchSelected === i ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300 bg-white"
                  }`}
                >
                  {pair.situation}
                  {matched[i] ? ` — ${matched[i]}` : ""}
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              {(["Hızlı düşünme", "Yavaş düşünme"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  disabled={matchSelected === null}
                  onClick={() => {
                    if (matchSelected === null) return;
                    const pair = MATCH_PAIRS[matchSelected];
                    if (pair.answer === cat) {
                      const next = { ...matched, [matchSelected]: cat };
                      setMatched(next);
                      setMatchSelected(null);
                      setMatchWrong(false);
                      if (Object.keys(next).length === MATCH_PAIRS.length) completeSlide("mikro-1-etkilesim");
                    } else {
                      setMatchWrong(true);
                      setMatchSelected(null);
                    }
                  }}
                  className="inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {cat}
                </button>
              ))}
            </div>
            {matchWrong && <Feedback kind="note">{MATCH_WRONG}</Feedback>}
            {Object.keys(matched).length === MATCH_PAIRS.length && (
              <Feedback kind="ok">{MATCH_CORRECT}</Feedback>
            )}
            <SingleQuiz quiz={MINI_QUIZ_1} title="Mini quiz 1 — Hızlı düşünme" onCorrect={() => {}} />
          </Slide>
        );
      case 4:
        return (
          <Slide id="mikro-2-metin" title="Mikro ders 2 metni — Onay önyargısı" done={!!done["mikro-2-metin"]} onComplete={() => completeSlide("mikro-2-metin")}>
            <MicroLessonBlock lesson={MICRO_2} />
          </Slide>
        );
      case 5:
        return (
          <Slide id="mikro-2-etkilesim" title="Mikro ders 2 etkileşimi — Tuzağı işaretle ve mini quiz 2" done={!!done["mikro-2-etkilesim"]} onComplete={() => completeSlide("mikro-2-etkilesim")}>
            <h3 className="text-lg font-bold">Etkileşim 2 — Tuzağı işaretle</h3>
            <p className="mt-2 text-zinc-700">
              Aşağıdaki kurgusal yorum akışını oku. Onay önyargısını besleyen
              cümleleri tıklayarak işaretle. İşaretlemen gereken 3 cümle var.
            </p>
            <div className="mt-3 flex flex-col gap-2" role="group" aria-label="İşaretlenecek cümleler">
              {TRAP_SENTENCES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={marked.includes(s.id)}
                  onClick={() => {
                    if (s.target) {
                      if (!marked.includes(s.id)) {
                        const next = [...marked, s.id];
                        setMarked(next);
                        setTrapWrong(false);
                        if (TRAP_SENTENCES.filter((x) => x.target && next.includes(x.id)).length === 3) completeSlide("mikro-2-etkilesim");
                      }
                    } else {
                      setTrapWrong(true);
                    }
                  }}
                  className={`min-h-11 rounded-lg border px-4 py-2 text-left ${
                    marked.includes(s.id) ? "border-zinc-900 bg-zinc-50" : "border-zinc-300 bg-white"
                  }`}
                >
                  <span className="text-sm text-zinc-600">{s.user}: </span>
                  {s.text}
                  {marked.includes(s.id) && s.target ? " — İşaretlendi" : ""}
                </button>
              ))}
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
            <SingleQuiz quiz={MINI_QUIZ_2} title="Mini quiz 2 — Onay önyargısı" onCorrect={() => {}} />
          </Slide>
        );
      case 6:
        return (
          <Slide id="mikro-3-metin" title="Mikro ders 3 metni — Duygu tuzağı" done={!!done["mikro-3-metin"]} onComplete={() => completeSlide("mikro-3-metin")}>
            <MicroLessonBlock lesson={MICRO_3} />
          </Slide>
        );
      case 7:
        return (
          <Slide id="mikro-3-etkilesim" title="Mikro ders 3 etkileşimi — Tahmin anketi ve mini quiz 3" done={!!done["mikro-3-etkilesim"]} onComplete={() => completeSlide("mikro-3-etkilesim")}>
            <h3 className="text-lg font-bold">Etkileşim 3 — Tahmin anketi</h3>
            <p className="mt-2 text-zinc-700">
              Aşağıdaki kurgusal mesajı oku, sonra tahmin et: Bu mesajın devamında
              ne olacak?
            </p>
            <blockquote className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 leading-7">
              {POLL_MESSAGE}
            </blockquote>
            <p className="mt-3 font-semibold">Bu mesajın devamında büyük olasılıkla ne olur?</p>
            <ChoiceButtons
              options={POLL_OPTIONS}
              selected={pollChoice}
              onSelect={(i) => { setPollChoice(i); completeSlide("mikro-3-etkilesim"); }}
              label="Tahmin anketi"
            />
            {pollChoice !== null && (
              <Feedback kind="ok">
                {POLL_EXPLANATION.map((p, i) => <p key={i} className="mt-2 first:mt-0">{p}</p>)}
              </Feedback>
            )}
            <SingleQuiz quiz={MINI_QUIZ_3} title="Mini quiz 3 — Duygu tuzağı" onCorrect={() => {}} />
          </Slide>
        );
      case 8:
        return (
          <Slide id="senaryo" title="Dallanan Senaryo: Arkadaştan gelen bağlantı" done={!!done.senaryo} onComplete={() => completeSlide("senaryo")}>
            {SCENARIO_TEXT.map((p, i) => (
              <p key={i} className="mt-3 leading-7 text-zinc-800">{p}</p>
            ))}
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
                    <div>
                      <p className="mt-3 font-semibold">Seçimin: {c.label}</p>
                      <p className="mt-2 leading-7">{c.result}</p>
                      <Feedback kind="note">{c.feedback}</Feedback>
                      {!c.isBest && (
                        <button
                          type="button"
                          onClick={() => setBranchChoice(null)}
                          className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-zinc-900 px-4 text-sm font-semibold"
                        >
                          Farklı bir seçim dene
                        </button>
                      )}
                      {c.isBest && (
                        <div>
                          <Feedback kind="ok">{SCENARIO_CLOSING}</Feedback>
                          <button
                            type="button"
                            onClick={() => completeSlide("senaryo")}
                            className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white"
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
                            onClick={() => completeSlide("senaryo")}
                            className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white"
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
      case 9:
        return (
          <Slide id="tersine" title="Tersine Yazma" done={!!done.tersine} onComplete={() => completeSlide("tersine")}>
            <p className="leading-7 text-zinc-800">
              Şimdi sıra sende. Öğrendiğin tekniklerden birini kullanarak,
              zayıflatılmış (abartısız, tuzağı açıkça görülebilen) bir manipülatif
              mesaj yaz. Sonra aynı mesajı FARK ET ile bozar. Amacın insanları
              kandırmak değil; tekniğin nasıl çalıştığını içeriden görmek. O yüzden
              mesajın kurgusal ve zararsız olsun, gerçek bir ürün veya kişi adı
              kullanma.
            </p>
            <p className="mt-3 font-semibold">1. Bir teknik seç:</p>
            <ChoiceButtons
              options={REVERSE_TECHNIQUES}
              selected={REVERSE_TECHNIQUES.indexOf(data["tersine-teknik"] ?? "") >= 0 ? REVERSE_TECHNIQUES.indexOf(data["tersine-teknik"]!) : null}
              onSelect={(i) => setField("tersine-teknik", REVERSE_TECHNIQUES[i])}
              label="Tersine yazma tekniği"
            />
            <Field label="2. Zayıf mesajını yaz (2–3 cümle)" value={data["tersine-metin"] ?? ""} onChange={(v) => setField("tersine-metin", v)} />
            <fieldset className="mt-4">
              <legend className="font-semibold">3. Tuzakları işaretle: Hangi tetikleyiciyi kullanıyor?</legend>
              <div className="mt-2 flex flex-col gap-2">
                {REVERSE_TRIGGERS.map((t) => {
                  const chosen = (data["tersine-tetikleyiciler"] ?? "").split(",").filter(Boolean);
                  const on = chosen.includes(t);
                  return (
                    <label key={t} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-zinc-300 px-4">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => {
                          const next = on ? chosen.filter((x) => x !== t) : [...chosen, t];
                          setField("tersine-tetikleyiciler", next.join(","));
                        }}
                      />
                      {t}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <p className="mt-4 font-semibold">4. Aynı mesajı FARK ET ile boz:</p>
            {FARK_ET.map((s) => (
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
                  completeSlide("tersine");
                }
              }}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white"
            >
              Tersine yazmayı kaydet
            </button>
            {!reverseSaved && (data["tersine-metin"] ?? "") === "" && (
              <p className="mt-2 text-sm text-zinc-600">Kaydetmek için önce mesajını yaz.</p>
            )}
            {reverseSaved && <Feedback kind="ok">{REVERSE_DONE}</Feedback>}
            <button
              type="button"
              onClick={() => setShowReverseExample((v) => !v)}
              aria-expanded={showReverseExample}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg border border-zinc-900 px-4 text-sm font-semibold"
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
      case 10:
        return (
          <Slide id="cikis" title="Çıkış Bileti (3 soru)" done={!!done.cikis} onComplete={() => completeSlide("cikis")}>
            <p className="text-zinc-700">
              3 soruluk mini test. Bu bir sınav değil; hangi teknikte ek çalışma
              açılması gerektiğini gösterir. Yanlış cevap verirsen ceza yok, o
              tekniğin ek mikro dersi açılır.
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
                  onSelect={(i) => setExitSelected(i)}
                  label={`Çıkış bileti soru ${exitIndex + 1}`}
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
                      className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white"
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
                      <div key={mi} className="mt-4 rounded-lg border border-zinc-900 bg-zinc-50 p-4">
                        <h3 className="font-bold">{EXIT_QUESTIONS[mi].remedialTitle}</h3>
                        <p className="mt-2 leading-7">{EXIT_QUESTIONS[mi].remedialText}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Slide>
        );
      case 11:
        return (
          <Slide id="transfer" title="Transfer Görevi" done={!!done.transfer} onComplete={() => completeSlide("transfer")}>
            <p className="leading-7 text-zinc-800">
              Aynı teknikleri alışveriş dışında bir alanda uygula. Bu, transfer
              görevidir: Teknik, yalnızca bir alanda kalırsa unutulur; farklı
              alanda uygulanırsa kalıcı olur.
            </p>
            <blockquote className="mt-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 leading-7">
              {TRANSFER_TEXT}
            </blockquote>
            <p className="mt-3 font-semibold">
              Bu mesajı FARK ET&apos;in 6 adımıyla analiz et. Her adıma 1–2 cümle yaz.
            </p>
            {FARK_ET.map((s) => (
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
                completeSlide("transfer");
              }}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white"
            >
              Transfer görevini kaydet
            </button>
            {transferSaved && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowTransferModel((v) => !v)}
                  aria-expanded={showTransferModel}
                  className="inline-flex min-h-11 items-center rounded-lg border border-zinc-900 px-4 text-sm font-semibold"
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
      case 12:
        return (
          <Slide id="rubrik" title="Öz Rubrik" done={!!done.rubrik} onComplete={() => completeSlide("rubrik")}>
            <p className="text-zinc-700">
              Şimdi kendi analizini 7 soruyla puanla. Her soruya 1 (zayıf) ile 5
              (güçlü) arasında puan ver. Amacın yüksek puan toplamak değil, zayıf
              kalan soruyu görmek.
            </p>
            {RUBRIC_QUESTIONS.map((q, i) => (
              <div key={q.name} className="mt-4">
                <label htmlFor={`rubrik-${i}`} className="font-semibold">
                  {q.name} {q.detail}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id={`rubrik-${i}`}
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={rubric[i] ?? 3}
                    onChange={(e) => setRubric((prev) => ({ ...prev, [i]: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="w-8 text-center font-semibold" aria-label={`${q.name} puanı`}>
                    {rubric[i] ?? 3}
                  </span>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => { setRubricSaved(true); completeSlide("rubrik"); }}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white"
            >
              Rubriği kaydet
            </button>
            {rubricSaved && weakestRubric !== null && (
              <Feedback kind="note">
                En düşük puanı alan soru: {RUBRIC_QUESTIONS[weakestRubric].name} — {RUBRIC_QUESTIONS[weakestRubric].detail} En düşük puanı alan soru, bir dahaki analizinde dikkat edeceğin sorudur. Onu bir kenara not et. Bir dahaki sefere analiz yaparken önce o soruya bak.
              </Feedback>
            )}
          </Slide>
        );
      case 13:
        return (
          <Slide id="gunluk" title="Karar Günlüğü" done={!!done.gunluk} onComplete={() => completeSlide("gunluk")}>
            <p className="leading-7 text-zinc-800">
              Şimdi kendi hayatından 1 örneği FARK ET ile yaz. Bu giriş, kurs
              sonundaki kişisel Kalkan Dosyası&apos;na eklenecek. Günlüğün sana
              aittir; bu derste sunucuya gönderilmez.
            </p>
            <button
              type="button"
              onClick={() => setShowJournalExample((v) => !v)}
              aria-expanded={showJournalExample}
              className="mt-3 inline-flex min-h-11 items-center rounded-lg border border-zinc-900 px-4 text-sm font-semibold"
            >
              Örneği gör
            </button>
            {showJournalExample && (
              <ul className="mt-3 space-y-1 rounded-lg border border-zinc-200 p-4">
                {JOURNAL_EXAMPLE.map((e) => <li key={e} className="leading-7">{e}</li>)}
              </ul>
            )}
            {JOURNAL_FIELDS.map((f) => (
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
                  completeSlide("gunluk");
                }
              }}
              className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white"
            >
              Günlüğü kaydet
            </button>
            {journalSaved && <Feedback kind="ok">{JOURNAL_SAVED}</Feedback>}
          </Slide>
        );
      case 14:
        return (
          <Slide id="kapanis" title="Kapanış" done={!!done.kapanis} onComplete={() => completeSlide("kapanis")}>
            <h3 className="text-lg font-bold">Bu derste 3 şeyi öğrendin:</h3>
            <ol className="mt-2 list-decimal space-y-2 pl-5 leading-7 text-zinc-800">
              {CLOSING_POINTS.map((p) => <li key={p}>{p}</li>)}
            </ol>
            <p className="mt-4 font-semibold">
              Bundan sonra tek cümlen var: “Dur, burada ne oluyor?”
            </p>
            <p className="mt-2 leading-7 text-zinc-700">
              Bu cümleyi her acele kararın önünde hatırlarsan, bu ders görevini
              yapmış demektir.
            </p>
            <p className="mt-3 leading-7 text-zinc-700">
              Bu dersin günlük girişi Kalkan Dosyası&apos;na eklendi. Kurs sonunda
              tüm girişlerin, rubriklerin ve karar protokollerin tek bir dosyada
              toplanacak.
            </p>
            <h3 className="mt-5 text-lg font-bold">Sonraki adım: e-posta güçlendirmeleri</h3>
            <p className="mt-2 text-zinc-700">
              Ders bitti. Her e-posta tek eylem içerir, uzun metin içermez.
              Bağlantı doğrudan göreve gider.
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
            <a href="/" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white">
              Ana sayfaya dön
            </a>
          </Slide>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600">
        Yetişkin · Ders 1 / 8 · 40–52 dakika
      </p>
      <h1 className="mt-2 text-4xl font-bold leading-tight">
        Zihin Nasıl Kandırılır?
      </h1>
      <p className="mt-3 leading-7 text-zinc-700">
        Bu derste 3 teknik öğreneceksin: hızlı düşünme, onay önyargısı ve
        duygu tuzağı. Ders bireyseldir; canlı ders, grup veya sohbet yoktur.
        Her ekranda tek bir slayt görürsün.
      </p>

      <div className="mt-6 rounded-lg border border-zinc-200 p-4">
        <p className="font-semibold" role="status">
          İlerleme: {doneCount} / {SLIDES.length} slayt tamamlandı
        </p>
        <div
          className="mt-2 h-3 w-full rounded-full bg-zinc-200"
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={SLIDES.length}
          aria-label="Ders ilerlemesi"
        >
          <div
            className="h-3 rounded-full bg-zinc-900"
            style={{ width: `${(doneCount / SLIDES.length) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-sm">
          Kaldığın yer: Slayt {currentSlide + 1} — {SLIDES[currentSlide].title}
          {doneCount === SLIDES.length && " · Dersi tamamladın."}
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          İlerlemen ve günlük yazıların yalnızca bu tarayıcıda saklanır,
          hiçbir sunucuya gönderilmez. Sayfayı yenilersen kaldığın slayta
          dönersin.
        </p>
      </div>

      <nav aria-label="Slayt genel bakışı" className="mt-6">
        <h2 className="text-lg font-bold">Slaytlar</h2>
        <ol className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SLIDES.map((s, i) => {
            const enabled = canJump(i);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  disabled={!enabled}
                  onClick={() => goTo(i)}
                  aria-current={i === currentSlide ? "true" : undefined}
                  className={`min-h-11 w-full rounded-lg border px-3 py-2 text-left text-sm ${
                    i === currentSlide
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : enabled
                        ? "border-zinc-300 bg-white"
                        : "border-zinc-200 bg-zinc-50 text-zinc-400"
                  }`}
                >
                  {i + 1}. {s.title} —{" "}
                  {done[s.id]
                    ? "Tamamlandı"
                    : i === currentSlide
                      ? "Şu anki slayt"
                      : enabled
                        ? "Açık"
                        : "Henüz"}
                </button>
              </li>
            );
          })}
        </ol>
        <p className="mt-2 text-sm text-zinc-600">
          Önceki slaytlara her zaman dönebilirsin. Sağ ve sol ok tuşlarıyla da
          slayt değiştirebilirsin; yazı alanlarındayken ok tuşları metni
          düzenler.
        </p>
      </nav>

      <div className="mt-8 border-t border-zinc-200 pt-6">{slideNav("Üst slayt gezintisi")}</div>

      {renderSlide()}

      <div className="mt-8 border-t border-zinc-200 pt-6">{slideNav("Alt slayt gezintisi")}</div>
    </div>
  );
}
