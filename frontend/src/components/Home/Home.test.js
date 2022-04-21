import React from 'react';
import { shallow, configure } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import Home from './Home';

Enzyme.configure({ adapter: new Adapter() });


describe("Home", () => {
    it("should render my component", () => {
        const wrapper = shallow(<Home />);
        const tree = wrapper.debug();
        expect(tree).toMatchSnapshot();
    });

});