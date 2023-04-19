let newsBigBox = document.querySelector(".newsBox")
let newListBox = document.querySelector(".newList")
axios.get('news.json')
  .then(responese => {
    page.rawData = responese
    page.data = splitArrayBrowse(page.rawData.slice(3), 10)
    page.total = page.data.length
    page.lookPage = "news"

    page.rander()
    page.box.addEventListener("click", page.click)
    return newRendering()
  })