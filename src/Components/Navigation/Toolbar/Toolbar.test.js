import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Toolbar from "./Toolbar";
import NavItems from "../NavItems/NavItems";

configure({adapter: new Adapter()});

describe("Toolbar", () => {
   it("Should get 1 navItems", () => {
      const wrapper = shallow(<Toolbar />);
      expect(wrapper.find(NavItems)).toHaveLength(1);
   });
});