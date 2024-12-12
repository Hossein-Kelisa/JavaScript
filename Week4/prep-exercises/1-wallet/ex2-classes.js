import eurosFormatter from './euroFormatter.js';

class Wallet {
  #name;
  #cash;
  #dailyAllowance;
  #dayTotalWithdrawals;

  constructor(name, cash) {
    this.#name = name;
    this.#cash = cash;
    this.#dailyAllowance = 40;  // Default value for daily withdrawal limit
    this.#dayTotalWithdrawals = 0;  // Total withdrawals for the day
  }

  get name() {
    return this.#name;
  }

  get dailyAllowance() {
    return this.#dailyAllowance;
  }

  get dayTotalWithdrawals() {
    return this.#dayTotalWithdrawals;
  }

  deposit(amount) {
    this.#cash += amount;
  }

  withdraw(amount) {
    if (this.#cash - amount < 0) {
      console.log(`Insufficient funds!`);
      return 0;
    }

    if (this.#dayTotalWithdrawals + amount > this.#dailyAllowance) {
      console.log(`Daily withdrawal limit exceeded!`);
      return 0;
    }

    this.#cash -= amount;
    this.#dayTotalWithdrawals += amount;
    return amount;
  }

  transferInto(wallet, amount) {
    console.log(
      `Transferring ${eurosFormatter.format(amount)} from ${this.name} to ${
        wallet.name
      }`
    );
    const withdrawnAmount = this.withdraw(amount);
    wallet.deposit(withdrawnAmount);
  }

  reportBalance() {
    console.log(
      `Name: ${this.name}, balance: ${eurosFormatter.format(this.#cash)}`
    );
    console.log(`Daily Withdrawn: ${eurosFormatter.format(this.#dayTotalWithdrawals)}`);
    console.log(`Remaining Daily Allowance: ${eurosFormatter.format(this.#dailyAllowance - this.#dayTotalWithdrawals)}`);
  }

  resetDailyAllowance() {
    this.#dayTotalWithdrawals = 0;
    console.log(`Daily withdrawals reset for ${this.name}.`);
  }

  setDailyAllowance(newAllowance) {
    this.#dailyAllowance = newAllowance;
    console.log(`New daily withdrawal limit set for ${this.name}: ${eurosFormatter.format(this.#dailyAllowance)}`);
  }
}

function main() {
  const walletJack = new Wallet('Jack', 100);
  const walletJoe = new Wallet('Joe', 10);
  const walletJane = new Wallet('Jane', 20);

  // Perform transactions
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