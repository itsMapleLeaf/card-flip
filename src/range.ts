const range = (size: number) => {
  const result = Array(size)
  for (let i = 0; i < size; i++) {
    result[i] = i
  }
  return result
}
export default range
