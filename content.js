$(document).ready(function () {

  // const image = document.createElement('img')
  // image.src = './logos/shotto32.png'
  // image.class = 'shotto-tag'

  const stop_words_en = ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't", 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', "can't", 'cannot', 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing', "don't", 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't", 'have', "haven't", 'having', 'he', "he'd", "he'll", "he's", 'her', 'here', "here's", 'hers', 'herself', 'him', 'himself', 'his', 'how', "how's", 'i', "i'd", "i'll", "i'm", "i've", 'if', 'in', 'into', 'is', "isn't", 'it', "it's", 'its', 'itself', "let's", 'me', 'more', 'most', "mustn't", 'my', 'myself', 'no', 'nor', 'not', 'of', 'off',
    'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', "shan't", 'she', "she'd", "she'll", "she's", 'should', "shouldn't", 'so', 'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', "there's", 'these', 'they', "they'd", "they'll", "they're", "they've", 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll", "we're", "we've", 'were', "weren't", 'what', "what's", 'when', "when's", 'where', "where's", 'which', 'while', 'who', "who's", 'whom', 'why', "why's", 'with', "won't", 'would', "wouldn't", 'you', "you'd", "you'll", "you're", "you've", 'your', 'yours', 'yourself', 'yourselves']
  const stop_words_bn = ["অতএব", "অথচ", "অথবা", "অনুযায়ী", "অনেক", "অনেকে", "অনেকেই", "অন্তত", "অন্য", "অবধি", "অবশ্য", "অর্থাত", "আই", "আগামী", "আগে", "আগেই", "আছে", "আজ", "আদ্যভাগে", "আপনার", "আপনি", "আবার", "আমরা", "আমাকে", "আমাদের", "আমার", "আমি", "আর", "আরও", "ই", "ইত্যাদি", "ইহা", "উচিত", "উত্তর", "উনি", "উপর", "উপরে", "এ", "এঁদের", "এঁরা", "এই", "একই", "একটি", "একবার", "একে", "এক্", "এখন", "এখনও", "এখানে", "এখানেই", "এটা", "এটাই", "এটি", "এত", "এতটাই", "এতে", "এদের", "এব", "এবং", "এবার", "এমন", "এমনকী", "এমনি", "এর", "এরা", "এল", "এস", "এসে", "ঐ", "ও", "ওঁদের", "ওঁর", "ওঁরা", "ওই", "ওকে", "ওখানে", "ওদের", "ওর", "ওরা", "কখনও", "কত", "কবে", "কমনে", "কয়েক", "কয়েকটি", "করছে", "করছেন", "করতে", "করবে", "করবেন", "করলে", "করলেন", "করা", "করাই", "করায়", "করার", "করি", "করিতে", "করিয়া", "করিয়ে", "করে", "করেই", "করেছিলেন", "করেছে", "করেছেন", "করেন", "কাউকে", "কাছ", "কাছে", "কাজ", "কাজে", "কারও", "কারণ", "কি", "কিংবা", "কিছু", "কিছুই", "কিন্তু", "কী", "কে", "কেউ", "কেউই", "কেখা", "কেন", "কোটি", "কোন", "কোনও", "কোনো", "ক্ষেত্রে", "কয়েক", "খুব", "গিয়ে", "গিয়েছে", "গিয়ে", "গুলি", "গেছে", "গেল", "গেলে", "গোটা", "চলে", "চান", "চায়", "চার", "চালু", "চেয়ে", "চেষ্টা", "ছাড়া", "ছাড়াও", "ছিল", "ছিলেন", "জন", "জনকে", "জনের", "জন্য", "জন্যওজে", "জানতে", "জানা", "জানানো", "জানায়", "জানিয়ে", "জানিয়েছে", "জে", "জ্নজন", "টি", "ঠিক", "তখন", "তত", "তথা", "তবু", "তবে", "তা", "তাঁকে", "তাঁদের", "তাঁর", "তাঁরা", "তাঁাহারা", "তাই", "তাও", "তাকে", "তাতে", "তাদের", "তার", "তারপর", "তারা", "তারৈ", "তাহলে", "তাহা", "তাহাতে", "তাহার", "তিনঐ", "তিনি", "তিনিও", "তুমি", "তুলে", "তেমন", "তো", "তোমার", "থাকবে", "থাকবেন", "থাকা", "থাকায়", "থাকে",
    "থাকেন", "থেকে", "থেকেই", "থেকেও", "দিকে", "দিতে", "দিন", "দিয়ে", "দিয়েছে", "দিয়েছেন", "দিলেন", "দু", "দুই", "দুটি", "দুটো", "দেওয়া", "দেওয়ার", "দেওয়া", "দেখতে", "দেখা", "দেখে", "দেন", "দেয়", "দ্বারা", "ধরা", "ধরে", "ধামার", "নতুন", "নয়", "না", "নাই", "নাকি", "নাগাদ", "নানা", "নিজে", "নিজেই", "নিজেদের", "নিজের", "নিতে", "নিয়ে", "নিয়ে", "নেই", "নেওয়া", "নেওয়ার", "নেওয়া", "নয়", "পক্ষে", "পর", "পরে", "পরেই", "পরেও", "পর্যন্ত", "পাওয়া", "পাচ", "পারি", "পারে", "পারেন", "পি", "পেয়ে", "পেয়্র্", "প্রতি", "প্রথম", "প্রভৃতি", "প্রযন্ত", "প্রাথমিক", "প্রায়", "প্রায়", "ফলে", "ফিরে", "ফের", "বক্তব্য", "বদলে", "বন", "বরং", "বলতে", "বলল", "বললেন", "বলা", "বলে", "বলেছেন", "বলেন", "বসে", "বহু", "বা", "বাদে", "বার", "বি", "বিনা", "বিভিন্ন", "বিশেষ", "বিষয়টি", "বেশ", "বেশি", "ব্যবহার", "ব্যাপারে", "ভাবে", "ভাবেই", "মতো", "মতোই", "মধ্যভাগে", "মধ্যে", "মধ্যেই", "মধ্যেও", "মনে", "মাত্র", "মাধ্যমে", "মোট", "মোটেই", "যখন", "যত", "যতটা", "যথেষ্ট", "যদি", "যদিও", "যা", "যাঁর", "যাঁরা", "যাওয়া", "যাওয়ার", "যাওয়া", "যাকে", "যাচ্ছে", "যাতে", "যাদের", "যান", "যাবে", "যায়", "যার", "যারা", "যিনি", "যে", "যেখানে", "যেতে", "যেন", "যেমন", "র", "রকম", "রয়েছে", "রাখা", "রেখে", "লক্ষ", "শুধু", "শুরু", "সঙ্গে", "সঙ্গেও", "সব", "সবার", "সমস্ত", "সম্প্রতি", "সহ", "সহিত", "সাধারণ", "সামনে", "সি", "সুতরাং", "সে", "সেই", "সেখান", "সেখানে", "সেটা", "সেটাই", "সেটাও", "সেটি", "স্পষ্ট", "স্বয়ং", "হইতে", "হইবে", "হইয়া", "হওয়া", "হওয়ায়", "হওয়ার", "হচ্ছে", "হত", "হতে", "হতেই", "হন", "হবে", "হবেন", "হয়", "হয়তো", "হয়নি", "হয়ে", "হয়েই", "হয়েছিল", "হয়েছে", "হয়েছেন", "হল", "হলে", "হলেই", "হলেও", "হলো", "হাজার", "হিসাবে", "হৈলে", "হোক", "হয়"]

  const trustedSources = [
    "untangled",
    "daily star"
  ]

  function getFeeds() {
    try {
      return [...document.querySelector('[role="feed"]').children].slice(1)
    }
    catch (e) {
      return []
    }
  }

  function getInfo(post) {
    try {

      h4 = post.querySelector('h4')
      return {
        "post": post,
        "user": h4.innerText,
        "verified": h4.querySelector('div[aria-label="Verified"]') != null,
        "checked": h4.querySelector('h1') != null,
        "text": post.querySelector('div[data-ad-comet-preview="message"]').innerText
      }
    }
    catch (e) {
      return post
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
    if (lang == 'en') {
      sentence_list = sentence_list
        .map(sentence => sentence
          .split(' ')
          .filter(word => !stop_words_en.includes(word))
        )
    } else {
      sentence_list = sentence_list
        .map(sentence => sentence
          .split(' ')
          .filter(word => !stop_words_bn.includes(word))
        )
    }
    words = []
    sentence_list.forEach(sentence => words.push(...sentence))
    words = words.filter(word => word[0] != '#') // remove hashtags
    return words
  }


  function matchesWithNewsList(newsList, text) {
    let lang = isEnglish(text) ? 'en' : 'bn'

    text_sentences = toWords(text, lang)

    console.log(text_sentences)
    if (lang == 'en') {
      return true
    }

  }

  function refreshTags(newsList) {
    feeds = getFeeds()
    feedsInfo = feeds.map((post) => getInfo(post))
    console.log(feedsInfo)
    feedsInfo.forEach((info) => {
      if (info.user && !info.checked) {
        let symbol = document.createElement('h1')
        if (info.verified || trustedSources.some(trustedSource => info.user.toLowerCase().includes(trustedSource))) {
          symbol.innerText = "Trusted Source"
          symbol.style.color = "#00EBAC"
        }
        else if (info.text && matchesWithNewsList(newsList, info.text)) {
          symbol.innerText = "Verified"
          symbol.style.color = "#00EBAC"
        }
        else {
          symbol.innerText = "Not Verified"
          symbol.style.color = "#636060"
        }
        info.post.querySelector('h4').appendChild(symbol)
      }
    })
  }

  fetch('https://storage.googleapis.com/shotto/static/newslist.json', { mode: 'cors' })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      refreshTags()
      document.addEventListener('scroll', function (e) {
        refreshTags()
      })
    })
})



