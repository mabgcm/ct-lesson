// Ders 1 içerik verisi. Metinler, içerik paketinden (ders-1-icerik-paketi.md)
// alınmıştır; öğrenciye gösterilen ders metni bu dosyadakilerdir.
// Bu dosya Türkçe-only'dir; İngilizce çeviri ayrı bir paket olarak hazırlanacaktır.

export const FARK_ET = [
  { letter: "F", name: "Fren", question: "Duygu yükselince dur." },
  { letter: "A", name: "Amaç", question: "Bu mesaj benden tam olarak ne istiyor?" },
  { letter: "R", name: "Referans", question: "Bunu kim söylüyor, çıkarı ne?" },
  { letter: "K", name: "Kanıt", question: "Somut kanıt ne, alternatif açıklama ne?" },
  { letter: "E", name: "Etki", question: "Kabul edersem / etmezsem maliyeti ne?" },
  { letter: "T", name: "Tercih", question: "Kendi değerlerime göre kararım ne?" },
];

export const INTRO_PARAGRAPHS = [
  "Her gün yüzlerce mesaj sana bir karar verdirtmeye çalışır: satın al, tıkla, paylaş, hemen cevap ver, fikrini değiştir. Bunların çoğu kötü niyetli değildir. Ama bazıları, beyninin hızlı karar verme refleksini bilerek kullanır.",
  "Bu derste sihirli bir korunma yöntemi öğrenmeyeceksin. Şunu öğreneceksin: Manipülasyon tekniklerini ismiyle tanımak, karar vermeden önce durup düşünmek ve kendi değerlerinle karar vermek.",
  "Dersin sonunda, bir mesaj seni aceleye getirdiğinde “Dur, burada ne oluyor?” diyebileceksin. Bu tek cümle, bu dersin en önemli kazanımıdır.",
];

export const ETHICS_TEXT = [
  "Bu derste öğrendiğin teknikleri başkalarını yönlendirmek, baskı kurmak veya satışta avantaj sağlamak için değil, kendini korumak için kullanacaksın. Bir tekniği tanımak, onu kullanma hakkı vermez.",
  "Bu ders kimseye psikolojik tanı koymaz, terapi değildir. İnsanları değil, mesajları ve teknikleri analiz edeceğiz.",
];

export const OBJECTIVES = [
  "Hızlı düşünme ile yavaş düşünme arasındaki farkı kendi cümlesiyle açıklar.",
  "Onay önyargısını bir örnekte ismiyle tanır.",
  "Duygu tuzağını bir mesajda işaretler ve hangi duygunun yükseltildiğini söyler.",
  "Herhangi bir manipülatif mesajı FARK ET'in 6 adımıyla analiz eder.",
  "Kendi hayatından 1 örneği karar günlüğüne FARK ET ile yazar.",
];

export const HOOK_MESSAGE = [
  "SON 1 SAAT!",
  "Kış botu — %60 indirim",
  "Stokta son 2 adet kaldı.",
  "Şu an 3.482 kişi bu ürüne bakıyor.",
  "Sepetine ekleyenler: “Kaçırmayın, ben dün aldım, bugün fiyatı arttı!”",
];

export const HOOK_OPTIONS = [
  "Hemen almak istedim.",
  "Acele hissettim ama durdum.",
  "Şüphelendim.",
  "Umursamadım.",
];

export const HOOK_AFTER =
  "Tepkin ne olursa olsun, bu normal. Beynin bu tür mesajlara hızlı tepki vermek üzere çalışır. Dersin sonunda aynı mesaja geri döneceğiz ve bu sefer FARK ET ile bakacağız. Aradaki farkı kendin göreceksin.";

export type MicroLesson = {
  id: string;
  title: string;
  paragraphs: string[];
  diagramTitle: string;
  diagram: string;
};

export const MICRO_1: MicroLesson = {
  id: "mikro-1",
  title: "Mikro ders 1 — Hızlı düşünme",
  paragraphs: [
    "Beynin iki hızı var.",
    "Hızlı düşünme otomatiktir: Yolda yürürken önüne çıkan çukuru fark etmek, tanıdık bir yüzü tanımak, “2 + 2” sorusuna cevap vermek gibi işleri hızlı düşünme yapar. Enerji tasarrufu sağlar ve çoğu zaman işe yarar.",
    "Yavaş düşünme bilinçlidir: Bir sözleşmeyi okumak, iki fiyatı karşılaştırmak, “Bu iddia doğru mu?” diye sormak gibi işleri yavaş düşünme yapar. Daha fazla enerji ister, daha yavaştır, ama önemli kararlarda koruyucudur.",
    "Sorun, hızlı düşünmenin her yerde devrede kalmasıdır.",
    "Manipülatif mesajlar tam buraya oynar: Geri sayım, “son adet”, “herkes alıyor”, “hemen karar ver” gibi tetikleyiciler seni hızlı modda tutar. Hızlı moddayken kanıt aramazsın, maliyeti hesaplamazsın, alternatif düşünmezsin. Karar, düşünceden önce verilmiş olur.",
    "Bu, aptallık veya zayıflık değildir. Beynin bunu herkese yapar. Hızlı düşünme kötü değildir; yanlış yerde, önemli bir kararda devrede kalması sorundur.",
    "Kural: Önemli, geri dönüşü zor veya duygusu yüksek bir kararda, acele hissettiğinde dur. FARK ET'in ilk adımı, Fren, tam bunun içindir. Durmak, karar vermemek değildir; kararını yavaş moda taşımaktır.",
  ],
  diagramTitle: "Hızlı ve yavaş düşünme karşılaştırması",
  diagram:
    "Hızlı düşünme: otomatik, hızlı, duygusal, enerji tasarruflu. Yavaş düşünme: bilinçli, yavaş, kanıt arayan, enerji isteyen. Önemli kararda yavaş moda geç.",
};

export const MICRO_2: MicroLesson = {
  id: "mikro-2",
  title: "Mikro ders 2 — Onay önyargısı",
  paragraphs: [
    "Onay önyargısı, zaten inandığın bilgiyi seçmektir.",
    "Beynin, mevcut fikrini doğrulayan bilgiyi arar, hatırlar ve abartır. Karşıt kanıtı ise görmezden gelir, küçümser veya “istisna” sayar. Bu, bilinçli bir hile değildir; beynin tutarlılık arayışıdır.",
    "Nasıl beslenir?",
    "Bir konuda zaten bir fikrin varsa, algoritmalar ve seçilmiş yorumlar sana sürekli aynı fikirdeki içerikleri gösterir. Bir süre sonra “herkes böyle düşünüyor” hissi oluşur. Oysa gördüğün, senin fikrinin yansımasıdır; herkesin fikri değil.",
    "Manipülasyon bağlantısı: Bir ürün, fikir veya iddia hakkında yalnızca olumlu yorumları görmek, yalnızca aynı fikirdeki kişileri duymak, onay önyargısını güçlendirir. Karşıt kanıtı görmediğin için, kararın sağlam sanılır ama eksik kanıtla verilmiştir.",
    "Kural: Bir iddia seni hemen rahatlattıysa, “işte, ben de böyle düşünüyordum” dedirttiyse, özellikle karşıt kanıtı ara. FARK ET'in Kanıt adımında alternatif açıklamayı yazmak zorunludur, süs değildir. Karşıt kanıtı aramak, fikrinden vazgeçmek değildir; fikrini test etmektir.",
  ],
  diagramTitle: "Onay önyargısı döngüsü",
  diagram:
    "Mevcut fikir → Aynı fikirdeki içeriği seçme → Fikrin güçlenmesi → Karşıt kanıtı görmezden gelme → Mevcut fikir (daha güçlü).",
};

export const MICRO_3: MicroLesson = {
  id: "mikro-3",
  title: "Mikro ders 3 — Duygu tuzağı",
  paragraphs: [
    "Duygu tuzağı, duyguyu yükseltip düşünmeyi kısaltmaktır.",
    "Korku, öfke, heyecan, acıma veya utanç yükseldiğinde, beynin kanıt arama ve maliyet hesaplama bölümü geri plana düşer. Duygu, kararın kendisi haline gelir: “Korkuyorum, o yüzden hemen yapmalıyım” veya “Çok heyecanlandım, o yüzden kaçırmamalıyım.”",
    "Nasıl çalışır?",
    "Bir mesaj önce duyguyu yükseltir, sonra çözümü hemen sunar: Korkut, sonra “hemen al” de. Öfkelendir, sonra “hemen paylaş” de. Heyecanlandır, sonra “hemen katıl” de. Duygu yüksekken, “Bu doğru mu, bana uygun mu, maliyeti ne?” soruları sorulmaz.",
    "Manipülasyon bağlantısı: “Çocuğun tehlikede”, “Kaçırırsan pişman olursun”, “Herkes sana gülüyor” türü cümleler, bilgi vermez; duygu yükseltir. Duygu yükseldikten sonra gelen her teklif, olduğundan daha acil ve daha gerekli görünür.",
    "Kural: Duygu yükseldiğinde karar verme, önce duyguyu adlandır: Bu korku mu, öfke mi, heyecan mı, acıma mı? Adlandırmak, hızını keser. “Korkuyorum” demek, korkuyu yok etmez ama kararın direksiyonunu duygudan alıp sana geri verir. Sonra FARK ET'in diğer adımlarına geç: Amaç ne, referans kim, kanıt ne?",
  ],
  diagramTitle: "Duygu tuzağı akışı",
  diagram:
    "Duygu yükselir → Düşünme kısalır → Acele karar → Sonradan pişmanlık. Fren ile kesilen akış: Duygu yükselir → Duyguyu adlandır → Dur → FARK ET ile analiz et → Kendi kararın.",
};

export type MatchPair = { situation: string; answer: "Hızlı düşünme" | "Yavaş düşünme" };

export const MATCH_PAIRS: MatchPair[] = [
  {
    situation:
      "Bir mağaza mesajında “son 10 dakika” yazısını görünce hemen satın alma isteği duymak",
    answer: "Hızlı düşünme",
  },
  {
    situation:
      "İki abonelik planının fiyatını ve iptal koşulunu satır satır karşılaştırmak",
    answer: "Yavaş düşünme",
  },
  {
    situation: "Tanıdık bir şarkıyı duyunca sözlerini hatırlamak",
    answer: "Hızlı düşünme",
  },
  {
    situation: "Bir sağlık iddiası için “kanıtı ne, kaynağı kim?” diye sormak",
    answer: "Yavaş düşünme",
  },
  {
    situation:
      "Bir yorumda “herkes bunu söylüyor” yazısını görünce fikrini değiştirmek",
    answer: "Hızlı düşünme",
  },
];

export const MATCH_CORRECT =
  "Hepsi doğru. Fark ettin mi? Hızlı düşünme örneklerinin ortak noktası acele ve duygu; yavaş düşünme örneklerinin ortak noktası durma ve sorma.";

export const MATCH_WRONG =
  "Bu eşleşme tam olmadı, tekrar dene. İpucu: Karar aceleyle, duyguyla ve düşünmeden veriliyorsa hızlı düşünme; durup, karşılaştırıp, soru sorarak veriliyorsa yavaş düşünme devrededir.";

export type TrapSentence = {
  id: string;
  user: string;
  text: string;
  target: boolean;
  explanation: string;
};

export const TRAP_SENTENCES: TrapSentence[] = [
  {
    id: "t1",
    user: "mavi_defter",
    text: "Bu kulaklığı aldım, ses kalitesi gerçekten iyiymiş, ben de zaten iyi olacağını düşünüyordum.",
    target: false,
    explanation: "",
  },
  {
    id: "t2",
    user: "gece_yolcusu",
    text: "Ben de aynı şeyi düşünüyordum, demek ki herkes memnun.",
    target: true,
    explanation:
      "Bir kişinin aynı fikirde olması, “herkes” anlamına gelmez. Bu, onay önyargısının genelleme adımıdır.",
  },
  {
    id: "t3",
    user: "gece_yolcusu",
    text: "Başka yoruma gerek yok bence.",
    target: true,
    explanation:
      "Karşıt kanıt aramayı durdurmak, onay önyargısını kilitler. Karşıt yorum, kararın düşmanı değil, testidir.",
  },
  {
    id: "t4",
    user: "sade_dusunceli",
    text: "Ben farklı bir model denedim, pil ömrü konusunda sorun yaşadım, bunu da kontrol etmenizi öneririm.",
    target: false,
    explanation: "",
  },
  {
    id: "t5",
    user: "mavi_defter",
    text: "O tek tük bir sorun, genelde herkes memnun zaten, ona takılma.",
    target: true,
    explanation:
      "Karşıt kanıtı “tek tük” diye küçümsemek, onay önyargısının savunma adımıdır. Pil ömrü sorunu, senin için önemli bir kriter olabilir.",
  },
];

export const TRAP_WRONG =
  "Bu cümle onay önyargısını beslemiyor. İpucu: Onay önyargısını besleyen cümle, mevcut fikri doğrulayan, karşıt kanıtı durduran veya küçümseyen cümledir.";

export const TRAP_COMPLETE =
  "Üçünü de buldun. Fark ettin mi? Hiçbiri yalan söylemiyor, hepsi kendi fikrini söylüyor. Sorun yalan değil, yalnızca doğrulayan bilgiyi seçmek ve karşıtı görmezden gelmek.";

export const POLL_MESSAGE =
  "“Dün gece komşumun başına geleni duydun mu? Aynı apartmanda oturan birinin hesabı boşaltılmış. Sen de aynı uygulamayı kullanıyorsun. Hemen şuraya tıkla, hesabını koru, yoksa sen de aynı duruma düşersin!”";

export const POLL_OPTIONS = [
  "Mesaj, sakin bir dille hesabı korumanın adımlarını anlatır ve resmi kaynağa yönlendirir.",
  "Mesaj, aceleyle bir bağlantıya tıklatır veya bir ödeme / bilgi ister.",
  "Mesaj, konuyu kapatır ve başka bir şeyden bahseder.",
];

export const POLL_EXPLANATION = [
  "Doğru cevap 2. Bu mesaj önce korkuyu yükseltti (“hesabı boşaltılmış”, “sen de aynı duruma düşersin”), sonra çözümü aceleyle sundu (“hemen tıkla”). Korku + acele birleşimi, duygu tuzağının klasik yapısıdır.",
  "Gerçek bir güvenlik uyarısı korkutarak acele ettirmez; sakin bir dille ne yapacağını anlatır ve seni resmi kanala yönlendirir. Bir mesaj seni korkutup hemen harekete geçiriyorsa, önce duyguyu adlandır: Bu korku. Sonra dur ve FARK ET ile bak.",
];

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  correctFeedback: string;
  wrongFeedback: string;
};

export const MINI_QUIZ_1: QuizQuestion = {
  question:
    "Bir arkadaşın sana “Bu kampanya bu gece bitiyor, hemen üye ol” dediğinde, içinde yükselen acele hissi neyi gösterir?",
  options: [
    "Yavaş düşünmenin devrede olduğunu",
    "Hızlı düşünmenin devrede olduğunu",
    "Kararın zaten doğru olduğunu",
  ],
  answerIndex: 1,
  correctFeedback:
    "Doğru. Acele hissi, hızlı düşünmenin işaretidir. Bu his, kararın yanlış olduğu anlamına gelmez; “dur ve yavaş moda geç” sinyalidir.",
  wrongFeedback:
    "Tam olmadı, tekrar dene. İpucu: Aceleyle, düşünmeden gelen tepki hızlı düşünmedir; durup karşılaştırmak ve sormak yavaş düşünmedir.",
};

export const MINI_QUIZ_2: QuizQuestion = {
  question:
    "Bir ürün hakkında yalnızca aynı fikirdeki yorumları okuyup, farklı deneyim anlatan bir yorumu “o zaten istisna” diye geçiştirirsen, bu neye örnektir?",
  options: ["Onay önyargısı", "Duygu tuzağı", "Hızlı düşünme"],
  answerIndex: 0,
  correctFeedback:
    "Doğru. Yalnızca doğrulayan bilgiyi seçmek ve karşıtı küçümsemek onay önyargısıdır. Karşıt yorumu okumak, fikrinden vazgeçmek değildir; fikrini test etmektir.",
  wrongFeedback:
    "Tam olmadı, tekrar dene. İpucu: Duygu tuzağı duyguyu yükseltir, hızlı düşünme aceleyi anlatır. Burada mesele, hangi bilginin seçildiği ve hangisinin görmezden gelindiğidir.",
};

export const MINI_QUIZ_3: QuizQuestion = {
  question:
    "“Kaçırırsan çok pişman olursun, herkes çoktan aldı” cümlesi duyduğunda, ilk yapman gereken nedir?",
  options: [
    "Hemen karar vermek",
    "Duyguyu adlandırmak ve durmak",
    "Mesajı başkalarına da göndermek",
  ],
  answerIndex: 1,
  correctFeedback:
    "Doğru. Önce duyguyu adlandırırsın: Bu heyecan mı, korku mu, pişmanlık korkusu mu? Adlandırmak hızı keser, sonra FARK ET ile bakarsın.",
  wrongFeedback:
    "Tam olmadı, tekrar dene. İpucu: Duygu yüksekken verilen karar, duygunun kararıdır. Önce duyguyu adlandırıp durmak, kararın direksiyonunu sana geri verir.",
};
