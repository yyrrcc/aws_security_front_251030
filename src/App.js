import { useState } from "react";
import "./App.css";
import api from "./axiosConfig";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // 회원가입
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // URLSearchParams 이용해서 파라미터 값 넣어주기
      await api.post("/api/auth/signup", new URLSearchParams({ username, password }));
      setMessage(username + "님 회원가입 성공");
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  // 로그인
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/login", new URLSearchParams({ username, password }));
      setMessage(username + "님 로그인 성공");
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
    }
  };

  // 로그아웃
  const handleLogout = async () => {
    await api.post("/api/auth/logout");
    setMessage(username + "로그아웃 성공");
  };

  // 로그인한 사용자 확인
  const handleLoginCheck = async () => {
    try {
      const res = await api.get("/api/auth/me");
      setMessage("현재 로그인한 사용자 : " + res.data.username);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("로그인이 필요합니다.");
      } else {
        setMessage("에러 발생: " + error.message);
      }
    }
  };

  return (
    <div className="App">
      <h2>회원가입과 로그인</h2>
      아이디 <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
      <br />
      비밀번호
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <br />
      <button onClick={handleSignup}>회원가입</button>
      <hr />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleLogout}>로그아웃</button>
      <hr />
      <button onClick={handleLoginCheck}>로그인한 사용자 확인</button>
      <hr />
      <h2>프론트 응답 : {message}</h2>
    </div>
  );
}

export default App;
