// Ders 2 içerik verisi. Metinler, içerik paketinden (ders-2-icerik-paketi.md)
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
  "Ders 1'de beyninin nasıl kandırıldığını gördün: hızlı düşünme, onay önyargısı, duygu tuzağı. Bu ders bir adım ileri gidiyor. Artık kandırma işinin alet çantasını açıyoruz: tartışmalarda kullanılan hileli akıl yürütmeler, yani safsatalar.",
  "Bu derste 3 safsata öğreneceksin: saman adam, sahte ikilem ve otoriteye başvurma. Üçü de her gün karşına çıkıyor: yorumlarda, reklamlarda, iş toplantılarında, aile sohbetlerinde.",
  "Bu dersin sonunda, bir tartışmada “burada bir hile var” diyebilecek ve hilenin adını koyabileceksin.",
];

export const ETHICS_TEXT = [
  "Bu derste öğrendiğin teknikleri başkalarını yönlendirmek, baskı kurmak veya satışta avantaj sağlamak için değil, kendini korumak için kullanacaksın. Bir tekniği tanımak, onu kullanma hakkı vermez.",
  "Bu ders kimseye psikolojik tanı koymaz, terapi değildir. İnsanları değil, mesajları ve teknikleri analiz edeceğiz.",
];

export const OBJECTIVES = [
  "Saman adam safsatasını bir tartışmada ismiyle tanır ve karşı tarafın gerçek iddiasını kendi cümleleriyle özetleyebilir.",
  "Sahte ikilemi bir mesajda işaretler ve sunulmayan üçüncü seçeneği kendisi yazar.",
  "Otoriteye başvurmanın ne zaman geçerli bir gerekçe, ne zaman safsata olduğunu ayırt eder; “kim söylüyor” yerine “kanıt ne” diye sorar.",
  "Herhangi bir tartışma mesajını FARK ET'in 6 adımıyla analiz eder.",
  "Kendi hayatından 1 tartışma örneğini karar günlüğüne FARK ET ile yazar.",
];

export const HOOK_MESSAGE = [
  "KentForum — “Şehirde bisiklet yolu” başlığı",
  "derin_dusunur: Bence şehrimizde daha çok bisiklet yolu olmalı. Trafikte hem hava kirliliği azalır hem de ulaşım rahatlar.",
  "acik_sozlu: Yani diyorsun ki arabaları yasaklayalım, herkesi bisiklete binmeye zorlayalım. Ünlü şehir plancısı Kerem Saygın bile geçen ay bunun bu şehirde işlemeyeceğini söyledi. Sen plancıdan iyi mi biliyorsun?",
];

export const HOOK_OPTIONS = [
  "acik_sozlu haklı gibi geldi.",
  "Bir tuhaflık var ama ne olduğunu bilemedim.",
  "Umursamadım.",
];

export const HOOK_AFTER =
  "Tepkin ne olursa olsun, bu normal. Tartışmalardaki hileler, ilk bakışta mantıklı görünmek için tasarlanır. Dersin sonunda aynı mesaja geri döneceğiz ve bu sefer FARK ET ile bakacağız. Aradaki farkı kendin göreceksin.";

export const HOOK_RETURN = [
  "Dersin başındaki KentForum kartını hatırlıyor musun? Şimdi aynı cümlelere bir daha bak:",
  "“Yani diyorsun ki arabaları yasaklayalım, herkesi bisiklete binmeye zorlayalım.” — Kimse arabaları yasaklamaktan bahsetmemişti. Bu, saman adam: iddia çarpıtıldı, sonra çarpıtılmış hali devrildi.",
  "“Ünlü şehir plancısı Kerem Saygın bile geçen ay bunun bu şehirde işlemeyeceğini söyledi.” — Kanıt yok, sadece unvan var. Bu, otoriteye başvurma.",
  "İlk tepkinle şimdiki bakışın arasındaki fark, bu dersin kazancıdır.",
];

export type MicroLesson = {
  id: string;
  title: string;
  paragraphs: string[];
  diagramTitle: string;
  diagram: string;
  rule: string;
};

export const MICRO_1: MicroLesson = {
  id: "mikro-1",
  title: "Mikro ders 1 — Saman adam",
  paragraphs: [
    "Saman adam, bir tartışmada karşı tarafın söylediğini çarpıtıp, yerine yıkması kolay bir versiyon koymaktır. Gerçek iddiayla uğraşmak zordur; onun yerine samandan bir adam yaparsın, onu devirirsin, “kazandım” dersin. Ama devirdiğin şey, karşı tarafın söylediği şey değildir.",
    "Kancadaki karta bak: derin_dusunur “daha çok bisiklet yolu olsun” dedi. acik_sozlu bunu “arabaları yasaklayalım, herkesi bisiklete zorlayalım” diye çevirdi. Kimse arabaları yasaklamaktan bahsetmemişti. Saman adam kuruldu, sonra o devrildi.",
    "Bu hile neden işler? Çünkü gerçek iddiayı çürütmek emek ister; çarpıtılmış versiyonu çürütmek kolaydır. Üstelik dinleyen, çarpıtmanın farkına varmazsa, “karşı taraf saçmalıyor” diye düşünür. Hızlı düşünme devrededir: kulağa mantıklı gelen ilk çeviri kabul edilir.",
    "Bir de duygusal tarafı var. İddian çarpıtılınca savunmaya geçersin, “ben öyle demedim” diye uğraşırsın. Tartışma, asıl konudan uzaklaşır. Saman adamı kuran kişi de tam bunu ister: konuyu değil, seni yormak.",
    "Başka bir örnek: Biri “okullarda öğle arası biraz uzatılsın” der. Karşısındaki “Yani çocuklar hiç ders çalışmasın mı istiyorsun?” diye cevap verir. Kimse derslerin kalkmasından bahsetmedi. Saman adam yine iş başında.",
    "Saman adamı kuran kişi her zaman kötü niyetli değildir. Bazen insan, karşı tarafı yanlış anlar ve çarpıtmanın farkında bile değildir. O yüzden bu teknikte soru şudur: “Bu, gerçekten onun söylediği şey mi?”",
  ],
  diagramTitle: "Saman adam — kısa tanım",
  diagram:
    "Saman adam: Karşı tarafın iddiasını çarpıtıp, çarpıtılmış ve yıkması kolay versiyonla tartışmak.",
  rule: "Karşı tarafın iddiasını, onun kendi cümleleriyle özetleyebiliyor musun? Özetleyemiyorsan, yıkmaya çalıştığın şey saman adam olabilir.",
};

export const MICRO_2: MicroLesson = {
  id: "mikro-2",
  title: "Mikro ders 2 — Sahte ikilem",
  paragraphs: [
    "Sahte ikilem, sana aslında ikiden çok seçenek varken, yalnızca iki seçenek sunmaktır. “Ya bu, ya şu.” Üçüncü, dördüncü seçenekler masadan sessizce kaldırılır ve sen kalan ikisinden birini seçmek zorunda hissedersin.",
    "Kalıp hep aynıdır: “Ya benimlesin, ya karşımdasın.” “Ya şimdi alırsın, ya fırsatı kaçırırsın.” “Ya bu telefonu alırsın, ya da modası geçmiş biri olursun.” Dikkat et: Bu cümlelerin hiçbirinde üçüncü bir yol yok. Ama gerçek hayatta üçüncü yollar her zaman vardır.",
    "Bu hile neden işler? Çünkü iki seçenek arasında kalmak, beyni hızlı moda sokar. Seçenekleri sorgulamak yerine, verilen iki seçenekten “az kötü” olanı seçmeye odaklanırsın. Oysa asıl soru şudur: Bu iki seçenek dışında bir yol yok mu?",
    "Sahte ikilemin en sinsi hali, seçeneklerden birinin korkutucu, diğerinin “kurtarıcı” gösterilmesidir. Korku yükselince düşünme kısalır; Ders 1'deki duygu tuzağını hatırla. İkisi el ele çalışır.",
    "Başka bir örnek: Bir mağaza mesajı: “Ya bu kremi alırsın ya da cildin yaşlanmaya devam eder.” Oysa üçüncü seçenekler var: başka bir ürün, hiçbir ürün, bir uzmana danışmak. Ama mesajda bunlar yok.",
    "Gerçek ikilemler de vardır ve onlar safsata değildir. Bazen gerçekten iki seçenek olur: “Yağmur yağıyor; ya şemsiye al ya da ıslanırsın.” Safsata, seçeneklerin gizlendiği yerdedir. Soru her zaman aynıdır: “Başka bir yol gerçekten yok mu?”",
  ],
  diagramTitle: "Sahte ikilem — kısa tanım",
  diagram:
    "Sahte ikilem: İkiden çok seçenek varken yalnızca iki seçenek sunup üçüncü yolları gizlemek.",
  rule: "Sana iki seçenek sunulduğunda, üçüncü seçeneği sen yaz.",
};

export const MICRO_3: MicroLesson = {
  id: "mikro-3",
  title: "Mikro ders 3 — Otoriteye başvurma",
  paragraphs: [
    "Otoriteye başvurma, bir iddiayı kanıtla değil, “bunu önemli biri söyledi” ile desteklemektir. “Ünlü oyuncu öneriyor.” “Doktorlar tavsiye ediyor.” “Bilim insanları diyor.” Kulağa güçlü gelir, değil mi? Ama dikkat: Söyleyenin kim olduğu, söylenenin doğru olduğu anlamına gelmez.",
    "Burada ince bir ayrım var ve bu ayrım çok önemli. Bir uzmanın, kendi alanında, kanıt göstererek konuşması safsata değildir. Bir doktorun “bu ilacın şu etkileri araştırmalarda görüldü” demesiyle, ünlü bir oyuncunun “bu vitamini içiyorum, harika” demesi aynı şey değildir. Birincisinde kanıt var, ikincisinde sadece ün var.",
    "Peki bu hile neden işler? Çünkü beynimiz kestirme yolları sever: “Bu kişi başarılı, demek ki bu konuda da haklıdır.” Oysa başarı bir alanda olur, iddia başka bir alandadır. Ünlü bir futbolcunun beslenme önerisi, futbol bilgisi kadar güvenilir değildir.",
    "Bir de isimsiz otorite oyunu var: “Doktorlar öneriyor.” Hangi doktorlar? Kaç doktor? Ne öneriyor, hangi kanıtla? İsim yok, sayı yok, kanıt yok. Sadece “doktorlar” kelimesinin ağırlığı var.",
    "Başka bir örnek: Kurgusal bir reklam: “9 ünlü diş hekimi PırıltıDiş macununu öneriyor!” Hangi 9 hekim? Neye göre öneriyor? Araştırma nerede? Cevap yok. Ama “9” sayısı ve “diş hekimi” unvanı, kanıtın yerini alıyor.",
    "Uzmanlara güvenmek her zaman yanlış değildir; gerçek uzmanlık ve kanıt değerlidir. Safsata, unvanın kanıtın yerine geçmesidir. O yüzden iki soruyu hiç atlama: Bu kişi bu konuda gerçekten uzman mı? Kanıt ne?",
  ],
  diagramTitle: "Otoriteye başvurma — kısa tanım",
  diagram:
    "Otoriteye başvurma: Bir iddiayı kanıt yerine unvanla, ünle veya “uzmanlar diyor” kalıbıyla desteklemek.",
  rule: "Ünlü biri söyledi diye değil, kanıt gösterdi diye inan. Şu iki soruyu sor: Bu kişi bu konuda gerçekten uzman mı? Kanıt ne?",
};

export type MatchPair = { situation: string; answer: string };

export const MATCH_CATEGORIES = ["Gerçek iddia", "Çarpıtma"];

export const MATCH_PAIRS: MatchPair[] = [
  { situation: "“Bu projeye biraz daha bütçe ayıralım.”", answer: "Gerçek iddia" },
  { situation: "“Parayı sokağa atalım yani?”", answer: "Çarpıtma" },
  { situation: "“Toplantılar 30 dakika olsun.”", answer: "Gerçek iddia" },
  { situation: "“Hiç konuşmayalım o zaman?”", answer: "Çarpıtma" },
  { situation: "“Akşam yemeğini evde yiyelim.”", answer: "Gerçek iddia" },
  {
    situation: "“Dışarıda yemek yemek yasaklansın mı diyorsun?”",
    answer: "Çarpıtma",
  },
];

export const MATCH_CORRECT =
  "Hepsi doğru. Fark ettin mi? Çarpıtmalarda iddia hep büyütülüyor: “biraz daha bütçe” birden “parayı sokağa atmak” oluyor. Bu büyüme, saman adamın imzasıdır.";

export const MATCH_WRONG =
  "Bu eşleşme tam olmadı, tekrar dene. İpucu: Gerçek iddia, söylenenin ta kendisidir; çarpıtma ise iddianın büyütülmüş, abartılmış halidir.";

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
    user: "YeşilVadi Turizm",
    text: "Yaz geliyor!",
    target: false,
    explanation: "",
  },
  {
    id: "t2",
    user: "YeşilVadi Turizm",
    text: "Ya bu yaz bizimle tatile gelirsin, ya da yılın en güzel günlerini evde çürütürsün.",
    target: true,
    explanation:
      "Sahte ikilem: Üçüncü yollar (başka bir tur, evde güzel bir yaz, hiçbir şey yapmamak) gizlenmiş, yalnızca iki seçenek bırakılmış.",
  },
  {
    id: "t3",
    user: "YeşilVadi Turizm",
    text: "Erken rezervasyon bitiyor, karar senin.",
    target: false,
    explanation: "",
  },
  {
    id: "t4",
    user: "YeşilVadi Turizm",
    text: "Unutma: Tatile çıkmayan, dinlenmeyi hak etmiyor demektir.",
    target: true,
    explanation:
      "Sahte ikilem: “Ya tatil, ya değersizlik” dayatması. Dinlenmenin tek yolu bu tur değil; cümle, seçenekleri ikiye indiriyor.",
  },
];

export const TRAP_WRONG =
  "Bu cümle sahte ikilem kurmuyor. İpucu: Sahte ikilem kuran cümle, sana “ya bu, ya şu” diye iki seçenek dayatır ve üçüncü yolları gizler.";

export const TRAP_COMPLETE =
  "İkisini de buldun. Fark ettin mi? İkisi de aynı oyun: seçenekler ikiye indirilmiş, üçüncü yollar gizlenmiş. Artık “ya … ya …” kalıbını duyduğunda durup üçüncü seçeneği arayacaksın.";

export const POLL_MESSAGE =
  "“ZindeÇay — Doğal Karışım. Ünlü beslenme uzmanı Derya Aksoy öneriyor! 'Sabahları bir fincan, gün boyu enerji.' Binlerce kişi çoktan denedi.”";

export const POLL_OPTIONS = [
  "Mesaj, çayın içeriğini ve etkisine dair bir araştırma sonucunu gösterir.",
  "Mesaj, Derya Aksoy'un daha çok sözünü gösterir ve indirim kodu verir.",
  "Mesaj, çayın fiyatı ve kargo bilgisini verir.",
];

export const POLL_EXPLANATION = [
  "Doğru cevap 2. Bu tür mesajlar kanıt göstermez, otoriteyi büyütür: daha çok ünlü sözü, daha çok “binlerce kişi”. Kanıt sorusu cevapsız kalır.",
  "Gerçek soru hep aynıdır: İçinde ne var, etkisi araştırmayla gösterildi mi? Ünlü ismi bu sorunun cevabı değildir.",
];

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  correctFeedback: string;
  wrongFeedback: string;
};

export const MINI_QUIZ_1: QuizQuestion = {
  question: "Hangisi saman adam örneğidir?",
  options: [
    "“Bence bu film uzundu.” — “Filmi hiç beğenmedin yani?”",
    "“Bence bu film uzundu.” — “Hangi sahneler gereksizdi sence?”",
    "“Bence bu film uzundu.” — “Ben de bazı yerlerde sıkıldım.”",
  ],
  answerIndex: 0,
  correctFeedback:
    "Doğru. “Uzun” demek “hiç beğenmedim” demek değildir; iddia büyütülüp çarpıtıldı.",
  wrongFeedback:
    "Tekrar dene. Saman adamda iddia çarpıtılır: “uzun” birden “hiç beğenmedim” olur. Hangi seçenekte iddia büyütüldü?",
};

export const MINI_QUIZ_2: QuizQuestion = {
  question: "Hangisinde sahte ikilem vardır?",
  options: [
    "“Yağmur yağıyor; ya şemsiye al ya da ıslanırsın.”",
    "“Ya bu kursu alırsın ya da hayatın boyunca kandırılırsın.”",
    "“Çay mı istersin kahve mi?”",
  ],
  answerIndex: 1,
  correctFeedback:
    "Doğru. Üçüncü seçenekler gizlenmiş: kursu almadan da öğrenmek mümkün, ayrıca “hayatın boyunca” abartısı korkuyu yükseltiyor.",
  wrongFeedback:
    "Tekrar dene. Sahte ikilemde seçenekler gizlenir. Hangi seçenekte üçüncü bir yol varken yokmuş gibi gösteriliyor?",
};

export const MINI_QUIZ_3: QuizQuestion = {
  question: "Hangisi safsata DEĞİLDİR, yani otoritenin doğru kullanımıdır?",
  options: [
    "“Ünlü oyuncu Derya Arslan bu vitamini içiyor, sen de iç.”",
    "“Kardiyolog Dr. Elif Torun, bu ilacın etkilerini 3 araştırmaya dayanarak anlatıyor.”",
    "“Doktorlar öneriyor.” (hangi doktorlar, hangi kanıtla belirtilmemiş)",
  ],
  answerIndex: 1,
  correctFeedback:
    "Doğru. İkinci seçenekte unvanın yanında kanıt var: 3 araştırma. Otorite kanıtla birlikte gelirse safsata değildir.",
  wrongFeedback:
    "Tekrar dene. İpucu: Ün mü var, kanıt mı var? Hangi seçenekte unvanın yanında somut kanıt da gösteriliyor?",
};
