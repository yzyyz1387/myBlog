// 2022/9/2
// tools.js
// Author: 幼稚园园长
// SoftWare: WebStorm

window.onload = function () {
    function insertAfter(newElement, targetElement) {
        "use strict";
        let parent = targetElement.parentNode;
        if (parent.lastChild === targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }


    if (window.location.pathname === '/') {
        // 贪吃蛇
        let div = document.getElementsByClassName("cover-wrapper")[0]
        let newDiv = document.createElement("div")
        newDiv.className = "snake"
        newDiv.style.marginTop = "110px"
        newDiv.innerHTML = "<a href='https://github.com/yzyyz1387/' target='_blank'><img src=\"https://cdn.staticaly.com/gh/yzyyz1387/yzyyz1387/main/assets/github-contribution-grid-snake.svg\" alt=\"\" style=\"display: block; margin: 0 auto;background: #fff;\"></a>"
        insertAfter(newDiv, div)


        let width = window.screen.width
        if (width < 580) {
            let postDiv = document.getElementsByClassName("l_body")[0]
            postDiv.style.margin = "0 auto"
        }


        // 随心说
        let noteDiv = document.getElementsByClassName("post-list")[0];
        let newArticle = document.createElement("article");
        let newP = document.createElement("p");
        let newTimeP = document.createElement("p");
        let newTitleP = document.createElement("p");

        newArticle.className = "post white-box card-shadow  reveal";
        newArticle.style.textAlign = "center";
        newArticle.style.padding = "20px";
        newP.style.fontWeight = "bold";

        newTimeP.style.textAlign = "right";
        newTimeP.style.fontSize = "10px";
        newTimeP.style.color = "#cecece";

        newTitleP.style.fontSize = "10px";
        newTitleP.style.color = "#cecece";
        newTitleP.style.textAlign = "left";

        let newWapper = document.createElement("div");
        newWapper.className = "post-wapper";
        newWapper.append(newArticle);

        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://noti.yzyyz.top/last");
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let note_response = JSON.parse(xhr.responseText);
                let note_time = note_response.create_time.slice(0, 16).split("-")
                let hour = note_time[2].split("T")
                let show = note_time[0] + "年" + note_time[1] + "月" + hour[0] + "  " + hour[1]
                newP.innerHTML = note_response.msg;
                newTimeP.innerHTML = show;
                newTitleP.innerHTML = "随心说"
                newArticle.append(newTitleP);
                newArticle.append(newP)
                newArticle.append(newTimeP)
                noteDiv.insertBefore(newWapper, noteDiv.firstChild);
            }
        }
    }


    // 阅读模式
    let article = document.getElementsByClassName("article")[0]
    let l_body = document.getElementsByClassName("l_body")[0]
    let card_shadow = document.getElementsByClassName("card-shadow")[0]

    function recovery() {
        location.reload();
    }

    function changeCss() {
        remove_particle()
        let modeBtn = document.getElementById("mode-btn")
        modeBtn.className = " s-top show fa fa-star"
        article.style.fontSize = "25px"
        article.style.textAlign = "justify"
        article.style.fontFamily = "SimSun"
        l_body.style.background = "#fff"
        card_shadow.style.boxShadow = "unset"
    }

    function remove_particle() {
        let find_canvas = document.getElementsByTagName("canvas")
        for (let cn of find_canvas) {
            cn.parentElement.removeChild(cn)
        }
        let body = document.getElementsByTagName("body")[0]
        body.style.backgroundColor = "#fdfdfd"
    }


    if (window.location.pathname.startsWith('/archives/')) {
        creatBtn()
        let RM = document.getElementById("RM")
        let localMode = window.localStorage.getItem("mode")
        if (RM) {
            //写入本地储存 ，mode = 1
            if (localMode === null) {
                window.localStorage.setItem("mode", "1")
                changeCss()
            } else if (localMode === "1") {
                changeCss()

            }
        } else {
            if (localMode === "1") {
                changeCss()
            }
        }

        //    在页面添加一个按钮，
        function creatBtn() {
            let div = document.getElementsByClassName("s-top")[0]
            let modeBtn = document.createElement("a")
            modeBtn.id = "mode-btn"
            modeBtn.className = "s-top show fa fa-book"
            modeBtn.style.marginTop = "110px"
            modeBtn.title = "切换阅读模式"
            insertAfter(modeBtn, div)

            modeBtn.style.width = "48px"
            modeBtn.style.height = "48px"
            modeBtn.style.position = "fixed"
            modeBtn.style.right = "32px"
            modeBtn.style.bottom = "96px"
            modeBtn.style.display = "flex"
            modeBtn.style.justifyContent = "center"
            modeBtn.style.alignItems = "center"
            modeBtn.translation = "all 0.3s ease"
            modeBtn.onclick = function () {
                let re_mode = window.localStorage.getItem("mode")
                if (re_mode === "1") {
                    recovery()
                    window.localStorage.setItem("mode", "0")
                } else {
                    changeCss()
                    window.localStorage.setItem("mode", "1")
                }
            }
        }

    }
}