export type PostType = "deneme" | "siir" | "hikaye" | "soylesi" | "ceviri";

export interface Post {
  slug: string;
  title: string;
  author: string;
  type: PostType;
  date: string; // "2024-12-10"
  excerpt: string;
  body: string[]; // paragraflar
}

export const posts: Post[] = [
  {
    slug: "duvarda-ne-yaziyor",
    title: "Duvarda Ne Yazıyor?",
    author: "Defne Arslan",
    type: "deneme",
    date: "2024-12-10",
    excerpt:
      "Pompeii'nin duvarlarından başlayarak şehrin bedeninde gizlenen yazılara bir yolculuk.",
    body: [
      `Yanardağ külü altında kalanlar, duvarlara son sözlerini kazımıştı. O kelimeler hâlâ orada — zamanın içinde asılı, kimse okumasa da var olmaya devam ediyorlar.`,
      `Duvarlar tanık olmanın en eski biçimidir. Taş üstüne çizilen hayvan figürleri, hapishane hücrelerindeki kertikler, apartman bodruğundaki isimler — hepsi aynı dürtüden doğar: burada olduğumu bilsin biri.`,
      `Pompeii'de bir evin girişinde şu yazıyor: "Salve lucru." Kâr olsun. İki bin yıl önce yaşayan bir tüccar, her sabah o eşiği aşarken bu kelimeyi okurdu. Şimdi ben okuyorum. Aramızdaki her şey yıkılmış, yalnızca bu dilek ayakta.`,
      `Yazı, zamana karşı savaşın en ilkel silahıdır. Ve duvar, o savaşın en sessiz meydanı.`,
    ],
  },
  {
    slug: "sensiz-sefiliz",
    title: "Sensiz Sefiliz ve Şarkımız Sönüyor",
    author: "Selin Çelik",
    type: "siir",
    date: "2024-12-11",
    excerpt:
      "Yokluğun anatomisi üzerine bir şiir. Sesin değil, sesin bıraktığı boşluğun ağırlığı.",
    body: [
      `sensiz sefiliz
ve şarkımız sönüyor`,
      `bir şeyleri söylemeye çalışıyoruz
ama dil kısalıyor
cümleler ortasında bitiyor`,
      `müzik hâlâ çıkıyor hoparlörden
ama sen yokken
notalar birbirini bulamıyor`,
      `sefiliz —
bu kelime içi boş değil
tersine çok dolu
taşıyamayacak kadar`,
    ],
  },
  {
    slug: "hangi-iz-seni-bulur",
    title: "Hangi İz Seni Bulur?",
    author: "Zeynep Karahan",
    type: "hikaye",
    date: "2024-12-12",
    excerpt:
      "Ormanda bir izci, takip ettiği hayvanın peşinde giderken kendini kaybeder.",
    body: [
      `Kırık bir dal. Ezilmiş ot. Bir taşın altında ıslak zemin. Hayvan geçti buradan — büyük, ağır, saatler önce.`,
      `Orhan, diz çöküp toprağı inceledi. İz derinden basılmıştı. Kaçmıyordu, dolaşıyordu. Bu fark her şeydi.`,
      `İki saat sonra Orhan durdu. Artık hayvanı değil, kendi izlerini takip ettiğini anladı. Orman onu döndürmüştü kendine.`,
      `Hangi iz seni bulur diye sormuştu dedesi. Şimdi anladı: yalnızca bıraktıkların.`,
    ],
  },
  {
    slug: "hangi-hikaye-seni-yasatir",
    title: "Hangi Hikaye Seni Yaşatır?",
    author: "Aylin Toprak",
    type: "deneme",
    date: "2024-12-13",
    excerpt:
      "Şehrazad'ın her gece bir hikaye anlatması tesadüf değildi. Anlatmak, var olmak demekti.",
    body: [
      `İnsan anlatan bir hayvandır. Bunu biyoloji değil, tarih söylüyor. Mağaraların duvarlarındaki figürlerden itibaren kendimizi anlatmak zorunda hissettik. Neden?`,
      `Şehrazad'ın stratejisi basitti: susmak ölmek demekti. Her gece bir hikaye açtı, ertesi geceye köprü kurdu. Bin bir gece, bin bir köprü.`,
      `Ama hangi hikaye seni yaşatır? Şanlı olanlar değil. Gerçek olanlar. Utanç duyduğun, tekrar tekrar anlattığın, anlattıkça değişen hikayeler.`,
      `Hikaye, yaşanmışlığın değil yaşanmışlığı taşıma biçiminin adıdır. Aynı olay, farklı anlatılarda başka insan olur.`,
    ],
  },
  {
    slug: "senin-rengin-hangisi",
    title: "Senin Rengin Hangisi?",
    author: "Deniz Koç",
    type: "deneme",
    date: "2024-12-14",
    excerpt:
      "Neden her şeyi siyah ve beyaza indirgeriz? Gri'nin içindeki zenginlik üzerine.",
    body: [
      `Eski Yunan'da mavi için kelime yoktu. Gökyüzü renksizdi, deniz koyuydu. Bugün bunu absürd buluyoruz — mavi orada değil miydi?`,
      `Vardı. Ama adı yoktu. Ve adı olmayan şey, zihnin içinde var olamaz tam anlamıyla.`,
      `Renk görmek öğrenilir. Bazıları renk körüdür, bazıları ise fazla görür. Sinestezik birinin sesleri renk olarak algılaması, patoloji değil — farklı bir kodlama sistemi.`,
      `Senin rengin hangisi diye sorduğumuzda aslında şunu soruyoruz: hangi şeyleri görebiliyorsun, hangileri hâlâ adsız?`,
    ],
  },
  {
    slug: "kirmizinin-tarihi",
    title: "Kırmızının Tarihi",
    author: "Meral Doğan",
    type: "ceviri",
    date: "2024-12-20",
    excerpt:
      "Kırmızı; kan, ateş, tehlike, aşk, devrim. Bu renk nasıl bu kadar çok şey oldu?",
    body: [
      `Kırmızı boyayı elde etmek uzun süre son derece zordu. Koşnil böceği, binlerce yıl boyunca kırmızının tek gerçek kaynağıydı. Bir kilo boya için yüz bin böcek gerekiyordu.`,
      `Bu yüzden kırmızı, güç rengi oldu. Kardinal kaftanları, imparatorluk mühürleri, savaş bayrakları — hepsi kırmızı çünkü kırmızıyı ancak güçlüler karşılayabilirdi.`,
      `Sonra anilinden sentetik boya geldi. Kırmızı ucuzladı ve demokratikleşti. Ama anlamı ucuzlamadı. Hâlâ kan, hâlâ ateş.`,
      `Belki anlam, maddenin tarihinde saklı. Biz rengi taşıyoruz ama asıl taşınan, o rengi elde etmek için ödenen bedel.`,
    ],
  },
  {
    slug: "yas-tutmanin-cografyasi",
    title: "Yas Tutmanın Coğrafyası",
    author: "Berk Aydın",
    type: "deneme",
    date: "2024-12-28",
    excerpt:
      "Her yas kendine özgü bir mekân açar içimizde. Oraya başka kimse giremez.",
    body: [
      `Yas bir duygu değildir. Bir coğrafyadır. İçimizde bir yer açılır, kayıpla birlikte. O yer önceden yoktu — yokluğun bizzat kendisi onu var etti.`,
      `Annem öldüğünde mutfak değişti. Aynı mutfak, ama farklı bir yer oldu. Artık oraya her girişimde bir şey eksik, adını koyamadığım bir ağırlık var.`,
      `Psikologlar bu duyguya "yokluk varlığı" diyor. Olmayan şeyin varlığı. Paradoks ama doğru.`,
      `Yas tutmak, o coğrafyayı öğrenmektir. Haritasını çıkarmak değil — tam tersine, haritasız dolaşmayı öğrenmek.`,
    ],
  },
  {
    slug: "dna",
    title: "DNA",
    author: "Tuna Aktaş",
    type: "siir",
    date: "2025-01-05",
    excerpt:
      "Milyonlarca yıl önce yaşayan birinin izleri bugün hâlâ bedenimdedir.",
    body: [
      `bir balık yüzdü
okyanustan çıktı
ağır ağır
sahile vurdu`,
      `o balığın torunu benim
şimdi masada oturuyorum
ama bacaklarım hâlâ
su arıyor`,
      `yüzbin kuşak
bir satır kodda saklı
açsan görürsün
o balığı`,
      `milyonlarca yıl
sıkıştırılmış
her hücremde
sabırsızca bekliyor`,
    ],
  },
  {
    slug: "gece-yarisi-graffitisi",
    title: "Gece Yarısı Graffitisi",
    author: "Mert Kaya",
    type: "hikaye",
    date: "2025-01-12",
    excerpt:
      "Şehrin tenha sokaklarında, kimse görmeden ellerin bıraktığı izler kimin için?",
    body: [
      `Saat üç. Sokak boş. Nilüfer, sırt çantasındaki boyaları çıkardı. Eldivenlerini taktı, maske taktı.`,
      `Bu duvar aylardır boş duruyordu. Birileri görmesi için değil — kimse görmeyecekti bu saatte. Kendi için yapıyordu.`,
      `Sabaha karşı bitti. Adımını attı geriye. Duvar artık konuşuyordu. Ne dediğini okumak için sabah ışığı gerekiyordu.`,
      `Nilüfer oradan ayrılırken şunu düşündü: en dürüst şeyler, seyirci olmadığında yapılanlar.`,
    ],
  },
  {
    slug: "mimari-hafiza",
    title: "Mimari Hafıza",
    author: "Can Doğan",
    type: "soylesi",
    date: "2025-01-20",
    excerpt:
      "Yapılar yıkılır ama onları kuşatan hafıza yıkılmaz. Şehrin bedeni ve ruhu üzerine.",
    body: [
      `Bir şehrin en derin hafızası taşında değil, sakinlerinin yürüyüş biçimindedir. Artık olmayan bir yapının etrafından dolaşmaya devam ederler. Beden, zihinden önce siler.`,
      `İstanbul'da Bizans surlarının yakınında doğan biri, o surları hiç görmemiş olsa bile onları taşır bedeninde. Şehirler beden belleğiyle aktarılır, kitaplarla değil.`,
      `Yıkım, hafızayı silmez. Tersine onu yoğunlaştırır. "Burada bir şey vardı" cümlesi, o şeyin kendisinden daha uzun yaşar.`,
      `Mimar olarak en çok korktuğum şey yapının yıkılması değil, yıkılırken geride hiçbir iz bırakmaması. İz bırakmak için var olmak yetmez, var olmanın farkında birileri olması gerekir.`,
    ],
  },
  {
    slug: "son-kaseti",
    title: "Son Kaseti",
    author: "İrem Şahin",
    type: "hikaye",
    date: "2025-02-01",
    excerpt:
      "Annesinin sesi hâlâ kasette. Yıllardır çalamıyor. Bir gün çalacak mı?",
    body: [
      `Kaset on yıldır çekmecedenin altında. Ambalajı hâlâ üzerinde — hiç açmadı.`,
      `Annesi ölmeden iki gün önce kaydetmişti. "Sana bir şeyler anlatmak istedim" demişti. Anlatamamıştı. Kaseti bırakmıştı.`,
      `Leyla bazen çekmeceyi açıyor, kasete bakıyor, kapatıyor. Sesi olmayan bir nesne bu. Ama içi dolu. Taşınamayacak kadar dolu.`,
      `Bir gün çalacak, diye düşünüyor. Ama o gün henüz gelmedi. Belki de gelmemesi gerekiyor.`,
    ],
  },
  {
    slug: "buyukannemin-masallari",
    title: "Büyükannemin Masalları",
    author: "Hasan Çevik",
    type: "deneme",
    date: "2025-02-14",
    excerpt:
      "O gidince masallar da gitti sandım. Sonra kendi dilimden çıktıklarını gördüm.",
    body: [
      `Büyükannem masal anlatırken sesi değişirdi. Daha yavaş, daha alçak, bazen neredeyse fısıltı.`,
      `O öldüğünde masallar da öldü sandım. Ama kendi çocuğuma uyurken şarkı söylerken büyükannemin sesini duydum. Benden çıkıyordu.`,
      `Kültür bu şekilde taşınır: kelimeler değil, sesin tonu. Ritimdeki tereddüt. Nasıl durulacağı.`,
      `Büyükannem hiç kitap okumadı. Ama bana edebiyat öğretti — anlatıcının bedeniyle başlayan, dinleyicinin bedeninde biten o sözlü şiiri.`,
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const typeLabels: Record<PostType, string> = {
  deneme: "Deneme",
  siir: "Şiir",
  hikaye: "Hikaye",
  soylesi: "Söyleşi",
  ceviri: "Çeviri",
};
