"use client"

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

export function SampleappView() {
    const [message, setMessage] = useState(""); // 追加①
    const [result, setResult] = useState(""); // 追加②
    const [item, setItem] = useState<number | "">("");
    const [resultItem, setResultItem] = useState<number | "">("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = async() => {
        console.log("ボタンがクリックされました");
        setErrorMessage("");
        setResult("");
        setResultItem("");

        const response = await fetch("http://localhost:8765/api/echo-message", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({message: message, item: item}),
        });

        console.log("response", response)

        const data = await response.json();

        console.log("data", data)

        // バリデーションエラーの時
        if (!response.ok) {
            // const errorList = [data.errors?.message, data.errors?.item].filter(Boolean); // 存在するエラーのみ抽出

            const errorList: string[] = [];

            console.log("41", data.errors)

            if (data.errors?.message) {
                errorList.push(...Object.values(data.errors.message)as string[]);
            }

            if (data.errors?.item) {
                errorList.push(...Object.values(data.errors.item)as string[]);
            }

            setErrorMessage(errorList.length > 0 ? errorList.join(", ") : "エラーがあります");
            return;
        }

        // 成功したら
        setResult(data.message);
        setResultItem(data.item);
    };

    const handleItemChange = (
    event: any
    ) => {
    const value = event.target.value;
    setItem(value === "" ? "" : Number(value));
    };

    const [items, setItems] = useState<
    { value: number; label: string }[]
    >([]);

    const handleReset = async() => {
        setErrorMessage("");
        setMessage("");
        setItem("");
        setResult("");
        setResultItem("");
    }

    useEffect(() => {
    fetch("http://localhost:8765/api/items")
        .then(res => res.json())
        .then(data => {
            setItems(Array.isArray(data.items) ? data.items : []);
        });
    }, []);

    const selectedResultItem = items.find(i => i.value === resultItem);

    return (
        <div style={{ maxWidth: 600, margin: "40px auto", textAlign: "center" }}>
            <h1>SampleApp</h1>

            <div style={{ marginTop: 15, display: "flex", justifyContent: "center", gap: 10 }}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">項目</InputLabel>
                <Select<number | "">
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item}
                    label="項目"
                    onChange={handleItemChange}
                >
                    <MenuItem value="">
                    <em>未選択</em>
                    </MenuItem>
                    {items.map(item => (
                        <MenuItem key={item.value} value={item.value}>
                        {item.label}
                        </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Box>

            <TextField
                label="入力欄"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            /> {/* 追加① */}

            <Button variant="contained" onClick={handleClick}>
                出力
            </Button> {/* 追加③ */}

            <Button variant="contained" onClick={handleReset}>
                リセット
            </Button> 
            {/* ↑リセットに良さそう */}
            </div>

            {errorMessage && (
            <p style={{ color: "red", marginTop: 10 }}>
                {errorMessage}
            </p>
            )}

            {result && (
            <p style={{ marginTop: 20 }}>あなたは以下を入力しました<br/>
            選択した項目：{selectedResultItem?.label ?? "未選択"}<br/>
            入力した文字：{result}</p> /* 追加② */
            )}
        </div>
    );
}