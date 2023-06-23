import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { regEmail, checkReg, checkNull } from "../hooks/useCheck";
import { userLogin } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 참고 페이지: https://ddeck.tistory.com/33
// 참고 페이지 2 (코드는 안봄): https://velog.io/@94lfnv/React-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
// Please note that the provided code assumes you have a server running at 'http://49.50.162.189:4000' that handles the /auth/signin endpoint. Make sure the server is running and properly configured to handle the request.

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [id, setId] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginState } = useSelector((state) => state.userReducer);

  /** redux를 초기화하기 위함 */
  useEffect(() => {
    localStorage.removeItem("persist:root");
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "id") {
      setId(value);
    } else if (name === "password") setPassword(value);
  };

  useEffect(() => {
    // console.log("useEffect");
    if (loginState) {
      // console.log("loginState");
      navigate("/main");
    }
  }, [loginState, navigate]);

  // /** 회원가입 페이지로 이동 */
  const moveSignupPage = () => {
    navigate("/Signup");
  };

  // /** 아이디 찾기 페이지로 이동 */
  const moveFindId = () => {
    navigate("/inquiry/id");
  };

  // /** 비밀번호 찾기 페이지로 이동 */
  const moveFindPw = () => {
    navigate("/inquiry/pw");
  };

  // login 버튼 이벤트
  const onClickLogin = async (e) => {
    e.preventDefault();

    if (checkNull([id, password])) {
      return alert("아이디와 비밀번호 모두 입력해주세요.");
    } else if (!checkReg(id.trim(), regEmail)) {
      return alert("이메일 형식이 아닙니다.");
    }
    const login_info = {
      email: id,
      password,
    };
    dispatch(userLogin(login_info));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        font: "white",
      }}
    >
      <div>
        <h2>Login</h2>
        <FormControl style={{ width: "300px" }}>
          <TextField
            type="text"
            id="id"
            value={id}
            name="id"
            onChange={handleInput}
            label="ID"
            variant="standard"
            inputProps={{ style: { color: "white" } }}
            SelectProps={{
              style: { color: "white", backgroundColor: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <TextField
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInput}
            label="Password"
            style={{ marginTop: "0em" }}
            variant="standard"
            placeholder="Password"
            inputProps={{
              style: { color: "white" },
            }}
            SelectProps={{
              style: { color: "white", backgroundColor: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <FormControl>
            <Button
              size="large"
              variant="outlined"
              type="submit"
              onClick={onClickLogin}
              style={{ marginTop: "1em" }}
            >
              로그인
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1em",
              }}
            >
              <div>
                <Button size="small" onClick={moveFindId}>
                  아이디 찾기
                </Button>
                <Button size="small" onClick={moveFindPw}>
                  비밀번호 찾기
                </Button>
              </div>
              <Button size="small" onClick={moveSignupPage}>
                회원가입
              </Button>
            </div>
          </FormControl>
        </FormControl>
      </div>
    </div>
  );
};
