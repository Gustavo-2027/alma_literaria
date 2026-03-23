// src/data/Books.js

const COUNTRY_BY_NATIONALITY = Object.freeze({
  brasileira: "Brasil",
  portuguesa: "Portugal",
  inglesa: "Inglaterra",
  francesa: "França",
  russa: "Rússia",
  japonesa: "Japão",
  irlandesa: "Irlanda",
  italiana: "Itália",
  grega: "Grécia",
  espanhola: "Espanha",
  colombiana: "Colômbia",
  tcheca: "Tchéquia",
  americana: "Estados Unidos",
  estadunidense: "Estados Unidos",
  alemã: "Alemanha",
  argentina: "Argentina",
});

const NATIONALITY_BY_COUNTRY = Object.freeze({
  Brasil: "brasileira",
  Portugal: "portuguesa",
  França: "francesa",
  Rússia: "russa",
  Japão: "japonesa",
  Inglaterra: "inglesa",
  Irlanda: "irlandesa",
  Itália: "italiana",
  Grécia: "grega",
  Espanha: "espanhola",
  Colômbia: "colombiana",
  Tchéquia: "tcheca",
  "Estados Unidos": "estadunidense",
  Alemanha: "alemã",
  Argentina: "argentina",
});

const LANGUAGE_BY_COUNTRY = Object.freeze({
  Brasil: "pt-BR",
  Portugal: "pt-PT",
  França: "fr",
  Rússia: "ru",
  Japão: "ja",
  Inglaterra: "en",
  Irlanda: "en",
  "Estados Unidos": "en",
  Espanha: "es",
  Colômbia: "es",
  Grécia: "gr",
  Itália: "it",
  Tchéquia: "cs",
  Alemanha: "de",
  Argentina: "es",
  Internacional: "original",
});

const AUTHOR_COUNTRY_MAP = Object.freeze({
  "Graciliano Ramos": "Brasil",
  "Jorge Amado": "Brasil",
  "Machado de Assis": "Brasil",
  "Clarice Lispector": "Brasil",
  "Carlos Drummond de Andrade": "Brasil",
  "José de Alencar": "Brasil",
  "Aluísio Azevedo": "Brasil",
  "Lima Barreto": "Brasil",

  "Osamu Dazai": "Japão",
  "Fiódor Dostoiévski": "Rússia",
  "Franz Kafka": "Tchéquia",
  "Albert Camus": "França",
  "Fernando Pessoa": "Portugal",
  "Ernest Hemingway": "Estados Unidos",
  "Miguel de Cervantes": "Espanha",
  "Jane Austen": "Inglaterra",
  "Gabriel García Márquez": "Colômbia",
  "Harper Lee": "Estados Unidos",
  "George Orwell": "Inglaterra",
  "F. Scott Fitzgerald": "Estados Unidos",
  "Gustave Flaubert": "França",
  Homero: "Grécia",
  "Virginia Woolf": "Inglaterra",
  "Oscar Wilde": "Irlanda",
  "J.R.R. Tolkien": "Inglaterra",
  "J.D. Salinger": "Estados Unidos",
  "Jules Verne": "França",
  "Marcel Proust": "França",
  "Emily Brontë": "Inglaterra",
  "James Joyce": "Irlanda",
  "John Steinbeck": "Estados Unidos",
  "Liev Tolstói": "Rússia",
  "Victor Hugo": "França",
  "Bram Stoker": "Irlanda",
  "Mary Shelley": "Inglaterra",
  "Dante Alighieri": "Itália",
  "Alexandre Dumas": "França",
  "Nathaniel Hawthorne": "Estados Unidos",
  "Herman Melville": "Estados Unidos",
  "Thomas Mann": "Alemanha",
  Goethe: "Alemanha",
  "León Tolstói": "Rússia",
  "Anton Tchekhov": "Rússia",
  "Nikolai Gógol": "Rússia",
  "Thomas Hardy": "Inglaterra",
  "Robert Louis Stevenson": "Inglaterra",
  "José Saramago": "Portugal",
});

/* =========================
   RAW DATA
========================= */
const rawBooks = [
  {
    id: 1,
    name: "Vidas secas",
    price: 19,
    image: "https://m.media-amazon.com/images/I/71NYL2AbBIL.jpg",
    author: "Graciliano Ramos",
    description:
      "Um dos maiores clássicos da literatura brasileira e retrato de uma época, Vidas secas traz a história de uma família que, procurando uma vida melhor, enfrenta a seca do sertão, a fome, o desamparo e a violência das instituições.",
    genre: "Romance Regionalista",
    publisher: "Record",
    publication_year: 1938,
    isbn: "9788501001115",
    rating: 4.7,
    nationality: "brasileira",
    collection: "classicos-brasileiros",
  },
  {
    id: 2,
    name: "Declínio de um Homem",
    price: 40,
    image: "https://m.media-amazon.com/images/I/81sblL-t2iL._SY466_.jpg",
    author: "Osamu Dazai",
    description:
      "A curta passagem pela vida do escritor japonês Osamu Dazai - suicidou-se aos 38 anos de idade - não o impediu de se transformar num autor bastante popular. Declínio de um homem, editado pela primeira vez no Brasil, vendeu mais de 10 milhões de exemplares desde sua publicação original, em 1948. A obra sintetiza em cenas e passagens notoriamente biográficas muitas das angústias que tanto alimentavam a personalidade autodestrutiva do autor, a saber: a dificuldade de entendimento com seus familiares, sua antissociabilidade niilista, seu patológico apego ao álcool - vício do qual nunca conseguiu se livrar -, sua autoestima inexistente, enfim, sua evidente sensação de deslocamento em relação ao mundo - como se tivesse sido enviado à existência por mero descuido.",
    genre: "Romance Autobiográfico",
    publisher: "Estação Liberdade",
    publication_year: 1948,
    isbn: "9788574482651",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Memórias do subsolo",
    price: 43.37,
    image: "https://m.media-amazon.com/images/I/81B8n0OCzTL.jpg",
    author: "Fiódor Dostoiévski",
    description:
      "Obra-prima da literatura mundial, esta pequena novela traz, em embrião, vários temas da fase madura de Dostoiévski. Seu protagonista, um funcionário que vive no subsolo de um edifício em São Petersburgo, expõe a sua visão de mundo num discurso explosivo, labiríntico, vertido impecavelmente para o português por Boris Schnaiderman. Tradução primorosa. (Luciano Trigo, O Globo)",
    genre: "Romance Filosófico",
    publisher: "Editora 34",
    publication_year: 1864,
    isbn: "9788573261394",
    rating: 4.6,
  },
  {
    id: 4,
    name: "A metamorfose",
    price: 40.51,
    image:
      "https://m.media-amazon.com/images/I/8115Gj1cb6L._UF1000,1000_QL80_.jpg",
    author: "Franz Kafka",
    description:
      "A metamorfose é a mais célebre novela de Franz Kafka e uma das mais importantes de toda a história da literatura. Sem a menor cerimônia, o texto coloca o leitor diante de um caixeiro-viajante - o famoso Gregor Samsa - transformado em inseto monstruoso. A partir daí, a história é narrada com um realismo inesperado que associa o inverossímil e o senso de humor ao que é trágico, grotesco e cruel na condição humana - tudo no estilo transparente e perfeito desse mestre inconfundível da ficção universal.",
    genre: "Novela Existencialista",
    publisher: "Companhia das Letras",
    publication_year: 1915,
    isbn: "9788535902778",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Capitães da areia",
    price: 42.86,
    image:
      "https://m.media-amazon.com/images/I/518UWo1qbVL._AC_UF1000,1000_QL80_.jpg",
    author: "Jorge Amado",
    description:
      "Capitães da Areia, a história crua e comovente de meninos pobres que moram num trapiche abandonado em Salvador, é talvez o romance mais influente de Jorge Amado. Clássico absoluto dos livros sobre a infância abandonada, assombrou e encantou várias gerações de leitores e permanece hoje tão atual quanto na época em que foi escrito.",
    genre: "Romance Social",
    publisher: "Companhia das Letras",
    publication_year: 1937,
    isbn: "9788535908053",
    rating: 4.7,
    nationality: "brasileira",
    collection: "classicos-brasileiros",
  },
  {
    id: 6,
    name: "Casa velha",
    price: 15.67,
    image:
      "https://http2.mlstatic.com/D_NQ_NP_657136-MLA81619515266_012025-O.webp",
    author: "Machado de Assis",
    description:
      "Publicado em folhetim entre os anos de 1885 e 1886, Casa Velha é o sexto romance de Machado de Assis. Redescoberta pela pesquisadora Lúcia Miguel Pereira em 1944, a obra é a menos conhecida pelo grande público. O livro é narrado por um padre que decide escrever uma obra política sobre o Primeiro Reinado de D. Pedro I.",
    genre: "Romance Histórico",
    publisher: "Martin Claret",
    publication_year: 1885,
    isbn: "9788572324274",
    rating: 4.2,
    nationality: "brasileira",
    collection: "classicos-brasileiros",
  },
  {
    id: 7,
    name: "O mito de Sísifo",
    price: 42.28,
    image:
      "https://m.media-amazon.com/images/I/81ccIcOmAoL._AC_UF1000,1000_QL80_.jpg",
    author: "Albert Camus",
    description:
      "De um dos mais importantes e representativos autores do século XX e Prêmio Nobel de Literatura, O mito de sísifo traz ensaios sobre o absurdo e o irracional, tornando-se uma importante contribuição filosófico-existencial que exerce influência profunda sobre toda uma geração.",
    genre: "Ensaio Filosófico",
    publisher: "Record",
    publication_year: 1942,
    isbn: "9788501083166",
    rating: 4.6,
  },
  {
    id: 8,
    name: "O idiota",
    price: 90.44,
    image:
      "https://m.media-amazon.com/images/I/61p5klqNRBL._AC_UF1000,1000_QL80_.jpg",
    author: "Fiódor Dostoiévski",
    description:
      "Nova edição, revista pelo tradutor, de O idiota, um dos grandes romances de Dostoiévski, trazendo a série completa de ilustrações de Oswaldo Goeldi. Publicado originalmente em 1868, este é um desses livros em que o leitor reconhece de imediato a marca do gênio.",
    genre: "Romance Clássico",
    publisher: "Editora 34",
    publication_year: 1868,
    isbn: "9788573266146",
    rating: 4.8,
  },
  {
    id: 9,
    name: "A hora da estrela",
    price: 26.16,
    image:
      "https://cdn.kobo.com/book-images/69f20b19-529d-49ab-afb9-a4c176724a09/1200/1200/False/a-hora-da-estrela-2.jpg",
    author: "Clarice Lispector",
    description:
      "Pouco antes de morrer, em 1977, Clarice Lispector decide se afastar da inflexão intimista que caracteriza sua escrita para desafiar a realidade. O resultado desse salto na extroversão é A hora da estrela, o livro mais surpreendente que escreveu.",
    genre: "Romance Psicológico",
    publisher: "Rocco",
    publication_year: 1977,
    isbn: "9788532508416",
    rating: 4.5,
    nationality: "brasileira",
    collection: "classicos-brasileiros",
  },
  {
    id: 10,
    name: "Noites Brancas",
    price: 35.24,
    image:
      "https://m.media-amazon.com/images/I/81YbCXxpP6L._UF1000,1000_QL80_.jpg",
    author: "Fiódor Dostoiévski",
    description:
      "Durante uma das maravilhosas noites brancas do verão de São Petersburgo, em que o sol praticamente não se põe, dois jovens se encontram numa ponte sobre o rio Nievá, dando início a uma história carregada de fantasia, emoção e lirismo.",
    genre: "Novela Romântica",
    publisher: "L&PM",
    publication_year: 1848,
    isbn: "9788525423948",
    rating: 4.4,
  },
  {
    id: 11,
    name: "Livro do desassossego",
    price: 24.5,
    image:
      "https://m.media-amazon.com/images/I/91d09o66Z9L._AC_UF1000,1000_QL80_.jpg",
    author: "Fernando Pessoa",
    description:
      "Os fragmentos que compõem esta complexa obra representam a inquietude, os sentimentos, as dúvidas e o amplo conhecimento de mundo daquele que segurava a caneta para escrever tão profundas palavras e ao fim assinar sob o semi-heterônimo de Bernardo Soares.",
    genre: "Prosa Poética",
    publisher: "Companhia das Letras",
    publication_year: 1982,
    isbn: "9788535928198",
    rating: 4.6,
    nationality: "brasileira",
    collection: "classicos-brasileiros",
  },
  {
    id: 12,
    name: "O velho e o mar",
    price: 41.27,
    image: "https://m.media-amazon.com/images/I/71wo6d7Ex3L._SY466_.jpg",
    author: "Ernest Hemingway",
    description:
      "Depois de anos na profissão, havia 84 dias que o velho pescador Santiago não apanhava um único peixe. Por isso já diziam se tratar de um salão, ou seja, um azarento da pior espécie. Mas ele possui coragem, acredita em si mesmo, e parte sozinho para alto-mar.",
    genre: "Novela",
    publisher: "Bertrand Brasil",
    publication_year: 1952,
    isbn: "9788528613056",
    rating: 4.7,
  },
  {
    id: 13,
    name: "Dom Quixote",
    price: 59.9,
    image:
      "https://www.lpm.com.br/livros/imagens/dom_quixote_hq_9788525425669_hd.jpg",
    author: "Miguel de Cervantes",
    description:
      "A história do cavaleiro errante Dom Quixote e seu fiel escudeiro Sancho Pança é uma das obras-primas da literatura mundial. Publicada em duas partes (1605 e 1615), a novela satiriza os romances de cavalaria e explora temas como idealismo, realidade e a busca por justiça em um mundo imperfeito.",
    genre: "Romance de Cavalaria",
    publisher: "Companhia das Letras",
    publication_year: 1605,
    isbn: "9788535914849",
    rating: 4.9,
  },
  {
    id: 14,
    name: "Orgulho e Preconceito",
    price: 34.9,
    image:
      "https://www.lpm.com.br/livros/imagens/orgulho_e_preconceito_9788525404350_hd.jpg",
    author: "Jane Austen",
    description:
      "Um clássico da literatura inglesa, Orgulho e Preconceito acompanha Elizabeth Bennet, uma jovem inteligente e espirituosa, enquanto navega por questões de amor, casamento, classe social e expectativas culturais na Inglaterra do início do século XIX.",
    genre: "Romance",
    publisher: "Martin Claret",
    publication_year: 1813,
    isbn: "9788572329989",
    rating: 4.8,
  },
  {
    id: 15,
    name: "Cem Anos de Solidão",
    price: 49.9,
    image:
      "https://m.media-amazon.com/images/I/816Yy5v+S5L._AC_UF1000,1000_QL80_.jpg",
    author: "Gabriel García Márquez",
    description:
      "Um marco do realismo mágico, Cem Anos de Solidão narra a saga da família Buendía ao longo de sete gerações na fictícia cidade de Macondo, explorando temas de solidão, destino e repetição histórica.",
    genre: "Realismo Mágico",
    publisher: "Record",
    publication_year: 1967,
    isbn: "9788501078087",
    rating: 4.9,
  },
  {
    id: 16,
    name: "Matar um Rouxinol",
    price: 39.9,
    image:
      "https://m.media-amazon.com/images/I/61DV+FqQX5L._UF1000,1000_QL80_.jpg",
    author: "Harper Lee",
    description:
      "Um clássico da literatura americana, Matar um Rouxinol aborda racismo e injustiça no sul dos EUA através dos olhos de Scout Finch, uma jovem que observa seu pai, o advogado Atticus Finch, defender um homem negro acusado injustamente.",
    genre: "Romance Social",
    publisher: "José Olympio",
    publication_year: 1960,
    isbn: "9788503011273",
    rating: 4.8,
  },
  {
    id: 17,
    name: "1984",
    price: 29.9,
    image:
      "https://m.media-amazon.com/images/I/61NAx5pd6XL._AC_UF1000,1000_QL80_.jpg",
    author: "George Orwell",
    description:
      "Uma distopia clássica, 1984 apresenta um mundo totalitário onde o governo controla todos os aspectos da vida, vigiando os cidadãos através do Big Brother. Winston Smith tenta resistir à opressão, mas enfrenta as consequências de sua rebelião.",
    genre: "Distopia",
    publisher: "Companhia das Letras",
    publication_year: 1949,
    isbn: "9788535914849",
    rating: 4.9,
  },
  {
    id: 18,
    name: "O Grande Gatsby",
    price: 35.5,
    image:
      "https://m.media-amazon.com/images/I/81Ph4QRq1gL._AC_UF1000,1000_QL80_.jpg",
    author: "F. Scott Fitzgerald",
    description:
      "Ambientado na era do jazz dos anos 1920, O Grande Gatsby explora o sonho americano através da vida de Jay Gatsby, um milionário misterioso obcecado por reconquistar seu amor perdido, Daisy Buchanan.",
    genre: "Romance",
    publisher: "Penguin Companhia",
    publication_year: 1925,
    isbn: "9788580860023",
    rating: 4.7,
  },
  {
    id: 19,
    name: "Madame Bovary",
    price: 42.0,
    image: "https://m.media-amazon.com/images/I/71g1zt4jRVL.jpg",
    author: "Gustave Flaubert",
    description:
      "Este romance realista acompanha Emma Bovary, uma mulher insatisfeita com sua vida provinciana que busca paixão e luxo através de casos extraconjugais, levando-a a uma tragédia de dívidas e desespero.",
    genre: "Romance Realista",
    publisher: "Zahar",
    publication_year: 1857,
    isbn: "9788537810125",
    rating: 4.6,
  },
  {
    id: 20,
    name: "A Odisséia",
    price: 45.0,
    image: "https://m.media-amazon.com/images/I/91jLz6IPNFL.jpg",
    author: "Homero",
    description:
      "Um épico grego clássico, A Odisséia narra as aventuras de Odisseu em sua longa jornada de volta para casa após a Guerra de Troia, enfrentando criaturas míticas, deuses e desafios naturais.",
    genre: "Poesia Épica",
    publisher: "Martin Claret",
    publication_year: -800,
    isbn: "9788572329903",
    rating: 4.9,
  },
  {
    id: 21,
    name: "Mrs. Dalloway",
    price: 38.7,
    image: "https://m.media-amazon.com/images/I/91rOgmnZpJS.jpg",
    author: "Virginia Woolf",
    description:
      "Este romance modernista acompanha um dia na vida de Clarissa Dalloway, uma socialite londrina, utilizando um estilo de fluxo de consciência para explorar temas de memória, trauma e pressões sociais.",
    genre: "Romance Modernista",
    publisher: "Autêntica",
    publication_year: 1925,
    isbn: "9788551306147",
    rating: 4.5,
  },
  {
    id: 22,
    name: "O Retrato de Dorian Gray",
    price: 31.9,
    image: "https://m.media-amazon.com/images/I/91ZEEdj0cCL.jpg",
    author: "Oscar Wilde",
    description:
      "O único romance de Oscar Wilde explora a vaidade e a moralidade através de Dorian Gray, um jovem que troca sua alma por juventude eterna, enquanto seu retrato envelhece e reflete suas transgressões.",
    genre: "Romance Filosófico",
    publisher: "Penguin Companhia",
    publication_year: 1890,
    isbn: "9788580860030",
    rating: 4.7,
  },
  {
    id: 23,
    name: "O Senhor dos Anéis",
    price: 89.9,
    image:
      "https://harpercollins.com.br/cdn/shop/files/9786555114249.jpg?v=1754636754",
    author: "J.R.R. Tolkien",
    description:
      "Uma trilogia épica de fantasia, O Senhor dos Anéis segue a jornada de Frodo Bolseiro para destruir um anel maligno que ameaça o mundo, acompanhado por uma irmandade de heróis.",
    genre: "Fantasia Épica",
    publisher: "HarperCollins Brasil",
    publication_year: 1954,
    isbn: "9788595086807",
    rating: 4.9,
  },
  {
    id: 24,
    name: "O Apanhador no Campo de Centeio",
    price: 37.8,
    image:
      "https://m.media-amazon.com/images/I/91HFFmf2PQL._UF1000,1000_QL80_.jpg",
    author: "J.D. Salinger",
    description:
      "Este romance de formação segue Holden Caulfield, um adolescente rebelde que, após ser expulso da escola, vagueia por Nova York, refletindo sobre alienação, autenticidade e a perda da inocência.",
    genre: "Romance de Formação",
    publisher: "Todavia",
    publication_year: 1951,
    isbn: "9788593828058",
    rating: 4.6,
  },
  {
    id: 25,
    name: "Vinte Mil Léguas Submarinas",
    price: 44.5,
    image:
      "https://cdl-static.s3-sa-east-1.amazonaws.com/covers/gg/9788582850022/vinte-mil-leguas-submarinas.jpg",
    author: "Jules Verne",
    description:
      "Uma aventura de ficção científica, este romance segue o Professor Aronnax, seu servo Conseil e o arpoador Ned Land enquanto exploram o oceano a bordo do submarino Nautilus, comandado pelo enigmático Capitão Nemo.",
    genre: "Ficção Científica",
    publisher: "Zahar",
    publication_year: 1870,
    isbn: "9788537810132",
    rating: 4.5,
  },
  {
    id: 26,
    name: "Em Busca do Tempo Perdido",
    price: 79.9,
    image:
      "https://m.media-amazon.com/images/I/818BxnsWTRL._UF1000,1000_QL80_.jpg",
    author: "Marcel Proust",
    description:
      "Uma obra monumental da literatura francesa, Em Busca do Tempo Perdido explora memória, amor e arte através das lembranças do narrador sobre sua vida na aristocracia francesa do final do século XIX.",
    genre: "Romance Modernista",
    publisher: "Globo Livros",
    publication_year: 1913,
    isbn: "9788525041593",
    rating: 4.8,
  },
  {
    id: 27,
    name: "A Revolução dos Bichos",
    price: 29.9,
    image:
      "https://image.isu.pub/240308195141-ea3bec1fe1822568527e6b862a841023/jpg/page_1_social_preview.jpg",
    author: "George Orwell",
    description:
      "Uma fábula satírica que critica o totalitarismo, A Revolução dos Bichos mostra animais de uma fazenda que se rebelam contra seus donos humanos, apenas para criar um regime igualmente opressivo.",
    genre: "Fábula Política",
    publisher: "Companhia das Letras",
    publication_year: 1945,
    isbn: "9788535910698",
    rating: 4.8,
  },
  {
    id: 28,
    name: "O Morro dos Ventos Uivantes",
    price: 36.9,
    image:
      "https://m.media-amazon.com/images/I/9154Q7fv5UL._AC_UF1000,1000_QL80_.jpg",
    author: "Emily Brontë",
    description:
      "Um romance gótico intenso, O Morro dos Ventos Uivantes explora amor, vingança e obsessão através da trágica história de Heathcliff e Catherine Earnshaw nas charnecas inglesas.",
    genre: "Romance Gótico",
    publisher: "Martin Claret",
    publication_year: 1847,
    isbn: "9788572329910",
    rating: 4.7,
  },
  {
    id: 29,
    name: "Ulisses",
    price: 69.9,
    image:
      "https://m.media-amazon.com/images/I/81cAgzdF2EL._UF1000,1000_QL80_.jpg",
    author: "James Joyce",
    description:
      "Um marco do modernismo, Ulisses narra um dia na vida de Leopold Bloom em Dublin, utilizando um estilo experimental e fluxo de consciência para explorar a condição humana.",
    genre: "Romance Modernista",
    publisher: "Companhia das Letras",
    publication_year: 1922,
    isbn: "9788535925142",
    rating: 4.6,
  },
  {
    id: 30,
    name: "As Vinhas da Ira",
    price: 47.5,
    image:
      "https://m.media-amazon.com/images/I/91SOU6MzlEL._AC_UF1000,1000_QL80_.jpg",
    author: "John Steinbeck",
    description:
      "Um retrato poderoso da Grande Depressão, As Vinhas da Ira segue a família Joad em sua migração da Oklahoma devastada pela seca para a Califórnia, enfrentando pobreza e injustiça.",
    genre: "Romance Social",
    publisher: "Record",
    publication_year: 1939,
    isbn: "9788501078094",
    rating: 4.8,
  },
  {
    id: 31,
    name: "O Estrangeiro",
    price: 33.9,
    image:
      "https://m.media-amazon.com/images/I/91Sb5HdDL3L._AC_UF1000,1000_QL80_.jpg",
    author: "Albert Camus",
    description:
      "Um romance existencialista, O Estrangeiro acompanha Meursault, um homem indiferente à sociedade que se envolve em um crime e enfrenta as absurdidades da existência e da justiça humana.",
    genre: "Romance Existencialista",
    publisher: "Record",
    publication_year: 1942,
    isbn: "9788501083173",
    rating: 4.6,
  },
  {
    id: 32,
    name: "O Hobbit",
    price: 49.9,
    image:
      "https://cdn.kobo.com/book-images/d229d878-ce11-4981-b5a9-d35d53c0840c/1200/1200/False/o-hobbit-2.jpg",
    author: "J.R.R. Tolkien",
    description:
      "Uma aventura de fantasia, O Hobbit segue Bilbo Bolseiro, um hobbit relutante que se junta a um grupo de anões e ao mago Gandalf em uma missão para recuperar um tesouro guardado por um dragão.",
    genre: "Fantasia",
    publisher: "HarperCollins Brasil",
    publication_year: 1937,
    isbn: "9788595086791",
    rating: 4.8,
  },
  {
    id: 33,
    name: "Crime e Castigo",
    price: 49.9,
    image: "https://m.media-amazon.com/images/I/916WkSH4cGL.jpg",
    author: "Fiódor Dostoiévski",
    description:
      "A história de Raskólnikov, um jovem que comete um assassinato e enfrenta um intenso conflito psicológico e moral, explorando culpa, redenção e justiça.",
    genre: "Romance Psicológico",
    publisher: "Editora 34",
    publication_year: 1866,
    isbn: "9788573266283",
    rating: 4.9,
  },
  {
    id: 34,
    name: "Anna Kariênina",
    price: 59.9,
    image:
      "https://m.media-amazon.com/images/I/815e1KecyPL._UF1000,1000_QL80_.jpg",
    author: "Liev Tolstói",
    description:
      "Um retrato profundo da sociedade russa, abordando amor, traição e as consequências das escolhas humanas através da história de Anna.",
    genre: "Romance Clássico",
    publisher: "Companhia das Letras",
    publication_year: 1877,
    isbn: "9788535921748",
    rating: 4.8,
  },
  {
    id: 35,
    name: "Os Miseráveis",
    price: 69.9,
    image:
      "https://m.media-amazon.com/images/I/71L28YvPobL._AC_UF1000,1000_QL80_.jpg",
    author: "Victor Hugo",
    description:
      "A trajetória de Jean Valjean em busca de redenção em meio a injustiças sociais na França do século XIX.",
    genre: "Romance Histórico",
    publisher: "Martin Claret",
    publication_year: 1862,
    isbn: "9788572328739",
    rating: 4.9,
  },
  {
    id: 36,
    name: "Drácula",
    price: 39.9,
    image:
      "https://m.media-amazon.com/images/I/91VDBZjk4uL._AC_UF1000,1000_QL80_.jpg",
    author: "Bram Stoker",
    description:
      "O clássico que popularizou o vampiro moderno, acompanhando o misterioso Conde Drácula e sua ameaça.",
    genre: "Terror Gótico",
    publisher: "Zahar",
    publication_year: 1897,
    isbn: "9788537811467",
    rating: 4.7,
  },
  {
    id: 37,
    name: "Frankenstein",
    price: 34.9,
    image:
      "https://www.moderna.com.br/data/files/9D/D5/22/15/B9F9A710104789A728A808A8/Capa_Frankenstein_md.jpg",
    author: "Mary Shelley",
    description:
      "Um cientista cria vida artificial e enfrenta as consequências de suas ações, levantando questões éticas e existenciais.",
    genre: "Ficção Científica",
    publisher: "Penguin Companhia",
    publication_year: 1818,
    isbn: "9788580861587",
    rating: 4.7,
  },
  {
    id: 38,
    name: "A Divina Comédia",
    price: 79.9,
    image:
      "https://cdn.kobo.com/book-images/2af441b4-9c37-4cb0-8454-017bdddb98ed/1200/1200/False/a-divina-comedia-14.jpg",
    author: "Dante Alighieri",
    description:
      "Uma travessia monumental pelos reinos do Inferno, Purgatório e Paraíso, onde Dante investiga culpa, redenção e o destino da alma com profundidade filosófica e imaginação visionária.",
    genre: "Poesia Épica",
    publisher: "Editora 34",
    publication_year: 1320,
    isbn: "9788573263947",
    rating: 4.8,
  },
  {
    id: 39,
    name: "O Conde de Monte Cristo",
    price: 64.9,
    image:
      "https://m.media-amazon.com/images/I/81ZswN9PVPL._UF1000,1000_QL80_.jpg",
    author: "Alexandre Dumas",
    description:
      "Traído e condenado injustamente, Edmond Dantès retorna como um homem transformado, conduzindo uma das mais intensas histórias de vingança, justiça e redenção da literatura.",
    genre: "Romance de Aventura",
    publisher: "Zahar",
    publication_year: 1844,
    isbn: "9788537810873",
    rating: 4.9,
  },
  {
    id: 40,
    name: "O Processo",
    price: 37.9,
    image:
      "https://m.media-amazon.com/images/I/81sdtrnwyAL._AC_UF1000,1000_QL80_.jpg",
    author: "Franz Kafka",
    description:
      "Em meio a um sistema opaco e sufocante, um homem é acusado sem explicação, mergulhando em um labirinto absurdo que revela o peso da culpa, da burocracia e da existência.",
    genre: "Romance Existencialista",
    publisher: "Companhia das Letras",
    publication_year: 1925,
    isbn: "9788535902891",
    rating: 4.6,
  },
  {
    id: 41,
    name: "Guerra e Paz",
    price: 89.9,
    image: "https://m.media-amazon.com/images/I/913zODhgHXL.jpg",
    author: "Liev Tolstói",
    description:
      "Um épico grandioso que entrelaça destinos pessoais e eventos históricos, explorando amor, guerra, tempo e o sentido da vida na Rússia napoleônica.",
    genre: "Romance Histórico",
    publisher: "Companhia das Letras",
    publication_year: 1869,
    isbn: "9788535921731",
    rating: 4.9,
  },
  {
    id: 42,
    name: "A Letra Escarlate",
    price: 32.9,
    image:
      "https://m.media-amazon.com/images/I/71TCed5PZ8L._AC_UF1000,1000_QL80_.jpg",
    author: "Nathaniel Hawthorne",
    description:
      "Em uma sociedade rígida e moralista, um símbolo de pecado marca uma mulher para sempre, revelando hipocrisia, culpa e resistência diante do julgamento coletivo.",
    genre: "Romance Histórico",
    publisher: "Martin Claret",
    publication_year: 1850,
    isbn: "9788572329927",
    rating: 4.5,
  },
  {
    id: 43,
    name: "Dom Casmurro",
    price: 32.9,
    image:
      "https://m.media-amazon.com/images/I/81XpG2iKTlL._AC_UF1000,1000_QL80_.jpg",
    author: "Machado de Assis",
    description:
      "Narrado com ironia e ambiguidade, este clássico mergulha nas memórias de Bentinho, explorando ciúme, dúvida e a fragilidade da verdade.",
    genre: "Romance Psicológico",
    publisher: "Penguin Companhia",
    publication_year: 1899,
    isbn: "9788563560940",
    rating: 4.9,
  },
  {
    id: 44,
    name: "Memórias Póstumas de Brás Cubas",
    price: 34.9,
    image: "https://m.media-amazon.com/images/I/815u+SBDpJL.jpg",
    author: "Machado de Assis",
    description:
      "Um defunto-autor revisita sua vida com sarcasmo e lucidez, desmontando ilusões sociais e revelando a essência humana com genialidade e irreverência.",
    genre: "Romance Clássico",
    publisher: "Penguin Companhia",
    publication_year: 1881,
    isbn: "9788563560933",
    rating: 4.9,
  },
  {
    id: 45,
    name: "Senhora",
    price: 27.9,
    image:
      "https://m.media-amazon.com/images/I/91Kpw3VIC8L._AC_UF1000,1000_QL80_.jpg",
    author: "José de Alencar",
    description:
      "Entre amor e interesse, este romance expõe os jogos de poder nas relações, revelando orgulho, dinheiro e sentimentos em conflito.",
    genre: "Romance Romântico",
    publisher: "Martin Claret",
    publication_year: 1875,
    isbn: "9788544001820",
    rating: 4.5,
  },
  {
    id: 46,
    name: "O Cortiço",
    price: 29.9,
    image:
      "https://www.edocente.com.br/wp-content/uploads/2022/05/O-Cortico_PNLD2021_Obj5_MP_001.webp",
    author: "Aluísio Azevedo",
    description:
      "Um retrato cru e vibrante da vida em um cortiço, onde desejos, instintos e desigualdades moldam o comportamento humano.",
    genre: "Romance Naturalista",
    publisher: "Ática",
    publication_year: 1890,
    isbn: "9788508155774",
    rating: 4.6,
  },
  {
    id: 47,
    name: "Triste Fim de Policarpo Quaresma",
    price: 28.9,
    image:
      "https://m.media-amazon.com/images/I/61ohQxGLstL._AC_UF1000,1000_QL80_.jpg",
    author: "Lima Barreto",
    description:
      "Uma crítica ácida ao idealismo ingênuo e à política brasileira, acompanhando um homem que tenta mudar o país — e é destruído por ele.",
    genre: "Romance Social",
    publisher: "Penguin Companhia",
    publication_year: 1915,
    isbn: "9788563560124",
    rating: 4.7,
  },
  {
    id: 48,
    name: "Moby Dick",
    price: 54.9,
    image:
      "https://m.media-amazon.com/images/I/71K4OH9CqOL._UF1000,1000_QL80_.jpg",
    author: "Herman Melville",
    description:
      "Uma narrativa intensa sobre obsessão e destino, onde a perseguição a uma baleia branca se transforma em metáfora da condição humana.",
    genre: "Romance de Aventura",
    publisher: "Penguin Companhia",
    publication_year: 1851,
    isbn: "9788563560179",
    rating: 4.7,
  },
  {
    id: 49,
    name: "A Montanha Mágica",
    price: 64.9,
    image:
      "https://m.media-amazon.com/images/I/71mASyJ+FXL._AC_UF1000,1000_QL80_.jpg",
    author: "Thomas Mann",
    description:
      "Isolado em um sanatório, um jovem mergulha em reflexões sobre tempo, doença, cultura e o declínio da civilização europeia.",
    genre: "Romance Filosófico",
    publisher: "Companhia das Letras",
    publication_year: 1924,
    isbn: "9788535920383",
    rating: 4.8,
  },
  {
    id: 50,
    name: "Fausto",
    price: 44.9,
    image:
      "https://a-static.mlcdn.com.br/%7Bw%7Dx%7Bh%7D/livro-fausto-capa-dura/livrdavila/851316/57b4fb19b076d1756ce5d3cd0e08697b.jpg",
    author: "Goethe",
    description:
      "Entre pactos e desejos, esta obra examina os limites da ambição humana e o preço do conhecimento absoluto.",
    genre: "Drama Filosófico",
    publisher: "Editora 34",
    publication_year: 1808,
    isbn: "9788573262506",
    rating: 4.8,
  },
  {
    id: 51,
    name: "A Morte de Ivan Ilitch",
    price: 24.9,
    image:
      "https://m.media-amazon.com/images/I/91sB9H+fxgL._UF1000,1000_QL80_.jpg",
    author: "León Tolstói",
    description:
      "Diante da morte iminente, um homem confronta sua própria vida, revelando verdades incômodas sobre autenticidade e existência.",
    genre: "Novela Filosófica",
    publisher: "L&PM",
    publication_year: 1886,
    isbn: "9788525432001",
    rating: 4.8,
  },
  {
    id: 52,
    name: "A Dama do Cachorrinho",
    price: 22.9,
    image: "https://m.media-amazon.com/images/I/71FKhn0RqfL.jpg",
    author: "Anton Tchekhov",
    description:
      "Um encontro aparentemente banal se transforma em uma profunda história sobre amor, desejo e transformação interior.",
    genre: "Conto Clássico",
    publisher: "Editora 34",
    publication_year: 1899,
    isbn: "9788573263015",
    rating: 4.6,
  },
  {
    id: 53,
    name: "Almas Mortas",
    price: 39.9,
    image:
      "https://m.media-amazon.com/images/I/81WCaERXVFL._UF1000,1000_QL80_.jpg",
    author: "Nikolai Gógol",
    description:
      "Com humor ácido e crítica mordaz, este romance revela os absurdos morais e sociais de uma Rússia em decadência.",
    genre: "Romance Satírico",
    publisher: "Editora 34",
    publication_year: 1842,
    isbn: "9788573261684",
    rating: 4.6,
  },
  {
    id: 54,
    name: "Tess dos d’Urbervilles",
    price: 39.9,
    image:
      "https://m.media-amazon.com/images/I/71jxw+8yPTL._UF1000,1000_QL80_.jpg",
    author: "Thomas Hardy",
    description:
      "A trajetória de uma mulher marcada por injustiças expõe a dureza das convenções sociais e a inevitabilidade do destino.",
    genre: "Romance Trágico",
    publisher: "Martin Claret",
    publication_year: 1891,
    isbn: "9788544002513",
    rating: 4.7,
  },
  {
    id: 55,
    name: "A Ilha do Tesouro",
    price: 29.9,
    image:
      "https://m.media-amazon.com/images/I/81N-C60M53L._AC_UF1000,1000_QL80_.jpg",
    author: "Robert Louis Stevenson",
    description:
      "Uma aventura clássica repleta de mistério e descobertas, que define o imaginário das histórias de piratas.",
    genre: "Romance de Aventura",
    publisher: "Zahar",
    publication_year: 1883,
    isbn: "9788537814840",
    rating: 4.7,
  },
  {
    id: 56,
    name: "Ensaio sobre a Cegueira",
    price: 42.9,
    image:
      "https://www.josesaramago.org/wp-content/uploads/2021/05/13_ensaio_sobre_a_cegueira.jpg",
    author: "José Saramago",
    description:
      "Uma epidemia inexplicável mergulha a sociedade no caos, revelando o lado mais primitivo — e mais humano — das pessoas.",
    genre: "Romance Alegórico",
    publisher: "Companhia das Letras",
    publication_year: 1995,
    isbn: "9788535924831",
    rating: 4.8,
  },
  {
    id: 57,
    name: "Hamlet",
    price: 29.9,
    image:
      "https://m.media-amazon.com/images/I/810oRnmFb1L._UF1000,1000_QL80_.jpg",
    author: "William Shakespeare",
    description:
      "Tragédia sobre dúvida, vingança e a complexidade da mente humana.",
    genre: "Drama Trágico",
    publisher: "Penguin",
    publication_year: 1603,
    isbn: "9780141396509",
    rating: 4.8,
  },
  {
    id: 58,
    name: "Romeu e Julieta",
    price: 27.9,
    image:
      "https://m.media-amazon.com/images/I/71A-TSfl9HL._AC_UF1000,1000_QL80_.jpg",
    author: "William Shakespeare",
    description: "A mais famosa história de amor trágico da literatura.",
    genre: "Drama Romântico",
    publisher: "Penguin",
    publication_year: 1597,
    isbn: "9780141396479",
    rating: 4.8,
  },
  {
    id: 59,
    name: "Macbeth",
    price: 26.9,
    image:
      "https://m.media-amazon.com/images/I/81yB3mQGm7L._UF1000,1000_QL80_.jpg",
    author: "William Shakespeare",
    description:
      "Ambição, poder e culpa em uma das tragédias mais intensas de Shakespeare.",
    genre: "Drama Trágico",
    publisher: "Penguin",
    publication_year: 1606,
    isbn: "9780141396318",
    rating: 4.7,
  },
  {
    id: 60,
    name: "Otelo",
    price: 26.9,
    image:
      "https://www.lpm.com.br/livros/imagens/otelo_classicos_14x21_9788525429926_hd.jpg",
    author: "William Shakespeare",
    description: "Drama sobre ciúme, manipulação e tragédia inevitável.",
    genre: "Drama Trágico",
    publisher: "Penguin",
    publication_year: 1603,
    isbn: "9780141396516",
    rating: 4.7,
  },
  {
    id: 61,
    name: "Rei Lear",
    price: 28.9,
    image:
      "https://m.media-amazon.com/images/I/910Mn32PjaL._UF1000,1000_QL80_.jpg",
    author: "William Shakespeare",
    description:
      "Uma das maiores tragédias sobre poder, loucura e relações familiares.",
    genre: "Drama Trágico",
    publisher: "Penguin",
    publication_year: 1606,
    isbn: "9780141396502",
    rating: 4.8,
  },
  {
    id: 62,
    name: "A Tempestade",
    price: 25.9,
    image:
      "https://m.media-amazon.com/images/I/71ik6UKuavL._AC_UF1000,1000_QL80_.jpg",
    author: "William Shakespeare",
    description: "Mistura de magia, poder e perdão em uma obra simbólica.",
    genre: "Drama Fantástico",
    publisher: "Penguin",
    publication_year: 1611,
    isbn: "9780141396431",
    rating: 4.6,
  },
  {
    id: 63,
    name: "Sonho de uma Noite de Verão",
    price: 25.9,
    image:
      "https://www.lpm.com.br/livros/imagens/sonho_de_uma_noite_de_verao_nova_9788525425584_hd.jpg",
    author: "William Shakespeare",
    description: "Comédia encantadora sobre amor, fantasia e confusão.",
    genre: "Comédia",
    publisher: "Penguin",
    publication_year: 1595,
    isbn: "9780141396547",
    rating: 4.7,
  },
  {
    id: 64,
    name: "A Comédia dos Erros",
    price: 24.9,
    image:
      "https://m.media-amazon.com/images/I/81doBLmpmvL._UF1000,1000_QL80_.jpg",
    author: "William Shakespeare",
    description:
      "Uma das peças mais divertidas, baseada em trocas de identidade.",
    genre: "Comédia",
    publisher: "Penguin",
    publication_year: 1594,
    isbn: "9780141396424",
    rating: 4.5,
  },
  {
    id: 65,
    name: "A Ilíada",
    price: 49.9,
    image:
      "https://m.media-amazon.com/images/I/81cFiVkRRfL._UF1000,1000_QL80_.jpg",
    author: "Homero",
    description:
      "Épico da Guerra de Troia, explorando honra, destino e heroísmo.",
    genre: "Poesia Épica",
    publisher: "Martin Claret",
    publication_year: -750,
    isbn: "9788572329897",
    rating: 4.8,
  },
  {
    id: 66,
    name: "As Flores do Mal",
    price: 39.9,
    image: "https://m.media-amazon.com/images/I/91r8-ogEeeL.jpg",
    author: "Charles Baudelaire",
    description:
      "Coletânea poética que explora beleza, decadência e modernidade.",
    genre: "Poesia",
    publisher: "Penguin",
    publication_year: 1857,
    isbn: "9780140449237",
    rating: 4.6,
  },
  {
    id: 67,
    name: "Os Lusíadas",
    price: 42.9,
    image:
      "https://m.media-amazon.com/images/I/81X2-rTPT+L._AC_UF1000,1000_QL80_.jpg",
    author: "Luís de Camões",
    description: "Épico português sobre as grandes navegações.",
    genre: "Poesia Épica",
    publisher: "Martin Claret",
    publication_year: 1572,
    isbn: "9788572329934",
    rating: 4.7,
  },
  {
    id: 68,
    name: "A Náusea",
    price: 36.9,
    image: "https://m.media-amazon.com/images/I/816WwKmgl5L.jpg",
    author: "Jean-Paul Sartre",
    description: "Romance existencialista sobre o absurdo da existência.",
    genre: "Romance Existencialista",
    publisher: "Nova Fronteira",
    publication_year: 1938,
    isbn: "9788520931320",
    rating: 4.6,
  },
  {
    id: 69,
    name: "O Lobo da Estepe",
    price: 38.9,
    image: "https://m.media-amazon.com/images/I/812qwlotv+L.jpg",
    author: "Hermann Hesse",
    description: "Uma jornada introspectiva sobre identidade e dualidade.",
    genre: "Romance Filosófico",
    publisher: "Record",
    publication_year: 1927,
    isbn: "9788501045478",
    rating: 4.7,
  },
  {
    id: 70,
    name: "Demian",
    price: 32.9,
    image:
      "https://m.media-amazon.com/images/I/81A2vG0k3yL._AC_UF1000,1000_QL80_.jpg",
    author: "Hermann Hesse",
    description:
      "Romance de formação sobre autoconhecimento e espiritualidade.",
    genre: "Romance Filosófico",
    publisher: "Record",
    publication_year: 1919,
    isbn: "9788501045485",
    rating: 4.7,
  },
  {
    id: 71,
    name: "O Banquete",
    price: 29.9,
    image:
      "https://m.media-amazon.com/images/I/81NVCEWzYaL._UF1000,1000_QL80_.jpg",
    author: "Platão",
    description: "Diálogo filosófico sobre o amor e sua natureza.",
    genre: "Filosofia",
    publisher: "Martin Claret",
    publication_year: -380,
    isbn: "9788572329941",
    rating: 4.8,
  },
  {
    id: 72,
    name: "A República",
    price: 44.9,
    image:
      "https://images.tcdn.com.br/img/img_prod/1101810/republica_a_9253_1_de6d9f0341b9f2066813cc5397449411.jpg",
    author: "Platão",
    description: "Uma das obras fundadoras da filosofia política.",
    genre: "Filosofia",
    publisher: "Martin Claret",
    publication_year: -380,
    isbn: "9788572329958",
    rating: 4.9,
  },
  {
    id: 73,
    name: "Assim Falou Zaratustra",
    price: 39.9,
    image: "https://m.media-amazon.com/images/I/61D5lECHKoL.jpg",
    author: "Friedrich Nietzsche",
    description: "Obra filosófica sobre o além-do-homem e a vontade de poder.",
    genre: "Filosofia",
    publisher: "Companhia das Letras",
    publication_year: 1883,
    isbn: "9788535909555",
    rating: 4.7,
  },
  {
    id: 74,
    name: "A Insustentável Leveza do Ser",
    price: 44.9,
    image: "https://m.media-amazon.com/images/I/818ShC1u68L.jpg",
    author: "Milan Kundera",
    description: "Romance filosófico sobre amor, liberdade e existência.",
    genre: "Romance Filosófico",
    publisher: "Companhia das Letras",
    publication_year: 1984,
    isbn: "9788535902778",
    rating: 4.7,
  },
  {
    id: 75,
    name: "O Nome da Rosa",
    price: 49.9,
    image:
      "https://m.media-amazon.com/images/I/91bnAXLNsPL._AC_UF1000,1000_QL80_.jpg",
    author: "Umberto Eco",
    description:
      "Mistério medieval que mistura filosofia, religião e investigação.",
    genre: "Romance Histórico",
    publisher: "Record",
    publication_year: 1980,
    isbn: "9788501078001",
    rating: 4.8,
  },
  {
    id: 76,
    name: "A Educação Sentimental",
    price: 44.9,
    image:
      "https://m.media-amazon.com/images/I/61BtHG+5ySL._AC_UF1000,1000_QL80_.jpg",
    author: "Gustave Flaubert",
    description: "Retrato da juventude e desilusões na França do século XIX.",
    genre: "Romance Realista",
    publisher: "Penguin",
    publication_year: 1869,
    isbn: "9780140447998",
    rating: 4.5,
  },
  {
    id: 77,
    name: "Os Sofrimentos do Jovem Werther",
    price: 29.9,
    image:
      "https://m.media-amazon.com/images/I/61EKeupzxdL._AC_UF1000,1000_QL80_.jpg",
    author: "Goethe",
    description: "Romance epistolar sobre amor não correspondido e tragédia.",
    genre: "Romance Romântico",
    publisher: "Martin Claret",
    publication_year: 1774,
    isbn: "9788572329965",
    rating: 4.6,
  },
  {
    id: 78,
    name: "Robinson Crusoé",
    price: 34.9,
    image:
      "https://www.lpm.com.br/livros/imagens/robinsons_crusoe_nova_9788525422576_hd.jpg",
    author: "Daniel Defoe",
    description: "Aventura sobre sobrevivência, isolamento e civilização.",
    genre: "Romance de Aventura",
    publisher: "Zahar",
    publication_year: 1719,
    isbn: "9788537811207",
    rating: 4.6,
  },
  {
    id: 79,
    name: "O Médico e o Monstro",
    price: 24.9,
    image:
      "https://www.lpm.com.br/livros/imagens/o_medico_e_o_monstro_capa_certa_9788525411235_hd.jpg",
    author: "Robert Louis Stevenson",
    description: "Clássico sobre dualidade humana e moral.",
    genre: "Terror Psicológico",
    publisher: "Zahar",
    publication_year: 1886,
    isbn: "9788537811214",
    rating: 4.6,
  },
  {
    id: 80,
    name: "A Cabana do Pai Tomás",
    price: 39.9,
    image:
      "https://m.media-amazon.com/images/I/91jty2H4LqL._UF1000,1000_QL80_.jpg",
    author: "Harriet Beecher Stowe",
    description: "Romance marcante contra a escravidão.",
    genre: "Romance Social",
    publisher: "Martin Claret",
    publication_year: 1852,
    isbn: "9788572329972",
    rating: 4.5,
  },
  {
    id: 81,
    name: "O Príncipe",
    price: 22.9,
    image:
      "https://m.media-amazon.com/images/I/71zt1M+ZvvL._UF1000,1000_QL80_.jpg",
    author: "Maquiavel",
    description: "Manual político sobre poder, estratégia e governo.",
    genre: "Filosofia Política",
    publisher: "Martin Claret",
    publication_year: 1532,
    isbn: "9788572329989",
    rating: 4.7,
  },
  {
    id: 82,
    name: "Iracema",
    price: 24.9,
    image: "https://m.media-amazon.com/images/I/81v5NBibY4L._UF1000,1000_QL80_.jpg",
    author: "José de Alencar",
    description:
      "Romance indianista que narra o encontro entre culturas no Brasil colonial.",
    genre: "Romance Indianista",
    publisher: "Martin Claret",
    publication_year: 1865,
    isbn: "9788572329996",
    rating: 4.5,
    nationality: "brasileira",
    collection: "classicos-brasileiros",
  },
  {
    id: 83,
    name: "O Guarani",
    price: 29.9,
    image: "https://m.media-amazon.com/images/I/61q7SGeDLyL._AC_UF1000,1000_QL80_.jpg",
    author: "José de Alencar",
    description:
      "Clássico do romantismo brasileiro com aventura, amor e identidade nacional.",
    genre: "Romance Indianista",
    publisher: "Martin Claret",
    publication_year: 1857,
    isbn: "9788572321006",
    rating: 4.6,
    nationality: "brasileira",
    collection: "classicos-brasileiros",
  },
  {
    id: 84,
    name: "Inocência",
    price: 26.9,
    image: "https://m.media-amazon.com/images/I/71662aafUuL.jpg",
    author: "Visconde de Taunay",
    description:
      "Romance regionalista sobre amor e costumes do interior brasileiro.",
    genre: "Romance Regionalista",
    publisher: "Ática",
    publication_year: 1872,
    isbn: "9788508155781",
    rating: 4.4,
    nationality: "brasileira",
  },
  {
    id: 85,
    name: "O Ateneu",
    price: 28.9,
    image: "https://m.media-amazon.com/images/I/A17Rzp18iXL._AC_UF1000,1000_QL80_.jpg",
    author: "Raul Pompeia",
    description:
      "Crítica à sociedade através da vida em um internato elitista.",
    genre: "Romance Realista",
    publisher: "Penguin Companhia",
    publication_year: 1888,
    isbn: "9788563560957",
    rating: 4.6,
    nationality: "brasileira",
  },
  {
    id: 86,
    name: "São Bernardo",
    price: 29.9,
    image: "https://m.media-amazon.com/images/I/81vFD4lJ6BL.jpg",
    author: "Graciliano Ramos",
    description: "Romance psicológico sobre poder, obsessão e solidão.",
    genre: "Romance Psicológico",
    publisher: "Record",
    publication_year: 1934,
    isbn: "9788501012340",
    rating: 4.7,
    nationality: "brasileira",
  },
  {
    id: 87,
    name: "Angústia",
    price: 31.9,
    image: "https://m.media-amazon.com/images/I/814XIi5CvbL._AC_UF1000,1000_QL80_.jpg",
    author: "Graciliano Ramos",
    description:
      "Narrativa intensa sobre alienação, obsessão e crise existencial.",
    genre: "Romance Psicológico",
    publisher: "Record",
    publication_year: 1936,
    isbn: "9788501012357",
    rating: 4.7,
    nationality: "brasileira",
  },
  {
    id: 88,
    name: "Sagarana",
    price: 34.9,
    image: "https://globaleditora.com.br/capas/400/4395.jpg",
    author: "João Guimarães Rosa",
    description:
      "Coletânea inovadora que mistura regionalismo e linguagem poética.",
    genre: "Contos",
    publisher: "Nova Fronteira",
    publication_year: 1946,
    isbn: "9788520923454",
    rating: 4.8,
    nationality: "brasileira",
  },
  {
    id: 89,
    name: "Grande Sertão: Veredas",
    price: 49.9,
    image: "https://m.media-amazon.com/images/I/A1UjjbNL0KL._UF1000,1000_QL80_.jpg",
    author: "João Guimarães Rosa",
    description:
      "Uma das maiores obras brasileiras sobre linguagem, existência e o sertão.",
    genre: "Romance Modernista",
    publisher: "Nova Fronteira",
    publication_year: 1956,
    isbn: "9788520923461",
    rating: 4.9,
    nationality: "brasileira",
  },
  {
    id: 90,
    name: "Macunaíma",
    price: 29.9,
    image: "https://m.media-amazon.com/images/I/91c6rx8tUjL._AC_UF1000,1000_QL80_.jpg",
    author: "Mário de Andrade",
    description:
      "Herói sem caráter em uma obra fundamental do modernismo brasileiro.",
    genre: "Romance Modernista",
    publisher: "Companhia das Letras",
    publication_year: 1928,
    isbn: "9788535920000",
    rating: 4.6,
    nationality: "brasileira",
  },
  {
    id: 91,
    name: "Pauliceia Desvairada",
    price: 27.9,
    image: "https://images.tcdn.com.br/img/img_prod/1323385/pauliceia_desvairada_mario_de_andrade_17274_1_7c9eac23464f8645fc927acd04661b2c.jpg",
    author: "Mário de Andrade",
    description: "Marco da poesia modernista brasileira.",
    genre: "Poesia",
    publisher: "Companhia das Letras",
    publication_year: 1922,
    isbn: "9788535920001",
    rating: 4.5,
    nationality: "brasileira",
  },
  {
    id: 92,
    name: "Libertinagem",
    price: 26.9,
    image: "https://m.media-amazon.com/images/I/71QSB-zzAPL._AC_UF1000,1000_QL80_.jpg",
    author: "Manuel Bandeira",
    description: "Coletânea poética essencial do modernismo brasileiro.",
    genre: "Poesia",
    publisher: "Global",
    publication_year: 1930,
    isbn: "9788526023001",
    rating: 4.6,
    nationality: "brasileira",
  },
  {
    id: 93,
    name: "Claro Enigma",
    price: 29.9,
    image: "https://m.media-amazon.com/images/I/71M+Dodcy-L._UF1000,1000_QL80_.jpg",
    author: "Carlos Drummond de Andrade",
    description: "Poemas densos e reflexivos sobre existência e linguagem.",
    genre: "Poesia",
    publisher: "Companhia das Letras",
    publication_year: 1951,
    isbn: "9788535920002",
    rating: 4.7,
    nationality: "brasileira",
  },
  {
    id: 94,
    name: "Morte e Vida Severina",
    price: 24.9,
    image: "https://m.media-amazon.com/images/I/81znk0mmeHL.jpg",
    author: "João Cabral de Melo Neto",
    description:
      "Poema dramático sobre a vida no sertão e a luta pela sobrevivência.",
    genre: "Poesia Dramática",
    publisher: "Alfaguara",
    publication_year: 1955,
    isbn: "9788579622003",
    rating: 4.8,
    nationality: "brasileira",
  },
  {
    id: 95,
    name: "Quincas Borba",
    price: 28.9,
    image: "https://projectoadamastor.org/wp-content/uploads/2018/06/Quincas-Borba-Capa.jpg",
    author: "Machado de Assis",
    description: "Romance sobre loucura, filosofia e ironia social.",
    genre: "Romance Filosófico",
    publisher: "Penguin Companhia",
    publication_year: 1891,
    isbn: "9788563560964",
    rating: 4.7,
    nationality: "brasileira",
  },
  {
    id: 96,
    name: "Esaú e Jacó",
    price: 28.9,
    image: "https://m.media-amazon.com/images/I/81pHk2SnQvL._UF1000,1000_QL80_.jpg",
    author: "Machado de Assis",
    description: "Romance sobre dualidade, política e relações familiares.",
    genre: "Romance Psicológico",
    publisher: "Penguin Companhia",
    publication_year: 1904,
    isbn: "9788563560971",
    rating: 4.6,
    nationality: "brasileira",
  },
  {
    id: 97,
    name: "Memorial de Aires",
    price: 27.9,
    image: "https://m.media-amazon.com/images/I/811LZh9g4BL._AC_UF1000,1000_QL80_.jpg",
    author: "Machado de Assis",
    description:
      "Último romance de Machado, com tom introspectivo e melancólico.",
    genre: "Romance",
    publisher: "Penguin Companhia",
    publication_year: 1908,
    isbn: "9788563560988",
    rating: 4.6,
    nationality: "brasileira",
  },
  {
    id: 98,
    name: "O Alienista",
    price: 22.9,
    image: "https://www.lpm.com.br/livros/imagens/alienista_9786556661667_hd.png",
    author: "Machado de Assis",
    description: "Sátira genial sobre ciência, poder e loucura.",
    genre: "Novela Satírica",
    publisher: "Penguin Companhia",
    publication_year: 1882,
    isbn: "9788563560995",
    rating: 4.8,
    nationality: "brasileira",
  },
  {
    id: 99,
    name: "A Paixão Segundo G.H.",
    price: 34.9,
    image: "https://m.media-amazon.com/images/I/61et07BNHnL._AC_UF1000,1000_QL80_.jpg",
    author: "Clarice Lispector",
    description:
      "Romance existencial profundo sobre identidade e transformação.",
    genre: "Romance Filosófico",
    publisher: "Rocco",
    publication_year: 1964,
    isbn: "9788532508423",
    rating: 4.7,
    nationality: "brasileira",
  },
  {
    id: 100,
    name: "Laços de Família",
    price: 32.9,
    image: "https://m.media-amazon.com/images/I/81pXH7YxFJL.jpg",
    author: "Clarice Lispector",
    description: "Contos sobre relações humanas, cotidiano e introspecção.",
    genre: "Contos",
    publisher: "Rocco",
    publication_year: 1960,
    isbn: "9788532508430",
    rating: 4.7,
    nationality: "brasileira",
  },
];

/* =========================
   BASE HELPERS
========================= */
function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeText(value, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function uniqueValues(list) {
  return [...new Set(safeArray(list))];
}

function sortAlphabetically(list) {
  return [...safeArray(list)].sort((a, b) =>
    String(a).localeCompare(String(b), "pt-BR"),
  );
}

function slugify(text = "") {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

/* =========================
   DOMAIN HELPERS
========================= */
function getEra(year) {
  if (typeof year !== "number") return "moderno";
  if (year < 0) return "antiguidade";
  if (year < 1600) return "classico-antigo";
  if (year < 1900) return "classico";
  if (year < 1950) return "moderno";
  return "contemporaneo";
}

function inferCountry(author, nationality) {
  if (nationality && COUNTRY_BY_NATIONALITY[nationality]) {
    return COUNTRY_BY_NATIONALITY[nationality];
  }

  return AUTHOR_COUNTRY_MAP[author] || "Internacional";
}

function inferLanguage(country) {
  return LANGUAGE_BY_COUNTRY[country] || "original";
}

function inferNationality(book, country) {
  if (book.nationality) return book.nationality;
  return NATIONALITY_BY_COUNTRY[country] || "internacional";
}

function inferMoods(book) {
  const genre = normalizeText(book.genre).toLowerCase();
  const title = normalizeText(book.name).toLowerCase();
  const description = normalizeText(book.description).toLowerCase();

  const moods = new Set();

  const moodRules = [
    {
      match:
        genre.includes("filosófico") ||
        genre.includes("existencialista") ||
        genre.includes("alegórico") ||
        description.includes("exist") ||
        description.includes("sentido da vida"),
      values: ["filosofico", "denso"],
    },
    {
      match:
        genre.includes("psicológico") ||
        genre.includes("autobiográfico") ||
        genre.includes("modernista") ||
        genre.includes("prosa poética"),
      values: ["introspectivo"],
    },
    {
      match:
        genre.includes("social") ||
        genre.includes("satírico") ||
        description.includes("sociedade") ||
        description.includes("injustiça") ||
        description.includes("desigualdade") ||
        description.includes("opress"),
      values: ["social", "reflexivo"],
    },
    {
      match:
        genre.includes("gótico") ||
        genre.includes("terror") ||
        title.includes("drácula") ||
        title.includes("frankenstein"),
      values: ["sombrio", "imersivo"],
    },
    {
      match:
        genre.includes("romântico") ||
        genre.includes("trágico") ||
        title.includes("orgulho") ||
        title.includes("noites"),
      values: ["sensivel"],
    },
    {
      match:
        genre.includes("fantasia") ||
        genre.includes("aventura") ||
        genre.includes("épica") ||
        genre.includes("epopeia"),
      values: ["imersivo"],
    },
  ];

  moodRules.forEach((rule) => {
    if (rule.match) {
      rule.values.forEach((value) => moods.add(value));
    }
  });

  if (moods.size === 0) {
    moods.add("contemplativo");
  }

  return Array.from(moods);
}

function inferCollection(book, country) {
  if (book.collection) return book.collection;

  const genre = normalizeText(book.genre).toLowerCase();

  if (country === "Brasil") return "classicos-brasileiros";
  if (country === "Portugal") return "classicos-lusofonos";
  if (country !== "Internacional") return "classicos-internacionais";

  if (
    genre.includes("filosófico") ||
    genre.includes("existencialista") ||
    genre.includes("psicológico")
  ) {
    return "ficcao-para-ler-devagar";
  }

  if (
    genre.includes("fantasia") ||
    genre.includes("aventura") ||
    genre.includes("épica")
  ) {
    return "grandes-jornadas";
  }

  return "curadoria-geral";
}

function buildSearchText(book) {
  return [
    book.name,
    book.author,
    book.genre,
    book.description,
    book.publisher,
    book.collection,
    book.country,
    ...safeArray(book.moods),
    ...safeArray(book.tags),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

/* =========================
   NORMALIZATION
========================= */
function normalizeBook(rawBook) {
  const name = normalizeText(rawBook.name, "Livro");
  const author = normalizeText(rawBook.author, "Autor não informado");
  const genre = normalizeText(rawBook.genre, "Literatura");
  const description = normalizeText(rawBook.description);
  const publisher = normalizeText(rawBook.publisher, "Editora");
  const image = normalizeText(rawBook.image);
  const price = toNumber(rawBook.price, 0);
  const rating = toNumber(rawBook.rating, 0);

  const publicationYear =
    typeof rawBook.publication_year === "number"
      ? rawBook.publication_year
      : toNumber(rawBook.publication_year, 0);

  const country = inferCountry(author, rawBook.nationality);
  const nationality = inferNationality(rawBook, country);
  const moods = inferMoods({
    ...rawBook,
    name,
    genre,
    description,
  });

  const collection = inferCollection(
    {
      ...rawBook,
      genre,
    },
    country,
  );

  const normalizedBook = {
    ...rawBook,
    id: toNumber(rawBook.id),
    name,
    author,
    genre,
    description,
    publisher,
    image,
    price,
    rating,
    publication_year: publicationYear,
    slug: rawBook.slug || slugify(name),
    country,
    nationality,
    language: inferLanguage(country),
    era: getEra(publicationYear),
    collection,
    moods,
    featured:
      typeof rawBook.featured === "boolean" ? rawBook.featured : rating >= 4.8,
    inStock: typeof rawBook.inStock === "boolean" ? rawBook.inStock : true,
    tags: safeArray(rawBook.tags),
  };

  return {
    ...normalizedBook,
    searchText: buildSearchText(normalizedBook),
  };
}

/* =========================
   DERIVED DATA HELPERS
========================= */
function groupBooksBy(list, key) {
  return safeArray(list).reduce((acc, item) => {
    const groupKey = item?.[key];
    if (!groupKey) return acc;

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push(item);
    return acc;
  }, {});
}

function pluckUniqueSorted(list, key) {
  return sortAlphabetically(
    uniqueValues(
      safeArray(list)
        .map((item) => item?.[key])
        .filter(Boolean),
    ),
  );
}

/* =========================
   EXPORTS
========================= */
export const books = rawBooks.map(normalizeBook);

export const featuredBooks = books.filter((book) => book.featured);

export const booksByCollection = groupBooksBy(books, "collection");
export const booksByCountry = groupBooksBy(books, "country");
export const booksByEra = groupBooksBy(books, "era");

export const availableGenres = pluckUniqueSorted(books, "genre");
export const availableAuthors = pluckUniqueSorted(books, "author");
export const availableCountries = pluckUniqueSorted(books, "country");
export const availableCollections = pluckUniqueSorted(books, "collection");
export const availableEras = pluckUniqueSorted(books, "era");
