import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";

function App() {
  // 암호화 할 데이터
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [hashedData, setHashedData] = useState("");
  const [decryptedData, setDecryptedData] = useState({ id: "", pw: "" });
  const data = {
    id: "ryu9663",
    password: 12345678,
  };
  const secretKey = "1234";
  // 복호화 키 지정

  const privateKey = "secret key";

  const hashFunction = (e) => {
    e.preventDefault();

    // AES알고리즘 사용 암호화
    const data = {
      id,
      pw,
    };
    console.log(data);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();

    // AES알고리즘 사용 복호화 ( 복구 키 필요 )

    const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);

    // 인코딩, 문자열로 변환, JSON 변환

    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(encrypted);
    console.log(decrypted);
    setHashedData(encrypted);
    setDecryptedData(decrypted);
  };
  // useEffect(() => {
  //   console.log("id:", id);
  //   console.log("pw:", pw);
  // }, [id, pw]);
  return (
    <>
      <form onSubmit={(e) => hashFunction(e)}>
        <div>
          id : <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          pw : <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>
        <button type="submit">정보 암호화하기</button>
      </form>
      <div>{hashedData.length > 0 ? hashedData : null}</div>
      <div>{decryptedData.id.length > 0 ? `id는 ${id}이고, pw는 ${pw}입니다.` : null}</div>
    </>
  );
}

export default App;
