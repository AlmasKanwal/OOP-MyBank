#! /usr/bin/env node

import inquirer from "inquirer";

interface BankAccount {
    accountNumber: number;
    balance: number;
    withDraw(amount: number): void
    deposit(amount: number): void
    checkBalance(): void
}

class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance
    }

    withDraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount
            console.log(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`)
        } else {
            console.log("Insufficient Balance.");
        }
    }

    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1; // $1 fee charged if more than $100 is deposited
        } this.balance += amount;
        console.log(`Deposite of $${amount} successful. Remaining balance: $${this.balance}`);
    }

    checkBalance(): void {
        console.log(`Current Balance: $${this.balance}`);
    }
}

class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

const accounts: BankAccount[] = [
    new BankAccount(6001, 1000),
    new BankAccount(6002, 2000),
    new BankAccount(6003, 3000)
];

const Customers: Customer[] = [
    new Customer("Almas", "Kanwal", "Female", 19, 3452110834, accounts[0]),
    new Customer("Iqra", "Munir", "Female", 18, 3346789106, accounts[1]),
    new Customer("Insha", "Shaukat", "Female", 19, 3434510834, accounts[2])
]

async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter Your Account Number:"
        })

        const Customer = Customers.find(Customer => Customer.account.accountNumber === accountNumberInput.accountNumber)
        if (Customer) {
            console.log(`Welcome, ${Customer.firstName} ${Customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposite", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch (ans.select) {
                case "Deposite":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposite:"
                    })
                    Customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"
                    })
                    Customer.account.withDraw(WithdrawAmount.amount);
                    break;
                case "Check Balance":
                    Customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Existing bank program...");
                    console.log("\n Thank You for using our bank services. Have a good day!");
                    return;


            }

        } else {
            console.log("Invalid account number. Please try again.");

        }
    } while (true)
}

service()