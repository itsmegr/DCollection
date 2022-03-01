function numberWithCommas(amount: number) {
  return amount.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
}
export default numberWithCommas;