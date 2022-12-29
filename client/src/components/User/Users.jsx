import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import LeftSidebar from "../Bars/LeftSidebar";
import Avatar from "../Utility/Avatar";
import Loading from "../Utility/Loading";
import { getUser } from "../../reducers/user.js";

const Users = () => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  console.log(users);
  function clickHandler(id){
    dispatch(getUser(id));
  }
  return (
    <>
      {users === null ? (
        <Loading/>
      ) : (
        <>
          <LeftSidebar />
          <div className="users-container-main">

         
          {users.map((user) => {
            return (
              <div className="users-container" key={user?._id}>
                <div className="user">
                  <Avatar
                    color={"black"}
                    letter={user.name.charAt(0).toUpperCase()}
                    backgroundColor={"gray"}
                    borderRadius={"5rem"}
                    py={"0.3rem"}
                    px={"0.8rem"}
                  />
                  <h2>
                    {" "}
                    <Link to={`/users/${user._id}`} onClick={()=>clickHandler(user._id)}> {user.name}</Link>{" "}
                  </h2>{" "}
                </div>
                <p>Joined {moment(user.joinedOn).fromNow()}</p>
                {/* <div className="users-about">
                   {user.about ? <p>About: {user.about} </p> :<p>About: Not given</p>  }
                </div> */}
              </div> 
            );
          })}
          </div>
        </>
      )}
    </>
  );
};

export default Users;
