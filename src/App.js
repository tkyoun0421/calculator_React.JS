import './App.css';
import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';

const App = () => {
    const [expenses, setExpenses] = useState([
        { id: 1, charge: '렌트비', amount: 1600 },
        { id: 2, charge: '교통비', amount: 400 },
        { id: 3, charge: '식사', amount: 1200 },
    ]);

    const [charge, setCharge] = useState('');
    const [amount, setAmount] = useState(0);
    const [alert, setAlert] = useState({ show: false, type: '', text: '' });
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('');

    const clearItems = () => {
        setExpenses([]);
    };

    const handleEdit = (id) => {
        const expense = expenses.find((item) => item.id === id);
        console.log(expense);
        const { charge, amount } = expense;
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
        setId(id);
    };

    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text });
        setTimeout(() => {
            setAlert({ show: false, type: '', text: '' });
        }, 5000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (charge !== '' && amount > 0) {
            if (edit) {
                const newExpenses = expenses.map((item) => {
                    return item.id === id ? { ...item, charge, amount } : item;
                });

                setExpenses(newExpenses);
                setEdit(false);
                handleAlert({
                    type: 'success',
                    text: '아이템이 수정되었습니다.',
                });
            } else {
                const newExpense = {
                    id: crypto.randomUUID(),
                    charge,
                    amount,
                };
                const newExpenses = [...expenses, newExpense];

                setExpenses(newExpenses);
                handleAlert({
                    type: 'success',
                    text: '아이템이 생성되었습니다.',
                });
            }
            setCharge('');
            setAmount(0);
        } else {
            console.log('먼저 입력해주세요!');
            handleAlert({
                type: 'danger',
                text: 'charge는 빈 값일 수 없으며 amount는 0보다 커야합니다.',
            });
        }
    };

    const handleCharge = (e) => {
        setCharge(e.target.value);
    };

    const handleAmount = (e) => {
        setAmount(e.target.valueAsNumber);
    };

    const handleDelete = (id) => {
        const newExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(newExpenses);
    };

    return (
        <main className="main-container">
            {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
            <h1>예산 계산기</h1>
            <div
                style={{
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '1rem',
                }}
            >
                <ExpenseForm
                    charge={charge}
                    handleCharge={handleCharge}
                    amount={amount}
                    handleAmount={handleAmount}
                    handleSubmit={handleSubmit}
                    edit={edit}
                />
            </div>
            <div
                style={{
                    width: '100%',
                    backgroundColor: 'white',
                    padding: '1rem',
                }}
            >
                <ExpenseList
                    expenses={expenses}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    clearItems={clearItems}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: '1rem',
                }}
            >
                <p style={{ fontSize: '2rem' }}>
                    총지출:
                    <span>
                        {expenses.reduce((acc, cur) => {
                            return (acc += cur.amount);
                        }, 0)}
                        원
                    </span>
                </p>
            </div>
        </main>
    );
};

export default App;
