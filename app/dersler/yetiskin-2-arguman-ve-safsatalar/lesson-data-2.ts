// Ders 2 içerik verisi, ikinci bölüm: senaryo, tersine yazma, çıkış bileti,
// transfer, rubrik, günlük ve kapanış. Metinler içerik paketindendir.

export const SCENARIO_TEXT = [
  "Bir arkadaşından mesaj geldi. Okuyorsun:",
  "“Bak bunu kesinlikle denemelisin! ZindeÇay diye bir karışım, ünlü beslenme uzmanı Derya Aksoy öneriyor. Ya şimdi alırsın ya da sağlığına önem vermiyorsun demektir. Ben aldım, sabahları kendimi harika hissediyorum. Linki atıyorum, bugün sipariş verirsen kargoda indirim varmış.”",
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
      "Siparişi verdin. Şimdi durup bakalım: Bu mesajda hangi tetikleyiciler vardı? “Ünlü beslenme uzmanı öneriyor” (otoriteye başvurma), “ya şimdi alırsın ya da sağlığına önem vermiyorsun” (sahte ikilem), “bugün sipariş verirsen indirim” (acele). Üçü de hızlı modunu çalıştırdı. Ürün kötü olmayabilir; ama kararın, kanıta değil, tetikleyicilere dayanarak verildi.",
    feedback:
      "Bu seçimde otorite, sahte ikilem ve acele birlikte çalıştı. Karar yanlış olmayabilir, ama kanıta değil tepkiye dayanarak verildi. Bir dahaki sefere durup sormak, kararı sana geri verir.",
    isBest: false,
  },
  {
    id: "b",
    label: "Arkadaşına sor: “Sen kullandın mı, gerçekten işe yarıyor mu?”",
    result:
      "Selin “evet, kendimi harika hissediyorum” dedi. Bu bilgi değerli mi? Bir kişinin hissi, bir veri noktasıdır; kanıt değildir. Ayrıca “ben aldım, harika” cümlesi, tek bir kişinin deneyimini genelleme tuzağına da göz kırpıyor.",
    feedback:
      "Arkadaşına sormak güzel bir refleks, ama soruyu bir adım ileri taşı: “Bunu öneren uzman, kanıt olarak ne gösteriyor?” Bir kişinin hissi, ürünün kanıtı değildir; yalnızca bir başlangıç bilgisidir.",
    isBest: false,
  },
  {
    id: "c",
    label: "Dur, FARK ET ile analiz et, sonra karar ver.",
    result:
      "Durdun ve adımları uyguladın: Fren: Acele hissi var, bu hızlı mod işareti. Duruyorum. Amaç: Bu mesaj benden ne istiyor? Satın almamı. Referans: Derya Aksoy bu konuda uzman mı? “Ünlü beslenme uzmanı” deniyor ama kanıtı ne, belli değil. Selin'in çıkarı yok gibi, ama o da mesajı sorgulamadan iletmiş. Kanıt: Çayın etkisine dair araştırma var mı? Mesajda yok. “Binlerce kişi denedi” kanıt değil, kalabalık. Etki: Alırsam maliyeti para ve belki boş bir umut; almazsam “sağlığına önem vermiyorsun” baskısı, ki bu sahte ikilem. Tercih: Değerlerime göre kararım: Kanıt görmeden almıyorum. Önce içeriği ve varsa araştırmayı sorarım.",
    feedback:
      "Bu seçim, bu dersin tam olarak öğrettiği şeydir. Durmak, vazgeçmek değildir; kararını hızlı moddan yavaş moda taşımaktır. Kanıtı görüp almaya karar verirsen, o da senin kararın olur — ama bu sefer senin kararın olur.",
    isBest: true,
  },
];

export const SCENARIO_CLOSING =
  "Fark ettin mi? Üç seçimde de aynı mesaj vardı, değişen tek şey senin hızındı. Hız değişince karar değişti. FARK ET, hızı değiştirmenin aracıdır.";

export const REVERSE_TECHNIQUES = [
  "Saman adam",
  "Sahte ikilem",
  "Otoriteye başvurma",
];

export const REVERSE_TRIGGERS = [
  "Çarpıtma",
  "İki seçenek dayatma",
  "Ünlü ismi",
  "İsimsiz otorite",
  "Acele baskısı",
  "“Herkes” kalıbı",
];

export const REVERSE_EXAMPLE_MESSAGE =
  "“Ünlü yaşam koçu Mert Kaya öneriyor: Ya bu sabah rutinini uygularsın ya da başarılı olamazsın! Binlerce kişi çoktan başladı.”";

export const REVERSE_EXAMPLE_BREAKDOWN = [
  "Fren: Acele ve “başarılı olamazsın” korkusu hissettim, durdum.",
  "Amaç: Benden sabah rutinini (ve muhtemelen bir ürünü) kabul etmemi istiyor.",
  "Referans: Mert Kaya kurgusal bir isim; “ünlü yaşam koçu” unvanı var ama bu konuda uzmanlığı ve kanıtı belli değil.",
  "Kanıt: Rutinin işe yaradığına dair somut kanıt yok; “binlerce kişi” kalabalık, kanıt değil.",
  "Etki: Kabul edersem zaman ve para harcarım; etmezsem hiçbir şey kaybetmem, konuyu bağımsız kaynaktan araştırabilirim.",
  "Tercih: Kararım: Kanıt görmeden kabul etmiyorum; önce bağımsız bir kaynağa bakacağım.",
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
    technique: "Saman adam",
    question:
      "Bir tartışmada biri “Bence sokak lambaları daha aydınlık olmalı” diyor. Karşısındaki “Yani bütün gece gündüz gibi olsun, elektrik faturasını kim ödeyecek?” diye cevap veriyor. Burada ne oldu?",
    options: [
      "Karşı taraf iddiayı çarpıttı; kimse “gece gündüz gibi olsun” demedi. Bu, saman adam.",
      "Karşı taraf haklı bir soru sordu; maliyet gerçekten önemli.",
      "Burada safsata yok, normal bir tartışma.",
    ],
    answerIndex: 0,
    explanation:
      "“Daha aydınlık” demek “geceyi gündüze çevirmek” demek değildir. İddia büyütülüp çarpıtıldı, sonra çarpıtılmış hali çürütüldü. İşte saman adam.",
    remedialTitle: "Saman adam — ek çalışma: Gerçek iddia ile çarpıtmayı ayırt etme",
    remedialText:
      "Karşı tarafın iddiasını onun kendi cümleleriyle özetlemeyi dene. Özetin, onun söylediğinden daha büyük veya daha saçmaysa, saman adamla karşı karşıyasın demektir. Kural: “Bu, gerçekten onun söylediği şey mi?”",
  },
  {
    technique: "Sahte ikilem",
    question:
      "“Ya bu ayakkabıyı alırsın ya da tarzın olmadığını kabul edersin.” Bu cümlede ne var?",
    options: [
      "Sahte ikilem: üçüncü seçenekler gizlenmiş (başka ayakkabı, hiç almamak, tarzın ayakkabıyla ölçülmemesi).",
      "Dürüst bir tercih sunumu: gerçekten iki seçenek var.",
      "Otoriteye başvurma: bir uzmanın görüşü aktarılıyor.",
    ],
    answerIndex: 0,
    explanation:
      "Üçüncü yollar varken yokmuş gibi gösteriliyor. Kuralı hatırla: Sana iki seçenek sunulduğunda, üçüncü seçeneği sen yaz.",
    remedialTitle: "Sahte ikilem — ek çalışma: Gizlenen üçüncü seçenekleri bulma",
    remedialText:
      "“Ya … ya …” kalıbını duyduğunda dur ve üçüncü bir yol yaz. Başka bir ürün, hiçbir şey yapmamak, bir uzmana danışmak — gerçek hayatta üçüncü yollar her zaman vardır.",
  },
  {
    technique: "Otoriteye başvurma",
    question:
      "Hangisinde otorite, kanıtın yerine geçerek safsata yapılmıştır?",
    options: [
      "“Bu köprünün sağlamlık raporunu iki bağımsız mühendislik firması onayladı, raporlar burada.”",
      "“Ünlü sunucu bu telefonu kullanıyor, demek ki en iyisi bu.”",
      "“Eczacı, bu ilacın prospektüsündeki yan etkileri tek tek anlattı.”",
    ],
    answerIndex: 1,
    explanation:
      "İkinci seçenekte unvan ve ün var, kanıt yok. Birinci ve üçüncüde ise otoritenin yanında somut kanıt veya bilgi var; onlar safsata değildir.",
    remedialTitle: "Otoriteye başvurma — ek çalışma: Ün mü var, kanıt mı?",
    remedialText:
      "İki soruyu sor: Bu kişi bu konuda gerçekten uzman mı? Kanıt ne? Unvanın yanında somut kanıt varsa safsata değildir; unvan kanıtın yerine geçiyorsa safsatadır.",
  },
];

export const EXIT_ALL_CORRECT =
  "3'te 3. Bu dersin 3 safsatasını da ismiyle tanıyorsun. Şimdi başka bir alanda deneme ve günlükle dersi kapatacağız.";

export const EXIT_SOME_WRONG =
  "Bir veya birkaç konuda ek çalışma açıldı. Bu, geri kaldığın anlamına gelmez; bu ders tam bunun için var: Zayıf kalan konu, kısa tekrarla güçlenir. Ek çalışmayı tamamladıktan sonra devam edebilirsin.";

export const TRANSFER_TEXT = [
  "Ekip grubundan — yönetici mesajı:",
  "“Arkadaşlar, bu rapor bu gece bitmek zorunda. Ya bu gece bitirirsin ya da terfiyi unut. Zaten genel müdür de böyle istiyor, onun sözünün üstüne söz söylemem.”",
];

export const TRANSFER_MODEL = [
  "Safsatalar: “Ya bu gece bitirirsin ya da terfiyi unut” — sahte ikilem (üçüncü yollar: yarın sabah teslim, iş bölümü, süre uzatımı gizlenmiş). “Genel müdür de böyle istiyor” — otoriteye başvurma (kanıt yok, sadece unvan).",
  "Fren: Baskı ve korku hissettim, durdum.",
  "Amaç: Raporun bu gece bitirilmesi isteniyor.",
  "Referans: Yönetici, çıkarı işin bitmesi; genel müdürün gerçekten böyle dediğinin kanıtı yok.",
  "Kanıt: Raporun bu gece bitmesinin zorunluluğuna dair somut kanıt yok; alternatif: iş bölümü veya süre konuşulabilir.",
  "Etki: Kabul edersem geceyi çalışarak geçiririm; konuşursam belki süre uzar, belki gerilim olur.",
  "Tercih: Değerlerime göre kararım: Önce seçenekleri konuşurum, “ya bu gece ya terfi yok” dayatmasını olduğu gibi kabul etmem.",
];

export const RUBRIC_QUESTIONS = [
  { name: "Açık mı?", detail: "Analizim, başkasının da anlayacağı kadar açık mı?" },
  { name: "Doğru mu?", detail: "Safsata adlarını doğru tekniğe mi verdim?" },
  { name: "İlgili mi?", detail: "Her adım, bu mesaj ve bu karar için gerçekten ilgili mi?" },
  { name: "Derin mi?", detail: "Yüzeyde kalmadım mı, “neden” sorusunu da sordum mu?" },
  { name: "Geniş mi?", detail: "Üçüncü seçenekleri ve alternatif açıklamaları düşündüm mü?" },
  { name: "Mantıklı mı?", detail: "Adımlar birbirini tutuyor mu, sonucum adımlarımdan çıkıyor mu?" },
  { name: "Adil mi?", detail: "Mesajı abartmadan, adil bir şekilde mi değerlendirdim, yoksa önyargıyla mı yaklaştım?" },
];

export const JOURNAL_FIELDS = [
  { key: "olay", label: "Olay", hint: "Ne oldu, hangi tartışmayla karşılaştın? (1–3 cümle)" },
  { key: "fren", label: "Fren", hint: "O anda ne hissettin, durdun mu?" },
  { key: "amac", label: "Amaç", hint: "Karşı taraf (veya mesaj) senden tam olarak ne istiyordu?" },
  { key: "referans", label: "Referans", hint: "Bunu kim söylüyordu, çıkarı neydi?" },
  { key: "kanit", label: "Kanıt", hint: "Somut kanıt neydi, ne eksikti?" },
  { key: "etkiTercih", label: "Etki ve Tercih", hint: "Kabul etseydin / etmeseydin ne olurdu, kendi değerlerine göre kararın ne oldu (veya ne olurdu)?" },
] as const;

export const JOURNAL_EXAMPLE = [
  "Olay: Bir yorumda biri “daha çok yeşil alan olsun” demişti, başkası “yani şehri ormana çevirelim mi?” diye cevap verdi.",
  "Fren: Önce güldüm, sonra bir tuhaflık hissettim ve durdum.",
  "Amaç: Karşı taraf, yeşil alan önerisini saçma göstermek istiyordu.",
  "Referans: Yorumu yazan kişi, konuyla ilgili bir uzman değil; sadece tartışmayı kazanmak istiyor gibiydi.",
  "Kanıt: “Şehri ormana çevirmek” iddiasının kanıtı yok; kimse bunu önermemişti, bu bir çarpıtmaydı.",
  "Etki ve Tercih: Katılsaydım çarpıtmayı onaylamış olacaktım. Kararım: Saman adamı gördüm, gerçek iddiaya döndüm: “yeşil alan artsın” önerisi makul.",
];

export const JOURNAL_SAVED =
  "Günlük girişin kaydedildi. Bu, Kalkan Dosyası'ndaki ikinci girişin. Her ders bir giriş ekleyecek, kurs sonunda kendi karar geçmişini ve kendi protokolünü elinde tutacaksın.";

export const CLOSING_POINTS = [
  "Saman adam: Karşı tarafın iddiasını çarpıtıp kolay versiyonu yıkmaktır. Kural: İddiayı onun cümleleriyle özetleyemiyorsan, yıktığın şey saman adam olabilir.",
  "Sahte ikilem: İkiden çok seçenek varken yalnızca ikisini sunmaktır. Kural: Üçüncü seçeneği sen yaz.",
  "Otoriteye başvurma: Unvanın kanıtın yerine geçmesidir. Kural: Ünlü söyledi diye değil, kanıt gösterdi diye inan.",
];

export const EMAIL_BOOSTERS = [
  {
    when: "+2 gün",
    title: "5 dakika: Bugünkü tartışmalarda safsata avı",
    body: "Karşılaştığın 1 tartışmada (yorum, reklam, iş mesajı, sohbet) saman adam, sahte ikilem veya otorite tuzağı var mıydı, bak. Bulduysan günlüğüne 2 cümleyle yaz: Hangi safsataydı, nasıl anladın?",
  },
  {
    when: "+7 gün",
    title: "2 dakika: Bu mesajdaki safsataları bul",
    body: "Kurgusal mesajı oku ve safsataları işaretle: “EkoTerlik'leri ünlü sporcu Barış Demirci giyiyor! Ya şimdi alırsın ya da ayak sağlığını riske atarsın. Binlerce kişi çoktan geçti.”",
  },
  {
    when: "+30 gün",
    title: "Son 1 ayda 1 tartışmanı denetle",
    body: "Son 1 ayda birine katıldığın veya karşı çıktığın 1 tartışmayı FARK ET ile denetle: Karşı tarafın iddiasını onun cümleleriyle özetleyebildin mi? Sana sunulmayan üçüncü bir seçenek var mıydı? Kararında unvan mı, kanıt mı etkili oldu?",
  },
];
