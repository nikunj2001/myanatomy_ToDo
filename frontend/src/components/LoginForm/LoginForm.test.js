import React from 'react';
import { shallow, configure } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import LoginForm from "./index"

Enzyme.configure({ adapter: new Adapter() })


describe("LoginForm", () => {
    it("should render my component", () => {
        const wrapper = shallow(<LoginForm />);
        const tree = wrapper.debug();
        expect(tree).toMatchSnapshot();
    });
});