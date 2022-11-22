import React from "react";

const Follower = ({ avatar_url: avatar, login, html_url: url }) => {
  return (
    <>
      <div className="card">
        <img src={avatar} alt={login} />
        <h4>{login}</h4>
        <a href={url} className="btn">
          View Profile
        </a>
      </div>
    </>
  );
};

export default Follower;
