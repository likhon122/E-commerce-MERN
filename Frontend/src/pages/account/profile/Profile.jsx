import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../../../app/features/ProfileSlice";
import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";
import MyProfile from "./MyProfile";

const links = [
  {
    manageAccount: ["My Profile", "My Address Book", "My Payment Options"]
  },
  {
    orders: ["My Returns", "My Cancellations"]
  },
  {
    wishes: ["Wishes"]
  }
];

const Profile = () => {
  const { userInfo, isLoading, isError, error, isSuccess } = useSelector(
    (state) => state.profile
  );
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [clickedValue, setClickedValue] = useState("My Profile");
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const params = useParams();
  // const id = params.id;

  useEffect(() => {
    // if (id && !isSuccess) {
    //   dispatch(getUserDetails(id));
    // }
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  let content;
  if (clickedValue === "My Profile") {
    content = <MyProfile userInfo={userInfo} />;
  }

  if (clickedValue === "My Address Book") {
    content = <MyProfile userInfo={userInfo} />;
  }

  if (clickedValue === "My Payment Options") {
    content = <MyProfile userInfo={userInfo} />;
  }
  if (clickedValue === "My Returns") {
    content = <MyProfile userInfo={userInfo} />;
  }
  if (clickedValue === "My Cancellations") {
    content = <MyProfile userInfo={userInfo} />;
  }
  if (clickedValue === "Wishes") {
    content = <MyProfile userInfo={userInfo} />;
  }

  return (
    <div className="min-h-screen mx-[10%] mt-10 ">
      <div className=" grid md:grid-cols-[20%_minmax(0px,_1fr)] grid-cols-[0%_minmax(0px,_1fr)] md:gap-10">
        <div
          className=""
          onClick={(e) => {
            const links = [
              "My Profile",
              "My Address Book",
              "My Payment Options",
              "My Returns",
              "My Cancellations",
              "Wishes"
            ];
            const innerTextValue = e.target.innerText;
            if (links.includes(innerTextValue)) {
              setClickedValue(e.target.innerText);
            }
          }}
        >
          {/* Profile sidebar */}
          <div className=" ">
            <div>
              <h1 className="font-semibold text-[17px] mb-1">
                Manage my account
              </h1>
            </div>
            <ul className=" ml-10">
              {links.map((mainLinks) =>
                mainLinks.manageAccount?.map((link, index) => {
                  return (
                    <li
                      key={index}
                      className={`cursor-pointer hover:underline hover:text-buttonColor font-[500]  ${
                        clickedValue == link
                          ? "text-buttonColor underline"
                          : "text-gray-600 "
                      }`}
                    >
                      {link}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          <div className="mt-2">
            <div>
              <h1 className="font-semibold text-[17px] mb-1">My Orders</h1>
            </div>
            <ul className="ml-10">
              {links.map((mainLinks) =>
                mainLinks.orders?.map((link, index) => {
                  return (
                    <li
                      key={index}
                      className={`cursor-pointer hover:underline hover:text-buttonColor font-[500]  ${
                        clickedValue == link
                          ? "text-buttonColor underline"
                          : "text-gray-600 "
                      }`}
                    >
                      {link}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          <div>
            <div className="mt-2">
              <h1 className="font-semibold text-[17px] ">My WishList</h1>
              <ul className="ml-10">
                {links.map((mainLinks) =>
                  mainLinks.wishes?.map((link, index) => {
                    return (
                      <li
                        key={index}
                        className={`cursor-pointer hover:underline hover:text-buttonColor font-[500]  ${
                          clickedValue == link
                            ? "text-buttonColor underline"
                            : "text-gray-600 "
                        }`}
                      >
                        {link}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <div>{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
