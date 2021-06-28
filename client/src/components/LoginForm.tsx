import React, { ChangeEvent, FC, useState } from "react";

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        value={email}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        value={password}
        type="password"
        placeholder="Password"
      />
      <button>Войти</button>
      <button>Регистрация</button>
    </div>
  );
};

export default LoginForm;
