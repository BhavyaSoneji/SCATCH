import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useHandleSubmit } from "../utils/handleSubmit";
import { LogOut } from "lucide-react";
import Details from "../components/Details";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import notify from "../utils/notifications";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";
import InputBoxPassword from "../components/InputBoxPassword";

// Constants
const DEFAULT_PROFILE_PIC =
  "https://imgs.search.brave.com/v3K9Ei5XBK7aQW1GB0EAJ9VOSFEZe7Lh_OLnJ47fmXs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9Qcm9m/aWxlLUF2YXRhci1Q/TkctRnJlZS1Eb3du/bG9hZC5wbmc";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [isEditBtn, setIsEditBtn] = useState(false);
  const [isPasswordBtn, setIsPasswordBtn] = useState(false);
  const [newPassword, setNewPassword] = useState(false); // Password for Google Users
  const [showPassword, setShowPassword] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profilePicState, setProfilePicState] = useState({
    file: null, // The actual File object
    previewUrl: null, // Temporary preview URL
    currentUrl: null, // URL from backend
  });

  const { loginSuccess } = useAuth();
  const handleSubmit = useHandleSubmit();

  // Fetch user data
  const fetchedUser = async () => {
    try {
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
    } catch (error) {
      console.error("Error fetching user:", error);
      notify.error("Failed to load user details");
      setLoading(false);
    }
  };

  // Fetiching the User and its deatils using useEffect
  useEffect(() => {
    fetchedUser();
  }, []);

  // Updating on the password or Profile details useEffect
  useEffect(() => {
      const setEdit = () => {
      if (userDetails) {
        setEditForm(userDetails);
      }
    };
    const setInputsPassword = () => {
      if (!userDetails.password) {
        setNewPassword(true);
      } else {
        setNewPassword(false);
      }
    };
    setInputsPassword();
    setEdit();
  }, [userDetails]);

  // Initialize profile pic URL when user data loads
  useEffect(() => {
    if (userDetails.profilePic) {
      setProfilePicState((prev) => ({
        ...prev,
        currentUrl: userDetails.profilePic,
      }));
    }
  }, [userDetails.profilePic]);

  // Get the display URL (preview if editing, otherwise current)
  const getDisplayProfilePic = () => {
    if (isEditBtn && profilePicState.previewUrl) {
      return profilePicState.previewUrl; // Show preview during edit
    }
    return profilePicState.currentUrl || DEFAULT_PROFILE_PIC;
  };

  // Handle file selection
  const handleProfilePicChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      clearProfilePicPreview();
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    setProfilePicState({
      file: file,
      previewUrl: previewUrl,
      currentUrl: profilePicState.currentUrl,
    });
  };

  // Clear preview when canceling
  const clearProfilePicPreview = () => {
    // Cleanup object URL to prevent memory leaks
    if (profilePicState.previewUrl) {
      URL.revokeObjectURL(profilePicState.previewUrl);
    }

    setProfilePicState((prev) => ({
      ...prev,
      file: null,
      previewUrl: null,
    }));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (profilePicState.previewUrl) {
        URL.revokeObjectURL(profilePicState.previewUrl);
      }
    };
  }, [profilePicState.previewUrl]);

  // Handle Edit Submit event for Details Update
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData to handle file upload
      const formData = new FormData();

      Object.keys(editForm).forEach((key) => {
        if (key !== "_id" && key !== "profilePic") {
          formData.append(key, editForm[key]);
        }
      });

      if (profilePicState.file) {
        formData.append("profilePic", profilePicState.file);
      }

      const response = await axios.post(
        `http://localhost:5000/users/updateuser/${userDetails._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.status) {
        // Update user details with new data from backend
        setUserDetails(response.data.updatedUser);

        // Update editForm with new data
        setEditForm({
          _id: response.data.updatedUser._id,
          fullName: response.data.updatedUser.fullName || "",
          email: response.data.updatedUser.email || "",
          contact: response.data.updatedUser.contact || "",
          address: response.data.updatedUser.address || "",
        });

        // Update profile pic state with new URL from backend
        if (response.data.updatedUser.profilePic) {
          setProfilePicState({
            file: null,
            previewUrl: null,
            currentUrl: response.data.updatedUser.profilePic,
          });
        }

        notify.success(response.data.message);
        loginSuccess();
        setIsEditBtn(false);
      }
    } catch (error) {
      console.error("Update error:", error);
      notify.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  // Submit Event For Password Update form
  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      notify.error("New passwords do not match!");
      return;
    }
    axios
      .post(
        `http://localhost:5000/users/updatepassword/${userDetails._id}`,
        {passwordForm,newPassword},
        {
          withCredentials: true,
        },
      )
      .then((resp) => {
        console.log("asnwer",resp);
        if (resp.data.status) {
          notify.success(resp.data.message);
          setIsPasswordBtn(false);
        } else {
          notify.error(resp.data.message);
        }
      })
      .catch((err) => {
        notify.error(err.response?.data?.message);  
      });
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Handle Cancle Edit event
  const handleCancelEdit = () => {
    clearProfilePicPreview();
    setEditForm(userDetails); // Reset form to original data
    setIsEditBtn(false);
  };

  // ProfilePicture component for reusability
  const ProfilePicture = ({ src, className = "", alt = "Profile Picture" }) => (
    <div
      className={`h-40 w-40 bg-zinc-50 overflow-hidden rounded-full p-2 ${className}`}
    >
      <img
        src={src}
        className="h-full w-full object-cover rounded-full"
        alt={alt}
        onError={(e) => {
          e.target.src = DEFAULT_PROFILE_PIC;
        }}
      />
    </div>
  );


  return (
    <div className="relative min-h-screen w-full flex flex-col bg-zinc-50 ">
      <NavBar></NavBar>
      {!loading ? (
        <div className="absolute top-15 mx-auto p-10 w-full items-center flex flex-col gap-5">
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
                  if (isEditBtn) {
                    handleCancelEdit();
                  } else {
                    setIsEditBtn(true);
                    setIsPasswordBtn(false);
                  }
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
                  <ProfilePicture src={getDisplayProfilePic()} />
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
              <form
                onSubmit={(e) => handleEditSubmit(e)}
                className="flex flex-col gap-3"
                encType="multipart/form-data"
              >
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
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Picture
                  </label>

                  <input
                    type="file"
                    name="profilePic"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    onChange={handleProfilePicChange}
                  />

                  <p className="text-xs text-gray-500">
                    Supported: JPG, PNG, GIF, WebP • Max size: 5MB
                  </p>

                  {/* Preview Section */}
                  <div className="flex items-center gap-4 mt-2">
                    <ProfilePicture src={getDisplayProfilePic()} />
                    {profilePicState.previewUrl && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600 font-medium">
                          ✓ New image selected
                        </span>
                        <button
                          type="button"
                          onClick={clearProfilePicPreview}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
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
                {!newPassword ? (
                  <InputBoxPassword
                    data={passwordForm}
                    setData={setPasswordForm}
                    name="currentPassword"
                    placeholder="Enter your current password"
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                ) : (
                  <></>
                )}
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
                    {newPassword ? "Set Password" : "Update Password"}
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
