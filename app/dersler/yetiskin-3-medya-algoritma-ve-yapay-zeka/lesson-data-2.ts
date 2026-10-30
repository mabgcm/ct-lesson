// Ders 3 içerik verisi, ikinci bölüm: senaryo, tersine yazma, çıkış bileti,
// transfer, rubrik, günlük ve kapanış. Metinler içerik paketindendir.

export const SCENARIO_TEXT = [
  "Bir arkadaşından mesaj geldi. Okuyorsun:",
  "“Bak bu videoyu izle!! Ünlü oyuncu Selin Kaya bu kremi öneriyor, kullananların %93'ü memnun kalmış! Benim akışımda herkes bunu konuşuyor, sen görmedin mi? Link atıyorum, bugün almazsan yarın zam geliyormuş!!”",
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
    label: "Hemen satın al.",
    result:
      "Siparişi verdin. Şimdi durup bakalım: Bu mesajda hangi tetikleyiciler vardı? “Ünlü oyuncu öneriyor” (otorite — video gerçekten ona mı ait, belli değil), “kullananların %93'ü” (seçilmiş istatistik — kaç kişi, belli değil), “herkes bunu konuşuyor” (baloncuğun — senin akışın, herkesin akışı değil), “bugün almazsan zam” (acele). Dördü de hızlı modunu çalıştırdı.",
    feedback:
      "Karar yanlış olmayabilir, ama kanıta değil tepkiye dayanarak verildi. Bir dahaki sefere durup kaynağı sormak, kararı sana geri verir.",
    isBest: false,
  },
  {
    id: "b",
    label: "Arkadaşına sor: “Sen kullandın mı, gerçekten işe yarıyor mu?”",
    result:
      "Elif “henüz almadım ama herkes çok memnun” dedi. Dikkat: “herkes” dediği, onun akışı — yani onun baloncuğu. Bir kişinin baloncuğu, kanıt değildir. Ayrıca Elif de videonun kaynağını kontrol etmemiş.",
    feedback:
      "Arkadaşına sormak güzel bir refleks, ama soruyu bir adım ileri taşı: “Videonun kaynağı ne, %93 hangi araştırmadan?” Balonun içindeki birine sormak, balonu doğrulamaktan başka işe yaramaz.",
    isBest: false,
  },
  {
    id: "c",
    label: "Dur, FARK ET ile analiz et, sonra karar ver.",
    result:
      "Durdun ve adımları uyguladın: Fren: Heyecan ve acele hissi var, bu hızlı mod işareti. Duruyorum. Amaç: Bu mesaj benden ne istiyor? Videoyu izleyip kremi almamı. Referans: Videoyu yayınlayan kim? Anonim bir hesap. Selin Kaya'nın resmi hesabında bu video var mı? Kontrol etmedim — bu, en önemli eksik. Kanıt: “%93 memnun” — kaç kişi, hangi yöntem, belli değil. Video gerçek mi, yapay zekâ mı, belli değil. Etki: Alırsam para gider; almazsam “zam” baskısı, ki bu acele tuzağı. Tercih: Değerlerime göre kararım: Kaynağı belirsiz videoyla karar vermem. Önce videonun orijinalini ararım.",
    feedback:
      "Bu seçim, bu dersin tam olarak öğrettiği şeydir: kaynağı sor, istatistiği sorgula, balonu fark et. Karar yine senin — ama bu sefer senin kararın.",
    isBest: true,
  },
];

export const SCENARIO_CLOSING =
  "Fark ettin mi? Üç seçimde de aynı mesaj vardı, değişen tek şey senin hızındı. Hız değişince karar değişti. FARK ET, hızı değiştirmenin aracıdır.";

export const REVERSE_TECHNIQUES = [
  "Seçilmiş istatistik",
  "Algoritma baloncuğu",
  "Yapay zekâ içeriği",
];

export const REVERSE_TRIGGERS = [
  "Yüzde oyunu",
  "Karşılaştırma gizleme",
  "Balon onayı",
  "“Herkes” kalıbı",
  "Sahte video/görsel",
  "Acele baskısı",
];

export const REVERSE_EXAMPLE_MESSAGE =
  "“Araştırmaya göre ZindeSu içenlerin %87'si daha enerjik! Benim akışımda herkes bunu paylaşıyor, sen hâlâ denemedin mi?”";

export const REVERSE_EXAMPLE_BREAKDOWN = [
  "Fren: Merak ve “geride kalma” hissi uyandı, durdum.",
  "Amaç: Benden ZindeSu'yu denememi istiyor.",
  "Referans: “Araştırmaya göre” deniyor ama araştırma yok, kaynak yok; konuşan anonim bir hesap.",
  "Kanıt: %87'nin örneklemi, yöntemi, karşılaştırması belli değil; “herkes paylaşıyor” balon onayı, kanıt değil.",
  "Etki: Denersem para harcarım; denemezsem hiçbir şey kaybetmem, konuyu bağımsız kaynaktan araştırabilirim.",
  "Tercih: Kararım: Kaynağı belirsiz yüzdeyle karar vermem; önce bağımsız bir kaynağa bakarım.",
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
    technique: "Seçilmiş istatistikler",
    question: "%95 memnun! yazan bir reklamda ne eksik olabilir?",
    options: [
      "Örneklem sayısı, yöntem ve karşılaştırma",
      "Daha büyük puntolar",
      "Hiçbir şey, %95 yeterince açık",
    ],
    answerIndex: 0,
    explanation:
      "Yüzde tek başına kanıt değildir. Kaç kişiye soruldu, nasıl soruldu, neyle karşılaştırıldı — bunlar yoksa %95 bir süstür.",
    remedialTitle: "Seçilmiş istatistikler — ek çalışma: Yüzdeyi sorgulamanın 3 sorusu",
    remedialText:
      "Yüzdeyi görünce üç şeyi ara: kaç kişi (örneklem), neyle karşılaştırıldı (kontrol grubu), kaynak nerede (yayın, yöntem). Bu üçü yoksa, yüzdeye değil eksiklere bak.",
  },
  {
    technique: "Algoritma baloncuğu",
    question: "Akışında hep aynı fikirdeki içerikleri görüyorsan ne yapmalısın?",
    options: [
      "Bilinçli olarak farklı görüşlere de bakmak",
      "Akışta daha çok vakit geçirmek",
      "Hiçbir şey, akış her şeyi gösterir",
    ],
    answerIndex: 0,
    explanation:
      "Balonun dışına bilinçli olarak bakmak gerekir; akış kendiliğinden seni dışarı çıkarmaz.",
    remedialTitle: "Algoritma baloncuğu — ek çalışma: Balonu fark etmenin 2 işareti",
    remedialText:
      "İki işaret: hep aynı yönde içerik görmek ve karşıt görüşle hiç karşılaşmamak. Bunları gördüğünde sor: “Akışım bana ne göstermiyor?”",
  },
  {
    technique: "Yapay zekâ içeriği",
    question:
      "Ünlü birinin şaşırtıcı açıklamasını gösteren viral videoda ilk ne kontrol edilir?",
    options: [
      "Videonun kaynağı ve orijinali",
      "Yorumlardaki kalp emojisi sayısı",
      "Videonun müziği",
    ],
    answerIndex: 0,
    explanation:
      "“Bunu kim yayınladı, orijinali nerede?” Bu iki sorunun cevabı yoksa, video ne kadar gerçek görünürse görünsün kanıt sayılmaz.",
    remedialTitle: "Yapay zekâ içeriği — ek çalışma: Kaynak kontrolünün 2 sorusu",
    remedialText:
      "Şüpheli içerikte iki soru: Bunu kim yayınladı? Orijinali nerede? Ünlünün resmi hesabında yoksa ve tek kaynak anonimse, içerik kanıt sayılmaz.",
  },
];

export const EXIT_ALL_CORRECT =
  "3'te 3. Bu dersin 3 tekniğini de ismiyle tanıyorsun. Şimdi başka bir alanda deneme ve günlükle dersi kapatacağız.";

export const EXIT_SOME_WRONG =
  "Bir veya birkaç konuda ek çalışma açıldı. Bu, geri kaldığın anlamına gelmez; bu ders tam bunun için var: Zayıf kalan konu, kısa tekrarla güçlenir. Ek çalışmayı tamamladıktan sonra devam edebilirsin.";

export const TRANSFER_TEXT = [
  "HaberRüzgarı:",
  "“Ankete göre halkın %78'i yeni park projesini destekliyor!”",
  "(Anket, belediyenin kendi sitesinde 200 kişiyle yapıldı. Soru: “Şehrimizde daha çok yeşil alan ister misiniz?”)",
];

export const TRANSFER_MODEL = [
  "İstatistik oyunları: 200 kişi — küçük ve yanlı örneklem (belediyenin kendi sitesi). Soru yönlendirici: “daha çok yeşil alan ister misiniz?” sorusuna “hayır” demek zor; ayrıca yeşil alan isteği, park projesine destekle aynı şey değil.",
  "Fren: “Halk destekliyor” cümlesi ikna edici geldi, ama durdum.",
  "Amaç: Haber, park projesinin geniş destek gördüğüne inandırmamı istiyor.",
  "Referans: Anketi yapan belediye — projenin sahibi; çıkarı destek görünmesi.",
  "Kanıt: %78'in arkasında 200 kişilik, yanlı örneklemli, yönlendirici sorulu bir anket var; bağımsız bir ölçüm yok.",
  "Etki: İnanırsam projeyi sorgulamadan desteklerim; sorgularsam gerçek tabloyu görürüm.",
  "Tercih: Değerlerime göre kararım: Anketin yöntemini görmeden “halk destekliyor” sonucunu kabul etmem.",
];

export const RUBRIC_QUESTIONS = [
  { name: "Açık mı?", detail: "Analizim, başkasının da anlayacağı kadar açık mı?" },
  { name: "Doğru mu?", detail: "Teknik adlarını doğru tekniğe mi verdim?" },
  { name: "İlgili mi?", detail: "Her adım, bu haber ve bu karar için gerçekten ilgili mi?" },
  { name: "Derin mi?", detail: "Yüzeyde kalmadım mı, “neden” sorusunu da sordum mu?" },
  { name: "Geniş mi?", detail: "Karşıt görüşü ve alternatif açıklamaları düşündüm mü?" },
  { name: "Mantıklı mı?", detail: "Adımlar birbirini tutuyor mu, sonucum adımlarımdan çıkıyor mu?" },
  { name: "Adil mi?", detail: "Haberi abartmadan, adil bir şekilde mi değerlendirdim, yoksa önyargıyla mı yaklaştım?" },
];

export const JOURNAL_FIELDS = [
  { key: "olay", label: "Olay", hint: "Ne oldu, hangi gönderiyle karşılaştın? (1–3 cümle)" },
  { key: "fren", label: "Fren", hint: "O anda ne hissettin, durdun mu?" },
  { key: "amac", label: "Amaç", hint: "Gönderi (veya video) senden tam olarak ne istiyordu?" },
  { key: "referans", label: "Referans", hint: "Bunu kim yayınladı, kaynağı ve çıkarı neydi?" },
  { key: "kanit", label: "Kanıt", hint: "İddianın arkasında somut kanıt var mıydı, ne eksikti?" },
  { key: "etkiTercih", label: "Etki ve Tercih", hint: "İnansaydın / inanmasaydın ne olurdu, kendi değerlerine göre kararın ne oldu (veya ne olurdu)?" },
] as const;

export const JOURNAL_EXAMPLE = [
  "Olay: Viral bir gönderi “%92'si 1 haftada zayıfladı!” diyordu; 40 bin beğeni almıştı.",
  "Fren: Önce meraklandım, sonra “bir dakika” dedim ve durdum.",
  "Amaç: Ürünü satın almamı istiyordu.",
  "Referans: Hesap anonim bir satış hesabıydı; çıkarı satış yapmaktı.",
  "Kanıt: Kaç kişide ölçüldüğü, yöntem ve karşılaştırma yoktu; beğeni sayısı kanıt değildi.",
  "Etki ve Tercih: İnansaydım para harcayacaktım. Kararım: Kaynağı belirsiz yüzdeyle karar vermedim.",
];

export const JOURNAL_SAVED =
  "Günlük girişin kaydedildi. Bu, Kalkan Dosyası'ndaki üçüncü girişin. Her ders bir giriş ekleyecek, kurs sonunda kendi karar geçmişini ve kendi protokolünü elinde tutacaksın.";

export const CLOSING_POINTS = [
  "Seçilmiş istatistikler: Yüzde tek başına kanıt değildir. Kural: Kaç kişide ölçüldü, neyle karşılaştırıldı?",
  "Algoritma baloncuğu: Akışın sana gösterdiği, gerçekliğin tamamı değil. Kural: Arada bilinçli olarak balonun dışına bak.",
  "Yapay zekâ içeriği: Gerçek gibi görünmek, gerçek olduğu anlamına gelmez. Kural: Bunu kim yayınladı, orijinali nerede?",
];

export const EMAIL_BOOSTERS = [
  {
    when: "+2 gün",
    title: "5 dakika: Akışında istatistik avı",
    body: "Akışında gördüğün 1 gönderideki yüzde veya “araştırma” iddiasına istatistik gözüyle bak. Şu 2 soruyu sor: Kaç kişide ölçüldü? Neyle karşılaştırıldı?",
  },
  {
    when: "+7 gün",
    title: "2 dakika: Bu mesajdaki eksikleri bul",
    body: "Kurgusal mesajı oku ve eksikleri işaretle: “%99 doğal! Kullananların %98'i memnun! Doktorlar öneriyor!”",
  },
  {
    when: "+30 gün",
    title: "Son 1 ayda 1 viral içeriği denetle",
    body: "Son 1 ayda inandığın veya paylaştığın 1 viral içeriği seç. FARK ET ile denetle: Kaynağı neydi, istatistik sağlam mıydı, balonunun dışında kalan görüş ne diyordu?",
  },
];
