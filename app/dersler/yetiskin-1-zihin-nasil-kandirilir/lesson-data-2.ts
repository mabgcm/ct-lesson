// Ders 1 içerik verisi, ikinci bölüm: senaryo, tersine yazma, çıkış bileti,
// transfer, rubrik, günlük ve kapanış. Metinler içerik paketindendir.

export const SCENARIO_TEXT = [
  "Bir arkadaşın sana şu mesajı gönderdi:",
  "“Bak, bu ayakkabı inanılmaz indirime girmiş, ben de alacağım, sen de hemen al, yoksa bitiyor! Bağlantı burada, acele et.”",
  "Bağlantıya tıkladın. Sayfada geri sayım, “son 3 adet” yazısı ve “2.147 kişi bakıyor” notu var. Ayakkabıya gerçekten ihtiyacın olup olmadığından emin değilsin, ama heyecanlandığını fark ediyorsun.",
  "Ne yaparsın?",
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
    label: "Hemen satın al, fırsat kaçmasın.",
    result:
      "Satın aldın. Bir saat sonra heyecanın geçti ve şunu fark ettin: Ayakkabıya gerçekten ihtiyacın var mıydı, fiyat gerçekten indirimli miydi, iade koşulu neydi — hiçbirini kontrol etmemiştin.",
    feedback:
      "Bu seçimde hızlı düşünme ve duygu tuzağı birlikte çalıştı: Heyecan + geri sayım + “bitiyor” baskısı, yavaş düşünmeyi devre dışı bıraktı. Bu, başarısızlık değil, beynin normal refleksidir. Ama önemli bir kararda bu refleksle kalmak pahalıya patlayabilir.",
    isBest: false,
  },
  {
    id: "b",
    label: "Arkadaşına sor, onun fikrini al.",
    result:
      "Arkadaşın “Ben de daha almadım, sadece indirim var diye gönderdim” dedi. Yani onun fikri de bir kanıt değildi; o da aynı heyecanla hareket etmişti.",
    feedback:
      "Başkasına sormak her zaman yanlış değildir, ama burada dikkat et: Arkadaşının heyecanı, senin heyecanını doğruladı. Bu, onay önyargısının sosyal hali olabilir: Aynı fikirdeki bir kişi, “herkes böyle düşünüyor” hissi yaratır. Soru şu olmalıydı: “Kanıt ne? Fiyat gerçekten indirimli mi, iade koşulu ne?”",
    isBest: false,
  },
  {
    id: "c",
    label: "Dur, FARK ET ile analiz et, sonra karar ver.",
    result:
      "Durdun ve adımları uyguladın: Fren: Heyecanlandığımı fark ettim, durdum. Amaç: Bu sayfa benden hemen satın almamı istiyor. Referans: Sayfayı satıcı hazırlamış, çıkarı satış yapmak. Kanıt: İndirim gerçekten var mı, eski fiyat neydi, iade koşulu ne — kontrol etmedim. Etki: Alırsam param gider, ihtiyacım yoksa dolapta kalır; almazsam fırsat kaçabilir ama param kalır. Tercih: Benim değerim: İhtiyacım olmayan şeyi indirimde diye almamak. Kararım: Önce fiyatı ve iade koşulunu kontrol edeceğim, yarın sakin kafayla karar vereceğim.",
    feedback:
      "Bu seçim, bu dersin tam olarak öğrettiği şeydir. Durmak, vazgeçmek değildir; kararını hızlı moddan yavaş moda taşımaktır. Yarın sakin kafayla almaya karar verirsen, o da senin kararın olur — ama bu sefer senin kararın olur.",
    isBest: true,
  },
];

export const SCENARIO_CLOSING =
  "Fark ettin mi? Üç seçimde de aynı mesaj vardı, değişen tek şey senin hızındı. Hız değişince karar değişti. FARK ET, hızı değiştirmenin aracıdır.";

export const REVERSE_TECHNIQUES = [
  "Hızlı düşünme",
  "Onay önyargısı",
  "Duygu tuzağı",
];

export const REVERSE_TRIGGERS = [
  "Geri sayım",
  "Son adet",
  "Herkes yapıyor",
  "Korku",
  "Heyecan",
  "Yalnızca doğrulayan yorum",
];

export const REVERSE_EXAMPLE_MESSAGE =
  "“Komşularının hepsi bu su arıtıcısını aldı, sen hâlâ musluk suyu mu içiyorsun? Çocuğunun sağlığını riske atma, hemen sipariş ver!”";

export const REVERSE_EXAMPLE_BREAKDOWN = [
  "Fren: Korku ve utanç hissettim, durdum.",
  "Amaç: Benden hemen sipariş vermemi istiyor.",
  "Referans: Mesajı satıcı yazmış, çıkarı satış.",
  "Kanıt: Musluk suyunun zararlı olduğuna dair somut kanıt yok, “herkes aldı” iddiasının kaynağı yok.",
  "Etki: Alırsam para gider, almazsam hiçbir şey olmaz, suyu ayrıca araştırabilirim.",
  "Tercih: Kararım: Önce bağımsız bir kaynaktan musluk suyu ve arıtıcı konusunu araştıracağım.",
];

export const REVERSE_DONE =
  "Tebrikler. Bir tekniği kendin yazıp bozduğunda, onu yalnızca tanımazsın, nasıl kurulduğunu da görürsün. Bir daha aynı teknikle karşılaştığında, kurulumu fark etmen daha hızlı olur.";

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
    technique: "Hızlı düşünme",
    question:
      "Bir mesajda “son 5 dakika” yazısını görünce hemen satın alma isteği duymak, hangi düşünme türüne örnektir?",
    options: ["Yavaş düşünme", "Hızlı düşünme", "Mantıksal analiz", "Hiçbiri"],
    answerIndex: 1,
    explanation:
      "Acele ve duygu ile verilen karar, hızlı düşünmenin işaretidir. Yavaş düşünme, durup karşılaştırmayı ve sormayı gerektirir.",
    remedialTitle: "Ek çalışma: Hızlı düşünme — Acele hissettiğinde ne yapacaksın?",
    remedialText:
      "Acele hissettiğinde 3 şeyi hatırla: 1) Acele, kararın acil olduğu anlamına gelmez; çoğu “son dakika” mesajı tekrar eder. 2) Durmak, vazgeçmek değildir; 10 dakika beklemek bile yavaş modun devreye girmesine yeter. 3) FARK ET'in Fren adımı, bu beklemenin adıdır.",
  },
  {
    technique: "Onay önyargısı",
    question:
      "Bir konuda zaten bir fikrin var. Yalnızca aynı fikirdeki yorumları okuyup, karşıt görüşteki yorumu “tek tük bir istisna” diye geçiştirirsen, bu neye örnektir?",
    options: [
      "Onay önyargısı",
      "Duygu tuzağı",
      "Hızlı düşünme",
      "Dikkat eksikliği",
    ],
    answerIndex: 0,
    explanation:
      "Mevcut fikri doğrulayan bilgiyi seçmek ve karşıt kanıtı küçümsemek, onay önyargısının tanımıdır. Karşıt kanıtı aramak, fikrinden vazgeçmek değildir; fikrini test etmektir.",
    remedialTitle: "Ek çalışma: Onay önyargısı — Karşıt kanıtı nasıl ararsın?",
    remedialText:
      "Bir iddia seni rahatlattığında şunu sor: “Bu iddianın karşıtı ne söylerdi?” Karşıt görüşü 2 dakika ara. Amacın fikrini değiştirmek değil, fikrinin hangi kanıtla ayakta durduğunu görmek.",
  },
  {
    technique: "Duygu tuzağı",
    question:
      "“Kaçırırsan pişman olursun, herkes sana gülüyor” cümleleri bir mesajda ne amaçlar?",
    options: [
      "Bilgi vermek",
      "Duyguyu yükseltip acele karar verdirtmek",
      "Fiyatı açıklamak",
      "Teşekkür etmek",
    ],
    answerIndex: 1,
    explanation:
      "Korku ve utanç yükseltildiğinde, kanıt arama ve maliyet hesaplama geri plana düşer. Önce duyguyu adlandır: Bu korku mu, utanç mı, heyecan mı? Sonra dur ve FARK ET ile bak.",
    remedialTitle: "Ek çalışma: Duygu tuzağı — Duyguyu adlandırmak neden işe yarar?",
    remedialText:
      "Duyguyu adlandırmak (“Korkuyorum”, “Heyecanlandım”) beynin hızını keser. Adlandırdıktan sonra sor: “Bu duygu, bu karar için iyi bir rehber mi, yoksa mesajın yükselttiği bir duygu mu?”",
  },
];

export const EXIT_ALL_CORRECT =
  "3'te 3. Bu dersin 3 tekniğini de ismiyle tanıyorsun. Şimdi transfer görevi ve günlükle dersi kapatacağız.";

export const EXIT_SOME_WRONG =
  "Bir veya birkaç teknikte ek çalışma açıldı. Bu, geri kaldığın anlamına gelmez; sistem tam bunun için var: Zayıf kalan teknik, ek mikro dersle güçlenir. Ek çalışmayı tamamladıktan sonra devam edebilirsin.";

export const TRANSFER_TEXT =
  "“Yeni bitkisel karışım! Kullananların %94'ü 1 haftada kendini daha enerjik hissetti. Doktorlar bunu konuşmuyor çünkü ilaç firmaları istemiyor. Stoklar tükenmeden sen de dene, yoksa geç kalırsın!”";

export const TRANSFER_MODEL = [
  "Fren: Heyecan ve merak hissettim, ama “doktorlar konuşmuyor” cümlesi şüphe uyandırdı, durdum.",
  "Amaç: Benden hemen ürünü satın almamı istiyor.",
  "Referans: Mesajı satıcı yazmış; “%94” iddiasının araştırması, örneklemi ve kaynağı belirtilmemiş.",
  "Kanıt: Somut kanıt yok. Alternatif açıklama: Enerjik hissetmek, uyku, beslenme veya beklenti etkisiyle de açıklanabilir.",
  "Etki: Alırsam para gider ve gerçek bir sağlık sorunum varsa tedavim gecikebilir; almazsam hiçbir şey kaybetmem, konuyu bağımsız bir kaynaktan araştırabilirim.",
  "Tercih: Kararım: Sağlık iddialarında satıcı mesajıyla karar vermem; önce bağımsız bir sağlık kaynağına bakacağım.",
];

export const RUBRIC_QUESTIONS = [
  { name: "Açık mı?", detail: "Analizim, başkasının da anlayacağı kadar açık mı?" },
  { name: "Doğru mu?", detail: "Yazdıklarım, mesajda gerçekten olanlara dayanıyor mu, yoksa tahmin mi ekledim?" },
  { name: "İlgili mi?", detail: "Her adım, bu mesaj ve bu karar için gerçekten ilgili mi?" },
  { name: "Derin mi?", detail: "Yüzeyde kalmadım mı, “neden” sorusunu da sordum mu?" },
  { name: "Geniş mi?", detail: "Alternatif açıklamayı ve karşıt kanıtı da düşündüm mü?" },
  { name: "Mantıklı mı?", detail: "Adımlar birbirini tutuyor mu, sonucum adımlarımdan çıkıyor mu?" },
  { name: "Adil mi?", detail: "Mesajı abartmadan, adil bir şekilde mi değerlendirdim, yoksa önyargıyla mı yaklaştım?" },
];

export const JOURNAL_FIELDS = [
  { key: "olay", label: "Olay", hint: "Ne oldu, hangi mesajla karşılaştın? (1–3 cümle)" },
  { key: "fren", label: "Fren", hint: "O anda ne hissettin, durdun mu?" },
  { key: "amac", label: "Amaç", hint: "Mesaj senden tam olarak ne istiyordu?" },
  { key: "referans", label: "Referans", hint: "Bunu kim söylüyordu, çıkarı neydi?" },
  { key: "kanit", label: "Kanıt", hint: "Somut kanıt neydi, alternatif açıklama ne olabilirdi?" },
  { key: "etkiTercih", label: "Etki ve Tercih", hint: "Kabul etseydin / etmeseydin ne olurdu, kendi değerlerine göre kararın ne oldu (veya ne olurdu)?" },
] as const;

export const JOURNAL_EXAMPLE = [
  "Olay: Bir online mağaza, “son 2 adet” yazısıyla bir ceket için %50 indirim mesajı gönderdi.",
  "Fren: Heyecanlandım ve acele hissettim, ama durdum.",
  "Amaç: Hemen satın almamı istiyordu.",
  "Referans: Satıcı, çıkarı satış yapmak.",
  "Kanıt: İndirimin gerçekliğini kontrol etmedim, eski fiyatı görmedim.",
  "Etki ve Tercih: Alsaydım param gidecekti, cekete gerçekten ihtiyacım yoktu. Kararım: Almadım, ihtiyacım olursa sakin kafayla bakacağım.",
];

export const JOURNAL_SAVED =
  "Günlük girişin kaydedildi. Bu, Kalkan Dosyası'ndaki ilk girişin. Her ders bir giriş ekleyecek, kurs sonunda kendi karar geçmişini ve kendi protokolünü elinde tutacaksın.";

export const CLOSING_POINTS = [
  "Hızlı düşünme normaldir, ama önemli kararda hızlı modda kalmak pahalıdır. Fren, hızı değiştirir.",
  "Onay önyargısı, zaten inandığın bilgiyi seçmektir. Karşıt kanıtı aramak, fikrini test etmektir, vazgeçmek değildir.",
  "Duygu tuzağı, duyguyu yükseltip düşünmeyi kısaltmaktır. Duyguyu adlandırmak, kararın direksiyonunu sana geri verir.",
];

export const EMAIL_BOOSTERS = [
  {
    when: "+2 gün",
    title: "5 dakika: Bugün 1 mesajı günlüğüne yaz",
    body: "Bugün karşılaştığın 1 manipülatif mesajı düşün. Günlüğüne FARK ET ile yaz: Fren, Amaç, Referans, Kanıt, Etki, Tercih.",
  },
  {
    when: "+7 gün",
    title: "2 dakika: Bu mesajdaki duygu tuzağını bul",
    body: "Kurgusal mesajı oku ve duygu yüklü cümleyi işaretle: “Herkes bu fırsatı kaçırdığına pişman olacak, sen de geç kalma!”",
  },
  {
    when: "+30 gün",
    title: "Son 1 ayda 1 kararını denetle",
    body: "Son 1 ayda verdiğin 1 kararı seç. FARK ET ile denetle: Hızlı mı düşündün, kanıtı aradın mı, duygun neydi, bugünkü kararın aynı olur muydu?",
  },
];
