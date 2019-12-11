function switchOffset (arr, index, offset) {
  let targetIndex = index + offset
  if (targetIndex < 0 || targetIndex > (arr.length - 1)) {
    return
  }
  let cur = arr[index]
  let tmp = arr[targetIndex]
  //修改
  arr.splice(index, 1, tmp)
  arr.splice(targetIndex, 1, cur)
}

function switchAble (arr, index, offset) {
  let targetIndex = index + offset
  return !(targetIndex < 0 || targetIndex > (arr.length - 1))
}

export default {switchOffset: switchOffset, switchAble: switchAble}
