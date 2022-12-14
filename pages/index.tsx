// TODO
// Check type safe
// validate input
// Responsive 4k
// refactor styles out of index.tsx
// create .env for API KEY
// More adventurous styling
// Perhaps set background wallpaper dependent on weather in state
// Check for errors to handle eg, no api key so app doesn't crash


import Head from "next/head";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { Paper, TextInput, Button, Text, Group } from "@mantine/core";
import { useState } from "react";

const API_KEY = "Redacted";

const Home: NextPage = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>({});
  console.log(city);

  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  const getWeather = async () => {
    console.log("button press");
    try {
      const serverResponse = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&appid=" +
          API_KEY +
          "&units=imperial"
      );
      const data = await serverResponse.json();
      console.log(data);
      if (data?.cod === 404) throw data;
      setWeatherData(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          position: "static",
          height: "100vh",
          width: "100vw",
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "27%",
          backgroundPositionX: "center",
          backgroundColor: "black",
          filter: "brightness(0.38)",
        }}
      ></div>
      <Paper
        withBorder
        p="lg"
        style={{
          position: "absolute",
          zIndex: "1000",
          maxWidth: "90vw",
          width: "max-content",
          minWidth: "min-content",
          maxHeight: "min-content",
          top: "0",
          right: "0",
          left: "0",
          bottom: "0",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "auto",
          marginBottom: "auto",
        }}
      >
        <Group position="apart">
          <Text size="xl" weight={500}>
            Get the Weather!
          </Text>
        </Group>
        <Group position="apart" mb="sm">
          <Text size="lg">Enter a city, and get the weather below.</Text>
        </Group>
        <Group position="apart" mb="sm">
          <TextInput
            label="city name"
            placeholder="ex: London"
            onChange={(e) => setCity(e.target.value)}
          ></TextInput>
        </Group>
        <Group position="left">
          <Button variant="gradient" size="md" onClick={() => getWeather()}>
            Get Weather
          </Button>
        </Group>
        {Object.keys(weatherData).length !== 0 ? (
          <>
            <Group position="left">
              <Text>{weatherData.name} Weather</Text>
            </Group>
            <Group position="left">
              <img
                src={
                  "https://openweathermap.org/img/wn/" +
                  weatherData.weather[0]?.icon +
                  "@2x.png"
                }
              />
              <Text weight={500} size="lg">
                Currently {Math.round((weatherData.main.temp - 32) * (5 / 9))}{" "}
                &deg;C
              </Text>
            </Group>
          </>
        ) : null}
      </Paper>
    </>
  );
};
export default Home;

