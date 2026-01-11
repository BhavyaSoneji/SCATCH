import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useHandleSubmit } from "../utils/handleSubmit";
import { LogOut } from "lucide-react";
import Details from "../components/Details";
import Button from "../components/Button";
import InputBox from "../components/InputBox";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState("");
  const [isEditBtn, setIsEditBtn] = useState(false);
  const [isPasswordBtn, setIsPasswordBtn] = useState(false);
  const [previewURL, setPreviewUrl] = useState(null);

  const [editForm, setEditForm] = useState({});

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fetchedUser = async () => {
    await axios
      .get("http://localhost:5000/users/userwithcart", {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.data.status) {
          setUserDetails(resp.data.user);
          setLoading(false);
        }
      });
  };

  const handleSubmit = useHandleSubmit();

  useEffect(() => {
    fetchedUser();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `http://localhost:5000/users/updateuser/${editForm._id}`,editForm,{
          withCredentials:true
        }
      );
      if (resp.data.status) {
        setUserDetails(resp.data.user);
        setIsEditBtn(false);
        // Show success message if you have notifications
      }
    } catch (err) {
      console.error(err);
      // Show error message
    }
  };

  const handlePasswordSubmit = (e) => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    handleSubmit(e, passwordForm, "UpdatePassword");
    setIsPasswordBtn(false); // Close form after submit
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }); // Reset
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setEditForm({...editForm, profilePic: url });
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    console.log(userDetails);
  };

  useEffect(() => {
    if (userDetails) {
      setEditForm(userDetails);
    }
  }, [userDetails]);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-zinc-50 ">
      <NavBar></NavBar>
      {!loading ? (
        <div className="absolute top-15 container mx-auto p-10 w-full items-center flex flex-col gap-5">
          {/* Header */}
          <div className="flex w-full justify-between items-center py-3">
            <h1 className="text-4xl font-serif flex items-center">
              User Profile
            </h1>
            <button
              onClick={(e) => handleSubmit(e, {}, "Logout")}
              className="flex items-center h-fit p-3 rounded-lg bg-red-500 text-zinc-100 hover:bg-rose-600 hover:text-zinc-50 hover:cursor-pointer transition-all duration-200"
            >
              <LogOut size={20} className="shrink-0" />
              <span className="text-sm font-medium tracking-wide">Logout</span>
            </button>
          </div>
          {/* Body */}
          <div className="bg-white shadow-md rounded-lg p-6 w-1/2 flex flex-col gap-5">
            <div className="flex gap-3 justify-end">
              <Button
                value={isEditBtn ? "Cancel" : "Edit User"}
                className="w-fit px-3 bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  setIsEditBtn((prev) => !prev);
                  setIsPasswordBtn(false);
                }}
              ></Button>
              <Button
                value={isPasswordBtn ? "Cancel" : "Change Password"}
                className="w-fit px-3 bg-emerald-500 hover:bg-emerald-600"
                onClick={() => {
                  setIsPasswordBtn((prev) => !prev);
                  setIsEditBtn(false);
                }}
              ></Button>
            </div>

            {/* Profile View */}
            {!isEditBtn && !isPasswordBtn && (
              <div>
                <div className="mb-4 flex justify-between p-2">
                  <h1 className="capitalize text-gray-900 text-3xl font-bold">
                    {userDetails.fullName || "N/A"}
                  </h1>
                  <div className=" bg-zinc-50 overflow-hidden rounded-full p-2">
                    <img
                      src={
                        userDetails.profilePic === "" || null
                          ? "https://imgs.search.brave.com/v3K9Ei5XBK7aQW1GB0EAJ9VOSFEZe7Lh_OLnJ47fmXs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Qcm9m/aWxlLUF2YXRhci1Q/TkctRnJlZS1Eb3du/bG9hZC5wbmc"
                          : userDetails.profilePic
                      }
                      className="h-20 w-20 rounded-full"
                      alt="profile Picture"
                    />
                  </div>
                </div>
                <div className="mb-4 flex flex-col gap-3 text-lg">
                  <Details label={"Email"} data={userDetails.email}></Details>
                  <Details
                    label={"Contact Number"}
                    data={userDetails.contact}
                  ></Details>
                  <Details
                    label={"Address"}
                    data={userDetails.address}
                  ></Details>
                </div>
              </div>
            )}

            {/* Edit Profile Form */}
            {isEditBtn && (
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                <InputBox
                  data={editForm}
                  setData={setEditForm}
                  title="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                />
                <InputBox
                  data={editForm}
                  setData={setEditForm}
                  title="Contact Number"
                  name="contact"
                  type="tel"
                  placeholder="Enter your contact number"
                />
                <InputBox
                  data={editForm}
                  setData={setEditForm}
                  title="Address"
                  name="address"
                  type="text"
                  placeholder="Enter your address"
                />
                <div className="flex flex-col gap-1">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      name="profilePic"
                      accept="image"
                      className="h-10 w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      onChange={(e) => {
                        handleFileChange(e);
                      }}
                    />
                  </div>
                  <img
                    src={previewURL}
                    className="h-30 w-30 overflow-hidden object-contain"
                    alt="Profile Picture"
                  ></img>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditBtn(false)}
                    className="hover:bg-zinc-100 px-4 py-2 text-sm rounded border border-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* Change Password Form */}
            {isPasswordBtn && (
              <form
                onSubmit={handlePasswordSubmit}
                className="flex flex-col gap-3"
              >
                <InputBox
                  data={passwordForm}
                  setData={setPasswordForm}
                  title="Current Password"
                  name="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                />
                <InputBox
                  data={passwordForm}
                  setData={setPasswordForm}
                  title="New Password"
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                />
                <InputBox
                  data={passwordForm}
                  setData={setPasswordForm}
                  title="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsPasswordBtn(false)}
                    className="px-4 py-2 text-sm rounded border border-zinc-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center text-xl">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Profile;
