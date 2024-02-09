function teste2(text: string): void {
  let query = text.split(' ')
  let engine = query.shift() // remove de query o primeiro item e armazena aqui
  let searchTerm = query.join(' ')

  let searchUrl: string;
  switch (engine) {
    case 'gh':
      if (query[0] === '-u') {
        const teste = query.shift()
        const user = query.join(' ')
        console.log(teste)
        console.log(user)
      } else {
        console.log('não tem');
      }
      break;

    case 'dl': // DeepL
      if (query[query.length - 2] === 'for') {
        const customLang = query.pop() // remove o ultimo
        query.pop(); // Remove o 'for'
        searchTerm = query.join(' '); // Junta o restante para formar o searchTerm
        searchUrl = `https://www.deepl.com/translator#pt/${customLang}/${encodeURIComponent(searchTerm)}`
      } else {
        searchUrl = `https://www.deepl.com/translator#en/pt/${encodeURIComponent(searchTerm)}`
      }
      break

    default:
      searchUrl = `https://google.com/search?q=${text}`;
  }
  console.log('searchTerm ', searchTerm)
}

teste2('dl mirella é legal for en');
