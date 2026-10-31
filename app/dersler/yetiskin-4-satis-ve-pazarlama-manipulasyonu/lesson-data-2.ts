// Ders 4 içerik verisi, ikinci bölüm: senaryo, tersine yazma, çıkış bileti,
// transfer, rubrik, günlük ve kapanış. Metinler içerik paketindendir.

export const SCENARIO_TEXT = [
  "Bir arkadaşından mesaj geldi. Okuyorsun:",
  "“Kanka bu uygulamaya bak, 7 gün ücretsiz deneme var! Link atıyorum, kampanya bu gece bitiyormuş, acele et!!”",
  "Mesajda birden fazla teknik aynı anda çalışıyor olabilir. Ne yaparsın?",
];

export type BranchChoice = {
  id: string;
  label: string;
  result: string;
  feedback: string;
  isBest: boolean;
};

export const BRANCH_CHOICES: BranchChoice[] = [
  {
    id: "a",
    label: "Hemen kaydol.",
    result:
      "Kaydoldun, kart bilgini girdin. Şimdi durup bakalım: Bu mesajda hangi tetikleyiciler vardı? “Ücretsiz deneme” (karanlık desen — kart bilgisi istendi, deneme bitiminde ne olacağı küçük yazıda), “kampanya bu gece bitiyor” (üretilmiş acele — yarın da aynı mesaj gelebilir), “acele et” (hızlı mod düğmesi). Üçü de düşünme süreni çaldı.",
    feedback:
      "Karar yanlış olmayabilir, ama koşulları görmeden verildi. Bir dahaki sefere kaydolmadan önce küçük yazıyı bulmak, kararı sana geri verir.",
    isBest: false,
  },
  {
    id: "b",
    label: "Arkadaşına sor: “Sen denedin mi, memnun musun?”",
    result:
      "Mert “dün kaydoldum, daha kullanmadım” dedi. Dikkat: Mert de küçük yazıyı okumamış; onun deneyimi, koşulları bilmiyor. Bir kişinin merakı, kanıt değildir — hele o kişi de aceleyle kaydolduysa.",
    feedback:
      "Arkadaşına sormak güzel bir refleks, ama soruyu bir adım ileri taşı: “Küçük yazıda ne yazıyordu, iptal nasıl yapılıyor?” Koşulları bilmeyen birine sormak, koşulları öğrenmek değildir.",
    isBest: false,
  },
  {
    id: "c",
    label: "Dur, FARK ET ile analiz et, sonra karar ver.",
    result:
      "Durdun ve adımları uyguladın: Fren: Acele hissi var (“bu gece bitiyor”, “acele et”) — bu hızlı mod işareti. Duruyorum. Amaç: Bu mesaj benden ne istiyor? Hemen kaydolmamı ve kart bilgimi girmemi. Referans: Mert'in çıkarı yok, ama bilgisi de yok; küçük yazıyı o da okumamış. Kanıt: Koşullar nerede? Küçük yazıda ne yazıyor — otomatik yenileme var mı, iptal nasıl? Bunları görmeden kanıt yok. Etki: Kaydolursam kart bilgim sistemde olur; unutursam otomatik ücret başlar. Kaydolmazsam hiçbir şey kaybetmem. Tercih: Değerlerime göre kararım: Koşulları görmeden kaydolmam. Önce küçük yazıyı bulurum.",
    feedback:
      "Bu seçim, bu dersin tam olarak öğrettiği şeydir: aceleyi durdur, karanlık deseni tanı, küçük yazıyı bul. Karar yine senin — ama bu sefer senin kararın.",
    isBest: true,
  },
];

export const SCENARIO_CLOSING =
  "Fark ettin mi? Üç seçimde de aynı mesaj vardı, değişen tek şey senin hızındı. Hız değişince karar değişti. FARK ET, hızı değiştirmenin aracıdır.";

export const REVERSE_TECHNIQUES = [
  "Acele ve kıtlık baskısı",
  "Karanlık desenler",
  "Küçük yazılar",
];

export const REVERSE_TRIGGERS = [
  "Sayaç",
  "Son adet",
  "Ücretsiz deneme",
  "Otomatik yenileme",
  "İptal labirenti",
  "Onay utandırma",
];

export const REVERSE_EXAMPLE_MESSAGE =
  "“SON 1 SAAT! Ücretsiz deneme için hemen kaydol — kart bilgini gir, vazgeçmek istersen sonra iptal edersin!”";

export const REVERSE_EXAMPLE_BREAKDOWN = [
  "Fren: Acele ve “kaçırma” hissi uyandı, durdum.",
  "Amaç: Benden hemen kaydolmamı ve kart bilgimi girmemi istiyor.",
  "Referans: Konuşan satıcının kendisi; çıkarı kaydolmam.",
  "Kanıt: “Ücretsiz”in koşulu yok; deneme bitiminde ne olacağı, iptalin nasıl yapılacağı belirsiz.",
  "Etki: Kaydolursam kart bilgim sistemde kalır; unutursam otomatik ücret başlar.",
  "Tercih: Kararım: Koşulları görmeden kaydolmam; önce küçük yazıyı ararım.",
];

export const REVERSE_DONE =
  "Tebrikler. Tuzağı kurmayı bilen, tuzağı tanımakta da ustalaşır. Yazdığın metin kaybolmadı, günlüğünle bağlantılı duruyor.";

export type ExitQuestion = {
  technique: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  remedialTitle: string;
  remedialText: string;
};

export const EXIT_QUESTIONS: ExitQuestion[] = [
  {
    technique: "Acele ve kıtlık baskısı",
    question: "Sayacı yenileyince süre başa dönüyorsa bu nedir?",
    options: ["Üretilmiş baskı", "Gerçek kıtlık", "Teknik hata"],
    answerIndex: 0,
    explanation:
      "Sayaç iddiadır, kanıt değil. Başa dönen sayaç, baskının üretildiğini gösterir.",
    remedialTitle: "Acele ve kıtlık baskısı — ek çalışma: Gerçek kıtlıkla üretilmiş baskıyı ayırmak",
    remedialText:
      "Gerçek kıtlık doğrulanabilir: envanter, koltuk sayısı, sözleşmedeki tarih. Sayaç başa dönüyorsa, “son gün” her gün geliyorsa, stok asla bitmiyorsa — baskı üretilmiştir.",
  },
  {
    technique: "Karanlık desenler",
    question: "Üyelik 1 tıkla, iptal 10 adımlı formla oluyorsa bu nedir?",
    options: ["Çıkış labirenti (karanlık desen)", "Normal tasarım", "Güvenlik önlemi"],
    answerIndex: 0,
    explanation:
      "Kolay giriş + zor çıkış = çıkış labirenti. Vazgeçmenin zorluğu, tasarımın niyetini gösterir.",
    remedialTitle: "Karanlık desenler — ek çalışma: 5 deseni ismiyle tanımak",
    remedialText:
      "Beş desen: gizli maliyet, zorunlu devamlılık, onay utandırma, çıkış labirenti, önceden işaretli kutu. Hepsinin ortak sorusu: “Vazgeçmek ne kadar kolay?”",
  },
  {
    technique: "Küçük yazılar",
    question: "İmzalamadan önce küçük yazıda ilk ne aranır?",
    options: ["İptal, yenileme ve ücret maddeleri", "Yazı tipi ve renkler", "Sayfa numarası"],
    answerIndex: 0,
    explanation:
      "Üç kelime: iptal, yenileme, ücret. Kararını değiştirebilecek her şey oradadır.",
    remedialTitle: "Küçük yazılar — ek çalışma: 3 kritik maddeyi bulmak",
    remedialText:
      "Metinde “otomatik”, “taahhüt”, “cayma” kelimelerini bul; o cümleleri oku. Tamamını okumak zorunda değilsin — bu üç madde yeter.",
  },
];

export const EXIT_ALL_CORRECT =
  "3'te 3. Bu dersin 3 tekniğini de ismiyle tanıyorsun. Şimdi başka bir alanda deneme ve günlükle dersi kapatacağız.";

export const EXIT_SOME_WRONG =
  "Bir veya birkaç konuda ek çalışma açıldı. Bu, geri kaldığın anlamına gelmez; bu ders tam bunun için var: Zayıf kalan konu, kısa tekrarla güçlenir. Ek çalışmayı tamamladıktan sonra devam edebilirsin.";

export const TRANSFER_TEXT = [
  "HızNet kampanyası:",
  "“İlk 3 ay %50 indirim! Ayda sadece 149 TL! Hemen başvur!”",
  "(küçük yazı: 4. aydan itibaren ayda 449 TL; 24 ay taahhüt; erken iptalde cayma bedeli uygulanır.)",
];

export const TRANSFER_MODEL = [
  "Küçük yazı tuzakları: 4. aydan itibaren 449 TL (büyük yazı 149 TL diyor), 24 ay taahhüt, erken iptalde cayma bedeli.",
  "Fren: “Sadece 149 TL” cümlesi cazip geldi, ama durdum.",
  "Amaç: Kampanya, hemen başvurmamaı istiyor.",
  "Referans: HızNet — çıkarı 24 ay bağlı müşteri.",
  "Kanıt: Büyük yazıyla küçük yazı çelişiyor; gerçek maliyet küçük yazıda.",
  "Etki: Başvurursam 24 ay bağlı kalırım; erken çıkarsam cayma bedeli öderim.",
  "Tercih: Değerlerime göre kararım: Toplam maliyeti ve çıkış koşullarını görmeden başvurmam.",
];

export const RUBRIC_QUESTIONS = [
  { name: "Açık mı?", detail: "Analizim, başkasının da anlayacağı kadar açık mı?" },
  { name: "Doğru mu?", detail: "Teknik adlarını doğru tekniğe mi verdim?" },
  { name: "İlgili mi?", detail: "Her adım, bu kampanya ve bu karar için gerçekten ilgili mi?" },
  { name: "Derin mi?", detail: "Yüzeyde kalmadım mı, “neden” sorusunu da sordum mu?" },
  { name: "Geniş mi?", detail: "Karşıt görüşü ve alternatif açıklamaları düşündüm mü?" },
  { name: "Mantıklı mı?", detail: "Adımlar birbirini tutuyor mu, sonucum adımlarımdan çıkıyor mu?" },
  { name: "Adil mi?", detail: "Kampanyayı abartmadan, adil bir şekilde mi değerlendirdim, yoksa önyargıyla mı yaklaştım?" },
];

export const JOURNAL_FIELDS = [
  { key: "olay", label: "Olay", hint: "Ne oldu, hangi sayfayla karşılaştın? (1–3 cümle)" },
  { key: "fren", label: "Fren", hint: "O anda ne hissettin, durdun mu?" },
  { key: "amac", label: "Amaç", hint: "Sayfa (veya ekran) senden tam olarak ne istiyordu?" },
  { key: "referans", label: "Referans", hint: "Bunu kim yayınladı, kaynağı ve çıkarı neydi?" },
  { key: "kanit", label: "Kanıt", hint: "İddianın arkasında somut kanıt var mıydı, ne eksikti?" },
  { key: "etkiTercih", label: "Etki ve Tercih", hint: "Kabul etseydin / etmeseydin ne olurdu, kendi değerlerine göre kararın ne oldu (veya ne olurdu)?" },
] as const;

export const JOURNAL_EXAMPLE = [
  "Olay: “Stokta son 2 adet!” yazan siteden aceleyle kulaklık aldım; bir hafta sonra aynı ürün yine “son 2 adet” diyordu.",
  "Fren: “Kaçıracağım” hissi vardı, durmadım.",
  "Amaç: Sayfa hemen satın almamı istiyordu.",
  "Referans: Satıcının kendisi; çıkarı satış yapmak.",
  "Kanıt: Stok sayısı doğrulanamıyordu; sayaç her yenilediğimde başa dönüyordu.",
  "Etki ve Tercih: Aceleyle aldım, sonra pişman oldum. Kararım: Bir dahaki sefere sayaç ve stok iddiasını doğrulamadan almayacağım.",
];

export const JOURNAL_SAVED =
  "Günlük girişin kaydedildi. Bu, Kalkan Dosyası'ndaki dördüncü girişin. Her ders bir giriş ekleyecek, kurs sonunda kendi karar geçmişini ve kendi protokolünü elinde tutacaksın.";

export const CLOSING_POINTS = [
  "Acele ve kıtlık baskısı: Sayaç ve stok sayısı, satıcının iddiasıdır; kanıt değil. Kural: Acele hissettiğinde dur.",
  "Karanlık desenler: Ekran sana değil, satıcıya çalışıyor olabilir. Kural: Düğmeye basmadan önce sor — vazgeçmek ne kadar kolay?",
  "Küçük yazılar: Büyük puntolar vaat eder, küçük puntolar gerçeği söyler. Kural: İmzalamadan ya da ödemeden önce iptal, yenileme ve ücret maddelerini bul.",
];

export const CIALDINI_CHECKLIST = [
  "Karşılıklılık: “Sana özel hediye / ücretsiz bir şey” → borçlu hissettirip karşılığını isteme.",
  "Tutarlılık: “Zaten sepete ekledin / kaydoldun” → yarım bırakmama baskısı.",
  "Sosyal kanıt: “Herkes alıyor, binlerce kişi katıldı.” Kalabalık kanıt değildir.",
  "Otorite: “Uzmanlar / doktorlar öneriyor.” Unvan kanıt değildir (Ders 2'den tanıdık).",
  "Beğenilme: “Sana çok yakışacak, senin gibi zevkli biri...” İltifat, kanıt değildir.",
  "Kıtlık: “Son 3 adet, bugün son gün.” Baskı, kanıt değildir (bu dersten tanıdık).",
];

export const EMAIL_BOOSTERS = [
  {
    when: "+2 gün",
    title: "5 dakika: Satış sayfasında baskı avı",
    body: "Gördüğün 1 satış sayfasındaki acele baskısını yakala. Şu 2 soruyu sor: Sayaç var mı, bitince ne oluyor? Stok sayısı doğrulanabilir mi?",
  },
  {
    when: "+7 gün",
    title: "2 dakika: Bu ekrandaki hileleri bul",
    body: "Kurgusal üyelik ekranını oku ve karanlık desenleri işaretle: “Ücretsiz deneme için kart bilgini gir. İptal için 5 adımlı formu doldur.”",
  },
  {
    when: "+30 gün",
    title: "Son 1 ayda 1 üyeliğini denetle",
    body: "Son 1 ayda kaydolduğun 1 üyeliği veya aldığın 1 ürünü seç. FARK ET ile denetle: Küçük yazıda ne yazıyordu, acele baskısı gerçek miydi, vazgeçmek ne kadar kolaydı?",
  },
];
