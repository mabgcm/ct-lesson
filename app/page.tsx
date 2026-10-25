import Link from "next/link";

const LESSON_PATH = "/dersler/yetiskin-1-zihin-nasil-kandirilir";

const farkEt = [
  { letter: "F", name: "Fren", question: "Duygu yükselince dur." },
  { letter: "A", name: "Amaç", question: "Bu mesaj benden tam olarak ne istiyor?" },
  { letter: "R", name: "Referans", question: "Bunu kim söylüyor, çıkarı ne?" },
  { letter: "K", name: "Kanıt", question: "Somut kanıt ne, alternatif açıklama ne?" },
  { letter: "E", name: "Etki", question: "Kabul edersem / etmezsem maliyeti ne?" },
  { letter: "T", name: "Tercih", question: "Kendi değerlerime göre kararım ne?" },
];

const adultLessons = [
  { title: "Zihin Nasıl Kandırılır?", status: "available" },
  { title: "Argüman ve Safsatalar", status: "soon" },
  { title: "Medya, Algoritma ve Yapay Zekâ", status: "soon" },
  { title: "Satış ve Pazarlama Manipülasyonu", status: "soon" },
  { title: "İş Yerinde Güç Oyunları", status: "soon" },
  { title: "İlişkiler ve Sınır Koyma", status: "soon" },
  { title: "Para ve Dolandırıcılık", status: "soon" },
  { title: "Final: Kişisel Kalkan Planı", status: "soon" },
] as const;

const teenLessons = [
  "Beyin ve Baskı: FOMO, Beğenilme İsteği",
  "Sosyal Medya ve Fenomenler",
  "Akran Baskısı ve Hazır Cümleler",
  "Oyun, Uygulama ve Alışveriş Tuzakları",
  "Dedikodu, Dışlama ve Çevrimiçi Sınırlar",
  "Kendi Pusulan: Değerler ve Karar Süzgeci",
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold uppercase tracking-wide text-zinc-600">
        Bireysel, çevrimiçi kişisel gelişim kursu
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight">
        Zihin Kalkanı: Tekniği tanı, dur, kendi kararını ver
      </h1>
      <p className="mt-4 text-lg leading-8 text-zinc-700">
        Bu kurs, manipülasyon tekniklerini ismiyle tanımanı, karar vermeden
        önce durup düşünmeni ve kendi değerlerinle karar vermeni hedefler.
        Sihirli bir korunma vaat etmez; tek bir cümlelik bir refleks
        kazandırır: “Dur, burada ne oluyor?”
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={LESSON_PATH}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-zinc-900 px-5 text-base font-semibold text-white"
        >
          Ders 1&apos;e başla: Zihin Nasıl Kandırılır?
        </Link>
      </div>
      <p className="mt-3 text-sm text-zinc-600">
        Şu anda yalnızca Yetişkin Ders 1 hazırdır. Diğer dersler, ergen
        versiyonu, kayıt ve ödeme henüz eklenmemiştir.
      </p>

      <section aria-labelledby="farket-baslik" className="mt-12">
        <h2 id="farket-baslik" className="text-2xl font-bold">
          FARK ET: Her karara aynı 6 adımla bak
        </h2>
        <p className="mt-2 text-zinc-700">
          Kursun tamamı bu çerçeveye bağlıdır. Her derste aynı sıra, aynı
          anlam kullanılır.
        </p>
        <ol className="mt-4 space-y-3">
          {farkEt.map((step) => (
            <li
              key={step.letter}
              className="flex gap-3 rounded-lg border border-zinc-200 p-4"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-lg font-bold text-white"
              >
                {step.letter}
              </span>
              <span>
                <strong>{step.name}:</strong> {step.question}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="bicim-baslik" className="mt-12">
        <h2 id="bicim-baslik" className="text-2xl font-bold">
          Dersler nasıl işlenir?
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700">
          <li>Tamamen çevrimiçi, bireysel self-learning.</li>
          <li>Canlı ders, grup, kohort veya sohbet yoktur.</li>
          <li>
            Her ders aynı iskeleti izler: kanca, mikro dersler, etkileşimler,
            dallanan senaryo, tersine yazma, çıkış bileti, karar günlüğü.
          </li>
          <li>
            Hatırlatmalar ve güçlendirmeler e-posta görevleri olarak gelir:
            dersten +2 gün, +7 gün ve +30 gün sonra. Her e-posta tek bir
            eylem içerir.
          </li>
          <li>
            Karar günlüğün kendi karar dosyanı oluşturur; kurs sonunda kişisel
            Kalkan Dosyası&apos;na dönüşür.
          </li>
          <li>Yetişkin dersi 40–52 dakika, ergen dersi 28–36 dakika sürer.</li>
        </ul>
      </section>

      <section aria-labelledby="yetiskin-baslik" className="mt-12">
        <h2 id="yetiskin-baslik" className="text-2xl font-bold">
          Yetişkin müfredatı: 8 ders
        </h2>
        <ol className="mt-4 space-y-2">
          {adultLessons.map((lesson, index) => (
            <li
              key={lesson.title}
              className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 p-4"
            >
              <span>
                <strong>{index + 1}.</strong> {lesson.title}
              </span>
              {lesson.status === "available" ? (
                <Link
                  href={LESSON_PATH}
                  className="inline-flex min-h-11 shrink-0 items-center rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white"
                >
                  Başla
                </Link>
              ) : (
                <span className="shrink-0 rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600">
                  Yakında
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="ergen-baslik" className="mt-12">
        <h2 id="ergen-baslik" className="text-2xl font-bold">
          Ergen müfredatı: 6 ders
        </h2>
        <p className="mt-2 text-zinc-700">
          Ergen versiyonu, beceri eğitimidir; terapi değildir. Dili saygılı
          sınır koyma ve sorarak karar verme çizgisindedir.
        </p>
        <ol className="mt-4 space-y-2">
          {teenLessons.map((title, index) => (
            <li
              key={title}
              className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 p-4"
            >
              <span>
                <strong>{index + 1}.</strong> {title}
              </span>
              <span className="shrink-0 rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-600">
                Yakında
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="etik-baslik" className="mt-12 rounded-lg border border-zinc-900 bg-zinc-50 p-5">
        <h2 id="etik-baslik" className="text-xl font-bold">
          Etik not
        </h2>
        <p className="mt-2 leading-7 text-zinc-700">
          Bu kursta öğrendiğin teknikleri başkalarını yönlendirmek, baskı
          kurmak veya satışta avantaj sağlamak için değil, kendini korumak
          için kullanacaksın. Bir tekniği tanımak, onu kullanma hakkı vermez.
          Bu kurs kimseye psikolojik tanı koymaz, terapi değildir. İnsanları
          değil, mesajları ve teknikleri analiz edeceğiz.
        </p>
      </section>
    </div>
  );
}
