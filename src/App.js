import { useEffect, useState } from "react";
import "./App.css";
import api from "./axiosConfig";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // 토큰값 (localStorage : 웹브라우저에서 기본적으로 가지고 있는 저장소)
  const [token, setToken] = useState("" || localStorage.getItem("token"));

  // 회원가입
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/signup", { username, password }); // JSON 타입으로 넣어주기
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
      const res = await api.post("/api/auth/login", { username, password });
      setToken(res.data.token); // 토큰값 저장
      localStorage.setItem("token", res.data.token);
      setMessage(username + "님 로그인 성공");
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
    }
  };

  // 로그아웃 (= 토큰 삭제 및 토큰값 초기화)
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMessage(username + "로그아웃 성공");
  };

  // 로그인한 사용자 확인
  const handleLoginCheck = async () => {
    try {
      // 로그인하지 않은 경우(= 토큰이 없는 경우)
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }
      // Authorization 헤더를 넣어서 인증 정보를 보내줘야 함!!
      const res = await api.get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } });
      setMessage("현재 로그인한 사용자 : " + res.data.username);
    } catch (error) {
      console.error(error);
      alert("에러났어요");
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
