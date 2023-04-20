let filter = document.querySelector('.filter');
let browsePopularType = document.querySelector(".mainWrap")
let browsePopularTypePrev = document.querySelector(".popularType .title .toggleButton .prev")
let browsePopularTypeNext = document.querySelector(".popularType .title .toggleButton .next")

Promise.all([
    axios.get("browseNav.json"),
    axios.get("browse.json"),
    axios.get("browsePopularType.json")
]).then(([navResponse, browseResponse,browsePopularTypeResponse]) => {
    // 获取左边筛选器的数据并进行渲染
    const navData = navResponse.data.Catalog.tags.elements;
    filterData.filterHtmlData = groupByGroupName(navData);
    filter.addEventListener("click", filterData.filterClick);
    page.browsePopularTypeData = splitArrayBrowse(browsePopularTypeResponse,5)
    page.lookPage = "browse"
    page.box.addEventListener("click", page.click)
    // 获取游戏数据并进行渲染
    const gameData = browseResponse;
    page.rawData = gameData;
    // 执行webRendering函数
    
    return webRendering();
}).catch(err => {
    console.log(err);
});


//提交bug