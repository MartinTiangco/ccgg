import renderer from "react-test-renderer";
import React from "react";
import FriendsComponent from "../index";

it("snapshot test of FriendsComponent", () => {
  const tree = renderer.create(<FriendsComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
