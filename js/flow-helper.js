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

const containerID = 'Base64HelperResContainer';

/** 主要的容器 */
let container

/** 点击转换按钮，设置内容 */
const handleClickConvertBtn = (selection) => (event) => {
  const convertResContainer = document.querySelector('#convertResContainer')
  if(convertResContainer) {
    convertResContainer.value = selection
  }
}

const handleDocumentClick = (event) => {
  if(
    !container 
    || event.target == container 
    || container.contains(event.target) 
    || event.target.contains(container)
  ) return;
  document.removeEventListener('click', handleDocumentClick)
  container.classList.add('hide')
}

/** 
 * 处理双击事件，如果有选中的文字，则弹出转换按钮
 * TODO: 可以配置是否需要这个按钮
 */
const handleDBClick = (event) => {
  let target = event.target;
  if(container.contains(target)) return;
  let targetOffset = offset(target)
  let selection = window.getSelection().toString();
  if(selection) {
    container.classList.remove('hide')
    container.style = `
      position: absolute; 
      z-index: 1111; 
      left: ${targetOffset.left}px; 
      top: ${targetOffset.top + 24}px;
    `
    container.innerHTML = `
      <div>
        <div>
          <span id="toBase64BtnInset" class="base64-helper-flow-btn">toBase64</span>
          <span id="toStringBtnInset" class="base64-helper-flow-btn">toString</span>
        </div>
        <textarea id="convertResContainer" class="form-input"></textarea>
      </div>
    `
    const toBase64BtnInset = document.querySelector('#toBase64BtnInset')
    const toStringBtnInset = document.querySelector('#toStringBtnInset')
    document.addEventListener('click', handleDocumentClick)
    toBase64BtnInset.addEventListener('click', handleClickConvertBtn(toBase64Str(selection)))
    toStringBtnInset.addEventListener('click', handleClickConvertBtn(fromBase64Str(selection)))
  }
}
const handleDOMLoaded = () => {
  /** 如果需要浮动助手 */
  chrome.storage.sync.get(['needFlowHelper'], function(items) {
    if(items.needFlowHelper) {
      container = setDOMById(containerID)
      document.addEventListener('dblclick', handleDBClick)
    }
  });
}

document.addEventListener('DOMContentLoaded', handleDOMLoaded);
