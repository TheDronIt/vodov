function dispatcher(action) {
  switch (action.type) {
    case "TOGGLE_MENU":
      toggleMenu();
      break;
    case "TOGGLE_MENU_ALPHA":
      toggleMenuAlpha();
      break;
    case "TOGGLE_SLIDE_FILTER":
      toggleSlideFilter(action.node);
      break;
    case "PLAY_VIDEO_IN_VIDEOBLOCK":
      playVideoInVideoBlock(action.node);
      break;
    case "PLAY_VIDEO_IN_VIDEOSLIDER":
      playVideoInVideoSlider(action.payload, action.node);
      break;
    case "SWITCH_PRODUCTCART_INFO":
      switchProductCartInfo(action.node);
      break;
    case "PRODUCT_COUNTER_MINUS":
      productCounter(action.node, "minus");
      break;
    case "PRODUCT_COUNTER_PLUS":
      productCounter(action.node, "plus");
      break;
    case "REFRESH_SELECT":
      refreshSelect(action.node);
      break;
    case "TOGGLE_FILTER_LIST":
      toggleFilterList(action.node);
      break;
    case "CHANGE_NEWS_FILTER":
      changeNewsFilter(action.node);
      break;
    case "CHANGE_CONTACTS_FILTER":
      changeContactsFilter(action.node);
      break;
    case "OPEN_HEADER_SEARCH":
      openHeaderSearch(action.node);
      break;
    case "PUT_IN_SEARCH":
      putInSearch(action.node);
      break;
    case "OPEN_POPUP":
      openPopup(action.node, action.payload);
      break;
    case "CLOSE_POPUP":
      closePopup(action.node);
      break;
    case "CLOSE_POPUP_ALL":
      closePopupAll(action.node);
      break;
    case "CHANGE_REGAUTH_TAB":
      changeRegAuthTab(action.node);
      break;
    case "SHOW_MORE_NEWS":
      showMoreNews(action.node);
      break;
    case "CATALOG_AMOUNT_CONTROL":
      catalogAmountControl(action.node);
      break;
    case "ADD_TO_CART":
      addToCart(action.node);
      break;
    case "ADD_TO_CART_SOLO":
      addToCartSolo(action.node);
      break;
    case "SEND_QUESTION_ANSWER":
      sendQuestionAnswer(action.node);
      break;
    case "TEST_NEXT":
      testControl(action.node, "next");
      break;
    case "TEST_PREV":
      testControl(action.node, "prev");
      break;
    case "NEXT_BUTTON_CONTROL":
      nextButtonControl(action.node);
      break;
    case "TOGGLE_PRODUCT_STATE_IN_WISHLIST":
      action.node.parents("[data-favorite]").attr("data-favorite") == "false"
        ? toggleProductStateInWishlist.add(action.node)
        : toggleProductStateInWishlist.delete(action.node);
      break;
    case "REMOVE_IMAGE_FROM_INPUT":
      removeImageFromInput(action.node);
      break;
    case "REMOVE_IMAGE_FROM_LOGOINPUT":
      removeImageFromLogoInput(action.node);
      break;
    case "SUBMIT_NEW_PERSONAL_INFO":
      submitNewPersonalInfo(action.node);
      break;
    case "SAVE_ORDER":
      saveOrder(action.node);
      break;
    case "COPY_ORDER":
      copyOrder(action.node);
      break;
    case "PDF_ORDER":
      pdfOrder(action.node);
      break;
    case "DELETE_ORDER_POPUP":
      deleteOrderPopup(action.node);
      break;
    case "DELETE_ORDER":
      deleteOrder(action.node);
      break;
    case "SAVE_ORDER_COMMENT_INNER":
      saveOrderCommentInner(action.node);
      break;
    case "SAVE_ORDER_AUTOORDER_DELIVERY":
      saveOrderAutoorderDelivery(action.node);
      break;
    case "SAVE_APPEAL":
      saveAppeal(action.node);
      break;
    case "SEND_APPEAL":
      saveAppeal(action.node, 1);
      break;
    case "FILTER_ORDER_GOODS":
      filterOrderGoods(action.node);
      break;
    case "CONSTRUCTOR_ADD_FOLDER":
      openPopupClear("constructorAddFolder");
      break;
    case "CONSTRUCTOR_REMOVE_FOLDER":
      constructorRemoveFolder(action.node);
      break;
    case "CONSTRUCTOR_DELETE_FOLDER":
      constructorDeleteFolder(action.node);
      break;
    case "CONSTRUCTOR_OPEN_RENAME":
      constructorOpenRename(action.node);
      break;
    case "CONSTRUCTOR_RENAME_FOLDER":
      constructorCommitRenameFolder(action.node);
      break;
    case "CONSTRUCTOR_OFFER_REMOVE_OPEN":
      constructorOfferRemoveOpen(action.node);
      break;
    case "CONSTRUCTOR_DELETE_OFFER":
      constructorDelete(action.node);
      break;
    case "CONSTRUCTOR_OPEN_RENAME_OFFER":
      constructorOpenRenameOffer(action.node);
      break;
    case "CONSTRUCTOR_RENAME_OFFER":
      constructorRename(action.node);
      break;
    case "COPY_LINK":
      copyLink(action.node);
      break;
    case "OPEN_COPYLINK_POPUP":
      openCopyLinkPopUp(action.node);
      break;
    case "DELETE_DOCUMENT_POPUP":
      deleteDocumentPopup(action.node);
      break;
    case "REMOVE_DOCUMENT":
      delete_document(action.node);
      break;
    case "TOGGLE_GOODSMATCH_DROPDOWN":
      toggleGoodsmatchDropdown(action.node);
      break;
    case "REMOVE_STRUCTURE_TABLE_TEXT_ITEM":
      removeStructureTableTextItem(action.node);
      break;
    case "GET_ANALOGUE_FOR_ORDER":
      getAnalogueProductsForOrder(action.node);
      break;
    case "CNAHGE_VISIBILITY_LIST":
      changeVisibilityList(action.node);
      break;
    case "CONSTRUCTOR_EMAIL_POPUP":
      openPopupClear("constructorSendEmail");
      break;
    case "CONSTRUCTOR_SEND_EMAIL":
      constructorSendEmail(action.node);
      break;
    case "OPEN_VIDEO_POPUP":
      openVideoPopup(action.node);
      break;
    case "WISHLIST_SEND_EMAIL":
      wishlistSendMail();
      break;
    case "CONSTRUCTOR_COEF_CHANGE":
      constructorCoefChange(action.node);
      break;
    case "FIND_ANALOGUES_FOR_CONSTRUCTOR":
      findAnalogueProductsForConstructor(action.node);
      break;
    case "INCREMENT_POPUP_CATALOG_ITEM_COUNT":
      incrementPopUpCatalogItemCount(action.node);
      break;
    case "DECREMENT_POPUP_CATALOG_ITEM_COUNT":
      decrementPopUpCatalogItemCount(action.node);
      break;
    // case "OPEN_PREVIEW_LINK_POPUP":
    //   openPreviewLinkPopUp(action.node);
      break;
    default:
      console.log(action);
  }
}