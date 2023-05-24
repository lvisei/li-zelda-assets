import { Toast } from 'antd-mobile';

/**
 * 复制文本至剪切板
 * @param content
 */
export function copyText(content: string, message: string) {
  const input = document.createElement('input');
  input.setAttribute('value', content);
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);

  Toast.show({
    position: 'bottom',
    content: message,
  });
}

/**
 * 将参数 url 中的 params 参数解析为对象
 * @param url
 */
export function getUrlParams(url: string) {
  // 通过 ? 分割获取后面的参数字符串
  let urlStr = url.split('?')[1];
  // 创建空对象存储参数
  let obj: Record<string, string> = {};
  if (urlStr) {
    // 再通过 & 将每一个参数单独分割出来
    let paramsArr = urlStr.split('&');
    for (let i = 0, len = paramsArr.length; i < len; i++) {
      // 再通过 = 将每一个参数分割为 key:value 的形式
      let arr = paramsArr[i].split('=');
      obj[arr[0]] = arr[1];
    }
  }
  return obj;
}
