"use strict";

const include = {
    init : function () {

    },
    meta : function () {
        document.write('<meta name="description" content="">')
        document.write('<meta name="keywords" content="">')
        document.write('<meta name="author" content="">')
        document.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
    },
    title : function ( msg ) {
        document.write('<title>' + msg + '</title>')
    },
    style : function ( name ) {
        document.write('<link type="text/css" rel="stylesheet" href="../assets/css/reset.css">')
        document.write('<link type="text/css" rel="stylesheet" href="../assets/css/common.css">')

        if (name !== undefined ){
            if(typeof name === "object"){
                name.forEach(function(value){
                    document.write('<link type="text/css" rel="stylesheet" href="../assets/css/' + value + '">');
                })
            } else if (typeof name === "string") {
                document.write('<link type="text/css" rel="stylesheet" href="../assets/css/' + name + '">');
            }
        }
    },
    head : function ( title , styleOption) {
        this.meta();
        this.title( title );
        this.style( styleOption );
    },
    header : function (msg) {
        const wrap = document.querySelector("#wrap");
        const header = document.createElement("header");
        const inner = document.createElement("div");
        const h1 = document.createElement("h1");
        h1.textContent = msg;
        h1.classList.add("title");
        inner.classList.add("inner");
        header.id = "header";
        header.classList.add("header");
        inner.appendChild(h1);
        header.appendChild(inner);
        console.log(wrap);
        wrap.prepend(header)
    },
    footer : function() {
        const wrap = document.querySelector("#wrap");
        const footer = document.createElement("footer");

        footer.id = "footer"
        footer.classList.add("footer");
        footer.innerHTML =
            '<div class="inner row ai-c jc-sb">' +
                '<div class="column logo-area">' +
                    '<a href="" target="_self"><img src="/assets/images/logo/ds-logo.png" alt="logo"></a>' +
                '</div>' +
                '<div class="column info">' +
                    '<p class="address-wrap">' +
                        '<span class="address">53, Cheonhoyet-gil, Gangdong-gu, Seoul, Republic of Korea</span>' +
                    '</p>' +
                    '<p class="company">Company: DK BMC MCGroup <span class="tel">Tel : 02)-0000-0000</span></p>' +
                    '<p class="copyright">' +
                        'copyright@2023 DS .All Rights Reserved.' +
                    '</p>' +
                '</div>' +
            '</div>';
        wrap.appendChild(footer);
    },
    screenHeight : function(){
        const header = Math.floor(document.getElementById("header").clientHeight);
        const footer = Math.floor(document.getElementById("footer").clientHeight);
        const screenHeight = Math.floor(window.innerHeight);
    }
}

