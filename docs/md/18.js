
const arr = [1, 2, 3, 4, 5];

try {
  arr.forEach((item, index) => {
    if (index > 1) throw Error('退出')
    console.log('item', item);
  })
} catch (e) {
  console.log('e', e)
}
// item 1
// item 3
// item 4
// item 5