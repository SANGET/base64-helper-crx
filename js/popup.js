function toBase64Str(str = '') {
  return btoa(unescape(encodeURIComponent(str)));
}

/**
 * 把 base64 字符串转成普通字符串
 *
 * @export
 * @param {string} str base64 字符串
 * @returns {string} 普通字符串
 */
function fromBase64Str(str) {
  let res;
  try {
    res = decodeURIComponent(escape(atob(str)));
  } catch (e) {
    res = str;
    console.log(e, str);
  }
  return res;
}

function getSelectedParagraphText() {
  if (window.getSelection) {
      selection = window.getSelection();
  } else if (document.selection) {
      selection = document.selection.createRange();
  }
  var parent = selection.anchorNode;
  while (parent != null && parent.localName != "P") {
    parent = parent.parentNode;
  }
  if (parent == null) {
    return "";
  } else {
    return parent.innerText || parent.textContent;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let toBase64Btn = document.querySelector('#toBase64Btn');
  let toStringBtn = document.querySelector('#toStringBtn');
  let toggleNeedFlowHelperBtn = document.querySelector('#toggleNeedFlowHelperBtn');
  let srcStringInput = document.querySelector('#srcString');
  let base64StringInput = document.querySelector('#base64String');

  chrome.storage.sync.get(['needFlowHelper'], function(items) {
    toggleNeedFlowHelperBtn.checked = items.needFlowHelper
  });

  let selection = window.getSelection()

  if(selection) {
    // alert(selection)
    srcStringInput.value = selection;
  }

  toBase64Btn.addEventListener('click', () => {
    // alert(srcStringInput.value)
    let srcVal = srcStringInput.value;
    if(srcVal) {
      let base64Res = toBase64Str(srcVal);
      base64StringInput.value = base64Res;
    }
  })

  toStringBtn.addEventListener('click', () => {
    // alert(srcStringInput.value)
    let srcVal = base64StringInput.value;
    if(srcVal) {
      let base64Res = fromBase64Str(srcVal);
      srcStringInput.value = base64Res;
    }
  })
  
  toggleNeedFlowHelperBtn.addEventListener('click', (event) => {
    // 保存数据
    let isNeed = event.target.checked;
    chrome.storage.sync.set({needFlowHelper: isNeed}, () => {
    });
  })
});