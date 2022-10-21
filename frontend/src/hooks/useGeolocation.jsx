import { useEffect, useState } from "react";

const getIp = async () =>
  await fetch("https://geolocation-db.com/json/")
    .then((res) => res.json())
    .then((res) => res["IPv4"]);
const useGeolocation = () => {
  const [geo, setGeo] = useState({ lat: 0, lon: 0 });
  const getLocation = async () => {
    const nowIp = await getIp();
    const geoData = await fetch(`http://ip-api.com/json/${nowIp}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
      });
    const latitude = geoData.lat;
    const longitude = geoData.lon;
    setGeo({ lat: latitude, lon: longitude });
  };
  useEffect(() => {
    getLocation();
  }, []);

  return geo;
};

export default useGeolocation;