export interface PlanetData {
  name: string;
  size: number;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: number;
  tokenReward: number;
  facts: {
    distance: string;
    diameter: string;
    moons: string;
    dayLength: string;
    yearLength: string;
    temperature: string;
    composition: string;
    funFact: string;
  };
}

export const planetsData: PlanetData[] = [
  {
    name: "Mercury",
    size: 0.4,
    color: "#8C7853",
    orbitRadius: 8,
    orbitSpeed: 0.04,
    rotationSpeed: 0.001,
    tokenReward: 10,
    facts: {
      distance: "57.9 million km from Sun",
      diameter: "4,879 km",
      moons: "0",
      dayLength: "59 Earth days",
      yearLength: "88 Earth days",
      temperature: "-173°C to 427°C",
      composition: "Rocky, iron core",
      funFact: "Mercury is the fastest planet, zipping around the Sun at 47 km/s!"
    }
  },
  {
    name: "Venus",
    size: 0.9,
    color: "#FFC649",
    orbitRadius: 12,
    orbitSpeed: 0.015,
    rotationSpeed: -0.0005,
    tokenReward: 15,
    facts: {
      distance: "108.2 million km from Sun",
      diameter: "12,104 km",
      moons: "0",
      dayLength: "243 Earth days",
      yearLength: "225 Earth days",
      temperature: "462°C",
      composition: "Rocky, thick CO2 atmosphere",
      funFact: "Venus rotates backwards and its day is longer than its year!"
    }
  },
  {
    name: "Earth",
    size: 1,
    color: "#4A90E2",
    orbitRadius: 16,
    orbitSpeed: 0.01,
    rotationSpeed: 0.002,
    tokenReward: 20,
    facts: {
      distance: "149.6 million km from Sun",
      diameter: "12,742 km",
      moons: "1 (The Moon)",
      dayLength: "24 hours",
      yearLength: "365.25 days",
      temperature: "-88°C to 58°C",
      composition: "Rocky, nitrogen-oxygen atmosphere",
      funFact: "The only planet known to support life, with 71% water coverage!"
    }
  },
  {
    name: "Mars",
    size: 0.5,
    color: "#E27B58",
    orbitRadius: 20,
    orbitSpeed: 0.008,
    rotationSpeed: 0.0018,
    tokenReward: 25,
    facts: {
      distance: "227.9 million km from Sun",
      diameter: "6,779 km",
      moons: "2 (Phobos and Deimos)",
      dayLength: "24.6 hours",
      yearLength: "687 Earth days",
      temperature: "-87°C to -5°C",
      composition: "Rocky, thin CO2 atmosphere",
      funFact: "Mars has the largest volcano in the solar system: Olympus Mons!"
    }
  },
  {
    name: "Jupiter",
    size: 2.5,
    color: "#C88B3A",
    orbitRadius: 28,
    orbitSpeed: 0.002,
    rotationSpeed: 0.004,
    tokenReward: 40,
    facts: {
      distance: "778.5 million km from Sun",
      diameter: "139,820 km",
      moons: "95 known moons",
      dayLength: "10 hours",
      yearLength: "12 Earth years",
      temperature: "-108°C",
      composition: "Gas giant, hydrogen and helium",
      funFact: "Jupiter's Great Red Spot is a storm that's been raging for over 300 years!"
    }
  },
  {
    name: "Saturn",
    size: 2.2,
    color: "#FAD5A5",
    orbitRadius: 36,
    orbitSpeed: 0.0009,
    rotationSpeed: 0.0038,
    tokenReward: 50,
    facts: {
      distance: "1.43 billion km from Sun",
      diameter: "116,460 km",
      moons: "146 known moons",
      dayLength: "10.7 hours",
      yearLength: "29 Earth years",
      temperature: "-139°C",
      composition: "Gas giant with iconic rings",
      funFact: "Saturn's rings are made of billions of ice and rock particles!"
    }
  },
  {
    name: "Uranus",
    size: 1.8,
    color: "#4FD0E7",
    orbitRadius: 44,
    orbitSpeed: 0.0004,
    rotationSpeed: 0.003,
    tokenReward: 60,
    facts: {
      distance: "2.87 billion km from Sun",
      diameter: "50,724 km",
      moons: "27 known moons",
      dayLength: "17 hours",
      yearLength: "84 Earth years",
      temperature: "-197°C",
      composition: "Ice giant, methane atmosphere",
      funFact: "Uranus rotates on its side, likely from a massive ancient collision!"
    }
  },
  {
    name: "Neptune",
    size: 1.7,
    color: "#4169E1",
    orbitRadius: 52,
    orbitSpeed: 0.0001,
    rotationSpeed: 0.0032,
    tokenReward: 75,
    facts: {
      distance: "4.5 billion km from Sun",
      diameter: "49,244 km",
      moons: "14 known moons",
      dayLength: "16 hours",
      yearLength: "165 Earth years",
      temperature: "-201°C",
      composition: "Ice giant, methane atmosphere",
      funFact: "Neptune has the strongest winds in the solar system at 2,100 km/h!"
    }
  }
];
