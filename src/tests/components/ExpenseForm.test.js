import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses'

test("Should render expenseform", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
})

test("Should render expenseform with data", () => {
    const wrapper = shallow(<ExpenseForm {...expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
})

test("Should render error for invalid form submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test("Should set description on input change", () => {
    const value = "new description"
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('description')).toBe(value);
})

test("Should set note on input change", () => {
    const value = "new note"
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: { value }
    })
    expect(wrapper.state('note')).toBe(value);
})

test("Should set amount on valid input change", () => {
    const value = '23.50'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe(value);
})

test("Should set amount on invalid input change", () => {
    const value = '12.5032'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    })
    expect(wrapper.state('amount')).toBe('');
})

test("Should call onSubmit prop for valid form submission", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>)
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt,
    });
})

test("Should set new date on date change", () => {
    const now = moment()
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("SingleDatePicker").prop("onDateChange")(now)
    expect(wrapper.state("createdAt")).toEqual(now);
})

test("Should set calendar focus on change", () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("SingleDatePicker").prop("onFocusChange")({focused})
    expect(wrapper.state("calendarFocused")).toEqual(focused);
})