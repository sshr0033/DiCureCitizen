import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import phoneFrame from "../assets/iPhone Air - Light Gold - Portrait.png";
import * as styles from "../styles/nearestHelpStyles"; 

const DEFAULT_CENTER = { lat: -33.8688, lng: 151.2093 };
const libraries: ("places")[] = ["places"];

/* 
@author Team marshmellow
@version 0.0.1
Footer class to provide a general Footer to the entire website. 
*/

export default function NearesrHelpCenterSection() {
  const [category, setCategory] = useState<"police" | "bank" | "cyber">("police");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
  const [selected, setSelected] = useState<google.maps.places.PlaceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const serviceRef = useRef<google.maps.places.PlacesService | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    serviceRef.current = new window.google.maps.places.PlacesService(map);
  };

  const findNearby = (pos: { lat: number; lng: number }, type: string) => {
    if (!serviceRef.current) return;
    setLoading(true);
    setResults([]);

    const request: google.maps.places.PlaceSearchRequest = {
      location: pos,
      radius: 30000,
    };

    if (type === "police") request.type = "police";
    else if (type === "bank") request.type = "bank";
    else {
      request.keyword = "cyber security|cybercrime|cyber help";
      request.type = "point_of_interest";
    }

    serviceRef.current.nearbySearch(request, (res, status) => {
      setLoading(false);
      if (status === window.google.maps.places.PlacesServiceStatus.OK && res) {
        setResults(res.slice(0, 5));
      } else setResults([]);
    });
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported!");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const position = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(position);
        mapRef.current?.panTo(position);
        mapRef.current?.setZoom(13);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        alert("Location error: " + err.message);
      }
    );
  };

  useEffect(() => {
    if (userPos && serviceRef.current) findNearby(userPos, category);
  }, [userPos, category]);

  if (loadError) return <Typography color="error">Error loading map</Typography>;
  if (!isLoaded) return <CircularProgress />;

  const markerColor =
    category === "police" ? "red" : category === "bank" ? "green" : "purple";

  return (
    <Box sx={styles.pageContainer}>
      {/* 🟩 Title Section */}
      <Box sx={styles.titleBlock}>
        <Typography variant="h3" sx={styles.titleText}>
          Help Centres Near You
        </Typography>
        <Typography variant="h6" sx={styles.subtitleText}>
          Find nearby police, banks, or cyber help centres that can assist you in
          reporting scams or fraudulent activities safely.
        </Typography>
      </Box>

      {/* 🟦 Main Layout */}
      <Box sx={styles.mainLayout}>
        {/* Left Glass Panel */}
        <Paper elevation={0} sx={styles.leftPanel}>
          <Typography variant="h5" sx={styles.infoText}>
            Please provide your location access to help us find you the nearest help center.
          </Typography>

          <Button onClick={handleLocate} disabled={loading} sx={styles.locateButton}>
            {loading ? <CircularProgress size={22} /> : "Use My Location"}
          </Button>

          <ToggleButtonGroup
            value={category}
            exclusive
            onChange={(e, val) => val && setCategory(val)}
            sx={styles.toggleGroup}
          >
            <ToggleButton value="police" sx={styles.toggleButton}>
              Police
            </ToggleButton>
            <ToggleButton value="bank" sx={styles.toggleButton}>
              Bank
            </ToggleButton>
            <ToggleButton value="cyber" sx={styles.toggleButton}>
              Cyber Help
            </ToggleButton>
          </ToggleButtonGroup>

          <Paper sx={styles.resultsBox}>
            <Typography variant="subtitle1" sx={styles.resultTitle}>
              Nearest 5{" "}
              {category === "police"
                ? "Police Stations"
                : category === "bank"
                ? "Banks"
                : "Cyber Centres"}
            </Typography>

            {loading && (
              <Typography>
                Searching {category}s... <CircularProgress size={14} />
              </Typography>
            )}
            {!loading && results.length === 0 && (
              <Typography color="text.secondary">No results found nearby.</Typography>
            )}

            <List>
              {results.map((r, i) => (
                <ListItem
                  key={r.place_id || i}
                  onClick={() => {
                    setSelected(r);
                    const loc = r.geometry?.location;
                    if (loc) {
                      mapRef.current?.panTo(loc);
                      mapRef.current?.setZoom(15);
                    }
                  }}
                  sx={styles.listItem}
                >
                  <ListItemText
                    
                    primary={r.name}
                    secondary={r.vicinity || r.formatted_address}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Paper>

        {/* Right Map Mockup */}
        <Box sx={styles.phoneContainer}>
          <Box sx={styles.mapFrame}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={userPos || DEFAULT_CENTER}
              zoom={userPos ? 13 : 4}
              onLoad={handleMapLoad}
              options={{ streetViewControl: false, mapTypeControl: false }}
            >
              {userPos && <Marker position={userPos} label="You" />}
              {results.map((r) => {
                const loc = r.geometry?.location;
                return loc ? (
                  <Marker
                    key={r.place_id}
                    position={{ lat: loc.lat(), lng: loc.lng() }}
                    icon={{
                      url: `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`,
                    }}
                    onClick={() => setSelected(r)}
                  />
                ) : null;
              })}

              {selected?.geometry?.location && (
                <InfoWindow
                  position={{
                    lat: selected.geometry.location.lat(),
                    lng: selected.geometry.location.lng(),
                  }}
                  onCloseClick={() => setSelected(null)}
                >
                  <Box sx={{ maxWidth: 220 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {selected.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 1 }}
                    >
                      {selected.vicinity || selected.formatted_address}
                    </Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        const lat = selected.geometry!.location!.lat();
                        const lng = selected.geometry!.location!.lng();
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
                          "_blank"
                        );
                      }}
                    >
                      Directions
                    </Button>
                  </Box>
                </InfoWindow>
              )}
            </GoogleMap>
          </Box>

          <Box
            component="img"
            src={phoneFrame}
            alt="Phone Frame"
            sx={styles.phoneFrame}
          />
        </Box>
      </Box>
    </Box>
  );
}
