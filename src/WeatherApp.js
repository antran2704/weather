import { useState, useEffect } from "react";
import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MapIcon from "@mui/icons-material/Map";
import { List, Row, Col } from "antd";
import { Slider } from "antd";
import { CityWeather } from "./CityWeather";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

import "./App.scss";
// import Map from "./Map";
// import avata from "../../src/avata.jpg";
// import avata from "../../assets/images/avata.jpg";

const marks = {
  0: "0°C",
  37: "37°C",
};

const data = [
  {
    isTitle: true,
    title: "DỰ BÁO 5 NGÀY",
  },
  {
    title: "Hom nay",
    icon: "https://cdn3.vectorstock.com/i/1000x1000/58/87/sun-icon-weather-label-for-web-on-white-vector-19915887.jpg",
    temp: 22,
  },
  {
    title: "Thu 2",
    icon: "data:image/png;base64,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",
    temp: 30,
  },
  {
    title: "Thu 3",
    // icon:
    temp: 17,
  },
  {
    title: "Thu 4",
    icon: "https://cdn3.vectorstock.com/i/1000x1000/58/87/sun-icon-weather-label-for-web-on-white-vector-19915887.jpg",
    temp: 28,
  },
  {
    title: "Thu 5",
    icon: "https://cdn3.vectorstock.com/i/1000x1000/58/87/sun-icon-weather-label-for-web-on-white-vector-19915887.jpg",
    temp: 28,
  },
];

// const axios = require('axios');
const API_KEY = "e7186441abddfb35303aa006a29c5613";
const BASE_URL = "http://api.openweathermap.org/data/2.5";

function WeatherApp() {
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(false);

  const selected = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    let timmer;

    async function getWeather() {
      try {
        // console.log(`${BASE_URL}/forecast?id=524901&appid=${API_KEY}`);
        const response = await axios.get(
          `${BASE_URL}/forecast?id=524901&appid=${API_KEY}&q=${city}`
        );
        if(response.data) {
          setWeather(response?.data);
        } else {
          setWeather({});
        }
        console.log(response?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    console.log(new Date("2022-12-20 18:00:00").getDate())
    console.log(new Date().getDate())
    if (city.length > 0) {
      setLoading(true);
      timmer = setTimeout(() => {
        getWeather(city);
      }, 1400);
    } else {
      setWeather([]);
      setLoading(false);
    }

    return () => clearTimeout(timmer);
  }, [city]);

  return (
    <Box>
      <Card
        className="wt"
        sx={{
          backgroundColor: "#ccc",
          width: "60vh",
          height: "100vh",
          margin: "auto",
          overflowY: "overlay",
          overflowX: "hidden",
          inset: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            paddingTop: "25px",
            marginLeft: "70px",
            opacity: "0.8",
          }}
        >
          <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          {/* {e => setAddress(e.target.value)} */}
          <TextField
            value={city}
            id="standard-basic"
            placeholder="Tìm kiếm tỉnh Thành Phố"
            variant="standard"
            onChange={(e) => setCity(e.target.value)}
          />
          {/* <input value={city}  id="standard-basic" placeholder="Tìm kiếm tỉnh Thành Phố" variant="standard" onChange={(e) => setCity(e.target.value)} /> */}
        </Box>
        {weather && (
          <CardContent
            fontFamily="sans-serif"
            sx={{
              textAlign: "center",
              paddingTop: "30px",
              color: "#fff",
              gap: "20px",
            }}
          >
            <Typography fontSize="30px">{weather?.city?.name}</Typography>
            <Typography>Trời quang mây</Typography>
          </CardContent>
        )}

        {weather?.city && !isLoading && (
          <Card
            className="background"
            sx={{
              // paddingTop: "50px",
              margin: "80px 20px 0 20px",
              backgroundColor: "#ccc",
              opacity: "0.7",
              // overflow: "scroll",
              color: "#fff",
              fontSize: "20px",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={weather.list}
              renderItem={(item) =>
                item.isTitle ? (
                  <List.Item>{item.title}</List.Item>
                ) : (
                  <List.Item style={{ color: "#fff", filter: "blur(0px)" }}>
                    <Row style={{ width: "100%" }} justify="space-between">
                      <Col span={4} style={{ fontWeight: "bold" }}>
                        {new Date(item.dt_txt).getDate() === (new Date().getDate() + 1) ? "Thứ 6" 
                        : new Date(item.dt_txt).getDate() === (new Date().getDate() + 2) ? "Thứ 7" :
                        new Date(item.dt_txt).getDate() === (new Date().getDate() + 3) ? "Chủ nhật" :
                        new Date(item.dt_txt).getDate() === (new Date().getDate() + 4) ? "Thứ 2" :
                        new Date(item.dt_txt).getDate() === (new Date().getDate() + 5) ? "Thứ 3" : 
                        new Date(item.dt_txt).getDate() === (new Date().getDate() + 6) ? "Thứ 4" : 
                        new Date(item.dt_txt).getDate() === (new Date().getDate() + 7) ? "Thứ 5" : "Hôm nay"
                        }
                      </Col>
                      {/* <Col span={4}>
                      <img height={25} width={30} src={item.icon} alt="" />
                    </Col> */}
                      <Col span={4}>
                        {Math.ceil(item.main.temp_min - 273.15)} độ
                      </Col>
                      <Col span={6}>
                        <Slider
                          defaultValue={Math.ceil(item.main.temp - 273.15)}
                        />
                      </Col>
                      <Col span={4}>
                        {Math.ceil(item.main.temp_max - 273.15)}˚
                      </Col>
                    </Row>
                  </List.Item>
                )
              }
            />
          </Card>
        )}

        {isLoading && <AiOutlineLoading3Quarters className="loading" />}

        <IconButton
          sx={{
            height: "50px",
            top: "7%",
          }}
          edge="start"
          onClick={() => setOpen(true)}
        >
          <MapIcon fontSize="large" />
        </IconButton>
        {/* <Map></Map> */}

        <IconButton
          sx={{
            height: "50px",
            top: "7%",
            left: "76%",
          }}
          edge="start"
          onClick={() => setOpen(true)}
          fontSize="large"
          color="inherit"
        >
          <MenuIcon fontSize="large" color="inherit" />
        </IconButton>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              width: "60vh",
              height: "100vh",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                paddingTop: "25px",
                marginLeft: "70px",
                backgroundColor: " #fff",
              }}
            >
              <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="standard-basic"
                label="Tìm kiếm tỉnh Thành Phố"
                variant="standard"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Box>
            <CityWeather
              open={open}
              onSelected={(value) => {
                setOpen(value);
              }}
              onClose={() => setOpen(false)}
            />
            {/* <Box 
               
              >
                <Card className="wt"
                //  onClick={() => }
                >

                <Typography>
                  Thành Phố Hồ Chí Minh
                </Typography>
                <Typography>
                  37o
                </Typography>
                </Card>
                <Card className="wt"
                sx={{height: "15vh", margin: "10px 20px 0 20px", color: "#fff", display: "flex", gap: "200px"}}
                >
                  
                <Typography>
                Thủ Đô Hà Nội
                </Typography>
                <Typography>
                  30o
                </Typography>
                </Card>
              </Box> */}
          </Box>
        </Dialog>
      </Card>
    </Box>
  );
}

export default WeatherApp;
