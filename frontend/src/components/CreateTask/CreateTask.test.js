import React from 'react';
import { shallow, configure } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import CreateTask from './CreateTask';

Enzyme.configure({ adapter: new Adapter() })


describe("CreateTask", () => {

    it("should render my component", () => {
        const wrapper = shallow(<CreateTask />);
        const tree = wrapper.debug();
        expect(tree).toMatchSnapshot();
    });
});