"use client"

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export function SampleappView() {
  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h1>SampleApp</h1>
      <div style={{ marginTop: 15, display: "flex", justifyContent: "center", gap: 10 }}>
      <TextField id="outlined-basic" label="入力欄" variant="outlined" />
      <Button variant="contained">ボタン</Button>
      </div>

    </div>
  )
}