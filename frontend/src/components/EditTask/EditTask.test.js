import React from 'react';
import { shallow, configure } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import EditTask from './EditTask';

Enzyme.configure({ adapter: new Adapter() })


describe("EditTask", () => {
    const location = {
        state: {
            task: {
                task: "Task-1",
                description: "Description",
                status: "pending"
            }
        }
    }
    it("should render my component", () => {
        const wrapper = shallow(<EditTask location={location} />);
        const tree = wrapper.debug();
        expect(tree).toMatchSnapshot();
    });
});