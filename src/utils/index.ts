import { Toast } from 'antd-mobile';
export { achieved, isAchieved, setAchieved, store, unAchieved } from './store';

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
  const urlStr = url.split('?')[1];
  // 创建空对象存储参数
  const obj: Record<string, string> = {};
  if (urlStr) {
    // 再通过 & 将每一个参数单独分割出来
    const paramsArr = urlStr.split('&');
    for (let i = 0, len = paramsArr.length; i < len; i++) {
      // 再通过 = 将每一个参数分割为 key:value 的形式
      const arr = paramsArr[i].split('=');
      obj[arr[0]] = arr[1];
    }
  }
  return obj;
}

/**
 * 判断点是否在 bbox 内
 * @param point
 * @param lng1
 * @param lat1
 * @param lng2
 * @param lat2
 */
export function isPointInPolygon(point: [number, number], [lng1, lat1, lng2, lat2]: number[]) {
  return point[0] >= lng1 && point[0] <= lng2 && point[1] >= lat1 && point[1] <= lat2;
}
