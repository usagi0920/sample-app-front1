"use client"

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function SampleappView() {
    const [message, setMessage] = useState(""); // 追加①
    const [result, setResult] = useState(""); // 追加②
    const handleClick = async() => {
        console.log("ボタンがクリックされました");
        const response = await fetch("http://localhost:8765/api/echo-message", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({message: message}),
        });

        const data = await response.json();
        setResult(data.message);
    };
     // 追加③
    
  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h1>SampleApp</h1>
      <div style={{ marginTop: 15, display: "flex", justifyContent: "center", gap: 10 }}>
      <TextField label="入力欄" value={message} onChange={(e) => setMessage(e.target.value)} /> {/* 追加① */}
      <Button variant="contained" onClick={handleClick}>ボタン</Button> {/* 追加③ */}
      </div>

      {result && ( // 追加②
        <p style={{ marginTop: 20 }}>ここに表示：{result}</p> // 追加②
      )} {/* 追加② */}
    </div>
  )
}