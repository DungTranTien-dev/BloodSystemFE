// import React, { useEffect, useState } from "react";
// import Map, { Marker, Source, Layer } from "react-map-gl";

// // Sửa từ process.env.MAPBOX_TOKEN thành giá trị trực tiếp
// const MAPBOX_TOKEN = "pk.eyJ1IjoiZHVuZ2RldjExMyIsImEiOiJjbWNicWJnd2owYzF2MmtvbHRjbTI3c3Z6In0.GxTBXw4sDwC2RAzMpNPMRA"; // 👈 Thay bằng token thực tế

// const lineLayer = {
//   id: "route",
//   type: "line",
//   paint: {
//     "line-color": "#f43f5e",
//     "line-width": 5
//   }
// };

// function MapboxRoute({ userLocation, donorLocation }) {
//   const [route, setRoute] = useState(null);

//   useEffect(() => {
//     if (userLocation && donorLocation) {
//       fetch(
//         `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation.lng},${userLocation.lat};${donorLocation.lng},${donorLocation.lat}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.routes && data.routes.length > 0) {
//             setRoute(data.routes[0].geometry);
//           }
//         })
//         .catch(error => {
//           console.error("Error fetching directions:", error);
//         });
//     }
//   }, [userLocation, donorLocation]);

//   return (
//     <Map
//       initialViewState={{
//         latitude: userLocation.lat,
//         longitude: userLocation.lng,
//         zoom: 13
//       }}
//       style={{ width: "100%", height: 300 }}
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       mapboxAccessToken={MAPBOX_TOKEN}
//     >
//       <Marker latitude={userLocation.lat} longitude={userLocation.lng} color="blue" />
//       <Marker latitude={donorLocation.lat} longitude={donorLocation.lng} color="red" />
//       {route && (
//         <Source id="route" type="geojson" data={{ type: "Feature", geometry: route }}>
//           <Layer {...lineLayer} />
//         </Source>
//       )}
//     </Map>
//   );
// }

// export default MapboxRoute;
