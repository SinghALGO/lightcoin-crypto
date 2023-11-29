class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let sumBalance = 0;
    for (let t of this.transactions) {
      sumBalance += t.value;
    }
    return sumBalance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      return false;
    } else {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const MyAccount = new Account("snow-patrol");
t1 = new Deposit(50, MyAccount);
t1.commit();

t2 = new Withdrawal(25, MyAccount);
t2.commit();
console.log("Transaction 1:", MyAccount);
