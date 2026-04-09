export interface Article {
  title: string;
  author: string;
  excerpt: string;
  slug: string;
  type: "deneme" | "siir" | "hikaye" | "soylesi" | "ceviri";
}

export interface Issue {
  number: number;
  title: string;
  slug: string;
  date: string;
  year: number;
  coverQuote: string;
  description: string;
  editorial: string;
  articles: Article[];
}

export const issues: Issue[] = [
  {
    number: 1,
    title: "Duvarda Ne Yazıyor?",
    slug: "sayi-1",
    date: "Aralık 2024",
    year: 2024,
    coverQuote: "Duvarda ne yazıyor?",
    description:
      "İlk sayımızda duvarların belleğini araştırıyoruz. Yazıların, grafitlerin, izlerin bize ne anlattığını soruyoruz.",
    editorial:
      "Her duvar bir tanıktır. Üzerindeki yazılar, kazımalar, izler — bunlar silinemez bir tarihin parçasıdır. Bu sayıda duvarları konuşturduk; onların dilini çözmeye çalıştık.",
    articles: [
      {
        title: "Pompeii'nin Son Sözleri",
        author: "Defne Arslan",
        excerpt:
          "Yanardağ külü altında kalanlar, duvarlara son sözlerini kazımıştı. O kelimeler hâlâ orada, zamanın içinde asılı.",
        slug: "pompeiinin-son-sozleri",
        type: "deneme",
      },
      {
        title: "Gece Yarısı Graffitisi",
        author: "Mert Kaya",
        excerpt:
          "Şehrin tenha sokaklarında, kimse görmeden ellerin bıraktığı izler. Bu izler kimin için?",
        slug: "gece-yarisi-graffitisi",
        type: "hikaye",
      },
      {
        title: "Hapishane Duvarları Üzerine",
        author: "Leyla Öztürk",
        excerpt:
          "Dört duvar arasında geçen yıllar, kertiğe vurulan günler, silinen isimler.",
        slug: "hapishane-duvarlari-uzerine",
        type: "siir",
      },
      {
        title: "Mimari Hafıza",
        author: "Can Doğan",
        excerpt:
          "Yapılar yıkılır ama onları kuşatan hafıza yıkılmaz. Şehrin bedeni ve ruhu üzerine bir konuşma.",
        slug: "mimari-hafiza",
        type: "soylesi",
      },
    ],
  },
  {
    number: 2,
    title: "Sensiz Sefiliz",
    slug: "sayi-2",
    date: "Aralık 2024",
    year: 2024,
    coverQuote: "Sensiz sefiliz ve şarkımız sönüyor.",
    description:
      "Yokluğun ağırlığı üzerine. Kaybın anatomisi, sessizliğin gürültüsü ve sönmeye yüz tutan şarkılar.",
    editorial:
      "Yokluk bir şeydir. Dolduramayacağımız bir yer kaplar. Bu sayıda kaybın çeşitli yüzlerine baktık — ölüm, ayrılık, unutuş ve o tuhaf boşluk.",
    articles: [
      {
        title: "Yas Tutmanın Coğrafyası",
        author: "Selin Çelik",
        excerpt:
          "Her yas kendine özgü bir mekân açar içimizde. Oraya başka kimse giremez.",
        slug: "yas-tutmanin-cografyasi",
        type: "deneme",
      },
      {
        title: "Son Kaseti",
        author: "Berk Aydın",
        excerpt:
          "Annesinin sesi hâlâ kasette. Yıllardır çalamıyor. Bir gün çalacak mı?",
        slug: "son-kaseti",
        type: "hikaye",
      },
      {
        title: "Hayalet Acı",
        author: "İrem Şahin",
        excerpt:
          "Yok olan bir uzvu hâlâ hissedebilirsiniz. Sevgide de böyle bir şey vardır.",
        slug: "hayalet-aci",
        type: "siir",
      },
      {
        title: "Unutuşun Fizyolojisi",
        author: "Alp Erdoğan",
        excerpt:
          "Beyin neden siler? Hangi anlar kalır, hangileri gider? Nörobilim ve şiir arasında bir yolculuk.",
        slug: "unutusun-fizyolojisi",
        type: "deneme",
      },
    ],
  },
  {
    number: 3,
    title: "Hangi İz Seni Bulur?",
    slug: "sayi-3",
    date: "Aralık 2024",
    year: 2024,
    coverQuote: "Hangi iz seni bulur?",
    description:
      "İzler ve onları bırakanlar. Takip etmek, takip edilmek, ve farkında olmadan bıraktığımız işaretler.",
    editorial:
      "Nereye gitsek bir şeyler bırakırız. Bir koku, bir kıl, bir iz. Bu sayıda izleri takip ettik — bize geri ne buldular, onları bırakanlar nereye gitti.",
    articles: [
      {
        title: "Dedektifin Gözü",
        author: "Ceren Yılmaz",
        excerpt:
          "Her suç mahallinde biri bir şey bırakmıştır. Bulmak, bakmayı bilmektir.",
        slug: "dedektifin-gozu",
        type: "deneme",
      },
      {
        title: "DNA",
        author: "Tuna Aktaş",
        excerpt:
          "Milyonlarca yıl önce yaşayan birinin izleri bugün hâlâ bedenimdedir.",
        slug: "dna",
        type: "siir",
      },
      {
        title: "İzci",
        author: "Zeynep Karahan",
        excerpt:
          "Kırık bir dal. Ezilmiş ot. Bir taşın altında ıslak zemin. Hayvan geçti buradan.",
        slug: "izci",
        type: "hikaye",
      },
    ],
  },
  {
    number: 4,
    title: "Hangi Hikaye Seni Yaşatır?",
    slug: "sayi-4",
    date: "Aralık 2024",
    year: 2024,
    coverQuote: "Hangi hikaye seni yaşatır?",
    description:
      "Hayatta kalmak için hikayeye ihtiyacımız vardır. Bu sayıda anlatıyı ve anlatının bizi nasıl şekillendirdiğini araştırıyoruz.",
    editorial:
      "İnsan anlatan bir hayvandır. Anlatmak durumundayız — kendimize, birbirimize. Bu sayıda hikayenin hayat memat meselesi olduğunu anladık.",
    articles: [
      {
        title: "Şehrazad'ın Stratejisi",
        author: "Aylin Toprak",
        excerpt:
          "Her gece bir hikaye. Çünkü susmak ölmek demekti. Anlatmak, var olmak demekti.",
        slug: "sehrazadin-stratejisi",
        type: "deneme",
      },
      {
        title: "Büyükannemin Masalları",
        author: "Hasan Çevik",
        excerpt:
          "O gidince masallar da gitti sandım. Sonra kendi dilimden çıktıklarını gördüm.",
        slug: "buyukannemin-masallari",
        type: "hikaye",
      },
      {
        title: "Hastalık Anlatısı",
        author: "Pınar Arslan",
        excerpt:
          "Tedavi sürecinde doktorlar benden hikayemi istedi. Hikayemi anlatmak iyileşmenin bir parçasıydı.",
        slug: "hastalik-anlatisi",
        type: "soylesi",
      },
    ],
  },
  {
    number: 5,
    title: "Senin Rengin Hangisi?",
    slug: "sayi-5",
    date: "Aralık 2024",
    year: 2024,
    coverQuote: "Senin rengin hangisi?",
    description:
      "Renk ve kimlik. Görünen ve görünmeyen. Renksizliğin rengi ve tek rengin monotonluğu üzerine.",
    editorial:
      "Renk görmek öğrenilir. Bazıları renk körüdür, bazıları ise fazla görür. Bu sayıda rengi sorguladık — pigment olarak değil, varoluş olarak.",
    articles: [
      {
        title: "Siyah-Beyaz Düşünmek",
        author: "Deniz Koç",
        excerpt:
          "Neden her şeyi iki renge indirgeriz? Gri'nin zenginliği neden bize çekici gelmiyor?",
        slug: "siyah-beyaz-dusunmek",
        type: "deneme",
      },
      {
        title: "Y애스민'in Evi",
        author: "Sinan Ballı",
        excerpt:
          "Her odası farklı bir renkte. Her oda farklı bir duygu. Kapıdan geçince dönüşüyorsunuz.",
        slug: "yasminin-evi",
        type: "hikaye",
      },
      {
        title: "Kırmızının Tarihi",
        author: "Meral Doğan",
        excerpt:
          "Kırmızı kan demek, ateş demek, tehlike demek, aşk demek. Nasıl bu kadar çok şey oldu?",
        slug: "kirmizinin-tarihi",
        type: "deneme",
      },
      {
        title: "Maviye Dair",
        author: "Serra Akçay",
        excerpt:
          "Eski Yunan'da mavi için kelime yoktu. Gökyüzü renksizdi. Deniz koyuydu.",
        slug: "maviye-dair",
        type: "ceviri",
      },
    ],
  },
];

export const latestIssue = issues[issues.length - 1];
export const featuredArticles = issues.flatMap((i) => i.articles).slice(0, 6);
