import { useEffect, useState } from "react";
import sociallyApi from "../api/socially";

export default () => {
  const [results, setResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Populate search list with all users that aren't already friends
  // Search that resulting list by search term by filtering
  const searchAllUsers = async () => {
    try {
      const response = await sociallyApi.get("/search");
      setAllUsers(response.data);
      setResults(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchUsers = term => {
    const filteredUsers = allUsers.filter(
      u => u.name.includes(term) || u.username.includes(term)
    );

    setResults(filteredUsers);
  };

  // TODO: Refactor this hook into friendContext as a "add_friend" action somehow
  useEffect(() => {
    searchAllUsers();
  }, []);

  return [searchUsers, results];
};
