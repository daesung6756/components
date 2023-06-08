const popup = {
    popupItems : document.querySelectorAll("[data-popup]"),
    popupArray : [],
    body: document.body,
    init : function (){
        if(this.popupItems.length > 0 ){
            this.dataCollection();
        }
    },
    dataCollection : function () {
        const _this = this;
        this.popupItems.forEach(function(value){
            _this.popupArray.push(value.dataset.popup)
        })
        console.log(this.popupArray)
        this.arrayControl();
    },
    arrayControl : function (){
        const _this = this;
        this.popupArray.forEach(function(value){
            const openBtn = document.querySelectorAll("[data-popup-open='" + value + "']");
            const closeBtn = document.querySelectorAll("[data-popup-close='" + value + "']");

            openBtn.forEach(function(button) {
                button.addEventListener("click", function(){
                    _this.open(this)
                })
            });

            closeBtn.forEach(function(button) {
                button.addEventListener("click", function(){
                    _this.close(this)
                })
            });
        })
    },
    open : function ( elem ) {
        const value = elem.dataset.popupOpen;
        const popup = document.querySelector("[data-popup='" + value + "']");
        popup.classList.add("is-show")
        this.body.classList.add("is-fixed")
    },
    close : function ( elem ) {
        const value = elem.dataset.popupClose;
        const popup = document.querySelector("[data-popup='" + value + "']");
        popup.classList.remove("is-show")
        this.body.classList.remove("is-fixed")
    }
}
document.addEventListener("DOMContentLoaded", function(){
    console.log("popup : start")
    popup.init()
    console.log("popup : end")
})