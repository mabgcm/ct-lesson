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

const modes = [
  {
    title: "Kartlar",
    body: "FARK ET adımlarını ve 3 tekniği kart çevirerek tekrar et. Bildiklerini işaretle, zorlandıklarına dön.",
  },
  {
    title: "Öğren",
    body: "Her kısa parçadan sonra tek soru. Bilmiyorsan söyle, cevabı gör, tekrar dene. Hiçbir soru ilerlemeni engellemez.",
  },
  {
    title: "Test",
    body: "Dersin sonunda 3 soruluk kısa kontrol. Sonunda bildiklerini ve daha çalışman gerekenleri görürsün.",
  },
  {
    title: "Eşleştir",
    body: "Durumları doğru düşünme türüyle eşleştir. Kartları sürükle ya da dokunarak yerleştir; kendi süreni gör.",
  },
];

const adultModules = [
  {
    title: "Modül 1: Zihin ve Düşünme",
    body: "Zihnin nasıl çalıştığını ve sağlam bir argümanın nasıl kurulduğunu öğren.",
    lessons: [
      { title: "Zihin Nasıl Kandırılır?", status: "available" },
      { title: "Argüman ve Safsatalar", status: "soon" },
    ],
  },
  {
    title: "Modül 2: Medya ve İkna",
    body: "Ekranlarda ve satış mesajlarında ikna tekniğini tanı.",
    lessons: [
      { title: "Medya, Algoritma ve Yapay Zekâ", status: "soon" },
      { title: "Satış ve Pazarlama Manipülasyonu", status: "soon" },
    ],
  },
  {
    title: "Modül 3: İnsanlar ve Güç",
    body: "İş yerinde ve ilişkilerde baskıyı fark et, sınırını koru.",
    lessons: [
      { title: "İş Yerinde Güç Oyunları", status: "soon" },
      { title: "İlişkiler ve Sınır Koyma", status: "soon" },
    ],
  },
  {
    title: "Modül 4: Para ve Kalkan",
    body: "Para tuzaklarından korun ve kendi kalkan planını yaz.",
    lessons: [
      { title: "Para ve Dolandırıcılık", status: "soon" },
      { title: "Final: Kişisel Kalkan Planı", status: "soon" },
    ],
  },
  {
    title: "İleri Modül: Güç Alanları",
    body: "Yalnızca yetişkinlere yöneliktir, isteğe bağlıdır. Bu modül bir inancı veya görüşü yargılamaz, sadece mesajdaki tekniği inceler.",
    lessons: [
      { title: "Siyasi Manipülasyon", status: "soon" },
      { title: "Dini ve Spiritüel Manipülasyon", status: "soon" },
    ],
  },
] as const;

const teenModules = [
  {
    title: "Modül 1: Beyin ve Ekran",
    body: "Beynin baskıya nasıl tepki verdiğini ve ekranların seni nasıl çektiğini gör.",
    lessons: [
      "Beyin ve Baskı: FOMO, Beğenilme İsteği",
      "Sosyal Medya ve Fenomenler",
    ],
  },
  {
    title: "Modül 2: Baskı ve Tuzaklar",
    body: "Akran baskısını ve oyun ile alışveriş tuzaklarını tanı.",
    lessons: [
      "Akran Baskısı ve Hazır Cümleler",
      "Oyun, Uygulama ve Alışveriş Tuzakları",
    ],
  },
  {
    title: "Modül 3: Sınırlar ve Pusula",
    body: "Dedikoduya ve dışlamaya karşı sınırını koy, kendi pusulanla karar ver.",
    lessons: [
      "Dedikodu, Dışlama ve Çevrimiçi Sınırlar",
      "Kendi Pusulan: Değerler ve Karar Süzgeci",
    ],
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero: centred text stack */}
      <section className="mx-auto max-w-[1200px] px-4 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-veil">
          Bireysel, çevrimiçi kişisel gelişim kursu
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-[44px] sm:leading-[55px]">
          Zihin Kalkanı: Tekniği tanı, dur, kendi kararını ver
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-deep-indigo">
          Bu kurs, manipülasyon tekniklerini ismiyle tanımanı, karar vermeden
          önce durup düşünmeni ve kendi değerlerinle karar vermeni hedefler.
          Sihirli bir korunma vaat etmez; tek bir cümlelik bir refleks
          kazandırır: “Dur, burada ne oluyor?”
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={LESSON_PATH}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-iris-bolt px-6 text-base font-semibold text-white shadow-[rgba(40,46,62,0.1)_0px_2px_4px_0px]"
          >
            Ders 1&apos;e başla: Zihin Nasıl Kandırılır?
          </Link>
        </div>
        <p className="mt-3 text-sm text-slate-veil">
          Şu anda yalnızca Yetişkin Ders 1 hazırdır. Diğer dersler, ergen
          versiyonu, kayıt ve ödeme henüz eklenmemiştir.
        </p>
      </section>

      {/* Feature category cards: the course's study modes */}
      <section aria-labelledby="modlar-baslik" className="mx-auto max-w-[1200px] px-4 pb-20">
        <h2 id="modlar-baslik" className="text-2xl font-semibold">
          Ders nasıl çalışılır?
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modes.map((mode) => (
            <article
              key={mode.title}
              className="rounded-3xl bg-[#dbdfff] p-4"
            >
              <div className="h-full rounded-lg bg-paper-white p-6">
                <h3 className="text-xl font-bold">{mode.title}</h3>
                <p className="mt-2 text-sm leading-6 text-deep-indigo">{mode.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FARK ET: study-set cards on white */}
      <section aria-labelledby="farket-baslik" className="bg-paper-white py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 id="farket-baslik" className="text-2xl font-semibold">
            FARK ET: Her karara aynı 6 adımla bak
          </h2>
          <p className="mt-2 max-w-2xl text-deep-indigo">
            Kursun tamamı bu çerçeveye bağlıdır. Her derste aynı sıra, aynı
            anlam kullanılır.
          </p>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {farkEt.map((step) => (
              <li
                key={step.letter}
                className="flex gap-3 rounded-lg border border-mist-border bg-paper-white p-4 shadow-[rgba(40,46,62,0.1)_0px_4px_16px_0px]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-iris-bolt text-lg font-semibold text-white"
                >
                  {step.letter}
                </span>
                <span>
                  <strong className="font-semibold">{step.name}:</strong> {step.question}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Format: tinted section with white inner panel */}
      <section aria-labelledby="bicim-baslik" className="bg-lilac-wash py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="rounded-lg bg-paper-white p-6 shadow-[rgba(40,46,62,0.1)_0px_4px_16px_0px]">
            <h2 id="bicim-baslik" className="text-2xl font-semibold">
              Dersler nasıl işlenir?
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-deep-indigo">
              <li>Tamamen çevrimiçi, bireysel öğrenme.</li>
              <li>Canlı ders, grup veya sohbet yoktur.</li>
              <li>
                Her ders kısa parçalar, kartlar, sorular, seçimler ve yazma
                çalışmaları ile işlenir.
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
          </div>
        </div>
      </section>

      {/* Adult curriculum: module cards */}
      <section aria-labelledby="yetiskin-baslik" className="mx-auto max-w-[1200px] px-4 py-20">
        <h2 id="yetiskin-baslik" className="text-2xl font-semibold">
          Yetişkin müfredatı: 5 modül, 10 ders
        </h2>
        <p className="mt-2 max-w-2xl text-deep-indigo">
          İlk 4 modül çekirdek kurstur. İleri modül çekirdekten sonra,
          isteğe bağlı olarak gelir.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {adultModules.map((module, moduleIndex) => (
            <article
              key={module.title}
              className="rounded-lg border border-mist-border bg-paper-white p-6 shadow-[rgba(40,46,62,0.1)_0px_4px_16px_0px]"
            >
              <h3 className="text-xl font-semibold">{module.title}</h3>
              <p className="mt-2 text-sm leading-6 text-deep-indigo">{module.body}</p>
              <ol className="mt-4 space-y-2">
                {module.lessons.map((lesson, lessonIndex) => {
                  const number = moduleIndex * 2 + lessonIndex + 1;
                  return (
                    <li
                      key={lesson.title}
                      className="flex items-center justify-between gap-3 rounded-lg border border-mist-border bg-chalk-canvas p-3"
                    >
                      <span className="text-sm">
                        <strong className="font-semibold">{number}.</strong> {lesson.title}
                      </span>
                      {lesson.status === "available" ? (
                        <Link
                          href={LESSON_PATH}
                          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-iris-bolt px-5 text-sm font-semibold text-white"
                        >
                          Başla
                        </Link>
                      ) : (
                        <span className="shrink-0 rounded-full border border-mist-border bg-paper-white px-3 py-1 text-sm text-slate-veil">
                          Yakında
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {/* Teen curriculum: module cards, tinted section */}
      <section aria-labelledby="ergen-baslik" className="bg-lilac-wash py-20">
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 id="ergen-baslik" className="text-2xl font-semibold">
            Ergen müfredatı: 3 modül, 6 ders
          </h2>
          <p className="mt-2 max-w-2xl text-deep-indigo">
            Ergen versiyonu, beceri eğitimidir; terapi değildir. Dili saygılı
            sınır koyma ve sorarak karar verme çizgisindedir.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {teenModules.map((module, moduleIndex) => (
              <article
                key={module.title}
                className="rounded-lg border border-mist-border bg-paper-white p-6"
              >
                <h3 className="text-xl font-semibold">{module.title}</h3>
                <p className="mt-2 text-sm leading-6 text-deep-indigo">{module.body}</p>
                <ol className="mt-4 space-y-2">
                  {module.lessons.map((title, index) => (
                    <li
                      key={title}
                      className="flex items-center justify-between gap-3 rounded-lg border border-mist-border bg-chalk-canvas p-3"
                    >
                      <span className="text-sm">
                        <strong className="font-semibold">{moduleIndex * 2 + index + 1}.</strong> {title}
                      </span>
                      <span className="shrink-0 rounded-full border border-mist-border bg-paper-white px-3 py-1 text-sm text-slate-veil">
                        Yakında
                      </span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics */}
      <section aria-labelledby="etik-baslik" className="mx-auto max-w-[1200px] px-4 py-20">
        <div className="rounded-lg border border-mist-border bg-paper-white p-6 shadow-[rgba(40,46,62,0.1)_0px_4px_16px_0px]">
          <h2 id="etik-baslik" className="text-xl font-semibold">
            Etik not
          </h2>
          <p className="mt-2 leading-7 text-deep-indigo">
            Bu kursta öğrendiğin teknikleri başkalarını yönlendirmek, baskı
            kurmak veya satışta avantaj sağlamak için değil, kendini korumak
            için kullanacaksın. Bir tekniği tanımak, onu kullanma hakkı vermez.
            Bu kurs kimseye psikolojik tanı koymaz, terapi değildir. İnsanları
            değil, mesajları ve teknikleri analiz edeceğiz.
          </p>
        </div>
      </section>
    </div>
  );
}
