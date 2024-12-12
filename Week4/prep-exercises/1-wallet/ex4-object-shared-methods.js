import eurosFormatter from './euroFormatter.js';

function deposit(amount) {
  this._cash += amount;
}

function withdraw(amount) {
  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  }

  if (this._dayTotalWithdrawals + amount > this._dailyAllowance) {
    console.log(`Daily withdrawal limit exceeded!`);
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount;
  return amount;
}

function transferInto(wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
}

function reportBalance() {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}`
  );
  console.log(
    `Daily Withdrawn: ${eurosFormatter.format(this._dayTotalWithdrawals)}`
  );
  console.log(
    `Remaining Daily Allowance: ${eurosFormatter.format(
      this._dailyAllowance - this._dayTotalWithdrawals
    )}`
  );
}

function getName() {
  return this._name;
}

function resetDailyAllowance() {
  this._dayTotalWithdrawals = 0;
  console.log(`Daily withdrawals reset for ${this._name}.`);
}

function setDailyAllowance(newAllowance) {
  this._dailyAllowance = newAllowance;
  console.log(
    `New daily withdrawal limit set for ${this._name}: ${eurosFormatter.format(
      this._dailyAllowance
    )}`
  );
}

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: 40,  // Default daily allowance
    _dayTotalWithdrawals: 0,  // Total withdrawals for the day

    deposit,
    withdraw,
    transferInto,
    reportBalance,
    getName,
    resetDailyAllowance,
    setDailyAllowance,
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();

  // Update daily allowance
  walletJack.setDailyAllowance(60);
  walletJack.withdraw(40); // This should be allowed
  walletJack.withdraw(25); // This should exceed the limit
  walletJack.reportBalance();

  // Reset daily allowance
  walletJack.resetDailyAllowance();
  walletJack.reportBalance();
}

main();
