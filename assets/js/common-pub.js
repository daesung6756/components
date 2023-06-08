'use strict'

const UI = {
    init : function (){
        console.log("common UI layout : START");
        this.layout.init();
        console.log("common UI layout : START");

        console.log("common UI tab : START");
        this.tab.init()
        console.log("common UI tab : END")

        console.log("common UI tableCanvas : START");
        this.tableCanvasCol.init();
        console.log("common UI tableCanvas : END");
    },
    hidden: {

    },
    layout : {
        item : document.querySelector("[data-layout]"),
        wrap : document.getElementById("wrap"),
        header : document.getElementById("header"),
        main : document.getElementById("main"),
        footer : document.getElementById("footer"),
        init : function (){
            if(this.item){
                this.segment();
            }
        },
        segment : function(){
            const _this = this;
            switch (this.wrap.dataset.layout) {
                case "headerFixed" :
                    this.wrap.classList.add("layout-header-fixed");
                    window.addEventListener("scroll", function(){
                        const screenScrollY = window.scrollY;
                        _this.headerFixed(screenScrollY);
                    });
                    break;
                case "mainFixed" :
                    console.log("this page layout : mainFixed");
                    this.wrap.classList.add("layout-main-fixed");
                    this.mainFixed();
                    var resizeTimer;
                    window.addEventListener("resize", function(){
                        clearTimeout(resizeTimer);
                        resizeTimer = setTimeout(function(){
                            _this.mainFixed()
                            resizeTimer = null;
                        },100)

                    });
                    break;
                default :
                    break;
            }
        },
        headerFixed : function( scrollY ){
            const header = document.getElementById("header");
            const main = document.getElementById("main");
            const headerHeight = header.clientHeight - 10;
            if(scrollY > 0){
                header.classList.add("is-fixed")
                main.style.paddingTop = headerHeight + "px";
            } else {
                header.classList.remove("is-fixed");
                main.style.paddingTop = "0";
            }
        },
        mainFixed : function (){
            const _this = this;
            const header = Math.floor(this.header.clientHeight);
            const footer = Math.floor(this.footer.clientHeight);
            const screenHeight = Math.floor(window.innerHeight);
            const sum = screenHeight - (header + footer);

            console.log("header : ", header )
            console.log("footer : ", footer )
            console.log("스크린 : ", screenHeight )
            console.log(sum);
            this.main.style.maxHeight = sum + "px";
        }
    },
    tab : {
        items: document.querySelectorAll("[data-tab]"),
        itemsGroup: [],
            init : function() {
                if( this.items.length > 0) {
                    this.dataCollection()
                }
            },
            dataCollection : function(){
                const _this = this;
                this.items.forEach(function(value){
                    _this.itemsGroup.push(value.dataset.tab);
                })
                this.arrayControl();
            },
            arrayControl : function (){
                const _this = this;
                this.itemsGroup.forEach(function(value){
                    const btns = document.querySelectorAll("[data-tab-btn='" + value + "']");
                    const contents = document.querySelectorAll("[data-tab-content='" + value + "']")

                    let isActivateClass = false;
                    let activateBtn = null;
                    let activateKey = null;

                    btns.forEach(function(btn, key){

                        if(!isActivateClass){
                            if(btn.parentElement.classList.contains("is-active")){
                                activateBtn = btn.parentElement;
                                activateKey = key;
                                isActivateClass = true;

                                if(!contents[key].classList.contains("is-show")){
                                    contents[key].classList.add("is-show");
                                }
                            }
                        }

                        btn.addEventListener("click", function(){
                            if(btn.parentElement.classList.contains("is-active")){
                                return;
                            } else {
                                activateBtn.classList.remove("is-active");
                                contents[activateKey].classList.remove("is-show");

                                btn.parentElement.classList.add("is-active");
                                contents[key].classList.add("is-show");
                                activateBtn = btn.parentElement;
                                activateKey = key;
                                _this.scrollMove(btn);
                            }
                        })
                    })

                    if(!isActivateClass){
                        btns[0].parentElement.classList.add("is-active");
                        contents[0].classList.add("is-show");
                        activateBtn = btns[0].parentElement;
                        activateKey = 0;
                    }

                })
            },
            scrollMove : function ( elem ) {
                if(elem.closest(".tab-control-wrap")){
                    elem.closest(".tab-control-wrap").scrollLeft =  (elem.offsetLeft - 20)
                }
            }
        },
    tableCanvasCol : {
        items: document.querySelectorAll("[data-tableCanvas]"),
        itemsGroup : [],
        total : "",
        init : function(){
            if( this.items.length > 0) {
                this.dataCollection()
            }
        },
        dataCollection : function (){
            const _this = this;
            this.items.forEach(function(value){
                _this.itemsGroup.push(value.dataset.tablecanvas);
            })
            this.writeHtml();
        },
        writeHtml : function(){
            const _this = this;

            this.itemsGroup.forEach(function( dataName ){
                const table = document.querySelector("[data-tableCanvas='" + dataName + "']");
                const sumIndex = table.dataset.sumindex;
                const data = eval(dataName);
                const objectHead = data.thead;
                const objectBody = data.tbody;
                const objectFoot = data.tfoot;
                let sumNumber = 0;

                if(objectHead !== undefined){
                    const colgroup = document.createElement("colgroup");
                    const thead = document.createElement("thead");
                    const tr = document.createElement("tr");

                    objectHead.forEach(function(value, key){
                        const sortingUpBtn = document.createElement("button");
                        const sortingDownBtn = document.createElement("button");
                        const col = document.createElement("col");
                        const th = document.createElement("th");
                        col.style.width = value.width;
                        colgroup.appendChild(col);
                        th.innerHTML = value.name;
                        th.setAttribute("scope","col");
                        if(value.thClass.length > 0){
                            th.classList.add(value.thClass);
                        }
                        if(value.sumNumber){
                            objectBody.forEach(function(row) {
                                sumNumber += Number(row[value.key]);
                            })
                        }
                        if(value.sorting){
                            sortingUpBtn.classList.add("sorting-up");
                            sortingDownBtn.classList.add("sorting-down");
                            sortingUpBtn.innerHTML = "<span></span>";
                            sortingDownBtn.innerHTML = "<span></span>";

                            th.appendChild(sortingUpBtn);
                            th.appendChild(sortingDownBtn);

                            sortingUpBtn.addEventListener("click", function(e){
                                _this.sortingEvent(table, key, "up");
                            })
                            sortingDownBtn. addEventListener("click", function(e){
                                _this.sortingEvent(table, key, "down");
                            })
                        }
                        tr.appendChild(th);

                    })

                    thead.appendChild(tr);
                    table.appendChild(colgroup);
                    table.appendChild(thead);
                }

                if(objectBody !== undefined){
                    const tbody = document.createElement("tbody");
                    objectBody.forEach(function(row){
                        const tr = document.createElement("tr");
                        objectHead.forEach(function(col,index){
                            const td = document.createElement("td");
                            td.innerHTML = row[col.key];
                            if(col.tdClass){
                                td.classList.add(col.tdClass)
                            }
                            tr.appendChild(td);
                        })
                        tbody.appendChild(tr);
                    })
                    table.appendChild(tbody);
                }

                if(objectFoot !== undefined){
                    const tfoot = document.createElement("tfoot");
                    const tr = document.createElement("tr");

                    objectFoot.forEach(function(value, key){
                        const name = document.createElement("td");
                        const sum = document.createElement("td");
                        name.innerHTML = value.name;
                        name.setAttribute("colspan", objectHead.length - 1)

                        sum.innerHTML = sumNumber;
                        tr.appendChild(name);
                        tr.appendChild(sum);
                    })
                    tfoot.appendChild(tr)
                    table.appendChild(tfoot);
                }

            })
        },
        sortingEvent : function (table, column, order) {
            const tbody = table.querySelector("tbody");
            const rows = Array.from(tbody.querySelectorAll("tr"));

            rows.sort((rowA, rowB) => {
                const cellA = rowA.querySelectorAll("td")[column].innerText;
                const cellB = rowB.querySelectorAll("td")[column].innerText;

                if (order === "up") {
                    return cellA.localeCompare(cellB);
                } else if (order === "down") {
                    return cellB.localeCompare(cellA);
                }

                return 0;
            });

            tbody.innerHTML = "";
            rows.forEach(function(row) {
                tbody.appendChild(row);
            });

        },
    }
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("common UI : START");
    UI.init()
    console.log("common UI : END");

})