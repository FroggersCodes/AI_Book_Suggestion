// ===================================
// Simple Mode — Curated 200-Book Database
// 100 Fiction + 100 Non-Fiction
// ===================================
const SIMPLE_BOOKS = [
  // ============================
  // LITERARY FICTION (20 books)
  // ============================
  { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "literary-fiction", theme: "justice", mood: "thought-provoking", length: "medium", isbn: "9780061120084", mature: false },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "literary-fiction", theme: "identity", mood: "emotional", length: "short", isbn: "9780743273565", mature: false },
  { title: "1984", author: "George Orwell", genre: "literary-fiction", theme: "power", mood: "dark", length: "medium", isbn: "9780451524935", mature: false },
  { title: "Pride and Prejudice", author: "Jane Austen", genre: "literary-fiction", theme: "love", mood: "lighthearted", length: "medium", isbn: "9780141439518", mature: false },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "literary-fiction", theme: "coming-of-age", mood: "emotional", length: "short", isbn: "9780316769488", mature: false },
  { title: "Beloved", author: "Toni Morrison", genre: "literary-fiction", theme: "family", mood: "dark", length: "medium", isbn: "9781400033416", mature: true },
  { title: "The Kite Runner", author: "Khaled Hosseini", genre: "literary-fiction", theme: "redemption", mood: "emotional", length: "medium", isbn: "9781594631931", mature: true },
  { title: "A Man Called Ove", author: "Fredrik Backman", genre: "literary-fiction", theme: "family", mood: "lighthearted", length: "medium", isbn: "9781476738024", mature: false },
  { title: "The Book Thief", author: "Markus Zusak", genre: "literary-fiction", theme: "survival", mood: "emotional", length: "medium", isbn: "9780375842207", mature: false },
  { title: "Little Women", author: "Louisa May Alcott", genre: "literary-fiction", theme: "family", mood: "lighthearted", length: "long", isbn: "9780147514011", mature: false },
  { title: "The Color Purple", author: "Alice Walker", genre: "literary-fiction", theme: "identity", mood: "emotional", length: "medium", isbn: "9780156028356", mature: true },
  { title: "Norwegian Wood", author: "Haruki Murakami", genre: "literary-fiction", theme: "love", mood: "emotional", length: "medium", isbn: "9780375704024", mature: true },
  { title: "The Secret History", author: "Donna Tartt", genre: "literary-fiction", theme: "power", mood: "dark", length: "long", isbn: "9781400031702", mature: true },
  { title: "Where the Crawdads Sing", author: "Delia Owens", genre: "literary-fiction", theme: "survival", mood: "mysterious", length: "medium", isbn: "9780735219106", mature: false },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "literary-fiction", theme: "discovery", mood: "inspiring", length: "short", isbn: "9780062315007", mature: false },
  { title: "Circe", author: "Madeline Miller", genre: "literary-fiction", theme: "identity", mood: "thought-provoking", length: "medium", isbn: "9780316556347", mature: false },
  { title: "A Little Life", author: "Hanya Yanagihara", genre: "literary-fiction", theme: "family", mood: "dark", length: "long", isbn: "9780385539258", mature: true },
  { title: "The Nightingale", author: "Kristin Hannah", genre: "literary-fiction", theme: "survival", mood: "emotional", length: "long", isbn: "9781250080400", mature: true },
  { title: "Normal People", author: "Sally Rooney", genre: "literary-fiction", theme: "love", mood: "thought-provoking", length: "short", isbn: "9781984822178", mature: true },
  { title: "Anxious People", author: "Fredrik Backman", genre: "literary-fiction", theme: "redemption", mood: "lighthearted", length: "medium", isbn: "9781501160837", mature: false },

  // ============================
  // SCI-FI (10 books)
  // ============================
  { title: "Dune", author: "Frank Herbert", genre: "sci-fi", theme: "power", mood: "thrilling", length: "long", isbn: "9780441013593", mature: false },
  { title: "Ender's Game", author: "Orson Scott Card", genre: "sci-fi", theme: "coming-of-age", mood: "thrilling", length: "medium", isbn: "9780812550702", mature: false },
  { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", genre: "sci-fi", theme: "adventure", mood: "funny", length: "short", isbn: "9780345391803", mature: false },
  { title: "The Martian", author: "Andy Weir", genre: "sci-fi", theme: "survival", mood: "thrilling", length: "medium", isbn: "9780553418026", mature: false },
  { title: "Fahrenheit 451", author: "Ray Bradbury", genre: "sci-fi", theme: "power", mood: "thought-provoking", length: "short", isbn: "9781451673319", mature: false },
  { title: "Brave New World", author: "Aldous Huxley", genre: "sci-fi", theme: "identity", mood: "dark", length: "medium", isbn: "9780060850524", mature: true },
  { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", genre: "sci-fi", theme: "identity", mood: "thought-provoking", length: "medium", isbn: "9780441478125", mature: false },
  { title: "Project Hail Mary", author: "Andy Weir", genre: "sci-fi", theme: "survival", mood: "lighthearted", length: "long", isbn: "9780593135204", mature: false },
  { title: "Slaughterhouse-Five", author: "Kurt Vonnegut", genre: "sci-fi", theme: "survival", mood: "dark", length: "short", isbn: "9780385333481", mature: true },
  { title: "The Time Machine", author: "H.G. Wells", genre: "sci-fi", theme: "discovery", mood: "thrilling", length: "short", isbn: "9780486284729", mature: false },

  // ============================
  // FANTASY (10 books)
  // ============================
  { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "fantasy", theme: "adventure", mood: "lighthearted", length: "medium", isbn: "9780547928227", mature: false },
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "fantasy", theme: "coming-of-age", mood: "lighthearted", length: "medium", isbn: "9780590353427", mature: false },
  { title: "A Game of Thrones", author: "George R.R. Martin", genre: "fantasy", theme: "power", mood: "dark", length: "long", isbn: "9780553593716", mature: true },
  { title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "fantasy", theme: "adventure", mood: "thrilling", length: "long", isbn: "9780756404741", mature: false },
  { title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", genre: "fantasy", theme: "adventure", mood: "lighthearted", length: "short", isbn: "9780064404990", mature: false },
  { title: "Mistborn: The Final Empire", author: "Brandon Sanderson", genre: "fantasy", theme: "justice", mood: "thrilling", length: "long", isbn: "9780765311788", mature: false },
  { title: "The Priory of the Orange Tree", author: "Samantha Shannon", genre: "fantasy", theme: "power", mood: "thrilling", length: "long", isbn: "9781635570298", mature: false },
  { title: "Piranesi", author: "Susanna Clarke", genre: "fantasy", theme: "discovery", mood: "mysterious", length: "short", isbn: "9781635575996", mature: false },
  { title: "An Ember in the Ashes", author: "Sabaa Tahir", genre: "fantasy", theme: "survival", mood: "thrilling", length: "medium", isbn: "9781595148032", mature: true },
  { title: "The Night Circus", author: "Erin Morgenstern", genre: "fantasy", theme: "love", mood: "mysterious", length: "medium", isbn: "9780307744432", mature: false },

  // ============================
  // MYSTERY (10 books)
  // ============================
  { title: "And Then There Were None", author: "Agatha Christie", genre: "mystery", theme: "justice", mood: "mysterious", length: "short", isbn: "9780062073488", mature: false },
  { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", genre: "mystery", theme: "justice", mood: "dark", length: "long", isbn: "9780307454546", mature: true },
  { title: "Gone Girl", author: "Gillian Flynn", genre: "mystery", theme: "love", mood: "dark", length: "medium", isbn: "9780307588371", mature: true },
  { title: "The Da Vinci Code", author: "Dan Brown", genre: "mystery", theme: "discovery", mood: "thrilling", length: "long", isbn: "9780307474278", mature: false },
  { title: "In the Woods", author: "Tana French", genre: "mystery", theme: "identity", mood: "mysterious", length: "medium", isbn: "9780143113492", mature: true },
  { title: "Big Little Lies", author: "Liane Moriarty", genre: "mystery", theme: "family", mood: "thrilling", length: "medium", isbn: "9780399587191", mature: true },
  { title: "The Thursday Murder Club", author: "Richard Osman", genre: "mystery", theme: "justice", mood: "funny", length: "medium", isbn: "9781984880963", mature: false },
  { title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle", genre: "mystery", theme: "discovery", mood: "mysterious", length: "short", isbn: "9780141329390", mature: false },
  { title: "The Silent Patient", author: "Alex Michaelides", genre: "mystery", theme: "identity", mood: "dark", length: "medium", isbn: "9781250301697", mature: true },
  { title: "One of Us Is Lying", author: "Karen M. McManus", genre: "mystery", theme: "coming-of-age", mood: "thrilling", length: "medium", isbn: "9781524714680", mature: false },

  // ============================
  // ROMANCE (10 books)
  // ============================
  { title: "The Notebook", author: "Nicholas Sparks", genre: "romance", theme: "love", mood: "emotional", length: "short", isbn: "9781455582877", mature: false },
  { title: "Outlander", author: "Diana Gabaldon", genre: "romance", theme: "adventure", mood: "thrilling", length: "long", isbn: "9780440212560", mature: true },
  { title: "Beach Read", author: "Emily Henry", genre: "romance", theme: "love", mood: "lighthearted", length: "medium", isbn: "9781984806734", mature: true },
  { title: "The Time Traveler's Wife", author: "Audrey Niffenegger", genre: "romance", theme: "love", mood: "emotional", length: "long", isbn: "9781476764818", mature: true },
  { title: "Red, White & Royal Blue", author: "Casey McQuiston", genre: "romance", theme: "identity", mood: "lighthearted", length: "medium", isbn: "9781250316776", mature: true },
  { title: "It Ends with Us", author: "Colleen Hoover", genre: "romance", theme: "survival", mood: "emotional", length: "medium", isbn: "9781501110368", mature: true },
  { title: "The Hating Game", author: "Sally Thorne", genre: "romance", theme: "love", mood: "funny", length: "medium", isbn: "9780062439598", mature: true },
  { title: "Me Before You", author: "Jojo Moyes", genre: "romance", theme: "love", mood: "emotional", length: "medium", isbn: "9780143124542", mature: false },
  { title: "People We Meet on Vacation", author: "Emily Henry", genre: "romance", theme: "love", mood: "lighthearted", length: "medium", isbn: "9781984806758", mature: true },
  { title: "Jane Eyre", author: "Charlotte Brontë", genre: "romance", theme: "identity", mood: "thought-provoking", length: "long", isbn: "9780141441146", mature: false },

  // ============================
  // THRILLER (10 books)
  // ============================
  { title: "The Girl on the Train", author: "Paula Hawkins", genre: "thriller", theme: "identity", mood: "dark", length: "medium", isbn: "9781594634024", mature: true },
  { title: "The Silence of the Lambs", author: "Thomas Harris", genre: "thriller", theme: "justice", mood: "dark", length: "medium", isbn: "9780312924584", mature: true },
  { title: "The Firm", author: "John Grisham", genre: "thriller", theme: "justice", mood: "thrilling", length: "long", isbn: "9780440245926", mature: false },
  { title: "Before I Go to Sleep", author: "S.J. Watson", genre: "thriller", theme: "identity", mood: "mysterious", length: "medium", isbn: "9780062060563", mature: false },
  { title: "The Woman in the Window", author: "A.J. Finn", genre: "thriller", theme: "survival", mood: "dark", length: "medium", isbn: "9780062678416", mature: true },
  { title: "Dark Places", author: "Gillian Flynn", genre: "thriller", theme: "family", mood: "dark", length: "medium", isbn: "9780307341570", mature: true },
  { title: "The Couple Next Door", author: "Shari Lapena", genre: "thriller", theme: "family", mood: "thrilling", length: "medium", isbn: "9780735221109", mature: false },
  { title: "Verity", author: "Colleen Hoover", genre: "thriller", theme: "love", mood: "dark", length: "medium", isbn: "9781538724736", mature: true },
  { title: "The Maid", author: "Nita Prose", genre: "thriller", theme: "justice", mood: "mysterious", length: "medium", isbn: "9780593356159", mature: false },
  { title: "Mexican Gothic", author: "Silvia Moreno-Garcia", genre: "thriller", theme: "survival", mood: "dark", length: "medium", isbn: "9780525620785", mature: true },

  // ============================
  // HORROR (10 books)
  // ============================
  { title: "It", author: "Stephen King", genre: "horror", theme: "coming-of-age", mood: "dark", length: "long", isbn: "9781501142970", mature: true },
  { title: "The Shining", author: "Stephen King", genre: "horror", theme: "family", mood: "dark", length: "long", isbn: "9780307743657", mature: true },
  { title: "Frankenstein", author: "Mary Shelley", genre: "horror", theme: "identity", mood: "thought-provoking", length: "short", isbn: "9780141439471", mature: false },
  { title: "Dracula", author: "Bram Stoker", genre: "horror", theme: "power", mood: "dark", length: "long", isbn: "9780141439846", mature: false },
  { title: "The Haunting of Hill House", author: "Shirley Jackson", genre: "horror", theme: "identity", mood: "mysterious", length: "short", isbn: "9780143039983", mature: false },
  { title: "Bird Box", author: "Josh Malerman", genre: "horror", theme: "survival", mood: "thrilling", length: "short", isbn: "9780062259660", mature: true },
  { title: "House of Leaves", author: "Mark Z. Danielewski", genre: "horror", theme: "identity", mood: "dark", length: "long", isbn: "9780375703768", mature: true },
  { title: "The Exorcist", author: "William Peter Blatty", genre: "horror", theme: "survival", mood: "dark", length: "medium", isbn: "9780061007224", mature: true },
  { title: "Coraline", author: "Neil Gaiman", genre: "horror", theme: "coming-of-age", mood: "mysterious", length: "short", isbn: "9780380807345", mature: false },
  { title: "My Best Friend's Exorcism", author: "Grady Hendrix", genre: "horror", theme: "family", mood: "funny", length: "medium", isbn: "9781594748622", mature: true },

  // ============================
  // HISTORICAL (10 books)
  // ============================
  { title: "All the Light We Cannot See", author: "Anthony Doerr", genre: "historical", theme: "survival", mood: "emotional", length: "long", isbn: "9781501173219", mature: false },
  { title: "The Pillars of the Earth", author: "Ken Follett", genre: "historical", theme: "power", mood: "thrilling", length: "long", isbn: "9780451166890", mature: true },
  { title: "Memoirs of a Geisha", author: "Arthur Golden", genre: "historical", theme: "identity", mood: "emotional", length: "medium", isbn: "9780679781585", mature: true },
  { title: "The Help", author: "Kathryn Stockett", genre: "historical", theme: "justice", mood: "inspiring", length: "long", isbn: "9780425232200", mature: false },
  { title: "A Gentleman in Moscow", author: "Amor Towles", genre: "historical", theme: "adventure", mood: "lighthearted", length: "long", isbn: "9780143110439", mature: false },
  { title: "The Tattooist of Auschwitz", author: "Heather Morris", genre: "historical", theme: "love", mood: "emotional", length: "short", isbn: "9780062797155", mature: true },
  { title: "Shogun", author: "James Clavell", genre: "historical", theme: "power", mood: "thrilling", length: "long", isbn: "9781982529093", mature: true },
  { title: "The Alice Network", author: "Kate Quinn", genre: "historical", theme: "justice", mood: "thrilling", length: "medium", isbn: "9780062654199", mature: true },
  { title: "Pachinko", author: "Min Jin Lee", genre: "historical", theme: "family", mood: "thought-provoking", length: "long", isbn: "9781455563920", mature: false },
  { title: "The Guernsey Literary and Potato Peel Pie Society", author: "Mary Ann Shaffer", genre: "historical", theme: "family", mood: "lighthearted", length: "medium", isbn: "9780385341004", mature: false },

  // ============================
  // NON-FICTION: BIOGRAPHY & MEMOIR (40 books)
  // ============================
  { title: "Educated", author: "Tara Westover", genre: "biography", theme: "coming-of-age", mood: "inspiring", length: "medium", isbn: "9780399590504", mature: true },
  { title: "Becoming", author: "Michelle Obama", genre: "biography", theme: "identity", mood: "inspiring", length: "long", isbn: "9781524763138", mature: false },
  { title: "The Diary of a Young Girl", author: "Anne Frank", genre: "biography", theme: "survival", mood: "emotional", length: "medium", isbn: "9780553296983", mature: false },
  { title: "Steve Jobs", author: "Walter Isaacson", genre: "biography", theme: "power", mood: "thought-provoking", length: "long", isbn: "9781451648539", mature: false },
  { title: "Born a Crime", author: "Trevor Noah", genre: "biography", theme: "coming-of-age", mood: "funny", length: "medium", isbn: "9780399588198", mature: true },
  { title: "When Breath Becomes Air", author: "Paul Kalanithi", genre: "biography", theme: "survival", mood: "emotional", length: "short", isbn: "9780812988406", mature: false },
  { title: "The Glass Castle", author: "Jeannette Walls", genre: "biography", theme: "family", mood: "emotional", length: "medium", isbn: "9780743247542", mature: true },
  { title: "I Know Why the Caged Bird Sings", author: "Maya Angelou", genre: "biography", theme: "identity", mood: "inspiring", length: "medium", isbn: "9780345514400", mature: true },
  { title: "Long Walk to Freedom", author: "Nelson Mandela", genre: "biography", theme: "justice", mood: "inspiring", length: "long", isbn: "9780316548182", mature: false },
  { title: "Just Mercy", author: "Bryan Stevenson", genre: "biography", theme: "justice", mood: "thought-provoking", length: "medium", isbn: "9780812984965", mature: true },
  { title: "Wild", author: "Cheryl Strayed", genre: "biography", theme: "adventure", mood: "inspiring", length: "medium", isbn: "9780307476074", mature: true },
  { title: "Greenlights", author: "Matthew McConaughey", genre: "biography", theme: "discovery", mood: "lighthearted", length: "medium", isbn: "9780593139134", mature: true },
  { title: "Man's Search for Meaning", author: "Viktor E. Frankl", genre: "biography", theme: "survival", mood: "thought-provoking", length: "short", isbn: "9780807014271", mature: true },
  { title: "The Autobiography of Malcolm X", author: "Malcolm X", genre: "biography", theme: "justice", mood: "thought-provoking", length: "long", isbn: "9780345350688", mature: true },
  { title: "Shoe Dog", author: "Phil Knight", genre: "biography", theme: "adventure", mood: "inspiring", length: "medium", isbn: "9781501135910", mature: false },
  { title: "Bossypants", author: "Tina Fey", genre: "biography", theme: "identity", mood: "funny", length: "medium", isbn: "9780316056861", mature: true },
  { title: "A Promised Land", author: "Barack Obama", genre: "biography", theme: "power", mood: "thought-provoking", length: "long", isbn: "9781524763169", mature: false },
  { title: "Open", author: "Andre Agassi", genre: "biography", theme: "redemption", mood: "emotional", length: "medium", isbn: "9780307388407", mature: true },
  { title: "Crying in H Mart", author: "Michelle Zauner", genre: "biography", theme: "family", mood: "emotional", length: "short", isbn: "9780525657743", mature: false },
  { title: "The Year of Magical Thinking", author: "Joan Didion", genre: "biography", theme: "love", mood: "emotional", length: "short", isbn: "9781400078431", mature: false },
  { title: "Unbroken", author: "Laura Hillenbrand", genre: "biography", theme: "survival", mood: "thrilling", length: "long", isbn: "9780812974492", mature: true },
  { title: "Hillbilly Elegy", author: "J.D. Vance", genre: "biography", theme: "family", mood: "thought-provoking", length: "medium", isbn: "9780062300546", mature: true },
  { title: "Between the World and Me", author: "Ta-Nehisi Coates", genre: "biography", theme: "identity", mood: "thought-provoking", length: "short", isbn: "9780451482211", mature: false },
  { title: "Tuesdays with Morrie", author: "Mitch Albom", genre: "biography", theme: "discovery", mood: "emotional", length: "short", isbn: "9780767905923", mature: false },
  { title: "Kitchen Confidential", author: "Anthony Bourdain", genre: "biography", theme: "adventure", mood: "funny", length: "medium", isbn: "9780060899226", mature: true },
  { title: "Persepolis", author: "Marjane Satrapi", genre: "biography", theme: "coming-of-age", mood: "thought-provoking", length: "short", isbn: "9780375714573", mature: true },
  { title: "Know My Name", author: "Chanel Miller", genre: "biography", theme: "justice", mood: "emotional", length: "medium", isbn: "9780735223707", mature: true },
  { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", genre: "biography", theme: "discovery", mood: "thought-provoking", length: "medium", isbn: "9781400052189", mature: false },
  { title: "Into the Wild", author: "Jon Krakauer", genre: "biography", theme: "adventure", mood: "thrilling", length: "short", isbn: "9780385486804", mature: false },
  { title: "Night", author: "Elie Wiesel", genre: "biography", theme: "survival", mood: "dark", length: "short", isbn: "9780374500016", mature: true },
  { title: "Hidden Figures", author: "Margot Lee Shetterly", genre: "biography", theme: "justice", mood: "inspiring", length: "medium", isbn: "9780062363602", mature: false },
  { title: "Alexander Hamilton", author: "Ron Chernow", genre: "biography", theme: "power", mood: "thought-provoking", length: "long", isbn: "9780143034759", mature: false },
  { title: "The Diary of Frida Kahlo", author: "Frida Kahlo", genre: "biography", theme: "identity", mood: "emotional", length: "short", isbn: "9780810959545", mature: true },
  { title: "Maus", author: "Art Spiegelman", genre: "biography", theme: "survival", mood: "dark", length: "medium", isbn: "9780394747231", mature: true },
  { title: "I Am Malala", author: "Malala Yousafzai", genre: "biography", theme: "justice", mood: "inspiring", length: "medium", isbn: "9780316322423", mature: false },
  { title: "Yes Please", author: "Amy Poehler", genre: "biography", theme: "identity", mood: "funny", length: "medium", isbn: "9780062268341", mature: true },
  { title: "The Last Lecture", author: "Randy Pausch", genre: "biography", theme: "discovery", mood: "inspiring", length: "short", isbn: "9781401323257", mature: false },
  { title: "Lab Girl", author: "Hope Jahren", genre: "biography", theme: "discovery", mood: "inspiring", length: "medium", isbn: "9781101873724", mature: false },
  { title: "Spare", author: "Prince Harry", genre: "biography", theme: "family", mood: "emotional", length: "long", isbn: "9780593593806", mature: true },
  { title: "Endurance", author: "Alfred Lansing", genre: "biography", theme: "survival", mood: "thrilling", length: "medium", isbn: "9780465062881", mature: false },

  // ============================
  // NON-FICTION: SELF-HELP (30 books)
  // ============================
  { title: "Atomic Habits", author: "James Clear", genre: "self-help", theme: "discovery", mood: "inspiring", length: "medium", isbn: "9780735211292", mature: false },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey", genre: "self-help", theme: "power", mood: "thought-provoking", length: "medium", isbn: "9781982137274", mature: false },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", genre: "self-help", theme: "discovery", mood: "thought-provoking", length: "long", isbn: "9780374533557", mature: false },
  { title: "How to Win Friends and Influence People", author: "Dale Carnegie", genre: "self-help", theme: "discovery", mood: "lighthearted", length: "medium", isbn: "9780671027032", mature: false },
  { title: "The Power of Habit", author: "Charles Duhigg", genre: "self-help", theme: "identity", mood: "thought-provoking", length: "medium", isbn: "9780812981605", mature: false },
  { title: "Daring Greatly", author: "Brené Brown", genre: "self-help", theme: "identity", mood: "inspiring", length: "medium", isbn: "9781592408412", mature: false },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", genre: "self-help", theme: "identity", mood: "funny", length: "short", isbn: "9780062457714", mature: true },
  { title: "Quiet", author: "Susan Cain", genre: "self-help", theme: "identity", mood: "thought-provoking", length: "medium", isbn: "9780307352156", mature: false },
  { title: "Sapiens", author: "Yuval Noah Harari", genre: "self-help", theme: "discovery", mood: "thought-provoking", length: "long", isbn: "9780062316097", mature: false },
  { title: "The Four Agreements", author: "Don Miguel Ruiz", genre: "self-help", theme: "discovery", mood: "inspiring", length: "short", isbn: "9781878424310", mature: false },
  { title: "Outliers", author: "Malcolm Gladwell", genre: "self-help", theme: "discovery", mood: "thought-provoking", length: "medium", isbn: "9780316017930", mature: false },
  { title: "Grit", author: "Angela Duckworth", genre: "self-help", theme: "survival", mood: "inspiring", length: "medium", isbn: "9781501111105", mature: false },
  { title: "Mindset", author: "Carol S. Dweck", genre: "self-help", theme: "coming-of-age", mood: "inspiring", length: "medium", isbn: "9780345472328", mature: false },
  { title: "The Body Keeps the Score", author: "Bessel van der Kolk", genre: "self-help", theme: "survival", mood: "thought-provoking", length: "long", isbn: "9780143127741", mature: true },
  { title: "You Are a Badass", author: "Jen Sincero", genre: "self-help", theme: "identity", mood: "funny", length: "short", isbn: "9780762447695", mature: true },
  { title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", genre: "self-help", theme: "power", mood: "thought-provoking", length: "short", isbn: "9781612680194", mature: false },
  { title: "The Gifts of Imperfection", author: "Brené Brown", genre: "self-help", theme: "redemption", mood: "inspiring", length: "short", isbn: "9781592858491", mature: false },
  { title: "Deep Work", author: "Cal Newport", genre: "self-help", theme: "discovery", mood: "thought-provoking", length: "medium", isbn: "9781455586691", mature: false },
  { title: "Start with Why", author: "Simon Sinek", genre: "self-help", theme: "power", mood: "inspiring", length: "medium", isbn: "9781591846444", mature: false },
  { title: "The Happiness Project", author: "Gretchen Rubin", genre: "self-help", theme: "discovery", mood: "lighthearted", length: "medium", isbn: "9780062414854", mature: false },
  { title: "Emotional Intelligence", author: "Daniel Goleman", genre: "self-help", theme: "identity", mood: "thought-provoking", length: "medium", isbn: "9780553383713", mature: false },
  { title: "Never Split the Difference", author: "Chris Voss", genre: "self-help", theme: "power", mood: "thrilling", length: "medium", isbn: "9780062407801", mature: false },
  { title: "Maybe You Should Talk to Someone", author: "Lori Gottlieb", genre: "self-help", theme: "redemption", mood: "emotional", length: "long", isbn: "9781328662057", mature: false },
  { title: "Why We Sleep", author: "Matthew Walker", genre: "self-help", theme: "discovery", mood: "thought-provoking", length: "medium", isbn: "9781501144325", mature: false },
  { title: "The Midnight Library", author: "Matt Haig", genre: "self-help", theme: "redemption", mood: "inspiring", length: "medium", isbn: "9780525559474", mature: false },
  { title: "12 Rules for Life", author: "Jordan B. Peterson", genre: "self-help", theme: "identity", mood: "thought-provoking", length: "long", isbn: "9780345816023", mature: false },
  { title: "Range", author: "David Epstein", genre: "self-help", theme: "discovery", mood: "inspiring", length: "medium", isbn: "9780735214484", mature: false },
  { title: "Ikigai", author: "Héctor García", genre: "self-help", theme: "discovery", mood: "lighthearted", length: "short", isbn: "9780143130727", mature: false },
  { title: "Can't Hurt Me", author: "David Goggins", genre: "self-help", theme: "survival", mood: "inspiring", length: "medium", isbn: "9781544512280", mature: true },
  { title: "Big Magic", author: "Elizabeth Gilbert", genre: "self-help", theme: "discovery", mood: "inspiring", length: "short", isbn: "9781594634727", mature: false },

  // ============================
  // NON-FICTION: GENERAL / SCIENCE / HISTORY (30 books)
  // ============================
  { title: "A Short History of Nearly Everything", author: "Bill Bryson", genre: "self-help", theme: "discovery", mood: "lighthearted", length: "long", isbn: "9780767908184", mature: false },
  { title: "Guns, Germs, and Steel", author: "Jared Diamond", genre: "self-help", theme: "power", mood: "thought-provoking", length: "long", isbn: "9780393354324", mature: false },
  { title: "Freakonomics", author: "Steven D. Levitt", genre: "self-help", theme: "discovery", mood: "lighthearted", length: "medium", isbn: "9780060731335", mature: false },
  { title: "The Power of Now", author: "Eckhart Tolle", genre: "self-help", theme: "identity", mood: "inspiring", length: "short", isbn: "9781577314806", mature: false },
  { title: "Influence", author: "Robert B. Cialdini", genre: "self-help", theme: "power", mood: "thought-provoking", length: "medium", isbn: "9780062937650", mature: false },
  { title: "The Lean Startup", author: "Eric Ries", genre: "self-help", theme: "adventure", mood: "inspiring", length: "medium", isbn: "9780307887894", mature: false },
  { title: "Talk Like TED", author: "Carmine Gallo", genre: "self-help", theme: "discovery", mood: "inspiring", length: "short", isbn: "9781250041128", mature: false },
  { title: "Blink", author: "Malcolm Gladwell", genre: "self-help", theme: "discovery", mood: "thought-provoking", length: "short", isbn: "9780316010665", mature: false },
  { title: "The Art of War", author: "Sun Tzu", genre: "self-help", theme: "power", mood: "thought-provoking", length: "short", isbn: "9781590302255", mature: false },
  { title: "Good to Great", author: "Jim Collins", genre: "self-help", theme: "power", mood: "thought-provoking", length: "medium", isbn: "9780066620992", mature: false }
];
