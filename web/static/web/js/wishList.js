//Р”РѕР±Р°РІРёС‚СЊ РµС‰Рµ 1 С‚РѕРІР°СЂ
function plusProductWishlist(id) {
    var $input = $("#items_div_" + id).find(".number input");

    $input.val(parseInt($input.val()) + 1);
    updateCountProductWishlist(id, "1");
    return false;
}

//РЈР±СЂР°С‚СЊ 1 С‚РѕРІР°СЂ
function minusProductWishlist(id) {
    var $input = $("#items_div_" + id).find(".number input");
    var current = parseInt($input.val());

    var count = current - 1;

    count = count < 1 ? 1 : count;
    $input.val(count);

    if (current > 1) {
        updateCountProductWishlist(id, "-1");
    }
    return false;
}

//Р—Р°РїСЂРѕСЃ РЅР° Р±РµРє РєРѕС‚РѕСЂС‹Р№ Р·Р°РїРёСЃС‹РІС‹РµС‚ РЅРѕРІСѓСЋ РёРЅС„РѕСЂРјР°С†РёСЋ
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
            // $("#product_total_" + id).html("");
            // $("#product_total_" + id).html(data.format_total_product);
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

//РћР±РЅРѕРІРёС‚СЊ
function updateTotalWishlist(id) {
    var $products = $("#tbody_withlist_table").find(".main-product"),
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

//РЈРґР°Р»РёС‚СЊ РїСЂРѕРґСѓРєС‚ РёР· Р»РёСЃС‚Р° Р¶РµР»Р°РЅРёР№
function deleteProductWishlist(id) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);

    $.ajax({
        url: "/wishlist/product-delete",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $("#items_div_" + id).remove();
            updateTotalWishlist(id);

            checkForAnaloguesWishlist($(".matchGoodsButton"));
        },
        error: function(data) {
            alert(data.responseJSON.message);
        }
    });

    return false;
}

//РЎРєРѕРїРёСЂРѕРІР°С‚СЊ РїСЂРѕРґСѓРєС‚
function withlistCopyItems(id, del) {
    var fdata = new FormData(),
        allCheckedInput = $("#withlist_table input:checked");

    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("to_id", id);
    fdata.append("del", del);

    allCheckedInput.each(function() {
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

//РџРѕРєР°Р·С‹РІР°РµС‚ РёР»Рё СЃРєСЂС‹РІР°РµС‚ РєР°СЂС‚РёРЅРєРё С‚РѕРІР°СЂР°
function toggleVisibleImage() {
    if ($(".imageDisplay #check1").is(":checked")) {
        $(".main-product")
            .find(".imageToHide")
            .show();

        setOption({
            key: "wishImg",
            value: "true"
        });
        // window.localStorage.removeItem('wishImg');
        // window.localStorage.setItem('wishImg', "true");
    } else {
        $(".main-product")
            .find(".imageToHide")
            .hide();

        setOption({
            key: "wishImg",
            value: "false"
        });
        // window.localStorage.removeItem('wishImg');
        // window.localStorage.setItem('wishImg', "false");
    }
}

//Р’С‹Р±СЂР°С‚СЊ РІСЃРµ С‚РѕРІР°СЂС‹ РёР»Рё СѓР±СЂР°С‚СЊ РІС‹РґРµР»РµРЅРёРµ
function toggleSelectAllItem() {
    if ($(".imageDisplay #check_select_all").is(":checked")) {
        $(".main-product .checkLabel input").prop("checked", true);
        wishListDisableButton();
    } else {
        $(".main-product .checkLabel input").prop("checked", false);
        wishListDisableButton();
    }
}

function wishlistSort() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("sort", $("#wishlist_sort").val());
    fdata.append("id", $("#withlist_table").attr("data-id"));

    $("#withlist_table .main-product input:checkbox:checked").each(function() {
        fdata.append("ids[]", $(this).val());
    });

    $.ajax({
        url: "/wishlist/sort",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            if (data.html) {
                $("#tbody_withlist_table").html("");
                $("#tbody_withlist_table").append(data.html);
                toggleVisibleImage();
                toggleSelectAllItem();

                $("#tbody_withlist_table").addClass("sorted");
            }
        },
        error: function(data) {
            showSystemPopup("", data.responseJSON.message);
        }
    });

    return false;
}

//Р”РѕР±Р°РІР»РµРЅРёРµ РїР°РїРєРё
function wishlistNewFolder(type) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    fdata.append("title", $("#" + (type == 1 ? "wishlist_folder_name" : "wishlist_preOrderFolder_name")).val());
    fdata.append("type", type);

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

            document.location.href = data.redirect;
        },
        error: function(data) {}
    });

    return false;
}

function wishlistGetOrders() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

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

            if (current_orders.length > 0) {
                var html = "";

                var popUpList = $('[data-popup="orderActionList"] .orderActionPopup__body');
                dispatcher({
                    type: "OPEN_POPUP",
                    payload: "orderActionList"
                });

                for (var i = 0; i < current_orders.length; i++) {
                    var id = current_orders[i].id,
                        created = current_orders[i].created_at;

                    html += '<div class="choice-order-item" data-id="' + id + '">#' + id + " РѕС‚ " + created + "Рі</div>";
                }

                popUpList.append(html);

                $(".choice-order-item").off("click");

                $(".choice-order-item").on("click", function() {
                    var id = $(this).attr("data-id");

                    $(".choice-order-item").addClass("_disabled");
                    wishlistToOrder(id, true);
                });
            }
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

function wishlistToOrder(order_id, choice) {
    var order_id = order_id || false,
        choice = choice || false;

    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $("#withlist_table #tbody_withlist_table input:checkbox:checked").each(function() {
        fdata.append("ids[]", $(this).val());
    });

    if (order_id) {
        fdata.append("order_id", order_id);
    }

    fdata.append("type", $("[data-popup='orderAction'] .orderAction__label_input:checked").val());

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

                if ($(".choice-order-item").length === 0) {
                    dispatcher({
                        type: "CLOSE_POPUP_ALL"
                    });
                }
            }
            // else {
            //     $("#kompred-popup-details10")
            //         .find(".form-err")
            //         .html(data.message)
            //         .addClass("_success")
            //         .show();
            // }

            // $(".addnew")
            //     .find(".form-err")
            //     .addClass("_success")
            //     .text(data.message)
            //     .show();

            // $(".addnew")
            //     .find(".use-popup-btn")
            //     .addClass("_disabled");

            // setTimeout(function() {
            //     $(".addnew").fadeOut();
            // }, 1500);
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
            }
            // else {
            //     $("#kompred-popup-details10")
            //         .find(".form-err")
            //         .html(data.responseJSON.message)
            //         .show();
            // }

            // $(".addnew")
            //     .find(".form-err")
            //     .text(data.responseJSON.message)
            //     .show();
        }
    });

    return false;
}

//РџРµСЂРµРёРјРµРЅРѕРІР°С‚СЊ РїР°РїРєРё
function wishlistRenameFolder(id) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);
    fdata.append("new_name", $("#renameFolderInput").val());
    fdata.append("folder_copy", $("#folderPopUpCopyFolder").val());
    fdata.append("folder_rename", $("#resortFolder").val());

    // $(".kompred-popup-details44")
    //     .find(".form-err")
    //     .html("")
    //     .hide();

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
            // $(".kompred-popup-details44")
            //     .find(".form-err")
            //     .html(data.responseJSON.message)
            //     .show();
        }
    });

    return false;
}

function wishListDisableButton() {
    if ($("#withlist_table .main-product input:checked").length) {
        $('[data-target="addInConstructor"]').removeClass("disable");
        $('[data-target="orderAction"]').removeClass("disable");
        $('[data-target="wishlistSendEmail"]').removeClass("disable");
    } else {
        $('[data-target="addInConstructor"]').addClass("disable");
        $('[data-target="orderAction"]').addClass("disable");
        $('[data-target="wishlistSendEmail"]').addClass("disable");
    }
}

//РЈРґР°Р»РµРЅРёРµ РїР°РїРєРё
function wishlistDeleteFolder(id) {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);

    //Р—Р°РєСЂС‹РІР°СЋ РІСЃРµ РїРѕРїР°РїС‹
    dispatcher({
        type: "CLOSE_POPUP_ALL"
    });

    $.ajax({
        url: "/wishlist/delete-folder",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            $('.dirWrapper.wishMenu__list_item[data-folderId="' + id + '"]').remove();
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

// Р”РѕР±Р°РІР»РµРЅРёРµ С‚РѕРІР°СЂР° РІ РєРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ РљРџ
function wishlistToConstructor() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    $("#tbody_withlist_table  input:checked").each(function() {
        fdata.append("ids[]", $(this).val());
    });

    fdata.append("type", $("input[name=constructor_activity]:checked").val());

    //Р—Р°РєСЂС‹РІР°СЋ РІСЃРµ РїРѕРїР°РїС‹
    dispatcher({
        type: "CLOSE_POPUP_ALL"
    });

    $.ajax({
        url: "/wishlist/to-constructor",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            showSystemPopup("РЈСЃРїРµС…", data.message);
        },
        error: function(data) {
            showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
        }
    });

    return false;
}

//РџРѕР»СѓС‡РµРЅРёРµ СЃРїРёСЃРєР° РїР°РїРѕРє РґР»СЏ РїРѕРїР°РїР° СЃРјРµРЅС‹ РёРјРµРЅРё РїР°РїРєРё
function wishlistGetUserFolders() {
    var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

    return $.ajax({
        url: "/wishlist/get-user-folders",
        type: "POST",
        data: fdata,
        contentType: false,
        dataType: "json",
        processData: false,
        success: function(data) {
            // alert(data);
            return data.folders;
        },
        error: function(data) {
            showSystemPopup(data.responseJSON.message);
            return false;
        }
    });
}

$(document).ready(function() {
    if ($(".wish__wrapper").length) {
        // РџСЂРё РёР·РјРµРЅРµРЅРёРµ Р·РЅР°С‡РµРЅРё РІ РёРЅРїСѓС‚Рµ, Р·Р°РїСѓСЃРєР°РµРј СЃРєСЂРёРїС‚ РґРѕР±Р°Р»РµРЅРёСЏ С‚РѕРІР°СЂРѕРІ
        $(document).on("change", ".tableCasual__row .order-value", function(e) {
            e.stopPropagation();

            var id = $(this)
                    .parents(".main-product")
                    .attr("data-ev-id"),
                prev_val = parseInt($(this).attr("data-val")),
                this_val = $(this).val();

            if (this_val < 1) $(this).val(1);

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

        getOption({
            key: "wishImg",
            successCallback: function(resp) {
                if (resp == "true") {
                    $(".wishContainer")
                        .find("#check1")
                        .prop("checked", true);

                    $(".main-product")
                        .find(".imageToHide")
                        .show();
                } else {
                    $(".wishContainer")
                        .find("#check1")
                        .prop("checked", false);

                    $(".main-product")
                        .find(".imageToHide")
                        .hide();
                }
            }
        });

        //РЈРїСЂР°РІР»РµРЅРёРµ РѕС‚РѕР±СЂР°Р¶РµРЅРёРµРј РєР°СЂС‚РёРЅРѕРє РІ С‚РѕРІР°СЂРµ
        $(".imageDisplay #check1").on("change", toggleVisibleImage);

        //Р’С‹Р±СЂР°С‚СЊ РІСЃРµ С‚РѕРІР°СЂС‹ РёР»Рё СѓР±СЂР°С‚СЊ РІС‹РґРµР»РµРЅРёРµ
        $(".imageDisplay #check_select_all").on("change", toggleSelectAllItem);

        //РџРµСЂРµРјРµСЃС‚РёС‚СЊ РІС‹Р±СЂР°РЅРЅС‹Рµ РїРѕР·РёС†РёРё / РЎРєРѕРїРёСЂРѕРІР°С‚СЊ РІС‹Р±СЂР°РЅРЅС‹Рµ РїРѕР·РёС†РёРё
        $("#wishlist_changePosition, #wishlist_copy").on("change", function() {
            var allCheckedInput = $("#tbody_withlist_table input:checked");

            if (allCheckedInput.length === 0) {
                $(this)
                    .parents(".customSelect")
                    .find(".customSelect__refresh")
                    .trigger("click");
                //РџРѕРєР°Р·С‹РІР°РµРј РїРѕРїР°Рї СЃ СЃРѕРѕР±С‰РµРЅРёРµРј
                showSystemPopup("Р’РЅРёРјР°РЅРёРµ", "Р’С‹ РЅРµ РІС‹Р±СЂР°Р»Рё С‚РѕРІР°СЂ");
                return false;
            }

            //РџРµСЂРµРјРµСЃС‚РёС‚СЊ РІС‹Р±СЂР°РЅРЅС‹Рµ РїРѕР·РёС†РёРё
            if ($(this).is("#wishlist_changePosition")) {
                withlistCopyItems($(this).val(), 1);
            }
            //РЎРєРѕРїРёСЂРѕРІР°С‚СЊ РІС‹Р±СЂР°РЅРЅС‹Рµ РїРѕР·РёС†РёРё
            else if ($(this).is("#wishlist_copy")) {
                withlistCopyItems($(this).val(), 0);
            }
        });

        //РћС‚РєСЂС‹РІР°РµС‚ РїРѕРїР°Рї СЃ РїРµСЂРµРёРјРµРЅРѕРІР°РЅРёРµРј РїР°РїРєРё
        $("[data-openRenameFolder]").click(function() {
            dispatcher({
                type: "OPEN_POPUP",
                payload: "wishlistRenameFolder"
            });

            var folders = wishlistGetUserFolders(),
                selects = $(".popup-wishlistRenameFolder").find("select.wishlistRenameFolder__select"),
                folderName = $('.wishMenu__list_item[data-folderid="' + $(this).attr("data-id") + '"] .wishMenu__list_folderName')
                    .text()
                    .trim();

            selects.styler("destroy");
            selects.html("");
            selects.append('<option value=""></option>');
            folders
                .then(resp => resp.folders)
                .then(folders =>
                    folders.map(function(val) {
                        selects.append('<option value="' + val.id + '">' + val.title + "</option>");
                    })
                )
                .then(() => selects.styler());

            $(".popup-wishlistRenameFolder").attr("data-id", $(this).attr("data-id"));
            $(".popup-wishlistRenameFolder #renameFolderInput").val(folderName);
        });

        //РћС‚РєСЂС‹РІР°РµС‚ РїРѕРїР°Рї СЃ СѓРґР°Р»РµРЅРёРµРј РїР°РїРєРё
        $("[data-openDeleteFolderPopUp]").click(function() {
            dispatcher({
                type: "OPEN_POPUP",
                payload: "wishlistDeleteFolder"
            });

            $(".popup-wishlistDeleteFolder").attr("data-id", $(this).attr("data-id"));
        });

        //РџРµСЂРµРёРјРµРЅРѕРІР°РЅРёРµ РїР°РїРєРё
        $("[data-wishListApplyRenameFolder]").click(function() {
            id = $(this)
                .parents(".popup")
                .attr("data-id");
            wishlistRenameFolder(id);
        });

        //РЈРґР°Р»РµРЅРёРµ РїР°РїРєРё
        $("[data-wishListDelteFolder]").click(function() {
            id = $(this)
                .parents(".popup")
                .attr("data-id");
            wishlistDeleteFolder(id);
        });

        //Р’С‹РєР»С‡Р°РµРј РєРЅРѕРїРєРё РµСЃР»Рё РЅРµС‚ РІС‹РґРµР»РµРЅРЅС‹С… С‚РѕРІР°СЂРѕРІ
        $(document).on("change", ".main-product input", function() {
            wishListDisableButton();
        });
        wishListDisableButton();
    }
});