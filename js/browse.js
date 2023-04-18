let filter = document.querySelector('.filter');
// let 
Promise.all([
    axios.get("browseNav.json"),
    axios.get("browse.json")
]).then(([navResponse, browseResponse]) => {
    // 获取左边筛选器的数据并进行渲染
    const navData = navResponse.data.Catalog.tags.elements;
    filterData.filterHtmlData = groupByGroupName(navData);
    filter.addEventListener("click", filterData.filterClick);
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