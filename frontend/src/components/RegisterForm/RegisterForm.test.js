import React from 'react';
import { shallow, configure } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import RegisterForm from './RegisterForm';

Enzyme.configure({ adapter: new Adapter() })


describe("LoginForm", () => {
    it("should render my component", () => {
        const wrapper = shallow(<RegisterForm />);
        const tree = wrapper.debug();
        expect(tree).toMatchSnapshot();
    });
});