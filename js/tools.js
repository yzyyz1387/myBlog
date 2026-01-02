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
        newDiv.innerHTML = "<a href='https://github.com/yzyyz1387/' target='_blank'><img src=\"https://gcore.jsdelivr.net/gh/yzyyz1387/yzyyz1387/dist/ocean.gif\" alt=\"\" style=\"display: block; margin: 0 auto;background: #fff;\"></a>"
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

    // 时效判断
    if (window.location.pathname.startsWith('/archives/')) {
        const dateElements = document.querySelectorAll('.new-meta-item.date');
        let updateDate = null;

        dateElements.forEach(element => {
            const dateTime = element.getAttribute('datetime');
            if (dateTime) {
                updateDate = new Date(dateTime);
            }
        });

        if (updateDate) {
            const currentDate = new Date();

            // Calculate the difference in milliseconds
            const diff = currentDate - updateDate;

            // Convert the difference to months
            const diffInMonths = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44)); // Use 30.44 to account for average month length

            if (diffInMonths > 1) {
                let message = '此文最后更新距今已';
                if (diffInMonths >= 12) {
                    const years = Math.floor(diffInMonths / 12);
                    const remainingMonths = diffInMonths % 12;
                    if (remainingMonths === 0) {
                        message += `${years}年`;
                    } else {
                        message += `${years}年${remainingMonths}个月`;
                    }
                } else {
                    message += `${diffInMonths}个月`;
                }
                message += '，请注意内容时效';

                const blockquote = document.createElement('blockquote');
                blockquote.setAttribute('style', 'background: #f4433678;color: #fff;border-left: 4px solid #f44336;');
                const p = document.createElement('p');
                p.textContent = message;
                blockquote.appendChild(p);

                const articleBody = document.querySelector('.article-entry[itemprop="articleBody"]');
                if (articleBody) {
                    articleBody.insertBefore(blockquote, articleBody.firstChild);
                }
            }
        } else {
            console.error('Element with datetime attribute not found.');
        }
    }

    // 阅读位置记忆功能
    if (window.location.pathname.startsWith('/archives/')) {
        const STORAGE_KEY = 'reading_positions';
        const SCROLL_THRESHOLD = 100;
        
        function getArticleId() {
            return window.location.pathname.replace(/\//g, '_');
        }

        function createBubbleTip(position) {
            const oldBubble = document.querySelector('.reading-bubble');
            if (oldBubble) oldBubble.remove();

            const bubble = document.createElement('div');
            bubble.className = 'reading-bubble';
            bubble.innerHTML = `
                <div class="bubble-content">
                    <div>上次阅读到这里</div>
                    <button class="bubble-close">×</button>
                </div>
            `;
            
            bubble.style.cssText = `
                position: fixed;
                right: 20px;
                background: rgba(33, 150, 243, 0.95);
                color: white;
                padding: 10px 15px;
                border-radius: 6px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                z-index: 999;
                opacity: 0;
                transition: all 0.3s ease;
                font-size: 14px;
                transform: translateX(100%);
            `;

            // 计算气泡位置
            const viewportHeight = window.innerHeight;
            let topPosition = Math.max(10, Math.min(position - 30, viewportHeight - 100));
            bubble.style.top = `${topPosition}px`;
            
            const content = bubble.querySelector('.bubble-content');
            content.style.cssText = `
                display: flex;
                align-items: center;
                gap: 10px;
            `;
            
            const closeBtn = bubble.querySelector('.bubble-close');
            closeBtn.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0 5px;
            `;
            
            document.body.appendChild(bubble);
            
            closeBtn.addEventListener('click', () => {
                bubble.style.opacity = '0';
                bubble.style.transform = 'translateX(100%)';
                setTimeout(() => bubble.remove(), 300);
            });
            
            requestAnimationFrame(() => {
                bubble.style.opacity = '1';
                bubble.style.transform = 'translateX(0)';
            });
            
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.style.opacity = '0';
                    bubble.style.transform = 'translateX(100%)';
                    setTimeout(() => bubble.remove(), 300);
                }
            }, 5000);
        }

        function saveReadingPosition() {
            const articleId = getArticleId();
            const scrollPos = window.scrollY;
            
            if (scrollPos > SCROLL_THRESHOLD) {
                let positions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
                positions[articleId] = scrollPos;
                localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
            }
        }

        function restoreReadingPosition() {
            const articleId = getArticleId();
            const positions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            const savedPosition = positions[articleId];
            
            if (savedPosition && savedPosition > SCROLL_THRESHOLD) {
                window.scrollTo({
                    top: savedPosition,
                    behavior: 'smooth'
                });
                
                setTimeout(() => createBubbleTip(savedPosition), 1000);
            }
        }

        function throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }

        window.addEventListener('scroll', throttle(saveReadingPosition, 1000));

        if (document.readyState === 'complete') {
            restoreReadingPosition();
        } else {
            window.addEventListener('load', restoreReadingPosition);
        }
    }
}