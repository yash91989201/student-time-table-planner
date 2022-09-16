import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");
  const [credentials, setCredentials] = useState({
    rollNumber: "",
    name: "",
    password: "",
  });
  const handleFormChange = (event) => {
    setCredentials((prevVal) => {
      return {
        ...prevVal,
        [event.target.name]: event.target.value,
      };
    });
  };
  const registerUser = (e) => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) router.push("/login");
      })
      .catch((err) => {
        setErrMsg(err.message);
      });
  };

  return (
    <div>
      <form>
        <input
          className="px-3 py-1 m-2 border border-black"
          type="text"
          name="rollNumber"
          value={credentials.rollNumber}
          onChange={(e) => handleFormChange(e)}
          placeholder="Your Roll Number"
        />
        <input
          className="px-3 py-1 m-2 border border-black"
          type="text"
          name="name"
          value={credentials.name}
          onChange={(e) => handleFormChange(e)}
          placeholder="Your Name"
        />
        <input
          className="px-3 py-1 m-2 border border-black"
          type="password"
          name="password"
          value={credentials.pasword}
          onChange={(e) => handleFormChange(e)}
          placeholder="password"
        />
        <input
          className="bg-blue-500 px-3 py-1 rounded-sm text-white font-semibold"
          type="submit"
          onClick={registerUser}
          value="Register"
        />
      </form>
      {errMsg}
    </div>
  );
}
