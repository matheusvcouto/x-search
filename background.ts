// <reference path="./chrome.d.ts"/> // adicionar mais uma barra
// Tipagem:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/chrome/index.d.ts
// https://stackoverflow.com/questions/28844406/using-google-chrome-extension-apis-in-typescript

chrome.omnibox.onInputEntered.addListener( async (text) => {
  let query = text.split(' ')
  let engine = query.shift() // remove de query o primeiro item e armazena aqui
  let searchTerm = query.join(' ')

  let searchUrl = ''

  switch (engine) {
    case 'gh':
      if (query[0] === '-u' || query[0] === 'user') {
        const user = query[1]
        searchUrl = `https://github.com/search?q=${user}&type=Users`
        break     
      }

      if (query[0] === 'config') {
        if (query[1] === 'apps') {
          searchUrl = `https://github.com/settings/installations`;
        } else {
          searchUrl = `https://github.com/settings`;
        }
        break;     
      }

      searchUrl = `https://github.com/search?q=${searchTerm}`
      
      break

    case 'g':
      searchUrl = `https://google.com/search?q=${searchTerm}`
      break

    case 'b':
      searchUrl = `https://bing.com/search?q=${searchTerm}`
      break

    case 'yt':
      if (!query[1]) {
        searchUrl = 'https://youtube.com/'
      } else {
        searchUrl = `https://youtube.com/results?search_query=${searchTerm}`
      }
      break

    case 'ddg':
      searchUrl = `https://duckduckgo.com/?q=${searchTerm}`
      break

    case 'figma':
      searchUrl = `https://www.figma.com/community/search?resource_type=mixed&sort_by=relevancy&query=${searchTerm}&editor_type=all&price=all&creators=all`
      break

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
      searchUrl = `https://google.com/search?q=${text}`
  }

  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  if (tab.id) {
    await chrome.tabs.update(tab.id, { url: searchUrl })
  }
})



chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  // Exemplo de como você pode estruturar sugestões dinâmicas com base na entrada
  const defaultSuggestions = [
    { content: "gh ", description: "Pesquisar no GitHub" },
    { content: "yt ", description: "Pesquisar no YouTube" },
    { content: "g ", description: "Pesquisar no Google" },
    { content: "b ", description: "Pesquisar no Bing" },
    { content: "ddg ", description: "Pesquisar no DuckDuckGo" },
  ]

  suggest(defaultSuggestions)
})
