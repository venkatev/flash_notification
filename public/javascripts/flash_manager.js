/************************** Error displaying utilities ************************/

var FlashManager = Class.create();

FlashManager.getInstance = function(){
  if (FlashManager.instance == null) {
    this.instance = new FlashManager();
  }

  return FlashManager.instance;
}

// CONSTANTS

FlashManager.ERROR_BORDER = "1px solid #A22";
FlashManager.NORMAL_BORDER = "1px solid #666666";
FlashManager.AJAX_SUCCESS_MESSAGE = "Your changes have been saved";
FlashManager.FORM_ERROR_MESSAGE = "Please fix the highlighted errors";

FlashManager.ShowPageFlash = function(success, message){
  if (success) {
    FlashManager.ShowLocalFlash("flash_container", message, true);
  }
  else {
    FlashManager.ShowLocalFlash("flash_container", message, false);
  }
}

/**
* Clears the flash message at the top of the page
*/
FlashManager.ClearPageFlash = function(){
  FlashManager.ClearLocalFlash("flash_container");
}

/**
 * Shows the given reponse in errorDiv, defaulting message to
 * FlashManager.AJAX_SUCCESS_MESSAGE
 *
 * @param {Object} errorDiv the id of the flash div
 * @param {Object} responseText the AJAX response to show in the flash DIV
 *
 * Optional params:
 * {Object} success whether the request was successful
 *
 */
FlashManager.ShowLocalFlash = function(errorDiv, responseText){
  if (!$(errorDiv)) {
    return;
  }

  success = arguments[2];
  dontShowResponse = arguments[3];
  var notice_msg = $(errorDiv).getElementsByTagName('span')[0];

  if (success) {
    if (!responseText || dontShowResponse) {
      responseText = this.AJAX_SUCCESS_MESSAGE;
    }

    notice_msg.innerHTML = responseText;
    $(errorDiv).className = 'success_flash';
  }
  else {
    // If the response is too big, dont show it.
    // Just a safeguard from showing exception messages in flash.
    if (responseText.length <= 500) {
      notice_msg.innerHTML = responseText;
    }
    else {
      notice_msg.innerHTML = "Problems performing the operation";
    }

    $(errorDiv).className = 'error_flash';
  }

  $(errorDiv).show();
}

/**
 * Wipes out any message from the given errorDiv
 */
FlashManager.ClearLocalFlash = function(errorDiv){
  if (!$(errorDiv)) {
    return;
  }

  var notice_msg = $(errorDiv).getElementsByTagName('span')[0];
  $(notice_msg).innerHTML = "";
  $(errorDiv).hide();
}

/**
 * Highlights the given element with error style.
 *
 * statusElement and errorMessage parameters are optional. If specified, sets
 * the error message and displays it.
 *
 * @param {Object} fieldElement the element whose status to update
 * @param {Object} statusElement the status element for showing the message
 * @param {Object} errorMessage the message to show on error.
 */
FlashManager.ShowFieldError = function(fieldElement, statusElement, errorMessage) {
  if (statusElement) {
    $(statusElement).show();
    $(statusElement).innerHTML = errorMessage;
  }

  $(fieldElement).style.border = this.ERROR_BORDER;
}

/**
 * Clears error hightlight on the element.
 */
FlashManager.ClearFieldError = function(element){
  // Setting $(element).style.border = '' does not work in IE. It wipes out
  // the existing border provided by the CSS for the element. We need to
  // set individual attributes of style for removing border STYLE alone that
  // we applied.
  $(element).style.borderColor = '';
  $(element).style.borderWidth = '';
  $(element).style.borderStyle = '';
}
