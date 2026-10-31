// Ders 4 içerik verisi. Metinler, içerik paketinden (ders-4-icerik-paketi.md)
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
  "Ders 1'de beynini, Ders 2'de tartışma hilelerini, Ders 3'te ekranındaki oyunları gördün. Bu ders, paranın el değiştirdiği yere gidiyor: satış sayfaları, üyelik ekranları ve sözleşmeler.",
  "Bu derste 3 teknik öğreneceksin: acele ve kıtlık baskısı, karanlık desenler ve küçük yazılar. Üçü de her gün karşına çıkıyor; çoğu zaman fark etmeden içinden geçiyorsun.",
  "Bu dersin sonunda, bir “Hemen Al” düğmesine basmadan önce durup iki soru sorabileceksin.",
];

export const ETHICS_TEXT = [
  "Bu derste öğrendiğin teknikleri satışta, işte veya ilişkilerinde başkalarına karşı kullanmak için değil, kendini korumak için kullanacaksın. Bir tuzağı tanımak, onu kurma izni değildir.",
  "Bu ders kimseye psikolojik tanı koymaz, terapi değildir. İnsanları değil, mesajları ve teknikleri analiz edeceğiz.",
];

export const OBJECTIVES = [
  "Bir satış mesajındaki acele/kıtlık baskısını tanır; gerçek kıtlıkla üretilmiş baskıyı ayırır.",
  "Bir arayüzdeki karanlık deseni ismiyle tanır (gizli maliyet, zorunlu devamlılık, onay utandırma, çıkış labirenti, önceden işaretli kutu).",
  "Bir sözleşme veya kampanya metninde küçük yazıyı bulur; iptal, yenileme ve ücret maddelerini kontrol eder.",
  "Satış mesajlarını FARK ET'in 6 adımıyla analiz eder.",
  "Kendi hayatından 1 satış örneğini karar günlüğüne FARK ET ile yazar.",
];

export const HOOK_MESSAGE = [
  "Sınırlı süreli fırsat sayfası:",
  "HızlıSepet: ⚡ SON 2 SAAT! Akıllı Bileklik X2'de %50 indirim! Stokta son 3 adet — senin için ayrıldı! Şu an 3.482 kişi bakıyor! [Hemen Al]",
];

export const HOOK_OPTIONS = [
  "Hemen almak istedim.",
  "Bir tuhaflık var ama ne olduğunu bilemedim.",
  "Umursamadım.",
];

export const HOOK_AFTER =
  "Tepkin ne olursa olsun, bu normal. Satış sayfaları, ilk bakışta acele ettirmek için tasarlanır. Dersin sonunda aynı mesaja geri döneceğiz ve bu sefer FARK ET ile bakacağız. Aradaki farkı kendin göreceksin.";

export const HOOK_RETURN = [
  "Dersin başındaki fırsat sayfasını hatırlıyor musun? Şimdi aynı karta bir daha bak:",
  "“SON 2 SAAT!” — Sayaç iddiadır; bitince ne olduğunu kimse göstermiyor. Bu, üretilmiş acele.",
  "“Stokta son 3 adet — senin için ayrıldı!” — Rezervasyon kaydı yoksa bu, kıtlık baskısıdır.",
  "“3.482 kişi bakıyor!” — Kalabalık kanıt değildir; sosyal kanıt tuzağı (Ders 3'ten tanıdık).",
  "“Hemen Al” düğmesinin altında ne yazdığını hiç görmedin — küçük yazı ve karanlık desenler orada gizlenir.",
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
  title: "Mikro ders 1 — Acele ve kıtlık baskısı",
  paragraphs: [
    "Acele ve kıtlık baskısı, satıcının “hemen karar ver” demesidir: sayaçlar, “stokta son 3 adet”, “bugün son gün”, “senin için ayrıldı”. Baskı bazen gerçektir, ama çoğu zaman üretilmiştir. Bu derste ikisini ayırmayı öğreneceksin.",
    "Kancadaki karta bak: “SON 2 SAAT!” Sayaç bitince ne oluyor, kimse göstermiyor. “Stokta son 3 adet” — gerçekten mi, yoksa her ziyaretçiye mi aynı sayı gösteriliyor? “Senin için ayrıldı” — bir rezervasyon kaydı var mı? “3.482 kişi bakıyor” — bu sayı doğrulanabilir mi? Bu soruların hiçbiri kartta yok. Baskı var, kanıt yok.",
    "Bu hile neden işler? Çünkü beynin kaybetmekten nefret eder. “Kaçıracağım” hissi, Ders 1'deki hızlı düşünmeyi çalıştırır: acele, yavaş modu kapatır. Satıcı bunu bilir; o yüzden sayaç koyar.",
    "Gerçek kıtlıkla üretilmiş baskıyı şöyle ayırırsın: Gerçek kıtlık doğrulanabilir — biletin koltuk sayısı, kontenjanın doluluk oranı herkese açıktır ve bitince gerçekten biter. Üretilmiş baskının işaretleri ise şunlardır: sayaç yenilenince başa döner, “bugün son gün” her gün tekrarlanır, stok sayısı asla bitmez, “senin için ayrıldı”nın kaydı yoktur.",
    "Somut bir örnek: Bir sitede “Bugün son gün!” bandı var. Yarın giriyorsun, aynı bant yine orada: “Bugün son gün!” Baskı üretilmiş; ürün bitmemiş, sadece sabrın bitirilmek istenmiş.",
    "Dürüst not: İndirimlerin hepsi yalan değildir; gerçek kampanyalar da vardır. Sorun baskının kendisinde değil, düşünme süreni çalmasındadır. Gerçek fırsat da olsa, karar senin hızında verilir.",
  ],
  diagramTitle: "Acele ve kıtlık baskısı — kısa tanım",
  diagram:
    "Acele ve kıtlık baskısı: 'Hemen karar ver' hissi yaratmak için sayaç, son adet ve son gün gibi üretilmiş baskı unsurları kullanmak.",
  rule: "Sayaç ve stok sayısı, satıcının iddiasıdır; kanıt değil. Acele hissettiğinde dur.",
};

export const MICRO_2: MicroLesson = {
  id: "mikro-2",
  title: "Mikro ders 2 — Karanlık desenler",
  paragraphs: [
    "Karanlık desen, arayüz hilesidir: tasarımın, seni satıcının istediği düğmeye yönlendirmesidir. “Karanlık” denmesinin sebebi, niyetin gizli olmasıdır. Ekran sana yardım ediyormuş gibi görünür; oysa seni yönlendiriyordur.",
    "En yaygın karanlık desenleri ismiyle tanı: Gizli maliyet — son adımda sepete eklenen, başta görünmeyen ücretler. Zorunlu devamlılık — “ücretsiz deneme” için kart bilgisi istenir, süre bitince ücret otomatik başlar. Onay utandırma — vazgeçme düğmesinde utandıran yazı: “Hayır, fırsatları kaçırmak istiyorum.” Çıkış labirenti — üyelik 1 tıkla, iptal 10 adımlı formla. Önceden işaretli kutu — istemediğin ek ürün veya bülten, sen işaretlemeden sepette.",
    "Bu hileler neden işler? Çünkü yorgunluk ve dikkatsizlikten beslenirler. Hızlı mod “Devam”a basar, küçük yazıyı okumaz, utandıran düğmeye basmamak için vazgeçmekten vazgeçer. Tasarım, tam da bu anları kollar.",
    "Somut bir örnek: “7 günlük ücretsiz deneme için kart bilgini gir.” 7 gün sonra aylık ücret otomatik başlar; iptal için 5 adımlı bir formu doldurman, sonra müşteri hizmetlerini araman gerekir. “Ücretsiz”di; bedeli, çıkışta ödedin.",
    "Bu teknikleri başkasına uygulamak için değil, tanımak için öğreniyorsun. Bir karanlık deseni ismiyle tanımak, onun etkisini yarıya indirir; çünkü artık “ben mi dikkatsizim?” diye kendine kızmazsın, “bu ekran beni yönlendiriyor” dersin.",
    "Savunma basittir: Her ekranda şunu sor — “Vazgeçmek ne kadar kolay?” Şüpheli kutuların işaretini kaldır. Son adımdaki toplam tutarı, ilk adımdaki fiyatla karşılaştır. Fark varsa, gizli maliyet vardır.",
  ],
  diagramTitle: "Karanlık desenler — kısa tanım",
  diagram:
    "Karanlık desen: Seni satıcının istediği düğmeye yönlendiren, niyeti gizli arayüz hilesi.",
  rule: "Düğmeye basmadan önce sor: Benden ne isteniyor ve vazgeçmek ne kadar kolay?",
};

export const MICRO_3: MicroLesson = {
  id: "mikro-3",
  title: "Mikro ders 3 — Küçük yazılar",
  paragraphs: [
    "Küçük yazılar, kimsenin okumadığı metinlerde gizlenen gerçek koşullardır: sözleşmeler, üyelik koşulları, kampanya detayları. Büyük puntolar vaat eder, küçük puntolar gerçeği söyler.",
    "Küçük yazıda neler gizlenir? Otomatik yenileme (üyeliğin kendiliğinden uzaması), taahhüt süresi (kaç ay bağlı kalacağın), cayma ve iptal bedeli (erken ayrılırsan ödeyeceğin tutar), “ücretsiz”in koşulları (ne zaman ücretliye döneceği), fiyat artış maddeleri (indirim bitince ne olacağı).",
    "Somut bir örnek: “İlk 3 ay %50 indirimli!” Küçük yazı: “4. aydan itibaren tam fiyat (ayda 449 TL), 24 ay taahhüt, erken iptalde cayma bedeli uygulanır.” Büyük yazı 149 TL diyor; küçük yazı 24 ay diyor. Kararını hangisine göre vereceksin?",
    "Bu hile neden işler? Çünkü metin uzundur, punto küçüktür ve “zaten herkes kabul ediyor” hissi vardır. Hızlı mod “Kabul Et”e basar; okumak, yavaş modun işidir ve yavaş mod yorgundur.",
    "Tamamını okumak zorunda değilsin. Üç maddeyi ara: iptal, yenileme, ücret. Metinde “otomatik”, “taahhüt”, “cayma” kelimelerini bul; o cümleleri oku. Bu üçü, kararını değiştirebilecek her şeyi kapsar.",
    "Dürüst not: Küçük yazı her zaman tuzak değildir; bazen sadece detaydır. Ama koşul oradadır. Kararını, görmediğin bir metne göre verme.",
  ],
  diagramTitle: "Küçük yazılar — kısa tanım",
  diagram:
    "Küçük yazılar: Sözleşme ve kampanya metinlerinde gizlenen gerçek koşullar; özellikle iptal, yenileme ve ücret maddeleri.",
  rule: "İmzalamadan ya da ödemeden önce küçük yazıyı ara: özellikle iptal, yenileme ve ücret maddelerini.",
};

export type MatchPair = { situation: string; answer: string };

export const MATCH_CATEGORIES = ["Gerçek kıtlık", "Üretilmiş baskı"];

export const MATCH_PAIRS: MatchPair[] = [
  {
    situation: "“Biletler tükenmek üzere; kalan koltuk sayısı sitede güncel ve herkese açık.”",
    answer: "Gerçek kıtlık",
  },
  {
    situation: "“SON 1 SAAT! (sayacı yenileyince süre başa dönüyor)”",
    answer: "Üretilmiş baskı",
  },
  {
    situation: "“Stokta son 2 adet — mağaza envanteri herkesin görebileceği şekilde yayınlanıyor.”",
    answer: "Gerçek kıtlık",
  },
  {
    situation: "“Senin için ayrıldı! (hiçbir rezervasyon kaydı yok)”",
    answer: "Üretilmiş baskı",
  },
  {
    situation: "“Kampanya 31 Aralık'ta bitiyor; tarih sözleşmede yazıyor.”",
    answer: "Gerçek kıtlık",
  },
  {
    situation: "“Bugün son gün! (yarın aynı mesaj yine geliyor)”",
    answer: "Üretilmiş baskı",
  },
];

export const MATCH_CORRECT =
  "Hepsi doğru. Gerçek kıtlık doğrulanabilir; üretilmiş baskı doğrulanamaz. Sayaç başa dönüyorsa, “son gün” her gün geliyorsa, stok asla bitmiyorsa — baskı üretilmiştir.";

export const MATCH_WRONG =
  "Bu eşleşme tam olmadı, tekrar dene. İpucu: Doğrulanabilen (envanter, koltuk sayısı, sözleşmedeki tarih) gerçek; doğrulanamayan, tekrarlanan, asla bitmeyen baskı üretilmiş.";

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
    user: "HızlıSepet",
    text: "7 günlük ücretsiz deneme başlat — kart bilgini şimdi gir.",
    target: true,
    explanation:
      "Zorunlu devamlılık: “Ücretsiz” deneme için kart bilgisi isteniyorsa, deneme bitiminde ne olacağını küçük yazı belirler — burada otomatik ücret.",
  },
  {
    id: "t2",
    user: "HızlıSepet",
    text: "Deneme bitiminde aylık 249 TL otomatik çekilir; iptal için 5 adımlı formu doldur.",
    target: true,
    explanation:
      "Çıkış labirenti: Üyelik 1 tıkla, iptal 5 adımlı formla. Vazgeçmenin zorluğu, tasarımın niyetini gösterir.",
  },
  {
    id: "t3",
    user: "HızlıSepet",
    text: "Deneme süresince tüm özellikler açık olacak.",
    target: false,
    explanation: "",
  },
  {
    id: "t4",
    user: "HızlıSepet",
    text: "Dilediğinde müşteri hizmetlerini arayabilirsin.",
    target: false,
    explanation: "",
  },
];

export const TRAP_WRONG =
  "Bu cümle karanlık desen içermiyor. İpucu: Karanlık desen, seni satıcının istediğine yönlendiren arayüz hilesidir — kart bilgisi isteme ve zor iptal gibi.";

export const TRAP_COMPLETE =
  "İkisini de buldun. Karanlık desenin iki işareti: girişte istenen kart bilgisi ve çıkıştaki labirent. Bunları gördüğünde ekran sana değil, satıcıya çalışıyor demektir.";

export const POLL_MESSAGE =
  "“Kurgusal reklam: FitForm uygulaması: 7 gün ÜCRETSİZ dene! [Hemen Başla] (küçük yazı: *deneme bitiminde Pro üyelik otomatik başlar, aylık 249 TL.)”";

export const POLL_OPTIONS = [
  "7 gün ücretsiz kullanım, sonra sorulur",
  "Kart bilgisi istenir, deneme bitiminde otomatik ücret başlar",
  "Uygulama hediye edilir",
];

export const POLL_EXPLANATION = [
  "Doğru cevap 2. “Ücretsiz dene” + küçük yazıdaki otomatik yenileme = zorunlu devamlılık. Kart bilgisi isteniyorsa, “ücretsiz” bitiminde ne olacağını küçük yazı belirler.",
  "Kuralı hatırla: Düğmeye basmadan önce sor — benden ne isteniyor ve vazgeçmek ne kadar kolay?",
];

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  correctFeedback: string;
  wrongFeedback: string;
};

export const MINI_QUIZ_1: QuizQuestion = {
  question: "Hangisi üretilmiş kıtlık örneğidir?",
  options: [
    "Sayaç yenilenince başa dönüyor.",
    "Stok sayısı envanterle doğrulanabilir.",
    "Kampanya tarihi sözleşmede yazıyor.",
  ],
  answerIndex: 0,
  correctFeedback:
    "Doğru. Başa dönen sayaç, baskının üretildiğini gösterir.",
  wrongFeedback:
    "Tekrar dene. İpucu: Doğrulanamayan, tekrarlanan, asla bitmeyen baskı üretilmiştir.",
};

export const MINI_QUIZ_2: QuizQuestion = {
  question: "Hangisi karanlık desen örneğidir?",
  options: [
    "Üyelik 1 tıkla, iptal 10 adımlı formla",
    "Fiyatın sepette açıkça yazması",
    "Ücretsiz kargo bilgisinin görünmesi",
  ],
  answerIndex: 0,
  correctFeedback: "Doğru. Kolay giriş + zor çıkış = çıkış labirenti.",
  wrongFeedback:
    "Tekrar dene. İpucu: Karanlık desen, seni satıcının istediğine yönlendiren arayüz hilesidir.",
};

export const MINI_QUIZ_3: QuizQuestion = {
  question: "İmzalamadan önce küçük yazıda ilk ne aranır?",
  options: [
    "İptal, yenileme ve ücret maddeleri",
    "Yazı tipi ve renkler",
    "Sayfa numarası",
  ],
  answerIndex: 0,
  correctFeedback:
    "Doğru. Bu üç madde, kararını değiştirebilecek her şeyi kapsar.",
  wrongFeedback:
    "Tekrar dene. İpucu: Kararını etkileyen şey tasarım değil, koşullardır.",
};
