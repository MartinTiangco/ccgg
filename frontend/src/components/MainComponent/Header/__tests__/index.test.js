import renderer from "react-test-renderer";
import React from "react";
import Header from "../index";

const summonerInfo = {
  summonerName: "Plasmatops",
  profileId: 4904,
};

it("snapshot with provided summonerName and profileId", () => {
  const tree = renderer.create(<Header summonerInfo={summonerInfo} />).toJSON();
  expect(tree).toMatchSnapshot();
});
