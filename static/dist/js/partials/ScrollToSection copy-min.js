!function(){"use strict";const t=document.querySelectorAll("nav a");window.addEventListener("scroll",function(){t.forEach(t=>{const e=document.querySelector(t.getAttribute("href")).getBoundingClientRect();e.top<=window.innerHeight/2&&e.bottom>=window.innerHeight/2?t.classList.add("active"):t.classList.remove("active")})}),window.ScrollToSection=void 0}();