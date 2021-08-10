//РѕС‚РєСЂС‹С‚РёРµ Рё Р·Р°РєСЂС‹С‚РёРµ РјРµРЅСЋ
function toggleMenu() {
  if ($(".alpha-mobile-logged").hasClass("active")) {
    toggleMenuAlpha();
  }

  $(".btn-burger").toggleClass("btn-burger-active");
  $(".header__menu-mobile").toggleClass("header__menu-mobile-active");

  if ($("html")[0].style.position == "fixed") {
    stopScroll(false);
  } else {
    stopScroll(true);
  }
}

//РћС‚РєСЂС‹С‚РёРµ Рё Р·Р°РєСЂС‹С‚РёРµ Р°Р»СЊС„Р°-РїРѕРїР°
function toggleMenuAlpha() {
  if ($(".btn-burger").hasClass("btn-burger-active")) {
    toggleMenu();
  }

  $(".alpha-mobile-logged").toggleClass("active");

  if ($(".alpha-mobile-logged").hasClass("active")) {
    $(".alpha-mobile-logged")
      .find("img")
      .attr("src", "/media/images/cross.png");
  } else {
    $(".alpha-mobile-logged")
      .find("img")
      .attr("src", "/media/images/avatar.svg");
  }

  $(".alpha__menu-mobile").toggleClass("alpha__menu-mobile-active");

  if ($("html")[0].style.position == "fixed") {
    stopScroll(false);
  } else {
    stopScroll(true);
  }
}

function toggleSlideFilter(el) {
  el.next("[toggleSlideElem]").slideToggle();
  el.toggleClass("btn-toggleSlideFilter-active");
}

function playVideoInVideoBlock(el) {
  this.parent = el.parents(".videoBlock");
  this.iframe = this.parent.find("iframe");
  this.autoPlayYouTubeVideo = this.iframe.attr("src") + "?autoplay=1";

  this.iframe.addClass("videoBlock__iframe-active");
  this.iframe.attr("src", this.autoPlayYouTubeVideo);
}

function playVideoInVideoSlider(payload, el) {
  this.parent = el
    .parents(".excursion")
    .find(".excursion__headerVideo .videoBlock");
  this.iframeInExcursHeader = this.parent.find("iframe");
  this.videoBlockPreview = this.parent.find(".videoBlock__preview");

  this.autoPlayYouTubeVideo = payload.videoUrl + "?autoplay=1";
  this.previewImage = payload.previewImage;

  //РЎР±СЂРѕСЃ РїР°СЂР°РјРµС‚СЂРѕРІ
  this.iframeInExcursHeader.attr("src", "");
  $(".videoBlock__iframe").removeClass("videoBlock__iframe-active");

  //Р’СЃС‚Р°РІР»СЏСЋ url РЅР° РІРёРґРѕСЃ РІ .excursion__headerVideo
  this.iframeInExcursHeader.attr("src", payload.videoUrl);

  //Р’СЃС‚Р°РІР»СЏСЋ url РЅР° РїСЂРµРІСЊСЋ РІ .excursion__headerVideo
  this.videoBlockPreview.css({
    "background-image": "url(" + this.previewImage + ")"
  });

  $(".videoSlider__item-active").removeClass("videoSlider__item-active");
  el.parents(".videoSlider__item").addClass("videoSlider__item-active");

  if (!this.parent.is(":visible")) {
    openPopUp("videoPlayer");
    $(".popUp-videoPlayer iframe").attr("src", this.autoPlayYouTubeVideo);
  }
}

function closePopUp() {
  $(".popUp-wrapper").removeClass("popUp-wrapper-active");
  $(".popUp-wrapper [data-type]").removeClass("popUp-active");
  $(".popUp-wrapper iframe").attr("src", "");

  if ($("#filter_product_list .account-history-content")) {
    $("#filter_product_list .account-history-content").html("");
  }
  stopScroll(false);
}

function switchProductCartInfo(el) {
   
  this.type = el.attr("data-type");

  $(".productCart__info_navItem-active").removeClass(
    "productCart__info_navItem-active"
  );
  $(".productCart__info_tabItem-active").removeClass(
    "productCart__info_tabItem-active"
  );

  el.addClass("productCart__info_navItem-active");
  $('.productCart__info_tabItem[data-type="' + this.type + '"]').addClass(
    "productCart__info_tabItem-active"
  );
  
  if(this.type == 'AWTacademy') {
      $('.productCart__info_tabItem[data-type="AWTacademy"]').css("display","flex");
  } else {
      $('.productCart__info_tabItem[data-type="AWTacademy"]').css("display","");
  }

  if (productCartInfoNav != 0) {
    productCartInfoNav.slideTo(
      $(el)
        .parent()
        .index()
    );
  }
}

function productCounter(el, type) {
  this.input = el.parents(".product__counter").find("input");
  this.newValue = this.input.val();
  // is("Number", parseInt(this.input.val(this.newValue), 10))
  if (
    !is("Number", parseInt(this.input.val(this.newValue), 10)) ||
    this.input.val() == "NaN" ||
    this.input.val() == 1
  ) {
    this.input.val(1);
  }

  switch (type) {
    case "minus":
      this.newValue = parseInt(this.input.val(), 10) - 1;
      break;
    case "plus":
      this.newValue = parseInt(this.input.val(), 10) + 1;
      break;
  }

  if (this.newValue < 1) {
    return false;
  }

  this.input.val(this.newValue);
}

function refreshSelect(el) {
  // console.log(event);
  this.parent = el.parents(".customSelect");
  this.select = this.parent.find("select");
  // this.placeholder = this.select.attr("data-placeholder");
  // this.jqSelect = this.parent.find(".jq-selectbox__select");

  // this.jqSelect.find(".jq-selectbox__select-text").addClass("placeholder");
  // this.jqSelect.find(".jq-selectbox__select-text").html(this.placeholder);
  // this.parent.find(".jq-selectbox__dropdown li").removeClass("selected sel");
  // this.parent.find('')
  this.select.styler("destroy");
  this.select.val("");
  this.select.styler({
    selectVisibleOptions: 7
  });
  el.hide();
}

function toggleFilterList(el) {
  this.parent = el.parents(".catalogMenu__list_item")[0];

  if (this.parent.dataset.status === "open") {
    this.parent.dataset.status = "close";
  } else if (this.parent.dataset.status === "close") {
    this.parent.dataset.status = "open";
  }
}

//News

let newsOffset = 0;
let newsLimit = 9;

function get_news(category_slug, offset) {
  var fdata = new FormData();
  let category = category_slug;

  fdata.append("category_slug", category_slug);

  fdata.append("offset", offset);

  fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

  $(".tabs_content").removeClass("active");

  $(".showMore").css({ visibility: "hidden" });

  $.ajax({
    url: "/news",
    type: "POST",
    data: fdata,
    contentType: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      // console.log(data);

      let dataArr = data.data.news;

      let newsNode = fabricateNewsNode(dataArr);

      appendDomNode(newsNode, ".plateList");

      newsOffset = newsOffset + newsLimit;

      if (newsOffset < data.count_news) {
        $(".showMore").show();
        $(".showMore").css({ visibility: "visible" });
      } else {
        $(".showMore").hide();
      }
      dynamicBorder3();

      return data;
    },
    error: function(data) {
      alert(data.responseJSON.message);
    }
  });

  // change_url("?category_slug=" + category_slug + "&offset=" + offset);
  // $(window).scrollTop(0);
  // return newsArr;
}

function fabricateNewsNode(arr) {
  let newArr = arr.map(function(newsItem) {
    let extraClass =
      newsItem.image == "" || newsItem.image == undefined ? "emptyImg" : "";

    return (
      '<a href="' +
      newsItem.link +
      '" class="catalog__item" data-type="' +
      newsItem.type +
      '">' +
      '<div class="catalog__item_top">' +
      '<div class="catalog__item_image ' +
      extraClass +
      '" style="background-image: url(' +
      newsItem.image +
      ');">' +
      "</div>" +
      '<div class="catalog__item_text">' +
      newsItem.title +
      "</div>" +
      "</div>" +
      '<div class="catalog__item_bottom">' +
      '<div class="catalog__item_mark">' +
      newsItem.publication_date +
      "</div>" +
      "</div>" +
      "</a>"
    );
  });

  return newArr;
}

function changeNewsFilter(el) {
  this.type = el.attr("data-filter");
  this.index = el.attr("data-index");

  $(".newsFilter__item").removeClass("active");
  el.addClass("active");

  newsOffset = 0;

  $(".plateList").html("");

  if (this.type != "all") {
    let newsObj = get_news(this.type);
  } else {
    let newsObj = get_news();
  }

  if (filterSwiper) {
    filterSwiper.slideTo(this.index);
  }
}

function showMoreNews(el) {
  this.activeTab = $(".newsFilter__item.active").attr("data-filter");

  if (newsOffset == 0) {
    newsOffset = newsOffset + newsLimit;
  }

  get_news(activeTab, newsOffset);
}

function appendDomNode(arr, selector) {
  $(selector).append(arr);
}

function changeContactsFilter(el) {
  this.type = el.attr("data-filter");
  this.index = el.attr("data-index");

  $(".contactsFilter__item").removeClass("active");
  el.addClass("active");

  if (contactFilterSwiper) {
    contactFilterSwiper.slideTo(this.index);
  }

  $(".contactsContainer__item").removeClass("active");
  $('.contactsContainer__item[data-type="' + this.type + '"]').addClass(
    "active"
  );
}

function openHeaderSearch(el) {
  this.input = el.siblings(".input-search");
  event.stopPropagation();
	
  if (this.input.hasClass("active")) {
    this.input.submit();
  }
  else {
    this.input.addClass("active");
    this.input.find("input").trigger("focus");
  }
  
}

function putInSearch(el) {
  this.content = el.text();

  el.parents(".autocomplete")
    .siblings("input")
    .val(this.content);
  el.parents(".autocomplete")
    .siblings("input")
    .text(this.content);
}

function openPopup(el, _type) {
  var type = "";

  if (el == null || el == undefined) {
    type = _type;
  } else {
    type = el.attr("data-target");
  }

  $(".popups").addClass("active");
  $('.popup[data-popup="' + type + '"]').addClass("active");
  $(".content").addClass("blur");
  $(".header").addClass("blur");
  $(".footer").addClass("blur");
  $(".breadCrumb").addClass("blur");

  stopScroll(true);

  setTimeout(function() {
    if (
      $('.popup[data-popup="' + type + '"]').innerHeight() > window.innerHeight
    ) {
      $(".popups").css("overflow", "auto");
      $('.popup[data-popup="' + type + '"]').css({
        top: 0,
        margin: "20px 0",
        transform: "translate(-50%, 0)"
      });
    } else {
      $('.popup[data-popup="' + type + '"]').css({
        top: "50%",
        margin: "0",
        transform: "translate(-50%, -50%)"
      });
    }
  }, 0);
}

// Р”РѕР±Р°РІР»РµРЅРёРµ РІ Р»РёСЃС‚ Р¶РµР»Р°РЅРёР№ РїСЂРё РєР»РёРєРµ РЅР° СЃРµСЂРґРµС‡РєРѕ
var toggleProductStateInWishlist = {
  add: function(el, withlist_id) {
    event.stopPropagation();
    event.preventDefault();

    var wishlist_id = wishlist_id || false;
    var $trigger = $trigger || false;

    var fdata = new FormData();
    fdata.append(
      "_csrf-frontend",
      $('meta[name="csrf-token"]').attr("content")
    );
    fdata.append("catalog_id", el.attr("data-id"));
    fdata.append("wishlist_id", wishlist_id);

    var count = 1;

    fdata.append("count", count);

    $.ajax({
      url: "/wishlist/product-add",
      type: "POST",
      data: fdata,
      contentType: false,
      dataType: "json",
      processData: false,
      success: function(data) {
        showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);

        el.parents(".catalog__item").attr("data-favorite", "true");
      },
      error: function(data) {
        showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
      }
    });

    return false;
  },
  delete: function(el) {
    event.stopPropagation();
    event.preventDefault();

    var fdata = new FormData();
    fdata.append(
      "_csrf-frontend",
      $('meta[name="csrf-token"]').attr("content")
    );
    fdata.append("catalog_id", el.attr("data-id"));

    $.ajax({
      url: "/wishlist/product-delete",
      type: "POST",
      data: fdata,
      contentType: false,
      dataType: "json",
      processData: false,
      success: function(data) {
        showSystemPopup("РЎРїР°СЃРёР±Рѕ!", data.message);

        el.parents(".catalog__item").attr("data-favorite", "false");
      },
      error: function(data) {
        showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
      }
    });

    return false;
  }
};

function closePopupAll(el) {
  // $(".popups").css("overflow", "hidden");

  if ($(".popup-addItemInWishlist:visible").length) {
    $(".popup-addItemInWishlist")
      .find(".popup-cross")
      .trigger("click");
  }

  if ($(".popup-addItemInOrder:visible").length) {
    $(".popup-addItemInOrder")
      .find(".popup-cross")
      .trigger("click");
  }

  // if ($('.popup-addItemInConstructor:visible').length) {
  //     $('.popup-addItemInConstructor').find('.popup-cross').trigger('click');
  // }

  if ($("#filter_product_list .account-history-content")) {
    $("#filter_product_list .account-history-content").html("");
  }

  if ($(".activeVideo").length) {
    $(".activeVideo")
      .find("iframe")
      .attr("src", "");
    $(".activeVideo").removeClass("activeVideo");
  }

  $(".popups").removeClass("active");
  $(".popup").removeClass("active");
  $(".content").removeClass("blur");
  $(".header").removeClass("blur");
  $(".footer").removeClass("blur");
  $(".breadCrumb").removeClass("blur");

  $("html").css("overflow", "auto");
  stopScroll(false);
}

function closePopup(el) {
  $('div[data-popup="system"]').removeClass("active");

  this.popup = el.parents(".popup");
  this.popup.removeClass("active");

  if (!$(".popup.active").length) {
    closePopupAll(el);
  }
}

function changeRegAuthTab(el) {
  this.direction = el.attr("data-direction");

  $(".popup__formField_item").removeClass("active");
  $('.popup__formField_item[data-form="' + this.direction + '"]').addClass(
    "active"
  );
}

function catalogAmountControl(el) {
  event.stopPropagation();
  event.preventDefault();

  this.direction = el.attr("data-direction");
  this.counter = el.siblings(".amount__control_counter");
  this.counter.val = parseInt(this.counter.attr("data-value"));

  if (this.direction == 0 && this.counter.val >= 2) {
    this.counter.attr("data-value", this.counter.val - 1);
    this.counter.text(this.counter.val - 1);
  } else if (this.direction == 1) {
    this.counter.attr("data-value", this.counter.val + 1);
    this.counter.text(this.counter.val + 1);
  }
}

function addToCart(el) {
  event.stopPropagation();
  event.preventDefault();

  this.product = el.attr("data-product");
  this.amount = parseInt(
    el.siblings(".amount__control_counter").attr("data-value")
  );

  addProduct(product, amount);
}

function addToCartSolo(el) {
  event.stopPropagation();
  event.preventDefault();

  this.product = $("#catalog_one").attr("data-id");
  this.amount = $("#count_product").val();

  addProduct(product, amount);
}

let testAnswers = [];

function sendQuestionAnswer(el) {
  let newsId = el.parents(".container").attr("news_id");

  el.question = el
    .parents(".questionBlock")
    .find("input")
    .attr("data-question");
  el.answer = [];

  el.parents(".questionBlock__buttons")
    .siblings(".testList")
    .find("input")
    .each(function() {
      let that = $(this);

      if (that.is(":checked")) {
        el.answer.push(that.attr("data-answer"));
      }
    });

  el.answers = el.answer.join();

  testAnswers.push({
    testQuestion: "question[" + el.question + "]",
    testAnswer: el.answers
  });

  // console.log(testAnswers);

  saveAnswerQuestion(newsId, testAnswers);
}

function testControl(el, direction) {
  let questionCount = parseInt(
    el.parents(".questionBlock").attr("data-question")
  );

  if (direction == "prev" && questionCount > 1) {
    el.parents(".questionBlock").removeClass("active");
    $('.questionBlock[data-question="' + (questionCount - 1) + '"]').addClass(
      "active"
    );
  } else if (direction == "next") {
    el.question = el
      .parents(".questionBlock")
      .find("input")
      .attr("data-question");
    el.answer = [];

    el.parents(".questionBlock__buttons")
      .siblings(".testList")
      .find("input")
      .each(function() {
        let that = $(this);

        if (that.is(":checked")) {
          el.answer.push(that.attr("data-answer"));
        }
      });

    el.answers = el.answer.join();

    testAnswers.push({
      testQuestion: "question[" + el.question + "]",
      testAnswer: el.answers
    });

    el.parents(".questionBlock").removeClass("active");
    $('.questionBlock[data-question="' + (questionCount + 1) + '"]').addClass(
      "active"
    );
  }
}

function nextButtonControl(el) {
  event.preventDefault();
  event.stopPropagation();

  if (el.find("input").prop("checked")) {
    el.find("input").prop("checked", false);

    if (
      el
        .parents(".questionBlock")
        .find("input")
        .is(":checked")
    ) {
      el.parents(".questionBlock")
        .find("div[sendQuestion]")
        .removeClass("btn-disabled");
    } else {
      el.parents(".questionBlock")
        .find("div[sendQuestion]")
        .addClass("btn-disabled");
    }
  } else {
    el.find("input").prop("checked", true);

    if (
      el
        .parents(".questionBlock")
        .find("input")
        .is(":checked")
    ) {
      el.parents(".questionBlock")
        .find("div[sendQuestion]")
        .removeClass("btn-disabled");
    } else {
      el.parents(".questionBlock")
        .find("div[sendQuestion]")
        .addClass("btn-disabled");
    }
  }
}

function removeImageFromInput(el) {
  $("#upload_file").val(null);

  $(".uploadFileBlock__preview").html("");

  $("#upload_file").parents(".uploadFileBlock").find(".uploadFileBlock__btn").toggleClass("active");
}

function removeImageFromLogoInput(el) {
  $("#upload_constructor_logo").val(null);

  $(".uploadFileBlock__preview-logo").html("");

  $("#upload_constructor_logo").parents(".uploadFileBlock").find(".uploadFileBlock__btn").toggleClass("active");
}

//РћС‚РїСЂР°РІРєР° РЅРѕРІРѕР№ Р»РёС‡РЅРѕР№ РёРЅС„РѕСЂРјР°С†РёРё
function submitNewPersonalInfo(el) {
  event.preventDefault();
  event.stopPropagation();

  var fdata = new FormData();

  let lastName = $("#lname").val();
  let firstName = $("#fname").val();
  let parentName = $("#pname").val();
  let phoneNumber = $("#phone").val();
  let phoneNumberAdditional = $("#phone_additional").val();
  let birthdayDate = $("#birthday").val();
  let occupation = $("#post").val();
  let gender = $("#gender").val();

  if ($("#is_notice:checked").length) {
    let emailNotice = "on";
    fdata.append("is_notice", emailNotice);
  }

  fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
  fdata.append("lname", lastName);
  fdata.append("fname", firstName);
  fdata.append("pname", parentName);
  fdata.append("phone", phoneNumber);
  fdata.append("phone_additional", phoneNumberAdditional);
  fdata.append("birthday", birthdayDate);
  fdata.append("post", occupation);
  fdata.append("gender", gender);

//$('#notification').children('input')

    //$('#notification > input').each(function () {
    $('input', $('#notification')).each(function () {
        fdata.append(this.name, $("input[name='"+this.name+"']:checked").length ? 'on' : '');
        //alert($(this.name).length); // "this" is the current element in the loop
    });
//alert('.');
  $.ajax({
    url: "/cabinet/account",
    type: "POST",
    data: fdata,
    contentType: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      if (data.message) {
        showSystemPopup("РЎРїР°СЃРёР±Рѕ", data.message);
      } else {
        showSystemPopup("РЎРїР°СЃРёР±Рѕ", "Р”Р°РЅРЅС‹Рµ СЃРѕС…СЂР°РЅРµРЅС‹");
      }

      return data;
    },
    error: function(data) {
      showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
    }
  });
}

//Р Р°Р±РѕС‚Р° СЃ Р·Р°РєР°Р·РѕРј
function copyOrder(el) {
  var id = el.attr("data-id");
  var fdata = new FormData();
  fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
  fdata.append("id", id);

  $.ajax({
    url: "/order/copy",
    type: "POST",
    data: fdata,
    contentType: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      //location.reload();
      showSystemPopup("РЎРїР°СЃРёР±Рѕ", data.message);
    },

    error: function(data) {
      //alert(data.responseJSON.message);
      showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
    }
  });

  return false;
}

function pdfOrder(el, id) {
  if (el == null) {
    var id = id;
  } else {
    var id = el.attr("data-id");
  }

  var fdata = new FormData();
  fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
  fdata.append("id", id);
  fdata.append("is_image", 1);

  $.ajax({
    url: "/order/pdf",
    type: "POST",
    data: fdata,
    contentType: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      window.open(data.result);
      return false;
    },
    error: function(data) {
      alert(data.responseJSON.message);
    }
  });

  return false;
}

function saveOrder(el) {
  var id = el.attr("data-id");
  var is_place = el.attr("data-isPlace") || false;

  var fdata = new FormData();
  fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
  fdata.append("id", id);
  
  if (is_place) {
    fdata.append("is_place", is_place);
  }

  $("#table_product")
    .find(".main-product")
    .each(function() {
      $(this)
        .find("td")
        .each(function() {
          if (
            $(this)
              .find('span[class="number"]')
              .attr("data-count") == 1
          ) {
            fdata.append(
              $(this)
                .find(".number")
                .attr("name"),
              $(this)
                .find(".number")
                .html()
            );
          }

          //@TODO РґРѕР±Р°РІРёС‚СЊ РґР°РЅРЅС‹Рµ РѕР±  Р°РєС‚СѓР»СЊРЅРѕСЃС‚Рё
        });
    });

  $.ajax({
    url: "/order/save",
    type: "POST",
    data: fdata,
    contentType: false,
    cache: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      if (data.redirect) {
        document.location.href = data.redirect;
      } else {
        showSystemPopup("РЎРїР°СЃРёР±Рѕ!", "Р—Р°РєР°Р· СЃРѕС…СЂР°РЅС‘РЅ");
      }

      //location.reload();
    },
    error: function(data) {
      showSystemPopup("РћС€РёР±РєР°!", data.responseJSON.message);
    }
  });

  return false;
}

function deleteOrderPopup(el) {
  var that = $(el);
  $('.popup[data-popup="removeOrderConfirm"]')
    .find(".btnYes")
    .attr("data-id", that.attr("data-id"));
  openPopupClear("removeOrderConfirm");
}

function openCopyLinkPopUp(el) {
  openPopupClear("copyUrl");
  var copyPopUp = $('[data-popup="copyUrl"].active');
  var inputLink = copyPopUp.find("input[data-copyInputId='link']");
  var fullInputLink = copyPopUp.find("input[data-copyInputId='full-link']");

  fullInputLink.val($(el).attr("data-full-link"));
  inputLink.val($(el).attr("data-link"));
}

function openPreviewLinkPopUp(data) {
  openPopupClear("previewLink");
  var popup = $('[data-popup="previewLink"]');
  popup.find('[data-preview-link]').attr('href', data);
  popup.find('[data-full-preview-link]').attr('href', data+'/full')
}

function copyLink(el) {
  var inputId = $(el).data("copyinputid");
  var input = $("input[data-copyInputId=" + inputId + "]");

  input.select();

  document.execCommand("copy");
}

function deleteOrder(el) {
  var id = el.attr("data-id");

  var fdata = new FormData();
  fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
  fdata.append("id", id);

  $.ajax({
    url: "/order/delete",
    type: "POST",
    data: fdata,
    contentType: false,
    cache: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      if (data.redirect) {
        document.location.href = data.redirect;
      }
    },
    error: function(data) {
      alert(data.responseJSON.message);
    }
  });

  return false;
}

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function saveOrderCommentInner(el) {
  var id = el.attr("data-id");

  var incomeText = $("#comment_inner").html().trim();
  var newText = incomeText.replace(/<br\s*[\/]?>/gi, "\n");

  var fdata = new FormData();
  fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
  fdata.append("id", id);
  fdata.append("comment_inner", newText);

  $.ajax({
    url: "/order/save-comment-inner",
    type: "POST",
    data: fdata,
    contentType: false,
    cache: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      showSystemPopup("РЎРїР°СЃРёР±Рѕ", data.message);
    },
    error: function(data) {
      showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
    }
  });

  return false;
}

function saveOrderAutoorderDelivery(el) {
  
  var id = el.attr("data-id");
  var fdata = new FormData();
    fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
    fdata.append("id", id);
    if ($("#order_formalization_inn").val()) {
        fdata.append("inn", $("#order_formalization_inn").val());
    }
    
    var delivery = $("input[name=delivery]:checked");
    var delivery_name = $("input[name='order_formalization_delivery_name']:visible");
    var delivery_fio = $("input[name='order_formalization_delivery_fio']:visible");
    var delivery_passport = $("input[name='order_formalization_delivery_passport']:visible");
    var delivery_time_start = $("select[name='order_formalization_time_start']:visible");
    var delivery_time_end = $("select[name='order_formalization_time_end']:visible");
    var delivery_phone = $("input[name='order_formalization_delivery_phone']:visible");
    var delivery_city = $("input[name='order_formalization_delivery_city']:visible");
    var delivery_inn = $("input[name='order_formalization_delivery_inn']:visible");
    var delivery_is_pay_recipient = $("input[name=order_formalization_delivery_is_pay_recipient]:visible");
    var delivery_pay_company = $("input[name='order_formalization_delivery_pay_company']:visible");
    var delivery_recipient_type = $('select[name="orderPerson"]:visible');
    var autoorder_is_attachment_documents = $('[name="autoorder_is_attachment_documents"]');
    var autoorder_is_glued_pipes = $('[name="autoorder_is_glued_pipes"]');
    var autoorder_date = $('#autoorder_date');

    fdata.append("delivery", delivery.val());
    delivery_name.val() !== undefined && 
        delivery_name.val() !== "" && 
        fdata.append("delivery_name", delivery_name.val());


    delivery_fio.val() !== undefined && 
        delivery_fio.val() !== "" && 
        fdata.append("delivery_fio", delivery_fio.val());

    delivery_passport.val() !== undefined && 
        delivery_passport.val() !== "" && 
        fdata.append("delivery_passport", delivery_passport.val());

    delivery_time_start.val() !== undefined && 
        delivery_time_start.val() !== "" && 
        fdata.append("delivery_time_start", delivery_time_start.val());

    delivery_time_end.val() !== undefined && 
        delivery_time_end.val() !== "" && 
        fdata.append("delivery_time_end", delivery_time_end.val());

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

    autoorder_is_attachment_documents.val() !== undefined &&
        fdata.append("autoorder_is_attachment_documents", Number(autoorder_is_attachment_documents.is(':checked')));

    autoorder_is_glued_pipes.val() !== undefined &&
        fdata.append("autoorder_is_glued_pipes", Number(autoorder_is_glued_pipes.is(':checked')));
    
    autoorder_date.val() !== undefined && 
        fdata.append("autoorder_date", autoorder_date.val());    
        
    
    if($('.input-error:visible').length) {
        $('html').animate({ 
            scrollTop: $('.input-error').eq(0).offset().top - $('.header').innerHeight() // РїСЂРѕРєСЂСѓС‡РёРІР°РµРј СЃС‚СЂР°РЅРёС†Сѓ Рє С‚СЂРµР±СѓРµРјРѕРјСѓ СЌР»РµРјРµРЅС‚Сѓ
        }, 500) // СЃРєРѕСЂРѕСЃС‚СЊ РїСЂРѕРєСЂСѓС‚РєРё

        $(el).removeClass("disabled");
        return false;
    }


  $.ajax({
    url: "/order/save-autoorder-delivery",
    type: "POST",
    data: fdata,
    contentType: false,
    cache: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      showSystemPopup("РЎРїР°СЃРёР±Рѕ", data.message, true);
    },
    error: function(data) {
      showSystemPopup("РћС€РёР±РєР°", data.responseJSON.message);
    }
  });

  return false;
}


function filterOrderGoods(el, offset) {
  var category = el.attr("data-id") || false;

  var fdata = new FormData();
  fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));

  if (category) {
    fdata.append("category", category);
  } else {
    fdata.append("product", $("#filter_products").val());
    fdata.append("type", $("#filter_types").val());
  }

  var offset = offset || 0;

  fdata.append("limit", 0); //РµСЃР»Рё Р»РёРјРёС‚ 0 С‚Рѕ РІС‹РІРµРґСѓС‚СЃСЏ РІСЃРµ
  fdata.append("offset", offset);

  $.ajax({
    url: "/catalog/filter/get_product_by_widget",
    type: "POST",
    data: fdata,
    contentType: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      /*$('#blok-analogue .analogue__content').html('');
            $('#blok-analogue .analogue__content').append(data.html);
            
            if (window.innerWidth > 780) {
                $('.catalogMenu > .catalogMenu__list').css('margin-top', $('#blok-analogue').offset().top - 225 + 'px');
            }
            
            $('html,body').animate({
                scrollTop: $('#blok-analogue').offset().top - 30,
            }, 1000);

            }*/

      var itemsArr = data.items.map(function(el, index) {
        /*
                    РќРЈР–РќРћ:
                    РєРѕР»-РІРѕ С‚РѕРІР°СЂР° РІ Р·Р°РєР°Р·Рµ
                */

        if (el.price === null) {
          el.price = "Р¦РµРЅСѓ СѓС‚РѕС‡РЅСЏР№С‚Рµ Сѓ РјРµРЅРµРґР¶РµСЂР°";
        } else {
          el.price = parseFloat(el.price).toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB"
          });
        }

        if (el.product == null) {
          el.product = "";
        }

        return (
          '<a href="/catalog/' +
          el.id +
          "?product=" +
          el.product +
          "&amp;type=" +
          el.type_id +
          "&amp;category=" +
          el.category_id +
          '" class="catalog__item" data-favorite="' +
          el.wishlist_id +
          '" data-product="' +
          el.id +
          '">' +
          '<div class="btn catalog__item_addFavorite" action="ADD_IN_WISHLIST" data-id="' +
          el.id +
          '">' +
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="511.626px" height="511.627px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve">' +
          '<path d="M475.366,71.951c-24.175-23.606-57.575-35.404-100.215-35.404c-11.8,0-23.843,2.046-36.117,6.136   c-12.279,4.093-23.702,9.615-34.256,16.562c-10.568,6.945-19.65,13.467-27.269,19.556c-7.61,6.091-14.845,12.564-21.696,19.414   c-6.854-6.85-14.087-13.323-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556c-10.564-6.95-21.985-12.468-34.261-16.562   c-12.275-4.089-24.316-6.136-36.116-6.136c-42.637,0-76.039,11.801-100.211,35.404C12.087,95.552,0,128.288,0,170.162   c0,12.753,2.24,25.889,6.711,39.398c4.471,13.514,9.566,25.031,15.275,34.546c5.708,9.514,12.181,18.796,19.414,27.837   c7.233,9.042,12.519,15.27,15.846,18.699c3.33,3.422,5.948,5.899,7.851,7.419L243.25,469.937c3.427,3.429,7.614,5.144,12.562,5.144   s9.138-1.715,12.563-5.137l177.87-171.307c43.588-43.583,65.38-86.41,65.38-128.475C511.626,128.288,499.537,95.552,475.366,71.951   z"></path>' +
          "</svg>" +
          "</div>" +
          '<div class="catalog__item_top">' +
          '<div class="catalog__item_image">' +
          '<img src="/uploads/catalog/files/' +
          el.file +
          '" alt="">' +
          "</div>" +
          '<p class="price">' +
          el.price +
          "</p>" +
          '<div class="catalog__item_text">' +
          el.name +
          "</div>" +
          "</div>" +
          '<div class="catalog__item_bottom">' +
          '<div class="catalog__item_mark">' +
          el.product +
          "</div>" +
          '<div class="catalog__item_btn">' +
          '<div class="btn-constructor" onclick="return addProductInConstructor(' +
          el.id +
          ', 2)" style="font-size: 12px">РљРџ</div>' +
          '<div class="btn-cart">' +
          '<div class="image"></div>' +
          '<div class="inCart__amount"></div>' +
          '<div class="cart-opened">' +
          '<div class="amount__control amount__control_button" action="CATALOG_AMOUNT_CONTROL" data-direction="0">-</div>' +
          '<div class="amount__control amount__control_counter" data-value="1">1</div>' +
          '<div class="amount__control amount__control_button" action="CATALOG_AMOUNT_CONTROL" data-direction="1">+</div>' +
          '<div class="cart-opened__button" data-product="' +
          el.id +
          '" action="ADD_TO_CART">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</a>"
        );
      });

      $("#blok-analogue .analogue__content").html("");

      $("#blok-analogue .analogue__content").append(itemsArr);

      if (window.innerWidth > 780) {
        if ($("#blok-analogue").length) {
          $(".catalogMenu > .catalogMenu__list").css(
            "margin-top",
            $("#blok-analogue").offset().top - 225 + "px"
          );
        }
      }

      if ($("#blok-analogue").length) {
        $("html,body").animate(
          {
            scrollTop: $("#blok-analogue").offset().top - 30
          },
          1000
        );
      }
    },
    error: function(data) {
      alert(data.responseJSON.message);
    }
  });

  return false;
}

function constructorRemoveFolder(el) {
  var id = el.parents(".dirWrapper").attr("data-id");

  $('.popup[data-popup="constructorRemoveFolder"]')
    .find(".constructorRemoveFolder__button-yes")
    .attr("data-id", id);

  openPopupClear("constructorRemoveFolder");
}

function constructorOpenRename(el) {
  var id = el.parents(".actions__content").attr("data-id");
  var title = el.parents(".actions__content").attr("data-title");

  $('.popup[data-popup="constructorRenameFolder"]')
    .find("#constructor_folder_new_name")
    .attr("data-id", id);

  $('.popup[data-popup="constructorRenameFolder"]')
    .find("#constructor_folder_new_name")
    .val(title);

  openPopupClear("constructorRenameFolder");
}

function constructorCommitRenameFolder(el) {
  var id = $("#constructor_folder_new_name").attr("data-id");

  constructorRenameFolder(id);
}

function constructorOfferRemoveOpen(el) {
  var id = el.parents(".actions__content").attr("data-id");

  $('.popup[data-popup="constructorRemoveOffer"]')
    .find(".constructorRemoveOffer__button-yes")
    .attr("data-id", id);

  openPopupClear("constructorRemoveOffer");
}

function constructorOpenRenameOffer(el) {
  var id = el.parents(".actions__content").attr("data-id");
  var title = el.parents(".actions__content").attr("data-title");
  var folder_id = $("#div-folders").attr("data-id");
  var fdata = new FormData();

  $('.popup[data-popup="constructorRenameOffer"]')
    .find("#constructor_offer_new_name")
    .attr("data-id", id);
  $('.popup[data-popup="constructorRenameOffer"]')
    .find("#constructor_offer_new_name")
    .val(title);

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
      var html = "<option></option>";
      $.each(data.folders, function(i, val) {
        html += '<option value="' + val.id + '">' + val.title + "</option>";
      });

      $("#constructor_rename").html("");
      $("#constructor_rename").append(html);
      $("#constructor_copy").html("");
      $("#constructor_copy").append(html);

      openPopupClear("constructorRenameOffer");

      $("#constructor_rename").trigger("refresh");
      $("#constructor_copy").trigger("refresh");
    },
    error: function(data) {
      alert(data.responseJSON.message);
    }
  });

  return false;
}

function toggleGoodsmatchDropdown(el) {
  var that = $(el);
  var goodId = that.parents(".matchGood").attr("data-good");

  var item = $('.goodRow [data-good="' + goodId + '"]');

  // item.find(".catalogMenu__list_trigger-icon").toggleClass("opened");

  item.find(".matchGood__title").toggleClass("active");

  if (item.is(".matchGood")) {
    item.toggleClass("active");
    item.parent().toggleClass("active");
  }

  el.toggleClass("opened");
  // el.siblings(".matchGood__title").toggleClass("active");
  $('.matchGoodDropdown[data-good="' + goodId + '"]').slideToggle();
  // $('.matchGoodDropdown[data-good="' + goodId + '"]').toggleClass("opened");
}

function removeStructureTableTextItem(el) {
  var that = $(el);
  that.parents(".constructor__table_row").remove();
  // deleteProductInConstructor(id, $(this), true);

  if (
    $("#table_add_product")
      .find(".constructor__table_body")
      .find("li").length == 0
  ) {
    $("#table_add_product")
      .find(".constructor__table_head")
      .css({
        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px"
      });
  }

  var id = that.parents(".constructor__table_list").attr("data-product");
  if (id) {
    deleteProductInConstructor(id, that, true);
  }
}

function deleteDocumentPopup(el) {
  var that = $(el);
  var id = that.attr("data-id");
  var target = that.attr("data-target");

  $('.popup[data-popup="removeDocument"]')
    .find(".btnYes")
    .attr("data-id", id);
  openPopupClear(target);
}

function getAnalogueProductsForOrder(el) {
  var that = $(el);
  var id = that.attr("data-id");
  var fdata = new FormData();
  fdata.append("_csrf-frontend", $('meta[name="csrf-token"]').attr("content"));
  fdata.append("order_id", id);

  $.ajax({
    url: "/catalog/order/get_analogue",
    type: "POST",
    data: fdata,
    contentType: false,
    dataType: "json",
    processData: false,
    success: function(data) {
      $(".matchPopupTable").html(data.analogue);
      openPopupClear("matchGoods");
    },
    error: function(data) {
      alert(data.responseJSON.message);
    }
  });

  return false;
}

function findAnalogueProductsForConstructor(el) {
  var that = $(el);
  var id = that.attr("data-id");
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
      $(".matchPopupTable").html(data.analogue);
      openPopupClear("matchGoods");
    },
    error: function(data) {
      // alert(data.responseJSON.message);
    }
  });

  return false;
}

function changeVisibilityList(el) {
  let type = el.attr("data-type");
  if (
    $(
      '.catalogItemVisibilityContent[data-type="list"] .catalog__itemRow-container'
    ).length === 0
  ) {
    return false;
  }
  $(".catalogItemVisibilityContent").hide();
  $('.catalogItemVisibilityContent[data-type="' + type + '"]').show();
  $(
    ".uiCatalog__toggleVisibilityType.uiCatalog__toggleVisibilityType-active"
  ).removeClass("uiCatalog__toggleVisibilityType-active");
  el.addClass("uiCatalog__toggleVisibilityType-active");

  dynamicBorder2();
  catalog__itemTableScrollReinit();

  if (type == "list") {
    setOption({
      key: "orderTable",
      value: "list"
    });
    // window.localStorage.removeItem("orderTable");
    // window.localStorage.setItem("orderTable", "list");
  } else if (type == "tile") {
    setOption({
      key: "orderTable",
      value: "tile"
    });
    // window.localStorage.removeItem("orderTable");
    // window.localStorage.setItem("orderTable", "tile");
  }

  if (window.innerWidth > 780) {
    if ($("#blok-analogue").length) {
      $(".catalogMenu > .catalogMenu__list").css(
        "margin-top",
        $("#blok-analogue").offset().top - 240 + "px"
      );
    }
  }
}

function constructorSendEmail(el) {
  var id = $(".block1").attr("data-id");
  constructorSendMail(id);
  return false;
}

function openVideoPopup(el) {
  var source = $(el).attr("data-src");

  $(".videoPopup").addClass("activeVideo");

  $(".videoPopup")
    .find("iframe")
    .attr("src", source);

  openPopupClear("videoPopup");
}

function constructorCoefChange(el) {
  var id = $(".block1").attr("data-id");

  var value = $('div[data-popup="changeConstructorCoefPopup"]')
      .find('input[name="activity"]:checked')
      .val(),
    $value_input = $("#pushup5"),
    prev_value = $value_input.attr("save-value");

  if (value == "pp") {
    constructorUpdateMarkup(id, "all");
    $('div[data-popup="changeConstructorCoefPopup"]')
      .find(".popup-cross")
      .trigger("click");
  } else if (value == "fl") {
    constructorUpdateMarkup(id, "default");
    $('div[data-popup="changeConstructorCoefPopup"]')
      .find(".popup-cross")
      .trigger("click");
  } else if ((value = "js")) {
    $value_input.val(prev_value);
    $value_input.attr("save-value", prev_value);

    $('div[data-popup="changeConstructorCoefPopup"]')
      .find(".popup-cross")
      .trigger("click");
  }
}

function incrementPopUpCatalogItemCount(el) {
  var rowParent = el.parents(".tableCasual__row"),
    input = el.parents(".itemAmount").find("input");

  var val = Number(input.val());
  var newVal = val + 1 <= 0 ? 0 : val + 1;
  input.val(newVal);

  //Р—Р°РїСѓСЃРєР°РµРј СЃРєСЂРёРїС‚ РєРѕС‚РѕСЂС‹Р№ РїРѕ СЃС‚СЂР°РЅРёС†Рµ РѕРїСЂРµРґРµР»РёС‚, С‡С‚Рѕ РЅСѓР¶РЅРѕ РґРµР»Р°С‚СЊ
  if (rowParent.is(".tableCasual__row-selected")) {
    var pageType = rowParent.attr("data-pagetype");

    behaviorSwitcher({
      pageType: pageType,
      parent: rowParent,
      el: el
    });
  }
}

function decrementPopUpCatalogItemCount(el) {
  var rowParent = el.parents(".tableCasual__row"),
    input = el.parents(".itemAmount").find("input");

  var val = Number(input.val());
  var newVal = val - 1 <= 0 ? 0 : val - 1;
  input.val(newVal);

  //Р—Р°РїСѓСЃРєР°РµРј СЃРєСЂРёРїС‚ РєРѕС‚РѕСЂС‹Р№ РїРѕ СЃС‚СЂР°РЅРёС†Рµ РѕРїСЂРµРґРµР»РёС‚, С‡С‚Рѕ РЅСѓР¶РЅРѕ РґРµР»Р°С‚СЊ
  if (rowParent.is(".tableCasual__row-selected")) {
    var pageType = rowParent.attr("data-pagetype");

    behaviorSwitcher({
      pageType: pageType,
      parent: rowParent,
      el: el
    });
  }
}

function behaviorSwitcher(obj) {
  var rowParent = obj.parent,
    el = obj.el,
    pageType = obj.pageType;

  var id = rowParent.attr("data-id"),
    deleteId = rowParent.attr("data-delete-id"),
    count = rowParent.find(".itemAmount input").val(),
    type = rowParent.attr("data-type");

  if (pageType == "wishlist") {
    var withlist_id = $("#withlist_table").attr("data-id"),
      id = rowParent.attr("data-id");

    if (Number(count)) {
      addProductInWishlist(id, withlist_id, el);
    } else if (Number(deleteId) && !isNaN(deleteId)) {
      deleteProductWishlist(deleteId, el);
    }
  } else if (pageType == "order") {
    if (Number(count)) {
      addProduct(id, count, true);
    } else if (Number(deleteId) && !isNaN(deleteId)) {
      deleteProduct(deleteId);
    }
  } else if (pageType == "constructor") {
    if (Number(count)) {
      addProductInConstructor(id, type, el);
    } else if (Number(deleteId) && !isNaN(deleteId)) {
      deleteProductInConstructor(deleteId, "popUptrigger");
    }
  }
}