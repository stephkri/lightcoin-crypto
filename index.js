//let balance = 500.00;

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed() === true) {
      this.time = new Date();
      this.account.addTransaction(this);
      this.status = `✅✅✅ Transaction successful`;
    } else {
      this.status = `🔴🔴🔴 Transaction failed; insufficient funds`;
    }
  }
}

class Withdrawal extends Transaction {

  isAllowed() {
    return ((this.account.balance - this.amount) >= 0);
  }

  get value() {
    return -this.amount;
    /*
    if(this.isAllowed) {
      return -this.amount;
    } else {
      throw new Error("Error: insufficient funds");
    }
    */
  }

}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}
/*
commit just edits the balance to reflect that money has been withdrawn or deposited
*/

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("Flea Daniels");

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log(myAccount);
console.log('Balance:', myAccount.balance);
