// Ders 3 içerik verisi. Metinler, içerik paketinden (ders-3-icerik-paketi.md)
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
  "Ders 1'de beyninin nasıl çalıştığını, Ders 2'de tartışmalardaki hileleri gördün. Bu ders, o hilelerin en çok kullanıldığı yere gidiyor: ekranına. Her gün akışında yüzlerce mesaj, video ve “araştırma” görüyorsun. Bunların bir kısmı, göründüğü gibi değil.",
  "Bu derste 3 teknik öğreneceksin: seçilmiş istatistikler, algoritma baloncuğu ve yapay zekâ ile üretilmiş içerik. Üçü de her gün telefonunda karşına çıkıyor.",
  "Bu dersin sonunda, viral bir gönderiye “bir dakika, kaynağı ne?” diyebileceksin.",
];

export const ETHICS_TEXT = [
  "Bu derste öğrendiğin teknikleri başkalarını yönlendirmek, baskı kurmak veya satışta avantaj sağlamak için değil, kendini korumak için kullanacaksın. Bir tekniği tanımak, onu kullanma hakkı vermez.",
  "Bu ders kimseye psikolojik tanı koymaz, terapi değildir. İnsanları değil, mesajları ve teknikleri analiz edeceğiz.",
];

export const OBJECTIVES = [
  "Bir yüzde veya araştırma iddiasında örneklemi, karşılaştırmayı ve kaynağı sorgular; seçilmiş istatistiği ismiyle tanır.",
  "Algoritma baloncuğunu kendi akışında fark eder ve balonun dışına bilinçli olarak bakar.",
  "Yapay zekâ ile üretilmiş olabilecek bir içeriğe şüpheyle yaklaşır; kaynağı ve orijinali kontrol eder.",
  "Medya mesajlarını FARK ET'in 6 adımıyla analiz eder.",
  "Kendi hayatından 1 medya örneğini karar günlüğüne FARK ET ile yazar.",
];

export const HOOK_MESSAGE = [
  "Sosyal medyada viral olan bir gönderi:",
  "gunlukbilgi: 💧 YENİ ARAŞTIRMA! Günde 2 bardak ZindeSu içenlerin %87'si 1 haftada kendini daha enerjik hissetti! Bilim konuşuyor. 👇",
  "❤️ 48.231 beğeni · 💬 3.102 yorum · 🔁 12.904 paylaşım",
];

export const HOOK_OPTIONS = [
  "İkna oldum, denemek istedim.",
  "Bir tuhaflık var ama ne olduğunu bilemedim.",
  "Umursamadım.",
];

export const HOOK_AFTER =
  "Tepkin ne olursa olsun, bu normal. Viral içerikler, ilk bakışta ikna edici görünmek için tasarlanır. Dersin sonunda aynı mesaja geri döneceğiz ve bu sefer FARK ET ile bakacağız. Aradaki farkı kendin göreceksin.";

export const HOOK_RETURN = [
  "Dersin başındaki viral gönderiyi hatırlıyor musun? Şimdi aynı karta bir daha bak:",
  "“%87'si daha enerjik hissetti!” — Kaç kişi? Kime göre? Karşılaştırma grubu nerede? Bu, seçilmiş istatistik.",
  "“48.231 beğeni” — Kalabalık, kanıt değildir. Beğeni sayısı, iddianın doğruluğunu göstermez.",
  "“Bilim konuşuyor.” — Hangi bilim, hangi araştırma, hangi kaynak? Bu, isimsiz otorite (Ders 2'den tanıdık).",
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
  title: "Mikro ders 1 — Seçilmiş istatistikler",
  paragraphs: [
    "Seçilmiş istatistik, verinin işine gelen kısmını gösterip gerisini gizlemektir. Yüzde gerçektir, ama hikâyenin tamamı değildir. “%87” kulağa bilimsel gelir; oysa o sayının arkasında kaç kişi olduğu, kiminle karşılaştırıldığı ve araştırmanın nerede yayınlandığı gizlenmiş olabilir.",
    "Kancadaki karta bak: “Günde 2 bardak ZindeSu içenlerin %87'si 1 haftada kendini daha enerjik hissetti!” Şimdi sorular: Kaç kişi? 20 kişi mi, 2.000 kişi mi? İçmeyen bir grupla karşılaştırıldı mı, yoksa herkes ZindeSu mu içti? “Enerjik hissetmek” nasıl ölçüldü, kime soruldu? Araştırma nerede yayınlandı, kim finanse etti? Bu soruların hiçbiri kartta yok. Yüzde var, hikâye yok.",
    "Bu hile neden işler? Çünkü beynin sayıları nesnel sanır. “%87” duyduğunda, “bunun arkasında bir ölçüm var” diye düşünürsün ve hızlı modda kabul edersin. Oysa yüzde, bir iddia biçimidir; kanıtın kendisi değildir.",
    "Seçilmiş istatistiğin klasik oyunları şunlardır: Örneklem gizlenir (“%90 memnun!” — kaç kişiye soruldu?). Karşılaştırma grubu yoktur (içmeyenlerle kıyaslanmamış). Göreli fark mutlak gibi sunulur (“2 kat daha etkili!” — %1'den %2'ye çıkış da 2 kattır). Zaman aralığı seçilir (en iyi hafta gösterilir). “Araştırma” denir ama kaynak verilmez.",
    "Başka bir örnek: “Kullananların %94'ü memnun!” Kaç kişi kullandı? Memnun olmayanlar nerede? Anketi kim yaptı, sorular nasıldı? Bu sorular cevapsızsa, %94 bir süsten ibarettir.",
    "Bütün istatistikler yalan değildir; dürüst istatistik de vardır. Dürüst olanın üç işareti: kaç kişi (örneklem), neyle karşılaştırıldı (kontrol grubu), kaynak nerede (yayın, yöntem). Bu üçü yoksa, yüzdeye değil, eksiklere bak.",
  ],
  diagramTitle: "Seçilmiş istatistikler — kısa tanım",
  diagram:
    "Seçilmiş istatistik: Verinin işine gelen kısmını gösterip örneklemi, karşılaştırmayı ve kaynağı gizlemek.",
  rule: "Yüzdeyi görünce iki soru sor: Kaç kişide ölçüldü? Neyle karşılaştırıldı?",
};

export const MICRO_2: MicroLesson = {
  id: "mikro-2",
  title: "Mikro ders 2 — Algoritma baloncuğu",
  paragraphs: [
    "Algoritma baloncuğu, akışının sana hep aynı fikirdeki içerikleri göstermesidir. Platformlar, ilgilendiğin içerikleri öne çıkarır; tıkladığın, beğendiğin, izlediğin şeylerin benzerlerini getirir. Bir süre sonra akışın, kendi fikrinin aynası olur.",
    "Bu neden tehlikelidir? Çünkü balonun içindeyken “herkes böyle düşünüyor” hissi oluşur. Oysa gördüğün herkes değil, senin gibi düşünenlerin seçilmiş bir grubudur. Ders 1'deki onay önyargısını hatırla: algoritma, o önyargıyı senin için otomatikleştirir.",
    "Bu hile neden işler? Çünkü balon rahattır. Aynı fikirdeki içerikler seni doğruluyor hissettirir; karşıt görüş ise çaba ister. Beynin, çabasız olanı seçer. Üstelik balonun içindeyken karşıt görüşle hiç karşılaşmazsın, bu yüzden onun varlığını bile unutursun.",
    "Somut bir örnek: Aynı olay hakkında iki arkadaşın akışı tamamen farklı haberler gösterir. İkisi de “herkes benim gibi düşünüyor” der. İkisi de haklı sanır kendini; oysa ikisi de kendi balonunun içindedir.",
    "Manipülasyon bağlantısı: Balonun içinde kime ne göstereceğini bilenler, mesajı hedefe göre ayarlar. Korku satan, korkan balona; öfke satan, öfkeli balona gider. Seni balonunda tutan şey, çoğu zaman duygundur.",
    "Çözüm, uygulamayı silmek değildir. Çözüm, balonu fark etmek ve arada bilinçli olarak dışarı bakmaktır: farklı görüşteki bir kaynağı okumak, karşıt bir aramayı denemek, “akışım bana ne göstermiyor?” diye sormak.",
  ],
  diagramTitle: "Algoritma baloncuğu — kısa tanım",
  diagram:
    "Algoritma baloncuğu: Akışın, ilgilendiklerine göre sana hep aynı yönde içerik göstermesi ve karşıt görüşleri gizlemesi.",
  rule: "Akışın sana gösterdiği, gerçekliğin tamamı değil. Arada bilinçli olarak balonun dışına bak.",
};

export const MICRO_3: MicroLesson = {
  id: "mikro-3",
  title: "Mikro ders 3 — Yapay zekâ ile üretilmiş içerik",
  paragraphs: [
    "Yapay zekâ artık gerçek gibi görünen yazı, fotoğraf, ses ve video üretebiliyor. Hiç söylenmemiş bir cümleyi ünlü birinin ağzından duyabilir, hiç çekilmemiş bir fotoğrafı “müşteri fotoğrafı” diye görebilirsin.",
    "Bu neden önemli? Çünkü beyninin en eski reflekslerinden biri “gözümle gördüm” dür. Video gerçek gibi görünüyorsa, hızlı düşünme onu gerçek kabul eder. Oysa artık “gerçek gibi görünmek”, gerçek olduğu anlamına gelmiyor.",
    "Somut bir örnek: Viral bir video — ünlü oyuncu Selin Kaya “bu kremi 1 haftadır kullanıyorum, cildim yenilendi!” diyor. Video gerçek gibi. Ama Selin Kaya'nın resmi hesabında böyle bir video yok; videoyu yayınlayan, kremi satan anonim bir hesap. Video, yapay zekâyla üretilmiş olabilir.",
    "Peki nasıl anlarsın? Hiçbir işaret tek başına garanti vermez, ama şu kontroller işe yarar: Kaynağı sor — bunu kim yayınladı, orijinali nerede? Ünlünün resmi hesabında var mı? İddia tek bir anonim hesapta mı, yoksa bağımsız kaynaklarda da mı geçiyor? Görselde tuhaflık var mı (bozuk yazılar, garip eller, fazla mükemmel detaylar)?",
    "En güçlü iki soru şunlardır: “Bunu kim yayınladı?” ve “Orijinali nerede?” Bu iki sorunun cevabı yoksa, içerik ne kadar gerçek görünürse görünsün, kanıt sayılmaz.",
    "Dürüst not: Bu kontroller riski azaltır, sıfırlamaz. Yapay zekâ her geçen gün daha gerçekçi üretiyor. O yüzden son savunma hep aynıdır: kanıt ne, kaynak kim? FARK ET'in Kanıt ve Referans adımları, yapay zekâ çağında eskisinden de önemli.",
  ],
  diagramTitle: "Yapay zekâ içeriği — kısa tanım",
  diagram:
    "Yapay zekâ içeriği: Gerçek gibi görünen ama yapay zekâyla üretilmiş yazı, görsel, ses veya video.",
  rule: "Şüphelendiğinde kaynağı sor: Bunu kim yayınladı, orijinali nerede?",
};

export type MatchPair = { situation: string; answer: string };

export const MATCH_CATEGORIES = ["Sağlam istatistik", "Seçilmiş istatistik"];

export const MATCH_PAIRS: MatchPair[] = [
  {
    situation: "“500 kişilik bağımsız araştırmada, içmeyen gruba göre %12 daha enerjik.”",
    answer: "Sağlam istatistik",
  },
  {
    situation: "“%87'si daha enerjik hissetti! (kaç kişi, kime göre belli değil)”",
    answer: "Seçilmiş istatistik",
  },
  {
    situation: "“10.000 kullanıcıdan 9.400'ü memnun; anket yöntemi açıklandı.”",
    answer: "Sağlam istatistik",
  },
  {
    situation: "“2 kat daha etkili! (neyin 2 katı, başlangıç değeri ne, belli değil)”",
    answer: "Seçilmiş istatistik",
  },
  {
    situation: "“Yan etkiler 1.000 kişide 3 görüldü; rapor yayınlandı.”",
    answer: "Sağlam istatistik",
  },
  {
    situation: "“Doktorların %99'u öneriyor! (hangi doktorlar, kaç kişiye soruldu, belli değil)”",
    answer: "Seçilmiş istatistik",
  },
];

export const MATCH_CORRECT =
  "Hepsi doğru. Sağlam istatistiklerde hep aynı üç şey var: kaç kişi, neyle karşılaştırıldı, kaynak nerede. Bunlar yoksa, yüzde sadece bir süs.";

export const MATCH_WRONG =
  "Bu eşleşme tam olmadı, tekrar dene. İpucu: Örneklem sayısı, karşılaştırma grubu ve kaynak belirtilmişse sağlam; yüzde tek başına duruyorsa seçilmiş.";

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
    user: "AkışÖzet",
    text: "Akışındaki son 20 gönderinin 18'i aynı fikirde.",
    target: true,
    explanation:
      "Baloncuğun birinci işareti: hep aynı yönde içerik. Akışın seni doğruluyor, bilgilendirmiyor.",
  },
  {
    id: "t2",
    user: "AkışÖzet",
    text: "Farklı düşünen bir hesabı 3 aydır görmüyorsun.",
    target: true,
    explanation:
      "Baloncuğun ikinci işareti: karşıt görüşle hiç karşılaşmamak. Görmediğin görüş, yok olmuyor; sadece sana gösterilmiyor.",
  },
  {
    id: "t3",
    user: "AkışÖzet",
    text: "Dün akışta 45 dakika vakit geçirdin.",
    target: false,
    explanation: "",
  },
  {
    id: "t4",
    user: "AkışÖzet",
    text: "Bir gönderiyi beğendin, iki yorumu okudun.",
    target: false,
    explanation: "",
  },
];

export const TRAP_WRONG =
  "Bu cümle baloncuğu göstermiyor. İpucu: Baloncuğu gösteren cümle, hep aynı yönde içerik gördüğünü veya karşıt görüşle karşılaşmadığını anlatır.";

export const TRAP_COMPLETE =
  "İkisini de buldun. İşte baloncuğun iki işareti: hep aynı fikir, hiç karşıt görüş. Bunları gördüğünde akışın seni bir balonun içinde tutuyor demektir.";

export const POLL_MESSAGE =
  "“Viral video: Ünlü oyuncu Selin Kaya'dan itiraf! 'Bu kremi 1 haftadır kullanıyorum, cildim yenilendi!' 😱 Videoyu yayınlayan: firsat_kosesi (anonim hesap). Selin Kaya'nın resmi hesabında bu video yok.”";

export const POLL_OPTIONS = [
  "Videonun orijinal kaynağı ve çekim tarihi",
  "Satın alma linki ve indirim kodu",
  "Krem içeriğine dair bağımsız bir araştırma",
];

export const POLL_EXPLANATION = [
  "Doğru cevap 2. Bu tür videolar kanıt göstermez, satışa götürür: şaşırtıcı iddia, anonim kaynak, hemen altında link. Gerçek soru cevapsız kalır.",
  "Gerçek soru hep aynıdır: Bu video gerçekten o kişiye mi ait? Cevap yoksa, video ne kadar gerçek görünürse görünsün kanıt sayılmaz.",
];

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  correctFeedback: string;
  wrongFeedback: string;
};

export const MINI_QUIZ_1: QuizQuestion = {
  question: "Hangisi seçilmiş istatistik örneğidir?",
  options: [
    "%90 memnun! (kaç kişiye sorulduğu, yöntem belirtilmemiş)",
    "1.000 kişilik ankette %54 memnun; yöntem ve sorular yayınlandı.",
    "Araştırmaya katılmak ister misin?",
  ],
  answerIndex: 0,
  correctFeedback:
    "Doğru. Örneklem yok, yöntem yok, karşılaştırma yok; sadece yüzde var.",
  wrongFeedback:
    "Tekrar dene. Seçilmiş istatistikte yüzde tek başına durur; örneklem, yöntem ve karşılaştırma gizlenmiştir.",
};

export const MINI_QUIZ_2: QuizQuestion = {
  question:
    "Aynı olay hakkında iki arkadaşın akışı tamamen farklı haberler gösteriyorsa, bu neye örnektir?",
  options: ["Algoritma baloncuğu", "Seçilmiş istatistik", "Tesadüf"],
  answerIndex: 0,
  correctFeedback:
    "Doğru. İkisi de kendi balonunun içinde; ikisi de “herkes benim gibi düşünüyor” sanıyor.",
  wrongFeedback:
    "Tekrar dene. İpucu: Mesele sayıların seçilmesi değil, akışın herkese farklı bir gerçeklik göstermesi.",
};

export const MINI_QUIZ_3: QuizQuestion = {
  question:
    "Gerçek gibi görünen bir videonun yapay zekâ ürünü olabileceğini nasıl anlarsın?",
  options: [
    "Yayınlayan kaynağı ve orijinali kontrol ederek",
    "Çok paylaşıldığı için gerçek kabul ederek",
    "Müzik hoşuma gittiği için inanarak",
  ],
  answerIndex: 0,
  correctFeedback:
    "Doğru. “Bunu kim yayınladı, orijinali nerede?” — bu iki soru, en güçlü kontrolündür.",
  wrongFeedback:
    "Tekrar dene. İpucu: Beğeni sayısı ve müzik, içeriğin gerçek olduğunu göstermez; kaynak gösterir.",
};
