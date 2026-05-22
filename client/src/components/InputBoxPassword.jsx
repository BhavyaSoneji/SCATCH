import Password from "./password";

const InputBoxPassword = ({
  data,
  setData,
  showPassword,
  setShowPassword,
  placeholder,
  name,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Password</label>
      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-10 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          required
          minLength={6}
          value={data.currentPassword}
          onChange={(e) => {
            setData({...data,[name]:e.target.value});
          }}
        />
        <Password
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        ></Password>
      </div>
    </div>
  );
};

export default InputBoxPassword;
