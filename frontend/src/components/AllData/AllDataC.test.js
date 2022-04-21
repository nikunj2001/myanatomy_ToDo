import React from 'react';
import { shallow, configure } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import AllDataC from './AllDataC';

Enzyme.configure({ adapter: new Adapter() })


describe("AllDataC", () => {

  it("should render my component", () => {
    const wrapper = shallow(<AllDataC data={[{ task: "Task-1", description: "Describe", status: "pending" }]} />);
    const tree = wrapper.debug();
    expect(tree).toMatchSnapshot();
  });

  it("button click test", () => {
    const pushMock = jest.fn();
    const wrapper = shallow(<AllDataC data={[{ task: "Task-1", description: "Describe", status: "pending" }]} history={{ push: pushMock }} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'clickEdit');
    wrapper.find('#edit-btn').simulate('click');
    expect(instance.clickEdit).toHaveBeenCalledTimes(1);
  });

  it("button click test", () => {
    const pushMock = jest.fn();
    const wrapper = shallow(<AllDataC data={[{ task: "Task-1", description: "Describe", status: "pending" }]} history={{ push: pushMock }} />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'deleteClick');
    wrapper.find('#delete-btn').simulate('click');
    expect(instance.deleteClick).toHaveBeenCalledTimes(1);
  });
})