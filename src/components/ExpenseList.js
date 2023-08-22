import React from 'react';
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';


const ExpenseList = ({expenses, handleDelete}) => {
    return (
        <>
            <ul className="list">
                {expenses.map(expense => {
                    return <ExpenseItem expense = {expense} key={expense.id} handleDelete={handleDelete}/>
                })}
            </ul>
            <button className="btn">목록 지우기</button>
        </>
    );
}

export default ExpenseList
