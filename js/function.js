

//判断数组里面是否含有数据,并且有的移出没有的添加
const toggleArrayItem = function toggleArrayItem(arr, item) {
    const index = arr.indexOf(item);
    if (index === -1) {
        arr.push(item);
    } else {
        arr.splice(index, 1);
    }
}


//计算 折扣百分比
const compareStrings = function compareStrings(str1, str2) {
    const regex = /[-+]?[0-9]*\.?[0-9]+/g; // 正则表达式，用于匹配浮点数
    const nums1 = str1.match(regex).map(parseFloat); // 提取并转换str1中的数字
    const nums2 = str2.match(regex).map(parseFloat); // 提取并转换str2中的数字
    const result = 1 - nums1[0] / nums2[0]; // 计算差
    const rounded = Math.round(result * 100); // 四舍五入
    const percent = rounded + '%'; // 转换为百分比
    return percent;
}

//去掉价格末尾的0
const noZeros = function noZeros(str) {
    const regex = /\.?0+$/; // 匹配小数点后面的连续0和末尾的连续0
    let res = str.replace(regex, ''); // 去除末尾的零
    if (res.endsWith('.')) { // 判断是否存在小数点
        res = res.slice(0, -1); // 去除末尾的小数点
    }
    return res;
}

//计算每个数据属于的游戏类型
const whatGameType = function whatGameType(type) {
    switch (type) {
        case 'bundles':
            type = '捆绑包'
            break;
        case 'games':
            type = '基础游戏'
            break;
        case 'addons':
            type = '附加内容'
            break;
        case 'applications':
            type = '软件'
            break;
        case 'engines':
            type = '编辑器'
            break;
        case 'games/demo':
            type = '试玩版'
            break;
        case 'games/edition/base':
        case 'games/edition':

            type = '版本'
            break;
        case 'software':
            type = '软件'
            break;

        default:
            break;
    }
    return type
}

//类春节特惠结构按钮点击切换
const switchElement = function switchElement(element, prevButton, nextButton) {
    const children = element.children;
    const childWidth = children[0].offsetWidth;
    let currentIndex = 0;

    // 初始状态下向上切换的按钮应该禁用
    prevButton.disabled = true;

    // 点击向下切换的按钮
    nextButton.addEventListener('click', () => {
        if (currentIndex < children.length - 1) {
            currentIndex++;
            element.style.left = `-${currentIndex * childWidth}px`;
            prevButton.disabled = false;
        }
        if (currentIndex === children.length - 1) {
            nextButton.disabled = true;
        }
    });

    // 点击向上切换的按钮
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            element.style.left = `-${currentIndex * childWidth}px`;
            nextButton.disabled = false;
        }
        if (currentIndex === 0) {
            prevButton.disabled = true;
        }
    });
}


// 类似春节特惠结构数据的分组
const splitArray = function splitArray(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 6) {
        result.push(arr.slice(i, i + 6));
    }
    return result;
}

//获取缩略图
const getThumbnail = function getThumbnail(imgArr, srcObj) {
    let thumbnailData = imgArr.find(item => item.type === 'Thumbnail');
    if (thumbnailData) {
        srcObj.url = thumbnailData.url;
        return thumbnailData;
    }

    let dieselGameBoxLogoData = imgArr.find(item => item.type === 'DieselGameBoxLogo');
    if (dieselGameBoxLogoData) {
        srcObj.url = dieselGameBoxLogoData.url;
        return dieselGameBoxLogoData;
    }

    return null;
};

// 类似春节特惠结构数据的渲染
const likeSpringSaleRendering = function likeSpringSaleRendering(element, value) {

    let gameData = value.offers
    let titleText = element.querySelector('.titleText')
    let gamesBox = element.querySelector('.gamesBox')
    let gamesBoxInnerHtml = ''

    //结构title渲染
    if (value.link.src) {
        titleText.href = `https://store.epicgames.com/zh-CN${value.link.src[0] === '/' ? value.link.src : `/${value.link.src}`}`
        titleText.innerHTML = `
            ${value.title}<span class=" iconfont icon-youjiantou"></span>
            `
    } else {
        titleText.innerHTML = `
            ${value.title}
            `
    }



    //盒子里面的每一个wrap渲染

    for (let i = 0; i < gameData.length; i += 6) {
        gamesBoxInnerHtml += `
            <div class="gamesWrap">
            </div>
            `
        gamesBox.innerHTML = gamesBoxInnerHtml
    }
    let gamesWrap = gamesBox.querySelectorAll('.gamesWrap')
    dataArr = splitArray(gameData)
    //里面的每个项目的数据渲染
    dataArr.forEach((item, index) => {
        let gamesWrapInnerHtml = ''
        item.forEach(function (gameItem, index) {
            gameItem = gameItem.offer
            let thumbnail = {}
            //获取缩略图
            getThumbnail(gameItem.keyImages, thumbnail)

            //获取价格和游戏类型
            let oldPrice = gameItem.price.totalPrice.fmtPrice.originalPrice
            let nowPrice = gameItem.price.totalPrice.fmtPrice.intermediatePrice
            let gameType = gameItem.categories[0].path

            gameType = whatGameType(gameType)

            gamesWrapInnerHtml += `<a class="games" href="">
                                            <div class="gameImg hover">
                                                <img src="${thumbnail.url}" alt="">
                                            </div>
                                            <div class="gameDes">
                                                <p>${gameType}</p>
                                                <h2>${gameItem.title}</h2>
                                            ${oldPrice === '0' ? `
                                            <div class="price free">
                                            免费 
                                            </div>
                                            ` : ` 
                                            <div class="price ">
                                                ${gameItem.price.totalPrice.discount === 0 ? `` : `
                                                <div class="discountPercentage">-${compareStrings(nowPrice, oldPrice)}</div>
                                                <span class="oldPrice">${noZeros(oldPrice)}</span>
                                                `}
                                                <span class="nowPrice">${noZeros(nowPrice)}</span>
                                            </div>
                                                `}
                                            </div>
                                            <div class="addWish">
                                                <div class="addIcon"></div>
                                                <div class="addText">添至愿望清单</div>
                                            </div>
                                        </a>`


        })
        gamesWrap[index].innerHTML = gamesWrapInnerHtml
    })

    //获取春季特卖的按钮和切换的盒子
    let prev = element.querySelector('.title .toggleButton .prev')
    let next = element.querySelector('.title .toggleButton .next')
    if (!(element.id === 'alreadyLaunched')) {
        switchElement(gamesBox, prev, next)
    }
}

//两张大图结构渲染
const twoBigImgRendering = function twoBigImgRendering(ele, value) {
    //从所有的数据选取所需的数据，
    let dataArrBig = []
    value.forEach((item) => {
        if (item.id.includes('module-breaker-lists')) {
            dataArrBig.push(item)
        }
    })
    // 文档中所有该结构框架，
    ele.forEach((eleItem, eleIndex) => {
        //eleItem就是HTML中的twoBigGames
        let targetElement = eleItem.querySelectorAll('.items')
        let data = dataArrBig[eleIndex].modules
        targetElement.forEach((tarItem, tarIndex) => {
            // tarItem就是twoBigGames里面的items
            let terData = data[tarIndex]

            let aHref = `
            https://store.epicgames.com/zh-CN${terData.link.src[0] === '/' ? terData.link.src : `/${terData.link.src}`}
            `

            tarItem.innerHTML = `
            <a class="imgBox hover" href="${aHref}">
                <img src="${terData.image.src}" alt="">
                <div class="addWish">
                    <div class="addIcon"></div>
                    <div class="addText">添至愿望清单</div>
                </div>
            </a>
            <div class="des">
                <h2><a href="${aHref}">${terData.title}</a></h2>
                <p>
                   ${terData.description}
                </p>
                <a href="${aHref}">免费游玩</a>
            </div>
            `
        })
    })

}

//时间格式转换
const formatDate = function formatDate(date) {
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
}


//比较发布时间与现在的时间
const timeComparison = function timeComparison(timeStr) {
    let releaseTimeDate = new Date(timeStr).getTime()
    let nowTimeData = new Date()
    return releaseTimeDate > nowTimeData.getTime() ? formatDate(nowTimeData) : false
}


// 轮播图模块
const bannerRendering = function bannerRendering(value) {
    let paginationBox = document.querySelector('.pagination ');
    paginationItems = document.querySelectorAll('.pagination div');
    let slide = document.querySelectorAll('.bannerWrap .slide')
    let bannerWrap = document.querySelector('.bannerWrap ');
    let count = null,
        timer = null,
        step = 0,
        width = slide[0].offsetWidth;
    let paginationHtml = ''
    let bannerWrapHtml = ''


    //向下一张轮播
    const rander = function rander() {
        step++
        if (step > count - 1) {
            step = 0
            bannerWrap.style.transitionDuration = '0s'
            bannerWrap.style.left = `-${step * width}px`
            bannerWrap.offsetWidth
            step = 1
            bannerWrap.style.transitionDuration = '500ms'
        }
        bannerWrap.style.left = `-${step * width}px`
        showCir()
    }



    paginationItems.forEach(function (_, index) {
        let { title, image, description, thumbnail, eyebrow, link } = value[index];
        paginationHtml += ` <div class="items ${index === 0 ? 'active' : ``}">
                                    <a href="javascript:;" index=${index} data-href='https://store.epicgames.com/zh-CN${link.src}'>
                                        <div class="imgLeft">
                                        <img src="${thumbnail.src}" alt="${thumbnail.altText}">
                                        </div>
                                        <div class="describe">${title}</div>
                                    </a>
                                </div>`
        bannerWrapHtml += `<div class="slide">
                                    <a href="https://store.epicgames.com/zh-CN${link.src}">
                                        <img src="${image.src}" alt="${image.src}">
                                    </a>
                                    <div class="information">
                                        <h2>${eyebrow}</h2>
                                        <p>${description}</p>
                                        <div class="buy">
                                            <span class="price">￥69.99起</span>
                                            <a class="buyNow">立即预购</a>
                                           ${index === 0 ? `` : `
                                           <a class="wish">
                                            <div class="icon"></div>
                                            添至愿望清单
                                            </a> 
                                           `}
                                        </div>
                                    </div>

                                </div>
            
            `

    })
    bannerWrapHtml += `<div class="slide">
                            <a href="${value[0].link.src}">
                                <img src="${value[0].image.src}" alt="${value[0].image.src}">
                            </a>
                            <div class="information">
                                <h2>${value[0].eyebrow}</h2>
                                <p>${value[0].description}</p>
                                <div class="buy">
                                    <span class="price">￥69.99起</span>
                                    <a class="buyNow">立即预购</a>
                                    <a class="wish">
                                    <div class="icon"></div>
                                    添至愿望清单
                                    </a>
                                </div>
                            </div>

                        </div>

        `
    count = paginationItems.length + 1
    paginationBox.innerHTML = paginationHtml
    paginationItems = document.querySelectorAll('.pagination>div');
    bannerWrap.innerHTML = bannerWrapHtml
    timer = setInterval(rander, 7000)

    //banner轮播图当前分页显示
    const showCir = function showCir() {
        let tep = step
        if (tep === count - 1) {
            tep = 0
        }
        paginationItems.forEach((item, index) => {
            if (tep === index) {
                item.classList.add('active')
            } else {
                item.classList.remove('active')
            }
        })
    }

    let itemsLink = paginationBox.querySelectorAll('a')
    itemsLink.forEach(function (item, index) {
        item.addEventListener('click', function () {
            if (paginationItems[index].classList.contains('active')) {
                item.setAttribute('href', item.getAttribute('data-href'))
                return
            }
            if (index === 0 && step === count - 2) {
                step++
                clearInterval(timer)
                bannerWrap.style.left = `-${step * width}px`
                showCir()
                timer = setInterval(rander, 7000)
                return
            }
            step = index
            clearInterval(timer)
            bannerWrap.style.left = `-${step * width}px`
            showCir()
            timer = setInterval(rander, 7000)
        })

    })

}


// 免费游戏模块
const freeGameRendering = function freeGameRendering(element, data) {

    let titleLink = document.querySelector('#freeGames .title a')
    titleLink.setAttribute('href', `${data.link}`)
    let dataArr = data.modules
    let eleHtml = ''
    dataArr.forEach((items, index) => {

        let { title, des, isNowFree, url, imgUrl } = items
        eleHtml += `
        <a class="games" href="${url}">
          <div class="imgBox hover">
            <img src="${imgUrl}" alt="">
            ${isNowFree ? `<div class="nowFree">现在免费</div>` : ` <div class="willFree">即将推出</div>`}
          </div>
          <div class="des">
            <h2>${title}</h2>
            <p>${des}</p>
          </div>
        </a>
        `
    })
    element.innerHTML = eleHtml
}



// 三游戏列表结构模块
const gameListBoxRendering = function gameListBoxRendering(elementAllArr, dataAllArr) {
    let requiredData = []//需要的所有数据中的两个  三游戏列表结构的游戏数据
    //筛选所需要的数据
    dataAllArr.forEach((item) => {
        if (item.id.includes('module-top-lists')) {
            requiredData.push(item)
        }
    })

    elementAllArr.forEach((singleStructure, eleIndex) => {
        //singleStructure 单个三列表结构 即为HTML中的gameListBox
        let threeList = singleStructure.querySelectorAll('.gameList')
        let singleStructureData = requiredData[eleIndex]//单个三列表结构的数据
        threeList.forEach((singleList, singleListIndex) => {
            //singleList 每一个列表  即为HTML中的gameList
            let singleListData = singleStructureData.modules[singleListIndex]//每一个列表singleList的数据 即为HTML中的gameList的数据

            //获取列表title数据
            let titleText = singleListData.title
            let title = singleList.querySelector('.title .titleText')
            title.innerHTML = titleText
            //获取列表LookMore按钮的link 
            let src = singleListData.link.src
            let lookMore = singleList.querySelector('.title .lookMore')
            let srcPrefix = 'https://store.epicgames.com/zh-CN'
            let lookMoreLink = `${srcPrefix}${src[0] === '/' ? src : `/${src}`}`;
            lookMore.setAttribute('href', lookMoreLink)

            //获取框架列表下面的游戏列表
            let games = singleList.querySelectorAll('.games')
            games.forEach((game, index) => {
                let gameData = singleListData.offers[index].offer
                let { title, keyImages, expiryDate, price, catalogNs } = gameData
                let oldPrice = price.totalPrice.fmtPrice.originalPrice
                let nowPrice = price.totalPrice.fmtPrice.intermediatePrice
                let srcObj = {}
                getThumbnail(keyImages, srcObj)
                catalogNs.mappings[0].pageSlug = `https://store.epicgames.com/zh-CN/p/${catalogNs.mappings[0].pageSlug}`
                let gameHtml = `
                <a class="game" href="${catalogNs.mappings[0].pageSlug}">
                    <div class="imgBox">
                        <img src="${srcObj.url}" alt="">
                        <div class="addWish">
                            <div class="addIcon"></div>
                            <div class="addText">添至愿望清单</div>
                        </div>
                    </div>
                    <div class="des">
                        <h2>${title}</h2>
                        <p>
                            ${timeComparison(expiryDate) ?
                        `<span class="time">于 ${timeComparison(expiryDate)} 可用</span>`
                        : `<span class="isLogged">现已登陆EPIC</span>`}
                        </p>
                        ${oldPrice === '0' ? `
                                            <div class="price free">
                                            免费 
                                            </div>
                                            ` : ` 
                                            <div class="price ">
                                                ${gameData.price.totalPrice.discount === 0 ? `` : `
                                                <div class="discountPercentage">-${compareStrings(nowPrice, oldPrice)}</div>
                                                <span class="oldPrice">${noZeros(oldPrice)}</span>
                                                `}
                                                <span class="nowPrice">${compareStrings(nowPrice, oldPrice) === '100%' ? '免费' : noZeros(nowPrice)}</span>
                                            </div>
                                                `}
                    </div>
                </a>
                `
                game.innerHTML = gameHtml
            })

        })
    })

}

//数组数据按照个数分组
const splitArrayBrowse = function splitArrayBrowse(arr, singleArraylength) {
    var newArr = [];
    var len = arr.length;
    var i = 0;

    while (i < len) {
        newArr.push(arr.slice(i, i + singleArraylength));
        i += singleArraylength;
    }

    return newArr;
}

//浏览页面数据渲染
const browseDataRendering = function browseDataRendering(rendingData) {
    let gameListBox = document.querySelector('.gameListBox')
    let gameListBoxHtml = ''
    rendingData.forEach(item => {

        let { keyImages, title, categories, effectiveDate, catalogNs, price, urlSlug } = item;
        let oldPrice = price.totalPrice.fmtPrice.originalPrice
        let nowPrice = price.totalPrice.fmtPrice.intermediatePrice
        let gameType = categories[0].path
        gameType = whatGameType(gameType)
        let imgSrc = {}
        getThumbnail(keyImages, imgSrc)
        let aHref = `${categories[0].path === 'addons' ? `https://store.epicgames.com/zh-CN/p/${urlSlug}`
            :
            `${catalogNs.mappings ? `https://store.epicgames.com/zh-CN/p/${catalogNs.mappings[0].pageSlug}`
                : `https://store.epicgames.com/zh-CN/bundles/${urlSlug}`
            }`}`

        gameListBoxHtml += `
                <a href="${aHref}" class="games">
                    <div class="imgBox hover">
                        <img src="${imgSrc.url}" alt="">
                        <div class="addWish">
                            <div class="addIcon"></div>
                            <div class="addText">添至愿望清单</div>
                        </div>
                    </div>
                    <div class="des">
                        <p class="gameWhatType">${gameType}</p>
                        <h2>${title}</h2>
                        <p class="isInEpic">
                        ${timeComparison(effectiveDate) ?
                `<span class="time">于 ${timeComparison(effectiveDate)} 可用</span>`
                : `<span class="isLogged">现已登陆EPIC</span>`}
                    </p>
                        ${oldPrice === '0' ? `
                        <div class="price free">
                        免费 
                        </div>
                        ` : ` 
                        <div class="price ">
                        ${price.totalPrice.discount === 0 ? `` : `
                        <div class="discountPercentage">-${compareStrings(nowPrice, oldPrice)}</div>
                        <span class="oldPrice">${noZeros(oldPrice)}</span>
                        `}
                        <span class="nowPrice">${noZeros(nowPrice)}</span>
                        </div>
                                                `}
                    </div>
                </a>
`
    })
    gameListBox.innerHTML = gameListBoxHtml



}

//浏览页面筛选器结构数组数据按照类型分组
const groupByGroupName = function groupByGroupName(arr) {
    return arr.reduce((acc, cur) => {
        const htmlId = cur.htmlId;
        if (!acc[htmlId]) {
            acc[htmlId] = [];
            acc[htmlId].title = cur.groupName
        }
        acc[htmlId].push(cur);
        return acc;
    }, {});
}

//page对象
const page = {
    rawData: null,
    data: null,
    box: document.querySelector('.page'),
    boxHtml: '',
    activeEle: 1,
    total: 0,
    rander() {
        if (this.activeEle <= 4) {
            if (this.total < 6) {
                let htmlStr = ''
                for (let i = 1; i <= this.total; i++) {

                    htmlStr += `
                    <a dataPage=${i} class="${this.activeEle === i ? 'active' : ''}">${i}</a>
                    `
                };
                this.boxHtml = htmlStr
            } else {
                this.boxHtml = `
                <a dataPage=1 class="${this.activeEle === 1 ? 'active' : ''}">1</a>
                <a dataPage=2 class="${this.activeEle === 2 ? 'active' : ''}">2</a>
                <a dataPage=3 class="${this.activeEle === 3 ? 'active' : ''}">3</a>
                <a dataPage=4 class="${this.activeEle === 4 ? 'active' : ''}">4</a>
                <a dataPage=5 class="${this.activeEle === 5 ? 'active' : ''}">5</a>
                <a class="ellipsis">...</a>
                <a dataPage="${this.data.length}">${this.data.length}</a>
                `
            }

        } else if (this.activeEle > 4 && this.activeEle <= this.data.length - 4) {
            this.boxHtml = `
            <a dataPage=1>1</a>
            <a class="ellipsis">...</a>
            <a dataPage=${this.activeEle - 1}>${this.activeEle - 1}</a>
            <a dataPage=${this.activeEle} class="active">${this.activeEle}</a>
            <a dataPage=${this.activeEle + 1}>${this.activeEle + 1}</a>
            <a class="ellipsis">...</a>
            <a>${this.data.length}</a>
            `
        } else {
            this.boxHtml = `
            <a dataPage=1 >1</a>
            <a class="ellipsis">...</a>
            <a dataPage=${this.data.length - 4}  class="${this.activeEle === this.data.length - 4 ? 'active' : ''}">${this.data.length - 4}</a>
            <a dataPage=${this.data.length - 3}  class="${this.activeEle === this.data.length - 3 ? 'active' : ''}">${this.data.length - 3}</a>
            <a dataPage=${this.data.length - 2}  class="${this.activeEle === this.data.length - 2 ? 'active' : ''}">${this.data.length - 2}</a>
            <a dataPage=${this.data.length - 1}  class="${this.activeEle === this.data.length - 1 ? 'active' : ''}">${this.data.length - 1}</a>
            <a dataPage=${this.data.length}  class="${this.activeEle === this.data.length ? 'active' : ''}">${this.data.length}</a>
            `
        }
        this.boxHtml = `
        <a tagTpye='btn' class="pagePrev ${this.activeEle <= 1 ? 'hide'
                : ''}">&lt;</a>${this.boxHtml}`

        this.boxHtml += `<a tagTpye='btn'  class="pageNext ${this.activeEle == this.data.length ? 'hide'
            : ''}">&gt;</a>`

        this.box.innerHTML = this.boxHtml

    },
    next() {
        this.activeEle = Number(this.activeEle)
        this.activeEle += 1
        setUrlRefresh()
    },
    prev() {
        this.activeEle = Number(this.activeEle)
        this.activeEle -= 1
        setUrlRefresh()
    },
    click() {
        let e = event.target
        if (e.classList.contains('pagePrev')) {
            page.prev()
            return
        }
        if (e.classList.contains('pageNext')) {
            page.next()
            return
        }
        if (!e.getAttribute('tagTpye') && !(e.innerHTML === '...')) {
            page.activeEle = e.getAttribute('dataPage')
            page.activeEle = Number(page.activeEle)
            setUrlRefresh()
        }


    }
}

//specificConditions 标签将筛选条件设置到属性上
const specificConditionsFilterSet = function specificConditionsFilterSet() {

    return this.parentNode.firstElementChild.getAttribute('datatype')

}

//筛选器对象
const filterData = {
    titleTextHtml: `<div class="text">筛选器（${this.filterCriteria}）</div>`,
    filterHtmlData: {},//筛选器的结构总数据
    filterCriteria: {//筛选的条件
        price: [],//价格
        genre: [],//游戏类型
        feature: [],//特色
        platform: [],//平台
        event: [],//活动
        type: ["games"],//类别
        page: {}
    },

    filterCriteriaTotal() {
        let total = 0
        for (const key in this.filterCriteria) {
            if (key === 'page') { continue }
            total += this.filterCriteria[key].length
        }
        return total
    },
    filterBtnPlay: {
        platform: false,
        feature: false,
        genre: false,
        event: false,
        type: false,
    },
    //渲染
    filterHtmlRendering() {
        filter.innerHTML = `
        <div class="title">
            <div class="text">筛选器（${this.filterCriteriaTotal()}）</div>
            <button class="resize">重置</button>
        </div>
        <div class="gameSearch iconfont  icon-sousuo1">
            <input type="text" class="searchText" placeholder="关键词">
        </div>
        `
        for (const key in this.filterHtmlData) {
            filter.innerHTML += `
            <div class="items" id="${key}">
                <button dataType="${key}"  class="iconfont icon-youjiantou ${filterData.filterBtnPlay[key] ? 'clicked' : ''}">${this.filterHtmlData[key].title}</button>
            </div>
            `



            let filterKind = filter.querySelector(`#${key}`)

            this.filterHtmlData[key].forEach((item) => {
                filterKind.innerHTML += `
                <div class="specificConditions ${filterData.filterCriteria[key].includes(item.id) ? 'active' : ''}" style="${filterData.filterBtnPlay[key] ? 'display:block;' : null}" filter="${key}=${item.id}">${item.name}</div>
                `
            })
        }

    },
    //筛选器点击事件委托
    filterClick(event) {
        let et = event.target
        let eClassList = et.classList
        // 点击展开每个类
        if (eClassList.contains('iconfont')) {
            let allSpecificConditions = this.querySelectorAll(`#${et.getAttribute('dataType')}  .specificConditions`)
            // let
            if (eClassList.contains('clicked')) {
                allSpecificConditions.forEach(item => {
                    item.style.display = 'none'
                })
                filterData.filterBtnPlay[et.getAttribute('datatype')] = false
            } else {
                allSpecificConditions.forEach(item => {
                    item.style.display = 'block'
                })
                filterData.filterBtnPlay[et.getAttribute('datatype')] = true
            }
            eClassList.toggle('clicked')
            return
        }

        //点击重置按钮
        if (eClassList.contains('resize')) {

            filterData.filterBtnPlay = {
                platform: false,
                feature: false,
                genre: false,
                event: false,
                type: false,
            };
            filterData.filterCriteria= {//筛选的条件
                price: [],//价格
                genre: [],//游戏类型
                feature: [],//特色
                platform: [],//平台
                event: [],//活动
                type: ["games"],//类别
                page: {}
            },
            page.activeEle = 1
            page.data = splitArrayBrowse(arrFilterData(page.rawData.map(item => {
                item.categories = item.categories.slice(0, 1)
                return item
            }), filterData.filterCriteria), 40)
            filterData.filterHtmlRendering()
            setUrlRefresh()
        }


        //  点击每个具体筛选的分类
        if (eClassList.contains('specificConditions')) {
            let attri = et.getAttribute('filter').split('=')
            let filterCriteriaKey = attri[0]
            let filterCriteriaValue = attri[1]
            toggleArrayItem(filterData.filterCriteria[filterCriteriaKey], filterCriteriaValue)
            page.activeEle = 1
            setUrlRefresh()
        }

    }
}

//url筛选数据提取
const urlDataGet = function urlDataGet() {
    let str = window.location.href.split('?')[1]
    if (!str) {
        // 第一次点击进browse页面时默认显示数据
        page.activeEle = 1
        // filterData.

    } else {
        let data = str.split('&');

        data.forEach(item => {
            let key = item.split('=')[0]
            let value = item.split('=')[1]
            if (key === 'page') {
                page.activeEle = filterData.filterCriteria[key] = Number(value)
                return
            }
            if (key.includes('Clicked')) {
                filterData.filterBtnPlay[key.slice(0, -7)] = true
                return
            }
            filterData.filterCriteria[key].push(value)
        })

    }


}


const arrFilterData = function arrFilterData(arr, obj) {
    return arr.filter(arrObj => {

        const { tags, categories } = arrObj;
        const { genre, feature, platform, event, type } = obj;

        let shouldInclude = true;

        // 根据 genre、feature、platform、event 进行筛选
        [genre, feature, platform, event].forEach(prop => {
            if (Array.isArray(prop) && prop.length > 0) {
                shouldInclude = shouldInclude && prop.every(p => tags.some(tag => tag.id === p));
            }
        });

        // 根据 type 进行筛选
        if (Array.isArray(type) && type.length > 0) {
            const [firstCategorie] = categories;
            const pathArr = firstCategorie?.path?.split() || [];

            const matchedType = type.some(t => {
                if (typeof t === 'string' && t.includes('And')) {
                    const tArr = t.split('And');
                    return tArr.some(tVal => pathArr.includes(tVal.trim()));
                } else {
                    return pathArr.includes(t);
                }
            });
            shouldInclude = shouldInclude && matchedType;
        }

        return shouldInclude;
    });
};



const webRendering = function webRendering() {

    if (page.lookPage === 'browse') {
        if (filterData.filterCriteriaTotal() <= 1) {
            browsePopularType.parentElement.parentElement.style.display = "block"

            browsePopularTypeRendering()
        } else {
            browsePopularType.parentElement.parentElement.style.display = "none"
        }
        let filtereDdata = arrFilterData(page.rawData.map(item => {
            item.categories = item.categories.slice(0, 1)
            return item
        }), filterData.filterCriteria)
        if (filtereDdata == '') {
            page.data = []
            page.activeEle
            page.total = page.activeEle = page.data.length
            page.rander()
            filterData.filterHtmlRendering()
            console.log(21);
            let gameListBox = document.querySelector('.gameListBox')
            gameListBox.innerHTML = `
            <h1 class="noResTitle"> 未找到结果</h1>
            <p class="noResText">很遗憾，我没能找到与您搜索内容匹配的结果。</p>
            `


        } else {
            page.data = splitArrayBrowse(filtereDdata, 40)
            page.total = page.data.length
            browseDataRendering(page.data[page.activeEle - 1])
            page.rander()
            filterData.filterHtmlRendering()
        }

    } else {

        newRendering()
        page.rander()

    }


}




// 设置URL并且刷新页面

const setUrlRefresh = function setUrlRefresh() {

    let nowUrl = ''
    nowUrl = `?page=${page.activeEle}`

    for (const key in filterData.filterBtnPlay) {
        if (filterData.filterBtnPlay[key]) {
            nowUrl += `&${key}Clicked=true`
        }
    }
    for (const key in filterData.filterCriteria) {

        if (filterData.filterCriteria[key].length > 0) {
            filterData.filterCriteria[key].forEach(item => {
                nowUrl += `&${key}=${item}`
            })
        }
        history.pushState({}, '', nowUrl)
    }
    webRendering()

}


//计算新闻是多少天以前的
function getTimeDiffString(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    return `${diff}天前`;

}



const newRendering = function newRendering() {
    newsBigBox.innerHTML = ''
    for (let i = 0; i < 2; i++) {
        newsBigBox.innerHTML += `
        <div class="news">
          <div class="imgBox ">
            <a href="https://store.epicgames.com/zh-CN/news/${page.rawData[i].slug}" class="hover">
              <img src="${page.rawData[i]._images_[0]}" alt="">
            </a>
          </div>
          <div class="des">
              <p class="time">${getTimeDiffString(page.rawData[i].lastModified)}</p>
              <a class="title" href="https://store.epicgames.com/zh-CN/news/${page.rawData[i].slug}">${page.rawData[i].title}</a>
              <p class="describe">${page.rawData[i].short ? page.rawData[i].short : ''}</p>
              <a href="https://store.epicgames.com/zh-CN/news/${page.rawData[i].slug}" class="lookMore">阅读更多</a>
          </div>
        </div>
        `
    };


    if (page.activeEle === 1) {
        newListBox.innerHTML = `
        <div class="items">
        <div class="imgBox ">
        <a href="https://store.epicgames.com/zh-CN/news/${page.rawData[2].slug}" class="hover">
        <img src="${page.rawData[2]._images_[0]}" alt="">
      </a>
        </div>
        <div class="des">
            <p class="time iconfont icon-xingxing">${getTimeDiffString(page.rawData[2].lastModified)}</p>
            <a href="https://store.epicgames.com/zh-CN/news/${page.rawData[2].slug}" class="title">${page.rawData[2].title}</a>
            <p class="describe">${page.rawData[2].short ? page.rawData[2].short : ''}</p>
            <a href="https://store.epicgames.com/zh-CN/news/${page.rawData[2].slug}" class="lookMore">阅读更多</a>
        </div>
    </div>
        `
    } else {
        newListBox.innerHTML = ''
    }
    page.data[page.activeEle - 1].forEach((item, index) => {
        console.log(item.title);
        newListBox.innerHTML += `
        <div class="items">
            <div class="imgBox ">
            <a href="https://store.epicgames.com/zh-CN/news/${item.slug}" class="hover">
            <img src="${item._images_[0]}" alt="">
          </a>
            </div>
            <div class="des">
                <p class="time">${getTimeDiffString(item.lastModified)}</p>
                <a href="https://store.epicgames.com/zh-CN/news/${item.slug}" class="title">${item.title}</a>
                <p class="describe">${item.short ? item.short : ''}</p>
                <a href="https://store.epicgames.com/zh-CN/news/${item.slug}" class="lookMore">阅读更多</a>
            </div>
        </div>
      
        `
    })


}


//受欢迎的类型渲染
const browsePopularTypeRendering = function browsePopularTypeRendering() {
    let htmlStr = ''
    page.browsePopularTypeData.forEach((item, index) => {
        htmlStr += `
        <div class="items">
        `
        // </div>
        // `
        item.forEach(items => {
            htmlStr += `
            <a href="https://store.epicgames.com/zh-CN/c/${items.slug}" class="games hover">
                <div class="imgBox">
                    <div class="imgBoxItems">
                        <img src="${items.images[0]}" alt="">
                    </div>
                    <div class="imgBoxItems">
                        <img src="${items.images[1]}" alt="">
                    </div>
                    <div class="imgBoxItems">
                        <img src="${items.images[2]}" alt="">
                    </div>

                </div>
                <div class="gameType">
                    ${items.title}
                </div>
            </a>
            `
        })
        htmlStr += `
            </div>
        `
    })
    browsePopularType.innerHTML = htmlStr
    let addStr = browsePopularType.querySelectorAll(".items")[0].innerHTML
    htmlStr += `
    <div class="items">
    ${addStr}
    </div>`
    browsePopularType.innerHTML = htmlStr
    switchElementPopularType(browsePopularType, browsePopularTypePrev, browsePopularTypeNext)
}



const switchElementPopularType = function switchElementPopularType(element, prevButton, nextButton) {
    const children = element.children;
    const childWidth = children[0].offsetWidth;
    let currentIndex = 0;

    // 点击向下切换的按钮
    nextButton.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex > children.length - 1) {
            currentIndex = 0;
            element.style.transitionDuration = '0s'
            element.style.left = `-${currentIndex * childWidth}px`;
            element.offsetWidth
            currentIndex = 1;
            element.style.transitionDuration = "400ms"
        }
        element.style.left = `-${currentIndex * childWidth}px`;
    });

    // 点击向上切换的按钮
    prevButton.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = children.length - 1;
            element.style.transitionDuration = '0s'
            element.style.left = `-${currentIndex * childWidth}px`;
            element.offsetWidth
            currentIndex = children.length - 2;
            element.style.transitionDuration = "400ms"
        }
        element.style.left = `-${currentIndex * childWidth}px`;
    });
}
