// 2023/6/18
// Page2RMode.js
// Author: 幼稚园园长
// SoftWare: WebStorm
window.onload = function () {


    let article = document.getElementsByClassName("article")[0]
    let l_body = document.getElementsByClassName("l_body")[0]
    let card_shadow = document.getElementsByClassName("card-shadow")[0]


    function recovery() {
        // let modeBtn = document.getElementById("mode-btn")
        // article.style.fontSize = "17px"
        // article.style.fontFamily = "'Varela Round',\"Microsoft YaHei\",\"Source Sans Pro\",\"Helvetica Neue\",Menlo,Monaco,monospace,\"Lucida Console\",sans-serif,Helvetica,\"Hiragino Sans GB\",\"Hiragino Sans GB W3\",Source Han Sans CN Regular,WenQuanYi Micro Hei,Arial,sans-serif"
        // l_body.style.background = "unset"
        // card_shadow.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,.1)"
        // modeBtn.className = " s-top show fa fa-book"
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
    function remove_particle(){
        let find_canvas = document.getElementsByTagName("canvas")
        for (let cn of find_canvas){
            cn.parentElement.removeChild(cn)
        }

        let body = document.getElementsByTagName("body")[0]
        body.style.backgroundColor="#fdfdfd"
    }

    function insertAfter(newElement, targetElement) {
        "use strict";
        let parent = targetElement.parentNode;
        if (parent.lastChild === targetElement) {
            parent.appendChild(newElement);
        } else {
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    if (window.location.pathname.startsWith('/archives/')) {
        creatBtn()
        let RM = document.getElementById("RM")
        if (RM) {
            //写入本地储存 ，mode = 1
            let localMode =   window.localStorage.getItem("mode")
            if (localMode === null){
                window.localStorage.setItem("mode", "1")
                changeCss()
            }

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
        modeBtn.style.position="fixed"
        modeBtn.style.right="32px"
        modeBtn.style.bottom="96px"
        modeBtn.style.display="flex"
        modeBtn.style.justifyContent="center"
        modeBtn.style.alignItems="center"
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