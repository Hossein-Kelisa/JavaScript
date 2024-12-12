import eurosFormatter from './euroFormatter.js';

function Wallet(name, cash) {
  this._name = name;
  this._cash = cash;
  this._dailyAllowance = 40;  // Default daily withdrawal limit
  this._dayTotalWithdrawals = 0;  // Total withdrawn today
}

Wallet.prototype.deposit = function (amount) {
  this._cash += amount;
};

Wallet.prototype.withdraw = function (amount) {
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
};

Wallet.prototype.transferInto = function (wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
};

Wallet.prototype.reportBalance = function () {
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
};

Wallet.prototype.getName = function () {
  return this._name;
};

Wallet.prototype.resetDailyAllowance = function () {
  this._dayTotalWithdrawals = 0;
  console.log(`Daily withdrawals reset for ${this._name}.`);
};

Wallet.prototype.setDailyAllowance = function (newAllowance) {
  this._dailyAllowance = newAllowance;
  console.log(
    `New daily withdrawal limit set for ${this._name}: ${eurosFormatter.format(
      this._dailyAllowance
    )}`
  );
};

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

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
