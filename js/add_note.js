window.onload = function () {
    if (window.location.pathname === '/') {
        
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
                let note_time = note_response.create_time.slice(0,16).split("-")
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
};