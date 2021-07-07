var productCartInfoNav = 0;

$(document).ready(function() {
    if ($(".bannerSlider").length && $(".bannerSlider .swiper-slide").length > 1) {
        new Swiper(".bannerSlider .swiper-container", {
            slidesPerView: 1,
            pagination: {
                el: ".bannerSlider__pagination",
                clickable: true
            },
            breakpoints: {
                560: {
                    autoHeight: true
                }
            }
        });
    }

    if ($(".rowSlider").length && $(".rowSlider .swiper-slide").length > 2) {
        var rowSlider = 0;
        function rowSlider_init() {
            if (window.innerWidth <= 768 && rowSlider === 0) {
                rowSlider = new Swiper(".rowSlider .swiper-container", {
                    slidesPerView: 2,
                    pagination: {
                        el: ".rowSlider .customPagination"
                    },
                    breakpoints: {
                        375: {
                            slidesPerView: 1
                        }
                    }
                });

                $(".rowSlider .customPagination").css({
                    display: "flex"
                });
            } else if (window.innerWidth >= 768 && rowSlider !== 0) {
                rowSlider.destroy();
                rowSlider = 0;

                $(".rowSlider .customPagination").css({
                    display: "none"
                });
            }
        }
        rowSlider_init();
        $(window).resize(throttle(rowSlider_init, 1000));
    }

    if ($(".brendSlider").length) {
        $(".brendSlider").each(function() {
            if ($(this).find(".swiper-slide").length > 2) {
                new Swiper($(this).find(".swiper-container"), {
                    slidesPerView: 2,
                    navigation: {
                        nextEl: $(this).find(".btn-next"),
                        prevEl: $(this).find(".btn-prev")
                    }
                });
            }
        });
    }

    if ($(".videoSlider").length && $(".videoSlider .swiper-slide").length) {
        var videoSlider = 0;
        function videoSlider_init() {
            var videoSlidesWidth = 0;

            $(".videoSlider .swiper-slide").each(function(index, value) {
                videoSlidesWidth += $(value).width();
            });

            if (videoSlider === 0 && videoSlidesWidth > $(".videoSlider .swiper-container").width()) {
                videoSlider = new Swiper(".videoSlider .swiper-container", {
                    slidesPerView: "auto",
                    navigation: {
                        nextEl: ".videoSlider .btn-next",
                        prevEl: ".videoSlider .btn-prev"
                    }
                });

                $(".videoSlider .btn-next, .videoSlider .btn-prev").css({
                    display: "block"
                });

                $(".videoBlock").each(function() {
                    $(this).css({
                        height: ($(this).width() / 100) * 56
                    });
                });
                $(".videoSlider .swiper-wrapper").css({
                    justifyContent: "flex-start"
                });
            } else if (videoSlider !== 0 && videoSlidesWidth <= $(".videoSlider .swiper-container").width()) {
                videoSlider.destroy();
                videoSlider = 0;
                $(".videoSlider .btn-next, .videoSlider .btn-prev").css({
                    display: "none"
                });
                $(".videoSlider .swiper-wrapper").css({
                    justifyContent: "center"
                });
            } else if (videoSlider === 0) {
                $(".videoSlider .swiper-wrapper").css({
                    justifyContent: "center"
                });
            }
        }

        videoSlider_init();
        $(window).resize(throttle(videoSlider_init, 1000));
    }

    if ($(".productCart__info_nav").length && $(".productCart__info_nav .swiper-slide").length) {
        function productCartInfoNav_init() {
            var productCartInfoNavSlidesWidth = 0;

            $(".productCart__info_nav .swiper-slide").each(function(index, value) {
                productCartInfoNavSlidesWidth += $(value).width();
            });

            if (productCartInfoNav === 0 && productCartInfoNavSlidesWidth > $(".productCart__info_nav .swiper-container").width()) {
                productCartInfoNav = new Swiper(".productCart__info_nav .swiper-container", {
                    slidesPerView: "auto",
                    navigation: {
                        nextEl: ".productCart__info_nav .btn-next",
                        prevEl: ".productCart__info_nav .btn-prev"
                    }
                });

                $(".productCart__info_nav .btn-next, .productCart__info_nav .btn-prev").css({
                    display: "block"
                });
            } else if (productCartInfoNav !== 0 && productCartInfoNavSlidesWidth <= $(".productCart__info_nav .swiper-container").width()) {
                productCartInfoNav.destroy();
                $(".productCart__info_nav .btn-next, .productCart__info_nav .btn-prev").css({
                    display: "none"
                });
            }
        }

        productCartInfoNav_init();
        $(window).resize(throttle(productCartInfoNav_init, 1000));
    }

    if ($(".productCart__slider").length) {
        if ($(".productCart__slider .swiper-slide").length > 1) {
            new Swiper($(".productCart__slider .swiper-container"), {
                slidesPerView: 1,
                navigation: {
                    nextEl: ".productCart__slider .btn-next",
                    prevEl: ".productCart__slider .btn-prev"
                }
            });
        } else {
            $(".productCart__slider .btn-next, .productCart__slider .btn-prev").hide();
        }
    }

    if ($(".sopSlider .swiper-container").length) {
        if ($(".sopSlider .swiper-slide").length > 1) {
            var catalogSwiperSop = 0;
            function catalogSwiperSop_init() {
                if (catalogSwiperSop === 0 && window.innerWidth <= 400) {
                    catalogSwiperSop = new Swiper($(".sopSlider .swiper-container"), {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        pagination: {
                            el: ".sopSlider .customPagination-catalog",
                            dynamicBullets: true,
                        }
                    });

                    $(".sopSlider .customPagination-catalog").css({
                        display: "flex"
                    });
                } else if (catalogSwiperSop !== 0 && window.innerWidth > 400) {
                    catalogSwiperSop.destroy();
                    $(".sopSlider .customPagination-catalog").hide();
                }
            }

            catalogSwiperSop_init();
            $(window).resize(throttle(catalogSwiperSop_init, 1000));
        } else {
            $(".sopSlider .customPagination-catalog").hide();
        }
    }

    if ($(".simSlider .swiper-container").length) {
        if ($(".simSlider .swiper-slide").length > 1) {
            var catalogSwiperSim = 0;
            function catalogSwiperSim_init() {
                if (catalogSwiperSim === 0 && window.innerWidth <= 400) {
                    catalogSwiperSim = new Swiper($(".simSlider .swiper-container"), {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        pagination: {
                            el: ".simSlider .customPagination-catalog",
                            dynamicBullets: true,
                        }
                    });

                    $(".simSlider .customPagination-catalog").css({
                        display: "flex"
                    });
                } else if (catalogSwiperSim !== 0 && window.innerWidth > 400) {
                    catalogSwiperSim.destroy();
                    $(".simSlider .customPagination-catalog").hide();
                }
            }

            catalogSwiperSim_init();
            $(window).resize(throttle(catalogSwiperSim_init, 1000));
        } else {
            $(".simSlider .customPagination-catalog").hide();
        }
    }




    if ($(".imageBlock").length && $(".imageBlock .swiper-slide").length > 1) {
        new Swiper(".imageBlock", {
            slidesPerView: 1,
            navigation: {
                nextEl: ".imageBlock__control-next",
                prevEl: ".imageBlock__control-prev"
            }
        });
    }



});

var filterSwiper = 0;
var contactFilterSwiper = 0;

$(window).load(function() {
    if ($(".newsFilter__item").length > 1) {

        let newsfilterItemLength = 0;

        
        $('.newsFilter .swiper-slide').each(function() {
            let that = $(this);

            newsfilterItemLength = newsfilterItemLength + that.width();
        })

        function filterSwiper_init() {
            
            if (filterSwiper === 0 && $('.newsFilter').width() < newsfilterItemLength - 1) {

                filterSwiper = new Swiper($(".newsFilter"), {
                    slidesPerView: 'auto',
                });

                let containerPadding = $('.content').innerWidth() - $('.content').width();

                $('.newsFilter').css('width',  'calc(100% + ' + containerPadding + 'px)');

                $('.newsFilter').css({
                    paddingLeft: containerPadding,
                })

                $('.newsFilter__item').css({
                    marginLeft: 0,
                    marginRigth: 50,
                })

                $('.newsFilter .swiper-wrapper').css({
                    justifyContent: 'flex-start',
                })

            } else if (filterSwiper !== 0 && $('.newsFilter').width() >= newsfilterItemLength - 1) {
                filterSwiper.destroy();
                $('.newsFilter').css('width', 'auto');
                $('.newsFilter__item').css({
                    marginLeft: 25,
                    marginRigth: 25,
                });
                $('.newsFilter .swiper-wrapper').css({
                    justifyContent: 'center',
                })
            }
        }


        filterSwiper_init();
        $(window).resize(throttle(filterSwiper_init, 1000));
        
    }


    if ($(".contactsFilter__item").length > 1) {

        let contactsfilterItemLength = 0;

        
        $('.contactFilter .swiper-slide').each(function() {
            let that = $(this);

            contactsfilterItemLength = contactsfilterItemLength + that.width();
        })

        function contactFilterSwiper_init() {
            
            if (contactFilterSwiper === 0 && $('.contactFilter').width() < contactsfilterItemLength - 1) {

                contactFilterSwiper = new Swiper($(".contactFilter"), {
                    slidesPerView: 'auto',
                });

                let containerPadding = $('.content').innerWidth() - $('.content').width();

                $('.contactFilter').css('width',  'calc(100% + ' + containerPadding + 'px)');

                $('.contactFilter').css({
                    paddingLeft: containerPadding / 2,
                    marginLeft: -containerPadding / 2
                })


            } else if (contactFilterSwiper !== 0 && $('.contactFilter').width() >= contactsfilterItemLength - 1) {
                contactFilterSwiper.destroy();
            }
        }


        contactFilterSwiper_init();
        $(window).resize(throttle(contactFilterSwiper_init, 1000));
        
    }
})