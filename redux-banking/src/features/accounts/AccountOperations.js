import { useState } from "react";
import store from "../../store";
import {deposit, payLoan, requestLoan, withdraw} from "./accountSlice";
import {useDispatch, useSelector} from "react-redux";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");
  
  const dispatch = useDispatch();
  const {loan, isLoading} = useSelector(store => store.account)

  function handleDeposit() {
    if(!depositAmount) return;
   dispatch(deposit(depositAmount, currency));
    //This also works
    //store.dispatch(deposit(depositAmount));
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if(!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    //This also works
    // store.dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if(!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    //This also works
    // store.dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    store.dispatch(payLoan())
    //This also works
    // dispatch(payLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>{isLoading ? 'Converting to USD' : `Deposit ${depositAmount}`}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {loan>0 && <div>
          <span>Pay back ${loan}</span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>}
      </div>
    </div>
  );
}

export default AccountOperations;
