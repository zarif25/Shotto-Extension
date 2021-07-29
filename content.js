$(document).ready(function () {

  chrome.storage.sync.get(['isOn'], function (data) {
    if (data.isOn) {
      const trustedSources = [
        "untangled",
        "daily star",
        "nutshell",
        "cablgram",
        "business standard",
      ]

      function getFeeds() {
        try {
          feeds = []
          document.querySelectorAll('[role="feed"]').forEach(i => feeds.push(...i.children))
          return feeds
        }
        catch (e) {
          return []
        }
      }

      function getInfo(post) {
        try {
          h4 = post.querySelector('h4')
          return {
            "userH": h4,
            "post": post,
            "user": h4.innerText,
            "verified": post.querySelector('div[aria-label*="Verified"]') != null,
            "checked": h4.querySelector('h1') != null,
            "text": post.querySelector('div[data-ad-comet-preview="message"]').innerText
          }
        }
        catch (e) {
          try {
            h2 = post.querySelector('h2')
            return {
              "userH": h2,
              "post": post,
              "user": h2.innerText,
              "verified": post.querySelector('div[aria-label*="Verified"]') != null,
              "checked": h2.querySelector('h1') != null,
              "text": post.querySelector('div[data-ad-comet-preview="message"]').innerText
            }
          }
          catch (e) {
            return post
          }
        }
      }

      function isEnglish(text) {

        mapped_text = [...text]
          .filter(ch => !" .,!?;%()[]{}+-/\\'\"=><".includes(ch))
          .map(ch => ch >= "A" && ch <= "z")

        trues = mapped_text.filter(b => b).length

        return trues / mapped_text.length > 0.5
      }

      function toWords(text, lang) {
        sentence_list = text
          .split(/[\.!?;।(\r\n|\r|\n)]/)
          .map(sentence => sentence.replace(/[\\/,;%(){}[\]'”“"=><*:]/g, '')) // remove symbols
          .map(sentence => sentence.replace(/\s{2}/g, ' ')) // replce "  " with " "
          .map(sentence => sentence.replace(/….+/, ''))
          .map(sentence => sentence.trim())
          .filter(sentence => sentence != ' ' && sentence)
          .map(sentence => sentence.split(' '))
        words = []
        sentence_list.forEach(sentence => words.push(...sentence))
        words = words.filter(word => word[0] != '#') // remove hashtags
        return words
      }


      function matchesWithNewsList(newsList, text) {
        let lang = isEnglish(text) ? 'en' : 'bn'

        text_words = toWords(text, lang)

        matchNos = []
        if (lang == 'en') {
          newsList.en.forEach(news => {
            let matchNo = text_words.filter(word => news.words.includes(word)).length
            matchNos.push(matchNo)
          })
        }
        else {
          newsList.bn.forEach(news => {
            let matchNo = text_words.filter(word => news.words.includes(word)).length
            matchNos.push(matchNo)
          })
        }
        maxVal = Math.max(...matchNos)
        isVerified = text_words.length <= 5 ? maxVal / text_words.length > 0.34 : maxVal / text_words.length > 0.2
        return [lang, matchNos.indexOf(maxVal), isVerified]
      }

      function refreshTags(newsList) {
        feeds = getFeeds()
        feedsInfo = feeds.map((post) => getInfo(post))
        feedsInfo.forEach((info) => {
          if (info.user && !info.checked) {
            let symbol = document.createElement('h1')
            let extra = document.createElement('div')
            extra.style.borderRadius = "5px"
            extra.style.padding = '5px'
            extra.style.background = '#191919'
            extra.style.display = 'none'
            if (info.verified || trustedSources.some(trustedSource => info.user.toLowerCase().includes(trustedSource))) {
              symbol.innerText = "Trusted Source"
              symbol.style.color = "#00EBAC"
              extra.innerHTML = `
                <p style='color:#00EBAC;margin:0'>Authenticity Score: 100%<br/>Bias Category: Neutral</p>
                `
              symbol.style.cursor = 'pointer'
              symbol.addEventListener('click', function () {
                if (extra.style.display == 'none')
                  extra.style.display = 'block'
                else
                  extra.style.display = 'none'
              })
            }
            else if (info.text) {
              let [lang, index, isVerified] = matchesWithNewsList(newsList, info.text)
              if (isVerified) {
                symbol.innerText = "Verified"
                symbol.style.color = "#00EBAC"
                symbol.style.cursor = 'pointer'
                extra.innerHTML = "<p style='color:#00EBAC;margin:0'>Authenticity Score: 93%</p>"
                links = newsList[lang][index].related || []
                if (links.length > 0) {
                  extra.innerHTML += "<h1 style='color:#efefef'>Related artices:</h1>"
                }
                links.forEach(link => {
                  extra.innerHTML += `<a style="#4e9ecb" href='${link}'>${link}</a><br/>`
                })
                symbol.addEventListener('click', function () {
                  if (extra.style.display == 'none')
                    extra.style.display = 'block'
                  else
                    extra.style.display = 'none'
                })
              }
              else {
                symbol.innerText = "Not Verified"
                symbol.style.color = "#ffbc04"
              }
            }
            else {
              symbol.innerText = "Not Verified"
              symbol.style.color = "#ffbc04"
            }
            info.userH.appendChild(symbol)
            info.userH.appendChild(extra)
          }
        })
      }

      fetch('https://storage.googleapis.com/shotto/static/newslist.json', { mode: 'cors' })
        .then((res) => res.json())
        .then((newsList) => {

          refreshTags(newsList)
          document.addEventListener('scroll', function (e) {
            refreshTags(newsList)
          })
        })
    }
  })
})



