// 2022/9/2
// add_snake.js
// Author: 幼稚园园长
// SoftWare: WebStorm

window.onload = function () {
    if (window.location.pathname === '/') {
        let div = document.getElementsByClassName("cover-wrapper")[0]
        let newDiv = document.createElement("div")
        newDiv.className = "snake"
        newDiv.style.marginTop = "110px"
        newDiv.innerHTML = "<a href='https://github.com/yzyyz1387/' target='_blank'><img src=\"https://cdn.staticaly.com/gh/yzyyz1387/yzyyz1387/main/assets/github-contribution-grid-snake.svg\" alt=\"\" style=\"display: block; margin: 0 auto;background: #fff;\"></a>"
        insertAfter(newDiv, div)

        function insertAfter(newElement, targetElement) {
            "use strict";
            let parent = targetElement.parentNode;
            if (parent.lastChild === targetElement) {
                parent.appendChild(newElement);
            } else {
                parent.insertBefore(newElement, targetElement.nextSibling);
            }
        }

        let width = window.screen.width
        if (width < 580) {
            let postDiv = document.getElementsByClassName("l_body")[0]
            postDiv.style.margin = "0 auto"
        }
    }
}