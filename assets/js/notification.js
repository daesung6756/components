"use strict";

const notificationSingle = {
    items : document.querySelectorAll("[data-notification]"),
    itemsGroup : [],
    timerStatus: false,
    timerDuration: 4000,
    successGroup:[],
    groupingStatus: document.querySelector(".notification-group"),
    init : function (){
        if(this.items.length > 0) {
            this.dataCollection();
            this.arrayControl();
        }
    },
    dataCollection : function () {
        const _this = this;
        this.items.forEach(function(value , key){
            _this.itemsGroup.push(value.dataset.notification);
        })
    },
    arrayControl : function() {
        const _this = this;

        this.itemsGroup.forEach(function(value, key){
            const wrap = document.querySelector("[data-notification='" + value + "']");
            const open = document.querySelectorAll("[data-notification-open='" + value +"']");
            const close = document.querySelectorAll("[data-notification-close='" + value +"']");

            open.forEach(function(button){
                button.addEventListener("click", function(){_this.setTimer(button.dataset.notificationOpen)});
            });

            close.forEach(function(button){
                button.addEventListener("click", function(){_this.clearTime(button.dataset.notificationClose);});
            });

        })
    },
    setTimer : function( dataName ) {
        const wrap = document.querySelector("[data-notification='" + dataName +"']");
        const _this = this;
        const index = this.successGroup.indexOf(dataName);

        if (this.successGroup.includes(dataName)){
            return;
        } else {
            this.successGroup.push(dataName);
            if(wrap.classList.contains("is-hide")){
                wrap.classList.remove("is-hide");
            }
            wrap.classList.add("is-show");
            this.timerStatus = setTimeout(function(){
                wrap.classList.remove("is-show");
                wrap.classList.add("is-hide");
                _this.successGroup.splice(index, 1);
            }, this.timerDuration);
        }
    },
    clearTime : function( dataName ){
        const wrap = document.querySelector("[data-notification='" + dataName +"']");
        const index = this.successGroup.indexOf(dataName);
        if(this.successGroup.includes(dataName)){
            clearTimeout(this.timerStatus);
            this.successGroup.splice(index, 1);
        }
        wrap.classList.remove("is-show");
        wrap.classList.add("is-hide");

    }
}

const notificationGroup = {
    wrap : document.querySelectorAll("[data-notification-group]"),
    items : document.querySelectorAll("[data-notification-item]"),
    wrapGroup : [],
    itemsGroup : [],
    timerStatus: false,
    timerDuration: 4000,
    successGroup:[],
    init: function(){
        if(this.items.length > 0) {
            this.dataCollection();
            this.arrayControl();
        }
    },
    dataCollection : function(){
        const _this = this;
        this.items.forEach(function(value , key){
            _this.itemsGroup.push(value.dataset.notificationItem);
        })
    },
    arrayControl: function(){
        const _this = this;

        this.itemsGroup.forEach(function (value, key) {
            const item = document.querySelector("[data-notification-item='" + value + "']");
            const open = document.querySelectorAll("[data-notificationGroup-open='" + value + "']");
            const close = document.querySelectorAll("[data-notificationGroup-close='" + value + "']");

            open.forEach(function (button) {
                button.addEventListener("click", function () {
                    _this.setTimer(button.dataset.notificationgroupOpen, item.closest(".notification-group").dataset.notificationGroup)
                });
            })
            close.forEach(function (button) {
                button.addEventListener("click", function () {
                    _this.clearTime(button.dataset.notificationgroupClose, item.closest(".notification-group").dataset.notificationGroup)
                });
            })
        })
    },
    setTimer : function( dataName , parent) {
        const _this = this;
        const wrap = document.querySelector("[data-notification-group='" + parent +"']");
        const item = document.querySelector("[data-notification-item='" + dataName +"']");
        const index = this.successGroup.indexOf(dataName);

        if (this.successGroup.includes(dataName)){
            return;
        } else {
            this.successGroup.push(dataName);
            if(item.classList.contains("is-hide")){
                item.classList.remove("is-hide");
            }

            if(_this.successGroup.length > 0) {
                wrap.classList.add("is-show");
                item.parentElement.classList.add("is-active");
                item.parentElement.style.order = this.successGroup.indexOf(dataName) ;
            }

            item.classList.add("is-show");
            this.timerStatus = setTimeout(function(){
                item.classList.remove("is-show");
                item.classList.add("is-hide");
                item.parentElement.classList.remove("is-active");
                _this.successGroup.splice(index, 1);
                if(_this.successGroup.length <= 0){
                    wrap.classList.remove("is-show");
                    item.parentElement.classList.remove("is-active");
                    item.parentElement.style.order = ""
                }
            }, this.timerDuration);
        }
    },
    clearTime : function( dataName , parent ){
        const wrap = document.querySelector("[data-notification-group='" + parent +"']");
        const item = document.querySelector("[data-notification-item='" + dataName +"']");
        const index = this.successGroup.indexOf(dataName);
        if(this.successGroup.includes(dataName)){
            clearTimeout(this.timerStatus);
            this.successGroup.splice(index, 1);
            if(this.successGroup.length <= 0){
                wrap.classList.remove("is-show");
            }
        }
        item.classList.remove("is-show");
        item.classList.add("is-hide");
        item.parentElement.classList.remove("is-active");
        item.parentElement.style.order = "";
    }

}

document.addEventListener("DOMContentLoaded", function(){
    console.log("notification single : START")
    notificationSingle.init()
    console.log("notification single : END")
    console.log("notification Group : START")
    notificationGroup.init()
    console.log("notification Group : END")
})