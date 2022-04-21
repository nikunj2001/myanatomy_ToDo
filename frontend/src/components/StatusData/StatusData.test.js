import React from 'react';
import { shallow, configure } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import StatusData from './StatusData';

Enzyme.configure({ adapter: new Adapter() })


describe("StastusData", () => {
    const props = {
        data: [
            { task: "Task-1", description: "Describe-1", status: "pending" },
            { task: "Task-1", description: "Describe-1", status: "completed" },
        ],
        status: "pending"
    }
    it("should render my component", () => {
        const wrapper = shallow(<StatusData props={props} />);
        const tree = wrapper.debug();
        expect(tree).toMatchSnapshot();
    });
});