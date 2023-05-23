const gnb = {
    title: "Global List",
    items : [
        {
            name : "Home",
            src : "../pages/index.html"
        },
        {
            name : "Popup",
            src : "../pages/popup.html"
        },
        {
            name : "Input",
            src : "../pages/input.html"
        },
        {
            name : "Notification",
            src : "../pages/notification.html"
        }
    ],
    openButtonIcon : '<i class="icon icon-burger-white"><span class="blind">gnb open</span></i>',
    closeButtonIcon : '<i class="icon icon-cross-circle-blue"><span class="blind">gnb close</span></i>',
    init :function() {
        this.construction(); // gnb 구성
    },
    construction : function () {
        const bodyWrap = document.body;
        const headerWrap = document.getElementById("header").querySelector(".inner");
        const gnbWrap = document.createElement("div");
        const openButton = document.createElement("button");
        const closeButton = document.createElement("button");
        const titleWrap = document.createElement("div");
        const h2 = document.createElement("h2");
        const nav = document.createElement("nav");
        const ul = document.createElement("ul");

        gnbWrap.classList.add("gnb-wrap");
        titleWrap.classList.add("gnb-title");
        openButton.classList.add("gnb-open-btn")
        closeButton.classList.add("gnb-close-btn");
        h2.classList.add("title");
        nav.classList.add("gnb");
        ul.classList.add("gnb-list");

        openButton.setAttribute("type", "button")
        openButton.setAttribute("data-gnb-btn","gnb");
        closeButton.setAttribute("type", "button");
        closeButton.setAttribute("data-gnb-btn","gnb");
        gnbWrap.setAttribute("data-gnb","gnb");

        h2.innerText = this.title;
        openButton.innerHTML = this.openButtonIcon;
        closeButton.innerHTML = this.closeButtonIcon;

        this.items.forEach(function(item){
            const li = document.createElement("li");
            li.innerHTML = '<a href="'+ item.src + '" target="_self">' + item.name + '</a>'
            ul.appendChild(li);
        });

        headerWrap.prepend(openButton);
        titleWrap.appendChild(h2);
        titleWrap.appendChild(closeButton);
        nav.appendChild(titleWrap);
        nav.appendChild(ul);
        gnbWrap.appendChild(nav);
        bodyWrap.appendChild(gnbWrap);

        this.clickEventsListener();
    },
    pageActivate: function( index ){
        console.log( index );
        if(index !== undefined){
            const lists = document.querySelectorAll(".gnb-list li");
            lists.forEach(function(value, key){
                if(index === key){
                    value.querySelector("a").classList.add("is-active");
                }

            })
        }
    },
    clickEventsListener : function (){
        const _this = this;
        const gnb = document.querySelector("[data-gnb='gnb']");
        const buttons = document.querySelectorAll("[data-gnb-btn='gnb']");

        buttons.forEach(button => button.addEventListener("click", () => _this.clickAction(gnb)));

        // 딤드 클릭
        gnb.addEventListener("click", function (){
            this.classList.remove("is-show");
            _this.setAni(this, false);
        });

        // 키보드 클릭
        document.addEventListener("keyup", e => {
            if (e.keyCode === 192) {
                this.clickAction(gnb);
            }
        });
    },
    clickAction : function ( elem ){
        if(!elem.classList.contains("is-show")){
            elem.classList.add("is-show");
            this.setAni(elem , true);
        } else {
            elem.classList.remove("is-show");
            this.setAni(elem, false);

        }
    },
    setAni : function ( elem , status ) {
        if(status){
            elem.classList.add("is-fadein");
            elem.classList.remove("is-fadeout");
        } else {
            elem.classList.remove("is-fadein")
            elem.classList.add("is-fadeout")
        }
    }
}
console.log("public gnb : START")
gnb.init();
console.log("public gnb : END")