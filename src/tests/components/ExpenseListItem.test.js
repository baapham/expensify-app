import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import ExpenseListItem from '../../components/ExpenseListItem';

test("Should render expense list item", () => {
    const item = shallow(<ExpenseListItem {...expenses[0]} />)
    expect(item).toMatchSnapshot();
})