import React from 'react';
import { shallow,configure} from "enzyme";
import Enzyme from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import AllDataC from "./AllDataC";

Enzyme.configure({adapter: new Adapter()})

describe("AllDataC",()=>{
  it("should render my component", () => {
    const wrapper = shallow(<AllDataC />);
    const tree = wrapper.debug();
    expect(tree).toMatchSnapshot();
  });

  it("button click test",()=>{
    const wrapper = shallow(<AllDataC/>);
    const instance = wrapper.instance();
    jest.spyOn(instance,'clickEdit');
     wrapper.find('#edit-btn').simulate('click')
    expect(instance.clickEdit).toHaveBeenCalledTimes(1);    
    });
})