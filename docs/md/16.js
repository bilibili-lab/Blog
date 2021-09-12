const s = 'https://wwww.baidu.com?a=1&b=2&c=3'

let tempStr = undefined
console.log(tempStr = encodeURIComponent(s))
console.log(tempStr = encodeURIComponent(tempStr))
console.log(tempStr = encodeURIComponent(tempStr))
console.log(tempStr = encodeURIComponent(tempStr))
console.log(tempStr = encodeURIComponent(tempStr))

function decodeUrlInfinity(url) {
  const str = decodeURIComponent(url)
  if (str === url) {
    return url
  } else {
    return decodeUrlInfinity(str)
  }
}
console.log(decodeUrlInfinity(tempStr))
