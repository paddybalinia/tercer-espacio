!function(t,e){"use strict";var n=e.getElementById("myVideo"),a=e.getElementById("miTexto"),i=e.getElementById("iframe"),r=n.clientWidth,d=t.innerWidth;if(!(d<768)){var l=d,m=r;t.addEventListener("scroll",function(){var e=t.scrollY||t.pageYOffset,r=(e-0)/700;r=Math.min(1,Math.max(0,r));var d=Math.round(m+(l-m)*r),o=Math.round(180*r-180),s=1-(e-0)/200;s=Math.min(1,Math.max(0,s)),n.style.width=d+"px",i.style.transform="translateY("+o+"px)",a.style.opacity=s})}}(window,document);