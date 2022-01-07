export default function formatDate (timestamp) {
  const date = new Date(parseInt(timestamp))
  const day = date.getDate() < 10
    ? `0${date.getDate()}`
    : String(date.getDate())
  const month = date.getMonth() < 10
    ? `0${date.getMonth() + 1}`
    : String(date.getMonth() + 1)
  const year = String(date.getFullYear()).substring(2)
  return `${day}${month}-${year}`
}