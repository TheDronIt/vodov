window.baronJs = {};

//Р¤СѓРЅРєС†РёСЏ РѕРїСЂРµРґРµР»РµРЅРёСЏ С‚Р°С‡ СѓСЃС‚СЂРѕР№СЃС‚РІ
function checkTouchDevice() {
    return !!navigator.userAgent.match(
        /(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/
    );
}

//РўСЂРѕС‚Р»РёРЅРі
function throttle(fn, timeout, ctx) {
    var timer, args, needInvoke;

    return function() {
        args = arguments;
        needInvoke = true;
        ctx = ctx || this;

        if (!timer) {
            (function() {
                if (needInvoke) {
                    fn.apply(ctx, args);
                    needInvoke = false;
                    timer = setTimeout(arguments.callee, timeout);
                } else {
                    timer = null;
                }
            })();
        }
    };
}

//РЎСЂР°РІРЅРµРЅРёРµ С‚РёРїРѕРІ
function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

var scrollTop = 0;
function stopScroll(state) {
    if (state && $("html")[0].style.position == "fixed") {
        return false;
    }

    if (state) {
        scrollTop = $(window).scrollTop();
        $("html").css({
            position: "fixed",
            top: -scrollTop
        });
    } else {
        $("html").css({
            position: "static"
        });
        $(window).scrollTop(scrollTop);
    }
}

function dynamicCatalogSumbutton() {
    if ($("#dynamicCatalog *").length === 0) {
        $("[action='GET_ANALOGUE_FOR_ORDER']").addClass("disable");
    } else if ($("#dynamicCatalog *").length) {
        $("[action='GET_ANALOGUE_FOR_ORDER']").removeClass("disable");
    }
}

$(window).load(function() {
    $("html").attr("data-noTransition") == "true"
        ? $("html").attr("data-noTransition", "false")
        : "";
});

if ($(".chooseItemInSelect").length) {
    $(".chooseItemInSelect").on("change", chooseItemInSelectActiveDisableButton);

    function chooseItemInSelectActiveDisableButton() {
        $(".chooseItemInSelect").each(function() {
            if (
                $(this)
                    .find("select")
                    .val() !== ""
            ) {
                $(this)
                    .find(".filterBtn")
                    .removeClass("disable");
            } else {
                $(this)
                    .find(".filterBtn")
                    .addClass("disable");
            }
        });
    }
}

function baronHideHorScroll(paddingsSumm) {
    $(".customScroll__scroller_track-h").each(function(index, element) {
        $(element).show();

        if (
            $(element).width() >=
            $(element)
                .siblings(".scroller")
                .children()
                .eq(0)
                .width() -
                paddingsSumm
        ) {
            $(element).hide();
        } else {
            $(element).show();
            window.dispatchEvent(new Event("resize"));
        }
    });
}

function checkForAnaloguesOrder(el) {
    var that = $(el);
    var id = that.attr("data-id");
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("order_id", id);
    fdata.append("is_availability", 1);

    $.ajax({
        url: "/catalog/order/get_analogue",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.analogue == 1) {
                that.show();
            } else {
                that.hide();
            }
        },
        error: function(data) {
            that.hide();
        }
    });

    return false;
}

function checkForAnaloguesWishlist(el) {
    var that = $(el);
    var id = that.attr("data-id");
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("wishlist_folder_id", id);
    fdata.append("is_availability", 1);

    $.ajax({
        url: "/wishlist/find-analogue",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.analogue == 1) {
                that.show();
            } else {
                that.hide();
            }
        },
        error: function(data) {
            that.hide();
        }
    });

    return false;
}

function checkForAnaloguesConstructor(el) {
    var that = $(el);
    var id = that.attr("data-id");
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("constructor_id", id);
    fdata.append("is_availability", 1);

    $.ajax({
        url: "/constructor/find-analogue",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.analogue == 1) {
                that.show();
            } else {
                that.hide();
            }
        },
        error: function(data) {
            that.hide();
        }
    });

    return false;
}

function userInvasionRecalc() {
    var height = $(".userInvasion").height();

    if (window.innerWidth > 960) {
        $(".wrapper").css("padding-top", "146px");
    } else {
        $(".wrapper").css("padding-top", height + "px");
    }
}

// РќР°Р±РѕСЂ РїСЂР°РІРёР» РєРѕС‚РѕСЂС‹Рµ РЅСѓР¶РЅРѕ РІС‹РїРѕР»РЅРёС‚СЊ РїРѕСЃР»Рµ С‚РѕРіРѕ РєР°Рє РЅР°Р¶Р°Р»Рё "РЎРѕС…СЂР°РЅРёС‚СЊ РІ РљРљРџ"
function kkpImageWasSave(link) {
    if (link === undefined) {
        $(".constructor__file_btn").hide();
        $(".constructor__file_text").html("PNG РёР»Рё JPG, РЅРµ Р±РѕР»РµРµ 3 РњР±");
    } else {
        $(".constructor__file_btn").show();
        $("#upload_image").val("");
        $(".constructor__file_text").html(
            '<a href="' + link + '" target="_blank">РџРѕСЃРјРѕС‚СЂРµС‚СЊ С„Р°Р№Р»</a>'
        );
    }
}

$(window).resize(function() {
    if ($(".userInvasion").length) {
        userInvasionRecalc();
    }
});

$(document).ready(function() {
    // if ($('.catalog-container').length && window.innerWidth <= 780) {
    //     $('.catalog-container .btn-toggleSlideFilter').trigger('click');
    // }


    $('.checkboxWithField input[type="checkbox"]').on('change', function() {
        var parent = $(this).parents('.checkboxWithField');
        var textField = parent.find('.textField');

        if($(this).is(':checked')) {
            textField.hide();
        } else {
            textField.show();
        }
    });

    $('.orderPersonSelect').on('change', function() {
        var id = $(this).val();

        $('[data-orderPersonFieldId]').slideUp('fast');
        $('[data-orderPersonFieldId='+ id +']').slideDown('show');
    });

    // Р•СЃР»Рё Р·РЅР°С‡РµРЅРё РёРЅРїСѓС‚Р° С‡РёСЃР»Рѕ СЃ Р·Р°РїСЏС‚РѕР№, С‚Рѕ РїСЂРµРѕР±СЂР°Р·СѓСЋ РµРіРѕ РІ РЅРѕСЂРјР°Р»СЊРЅРѕРµ С‡РёСЃР»Рѕ
    $(document).on("change", "input", function() {
        var val = $(this)
            .val()
            .replace(",", ".");
        var valIsNumber = !isNaN(Number(val));
        if (valIsNumber) {
            $(this).val(val);
        }
    });

    if ($(".userInvasion").length) {
        userInvasionRecalc();
    }

    if ($('[action="GET_ANALOGUE_FOR_ORDER"]').length) {
        checkForAnaloguesOrder($('[action="GET_ANALOGUE_FOR_ORDER"]'));
    }

    if ($(".matchGoodsButton").length) {
        checkForAnaloguesWishlist($(".matchGoodsButton"));
    }

    if ($(".constructorAnaloguesButton").length) {
        checkForAnaloguesConstructor($(".constructorAnaloguesButton"));
    }

    setTimeout(function() {
        $(".clientsStatTable").each(function(index, el) {
            adjustHeight($(el).find(".scroller")[0], 40);
        });

        adjustHeight($(".users_table").find(".scroller")[0], 40);
    }, 2);

    if ($(".uiCatalog__toggleVisibilityType").length) {
        setTimeout(function() {
            // if (window.localStorage.orderTable == "list")
            // else if (window.localStorage.orderTable == "tile")

            getOption({
                key: "orderTable",
                successCallback: function(resp) {
                    if (resp == "list") {
                        $('.uiCatalog__toggleVisibilityType[data-type="list"]').trigger("click");
                    } else if (resp == "tile") {
                        $('.uiCatalog__toggleVisibilityType[data-type="tile"]').trigger("click");
                    }
                }
            });
        }, 100);
    }

    getOption({
        key: "orderImg",
        successCallback: function(resp) {
            if (resp == "true") {
                $("#check-img-order").prop("checked", true);
            } else if (resp == "tile") {
                $("#check-img-order").prop("checked", false);
            }

            if ($("#check-img-order").is(":checked")) {
                $(".order__item_image").show();
                $(".catalog__itemRow_image").show();
            } else {
                $(".order__item_image").hide();
                $(".catalog__itemRow_image").hide();
            }

            toggleImagesShowHide();
        }
    });

    // if (window.localStorage.orderImg == "true") {
    //     $("#check-img-order").prop('checked', true);
    // } else {
    //     $("#check-img-order").prop('checked', false);
    // }

    $(".popups").append($(".popupToMove"));

    $(".catalogMenu__list_trigger a.active");

    // adjustHeight($("#constructor_text1")[0], 20);
    // adjustHeight($("#constructor_text2")[0], 20);
    // adjustHeight($("#constructor_text3")[0], 20);
    // adjustHeight($("#constructor_text4")[0], 20);

    if (window.innerWidth <= 800) {
        $(".content-alphaCompanyControl.soloControl .tableDesktop__item").remove();
    } else {
        $(".content-alphaCompanyControl.soloControl .tableMobile__item").remove();
    }

    if (window.innerWidth <= 750) {
        $(".content-wish .wish__table .desktopTable__item").remove();
    } else {
        $(".content-wish .wish__table .mobileTable__item").remove();
    }

    if (window.innerWidth <= 500) {
        $(".content-documentsControl .desktopTable__item").remove();
    } else {
        $(".content-documentsControl .mobileTable__item").remove();
    }

    if (window.innerWidth <= 750) {
        $(".content-orderFormalization .desktopTable__item").remove();
    } else {
        $(".content-orderFormalization .mobileTable__item").remove();
    }

    if (window.innerWidth <= 800) {
        $(".content-alphaCompanyControl.allControl .desktopTable__item").remove();
    } else {
        $(".content-alphaCompanyControl.allControl .mobileTable__item").remove();
    }

    //РћС‚РєСЂС‹РІР°СЋ РїРѕРїР°Рї СЃР±СЂРѕСЃР° РїР°СЂРѕР»СЏ
    if ($("html").is(".resetPassword")) {
        openPopupClear("resetPassword");
    }

    if ($(".chooseItemInSelect").length) {
        chooseItemInSelectActiveDisableButton();
    }

    showHideSelectCompany();

    toggleHideOnBuy();

    dynamicCatalogSumbutton();

    // if ($("#blok-analogue").length) {
    //     setTimeout(function() {
    //         $(".catalogMenu > .catalogMenu__list").css("margin-top", $("#blok-analogue").offset().top - 240 + "px");
    //     }, 0);
    // }

    $("img").mousedown(function() {
        return false;
    });

    //РРЅРёС‚ РґР°С‚Р°РїРёРєРµСЂР° РґР»СЏ СЃС‚СЂР°РЅРёС†С‹ "РђРєС‚С‹ СЃРІРµСЂРєРё"
    if ($("#actsDates").length) {
        $("#actsDates").datepicker({
            range: true,
            toggleSelected: false,
            multipleDatesSeparator: " - "
        });
    }

    //РРЅРёС‚ РґР°С‚Р°РїРёРєРµСЂР° РґР»СЏ РѕС‚РіСЂСѓР·РєРё Р·Р°РєР°Р·Р°
    if ($("#autoorder_date").length) {
        $("#autoorder_date").datepicker({
            // range: true,
            toggleSelected: false,
            multipleDatesSeparator: " - "
        });
    }

    //РєР»Р°СЃСЃ С‚РѕР»СЊРєРѕ РґР»СЏ РџРљ
    checkTouchDevice() ? "" : $("html").addClass("notTouch");

    //РђРІС‚Рѕ РІС‹СЃРѕС‚Р° РІРёРґРµРѕ .videoBlock СЃРѕРѕС‚РЅРѕС€РµРЅРёРµ СЃС‚РѕСЂРѕРЅ
    if ($(".videoBlock").length) {
        function videoBlockAutoHeight() {
            $(".videoBlock").each(function() {
                $(this).css({
                    height: ($(this).width() / 100) * 56
                });
            });
        }

        videoBlockAutoHeight();
        $(window).resize(throttle(videoBlockAutoHeight, 1000));
    }

    //Р›РѕРІРёРј РєР»РёРєРё РїРѕ action
    $(document).on("click", "[action]", function(event) {
        if (!$(this).is("form")) {
            event.stopPropagation();
            this.that = $(this);
            this.action = {
                type: this.that.attr("action"),
                payload: this.that.attr("payload") ? JSON.parse(this.that.attr("payload")) : "",
                node: this.that
            };

            dispatcher(this.action);
        }
    });

    //Р—Р°РєСЂС‹РІР°РµРј РїРѕРїР°Рї РµСЃР»Рё РєР»РёРєРЅСѓР»Рё РІРЅРµ РµРіРѕ
    $(".popUp-wrapper").click(function(e) {
        // СЃРѕР±С‹С‚РёРµ РєР»РёРєР° РїРѕ РІРµР±-РґРѕРєСѓРјРµРЅС‚Сѓ
        var div = $(".popUp"); // С‚СѓС‚ СѓРєР°Р·С‹РІР°РµРј ID СЌР»РµРјРµРЅС‚Р°
        if (
            !div.is(e.target) && // РµСЃР»Рё РєР»РёРє Р±С‹Р» РЅРµ РїРѕ РЅР°С€РµРјСѓ Р±Р»РѕРєСѓ
            div.has(e.target).length === 0
        ) {
            // Рё РЅРµ РїРѕ РµРіРѕ РґРѕС‡РµСЂРЅРёРј СЌР»РµРјРµРЅС‚Р°Рј
            closePopUp();
        }
    });

    if ($(".customSelect").length) {
        $(".customSelect select").each(function(index, value) {
            var that = $(value);

            that.styler({
                selectSmartPositioning: false,
                selectVisibleOptions: 7,
                onFormStyled: function() {
                    if(that.siblings(".jq-selectbox__dropdown").find("li").eq(0).text() === "") {
                        that.parents(".customSelect").append(
                            '<div class="btn customSelect__refresh" action="REFRESH_SELECT" ></div>'
                        );
                    } else {
                        that.parents(".customSelect").find('.jq-selectbox__trigger-arrow').addClass('alwaysVisible');
                    }

                    if (that.siblings(".jq-selectbox__dropdown").find("li").length > 7) {
                        let parentId = that.attr("id");

                        let forCustomScrollItem = $("#" + parentId).siblings(
                            ".jq-selectbox__dropdown"
                        )[0];

                        addCustomScroll(forCustomScrollItem);
                    }

                    showHideSelectCompany();
                },

                onSelectOpened: function() {}
            });
        });

        $(document).on("change", ".customSelect select", function() {
            $(this)
                .parents(".customSelect")
                .find(".jq-selectbox__trigger-arrow")
                .hide();
            $(this)
                .parents(".customSelect")
                .find(".customSelect__refresh")
                .show();
        });

        $(document).click(function(e) {
            // СЃРѕР±С‹С‚РёРµ РєР»РёРєР° РїРѕ РІРµР±-РґРѕРєСѓРјРµРЅС‚Сѓ
            var div = $(".customSelect"); // С‚СѓС‚ СѓРєР°Р·С‹РІР°РµРј ID СЌР»РµРјРµРЅС‚Р°

            if (
                !div.is(e.target) && // РµСЃР»Рё РєР»РёРє Р±С‹Р» РЅРµ РїРѕ РЅР°С€РµРјСѓ Р±Р»РѕРєСѓ
                div.has(e.target).length === 0
            ) {
                // Рё РЅРµ РїРѕ РµРіРѕ РґРѕС‡РµСЂРЅРёРј СЌР»РµРјРµРЅС‚Р°Рј
                $(".jq-selectbox__dropdown").hide();
                $(".jqselect").removeClass("focused dropdown opened");
            }
        });
    }

    if ($("#constructor_client_id").length) {
        var that = $("#constructor_client_id");

        $(document).on("change", ".customSelect select", function() {
            $(this)
                .parents(".customSelect")
                .find(".jq-selectbox__trigger-arrow")
                .hide();
            $(this)
                .parents(".customSelect")
                .find(".customSelect__refresh")
                .show();
        });

        /*$(document).click(function(e) {
            // СЃРѕР±С‹С‚РёРµ РєР»РёРєР° РїРѕ РІРµР±-РґРѕРєСѓРјРµРЅС‚Сѓ
            var div = $("#constructor_client_id"); // С‚СѓС‚ СѓРєР°Р·С‹РІР°РµРј ID СЌР»РµРјРµРЅС‚Р°
            if (
                !div.is(e.target) && // РµСЃР»Рё РєР»РёРє Р±С‹Р» РЅРµ РїРѕ РЅР°С€РµРјСѓ Р±Р»РѕРєСѓ
                div.has(e.target).length === 0
            ) {
                // Рё РЅРµ РїРѕ РµРіРѕ РґРѕС‡РµСЂРЅРёРј СЌР»РµРјРµРЅС‚Р°Рј
                $(".jq-selectbox__dropdown").hide();
                $(".jqselect").removeClass("focused dropdown opened");
            }
        });*/
    }

    //Р—Р°РїСЂРµС‚ РЅР° РІРІРѕРґ С‡РµРіРѕ СѓРіРѕРґРЅРѕ РєСЂРѕРјРµ С†РёС„СЂ
    if ($(".product__counter_input").length) {
        $(".product__counter_input").on("input", function() {
            $(this).val(
                $(this)
                    .val()
                    .replace(/\D/, "")
            );
        });
    }

    //РџРµСЂРµРїРёСЃС‹РІР°РЅРёРµ РєР°СЂС‚РѕС‡РµРє РЅРѕРІРѕСЃС‚РµР№
    function newsJson(obj) {
        return obj.map(val => {
            return (
                '<div class="catalog__item" data-type="' +
                val.type +
                '">' +
                '<div class="catalog__item_top">' +
                '<div class="catalog__item_image">' +
                '<img src="' +
                val.image +
                '" alt="">' +
                "</div>" +
                '<a href="' +
                val.href +
                '" class="catalog__item_text">' +
                val.text +
                "</a>" +
                "</div>" +
                '<div class="catalog__item_bottom">' +
                '<div class="catalog__item_mark">' +
                val.date +
                "</div>" +
                "</div>" +
                "</div>"
            );
        });
    }

    //РћС‚РїСЂР°РІРєР° РѕС‚РІРµС‚Р° РЅР° С‚РµСЃС‚С‹
    $("[sendQuestion]").click(function() {
        let that = $(this);
        let id = that.parents(".questionBlock").attr("data-question");
        let model = undefined;
        let answer = [];

        that.siblings(".testList")
            .find("input")
            .each(() => {
                let that = $(this);
                if (that.is(":checked")) {
                    answer.push(that.attr("value"));
                }
            });

        let data = {
            id: id,
            model: model,
            answer: answer
        };

        // saveAnswerQuestion(data);
    });

    //Р’С‹СЂР°РІРЅРёРІР°РЅРёРµ С‚Р°Р±РѕРІ РЅР° СЃС‚СЂР°РЅРёС†Рµ РєРѕРЅС‚Р°РєС‚РѕРІ
    // if ($('.contactsFilter__item').length) {
    //     let contactHeight = 0;

    //     $('.contact').each(function() {
    //         let that = $(this);

    //         if (that.height() > contactHeight) {
    //             contactHeight = that.height();
    //         }
    //     })

    //     $('.contact').each(function() {
    //         let that = $(this);
    //         that.height(contactHeight);
    //     })
    // }

    $(document).click(function(e) {
        var div = $(".input-search");

        if (div.hasClass("active")) {
            if (
                !div.is(e.target) &&
                div.has(e.target).length === 0 &&
                !$(".btn-search").is(e.target)
            ) {
                div.removeClass("active");
                $(".autocomplete").html("");
            }
        }
    });

    $(".input-search").on("keyup", function() {
        let that = $(this);
        let search = that.find("input").val();

        if (search != "") {
            that.removeClass("erroredBlock");
            searchf(search, that);
        } else {
            that.addClass("erroredBlock");
        }
    });

    $(".input-search").on("submit", function(event) {
        let that = $(this);

        event.preventDefault();

        if (that.find("input").val() == "" || that.find("input").val() == " ") {
            return false;
        }

        document.location.href =
            "/search?q=" +
            $(this)
                .find("input")
                .val();
    });

    // footer script
    function footerfall() {
        var h = $(".footer").innerHeight();
        $(".footer").css("position", "absolute");
        $(".wrapper").css("padding-bottom", h);
        $(".footer").css("bottom", "0");
        $(".wrapper").css("position", "relative");
        $(".footer").css({
            width: "100%"
        });
    }
    $(window).resize(throttle(footerfall, 1000));
    footerfall();

    var scrollTop = 0;
    function stopScroll(state) {
        //Р•СЃРґРё СЃС‚СЂР°РЅРёС†Р° СѓР¶Рµ С„РёРєСЃРёСЂРѕРІР°РЅР°, С‚Рѕ РІС‹Р·РѕРІ СЌС‚РѕР№ С„СѓРЅРєС†РёРё СЃ Р°СЂРіСѓРјРµРЅС‚РѕРј state = true, РЅРёС‡РµРіРѕ РЅРµ СЃРґРµР»Р°РµС‚
        if (state && $("html")[0].style.position == "fixed") {
            return false;
        }

        if (state) {
            scrollTop = $(window).scrollTop();
            $("html").css({
                position: "fixed",
                top: -scrollTop
            });
        } else {
            $("html").css({
                position: "static"
            });
            $(window).scrollTop(scrollTop);
        }
    }

    //Р РµРіРёСЃС‚СЂР°С†РёСЏ/РђРІС‚РѕСЂРёР·Р°С†РёСЏ/Р’РѕСЃСЃС‚Р°РЅРѕРІР»РµРЅРёРµ РїР°СЂРѕР»СЏ

    $(".popup__formField_form").on("submit", function(event) {
        event.preventDefault();
    });

    //РђРґР°РїС‚РёРІ РІРёРґРµРѕ РІ РЅРѕРІРѕСЃС‚СЏС…
    $(".content-newsItemPage iframe").height(($(".content-newsItemPage iframe").width() / 4) * 3);

    //РђРґР°РїС‚РёРІ РєРѕРЅС‚Р°РєС‚РѕРІ
    if ($(".contact").length) {
        if (window.innerWidth >= 879) {
        } else if (window.innerWidth >= 559) {
        } else {
        }
    }

    //Р Р°Р±РѕС‚Р° С‚РµСЃС‚Р°
    $(".testBlock")
        .find(".questionBlock:first-child")
        .addClass("active");

    $('.testContent__button[data-last-question="1"]').text("Р—Р°РІРµСЂС€РёС‚СЊ");
    $('.testContent__button[data-last-question="1"]').attr("action", "SEND_QUESTION_ANSWER");

    $(".btn-cart").on("click", function() {
        event.preventDefault();
    });

    //Р¤СѓРЅРєС†РёРѕРЅРёСЂРѕРІР°РЅРёРµ Р°Р»СЊС„Р°-РїРѕСЂС‚Р°Р»Р°
    $(".alpha-logged").on("click", function() {
        // if (!$(".alphaDropdown").hasClass("active") && !$(".notTouch").length) {
        //     event.preventDefault();
        //     $(".alphaDropdown").addClass("active");
        // }
    });

    $(".notTouch .isLogged .alphaWrapper")
        .hover
        // function() {
        //     $(".alphaDropdown").addClass("active");
        // },
        // function() {
        //     $(".alphaDropdown").removeClass("active");
        // }
        ();

    //РџСЂРµРІСЊСЋ РєР°СЂС‚РёРЅРєРё РІ Р°Р»СЊС„Р°-РїРѕСЂС‚Р°Р»Рµ
    $(".uploadFileBlock__btn #upload_file").on("change", function(e) {
        let itemSize = $("#upload_file")[0].files[0].size;
        let itemExt = $("#upload_file")[0].files[0].type;

        if (itemSize / 1024 / 1024 > 3) {
            showSystemPopup("РћС€РёР±РєР°", "Р¤Р°Р№Р» СЃР»РёС€РєРѕРј Р±РѕР»СЊС€РѕР№");
            $("#upload_file").val("");

            return false;
        }

        if (itemExt != "image/png" && itemExt != "image/jpeg") {
            showSystemPopup("РћС€РёР±РєР°", "РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ С„Р°Р№Р»Р°");
            $("#upload_file").val("");

            return false;
        }

        $("#upload_file")
            .parents(".uploadFileBlock")
            .find(".uploadFileBlock__btn")
            .toggleClass("active");
        const input = document.querySelector("#upload_file");

        const reader = new FileReader();

        reader.onload = function() {
            const img = new Image();
            img.src = reader.result;

            $(".uploadFileBlock__preview").html(img);
            $(".uploadFileBlock__preview").append(
                '<div class="image-cross" action="REMOVE_IMAGE_FROM_INPUT"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.88 22.88" style="enable-background:new 0 0 22.88 22.88;" xml:space="preserve"><path style="fill:#FFFFFF;" d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"/></svg></div>'
            );
        };

        reader.readAsDataURL(input.files[0]);
    });

    // Р›РѕРіРѕС‚РёРї РєРѕРјРїР°РЅРёРё РІ РљРљРџ
    $(".uploadFileBlock__btn #upload_constructor_logo").on("change", function(e) {
        let itemSize = $("#upload_constructor_logo")[0].files[0].size;
        let itemExt = $("#upload_constructor_logo")[0].files[0].type;

        if (itemSize / 1024 / 1024 > 3) {
            showSystemPopup("РћС€РёР±РєР°", "Р¤Р°Р№Р» СЃР»РёС€РєРѕРј Р±РѕР»СЊС€РѕР№");
            $("#upload_constructor_logo").val("");

            return false;
        }

        if (itemExt != "image/png" && itemExt != "image/jpeg") {
            showSystemPopup("РћС€РёР±РєР°", "РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ С„Р°Р№Р»Р°");
            $("#upload_constructor_logo").val("");

            return false;
        }

        $("#upload_constructor_logo")
            .parents(".uploadFileBlock")
            .find(".uploadFileBlock__btn")
            .toggleClass("active");
        const input = document.querySelector("#upload_constructor_logo");

        const reader = new FileReader();

        reader.onload = function() {
            const img = new Image();
            img.src = reader.result;

            $(".uploadFileBlock__preview-logo").html(img);
            $(".uploadFileBlock__preview-logo").append(
                '<div class="image-cross" action="REMOVE_IMAGE_FROM_LOGOINPUT"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.88 22.88" style="enable-background:new 0 0 22.88 22.88;" xml:space="preserve"><path style="fill:#FFFFFF;" d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"/></svg></div>'
            );
        };

        reader.readAsDataURL(input.files[0]);
    });

    $("[data-checkType]").on("input", function() {
        let type = $(this).attr("data-checkType");
        let regX;

        switch (type) {
            case "text":
                regX = /[^a-zA-ZР°-СЏРђ-РЇС—Р‡С”Р„С–Р†С‘РЃ]/g;
                break;
            case "phone":
                regX = /[^0-9\(\)\+\-]/g;
                break;
            default:
                break;
        }

        $(this).val(
            $(this)
                .val()
                .replace(regX, "")
        );
    });

    $(document).on("mouseover", ".textTip", function() {
        let that = $(this);
        let tip = that.find(".textTip__discription-container");
        let tipOffset = tip.offset();
        let parent;

        if(that.parents(".efficiency__title").length) {
            parent = that.parents(".efficiency__title");
        } else if (that.parents(".btnWithTips").length) {
            parent = that.parents(".btnWithTips");
        } else {
            return false;
        }

        let efficencyOffset = parent.offset();

        if (tipOffset.left < efficencyOffset.left) {
            tip.offset({ left: efficencyOffset.left });
        }
    });

    if($('.textTip').length) {
        textTipHeightControl();
        $(window).resize(textTipHeightControl);
    } 

    

    //РљРѕРЅС‚СЂРѕР»СЊ РїРѕРґР±РѕСЂР° РѕР±РѕСЂСѓРґРѕРІР°РЅРёСЏ

    $(".filter2 .equipment__tabs .equipment__tabs_item").click(function() {
        if ($(this).hasClass("active")) {
        } else {
            $(".filter2 .equipment__tabs .equipment__tabs_item").removeClass("active");
            $(this).addClass("active");

            var id = parseInt($(this).attr("data-id"));

            updateWaterFilter(id);
        }
    });

    $(".inputTabChanger").on("input", function() {
        // if (!$('.filter2 .equipment__tabs .equipment__tabs_item[data-id="1"]').hasClass("active")) {
        //     $(".filter2 .equipment__tabs .equipment__tabs_item").removeClass("active");
        //     $('.filter2 .equipment__tabs .equipment__tabs_item[data-id="1"]').addClass("active");
        // }

        var active_id = $(".fill-data")
                .find(".active")
                .attr("data-id"),
            val = $(this).val(),
            input_name = $(this).attr("name");

        if (active_id == "2") {
            $(".fill-data")
                .find('[data-id="1"]')
                .trigger("click");

            var $form = $(".water-filter");

            for (var key in document.waterFilterState[2]) {
                var value = document.waterFilterState[2][key];

                var $input = $form.find('input[name="' + key + '"]'),
                    input_type = $input.attr("type");

                if (key != input_name) {
                    if (input_type == "checkbox") {
                        $input.prop("checked", value);
                    } else {
                        $input.val(value);
                    }
                    document.waterFilterState[1][key] = value;
                }
            }

            $(this).val(val);

            return false;
        }
    });

    if ($(".water-filter").length) {
        document.waterFilterState = {
            1: {
                ProductivityMax: "",
                ProductivityAvg: "",
                Turbidity: "",
                Color: "",
                Odor: "",
                H2S: false,
                pH: "",
                Hardness: "",
                Fe2: "",
                Mn: "",
                Salinity: "",
                IMn: "",
                Si: false,
                Tbc: false,
                Pathogens: false
            },
            2: {
                ProductivityMax: 1,
                ProductivityAvg: 1,
                Turbidity: 2.6,
                Color: 20,
                Odor: 2,
                H2S: false,
                pH: 7.2,
                Hardness: 7,
                Fe2: 0.3,
                Mn: 0.1,
                Salinity: 1000,
                IMn: 2.5,
                Si: true,
                Tbc: true,
                Pathogens: true
            }
        };

        var active_id = parseInt(
            $(".filter2 .equipment__tabs .equipment__tabs_item.active").attr("data-id")
        );

        updateWaterFilter(active_id);

        document.water_filter_max_values = {
            ProductivityMax: 3,
            Turbidity: 50,
            Color: 70,
            Odor: 10,
            Hardness: 20,
            Fe2: 50
        };

        $(".water-filter")
            .find("input")
            .each(function() {
                var type = $(this).attr("type"),
                    name = $(this).attr("name");

                if (type == "text") {
                    $(this).on("keyup", function() {
                        var id = parseInt(
                                $(".water-filter")
                                    .find(".fill-data")
                                    .find(".active")
                                    .attr("data-id")
                            ),
                            value = parseInt($(this).val());

                        for (var key in document.water_filter_max_values) {
                            var cur_value = document.water_filter_max_values[key];

                            if (key == name && value > cur_value) {
                                value = cur_value;
                                $(this).val(value);
                            }
                        }

                        if (id == 1) {
                            document.waterFilterState[id][name] = value;
                        }
                    });
                } else if (type == "checkbox") {
                    $(this).on("change", function() {
                        var id = parseInt(
                            $(".water-filter")
                                .find(".fill-data")
                                .find(".active")
                                .attr("data-id")
                        );

                        if (id == 1) {
                            document.waterFilterState[id][name] = $(this).prop("checked");
                        }
                    });
                }
            });
    }

    function updateWaterFilter(id) {
        var $form = $(".water-filter");

        for (var key in document.waterFilterState[id]) {
            var value = document.waterFilterState[id][key];

            var $input = $form.find('input[name="' + key + '"]'),
                input_type = $input.attr("type");

            if (input_type == "checkbox") {
                $input.prop("checked", value);
            } else {
                $input.val(value);
            }
        }
    }

    $(".constructor__file_input").on("change", function(e) {
        let that = $(this);
        let itemSize = that[0].files[0].size;
        let itemExt = that[0].files[0].type;

        if (itemSize / 1024 / 1024 > 3) {
            showSystemPopup("РћС€РёР±РєР°", "Р¤Р°Р№Р» СЃР»РёС€РєРѕРј Р±РѕР»СЊС€РѕР№");
            that.val("");

            return false;
        }

        if (itemExt != "image/png" && itemExt != "image/jpeg") {
            showSystemPopup("РћС€РёР±РєР°", "РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ С„Р°Р№Р»Р°");
            that.val("");

            return false;
        }

        // that.parents(".constructor__file")
        //     .siblings(".constructor__file_text")
        //     .text(that[0].files[0].name);

        that.parents(".constructor__file")
            .siblings(".constructor__file_text")
            .text("Р¤Р°Р№Р» Р·Р°РіСЂСѓР¶Р°РµС‚СЃСЏ");

        that.parents(".constructor__file_wrapper")
            .find(".constructor__file_btn")
            .hide();

        constructorUpdate(that.attr("data-constructorId"), true);
    });

    var csvStandartText = $(".constructor__file_csv_text").text();
    $(".constructor__file_csv_input").on("change", function(e) {
        let that = $(this);
        let itemSize = that[0].files[0].size;
        let itemExt = that[0].files[0].name.split(".").pop();

        if (itemSize / 1024 / 1024 > 3) {
            showSystemPopup("РћС€РёР±РєР°", "Р¤Р°Р№Р» СЃР»РёС€РєРѕРј Р±РѕР»СЊС€РѕР№");
            $(".constructor__file_csv_text").text(csvStandartText);
            that.val("");

            return false;
        }

        if (itemExt !== "csv") {
            showSystemPopup("РћС€РёР±РєР°", "РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ С„Р°Р№Р»Р°");
            $(".constructor__file_csv_text").text(csvStandartText);
            that.val("");

            return false;
        }

        that.parents(".constructor__file_wrapper")
            .find(".constructor__file_csv_text")
            .text(that[0].files[0].name);

        that.parents(".constructor__file_wrapper")
            .find(".constructor__file_csv-container")
            .hide();
    });

    var is_OSX = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
    var is_iOS = /(iPhone|iPod|iPad)/i.test(navigator.platform);

    var is_Mac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    var is_iPhone = navigator.platform == "iPhone";
    var is_iPod = navigator.platform == "iPod";
    var is_iPad = navigator.platform == "iPad";

    if (
        is_OSX == true ||
        is_iOS == true ||
        is_Mac == true ||
        is_iPhone == true ||
        is_iPod == true ||
        is_iPad == true
    ) {
        $("body").addClass("mac");
    }

    if (!$(".mac").length) {
        if ($("#structure_products").length) {
            addCustomScrollHor($("#structure_products")[0]);
        }

        if ($("#not_structure_products").length) {
            window.baronJs.notStructureProducts = addCustomScrollHor(
                $("#not_structure_products")[0]
            );
        }

        if ($("#total_rent_table").length) {
            addCustomScrollHor($("#total_rent_table")[0]);
        }

        if ($("#catalog__itemTable").length) {
            window.baronJs.catalogItemTable = addCustomScrollHor($("#catalog__itemTable")[0]);
        }

        if ($(".clientsStatTable").length) {
            $(".clientsStatTable").each(function(index, elem) {
                window.baronJs["clientsStatTable" + index] = addCustomScrollHor(elem);
            });
        }

        if ($(".users_table").length) {
            window.baronJs.usersTable = addCustomScrollHor($(".users_table")[0]);
        }

        if ($("#table_add_product").length) {
            window.baronJs.addProductConstructorTable = addCustomScrollHor(
                $("#table_add_product")[0]
            );
        }

        if ($("#users_table").length) {
            window.baronJs.usersIdTable = addCustomScrollHor($("#stat_table_baron")[0]);
        }

        if ($("#companyTable").length) {
            window.baronJs.companyTable = addCustomScrollHor($("#companyTable")[0]);
        }

        if ($("#usersTableSecond").length) {
            window.baronJs.usersTable2 = addCustomScrollHor($("#usersTableSecond")[0]);
        }
    }

    // if ($("#filter_product_list").length) {
    //     window.baronJs.wishWidgetTable = addCustomScrollHor($("#filter_product_list")[0]);
    // }

    $(".loyalty_graph").each(function() {
        var $graph = $(this),
            graph_half_width = $graph.outerWidth() / 2,
            graph_half_height = $graph.outerHeight() / 2;

        $graph.on("mousemove", function(e) {
            /*if (e.offsetX > graph_half_width && e.offsetY < graph_half_width) {
                $graph.attr('title', 'РјРЅРѕРіРѕ')
            } else if (e.offsetX < graph_half_width && e.offsetY > graph_half_width) {
                $graph.attr('title', 'РјР°Р»Рѕ')
            } else {
                $graph.attr('title', 'РЅРѕСЂРјР°Р»СЊРЅРѕ')
            }*/

            // follow pointer
            var $pointer = $graph.find(".follow-pointer"),
                pointer_half = $pointer.outerWidth() / 2;

            $pointer.css({ left: e.offsetX - 10, top: e.offsetY - 10 }).addClass("_show");

            var percent_x = e.offsetX / $graph.outerWidth(),
                percent_y = 1 - e.offsetY / $graph.outerHeight();

            //var opacity = (percent_x + percent_y) / 2;

            //$graph.find('.follow-pointer > div').css('opacity',opacity);
        });

        $graph.on("mouseout", function(e) {
            $graph.find(".follow-pointer").removeClass("_show");
        });

        $graph.find(".loyalty_graph_point").on("mousemove", function(e) {
            e.stopPropagation();
            $graph.find(".follow-pointer").removeClass("_show");
        });
        $graph.find(".loyalty_graph_point").on("mouseout", function(e) {
            $graph.find(".follow-pointer").addClass("_show");
        });
    });

    if ($(".wrap_loyalty").length) {
        updateLoyaltyGraph();
    }

    $(".popup-addItemInWishlist .popup-cross").on("click", function() {
        window.location.reload();
    });

    $(".popup-addItemInConstructor .popup-cross").on("click", function() {
        // $('#saveConstructor').trigger('click');
        constructorUpdate($(".constructorAnaloguesButton").attr("data-id"), false);

        // setTimeout(() => {
        //     window.location.reload();
        // }, 100);
    });

    $(".popup-addItemInOrder .popup-cross").on("click", function() {
        setTimeout(() => {
            window.location.reload();
        }, 100);
    });

    $(".wish__bottom_controls .pushup2").on("click", function() {
        $("html").css("overflow", "hidden");
    });


    function changeDeliveryTab(id) {
       
        if(id == 0) {
            $("#span_delivery_start").html($(".order__info-autoorder").attr('date_start_for_delivery_0')) ;
        } else {
            $("#span_delivery_start").html($(".order__info-autoorder").attr('date_start_for_delivery_not_0')) ;
        }
        
        $('[data-delivery-tab]').slideUp('fast');
        $('[data-delivery-tab='+ id +']').slideDown('fast');
    }
    
    
    $(".radioDelivery").change(function() {
        changeDeliveryTab(this.value)
    });

    setTimeout(function() {
        baronHideHorScroll(0);
        $('[data-orderpersonfieldid="'+ $('[name="orderPerson"]').val() +'"]').show()
        changeDeliveryTab($('[name="delivery"]:checked').val());
    }, 1);
});

function updateLoyaltyGraph() {
    $(".loyalty_graph").each(function() {
        var $graph = $(this),
            $_1 = $graph.find('.loyalty_graph_point[type="1"]'),
            $_2 = $graph.find('.loyalty_graph_point[type="2"]'),
            $_3 = $graph.find('.loyalty_graph_point[type="3"]'),
            $_4 = $graph.find('.loyalty_graph_point[type="4"]'),
            $_5 = $graph.find('.loyalty_graph_point[type="5"]'),
            graph_width = $graph.outerWidth(),
            graph_height = $graph.outerHeight(),
            point_half_size = $graph.find(".loyalty_graph_point").outerWidth() / 2;

        var x1 = $graph.parent().attr("data-x1"), //parseInt($graph.parent().attr('data-x1')) / 6,
            y1 = $graph.parent().attr("data-y1"), //parseInt($graph.parent().attr('data-y1')) / 6,
            x2 = $graph.parent().attr("data-x2"), //parseInt($graph.parent().attr('data-x2')) / 6,
            y2 = $graph.parent().attr("data-y2"), //parseInt($graph.parent().attr('data-y2')) / 6,
            x3 = $graph.parent().attr("data-x3"), //parseInt($graph.parent().attr('data-x3')) / 6,
            y3 = $graph.parent().attr("data-y3"), //parseInt($graph.parent().attr('data-y3')) / 6,
            x4 = $graph.parent().attr("data-x4"), //parseInt($graph.parent().attr('data-x4')) / 6,
            y4 = $graph.parent().attr("data-y4"); //parseInt($graph.parent().attr('data-y4')) / 6;

        var offset_x_1 = graph_width * x1, //graph_width  * x1 - point_half_size,
            offset_y_1 = graph_height * y1, //graph_height * y1 - point_half_size,
            offset_x_2 = graph_width * x2, //graph_width  * x2 - point_half_size,
            offset_y_2 = graph_height * y2, //graph_height * y2 - point_half_size,
            offset_x_3 = graph_width * x3, //graph_width  * x3 - point_half_size,
            offset_y_3 = graph_height * y3, //graph_height * y3 - point_half_size,
            offset_x_4 = graph_width * x4, //graph_width  * x4 - point_half_size,
            offset_y_4 = graph_height * y4; //graph_height * y4 - point_half_size;

        $_1.css({ left: offset_x_1 + "px", bottom: offset_y_1 + "px" });
        $_2.css({ left: offset_x_2 + "px", bottom: offset_y_2 + "px" });
        $_3.css({ left: offset_x_3 + "px", bottom: offset_y_3 + "px" });
        $_4.css({ left: offset_x_4 + "px", bottom: offset_y_4 + "px" });
        $_5.css({ left: graph_width + "px", bottom: graph_height + "px" });

        $_1.attr("title", "РўРµРєСѓС‰РёР№ РєРІР°СЂС‚Р°Р»");
        $_2.attr("title", "РџСЂРµРґС‹РґСѓС‰РёР№ РєРІР°СЂС‚Р°Р»");
        $_3.attr("title", "Р”РІР° РєРІР°СЂС‚Р°Р»Р° РЅР°Р·Р°Рґ");
        $_4.attr("title", "РўСЂРё РєРІР°СЂС‚Р°Р»Р° РЅР°Р·Р°Рґ");
        $_5.attr("title", "Р›РёРґРµСЂ РІ Р’Р°С€РµРј РєР»Р°СЃСЃРµ");

        /*
        var percent_x1 = offset_x_1 / $graph.outerWidth(),
            percent_y1 = 1 - offset_y_1 / $graph.outerHeight(),

            percent_x2 = offset_x_2 / $graph.outerWidth(),
            percent_y2 = 1 - offset_y_2 / $graph.outerHeight(),

            percent_x3 = offset_x_3 / $graph.outerWidth(),
            percent_y3 = 1 - offset_y_3 / $graph.outerHeight(),

            percent_x4 = offset_x_4 / $graph.outerWidth(),
            percent_y4 = 1 - offset_y_4 / $graph.outerHeight(),

            opacity1 = (percent_x1 + percent_y1) / 2,
            opacity2 = (percent_x2 + percent_y2) / 2,
            opacity3 = (percent_x3 + percent_y3) / 2,
            opacity4 = (percent_x4 + percent_y4) / 2;    */

        $_1.find(".graph-point-grad").css("opacity", 1);
        $_2.find(".graph-point-grad").css("opacity", 0.6);
        $_3.find(".graph-point-grad").css("opacity", 0.3);
        $_4.find(".graph-point-grad").css("opacity", 0.1);
        $_5.find(".graph-point-red").css("opacity", 1);
    });
}

function adjustHeight(el, offset) {
    if (el == undefined) {
        return false;
    }

    if (el.scrollHeight > el.clientHeight) {
        el.style.height = el.scrollHeight + "px";
        el.style.maxHeight = el.scrollHeight + "px";

        return false;
    } else {
        el.style.height = "auto";
        el.style.minHeight = "0px";
        return false;
    }
}

function adjustHeightBaron(el, offset) {
    if (el == undefined) {
        return false;
    }

    if (el.scrollHeight > el.clientHeight) {
        el.style.height = el.scrollHeight + "px";
        el.style.maxHeight = el.scrollHeight + "px";

        $(el)
            .find(".scroller")
            .css({
                height: el.scrollHeight + "px",
                minHeight: el.scrollHeight + "px",
                maxHeight: el.scrollHeight + "px"
            });

        return false;
    } else {
        el.style.height = "auto";
        el.style.minHeight = "0px";

        $(el)
            .find(".scroller")
            .css({
                height: "auto",
                minHeight: "0px",
                maxHeight: "auto"
            });

        return false;
    }
}

function textTipHeightControl() {
    $(".textTip").each(function() {
        let that = $(this);
        let siblingEl;
        if(that.siblings("span").length) {
            siblingEl = that.siblings("span");
        } else if(that.siblings(".filterBtn").length) {
            siblingEl = that.siblings(".filterBtn");
        } else {
            return false
        }
        let newHeight = siblingEl.innerHeight();
        that.height(newHeight);
    });
}

/*
РљР°СЃС‚РѕРјРЅС‹Р№ СЃРєСЂРѕР»Р» РІ СЃРµР»РµРєС‚Р°С….

Р’ РєР°С‡РµСЃС‚РІРµ el РїРµСЂРµРґР°С‘С‚СЃСЏ СЃР°РјР°СЏ РІРµСЂС…РЅСЏСЏ РѕР±С‘СЂС‚РєР°, СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‰Р°СЏ .customScroll-wrapper РІ РїСЂРёРјРµСЂРµ.

Р’ СЃР»СѓС‡Р°Рµ СЃ form styler РІ РєР°С‡РµСЃС‚РІРµ el СЃР»РµРґСѓРµС‚ РїРµСЂРµРґР°РІР°С‚СЊ .jq-selectbox__dropdown.
РќСѓР¶РЅРѕ РїРµСЂРµРґР°РІР°С‚СЊ РќР• QJ-РѕР±СЉРµРєС‚, Р° РЅР°С‚РёРІРЅС‹Р№ (С‡РµСЂРµР· $('selector')[0], РЅР°РїСЂРёРјРµСЂ).
РџСЂРёС‡С‘Рј, Р»СѓС‡С€Рµ Р±СЂР°С‚СЊ РµС‘ С‡РµСЂРµР· id, С‡С‚РѕР±С‹ РёСЃРєР»СЋС‡РёС‚СЊ РѕС€РёР±РєСѓ СЃ РїРѕРІС‚РѕСЂРЅС‹Рј РІС‹Р·РѕРІРѕРј baron.js
*/
function addCustomScroll(el) {
    let that = el;

    let customBar =
        '<div class="customScroll__scroller_track">' +
        '<div class="customScroll__scroller_bar"></div>' +
        "</div>";

    $(el).append(customBar);

    baron({
        root: that,
        scroller: "ul",
        bar: ".customScroll__scroller_bar",
        scrollingCls: "_scrolling",
        draggingCls: "_dragging"
    });
}

var baronScroll = 0;

function addCustomScrollHor(el) {
    let that = el;

    let customBar =
        '<div class="customScroll__scroller_track-h">' +
        '<div class="customScroll__scroller_bar-h"></div>' +
        "</div>";

    $(el).append(customBar);

    return baron({
        root: el,
        scroller: ".scroller",
        bar: ".customScroll__scroller_bar-h",
        scrollingCls: "_scrolling",
        draggingCls: "_dragging",
        direction: "h"
        // impact: 'scroller'
    });
}

function openPopupClear(target) {
    $(".popups").addClass("active");
    $('.popup[data-popup="' + target + '"]').addClass("active");
    $(".content").addClass("blur");
    $(".breadCrumb").addClass("blur");
    $(".header").addClass("blur");
    stopScroll(true);
}

function showSystemPopup(title, text, is_reload) {
    $(".popup-system")
        .find(".popup__title")
        .text(title);
    $(".popup-system")
        .find(".popup__subtitle")
        .text(text);
    openPopupClear("system");


    if(Number(is_reload)) {
        $('[action="CLOSE_POPUP"], [action="CLOSE_POPUP_ALL"]').on('click', function() {
            window.location.reload();
        });
    }
}

function reg_member() {
    var fdata = new FormData();
    fdata.append("reg_mail", $("#reg_mail").val());
    fdata.append("reg_pass", $("#reg_pass").val());
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $("input").removeClass("input-error");
    if ($("#reg_mail").val() == "" || /[Р°-СЏРђ-РЇРЃС‘]/.test($("#reg_mail").val())) {
        $("#reg_mail").addClass("input-error");
        return false;
    } else if ($("#reg_pass").val() == "") {
        $("#reg_pass").addClass("input-error");
        return false;
    }

    var key = $("#private_key").val();

    if (key != "8448") {
        showSystemPopup("РћС€РёР±РєР°", "РћС€РёР±РєР°. Р’С‹ РЅРµ Р±С‹Р»Рё Р·Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°РЅС‹.");
        return false;
    }

    $.ajax({
        url: "/user/registration",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function auth_member() {
    var fdata = new FormData();
    fdata.append("auth_mail", $("#auth_mail").val());
    fdata.append("auth_pass", $("#auth_pass").val());
    fdata.append("auth_redirect_url", $("#auth_redirect_url").val());
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $("input").removeClass("input-error");
    if ($("#auth_mail").val() == "" || /[Р°-СЏРђ-РЇРЃС‘]/.test($("#auth_mail").val())) {
        $("#auth_mail").addClass("input-error");
        return false;
    } else if ($("#auth_pass").val() == "") {
        $("#auth_pass").addClass("input-error");
        return false;
    }

    $.ajax({
        url: "/user/authorization",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            location.href = data.redirect;
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function pwd_member() {
    var fdata = new FormData();
    fdata.append("pwd_mail", $("#pwd_mail").val());
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $("input").removeClass("input-error");
    if ($("#pwd_mail").val() == "" || /[Р°-СЏРђ-РЇРЃС‘]/.test($("#pwd_mail").val())) {
        $("#pwd_mail").addClass("input-error");
        return false;
    }

    $.ajax({
        url: "/user/pwd_pass",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

// РґРѕР±Р°РІР»РµРЅРёРµ РїСЂРѕРґСѓРєС‚Р° РІ Р»РёСЃС‚ Р¶РµР»Р°РЅРёР№ (РёР·Р±СЂР°РЅРЅРѕРµ)
function addProductInWishlist(catalog_id, wishlist_id, $trigger) {
    var wishlist_id = wishlist_id || false;
    var $trigger = $trigger || false;
    var parentRow = false;

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("catalog_id", catalog_id);
    fdata.append("wishlist_id", wishlist_id);

    var count = undefined;

    if ($trigger != false) {
        count = $trigger
            .parents(".itemAmount")
            .find("input")
            .val();
        parentRow = $trigger.parents(".tableCasual__row");
    }

    if (!count) {
        count = 1;
    }

    fdata.append("count", count);

    $.ajax({
        url: "/wishlist/product-add",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // if (parentRow == false) {
            //     if (data.type == "add") {
            //         $(".productCart__addToFavorite").attr("data-favorite", "true");
            //     } else if (data.type == "delete") {
            //         $(".productCart__addToFavorite").attr("data-favorite", "false");
            //     }
            // }

            if (parentRow != false) {
                parentRow.addClass("tableCasual__row-selected");
                parentRow.attr("data-delete-id", data.id);

                parentRow.addClass("tableCasual__row-selected");
                //РњРµРЅСЏРµРј С‚РµРєСЃС‚ РєРЅРѕРїРєРё
                if (data.type == "delete") {
                    // $trigger.text($trigger.attr('data-addtext'));
                } else {
                    // $trigger.text($trigger.attr('data-deletetext'));
                }
                return false;
            }

            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

var add_to_timeout = false;

// Р”РѕР±Р°РІР»РµРЅРёРµ РїСЂРѕРґСѓРєС‚Р° РІ С‚РµРєСѓС‰РёР№ Р·Р°РєР°Р·
function addProduct(product_id, amount, popUpFlag) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("product_id", product_id);

    // console.log(product_id);

    var count = amount;

    if (!count) {
        count = 1;
    }

    fdata.append(popUpFlag ? "count_all" : "count", count);

    $.ajax({
        url: "/order/product/add",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // console.log(data);

            if (popUpFlag) {
                // showSystemPopup("РЎРїР°СЃРёР±Рѕ", data.message);
                $(".tableCasual__row[data-id=" + product_id + "]").attr("data-delete-id", data.id);
                $(".tableCasual__row[data-id=" + product_id + "]").addClass(
                    "tableCasual__row-selected"
                );
                return false;
            }

            var item = $(".catalog [data-product=" + product_id + "]");
            var itemCount = parseInt(item.find("[data-value]").attr("data-value"), 10),
                oldCount =
                    item
                        .find(".inCart__amount")
                        .html()
                        .trim() === ""
                        ? 0
                        : parseInt(
                              item
                                  .find(".inCart__amount")
                                  .html()
                                  .trim(),
                              10
                          );
            item.addClass("inCart");
            item.find(".inCart__amount").html(itemCount + oldCount);
            showSystemPopup("РЎРїР°СЃРёР±Рѕ", data.message);

            if ($(".content-catalogOrder").length) {
                var container = $(".catalog-order.catalogColumn2");
            }

            if ($(".content-catalogOrder").find(".catalogColumn2").length) {
                var $product = $(
                    '.content-catalogOrder .catalog__item[data-product="' + product_id + '"]'
                );

                var name = $product.find(".catalog__item_text").text(),
                    price =
                        $product
                            .find(".price")
                            .text()
                            .slice(0, -1) + " Р ",
                    link = $product.attr("href"),
                    ev_id = data.id,
                    image_src = $product.find(".catalog__item_image img").attr("src"),
                    weight = data.weight,
                    volume = data.volume;

                //РЁР°Р±Р»РѕРЅ РґР»СЏ РїР»РёС‚РєРё
                var html =
                    '<div class="catalog__item order__item">' +
                    '<div class="main-product active " data-id="' +
                    product_id +
                    '" data-ev-id="' +
                    ev_id +
                    '">' +
                    '<div class="order__item_top">' +
                    '<a class="order__item_link" href="' +
                    link +
                    '">' +
                    '<div class="order__item_image">' +
                    '<img src="' +
                    image_src +
                    '" alt="" width="75">' +
                    "</div>" +
                    '<p class="order__title">' +
                    name +
                    "</p>" +
                    "</a>" +
                    "</div>" +
                    '<div class="order__item_price order__item_attr">' +
                    '<div class="order__attr_title">Р¦РµРЅР°</div>' +
                    '<div class="order__attr_val">' +
                    price +
                    "</div>" +
                    "</div>" +
                    '<div class="order__item_weight order__item_attr">' +
                    '<div class="order__attr_title">Р’РµСЃ</div>' +
                    '<div class="order__attr_val" data-count="' +
                    data.weight +
                    '">' +
                    parseFloat(data.weight) * parseInt(data.count, 10) +
                    " РєРі</div>" +
                    "</div>" +
                    '<div class="order__item_volume order__item_attr">' +
                    '<div class="order__attr_title">РћР±СЉС‘Рј</div>' +
                    '<div class="order__attr_val" data-count="' +
                    data.volume +
                    '">' +
                    parseFloat(data.volume) * parseInt(data.count, 10) +
                    " Рј<sup>3</sup></div>" +
                    "</div>" +
                    '<div class="order__item_count order__item_attr">' +
                    '<div class="order__attr_title">РљРѕР»РёС‡РµСЃС‚РІРѕ</div>' +
                    '<div class="order__attr_val">' +
                    '<div class="productCount-container">' +
                    '<div class="minus productCount__button" onclick="return minusProduct(' +
                    data.id +
                    ')">-</div>' +
                    '<div class="number productCount__number" name="product_count[' +
                    data.id +
                    ']" data-count="1">' +
                    '<input readonly="readonly" class="order-value" type="text" data-val="' +
                    data.count +
                    '" value="' +
                    data.count +
                    '">' +
                    "</div>" +
                    '<div class="plus productCount__button" onclick="return plusProduct(' +
                    data.id +
                    ')">+</div>' +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    '<div class="order__item_total order__item_attr" nowrap="" id="product_total_' +
                    data.id +
                    '">' +
                    '<div class="order__attr_title">РС‚РѕРі</div>' +
                    '<div class="order__attr_val">' +
                    parseFloat(
                        price
                            .replace(",", ".")
                            .replace(" ", "")
                            .slice(0, -1)
                    ) *
                        parseInt(data.count, 10) +
                    " Р </div>" +
                    "</div>" +
                    // '<div class="order__item_blocker order__item_attr">' +
                    // '<div class="order__attr_title">Рљ Р·Р°РєР°Р·Сѓ</div>' +
                    // '<div class="order__attr_val">' +
                    // "<label>" +
                    // '<input type="checkbox" name="product[' +
                    // data.id +
                    // ']["actual"]" checked="checked" data-cheched="1" onchange="return blockedProduct(' +
                    // data.id +
                    // ')">' +
                    // "</label>" +
                    // "</div>" +
                    // "</div>" +
                    '<div class="order__item_status order__item_attr" nowrap="" id="product_total_' +
                    data.id +
                    '">' +
                    '<div class="order__attr_title">РћС‚РіСЂСѓР¶РµРЅРѕ</div>' +
                    '<div class="order__attr_val">0</div>' +
                    "</div>" +
                    '<div class="order__item_cross">' +
                    '<a data-id="' +
                    data.id +
                    '" class="del delete-order-item">' +
                    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 22.88 22.88" style="enable-background:new 0 0 22.88 22.88;" xml:space="preserve">' +
                    '<path style="fill:#1E201D;" d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539  l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539  c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0  c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"></path>' +
                    "</svg>" +
                    "</a>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                container.append(html);

                //С€Р°Р±Р»РѕРЅ РґР»СЏ СЃРїРёСЃРєР°
                var htmlList = `
                    <div class="catalog__itemRow-container">
                        <div class="catalog__itemTable_row main-product active " data-id="${product_id}" data-ev-id="${ev_id}">
                            <div class="catalog__itemRow_image catalog__itemTable_text-image" style="background-image:url(${image_src})"></div>
                            <a href="${link}" class="catalog__itemRow_text catalog__itemTable_text-title">${name}</a>

                            <div class="order__item_price order__item_attr catalog__itemTable_text-price">
                                <div class="order__attr_val catalog__itemRow_text">${price}</div>
                            </div>
                            <div class="order__item_weight order__item_attr catalog__itemTable_text-weight">
                                <div class="order__attr_val catalog__itemRow_text" data-count="${
                                    data.weigh
                                }">${parseFloat(data.weight) * parseInt(data.count, 10)} РєРі</div>
                            </div>
                            <div class="order__item_volume order__item_attr catalog__itemTable_text-volume">
                                <div class="order__attr_val catalog__itemRow_text" data-count="${
                                    data.volume
                                }">
                                    ${parseFloat(data.volume) *
                                        parseInt(data.count, 10)} Рј<sup>3</sup>
                                </div>
                            </div>
                            <div class="order__item_count order__item_attr catalog__itemTable_text-count">
                                <div class="order__attr_val">
                                    <div class="productCount-container">
                                        <div class="minus productCount__button" onclick="return minusProduct(${
                                            data.id
                                        })">-</div>

                                        <div class="number productCount__number catalog__itemRow_text" name="product_count[${
                                            data.id
                                        }]" data-count="1">
                                            <input readonly="readonly" class="order-value" type="text" data-val="${
                                                data.count
                                            }" value="${data.count}">
                                        </div>

                                        <div class="plus productCount__button" onclick="return plusProduct(${
                                            data.id
                                        })">+</div>
                                    </div>
                                </div>
                            </div>
                            <div class="order__item_total order__item_attr catalog__itemTable_text-finall" nowrap="" id="product_total_${
                                data.id
                            }">
                                <div class="order__attr_val catalog__itemRow_text">${parseFloat(
                                    price
                                        .replace(",", ".")
                                        .replace(" ", "")
                                        .slice(0, -1)
                                ) * parseInt(data.count, 10)} 
                                Р </div>
                            </div>

                            <!-- <div class="order__item_blocker order__item_attr catalog__itemTable_text-inOrder">
                                <div class="order__attr_val">
                                    <label>                                
                                        <input type="checkbox" class="main-product-inOrder" name="product[${
                                            data.id
                                        }]['actual']" checked="checked" data-cheched="1" onchange="return blockedProduct(${
                    data.id
                })">
                                    </label>
                                </div>
                            </div> -->

                            <div class="order__item_status order__item_attr catalog__itemTable_text-delivered" nowrap="" id="product_total_${
                                data.id
                            }">
                                <div class="order__attr_val catalog__itemRow_text">0</div>
                            </div>
                                <div class="order__item_cross">
                                    <a data-id="${data.id}" class="del delete-order-item">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 22.88 22.88" style="enable-background:new 0 0 22.88 22.88;" xml:space="preserve">
                                            <path style="fill:#1E201D;" d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539  l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539  c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0  c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"></path>
                                        </svg>
                                    </a>
                                </div>
                            

                        </div>
                    </div>
                `;

                $("#catalog__itemTable .scroller").append(htmlList);

                $("#order_total").html("<span>РС‚РѕРі:</span> " + data.total + " Р ");

                $("#check-img-order").trigger("click");
                $("#check-img-order").trigger("click");

                // if (window.innerWidth > 780) {
                //     $(".catalogMenu > .catalogMenu__list").css("margin-top", $("#blok-analogue").offset().top - 240 + "px");
                // }
                dynamicBorder2();
                catalog__itemTableScrollReinit();
                dynamicCatalogSumbutton();
            }

            $(".catalogItemVisibilityContent.active").show();
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

// function autoWidthCatalogOrder() {
//     let el = $('.content-catalogOrder .catalog-container'),
//         offset = 20;
//     let cataloOffsetLeft = el.offset().left + el.innerWidth() + offset;
//     if (cataloOffsetLeft > window.innerWidth && window.innerWidth < 1050) {
//         el.css({
//             maxWidth: el.innerWidth() - (cataloOffsetLeft - window.innerWidth + offset)
//         })
//     } else {
//         el.css({
//             maxWidth: 769
//         })
//     }
// }

// $(document).ready(function() {
//     if ($('.content-catalogOrder .catalog-container').length) {
//         $(window).resize(autoWidthCatalogOrder);
//         autoWidthCatalogOrder()
//     }
// })

// if ($("#blok-analogue").length) {
//     $(window).resize(function() {
//         $(".catalogMenu > .catalogMenu__list").css("margin-top", $("#blok-analogue").offset().top - 240 + "px");
//     });
// }

// Р”РѕР±Р°РІР»РµРЅРёРµ РїСЂРѕРґСѓРєС‚Р° РІ РљРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ

var add_to_timeout = false;

function addProductInConstructor(
    catalog_id,
    catalog_type,
    $trigger,
    title,
    price,
    addcount,
    addid,
    hideSystemPopUp
) {
    var $trigger = $trigger || false;
    var parentRow = false;

    var catalog_type = catalog_type || false;

    var addid = addid || false;

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    if (catalog_id) {
        fdata.append("catalog_id", catalog_id);
        fdata.append("catalog_type", catalog_type);

        var count = $("#count_product").html();

        if ($trigger != false) {
            if ($trigger.parents(".itemAmount").length) {
                count = $trigger
                    .parents(".itemAmount")
                    .find("input")
                    .val();

                if (Number(count) === 0) {
                    return false;
                }

                parentRow = $trigger.parents(".tableCasual__row");
            }
        }

        if (!count) {
            count = 1;
        }

        fdata.append("count", count);
    } else {
        fdata.append("catalog_type", catalog_type);
        fdata.append("title", title);
        fdata.append("price", price);
        fdata.append("count", addcount);

        if (addid) {
            fdata.append("id", addid);
        }
    }

    if (add_to_timeout) clearTimeout(add_to_timeout);

    if ($trigger) {
        $trigger.addClass("_disabled");
    }

    $.ajax({
        url: "/constructor/product-add",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if ($trigger) {
                if ($trigger.parents(".itemAmount").length) {
                    parentRow.addClass("tableCasual__row-selected");
                    parentRow.attr("data-delete-id", data.id);
                }

                if ($trigger.parents(".constructor__table_list").length) {
                    $trigger.parents(".constructor__table_list").attr("data-product", data.id);
                }

                var $wrapper = $("#not_structure_products").find(".constructor__table_body");

                $trigger.addClass("_success").removeClass("_disabled");
                add_to_timeout = setTimeout(function() {
                    $trigger.removeClass("_success");
                }, 3000);

                if (catalog_id && $("#not_structure_products").length) {
                    if (!$wrapper.find('li[product-id="' + data.id + '"]').length) {
                        // var html = "",
                        //     name = $trigger
                        //         .parents(".tableCasual__row")
                        //         .find(".order-inner")
                        //         .text(),
                        //     price = data.price;

                        // html += "<li product-id=\"".concat(data.id, "\" class=\"constructor__table_row\">\n                                <ul data-product=\"").concat(data.id, "\" class=\"constructor__table_list\">\n                                    <li data-id=\"").concat(data.id, "\" class=\"constructor__table_item item_0\">\n                                        <i class=\"typical-checkbox\"></i>\n                                    </li>\n\n                                    <li class=\"constructor__table_item item_1\">").concat(data.catalog_type, "</li>\n\n                                    <li class=\"constructor__table_item item_2\">").concat(name, "</li>\n\n                                    <li class=\"constructor__table_item item_3\"><input class=\"local-name-const\" name=\"constructor[product_structure][").concat(data.id, "][title]\" value=\"\" style=\"font-size:11px; width:100%;\"></li>\n\n                                    <li class=\"constructor__table_item item_4\"><input class=\"constructor_count_input local-value\" name=\"constructor[product_structure][").concat(data.id, "][count]\" value=\"1\" style=\"font-size:11px; width:100%;\"></li>\n\n                                    <li class=\"constructor__table_item item_5 local-price\" data-val=\"").concat(price, "\">").concat(price, " \u0420</li>\n\n                                    <li class=\"constructor__table_item item_6 local-price-total\" data-val=\"").concat(price, "\">").concat(price, " \u0420</li>\n\n                                    <li class=\"constructor__table_item item_7\"><input class=\"client-price\" name=\"constructor[product_structure][").concat(data.id, "][price]\" value=\"").concat(price, "\" style=\"font-size:11px; width:100%;\"></li>\n\n                                    <li class=\"constructor__table_item item_8 client-price-total\" data-val=\"").concat(price, "\">").concat(price, " \u0420</li>\n\n                                    <li class=\"constructor__table_item item_9\"><input class=\"local-coeff\" name=\"constructor[product_structure][").concat(data.id, "][markup]\" value=\"1.0000\" style=\"font-size:11px; width:100%;\"></li>\n\n                                    <li class=\"constructor__table_item item_10\">\n                                        <span class=\"btnWrapper\">\n                                            <span class=\"btn_blue remove_no_structure\">\n                                                <svg version=\"1.1\" id=\"\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 22.88 22.88\" style=\"enable-background:new 0 0 22.88 22.88;\" xml:space=\"preserve\">\n                                                    <path style=\"fill:#07b159;\" d=\"M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539\n                                                    l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539\n                                                    c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0\n                                                    c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z\"></path>\n                                                </svg>\n                                            </span>\n                                        </span>\n                                    </li>\n                                </ul>\n                            </li>");

                        // $wrapper.append(html);

                        $wrapper.html(data.html);

                        setTimeout(function() {
                            adjustHeight($("#not_structure_products")[0]);

                            window.baronJs.notStructureProducts.update();
                        }, 100);
                    } else if ($trigger.parents(".itemAmount").length) {
                        $wrapper.html(data.html);

                        // var new_value = count;
                        // $wrapper.find(".constructor_count_input[name='constructor[product_structure][" + catalog_id +"][count]']").val(new_value);
                    } else {
                        $wrapper.html(data.html);
                        // var new_value = Number($wrapper.find(".constructor_count_input").val()) + 1;
                        // $wrapper.find(".constructor_count_input").val(new_value);
                    }
                } else if (!catalog_id) {
                    $trigger.parents("tr").attr("data-product", data.id);
                }
                //РџСЂРµСЂС‹РІР°РµС‚ СЃРєСЂРёРїС‚ РµСЃР»Рё РЅРµ РЅСѓР¶РЅРѕ РїРѕРєР°Р·С‹РІР°С‚СЊ РїРѕРїР°Рї
                if (hideSystemPopUp) return false;

                if ($trigger.parents(".itemAmount").length == 0) {
                    showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
                }
            } else {
                //РџСЂРµСЂС‹РІР°РµС‚ СЃРєСЂРёРїС‚ РµСЃР»Рё РЅРµ РЅСѓР¶РЅРѕ РїРѕРєР°Р·С‹РІР°С‚СЊ РїРѕРїР°Рї
                if (hideSystemPopUp) return false;
                showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
            }

            updateTotalTable();

            $("#sum_items_weight").html(data.sum_items_weight);
            $("#sum_items_volume").html(data.sum_items_volume);
            // checkForAnaloguesConstructor($('.constructorAnaloguesButton'));
        },
        error: function(data) {
            if ($trigger && catalog_id) {
                $trigger.addClass("_error").removeClass("_disabled");
                add_to_timeout = setTimeout(function() {
                    $trigger.removeClass("_error");
                }, 3000);
            } else {
                showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
            }
        }
    });

    return false;
}

//РћС‚РїСЂР°РІРєР° РѕС‚РІРµС‚Р° РЅР° РІРѕРїСЂРѕСЃ
function saveAnswerQuestion(newsId, answers) {
    var fdata = new FormData();
    fdata.append("news_id", newsId);
    fdata.append("model", "news");

    answers.forEach(function(item) {
        let key = item.testQuestion;
        let value = item.testAnswer;

        fdata.append(key, value);
    });

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    /*for (var pair of fdata.entries()) {
        console.log(pair[0] + ", " + pair[1]);
    }*/

    $.ajax({
        url: "/ajax/save_answer_question",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            /*var url_clear = $(".formBlock_form .formBlock_title").attr('data-url-clear');
            $(".formBlock_form .formBlock_title").html(data.result_title+'<br>'+data.result_text+'<br>'+'<a href="'+url_clear+'">РџСЂРѕР№С‚Рё РµС‰Рµ СЂР°Р·</a>');
            saveAnswerQuestionData = 0;*/

            console.log(data);

            $(".questionBlock.testResult")
                .find(".testResult__head_title")
                .text(data.message);
            $(".questionBlock.testResult")
                .find(".testResult__body")
                .text(data.result_text);

            $(".questionBlock").removeClass("active");
            $(".questionBlock.testResult").addClass("active");
        },
        error: function(data) {
            console.log(data.responseJSON.message);
        }
    });

    return false;
}

$(window).resize(throttle(dynamicBorder3, 1000));
dynamicBorder3();

function dynamicBorder3() {
    //Р—Р°РіРѕС‚РѕРІРєР° РґР»СЏ Р·Р°РєСЂСѓРіР»РµРЅРЅС‹С… РєСЂР°РµРІ

    switch (true) {
        case window.innerWidth > 1100:
            borderRad3(3);
            break;
        case window.innerWidth <= 1100 && window.innerWidth > 416:
            borderRad3(2);
            break;
        case window.innerWidth <= 416:
            borderRad3(1);
            break;
    }
}

function borderRad3(count) {
    this.item = $(".catalog-container .catalog__item, .plateList .catalog__item");
    this.item.removeClass(
        "catalog__item-borderBottom-right catalog__item-borderBottom-left catalog__item-borderTop-right catalog__item-borderTop-left"
    );
    this.flag_topBorder = $(".plateList, .productCart").length ? true : false;

    //Р•СЃР»Рё С‚РѕРІР°СЂРѕРІ РІСЃРµРіРѕ 1 СЃС‚РѕР»Р±РёРє
    if (window.innerWidth <= 416) {
        this.item
            .eq(-1)
            .addClass("catalog__item-borderBottom-right catalog__item-borderBottom-left");
        if (this.flag_topBorder) {
            this.item.eq(0).addClass("catalog__item-borderTop-right catalog__item-borderTop-left");
        }
        return false;
    }

    //Р•СЃР»Рё РІРµСЃСЊ Р»РёСЃС‚ С‚РѕРІР°СЂРѕРІ Р·Р°РїРѕР»РЅРµРЅ
    if (this.item.length % count === 0) {
        if (window.innerWidth > 1100) {
            this.item.eq(-1).addClass("catalog__item-borderBottom-right");
            this.item.eq(-3).addClass("catalog__item-borderBottom-left");

            if (this.flag_topBorder) {
                this.item.eq(0).addClass("catalog__item-borderTop-left");
                this.item.eq(2).addClass("catalog__item-borderTop-right");
            }
        } else if (window.innerWidth <= 1100 && window.innerWidth > 416) {
            this.item.eq(-1).addClass("catalog__item-borderBottom-right");
            this.item.eq(-2).addClass("catalog__item-borderBottom-left");

            if (this.flag_topBorder) {
                this.item.eq(0).addClass("catalog__item-borderTop-left");
                this.item.eq(1).addClass("catalog__item-borderTop-right");
            }
        }
        //Р•СЃР»Рё РЅРµ С…РІР°С‚Р°РµС‚ 1 С‚РѕРІР°СЂР° РєРѕРіРґР° РёС… РґРѕР»Р¶РЅРѕ Р±С‹С‚СЊ 3
    } else if (this.item.length % count === 2) {
        if (window.innerWidth > 1100) {
            this.item.eq(-2).addClass("catalog__item-borderBottom-left");

            if (this.flag_topBorder) {
                this.item.eq(0).addClass("catalog__item-borderTop-left");
                this.item.eq(2).addClass("catalog__item-borderTop-right");
            }
        }
    } else if (this.item.length % count === 1) {
        //Р•СЃР»Рё РЅРµ С…РІР°С‚Р°РµС‚ 2 С‚РѕРІР°СЂР° РєРѕРіРґР° РёС… РґРѕР»Р¶РЅРѕ Р±С‹С‚СЊ 3
        if (window.innerWidth > 1100) {
            this.item.eq(-1).addClass("catalog__item-borderBottom-left");

            if (this.flag_topBorder) {
                this.item.eq(0).addClass(" catalog__item-borderTop-left");
                this.item.eq(2).addClass("catalog__item-borderTop-right");
            }
        }
        //Р•СЃР»Рё РЅРµ С…РІР°С‚Р°РµС‚ 1 С‚РѕРІР°СЂР° РєРѕРіРґР° РёС… РґРѕР»Р¶РЅРѕ Р±С‹С‚СЊ 2
        else if (window.innerWidth <= 1100 && window.innerWidth > 416) {
            this.item.eq(-1).addClass("catalog__item-borderBottom-left");

            if (this.flag_topBorder) {
                this.item.eq(0).addClass("catalog__item-borderTop-left");
                this.item.eq(1).addClass("catalog__item-borderTop-right");
            }
        }
    }
}

$(window).resize(throttle(dynamicBorder2, 1000));
dynamicBorder2();

function dynamicBorder2() {
    //Р—Р°РіРѕС‚РѕРІРєР° РґР»СЏ Р·Р°РєСЂСѓРіР»РµРЅРЅС‹С… РєСЂР°РµРІ
    switch (true) {
        case window.innerWidth > 700:
            borderRad2(2);
            break;
        case window.innerWidth <= 700:
            borderRad2(1);
            break;
    }
}

function borderRad2(columns) {
    $(".catalogColumn2")
        .find(".catalog__item")
        .removeClass("catalog__item-borderTop-right");
    $(".catalogColumn2")
        .find(".catalog__item")
        .removeClass("catalog__item-borderTop-left");
    $(".catalogColumn2")
        .find(".catalog__item")
        .removeClass("catalog__item-borderBottom-right");
    $(".catalogColumn2")
        .find(".catalog__item")
        .removeClass("catalog__item-borderBottom-left");

    //Р•СЃР»Рё С‚РѕРІР°СЂРѕРІ РІСЃРµРіРѕ 1 СЃС‚РѕР»Р±РёРє
    if (columns == 1) {
        $(".catalogColumn2")
            .find(".catalog__item:first-child")
            .addClass("catalog__item-borderTop-right catalog__item-borderTop-left");
        $(".catalogColumn2")
            .find(".catalog__item:last-child")
            .addClass("catalog__item-borderBottom-right catalog__item-borderBottom-left");

        return false;
    } else if (columns == 2) {
        if ($(".catalogColumn2").find(".catalog__item:visible").length % 2 === 0) {
            $(".catalogColumn2")
                .find(".catalog__item:visible")
                .eq(0)
                .addClass("catalog__item-borderTop-left");
            $(".catalogColumn2")
                .find(".catalog__item:visible")
                .eq(1)
                .addClass("catalog__item-borderTop-right");
            $(".catalogColumn2")
                .find(".catalog__item:visible")
                .eq(-1)
                .addClass("catalog__item-borderBottom-right");
            $(".catalogColumn2")
                .find(".catalog__item:visible")
                .eq(-2)
                .addClass("catalog__item-borderBottom-left");
        } else if ($(".catalogColumn2").find(".catalog__item:visible").length % 2 === 1) {
            $(".catalogColumn2")
                .find(".catalog__item:visible")
                .eq(0)
                .addClass("catalog__item-borderTop-left");
            $(".catalogColumn2")
                .find(".catalog__item:visible")
                .eq(1)
                .addClass("catalog__item-borderTop-right");
            $(".catalogColumn2")
                .find(".catalog__item:visible")
                .eq(-1)
                .addClass("catalog__item-borderBottom-left");
        }

        // $(".catalogColumn2")
        //     .find(".catalog__item:visible")
        //     .each(function(index, value) {
        //         if ((index + 1) % 2 == 0) {
        //             $(value).css("border-right", "1px solid #d7d7d7");
        //         } else {
        //             $(value).css("border-right", "none");
        //         }

        //         if ($(".catalogColumn2").find(".catalog__item:visible").length == index + 1) {
        //             $(value).css("border-right", "1px solid #d7d7d7");
        //         }
        //     });
    }
}

// ----------------- Catalog page --------------------------------------------------------------
// РџРѕРґС‚СЏРіРёРІР°СЋС‚СЃСЏ РІРёРґ РЅРѕРјРµРЅРєР»Р°С‚СѓСЂС‹ РїСЂРё РІС‹Р±РѕСЂРµ РїСЂРѕРёР·РІРѕРґРёС‚РµР»СЏ
function getTypesByChangeProduct(product) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("product", product);
    fdata.append("type", $("#filter_types").val());
    $.ajax({
        url: "/catalog/filter/get_types_by_change_product",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.types) {
                html = '<option class="default" value="">Р’СЃРµ</option>';
                styledHtml = '<li class="default" value="">Р’СЃРµ</li>';

                $.each(data.types, function(i, val) {
                    html +=
                        '<option value="' +
                        val.id +
                        '" ' +
                        (val.selected == 1 ? "selected='selected'" : "") +
                        ">" +
                        val.name +
                        "</option>";

                    styledHtml +=
                        '<li value="' +
                        val.id +
                        '" ' +
                        (val.selected == 1 ? "selected='selected'" : "") +
                        ">" +
                        val.name +
                        "</li>";
                });

                $("#filter_types").html("");
                $("#filter_types").append(html);

                $("#filter_types")
                    .siblings(".jq-selectbox__dropdown")
                    .find("ul")
                    .html("");
                $("#filter_types")
                    .siblings(".jq-selectbox__dropdown")
                    .find("ul")
                    .append(styledHtml);

                $("#filter_types").trigger("refresh");

                $("#filter_types").each(function(index, value) {
                    $(value).styler({
                        selectSmartPositioning: false,
                        selectVisibleOptions: 7,
                        onFormStyled: function() {
                            $(value)
                                .parents(".customSelect")
                                .append(
                                    '<div class="btn customSelect__refresh" action="REFRESH_SELECT"></div>'
                                );
                            if (
                                $(value)
                                    .siblings(".jq-selectbox__dropdown")
                                    .find("li").length > 7
                            ) {
                                let parentId = $(value).attr("id");

                                let forCustomScrollItem = $("#" + parentId).siblings(
                                    ".jq-selectbox__dropdown"
                                )[0];

                                addCustomScroll(forCustomScrollItem);
                            }
                        }
                    });
                });
            }
        },
        error: function(data) {
            //alert(data.responseJSON.message);
        }
    });
    return false;
}

// РџРѕРґС‚СЏРіРёРІР°СЋС‚СЃСЏ РїРѕРґРєР°С‚РµРіРѕСЂРёРё РїСЂРё РІС‹Р±РѕСЂРµ РІРёРґР° РЅРѕРјРµРЅРєР»Р°С‚СѓСЂС‹
function getTypeAdditional(type_id, add, is_widget, from_subcategory) {
    is_widget = is_widget || false;
    var fdata = new FormData();
    var is_widget = is_widget || false;
    fdata.append("type", type_id);
    fdata.append("add", add);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("product", $("#filter_products").val());
    fdata.append(
        "catalog_id",
        $("#catalog_one").attr("data-id") ? $("#catalog_one").attr("data-id") : ""
    );
    var from_subcategory = from_subcategory || false;
    $.ajax({
        url: "/catalog/filter/get_type_additional",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // console.log(data);

            if (!from_subcategory) {
                $("#type_additional").html("");
            }
            if (data.types && !from_subcategory) {
                html = "";
                var index = 0;
                $.each(data.types, function(i, val) {
                    if (is_widget) {
                        html += '<div class="category-params">';
                        html += '<label for="par' + index + '"></label>';
                    } else {
                        html += '<div class="customSelect">';
                    }
                    html +=
                        '<select id="par' +
                        index +
                        '" data-placeholder="' +
                        val.name +
                        '" name=add[' +
                        val.name +
                        "]>";
                    html +=
                        '<option class="default" value="">- ' +
                        val.name.replace(/_/g, " ") +
                        " -</option>";
                    $.each(val.types, function(i2, val2) {
                        html +=
                            '<option value="' +
                            val2.value +
                            '" ' +
                            (val2.selected == 1 ? 'selected="selected"' : "") +
                            ">" +
                            val2.value.replace("inch", '"') +
                            "</option>";
                    });
                    html += "</select>";
                    html += is_widget ? "</div>" : "</div>";
                    index++;
                });

                $("#type_additional").append(html);
                $("#type_additional select").each(function(index, value) {
                    $(value).styler({
                        selectSmartPositioning: false,
                        selectVisibleOptions: 7,
                        onFormStyled: function() {
                            $(value)
                                .parents(".customSelect")
                                .append(
                                    '<div class="btn customSelect__refresh" action="REFRESH_SELECT"></div>'
                                );
                            if (
                                $(value)
                                    .siblings(".jq-selectbox__dropdown")
                                    .find("li").length > 7
                            ) {
                                let parentId = $(value).attr("id");

                                let forCustomScrollItem = $("#" + parentId).siblings(
                                    ".jq-selectbox__dropdown"
                                )[0];

                                addCustomScroll(forCustomScrollItem);
                            }
                        }
                    });
                });

                let selected = $("#filter_products").val();

                $("#filter_products").html("");
                $("#filter_products").styler("destroy");

                let producersHtml = '<option class="default" value="">Р’СЃРµ</option>';

                $.each(data.products, function(i, val) {
                    producersHtml +=
                        '<option value="' + val.product + '">' + val.product + "</option>";
                });

                $("#filter_products").append(producersHtml);

                $("#filter_products").val(selected);

                $("#filter_products").styler({
                    selectSmartPositioning: false,
                    selectVisibleOptions: 7,
                    onFormStyled: function() {
                        $("#filter_products")
                            .parents(".customSelect")
                            .append(
                                '<div class="btn customSelect__refresh" action="REFRESH_SELECT"></div>'
                            );
                        if (
                            $("#filter_products")
                                .siblings(".jq-selectbox__dropdown")
                                .find("li").length > 7
                        ) {
                            let forCustomScrollItem = $("#filter_products").siblings(
                                ".jq-selectbox__dropdown"
                            )[0];

                            addCustomScroll(forCustomScrollItem);
                        }
                    }
                });
            }
            /*if (data.products) {
                html = '<option class="default" value="">Р’СЃРµ</option>';
                $.each(data.products, function(i, val) {
                    html += '<option value="' + val.product + '" ' + (val.selected == 1 ? "selected='selected'" : "") + ">" + val.product + "</option>";
                });
                $("#filter_products").html("");
                $("#filter_products").append(html);
            }*/
        },
        error: function(data) {
            //alert(data.responseJSON.message);
        }
    });
    return false;
}

function changeFilterAvailability(value) {
    if(value == 'in_stock' || value == 'plan_date_receip' || value == 'absent_plan_date_receip' || value == 'absent') {
        $('#div_filter_storage').show();
    } else {
        $('#div_filter_storage').hide();
        $('#div_filter_storage').children().find(':checkbox').attr('checked', false);        
    }
}

function filterSubmit() {
    window.location = "/catalog?" + $("#filter").serialize();
    // $("#filter").submit();
    return false;
}

function upload_file() {
    var fdata = new FormData();

    fdata.append("upload_file", $("input[id=upload_file]")[0].files[0]);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/account-plugin-bg",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // alert(data.message);
            window.location =
                window.location.protocol + "//" + window.location.hostname + "/cabinet/account";
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function delete_file() {
    var fdata = new FormData();

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/account-plugin-bg-delete",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // showSystemPopup("РЎРїР°СЃРёР±Рѕ", data.message);

            location.reload();

            //window.location = window.location.protocol + '//' + window.location.hostname + '/cabinet/documents';
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function upload_constructor_logo() {
    var fdata = new FormData();

    fdata.append("upload_constructor_logo", $("#upload_constructor_logo")[0].files[0]);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/constructor-logo",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // alert(data.message);
            window.location =
                window.location.protocol + "//" + window.location.hostname + "/cabinet/account";
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function delete_constructor_logo() {
    var fdata = new FormData();

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/constructor-logo-delete",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // showSystemPopup("РЎРїР°СЃРёР±Рѕ", data.message);

            location.reload();

            //window.location = window.location.protocol + '//' + window.location.hostname + '/cabinet/documents';
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function password_change() {
    var fdata = new FormData();
    fdata.append("old_pass", $("#pass").val());
    fdata.append("new_pass", $("#new-pass").val());
    fdata.append("new_pass2", $("#new-pass-two").val());
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/password",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function currency_update() {
    var fdata = new FormData();

    $("#currency-change .change-block input").each(function() {
        fdata.append("currency[" + $(this).attr("data-currency-id") + "]", $(this).val());
    });

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/currency-update",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function createOrder() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/order/new",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.redirect) {
                document.location.href = data.redirect;
            } else {
                location.reload();
            }
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

function createAppeal() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/appeal/new",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.redirect) {
                document.location.href = data.redirect;
            } else {
                location.reload();
            }
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

function saveAppeal(el, is_send = 0, is_upload_files = false) {

    if(is_send && !confirm('РџРѕСЃР»Рµ СЂР°Р·РјРµС‰РµРЅРёСЏ РѕР±СЂР°С‰РµРЅРёСЏ РІС‹ СѓР¶Рµ РЅРµ СЃРјРѕР¶РµС‚Рµ РµРіРѕ РїСЂР°РІРёС‚СЊ. Р Р°Р·РјРµСЃС‚РёС‚СЊ СЃРµР№С‡Р°СЃ?')) {
        return false;
    }

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("Appeal[id]", $('#appeal_description').attr('data-id'));
    fdata.append("Appeal[email]", $('#appeal_email').val());
    fdata.append("Appeal[phone]", $('#appeal_phone').val());
    fdata.append("Appeal[link_video]", $('#appeal_link_video').val());
    fdata.append("Appeal[relation_appeal_id]", $('#appeal_relation_appeal_id').val() || '');
    fdata.append("Appeal[description]", $('#appeal_description').html());
    fdata.append("is_send", is_send);
      
    $.ajax({
        url: "/cabinet/appeal/save",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            
            if(is_upload_files) {
                return true;
            }
            /*if (data.redirect) {
                document.location.href = data.redirect;
            }*/

            if (data.message) {
                showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
            }

            setTimeout(function() {
                     location.reload();
                 }, 3000)
           

            //$(el).removeClass("disabled");
        },
        error: function(data) {
            var currentUrl = window.location.href;
          
            if (data.redirect) {
                document.location.href = data.redirect;
            } else {
                showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
            }

            //$(el).removeClass("disabled");
        }
    });

    return false;
}

function delete_appeal_files(appeal_id, file_id) {
    
    if(!confirm('Р’С‹ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ С…РѕС‚РёС‚Рµ СѓРґР°Р»РёС‚СЊ С„Р°Р№Р»?')) {
        return false;
    }
    
    var fdata = new FormData();
      
    fdata.append("appeal_id", appeal_id);
    fdata.append("file_id", file_id);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/appeal/delete-file",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            location.reload();
            //window.location = window.location.protocol + "//" + window.location.hostname + "/cabinet/documents";
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
            location.reload();
        }
    });

    return false;
}

function upload_appeal_files(appeal_id, max_files) {
    var fdata = new FormData();

    var ins = $("input[id=upload_file]")[0].files.length;

    if (parseInt(ins)>max_files){
         alert("Р’С‹ РјРѕР¶РµС‚Рµ Р·Р°РіСЂСѓР·РёС‚СЊ РјР°РєСЃРёРјСѓРј "+max_files+" "(max_files == 1 ? 'С„Р°Р№Р»' : 'С„Р°Р№Р»Р°') );
    }

    for (var x = 0; x < ins; x++) {
        fdata.append("upload_file[]", $("input[id=upload_file]")[0].files[x]);
    }

    fdata.append("appeal_id", appeal_id);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    saveAppeal(false, 0, true);

    $.ajax({
        url: "/cabinet/appeal/upload-files",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            location.reload();
            //window.location = window.location.protocol + "//" + window.location.hostname + "/cabinet/documents";
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
            location.reload();
        }
    });

    return false;
}


function plusProduct(id, formalization) {
    // if (!$('.main-product[data-ev-id="' + id + '"]').hasClass("active")) {
    //     return false;
    // }

    var formalization = formalization || false;
    updateCountProduct(id, "1", formalization);
    return false;
}

function minusProduct(id, formalization) {
    // if (!$('.main-product[data-ev-id="' + id + '"]').hasClass("active")) {
    //     return false;
    // }

    var formalization = formalization || false;
    updateCountProduct(id, "-1", formalization);
    return false;
}

function updateCountProduct(id, value, formalization) {
    var savedId = id;

    var fdata = new FormData();
    var item = $('.main-product[data-ev-id="' + id + '"]').parents(
        ".catalog__item, .catalog__itemRow-container"
    );
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);
    fdata.append("value", value);

    $.ajax({
        url: "/order/product/update-count",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // var count = parseInt(item.find(".order-value").val(), 10);
            var count = parseInt(data.count, 10);
            var weight = parseFloat(
                item
                    .find(".order__item_weight")
                    .find(".order__attr_val")
                    .attr("data-count")
            );
            var volume = parseFloat(
                item
                    .find(".order__item_volume")
                    .find(".order__attr_val")
                    .attr("data-count")
            );
            var pricePerUnit = parseFloat(
                item
                    .find(".order__item_price")
                    .find(".order__attr_val")
                    .text()
                    .replace(new RegExp(",", "g"), ".")
                    .replace(new RegExp(" ", "g"), "")
                    .slice(0, -1)
            );

            var newWeight = weight * count;
            var newVolume = 0;

            for (var i = 0; i < count; i++) {
                newVolume = newVolume + volume;
            }

            var newTotalPrice = pricePerUnit * count;

            var newWeightFormed = newWeight.toFixed(2) + " РєРі";
            var newVolumeFormed = newVolume.toFixed(2) + " Рј<sup>3</sup>";
            var newTotalPriceFormed = newTotalPrice.toFixed(2) + " P";

            // item.find('.order__item_weight').find('.order__attr_val').attr('data-count', newWeight);
            item.find(".order__item_weight")
                .find(".order__attr_val")
                .html(newWeightFormed);

            // item.find('.order__item_volume').find('.order__attr_val').attr('data-count', newVolume);
            item.find(".order__item_volume")
                .find(".order__attr_val")
                .html(newVolumeFormed);

            item.find(".order__item_total")
                .find(".order__attr_val")
                .html(newTotalPriceFormed);

            if (formalization) {
                $("#order_total").html("РўРѕРІР°СЂРѕРІ РЅР°: <span>" + data.format_total + " СЂСѓР±</span>");
                $("#order_total_nds").html(
                    "РС‚РѕРі: <span>" +
                        data.format_total +
                        ' <span>Р </span></span> <span class="nds">СЃ РќР”РЎ (20%)</span>'
                );
                $("#tablica")
                    .find("div[data-numberId='" + id + "']")
                    .find(".order-value")
                    .val(data.count);
                $("#tablica")
                    .find("div[data-numberId='" + id + "']")
                    .find(".order-value")
                    .attr("data-val", data.count);
                $("#tablica")
                    .find("div[data-numberId='" + id + "']")
                    .parents(".productCount-container")
                    .siblings(".productsTotalPrice")
                    .text(data.total_product + " Р ");

                $(".columnTable__item#items_tr_" + savedId)
                    .find(".productsTotalPrice")
                    .text(data.total_product + " P");
            } else {
                /*$("#product_total_" + id + ".order__item_total .order__attr_val").html("");
                $("#product_total_" + id + ".order__item_total .order__attr_val").html(data.format_total_product);*/

                $("#order_total").html("РС‚РѕРі: " + data.format_total + " <span>Р </span>");
                // $("#blok-analogue").html("");
                // $("#blok-analogue").html(data.analogue);
                // changeOrderInfoWhishList(data);
            }

            $('[data-ev-id="' + id + '"]')
                .find(".productCount__number input")
                .val(
                    parseInt(
                        $('[data-ev-id="' + id + '"]')
                            .find(".productCount__number input")
                            .val()
                    ) + parseInt(value)
                );

            if (
                $('[data-ev-id="' + id + '"]')
                    .find(".productCount__number input")
                    .val() < 1
            ) {
                $('[data-ev-id="' + id + '"]')
                    .find(".productCount__number input")
                    .val(1);
            }

            // var count = parseInt(item.find(".order-value").val(), 10);

            // var weight = parseFloat(
            //     item
            //         .find(".order__item_weight")
            //         .find(".order__attr_val")
            //         .attr("data-count")
            // );
            // var volume = parseFloat(
            //     item
            //         .find(".order__item_volume")
            //         .find(".order__attr_val")
            //         .attr("data-count")
            // );
            // var pricePerUnit = parseFloat(
            //     item
            //         .find(".order__item_price")
            //         .find(".order__attr_val")
            //         .text()
            //         .replace(",", ".")
            //         .replace(" ", "")
            //         .slice(0, -1)
            // );

            // var newWeight = weight * count;
            // var newVolume = 0;

            // for (var i = 0; i < count; i++) {
            //     newVolume = newVolume + volume;
            // }

            // var newTotalPrice = pricePerUnit * count;

            // var newWeightFormed = newWeight.toFixed(2) + " РєРі";
            // var newVolumeFormed = newVolume.toFixed(2) + " Рј<sup>3</sup>";
            // var newTotalPriceFormed = newTotalPrice.toFixed(2) + " P";

            // item.find(".order__item_weight")
            //     .find(".order__attr_val")
            //     .html(newWeightFormed);

            // item.find(".order__item_volume")
            //     .find(".order__attr_val")
            //     .html(newVolumeFormed);

            // item.find(".order__item_total")
            //     .find(".order__attr_val")
            //     .html(newTotalPriceFormed);

            $(".itemRow-totalWeight").html(data.total_weight + " РєРі");
            $(".itemRow-totalVolume").html(data.total_volume + " Рј<sup>3</sup>");
            $(".itemRow-totalCount").html(data.format_total_count);
            $(".itemRow-totalPrice").html(data.format_total + " Р ");
            $(".itemRow-totalDelivered").html(data);

            $(".autoorder__sum").text(data.format_total_with_discount);

            if (typeof data.total_with_discount !== "undefined") {
                $(".autoorderWrapper").addClass("available");
            } else {
                $(".autoorderWrapper").removeClass("available");
                $(".autoorder input").prop("checked", false);
            }
        },
        error: function(data) {
            //  alert(data.responseJSON.message);
        }
    });

    return false;
}

function setNewPassword() {
    var fdata = new FormData(),
        newPass1 = $("#new_pass")
            .val()
            .trim(),
        newPass2 = $("#new_pass2")
            .val()
            .trim();

    if (newPass1.trim() !== newPass2.trim()) {
        $("#reset-password-form .customInput").addClass("customInput-error");
        return false;
    } else {
        $("#reset-password-form .customInput").removeClass("customInput-error");
    }

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("ResetPasswordForm[password]", newPass1);
    fdata.append("ResetPasswordForm[password2]", newPass2);
    fdata.append("token", $("#reset-password-token").val());

    $.ajax({
        url: "/user/set-new-password",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $(".popup.active").removeClass("active");
            openPopupClear("regAuth");
            $(".popup__formField_item").removeClass("active");
            $('.popup__formField_item[data-form="auth"]').addClass("active");
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function changeOrderInfoWhishList(data) {
    var $whishList = $(".wishlist-result");

    if (data != undefined) {
        $whishList
            .find(".result-total-price")
            .text(data.total.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " Р ");
        $whishList.find(".result-weight").text(data.total_weight.toFixed(2) + " РєРі");
        $whishList.find(".result-v3").html(data.total_volume.toFixed(2) + " Рј<sup>3</sup>");
        $whishList.find(".result-qty").text(data.total_count);
    }
}

function blockedProduct(id) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);

    $.ajax({
        url: "/order/product/blocked",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $("#order_total").html("РС‚РѕРі: " + data.format_total + " <span>Р </span>");
            changeOrderInfoWhishList(data);

            // console.log(data);

            if (data.actual == false) {
                $('.main-product[data-ev-id="' + id + '"]').removeClass("active");
                $('.main-product[data-ev-id="' + id + '"] .main-product-inOrder').prop(
                    "checked",
                    false
                );
            } else if (data.actual == true) {
                $('.main-product[data-ev-id="' + id + '"]').addClass("active");
                $('.main-product[data-ev-id="' + id + '"] .main-product-inOrder').prop(
                    "checked",
                    true
                );
            }
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

$(document).on("click", ".delete-order-item", function() {
    var id = $(this).attr("data-id");

    deleteProduct(id);
});

function deleteProduct(id, formalization) {
    var formalization = formalization || false;

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);

    $.ajax({
        url: "/order/product/delete",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if ($('.tableCasual__row[data-delete-id="' + id + '"]').length) {
                $('.tableCasual__row[data-delete-id="' + id + '"]').removeClass(
                    "tableCasual__row-selected"
                );
            }

            if (formalization) {
                $("#items_tr_" + data.id).remove();

                if (!data.count) {
                    $("#nothingHere").show();
                    $("#tablica").hide();
                    $("#order_submit").hide();
                }

                $("#order_total").html("РўРѕРІР°СЂРѕРІ РЅР°: <span>" + data.format_total + " СЂСѓР±</span>");
                $("#order_total_nds").html(
                    "РС‚РѕРі: <span>" +
                        data.format_total +
                        ' <span>Р </span></span> <span class="nds">СЃ РќР”РЎ (20%)</span>'
                );
            } else {
                $("#order_total").html("РС‚РѕРі: " + data.format_total + " <span>Р </span>");
                // $("#blok-analogue").html("");
                // $("#blok-analogue").html(data.analogue);
                changeOrderInfoWhishList(data);
            }

            $('.main-product[data-ev-id="' + id + '"]')
                .parents(".catalog__item")
                .remove();

            $('.catalog__itemTable_row[data-ev-id="' + id + '"]')
                .parents(".catalog__itemRow-container")
                .remove();

            dynamicBorder2();
            catalog__itemTableScrollReinit();
            setTimeout(function() {
                dynamicCatalogSumbutton();
                // if (window.innerWidth > 780) {
                //     $(".catalogMenu > .catalogMenu__list").css("margin-top", $("#blok-analogue").offset().top - 240 + "px");
                // }
            }, 0);

            checkForAnaloguesOrder($('[action="GET_ANALOGUE_FOR_ORDER"]'));

            $(".itemRow-totalWeight").html(data.total_weight + " РєРі");
            $(".itemRow-totalVolume").html(data.total_volume + " Рј<sup>3</sup>");
            $(".itemRow-totalCount").html(data.format_total_count);
            $(".itemRow-totalPrice").html(data.format_total + " Р ");
            $(".itemRow-totalDelivered").html(data);

            $(".autoorder__sum").text(data.format_total_with_discount);

            if (typeof data.total_with_discount !== "undefined") {
                $(".autoorderWrapper").addClass("available");
            } else {
                $(".autoorderWrapper").removeClass("available");
                $(".autoorder input").prop("checked", false);
            }
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

$("#check-img-order").on("change", function() {
    let that = $(this);
    if (that.is(":checked")) {
        $(".order__item_image").show();
        setOption({
            key: "orderImg",
            value: true
        });
        // window.localStorage.removeItem('orderImg');
        // window.localStorage.setItem('orderImg', 'true');
    } else {
        $(".order__item_image").hide();
        setOption({
            key: "orderImg",
            value: false
        });
        // window.localStorage.removeItem('orderImg');
        // window.localStorage.setItem('orderImg', 'false');
    }

    setTimeout(function() {
        window.baronJs.catalogItemTable.update();
        baronHideHorScroll(0);
    }, 0);
});

$(".order__search").on("submit", function() {
    event.stopPropagation();
    event.preventDefault();

    var query = $(".order__search_input")
        .val()
        .toLowerCase();

    //Р¤РёР»СЊС‚СЂ РїРѕ РєР°СЂС‚РѕС‡РєР°Рј
    if (query.length > 0) {
        $(".catalogColumn2")
            .find(".catalog__item")
            .each(function(index, el) {
                var that = $(el);
                var title = that
                    .find(".order__title")
                    .text()
                    .toLowerCase();

                if (title.includes(query)) {
                    that.css({
                        display: "-webkit-box",
                        display: "-ms-flexbox",
                        display: "flex"
                    });
                } else {
                    that.css({
                        display: "none"
                    });
                }
            });
    } else {
        $(".catalogColumn2")
            .find(".catalog__item")
            .css({
                display: "-webkit-box",
                display: "-ms-flexbox",
                display: "flex"
            });
    }

    //Р¤РёР»СЊС‚СЂ РїРѕ С‚РѕРІР°СЂР°Рј РІ С‚Р°Р±Р»РёС†Рµ
    if (query.length > 0) {
        $("#catalog__itemTable")
            .find(".catalog__itemRow-container")
            .each(function(index, el) {
                var that = $(el);
                var title = that
                    .find(".catalog__itemTable_text-title")
                    .text()
                    .toLowerCase();

                if (title.includes(query)) {
                    that.show();
                } else {
                    that.hide();
                }
            });
    } else {
        $("#catalog__itemTable")
            .find(".catalog__itemRow-container")
            .show();
    }

    //РЈР±РёРІР°РµРј Р±Р°СЂСЂРѕРЅ Рё Р·Р°РїСѓСЃРєР°РµРј Р·Р°РЅРѕРІРѕ
    catalog__itemTableScrollReinit();
    dynamicBorder2();
});

function catalog__itemTableScrollReinit() {
    if (!$(".mac").length) {
        if (typeof window.baronJs.catalogItemTable !== "undefined") {
            window.baronJs.catalogItemTable.dispose();
            $("#catalog__itemTable .scroller").removeAttr("style");
            $("#catalog__itemTable .customScroll__scroller_track-h").remove();

            window.baronJs.catalogItemTable = addCustomScrollHor($("#catalog__itemTable")[0]);
        }
    }
}

function decodeSearchQuery() {
    var search = location.search.substring(1);
    if (search === "") return false;
    return JSON.parse('{"' + decodeURI(search.replace(/&/g, '","').replace(/=/g, '":"')) + '"}');
}

function encodeSearchQuery (obj) {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join("&");
}


function calculate(pdf, scheme, price_variant, constructor) {
    var fdata = new FormData($("#form-calculate")[0]),
        pdf = pdf || false,
        constructor = constructor || false,
        scheme = scheme || false,
        price_variant = price_variant || false;

    if (!price_variant) {
        if (
            $(".tab-item:visible")
                .find(".total-summery")
                .find(".light")
                .hasClass("_max-on")
        ) {
            price_variant = "small";
        } else {
            price_variant = "max";
        }
    }

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("pdf", pdf);
    fdata.append("constructor", constructor);
    fdata.append("scheme", scheme);
    fdata.append("price_variant", price_variant); //full and light

    $.ajax({
        url: "/equipment/post",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (constructor) {
                // alert(data.message);
                showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
                return false;
            }

            if (pdf) {
                window.open(data.result);
                return false;
            }

            $(".scheme-container").html(data.html);
            addTipsForBtn();
            


            $(".scheme-container")
                .find('*[data-type="small"]')
                .hide();

            //alert(data.result);
        },
        error: function(data) {
            $(".scheme-container").html('');
                
            // alert(data.responseJSON.message);
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}


//РџРѕРґРіСЂСѓР·РєР° РєР°С‚Р°Р»РѕРіР° РїСЂРё СЃРєСЂРѕР»Р»Рµ
$(document).ready(function() {
    var stopLoad = false;
    var catalog = $('.catalog-container .catalog');
    var offset = catalog.find('.catalog__item').length;
    var allProductsCount = Number($('[data-all-count]').attr('data-all-count'));
    var preloader = $('.catalogPreloader');

    function catalogGetProducts(category, offset) {
        var category = category || false;
        var fdata = new FormData();
        var typeAdditional = decodeSearchQuery();
        var originalParams = category ? {} : {
            search: $("#filter_search").val(),
            product: $("#filter_products").val(),
            type: $("#filter_types").val()
        };

        var allParams = Object.assign(typeAdditional, originalParams);

        fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

        Object.keys(allParams).forEach(function(key) {
            if(key !== 'page') fdata.append(key, allParams[key]);
        });

        var offset = offset || 0;

        fdata.append("limit", 27); //РµСЃР»Рё Р»РёРјРёС‚ 0 С‚Рѕ РІС‹РІРµРґСѓС‚СЃСЏ РІСЃРµ
        fdata.append("offset", offset);

        preloader.addClass('catalogPreloader-active');
        $.ajax({
            url: "/catalog/filter/get_products",
            type: "POST",
            data: fdata,
            contentType: false,
            dataType: "json",
            processData: false,
            success: function(data) {
                catalog.append(data.html)
                stopLoad = false;

                preloader.removeClass('catalogPreloader-active');
                startDiagramAnimation($(".circleDiagram"));
                dynamicBorder3();
            },
            error: function(data) {
                alert(data.responseJSON.message);
                stopLoad = false;

                preloader.removeClass('catalogPreloader-active');
            }
        });

        return false;
    }


    
    
    if($('.content-catalogPage').length) {
        var currentPage = Number(decodeSearchQuery().p) || 1;
        window.addEventListener('scroll', function() {
            var catalogBottomEdge = catalog.offset().top + catalog.innerHeight();
            var windowScroll = $(window).scrollTop() + window.innerHeight;
    
            if(windowScroll >= catalogBottomEdge && !stopLoad && allProductsCount > offset) {
                var decodedUrl = decodeSearchQuery();
                var category = decodedUrl.category || false;
                stopLoad = true;
                catalogGetProducts(category, offset);
                offset += 27;
                currentPage += 1;
                decodedUrl.p = currentPage;
                change_url('?'+encodeSearchQuery(decodedUrl));
            }
        });
    }
});


// function chatGetCountNotViewMessages() {
//     var fdata = new FormData();
//     fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

//     $.ajax({
//         url: "/chat/get-count-not-view-messages",
//         type: "POST",
//         data: fdata,
//         contentType: false,
//         dataType: "json",
//         processData: false,
//         success: function(data) {
//             if (data.count && data.count != 0) {
//                 $("#chat_count_message").html("");
//                 $("#chat_count_message").append(data.count);
//                 $("#chat_count_message").show();
//             } else {
//                 $("#chat_count_message")
//                     .html("")
//                     .hide();
//             }
//         },
//         error: function(data) {
//             console.log(data.responseJSON.message);
//         }
//     });

//     return false;
// }

// ---------------- CONSTRUCTOR CP ------------------

var add_to_timeout = false;

function addProductsInConstructor(products) {
    var fdata = new FormData(),
        counter = 0,
        $msg = $(".to-order-msg");

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    for (var key in products) {
        fdata.append("catalog[" + counter + "][id]", key);
        fdata.append("catalog[" + counter + "][count]", products[key]);
        fdata.append("catalog[" + counter + "][type]", 1);

        counter++;
    }

    $msg.html("").hide();

    $.ajax({
        url: "/constructor/products-add",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            $msg.html(data.message).show();

            $("#sum_items_weight").html(data.sum_items_weight);
            $("#sum_items_volume").html(data.sum_items_volume);

            setTimeout(function() {
                updateTotalTable();
                checkForAnaloguesConstructor($(".constructorAnaloguesButton"));
            }, 1000);
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $msg.html(data.responseJSON.message).show();
            setTimeout(function() {
                $msg.html("").hide();
            }, 4000);
        }
    });

    return false;
}

function deleteProductInConstructor(id, $trigger, norecoil = false) {
    var fdata = new FormData();

    fdata.append("id", id);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/constructor/product-delete",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            var $wrapper = $("#not_structure_products").find(".constructor__table_body");

            $('.tableCasual__row[data-delete-id="' + id + '"]').removeClass(
                "tableCasual__row-selected"
            );

            $wrapper.html(data.html);
            // if ($('.tableCasual__row[data-delete-id="' + id + '"]')) {
            //     $('.tableCasual__row[data-delete-id="' + id + '"]').removeClass('tableCasual__row-selected');
            // }

            // if ($trigger == 'popUptrigger') {
            //     $('#not_structure_products').find('.constructor__table_row[product-id="' + id+'"]').remove();
            // } else {
            //     if ($trigger.parents("tr").length) {
            //         $trigger.parents("tr").remove();
            //     } else if ($trigger.parents("ul[data-product]").length) {
            //         $trigger.parents(".constructor__table_row").remove();
            //     }
            // }

            updateTotalTable();

            $("#sum_items_weight").html(data.sum_items_weight);
            $("#sum_items_volume").html(data.sum_items_volume);

            // checkForAnaloguesConstructor($('.constructorAnaloguesButton'));

            setTimeout(function() {
                adjustHeight($("#not_structure_products")[0]);

                window.baronJs.notStructureProducts.update();
            }, 100);
        },
        error: function(data) {
            // alert(data.responseJSON.message);
            if (norecoil == false) {
                showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
            }
        }
    });

    return false;
}

function updateProductInConstructor(id, title, count, price, markup, $trigger, is_update_title) {
    var fdata = new FormData();

    var title = title || "";
    var count = count || "";
    var price = price || "";
    var markup = markup || "";
    var is_update_title = is_update_title || "";

    fdata.append("id", id);
    fdata.append("title", title);
    fdata.append("count", count);
    fdata.append("price", price);
    fdata.append("markup", markup);
    fdata.append("is_update_title", is_update_title);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/constructor/product-update",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            // var $wrapper = $("#not_structure_products").find(".constructor__table_body");
            var $parent = $trigger.parents("[product-id]");

            if (title != false) {
            } else if (count != false) {
                updateConstructorItems($parent, "count");
            } else if (price != false) {
                updateConstructorItems($parent, "price");
            } else if (markup != false) {
                updateConstructorItems($parent, "coeff");
            }

            $("#sum_items_weight").html(data.sum_items_weight);
            $("#sum_items_volume").html(data.sum_items_volume);
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function constructorNewFolder() {
    var folderName = $("#constructor_folder_name")
            .val()
            .trim(),
        $msg = $(".constructorAddFolder__error");
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    if (folderName === "") {
        $msg.html("Р’С‹ РЅРµ РІРІРµР»Рё РЅР°Р·РІР°РЅРёРµ");
    }

    fdata.append("title", folderName);

    $msg.text("");

    $.ajax({
        url: "/constructor/new-folder",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //$msg.html(data.message).show();
            //html = '<tr style="width:100%"><td><span style="width:100px"><a href="'+data.url+'">'+data.title+'</a> (0)</span></td><td><table cellpadding="0" cellspacing="0" class="actions"><tr data-id="'+data.id+'" data-title="'+data.title+'"><td class="pushup44 edit"><i class="wish-edit"></i></td><td class="remove pushup7"><i class="wish-remove"></i></td></tr></table></td></tr>';
            //$('#constructor_folder_list').append(html);

            location.reload();
        },
        error: function(data) {
            $msg.html(data.responseJSON.message);
        }
    });

    return false;
}

function constructorDeleteFolder(el) {
    var id = el.attr("data-id");

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);

    var $msg = el.parents(".constructorRemoveFolder__body").find(".constructorRemoveFolder__error");

    $msg.text("");

    $.ajax({
        url: "/constructor/delete-folder",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            //$msg.html.show()

            $('.dirWrapper[data-id="' + id + '"]').remove();

            el.parents(".popup")
                .find(".popup-cross")
                .trigger("click");
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $msg.html(data.responseJSON.message);
        }
    });

    return false;
}

function constructorRenameFolder(id) {
    var identificator = id;

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", identificator);
    fdata.append("new_name", $("#constructor_folder_new_name").val());

    var $msg = $("#constructor_folder_new_name")
        .parents(".constructorRenameFolder__body")
        .find(".constructorRenameFolder__error");

    $msg.text("");

    $.ajax({
        url: "/constructor/rename-folder",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);

            var name = $("#constructor_folder_new_name").val();

            $('.dirWrapper[data-id="' + identificator + '"]')
                .find(".folderName")
                .html(name);

            $('.dirWrapper[data-id="' + identificator + '"]')
                .find(".actions__content")
                .attr("data-title", name);

            $("#constructor_folder_new_name")
                .parents(".popup")
                .find(".popup-cross")
                .trigger("click");
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $msg.html(data.responseJSON.message);
        }
    });

    return false;
}

function constructorCreate(folder_id) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    fdata.append("folder_id", folder_id);

    $.ajax({
        url: "/constructor/create",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //html = '<tr style="width:100%"><td><span style="width:100px"><a href="'+data.url+'">'+data.title+'</a> (0)</span></td><td><table cellpadding="0" cellspacing="0" class="actions"><tr data-id="'+data.id+'" data-title="'+data.title+'"><td class="pushup44 edit"><i class="wish-edit"></i></td><td class="remove pushup7"><i class="wish-remove"></i></td></tr></table></td></tr>';
            //$('#constructor_folder_list').append(html);
            //alert(data.message);
            // location.reload();
            document.location.href = data.url;
        },
        error: function(data) {
            //alert(data.responseJSON.message);
        }
    });

    return false;
}

function constructorDelete(el) {
    var id = el.attr("data-id");

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);

    var $msg = $(".constructorRemoveOffer__error");

    $msg.html("");

    $.ajax({
        url: "/constructor/delete",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            location.reload();
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $msg.html(data.responseJSON.message);
        }
    });

    return false;
}

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

function constructorRename(el, popup = true, copy = false) {
    // if ($(el).siblings(".customSelect").find('#constructor_copy').length) {
    //     copy = true;
    // }

    var fdata = new FormData();

    if (is("Object", el) == true) {
        var id = el.siblings("#constructor_offer_new_name").attr("data-id");
    } else {
        var id = el;
    }

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);

    if (copy == true) {
        fdata.append("constructor_copy_to_this_folder", 1);
    } else {
        fdata.append("new_name", $("#constructor_offer_new_name").val());
        fdata.append("constructor_copy", $("#constructor_copy").val());
        fdata.append("constructor_rename", $("#constructor_rename").val());
    }

    var $msg = $(".constructorRenameOffer__error");

    /*if ($('#constructor_rename').val() == '') {
        
    } else {
        fdata.append("constructor_copy_to_this_folder", 1);
    }*/

    $.ajax({
        url: "/constructor/rename",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // console.log(data);
            // alert(data.message);
            if (copy == false) {
                location.reload();
            } else {
                // showSystemPopup('РЎРїР°СЃРёР±Рѕ!', data.message);

                // setTimeout(function() {
                //     location.reload();
                // }, 3000)

                document.location.href = data.url;
            }

            // showSystemPopup('РЎРїР°СЃРёР±Рѕ!', data.message);
        },
        error: function(data) {
            // $msg.html(data.responseJSON.message);
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function constructorUpdate(id, response, deleteImg) {
    if (
        response == true &&
        ($("#constructor_client_id").val() == null || $("#constructor_client_id").val() == 0)
    ) {
        showSystemPopup("РћС€РёР±РєР°!", "Р’С‹Р±РµСЂРёС‚Рµ РєРѕРјРїР°РЅРёСЋ-РѕС‚РїСЂР°РІРёС‚РµР»СЏ");
        return false;
    }

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);
    fdata.append("markup", $("#pushup5").val());
    fdata.append("is_nds", $("#constructor_is_nds:checked").val() ? 1 : 0);
    fdata.append("is_view_image", $("#kompred:checked").val() ? 1 : 0);

    if ($("#constructor_client_id").val() != null) {
        fdata.append("client_id", $("#constructor_client_id").val());
    } else {
        fdata.append("client_id", 0);
    }

    fdata.append("addressee_company", $("#constructor_addressee_company").val());
    fdata.append("addressee_fio_post", $("#constructor_addressee_fio_post").val());
    fdata.append("addressee_name", $("#constructor_addressee_name").val());
    fdata.append("number", $("#constructor_number").val());
    fdata.append("date", $("#constructor_date").val());
    fdata.append("title", $("#constructor_title").val());
    fdata.append("text1", $("#constructor_text1").html()); //Р”Р»СЏ textarea $("#constructor_text1").val()
    fdata.append("text2", $("#constructor_text2").html()); //Р”Р»СЏ textarea $("#constructor_text2").val()
    fdata.append("text3", $("#constructor_text3").html()); //Р”Р»СЏ textarea $("#constructor_text3").val()
    fdata.append("text4", $("#constructor_text4").html()); //Р”Р»СЏ textarea $("#constructor_text4").val()
    fdata.append("constructor_currency_id", $("#constructor_currency_id").val());
    fdata.append("upload_image", $("input[id=upload_image]")[0].files[0]);
    fdata.append("upload_csv_file", $("input[id=upload_csv_file]")[0].files[0]);
    fdata.append("del_image", deleteImg ? 1 : 0);
    fdata.append("del_csv_file", $("#del_csv_file").is(":checked") ? 1 : 0);

    $("#table_constructor_water")
        .find("ul")
        .each(function() {
            $(this)
                .find("li")
                .each(function() {
                    if (
                        $(this)
                            .find("input")
                            .attr("name")
                    ) {
                        fdata.append(
                            $(this)
                                .find("input")
                                .attr("name"),
                            $(this)
                                .find("input")
                                .val()
                        );
                    }
                });
        });

    //tr[data="new"]
    $("#table_add_product")
        .find("tbody tr")
        .each(function() {
            $(this)
                .find("td")
                .each(function() {
                    if (
                        $(this)
                            .find("input")
                            .attr("data-delete") == 1
                    ) {
                        fdata.append(
                            $(this)
                                .find("input")
                                .attr("name"),
                            $(this)
                                .find("input:checked")
                                .val()
                        );
                    } else {
                        fdata.append(
                            $(this)
                                .find("input")
                                .attr("name"),
                            $(this)
                                .find("input")
                                .val()
                        );
                    }
                });
        });

    $("#structure_products")
        .find("ul")
        .each(function() {
            $(this)
                .find("li")
                .each(function() {
                    if (
                        $(this)
                            .find("input")
                            .attr("name")
                    ) {
                        fdata.append(
                            $(this)
                                .find("input")
                                .attr("name"),
                            $(this)
                                .find("input")
                                .val()
                        );
                    }
                });
        });

    $("#not_structure_products")
        .find("ul")
        .each(function() {
            $(this)
                .find("li")
                .each(function() {
                    if (
                        $(this)
                            .find("input")
                            .attr("name")
                    ) {
                        fdata.append(
                            $(this)
                                .find("input")
                                .attr("name"),
                            $(this)
                                .find("input")
                                .val()
                        );
                    }
                });
        });

    var $msg = $("#form-err");

    $msg.removeClass("_success")
        .html("")
        .hide();

    if (main_err_timeout) clearTimeout(main_err_timeout);

    $.ajax({
        url: "/constructor/update",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);

            // if ($("#del_image").val()) {
            //     $(".block_image").hide();
            //     $("#image").attr("src", "");
            //     $("#image_href").attr("href", "");
            //     $("#del_image").prop("checked", false);
            // }
            
            if(data.water_items) {
                $('#span_constructor_water_block_items').html(data.water_items);
            } else {
                $('#span_constructor_water_block_items').html("");
            }

            if (data.csv_data) {
                $(".constructor__file_csv-container").html(data.csv_data);
                $(".constructor__file_csv-container").show();
            }

            if (data.image) {
                $("#del_image").prop("checked", false);
                $(".block_image").show();
                $("#image").attr("src", data.image);
                $("#image_href").attr("href", data.image);
            }

            $msg.addClass("_success")
                .html(data.message)
                .show();
            //location.reload();
            main_err_timeout = setTimeout(function() {
                $msg.removeClass("_success")
                    .html("")
                    .hide();
            }, 3000);

            if (response === true) {
                showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
                kkpImageWasSave(data.image);
            }

            // showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);

            return true;
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $msg.html(data.responseJSON.message).show();

            main_err_timeout = setTimeout(function() {
                $msg.removeClass("_success")
                    .html("")
                    .hide();
            }, 3000);

            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return true;
}

function getConstructorWaterParameters(constructor_id, subsection_id) {
    var fdata = new FormData();
        
    /*if(document.getElementById('table_constructor_water')) {
        if(!confirm('Р•СЃР»Рё РІС‹ РёР·РјРµРЅРёС‚Рµ РЅРѕСЂРјР°С‚РёРІ, РІСЃРµ СЂР°РЅРµРµ РІРІРµРґС‘РЅРЅС‹Рµ РїР°СЂР°РјРµС‚СЂС‹ РѕР±РЅСѓР»СЏС‚СЊСЃСЏ')) {
            return false;
        }
    }*/
    
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("constructor_id", constructor_id);
    fdata.append("subsection_id", subsection_id);

    $.ajax({
        url: "/constructor/get-water-parameters",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            
            if(data.water_items) {
                $('#span_constructor_water_block_items').html(data.water_items);
            } else {
                $('#span_constructor_water_block_items').html("");
            }
            
            //location.reload();
        },
        error: function(data) {
            //alert(data.responseJSON.message);
        }
    });
    return false;
}

function showWaterAdditionalParameters() {
    
    if($('#btn_showWaterAdditionalParameters').attr('data-view') == 1) {
        $('#table_constructor_water').find('.constructor__table_row').each(function(index, el) {      
            if ($(el).attr('data-main') == 0) {
                $(el).hide();
            }
        });
        
        $('#btn_showWaterAdditionalParameters').attr('data-view', 0);
        $('#btn_showWaterAdditionalParameters').html('РџРѕРєР°Р·Р°С‚СЊ РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РїР°СЂР°РјРµС‚СЂС‹');
    }
    else {
        $('#table_constructor_water').find('.constructor__table_row').each(function(index, el) {      
            if ($(el).attr('data-main') == 0) {
                $(el).show();
            }
        });
    
        $('#btn_showWaterAdditionalParameters').attr('data-view', 1);
        $('#btn_showWaterAdditionalParameters').html('РЎРєСЂС‹С‚СЊ РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РїР°СЂР°РјРµС‚СЂС‹');
    }
       
    
    // $('#btn_showWaterAdditionalParameters').hide();
}

var gbl_water_additional_index = 1;

function addWaterAdditionalParameters(count_his_water_parameter) {

    if(gbl_water_additional_index + parseInt(count_his_water_parameter) > 25) {
        alert('Р’С‹ РґРѕР±Р°РІРёР»Рё РјР°РєСЃРёРјР°Р»СЊРЅРѕРµ РєРѕР»-РІРѕ РґРѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹С… РїР°СЂР°РјРµС‚СЂРѕРІ.');
        return false;
    }
    
    var html = '<li class="constructor__table_row">'+
'<ul class="constructor__table_list">'+
    '<li class="constructor__table_item item_11">'+
        '<input name="constructor[add_his_water_parameter]['+gbl_water_additional_index+'][title]" value="">'+
    '</li>'+
    '<li class="constructor__table_item item_12">'+
        '<input name="constructor[add_his_water_parameter]['+gbl_water_additional_index+'][units]" value="">'+
    '</li>'+
    '<li class="constructor__table_item item_13">'+
        '<input name="constructor[add_his_water_parameter]['+gbl_water_additional_index+'][value]" value="">'+
    '</li>'+
    '<li class="constructor__table_item item_14"></li>'+
'</ul>'+
'</li>';
    
    gbl_water_additional_index++;
    
    $('#table_constructor_water').find('.constructor__table_body').append(html);
}

function getConstructorWaterSubsection(constructor_id, section_id, subsection_select_id = false) {
    
    if(document.getElementById('table_constructor_water') && !section_id) {
        if(!confirm('Р’С‹ СѓРІРµСЂРµРЅС‹? Р’СЃРµ СЂР°РЅРµРµ РІРІРµРґС‘РЅРЅС‹Рµ РїР°СЂР°РјРµС‚СЂС‹ РѕР±РЅСѓР»СЏС‚СЊСЃСЏ.')) {
            return false;
        }
    }    
    
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("section_id", section_id);
    fdata.append("constructor_id", constructor_id);

    $.ajax({
        url: "/constructor/get-water-subsection",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data) {
                $('#span_constructor_water_subsection').show();
                
                html = '<option class="default" value="">РќРѕСЂРјР°С‚РёРІ РєР°С‡РµСЃС‚РІР°</option>';
                styledHtml = '<li class="default" value="">РќРѕСЂРјР°С‚РёРІ РєР°С‡РµСЃС‚РІР°</li>';

                $.each(data, function(i, val) {
                    html +=
                        '<option value="' +
                        i +
                        '" ' +
                        (val == subsection_select_id ? "selected='selected'" : "") +
                        ">" +
                        val +
                        "</option>";

                    styledHtml +=
                        '<li value="' +
                        i +
                        '" ' +
                        (val == subsection_select_id ? "selected='selected'" : "") +
                        ">" +
                        val +
                        "</li>";
                });

                $("#constructor_water_subsection").html("");
                $("#constructor_water_subsection").append(html);

                $("#constructor_water_subsection")
                    .siblings(".jq-selectbox__dropdown")
                    .find("ul")
                    .html("");
                $("#constructor_water_subsection")
                    .siblings(".jq-selectbox__dropdown")
                    .find("ul")
                    .append(styledHtml);

                $("#constructor_water_subsection").trigger("refresh");
                
            } else {
                $('#span_constructor_water_subsection').hide();
                $('#span_constructor_water_block_items').html("");
            }
        },
        error: function(data) {
            //alert(data.responseJSON.message);
        }
    });
    return false;
}

function constructorInsertText4(text_type) {
    
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("key", text_type);
    fdata.append("add_nl2br", 1);
    fdata.append("add_nbsp", 1);

    $.ajax({
        url: "/ajax/get-option",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $('#constructor_text4').append(data.value);
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

function constructorGetUserFolders() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/constructor/get-user-folders",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            alert(data);
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

function removeProducts(to_type, $trigger, id) {
    var $trigger = $trigger || false;

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("to_type", to_type);

    //fdata.append('ids[]', id);

    $(
        "#" +
            (to_type == 1 ? "not_structure_products" : "structure_products") +
            ' .tableIe .table-row ul li[checked="checked"]'
    ).each(function() {
        fdata.append("ids[]", $(this).attr("data-id"));
    });

    $.ajax({
        url: "/constructor/remove-products",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (to_type == 3) {
                $trigger.parents("tr").remove();
            } else {
                alert(data.message);
                location.reload();
            }
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

function copyProducts(to_type, $trigger, id) {
    var $trigger = $trigger || false;

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("to_type", to_type);

    //fdata.append('ids[]', id);

    $("#structure_products .constructor__table_row .checkLabel")
        .find("input:checked")
        .each(function() {
            fdata.append(
                "ids[]",
                $(this)
                    .parents(".constructor__table_row")
                    .attr("product-id")
            );
        });

    $.ajax({
        url: "/constructor/copy-products",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (to_type == 3) {
                $trigger.parents("tr").remove();
                updateTotalTable();
            } else if (to_type == 2) {
                // alert(data.message);
                constructorUpdate($(".constructorAnaloguesButton").attr("data-id"), false);

                showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
                updateTotalTable();

                setTimeout(function() {
                    location.reload();
                }, 3000);
            } else {
                updateTotalTable();
                location.reload();
            }
        },
        error: function(data) {
            // alert(data.responseJSON.message);
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function sortProducts(type) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $(
        "#" +
            (type == 1 ? "structure_products" : "not_structure_products") +
            " .tableIe .table-row ul li[data-id]"
    ).each(function() {
        fdata.append("ids[]", $(this).attr("data-id"));
    });

    $.ajax({
        url: "/constructor/sort-products",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            alert(data.message);
            //location.reload();
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

function updateConstructorItems($items, type) {
    $items.each(function(index, element) {
        if (type == "coeff") {
            var $qty = $(element).find(".local-value"),
                qty,
                $client_part_price = $(element).find(".client-price"),
                $price_total = $(element).find(".client-price-total");

            if ($qty.is("input")) {
                qty = parseFloat($qty.val());
            } else {
                qty = parseFloat($qty.text());
            }

            var coeff = parseFloat(
                    $(element)
                        .find(".local-coeff")
                        .val()
                ),
                self_price = parseFloat(
                    $(element)
                        .find(".local-price")
                        .attr("data-val")
                ),
                client_part_price = self_price * coeff,
                total_price = client_part_price * qty;

            $client_part_price.val(client_part_price.toFixed(2));
            $price_total.text(total_price.toFixed(2) + " Р ").attr("data-val", total_price);
        } else if (type == "count") {
            var $qty = $(element).find(".local-value");
            var qty = "";

            if ($qty.is("input")) {
                qty = parseFloat($qty.val());
            } else {
                qty = parseFloat($qty.text());
            }

            var self_price = parseFloat(
                    $(element)
                        .find(".local-price")
                        .attr("data-val")
                ),
                self_price_total = self_price * qty;

            $(element)
                .find(".local-price-total")
                .text(self_price_total.toFixed(2) + " Р ")
                .attr("data-val", self_price_total);

            var client_price = $(element)
                .find(".client-price")
                .val();

            if (client_price == "") {
                client_price = 0;
            } else {
                client_price = parseFloat(client_price);
            }

            var total_client_price = client_price * qty;

            $(element)
                .find(".client-price-total")
                .text(total_client_price.toFixed(2) + " Р ")
                .attr("data-val", total_client_price.toFixed(2));
        } else if (type == "price") {
            var $qty = $(element).find(".local-value"),
                qty;

            if ($qty.is("input")) {
                qty = parseFloat($qty.val());
            } else {
                qty = parseFloat($qty.text());
            }

            var price = parseFloat(
                $(element)
                    .find(".client-price")
                    .val()
            );

            if (price == "") {
                price = 0;
            }

            var total_client_price = qty * price,
                self_price = parseFloat(
                    $(element)
                        .find(".local-price")
                        .attr("data-val")
                ),
                coeff = price / self_price;

            $(element)
                .find(".client-price-total")
                .text(total_client_price.toFixed(2) + " Р ")
                .attr("data-val", total_client_price.toFixed(2));
            $(element)
                .find(".local-coeff")
                .val(coeff.toFixed(2));
        }
    });
    updateTotalTable();
}

function updateTotalTable() {
    var struct = {
        self_price: 0,
        price: 0,
        over_price: 0
    };

    $("#structure_products")
        .find("#tableIeToPlugin")
        .find("[product-id]")
        .each(function() {
            var self_price = parseFloat(
                    $(this)
                        .find("li.local-price-total")
                        .attr("data-val")
                ),
                price = parseFloat(
                    $(this)
                        .find("li.client-price-total")
                        .attr("data-val")
                );

            struct.self_price += self_price;
            struct.price += price;
        });

    struct.over_price = struct.price - struct.self_price;
    if (struct.price == 0) {
        struct.coeff = 0;
    } else {
        //struct.coeff = struct.over_price / struct.price * 100;
        struct.coeff = struct.price / struct.self_price;
    }

    $("#total_rent_table")
        .find(".struct-selfprice-field")
        .text(number_format(struct.self_price, 2, ".", " ") + " Р ");
    $("#total_rent_table")
        .find(".struct-price-field")
        .text(number_format(struct.price, 2, ".", " ") + " Р ");
    $("#total_rent_table")
        .find(".struct-overprice-field")
        .text(number_format(struct.over_price, 2, ".", " ") + " Р ");
    $("#total_rent_table")
        .find(".struct-coeff-field")
        .text(number_format(struct.coeff, 4, ".", " "));

    /**************************************/

    var unstruct = {
        self_price: 0,
        price: 0,
        over_price: 0
    };

    $("#not_structure_products")
        .find("[product-id]")
        .each(function() {
            var self_price = parseFloat(
                    $(this)
                        .find("li.local-price-total")
                        .attr("data-val")
                ),
                price = parseFloat(
                    $(this)
                        .find("li.client-price-total")
                        .attr("data-val")
                );

            unstruct.self_price += self_price;
            unstruct.price += price;
        });

    unstruct.over_price = unstruct.price - unstruct.self_price;

    if (unstruct.price == 0) {
        unstruct.coeff = 0;
    } else {
        unstruct.coeff = unstruct.price / unstruct.self_price;
        //unstruct.coeff = unstruct.over_price / unstruct.price * 100;
    }

    $("#total_rent_table")
        .find(".unstruct-selfprice-field")
        .text(number_format(unstruct.self_price, 2, ".", " ") + " Р ");
    $("#total_rent_table")
        .find(".unstruct-price-field")
        .text(number_format(unstruct.price, 2, ".", " ") + " Р ");
    $("#total_rent_table")
        .find(".unstruct-overprice-field")
        .text(number_format(unstruct.over_price, 2, ".", " ") + " Р ");
    $("#total_rent_table")
        .find(".unstruct-coeff-field")
        .text(number_format(unstruct.coeff, 4, ".", " "));

    var custom_total_price = 0;

    $("#table_add_product")
        .find(".constructor__table_body")
        .find(".constructor__table_row")
        .each(function() {
            if (
                $(this)
                    .find('li[type="result_price"]')
                    .attr("data-val")
            ) {
                var price = parseFloat(
                    $(this)
                        .find('li[type="result_price"]')
                        .attr("data-val")
                );

                if (price != "NaN") {
                    custom_total_price += price;
                }
            }
        });

    $("#total_rent_table")
        .find(".custom-price-field")
        .text(number_format(custom_total_price, 2, ".", " ") + " Р ");

    var total_selfprice = unstruct.self_price + struct.self_price,
        total_price = unstruct.price + struct.price + custom_total_price,
        total_overprice = unstruct.over_price + struct.over_price;
    //total_coeff = total_overprice / total_price * 100;
    //total_coeff = (total_selfprice != 0 ? total_price / total_selfprice : 0);

    $("#total_rent_table")
        .find(".total-selfprice-field")
        .text(number_format(total_selfprice, 2, ".", " ") + " Р ");
    $("#total_rent_table")
        .find(".total-price-field")
        .text(number_format(total_price, 2, ".", " ") + " Р ");
    $("#total_rent_table")
        .find(".total-overprice-field")
        .text(number_format(total_overprice, 2, ".", " ") + " Р ");
    //$('#total_rent_table').find('.total-coeff-field').text(total_coeff.toFixed(4));

    if ($(".constructorAnaloguesButton").length) {
        checkForAnaloguesConstructor($(".constructorAnaloguesButton"));
    }
}

function number_format(number, decimals = 0, dec_point = ".", thousands_sep = ",") {
    let sign = number < 0 ? "-" : "";

    let s_number = Math.abs(parseInt((number = (+number || 0).toFixed(decimals)))) + "";
    let len = s_number.length;
    let tchunk = len > 3 ? len % 3 : 0;

    let ch_first = tchunk ? s_number.substr(0, tchunk) + thousands_sep : "";
    let ch_rest = s_number.substr(tchunk).replace(/(\d\d\d)(?=\d)/g, "$1" + thousands_sep);
    let ch_last = decimals
        ? dec_point + (Math.abs(number) - s_number).toFixed(decimals).slice(2)
        : "";

    return sign + ch_first + ch_rest + ch_last;
}

function findAnalogueProductsForConstructor(id) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("constructor_id", id);

    $.ajax({
        url: "/constructor/find-analogue",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $("#blok-analogue").html(data.analogue);
        },
        error: function(data) {
            // alert(data.responseJSON.message);
        }
    });

    return false;
}

function constructorToOrder(obj) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", obj.id);
    fdata.append("order_id", obj.orderId);

    var $msg = $("#form-err");
    $msg.html("")
        .removeClass("_success")
        .hide();

    $.ajax({
        url: "/constructor/to-order",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $msg.html("Р”РѕР±Р°РІР»РµРЅРѕ РІ Р·Р°РєР°Р·")
                .addClass("_success")
                .show();
            setTimeout(function() {
                $msg.html("")
                    .removeClass("_success")
                    .hide();
            }, 3000);

            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            $msg.html(data.responseJSON.message).show();
            setTimeout(function() {
                $msg.html("").hide();
            }, 3000);

            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function constructorGetOrders(itemId) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("limit", 5);

    $.ajax({
        url: "/wishlist/get-orders",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            var current_orders = data.orders;
            var html = "";
            
            dispatcher({
                type: "CLOSE_POPUP_ALL"
            });
            
            var popUpList = $('[data-popup="orderActionList"] .orderActionPopup__body');
                dispatcher({
                    type: "OPEN_POPUP",
                    payload: "orderActionList"
                });

            if (current_orders.length > 0) {               

                for (var i = 0; i < current_orders.length; i++) {
                    var id = current_orders[i].id,
                        created = current_orders[i].created_at;

                    html +=
                        '<div class="choice-order-item" data-id="' +
                        id +
                        '">#' +
                        id +
                        " РѕС‚ " +
                        created +
                        "Рі</div>";
                }
            }
            
            html += '<br><div class="choice-order-item" data-id="new">Р’ РЅРѕРІС‹Р№ Р·Р°РєР°Р·</div>';
            
            if (current_orders.length > 0) {     
                html += '<br><div class="choice-order-item" data-id="">Р’ Р°РєС‚РёРІРЅС‹Р№ Р·Р°РєР°Р·</div>';
            }

            popUpList.html('');
            popUpList.append(html);

            $(".choice-order-item").off("click");

            $(".choice-order-item").on("click", function() {
                var id = $(this).attr("data-id");

                $(".choice-order-item").addClass("_disabled");
                constructorToOrder({ id: itemId, orderId: id });
            });
            
            
            // else {
            //     if (current_orders.length == 1) {
            //         var order = current_orders[0].id || false;
            //         wishlistToOrder(order);
            //     } else {
            //         $(".addnew")
            //             .find(".form-msg")
            //             .removeClass("_success")
            //             .text("")
            //             .hide();

            //         $("#kompred-popup-details10").hide();

            //         $(".addnew").show();

            //         $(".addnew")
            //             .find(".use-popup-btn")
            //             .removeClass("_disabled");
            //     }
            // }
        },
        error: function(data) {
            console.log(data.responseJSON.message);
            // $msg.html(data.responseJSON.message).show();
        }
    });

    return false;
}

function constructorProductsTo1C(itemId) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", itemId);

    $.ajax({
        url: "/constructor/products-to-1c",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $(".constructorSendEmail")
                .find(".popup-cross")
                .trigger("click");
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);        
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function updateConstructorImg() {
    var pluginIframe = window.top.frames["plugin_iframe"];
    var pluginContentWindow = pluginIframe.contentWindow;
    var gInstance = pluginContentWindow.gameInstance;

    gInstance.SendMessage(
        "FilterPluginIntegration",
        "messageToPlugin",
        '{"type": "image", "action": "email"}'
    );
    console.log(gInstance);
}

function constructorSendMail(id) {
    updateConstructorImg();

    setTimeout(function() {
        var fdata = new FormData();
        fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
        fdata.append("id", id);
        fdata.append("email_to", $("#constructor_email_to").val());

        var $msg = $("#kompred-popup-details3").find(".form-err");
        $msg.html("")
            .removeClass("_success")
            .hide();

        $.ajax({
            url: "/constructor/send-mail",
            type: "POST",
            data: fdata,
            contentType: false,
            dataType: "json",
            processData: false,
            success: function(data) {
                // $msg.html(data.message)
                //     .addClass("_success")
                //     .show();
                // $("#kompred-popup-details3")
                //     .find("#constructor_email_to")
                //     .val("");

                $(".constructorSendEmail")
                    .find(".popup-cross")
                    .trigger("click");
                showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
            },
            error: function(data) {
                // $msg.html(data.responseJSON.message).show();
                // showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
                $("#constructor_email_to").css("border-color", "red");
            }
        });

        return false;
    }, 1000);
}

/*
function constructorSendToUsers(id) {

    var fdata = new FormData();
    fdata.append('_csrf-frontend', $('meta[name="csrf-token"]').attr("content"));
    fdata.append('id', id);
    
	var users = [];
	$('._user-list-crtl').find('label').find('input').each(function() {
		if ($(this).prop('checked')) {
			var id = $(this).attr('data-id');
			fdata.append('user_ids[]', id);
		}
		
	})
	
	//fdata.append('user_ids[]', users);
	
        //$('.user_send_to_ids').each(function(){
        //    //@TODO РґРѕР±Р°РІРёС‚СЊ СЃ СѓС‡РµС‚РѕРј РІС‹РґРµР»РµРЅРЅС‹С… РїРѕР»СЊР·РѕРІР°С‚РµР»РµР№
        //    fdata.append('user_ids[]', $(this).attr('data-id'));
        //
        // });
       
	var $msg = $('.popup-users').find('.form-err');
	
	$msg.text('').removeClass('_success').hide();
      
    $.ajax({
        url : '/constructor/send-to-users',
        type: "POST",
        data : fdata,
        contentType: false,
        dataType: 'json',
        processData:false,
        success:function(data)
        {   
            //alert(data.message);
            //$('.popup-bg').trigger('click');
            $msg.text(data.message).addClass('_success').show();
           
        },
        error: function(data)
        {                                                                        
            $msg.html(data.responseJSON.message).show();
        }
    });   

    return false;
}*/

function constructorSendToUser(type) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", $(".block1").attr("data-id"));
    fdata.append("user_id", $("#" + type + "_id").val());
    fdata.append("type", type);

    var $msg = $("#form-err");

    $msg.html("")
        .removeClass("_success")
        .hide();

    if (main_err_timeout) clearTimeout(main_err_timeout);

    $.ajax({
        url: "/constructor/send-to-user",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            $msg.html(data.message)
                .addClass("_success")
                .show();
            main_err_timeout = setTimeout(function() {
                $msg.html("")
                    .removeClass("_success")
                    .hide();
            }, 3000);

            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $msg.html(data.responseJSON.message).show();
            main_err_timeout = setTimeout(function() {
                $msg.html("")
                    .removeClass("_success")
                    .hide();
            }, 3000);

            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function constructorPrint(id) {
    if (constructorUpdate(id)) {
        var pluginIframe = window.top.frames["plugin_iframe"];
        var pluginContentWindow = pluginIframe.contentWindow;
        var gInstance = pluginContentWindow.gameInstance;
        //console.log('{"type": "image", "action": "print"}');
        gInstance.SendMessage(
            "FilterPluginIntegration",
            "messageToPlugin",
            '{"type": "image", "action": "print"}'
        );
    }

    // РґР°Р»РµРµ СЃР»СѓС€Р°РµРј addEventListener
}

/*$(document).on('click', '#pushup6', function () {
    $('#kompred-popup-details6').fadeIn(600);
    $('#kompred-popup-details6').find('#wishlist_folder_name, #constructor_folder_name').val('');
    $('#kompred-popup-details6').find('.form-err').text('').hide();
  });*/

// ----------- WISHLIST --------------

function wishlistNewFolder(type) {
    var $popup;

    if (type == 1) {
        $popup = $("#kompred-popup-details6");
    } else {
        $popup = $(".kompred-popup-details4");
    }

    $popup
        .find(".form-err")
        .text("")
        .hide();

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    fdata.append(
        "title",
        $("#" + (type == 1 ? "wishlist_folder_name" : "wishlist_order_name")).val()
    );
    fdata.append("type", type);

    $popup
        .find(".form-err")
        .html("")
        .hide();

    $.ajax({
        url: "/wishlist/new-folder",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            html =
                '<tr style="width:100%"><td><span style="width:100px"><a href="' +
                data.url +
                '">' +
                data.title +
                '</a> (0)</span></td><td><table cellpadding="0" cellspacing="0" class="actions"><tr data-id="' +
                data.id +
                '" data-title="' +
                data.title +
                '"><td class="pushup44 edit"><i class="wish-edit"></i></td><td class="remove pushup7"><i class="wish-remove"></i></td></tr></table></td></tr>';

            if (type == 1) $("#wishlist_folder_list").append(html);
            else $("#wishlist_order_list").append(html);

            $popup.fadeOut();
            document.location.href = data.redirect;
        },
        error: function(data) {
            $popup
                .find(".form-err")
                .html(data.responseJSON.message)
                .show();
        }
    });

    return false;
}

// function addProductInWishlist(catalog_id, wishlist_id, $trigger) {
//     var wishlist_id = wishlist_id || false;
//     var $trigger = $trigger || false;

//     var fdata = new FormData();
//     fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
//     fdata.append("catalog_id", catalog_id);
//     fdata.append("wishlist_id", wishlist_id);

//     var count = $("#count_product").html();

//     if (!count) {
//         count = 1;
//     }

//     fdata.append("count", count);

//     $.ajax({
//         url: "/wishlist/product-add",
//         type: "POST",
//         data: fdata,
//         contentType: false,
//         dataType: "json",
//         processData: false,
//         success: function(data) {
//             showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
//         },
//         error: function(data) {
//             showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
//         }
//     });

//     return false;
// }

function addProductsInWishlist(products) {
    var fdata = new FormData(),
        counter = 0,
        $msg = $(".to-order-msg");

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    for (var key in products) {
        fdata.append("catalog[" + counter + "][id]", key);
        fdata.append("catalog[" + counter + "][count]", products[key]);
        counter++;
    }

    $msg.html("").hide();

    $.ajax({
        url: "/wishlist/products-add",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            // $msg.html(data.message).show();
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);

            // $("html,body").animate({ scrollTop: $(document).outerHeight() });

            // setTimeout(function() {
            //     $msg.html("").hide();
            // }, 4000);
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            // $msg.html(data.responseJSON.message).show();
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);

            // $("html,body").animate({ scrollTop: $(document).outerHeight() });

            // setTimeout(function() {
            //     $msg.html("").hide();
            // }, 4000);
        }
    });

    return false;
}

function wishlistDeleteFolder(id) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);

    $(".kompred-popup-details7, .kompred-popup-details44")
        .find(".form-err")
        .html("")
        .hide();

    $.ajax({
        url: "/wishlist/delete-folder",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            $(".popup-bg").trigger("click");

            $("#wishlist_order_list, #wishlist_folder_list")
                .find('tr[data-id="' + id + '"]')
                .parents("tr:first")
                .remove();
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $(".kompred-popup-details7, .kompred-popup-details44")
                .find(".form-err")
                .html(data.responseJSON.message)
                .show();
        }
    });

    return false;
}

function wishlistRenameFolder(id) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);
    fdata.append("new_name", $("#folder_new_name").val());
    fdata.append("folder_copy", $("#folder_copy").val());
    fdata.append("folder_rename", $("#folder_rename").val());

    $(".kompred-popup-details44")
        .find(".form-err")
        .html("")
        .hide();

    $.ajax({
        url: "/wishlist/rename-folder",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            //$('.popup-bg').trigger('click');

            //if ()
            /*$('#wishlist_order_list, #wishlist_folder_list').find('tr[data-id="'+id+'"]').parents('td:first').prev('td').find('a').each(function() {

                    if ($(this).find('b').length) {
                            $(this).find('b').html($('#folder_new_name').val());
                    } else {
                            $(this).html($('#folder_new_name').val());
                    }

            })*/
            location.reload();
        },
        error: function(data) {
            $(".kompred-popup-details44")
                .find(".form-err")
                .html(data.responseJSON.message)
                .show();
        }
    });

    return false;
}

function plusProductWishlist(id) {
    updateCountProductWishlist(id, "1");
    return false;
}

function minusProductWishlist(id) {
    var current = $('.number[name="product_count[' + id + ']"]')
        .find("input")
        .val();

    if (current > 1) {
        updateCountProductWishlist(id, "-1");
    }
    return false;
}

function updateCountProductWishlist(id, value) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);
    fdata.append("value", value);

    $.ajax({
        url: "/wishlist/update-count-product",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $("#product_total_" + id).html("");
            $("#product_total_" + id).html(data.format_total_product);
            //$('#order_total').html('РС‚РѕРі: '+data.format_total+' <span>Р </span>');
            //$('#blok-analogue').html('');
            //$('#blok-analogue').html(data.analogue);
            updateTotalWishlist(id);
        },
        error: function(data) {
            //alert(data.responseJSON.message);
        }
    });

    return false;
}

function updateTotalWishlist(id) {
    var $products = $("#tbody_withlist_table, #catalog__itemTable").find(".main-product"),
        price = 0,
        weight = 0,
        v3 = 0,
        qty = 0;

    $products.each(function() {
        var cur_qty =
                parseInt(
                    $(this)
                        .find(".order-value")
                        .val()
                ) || 0,
            cur_price =
                parseFloat(
                    $(this)
                        .find(".main-product-price")
                        .attr("data-count")
                ) || 0,
            cur_weight =
                parseFloat(
                    $(this)
                        .find(".main-product-weight")
                        .attr("data-count")
                ) || 0,
            cur_v3 =
                parseFloat(
                    $(this)
                        .find(".main-product-v3")
                        .attr("data-count")
                ) || 0;

        cur_price = cur_price * cur_qty;
        cur_weight = cur_weight * cur_qty;
        cur_v3 = cur_v3 * cur_qty;

        price += cur_price;
        weight += cur_weight;
        v3 += cur_v3;
        qty += cur_qty;

        if ($(this).attr("data-ev-id") == id) {
            $(this)
                .find(".main-product-price")
                .text(cur_price.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " Р ");
            $(this)
                .find(".main-product-weight")
                .text(cur_weight.toFixed(2) + " РєРі");
            $(this)
                .find(".main-product-v3")
                .html(cur_v3.toFixed(5) + " Рј<sup>3</sup>");
        }
    });

    $(".wishlist-result")
        .find(".result-price")
        .text(price.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ") + " Р ");
    $(".wishlist-result")
        .find(".result-weight")
        .text(weight.toFixed(2) + " РєРі");
    $(".wishlist-result")
        .find(".result-v3")
        .html(v3.toFixed(5) + " Рј<sup>3</sup>");
    $(".wishlist-result")
        .find(".result-qty")
        .text(qty);
}

function deleteProductWishlist(id, $trigger) {
    var fdata = new FormData();
    var $trigger = $trigger || false;
    var parentRow = false;
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);

    if ($trigger) {
        parentRow = $trigger.parents(".tableCasual__row");
    }

    $.ajax({
        url: "/wishlist/product-delete",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $("#items_tr_" + id).remove();
            updateTotalWishlist(id);

            if (parentRow != false) {
                parentRow.removeClass("tableCasual__row-selected");
            }

            checkForAnaloguesWishlist($(".matchGoodsButton"));
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

function withlistCopyItems(id, del) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("to_id", id);
    fdata.append("del", del);

    $("#withlist_table input:checkbox:checked").each(function() {
        fdata.append("ids[]", $(this).val());
    });

    $.ajax({
        url: "/wishlist/copy-items",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            location.reload();
        },
        error: function(data) {
            //alert(data.responseJSON.message);
        }
    });

    return false;
}

function eqGetOrders() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    // var $msg = $(".orders-choice").find(".form-err");
    // $(".choice-order-item").remove();

    // $msg.html("")
    //     .hide()
    //     .removeClass("_success");

    $.ajax({
        url: "/wishlist/get-orders",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.orders);	//id - РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ, РєРѕС‚РѕСЂС‹Р№ РЅСѓР¶РЅРѕ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊ Рё РѕС‚РїСЂР°РІР»СЏС‚СЊ РІ (wishlistToOrder) Рё created_at РґР°С‚Р° СЃРѕР·РґР°РЅРёСЏ Р·Р°РєР°Р·Р° РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ
            var current_orders = data.orders;

            dispatcher({
                type: "CLOSE_POPUP_ALL"
            });

            if (current_orders.length > 1) {
                // $(".orders-choice").show();
                // $("#kompred-popup-details77").hide();

                // var html = "";

                // for (var i = 0; i < current_orders.length; i++) {
                //     var id = current_orders[i].id,
                //         created = current_orders[i].created_at;

                //     html += '<div class="choice-order-item" data-id="' + id + '">#' + id + " РѕС‚ " + created + "Рі</div>";
                // }

                // $(html).insertBefore($msg);

                var html = "";

                var popUpList = $('[data-popup="orderActionList"] .orderActionPopup__body');
                dispatcher({
                    type: "OPEN_POPUP",
                    payload: "orderActionList"
                });

                for (var i = 0; i < current_orders.length; i++) {
                    var id = current_orders[i].id,
                        created = current_orders[i].created_at;

                    html +=
                        '<div class="choice-order-item" data-id="' +
                        id +
                        '">#' +
                        id +
                        " РѕС‚ " +
                        created +
                        "Рі</div>";
                }
                popUpList.html("");
                popUpList.append(html);

                $(".choice-order-item").off("click");

                $(".choice-order-item").on("click", function() {
                    var id = $(this).attr("data-id");

                    $(".choice-order-item").addClass("_disabled");

                    var products = {},
                        low_price = false,
                        $tab = $(".tab-item:visible");

                    if ($tab.find(".light._max-on").length) low_price = true;

                    $tab.find(".main-scheme").each(function() {
                        if ($(this).css("display") != "none") {
                            var id = $(this).attr("data-id"),
                                count = false;

                            if (low_price) {
                                count = parseInt($(this).attr("data-count-light"));
                            } else {
                                count = parseInt($(this).attr("data-count"));
                            }

                            if (typeof products[id] == "undefined") {
                                products[id] = count;
                            } else {
                                var new_count = products[id] + count;
                                products[id] = new_count;
                            }
                        }
                    });

                    addProducts(products, id, true);
                });
            }
            //     else {
            //     if (current_orders.length == 1) {
            //         var order = current_orders[0].id || false;
            //         //wishlistToOrder(order);

            //         var products = {},
            //             low_price = false,
            //             $tab = $(".tab-item:visible");

            //         if ($tab.find(".light._max-on").length) low_price = true;

            //         $tab.find(".main-scheme").each(function() {
            //             if ($(this).css("display") != "none") {
            //                 var id = $(this).attr("data-id"),
            //                     count = false;

            //                 if (low_price) {
            //                     count = parseInt($(this).attr("data-count-light"));
            //                 } else {
            //                     count = parseInt($(this).attr("data-count"));
            //                 }

            //                 if (typeof products[id] == "undefined") {
            //                     products[id] = count;
            //                 } else {
            //                     var new_count = products[id] + count;
            //                     products[id] = new_count;
            //                 }
            //             }
            //         });

            //         addProducts(products, order);
            //     } else {
            //         $(".addnew")
            //             .find(".form-msg")
            //             .removeClass("_success")
            //             .text("")
            //             .hide();

            //         $("#kompred-popup-details77").hide();

            //         $(".addnew").show();

            //         $(".addnew")
            //             .find(".use-popup-btn")
            //             .removeClass("_disabled");
            //     }
            // }
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            // $msg.html(data.responseJSON.message).show();
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function wishlistGetOrders() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    var $msg = $(".orders-choice").find(".form-err");
    $(".choice-order-item").remove();

    $msg.html("")
        .hide()
        .removeClass("_success");

    $.ajax({
        url: "/wishlist/get-orders",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.orders);	//id - РёРґРµРЅС‚РёС„РёРєР°С‚РѕСЂ, РєРѕС‚РѕСЂС‹Р№ РЅСѓР¶РЅРѕ РѕС‚РѕР±СЂР°Р¶Р°С‚СЊ Рё РѕС‚РїСЂР°РІР»СЏС‚СЊ РІ (wishlistToOrder) Рё created_at РґР°С‚Р° СЃРѕР·РґР°РЅРёСЏ Р·Р°РєР°Р·Р° РґР»СЏ РѕС‚РѕР±СЂР°Р¶РµРЅРёСЏ
            var current_orders = data.orders;

            if (current_orders.length > 1) {
                $(".orders-choice").show();
                $("#kompred-popup-details10").hide();

                var html = "";

                for (var i = 0; i < current_orders.length; i++) {
                    var id = current_orders[i].id,
                        created = current_orders[i].created_at;

                    html +=
                        '<div class="choice-order-item" data-id="' +
                        id +
                        '">#' +
                        id +
                        " РѕС‚ " +
                        created +
                        "Рі</div>";
                }

                $(html).insertBefore($msg);

                $(".choice-order-item").off("click");

                $(".choice-order-item").on("click", function() {
                    var id = $(this).attr("data-id");

                    $(".choice-order-item").addClass("_disabled");
                    wishlistToOrder(id, true);
                });
            } else {
                if (current_orders.length == 1) {
                    var order = current_orders[0].id || false;
                    wishlistToOrder(order);
                } else {
                    $(".addnew")
                        .find(".form-msg")
                        .removeClass("_success")
                        .text("")
                        .hide();

                    $("#kompred-popup-details10").hide();

                    $(".addnew").show();

                    $(".addnew")
                        .find(".use-popup-btn")
                        .removeClass("_disabled");
                }
            }
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $msg.html(data.responseJSON.message).show();
        }
    });

    return false;
}

function wishlistToOrder(order_id, choice) {
    var order_id = order_id || false,
        choice = choice || false;

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $("#withlist_table #tbody_withlist_table input:checkbox:checked").each(function() {
        fdata.append("ids[]", $(this).val());
    });

    $(".addnew")
        .find(".form-err")
        .removeClass("_success")
        .text("")
        .hide();

    if (order_id) {
        fdata.append("order_id", order_id);
    }

    fdata.append("type", $("input[name=order_activity]:checked").val());

    $("#kompred-popup-details10")
        .find(".form-err")
        .html("")
        .removeClass("_success")
        .hide();

    $.ajax({
        url: "/wishlist/to-order",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            if (choice) {
                $(".orders-choice")
                    .find(".form-err")
                    .addClass("_success")
                    .html("Р”РѕР±Р°РІР»РµРЅРѕ РІ Р·Р°РєР°Р·")
                    .show();
                $('.choice-order-item[data-id="' + order_id + '"]').remove();
                $(".choice-order-item").removeClass("_disabled");

                setTimeout(function() {
                    $(".orders-choice")
                        .find(".form-err")
                        .removeClass("_success")
                        .html("")
                        .hide();

                    if (!$(".choice-order-item").length) {
                        $(".orders-choice").fadeOut();
                    }
                }, 1500);
            } else {
                $("#kompred-popup-details10")
                    .find(".form-err")
                    .html(data.message)
                    .addClass("_success")
                    .show();
            }

            $(".addnew")
                .find(".form-err")
                .addClass("_success")
                .text(data.message)
                .show();

            $(".addnew")
                .find(".use-popup-btn")
                .addClass("_disabled");

            setTimeout(function() {
                $(".addnew").fadeOut();
            }, 1500);
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            if (choice) {
                $(".orders-choice")
                    .find(".form-err")
                    .html(data.responseJSON.message)
                    .show();
                $(".choice-order-item").removeClass("_disabled");
                setTimeout(function() {
                    $(".orders-choice")
                        .find(".form-err")
                        .removeClass("_success")
                        .html("")
                        .hide();
                }, 1500);
            } else {
                $("#kompred-popup-details10")
                    .find(".form-err")
                    .html(data.responseJSON.message)
                    .show();
            }

            $(".addnew")
                .find(".form-err")
                .text(data.responseJSON.message)
                .show();
        }
    });

    return false;
}

function wishlistToConstructor() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $("#withlist_table #tbody_withlist_table input:checkbox:checked").each(function() {
        fdata.append("ids[]", $(this).val());
    });

    fdata.append("type", $("input[name=constructor_activity]:checked").val());

    $("#kompred-popup-details9")
        .find(".form-err")
        .html("")
        .removeClass("_success")
        .hide();

    $.ajax({
        url: "/wishlist/to-constructor",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            $("#kompred-popup-details9")
                .find(".form-err")
                .html(data.message)
                .addClass("_success")
                .show();
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $("#kompred-popup-details9")
                .find(".form-err")
                .html(data.responseJSON.message)
                .show();
        }
    });

    return false;
}

// function wishlistSort() {
//     var fdata = new FormData();
//     fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
//     fdata.append("sort", $("#wishlist_sort").val());
//     fdata.append("id", $("#withlist_table").attr("data-id"));

//     $("#withlist_table tbody tr input:checkbox:checked").each(function() {
//         fdata.append("ids[]", $(this).val());
//     });

//     fdata.append("type", $("input[name=order_activity]:checked").val());

//     $.ajax({
//         url: "/wishlist/sort",
//         type: "POST",
//         data: fdata,
//         contentType: false,
//         dataType: "json",
//         processData: false,
//         success: function(data) {
//             if (data.html) {
//                 $("#tbody_withlist_table").html("");
//                 $("#tbody_withlist_table").append(data.html);
//                 $("#tbody_withlist_table").addClass('sorted');
//             }
//         },
//         error: function(data) {
//             alert(data.responseJSON.message);
//         }
//     });

//     return false;
// }

function validEMail(sEmail) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(sEmail);
}

function wishlistSendMail() {
    if ($("#wishlist_email_to").val() == "") {
        showSystemPopup("РћС€РёР±РєР°!", "Р’С‹ РЅРµ РІРІРµР»Рё Р°РґСЂРµСЃ СЌР»РµРєС‚СЂРѕРЅРЅРѕР№ РїРѕС‡С‚С‹.");
        return false;
    }

    if (validEMail($("#wishlist_email_to").val()) == false) {
        showSystemPopup("РћС€РёР±РєР°!", "РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ СЌР»РµРєС‚СЂРѕРЅРЅРѕР№ РїРѕС‡С‚С‹.");
        return false;
    }

    var fdata = new FormData();
    var id = $("#withlist_table").attr("data-id");

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);
    fdata.append("email_to", $("#wishlist_email_to").val());
    fdata.append("sort", $("#wishlist_sort").val());
    fdata.append("hide_price", $("#email_hide_price:checked").val() ? 1 : 0);
    fdata.append("is_last", $("#withlist_table").attr("data-last"));

    $("#withlist_table input:checkbox:checked").each(function() {
        fdata.append("ids[]", $(this).val());
    });

    $("#kompred-popup-details8")
        .find(".form-err")
        .html("")
        .removeClass("_success")
        .hide();

    $.ajax({
        url: "/wishlist/send-mail",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            $("#kompred-popup-details8")
                .find(".form-err")
                .html(data.message)
                .addClass("_success")
                .show();

            $(".wishlistSendEmail .popup-cross").trigger("click");

            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $("#kompred-popup-details8")
                .find(".form-err")
                .html(data.responseJSON.message)
                .show();

            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

main_err_timeout = false;

function wishlistSendFolder(type) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", $("#withlist_table").attr("data-id"));
    fdata.append("user_id", $("#" + type + "_id").val());
    fdata.append("type", type);

    if ($(".chooseItemInSelect").length) {
        chooseItemInSelectActiveDisableButton();
    }

    // var $msg = $(".bottom_wish").next(".form-err");

    // $msg.html("")
    //     .removeClass("_success")
    //     .hide();

    if (main_err_timeout) clearTimeout(main_err_timeout);

    $.ajax({
        url: "/wishlist/send-folder",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            // $msg.html(data.message)
            //     .addClass("_success")
            //     .show();
            // main_err_timeout = setTimeout(function() {
            //     $msg.html("")
            //         .removeClass("_success")
            //         .hide();
            // }, 3000);
            showSystemPopup("РЎРїР°СЃРёР±Рѕ", data.message);
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            // $msg.html(data.responseJSON.message).show();
            // main_err_timeout = setTimeout(function() {
            //     $msg.html("")
            //         .removeClass("_success")
            //         .hide();
            // }, 3000);
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

function upload_document() {
    var fdata = new FormData();

    var ins = $("input[id=upload_file]")[0].files.length;

    for (var x = 0; x < ins; x++) {
        fdata.append("upload_file[]", $("input[id=upload_file]")[0].files[x]);
    }

    //fdata.append('upload_file[]', $('input[id=upload_file]')[0].files[0]);
    //fdata.append('upload_file[]', $('input[id=upload_file]')[0].files[1]);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/documents",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            window.location =
                window.location.protocol + "//" + window.location.hostname + "/cabinet/documents";
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function delete_document(el) {
    // if (!confirm('Р’С‹ РґРµР№СЃС‚РІРёС‚РµР»СЊРЅРѕ С…РѕС‚РёС‚Рµ СѓРґР°Р»РёС‚СЊ С„Р°Р№Р» "' + file_name + '"?')) {
    //     return false;
    // }

    var id = $(el).attr("data-id");

    var file_name = $("#removeDocument").attr("data-name");

    var fdata = new FormData();

    fdata.append("id", id);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/cabinet/documents/delete",
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            window.location =
                window.location.protocol + "//" + window.location.hostname + "/cabinet/documents";
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

var product_count = 1;

$("#add_product").click(function() {
    //id = $('#kompred-popup-details44c').attr('data-id');
    //constructorDelete(id);

    var html = "";

    var new_count = product_count + 1;

    html += '<li class="constructor__table_row" data-product="false">';
    html += '<ul class="constructor__table_list" data="new" data-product="false">';
    html +=
        '<li class="constructor__table_item item_11"><input class="structure_table_text_input" data-type="title" name="constructor[product_new][' +
        new_count +
        '][title]" ></li>';
    html +=
        '<li class="constructor__table_item item_12"><input class="structure_table_text_input" data-type="price" name="constructor[product_new][' +
        new_count +
        '][price]" ></li>';
    html +=
        '<li class="constructor__table_item item_13"><input class="structure_table_text_input" data-type="count" name="constructor[product_new][' +
        new_count +
        '][count]" ></li>';
    html +=
        '<li class="structure_table_text_input constructor__table_item item_14" type="result_price">0.00 Р </li>';
    html +=
        '<li class="constructor__table_item item_15"><span class="btn_blue remove_structure_table_text" action="REMOVE_STRUCTURE_TABLE_TEXT_ITEM"><svg version="1.1" id="" xmlns="http://www.w3.org/2000/svg"' +
        'xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.88 22.88" style="enable-background:new 0 0 22.88 22.88;" xml:space="preserve">' +
        '<path style="fill:#07b159;" d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539' +
        "l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539" +
        "c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0" +
        'c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"></path>' +
        "</svg></span></li>";
    html += "</ul>";
    html += "</li>";

    product_count++;

    $("#table_add_product")
        .find(".constructor__table_body")
        .append(html);

    $("#table_add_product")
        .find(".constructor__table_head")
        .css({
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px"
        });

    // setTimeout(function() {
    //     adjustHeightBaron($('#table_add_product')[0]);

    //     window.baronJs.addProductConstructorTable.update();
    // }, 100)
});

// $(document).on("click", ".remove_structure_table_text", function() {
//     var id = $(this)
//         .parents(".constructor__table_list")
//         .attr("data-product");
//     deleteProductInConstructor(id, $(this), true);
// });

$(document).on("click", ".adaptKomprend .dirWrapper .text", function() {
    $(this)
        .parents(".dirWrapper")
        .toggleClass("_show");
});

$(document).on("change", ".local-name-const", function() {
    var $parent = $(this).parents(".constructor__table_row"),
        id = $parent.attr("product-id"),
        title = $(this).val();

    updateProductInConstructor(id, title, false, false, false, $(this), true);
});
$(document).on("change", ".client-price", function() {
    var $parent = $(this).parents(".constructor__table_row"),
        id = $parent.attr("product-id"),
        price = $(this).val();

    updateProductInConstructor(id, false, false, price, false, $(this), false);
});
$(document).on("change", ".local-value", function() {
    var $parent = $(this).parents(".constructor__table_row"),
        id = $parent.attr("product-id"),
        count = $(this).val();

    updateProductInConstructor(id, false, count, false, false, $(this), false);
});

$(document).on("change", ".local-coeff", function() {
    $(this).addClass("_changed");

    var $parent = $(this).parents("[product-id]"),
        id = $parent.attr("product-id"),
        markup = $(this).val();

    updateProductInConstructor(id, false, false, false, markup, $(this), false);
});

$(document).on("input", ".structure_table_text_input", function() {
    var type = $(this).attr("data-type");

    if (type == "price") {
        this.value = this.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    } else if (type == "count") {
        this.value = this.value.replace(/[^0-9.]/g, "").replace(/(.*)\./g, "$1");
    }
});

// $(document).on("blur", ".structure_table_text_input", function() {
//     var $tr = $(this).parents(".constructor__table_row"),
//         type = $(this).attr("data-type"),
//         result_price = 0;

//     if (type == "count" || type == "price") {
//         result_price = $tr.find('.structure_table_text_input[data-type="count"]').val() * $tr.find('.structure_table_text_input[data-type="price"]').val();
//         result_price = result_price.toFixed(2);
//         $tr.find('.structure_table_text_input[type="result_price"]')
//             .text(result_price + " Р ")
//             .attr("data-val", result_price);
//     }

//     if (
//         $tr.find('.structure_table_text_input[data-type="title"]').val() != "" &&
//         $tr.find('.structure_table_text_input[data-type="price"]').val() != "" &&
//         $tr.find('.structure_table_text_input[data-type="count"]').val() != ""
//     ) {
//         var title = $tr.find('.structure_table_text_input[data-type="title"]').val(),
//             price = $tr.find('.structure_table_text_input[data-type="price"]').val(),
//             count = $tr.find('.structure_table_text_input[data-type="count"]').val(),
//             id = false;

//         if ($tr.attr("data-product") != "false") {
//             id = $tr.attr("data-product");
//         }

//         addProductInConstructor(false, 3, $(this), title, price, count, id);
//     }

//     updateTotalTable();
// });

$(".documentFileInput").on("change", function(e) {
    var fileName;

    let that = $(this);
    let itemExt = that[0].files[0].type;
    let itemName = that[0].files[0].name;

    var Ext = itemName.split(".").pop();

    if (
        itemExt != "image/png" &&
        itemExt != "image/jpeg" &&
        itemExt != "application/pdf" &&
        itemExt != "application/vnd.ms-excel" &&
        itemExt != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        itemExt != "application/msword" &&
        itemExt != "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        itemExt != "text/plain" &&
        itemExt != "application/zip" &&
        itemExt != "application/x-rar-compressed" &&
        itemExt != "text/csv" &&
        itemExt != "application/octet-stream" &&
        itemExt != "multipart/x-zip" &&
        Ext != "csv"
    ) {
        showSystemPopup("РћС€РёР±РєР°", "РќРµРІРµСЂРЅС‹Р№ С„РѕСЂРјР°С‚ С„Р°Р№Р»Р°");
        that.val("");
        $(".documentsUpload__input_filesNames").text("");

        $(".documentsUpload__submit").removeClass("active");

        return false;
    }

    if ($("#upload_file")[0].files.length == 1) {
        fileName = $("#upload_file")[0].files[0].name;
    } else if ($("#upload_file")[0].files.length > 1) {
        var ins = $("#upload_file")[0].files.length;
        fileName = "Р§РёСЃР»Рѕ С„Р°Р№Р»РѕРІ: " + ins;
    } else {
        fileName = "";
    }

    var string = fileName;
    var length = 20;
    var trimmedString = string.substring(0, length);

    if (fileName.length > 20) {
        trimmedString = trimmedString + "...";
    }

    $(".documentsUpload__input_filesNames").text(trimmedString);

    $(".documentsUpload__submit").addClass("active");
});

$(document).on("click", ".pushup7", function() {
    var id = $(this)
        .parents("tr")
        .attr("data-id");
    $("#kompred-popup-details7").attr("data-id", id);
    $(".kompred-popup-details7").fadeIn(600);

    $(".kompred-popup-details7")
        .find(".form-err")
        .html("")
        .hide();
});

/*$(document).on('click', '.pushup7c', function () {

    var id = $(this).parents('tr').attr('data-id');
    $('#constructor-popup-details7-ok').attr('data-id', id);
    $('#constructor-popup-details7').fadeIn(600);

    $('#constructor-popup-details7').find('.form-err').html('').hide();
  });*/

$(document).on("click", ".pushup7СЃСЃ", function() {
    var id = $(this)
        .parents("tr")
        .attr("data-id");
    $("#constructor-popup-details8-ok").attr("data-id", id);
    $("#constructor-popup-details8").fadeIn(600);
    $("#constructor-popup-details8")
        .find(".form-err")
        .text("")
        .hide();
});

$(document).on("click", ".delete-new-btn", function() {
    $(".kompred-popup-details7, #constructor-popup-details8").fadeOut(600);
});
$(document).on("click", "#pushup8", function() {
    var id = $("#withlist_table").attr("data-id");
    $("#kompred-popup-details8-btn").attr("data-id", id);
    $("#kompred-popup-details8").fadeIn(600);
    $("#kompred-popup-details8")
        .find(".form-err")
        .html("")
        .hide();
});
$(document).on("click", "#pushup9", function() {
    $("#kompred-popup-details9").fadeIn(600);
    $("#kompred-popup-details9")
        .find(".form-err")
        .html("")
        .removeClass("_success")
        .hide();
});

$(document).on("click", "#pushup10", function() {
    $("#kompred-popup-details10").fadeIn(600);
    $("#kompred-popup-details10")
        .find(".form-err")
        .html("")
        .removeClass("_success")
        .hide();
});

$(document).on("click", "#pushup12", function() {
    $("#kompred-popup-details12").fadeIn(600);
});
$(".Our-partners").click(function() {
    $("#Our-partners-modal").fadeIn(600);
});

$(".pushup11").click(function() {
    $(".kompred-popup-details11").fadeIn(600);
});
$("#pushup13").click(function(e) {
    e.preventDefault();
    $("#kompred-popup-details13").fadeIn(600);
});

$(".order-out-btn").click(function(e) {
    e.preventDefault();
    $(this)
        .parents(".popup-wrapper")
        .find(".closer")
        .trigger("click");
});

function toggleImagesShowHide() {
    if ($(".imageDisplay #check-img-order").is(":checked")) {
        $(".catalog__itemTable")
            .find(".catalog__itemTable_text-image")
            .show();
    } else {
        $(".catalog__itemTable")
            .find(".catalog__itemTable_text-image")
            .hide();
    }
}

$(".imageDisplay #check-img-order").on("change", toggleImagesShowHide);
toggleImagesShowHide();

// Р’РёРґР¶РµС‚ РєР°С‚Р°Р»РѕРіР°
$(".category_tree_item").click(function() {
    id = $(this).attr("data-id");
    catalogWidgetGetProduct(id);

    if (!$(this).hasClass("no-subcat")) {
        // $(this).parent('li').addClass('active');
    }

    $(".category_tree_item").removeClass("_current");
    $(this).addClass("_current");
});

function catalogWidgetGetClear() {    
    $("#filter_search").val('');
    $("#filter_min_price").val(0);
    $("#filter_max_price").val($('#filter_max_price').attr('data-max'));
    getTypeAdditional('');
    $("#filter_types").val('');
    getTypesByChangeProduct('');
    $("#filter_products").val('');
    $("#filter_products").trigger('change');
    $("#filter_types").trigger('change');
    $("#filter_option").val('');
    $("#filter_option").trigger('change');
    $("#filter_availability").val('');    
    $("#filter_availability").trigger('change');
}

function catalogWidgetGetProduct(category, offset) {

    var category = category || false;
    var page = $("#div-catalog-list").attr("data_page");
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    if (category) {
        fdata.append("category", category);
    } else {
        fdata.append("search", $("#filter_search").val());
        //fdata.append("product", $("#filter_products").val());
        //fdata.append("type", $("#filter_types").val());
        fdata.append("min", $("#filter_min_price").val());
        fdata.append("max", $("#filter_max_price").val());
        //fdata.append("option", $("#filter_option").val());
        //fdata.append("availability", $("#filter_availability").val());
        $('#div_filter_storage').children().find(':checkbox').each(function() {
            fdata.append($( this ).attr("name"), $( this ).prop('checked'));            
        });
        $('#filter').children().find('select').each(function() {
            fdata.append($( this ).attr("name"), $( this ).val());                       
        });
    }

    if (page) {
        fdata.append("model", page);

        if (page == "wishlist") {
            fdata.append("model_id", $("#withlist_table").attr("data-id"));
        } else if (page == "constructor") {
            fdata.append("model_id", $(".block1.constructorContainer__inputs_row").attr("data-id"));
        }
    }

    var offset = offset || 0;

    fdata.append("limit", 0); //РµСЃР»Рё Р»РёРјРёС‚ 0 С‚Рѕ РІС‹РІРµРґСѓС‚СЃСЏ РІСЃРµ
    fdata.append("offset", offset);

    $(".category-params").each(function() {
        fdata.append(
            $(this)
                .find("select")
                .attr("name"),
            $(this)
                .find("select")
                .val()
        );
    });

    $.ajax({
        url: "/catalog/filter/get_product_by_widget",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $("#filter_product_list .account-history-content").html("");
            var html = "";
            var type = $("#filter_product_list").attr("data_type");

            $(".mainer-popup").animate({ scrollTop: 0 });

            if (data.items.length) {
                $.each(data.items, function(i, val) {
                    //РџСЂРѕРІРµСЂРєР° РЅР° С‚Рѕ РґРѕРІР»РµРЅ Р»Рё С‚РѕРІР°СЂ
                    var selectedClass =
                        Number(val[page + "_count"]) == 0 ? "" : "tableCasual__row-selected";

                    html +=
                        "<ul class='tableCasual__row " +
                        selectedClass +
                        "' data-id=" +
                        val.id +
                        " data-pageType=" +
                        page +
                        " data-type=" +
                        type +
                        " data-delete-id=" +
                        val[page + "_item_id"] +
                        ">";
                    html +=
                        '<li class="tableCasual__row_item item60"><a href="/catalog/' +
                        val.id +
                        "?product=" +
                        val.product +
                        "&type=" +
                        val.type_id +
                        "&category=" +
                        val.category_id +
                        '" class="order-inner">' +
                        val.name +
                        "</a></li>";
                    html +=
                        "<li class='tableCasual__row_item item61'>" +
                        (val.price ? val.price : 0.0) +
                        "&#8381;</li>";

                    if ($(".account-history-content._order").length) {
                        html +=
                            '<li class="tableCasual__row_item item62"><a class="light" img-src="/uploads/catalog/files/' +
                            val.file +
                            '" data-cat-id="' +
                            val.category_id +
                            '" data-id="' +
                            val.id +
                            '" data-type="' +
                            type +
                            '" onclick="return addProduct(' +
                            val.id +
                            ')">Р’ Р·Р°РєР°Р·</a></li>';
                    } else {
                        switch (page) {
                            case "wishlist":
                                var actionTriggerClass = "add-to-wishlist";
                                break;
                            case "order":
                                var actionTriggerClass = "add-to-order";
                                break;
                            case "constructor":
                                var actionTriggerClass = "add-to-constructor";
                                break;
                        }

                        // if (page == "wishlist") {
                        //         html +=
                        //         '<li class="tableCasual__row_item item62"><a class="light add-to-wishlist" data-id="' +
                        //         val.id +
                        //         '" data-type="' +
                        //         type +
                        //         '">Р’&nbsp;Р»РёСЃС‚&nbsp;Р¶РµР»Р°РЅРёР№</a></li>';
                        // } else if (page == "order") {
                        //     html +=
                        //         '<li class="tableCasual__row_item item62"><a class="light add-to-order" data-id="' +
                        //         val.id +
                        //         '" data-type="' +
                        //         type +
                        //         '" onclick="return addProduct(' +
                        //         val.id +
                        //         ')">Р’&nbsp;Р·Р°РєР°Р·</a></li>';
                        // } else if (page == "constructor") {
                        //     html +=
                        //         '<li class="tableCasual__row_item item62"><a class="light add-to-constructor" data-id="' +
                        //         val.id +
                        //         '" data-type="' +
                        //         type +
                        //         '">Р’&nbsp;РєРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ&nbsp;РљРџ</a></li>';
                        // }

                        // if (page == "wishlist") {
                        //     html +=
                        //         `
                        //         <li class="tableCasual__row_item item62 itemAmount">
                        //             <div class="light filterBtn filterBtn-popUpCatalog ${actionTriggerClass}"
                        //                 data-id="${val.id}"
                        //                 data-type="${type}"
                        //                 data-addtext="Р”РѕР±Р°РІРёС‚СЊ"
                        //                 data-deletetext="Р”РѕР±Р°РІР»РµРЅРѕ"
                        //             >
                        //                 ${selectedClass != "" ? 'Р”РѕР±Р°РІР»РµРЅРѕ' : 'Р”РѕР±Р°РІРёС‚СЊ'}
                        //             </div>
                        //         </li>
                        //     `;
                        // }

                        html += `
                            <li class="tableCasual__row_item item62 itemAmount">
                                <div class="minus" action="DECREMENT_POPUP_CATALOG_ITEM_COUNT">-</div>
                                    
                                <div class="number" name="product_count[${val.id}]">
                                    <input data-changeItemCountInPopUpCatalog type="text" value="${
                                        Number(val[page + "_count"]) === 0
                                            ? 1
                                            : Number(val[page + "_count"])
                                    }">
                                </div>

                                <div class="plus" action="INCREMENT_POPUP_CATALOG_ITEM_COUNT">+</div>

                                <div class="light ${actionTriggerClass} btnAddToList" data-id="${
                            val.id
                        }" data-type="${type}"></div>
                            </li>
                        `;
                    }

                    html += "</ul>";
                });
                $("#wishPopSearch").show();
            } else {
                $("#wishPopSearch").hide();
            }

            $("#filter_product_list .account-history-content").html(html);

            setTimeout(function() {
                if (
                    $('.popup[data-popup="addItemInConstructor"]').innerHeight() >
                    window.innerHeight
                ) {
                    $(".popups").css("overflow", "auto");
                    $('.popup[data-popup="addItemInConstructor"]').css({
                        top: 0,
                        margin: "20px 0",
                        transform: "translate(-50%, 0)"
                    });
                } else {
                    $('.popup[data-popup="addItemInConstructor"]').css({
                        top: "50%",
                        margin: "0",
                        transform: "translate(-50%, -50%)"
                    });
                }
            }, 0);

            $(".add-to-constructor").on("click", function() {
                var id = $(this).attr("data-id"),
                    type = $(this).attr("data-type");

                addProductInConstructor(id, type, $(this));
            });

            $(".add-to-wishlist").on("click", function() {
                var id = $(this).attr("data-id"),
                    withlist_id = $("#withlist_table").attr("data-id");

                addProductInWishlist(id, withlist_id, $(this));
            });

            var cat_text = $('.category_tree_item[data-id="' + category + '"]').html();

            $(".blue-title._catalog-title").html(cat_text);

            $(".order-search-kkp").val("");
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

$(".order-search-kkp-btn").on("click", function() {
    var query = $(".order-search-kkp").val();
    var page = $("#div-catalog-list").attr("data_page");

    if (query.length > 0) {
        if (document.order_search) document.order_search.abort();

        var fdata = new FormData();
        fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
        fdata.append("q", query);
        fdata.append("type", "kkp");
        fdata.append("page", page);

        document.order_search = $.ajax({
            url: "/search/catalog",
            type: "POST",
            data: fdata,
            contentType: false,
            dataType: "json",
            processData: false,
            success: function(data) {
                $("#filter_product_list .account-history-content").html("");
                var html = "";
                var type = $("#filter_product_list").attr("data_type");

                $(".mainer-popup").animate({ scrollTop: 0 });

                $("#filter_product_list .account-history-content").html(data.result);

                $(".add-to-constructor").on("click", function() {
                    var id = $(this).attr("data-id"),
                        type = $(this).attr("data-type");

                    addProductInConstructor(id, type, $(this));
                });

                $(".add-to-wishlist").on("click", function() {
                    var id = $(this).attr("data-id"),
                        withlist_id = $("#withlist_table").attr("data-id");

                    addProductInWishlist(id, withlist_id, $(this));
                });

                // var cat_text = $('.category_tree_item[data-id="' + category + '"]').html();

                // $(".blue-title._catalog-title").html(cat_text);
            },
            error: function(data) {}
        });
    } else {
        $order_search_result.html("");
    }
});

$(".order-search-kkp").on("keyup", function(e) {
    if (e.keyCode == 13) {
        $(this)
            .next(".order-search-kkp-btn")
            .trigger("click");
    }
});

//РџРѕРґР±РѕСЂ РѕР±РѕСЂСѓРґРѕРІР°РЅРёСЏ
// $(document).on("click", ".equip-to-wishlist", function() {
//     var products = {},
//         low_price = false,
//         $tab = $(".tab-item:visible");

//     if ($tab.find(".light._max-on").length) low_price = true;

//     $tab.find(".main-scheme").each(function() {
//         if ($(this).css("display") != "none") {
//             var id = $(this).attr("data-id"),
//                 count = false;

//             if (low_price) {
//                 count = parseInt($(this).attr("data-count-light"));
//             } else {
//                 count = parseInt($(this).attr("data-count"));
//             }

//             if (typeof products[id] == "undefined") {
//                 products[id] = count;
//             } else {
//                 var new_count = products[id] + count;
//                 products[id] = new_count;
//             }
//         }
//     });

//     addProductsInWishlist(products);
//     return false;
// });

$(document).on("click", ".total-summery .light", function() {
    var $tab = $(".tab-item:visible");

    if ($(this).hasClass("_max-on")) {
        $(this).removeClass("_max-on");

        $tab.find("*[data-summ]").each(function() {
            var value = $(this).attr("data-summ");

            $(this)
                .find(".price-value")
                .text(value);
        });
        $tab.find("*[data-count]").each(function() {
            var value = $(this).attr("data-count");

            $(this)
                .find(".count-value")
                .text(value);
        });

        $tab.find('.description-content[type="max"]').show();
        $tab.find('.description-content[type="low"]').hide();
        $tab.find('*[data-type="max"]').show();
        $tab.find('*[data-type="small"]').hide();

        $(".tab-item:visible .main-scheme-summ.extraSumm").text(
            "РС‚РѕРіРѕ: " +
                $(".tab-item:visible .main-scheme-summ.extraSumm").attr("data-summ") +
                " СЂСѓР±."
        );
    } else {
        $(this).addClass("_max-on");

        $tab.find("*[data-summ-light]").each(function() {
            var value = $(this).attr("data-summ-light");

            $(this)
                .find(".price-value")
                .text(value);
        });
        $tab.find("*[data-count-light]").each(function() {
            var value = $(this).attr("data-count-light");

            $(this)
                .find(".count-value")
                .text(value);
        });

        $tab.find('.description-content[type="max"]').hide();
        $tab.find('.description-content[type="low"]').show();
        $tab.find('*[data-type="max"]').hide();
        $tab.find('*[data-type="small"]').show();

        $(".tab-item:visible .main-scheme-summ.extraSumm").text(
            "РС‚РѕРіРѕ: " +
                $(".tab-item:visible .main-scheme-summ.extraSumm").attr("data-summ-light") +
                " СЂСѓР±."
        );
    }
});

$(document).on("click", ".scheme-list .open-tab1", function() {
    $(".scheme-list li").removeClass("active");
    $(this).addClass("active");
    $(".scheme-container > div").fadeOut(0);
    $(".scheme-container .tab1").fadeIn(0);
});

$(document).on("click", ".scheme-list .open-tab2", function() {
    $(".scheme-list li").removeClass("active");
    $(this).addClass("active");
    $(".scheme-container > div").fadeOut(0);
    $(".scheme-container .tab2").fadeIn(0);
});

$(document).on("click", ".scheme-list .open-tab3", function() {
    $(".scheme-list li").removeClass("active");
    $(this).addClass("active");
    $(".scheme-container > div").fadeOut(0);
    $(".scheme-container .tab3").fadeIn(0);
});

$(document).on("click", ".scheme-list .open-tab4", function() {
    $(".scheme-list li").removeClass("active");
    $(this).addClass("active");
    $(".scheme-container > div").fadeOut(0);
    $(".scheme-container .tab4").fadeIn(0);
});

$(document).on("click", ".scheme-list .open-tab5", function() {
    $(".scheme-list li").removeClass("active");
    $(this).addClass("active");
    $(".scheme-container > div").fadeOut(0);
    $(".scheme-container .tab5").fadeIn(0);
});

// Р”РѕР±Р°РІР»РµРЅРёРµ РЅРµСЃРєРѕР»СЊРєРёС… РїСЂРѕРґСѓРєС‚РѕРІ
function addProducts(products, order_id, choice) {
    var fdata = new FormData(),
        counter = 0,
        $msg = $(".to-order-msg"),
        order_id = order_id || false,
        choice = choice || false;

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    for (var key in products) {
        fdata.append("products[" + counter + "][id]", key);
        fdata.append("products[" + counter + "][count]", products[key]);

        counter++;
    }

    $msg.html("").hide();

    $(".addnew")
        .find(".form-err")
        .removeClass("_success")
        .text("")
        .hide();
    if (order_id) {
        fdata.append("order_id", order_id);
    }

    fdata.append("type", $("input[name=order_activity]:checked").val());
    $("#kompred-popup-details77")
        .find(".form-err")
        .html("")
        .removeClass("_success")
        .hide();

    $.ajax({
        url: "/order/products/add",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            // $msg.html(data.message).show();
            // setTimeout(function() {
            //     $msg.html("").hide();
            // }, 4000);

            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);

            if (choice) {
                $(".orders-choice")
                    .find(".form-err")
                    .addClass("_success")
                    .html("Р”РѕР±Р°РІР»РµРЅРѕ РІ Р·Р°РєР°Р·")
                    .show();
                $('.choice-order-item[data-id="' + order_id + '"]').remove();
                $(".choice-order-item").removeClass("_disabled");

                setTimeout(function() {
                    $(".orders-choice")
                        .find(".form-err")
                        .removeClass("_success")
                        .html("")
                        .hide();

                    if (!$(".choice-order-item").length) {
                        $(".orders-choice").fadeOut();
                    }
                }, 1500);
            } else {
                $("#kompred-popup-details77")
                    .find(".form-err")
                    .html(data.message)
                    .addClass("_success")
                    .show();
            }

            $(".addnew")
                .find(".form-err")
                .addClass("_success")
                .text(data.message)
                .show();

            $(".addnew")
                .find(".use-popup-btn")
                .addClass("_disabled");

            setTimeout(function() {
                $(".addnew").fadeOut();
            }, 1500);
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            // $msg.html(data.responseJSON.message).show();
            // setTimeout(function() {
            //     $msg.html("").hide();
            // }, 4000);

            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);

            if (choice) {
                $(".orders-choice")
                    .find(".form-err")
                    .html(data.responseJSON.message)
                    .show();
                $(".choice-order-item").removeClass("_disabled");
                setTimeout(function() {
                    $(".orders-choice")
                        .find(".form-err")
                        .removeClass("_success")
                        .html("")
                        .hide();
                }, 1500);
            } else {
                $("#kompred-popup-details77")
                    .find(".form-err")
                    .html(data.responseJSON.message)
                    .show();
            }

            $(".addnew")
                .find(".form-err")
                .text(data.responseJSON.message)
                .show();
        }
    });

    return false;
}

// $(document).on("click", ".equip-to-wishlist", function() {
//     var products = {},
//         low_price = false,
//         $tab = $(".tab-item:visible");

//     if ($tab.find(".light._max-on").length) low_price = true;

//     $tab.find(".main-scheme").each(function() {
//         if ($(this).css("display") != "none") {
//             var id = $(this).attr("data-id"),
//                 count = false;

//             if (low_price) {
//                 count = parseInt($(this).attr("data-count-light"));
//             } else {
//                 count = parseInt($(this).attr("data-count"));
//             }

//             if (typeof products[id] == "undefined") {
//                 products[id] = count;
//             } else {
//                 var new_count = products[id] + count;
//                 products[id] = new_count;
//             }
//         }
//     });

//     addProductsInWishlist(products);
//     return false;
// });

//Р”РѕР±Р°РІР»РµРЅРёРµ РЅРѕРІРѕРіРѕ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ

user_edit = false;
if (location.href.indexOf("change=true") != -1) {
    user_edit = true;
}

function client_user() {
    if ($("#birthday").val() == "") {
        $("#birthday").val($("#birthday").attr("value"));
    }

    var $form = $("#client_user"),
        error = false,
        $msg = $form.find(".form-msg");

    $msg.text("").hide();

    $("._req-select, .sex").removeClass("_error");

    if (!$(".sex").find("input:checked").length) {
        $(".sex").addClass("_error");
        error = true;
    }

    if (!$(".company").length) {
        $("._req-select").addClass("_error");
        error = true;
    }

    $form.find(".req").each(function() {
        if (
            user_edit &&
            ($(this).attr("name") == "password" || $(this).attr("name") == "password2")
        )
            return true;

        $(this).removeClass("_error");

        if ($(this).val() == "") {
            $(this).addClass("_error");
            error = true;
        }
    });

    if ($("#password").val() != $("#password2").val()) {
        $("#password, #password2").addClass("_error");

        error = true;
    }

    if (error) {
        return false;
    }

    var fdata = new FormData($("#client_user")[0]);
    var action = $("#client_user").attr("action");

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: action,
        type: "POST",
        data: fdata,
        //mimeType:"multipart/form-data",
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // $msg.text(data.message).show();
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            // $msg.text(data.responseJSON.message).show();
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function update_status_prise(user_id, status) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("user_id", user_id);
    fdata.append("status", status);

    $.ajax({
        url: "/cabinet/clients/user/main_catalog_type_update",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // alert(data.message);
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
            $("#price_status").html(data.status_text);
        },
        error: function(data) {
            // alert(data.responseJSON.message);
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

$("#main_catalog_type_price_coefficient").on("change", function() {
    openPopupClear("changeCoefPopup");
});

var coefVal_prev = $("#main_catalog_type_price_coefficient").val();

$("#chooseYourDestiny").on("click", function() {
    var checkbox = $('[name="activity"]:checked').attr("value");

    switch (checkbox) {
        case "changeAll":
            $(".clientsUser__coefs_item input").val(
                $("#main_catalog_type_price_coefficient").val()
            );
            break;
        case "changeSeveral":
            changeSeveral();
            break;
    }

    $('.popup[data-popup="changeCoefPopup"]')
        .find(".popup-cross")
        .trigger("click");
});

function changeSeveral() {
    var coefVal_next = $("#main_catalog_type_price_coefficient").val();

    $(".clientsUser__coefs_list input").each(function() {
        var val = $(this).val();

        if (val == coefVal_prev) {
            $(this).val(coefVal_next);
        }
    });

    coefVal_prev = coefVal_next;
}

$(".user #country").on("change", function() {
    var company_id = $(this)
        .find(":selected")
        .val();

    if (company_id == "null") return;

    var company_name = $(this)
        .find(":selected")
        .text();
    var form = $("#client_user");

    var element_HTML =
        "<div class='company'><input type='hidden' name='company[]' value='" +
        company_id +
        "'/><div class='company__name'>" +
        company_name +
        "</div><div class='company__remove'></div></div>";

    $(element_HTML).insertBefore($("#client_user").find(".form-container"));

    // СЃРµР»РµРєС‚ РІС‹Р±РѕСЂР° РєРѕРјРїР°РЅРёРё
    $("select#country").val("null");
    $("select#country")
        .find('option[value="' + company_id + '"]')
        .hide();

    showHideSelectCompany();
});

$("body").on("click", ".company__remove", function() {
    var id = $(this)
        .parent()
        .find("input")
        .val();
    var index = $(this).attr("data-index");

    $("select#country")
        .find('option[value="' + id + '"]')
        .show();

    showHideSelectCompany();

    $(this)
        .parent()
        .remove();
});

function showHideSelectCompany() {
    var select = $("#country");
    var styledSelect = select.siblings(".jq-selectbox__dropdown");

    select.find("option").each(function(index, value) {
        if ($(value).css("display") == "none") {
            var elHtml = $(value)
                .text()
                .trim()
                .toLowerCase();

            styledSelect.find("li").each(function(sIndex, sValue) {
                var sHtml = $(sValue)
                    .text()
                    .trim()
                    .toLowerCase();

                if (elHtml == sHtml) {
                    $(sValue).css("display", "none");
                }
            });
        } else {
            var elHtml = $(value)
                .text()
                .trim()
                .toLowerCase();

            styledSelect.find("li").each(function(sIndex, sValue) {
                var sHtml = $(sValue)
                    .text()
                    .trim()
                    .toLowerCase();

                if (elHtml == sHtml) {
                    $(sValue).css("display", "block");
                }
            });
        }
    });
}

function toggleHideOnBuy() {
    if ($("input#is_order:checked").length) {
        $(".hideOnBuy").hide();
    } else {
        $(".hideOnBuy").show();
    }
}

$("#is_order").on("change", function() {
    toggleHideOnBuy();
});

//FORMALIZATION
$(".radioDelivery").on("change", function() {
    customDeliveryDisplay();
});

function customDeliveryDisplay() {
    if ($("input#yourCompany:checked").length) {
        $(".hideIfNotYour").addClass("active");
    } else {
        $(".hideIfNotYour").removeClass("active");
    }
}

// $(".formalization__block-comment textarea").on("input", function() {
//     var that = $(this);

//     setTimeout(function() {
//         adjustHeight(that[0], 20);
//     }, 100);
// });

// $("#constructor_text1").on("input", function() {
//     var that = $(this);

//     setTimeout(function() {
//         adjustHeight(that[0], 20);
//     }, 100);
// });

// $("#constructor_text2").on("input", function() {
//     var that = $(this);

//     setTimeout(function() {
//         adjustHeight(that[0], 20);
//     }, 100);
// });

// $("#constructor_text3").on("input", function() {
//     var that = $(this);

//     setTimeout(function() {
//         adjustHeight(that[0], 20);
//     }, 100);
// });

// $("#constructor_text4").on("input", function() {
//     var that = $(this);

//     setTimeout(function() {
//         adjustHeight(that[0], 20);
//     }, 100);
// });

function validationOrderFormalization() {
    $('[data-autoOrderRequire]:visible').each(function() {
        if($(this).val().trim() === '') {
            $(this).addClass('input-error');
        } else {
            $(this).removeClass('input-error');
        }
    })
}

var newBlankAccess = false;
function saveOrderFormalization(id, isCredit, el) {
    if ($(el).hasClass("disabled")) return false;

    var checkRedirect = function() {
        return window.open("/cabinet/close-windows");
    };

    if (!newBlankAccess && isCredit == true) {
        b = checkRedirect();
        var a = checkRedirect();
        if (a === null) {
            showSystemPopup(
                "РЎРїР°СЃРёР±Рѕ!",
                "Р”Р»СЏ РєРѕСЂСЂРµРєС‚РЅРѕР№ СЂР°Р±РѕС‚С‹ СЃР°Р№С‚Р° СЂР°Р·СЂРµС€РёС‚Рµ РѕС‚РєСЂС‹С‚РёРµ РЅРѕРІС‹С… РѕРєРѕРЅ Р±СЂР°СѓР·РµСЂР°."
            );
            return false;
        } else {
            newBlankAccess = true;
        }
    }

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);
    fdata.append("client_id", $("#order_formalization_client_id").val());
    if ($("#order_formalization_inn").val()) {
        fdata.append("inn", $("#order_formalization_inn").val());
    }
    
    var delivery = $("input[name=delivery]:checked");
    var delivery_name = $("input[name='order_formalization_delivery_name']:visible");
    var comment = $("#order_formalization_comment");
    var is_autoorder = $("input[name=is_autoorder]:checked");
    var delivery_fio = $("input[name='order_formalization_delivery_fio']:visible");
    var delivery_passport = $("input[name='order_formalization_delivery_passport']:visible");   
    var delivery_phone = $("input[name='order_formalization_delivery_phone']:visible");
    var delivery_city = $("input[name='order_formalization_delivery_city']:visible");
    var delivery_inn = $("input[name='order_formalization_delivery_inn']:visible");
    var delivery_is_pay_recipient = $("input[name=order_formalization_delivery_is_pay_recipient]:visible");
    var delivery_pay_company = $("input[name='order_formalization_delivery_pay_company']:visible");
    var storage_id = $("select[name='storage_id']:visible");
    var delivery_recipient_type = $('select[name="orderPerson"]:visible');
    

    fdata.append("delivery", delivery.val());
    delivery_name.val() !== undefined && 
        delivery_name.val() !== "" && 
        fdata.append("delivery_name", delivery_name.val());

    fdata.append("comment", comment.html().trim().replace(/<br\s*[\/]?>/gi, "\n"));
    fdata.append("is_autoorder", is_autoorder.val());

    delivery_fio.val() !== undefined && 
        delivery_fio.val() !== "" && 
        fdata.append("delivery_fio", delivery_fio.val());

    delivery_passport.val() !== undefined && 
        delivery_passport.val() !== "" && 
        fdata.append("delivery_passport", delivery_passport.val());

    delivery_phone.val() !== undefined && 
        delivery_phone.val() !== "" && 
        fdata.append("delivery_phone", delivery_phone.val());

    delivery_city.val() !== undefined && 
        delivery_city.val() !== "" && 
        fdata.append("delivery_city", delivery_city.val());

    delivery_inn.val() !== undefined && 
        delivery_inn.val() !== "" && 
        fdata.append("delivery_inn", delivery_inn.val());

    delivery_is_pay_recipient.val() !== undefined && 
        delivery_is_pay_recipient.val() !== "" && 
        fdata.append("delivery_is_pay_recipient", Number(delivery_is_pay_recipient.is(':checked')));
   
    delivery_pay_company.val() !== undefined && 
        delivery_pay_company.val() !== "" && 
        fdata.append("delivery_pay_company", delivery_pay_company.val());
   
    delivery_recipient_type.val() !== undefined && 
        delivery_recipient_type.val() !== "" && 
        fdata.append("delivery_recipient_type", delivery_recipient_type.val());
   
    
    fdata.append("storage_id", storage_id.val());
    
    
    if (is_autoorder.length) {
        if($("input").is("#acc_management_autoorder")) {
            fdata.append("acc_management_autoorder", $("#acc_management_autoorder").val());
        } else {
            fdata.append("acc_management_autoorder", $("input[name=acc_management_autoorder]:checked").val());
        }

        if($('.content-catalogOrder').length) validationOrderFormalization();

    } else {
        fdata.append("acc_management_autoorder", $("#acc_management_autoorder").val());
    }
    
    if($('.input-error:visible').length) {
        $('html').animate({ 
            scrollTop: $('.input-error').eq(0).offset().top - $('.header').innerHeight() // РїСЂРѕРєСЂСѓС‡РёРІР°РµРј СЃС‚СЂР°РЅРёС†Сѓ Рє С‚СЂРµР±СѓРµРјРѕРјСѓ СЌР»РµРјРµРЅС‚Сѓ
        }, 500) // СЃРєРѕСЂРѕСЃС‚СЊ РїСЂРѕРєСЂСѓС‚РєРё

        $(el).removeClass("disabled");
        return false;
    }

    fdata.append("is_credit", isCredit == true ? 1 : 0);
    //@TODO РґРѕР±Р°РІРёС‚СЊ РґР°РЅРЅС‹Рµ Рѕ РїСЂРѕРґСѓРєС‚Р°С… (РєРѕР»-РІРѕ, Р°РєС‚СѓР»СЊРЅРѕСЃС‚СЊ)

    $(el).addClass("disabled");

    $.ajax({
        url: "/order/formalization/save",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.redirect) {
                document.location.href = data.redirect;
            }

            if (data.message) {
                showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
            }

            if (isCredit == true) {
                // window.open(currentUrl, "_blank");
                $("#tinkForm").trigger("submit");
            }

            //location.reload();
            $(el).removeClass("disabled");
        },
        error: function(data) {
            var currentUrl = window.location.href;

            if (isCredit == true) {
                // $('#tinkLink').attr('href', currentUrl);
                // $('#tinkLink').trigger('click');
                // var newWindow = window.open(currentUrl, "_blank");
                // newWindow.blur();
                // window.focus();
                //$('#tinkForm').trigger('submit');
            }

            if (data.redirect) {
                document.location.href = data.redirect;
            } else {
                showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
            }

            $(el).removeClass("disabled");
        }
    });

    return false;
}

// $(document).ready(function() {
//     $("#tinkForm").on("submit", function(e) {
//         e.preventDefault();

//         var form = $(this);
//         var fdata = new FormData(form[0]);
//         $.ajax({
//             url: form.attr("action"),
//             type: form.attr("method").toUpperCase(),
//             data: fdata,
//             contentType: false,
//             dataType: "json",
//             processData: false,
//             success: function(data) {
//                 console.log(data);
//             },
//             error: function(err) {
//                 console.log(err);
//             }
//         });
//     });
// });

// ---------------- CHAT ------------------

var time_sec = 6; // refresh time in seconds

if ($("#chat_users").length) {
    // chatGetMembers(true);

    setInterval(function() {
        chatGetMembers(true);
    }, 10 * 1000);
}

if (is_auth == 1 && $("#chat_messages").length === 0) {
    chatGetCountNotViewMessages();

    //РўР°Р№РјРµСЂ РЅР° С‚СЂРё РјРёРЅСѓС‚С‹
    setInterval(function() {
        chatGetCountNotViewMessages();
    }, 180 * 1000);
}

function chatSendMessage() {
    if (
        $(".dialog__form #chat_message")
            .text()
            .trim() === ""
    ) {
        return false;
    }

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    var user_to = $("#chat_users")
        .find('a[checked="checked"]')
        .attr("data-id");

    $(".dialog")
        .find(".form-err")
        .text("")
        .hide();

    if (!user_to) {
        $(".dialog")
            .find(".form-err")
            .text("Р’С‹ РЅРµ РІС‹Р±СЂР°Р»Рё РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ")
            .show();
        setTimeout(function() {
            $(".dialog")
                .find(".form-err")
                .text("")
                .hide();
        }, 2000);
        return false;
    }

    fdata.append("user_to", user_to);
    fdata.append("message", $("#chat_message").html());

    $.ajax({
        url: "/chat/send-message",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            //alert(data.message);
            var html = "";
            var messageText = data.data.message.trim().replace(/\n/g, "<br/>");
            html +=
                '<div class="dialog__message">' +
                '<div class="dialog__message_name admin">' +
                data.data.name +
                '</div>' +
                '<div class="dialog__message_wrap">' +
                '<div class="dialog__message_text">' +
                messageText +
                '</div>' +
                (data.data.time ? '<div class="dialog__message_time">' + data.data.time + '</div>' : '') +
                '</div>' +
                '</div>';            
            
            if(data.support_answer) {
                html +=
                '<div class="dialog__message">' +
                '<div class="dialog__message_name admin">РџРѕРјРѕС‰РЅРёРє РђС‚РµРє</div>';

                if(!data.support_answer.items) {
                    html += '<div class="dialog__message_wrap"><div class="dialog__message_text">Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, СЏ РЅРµ Р·РЅР°СЋ РѕС‚РІРµС‚Р°.</div></div>';
                } else {
                    $.each(data.support_answer.items, function(i, val) {
                            var Text = val.title.replace(/\n/g, "<br/>");

                            html +=

                                '<div class="dialog__message_wrap">' +
                                '<div class="dialog__message_text">' +
                                ((val.type != 'text') ? '<a href="javascript:void(0)" onclick="return chatGetSupport('+ ( (val.type == 'category') ? val.id : 'false, '+val.id ) +')">' : '') +
                                Text +
                                ((val.type != 'text') ? '</a>' : '') +
                                '</div>' +                           
                                '</div>';

                        });
                }                      
                
                html += '</div>';
            }
            
            $("#chat_messages").append(html);

            setTimeout(updateChatScrollTrack, 0);

            $("#chat_message").html("");

            // adjustHeight($("#chat_message")[0], 10);

            // $("#chat_messages").scrollTop($(document).outerHeight() * 2);
            $("#chat_messages").scrollTop($("#chat_messages").prop("scrollHeight"));

            // $("#chat_message").on("input", function() {
            //     adjustHeight($("#chat_message")[0], 10);
            // });
        },
        error: function(data) {
            //alert(data.responseJSON.message);
            $(".dialog")
                .find(".form-err")
                .text(data.responseJSON.message)
                .show();

            setTimeout(function() {
                $(".dialog")
                    .find(".form-err")
                    .text("")
                    .hide();
            }, 2000);
        }
    });

    return false;
}

var initialChatLoad = true;

//РџРѕР»СѓС‡РµРЅРёРµ СЃРїРёСЃРєР° СЋР·РµСЂРѕРІ РІ С‡Р°С‚Рµ
function chatGetMembers(only_update_count) {
    var only_update_count = only_update_count || false;

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/chat/get-members",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.count_users) {
                if (!only_update_count) {
                    $("#count_users").html("");
                    $("#count_users").append(data.count_users);
                }
            }

            if (data.users) {
                if (only_update_count) {
                    //РћС‚РѕР±СЂР°Р¶РµРЅРёСЏ РЅРµРїСЂРѕС‡РёС‚Р°РЅС‹С… СЃРѕРѕР±С‰РµРЅРёР№ СЋР·РµСЂРѕРІ, РєСЂРѕРјРµ Р°РєС‚РёРІРЅРѕРіРѕ
                    if (data.users.length > 1) {
                        data.users.map(function(el, i) {
                            if (Number(el.count)) {
                                var allUsers = $(".chatSide__users_item");
                                var userHasUnreadMessage = $("#chat_users")
                                    .find('a[data-id="' + el.id + '"]')
                                    .parents(".chatSide__users_item");

                                var firstUser = allUsers.eq(0);

                                var userEl = $("#chat_users")
                                    .find('a[data-id="' + el.id + '"]')
                                    .not('[checked="checked"]');

                                var numberEl = userEl.find(".number");

                                numberEl.text(el.count);
                                userHasUnreadMessage.addClass("chatSide__users_item-unreadMessage");
                                numberEl.show();

                                //Р•СЃР»Рё СЋР·РµСЂРѕРІ Р±РѕР»СЊС€Рµ РѕРґРЅРѕРіРѕ С‚Рѕ СЋР·РµСЂРѕРІ РѕС‚ РєРѕС‚РѕСЂС‹С… РїСЂРёС€Р»Рё СЃРѕРѕР±С‰РµРЅРёСЏ РїРµСЂРµРјРµС‰Р°СЋ РЅР° РІРµСЂС… СЃРїРёСЃРєР°
                                if (allUsers.length > 1) {
                                    $("#chat_users")[0].insertBefore(
                                        userHasUnreadMessage[0],
                                        firstUser[0]
                                    );
                                }
                            }
                        });
                    }
                } else {
                    //РґР»СЏ РЅР°С‡Р°Р»Р° СЃРѕСЂС‚РёСЂСѓРµРј СЋР·РµСЂРѕРІ, С‡С‚Рѕ Р±С‹ РїРµСЂРІС‹РјРё С€Р»Рё СЋР·РµСЂС‹ СЃ СЃРѕРѕР±С‰РµРЅРёСЏРјРё
                    var usersSort = data.users.sort(function(a, b) {
                        return Number(a.count) < Number(b.count) ? 1 : -1;
                    });

                    var html = "";
                    $.each(usersSort, function(i, val) {
                        html +=
                            '<p class="chatSide__users_item ' +
                            (Number(val.count) && "chatSide__users_item-unreadMessage") +
                            '"> <a href="javascript:void(0)" data-id="' +
                            val.id +
                            '" onclick="return cycleGetUserMessage(' +
                            val.id +
                            ');"><span class="chatSide__users_name">' +
                            val.name +
                            '</span><span class="number" style="display:' +
                            (Number(val.count) ? "block" : "none") +
                            '">' +
                            val.count +
                            "</span></a></p>";
                    });
                    
                    //if(site != 'prod') {
                        html += '<p class="chatSide__users_item 0"><a href="javascript:void(0)" data-id="support" onclick="return cycleGetUserMessage(\'support\');"><span class="chatSide__users_name">РџРѕРјРѕС‰РЅРёРє РђС‚РµРє</span><span class="number" style="display:none">0</span></a></p>';
                    //}

                    $("#chat_users").html("");
                    $("#chat_users").append(html);

                    if (initialChatLoad == true) {
                        $(".chatSide__users_item:first-child")
                            .find("a")
                            .trigger("click");
                        initialChatLoad = false;
                    }
                }
            }
            //alert(data.message);
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

userMessageInterval = false;

function cycleGetUserMessage(user_id) {
    var user = $('.chatSide__users_item a[data-id="' + user_id + '"]').parents(
        ".chatSide__users_item"
    );

    if (user.is(".chatSide__users_item-unreadMessage")) {
        user.removeClass("chatSide__users_item-unreadMessage");
    }

    var getUserMessageTimer = 10 * 1000;

    if (userMessageInterval) clearInterval(userMessageInterval);

    if(user_id == 'support') {
        chatGetSupport(0, false, true);
        //$(".dialog__form").hide();
    }
    else {
        //$(".dialog__form").show();
        
        chatGetMessagesByUser(user_id);

        if ($("#chat_messages").length) {
            userMessageInterval = setInterval(function() {
                chatGetMessagesByUser(user_id);
            }, getUserMessageTimer);
        }
    }
    // else {
    //     userMessageInterval = setInterval(function () {
    //         chatGetMessagesByUser(user_id);
    //     }, time_sec * 1000 * 10);
    // }

    var activeUserName = $('a[data-id="' + user_id + '"]')
        .find(".chatSide__users_name")
        .text();

    $(".chat__userName").text(activeUserName);

    $(".chatContainer").show();
}

function updateChatScrollTrack() {
    var messagesHeight = 0;

    $(".dialog__message").each(function() {
        var that = $(this);
        messagesHeight += parseInt(that.innerHeight());
    });

    if ($("#chat_messages").height() >= messagesHeight) {
        $("#chat_messages")
            .siblings(".customScroll__scroller_track")
            .hide();
    } else {
        $("#chat_messages")
            .siblings(".customScroll__scroller_track")
            .show();
    }
}

function chatGetSupport(category_parent_id = false, support_id = false, is_clear = false) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    if(category_parent_id !== false) {
        fdata.append("category_parent_id", category_parent_id);
    }

    fdata.append("support_id", support_id);

    $("#chat_users")
        .find("a")
        .each(function() {
            $(this).removeAttr("checked");
        });

    $("#chat_users")
        .find('a[data-id="support"]')
        .attr("checked", "checked");

    $.ajax({
            url: "/chat/get-support",
            type: "POST",
            data: fdata,
            contentType: false,
            dataType: "json",
            processData: false,
            success: function(data) {
                var html = '';   
                
                if (data.user_variant) {
                     html +=
                        '<div class="dialog__message mine">' +
                        '<div class="dialog__message_name">' +
                        data.user_variant.name +
                        "</div>" +
                        '<div class="dialog__message_wrap">' +
                        '<div class="dialog__message_text">' +
                        data.user_variant.message +
                        "</div>" +
                        "</div>" +
                        "</div>";
                }
                
                if (data.items) {
                                     
                    
                    html += '<div class="dialog__message"><div class="dialog__message_name">РџРѕРјРѕС‰РЅРёРє РђС‚РµРє</div>';

                    if(!category_parent_id && !support_id) {
                        html += '<br>РќР°РїРёС€РёС‚Рµ РєР°РєР°СЏ РїСЂРѕР±Р»РµРјР° РІР°СЃ РёРЅС‚РµСЂРµСЃСѓРµС‚. РР»Рё РІС‹Р±РµСЂРёС‚Рµ РёРЅС‚РµСЂРµСЃСѓСЋС‰РёР№ РІР°СЃ РІРѕРїСЂРѕСЃ РёР· СЃРїРёСЃРєР° РЅРёР¶Рµ.<br>';
                    }

                    $.each(data.items, function(i, val) {
                        var Text = val.title.replace(/\n/g, "<br/>");

                        html +=
                                                      
                            '<div class="dialog__message_wrap">' +
                            '<div class="dialog__message_text">' +
                            ((val.type != 'text') ? '<a href="javascript:void(0)" onclick="return chatGetSupport('+ ( (val.type == 'category') ? val.id : 'false, '+val.id ) +')">' : '') +
                            Text +
                            ((val.type != 'text') ? '</a>' : '') +
                            '</div>' +                           
                            '</div>';
                        
                    });
                                        
                    html +=  '</div>';
               
                    if(is_clear) {
                        $("#chat_messages").html("");
                    }
                
                    $("#chat_messages").append(html);
                    setTimeout(updateChatScrollTrack, 0);

                    $("#chat_messages").scrollTop($("#chat_messages").prop("scrollHeight"));
                }

            },
            error: function(data) {
                alert(data.responseJSON.message);
            }
        });

        return false;
}

function chatGetMessagesByUser(user_id) {
    var fdata = new FormData();
    var count = 0; //РљРѕР»-РІРѕ РїРѕСЃР»РµРґРЅРёС… СЃРѕРѕР±С‰РµРЅРёР№, РµСЃР»Рё 0 С‚Рѕ РІСЃРµ.
    var is_not_view = 0; //1 - С‚РѕР»СЊРєРѕ С‚Рµ, РєРѕС‚РѕСЂС‹Рµ РЅРµ РїСЂРѕСЃРјРѕС‚СЂРµРЅС‹, 0 - РІСЃРµ
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("user_id", user_id);
    fdata.append("count", count);
    fdata.append("is_not_view", is_not_view);

    $("#chat_users")
        .find("a")
        .each(function() {
            $(this).removeAttr("checked");
        });

    $("#chat_users")
        .find('a[data-id="' + user_id + '"]')
        .attr("checked", "checked");

    $.ajax({
        url: "/chat/get-messages-by-user",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.messages) {
                var html = "";

                $.each(data.messages, function(i, val) {
                    var messageText = val.message.replace(/\n/g, "<br/>");

                    html +=
                        '<div class="dialog__message">' +
                        '<div class="dialog__message_name ' +
                        val.class +
                        '">' +
                        val.name +
                        "</div>" +
                        '<div class="dialog__message_wrap">' +
                        '<div class="dialog__message_text">' +
                        messageText +
                        "</div>" +
                        '<div class="dialog__message_time">' +
                        val.time +
                        "</div> " +
                        "</div>" +
                        "</div>";
                });

                $("#chat_messages").html("");
                $("#chat_messages").append(html);
                setTimeout(updateChatScrollTrack, 0);

                $("#chat_messages").scrollTop($("#chat_messages").prop("scrollHeight"));
            }

            var current_user_unread_count = parseInt(
                $("#chat_users")
                    .find('a[data-id="' + user_id + '"]')
                    .find('span[class="number"]')
                    .text()
            );

            //current_user_unread_count
            var all_unread = isNaN(Number($("#chat_count_message").text()))
                ? 0
                : Number($("#chat_count_message").text());

            var now = all_unread - current_user_unread_count;

            $("#chat_count_message").text(now);

            if (now <= 0) {
                $("#chat_count_message").hide();
            }

            $("#chat_users")
                .find('a[data-id="' + user_id + '"]')
                .find('span[class="number"]')
                .hide();
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

//РџРѕРёСЃРє РЅРµРїСЂРѕС‡РёС‚Р°РЅС‹С… СЃРѕРѕР±С‰РµРЅРёР№ Рё РѕС‚РѕР±СЂР°Р¶РµРЅРёРµ РёС… РІ РЅРёР¶РЅРµРј РїСЂР°РІРѕРј СѓРіР»Сѓ РЅР° РёРєРѕРЅРєРµ С‡Р°С‚Р°
function chatGetCountNotViewMessages() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "/chat/get-count-not-view-messages",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.count && data.count != 0) {
                $("#chat_count_message").html("");
                $("#chat_count_message").append(data.count);
                $("#chat_count_message").css("display", "flex");
            } else {
                $("#chat_count_message")
                    .html("")
                    .hide();
            }
        },
        error: function(data) {
            console.log(data.responseJSON.message);
        }
    });

    return false;
}

if ($("#dialog__wrap").length) {
    let that = $("#dialog__wrap").selector;

    let customBar =
        '<div class="customScroll__scroller_track">' +
        '<div class="customScroll__scroller_bar"></div>' +
        "</div>";

    $("#dialog__wrap").append(customBar);

    baron({
        root: that,
        scroller: "#chat_messages",
        bar: ".customScroll__scroller_bar",
        scrollingCls: "_scrolling",
        draggingCls: "_dragging"
    });
}

// $("#chat_message").on("input", function() {
//     adjustHeight($("#chat_message")[0], 10);
// });

// if ($("#chat_message").parents("form").length) {
//     let that = $("#chat_message").parents("form").selector;

//     let customBar = '<div class="customScroll__scroller_track">' + '<div class="customScroll__scroller_bar"></div>' + "</div>";

//     $("#chat_message")
//         .parents("form")
//         .append(customBar);

//     baron({
//         root: that,
//         scroller: "#chat_message",
//         bar: ".customScroll__scroller_bar",
//         scrollingCls: "_scrolling",
//         draggingCls: "_dragging"
//     });
// }

$(".chatSide__search").on("submit", function() {
    event.preventDefault();

    var text = $(".chatSide__search_input")
        .val()
        .trim()
        .toLowerCase();

    if (text != "") {
        $(".chatSide__users_item").each(function(index, el) {
            var that = $(this);
            var textContent = that
                .find(".chatSide__users_name")
                .text()
                .trim()
                .toLowerCase();

            if (textContent.includes(text)) {
                that.show();
            } else {
                that.hide();
            }
        });
    } else {
        $(".chatSide__users_item").show();
    }
});

$("#chat_message").on("keydown", function(e) {
    if (e.keyCode == 13) {
        if (e.shiftKey == 1 || e.metaKey) {
        } else {
            event.preventDefault();
            chatSendMessage();
            return false;
        }
    }
});

// $(".dialog__form form").keyup(function(event) {
//     event.preventDefault();

//     if (event.keyCode == 13 && !event.shiftKey && !event.metaKey) {
//         chatSendMessage();
//         return false;
//     }
// });

$(document).on("click", ".remove_no_structure", function() {
    var id = $(this)
        .parents("ul")
        .attr("data-product");
    deleteProductInConstructor(id, $(this));
});

$(document).on("blur", ".structure_table_text_input", function() {
    var $tr = $(this).parents("ul.constructor__table_list"),
        type = $(this).attr("data-type"),
        result_price = 0;

    if (type == "count" || type == "price") {
        result_price =
            parseFloat($tr.find('.structure_table_text_input[data-type="count"]').val()) *
            parseFloat($tr.find('.structure_table_text_input[data-type="price"]').val());
        result_price = isNaN(result_price) ? 0 : result_price.toFixed(2);

        $tr.find('.constructor__table_item[type="result_price"]')
            .text(result_price + " Р ")
            .attr("data-val", result_price);
    }

    if (
        $tr.find('.structure_table_text_input[data-type="title"]').val() != "" &&
        $tr.find('.structure_table_text_input[data-type="price"]').val() != "" &&
        $tr.find('.structure_table_text_input[data-type="count"]').val() != ""
    ) {
        var title = $tr.find('.structure_table_text_input[data-type="title"]').val(),
            price = $tr.find('.structure_table_text_input[data-type="price"]').val(),
            count = $tr.find('.structure_table_text_input[data-type="count"]').val(),
            id = false;

        if ($tr.attr("data-product") != "false") {
            id = $tr.attr("data-product");
        }

        addProductInConstructor(false, 3, $(this), title, price, count, id, true);
    }

    updateTotalTable();
});

function getStatData(type, user_id, from, to, item, filter_from, filter_to) {
    var fdata = new FormData();

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("type", type);
    fdata.append("user_id", user_id);
    fdata.append("from", from);
    fdata.append("to", to);
    fdata.append("filter_from", filter_from);
    fdata.append("filter_to", filter_to);
    $.ajax({
        url: "/cabinet/clients/get-stat-for-drill-down",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // alert(data.html);
            item.append(data.html);

            $(".clientsStatTable").each(function(index, el) {
                adjustHeight($(el).find(".scroller")[0], 40);
            });

            // adjustHeight($('.users_table').find('.scroller')[0], 40);
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

function getStatDataUsers(type, user_id, from, to, item) {
    var fdata = new FormData();

    let userId = [];

    $("[attr-user-id]").each(function() {
        userId.push($(this).attr("attr-user-id"));
    });

    var uniqueUsers = uniq(userId);

    let users = uniqueUsers.join(",");

    // let users = userId.join(',');

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("type", type);
    fdata.append("user_id", users);
    fdata.append("from", from);
    fdata.append("to", to);
    $.ajax({
        url: "/cabinet/clients/get-stat-for-drill-down",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // alert(data.html);
            item.append(data.html);

            $(".clientsStatTable").each(function(index, el) {
                adjustHeight($(el).find(".scroller")[0], 40);
            });

            // adjustHeight($('.users_table').find('.scroller')[0], 40);
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

$(".drill-down").on("click", function() {
    let that = $(this);

    var type = $(this).attr("attr-type");
    var user_id = $(this)
        .parents("tr:first")
        .attr("attr-user-id");
    var from = $(this)
        .parents("table")
        .attr("attr-from");
    var to = $(this)
        .parents("table")
        .attr("attr-to");

    if (that.find(".trInfo").length) {
        that.find(".trInfo").remove();
        $(".clientsStatTable").each(function(index, el) {
            adjustHeight($(el).find(".scroller")[0], 40);
        });

        // adjustHeight($('.users_table').find('.scroller')[0], 40);

        return false;
    }

    var filter_from =
        $("#date_from")
            .val()
            .trim() === ""
            ? $("#date_from")
                  .attr("value")
                  .trim()
            : $("#date_from")
                  .val()
                  .trim();
    var filter_to =
        $("#date_to")
            .val()
            .trim() === ""
            ? $("#date_to")
                  .attr("value")
                  .trim()
            : $("#date_to")
                  .val()
                  .trim();

    if (that.parents("#users_table").length) {
        return getStatDataUsers(type, user_id, from, to, that);
    } else if (that.parents("#stat_table").length) {
        return getStatData(type, user_id, from, to, that, filter_from, filter_to);
    }
});

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function findAnalogueProductsForWishlist(id) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("wishlist_folder_id", id);

    $.ajax({
        url: "/wishlist/find-analogue",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            openPopupClear("matchGoods");
            $(".matchPopupTable").html(data.analogue);
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

function setTableFilters() {}

table_filter = {
    zn: "",
    gp: "",
    name: "",
    inn: "",
    person: "",
    phone: "",
    address: "",
    manager: ""
};

$("input.control").on("keyup", function() {
    var search_name = $(this).attr("search-name");

    table_filter[search_name] = $(this).val();

    $("#users_table")
        .find(".itemRow")
        .each(function() {
            var $tr = $(this);

            $tr.show();

            var current_line = {
                zn: $tr.find('[search-name="zn"]').text(),
                gp: $tr.find('[search-name="gp"]').text(),
                name: $tr.find('[search-name="name"]').text(),
                inn: $tr.find('[search-name="inn"]').text(),
                person: $tr.find('[search-name="person"]').text(),
                phone: $tr.find('[search-name="phone"]').text(),
                address: $tr.find('[search-name="address"]').text(),
                manager: $tr.find('[search-name="manager"]').text()
            };

            for (var key in current_line) {
                var current_line_lower = current_line[key].toLowerCase();
                var table_filter_lower = table_filter[key].toLowerCase();

                if (
                    table_filter[key] != "" &&
                    current_line_lower.indexOf(table_filter_lower) == -1
                ) {
                    $tr.hide();
                    break;
                }
            }
        });
});

$(document).on("change", ".coofec", function() {
    openPopupClear("changeConstructorCoefPopup");
});

function constructorUpdateMarkup(id, type) {
    var wrapper = $('div[data-popup="changeConstructorCoefPopup"]');

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);
    fdata.append("activity", wrapper.find("input[name=activity]:checked").val());
    fdata.append("markup", $("#pushup5").val());

    $.ajax({
        url: "/constructor/update-markup",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            wrapper.find(".popup-cross").trigger("click");

            if (type == "all") {
                $(".local-coeff").val($("#pushup5").val());

                updateConstructorItems($(".local-coeff").parents("[product-id]"), "coeff");
            } else if (type == "default") {
                //$('.local-coeff').not('._changed').val($('#pushup5').val());

                //updateConstructorItems($('.local-coeff').not('._changed').parents('.table-row'), 'coeff');

                var current_value = parseFloat($('input[name="markup"]').attr("save-value"));

                $(".local-coeff").each(function() {
                    if (parseFloat($(this).val()) == current_value) {
                        $(this).val($("#pushup5").val());

                        updateConstructorItems($(this).parents("[product-id]"), "coeff");
                    }
                });
            }

            $("#pushup5").attr("save-value", $("#pushup5").val());
        },
        error: function(data) {
            //alert(data.responseJSON.message);
        }
    });

    return false;
}

$("#stat_table .textTip").on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
});

$(window).load(function() {
    var fixHelper = function(e, ui) {
        ui.children().each(function() {
            $(this).width($(this).width());
        });
        return ui;
    };
    // $("#sort tbody").sortable({
    //     helper: fixHelper
    // }).disableSelection();
    $(".personal").on("click", function() {
        var href = $(this).attr("href");

        if (href != "/cabinet") {
            $(".box-modal").arcticmodal();
        }
    });
    // $('.slidermain ul').bxSlider({
    //     mode: 'horizontal',
    //     slideMargin: 5,
    //     minSlides: 1,
    //     maxSlides: 1,
    //     moveSlides: 1,
    //     slideWidth: 840
    // });
    $(".add-pc").click(function(e) {
        e.preventDefault();
        if ($(".additional-rs-1").is(":hidden")) {
            $(".additional-rs-1").fadeIn(400);
        } else {
            if ($(".additional-rs-2").is(":hidden")) {
                $(".additional-rs-2").fadeIn(400);
                $(this).hide();
            }
        }

        //$(this).hide();
    });
    $(".closer").click(function() {
        $(".modals > div").fadeOut(400);
    });
    $(".popup-bg").click(function() {
        $(".modals > div").fadeOut(400);
    });

    $(".closer").click(function() {
        $("#Our-partners-modal").fadeOut(400);
    });
    $(".closer.wishlist").click(function() {
        location.reload();
    });
    $(".popup-bg").click(function() {
        $("#Our-partners-modal").fadeOut(400);
    });

    $(".open_reconciliation").click(function() {
        $(".reconciliation-popup").fadeIn(600);
    });
    // $('.open-popup-details').click(function () {
    //     $('.inform-popup').fadeIn(600);
    // });
    $(document).on("click", ".pushup2", function() {
        var data_type = $(this).attr("data-type");
        $("#filter_product_list").attr("data_type", data_type);
        $(".kompred-popup-details2").fadeIn(600);
    });

    $(document).on("click", "#pushup1", function() {
        var id = $(".block1").attr("data-id");

        if (id) {
            constructorUpdate(id);
        }

        $("#kompred-popup-details").fadeIn(600);
        var $msg = $(".popup-users").find(".form-err");
        $msg.text("")
            .removeClass("_success")
            .hide();
        return false;
    });

    $(document).on("click", "#pushup3", function() {
        var id = $(".block1").attr("data-id");
        if (id && constructorUpdate(id)) {
            var pluginIframe = window.top.frames["plugin_iframe"];
            var pluginContentWindow = pluginIframe.contentWindow;
            var gInstance = pluginContentWindow.gameInstance;
            gInstance.SendMessage(
                "FilterPluginIntegration",
                "messageToPlugin",
                '{"type": "image", "action": "email"}'
            );

            $("#kompred-popup-details3-btn").attr("data-id", id);
            $("#kompred-popup-details3").fadeIn(600);
            $("#kompred-popup-details3")
                .find(".form-err")
                .html("")
                .removeClass("_success")
                .hide();
        }

        return false;
    });

    $(document).on("click", ".pushup4", function() {
        $(".kompred-popup-details4").fadeIn(600);

        $(".kompred-popup-details4")
            .find("#wishlist_order_name")
            .val("");

        $("#kompred-popup-details4")
            .find(".form-err")
            .text("")
            .hide();
    });

    $(document).on("click", ".pushup4c", function() {
        var title = $(this)
            .parents("tr")
            .attr("data-title");
        var id = $(this)
            .parents("tr")
            .attr("data-id");
        $("#folder_new_name").val(title);
        $("#constructor-popup-details44-ok").attr("data-id", id);

        $(".kompred-popup-details4").fadeIn(600);
    });

    $(document).on("click", ".pushup44", function() {
        var id = $(this)
            .parents("tr")
            .attr("data-id");
        var title = $(this)
            .parents("tr")
            .attr("data-title");
        var fdata = new FormData();

        $("#kompred-popup-details44").attr("data-id", id);
        $("#folder_new_name").val(title);

        fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
        fdata.append("no_id", id);

        $.ajax({
            url: "/wishlist/get-user-folders",
            type: "POST",
            data: fdata,
            contentType: false,
            cache: false,
            dataType: "json",
            processData: false,
            success: function(data) {
                var html = "<option></option>";
                $.each(data.folders, function(i, val) {
                    html += '<option value="' + val.id + '">' + val.title + "</option>";
                });

                $("#folder_rename").html("");
                $("#folder_rename").append(html);
                $("#folder_copy").html("");
                $("#folder_copy").append(html);

                //alert(data.message);
                $(".kompred-popup-details44").fadeIn(600);
                $(".kompred-popup-details44")
                    .find(".form-err")
                    .html("")
                    .hide();
            },
            error: function(data) {
                alert(data.responseJSON.message);
            }
        });

        return false;
    });

    $(document).on("click", ".pushup44c", function() {
        var folder_id = $("#div-folders").attr("data-id");
        var id = $(this)
            .parents("tr")
            .attr("data-id");
        var title = $(this)
            .parents("tr")
            .attr("data-title");
        var fdata = new FormData();

        $(".kompred-popup-details44c").attr("data-id", id);
        $("#constructor_new_name").val(title);

        fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
        fdata.append("no_id", id);

        $.ajax({
            url: "/constructor/get-user-folders",
            type: "POST",
            data: fdata,
            contentType: false,
            cache: false,
            dataType: "json",
            processData: false,
            success: function(data) {
                /*var html = '<option></option>';
                $.each(data.folders, function(i, val) {
                    html += '<option value="'+val.id+'">'+val.title+'</option>';
                });

                $('#constructor_rename').html('');
                $('#constructor_rename').append(html);
                $('#constructor_copy').html('');
                $('#constructor_copy').append(html);

                $('.kompred-popup-details44c').fadeIn(600);*/

                var html = "<option></option>";
                $.each(data.folders, function(i, val) {
                    html += '<option value="' + val.id + '">' + val.title + "</option>";
                });

                $("#constructor_rename").html("");
                $("#constructor_rename").append(html);
                $("#constructor_copy").html("");
                $("#constructor_copy").append(html);

                //alert(data.message);
                $(".kompred-popup-details44c").fadeIn(600);
                $(".kompred-popup-details44c")
                    .find(".form-err")
                    .html("")
                    .hide();
            },
            error: function(data) {
                alert(data.responseJSON.message);
            }
        });

        return false;
    });

    if ($(".block1").length) {
        var id = $(".block1").attr("data-id");

        $("#constructor-popup-details5-ok").attr("data-id", id);
    }

    // $(document).on('change', '#pushup5', function () {

    //   $('#kompred-popup-details5').fadeIn(600);
    // });

    $(document).on("click", "#pushup6", function() {
        $("#kompred-popup-details6").fadeIn(600);
        $("#kompred-popup-details6")
            .find("#wishlist_folder_name, #constructor_folder_name")
            .val("");
        $("#kompred-popup-details6")
            .find(".form-err")
            .text("")
            .hide();
    });

    $(document).on("click", ".pushup7", function() {
        var id = $(this)
            .parents("tr")
            .attr("data-id");
        $("#kompred-popup-details7").attr("data-id", id);
        $(".kompred-popup-details7").fadeIn(600);

        $(".kompred-popup-details7")
            .find(".form-err")
            .html("")
            .hide();
    });

    $(document).on("click", ".pushup7c", function() {
        var id = $(this)
            .parents("tr")
            .attr("data-id");
        $("#constructor-popup-details7-ok").attr("data-id", id);
        $("#constructor-popup-details7").fadeIn(600);

        $("#constructor-popup-details7")
            .find(".form-err")
            .html("")
            .hide();
    });

    $(document).on("click", ".pushup7СЃСЃ", function() {
        var id = $(this)
            .parents("tr")
            .attr("data-id");
        $("#constructor-popup-details8-ok").attr("data-id", id);
        $("#constructor-popup-details8").fadeIn(600);
        $("#constructor-popup-details8")
            .find(".form-err")
            .text("")
            .hide();
    });

    $(document).on("click", ".delete-new-btn", function() {
        $(".kompred-popup-details7, #constructor-popup-details8").fadeOut(600);
    });
    $(document).on("click", "#pushup8", function() {
        var id = $("#withlist_table").attr("data-id");
        $("#kompred-popup-details8-btn").attr("data-id", id);
        $("#kompred-popup-details8").fadeIn(600);
        $("#kompred-popup-details8")
            .find(".form-err")
            .html("")
            .hide();
    });
    $(document).on("click", "#pushup9", function() {
        $("#kompred-popup-details9").fadeIn(600);
        $("#kompred-popup-details9")
            .find(".form-err")
            .html("")
            .removeClass("_success")
            .hide();
    });

    $(document).on("click", "#pushup10", function() {
        $("#kompred-popup-details10").fadeIn(600);
        $("#kompred-popup-details10")
            .find(".form-err")
            .html("")
            .removeClass("_success")
            .hide();
    });

    $(document).on("click", "#pushup12", function() {
        $("#kompred-popup-details12").fadeIn(600);
    });
    $(".Our-partners").click(function() {
        $("#Our-partners-modal").fadeIn(600);
    });

    $(".pushup11").click(function() {
        $(".kompred-popup-details11").fadeIn(600);
    });
    $("#pushup13").click(function(e) {
        e.preventDefault();
        $("#kompred-popup-details13").fadeIn(600);
    });
    $(".order-out-btn").click(function(e) {
        e.preventDefault();
        $(this)
            .parents(".popup-wrapper")
            .find(".closer")
            .trigger("click");
    });

    // $('.filter > ul > li').click(function () {
    //     $(this).toggleClass('active');
    // });

    /* $('.filter > ul li').click(function (e) {
         e.stopPropagation();
 
         $('.filter > ul li').removeClass('active');
 
         $(this).parents('li').addClass('active');
         $(this).addClass('active');
         console.log($(this))
     });*/

    // $('.filter .subcategory-trigger').click(function (e) {
    // 	var $li = $(this).parent();

    // 	if ($li.hasClass('active')) {
    // 		$li.removeClass('active');

    // 		$li.find('li').removeClass('active');
    // 	} else {

    // 		$li.addClass('active');
    // 	}
    // })

    // $('.side-catalog__order .side-catalog a, .subcategory-trigger').on('click', function(event) {
    //     event.stopPropagation();
    //     $(this).parent().toggleClass('active');
    // })

    $(".tovar div div a").hover(
        function() {
            $(this).append("<span></span>");
        },
        function() {
            $("span", this).remove();
        }
    );
    $(".equipment .total-summery a:not(.light)").hover(
        function() {
            $(this).append("<span></span>");
        },
        function() {
            $("span", this).remove();
        }
    );

    //remove default input text
    // $('input[type=text], input[type=password]').each(function () {

    //     var default_value = this.value;
    //     $(this).focus(function () {
    //         if (this.value === default_value) {
    //             this.value = '';
    //         }
    //     });
    //     $(this).blur(function () {
    //         if (this.value === '') {
    //             this.value = default_value;
    //         }
    //     });
    // });

    // $('textarea#textarea').each(function () {
    //     var default_value = this.value;
    //     $(this).focus(function () {
    //         if (this.value === '') {
    //             this.value = default_value;
    //         }
    //     });
    // });
});

$("#is_order").click(function() {
    if ($(this).is(":checked")) {
        $(".filter-wrapper").addClass("filter-wrapper-disable");
    } else {
        $(".filter-wrapper").removeClass("filter-wrapper-disable");
    }
});

var coefVal_prev = $("#main_catalog_type_price_coefficient").val();

$("#main_catalog_type_price_coefficient").on("change", function() {
    $("#kompred-popup-details5").show(500);
});

$(".clientUserPopUp .closer, .clientUserPopUp .popup-bg").click(function() {
    $("#kompred-popup-details5").hide(500);
});

// $('#chooseYourDestiny').click(function() {
//     var checkbox = $('[name="activity"]:checked').attr('value');
//     switch(checkbox) {
//         case 'changeAll': $('.side-catalog .req').val($('#main_catalog_type_price_coefficient').val());
//                         break;
//         case 'changeSeveral': changeSeveral();
//                         break;
//         case 'cancel':  break;
//     }
//     $('#kompred-popup-details5').hide(500);
// });

// function changeSeveral() {
//     var coefVal_next = $('#main_catalog_type_price_coefficient').val();

//     $('.filter input.req').each(function() {
//         var val = $(this).val();
//         if(val == coefVal_prev) {
//             $(this).val(coefVal_next);
//         }
//     })
//     coefVal_prev = coefVal_next;
// }

/*function constructorUpdateMarkup(id, type) {

    var fdata = new FormData();
    fdata.append('_csrf-frontend', $('meta[name="csrf-token"]').attr("content"));
    fdata.append('id', id);
    fdata.append('activity', $('.popup[data-popup="changeConstructorCoefPopup"] input[name=activity]:checked').val());
    fdata.append('markup', $('#pushup5').val());

    $.ajax({
        url : '/constructor/update-markup',
        type: "POST",
        data : fdata,
        contentType: false,
        dataType: 'json',
        processData:false,
        success:function(data)
        {


            $('#kompred-popup-details5').fadeOut();

            if (type == 'all') {

                $('.local-coeff').val($('#pushup5').val());

                updateConstructorItems($('.local-coeff').parents('.table-row'), 'coeff');

            } else if (type == 'default') {

                //$('.local-coeff').not('._changed').val($('#pushup5').val());

                //updateConstructorItems($('.local-coeff').not('._changed').parents('.table-row'), 'coeff');

                var current_value = parseFloat($('input[name="markup"]').attr('save-value'));

                $('.local-coeff').each(function () {

                    if (parseFloat($(this).val()) == current_value) {

                        $(this).val($('#pushup5').val());

                        updateConstructorItems($(this).parents('.table-row'), 'coeff');
                    }

                });

            }
            $('#pushup5').attr('save-value', $('#pushup5').val());

        },
        error: function(data)
        {
            //alert(data.responseJSON.message);
        }
    });

    return false;
}*/

function startDiagramAnimation(el) {
    $(el).each(function(i, val) {
        var segments = !isNaN(Number($(val).data("segments")))
            ? Number($(val).data("segments"))
            : undefined;

        if (segments !== undefined && segments > 0) {
            //РЈРјРµРЅСЊС€Р°РµРј РЅР°
            segments = segments > 5 ? 5 : segments;

            for (var i = 0; i < segments; i++) {
                $(val)
                    .find(".circleDiagram__segment-animationParams")
                    .eq(i)
                    .removeClass("circleDiagram__segment");
            }
        }
    });
}

$(document).ready(function() {
    if ($(".circleDiagram").length) {
        startDiagramAnimation($(".circleDiagram"));
    }


    $('.selectTimeStart [action="REFRESH_SELECT"]').on('click', function() {
        $(this).parents('.customSelect').find('select').val('0:0');
        $(this).parents('.customSelect').find('select').trigger('change');
        $('.selectTimeEnd [action="REFRESH_SELECT"]').trigger('click');
    })

    $('.selectTimeStart select').on('change', function() {
        $('.selectTimeEnd [action="REFRESH_SELECT"]').trigger('click');

        var val = $(this).val();
        var valNumber = val ? Number(val.replace(':', '')) : 0;
        var endTimeSelect = $('select[name="order_formalization_time_end"]').parents('.customSelect');
        var endItem = endTimeSelect.find('.jq-selectbox__dropdown ul li');
        var range = 2 * 100; //2 - hour;
        
        
        if(valNumber) {
            endTimeSelect.removeClass('disableTimeEnd');
        } else {
            endTimeSelect.addClass('disableTimeEnd');
        }

        endItem.show();
        endItem.each(function(i, el) {
            var endValue = Number($(el).text().replace(':', ''));

            if(valNumber < endValue && endValue <= (valNumber + range)) {
                $(el).show();
            } else {
                $(el).css({
                    display: 'none'
                });
            }
        })

    });

    $(document).on('change input', '.input-error', function() {
        $(this).removeClass('input-error')
    });

    if ($(".tableFullWidth").length) {
        function autoWidthTableWithScrollBar(table) {
            if (table.find(".tableMobile__item").length) {
                return false;
            }

            var elemWidth = 0;

            var tableWrapper = table.parents(".tableFullWidth-wrapper"),
                scrollBarWidht = window.innerWidth - $("html")[0].offsetWidth,
                tablePadding = 20;

            var additionalOffset = tablePadding + scrollBarWidht;

            var tableItem = (function() {
                var arrElem = [
                    table.find(".constructor__table_head li"),
                    table.find(".tableCasual__row-head.tableDesktop__item .tableCasual__row_item"),
                    table.find(".tableWide__head"),
                    table.find(".search-client-control")
                ];

                return arrElem.filter(function(val) {
                    if (val.length) {
                        return val;
                    }
                });
            })();

            if (tableItem === undefined) return false;

            tableItem[0].each(function(i, el) {
                elemWidth += $(el).innerWidth();
            });

            if (
                elemWidth + table.offset().left + additionalOffset >=
                window.innerWidth - additionalOffset
            ) {
                table.css({
                    width: window.innerWidth - table.offset().left - additionalOffset
                });
            } else {
                table.css({
                    width: elemWidth + additionalOffset
                });
            }

            // РџРѕРєР° СѓСЃР»РѕРІРёРµРј РїРёС€РµРј С‚РѕР»СЊРєРѕ РґР»СЏ С‚Р°Р±Р»РёС†С‹ "РЎС‚Р°С‚РёСЃС‚РёРєР°"
            if ($("#stat_table").length) {
                if (elemWidth + tablePadding > tableWrapper.width()) {
                    table.find("tr").each(function(i, el) {
                        var firstElem = $(el).find(".clientsStatTable__column-1"),
                            secondElem = $(el).find(".clientsStatTable__column-2");
                        (pseudoElemFirst = $(el).find(".pseudoColumn-1")),
                            (pseudoElemSecond = $(el).find(".pseudoColumn-2"));

                        pseudoElemFirst.css({
                            width: firstElem.innerWidth() + 3,
                            height: firstElem.innerHeight(),
                            position: "absolute",
                            left: 0
                        });

                        pseudoElemSecond.css({
                            width: secondElem.innerWidth(),
                            height: secondElem.innerHeight(),
                            position: "absolute",
                            left: firstElem.innerWidth() + 3
                        });

                        $(".stat_table_header")
                            .find(pseudoElemFirst)
                            .css({
                                height: firstElem.innerHeight() + 1
                            });

                        $(".stat_table_header")
                            .find(pseudoElemSecond)
                            .css({
                                width: secondElem.innerWidth() - 1,
                                height: firstElem.innerHeight() + 1
                            });

                        $(".pseudoLine").css({
                            width: firstElem.innerWidth() + pseudoElemSecond.innerWidth() + 3
                        });
                    });

                    $("#users_table_tfoot .pseudoColumn-2").css({
                        width: $("#users_table_tfoot .clientsStatTable__column-2").innerWidth() - 1
                    });
                }
            }

            table
                .find(".constructor__table_head, .constructor__table_list, .tableDesktop__item")
                .css({
                    width: elemWidth + tablePadding
                });
        }

        $(".tableFullWidth").each(function(i, el) {
            autoWidthTableWithScrollBar($(el));
        });

        $(window).resize(function() {
            $(".tableFullWidth").each(function(i, el) {
                autoWidthTableWithScrollBar($(el));
            });
        });
    }

    //Р”РѕР±Р°РІР»РµРЅРёРµ РІ Р·Р°РєР°Р·
    $(document).on("click", ".add-to-order", function() {
        var id = $(this).attr("data-id"),
            count = $(this)
                .parents(".itemAmount")
                .find("input")
                .val();

        if (Number(count) && !isNaN(Number(count))) {
            addProduct(id, count, true);
        }
    });

    //Р‘РёРЅРґРёРј СЃРѕР±С‹С‚РёСЏ РІС‹Р·РѕРІР° С„СѓРЅРєС†РёРё РєРѕС‚РѕСЂР°СЏ РѕРїСЂРµРґРµР»СЏРµС‚ С‡С‚Рѕ РґРµР»Р°С‚СЊ СЃ С„РѕСЂРјРѕР№ РїСЂРё РёР·РјРµРЅРµРЅРёРµ value РІ input
    $(document).on("change", "[data-changeItemCountInPopUpCatalog]", function() {
        var rowParent = $(this).parents(".tableCasual__row");

        if ($(this).val() == "") {
            $(this).val(0);
        }

        if (rowParent.is(".tableCasual__row-selected")) {
            var pageType = rowParent.attr("data-pagetype");

            behaviorSwitcher({
                pageType: pageType,
                parent: rowParent,
                el: $(this)
            });
        }
    });

    $(".customSelect select").each(function(index, value) {
        if ($(value).val() != "" && $(value).val() != null) {
            $(value)
                .parents(".customSelect")
                .find(".customSelect__refresh")
                .show();
        }
    });

    $(document).on("click", ".adaptKomprend .dirWrapper .text", function() {
        $(this)
            .parents(".dirWrapper")
            .toggleClass("_show");
    });

    // $(document).on('change', '.local-name-const', function () {
    //     var $parent = $(this).parents('.table-row'),
    //         id = $parent.attr('product-id'),
    //         title = $(this).val();

    //     updateProductInConstructor(id, title, false, false, false, $(this), true);

    // });
    // $(document).on('change', '.client-price', function () {
    //     var $parent = $(this).parents('.table-row'),
    //         id = $parent.attr('product-id'),
    //         price = $(this).val();

    //     updateProductInConstructor(id, false, false, price, false, $(this), false);
    // });
    // $(document).on('change', '.local-value', function () {
    //     var $parent = $(this).parents('.table-row'),
    //         id = $parent.attr('product-id'),
    //         count = $(this).val();

    //     updateProductInConstructor(id, false, count, false, false, $(this), false);
    // });

    // $(document).on('change', '.local-coeff', function () {

    //     $(this).addClass('_changed');

    //     var $parent = $(this).parents('.table-row'),
    //         id = $parent.attr('product-id'),
    //         markup = $(this).val();

    //     updateProductInConstructor(id, false, false, false, markup, $(this), false);
    // });

    // $(document).on('input', '.local-coeff, #pushup5, .client-price', function () {
    //     this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    // });
    // $(document).on('input', '.local-value', function () {
    //     this.value = this.value.replace(/[^0-9.]/g, '').replace(/(.*)\./g, '$1');
    // });

    // $(document).on('click', '.remove_no_structure', function () {

    //     var id = $(this).parents('ul').first().attr('data-product');

    //     deleteProductInConstructor(id, $(this));
    // });

    // $(document).on('click', '.remove_structure_table_text', function () {

    //     var id = $(this).parents('tr').attr('data-product');

    //     deleteProductInConstructor(id, $(this));
    // });

    $(document).on("input", ".structure_table_text_input", function() {
        var type = $(this).attr("data-type");

        if (type == "price") {
            this.value = this.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
        } else if (type == "count") {
            this.value = this.value.replace(/[^0-9.]/g, "").replace(/(.*)\./g, "$1");
        }
    });

    // $(document).on('blur', '.structure_table_text_input', function () {
    //     var $tr = $(this).parents('tr'),
    //         type = $(this).attr('data-type'),
    //         result_price = 0;

    //     if (type == 'count' || type == 'price') {
    //         result_price = $tr.find('.structure_table_text_input[data-type="count"]').val() * $tr.find('.structure_table_text_input[data-type="price"]').val();
    //         result_price = result_price.toFixed(2);
    //         $tr.find('.structure_table_text_input[type="result_price"]').text(result_price+' Р ').attr('data-val', result_price);
    //     }

    //     if ($tr.find('.structure_table_text_input[data-type="title"]').val() != '' &&
    //         $tr.find('.structure_table_text_input[data-type="price"]').val() != '' &&
    //         $tr.find('.structure_table_text_input[data-type="count"]').val() != '') {

    //         var title = $tr.find('.structure_table_text_input[data-type="title"]').val(),
    //             price = $tr.find('.structure_table_text_input[data-type="price"]').val(),
    //             count = $tr.find('.structure_table_text_input[data-type="count"]').val(),
    //             id = false;

    //         if ($tr.attr('data-product') != 'false') {
    //             id = $tr.attr('data-product');
    //         }

    //         addProductInConstructor(false, 3, $(this), title, price, count, id);
    //     }

    //     updateTotalTable();
    // });

    $(document).on("click", ".equip-to-wishlist", function() {
        var products = {},
            low_price = false,
            $tab = $(".tab-item:visible");

        if ($tab.find(".light._max-on").length) low_price = true;

        $tab.find(".main-scheme").each(function() {
            if ($(this).css("display") != "none") {
                var id = $(this).attr("data-id"),
                    count = false;

                if (low_price) {
                    count = parseInt($(this).attr("data-count-light"));
                } else {
                    count = parseInt($(this).attr("data-count"));
                }

                if (typeof products[id] == "undefined") {
                    products[id] = count;
                } else {
                    var new_count = products[id] + count;
                    products[id] = new_count;
                }
            }
        });

        addProductsInWishlist(products);
        return false;
    });

    // order search

    var $order_search_result = $("#filter_product_list").find("._order");

    document.order_search = false;

    $(".order-search-btn").on("click", function() {
        var query = $(".order-search").val();

        if (query.length > 0) {
            if (document.order_search) document.order_search.abort();

            var fdata = new FormData();
            fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
            fdata.append("q", query);

            document.order_search = $.ajax({
                url: "/search/catalog",
                type: "POST",
                data: fdata,
                contentType: false,
                dataType: "json",
                processData: false,
                success: function(data) {
                    $order_search_result.html(data.result);

                    if (data.result.length > 0) {
                        var top = $(".blue-title._catalog-title").offset().top;
                        $("html, body").animate({ scrollTop: top });
                    }
                },
                error: function(data) {}
            });
        } else {
            $order_search_result.html("");
        }
    });

    $(".order-search").on("keyup", function(e) {
        if (e.keyCode == 13) {
            $(this)
                .next(".order-search-btn")
                .trigger("click");
        }
    });

    $(".order-search-kkp-btn").on("click", function() {
        var query = $(".order-search-kkp").val();
        var page = $("#div-catalog-list").attr("data_page");

        if (query.length > 0) {
            if (document.order_search) document.order_search.abort();

            var fdata = new FormData();
            fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
            fdata.append("q", query);
            fdata.append("type", "kkp");
            fdata.append("page", page);

            document.order_search = $.ajax({
                url: "/search/catalog",
                type: "POST",
                data: fdata,
                contentType: false,
                dataType: "json",
                processData: false,
                success: function(data) {
                    $("#filter_product_list .account-history-content").html("");
                    var html = "";
                    var type = $("#filter_product_list").attr("data_type");

                    $(".mainer-popup").animate({ scrollTop: 0 });

                    $("#filter_product_list .account-history-content").html(data.result);

                    $(".add-to-constructor").on("click", function() {
                        var id = $(this).attr("data-id"),
                            type = $(this).attr("data-type");

                        addProductInConstructor(id, type, $(this));
                    });

                    $(".add-to-wishlist").on("click", function() {
                        var id = $(this).attr("data-id"),
                            withlist_id = $("#withlist_table").attr("data-id");

                        addProductInWishlist(id, withlist_id, $(this));
                    });

                    var cat_text = $('.category_tree_item[data-id="' + category + '"]').html();

                    $(".blue-title._catalog-title").html(cat_text);
                },
                error: function(data) {}
            });
        } else {
            $order_search_result.html("");
        }
    });

    $(".order-search-kkp").on("keyup", function(e) {
        if (e.keyCode == 13) {
            $(this)
                .next(".order-search-kkp-btn")
                .trigger("click");
        }
    });

    /* CUSTOM SELECT */

    if ($(".custom-select-list").length) {
        var ps = new PerfectScrollbar(".custom-select-list", {
            wheelSpeed: 2,
            wheelPropagation: true,
            minScrollbarLength: 20
        });
    }

    $(".custom-select").on("click", function(e) {
        e.stopPropagation();
    });

    $(document).on("click", function() {
        if ($(".custom-select._open").length) {
            $(".custom-select._open").removeClass("_open");
        }
    });

    $(".custom-select")
        .find("input")
        .on("focus", function() {
            $(this)
                .parent()
                .addClass("_open");
        });

    $(".custom-select")
        .find("input")
        .on("keyup", function() {
            var $wrapper = $(this).parent(),
                $list = $wrapper.find(".custom-select-list"),
                $btn = $wrapper.next("._send-to-user"),
                value = $(this).val(),
                max = $list.find(".custom-select-item").length,
                counter = 0;

            $list.find(".custom-select-item").each(function() {
                var current = $(this).text();

                current = current.toLowerCase();
                value = value.toLowerCase();

                if (current.indexOf(value) != -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                    counter++;
                }
            });

            if (counter == max) {
                $list.addClass("_hide");
            } else {
                $list.removeClass("_hide");
            }

            $btn.addClass("_disabled");
        });

    $(".custom-select-item").on("click", function() {
        var $wrapper = $(this).parents(".custom-select"),
            $btn = $wrapper.next("._send-to-user"),
            $input = $wrapper.find('input[type="text"]'),
            $hidden = $wrapper.find('input[type="hidden"]'),
            value = $(this).attr("data-val"),
            text = $(this).text();

        $wrapper.removeClass("_open");

        $input.val(text);
        $hidden.val(value);

        $btn.removeClass("_disabled");
    });

    /* END CUSTOM SELECT */

    $("._createcancel").on("click", function() {
        $(this)
            .parents(".popup-wrapper")
            .find(".closer")
            .trigger("click");
    });

    $("._createnew").on("click", function() {
        wishlistToOrder(false);
    });

    if ($("#tbody_withlist_table").find(".checkbox:checked").length) {
        $("#pushup10").removeClass("_disabled");
    }
    // РІС‹Р±СЂР°С‚СЊ РІСЃРµ

    $("#check_select_all").on("change", function() {
        var val = $(this).prop("checked");
        if (val) {
            $("#tbody_withlist_table")
                .find(".checkbox")
                .prop("checked", true);
            $("#pushup8, #pushup9, #pushup10").removeClass("_disabled");
            $(".top_wish")
                .find(".customSelect")
                .find("select")
                .removeClass("_disabled");
        } else {
            $("#tbody_withlist_table")
                .find(".checkbox")
                .prop("checked", false);
            $("#pushup8, #pushup9, #pushup10").addClass("_disabled");
            $(".top_wish")
                .find(".customSelect")
                .find("select")
                .addClass("_disabled");
        }
    });

    $(".loyalty_graph").each(function() {
        var $graph = $(this),
            graph_half_width = $graph.outerWidth() / 2,
            graph_half_height = $graph.outerHeight() / 2;

        $graph.on("mousemove", function(e) {
            /*if (e.offsetX > graph_half_width && e.offsetY < graph_half_width) {
                $graph.attr('title', 'РјРЅРѕРіРѕ')
            } else if (e.offsetX < graph_half_width && e.offsetY > graph_half_width) {
                $graph.attr('title', 'РјР°Р»Рѕ')
            } else {
                $graph.attr('title', 'РЅРѕСЂРјР°Р»СЊРЅРѕ')
            }*/

            // follow pointer
            var $pointer = $graph.find(".follow-pointer"),
                pointer_half = $pointer.outerWidth() / 2;

            $pointer.css({ left: e.offsetX - 10, top: e.offsetY - 10 }).addClass("_show");

            var percent_x = e.offsetX / $graph.outerWidth(),
                percent_y = 1 - e.offsetY / $graph.outerHeight();

            //var opacity = (percent_x + percent_y) / 2;

            //$graph.find('.follow-pointer > div').css('opacity',opacity);
        });

        $graph.on("mouseout", function(e) {
            $graph.find(".follow-pointer").removeClass("_show");
        });

        $graph.find(".loyalty_graph_point").on("mousemove", function(e) {
            e.stopPropagation();
            $graph.find(".follow-pointer").removeClass("_show");
        });
        $graph.find(".loyalty_graph_point").on("mouseout", function(e) {
            $graph.find(".follow-pointer").addClass("_show");
        });
    });

    // CHAT
    /*if ($('#chat_users').length) {
        // var ps = new PerfectScrollbar('#chat_users'),
        //     pm = new PerfectScrollbar('#chat_messages');

        $('.chat-user-filter').on('keyup', function() {

            var str = $(this).val();

            if (str.length == 0) {
                $('#chat_users > p').show();
                return false;
            }


            $('#chat_users > p').each(function() {

                $(this).show();

                var $a = $(this).find('a'),

                    name = $a.find('span').text().toLowerCase();

                str = str.toLowerCase();

                if (name.indexOf(str) == -1) $(this).hide();
            })

        })
        $(window).keydown(function(event){
            if((event.keyCode == 13) && ($(event.target)[0]==$("#chat_message")[0])) {

                $('#chat_message').next('a').trigger('click');

                event.preventDefault();
                return false;
            }
        });

    }*/

    user_edit = false;
    if (location.href.indexOf("change=true") != -1) {
        user_edit = true;
    }

    setTableFilters();

    if ($(".wrap_loyalty").length) {
        updateLoyaltyGraph();
    }

    $(".user-list-input").on("keyup", function() {
        var input = $(this).val(),
            $list = $("._user-list"),
            $list_ctrl = $("._user-list-crtl");

        $list.find("td").show();

        $list_ctrl.find("label").show();

        if (input.length == 0) return false;

        $list.find("td").each(function() {
            var name = $(this).text();

            if (name.indexOf(input) != -1) {
                // РµСЃС‚СЊ
            } else {
                $(this).hide();
                var id = $(this).attr("data-id");

                $list_ctrl
                    .find('inpit[data-id="' + id + '"]')
                    .parents("label")
                    .hide();
            }
        });
    });

    // $('.personal-rules-trigger').on('click', function() {

    // 	var $form = $('#account-change'),

    // 		error = false,

    // 		$msg = $form.find('.form-msg');

    // 	$msg.text('').hide();

    // 	$form.find('.req').each(function() {

    // 		$(this).removeClass('_error');

    // 		if ($(this).hasClass('_radio')) {

    // 			if (!$(this).find('input[type="radio"]:checked').length) {
    // 				$(this).addClass('_error');
    // 				error = true;
    // 			}
    // 		} else {
    // 			if ($(this).find('input').val() == '') {
    // 				$(this).addClass('_error');
    // 				error = true;
    // 			}
    // 		}
    // 	})

    // 	if (error) {
    // 		return false;
    // 	}

    // 	$('blackout').fadeIn();
    // 	return false;
    // })
    $("blackout").on("click", function() {
        $("blackout").fadeOut();
    });
    $("popup").on("click", function(e) {
        e.stopPropagation();
    });
    $("close").on("click", function() {
        $("blackout").fadeOut();
    });
    $(".update_profile").on("click", function() {
        account_change();
    });

    function updateLoyaltyGraph() {
        $(".loyalty_graph").each(function() {
            var $graph = $(this),
                $_1 = $graph.find('.loyalty_graph_point[type="1"]'),
                $_2 = $graph.find('.loyalty_graph_point[type="2"]'),
                $_3 = $graph.find('.loyalty_graph_point[type="3"]'),
                $_4 = $graph.find('.loyalty_graph_point[type="4"]'),
                $_5 = $graph.find('.loyalty_graph_point[type="5"]'),
                graph_width = $graph.outerWidth(),
                graph_height = $graph.outerHeight(),
                point_half_size = $graph.find(".loyalty_graph_point").outerWidth() / 2;

            var x1 = $graph.parent().attr("data-x1"), //parseInt($graph.parent().attr('data-x1')) / 6,
                y1 = $graph.parent().attr("data-y1"), //parseInt($graph.parent().attr('data-y1')) / 6,
                x2 = $graph.parent().attr("data-x2"), //parseInt($graph.parent().attr('data-x2')) / 6,
                y2 = $graph.parent().attr("data-y2"), //parseInt($graph.parent().attr('data-y2')) / 6,
                x3 = $graph.parent().attr("data-x3"), //parseInt($graph.parent().attr('data-x3')) / 6,
                y3 = $graph.parent().attr("data-y3"), //parseInt($graph.parent().attr('data-y3')) / 6,
                x4 = $graph.parent().attr("data-x4"), //parseInt($graph.parent().attr('data-x4')) / 6,
                y4 = $graph.parent().attr("data-y4"); //parseInt($graph.parent().attr('data-y4')) / 6;

            var offset_x_1 = graph_width * x1, //graph_width  * x1 - point_half_size,
                offset_y_1 = graph_height * y1, //graph_height * y1 - point_half_size,
                offset_x_2 = graph_width * x2, //graph_width  * x2 - point_half_size,
                offset_y_2 = graph_height * y2, //graph_height * y2 - point_half_size,
                offset_x_3 = graph_width * x3, //graph_width  * x3 - point_half_size,
                offset_y_3 = graph_height * y3, //graph_height * y3 - point_half_size,
                offset_x_4 = graph_width * x4, //graph_width  * x4 - point_half_size,
                offset_y_4 = graph_height * y4; //graph_height * y4 - point_half_size;

            $_1.css({ left: offset_x_1 + "px", bottom: offset_y_1 + "px" });
            $_2.css({ left: offset_x_2 + "px", bottom: offset_y_2 + "px" });
            $_3.css({ left: offset_x_3 + "px", bottom: offset_y_3 + "px" });
            $_4.css({ left: offset_x_4 + "px", bottom: offset_y_4 + "px" });
            $_5.css({ left: graph_width + "px", bottom: graph_height + "px" });

            $_1.attr("title", "РўРµРєСѓС‰РёР№ РєРІР°СЂС‚Р°Р»");
            $_2.attr("title", "РџСЂРµРґС‹РґСѓС‰РёР№ РєРІР°СЂС‚Р°Р»");
            $_3.attr("title", "Р”РІР° РєРІР°СЂС‚Р°Р»Р° РЅР°Р·Р°Рґ");
            $_4.attr("title", "РўСЂРё РєРІР°СЂС‚Р°Р»Р° РЅР°Р·Р°Рґ");
            $_5.attr("title", "Р›РёРґРµСЂ РІ Р’Р°С€РµРј РєР»Р°СЃСЃРµ");

            /*
            var percent_x1 = offset_x_1 / $graph.outerWidth(),
                percent_y1 = 1 - offset_y_1 / $graph.outerHeight(),

                percent_x2 = offset_x_2 / $graph.outerWidth(),
                percent_y2 = 1 - offset_y_2 / $graph.outerHeight(),

                percent_x3 = offset_x_3 / $graph.outerWidth(),
                percent_y3 = 1 - offset_y_3 / $graph.outerHeight(),

                percent_x4 = offset_x_4 / $graph.outerWidth(),
                percent_y4 = 1 - offset_y_4 / $graph.outerHeight(),

                opacity1 = (percent_x1 + percent_y1) / 2,
                opacity2 = (percent_x2 + percent_y2) / 2,
                opacity3 = (percent_x3 + percent_y3) / 2,
                opacity4 = (percent_x4 + percent_y4) / 2;    */

            $_1.find(".graph-point-grad").css("opacity", 1);
            $_2.find(".graph-point-grad").css("opacity", 0.6);
            $_3.find(".graph-point-grad").css("opacity", 0.3);
            $_4.find(".graph-point-grad").css("opacity", 0.1);
            $_5.find(".graph-point-red").css("opacity", 1);
        });
    }

    function setTableFilters() {
        table_filter = {
            zn: "",
            gp: "",
            name: "",
            inn: "",
            person: "",
            phone: "",
            address: "",
            manager: ""
        };

        $("input.control").on("keyup", function() {
            var search_name = $(this).attr("search-name");

            table_filter[search_name] = $(this).val();

            $("#users_table_tbody")
                .find("tr")
                .each(function() {
                    var $tr = $(this);

                    $tr.show();

                    var current_line = {
                        zn: $tr.find('[search-name="zn"]').text(),
                        gp: $tr.find('[search-name="gp"]').text(),
                        name: $tr.find('[search-name="name"]').text(),
                        inn: $tr.find('[search-name="inn"]').text(),
                        person: $tr.find('[search-name="person"]').text(),
                        phone: $tr.find('[search-name="phone"]').text(),
                        address: $tr.find('[search-name="address"]').text(),
                        manager: $tr.find('[search-name="manager"]').text()
                    };

                    for (var key in current_line) {
                        var current_line_lower = current_line[key].toLowerCase();
                        var table_filter_lower = table_filter[key].toLowerCase();

                        if (
                            table_filter[key] != "" &&
                            current_line_lower.indexOf(table_filter_lower) == -1
                        ) {
                            $tr.hide();
                            break;
                        }
                    }
                });
        });
    }

    function account_change() {
        $("blackout").fadeOut();

        $(".personal-rules-trigger").addClass("_disabled");

        var $form = $("#account-change"),
            error = false,
            $msg = $form.find(".form-msg");

        var fdata = new FormData($("#account-change")[0]);

        /*var fdata = new FormData();
        fdata.append('fname', $('#fname').val());
        fdata.append('lname', $('#lname').val());
        fdata.append('pname', $('#pname').val());
        fdata.append('phone', $('#phone').val());
        fdata.append('phone_additional', $('#phone').val());
        fdata.append('birthday', $('#birthday').val());
        fdata.append('post', $('#post').val());
        fdata.append('gender', $('input[name=gender]:checked', '#account-change').val());
        fdata.append('is_notice', $('#is_notice').val());*/
        fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

        $.ajax({
            url: "/cabinet/account",
            type: "POST",
            data: fdata,
            //mimeType:"multipart/form-data",
            contentType: false,
            cache: false,
            dataType: "json",
            processData: false,
            success: function(data) {
                if (data.redirect) {
                    document.location.href = data.redirect;
                } else {
                    $msg.text(data.message).show();
                }

                $(".personal-rules-trigger").removeClass("_disabled");
            },
            error: function(data) {
                $msg.text(data.responseJSON.message).show();
                $(".personal-rules-trigger").removeClass("_disabled");
            }
        });

        return false;
    }

    // $.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );

    $("#birthday").each(function() {
        var dp = $(this)
            .datepicker({
                onSelect: function(date) {
                    $("#birthday").removeClass("_error");
                },
                dateFormat: "dd.mm.yyyy",
                changeYear: true,
                yearRange: "-100:+0"
            })
            .data("datepicker");
    });

    $("#date_from").each(function() {
        var dp = $(this)
            .datepicker({
                onSelect: function(date) {
                    $("#birthday").removeClass("_error");
                },
                startDate: new Date($(this).attr("placeholder")),
                dateFormat: "dd.mm.yyyy",
                changeYear: true,
                yearRange: "-100:+0",
                minDate: new Date(2019, 05, 05)
            })
            .data("datepicker");

        $(this).val($(this).attr("placeholder"));
    });

    $("#date_to").each(function() {
        var dp = $(this)
            .datepicker({
                onSelect: function(date) {
                    $("#birthday").removeClass("_error");
                },
                startDate: new Date($(this).attr("placeholder")),
                dateFormat: "dd.mm.yyyy",
                changeYear: true,
                yearRange: "-100:+0"
            })
            .data("datepicker");

        $(this).val($(this).attr("placeholder"));
    });

    $(".req")
        .find('[type="radio"]')
        .on("change", function() {
            $(this)
                .parents(".req")
                .removeClass("_error");
        });

    $(".req")
        .find("input")
        .on("keyup", function() {
            $(this)
                .parents(".req")
                .removeClass("_error");
        });

    $("input.req").on("keyup", function() {
        $(this).removeClass("_error");
    });

    $("._req-select")
        .find("select")
        .on("change", function() {
            $(this)
                .parents("._req-select")
                .removeClass("_error");
        });

    $(".sex")
        .find('[type="radio"]')
        .on("change", function() {
            $(".sex").removeClass("_error");
        });

    if ($("._ss").length) {
        $("._ss").each(function() {
            var elem = $(this).get(0);
            SimpleScrollbar.initEl(elem);
        });
    }

    if ($(".side-catalog").length) {
        $(".side-catalog")
            .find("li.active")
            .each(function() {
                if (!$(this).find(".active").length) {
                    $(this).addClass("bold-link");

                    return false;
                }
            });
    }

    //     $('.slider').not('._no-cycle').bxSlider({
    //         slideWidth: 192,
    // //            auto: true,
    //         minSlides: 3,
    //         maxSlides: 3,
    //         pager: false,
    //         moveSlides: 1,
    //         slideMargin: 28,
    //         nextText: '',
    //         prevText: ''
    //     });

    //     $('.slider._no-cycle').bxSlider({
    //         slideWidth: 192,
    // //            auto: true,
    //         minSlides: 3,
    //         maxSlides: 3,
    //         pager: false,
    //         moveSlides: 1,
    //         slideMargin: 28,
    //         nextText: '',
    //         prevText: '',
    // 		infiniteLoop: false
    //     });

    $(".page-order .goods.pageOrd tr").each(function() {
        if ($("input", this).attr("checked") !== "checked") {
            // $(this).addClass('active');
            $("div.new-order > table > tbody > tr:nth-child(1)").removeClass("active");
        }
    });

    if ($(".wishlist-result").length) {
        $(".wishlist-result").addClass("active");
    }

    // $('.user #country').on( "change", function () {
    //     $('.select-company').append('<div><span>'+$('.user #country option:selected').text()+'</span><a href="#" class="del"></a></div>')
    // });

    // $('.select-company').on( 'click', 'a', function (e) {
    //     e.preventDefault;
    //     $(this).parent().remove();
    // });
    $(".user #country").on("change", function() {
        var company_id = $(this)
            .find(":selected")
            .val();

        if (company_id == "null") return;

        var company_name = $(this)
            .find(":selected")
            .text();
        var form = $("#client_user");

        var element_HTML =
            "<div class='company'><input type='hidden' name='company[]' value='" +
            company_id +
            "'/><div class='company__name'>" +
            company_name +
            "</div><div class='company__remove'></div></div>";

        $(element_HTML).insertBefore($("#client_user").find(".form-container"));

        // СЃРµР»РµРєС‚ РІС‹Р±РѕСЂР° РєРѕРјРїР°РЅРёРё
        $("select#country").val("null");
        $("select#country")
            .find('option[value="' + company_id + '"]')
            .hide();
    });

    $("body").on("click", ".company__remove", function() {
        var id = $(this)
            .parent()
            .find("input")
            .val();
        $("select#country")
            .find('option[value="' + id + '"]')
            .show();
        $(this)
            .parent()
            .remove();
    });

    var clickFpr = 0;
    function klickToRadio() {
        var massTov = $(".page-order .pageOrd tr.main-product");
        var massTovA = $(".page-order .pageOrd tr.analog.active");
        var massTovHide = $(".page-order .pageOrd tr");
        massTovHide.splice(0, 1);
        if (clickFpr == 0) {
            massTovHide.hide();
            massTov.show();
            massTovA.show();
            clickFpr++;
            //   console.log(clickFpr);
        } else {
            massTovHide.show();

            clickFpr--;
        }
    }

    $('.page-order .radio-container label:first input[type="checkbox"]').on("click", klickToRadio);

    $(document).on("click", ".page-order .goods.pageOrd tr input", function() {
        $(this)
            .parents("tr")
            .toggleClass("active");
    });

    if (
        $('.page-order .radio-container input[type="checkbox"]:last').attr("checked") !== "checked"
    ) {
        $(".page-order .goods").addClass("without-img");
        // $('.wrap_wish .goods label span').css('margin-top', '31px');
    }
    if (
        $('.page-order .radio-container input[type="checkbox"]:first').attr("checked") === "checked"
    ) {
        $(".page-order .goods .analog").fadeOut(0);
        // $('.wrap_wish .goods label span').css('margin-top', '31px');
    }

    $('.page-order .radio-container input[type="checkbox"]:last').click(function() {
        $(".page-order .goods").toggleClass("without-img");
        // $('.wrap_wish .goods label span').css('margin-top', '33px');

        if ($(this).prop("checked")) {
            // localStorage['hide_images'] = false;
            setOption({
                key: "hide_images",
                value: false
            });
        } else {
            // localStorage['hide_images'] = true;
            setOption({
                key: "hide_images",
                value: true
            });
            // console.log('setfalse')
        }
    });

    // $('.page-order .radio-container input:first').click(function () {
    //     $('.page-order .goods.pageOrd .analog').toggle(0);
    //     // $('.wrap_wish .goods label span').css('margin-top', '7px');
    // });

    $(document).on("click", ".characteristic .open-tab1", function() {
        $(".characteristic li").removeClass("active");
        $(this).addClass("active");
        $(".characteristic > div").fadeOut(0);
        $(".characteristic .tab1").fadeIn(0);
    });
    $(document).on("click", ".characteristic .open-tab2", function() {
        $(".characteristic li").removeClass("active");
        $(this).addClass("active");
        $(".characteristic > div").fadeOut(0);
        $(".characteristic .tab2").fadeIn(0);
    });
    $(document).on("click", ".characteristic .open-tab3", function() {
        $(".characteristic li").removeClass("active");
        $(this).addClass("active");
        $(".characteristic > div").fadeOut(0);
        $(".characteristic .tab3").fadeIn(0);
    });
    $(document).on("click", ".characteristic .open-tab4", function() {
        $(".characteristic li").removeClass("active");
        $(this).addClass("active");
        $(".characteristic > div").fadeOut(0);
        $(".characteristic .tab4").fadeIn(0);
    });
    $(document).on("click", ".characteristic .open-tab5", function() {
        $(".characteristic li").removeClass("active");
        $(this).addClass("active");
        $(".characteristic > div").fadeOut(0);
        $(".characteristic .tab5").fadeIn(0);
    });

    $(document).on("click", ".scheme-list .open-tab1", function() {
        $(".scheme-list li").removeClass("active");
        $(this).addClass("active");
        $(".scheme-container > div").fadeOut(0);
        $(".scheme-container .tab1").fadeIn(0);
    });

    $(document).on("click", ".scheme-list .open-tab2", function() {
        $(".scheme-list li").removeClass("active");
        $(this).addClass("active");
        $(".scheme-container > div").fadeOut(0);
        $(".scheme-container .tab2").fadeIn(0);
    });

    $(document).on("click", ".scheme-list .open-tab3", function() {
        $(".scheme-list li").removeClass("active");
        $(this).addClass("active");
        $(".scheme-container > div").fadeOut(0);
        $(".scheme-container .tab3").fadeIn(0);
    });

    $(document).on("click", ".scheme-list .open-tab4", function() {
        $(".scheme-list li").removeClass("active");
        $(this).addClass("active");
        $(".scheme-container > div").fadeOut(0);
        $(".scheme-container .tab4").fadeIn(0);
    });

    $(document).on("click", ".scheme-list .open-tab5", function() {
        $(".scheme-list li").removeClass("active");
        $(this).addClass("active");
        $(".scheme-container > div").fadeOut(0);
        $(".scheme-container .tab5").fadeIn(0);
    });

    $(".filter2 .fill-data a").click(function() {
        if ($(this).hasClass("active")) {
        } else {
            $(".filter2 .fill-data a").removeClass("active");
            $(this).addClass("active");

            var id = parseInt($(this).attr("data-id"));

            updateWaterFilter(id);
        }
    });

    // $('.delete-order-item').on('click', function () {
    //     var id = $(this).attr('data-id');

    //     deleteProduct(id);
    // });

    /* EZ water filter 12/07/18 hoodoo */

    $(".water-filter")
        .find('input[type="checkbox"]')
        .on("change", function() {
            var active_id = $(".fill-data")
                    .find(".active")
                    .attr("data-id"),
                val = $(this).prop("checked"),
                input_name = $(this).attr("name");

            if (active_id == "2") {
                $(".fill-data")
                    .find('[data-id="1"]')
                    .trigger("click");

                var $form = $(".water-filter");

                for (var key in document.waterFilterState[2]) {
                    var value = document.waterFilterState[2][key];

                    var $input = $form.find('input[name="' + key + '"]'),
                        input_type = $input.attr("type");

                    if (key != input_name) {
                        if (input_type == "checkbox") {
                            $input.prop("checked", value);
                        } else {
                            $input.val(value);
                        }
                        document.waterFilterState[1][key] = value;
                    }
                }

                $(this).prop("checked", val);

                return false;
            }
        });
    $(".water-filter")
        .find('input[type="text"]')
        .on("keyup", function() {
            var active_id = $(".fill-data")
                    .find(".active")
                    .attr("data-id"),
                val = $(this).val(),
                input_name = $(this).attr("name");

            if (active_id == "2") {
                $(".fill-data")
                    .find('[data-id="1"]')
                    .trigger("click");

                var $form = $(".water-filter");

                for (var key in document.waterFilterState[2]) {
                    var value = document.waterFilterState[2][key];

                    var $input = $form.find('input[name="' + key + '"]'),
                        input_type = $input.attr("type");

                    if (key != input_name) {
                        if (input_type == "checkbox") {
                            $input.prop("checked", value);
                        } else {
                            $input.val(value);
                        }
                        document.waterFilterState[1][key] = value;
                    }
                }

                $(this).val(val);

                return false;
            }
        });

    $(document).on("click", ".products-order", function() {
        $("#kompred-popup-details77").show();

        return false;
    });

    $(document).on("click", function() {
        $(".success-popup").fadeOut();
    });

    /*$(document).on('click', '.equip-to-constructor', function() {

        var products = {},
            low_price = false,
            $tab = $('.tab-item:visible');

        if ($tab.find('.light._max-on').length) low_price = true;

        $tab.find('.main-scheme').each(function() {

            var id = $(this).attr('data-id'),
                count = false;

            if (low_price) {
                count =  $(this).attr('data-count-light');
            } else {
                count =  $(this).attr('data-count');
            }

            products[id] = count;

        });

        addProductsInConstructor(products);
        return false;
    });*/

    // $(document).on('click', '.total-summery .light', function() {

    //     var $tab = $('.tab-item:visible');

    //     if ($(this).hasClass('_max-on')) {
    //         $(this).removeClass('_max-on');

    //         $tab.find('*[data-summ]').each(function () {
    //             var value = $(this).attr('data-summ');

    //             $(this).find('.price-value').text(value);
    //         });
    //         $tab.find('*[data-count]').each(function () {
    //             var value = $(this).attr('data-count');

    //             $(this).find('.count-value').text(value);
    //         });

    //         $tab.find('.description-content[type="max"]').show();
    //         $tab.find('.description-content[type="low"]').hide();
    //         $tab.find('*[data-type="max"]').show();
    //         $tab.find('*[data-type="small"]').hide();
    //     } else {
    //         $(this).addClass('_max-on');

    //         $tab.find('*[data-summ-light]').each(function () {
    //             var value = $(this).attr('data-summ-light');

    //             $(this).find('.price-value').text(value);
    //         });
    //         $tab.find('*[data-count-light]').each(function () {
    //             var value = $(this).attr('data-count-light');

    //             $(this).find('.count-value').text(value);
    //         });

    //         $tab.find('.description-content[type="max"]').hide();
    //         $tab.find('.description-content[type="low"]').show();
    //         $tab.find('*[data-type="max"]').hide();
    //         $tab.find('*[data-type="small"]').show();
    //     }
    // });

    $(".order-value").on("click", function(e) {
        e.stopPropagation();
    });

    $(document).on("keypress", ".order-value", function(e) {
        e.stopPropagation();

        return isNumberKey(e);
    });
    function isNumberKey(evt) {
        var charCode = evt.which ? evt.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;

        return true;
    }

    $(document).on("change", ".order-value", function(e) {
        e.stopPropagation();

        var id = $(this)
                .parents(".main-product")
                .attr("data-ev-id"),
            prev_val = parseInt($(this).attr("data-val")),
            this_val = $(this).val();

        if (this_val < 0) $(this).val(0);

        var change = this_val - prev_val;

        if ($(this).hasClass("_wishlist")) {
            updateCountProductWishlist(id, change);
        } else {
            updateCountProduct(id, change);
        }
        $(this).attr("data-val", this_val);
    });

    $(".order-value").each(function() {
        $(this).val($(this).attr("data-val"));
    });

    if ($(".water-filter").length) {
        document.waterFilterState = {
            1: {
                ProductivityMax: "",
                ProductivityAvg: "",
                Turbidity: "",
                Color: "",
                Odor: "",
                H2S: false,
                pH: "",
                Hardness: "",
                Fe2: "",
                Mn: "",
                Salinity: "",
                IMn: "",
                Si: false,
                Tbc: false,
                Pathogens: false
            },
            2: {
                ProductivityMax: 1,
                ProductivityAvg: 1,
                Turbidity: 2.6,
                Color: 20,
                Odor: 2,
                H2S: false,
                pH: 7.2,
                Hardness: 7,
                Fe2: 0.3,
                Mn: 0.1,
                Salinity: 1000,
                IMn: 2.5,
                Si: true,
                Tbc: true,
                Pathogens: true
            }
        };

        var active_id = parseInt($(".filter2 .fill-data a.active").attr("data-id"));

        updateWaterFilter(active_id);

        document.water_filter_max_values = {
            ProductivityMax: 3,
            Turbidity: 50,
            Color: 70,
            Odor: 10,
            Hardness: 20,
            Fe2: 50
        };

        $(".water-filter")
            .find("input")
            .each(function() {
                var type = $(this).attr("type"),
                    name = $(this).attr("name");

                if (type == "text") {
                    $(this).on("keyup", function() {
                        var id = parseInt(
                                $(".water-filter")
                                    .find(".fill-data")
                                    .find(".active")
                                    .attr("data-id")
                            ),
                            value = parseInt($(this).val());

                        for (var key in document.water_filter_max_values) {
                            var cur_value = document.water_filter_max_values[key];

                            if (key == name && value > cur_value) {
                                value = cur_value;
                                $(this).val(value);
                            }
                        }

                        if (id == 1) {
                            document.waterFilterState[id][name] = value;
                        }
                    });
                } else if (type == "checkbox") {
                    $(this).on("change", function() {
                        var id = parseInt(
                            $(".water-filter")
                                .find(".fill-data")
                                .find(".active")
                                .attr("data-id")
                        );

                        if (id == 1) {
                            document.waterFilterState[id][name] = $(this).prop("checked");
                        }
                    });
                }
            });
    }

    function updateWaterFilter(id) {
        var $form = $(".water-filter");

        for (var key in document.waterFilterState[id]) {
            var value = document.waterFilterState[id][key];

            var $input = $form.find('input[name="' + key + '"]'),
                input_type = $input.attr("type");

            if (input_type == "checkbox") {
                $input.prop("checked", value);
            } else {
                $input.val(value);
            }
        }
    }

    $(".country-selector label").on("click", function(e) {
        //e.preventDefault();
        var cl = $(this)
            .find("input")
            .val();
        $(".form-container .for").removeClass("show");
        $(".form-container .for-" + cl).addClass("show");
        $(".additional-rs-1").hide();
        $(".additional-rs-2").hide();
        $(".add-pc").show();
    });
    $(".country-selector")
        .not(".ach_sex")
        .find("label:last")
        .trigger("click");

    // $(document).on('click', '.minus', function () {
    //     var $input = $(this).parent().find('.number').find('input');
    //     var count = parseInt($input.val()) - 1;
    //     count = count < 1 ? 1 : count;
    //     $input.val(count);
    //     return false;
    // });
    // $(document).on('click', '.plus', function () {
    //     var $input = $(this).parent().find('.number').find('input');
    //     $input.val(parseInt($input.val()) + 1);
    //     return false;
    // });

    $(".light").click(function() {
        $(this).toggleClass("not-light");
    });
    $("#check").change(function() {
        if ($("#check").prop("checked")) {
            var $text = $("#fact").val();
            $("#uredich").val($text);
        } else {
            var $text2 = "";
            $("#uredich").val($text2);
        }
    });

    $(".typical-table-wrapper .typical-checkbox").on("click", function() {
        var parent = $(this).parents("tr");
        if (parent.attr("checked")) {
            parent.removeAttr("checked");
        } else {
            parent.attr({ checked: "1" });
        }
    });

    $(document).on("click", ".newTable .typical-checkbox", function() {
        var parent = $(this).parent();
        var parentLi = $(this)
            .parent()
            .parent()
            .parent();
        var arrow = $(".newTable .tarrow");

        if (parent.attr("checked")) {
            parent.removeAttr("checked");
            parentLi.removeAttr("checked");
            parentLi.css("background-color", "#fff");
            parentLi.find(arrow).removeClass("active");
        } else {
            parent.attr({ checked: "1" });
            parentLi.css("background-color", "#eee");
            parentLi.find(arrow).addClass("active");
            parentLi.attr({ checked: "1" });
        }
    });
    // Other Country
    $(".check-country").hide();
    $(".default-country").show();
    $("#country").change(function() {
        if ($(this).val() == "kz" || $(this).val() == "bl") {
            $(".country-selector label").hide();
            $(".check-country").show();
            $(".default-country").hide();
        } else {
            $(".check-country").hide();
            $(".default-country").show();
            $(".country-selector label").show();
        }

        if ($(this).val() == "bl") {
            $(".changer-holder").attr("placeholder", "РЈРќРќ");
        } else {
            $(".changer-holder").attr("placeholder", "Р РќРќ");
        }
    });

    // page order(РІСЃРїР»С‹РІР°СЋС‰Р°СЏ РїРѕРґСЃРєР°Р·Р°Рє РїСЂРё РѕС‚РїСЂР°РІР»РµРЅРёРё РїРёСЃСЊРјР°)
    $(".send-email a").click(function(e) {
        e.preventDefault();
        $(".hid-block").fadeIn(300);
        setTimeout(function() {
            $(".hid-block").fadeOut("slow");
        }, 4000);
    });

    // Checkbox - СЃРѕСЃС‚РѕСЏРЅРёРµ РєРѕРіРґР° РµСЃС‚СЊ/РЅРµС‚ РєР°СЂС‚РёРЅРѕРє(wish.html)
    var $unique = $('.radio-container label input[type="checkbox"], label');

    // $unique.click(function() {
    //     if ($(this).prop('checked')) {
    //         $('.wrap_wish .goods label span').css('margin-top', '31px');
    //         $('unique').prop('');
    //     } else {
    //          $('.wrap_wish .goods label span').css('margin-top', '7px');
    //     }
    // });

    $("input#kompred").click(function() {
        if ($(this).prop("checked")) {
            $("img#kompred").show();
        } else {
            $("img#kompred").hide();
        }
    });
});

/*(function($) {
    $(function() {

        $('ul.tabs_caption').on('click', 'li:not(.active)', function() {
            $(this)
                    .addClass('active').siblings().removeClass('active');
                    //.closest('div.wrap_tabs').find('div.tabs_content').removeClass('active').eq($(this).index()).addClass('active');
        });

        var tabIndex = window.location.hash.replace('#tab','')-1;
        if (tabIndex != -1) $('ul.tabs_caption li').eq(tabIndex).click();

        $('a[href*=#tab]').click(function() {
            var tabIndex = $(this).attr('href').replace(/(.*)#tab/, '')-1;
            $('ul.tabs_caption li').eq(tabIndex).click();
        });

    });
})(jQuery);*/

$(document).ready(function() {
    $(".bold").on("click", function() {
        document.execCommand("bold", false, null);
    });

    $(".italic").on("click", function() {
        document.execCommand("italic", false, null);
    });

    $(".copy-done").on("click", function() {
        location.reload();
    });

    $(".question").click(function() {
        $(this)
            .parents(".faq")
            .find(".answer")
            .slideToggle(400);
        $(this)
            .parents(".faq")
            .find(".question")
            .toggleClass("is_open");
    });

    if ($("#contact-map").length) {
        ymaps.ready(init);
    }

    if ($("#is_autoorder").length) {
        function toggleAccManagementBlock() {
            var el = $("div.acc_management_autoorder");
            var cheched = $("#is_autoorder").is(":checked");

            if (cheched) {
                el.show();
                $('[data-showForAutoOrder="true"]').show();
                $('[data-showForAutoOrder="false"]').hide();
                $('.is_autoorderMessage').show();
            } else {
                el.hide();
                $('.is_autoorderMessage').hide();
                $('[data-showForAutoOrder="true"]').hide();
                $('[data-showForAutoOrder="false"]').show();
            }
        }

        $("#is_autoorder").change(toggleAccManagementBlock);
        toggleAccManagementBlock();
    }
});

function init() {
    document.map = new ymaps.Map("contact-map", {
        center: [55.76, 37.64],
        zoom: 5,
        controls: []
    });

    (myPlacemark1 = new ymaps.Placemark([55.809634, 37.591935], {
        hintContent: "РЎРєР»Р°Рґ РІ РњРѕСЃРєРІРµ",
        balloonContent: "СѓР». РЁРѕСЃСЃРµР№РЅР°СЏ, Рґ. 90, СЃС‚СЂ. 57"
    })),
        (myPlacemark2 = new ymaps.Placemark([55.012419, 82.809802], {
            hintContent: "РЎРєР»Р°Рґ РІ РќРѕРІРѕСЃРёР±РёСЂСЃРєРµ",
            balloonContent: "СѓР». 2 РЎС‚Р°РЅС†РёРѕРЅРЅР°СЏ, 42, СЃРєР»Р°Рґ в„– 7"
        }));

    myCollection = new ymaps.GeoObjectCollection();

    myCollection.add(myPlacemark1);
    myCollection.add(myPlacemark2);

    document.map.geoObjects.add(myCollection);

    document.map.setBounds(myCollection.getBounds(), { checkZoomRange: true });
}

$(document).ready(function() {
    $("#searchHeaderButton").click(function() {
        if ($("#searchHeader").is(":visible") == false) {
            $("#searchHeader").fadeIn();
        }
    });
    $(document).mouseup(function(e) {
        var div = $("#searchHeader");
        if (
            !div.is(e.target) &&
            div.has(e.target).length === 0 &&
            !$(".autocomplete, .autocomplete li").is(e.target)
        ) {
            div.fadeOut();
        }
    });
});

$("#ordersFilter").on("change", function() {
    var that = $(this);
    var status = that.val();

    $(".history__item").css("display", "flex");

    $(".history__item").each(function(index, value) {
        if ($(value).attr("data-status") != status) {
            $(value).css("display", "none");
        }
    });
});

/*$(document).ready(function () {

    var tr = $('.goods table tr');

    var mass = [];
    for (var i = 1; i < tr.length; i++) {
        mass[i - 1] = tr[i];
    };

    var massTdInTd = [];
    for (var r = 0; r < mass.length; r++) {
        massTdInTd[r] = mass[r].getElementsByTagName('td')[5];
        massTdInTd[r].style.cursor = "pointer";
        console.log(massTdInTd[r])
    }
    var newMass = mass.slice();

    for (var t = 0; t < massTdInTd.length; t++) {

        massTdInTd[t].onclick = function () {
            var localVar = massTdInTd.indexOf(this);
            mass[localVar].style.display = "none";
            console.log(localVar)

            console.log(newMass.length)

            if (newMass.length > 1) {

                newMass.splice(localVar, 1)
                console.log(mass, newMass)
                $("#nothingHere").hide()
            } else {
                $("#tablica").hide();
                console.log($("#tablica"))
                $("#nothingHere").slideDown("fast");
            };

        };
    };
});*/

/*var objValue = {
    input1: ["value1.1", "value2.1", "value3.1", "value4.1", "value5.1"],
    input2: ["value1.2", "value2.2", "value3.2", "value4.2", "value5.2"],
    input3: ["value1.3", "value2.3", "value3.3", "value4.3", "value5.3"]
};

$("#LiderSelect").change(function () {
    if ($(this).val() == 0) {
        console.log("ss")
        $("#inp1").attr('disabled', false);
        $("#inp2").attr('disabled', false);
        $("#inp3").attr('disabled', false);
    } else {
        $("#inp1").attr('disabled', true);
        $("#inp2").attr('disabled', true);
        $("#inp3").attr('disabled', true);
    }
    ;

    var localForInp1 = objValue.input1[$(this).val()];
    var localForInp2 = objValue.input2[$(this).val()];
    var localForInp3 = objValue.input3[$(this).val()];
    // console.log(local);
    $("#inp1").val(localForInp1);
    $("#inp2").val(localForInp2);
    $("#inp3").val(localForInp3);
});*/

//  $( function() {
//     $( "#tabsMod" ).tabs();
//   } );
function searchf(search, currentEl) {
    var fdata = new FormData();

    fdata.append("q", search);
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $.ajax({
        url: "search/post",
        type: "POST",
        data: fdata,
        contentType: false,
        cache: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            var autoCompleteHTML = "";
            if (data.result) {
                data.result.forEach(function(item) {
                    autoCompleteHTML += "<li>" + item.title + "</li>";
                });
            }

            if (autoCompleteHTML != "")
                $(currentEl)
                    .parent()
                    .find(".autocomplete")
                    .addClass("active");
            else
                $(currentEl)
                    .parent()
                    .find(".autocomplete")
                    .removeClass("active");

            $(currentEl)
                .parent()
                .find(".autocomplete")
                .html(autoCompleteHTML);
        },
        error: function(data) {}
    });

    return false;
}

function change_url(url_query) {
    window.history.pushState(null, null, url_query);
    return false;
}

$("body").on("click", ".autocomplete li", function() {
    $(this)
        .closest("form")
        .find("input[name='q']")
        .val($(this).text());
    $(this)
        .parent()
        .removeClass("active");
});

$("body").on("click", ".faq .question span", function() {
    var answer_block = $(this)
        .closest(".faq")
        .find(".answer");

    var $question = $(this).parents(".question");

    if (answer_block.hasClass("visible")) {
        answer_block.removeClass("visible");
        $question.removeClass("_open");
    } else {
        answer_block.addClass("visible");
        $question.addClass("_open");
    }
});

$(".orderInfoMin").ready(function() {
    if ($(".orderInfoMin").length > 0) {
        $(".orderInfoMin").each(function() {
            var comment = $(this).text();

            var newComment = comment.substr(0, 50);

            if ($(this).text() != "") {
                $(this).text(newComment + "...");
                $(".infoHidden").width(
                    $(this)
                        .parent()
                        .width()
                );
            }
        });
    }
});

function createScrenShot(container) {
    html2canvas(document.body, {
        allowTaint: !0,
        width: window.innerWidth,
        height: window.innerHeight,
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
        x: window.pageXOffset,
        y: window.pageYOffset,
        useCORS: true
    }).then(function(canvas) {
        container[0].appendChild(canvas);
        var dataURL = canvas.toDataURL();
        $('.popUp[data-type="errorMessage"]')
            .find('input[name="imgUrl"]')
            .val(dataURL);
        $(".screenShotContainer img").attr("src", dataURL);
        //РџСЂРёС€Р»РѕСЃСЊ РЅР°РїРёСЃР°С‚СЊ РѕС‚РґРµР»СЊРЅРѕ, РёР±Рѕ РїРѕСЂСЏРґРѕРє РІС‹Р·РѕРІР°
        // $('.popUp-active').removeClass('popUp-active');
        // $('.popUp-wrapper').removeClass('popUp-wrapper-active');
        // $('.popUp[data-type="errorMessage"]').parents('.popUp-wrapper').addClass('popUp-wrapper-active');
        // $('.popUp[data-type="errorMessage"]').addClass('popUp-active');
        // scrollStop(true);
        // console.log(dataURL);

        stopScroll(true);
        openPopupClear("sendReport");
    });
}

$("[createScreenShot]").click(function() {
    createScrenShot($(".screenShotContainer"));
});

function sendErrorMessage() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("name", $("#feedback_error_name").val());
    fdata.append("email", $("#feedback_error_email").val());
    fdata.append("message", $("#feedback_error_message").val());
    fdata.append("image", $("#feedback_error_image").attr("src"));

    $.ajax({
        url: "/ajax/error_message",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $(".popup-sendReport")
                .find(".popup-cross")
                .trigger("click");
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

function sendCallBack() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("type", $('input[name="callback_type"]:checked').val());

    $.ajax({
        url: "/ajax/callback",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $(".popup-sendReport")
                .find(".popup-cross")
                .trigger("click");
            showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
        }
    });

    return false;
}

$(".wishWidget .category_tree_item").on("click", function() {
    $(".customSelect__refresh").trigger("click");

    $(".hiddenReset").trigger("click");
    getTypesByChangeProduct("");
    getTypeAdditional("");
});

$(".wishWidget #filter").on("submit", function() {
    event.preventDefault();

    var form = $(".wishWidget #filter");

    form.find(".filterBtn").trigger("click");
});

$(".order-searchInResults-btn").on("click", function() {
    var that = $(this);

    var substr = $(".order-searchInResults")
        .val()
        .toLowerCase();

    $(".account-history-content")
        .find(".tableCasual__row")
        .show();

    if (substr != "") {
        $(".account-history-content")
            .find(".tableCasual__row")
            .each(function(index, value) {
                var $that = $(value);
                var string = $that
                    .find(".order-inner")
                    .text()
                    .toLowerCase();

                if (string.includes(substr) == false) {
                    $that.hide();
                }
            });
    }
});

$("#wishPopSearch").on("submit", function(event) {
    event.preventDefault();

    $(".order-searchInResults-btn").trigger("click");
});

// РњСѓР»СЊС‚РёСЃРµР»РµРєС‚
if ($(".multiSelect").length) {
    $(document).click(function(e) {
        // СЃРѕР±С‹С‚РёРµ РєР»РёРєР° РїРѕ РІРµР±-РґРѕРєСѓРјРµРЅС‚Сѓ
        var div = $(".multiSelect"); // С‚СѓС‚ СѓРєР°Р·С‹РІР°РµРј ID СЌР»РµРјРµРЅС‚Р°

        if (
            !div.is(e.target) && // РµСЃР»Рё РєР»РёРє Р±С‹Р» РЅРµ РїРѕ РЅР°С€РµРјСѓ Р±Р»РѕРєСѓ
            div.is(".opened") &&
            div.has(e.target).length === 0
        ) {
            // Рё РЅРµ РїРѕ РµРіРѕ РґРѕС‡РµСЂРЅРёРј СЌР»РµРјРµРЅС‚Р°Рј
            $(".multiSelect__dropdown").hide();
            $(".multiSelect").removeClass("opened");
        }
    });

    $(".multiSelect").on("click", function() {
        $(this).toggleClass("opened");
    });

    $(".multiSelect__dropdown_item").on("click", function(event) {
        var list = [];

        event.preventDefault();
        event.stopPropagation();

        $(this).toggleClass("selected");

        //Р—РґРµСЃСЊ С‚Рѕ С‡С‚Рѕ РґРѕР»Р¶РЅРѕ РїСЂРѕРёСЃС…РѕРґРёС‚СЊ РїСЂРё СЃРјРµРЅРµ СЃРµР»РµРєС‚Р°
        $(".history__item").hide();
        $(".multiSelect__window").html("");

        if ($(".multiSelect__dropdown_item.selected").length == 0) {
            $(".history__item").css("display", "flex");
            $(".multiSelect__window").html("Р’СЃРµ");

            $(this)
                .parents(".multiSelect")
                .find(".multiSelect__refresh")
                .hide();
            $(this)
                .parents(".multiSelect")
                .find(".multiSelect__arrow")
                .show();
            return false;
        }

        $(".multiSelect__dropdown_item.selected").each(function() {
            var status = $(this).attr("data-value");
            list.push($(this).text());

            $(".history__item").each(function(index, value) {
                if ($(value).attr("data-status") == status) {
                    $(value).css("display", "flex");
                    $(value).css("border", "1px solid #d7d7d7");
                    $(value).css("margin-bottom", "-1px");
                }
            });
        });

        $(".multiSelect__window").html(list.join(", "));
        $(this)
            .parents(".multiSelect")
            .find(".multiSelect__refresh")
            .show();
        $(this)
            .parents(".multiSelect")
            .find(".multiSelect__arrow")
            .hide();
    });
}

$(".multiSelect__refresh").on("click", function() {
    $(".history__item").css("display", "flex");
    $(".multiSelect__window").html("Р’СЃРµ");
    $(".multiSelect__dropdown_item.selected").removeClass("selected");
    $(this).hide();
    $(this)
        .siblings(".multiSelect__arrow")
        .show();
});

var ordersFromDP = $("#order_date_from").datepicker({
    dateFormat: "dd.mm.yyyy",
    onSelect: function() {
        var dateFrom = $("#order_date_from").val();
        var dateTo = $("#order_date_to").val();

        if (dateTo != "") {
            filterOrdersByDate(dateFrom, dateTo);
        }
    }
});

var ordersToDP = $("#order_date_to").datepicker({
    dateFormat: "dd.mm.yyyy",
    onSelect: function() {
        var dateFrom = $("#order_date_from").val();
        var dateTo = $("#order_date_to").val();

        if (dateFrom != "") {
            filterOrdersByDate(dateFrom, dateTo);
        }
    }
});

function filterOrdersByDate(dateFrom, dateTo) {
    var rawDateFromString = dateFrom;
    var dateFromArray = rawDateFromString.split(".");
    var dateFromString = dateFromArray[1] + "/" + dateFromArray[0] + "/" + dateFromArray[2];
    var from = new Date(dateFromString);

    var rawDateToString = dateTo;
    var dateToArray = rawDateToString.split(".");
    var dateToString = dateToArray[1] + "/" + dateToArray[0] + "/" + dateToArray[2];
    var to = new Date(dateToString);

    $(".history__item").each(function(index, el) {
        var rawDateString = $(el)
            .find(".order__head_time")
            .text();
        var dateArray = rawDateString.split(".");
        var dateString = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
        var date = new Date(dateString);

        if (date >= from && date <= to) {
            $(el).css("display", "flex");
            $(el).css("border", "1px solid #d7d7d7");
            $(el).css("margin-bottom", "-1px");
        } else {
            $(el).css("display", "none");
        }
    });
}

// $('.order-searchInResults-btn').on('click', function() {
//     var that = $(this);

//     that.parents('form').trigger('submit');
// })
// order search

/*var $order_search_result = $("#filter_product_list").find("._order");

document.order_search = false;

$(".order-search-btn").on("click", function() {
    var query = $(".order-search").val();

    if (query.length > 0) {
        if (document.order_search) document.order_search.abort();

        var fdata = new FormData();
        fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
        fdata.append("q", query);

        document.order_search = $.ajax({
            url: "/search/catalog",
            type: "POST",
            data: fdata,
            contentType: false,
            dataType: "json",
            processData: false,
            success: function(data) {
                $order_search_result.html(data.result);

                if (data.result.length > 0) {
                    var top = $(".blue-title._catalog-title").offset().top;
                    $("html, body").animate({ scrollTop: top });
                }
            },
            error: function(data) {}
        });
    } else {
        $order_search_result.html("");
    }
});

$(".order-search").on("keyup", function(e) {
    if (e.keyCode == 13) {
        $(this)
            .next(".order-search-btn")
            .trigger("click");
    }
});*/

// Order

// var scroller = $('#structure_products').baron();
// scroller.baron().update();

/*$(window).ready(function() {

    // getTypesByChangeProduct();
    // getTypeAdditional();

})*/

/*function createSearchInputs() {
    let strGET = window.location.search;
    let getArr = strGET.split('&add');
    getArr.shift();

    let cyrArr = getArr.map(function(item) {
        return decodeURIComponent(item.replace(/\+/g,' '));
    });

    console.log(cyrArr);
}

createSearchInputs();*/

// ----------------- End catalog page --------------------------------------------------------------

$(".order__search-tracker").on("submit", function(e) {
    e.preventDefault();

    var that = $(this);
    var input = that.find("input");

    var q = input.val().toLowerCase();

    if ($(".multiSelect__dropdown_item.selected").length) {
        $(".multiSelect__refresh").trigger("click");
        $(".multiSelect").removeClass("opened");
    }

    $(".catalog ").append($(".history__item"));

    if (q != "") {
        $(".history__item").each(function(index, el) {
            var item = $(el);
            var tracker = item
                .find(".history__order_comment-tracker")
                .text()
                .toLowerCase();
            var orderId = item.attr("data-number").toLowerCase();
            var comment = item
                .find(".history__order_comment")
                .text()
                .toLowerCase();

            if (tracker.indexOf(q) !== -1) {
                item.css("display", "flex");
            } else if (orderId.indexOf(q) !== -1) {
                item.css("display", "flex");
            } else if (comment.indexOf(q) !== -1) {
                item.css("display", "flex");
            } else {
                $(".searchBuffer").append(item);
            }
        });
    }
});


function addTipsForBtn() {
    var btns = $('[data-btn-helper-text]');
        if(btns.length) {
            btns.each(function(i, el) {
                var text = $(el).attr('data-btn-helper-text');

                if($(el).parents('.btnWithTips').length === 0) {
                    
                    $(el).wrap('<div class="btnWithTips" />');
                        
                    var parent = $(el).parents('.btnWithTips');
                    var elementMargin = {
                        top: $(el).css('margin-top'),
                        right: $(el).css('margin-right'),
                        bottom: $(el).css('margin-bottom'),
                        left: $(el).css('margin-left')
                    }
                    
                    $(el).css('margin-top', 0)
                        .css('margin-right', 0)
                        .css('margin-bottom', 0)
                        .css('margin-left', 0);

                    parent.css('margin-top', elementMargin.top)
                        .css('margin-right', elementMargin.right)
                        .css('margin-bottom', elementMargin.bottom)
                        .css('margin-left', elementMargin.left)

                    parent.append(`
                    <div class="textTip">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                            <circle cx="256" cy="378.5" r="25"></circle>
                            <path d="M256,0C114.516,0,0,114.497,0,256c0,141.484,114.497,256,256,256c141.484,0,256-114.497,256-256
                                C512,114.516,397.503,0,256,0z M256,472c-119.377,0-216-96.607-216-216c0-119.377,96.607-216,216-216
                                c119.377,0,216,96.607,216,216C472,375.377,375.393,472,256,472z"></path>
                            <path d="M256,128.5c-44.112,0-80,35.888-80,80c0,11.046,8.954,20,20,20s20-8.954,20-20c0-22.056,17.944-40,40-40
                                c22.056,0,40,17.944,40,40c0,22.056-17.944,40-40,40c-11.046,0-20,8.954-20,20v50c0,11.046,8.954,20,20,20
                                c11.046,0,20-8.954,20-20v-32.531c34.466-8.903,60-40.26,60-77.469C336,164.388,300.112,128.5,256,128.5z"></path>
                        </svg>                        
                        <div class="textTip__discription-container">
                            <div class="textTip__discription">${text}</div>
                        </div>                       
                    </div>
                    `)
                }
            });
            textTipHeightControl();
        }
}

//Р¤РёР»СЊС‚СЂР°С†РёСЏ РїРѕ РєР»РёРєСѓ РЅР° СЃС‚Р°С‚СѓСЃ Р·Р°РєР°Р·Р° РІ РёСЃС‚РѕСЂРёРё Р·Р°РєР°Р·РѕРІ
function statusFilter(index) {
    $('.statusFilter .multiSelect__dropdown_item[data-value="'+ index +'"]').trigger('click');
}
$(document).ready(function() {
    if($('.statusFilter').length) {
        $('[data-action="FILTER_STATUS"]').click(function(i, val) {
            statusFilter(9);
         });
    }

    addTipsForBtn();
    //Р”РѕР±Р°РІР»РµРЅРёСЏ РїРѕРґСЃРєР°Р·РѕРє Рє РєРЅРѕРїРєР°Рј 


    //Р’С‹РіСЂСѓР·РєР° РєР°С‚Р°Р»РѕРіР°, СЃС‚СЂР°РЅРёС†Р° /cabinet/export-catalog
    // if($('#export-catalog').length) {
    //     $('#export-catalog').on('submit', function(e) {
    //         e.preventDefault();

    //         var _this = $(this);
    //         var categoryArray = [];
    //         var chechedInput = _this.find('[data-category-input]:checked');
    //         chechedInput.each(function(i, el) {
    //             categoryArray.push($(el).val())
    //         });

    //         $.ajax({
    //             url: _this.attr('action'),
    //             type: "POST",
    //             data: {
    //                 category_ids: categoryArray
    //             },
    //             contentType: false,
    //             dataType: "json",
    //             processData: false,
    //             success: function(data) {
                    
    //             },
    //         })

    //     });
    // }

    if($('#catalogExportWrapper').length) {
        var catalogExportWrapper = $('#catalogExportWrapper');
        var catalogElemCheckbox = catalogExportWrapper.find('[data-category-input]');
        var toggleAll = $('[data-checked-all]');

        catalogElemCheckbox.on('change', function() {
            var _this = $(this);
            var listElem = _this.parents('.catalogMenu__list_item').eq(0);

            if(_this.is(':checked')) {
                listElem.find('[data-category-input]').prop('checked', true);
            } else {
                listElem.find('[data-category-input]').prop('checked', false);
            }

            //РџРѕРґРЅРёРјР°СЋСЃСЊ С‡РµСЂРµР· СЂРѕРґРёС‚РµР»РµР№ Рё СЃС‚Р°РІР»СЋ РёР»Рё СЃРЅРёРјР°СЋ С‡РµРєР±РѕРєСЃС‹, РІ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ С‚РѕРіРѕ, СЃС‚РѕСЏС‚ РѕРЅРё РёР»Рё РЅРµС‚ Сѓ РґРµС‚РµР№
            listElem.prevObject.each(function(i, el) {
                var prevObject = $(el).find('.catalogMenu__list_trigger').eq(0);
                var prevObjectChildCheckbox = prevObject.parents('.catalogMenu__list_item').eq(0);
                if(_this.is(':checked')) {
                    if(prevObjectChildCheckbox.find('.catalogMenu__list [data-category-input]').length === prevObjectChildCheckbox.find('.catalogMenu__list [data-category-input]:checked').length) {
                        prevObject.find('[data-category-input]').prop('checked', true);
                    }
                } else {
                    prevObject.find('[data-category-input]').prop('checked', false);
                }
            });

            if(toggleAll.length) {
                if(catalogExportWrapper.find('[data-category-input]:checked').length === catalogElemCheckbox.length) {
                    toggleAll.prop('checked', true);
                } else {
                    toggleAll.prop('checked', false);
                }
            }
        });

        if(toggleAll.length) {
            toggleAll.on('change', function() {
                var _this = $(this);
                var wrapper = $(_this.attr('data-checkbox-wrapper-selector'));
    
                wrapper.find('[data-category-input]').prop('checked', _this.is(':checked'));
            })
        }
    }
});