import React, { useRef, useState, useEffect } from "react";
import * as S from "./styles";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// Data for points of interest with expanded information
const MARKERS = [
  {
    name: "Tokyo",
    lat: 35.6895,
    lon: 139.6917,
    color: "#FF4D4D",
    description: "Floating city platforms due to rising sea levels",
    details: {
      population: "14.6M → 18.2M",
      innovations: "Floating architecture, Vertical farms",
      climate: "More frequent typhoons, Higher temperatures",
    },
  },
  {
    name: "New York",
    lat: 40.7128,
    lon: -74.006,
    color: "#4D9BFF",
    description: "Vertical farming skyscrapers",
    details: {
      population: "8.8M → 10.7M",
      innovations: "Vertical farming, Climate-adaptive buildings",
      climate: "Sea level rise, More heatwaves",
    },
  },
  {
    name: "London",
    lat: 51.5074,
    lon: -0.1278,
    color: "#FFD700",
    description: "Historic preservation amid climate adaptation",
    details: {
      population: "9.0M → 11.4M",
      innovations: "Thames Barrier 2.0, Green corridors",
      climate: "Wetter winters, Hotter summers",
    },
  },
  {
    name: "Cairo",
    lat: 30.0444,
    lon: 31.2357,
    color: "#FFA07A",
    description: "Solar power capital of Africa",
    details: {
      population: "21.3M → 34.5M",
      innovations: "Desert solar farms, Water reclamation",
      climate: "Extreme heat, Water scarcity",
    },
  },
  {
    name: "Rio de Janeiro",
    lat: -22.9068,
    lon: -43.1729,
    color: "#00FF7F",
    description: "Reforested urban centers",
    details: {
      population: "13.5M → 15.2M",
      innovations: "Urban reforestation, Hillside stability",
      climate: "Stronger storms, Higher humidity",
    },
  },
  {
    name: "Mumbai",
    lat: 19.076,
    lon: 72.8777,
    color: "#FF69B4",
    description: "Sea wall cities defending against monsoons",
    details: {
      population: "20.7M → 29.3M",
      innovations: "Sea walls, Elevated neighborhoods",
      climate: "Stronger monsoons, Higher sea levels",
    },
  },
  {
    name: "Sydney",
    lat: -33.8688,
    lon: 151.2093,
    color: "#7B68EE",
    description: "Architectural innovation in fire resistance",
    details: {
      population: "5.3M → 8.1M",
      innovations: "Fire-resistant architecture, Water conservation",
      climate: "Longer fire seasons, Severe droughts",
    },
  },
  {
    name: "Lagos",
    lat: 6.5244,
    lon: 3.3792,
    color: "#32CD32",
    description: "Africa's tech hub and climate innovation center",
    details: {
      population: "15.4M → 30.6M",
      innovations: "Floating neighborhoods, Clean energy grid",
      climate: "Coastal flooding, Higher rainfall",
    },
  },
  {
    name: "Singapore",
    lat: 1.3521,
    lon: 103.8198,
    color: "#FF8C00",
    description: "Self-sufficient island of vertical forests",
    details: {
      population: "5.7M → 6.9M",
      innovations: "Vertical forests, Water self-sufficiency",
      climate: "Higher temperatures, Water stress",
    },
  },
];

// Climate events that occur randomly on the globe
const CLIMATE_EVENTS = [
  { name: "Hurricane", color: "#5D6D7E", duration: 3, scale: 0.5 },
  { name: "Drought", color: "#E67E22", duration: 5, scale: 0.7 },
  { name: "Floods", color: "#3498DB", duration: 2, scale: 0.5 },
  { name: "Wildfire", color: "#E74C3C", duration: 4, scale: 0.6 },
];

export default function Component() {
  const [activeMarker, setActiveMarker] = useState(null);
  const [year, setYear] = useState(2023);
  const [viewMode, setViewMode] = useState("normal"); // normal, temperature, pollution
  const [showEvents, setShowEvents] = useState(true);

  return (
    <S.Container>
      <S.InfoPanel visible={activeMarker !== null}>
        {activeMarker && (
          <>
            <S.InfoTitle>{activeMarker.name}</S.InfoTitle>
            <S.InfoDescription>{activeMarker.description}</S.InfoDescription>
            <S.InfoDetailGrid>
              <S.InfoDetailItem>
                <S.InfoLabel>Population (2023→2050):</S.InfoLabel>
                <S.InfoValue>{activeMarker.details.population}</S.InfoValue>
              </S.InfoDetailItem>
              <S.InfoDetailItem>
                <S.InfoLabel>Innovations:</S.InfoLabel>
                <S.InfoValue>{activeMarker.details.innovations}</S.InfoValue>
              </S.InfoDetailItem>
              <S.InfoDetailItem>
                <S.InfoLabel>Climate Changes:</S.InfoLabel>
                <S.InfoValue>{activeMarker.details.climate}</S.InfoValue>
              </S.InfoDetailItem>
            </S.InfoDetailGrid>
          </>
        )}
      </S.InfoPanel>

      <S.TimeControls>
        <S.YearDisplay>{year}</S.YearDisplay>
        <S.Slider type="range" min="2023" max="2050" value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
      </S.TimeControls>

      <S.ModeControls>
        <S.ModeButton active={viewMode === "normal"} onClick={() => setViewMode("normal")}>
          Standard View
        </S.ModeButton>
        <S.ModeButton active={viewMode === "temperature"} onClick={() => setViewMode("temperature")}>
          Temperature
        </S.ModeButton>
        <S.ModeButton active={viewMode === "pollution"} onClick={() => setViewMode("pollution")}>
          Pollution
        </S.ModeButton>
        <S.ToggleButton active={showEvents} onClick={() => setShowEvents(!showEvents)}>
          {showEvents ? "Hide Events" : "Show Events"}
        </S.ToggleButton>
      </S.ModeControls>

      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={["#000814"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <EarthGlobe year={year} setActiveMarker={setActiveMarker} viewMode={viewMode} showEvents={showEvents} />
        <OrbitControls enablePan={false} minDistance={3} maxDistance={10} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </S.Container>
  );
}

function EarthGlobe({ year, setActiveMarker, viewMode, showEvents }) {
  const earthRef = useRef();
  const markersRef = useRef([]);
  const cloudsRef = useRef();
  const atmosphereRef = useRef();
  const [climateEvents, setClimateEvents] = useState([]);

  // Setup climate events
  useEffect(() => {
    if (showEvents) {
      const interval = setInterval(() => {
        // Add a new climate event if there aren't too many
        if (climateEvents.length < 5) {
          const event = CLIMATE_EVENTS[Math.floor(Math.random() * CLIMATE_EVENTS.length)];
          const lat = Math.random() * 180 - 90;
          const lon = Math.random() * 360 - 180;

          setClimateEvents((prev) => [
            ...prev,
            {
              ...event,
              id: Date.now(),
              lat,
              lon,
              createdAt: Date.now(),
              opacity: 0,
            },
          ]);
        }

        // Remove expired events
        setClimateEvents((prev) => prev.filter((event) => (Date.now() - event.createdAt) / 1000 < event.duration));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [climateEvents.length, showEvents]);

  // Earth rotation
  useFrame((state) => {
    if (earthRef.current) {
      // Slow gentle rotation
      earthRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }

    if (cloudsRef.current) {
      // Clouds rotate slightly faster
      cloudsRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    }

    // Update climate event opacities
    climateEvents.forEach((event) => {
      const eventAge = (Date.now() - event.createdAt) / 1000;

      // Fade in for first 0.5 seconds
      if (eventAge < 0.5) {
        event.opacity = eventAge / 0.5;
      }
      // Fade out for last 0.5 seconds
      else if (eventAge > event.duration - 0.5) {
        event.opacity = (event.duration - eventAge) / 0.5;
      }
      // Full opacity otherwise
      else {
        event.opacity = 1;
      }
    });
  });

  // Convert latitude and longitude to XYZ coordinates
  const latLongToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  };

  // Convert year to climate impact factor (for visualization effects)
  const yearToImpactFactor = (currentYear) => {
    // Linear impact from 2023 to 2050
    return (currentYear - 2023) / (2050 - 2023);
  };

  // Determine globe color based on view mode
  const getGlobeColor = () => {
    const impact = yearToImpactFactor(year);

    switch (viewMode) {
      case "temperature":
        // Increasingly red with temperature rise
        return new THREE.Color("#2244AA").lerp(new THREE.Color("#AA4422"), impact);
      case "pollution":
        // Increasingly dark/brown with pollution
        return new THREE.Color("#2244AA").lerp(new THREE.Color("#665544"), impact);
      default:
        // Default blue-green shift
        return new THREE.Color("#2244AA").lerp(new THREE.Color("#226622"), impact);
    }
  };

  return (
    <group>
      {/* Earth Sphere with gradient shader based on view mode */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color={getGlobeColor()} roughness={0.7} metalness={0.2} />

        {/* Elevation bumps for continent visualization */}
        <group>
          {/* North America */}
          <mesh position={[-0.6, 0.8, 1.55]}>
            <boxGeometry args={[0.8, 0.5, 0.03]} />
            <meshStandardMaterial color={getGlobeColor()} roughness={0.8} />
          </mesh>

          {/* South America */}
          <mesh position={[-0.2, -0.5, 1.8]}>
            <boxGeometry args={[0.5, 0.7, 0.03]} />
            <meshStandardMaterial color={getGlobeColor()} roughness={0.8} />
          </mesh>

          {/* Europe */}
          <mesh position={[0.2, 1.2, 1.6]}>
            <boxGeometry args={[0.5, 0.3, 0.03]} />
            <meshStandardMaterial color={getGlobeColor()} roughness={0.8} />
          </mesh>

          {/* Africa */}
          <mesh position={[0.5, 0.2, 1.8]}>
            <boxGeometry args={[0.6, 0.7, 0.03]} />
            <meshStandardMaterial color={getGlobeColor()} roughness={0.8} />
          </mesh>

          {/* Asia */}
          <mesh position={[1.2, 0.7, 1.4]}>
            <boxGeometry args={[0.9, 0.6, 0.03]} />
            <meshStandardMaterial color={getGlobeColor()} roughness={0.8} />
          </mesh>

          {/* Australia */}
          <mesh position={[1.5, -0.9, 1.2]}>
            <boxGeometry args={[0.4, 0.3, 0.03]} />
            <meshStandardMaterial color={getGlobeColor()} roughness={0.8} />
          </mesh>
        </group>

        {/* Place markers */}
        {MARKERS.map((marker, i) => {
          const position = latLongToVector3(marker.lat, marker.lon, 2.05);
          const scale = 0.8 + yearToImpactFactor(year) * 0.5;

          return (
            <group key={i} position={position} scale={scale}>
              <mesh
                ref={(el) => (markersRef.current[i] = el)}
                onClick={() => setActiveMarker(marker)}
                onPointerOver={() => (document.body.style.cursor = "pointer")}
                onPointerOut={() => (document.body.style.cursor = "auto")}
              >
                {/* Marker sphere */}
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color={marker.color} emissive={marker.color} emissiveIntensity={0.5} />
              </mesh>

              {/* Pulsing ring around marker */}
              <mesh>
                <ringGeometry args={[0.06, 0.08, 16]} />
                <meshBasicMaterial color={marker.color} transparent opacity={0.7 + Math.sin(Date.now() / 300) * 0.3} side={THREE.DoubleSide} />
              </mesh>

              {/* City name label */}
              <mesh position={[0, 0.1, 0]}>
                <Text color="white" fontSize={0.1} maxWidth={0.5} anchorX="center" anchorY="middle">
                  {marker.name}
                </Text>
              </mesh>
            </group>
          );
        })}

        {/* Climate events visualization */}
        {showEvents &&
          climateEvents.map((event) => {
            const position = latLongToVector3(event.lat, event.lon, 2.1);
            return (
              <group key={event.id} position={position}>
                {/* Event indicator */}
                <mesh>
                  <sphereGeometry args={[0.1 * event.scale, 16, 16]} />
                  <meshBasicMaterial color={event.color} transparent opacity={event.opacity * 0.7} />
                </mesh>

                {/* Event name */}
                <mesh position={[0, 0.15, 0]}>
                  <Text color="white" fontSize={0.08} anchorX="center" anchorY="middle" transparent opacity={event.opacity}>
                    {event.name}
                  </Text>
                </mesh>
              </group>
            );
          })}
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsRef} scale={[2.05, 2.05, 2.05]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial transparent opacity={0.4 - yearToImpactFactor(year) * 0.2} color="#ffffff" side={THREE.DoubleSide} />
      </mesh>

      {/* Atmosphere Glow */}
      <mesh ref={atmosphereRef} scale={[2.2, 2.2, 2.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          transparent
          opacity={0.15}
          color={new THREE.Color("#77AAFF").lerp(
            viewMode === "temperature" ? new THREE.Color("#FFAA77") : viewMode === "pollution" ? new THREE.Color("#AAAAAA") : new THREE.Color("#AAFFAA"),
            yearToImpactFactor(year)
          )}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
