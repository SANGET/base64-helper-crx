/**
 * 在 document.body 中创建指定 ID 的元素，并返回该元素的引用
 * @param targetID 设置的元素的 ID
 * @param className 设置的元素的 class
 */
function setDOMById(targetID, className = '') {
  if (!targetID) console.log('params id is required');
  let targetDOM = document.getElementById(targetID);
  if (!targetDOM) {
    targetDOM = document.createElement('div');
    targetDOM.id = targetID;
    targetDOM.className = className;
    document.body.appendChild(targetDOM);
  }
  return targetDOM;
}
function offset(el) {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
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

export {
  fromBase64Str,
  toBase64Str,
  offset,
  setDOMById,
}