import React, { useState, useEffect } from "react";
import * as S from "./styles";

const images = ["/assets/cd3/w1/images/1.png", "/assets/cd3/w1/images/2.png", "/assets/cd3/w1/images/3.png", "/assets/cd3/w1/images/4.png"];

const blendModes = [
  "overlay",
  "multiply",
  "screen",
  "soft-light",
  "hard-light",
  "color-dodge",
  "color-burn",
  "darken",
  "lighten",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

export default function ImageDisplay() {
  const [layers, setLayers] = useState([]);

  const generateLayers = () => {
    const layerCount = Math.floor(Math.random() * 5) + 5; // 3 to 7 layers
    return [...Array(layerCount)].map((_, index) => ({
      id: Date.now() + index,
      imageIndex: Math.floor(Math.random() * images.length),
      blendMode: blendModes[Math.floor(Math.random() * blendModes.length)],
      opacity: Math.random() * 0.5 + 0.5, // 0.5 to 1
      scale: Math.random() * 0.5 + 1, // 0.75 to 1.25
      position: {
        x: 0,
        y: 0,
      },
    }));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLayers(generateLayers());
    }, 40); // Change composition every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <S.Container>
      {layers.map((layer) => (
        <S.ImageLayer key={layer.id} $blendMode={layer.blendMode} $opacity={layer.opacity} $scale={layer.scale} $positionX={layer.position.x} $positionY={layer.position.y}>
          <S.StyledImage src={images[layer.imageIndex]} alt={`Image Layer ${layer.id}`} />
        </S.ImageLayer>
      ))}
    </S.Container>
  );
}
