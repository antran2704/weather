import * as React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    IconButton,
  } from "@mui/material";

export function CityWeather(props) {
    const item = [
        {
          name: "Thành Phố Hồ Chí Minh",
          temprature: "37 độ",
          detail: "có mây vài nơi",
        },
    
        {
          name: "Thủ Đô Hà Nội",
          temprature: "37 độ",
          detail: "trời nắng",
        }
    ]
    const handleListItemClick = (value) => {
        props.onSelected(value);
    };
   

    return (
      <>
      {item.map((p) => (
        <Card className="wt"
        sx={{height: "15vh", margin: "20px 20px 0 20px", color: "#fff", display: "flex", gap:"30px"}}
        // onClick={() =>}
        >
            <CardContent 
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              width: "30vh"
            }}
            
            >
              <Typography variant='caption'>
                {p.name}
              </Typography >
              <Typography variant='caption' >
                {p.detail}
              </Typography>
            </CardContent>
              <CardContent>
             
              <Typography variant='caption'>
                {p.temprature}
              </Typography>
             


            </CardContent>
            
        </Card>
          ))}
      </>
          
      )
    
      
    
    
}