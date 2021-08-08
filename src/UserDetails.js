import React, { useContext, useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import { DataContext } from "./DataContext";

const UserDetails = (props) => {
  const { users } = useContext(DataContext);
  const [userData, setUserData] = useState({});
  const userId = props.match.params.id;
  useEffect(() => {
    // filter userdata from users list by id
    // eslint-disable-next-line eqeqeq
    const data = users.filter((user) => user.id == userId)[0];
    setUserData(data);
  }, [userId, users]);

  const MetaData = () => (
    <>
      <p>FullName: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>website: {userData.website}</p>
      <p>Company: {userData.company.name}</p>
    </>
  );

  if (!Object.keys(userData).length) return <p>Loading...</p>;
  return (
    <Card
      image="/images/loader.png"
      header={userData.username}
      meta={<MetaData />}
      description={`${userData.name} works at ${userData.company.name} and lives in
      ${userData.address.city}.`}
      style={{ width: "65%", margin: "0 auto" }}
    />
  );
};

export default UserDetails;
