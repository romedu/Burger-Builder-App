import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Ingredient from "./Ingredient/Ingredient";
import Burger from "./Burger";

configure({adapter: new Adapter()});

describe("Burger", () => {
   let wrapper;
   beforeEach(() => {
      wrapper = shallow(<Burger ingredients={{bacon: 0, salad: 0, meat: 0, cheese: 0}} />);
   });

   it("Should render three ingredients including breads", () => {
      wrapper = shallow(<Burger ingredients={{bacon: 1, salad: 0, meat: 0, cheese: 0}} />);
      expect(wrapper.find(Ingredient)).toHaveLength(3);
   });

   it("Should render four ingredients including breads", () => {
      wrapper = shallow(<Burger ingredients={{bacon: 1, salad: 1, meat: 0, cheese: 0}} />);
      expect(wrapper.find(Ingredient)).toHaveLength(4);
   });

   it("Should render five ingredients including breads", () => {
      wrapper = shallow(<Burger ingredients={{bacon: 1, salad: 2, meat: 0, cheese: 0}} />);
      expect(wrapper.find(Ingredient)).toHaveLength(5);
   });
});