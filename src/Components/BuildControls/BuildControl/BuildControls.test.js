import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControl from "./BuildControl";
import BuildControls from "../BuildControls";

configure({adapter: new Adapter()});

describe("BuildControls", () => {
   it("Should render 4 buildControl(s)", () => {
      const wrapper = shallow(<BuildControls price={40.50} ingredients={{bacon: 0, salad: 1, cheese: 2, meat: 0}}/>);
      expect(wrapper.find(BuildControl)).toHaveLength(4);
   });
});