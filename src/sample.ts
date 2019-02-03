const sample = <T>(items: T[], count: number) => {
  const copied = [...items]
  const result: T[] = []
  for (let i = 0; i < count; i++) {
    const [sampledItem] = copied.splice(
      Math.floor(Math.random() * copied.length),
      1,
    )
    result.push(sampledItem)
  }
  return result
}
export default sample
