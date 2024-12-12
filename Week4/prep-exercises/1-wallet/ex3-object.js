import eurosFormatter from './euroFormatter.js';

function createWallet(name, cash = 0) {
  let _name = name;
  let _cash = cash;
  let _dailyAllowance = 40;  // Default value for daily withdrawal limit
  let _dayTotalWithdrawals = 0;  // Total withdrawals for the day

  return {
    getName: function () {
      return _name;
    },

    getDailyAllowance: function () {
      return _dailyAllowance;
    },

    getDayTotalWithdrawals: function () {
      return _dayTotalWithdrawals;
    },

    deposit: function (amount) {
      _cash += amount;
    },

    withdraw: function (amount) {
      if (_cash - amount < 0) {
        console.log(`Insufficient funds!`);
        return 0;
      }

      if (_dayTotalWithdrawals + amount > _dailyAllowance) {
        console.log(`Daily withdrawal limit exceeded!`);
        return 0;
      }

      _cash -= amount;
      _dayTotalWithdrawals += amount;
      return amount;
    },

    transferInto: function (wallet, amount) {
      console.log(
        `Transferring ${eurosFormatter.format(amount)} from ${_name} to ${wallet.getName()}`
      );
      const withdrawnAmount = this.withdraw(amount);
      wallet.deposit(withdrawnAmount);
    },

    reportBalance: function () {
      console.log(`Name: ${_name}, balance: ${eurosFormatter.format(_cash)}`);
      console.log(
        `Daily Withdrawn: ${eurosFormatter.format(_dayTotalWithdrawals)}`
      );
      console.log(
        `Remaining Daily Allowance: ${eurosFormatter.format(
          _dailyAllowance - _dayTotalWithdrawals
        )}`
      );
    },

    resetDailyAllowance: function () {
      _dayTotalWithdrawals = 0;
      console.log(`Daily withdrawals reset for ${_name}.`);
    },

    setDailyAllowance: function (newAllowance) {
      _dailyAllowance = newAllowance;
      console.log(
        `New daily withdrawal limit set for ${_name}: ${eurosFormatter.format(
          _dailyAllowance
        )}`
      );
    },
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

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
