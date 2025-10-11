// import React, { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   Button,
//   ToggleButton,
//   ToggleButtonGroup,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import phoneFrame from "../assets/iPhone Air - Light Gold - Portrait.png";

// const DEFAULT_CENTER = { lat: -33.8688, lng: 151.2093 };
// const libraries: ("places")[] = ["places"];

// export default function NearestHelpPage() {
//   const [category, setCategory] = useState<"police" | "bank" | "cyber">("police");
//   const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
//   const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
//   const [selected, setSelected] = useState<google.maps.places.PlaceResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const serviceRef = useRef<google.maps.places.PlacesService | null>(null);

//   const { isLoaded, loadError } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
//     libraries,
//   });

//   const handleMapLoad = (map: google.maps.Map) => {
//     mapRef.current = map;
//     serviceRef.current = new window.google.maps.places.PlacesService(map);
//   };

//   const findNearby = (pos: { lat: number; lng: number }, type: string) => {
//     if (!serviceRef.current) return;
//     setLoading(true);
//     setResults([]);

//     const request: google.maps.places.PlaceSearchRequest = {
//       location: pos,
//       radius: 30000,
//     };

//     if (type === "police") request.type = "police";
//     else if (type === "bank") request.type = "bank";
//     else {
//       request.keyword = "cyber security|cybercrime|cyber help";
//       request.type = "point_of_interest";
//     }

//     serviceRef.current.nearbySearch(request, (res, status) => {
//       setLoading(false);
//       if (status === window.google.maps.places.PlacesServiceStatus.OK && res) {
//         setResults(res.slice(0, 5));
//       } else setResults([]);
//     });
//   };

//   const handleLocate = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported!");
//       return;
//     }

//     setLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//         setUserPos(position);
//         mapRef.current?.panTo(position);
//         mapRef.current?.setZoom(13);
//         setLoading(false);
//       },
//       (err) => {
//         setLoading(false);
//         alert("Location error: " + err.message);
//       }
//     );
//   };

//   useEffect(() => {
//     if (userPos && serviceRef.current) findNearby(userPos, category);
//   }, [userPos, category]);

//   if (loadError) return <Typography color="error">Error loading map</Typography>;
//   if (!isLoaded) return <CircularProgress />;

//   const markerColor =
//     category === "police" ? "red" : category === "bank" ? "green" : "purple";

//   return (
//   <Box
//     sx={{
//       minHeight: "80vh",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "flex-start",
//       alignItems: "center",
//       px: { xs: 2, md: 8 },
//       py: { xs: 8 },
//       background: "linear-gradient(180deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
//       color: "white",
//     }}
//   >
//     {/* 🟩 Title Block */}
//     <Box
//       sx={{
//         textAlign: "center",
//         mt: { xs: 2, md: 0},
//         mb: { xs: 8, md: 6 },
//         maxWidth: "800px",
//         px: 1,
//       }}
//     >
//       <Typography
//         variant="h3"
//         sx={{
//           fontWeight: 700,
//           fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" },
//           mb: 2,
//         }}
//       >
//         Help Centres Near You
//       </Typography>

//       <Typography
//         variant="h6"
//         sx={{
//           fontWeight: 400,
//           color: "rgba(255,255,255,0.9)",
//           fontSize: { xs: "1rem", sm: "1.2rem" },
//           lineHeight: 1.6,
//         }}
//       >
//         Find nearby police, banks, or cyber help centres that can assist you
//         in reporting scams or fraudulent activities safely.
//       </Typography>
//     </Box>

//     {/* 🟦 Main Content Section */}
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: { xs: "column", lg: "row" },
//         alignItems: "center",
//         justifyContent: "space-evenly",
//         gap: { xs: 6, lg: 10 },
//         width: "100%",
//         maxWidth: "1300px",
//       }}
//     >
//       {/* ✅ LEFT GLASS PANEL */}
//       <Paper
//         elevation={0}
//         sx={{
//           p: { xs: 3, md: 4 },
//           borderRadius: 4,
//           background: "rgba(255,255,255,0.15)",
//           backdropFilter: "blur(15px)",
//           width: { xs: "100%", lg: "460px" },
//           color: "white",
//           textAlign: "left",
//         }}
//       >
//         <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
//            Please provide your location access to help us find you the nearest help center.
//         </Typography>

       

//         <Button
//           onClick={handleLocate}
//           disabled={loading}
//           sx={{
//             borderRadius: "999px",
//             px: 4,
//             py: 1.4,
//             mb: 3,
//             fontWeight: 600,
//             background: "white",
//             color: "#222",
//             "&:hover": { background: "#f1f1f1" },
//           }}
//         >
//           {loading ? <CircularProgress size={22} /> : "Use My Location"}
//         </Button>

//          <ToggleButtonGroup
//           value={category}
//           exclusive
//           onChange={(e, val) => val && setCategory(val)}
//           sx={{
//             mb: 3,

//             "& .MuiToggleButton-root": {
//               borderRadius: "999px",
//               px: 4,
//               py: 1,
//             mr: 1,
//               color: "white",
//               borderColor: "rgba(255,255,255,0.4)",
//               "&.Mui-selected": {
//                 background: "rgba(255,255,255,0.25)",
//                 borderColor: "white",
//               },
//             },
//           }}
//         >
//           <ToggleButton value="police">Police</ToggleButton>
//           <ToggleButton value="bank">Bank</ToggleButton>
//           <ToggleButton value="cyber">Cyber Help</ToggleButton>
//         </ToggleButtonGroup>

//         <Paper
//           sx={{
//             p: 2,
//             borderRadius: 3,
//             background: "rgba(0,0,0,0.4)",
//             backdropFilter: "blur(12px)",
//             maxHeight: 400,
//             overflowY: "auto",
//           }}
//         >
//           <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
//             Nearest 5{" "}
//             {category === "police"
//               ? "Police Stations"
//               : category === "bank"
//               ? "Banks"
//               : "Cyber Centres"}
//           </Typography>

//           {loading && (
//             <Typography>
//               Searching {category}s... <CircularProgress size={14} />
//             </Typography>
//           )}

//           {!loading && results.length === 0 && (
//             <Typography color="text.secondary">
//               No results found nearby.
//             </Typography>
//           )}

//           <List>
//             {results.map((r, i) => (
//               <ListItem
//                 key={r.place_id || i}
//                 onClick={() => {
//                   setSelected(r);
//                   const loc = r.geometry?.location;
//                   if (loc) {
//                     mapRef.current?.panTo(loc);
//                     mapRef.current?.setZoom(15);
//                   }
//                 }}
//                 sx={{
//                   border: "1px solid rgba(255,255,255,0.2)",
//                   borderRadius: 2,
//                   mb: 1,
//                   "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
//                 }}
//               >
//                 <ListItemText
//                   primaryTypographyProps={{ color: "white" }}
//                   secondaryTypographyProps={{
//                     color: "rgba(255,255,255,0.7)",
//                   }}
//                   primary={r.name}
//                   secondary={r.vicinity || r.formatted_address}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       </Paper>

//       {/* ✅ RIGHT MAP MOCKUP */}
//       <Box
//         sx={{
//           position: "relative",
//           width: { xs: 280, sm: 320, md: 370 },
//           height: { xs: 580, sm: 680, md: 750 },
//           flexShrink: 0,
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: { xs: "2%" },
//             left: { xs: "5%", sm: "4%" },
//             width: { xs: "90%", sm: "92%" },
//             height: { xs: "96%", sm: "96%" },
//             borderRadius: { xs: 7, sm: 12 },
//             overflow: "hidden",
//             backgroundColor: "#f8f8f8",
//             boxShadow: "0 4px 16px rgba(0,0,0,0.45)",
//             zIndex: 1,
//           }}
//         >
//           <GoogleMap
//             mapContainerStyle={{ width: "100%", height: "100%" }}
//             center={userPos || DEFAULT_CENTER}
//             zoom={userPos ? 13 : 4}
//             onLoad={handleMapLoad}
//             options={{ streetViewControl: false, mapTypeControl: false }}
//           >
//             {userPos && <Marker position={userPos} label="You" />}
//             {results.map((r) => {
//               const loc = r.geometry?.location;
//               return loc ? (
//                 <Marker
//                   key={r.place_id}
//                   position={{ lat: loc.lat(), lng: loc.lng() }}
//                   icon={{
//                     url: `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`,
//                   }}
//                   onClick={() => setSelected(r)}
//                 />
//               ) : null;
//             })}

//             {selected?.geometry?.location && (
//               <InfoWindow
//                 position={{
//                   lat: selected.geometry.location.lat(),
//                   lng: selected.geometry.location.lng(),
//                 }}
//                 onCloseClick={() => setSelected(null)}
//               >
//                 <Box sx={{ maxWidth: 220 }}>
//                   <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                     {selected.name}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                     sx={{ display: "block", mb: 1 }}
//                   >
//                     {selected.vicinity || selected.formatted_address}
//                   </Typography>
//                   <Button
//                     size="small"
//                     variant="contained"
//                     onClick={() => {
//                       const lat = selected.geometry!.location!.lat();
//                       const lng = selected.geometry!.location!.lng();
//                       window.open(
//                         `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
//                         "_blank"
//                       );
//                     }}
//                   >
//                     Directions
//                   </Button>
//                 </Box>
//               </InfoWindow>
//             )}
//           </GoogleMap>
//         </Box>

//         <Box
//           component="img"
//           src={phoneFrame}
//           alt="Phone Frame"
//           sx={{
//             position: "relative",
//             width: "100%",
//             height: "100%",
//             objectFit: "contain",
//             zIndex: 2,
//           }}
//         />
//       </Box>
//     </Box>
//   </Box>
// );

// }
