import {useSelector} from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  let balance = useSelector(store => store.account.balance)
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;

// Legacy way of connecting components to React
// function mapStateToProps(state){
//   return {
//     balance: state.account.balance
//   }
// }
// function BalanceDisplay({balance}) {
//   return <div className="balance">{formatCurrency{balance}</div>;
// }
// export default connect(mapStateToProps)(BalanceDisplay);

