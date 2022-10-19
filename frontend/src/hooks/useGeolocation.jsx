import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [geo, setGeo] = useState({ lat: 0, lon: 0 });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      setGeo({ lat: latitude, lon: longitude });
    });
  }, []);
  return geo;
};

export default useGeolocation;