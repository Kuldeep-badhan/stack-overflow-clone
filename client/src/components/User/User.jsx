import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaBirthdayCake } from "react-icons/fa";
import Avatar from "../Utility/Avatar";
import LeftSidebar from "../Bars/LeftSidebar";
import { deleteUser, getAllUsers, postUserData } from "../../reducers/user";
import Loading from "../Utility/Loading";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState(false);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [tagss, setTags] = useState("");

  const { id } = useParams();
  const users = useSelector((state) => state.user.users);
  const logedInUserId = useSelector((state) => state.auth.userData?.result._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  function handleForm() {
    setEditForm(!editForm);
  }
  function handleSubmit(e) {
    e.preventDefault();
    let tags = tagss.split(" ");
    console.log(tags, "user tags");
    const userData = { name, about, tags };
    const userIdAndData = [id, userData];
    dispatch(postUserData(userIdAndData));
    setTimeout(() => {
      dispatch(getAllUsers());
    }, 1000);

    setTimeout(() => {
      setEditForm(!editForm);
    }, 2000);
  }
  function handleDeleteAccount() {
    dispatch(deleteUser(id));
    setTimeout(() => {
      dispatch(getAllUsers());
    }, 1000);
    setTimeout(() => {
      navigate("/users/");
    }, 2000);
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <LeftSidebar />
          {users
            ?.filter((user) => user?._id === id)
            .map((user) => {
              return (
                <div className="user-container" key={user?._id}>
                  <div className="user">
                    <div className="profile-avatar">
                      <Avatar
                        color={"black"}
                        letter={user?.name?.charAt(0)?.toUpperCase()}
                        backgroundColor={"aqua"}
                        borderRadius={"0rem"}
                        py={"4rem"}
                        px={"4rem"}
                      />
                    </div>
                    <div className="name-joined">
                      <h2>{user.name}</h2>
                      <p>
                        {" "}
                        <FaBirthdayCake /> Joined{" "}
                        {moment(user.joinedOn).fromNow()}
                      </p>
                    </div>
                    {logedInUserId === id ? (
                      <div className="edit-btn">
                        <button onClick={handleForm}>Edit Profile</button>
                        <button
                          id="delete-account-btn"
                          onClick={handleDeleteAccount}
                        >
                          Delete Account
                        </button>
                      </div>
                    ) : null}
                  </div>
                  {editForm ? (
                    <div className="edit-info-container">
                      <h2>Edit Profile</h2>
                      <hr />
                      <h2>Public Information</h2>
                      <form onSubmit={handleSubmit}>
                        <div className="name">
                          <label htmlFor="name">Display Name</label>
                          <input
                            type="text"
                            placeholder="name"
                            required
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="about">
                          <label htmlFor="about">About Me</label>
                          <textarea
                            name="about"
                            id="about"
                            cols="30"
                            rows="5"
                            onChange={(e) => setAbout(e.target.value)}
                            required
                          ></textarea>
                        </div>
                        <div className="tags">
                          <label htmlFor="tags">Watched Tags</label>
                          <p>Add tags after 1 space</p>
                          <input
                            type="text"
                            placeholder="tags"
                            onChange={(e) => setTags(e.target.value)}
                          />
                        </div>
                        <div className="user-btns">
                          <button type="submit">submit</button>
                          <button onClick={handleForm}>cancle</button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="user-details">
                      {" "}
                      <div className="tags">
                        <h2>Watched Tags</h2>
                        <ul>
                          {" "}
                          {user.tags.length === 0 ? (
                            <p>Not Selected</p>
                          ) : (
                            user.tags.map((tag) => <li>{tag}</li>)
                          )}{" "}
                        </ul>
                      </div>
                      <div className="bio">
                        <h2>About</h2>
                        {user.about ? (
                          <p>{user.about}</p>
                        ) : (
                          <p>Not Given</p>
                        )}{" "}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </>
      )}
    </>
  );
};

export default User;
