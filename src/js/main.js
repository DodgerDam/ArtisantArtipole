/**
 * Init Function to Launch on document Ready
 */

const menuButton = document.getElementById('burger-menu');
const menuBtnAnim = document.querySelector('.nav-icon');
const menuOuvert = document.getElementById('nav-container-id');
const tagRayonButtons = [].slice.call(document.querySelectorAll('.tag-rayon-button'));
const projectMobileButton = document.getElementById('project-mobile-button');
const projectMobilecontainer = document.getElementById('container-projet-mobile');
const closeProjectButton = document.getElementById('close-container-project');

/* TAG RAYON SEARCH BUTTONS */
function activeClassRayonButtons() {
    if (tagRayonButtons) {
        tagRayonButtons.forEach(function(tagRayonButton) {
            tagRayonButton.addEventListener('click', (event) => {
                tagRayonButton.classList.toggle('active');
                event.preventDefault();
            });
        });
    }
}
/* END */

/* PROJECT MOBILE FUNCTION  */
function projectMobile() {

    if (document.body.classList.contains('mobile')) {
        projectMobileButton.addEventListener('click', () => {
            if (menuOuvert.classList.contains('open')) {
                menuOuvert.classList.toggle('open');
                menuBtnAnim.classList.toggle('open');
            }
            projectMobilecontainer.classList.toggle('open');
            projectMobileButton.classList.toggle('active');
        });
        closeProjectButton.addEventListener('click', () => {
            projectMobilecontainer.classList.toggle('open');
            projectMobileButton.classList.toggle('active');
        });
    }
}
/* END */

/* NAV MOBILE FUNCTION  */
function navMobile() {
    if (document.body.classList.contains('mobile')) {
        menuButton.addEventListener('click', () => {
            if (projectMobilecontainer.classList.contains('open')) {
                projectMobilecontainer.classList.toggle('open');
                projectMobileButton.classList.toggle('active');
            }
            menuOuvert.classList.toggle('open');
            menuBtnAnim.classList.toggle('open');
        });
    }
}
/* END */

/* GET RESOLUTION / ADD MOBILE CLASS & DESKTOP CLASS  */
function getResolution() {
    if (window.innerWidth < 1024) {
        document.body.classList.remove('desktop');
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
        document.body.classList.add('desktop');
    }
}
window.addEventListener('resize', getResolution);
/* END */

/* RESIZE HEADER ON SCROLL */
function resizeHeaderOnScroll() {
    if (document.body.classList.contains('desktop')) {
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            headerEl = document.getElementById('header');

        if (distanceY > shrinkOn) {
            headerEl.classList.add("smaller");

        } else {
            headerEl.classList.remove("smaller");
        }
    }
}
window.addEventListener('scroll', resizeHeaderOnScroll);
/* END */

/* PROGRESS BAR */
function progress() {
    $(document).on("scroll", function() {
        var pixels = $(document).scrollTop();
        var pageHeight = $(document).height() - $(window).height();
        var progress = 100 * pixels / pageHeight;
        $("div.progress").css("width", progress + "%");
    });
}
/* END */

/* FAST ACCES */
function fastAcces() {
    var acces = document.getElementById("fast-acces");
    var btnCloseAcces = document.querySelector(".open-fast-acces");
    var distanceY = window.scrollY;
    if (distanceY > 700) {
        acces.classList.add("close");
    }
    btnCloseAcces.addEventListener('click', () => {
        acces.classList.remove('close');
    });
}
window.addEventListener('scroll', fastAcces);
/* END */

/* SWIPERS  */
function swipers() {
    var swiper_home = new Swiper(".swiper-home", {
        effect: "fade",
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "custom",
            renderCustom: function(swiper, current, total) {
                if (current < 10) {
                    var $nbrCurrent = '0' + current;
                } else {
                    var $nbrCurrent = current;
                }
                if (total < 10) {
                    var $nbrTotal = '0 ' + total;
                } else {
                    var $nbrTotal = total;
                }
                return '<span class="current">' + $nbrCurrent + '</span>' + ' ' + '<span class="total">' + $nbrTotal + '</span>';
            }
        },
        speed: 1500,
    });
    var swiper_marques = new Swiper(".swiper-marques", {
        slidesPerView: "6",
        spaceBetween: 20,
        loop: true,
        freeMode: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        speed: 500,
        navigation: {
            nextEl: ".swiper-button-next-marques",
            prevEl: ".swiper-button-prev-marques",
        },
        breakpoints: {
            200: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1400: {
                slidesPerView: 6,
                spaceBetween: 20,
            },
        },
    });
}
/* END */

function swiperGalerie() {
    var swiperTabs = new Swiper(".swiper-tabs", {
        spaceBetween: 10,
        slidesPerView: 9,
    });
    var swiperGalerie = new Swiper(".swiper-slide-galerie", {
        spaceBetween: 10,
        effect: "fade",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiperTabs,
        },
    });

    var select = document.getElementById("select-swipe-mobile");
    select.addEventListener('change', function() {
        swiperGalerie.slideTo(this.value);
    });

}

/* COUNT ANIMATION */
$(window).scroll(countAnime);
var viewed = false;

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function countAnime() {
    if (isScrolledIntoView($(".section-chiffres")) && !viewed) {
        viewed = true;
        $('.count').each(function() {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 4000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                }
            });
        });
    }
}
/* END */
function animeSwiperGalerie() {
    var galerieButtons = [].slice.call(document.querySelectorAll('.button-galerie'));
    var galerieSlides = [].slice.call(document.querySelectorAll('.container-swiper-galerie .swiper-slide'));
    var itemPhotos = [].slice.call(document.querySelectorAll('.container-swiper-galerie .swiper-slide .item-photo'));
    var swiperTabs = [].slice.call(document.querySelectorAll('.swiper-tabs .tab-swiper'));

    galerieButtons.forEach(function(galerieButton) {
        galerieButton.addEventListener('click', () => {
            if (galerieSlides) {
                galerieSlides.forEach(function(galerieSlide) {
                    if (galerieSlide.classList.contains('swiper-slide-active')) {
                        setTimeout(function() {
                            itemPhotos.forEach(function(itemPhoto) {
                                itemPhoto.classList.toggle('aos-animate');
                            });
                        }, 800);
                    } else {
                        itemPhotos.forEach(function(itemPhoto) {
                            itemPhoto.classList.remove('aos-animate');
                        });
                    }
                });
            }
        });
    });
    swiperTabs.forEach(function(swiperTab) {
        swiperTab.addEventListener('click', () => {
            if (galerieSlides) {
                galerieSlides.forEach(function(galerieSlide) {
                    if (galerieSlide.classList.contains('swiper-slide-active')) {
                        setTimeout(function() {
                            itemPhotos.forEach(function(itemPhoto) {
                                itemPhoto.classList.toggle('aos-animate');
                            });
                        }, 800);
                    } else {
                        itemPhotos.forEach(function(itemPhoto) {
                            itemPhoto.classList.remove('aos-animate');
                        });
                    }
                });
            }
        });
    });
}



/* itemPhotos.forEach(function(itemPhoto) {
    itemPhoto.classList.remove('aos-animate');
}); */


/* galerieButton.on("click", function() {
    $(iconButton).removeClass('aos-animate');
    setTimeout(function() {
        $(iconButton).addClass('aos-animate');
    }, 400);
}); */




const initReady = () => {
    getResolution();
    resizeHeaderOnScroll();
    swipers();
    progress();
    navMobile();
    activeClassRayonButtons();
    swiperGalerie();
    animeSwiperGalerie();
    projectMobile();

    AOS.init({
        easing: 'ease-out-cubic',
        duration: 800,
        once: true
    });
};

// Document ready
document.addEventListener('DOMContentLoaded', initReady);