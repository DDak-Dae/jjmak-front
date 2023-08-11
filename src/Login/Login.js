import React, { useState, useEffect } from 'react';

import { CheckToken } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { LoginApi, JoinApi } from '../services/api';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate()
  

  useEffect(() => {
    checkTokenAndNavigate()
  }, []); // 빈 배열로 전달하여 한 번만 실행되도록 변경

  /* Token 확인 */
  const checkTokenAndNavigate = async () => {
    const response = await CheckToken();
    // console.log(response);
    if (response === "success") {
      navigate('/workspace');
    }
  };


  /* Id에 대한 onChange */
  const handleUsernameChange = (e) => {
    setUserId(e.target.value);
  };
  /* Password에 대한 onChange */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /* id와 password를 서버로 보내는 함수. 성공시 workspace로 이동 */
  const sendIdPwdToServer = async () => {
    const response = await LoginApi({userId, password});
    // console.log(response)
    if (response.result === "success") {
      navigate('/workspace');
    } else {
      alert('로그인 실패! 아이디와 비밀번호를 확인하세요.');
    }
  };

  //회원 가입
  const join = async () => {
    const response = await JoinApi({userId, password, openaiKey});
    // console.log(response)
    if (response.result === "success") {
      window.location.reload();
    } else {
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      <div>
        {loggedIn ? (
          <h2>로그인 성공! 환영합니다, {userId}님!</h2>
        ) : (
          <>
            <input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={handleUsernameChange}
            />
            <br />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            <button onClick={sendIdPwdToServer}>로그인</button>
          </>
        )}
      </div>
      {/* 회원가입 */}
      <br />
      <div>
          <input type="text" placeholder="아이디" value={userId} onChange={handleUsernameChange}></input>
          <br/>
          <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange}></input>
          <br/>
          <input type="password" placeholder="OPENAIKEY" value={openaiKey} onChange={(e)=>setOpenaiKey(e.target.value)}></input>
          <br />
          <br />
          <button onClick={join}>회원가입</button>
      </div>
    </div>
  );
};

export default Login;