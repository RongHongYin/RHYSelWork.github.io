let springSale = document.querySelector('#springSale')
let mostPopular = document.querySelector('#mostPopular')
let gamesWithAchievements = document.querySelector('#gamesWithAchievements')
let recentlyUpdated = document.querySelector('#recentlyUpdated')
let alreadyLaunched = document.querySelector('#alreadyLaunched')
let twoBigGames = document.querySelectorAll('.twoBigGames')
let freeGames = document.querySelector('#freeGames .gameBox')
let gameListBoxArr = document.querySelectorAll('.gameListBox')


axios.get("index.json", {})
    .then(response => {
        return response.data.Storefront.storefrontModules
    }).then(data => {


        // 轮播图
        axios.get()
            .then(_ => {
                bannerRendering(data[0].slides)
            })
            .catch(err => {
                console.log(err + '轮播图渲染出错');
            });


        //春季特卖
        axios.get()
            .then(_ => {
                likeSpringSaleRendering(springSale, data[1])
            })
            .catch(err => {
                console.log(err + '春季特卖渲染出错');
            });

        //最受欢迎
        axios.get()
            .then(_ => {
                likeSpringSaleRendering(mostPopular, data[5])
            })
            .catch(err => {
                console.log(err + '最受欢迎渲染出错');
            });

        //包含成就的游戏
        axios.get()
            .then(_ => {
                likeSpringSaleRendering(gamesWithAchievements, data[8])
            })
            .catch(err => {
                console.log(err + '包含成就的游戏渲染出错');
            });

        //最近更新
        axios.get()
            .then(_ => {
                likeSpringSaleRendering(recentlyUpdated, data[9])
            })
            .catch(err => {
                console.log(err + '最近更新渲染出错');
            });

        //现已于Epic游戏商城推出
        axios.get()
            .then(_ => {
                likeSpringSaleRendering(alreadyLaunched, data[11])
            })
            .catch(err => {
                console.log(err + '现已于Epic游戏商城推出渲染出错');
            });

        //所有两大图结构
        axios.get()
            .then(_ => {
                twoBigImgRendering(twoBigGames, data)
            })
            .catch(err => {
                console.log(err + '所有两大图结构渲染出错');
            });

        //免费游戏结构
        axios.get()
            .then(_ => {
                freeGameRendering(freeGames, data[3])
            })
            .catch(err => {
                console.log(err + '免费游戏结构渲染出错');
            });

        //三列表结构
        axios.get()
            .then(_ => {
                gameListBoxRendering(gameListBoxArr, data)
            })
            .catch(err => {
                console.log(err + '三列表结构渲染出错');
            });


    })


