import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import React from "react";
import FriendsList from "../index";

const dummyFriends = [
  { username: "Username1", summonerName: "bob1111112222" },
  { username: "Username2", summonerName: "coolname" },
  { username: "Username3", summonerName: "lucas" },
  { username: "Username4", summonerName: "robot" },
  { username: "Username5", summonerName: "suffering" },
  { username: "Username6", summonerName: "awaits" },
];

const emptyFriends = [];

it("snapshot with dummy friend data", () => {
  const tree = renderer.create(<FriendsList friends={dummyFriends} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("snapshot with empty friend data", () => {
  const tree = renderer.create(<FriendsList friends={emptyFriends} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("Check multiple friends rendered correctly", () => {
  render(<FriendsList friends={dummyFriends} />);

  // Check all 6 different friends are rendered
  expect(screen.getByText("Username1")).toBeInTheDocument();
  expect(screen.getByText("Username2")).toBeInTheDocument();
  expect(screen.getByText("Username3")).toBeInTheDocument();
  expect(screen.getByText("Username4")).toBeInTheDocument();
  expect(screen.getByText("Username5")).toBeInTheDocument();
  expect(screen.getByText("Username6")).toBeInTheDocument();

  // Check all 6 ping buttons/images are rendered
  expect(screen.getAllByAltText("Ping Icon")).toHaveLength(6);

  // Check that only 6 rows are generated
  expect(screen.getAllByText(/Summoner:/)).toHaveLength(6);

  // Check search bar is rendered correctly
  expect(screen.getAllByLabelText("Enter username...")).toHaveLength(1);
  expect(screen.getByLabelText("Enter username...")).toBeInTheDocument();

  // Check that add friend button + tool tip is rendered
  expect(screen.getByTitle("Add Friend")).toBeInTheDocument();
});

it("Check no friends rendered correctly", () => {
  render(<FriendsList friends={emptyFriends} />);

  // Check no friends component is rendered correctly
  expect(screen.getByText("No friends found!")).toBeInTheDocument();

  // Check search bar is rendered correctly
  expect(screen.getAllByLabelText("Enter username...")).toHaveLength(1);
  expect(screen.getByLabelText("Enter username...")).toBeInTheDocument();

  // Check that add friend button + tool tip is rendered
  expect(screen.getByTitle("Add Friend")).toBeInTheDocument();
});
