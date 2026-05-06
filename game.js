(() => {
  const WIDTH = 1280;
  const HEIGHT = 720;
  const LEVEL_SECONDS = 2 * 60;
  const SAME_CHARACTER_COOLDOWN = 34 * 60 * 1000;
  const POWER_RECHARGE = 30 * 1000;
  const MAYOR_BOSS_RECHARGE = 20 * 1000;
  const WALK_SPEED = 135;
  const RUN_SPEED = 235;
  const STORAGE_KEY = "bigBadBossBattleProgressV1";
  const KING_DOCK_MAX_HEALTH = 10;
  const KING_DOCK_PRIZES = [
    { id: "ironSword", label: "IRON SWORD!", bubble: "Iron sword!", color: "#d9edf2" },
    { id: "armor", label: "ARMOR!", bubble: "Armor!", color: "#ffd84a" },
    { id: "heart", label: "HEART +1!", bubble: "Heart prize!", color: "#ff5fa8" },
    { id: "speed", label: "SPEED!", bubble: "Speed prize!", color: "#70f0ff" },
    { id: "powerRefill", label: "POWER UP!", bubble: "Power prize!", color: "#a98bff" }
  ];

  const BOSS_LEVEL_TUNING = {
    1: {
      aiDelayMin: 3200,
      aiDelayRandom: 1900,
      initialPowerDelay: 12000,
      approachDistance: 235,
      basicChance: 0.08,
      botSummonChance: 0.025,
      botAttackChance: 0.035,
      laserChance: 0.02,
      flyChance: 0.018,
      mouthSummonChance: 0.03,
      mouthBiteChance: 0.045,
      mouthKickChance: 0.035,
      powerDelayMin: 13500,
      powerDelayRandom: 6500,
      bossSpeed: 0.72,
      helperSpeed: 0.62,
      maxDamage: 0.5,
      hiddenConfusion: 0.92
    },
    2: {
      aiDelayMin: 1050,
      aiDelayRandom: 650,
      initialPowerDelay: 5200,
      approachDistance: 170,
      basicChance: 0.34,
      botSummonChance: 0.18,
      botAttackChance: 0.3,
      laserChance: 0.14,
      flyChance: 0.09,
      mouthSummonChance: 0.18,
      mouthBiteChance: 0.3,
      mouthKickChance: 0.18,
      powerDelayMin: 5400,
      powerDelayRandom: 2400,
      bossSpeed: 1.1,
      helperSpeed: 1.18,
      maxDamage: 1,
      hiddenConfusion: 0.55
    },
    3: {
      aiDelayMin: 420,
      aiDelayRandom: 300,
      initialPowerDelay: 1800,
      approachDistance: 115,
      basicChance: 0.65,
      botSummonChance: 0.4,
      botAttackChance: 0.6,
      laserChance: 0.32,
      flyChance: 0.18,
      mouthSummonChance: 0.4,
      mouthBiteChance: 0.62,
      mouthKickChance: 0.4,
      powerDelayMin: 1800,
      powerDelayRandom: 1000,
      bossSpeed: 1.35,
      helperSpeed: 1.65,
      maxDamage: 1,
      hiddenConfusion: 0.22
    }
  };

  const DESERT_BOSS_TUNING = {
    7: {
      aiDelayMin: 340,
      aiDelayRandom: 240,
      initialPowerDelay: 1500,
      approachDistance: 105,
      basicChance: 0.68,
      botSummonChance: 0.48,
      botAttackChance: 0.68,
      laserChance: 0.38,
      flyChance: 0.22,
      mouthSummonChance: 0.48,
      mouthBiteChance: 0.68,
      mouthKickChance: 0.48,
      powerDelayMin: 1500,
      powerDelayRandom: 850,
      bossSpeed: 1.45,
      helperSpeed: 1.78,
      maxDamage: 1,
      hiddenConfusion: 0.18
    },
    8: {
      aiDelayMin: 260,
      aiDelayRandom: 200,
      initialPowerDelay: 1200,
      approachDistance: 95,
      basicChance: 0.74,
      botSummonChance: 0.56,
      botAttackChance: 0.76,
      laserChance: 0.45,
      flyChance: 0.26,
      mouthSummonChance: 0.56,
      mouthBiteChance: 0.76,
      mouthKickChance: 0.56,
      powerDelayMin: 1200,
      powerDelayRandom: 700,
      bossSpeed: 1.62,
      helperSpeed: 1.95,
      maxDamage: 1,
      hiddenConfusion: 0.14
    },
    9: {
      aiDelayMin: 190,
      aiDelayRandom: 160,
      initialPowerDelay: 950,
      approachDistance: 84,
      basicChance: 0.82,
      botSummonChance: 0.64,
      botAttackChance: 0.84,
      laserChance: 0.52,
      flyChance: 0.32,
      mouthSummonChance: 0.64,
      mouthBiteChance: 0.84,
      mouthKickChance: 0.64,
      powerDelayMin: 900,
      powerDelayRandom: 560,
      bossSpeed: 1.82,
      helperSpeed: 2.18,
      maxDamage: 1,
      hiddenConfusion: 0.1
    },
    10: {
      aiDelayMin: 220,
      aiDelayRandom: 140,
      initialPowerDelay: 900,
      approachDistance: 115,
      basicChance: 0.78,
      botSummonChance: 0.64,
      botAttackChance: 0.84,
      laserChance: 0.52,
      flyChance: 0.32,
      mouthSummonChance: 0.64,
      mouthBiteChance: 0.84,
      mouthKickChance: 0.64,
      powerDelayMin: 1150,
      powerDelayRandom: 560,
      bossSpeed: 1.58,
      helperSpeed: 2.1,
      maxDamage: 1,
      hiddenConfusion: 0.08
    }
  };

  const WATER_BOSS_TUNING = {
    11: BOSS_LEVEL_TUNING[1],
    12: BOSS_LEVEL_TUNING[1],
    13: BOSS_LEVEL_TUNING[2],
    14: BOSS_LEVEL_TUNING[3]
  };

  const FREDDY_ANIMALS = {
    mammal: [
      animal("Gorilla", "gorilla", { strong: true }),
      animal("Lion", "claws", { strong: true }),
      animal("Bear", "claws", { strong: true }),
      animal("Cheetah", "fast", { speed: 2.2 }),
      animal("Wolf", "fast", { speed: 1.6 }),
      animal("Tiger", "claws", { strong: true }),
      animal("Elephant", "heavy", { strong: true }),
      animal("Woolly Mammoth", "heavy", { strong: true }),
      animal("Rhino", "charge", { strong: true }),
      animal("Kangaroo", "jump", { jump: true }),
      animal("Bat", "fly", { fly: true }),
      animal("Monkey", "jump", { jump: true }),
      animal("Dolphin", "swim", { swim: true })
    ],
    reptile: [
      animal("Snake", "slither", { low: true }),
      animal("Cobra", "slither", { low: true }),
      animal("Python", "squeeze", { low: true }),
      animal("Crocodile", "bite", { swim: true, strong: true }),
      animal("Alligator", "bite", { swim: true, strong: true }),
      animal("Turtle", "shell", { shield: true, swim: true }),
      animal("Tortoise", "shell", { shield: true }),
      animal("Chameleon", "blend", { hide: true }),
      animal("Gecko", "climb", { jump: true }),
      animal("Iguana", "tail", {}),
      animal("Komodo Dragon", "bite", { strong: true }),
      animal("T. Rex", "bite", { strong: true }),
      animal("Lizard", "dash", { speed: 1.35 })
    ],
    bird: [
      animal("Eagle", "fly", { fly: true }),
      animal("Hawk", "fly", { fly: true }),
      animal("Falcon", "fast-fly", { fly: true, speed: 1.8 }),
      animal("Owl", "fly", { fly: true }),
      animal("Parrot", "fly", { fly: true }),
      animal("Crow", "fly", { fly: true }),
      animal("Penguin", "swim", { swim: true }),
      animal("Ostrich", "run", { speed: 1.7 }),
      animal("Hummingbird", "fast-fly", { fly: true, speed: 2 }),
      animal("Pelican", "fly", { fly: true, swim: true }),
      animal("Flamingo", "fly", { fly: true, swim: true }),
      animal("Woodpecker", "peck", { fly: true })
    ],
    amphibian: [
      animal("Frog", "jump", { swim: true, jump: true }),
      animal("Toad", "jump", { swim: true, jump: true }),
      animal("Tree Frog", "jump", { swim: true, jump: true }),
      animal("Bullfrog", "jump", { swim: true, jump: true }),
      animal("Salamander", "swim", { swim: true }),
      animal("Newt", "swim", { swim: true }),
      animal("Axolotl", "swim", { swim: true }),
      animal("Fire Salamander", "dash", { swim: true }),
      animal("Poison Dart Frog", "jump", { swim: true, jump: true }),
      animal("Glass Frog", "jump", { swim: true, jump: true }),
      animal("Mudpuppy", "swim", { swim: true }),
      animal("Caecilian", "slither", { swim: true, low: true })
    ],
    fish: [
      animal("Archerfish", "water-shot", { swim: true, waterShot: true }),
      animal("Shark", "bite", { swim: true, strong: true }),
      animal("Swordfish", "stab", { swim: true }),
      animal("Pufferfish", "puff", { swim: true, shield: true }),
      animal("Electric Eel", "zap", { swim: true }),
      animal("Clownfish", "swim", { swim: true }),
      animal("Goldfish", "swim", { swim: true }),
      animal("Anglerfish", "bite", { swim: true }),
      animal("Stingray", "glide", { swim: true }),
      animal("Flying Fish", "glide", { swim: true, fly: true }),
      animal("Seahorse", "swim", { swim: true }),
      animal("Tuna", "fast-swim", { swim: true, speed: 1.7 })
    ],
    insect: [
      animal("Ant", "small", { small: true }),
      animal("Bee", "fly", { fly: true, small: true }),
      animal("Wasp", "fly", { fly: true, small: true }),
      animal("Butterfly", "fly", { fly: true, small: true }),
      animal("Mantis", "claws", { small: true }),
      animal("Beetle", "shell", { shield: true, small: true }),
      animal("Grasshopper", "jump", { jump: true, small: true }),
      animal("Dragonfly", "fast-fly", { fly: true, speed: 1.8, small: true }),
      animal("Firefly", "fly", { fly: true, small: true }),
      animal("Mosquito", "fly", { fly: true, small: true }),
      animal("Cricket", "jump", { jump: true, small: true }),
      animal("Ladybug", "fly", { fly: true, small: true })
    ]
  };

  const FREDDY_CATEGORY_NAMES = {
    mammal: "Mammal",
    reptile: "Reptile",
    bird: "Bird",
    amphibian: "Amphibian",
    fish: "Fish",
    insect: "Insect"
  };
  Object.entries(FREDDY_ANIMALS).forEach(([category, animals]) => {
    animals.forEach((entry) => { entry.category = category; });
  });

  const BENJI_SHARKS = [
    shark("Great White Shark", { speed: 1.28, range: 138, power: "bite" }),
    shark("Hammerhead Shark", { speed: 1.18, range: 130, power: "stun" }),
    shark("Tiger Shark", { speed: 1.24, range: 134, power: "bite" }),
    shark("Mako Shark", { speed: 1.55, range: 122, power: "dash" }),
    shark("Whale Shark", { speed: 0.96, range: 150, power: "shield" })
  ];

  const FREDDY_ANIMAL_TRAITS = {
    Gorilla: { attackRange: 112, jumpDistance: 120, jumpVz: 560, knockdown: 650 },
    Lion: { attackRange: 116, claw: true, knockdown: 500 },
    Bear: { attackRange: 112, heavyHit: true, knockdown: 700 },
    Cheetah: { runSpeed: 1.45, dodgeDistance: 132 },
    Wolf: { runSpeed: 1.18, attackRange: 105 },
    Tiger: { attackRange: 116, claw: true, dodgeDistance: 92 },
    Elephant: { attackRange: 124, heavyHit: true, knockdown: 900 },
    "Woolly Mammoth": { attackRange: 126, heavyHit: true, knockdown: 1000 },
    Rhino: { attackRange: 118, chargeDistance: 118, knockdown: 900 },
    Kangaroo: { jumpDistance: 150, jumpVz: 620, kickBoost: true, knockdown: 700 },
    Bat: { dodgeDistance: 95, airBite: true },
    Monkey: { jumpDistance: 128, jumpVz: 560, dodgeDistance: 82 },
    Dolphin: { swimSpeed: 1.65, waterLine: true },
    Snake: { attackRange: 95, trap: 1500 },
    Cobra: { attackRange: 102, poison: true },
    Python: { attackRange: 98, trap: 2200 },
    Crocodile: { attackRange: 118, biteBoost: true, knockdown: 500 },
    Alligator: { attackRange: 116, biteBoost: true, knockdown: 500 },
    Turtle: { shellDuck: true, armor: true },
    Tortoise: { shellDuck: true, armor: true },
    Chameleon: { hideAnywhere: true, hideDuration: 7000 },
    Gecko: { jumpDistance: 122, jumpVz: 590, dodgeDistance: 95 },
    Iguana: { attackRange: 112, tailWhip: true, knockdown: 800 },
    "Komodo Dragon": { attackRange: 118, biteBoost: true, poison: true },
    "T. Rex": { attackRange: 132, heavyHit: true, knockdown: 1000 },
    Lizard: { runSpeed: 1.18, dodgeDistance: 122 },
    Eagle: { attackRange: 108, airDive: true },
    Hawk: { attackRange: 106, airDive: true },
    Falcon: { runSpeed: 1.18, attackRange: 106, airDive: true },
    Owl: { attackRange: 102, quietHit: true },
    Parrot: { dodgeDistance: 88 },
    Crow: { attackRange: 102, dodgeDistance: 82 },
    Penguin: { swimSpeed: 1.45, slideDodge: true },
    Ostrich: { runSpeed: 1.35, kickBoost: true },
    Hummingbird: { runSpeed: 1.28, dodgeDistance: 120 },
    Pelican: { swimSpeed: 1.35, attackRange: 116 },
    Flamingo: { swimSpeed: 1.25, kickBoost: true },
    Woodpecker: { attackRange: 120, peck: true },
    Frog: { jumpDistance: 145, jumpVz: 640 },
    Toad: { jumpDistance: 120, jumpVz: 580, armor: true },
    "Tree Frog": { jumpDistance: 156, jumpVz: 650, hideAnywhere: true, hideDuration: 4500 },
    Bullfrog: { jumpDistance: 132, jumpVz: 610, knockdown: 500 },
    Salamander: { swimSpeed: 1.35, dodgeDistance: 88 },
    Newt: { swimSpeed: 1.38, dodgeDistance: 78 },
    Axolotl: { swimSpeed: 1.42, armor: true },
    "Fire Salamander": { swimSpeed: 1.35, dodgeDistance: 112, hotTrail: true },
    "Poison Dart Frog": { jumpDistance: 138, jumpVz: 630, poison: true },
    "Glass Frog": { jumpDistance: 134, jumpVz: 610, hideAnywhere: true, hideDuration: 7000 },
    Mudpuppy: { swimSpeed: 1.48, lowDash: true },
    Caecilian: { swimSpeed: 1.25, trap: 1500 },
    Archerfish: { waterLine: true, attackRange: 430 },
    Shark: { swimSpeed: 1.35, attackRange: 124, biteBoost: true },
    Swordfish: { swimSpeed: 1.35, attackRange: 138, stab: true },
    Pufferfish: { shellDuck: true, puff: true },
    "Electric Eel": { shockLine: true, attackRange: 250, knockdown: 700 },
    Clownfish: { swimSpeed: 1.25, dodgeDistance: 80 },
    Goldfish: { swimSpeed: 1.22, dodgeDistance: 75 },
    Anglerfish: { lure: true, trap: 1300 },
    Stingray: { swimSpeed: 1.38, dodgeDistance: 105, shockLine: true },
    "Flying Fish": { swimSpeed: 1.35, jumpDistance: 142, jumpVz: 560 },
    Seahorse: { swimSpeed: 1.18, armor: true },
    Tuna: { swimSpeed: 1.75, runSpeed: 1.15 },
    Ant: { runSpeed: 1.18, armor: true },
    Bee: { attackRange: 92, sting: true, dodgeDistance: 90 },
    Wasp: { attackRange: 96, sting: true, dodgeDistance: 94 },
    Butterfly: { dodgeDistance: 112, hideAnywhere: true, hideDuration: 3500 },
    Mantis: { attackRange: 106, claw: true },
    Beetle: { shellDuck: true, armor: true },
    Grasshopper: { jumpDistance: 150, jumpVz: 650 },
    Dragonfly: { runSpeed: 1.22, dodgeDistance: 120 },
    Firefly: { flash: true, dodgeDistance: 88 },
    Mosquito: { attackRange: 82, sting: true, dodgeDistance: 110 },
    Cricket: { jumpDistance: 142, jumpVz: 620 },
    Ladybug: { shellDuck: true, dodgeDistance: 88 }
  };

  const CHARACTERS = {
    mayor: {
      id: "mayor",
      name: "Mischievous Mayor",
      role: "villain",
      theme: "theme-mayor",
      color: "#6b28c7",
      accent: "#f08318",
      powers: [
        { id: "flyBoots", name: "Flying Boots", icon: "boots" },
        { id: "mayorBots", name: "Mayor Bots", icon: "bot" },
        { id: "laserRay", name: "Laser Ray", icon: "laser" }
      ],
      how: "Flying Boots lift him for 1 minute. Mayor Bots show robot controls. Laser Ray shoots straight and takes 1 whole heart."
    },
    tats: {
      id: "tats",
      name: "Super Tats",
      role: "hero",
      theme: "theme-tats",
      color: "#1478cf",
      accent: "#78c9ff",
      powers: [
        { id: "giantPunch", name: "Giant Punch", icon: "fist" },
        { id: "smash", name: "Smash", icon: "smash" },
        { id: "gorillaJump", name: "Gorilla Jump", icon: "jump" }
      ],
      how: "Giant Punch hits in front for 1 whole heart. Smash hits a circle for half a heart unless the other fighter jumps. Gorilla Jump lands on people or knocks flyers down."
    },
    fary: {
      id: "fary",
      name: "Mom Fary",
      role: "hero",
      theme: "theme-fary",
      color: "#8542d8",
      accent: "#ff89c6",
      powers: [
        { id: "wingGust", name: "Wing Gust", icon: "wing" },
        { id: "fly", name: "Fly", icon: "fly" },
        { id: "takeoff", name: "Takeoff Jump", icon: "takeoff" }
      ],
      how: "Wing Gust knocks someone down for 5 seconds. Fly keeps her in the air until she lands. Takeoff Jump helps her turn and dodge upward."
    },
    apple: {
      id: "apple",
      name: "Super Appie Juice",
      role: "hero",
      theme: "theme-apple",
      color: "#f18319",
      accent: "#ffcf54",
      powers: [
        { id: "appleShot", name: "Apple Juice Shot", icon: "splash" },
        { id: "appleTornado", name: "Apple Juice Tornado", icon: "tornado" },
        { id: "appleLightning", name: "Apple Juice Lightning", icon: "bolt" },
        { id: "appleSpeed", name: "Apple Juice Speed", icon: "speed" }
      ],
      how: "Apple Juice Shot splashes for half a heart unless the target ducks. Tornado traps for 5 seconds. Lightning knocks down and takes half a heart. Speed doubles her speed."
    },
    yapping: {
      id: "yapping",
      name: "Yapping Yonatan",
      role: "villain",
      theme: "theme-yapping",
      color: "#f07918",
      accent: "#d61f2f",
      powers: [
        { id: "mouthMonsters", name: "Mouth Monsters", icon: "mouth" }
      ],
      how: "One mouth monster follows him. Mouth Monster controls can Bite, Kick, Jump, and Fly. Bite is hard to land but takes 1 whole heart."
    },
    freddy: {
      id: "freddy",
      name: "Freddy",
      role: "hero",
      theme: "theme-freddy",
      color: "#17633c",
      accent: "#f0cf62",
      maxHealth: 3,
      powers: [
        { id: "freddyMammal", name: "Mammal", icon: "mammal", noRecharge: true },
        { id: "freddyReptile", name: "Reptile", icon: "reptile", noRecharge: true },
        { id: "freddyBird", name: "Bird", icon: "bird", noRecharge: true },
        { id: "freddyAmphibian", name: "Amphibian", icon: "amphibian", noRecharge: true },
        { id: "freddyFish", name: "Fish", icon: "fish", noRecharge: true },
        { id: "freddyInsect", name: "Insect", icon: "insect", noRecharge: true },
        { id: "freddyMultiply", name: "Multiplication", icon: "duplicate", maxCharges: 1 }
      ],
      how: "Freddy looks like a regular 13-year-old kid, but he can turn into animals with no recharge. He has 3 hearts. Multiplication makes decoys and restores one heart, then it recharges. Pick Mammal, Reptile, Bird, Amphibian, Fish, or Insect, then choose an animal."
    },
    benji: {
      id: "benji",
      name: "Benji",
      role: "hero",
      theme: "theme-benji",
      color: "#6f737a",
      accent: "#45a6db",
      maxHealth: 3,
      powers: [
        { id: "benjiTornado", name: "Tornado", icon: "tornado" },
        { id: "benjiTeleport", name: "Teleport", icon: "teleport" },
        { id: "benjiSharks", name: "Sharks", icon: "shark", noRecharge: true }
      ],
      how: "Benji has brownish-blonde hair, blue eyes, black pants, and a gray shirt. He has 3 hearts. Tornado traps the other fighter. Teleport jumps him behind the enemy. Sharks opens Great White, Hammerhead, Tiger, Mako, and Whale Shark forms for the stream, then the shark power recharges."
    },
    frost: {
      id: "frost",
      name: "Mr. 67",
      role: "hero",
      theme: "theme-freddy",
      color: "#146e8f",
      accent: "#6cf0c2",
      maxHealth: 3,
      powers: [
        { id: "freezeBlock", name: "Freeze Block", icon: "freeze" },
        { id: "burrowStrike", name: "Burrow Strike", icon: "dig" },
        { id: "poisonStorm", name: "Poison Storm", icon: "poison", maxCharges: 1, noRefill: true }
      ],
      how: "Freeze Block traps the other fighter in a blue block for 20 seconds, but they can still be attacked. Burrow Strike digs underground and pops up to attack. Poison Storm can be used once in a level, and each drop that hits takes half a heart unless the target dodges the falling drop. In Level 10, or when supercharged, he can throw unlimited axes. A straight-on axe hit takes 1 whole heart."
    },
    ness: {
      id: "ness",
      name: "Super Ness",
      role: "hero",
      theme: "theme-fary",
      color: "#c73583",
      accent: "#6bd8ff",
      maxHealth: 3,
      powers: [
        { id: "superKick", name: "Super Kick", icon: "kick" },
        { id: "superHide", name: "Super Hide", icon: "hide" },
        { id: "treeClimb", name: "Tree Climb", icon: "tree" }
      ],
      how: "Super Kick takes away 1 whole heart. Super Hide hides her for 40 whole seconds. Tree Climb jumps her onto the top of a tree so she can attack from above."
    },
    crayon: {
      id: "crayon",
      name: "Captain Crayonstorm",
      role: "hero",
      theme: "theme-tats",
      color: "#21a36c",
      accent: "#f5d129",
      secret: true,
      unlock: "Beat Mischievous Mayor in 3 tries or fewer.",
      powers: [
        { id: "crayonBarrage", name: "Crayon Barrage", icon: "crayon" },
        { id: "colorShield", name: "Color Shield", icon: "shield" },
        { id: "scribbleDash", name: "Scribble Dash", icon: "speed" }
      ],
      how: "Crayon Barrage shoots colorful lines for half a heart. Color Shield blocks one hit. Scribble Dash zips forward."
    },
    hoodie: {
      id: "hoodie",
      name: "Zap Hoodie",
      role: "hero",
      theme: "theme-yapping",
      color: "#1f1f29",
      accent: "#49d9ff",
      secret: true,
      unlock: "Beat Yapping Yonatan with at least 1 heart left.",
      powers: [
        { id: "zipZap", name: "Zip Zap", icon: "bolt" },
        { id: "hoodieShield", name: "Hoodie Shield", icon: "shield" },
        { id: "staticSlide", name: "Static Slide", icon: "speed" }
      ],
      how: "Zip Zap shocks for half a heart. Hoodie Shield blocks one hit. Static Slide dodges and bumps."
    },
    phantom: {
      id: "phantom",
      name: "The Homework Phantom",
      role: "villain",
      theme: "theme-mayor",
      color: "#4f5668",
      accent: "#ebe3ce",
      secret: true,
      unlock: "Beat Mischievous Mayor on Level 1, on the first try, with at least 2 hearts left.",
      powers: [
        { id: "paperCyclone", name: "Paper Cyclone", icon: "tornado" },
        { id: "vanish", name: "Vanish", icon: "hide" },
        { id: "eraserBeam", name: "Eraser Beam", icon: "laser" }
      ],
      how: "Paper Cyclone traps for 3 seconds. Vanish hides for a short burst. Eraser Beam hits straight for half a heart."
    },
    kingDock: {
      id: "kingDock",
      name: "King Dock",
      role: "villain",
      theme: "theme-yapping",
      color: "#ff69b4",
      accent: "#7d43d6",
      maxHealth: 4,
      powers: [
        { id: "kingSword", name: "Sword Charge", icon: "sword" },
        { id: "kingSlam", name: "Gorilla Slam", icon: "gorilla" },
        { id: "kingLaser", name: "Giant Laser", icon: "laser", maxCharges: 1, noRefill: true },
        { id: "ghostBats", name: "Rack Creatures", icon: "bat" },
        { id: "trapBox", name: "Trap Box", icon: "box" },
        { id: "kingRoar", name: "Royal Roar", icon: "mouth" }
      ],
      how: "King Dock is the Level 10 boss in Abandoned Desert and returns in Water World wearing a water suit. He is a giant pink gorilla with purple eyes, an angry mouth, two brown horns, red battle splatters all over him, a crown, and a sword sticking out of his head. He is very huge and can fire one giant hand laser. He can control seven Rack Creatures at a time, but each creature is weak and disappears when it gets hit."
    }
  };

  const CHARACTER_ORDER = ["mayor", "tats", "fary", "apple", "yapping", "freddy", "benji", "frost", "ness", "crayon", "hoodie", "phantom"];
  const MENU_ORDER = ["mayor", "tats", "fary", "apple", "yapping", "freddy", "benji", "frost", "ness"];
  const STORY_BOSSES = ["mayor", "yapping"];
  const WORLDS = {
    superville: {
      id: "superville",
      name: "Superville Park",
      levels: "Levels 1-3",
      startLevel: 1,
      endLevel: 3,
      unlock: "Unlocked from the start."
    },
    candyland: {
      id: "candyland",
      name: "Candyland",
      levels: "Levels 4-6",
      startLevel: 4,
      endLevel: 6,
      unlock: "Beat Yapping Yonatan through Levels 1, 2, and 3."
    },
    abandonedDesert: {
      id: "abandonedDesert",
      name: "Abandoned Desert",
      levels: "Levels 7-10",
      startLevel: 7,
      endLevel: 10,
      unlock: "Beat Candyland Levels 4, 5, and 6 twice."
    },
    waterWorld: {
      id: "waterWorld",
      name: "Water World",
      levels: "Levels 11-14",
      startLevel: 11,
      endLevel: 14,
      unlock: "Beat King Dock in Abandoned Desert."
    }
  };
  const WORLD_ORDER = ["superville", "candyland", "abandonedDesert", "waterWorld"];
  const WATER_WORLD_POWERS = {
    mayor: { id: "waterBoots", name: "Water Boots", icon: "boots", maxCharges: 3 },
    tats: { id: "tidalPunch", name: "Tidal Punch", icon: "fist", maxCharges: 3 },
    fary: { id: "bubbleWings", name: "Bubble Wings", icon: "wing", maxCharges: 3 },
    apple: { id: "juiceWave", name: "Juice Wave", icon: "splash", maxCharges: 3 },
    yapping: { id: "seaMouth", name: "Sea Mouth", icon: "mouth", maxCharges: 3 },
    frost: { id: "iceFeet", name: "Ice Feet", icon: "freeze", maxCharges: 3 },
    ness: { id: "waterHide", name: "Water Hide", icon: "hide", maxCharges: 3 },
    crayon: { id: "paintRaft", name: "Paint Raft", icon: "crayon", maxCharges: 3 },
    hoodie: { id: "staticSurf", name: "Static Surf", icon: "bolt", maxCharges: 3 },
    phantom: { id: "mistVanish", name: "Mist Vanish", icon: "hide", maxCharges: 3 }
  };
  const PACKAGES = {
    supercharged: {
      id: "supercharged",
      name: "Supercharged Package",
      unlock: "Beat Mischievous Mayor two times in a row.",
      effect: "Candyland fighters get 5 hearts on Levels 4 and 5, then 10 hearts on Level 6. Villains keep Level 3 power."
    }
  };
  const TROPHIES = {
    kingOfBattle: {
      id: "kingOfBattle",
      name: "King of the Battle",
      eyebrow: "Crown Earned",
      description: "You beat King Dock and took the crown."
    }
  };
  const SUPERCHARGED_NAMES = {
    apple: "Cheetah Racer",
    fary: "Mega Mommy",
    freddy: "Ultimate Freddy",
    tats: "Super Dad"
  };

  const SUPERCHARGED_POWER_SETS = {
    apple: [
      { id: "cheetahSpeed", name: "Super Speed", icon: "speed" },
      { id: "cheetahClaws", name: "Sharp Claws", icon: "claws" }
    ]
  };

  const els = {
    views: {
      menu: document.getElementById("mainMenu"),
      how: document.getElementById("howToView"),
      select: document.getElementById("selectView"),
      battle: document.getElementById("battleView"),
      result: document.getElementById("resultView")
    },
    menuCharacters: document.getElementById("menuCharacters"),
    storyButton: document.getElementById("storyButton"),
    twoPlayerButton: document.getElementById("twoPlayerButton"),
    howToButton: document.getElementById("howToButton"),
    howToContent: document.getElementById("howToContent"),
    selectBackdrop: document.getElementById("selectBackdrop"),
    selectModeLabel: document.getElementById("selectModeLabel"),
    selectTitle: document.getElementById("selectTitle"),
    selectMessage: document.getElementById("selectMessage"),
    fighterGrid: document.getElementById("fighterGrid"),
    bossArea: document.getElementById("bossArea"),
    startBattleButton: document.getElementById("startBattleButton"),
    sendLinkButton: document.getElementById("sendLinkButton"),
    canvas: document.getElementById("gameCanvas"),
    hud: document.getElementById("hud"),
    animalChooser: document.getElementById("animalChooser"),
    controlDock: document.getElementById("controlDock"),
    pauseButton: document.getElementById("pauseButton"),
    pauseOverlay: document.getElementById("pauseOverlay"),
    resumeButton: document.getElementById("resumeButton"),
    restartButton: document.getElementById("restartButton"),
    resultTitle: document.getElementById("resultTitle"),
    resultText: document.getElementById("resultText"),
    unlockList: document.getElementById("unlockList"),
    playAgainButton: document.getElementById("playAgainButton"),
    menuButton: document.getElementById("menuButton"),
    volumeSlider: document.getElementById("volumeSlider")
  };

  const ctx = els.canvas.getContext("2d");

  let progress = loadProgress();
  let selectState = {
    mode: "story",
    p1: "tats",
    p2: "apple",
    boss: "mayor",
    world: "superville"
  };
  let game = null;
  let rafId = 0;
  let lastFrame = performance.now();
  let lastControlsRender = 0;
  let lastHudHtml = "";

  const buttonInput = {
    p1: blankInput(),
    p2: blankInput()
  };
  const keys = Object.create(null);

  const audio = {
    ctx: null,
    volume: 0,
    musicTimer: null,
    musicStep: 0
  };

  function animal(name, feature, flags = {}) {
    return Object.assign({ name, feature }, flags);
  }

  function shark(name, flags = {}) {
    return Object.assign({ name, swim: true }, flags);
  }

  function blankInput() {
    return {
      left: false,
      right: false,
      up: false,
      down: false,
      botLeft: false,
      botRight: false,
      botUp: false,
      botDown: false
    };
  }

  function loadProgress() {
    const fallback = {
      unlocked: [],
      unlockedWorlds: ["superville"],
      unlockedPackages: [],
      unlockedTrophies: [],
      bossAttempts: { mayor: 0, yapping: 0 },
      mayorWinStreak: 0,
      candylandWinStreak: 0,
      sameCooldowns: {}
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      const unlocked = normalizeUnlocked(Array.isArray(parsed.unlocked) ? parsed.unlocked : []);
      const unlockedTrophies = normalizeTrophies(Array.isArray(parsed.unlockedTrophies) ? parsed.unlockedTrophies : fallback.unlockedTrophies);
      const unlockedWorlds = normalizeWorlds(Array.isArray(parsed.unlockedWorlds) ? parsed.unlockedWorlds : fallback.unlockedWorlds, unlocked);
      if (unlockedTrophies.includes("kingOfBattle") && !unlockedWorlds.includes("waterWorld")) unlockedWorlds.push("waterWorld");
      return {
        unlocked,
        unlockedWorlds,
        unlockedPackages: normalizePackages(Array.isArray(parsed.unlockedPackages) ? parsed.unlockedPackages : fallback.unlockedPackages),
        unlockedTrophies,
        bossAttempts: Object.assign(fallback.bossAttempts, parsed.bossAttempts || {}),
        mayorWinStreak: Number.isFinite(Number(parsed.mayorWinStreak)) ? Math.max(0, Number(parsed.mayorWinStreak)) : 0,
        candylandWinStreak: Number.isFinite(Number(parsed.candylandWinStreak)) ? Math.max(0, Number(parsed.candylandWinStreak)) : 0,
        sameCooldowns: parsed.sameCooldowns || {}
      };
    } catch (error) {
      return fallback;
    }
  }

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function isUnlocked(id) {
    return !CHARACTERS[id].secret || progress.unlocked.includes(id) || progress.unlocked.includes(CHARACTERS[id].name);
  }

  function isWorldUnlocked(id) {
    return id === "superville" || (progress.unlockedWorlds || []).includes(id);
  }

  function isPackageUnlocked(id) {
    return (progress.unlockedPackages || []).includes(id);
  }

  function isSuperchargedSelection() {
    return selectState.mode === "story" && selectState.world === "candyland" && isPackageUnlocked("supercharged");
  }

  function displayNameFor(id, supercharged = false) {
    if (supercharged && SUPERCHARGED_NAMES[id]) return SUPERCHARGED_NAMES[id];
    return CHARACTERS[id].name;
  }

  function unlockCharacter(id) {
    progress.unlocked = normalizeUnlocked(progress.unlocked);
    if (!progress.unlocked.includes(id)) {
      progress.unlocked.push(id);
      saveProgress();
      return true;
    }
    return false;
  }

  function unlockWorld(id) {
    progress.unlockedWorlds = normalizeWorlds(progress.unlockedWorlds || ["superville"], progress.unlocked || []);
    if (!progress.unlockedWorlds.includes(id)) {
      progress.unlockedWorlds.push(id);
      saveProgress();
      return true;
    }
    return false;
  }

  function unlockPackage(id) {
    progress.unlockedPackages = normalizePackages(progress.unlockedPackages || []);
    if (!progress.unlockedPackages.includes(id)) {
      progress.unlockedPackages.push(id);
      saveProgress();
      return true;
    }
    return false;
  }

  function awardTrophy(id) {
    progress.unlockedTrophies = normalizeTrophies(progress.unlockedTrophies || []);
    if (!progress.unlockedTrophies.includes(id)) {
      progress.unlockedTrophies.push(id);
      saveProgress();
      return true;
    }
    saveProgress();
    return false;
  }

  function normalizeUnlocked(unlocked) {
    return unlocked
      .map((entry) => {
        if (CHARACTERS[entry]) return entry;
        const match = CHARACTER_ORDER.find((id) => CHARACTERS[id].name === entry);
        return match || entry;
      })
      .filter((entry, index, list) => list.indexOf(entry) === index);
  }

  function normalizeWorlds(unlockedWorlds, unlockedCharacters = []) {
    const normalized = new Set(["superville"]);
    unlockedWorlds.forEach((entry) => {
      if (WORLDS[entry]) normalized.add(entry);
      const match = WORLD_ORDER.find((id) => WORLDS[id].name === entry);
      if (match) normalized.add(match);
    });
    if (unlockedCharacters.includes("hoodie")) normalized.add("candyland");
    return Array.from(normalized);
  }

  function normalizePackages(unlockedPackages) {
    return unlockedPackages
      .map((entry) => {
        if (PACKAGES[entry]) return entry;
        const match = Object.keys(PACKAGES).find((id) => PACKAGES[id].name === entry);
        return match || entry;
      })
      .filter((entry, index, list) => PACKAGES[entry] && list.indexOf(entry) === index);
  }

  function normalizeTrophies(unlockedTrophies) {
    return unlockedTrophies
      .map((entry) => {
        if (TROPHIES[entry]) return entry;
        const match = Object.keys(TROPHIES).find((id) => TROPHIES[id].name === entry);
        return match || entry;
      })
      .filter((entry, index, list) => TROPHIES[entry] && list.indexOf(entry) === index);
  }

  function showView(name) {
    Object.values(els.views).forEach((view) => view.classList.remove("active"));
    els.views[name].classList.add("active");
  }

  function showMainMenu() {
    stopBattleMusic();
    game = null;
    lastHudHtml = "";
    els.volumeSlider.value = "0";
    audio.volume = 0;
    renderMainCharacters();
    showView("menu");
  }

  function renderMainCharacters() {
    els.menuCharacters.innerHTML = "";
    const ids = mainMenuCharacterIds();
    els.menuCharacters.classList.toggle("has-secrets", ids.length > MENU_ORDER.length);
    ids.forEach((id) => {
      const character = CHARACTERS[id];
      const card = document.createElement("div");
      card.className = "character-card";
      const canvas = document.createElement("canvas");
      canvas.width = 260;
      canvas.height = 250;
      const label = document.createElement("span");
      label.textContent = character.name;
      card.append(canvas, label);
      if (character.secret) {
        const badge = document.createElement("div");
        badge.className = "unlock-badge";
        badge.textContent = "Unlocked";
        card.append(badge);
      }
      els.menuCharacters.append(card);
      drawPortrait(canvas.getContext("2d"), id, false, false);
    });
  }

  function mainMenuCharacterIds() {
    const ids = MENU_ORDER.slice();
    CHARACTER_ORDER.forEach((id) => {
      if (CHARACTERS[id].secret && isUnlocked(id) && !ids.includes(id)) ids.push(id);
    });
    return ids;
  }

  function openHowTo() {
    els.howToContent.innerHTML = "";
    const basics = [
      ["Basic buttons", "Every fighter has Kick, Punch, Jump, Run, Walk, Duck, Dodge, and Hide. Hide only works near trees or benches, and it lasts up to 20 seconds."],
      ["Hearts", "Most fighters have 3 pink hearts. Most hits take half a heart. Giant Punch, Laser Ray, Bite, or two robot chainsaws at once take 1 whole heart."],
      ["Timer and levels", "Each level lasts 2 minutes. If nobody loses all hearts, whoever has more hearts wins the level. Superville has Levels 1, 2, and 3. Candyland has Levels 4, 5, and 6. Abandoned Desert has Levels 7, 8, 9, and 10. Water World has Levels 11, 12, 13, and 14."],
      ["Worlds", "Candyland unlocks after you beat Yapping Yonatan through Levels 1, 2, and 3. Abandoned Desert unlocks after you beat Candyland Levels 4, 5, and 6 twice. The Candyland wins do not need to be in a row. Water World unlocks after you beat King Dock in Abandoned Desert."],
      ["King Dock hearts, laser, Rack Creatures, and boxes", "King Dock is very huge, has 10 hearts, and the player starts with 10 hearts in his boss worlds. He can fire one giant hand laser. When you hit King Dock, his heart flies to you and heals you up to your max hearts. Every real hit also makes special prize boxes spread out around him. King Dock can control seven Rack Creatures at a time, but any hit destroys a creature. Sometimes King Dock drops a trap box from above for no reason. Trap boxes say BOOBY TRAP on them. Watch for little traps around trap boxes, like pit cracks and Rack Creatures dropping from above. Jump onto a landed prize box to get rewards like an iron sword, armor, heart, speed boost, or power refill. Beating King Dock earns the King of the Battle crown."],
      ["Water World", "Levels 11-14 take place on water and are meant to be pretty easy, like Levels 1-3. King Dock is the boss again, but he wears a water suit. Benji can use his five shark forms anywhere in Water World. Freddy can still choose fish. Other fighters get a simple water-themed power, like Mr. 67's Ice Feet for walking on water."],
      ["Supercharged Package", "Beat Mischievous Mayor two times in a row to unlock the Supercharged Package. Once it is unlocked, Candyland fighters get 5 hearts on Levels 4 and 5, then 10 hearts on Level 6. Supercharged names include Cheetah Racer, Mega Mommy, Ultimate Freddy, and Super Dad. Cheetah Racer only has Super Speed and Sharp Claws; Sharp Claws takes half a heart. The villains keep their Level 3 power in every Candyland level."],
      ["Powers", "Most powers can be used 3 times, then they recharge. Some special powers recharge after 1 use. Normal recharge is 30 seconds. Mischievous Mayor recharges in 20 seconds when he is the boss."]
    ];

    basics.forEach(([title, text]) => addHowCard(title, text));
    CHARACTER_ORDER.forEach((id) => {
      const character = CHARACTERS[id];
      if (character.secret && !isUnlocked(id)) {
        addHowCard(character.name, `Locked secret character. Unlock: ${character.unlock}`);
      } else if (id === "freddy") {
        addHowCard(character.name, freddyHowText());
      } else {
        const powers = character.powers.map((power) => power.name).join(", ");
        addHowCard(character.name, `${character.how} Powers: ${powers}.`);
      }
    });
    showView("how");
  }

  function addHowCard(title, text) {
    const card = document.createElement("section");
    card.className = "how-card";
    const h3 = document.createElement("h3");
    h3.textContent = title;
    const p = document.createElement("p");
    p.textContent = text;
    card.append(h3, p);
    els.howToContent.append(card);
  }

  function freddyHowText() {
    const categories = Object.entries(FREDDY_ANIMALS).map(([category, animals]) => {
      const label = FREDDY_CATEGORY_NAMES[category];
      const names = animals.map((entry) => entry.name).join(", ");
      return `${label}: ${names}`;
    }).join(" | ");
    return `${CHARACTERS.freddy.how} Press a category, then pick an animal. Press the same animal again to turn back into Freddy, or pick a different animal to transform again. ${categories}.`;
  }

  function openSelect(mode) {
    selectState.mode = mode;
    if (!isUnlocked(selectState.p1)) selectState.p1 = "tats";
    if (!isUnlocked(selectState.p2)) selectState.p2 = "apple";
    if (!isWorldUnlocked(selectState.world)) selectState.world = "superville";
    renderSelect();
    showView("select");
  }

  function renderSelect() {
    const selected = CHARACTERS[selectState.p1];
    els.selectBackdrop.className = `select-backdrop ${selected.theme}`;
    els.selectModeLabel.textContent = selectState.mode === "story" ? "Story Mode" : "Two Player Mode";
    els.selectTitle.textContent = selectState.mode === "story" ? "Choose Your Fighter" : "Choose Player 1";
    els.sendLinkButton.classList.toggle("hidden", selectState.mode !== "two");

    els.fighterGrid.innerHTML = "";
    CHARACTER_ORDER.forEach((id) => {
      els.fighterGrid.append(createSelectCard(id, selectState.p1 === id, () => {
        if (!isUnlocked(id)) return;
        selectState.p1 = id;
        renderSelect();
      }));
    });

    els.bossArea.innerHTML = "";
    if (selectState.mode === "story") {
      const worldHeading = document.createElement("h3");
      worldHeading.textContent = "Choose World";
      els.bossArea.append(worldHeading);
      const worldGrid = document.createElement("div");
      worldGrid.className = "select-grid world-grid";
      WORLD_ORDER.forEach((id) => {
        worldGrid.append(createWorldCard(id, selectState.world === id, () => {
          if (!isWorldUnlocked(id)) return;
          selectState.world = id;
          if (id === "waterWorld") selectState.boss = "kingDock";
          else if (selectState.boss === "kingDock") selectState.boss = "mayor";
          renderSelect();
        }));
      });
      els.bossArea.append(worldGrid);
      const packageHeading = document.createElement("h3");
      packageHeading.textContent = "Power Package";
      els.bossArea.append(packageHeading);
      const packageGrid = document.createElement("div");
      packageGrid.className = "select-grid package-grid";
      packageGrid.append(createPackageCard("supercharged"));
      els.bossArea.append(packageGrid);
    }
    const heading = document.createElement("h3");
    heading.textContent = selectState.mode === "story" ? "Choose Boss" : "Choose Player 2";
    els.bossArea.append(heading);
    const grid = document.createElement("div");
    grid.className = "select-grid";
    const ids = selectState.mode === "story" ? (selectState.world === "waterWorld" ? ["kingDock"] : STORY_BOSSES) : CHARACTER_ORDER;
    ids.forEach((id) => {
      const selectedId = selectState.mode === "story" ? selectState.boss : selectState.p2;
      grid.append(createSelectCard(id, selectedId === id, () => {
        if (!isUnlocked(id)) return;
        if (selectState.mode === "story") selectState.boss = id;
        else selectState.p2 = id;
        renderSelect();
      }));
    });
    els.bossArea.append(grid);

    const opponent = selectState.mode === "story" ? selectState.boss : selectState.p2;
    const cooldown = sameCharacterCooldown(opponent);
    let message = "";
    let blocked = false;
    if (selectState.p1 === opponent && cooldown > Date.now()) {
      blocked = true;
      message = `Mirror battle cooldown: ${formatClock((cooldown - Date.now()) / 1000)} left.`;
    } else if (selectState.p1 === opponent) {
      message = "Mirror battle is ready. After this one, it locks for 34 minutes.";
    } else if (selectState.mode === "story" && selectState.world === "candyland") {
      message = isPackageUnlocked("supercharged")
        ? "Candyland is ready: Supercharged Package is ON."
        : `Candyland is ready. Supercharged Package locked: ${progress.mayorWinStreak || 0}/2 Mayor wins.`;
    } else if (selectState.mode === "story" && selectState.world === "abandonedDesert") {
      message = "Abandoned Desert is ready: Levels 7-10. Level 10 boss is King Dock.";
    } else if (selectState.mode === "story" && selectState.world === "waterWorld") {
      message = "Water World is ready: Levels 11-14. King Dock returns in a water suit.";
    } else if (selectState.mode === "two") {
      message = "Player 1 can send a link, then start a local battle here.";
    }
    els.selectMessage.textContent = message;
    els.startBattleButton.disabled = blocked;
  }

  function createSelectCard(id, selected, onClick) {
    const character = CHARACTERS[id];
    const unlocked = isUnlocked(id);
    const card = document.createElement("button");
    card.className = `select-card${selected ? " selected" : ""}${!unlocked ? " locked" : ""}`;
    card.type = "button";
    card.disabled = !unlocked;
    card.addEventListener("click", onClick);
    const canvas = document.createElement("canvas");
    canvas.width = 260;
    canvas.height = 220;
    const label = document.createElement("span");
    label.textContent = unlocked ? displayNameFor(id, isSuperchargedSelection()) : character.name;
    const summary = document.createElement("div");
    summary.className = "select-card-summary";
    summary.textContent = unlocked ? characterSummary(id) : `Unlock: ${character.unlock}`;
    card.append(canvas, label, summary);
    if (!unlocked) {
      const stamp = document.createElement("div");
      stamp.className = "locked-stamp";
      stamp.textContent = "Locked";
      card.append(stamp);
    }
    requestAnimationFrame(() => drawPortrait(canvas.getContext("2d"), id, !unlocked, unlocked && isSuperchargedSelection()));
    return card;
  }

  function createWorldCard(id, selected, onClick) {
    const world = WORLDS[id];
    const unlocked = isWorldUnlocked(id);
    const card = document.createElement("button");
    card.className = `select-card world-card${selected ? " selected" : ""}${!unlocked ? " locked" : ""}`;
    card.type = "button";
    card.disabled = !unlocked;
    card.addEventListener("click", onClick);
    const canvas = document.createElement("canvas");
    canvas.width = 260;
    canvas.height = 150;
    const label = document.createElement("span");
    label.textContent = world.name;
    const summary = document.createElement("div");
    summary.className = "select-card-summary";
    summary.textContent = unlocked ? world.levels : `Unlock: ${world.unlock}`;
    card.append(canvas, label, summary);
    if (!unlocked) {
      const stamp = document.createElement("div");
      stamp.className = "locked-stamp";
      stamp.textContent = "Locked";
      card.append(stamp);
    }
    requestAnimationFrame(() => drawWorldCard(canvas.getContext("2d"), id, !unlocked));
    return card;
  }

  function createPackageCard(id) {
    const pack = PACKAGES[id];
    const unlocked = isPackageUnlocked(id);
    const card = document.createElement("button");
    card.className = `select-card package-card${unlocked ? " selected" : " locked"}`;
    card.type = "button";
    card.disabled = true;
    const canvas = document.createElement("canvas");
    canvas.width = 260;
    canvas.height = 150;
    const label = document.createElement("span");
    label.textContent = pack.name;
    const summary = document.createElement("div");
    summary.className = "select-card-summary";
    summary.textContent = unlocked ? `${pack.effect} Names: Cheetah Racer, Mega Mommy, Ultimate Freddy, Super Dad.` : `Unlock: ${pack.unlock} Progress: ${progress.mayorWinStreak || 0}/2.`;
    card.append(canvas, label, summary);
    if (!unlocked) {
      const stamp = document.createElement("div");
      stamp.className = "locked-stamp";
      stamp.textContent = "Locked";
      card.append(stamp);
    }
    requestAnimationFrame(() => drawPackageCard(canvas.getContext("2d"), id, !unlocked));
    return card;
  }

  function characterSummary(id) {
    const character = CHARACTERS[id];
    const hearts = selectState.world === "waterWorld" ? (id === "kingDock" ? KING_DOCK_MAX_HEALTH : "10") : isSuperchargedSelection() ? "5-10" : maxHealthFor(id);
    const superchargedOnlyPowers = isSuperchargedSelection() ? SUPERCHARGED_POWER_SETS[id] : null;
    const powers = (superchargedOnlyPowers || character.powers).map((power) => power.name);
    if (id === "freddy" && isSuperchargedSelection()) powers.push("Super Giant Punch");
    if (id === "frost" && (isSuperchargedSelection() || selectState.world === "abandonedDesert")) powers.push("Level 10 Super Axe Throw");
    const waterPower = waterPowerFor(id);
    if (selectState.world === "waterWorld") {
      if (waterPower) powers.push(waterPower.name);
      if (id === "freddy") powers.push("Fish forms work everywhere");
      if (id === "benji") powers.push("Sharks work everywhere");
    }
    const powerText = powers.join(", ");
    return `${hearts} hearts. Powers: ${powerText}.`;
  }

  function sameCharacterCooldown(id) {
    return progress.sameCooldowns[id] || 0;
  }

  function lockSameCharacterBattle(id) {
    progress.sameCooldowns[id] = Date.now() + SAME_CHARACTER_COOLDOWN;
    saveProgress();
  }

  function sendLink() {
    const url = new URL(location.href);
    url.searchParams.set("mode", "two-player");
    url.searchParams.set("p1", selectState.p1);
    url.searchParams.set("p2", selectState.p2);
    if (selectState.mode === "story") url.searchParams.set("world", selectState.world);
    const text = `Join my Big Bad Boss Battle: ${url.toString()}`;
    if (navigator.share) {
      navigator.share({ title: "Big Bad Boss Battle", text, url: url.toString() }).catch(() => copyInvite(text));
    } else {
      copyInvite(text);
    }
  }

  function copyInvite(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        els.selectMessage.textContent = "Link copied.";
      }).catch(() => {
        els.selectMessage.textContent = text;
      });
    } else {
      els.selectMessage.textContent = text;
    }
  }

  function startBattle() {
    initAudio();
    const opponentId = selectState.mode === "story" && selectState.world === "waterWorld" ? "kingDock" : selectState.mode === "story" ? selectState.boss : selectState.p2;
    const startLevelNumber = selectState.mode === "story" ? WORLDS[selectState.world].startLevel : 1;
    const endLevelNumber = selectState.mode === "story" ? WORLDS[selectState.world].endLevel : 3;
    if (selectState.p1 === opponentId) {
      const cooldown = sameCharacterCooldown(opponentId);
      if (cooldown > Date.now()) {
        els.selectMessage.textContent = `Mirror battle cooldown: ${formatClock((cooldown - Date.now()) / 1000)} left.`;
        return;
      }
      lockSameCharacterBattle(opponentId);
    }

    let attemptNumber = 0;
    if (selectState.mode === "story" && STORY_BOSSES.includes(opponentId)) {
      progress.bossAttempts[opponentId] = (progress.bossAttempts[opponentId] || 0) + 1;
      attemptNumber = progress.bossAttempts[opponentId];
      saveProgress();
    }

    game = {
      mode: selectState.mode,
      level: startLevelNumber,
      world: selectState.mode === "story" ? selectState.world : "superville",
      worldStartLevel: startLevelNumber,
      worldEndLevel: endLevelNumber,
      p1Id: selectState.p1,
      p2Id: opponentId,
      bossId: selectState.mode === "story" ? opponentId : null,
      attemptNumber,
      p1: null,
      p2: null,
      helpers: [],
      effects: [],
      pickups: [],
      kingDockBoxCount: 0,
      obstacles: makeObstacles(selectState.mode === "story" ? selectState.world : "superville"),
      scores: { p1: 0, p2: 0 },
      carry: {
        p1: fighterMaxHealthForLevel(selectState.p1, startLevelNumber, false),
        p2: fighterMaxHealthForLevel(opponentId, startLevelNumber, selectState.mode === "story")
      },
      levelStartCarry: {
        p1: fighterMaxHealthForLevel(selectState.p1, startLevelNumber, false),
        p2: fighterMaxHealthForLevel(opponentId, startLevelNumber, selectState.mode === "story")
      },
      startedAt: 0,
      endsAt: 0,
      paused: false,
      pauseStarted: 0,
      transitionText: "",
      transitionUntil: 0,
      dangerWarningText: "",
      dangerWarningUntil: 0,
      level9WarningShown: false,
      kingDockIntroUntil: 0,
      screenShakeUntil: 0,
      screenShakePower: 0,
      gameOver: false,
      unlocks: []
    };

    showView("battle");
    lastHudHtml = "";
    startLevel(startLevelNumber);
    startBattleMusic();
  }

  function startLevel(level) {
    const now = performance.now();
    const introMs = 3000;
    const levelOpponentId = game.mode === "story" ? storyBossIdForLevel(level) : game.p2Id;
    const kingDockTalkMs = levelOpponentId === "kingDock" ? (game.world === "waterWorld" ? 2600 : 4600) : 0;
    game.level = level;
    game.levelStartCarry = { p1: game.carry.p1, p2: game.carry.p2 };
    game.helpers = [];
    game.effects = [];
    game.pickups = [];
    game.kingDockBoxCount = 0;
    game.p1 = createFighter(game.p1Id, "p1", false, 270, 470, 1);
    game.p2 = createFighter(levelOpponentId, "p2", game.mode === "story", 1010, 470, -1);
    game.p1.maxHealth = fighterMaxHealthForLevel(game.p1.id, level, false);
    game.p2.maxHealth = fighterMaxHealthForLevel(game.p2.id, level, game.p2.isBoss);
    game.p1.supercharged = isSuperchargedLevel(level);
    game.p2.supercharged = isSuperchargedLevel(level);
    game.p1.name = displayNameFor(game.p1.id, game.p1.supercharged);
    game.p2.name = displayNameFor(game.p2.id, game.p2.supercharged);
    syncFighterPowers(game.p1);
    syncFighterPowers(game.p2);
    if (isSuperchargedLevel(level) || isKingDockLevel(level)) {
      game.p1.health = game.p1.maxHealth;
      game.p2.health = game.p2.maxHealth;
    } else {
      game.p1.health = Math.min(game.carry.p1, game.p1.maxHealth);
      game.p2.health = Math.min(game.carry.p2, game.p2.maxHealth);
    }
    if (game.p2.isBoss) {
      const tuning = bossTuning();
      game.p2.aiNext = now + introMs + kingDockTalkMs + tuning.aiDelayMin;
      game.p2.aiPowerNext = now + introMs + kingDockTalkMs + tuning.initialPowerDelay;
    }
    game.startedAt = now + introMs + kingDockTalkMs;
    game.endsAt = game.startedAt + LEVEL_SECONDS * 1000;
    game.paused = false;
    game.transitionText = levelBannerText(level);
    game.transitionUntil = now + introMs;
    game.dangerWarningText = "";
    game.dangerWarningUntil = 0;
    game.level9WarningShown = false;
    game.kingDockIntroUntil = levelOpponentId === "kingDock" ? now + introMs + kingDockTalkMs : 0;
    if (levelOpponentId === "kingDock") {
      game.dangerWarningText = game.world === "waterWorld" ? "King Dock has a water suit!" : "King Dock: Who is responsible?";
      game.dangerWarningUntil = game.kingDockIntroUntil;
    }
    game.gameOver = false;
    buttonInput.p1 = blankInput();
    buttonInput.p2 = blankInput();
    if (game.p2.id === "yapping") spawnMainMouth(game.p2);
    if (game.p1.id === "yapping") spawnMainMouth(game.p1);
    sayStartLine(game.p1);
    sayStartLine(game.p2);
    renderControls(true);
  }

  function storyBossIdForLevel(level) {
    if (game && game.mode === "story" && game.world === "abandonedDesert" && level >= 10) return "kingDock";
    if (game && game.mode === "story" && game.world === "waterWorld" && level >= 11) return "kingDock";
    return game ? game.p2Id : selectState.boss;
  }

  function isKingDockLevel(level) {
    return game && game.mode === "story" && game.p2 && game.p2.id === "kingDock" && (game.world === "abandonedDesert" || game.world === "waterWorld");
  }

  function createFighter(id, side, isBoss, x, y, facing) {
    const character = CHARACTERS[id];
    const charges = {};
    const cooldowns = {};
    character.powers.forEach((power) => {
      charges[power.id] = maxChargesForPower(power);
      cooldowns[power.id] = 0;
    });
    return {
      id,
      side,
      name: character.name,
      character,
      isBoss,
      maxHealth: maxHealthFor(id),
      x,
      y,
      z: 0,
      vx: 0,
      vy: 0,
      vz: 0,
      facing,
      health: maxHealthFor(id),
      moveMode: "walk",
      action: "",
      actionUntil: 0,
      powerCue: "",
      powerCueBorn: 0,
      powerCueUntil: 0,
      hitFlashUntil: 0,
      hitShakeUntil: 0,
      hurtUntil: 0,
      dodgeUntil: 0,
      duckUntil: 0,
      knockdownUntil: 0,
      trappedUntil: 0,
      hiddenUntil: 0,
      undergroundUntil: 0,
      treeClimbUntil: 0,
      flyingUntil: 0,
      flyForever: false,
      speedBoostUntil: 0,
      damageBonusUntil: 0,
      waterFormUntil: 0,
      waterWalkUntil: 0,
      lastPowerUsedAt: 0,
      lastPowerId: "",
      supercharged: false,
      shieldHits: 0,
      charges,
      cooldowns,
      controllingBots: false,
      controllingMouth: false,
      powerDrawerOpen: false,
      utilityDrawerOpen: false,
      animalCategory: "",
      animalForm: null,
      sharkChooserOpen: false,
      sharkForm: null,
      sharkCooldownUntil: 0,
      helperPenaltyNow: 0,
      helperPenaltyNext: 0,
      lastWholeLost: 0,
      aiNext: 0,
      aiPowerNext: 0,
      aiIntent: "",
      bubble: null
    };
  }

  function maxHealthFor(id) {
    return CHARACTERS[id].maxHealth || 3;
  }

  function fighterPowers(fighter) {
    if (fighter.supercharged && SUPERCHARGED_POWER_SETS[fighter.id]) {
      return SUPERCHARGED_POWER_SETS[fighter.id].slice();
    }
    const powers = fighter.character.powers.slice();
    if (fighter.id === "freddy" && fighter.supercharged) {
      powers.push({ id: "superGiantPunch", name: "Super Giant Punch", icon: "fist", maxCharges: 1 });
    }
    if (fighter.id === "frost" && (fighter.supercharged || (game && game.mode === "story" && game.level >= 10))) {
      powers.push({ id: "superAxeThrow", name: "Super Axe Throw", icon: "axe", noRecharge: true });
    }
    const waterPower = waterPowerFor(fighter.id);
    if (isWaterWorldActive() && waterPower) powers.push(waterPower);
    return powers;
  }

  function waterPowerFor(id) {
    return WATER_WORLD_POWERS[id] || null;
  }

  function syncFighterPowers(fighter) {
    fighterPowers(fighter).forEach((power) => {
      if (fighter.charges[power.id] === undefined) fighter.charges[power.id] = maxChargesForPower(power);
      if (fighter.cooldowns[power.id] === undefined) fighter.cooldowns[power.id] = 0;
    });
  }

  function fighterMaxHealthForLevel(id, level, isBoss) {
    if (worldIdForLevel(level) === "waterWorld" && !isBoss) return 10;
    if (worldIdForLevel(level) === "abandonedDesert" && level >= 10 && !isBoss) return 10;
    const supercharged = superchargedHealthForLevel(level);
    if (supercharged) return supercharged;
    return isBoss ? bossMaxHealthForLevel(level, id) : maxHealthFor(id);
  }

  function bossMaxHealthForLevel(level, id) {
    if (id === "kingDock") return KING_DOCK_MAX_HEALTH;
    const world = worldIdForLevel(level);
    const worldBonus = world === "waterWorld" ? 3 : world === "abandonedDesert" ? 2 : world === "candyland" ? 1 : 0;
    return maxHealthFor(id) + Math.max(0, stageLevelFor(level) - 1) * 2 + worldBonus;
  }

  function superchargedHealthForLevel(level) {
    if (!isSuperchargedLevel(level)) return 0;
    return stageLevelFor(level) >= 3 ? 10 : 5;
  }

  function isSuperchargedLevel(level) {
    return worldIdForLevel(level) === "candyland" && isPackageUnlocked("supercharged");
  }

  function levelDifficultyLabel(level) {
    const world = worldIdForLevel(level);
    if (world === "candyland") return "Candyland Level 3 Villain Power";
    if (world === "waterWorld") {
      if (level >= 14) return "Easy King Dock Splash";
      if (level === 11) return "Water World Begins";
      if (level === 12) return "Easy Water";
      return "Gentle Waves";
    }
    if (world === "abandonedDesert") {
      if (level >= 10) return "King Dock Final Boss";
      if (level === 7) return "Desert Harder Than Level 6";
      if (level === 8) return "Desert Even Harder";
      return "Desert Almost Final";
    }
    const stage = stageLevelFor(level);
    if (stage === 1) return "Easy Boss";
    if (stage === 2) return "Harder Boss";
    return "Super Hard Boss";
  }

  function levelBannerText(level) {
    if (level === 9 && worldIdForLevel(level) === "abandonedDesert") return "Level 9: Warning - Danger Is Coming";
    return `Level ${level}: ${levelDifficultyLabel(level)}`;
  }

  function stageLevelFor(level) {
    if (level >= 11) return level >= 14 ? 3 : clamp(level - 10, 1, 3);
    if (level >= 7) return level >= 10 ? 3 : clamp(level - 6, 1, 3);
    return ((Math.max(1, level) - 1) % 3) + 1;
  }

  function villainPowerStageForLevel(level) {
    return worldIdForLevel(level) === "candyland" ? 3 : stageLevelFor(level);
  }

  function worldIdForLevel(level) {
    if (level >= 11) return "waterWorld";
    if (level >= 7) return "abandonedDesert";
    return level >= 4 ? "candyland" : "superville";
  }

  function isWaterWorldActive() {
    return !!(game && game.mode === "story" && worldIdForLevel(game.level || 1) === "waterWorld");
  }

  function makeObstacles(worldId = "superville") {
    if (worldId === "waterWorld") {
      return [
        { type: "bench", x: 315, y: 338, w: 170, h: 34, water: true },
        { type: "bench", x: 865, y: 520, w: 190, h: 36, water: true },
        { type: "tree", x: 1040, y: 318, r: 42, water: true },
        { type: "tree", x: 220, y: 570, r: 38, water: true }
      ];
    }
    if (worldId === "abandonedDesert") {
      return [
        { type: "tree", x: 245, y: 315, r: 42, desert: true },
        { type: "tree", x: 1045, y: 348, r: 46, desert: true },
        { type: "bench", x: 610, y: 590, w: 160, h: 38, desert: true },
        { type: "bench", x: 910, y: 250, w: 140, h: 36, desert: true }
      ];
    }
    return [
      { type: "tree", x: 250, y: 310, r: 44 },
      { type: "tree", x: 1050, y: 345, r: 48 },
      { type: "bench", x: 610, y: 590, w: 160, h: 38 },
      { type: "bench", x: 910, y: 250, w: 140, h: 36 }
    ];
  }

  function sayStartLine(fighter) {
    if (fighter.id === "kingDock") {
      setBubble(fighter, isWaterWorldActive() ? "My water suit is ready!" : "Who is responsible?", true, 7200);
      return;
    }
    if (fighter.character.role === "villain") {
      setBubble(fighter, "I want to rob this bank!", false, 1700);
    } else {
      setBubble(fighter, "I need to stop you!", false, 1700);
    }
  }

  function setBubble(fighter, text, spiky, duration) {
    fighter.bubble = {
      text,
      spiky,
      until: performance.now() + duration
    };
    if (fighter.id === "mayor" && text.length < 60) {
      speakMayor(text);
    }
  }

  function showComicText(text, x, y, color = "#111") {
    game.effects.push({
      kind: "text",
      text,
      x,
      y,
      color,
      born: performance.now(),
      until: performance.now() + 1000
    });
  }

  function addFlashLine(x1, y1, x2, y2, color, width, duration = 220) {
    game.effects.push({
      kind: "line",
      x1,
      y1,
      x2,
      y2,
      color,
      width,
      born: performance.now(),
      until: performance.now() + duration
    });
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;
    if (game) {
      if (!game.paused && !game.gameOver && performance.now() >= game.transitionUntil) {
        updateGame(dt);
      }
      drawGame();
      renderHud();
    }
    rafId = requestAnimationFrame(loop);
  }

  function updateGame(dt) {
    const now = performance.now();
    if (game.kingDockIntroUntil && now < game.kingDockIntroUntil) return;
    if (now >= game.endsAt) {
      finishLevelByTimer();
      return;
    }

    maybeShowLevel9Warning(now);
    updateFighter(game.p1, dt);
    if (game.mode === "story") updateBossAI(game.p2, game.p1, dt);
    updateFighter(game.p2, dt);
    updateHelpers(dt);
    updateEffects();
    updatePickups(dt);

    if (game.p1.health <= 0) finishByKnockout(game.p2);
    if (game.p2.health <= 0) finishByKnockout(game.p1);
  }

  function maybeShowLevel9Warning(now) {
    if (!game || game.level9WarningShown) return;
    if (game.mode !== "story" || game.world !== "abandonedDesert" || game.level !== 9) return;
    if (now < game.startedAt + 2400) return;
    game.level9WarningShown = true;
    game.dangerWarningText = "Danger is coming up: King Dock is next!";
    game.dangerWarningUntil = now + 4200;
    showComicText("DANGER!", WIDTH / 2, 188, "#d91f2e");
    setBubble(game.p2, "Something huge is coming...", true, 1900);
    playEffect("boom");
  }

  function updateEffects() {
    const now = performance.now();
    game.effects.forEach((effect) => {
      if (effect.kind === "poisonStorm") updatePoisonStorm(effect, now);
      if (effect.kind === "axeProjectile") updateAxeProjectile(effect, now);
    });
    game.effects = game.effects.filter((effect) => effect.until > now);
    [game.p1, game.p2].forEach((fighter) => {
      if (fighter.bubble && fighter.bubble.until <= now) fighter.bubble = null;
    });
  }

  function updatePickups(dt) {
    const now = performance.now();
    game.pickups.forEach((pickup) => {
      if (pickup.kind === "rewardBox") {
        pickup.z += pickup.vz * dt;
        pickup.vz -= 720 * dt;
        if (pickup.z <= 0) {
          pickup.z = 0;
          pickup.vz = 0;
        }
      }
    });
    game.pickups = game.pickups.filter((pickup) => {
      if (pickup.until <= now) return false;
      if (pickup.kind === "pitTrap") return updatePitTrap(pickup, now);
      if (pickup.kind === "fallingBatTrap") return updateFallingBatTrap(pickup, now);
      if (pickup.kind !== "rewardBox") return true;
      if (game.p1.health <= 0) return true;
      const close = distancePoint(game.p1.x, game.p1.y, pickup.x, pickup.y) < 62;
      const jumpedOn = game.p1.z > 22;
      const landed = pickup.z <= 12;
      if (!close || !jumpedOn || !landed) return true;
      collectRewardBox(game.p1, pickup);
      return false;
    });
  }

  function updatePitTrap(pickup, now) {
    if (pickup.triggered) return now < pickup.until;
    if (now < pickup.armedAt || game.p1.health <= 0) return true;
    const close = distancePoint(game.p1.x, game.p1.y, pickup.x, pickup.y) < pickup.r;
    if (!close) return true;
    if (game.p1.z > 24 || game.p1.dodgeUntil > now || !canBeHit(game.p1)) {
      showComicText("PIT DODGED", game.p1.x, game.p1.y - game.p1.z - 92, "#111");
      pickup.triggered = true;
      pickup.until = now + 360;
      return true;
    }
    game.p1.knockdownUntil = Math.max(game.p1.knockdownUntil, now + 850);
    applyDamage(game.p1, 0.5, game.p2, "PIT FALL!");
    playEffect("boom");
    pickup.triggered = true;
    pickup.until = now + 520;
    return true;
  }

  function updateFallingBatTrap(pickup, now) {
    if (pickup.hit) return now < pickup.until;
    if (now < pickup.hitAt || game.p1.health <= 0) return true;
    const close = distancePoint(game.p1.x, game.p1.y, pickup.x, pickup.y) < 72;
    pickup.hit = true;
    pickup.until = now + 440;
    if (!close) return true;
    if (game.p1.dodgeUntil > now || game.p1.duckUntil > now || game.p1.z > 42 || !canBeHit(game.p1)) {
      showComicText("BAT DODGED", game.p1.x, game.p1.y - game.p1.z - 92, "#111");
      return true;
    }
    game.p1.knockdownUntil = Math.max(game.p1.knockdownUntil, now + 700);
    applyDamage(game.p1, 0.5, game.p2, "BAT DROP!");
    playEffect("mouth");
    return true;
  }

  function inputFor(fighter) {
    const input = Object.assign({}, buttonInput[fighter.side]);
    if (fighter.side === "p1") {
      input.left = input.left || keys.KeyA;
      input.right = input.right || keys.KeyD;
      input.up = input.up || keys.KeyW;
      input.down = input.down || keys.KeyS;
      if (game && game.mode === "story") {
        input.left = input.left || keys.ArrowLeft;
        input.right = input.right || keys.ArrowRight;
        input.up = input.up || keys.ArrowUp;
        input.down = input.down || keys.ArrowDown;
      }
    } else if (!game || game.mode === "two") {
      input.left = input.left || keys.ArrowLeft;
      input.right = input.right || keys.ArrowRight;
      input.up = input.up || keys.ArrowUp;
      input.down = input.down || keys.ArrowDown;
    }
    return input;
  }

  function updateFighter(fighter, dt) {
    const now = performance.now();
    if (fighter.health <= 0) return;
    if (fighter.hiddenUntil && now >= fighter.hiddenUntil) reveal(fighter);
    if (fighter.treeClimbUntil && now >= fighter.treeClimbUntil) {
      fighter.treeClimbUntil = 0;
      if (!isFlying(fighter)) fighter.z = 0;
    }
    if (fighter.treeClimbUntil > now) {
      fighter.z = 145;
      fighter.vz = 0;
    }
    if (fighter.flyingUntil && !fighter.flyForever && now >= fighter.flyingUntil) {
      fighter.flyingUntil = 0;
      fighter.z = 0;
    }
    if (!fighter.treeClimbUntil && (fighter.z > 0 || fighter.vz > 0)) {
      fighter.z += fighter.vz * dt;
      fighter.vz -= 760 * dt;
      if (fighter.z <= 0 && !isFlying(fighter)) {
        fighter.z = 0;
        fighter.vz = 0;
      }
      if (isFlying(fighter)) {
        const maxZ = flyingHeightFor(fighter);
        fighter.z = clamp(fighter.z, 70, maxZ);
        fighter.vz = 0;
      }
    }

    if (fighter.undergroundUntil > now) return;
    if (now < fighter.knockdownUntil || now < fighter.trappedUntil) return;

    const input = inputFor(fighter);
    let dx = (input.right ? 1 : 0) - (input.left ? 1 : 0);
    let dy = (input.down ? 1 : 0) - (input.up ? 1 : 0);
    if (dx || dy) {
      const len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;
      fighter.facing = dx < 0 ? -1 : dx > 0 ? 1 : fighter.facing;
    }

    const animalForm = activeFreddyAnimal(fighter);
    const animalTraits = freddyAnimalTraits(animalForm);
    const sharkForm = activeBenjiShark(fighter);
    const sharkTraits = benjiSharkTraits(sharkForm);
    let speed = fighter.moveMode === "run" ? RUN_SPEED : WALK_SPEED;
    if (fighter.speedBoostUntil > now) speed *= 2;
    if (fighter.id === "mayor" && isFlying(fighter)) speed = WALK_SPEED;
    if (animalForm) {
      if (animalForm.speed) speed *= animalForm.speed;
      if (fighter.moveMode === "run" && animalTraits.runSpeed) speed *= animalTraits.runSpeed;
      if (animalForm.swim && inStream(fighter)) speed *= 1.35;
      if (animalForm.swim && inStream(fighter) && animalTraits.swimSpeed) speed *= animalTraits.swimSpeed;
      if (animalForm.swim && !inStream(fighter) && animalForm.category === "fish") speed *= 0.45;
      if (animalForm.low) speed *= 1.15;
      if (animalForm.small) speed *= 1.25;
    }
    if (sharkForm) {
      speed *= inStream(fighter) ? (sharkTraits.speed || 1.25) : 0.42;
      if (fighter.moveMode === "run" && inStream(fighter)) speed *= 1.18;
    }
    if (isWaterWorldActive()) {
      speed *= now < fighter.waterWalkUntil ? 1.22 : 0.92;
      if (!animalForm && !sharkForm && now < fighter.waterFormUntil) speed *= 1.08;
    }
    if (now < fighter.dodgeUntil) speed *= 2.2;
    if (fighter.isBoss && game && game.mode === "story") speed *= bossTuning().bossSpeed;

    fighter.x += dx * speed * dt;
    fighter.y += dy * speed * dt;
    fighter.x = clamp(fighter.x, 95, WIDTH - 95);
    const canSwim = isWaterWorldActive() || (animalForm && animalForm.swim) || !!sharkForm;
    fighter.y = clamp(fighter.y, 210, canSwim ? HEIGHT - 58 : HEIGHT - 124);
  }

  function bossTuning() {
    if (game && game.mode === "story" && worldIdForLevel(game.level || 1) === "waterWorld") {
      return WATER_BOSS_TUNING[Math.min(14, Math.max(11, game.level || 11))] || WATER_BOSS_TUNING[11];
    }
    if (game && game.mode === "story" && worldIdForLevel(game.level || 1) === "abandonedDesert") {
      return DESERT_BOSS_TUNING[Math.min(10, Math.max(7, game.level || 7))] || DESERT_BOSS_TUNING[7];
    }
    const level = villainPowerStageForLevel(game ? game.level || 1 : 1);
    return BOSS_LEVEL_TUNING[level] || BOSS_LEVEL_TUNING[1];
  }

  function updateBossAI(boss, target, dt) {
    const now = performance.now();
    if (boss.health <= 0 || now < boss.knockdownUntil || now < boss.trappedUntil) return;
    if (now < boss.aiNext) return;
    const tuning = bossTuning();
    boss.aiNext = now + tuning.aiDelayMin + Math.random() * tuning.aiDelayRandom;

    if (target.hiddenUntil && Math.random() < tuning.hiddenConfusion) {
      buttonInput.p2.left = Math.random() < 0.5;
      buttonInput.p2.right = !buttonInput.p2.left;
      buttonInput.p2.up = Math.random() < 0.5;
      buttonInput.p2.down = !buttonInput.p2.up;
      return;
    }

    const dx = target.x - boss.x;
    const dy = target.y - boss.y;
    boss.facing = dx < 0 ? -1 : 1;
    const d = distance(boss, target);
    const shouldApproach = d > tuning.approachDistance;
    buttonInput.p2.left = shouldApproach && dx < -80;
    buttonInput.p2.right = shouldApproach && dx > 80;
    buttonInput.p2.up = shouldApproach && dy < -60;
    buttonInput.p2.down = shouldApproach && dy > 60;
    boss.moveMode = "walk";

    if (d < 92 && Math.random() < tuning.basicChance) {
      performBasic(boss, Math.random() < 0.55 ? "punch" : "kick");
      return;
    }

    const powerReady = now >= boss.aiPowerNext;
    if (boss.id === "mayor") {
      if (powerReady && !boss.controllingBots && Math.random() < tuning.botSummonChance) aiUsePower(boss, "mayorBots");
      if (boss.controllingBots && Math.random() < tuning.botAttackChance) robotChainsaw(boss);
      if (powerReady && Math.abs(dx) < 540 && Math.random() < tuning.laserChance) aiUsePower(boss, "laserRay");
      if (powerReady && !isFlying(boss) && Math.random() < tuning.flyChance) aiUsePower(boss, "flyBoots");
    } else if (boss.id === "yapping") {
      if (powerReady && !boss.controllingMouth && Math.random() < tuning.mouthSummonChance) aiUsePower(boss, "mouthMonsters");
      if (boss.controllingMouth && Math.random() < tuning.mouthBiteChance) mouthAction(boss, "bite");
      if (boss.controllingMouth && Math.random() < tuning.mouthKickChance) mouthAction(boss, "kick");
    } else if (boss.id === "kingDock") {
      if (powerReady && (boss.charges.kingLaser || 0) > 0 && now > game.startedAt + 6500 && Math.random() < 0.32) {
        aiUsePower(boss, "kingLaser");
        return;
      }
      if (powerReady && activeGhostBatCount(boss) < 7 && Math.random() < 0.34) {
        aiUsePower(boss, "ghostBats");
        return;
      }
      if (powerReady && activeRewardBoxCount() < 4 && Math.random() < 0.24) {
        aiUsePower(boss, "trapBox");
        return;
      }
      if (powerReady && d < 190 && Math.random() < 0.58) {
        aiUsePower(boss, "kingSword");
        return;
      }
      if (powerReady && d < 260 && Math.random() < 0.42) {
        aiUsePower(boss, "kingSlam");
        return;
      }
      if (powerReady && Math.random() < 0.36) aiUsePower(boss, "kingRoar");
    } else if (boss.character.secret) {
      const power = boss.character.powers[Math.floor(Math.random() * boss.character.powers.length)];
      if (powerReady && power) aiUsePower(boss, power.id);
    }
  }

  function aiUsePower(boss, powerId) {
    usePower(boss, powerId);
    const tuning = bossTuning();
    boss.aiPowerNext = performance.now() + tuning.powerDelayMin + Math.random() * tuning.powerDelayRandom;
  }

  function updateHelpers(dt) {
    const now = performance.now();
    const toRemove = new Set();
    game.helpers.forEach((helper) => {
      const owner = helper.owner;
      const target = opponentOf(owner);
      if (!owner || owner.health <= 0) {
        toRemove.add(helper);
        return;
      }

      if (helper.kind === "bot") {
        if (!owner.controllingBots) {
          toRemove.add(helper);
          return;
        }
        updateBot(helper, owner, target, dt);
      } else if (helper.kind === "mouth") {
        if (helper.main && !owner.controllingMouth) {
          followOwner(helper, owner, dt);
        } else if (!helper.main && !owner.controllingMouth) {
          toRemove.add(helper);
        } else {
          updateMouth(helper, owner, target, dt);
        }
      } else if (helper.kind === "ghostBat") {
        if (helper.until && now > helper.until) {
          toRemove.add(helper);
        } else {
          updateGhostBat(helper, owner, target, dt);
        }
      }
      helper.x = clamp(helper.x, 70, WIDTH - 70);
      helper.y = clamp(helper.y, 205, HEIGHT - 80);
      helper.actionUntil = Math.max(helper.actionUntil || 0, 0);
    });
    game.helpers = game.helpers.filter((helper) => !toRemove.has(helper));
  }

  function updateBot(helper, owner, target, dt) {
    const input = inputFor(owner);
    let dx = (input.botRight ? 1 : 0) - (input.botLeft ? 1 : 0);
    let dy = (input.botDown ? 1 : 0) - (input.botUp ? 1 : 0);
    if (owner.isBoss) {
      dx = Math.sign(target.x - helper.x);
      dy = Math.sign(target.y - helper.y);
    }
    if (dx || dy) {
      const len = Math.hypot(dx, dy) || 1;
      const speed = 215 * (owner.isBoss ? bossTuning().helperSpeed : 1);
      helper.x += (dx / len) * speed * dt;
      helper.y += (dy / len) * speed * dt;
      helper.facing = dx < 0 ? -1 : dx > 0 ? 1 : helper.facing;
    }
    if (helper.z < 70) helper.z += 150 * dt;
  }

  function updateMouth(helper, owner, target, dt) {
    if (helper.main && !owner.controllingMouth) {
      followOwner(helper, owner, dt);
      return;
    }
    const dir = helper.facing || owner.facing;
    const tuning = owner.isBoss ? bossTuning().helperSpeed : 1;
    const speed = (helper.speedUntil > performance.now() ? 260 : 150) * tuning;
    helper.x += dir * speed * dt;
    helper.y += Math.sin(performance.now() / 260 + helper.index) * 18 * dt;
    if (helper.flyUntil > performance.now()) helper.z = 86;
    else helper.z = Math.max(0, helper.z - 90 * dt);
    if (helper.x < 90 || helper.x > WIDTH - 90) helper.facing *= -1;
  }

  function updateGhostBat(helper, owner, target, dt) {
    const now = performance.now();
    const orbit = helper.index - 3;
    const flap = Math.sin(now / 165 + helper.phase);
    const goalX = target.x + orbit * 44 + Math.sin(now / 520 + helper.phase) * 34;
    const goalY = target.y - 8 + Math.cos(now / 480 + helper.phase) * 26;
    const speed = 2.4 + bossTuning().helperSpeed * 0.45;
    helper.x += (goalX - helper.x) * Math.min(1, dt * speed);
    helper.y += (goalY - helper.y) * Math.min(1, dt * speed);
    helper.z = 70 + flap * 12;
    helper.facing = target.x < helper.x ? -1 : 1;
    if (now < (target.batBumpedUntil || 0)) return;
    if (distancePoint(helper.x, helper.y, target.x, target.y) > 52 || Math.abs(helper.z - target.z) > 105) return;
    helper.action = "bite";
    helper.actionUntil = now + 380;
    target.batBumpedUntil = now + 1700;
    if (target.dodgeUntil > now || target.duckUntil > now || !canBeHit(target)) {
      showComicText("BAT DODGED", target.x, target.y - target.z - 92, "#111");
      return;
    }
    target.knockdownUntil = Math.max(target.knockdownUntil, now + 420);
    target.x = clamp(target.x + helper.facing * -22, 95, WIDTH - 95);
    applyDamage(target, 0.5, owner, "BAT BUMP!");
    playEffect("mouth");
  }

  function followOwner(helper, owner, dt) {
    const goalX = owner.x - owner.facing * 58;
    const goalY = owner.y + 26;
    helper.x += (goalX - helper.x) * Math.min(1, dt * 6);
    helper.y += (goalY - helper.y) * Math.min(1, dt * 6);
    helper.z += (owner.z - helper.z) * Math.min(1, dt * 5);
    helper.facing = owner.facing;
  }

  function performBasic(fighter, type) {
    const now = performance.now();
    if (!canAct(fighter)) return;
    reveal(fighter);
    fighter.action = type;
    fighter.actionUntil = now + 260;
    const animalForm = activeFreddyAnimal(fighter);
    const animalTraits = freddyAnimalTraits(animalForm);
    const sharkForm = activeBenjiShark(fighter);
    const sharkTraits = benjiSharkTraits(sharkForm);
    if (sharkForm && type === "jump") {
      benjiSharkBreach(fighter, sharkForm, sharkTraits);
      return;
    }
    if (animalForm && type === "jump" && (animalForm.feature === "gorilla" || animalForm.jump)) {
      freddyAnimalJump(fighter, animalForm);
      return;
    }
    if (type === "jump") {
      jump(fighter);
      return;
    }
    if (type === "duck") {
      fighter.duckUntil = now + 650;
      fighter.actionUntil = fighter.duckUntil;
      if (sharkForm && inStream(fighter)) {
        fighter.hiddenUntil = now + 1300;
        showComicText("DIVE", fighter.x, fighter.y - fighter.z - 70, fighter.character.accent);
      }
      if (animalForm && (animalTraits.shellDuck || animalForm.shield)) {
        fighter.shieldHits = Math.max(fighter.shieldHits, animalTraits.puff ? 2 : 1);
        showComicText("BLOCK", fighter.x, fighter.y - fighter.z - 92, fighter.character.accent);
        playEffect("shield");
      }
      if (isFlying(fighter) && fighter.id === "fary") {
        fighter.flyForever = false;
        fighter.flyingUntil = 0;
        fighter.z = 0;
      }
      return;
    }
    if (type === "dodge") {
      fighter.dodgeUntil = now + 340;
      fighter.actionUntil = fighter.dodgeUntil;
      const dodgeDistance = sharkForm ? (sharkTraits.dodgeDistance || 128) : animalTraits.slideDodge ? 138 : animalTraits.dodgeDistance || 48;
      fighter.x += fighter.facing * dodgeDistance;
      if (animalTraits.flash) flashNear(fighter);
      if (animalTraits.hotTrail) heatTrail(fighter);
      playEffect("whoosh");
      return;
    }
    if (type === "hide") {
      if (fighter.id === "ness") {
        superHide(fighter);
        return;
      }
      if (animalForm && (animalTraits.hideAnywhere || animalForm.hide)) {
        fighter.hiddenUntil = now + (animalTraits.hideDuration || 5500);
        fighter.action = "hide";
        fighter.actionUntil = fighter.hiddenUntil;
        playEffect("whoosh");
        return;
      }
      tryHide(fighter);
      return;
    }
    if (animalForm && (type === "punch" || type === "kick")) {
      freddyAnimalAttack(fighter, animalForm, type);
      return;
    }
    if (sharkForm && (type === "punch" || type === "kick")) {
      benjiSharkAttack(fighter, sharkForm, sharkTraits, type);
      return;
    }
    if (fighter.id === "ness" && fighter.treeClimbUntil > now && (type === "punch" || type === "kick")) {
      treeAttack(fighter);
      return;
    }

    const target = opponentOf(fighter);
    const range = type === "kick" ? 92 : 78;
    if (type === "punch" || type === "kick") faceAttackTarget(fighter, target, range + 80);
    const damage = 0.5;
    hitHelpersNear(fighter, range);
    if (isInFront(fighter, target, range) && canBeHit(target)) {
      applyDamage(target, damage, fighter, type === "kick" ? "WHACK!" : "POW!");
      playEffect(type === "kick" ? "whack" : "pow");
    } else {
      showComicText(type === "kick" ? "WHIFF" : "MISS", fighter.x + fighter.facing * 62, fighter.y - fighter.z - 80, "#4c4c4c");
      playEffect("tap");
    }
  }

  function jump(fighter) {
    if (fighter.z > 8 && !isFlying(fighter)) return;
    fighter.vz = 420;
    fighter.action = "jump";
    fighter.actionUntil = performance.now() + 500;
    reveal(fighter);
  }

  function canAct(fighter) {
    const now = performance.now();
    return fighter.health > 0 && now >= fighter.knockdownUntil && now >= fighter.trappedUntil && now >= fighter.undergroundUntil;
  }

  function tryHide(fighter) {
    const spot = game.obstacles.find((obstacle) => obstacleDistance(fighter, obstacle) < 65);
    if (!spot) {
      showComicText("No hide spot", fighter.x, fighter.y - 88, "#111");
      return;
    }
    fighter.hiddenUntil = performance.now() + 20000;
    fighter.action = "hide";
    fighter.actionUntil = fighter.hiddenUntil;
    setBubble(fighter, "Shhh...", false, 1000);
  }

  function reveal(fighter) {
    if (fighter.hiddenUntil) {
      fighter.hiddenUntil = 0;
      if (fighter.action === "hide") fighter.action = "";
    }
  }

  function usePower(fighter, powerId) {
    const now = performance.now();
    if (!canAct(fighter)) return;
    const power = fighterPowers(fighter).find((item) => item.id === powerId);
    if (!power && !isHelperPower(powerId)) return;

    if (!isHelperPower(powerId)) {
      if (!canUsePower(fighter, powerId)) {
        showComicText("Recharging", fighter.x, fighter.y - fighter.z - 100, "#d91f2e");
        return;
      }
      spendPower(fighter, powerId);
    }

    reveal(fighter);
    fighter.action = "power";
    fighter.actionUntil = now + 420;
    fighter.lastPowerUsedAt = now;
    fighter.lastPowerId = powerId;
    showPowerCue(fighter, power ? power.name : powerId, 950);

    switch (powerId) {
      case "freddyMammal":
        toggleFreddyCategory(fighter, "mammal");
        break;
      case "freddyReptile":
        toggleFreddyCategory(fighter, "reptile");
        break;
      case "freddyBird":
        toggleFreddyCategory(fighter, "bird");
        break;
      case "freddyAmphibian":
        toggleFreddyCategory(fighter, "amphibian");
        break;
      case "freddyFish":
        toggleFreddyCategory(fighter, "fish");
        break;
      case "freddyInsect":
        toggleFreddyCategory(fighter, "insect");
        break;
      case "freddyMultiply":
        freddyMultiply(fighter);
        break;
      case "superGiantPunch":
        superGiantPunch(fighter);
        break;
      case "superAxeThrow":
        superAxeThrow(fighter);
        break;
      case "benjiTornado":
        benjiTornado(fighter);
        break;
      case "benjiTeleport":
        benjiTeleport(fighter);
        break;
      case "benjiSharks":
        toggleBenjiSharks(fighter);
        break;
      case "flyBoots":
        fighter.flyingUntil = now + 60000;
        fighter.flyForever = false;
        fighter.z = Math.max(fighter.z, flyingHeightFor(fighter));
        setBubble(fighter, "Flying boots!", false, 1200);
        playEffect("fly");
        break;
      case "mayorBots":
        toggleMayorBots(fighter);
        break;
      case "laserRay":
        laserRay(fighter);
        break;
      case "giantPunch":
        giantPunch(fighter);
        break;
      case "smash":
        smash(fighter);
        break;
      case "gorillaJump":
        gorillaJump(fighter);
        break;
      case "wingGust":
        wingGust(fighter);
        break;
      case "fly":
        momFly(fighter);
        break;
      case "takeoff":
        takeoffJump(fighter);
        break;
      case "appleShot":
        appleShot(fighter);
        break;
      case "appleTornado":
        appleTornado(fighter);
        break;
      case "appleLightning":
        appleLightning(fighter);
        break;
      case "appleSpeed":
        appleSpeed(fighter);
        break;
      case "cheetahSpeed":
        cheetahSpeed(fighter);
        break;
      case "cheetahClaws":
        cheetahClaws(fighter);
        break;
      case "mouthMonsters":
        toggleMouthMonsters(fighter);
        break;
      case "crayonBarrage":
        simpleProjectilePower(fighter, "CRAYON!", "#21a36c", 0.5);
        break;
      case "colorShield":
      case "hoodieShield":
        fighter.shieldHits = 1;
        setBubble(fighter, "Shield!", false, 1200);
        playEffect("shield");
        break;
      case "scribbleDash":
      case "staticSlide":
        fighter.dodgeUntil = now + 520;
        fighter.x += fighter.facing * 130;
        showComicText("ZIP!", fighter.x, fighter.y - fighter.z - 78, fighter.character.accent);
        playEffect("whoosh");
        break;
      case "zipZap":
        appleLightning(fighter, "ZAP!");
        break;
      case "paperCyclone":
        trapTarget(fighter, 3000, "PAPER!");
        break;
      case "vanish":
        fighter.hiddenUntil = now + 6000;
        setBubble(fighter, "Gone!", false, 900);
        break;
      case "eraserBeam":
        simpleProjectilePower(fighter, "ERASE!", "#4f5668", 0.5);
        break;
      case "freezeBlock":
        freezeBlock(fighter);
        break;
      case "burrowStrike":
        burrowStrike(fighter);
        break;
      case "poisonStorm":
        poisonStorm(fighter);
        break;
      case "superKick":
        superKick(fighter);
        break;
      case "superHide":
        superHide(fighter);
        break;
      case "treeClimb":
        treeClimb(fighter);
        break;
      case "kingSword":
        kingSword(fighter);
        break;
      case "kingSlam":
        kingSlam(fighter);
        break;
      case "kingLaser":
        kingLaser(fighter);
        break;
      case "ghostBats":
        summonGhostBats(fighter);
        break;
      case "trapBox":
        kingTrapBox(fighter);
        break;
      case "kingRoar":
        kingRoar(fighter);
        break;
      case "waterBoots":
      case "tidalPunch":
      case "bubbleWings":
      case "juiceWave":
      case "seaMouth":
      case "iceFeet":
      case "waterHide":
      case "paintRaft":
      case "staticSurf":
      case "mistVanish":
        waterWorldPower(fighter, powerId);
        break;
      default:
        break;
    }
    renderControls(true);
  }

  function isHelperPower(id) {
    return ["botChainsaw", "mouthBite", "mouthKick", "mouthJump", "mouthFly"].includes(id);
  }

  function showPowerCue(fighter, text, duration = 900) {
    fighter.powerCue = text;
    fighter.powerCueBorn = performance.now();
    fighter.powerCueUntil = fighter.powerCueBorn + duration;
  }

  function maxChargesForPower(power) {
    return power && power.maxCharges ? power.maxCharges : 3;
  }

  function canUsePower(fighter, powerId) {
    const now = performance.now();
    const power = fighterPowers(fighter).find((item) => item.id === powerId);
    if (power && power.noRecharge) return true;
    if (fighter.charges[powerId] === undefined) fighter.charges[powerId] = maxChargesForPower(power);
    if (fighter.cooldowns[powerId] === undefined) fighter.cooldowns[powerId] = 0;
    if (fighter.cooldowns[powerId] && fighter.cooldowns[powerId] > now) return false;
    if (fighter.charges[powerId] <= 0) {
      fighter.cooldowns[powerId] = now + rechargeFor(fighter);
      return false;
    }
    return true;
  }

  function spendPower(fighter, powerId) {
    const power = fighterPowers(fighter).find((item) => item.id === powerId);
    if (power && power.noRecharge) return;
    fighter.charges[powerId] = Math.max(0, fighter.charges[powerId] - 1);
    if (fighter.charges[powerId] <= 0) {
      fighter.cooldowns[powerId] = performance.now() + rechargeFor(fighter);
      if (!power || !power.noRefill) setTimeout(() => refillPower(fighter, powerId), rechargeFor(fighter) + 40);
    }
  }

  function refillPower(fighter, powerId) {
    if (!game) return;
    const power = fighterPowers(fighter).find((item) => item.id === powerId);
    if (power && power.noRefill) return;
    fighter.charges[powerId] = maxChargesForPower(power);
    fighter.cooldowns[powerId] = 0;
    renderControls(true);
  }

  function rechargeFor(fighter) {
    return fighter.isBoss && fighter.id === "mayor" ? MAYOR_BOSS_RECHARGE : POWER_RECHARGE;
  }

  function flyingHeightFor(fighter) {
    const base = fighter.id === "mayor" ? 95 : 110;
    return base + (game ? (stageLevelFor(game.level) - 1) * 22 : 0);
  }

  function isFlying(fighter) {
    return fighter.flyForever || fighter.flyingUntil > performance.now() || fighter.z > 52;
  }

  function toggleFreddyCategory(fighter, category) {
    fighter.animalCategory = fighter.animalCategory === category ? "" : category;
    const name = FREDDY_CATEGORY_NAMES[category] || "Animals";
    setBubble(fighter, `${name} animals!`, false, 1000);
    playEffect("whoosh");
    renderControls(true);
  }

  function activeFreddyAnimal(fighter) {
    return fighter && fighter.id === "freddy" ? fighter.animalForm : null;
  }

  function freddyAnimalTraits(animalForm) {
    return animalForm ? (FREDDY_ANIMAL_TRAITS[animalForm.name] || {}) : {};
  }

  function transformFreddy(fighter, animalForm) {
    const current = fighter.animalForm;
    if (current && current.name === animalForm.name) {
      fighter.animalForm = null;
      fighter.animalCategory = "";
      fighter.flyForever = false;
      fighter.flyingUntil = 0;
      fighter.z = 0;
      setBubble(fighter, "Back to Freddy!", false, 1000);
      showComicText("FREDDY", fighter.x, fighter.y - fighter.z - 105, fighter.character.color);
    } else {
      fighter.animalForm = animalForm;
      fighter.animalCategory = "";
      fighter.flyForever = !!animalForm.fly;
      fighter.flyingUntil = 0;
      if (animalForm.fly) fighter.z = Math.max(fighter.z, flyingHeightFor(fighter));
      else fighter.z = isSwimmingAnimal(animalForm) && inStream(fighter) ? 10 : 0;
      if (animalForm.shield) fighter.shieldHits = Math.max(fighter.shieldHits, 1);
      setBubble(fighter, animalForm.name, false, 1000);
      showComicText(animalForm.name.toUpperCase(), fighter.x, fighter.y - fighter.z - 105, fighter.character.color);
    }
    playEffect(animalForm.fly ? "fly" : "whoosh");
    renderControls(true);
  }

  function toggleBenjiSharks(fighter) {
    fighter.sharkChooserOpen = !fighter.sharkChooserOpen;
    setBubble(fighter, fighter.sharkChooserOpen ? "Pick a shark!" : "Sharks closed.", false, 1000);
    playEffect("splash");
    renderControls(true);
  }

  function activeBenjiShark(fighter) {
    return fighter && fighter.id === "benji" ? fighter.sharkForm : null;
  }

  function benjiSharkTraits(sharkForm) {
    return sharkForm || {};
  }

  function transformBenjiShark(fighter, sharkForm) {
    const now = performance.now();
    if (fighter.sharkForm && fighter.sharkForm.name === sharkForm.name) {
      transformBenjiBack(fighter);
      return;
    }
    if (fighter.sharkCooldownUntil > now) {
      showComicText("Recharging", fighter.x, fighter.y - fighter.z - 100, "#d91f2e");
      return;
    }
    fighter.sharkForm = sharkForm;
    fighter.sharkChooserOpen = false;
    fighter.sharkCooldownUntil = now + POWER_RECHARGE;
    fighter.flyForever = false;
    fighter.flyingUntil = 0;
    fighter.z = 0;
    if (!isWaterWorldActive()) {
      fighter.y = Math.max(fighter.y, 626);
      fighter.x = fighter.side === "p1" ? Math.max(fighter.x, 470) : Math.min(fighter.x, WIDTH - 470);
    }
    if (sharkForm.power === "shield") fighter.shieldHits = Math.max(fighter.shieldHits, 1);
    setBubble(fighter, sharkForm.name, false, 1100);
    showComicText(sharkForm.name.toUpperCase(), fighter.x, fighter.y - 102, fighter.character.accent);
    playEffect("splash");
    setTimeout(() => renderControls(true), POWER_RECHARGE + 40);
    renderControls(true);
  }

  function transformBenjiBack(fighter) {
    fighter.sharkForm = null;
    fighter.sharkChooserOpen = false;
    fighter.z = 0;
    setBubble(fighter, "Back to Benji!", false, 1000);
    showComicText("BENJI", fighter.x, fighter.y - 105, fighter.character.color);
    playEffect("whoosh");
    renderControls(true);
  }

  function freddyMultiply(fighter) {
    const now = performance.now();
    const animalForm = activeFreddyAnimal(fighter);
    fighter.health = Math.min(fighter.maxHealth, Math.round((fighter.health + 1) * 2) / 2);
    fighter.shieldHits = Math.max(fighter.shieldHits, 1);
    [-1, 1].forEach((side, index) => {
      game.effects.push({
        kind: "freddyDuplicate",
        x: fighter.x + side * 74,
        y: fighter.y + (index ? 22 : -14),
        z: fighter.z,
        facing: side,
        animalForm,
        born: now,
        until: now + 1800
      });
    });
    showComicText("x3!", fighter.x, fighter.y - fighter.z - 118, fighter.character.accent);
    setBubble(fighter, "Multiplication!", false, 1000);
    playEffect("whoosh");
  }

  function freddyAnimalJump(fighter, animalForm) {
    if (animalForm.feature === "gorilla") {
      gorillaJump(fighter);
      return;
    }
    const traits = freddyAnimalTraits(animalForm);
    fighter.vz = animalForm.fly ? 0 : traits.jumpVz || 520;
    fighter.z = Math.max(fighter.z, animalForm.fly ? flyingHeightFor(fighter) : 20);
    fighter.x += fighter.facing * (traits.jumpDistance || (animalForm.jump ? 92 : 42));
    fighter.action = "jump";
    fighter.actionUntil = performance.now() + 520;
    playEffect("whoosh");
  }

  function freddyAnimalAttack(fighter, animalForm, type) {
    const traits = freddyAnimalTraits(animalForm);
    if (traits.waterLine || traits.shockLine || animalForm.waterShot) {
      freddyAnimalLineAttack(fighter, animalForm, traits);
      return;
    }
    const target = opponentOf(fighter);
    const range = traits.attackRange || (animalForm.strong ? 105 : animalForm.small ? 58 : 85);
    faceAttackTarget(fighter, target, range + 80);
    if (traits.chargeDistance && type === "kick") fighter.x += fighter.facing * traits.chargeDistance;
    const label = animalForm.feature === "bite" || animalForm.feature === "claws" || animalForm.strong
      ? (type === "kick" ? "CLAW!" : "BITE!")
      : type === "kick" ? "WHACK!" : "POW!";
    hitHelpersNear(fighter, range);
    if (isInFront(fighter, target, range) && canBeHit(target)) {
      const damage = traits.heavyHit || traits.biteBoost || traits.stab || (traits.kickBoost && type === "kick") ? 0.5 : 0.5;
      applyDamage(target, damage, fighter, label);
      applyFreddyAnimalAfterHit(fighter, target, animalForm, traits);
      playEffect(type === "kick" ? "whack" : "pow");
    } else {
      showComicText("MISS", fighter.x + fighter.facing * 62, fighter.y - fighter.z - 80, "#4c4c4c");
      playEffect("tap");
    }
  }

  function freddyAnimalLineAttack(fighter, animalForm, traits) {
    if (animalForm.waterShot || traits.waterLine) {
      archerfishShot(fighter, animalForm, traits);
      return;
    }
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, WIDTH);
    const y = fighter.y - fighter.z - 48;
    const endX = fighter.x + fighter.facing * (traits.attackRange || 250);
    addFlashLine(fighter.x + fighter.facing * 24, y, endX, y, "#f4d44e", 7, 260);
    hitHelpersAlongLine(fighter, fighter.x + fighter.facing * 24, y, endX, y, 52);
    playEffect("laser");
    if (Math.sign(target.x - fighter.x) === fighter.facing && Math.abs(target.y - fighter.y) < 115 && canBeHit(target)) {
      applyDamage(target, 0.5, fighter, "ZAP!");
      applyFreddyAnimalAfterHit(fighter, target, animalForm, traits);
    }
  }

  function archerfishShot(fighter, animalForm, traits = {}) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, WIDTH);
    const y = fighter.y - fighter.z - 34;
    const reach = traits.attackRange || 420;
    const endX = fighter.x + fighter.facing * reach;
    addFlashLine(fighter.x + fighter.facing * 22, y, endX, y - 28, "#45a6db", 7, 270);
    hitHelpersAlongLine(fighter, fighter.x + fighter.facing * 22, y, endX, y - 28, 52);
    playEffect("splash");
    if (Math.sign(target.x - fighter.x) === fighter.facing && Math.abs(target.y - fighter.y) < 125 && Math.abs(target.x - fighter.x) < reach && canBeHit(target)) {
      applyDamage(target, 0.5, fighter, "WATER SHOT!");
      applyFreddyAnimalAfterHit(fighter, target, animalForm, traits);
    } else {
      showComicText("SPLASH!", fighter.x + fighter.facing * 95, y - 25, "#45a6db");
    }
  }

  function applyFreddyAnimalAfterHit(fighter, target, animalForm, traits) {
    const now = performance.now();
    if (traits.knockdown) target.knockdownUntil = Math.max(target.knockdownUntil, now + traits.knockdown);
    if (traits.trap) target.trappedUntil = Math.max(target.trappedUntil, now + traits.trap);
    if (traits.poison) {
      target.knockdownUntil = Math.max(target.knockdownUntil, now + 450);
      showComicText("STING!", target.x, target.y - target.z - 86, fighter.character.accent);
    }
    if (traits.lure) target.trappedUntil = Math.max(target.trappedUntil, now + 1300);
    if (traits.tailWhip || traits.peck) showComicText(traits.peck ? "PECK!" : "WHIP!", target.x, target.y - target.z - 86, fighter.character.accent);
    if (animalForm.name === "Mosquito" && fighter.health < fighter.maxHealth) {
      fighter.health = Math.min(fighter.maxHealth, Math.round((fighter.health + 0.5) * 2) / 2);
      showComicText("+", fighter.x, fighter.y - fighter.z - 110, fighter.character.accent);
    }
  }

  function flashNear(fighter) {
    const target = opponentOf(fighter);
    addFlashLine(fighter.x - 38, fighter.y - fighter.z - 118, fighter.x + 38, fighter.y - fighter.z - 38, "#f5ef6a", 9, 220);
    if (distance(fighter, target) < 150) target.knockdownUntil = Math.max(target.knockdownUntil, performance.now() + 650);
  }

  function heatTrail(fighter) {
    game.effects.push({
      kind: "splash",
      x: fighter.x - fighter.facing * 70,
      y: fighter.y - fighter.z - 42,
      facing: -fighter.facing,
      color: "#ff7a19",
      born: performance.now(),
      until: performance.now() + 340
    });
  }

  function isSwimmingAnimal(animalForm) {
    return !!(animalForm && animalForm.swim);
  }

  function inStream(fighter) {
    return isWaterWorldActive() || fighter.y > 600;
  }

  function toggleMayorBots(fighter) {
    fighter.controllingBots = !fighter.controllingBots;
    if (fighter.controllingBots) {
      spawnBots(fighter);
      setBubble(fighter, "Mayor bots!", false, 1100);
      playEffect("bot");
    } else {
      game.helpers = game.helpers.filter((helper) => !(helper.kind === "bot" && helper.owner === fighter));
    }
    renderControls(true);
  }

  function spawnBots(fighter) {
    game.helpers = game.helpers.filter((helper) => !(helper.kind === "bot" && helper.owner === fighter));
    const count = helperCountFor(fighter, "bot");
    for (let i = 0; i < count; i += 1) {
      game.helpers.push({
        kind: "bot",
        owner: fighter,
        index: i,
        x: fighter.x - fighter.facing * (58 + i * 18),
        y: fighter.y + (i % 2 ? 32 : -28),
        z: 65,
        facing: fighter.facing,
        action: "",
        actionUntil: 0
      });
    }
  }

  function helperCountFor(fighter, kind) {
    let base = 3;
    if (fighter.isBoss) {
      const stage = villainPowerStageForLevel(game.level);
      if (kind === "bot") base = stage === 1 ? 3 : stage === 2 ? 6 : 10;
      if (kind === "mouth") base = stage === 1 ? 3 : stage === 2 ? 6 : 10;
      if (fighter.health >= 3) {
        const bonus = Math.min(2, Math.floor((performance.now() - game.startedAt) / 45000));
        base += bonus;
      }
    }
    return Math.max(1, base - fighter.helperPenaltyNow - fighter.helperPenaltyNext);
  }

  function laserRay(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, WIDTH);
    const startX = fighter.x + fighter.facing * 38;
    const startY = fighter.y - fighter.z - 82;
    const endX = fighter.facing > 0 ? WIDTH - 90 : 90;
    addFlashLine(startX, startY, endX, startY, "#e7192d", 9, 260);
    hitHelpersAlongLine(fighter, startX, startY, endX, startY, 56);
    playEffect("laser");
    if (Math.sign(target.x - fighter.x) !== fighter.facing) return;
    const vertical = Math.abs((target.y - target.z - 66) - startY);
    if (vertical > 74) return;
    if (isAvoidingLaser(target)) {
      showComicText("DODGED", target.x, target.y - target.z - 100, "#111");
      return;
    }
    applyDamage(target, 1, fighter, "ZAP!");
  }

  function isAvoidingLaser(target) {
    const now = performance.now();
    return now < target.dodgeUntil ||
      now < target.duckUntil ||
      target.z > 18 ||
      target.hiddenUntil > now ||
      target.action === "power";
  }

  function robotChainsaw(fighter) {
    if (!fighter.controllingBots) return;
    const target = opponentOf(fighter);
    showPowerCue(fighter, "Chainsaw", 720);
    let hits = 0;
    game.helpers.forEach((helper) => {
      if (helper.kind !== "bot" || helper.owner !== fighter) return;
      helper.action = "chainsaw";
      helper.actionUntil = performance.now() + 420;
      if (distancePoint(helper.x, helper.y, target.x, target.y) < 86 && canBeHit(target)) hits += 1;
    });
    if (hits) {
      applyDamage(target, hits >= 2 ? 1 : 0.5, fighter, hits >= 2 ? "DOUBLE SAW!" : "SAW!");
      playEffect("whack");
    } else {
      showComicText("SAW!", fighter.x + fighter.facing * 80, fighter.y - 120, "#111");
      playEffect("tap");
    }
  }

  function giantPunch(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 150);
    fighter.action = "giantPunch";
    fighter.actionUntil = performance.now() + 420;
    hitHelpersNear(fighter, 120);
    if (isInFront(fighter, target, 130) && canBeHit(target)) {
      applyDamage(target, 1, fighter, "BOOM BOOM POW!");
      playEffect("pow");
    } else {
      showComicText("WHOOSH", fighter.x + fighter.facing * 95, fighter.y - fighter.z - 90, "#111");
    }
  }

  function superGiantPunch(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 210);
    fighter.action = "giantPunch";
    fighter.actionUntil = performance.now() + 560;
    hitHelpersNear(fighter, 170);
    game.effects.push({
      kind: "circle",
      x: fighter.x + fighter.facing * 95,
      y: fighter.y - fighter.z - 74,
      r: 88,
      color: "#ffd84a",
      born: performance.now(),
      until: performance.now() + 420
    });
    if (isInFront(fighter, target, 180) && canBeHit(target)) {
      const damage = Math.max(0.5, Math.round(target.maxHealth * 0.5 * 2) / 2);
      applyDamage(target, damage, fighter, "SUPER GIANT PUNCH!");
      playEffect("boom");
    } else {
      showComicText("SUPER WHOOSH", fighter.x + fighter.facing * 120, fighter.y - fighter.z - 90, "#111");
      playEffect("whoosh");
    }
  }

  function smash(fighter) {
    const target = opponentOf(fighter);
    fighter.action = "smash";
    fighter.actionUntil = performance.now() + 520;
    game.effects.push({
      kind: "circle",
      x: fighter.x,
      y: fighter.y,
      r: 155 + stageLevelFor(game.level) * 8,
      color: "#177bd1",
      born: performance.now(),
      until: performance.now() + 360
    });
    playEffect("boom");
    hitHelpersNear(fighter, 165);
    if (distance(fighter, target) < 158 + stageLevelFor(game.level) * 8 && target.z < 18 && canBeHit(target)) {
      applyDamage(target, 0.5, fighter, "SMASH!");
    } else {
      showComicText("JUMP SAFE", target.x, target.y - target.z - 88, "#111");
    }
  }

  function gorillaJump(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 260);
    fighter.action = "gorillaJump";
    fighter.actionUntil = performance.now() + 620;
    fighter.x += fighter.facing * 96;
    fighter.z = Math.max(fighter.z, 75);
    playEffect("whoosh");
    setTimeout(() => {
      if (!game || fighter.health <= 0 || target.health <= 0) return;
      if (distance(fighter, target) < 125) {
        if (target.z > 45 || isFlying(target)) {
          target.z = 0;
          target.flyingUntil = 0;
          target.flyForever = false;
          target.knockdownUntil = performance.now() + 900;
          showComicText("FALL!", target.x, target.y - 96, "#111");
        } else {
          applyDamage(target, 0.5, fighter, "THUMP!");
        }
      }
      fighter.z = 0;
    }, 420);
  }

  function wingGust(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 240);
    fighter.action = "gust";
    fighter.actionUntil = performance.now() + 520;
    game.effects.push({
      kind: "gust",
      x: fighter.x,
      y: fighter.y - fighter.z - 62,
      facing: fighter.facing,
      born: performance.now(),
      until: performance.now() + 480
    });
    playEffect("whoosh");
    hitHelpersInFront(fighter, 205, 130, 130, "POOF!");
    if (isInFront(fighter, target, 190) && Math.abs(target.y - fighter.y) < 120 && canBeHit(target)) {
      target.knockdownUntil = performance.now() + 5000;
      setBubble(target, target.character.role === "villain" ? "How dare you!" : "Stop right there!", true, 1100);
    }
  }

  function momFly(fighter) {
    fighter.flyForever = true;
    fighter.flyingUntil = 0;
    fighter.z = flyingHeightFor(fighter);
    setBubble(fighter, "Wings up!", false, 1000);
    playEffect("fly");
  }

  function takeoffJump(fighter) {
    fighter.z = Math.max(fighter.z, 80);
    fighter.dodgeUntil = performance.now() + 650;
    fighter.x += fighter.facing * 54;
    setBubble(fighter, "Takeoff!", false, 900);
    playEffect("fly");
  }

  function appleShot(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 240);
    fighter.action = "appleShot";
    fighter.actionUntil = performance.now() + 420;
    game.effects.push({
      kind: "splash",
      x: fighter.x + fighter.facing * 88,
      y: fighter.y - fighter.z - 70,
      facing: fighter.facing,
      color: "#f58b21",
      born: performance.now(),
      until: performance.now() + 420
    });
    playEffect("splash");
    hitHelpersInFront(fighter, 220, 120, 135, "SPLASH!");
    if (isInFront(fighter, target, 210) && Math.abs(target.y - fighter.y) < 110 && canBeHit(target)) {
      if (performance.now() < target.duckUntil) {
        showComicText("DUCKED", target.x, target.y - target.z - 90, "#111");
      } else {
        applyDamage(target, 0.5, fighter, "SPLASH!");
      }
    }
  }

  function appleTornado(fighter) {
    trapTarget(fighter, 5000, "TORNADO!");
  }

  function trapTarget(fighter, duration, label) {
    const target = opponentOf(fighter);
    game.effects.push({
      kind: "tornado",
      x: target.x,
      y: target.y - target.z - 50,
      color: fighter.character.accent,
      born: performance.now(),
      until: performance.now() + duration
    });
    playEffect("tornado");
    hitHelpersNearTarget(fighter, target.x, target.y, 135, "POOF!");
    if (performance.now() < target.dodgeUntil) {
      showComicText("DODGED", target.x, target.y - target.z - 90, "#111");
      return;
    }
    target.trappedUntil = performance.now() + duration;
    showComicText(label, target.x, target.y - target.z - 95, fighter.character.accent);
  }

  function appleLightning(fighter, label = "ZAP!") {
    const target = opponentOf(fighter);
    addFlashLine(target.x - 38, target.y - target.z - 180, target.x + 22, target.y - target.z - 62, "#ffcf54", 8, 260);
    playEffect("laser");
    hitHelpersNearTarget(fighter, target.x, target.y, 120, "ZAP!");
    if (canBeHit(target)) {
      target.knockdownUntil = performance.now() + 1000;
      applyDamage(target, 0.5, fighter, label);
    }
  }

  function appleSpeed(fighter) {
    const stage = stageLevelFor(game.level);
    const duration = (stage === 1 ? 30 : stage === 2 ? 45 : 60) * 1000;
    fighter.speedBoostUntil = performance.now() + duration;
    setBubble(fighter, "Apple juice speed!", false, 1200);
    showComicText("SPEED x2", fighter.x, fighter.y - fighter.z - 100, "#f58b21");
    playEffect("speed");
  }

  function cheetahSpeed(fighter) {
    fighter.speedBoostUntil = performance.now() + 30000;
    fighter.dodgeUntil = Math.max(fighter.dodgeUntil, performance.now() + 260);
    setBubble(fighter, "Super fast!", false, 1000);
    showComicText("CHEETAH SPEED!", fighter.x, fighter.y - fighter.z - 100, "#f5c242");
    playEffect("speed");
  }

  function cheetahClaws(fighter) {
    const target = opponentOf(fighter);
    const now = performance.now();
    const range = 118;
    faceAttackTarget(fighter, target, range + 88);
    fighter.action = "punch";
    fighter.actionUntil = now + 420;
    hitHelpersNear(fighter, range);
    addFlashLine(
      fighter.x + fighter.facing * 34,
      fighter.y - fighter.z - 88,
      fighter.x + fighter.facing * 104,
      fighter.y - fighter.z - 48,
      "#171216",
      6,
      190
    );
    addFlashLine(
      fighter.x + fighter.facing * 36,
      fighter.y - fighter.z - 62,
      fighter.x + fighter.facing * 108,
      fighter.y - fighter.z - 26,
      "#f5c242",
      5,
      190
    );
    playEffect("whack");
    if (isInFront(fighter, target, range) && canBeHit(target)) {
      applyDamage(target, 0.5, fighter, "CLAW!");
    } else {
      showComicText("SWIPE", fighter.x + fighter.facing * 72, fighter.y - fighter.z - 80, "#4c4c4c");
    }
  }

  function freezeBlock(fighter) {
    const target = opponentOf(fighter);
    const now = performance.now();
    target.trappedUntil = Math.max(target.trappedUntil, now + 20000);
    game.effects.push({
      kind: "iceBlock",
      target,
      color: fighter.character.accent,
      born: now,
      until: now + 20000
    });
    setBubble(fighter, "Freeze block!", false, 1000);
    showComicText("FROZEN!", target.x, target.y - target.z - 105, "#146e8f");
    playEffect("shield");
  }

  function superAxeThrow(fighter) {
    const target = opponentOf(fighter);
    const now = performance.now();
    faceAttackTarget(fighter, target, WIDTH);
    const y = fighter.y - fighter.z - 82;
    game.effects.push({
      kind: "axeProjectile",
      owner: fighter,
      x: fighter.x + fighter.facing * 48,
      y,
      groundY: fighter.y,
      facing: fighter.facing,
      speed: 720,
      hit: false,
      born: now,
      last: now,
      until: now + 1900
    });
    fighter.action = "punch";
    fighter.actionUntil = now + 380;
    setBubble(fighter, "Axe throw!", false, 850);
    playEffect("whoosh");
  }

  function updateAxeProjectile(effect, now) {
    if (!effect.owner || !game || effect.hit) return;
    const dt = Math.min(0.05, (now - (effect.last || now)) / 1000);
    effect.last = now;
    effect.x += effect.facing * effect.speed * dt;
    if (effect.x < 40 || effect.x > WIDTH - 40) {
      effect.until = now;
      return;
    }
    if (hitHelpersAtProjectile(effect.owner, effect.x, effect.y, effect.groundY, 56, "AXE!")) {
      effect.hit = true;
      effect.until = now + 160;
      return;
    }
    const target = opponentOf(effect.owner);
    if (!target || target.health <= 0) return;
    const targetY = target.y - target.z - 82;
    const straightOn = Math.abs(targetY - effect.y) < 44 && Math.abs(target.y - effect.groundY) < 68;
    const close = Math.abs(target.x - effect.x) < 44;
    if (!straightOn || !close) return;
    effect.hit = true;
    effect.until = now + 160;
    if (target.duckUntil > now || target.dodgeUntil > now || !canBeHit(target)) {
      showComicText("DODGED", target.x, target.y - target.z - 96, "#111");
      return;
    }
    applyDamage(target, 1, effect.owner, "AXE HIT!");
    target.knockdownUntil = Math.max(target.knockdownUntil, now + 700);
    playEffect("whack");
  }

  function burrowStrike(fighter) {
    const target = opponentOf(fighter);
    const now = performance.now();
    fighter.undergroundUntil = now + 780;
    fighter.hiddenUntil = Math.max(fighter.hiddenUntil || 0, now + 780);
    fighter.action = "burrow";
    fighter.actionUntil = now + 980;
    game.effects.push({
      kind: "burrow",
      x1: fighter.x,
      y1: fighter.y,
      x2: target.x - target.facing * 48,
      y2: target.y + 12,
      color: "#7b4d25",
      born: now,
      until: now + 980
    });
    setBubble(fighter, "Underground!", false, 900);
    playEffect("whoosh");
    setTimeout(() => {
      if (!game || fighter.health <= 0 || target.health <= 0) return;
      fighter.x = clamp(target.x - target.facing * 54, 95, WIDTH - 95);
      fighter.y = clamp(target.y + 8, 210, HEIGHT - 124);
      fighter.facing = target.x > fighter.x ? 1 : -1;
      fighter.hiddenUntil = 0;
      fighter.undergroundUntil = 0;
      showComicText("BURROW STRIKE!", fighter.x, fighter.y - 105, fighter.character.accent);
      if (distance(fighter, target) < 120 && canBeHit(target)) {
        target.knockdownUntil = Math.max(target.knockdownUntil, performance.now() + 900);
        applyDamage(target, 0.5, fighter, "UNDERGROUND HIT!");
      }
    }, 760);
  }

  function poisonStorm(fighter) {
    const target = opponentOf(fighter);
    const now = performance.now();
    const drops = Array.from({ length: 12 }, (_, index) => ({
      x: clamp(target.x + ((index % 5) - 2) * 34 + (Math.random() * 28 - 14), 90, WIDTH - 90),
      y: clamp(target.y + (index % 3) * 18 - 18, 230, HEIGHT - 110),
      hitAt: now + 620 + index * 430,
      hit: false
    }));
    game.effects.push({
      kind: "poisonStorm",
      target,
      owner: fighter,
      drops,
      color: "#53d44e",
      born: now,
      until: now + 6800
    });
    setBubble(fighter, "Poison storm!", false, 1100);
    playEffect("laser");
  }

  function updatePoisonStorm(effect, now) {
    const target = effect.target;
    if (!target || target.health <= 0) return;
    effect.drops.forEach((drop) => {
      if (drop.hit || now < drop.hitAt) return;
      drop.hit = true;
      if (distancePoint(drop.x, drop.y, target.x, target.y) > 72) return;
      if (target.dodgeUntil > now) {
        showComicText("DODGED", target.x, target.y - target.z - 92, "#111");
        return;
      }
      if (canBeHit(target)) applyDamage(target, 0.5, effect.owner || { character: { accent: effect.color } }, "POISON DROP!");
    });
  }

  function superKick(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 145);
    fighter.action = "kick";
    fighter.actionUntil = performance.now() + 520;
    fighter.x += fighter.facing * 42;
    hitHelpersNear(fighter, 125);
    if (isInFront(fighter, target, 132) && canBeHit(target)) {
      applyDamage(target, 1, fighter, "SUPER KICK!");
      playEffect("whack");
    } else {
      showComicText("KICK MISS", fighter.x + fighter.facing * 82, fighter.y - fighter.z - 90, "#111");
      playEffect("tap");
    }
  }

  function superHide(fighter) {
    fighter.hiddenUntil = performance.now() + 40000;
    fighter.action = "hide";
    fighter.actionUntil = fighter.hiddenUntil;
    setBubble(fighter, "Super hide!", false, 1000);
    playEffect("whoosh");
  }

  function treeClimb(fighter) {
    const trees = game.obstacles.filter((obstacle) => obstacle.type === "tree");
    const nearest = trees.sort((a, b) => obstacleDistance(fighter, a) - obstacleDistance(fighter, b))[0];
    if (!nearest) {
      showComicText("No tree", fighter.x, fighter.y - 88, "#111");
      return;
    }
    fighter.x = nearest.x;
    fighter.y = nearest.y + 18;
    fighter.z = 145;
    fighter.vz = 0;
    fighter.treeClimbUntil = performance.now() + 14000;
    fighter.action = "treeClimb";
    fighter.actionUntil = fighter.treeClimbUntil;
    showComicText("TREE TOP!", fighter.x, fighter.y - fighter.z - 85, fighter.character.accent);
    setBubble(fighter, "Tree climb!", false, 900);
    playEffect("whoosh");
  }

  function treeAttack(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 210);
    fighter.action = "kick";
    fighter.actionUntil = performance.now() + 500;
    fighter.treeClimbUntil = 0;
    fighter.z = 95;
    fighter.vz = -60;
    fighter.x = clamp(fighter.x + fighter.facing * 115, 95, WIDTH - 95);
    game.effects.push({
      kind: "gust",
      x: fighter.x - fighter.facing * 44,
      y: fighter.y - 128,
      facing: fighter.facing,
      born: performance.now(),
      until: performance.now() + 360
    });
    setTimeout(() => {
      if (!game || fighter.health <= 0 || target.health <= 0) return;
      if (distance(fighter, target) < 150 && canBeHit(target)) {
        target.knockdownUntil = Math.max(target.knockdownUntil, performance.now() + 850);
        applyDamage(target, 0.5, fighter, "FROM ABOVE!");
      } else {
        showComicText("MISS", fighter.x, fighter.y - fighter.z - 90, "#111");
      }
      fighter.z = 0;
      fighter.vz = 0;
    }, 300);
  }

  function kingSword(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 240);
    fighter.action = "punch";
    fighter.actionUntil = performance.now() + 520;
    fighter.x = clamp(fighter.x + fighter.facing * 78, 95, WIDTH - 95);
    addFlashLine(fighter.x + fighter.facing * 20, fighter.y - fighter.z - 150, fighter.x + fighter.facing * 148, fighter.y - fighter.z - 54, "#7d43d6", 10, 300);
    setBubble(fighter, "King slash!", true, 950);
    if (isInFront(fighter, target, 178) && canBeHit(target)) {
      target.knockdownUntil = Math.max(target.knockdownUntil, performance.now() + 900);
      applyDamage(target, 1, fighter, "KING SLASH!");
      playEffect("whack");
    } else {
      showComicText("SLASH!", fighter.x + fighter.facing * 112, fighter.y - fighter.z - 100, fighter.character.accent);
      playEffect("whoosh");
    }
  }

  function kingSlam(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 260);
    fighter.action = "smash";
    fighter.actionUntil = performance.now() + 620;
    game.effects.push({
      kind: "circle",
      x: fighter.x + fighter.facing * 46,
      y: fighter.y - 28,
      r: 130,
      color: fighter.character.color,
      born: performance.now(),
      until: performance.now() + 380
    });
    setBubble(fighter, "Gorilla slam!", true, 950);
    if (distancePoint(fighter.x + fighter.facing * 48, fighter.y, target.x, target.y) < 150 && target.z < 38 && canBeHit(target)) {
      target.knockdownUntil = Math.max(target.knockdownUntil, performance.now() + 1150);
      applyDamage(target, 0.5, fighter, "GORILLA SLAM!");
      playEffect("boom");
    } else {
      showComicText("BOOM!", fighter.x + fighter.facing * 52, fighter.y - 88, fighter.character.accent);
      playEffect("boom");
    }
  }

  function kingLaser(fighter) {
    const target = opponentOf(fighter);
    const now = performance.now();
    faceAttackTarget(fighter, target, WIDTH);
    fighter.action = "kingLaser";
    fighter.actionUntil = now + 1500;
    fighter.laserHandUntil = now + 1500;
    const y = fighter.y - fighter.z - 80;
    const startX = fighter.x + fighter.facing * 220;
    const endX = fighter.facing > 0 ? WIDTH - 70 : 70;
    game.effects.push({
      kind: "giantLaserWarn",
      x1: startX,
      y1: y,
      x2: endX,
      y2: y,
      color: "#ff5fa8",
      born: now,
      until: now + 850
    });
    setBubble(fighter, "GIANT LASER!", true, 1450);
    showComicText("LASER CHARGE!", fighter.x + fighter.facing * 82, y - 38, fighter.character.accent);
    playEffect("laser");
    setTimeout(() => {
      if (!game || fighter.health <= 0 || target.health <= 0) return;
      fireKingLaser(fighter);
    }, 850);
  }

  function fireKingLaser(fighter) {
    const target = opponentOf(fighter);
    const now = performance.now();
    faceAttackTarget(fighter, target, WIDTH);
    const startX = fighter.x + fighter.facing * 220;
    const y = fighter.y - fighter.z - 80;
    const endX = fighter.facing > 0 ? WIDTH - 60 : 60;
    game.effects.push({
      kind: "giantLaserBeam",
      x1: startX,
      y1: y,
      x2: endX,
      y2: y,
      facing: fighter.facing,
      color: "#d91f2e",
      born: now,
      until: now + 420
    });
    playEffect("boom");
    const inLine = Math.sign(target.x - fighter.x) === fighter.facing && Math.abs((target.y - target.z - 72) - y) < 155;
    if (!inLine || !canBeHit(target)) {
      showComicText("LASER MISS", fighter.x + fighter.facing * 170, y - 30, fighter.character.accent);
      return;
    }
    if (target.dodgeUntil > now || target.duckUntil > now || target.z > 105 || target.hiddenUntil > now) {
      showComicText("LASER DODGED", target.x, target.y - target.z - 100, "#111");
      return;
    }
    target.knockdownUntil = Math.max(target.knockdownUntil, now + 1400);
    applyDamage(target, 1, fighter, "GIANT LASER!");
  }

  function summonGhostBats(fighter) {
    const now = performance.now();
    const current = game.helpers.filter((helper) => helper.kind === "ghostBat" && helper.owner === fighter);
    const needed = Math.max(0, 7 - current.length);
    if (!needed) {
      showComicText("BATS READY", fighter.x, fighter.y - fighter.z - 140, fighter.character.accent);
      return;
    }
    const startIndex = current.length;
    for (let i = 0; i < needed; i += 1) {
      const index = startIndex + i;
      game.helpers.push({
        kind: "ghostBat",
        owner: fighter,
        index,
        x: fighter.x - fighter.facing * (70 + index * 12),
        y: fighter.y - 20 + (i % 2 ? 34 : -28),
        z: 82,
        facing: fighter.facing,
        phase: Math.random() * Math.PI * 2,
        action: "",
        actionUntil: 0,
        until: now + 26000
      });
    }
    setBubble(fighter, "Rack creatures!", true, 1100);
    showComicText("RACK CREATURES!", fighter.x, fighter.y - fighter.z - 142, fighter.character.accent);
    playEffect("mouth");
  }

  function activeGhostBatCount(fighter) {
    if (!game || !game.helpers) return 0;
    return game.helpers.filter((helper) => helper.kind === "ghostBat" && helper.owner === fighter).length;
  }

  function kingTrapBox(fighter) {
    if (activeRewardBoxCount() >= 5) {
      showComicText("BOX WAIT", fighter.x, fighter.y - fighter.z - 140, fighter.character.accent);
      return;
    }
    const now = performance.now();
    const target = opponentOf(fighter);
    const x = clamp(target.x + (Math.random() * 190 - 95), 120, WIDTH - 120);
    const y = clamp(target.y + (Math.random() * 120 - 60), 250, HEIGHT - 132);
    spawnKingDockRewardBox(x, y, now, { drop: true });
    setBubble(fighter, "Trap box!", true, 1100);
    showComicText("BOX DROP!", x, y - 130, fighter.character.accent);
    playEffect("shield");
  }

  function kingRoar(fighter) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, WIDTH);
    fighter.action = "power";
    fighter.actionUntil = performance.now() + 580;
    game.effects.push({
      kind: "gust",
      x: fighter.x + fighter.facing * 40,
      y: fighter.y - fighter.z - 96,
      facing: fighter.facing,
      born: performance.now(),
      until: performance.now() + 430
    });
    setBubble(fighter, "ROYAL ROAR!", true, 1000);
    if (isInFront(fighter, target, 240) && canBeHit(target)) {
      target.knockdownUntil = Math.max(target.knockdownUntil, performance.now() + 1200);
      showComicText("STUNNED", target.x, target.y - target.z - 100, fighter.character.accent);
    }
    playEffect("mouth");
  }

  function waterWorldPower(fighter, powerId) {
    const now = performance.now();
    const target = opponentOf(fighter);
    fighter.waterFormUntil = Math.max(fighter.waterFormUntil || 0, now + 18000);
    if (powerId === "iceFeet") {
      fighter.waterWalkUntil = now + 26000;
      fighter.shieldHits = Math.max(fighter.shieldHits, 1);
      fighter.z = Math.max(fighter.z, 10);
      game.effects.push({
        kind: "icePath",
        x: fighter.x,
        y: fighter.y + 10,
        color: fighter.character.accent,
        born: now,
        until: now + 1800
      });
      setBubble(fighter, "Ice feet!", false, 1000);
      showComicText("ICE FEET!", fighter.x, fighter.y - fighter.z - 108, fighter.character.accent);
      playEffect("shield");
      return;
    }
    if (powerId === "bubbleWings") {
      fighter.flyForever = true;
      fighter.flyingUntil = 0;
      fighter.z = flyingHeightFor(fighter);
      game.effects.push({
        kind: "waterBurst",
        x: fighter.x,
        y: fighter.y - 58,
        color: "#9eeeff",
        born: now,
        until: now + 900
      });
      setBubble(fighter, "Bubble wings!", false, 1100);
      playEffect("fly");
      return;
    }
    if (powerId === "waterHide" || powerId === "mistVanish") {
      fighter.hiddenUntil = now + (powerId === "waterHide" ? 12000 : 8000);
      game.effects.push({
        kind: "waterBurst",
        x: fighter.x,
        y: fighter.y - 45,
        color: "#67d4ff",
        born: now,
        until: now + 900
      });
      setBubble(fighter, powerId === "waterHide" ? "Water hide!" : "Mist vanish!", false, 1000);
      playEffect("whoosh");
      return;
    }
    if (powerId === "waterBoots" || powerId === "staticSurf" || powerId === "paintRaft") {
      faceAttackTarget(fighter, target, 320);
      fighter.waterWalkUntil = now + 18000;
      fighter.dodgeUntil = now + 650;
      fighter.x = clamp(fighter.x + fighter.facing * (powerId === "waterBoots" ? 150 : 118), 95, WIDTH - 95);
      game.effects.push({
        kind: "splash",
        x: fighter.x - fighter.facing * 55,
        y: fighter.y - 42,
        facing: -fighter.facing,
        color: powerId === "staticSurf" ? "#ffd84a" : powerId === "paintRaft" ? "#ff5fa8" : "#45a6db",
        born: now,
        until: now + 420
      });
      if (isInFront(fighter, target, 145) && canBeHit(target)) {
        applyDamage(target, 0.5, fighter, powerId === "staticSurf" ? "STATIC SURF!" : "SURF HIT!");
      } else {
        showComicText("SURF!", fighter.x, fighter.y - fighter.z - 92, fighter.character.accent);
      }
      playEffect(powerId === "staticSurf" ? "laser" : "splash");
      return;
    }

    faceAttackTarget(fighter, target, WIDTH);
    const labels = {
      tidalPunch: "TIDAL PUNCH!",
      juiceWave: "JUICE WAVE!",
      seaMouth: "SEA MOUTH!"
    };
    const colors = {
      tidalPunch: "#177bd1",
      juiceWave: "#f58b21",
      seaMouth: "#d91f2e"
    };
    const y = fighter.y - fighter.z - 62;
    const reach = powerId === "seaMouth" ? 250 : 360;
    addFlashLine(fighter.x + fighter.facing * 28, y, fighter.x + fighter.facing * reach, y + 16, colors[powerId] || "#45a6db", 10, 320);
    game.effects.push({
      kind: "waterBurst",
      x: fighter.x + fighter.facing * 90,
      y: fighter.y - 45,
      color: colors[powerId] || "#45a6db",
      born: now,
      until: now + 600
    });
    hitHelpersAlongLine(fighter, fighter.x + fighter.facing * 28, y, fighter.x + fighter.facing * reach, y + 16, 58);
    if (Math.sign(target.x - fighter.x) === fighter.facing && Math.abs(target.y - fighter.y) < 125 && Math.abs(target.x - fighter.x) < reach && canBeHit(target)) {
      applyDamage(target, 0.5, fighter, labels[powerId] || "WAVE!");
      if (powerId === "seaMouth") target.trappedUntil = Math.max(target.trappedUntil, now + 1300);
    } else {
      showComicText("WAVE!", fighter.x + fighter.facing * 105, y - 22, fighter.character.accent);
    }
    playEffect("splash");
  }

  function benjiTornado(fighter) {
    trapTarget(fighter, 4200, "TORNADO!");
  }

  function benjiTeleport(fighter) {
    const target = opponentOf(fighter);
    const now = performance.now();
    const oldX = fighter.x;
    const oldY = fighter.y;
    const side = target.facing || -fighter.facing || 1;
    const maxY = activeBenjiShark(fighter) ? HEIGHT - 58 : HEIGHT - 124;
    fighter.x = clamp(target.x - side * 150, 95, WIDTH - 95);
    fighter.y = clamp(target.y + (target.y > HEIGHT / 2 ? -72 : 72), 210, maxY);
    fighter.z = 0;
    fighter.facing = target.x > fighter.x ? 1 : -1;
    fighter.dodgeUntil = now + 650;
    game.effects.push({
      kind: "circle",
      x: oldX,
      y: oldY - 58,
      r: 74,
      color: fighter.character.accent,
      born: now,
      until: now + 360
    }, {
      kind: "circle",
      x: fighter.x,
      y: fighter.y - 58,
      r: 74,
      color: fighter.character.color,
      born: now,
      until: now + 360
    });
    setBubble(fighter, "Teleport!", false, 900);
    showComicText("WHOOSH", fighter.x, fighter.y - 108, fighter.character.accent);
    playEffect("whoosh");
  }

  function benjiSharkAttack(fighter, sharkForm, traits, type) {
    const target = opponentOf(fighter);
    const range = traits.range || 126;
    faceAttackTarget(fighter, target, range + 110);
    if (traits.power === "dash" || type === "kick") fighter.x += fighter.facing * (inStream(fighter) ? 72 : 34);
    game.effects.push({
      kind: "splash",
      x: fighter.x + fighter.facing * 38,
      y: fighter.y - 52,
      facing: fighter.facing,
      color: "#45a6db",
      born: performance.now(),
      until: performance.now() + 360
    });
    hitHelpersNear(fighter, range);
    if (isInFront(fighter, target, range) && canBeHit(target)) {
      applyDamage(target, 0.5, fighter, type === "kick" ? "TAIL SLAP!" : "CHOMP!");
      if (traits.power === "stun") target.knockdownUntil = Math.max(target.knockdownUntil, performance.now() + 1200);
      if (traits.power === "shield") fighter.shieldHits = Math.max(fighter.shieldHits, 1);
      playEffect("splash");
    } else {
      showComicText(inStream(fighter) ? "SPLASH!" : "GET TO STREAM", fighter.x + fighter.facing * 66, fighter.y - 82, fighter.character.accent);
      playEffect("tap");
    }
  }

  function benjiSharkBreach(fighter, sharkForm, traits) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, 250);
    fighter.action = "jump";
    fighter.actionUntil = performance.now() + 560;
    fighter.z = Math.max(fighter.z, inStream(fighter) ? 92 : 28);
    fighter.x += fighter.facing * (traits.power === "dash" ? 142 : 104);
    game.effects.push({
      kind: "splash",
      x: fighter.x - fighter.facing * 40,
      y: fighter.y - 38,
      facing: -fighter.facing,
      color: "#45a6db",
      born: performance.now(),
      until: performance.now() + 430
    });
    playEffect("splash");
    setTimeout(() => {
      if (!game || fighter.health <= 0 || target.health <= 0) return;
      if (distance(fighter, target) < (traits.range || 126) && canBeHit(target)) {
        applyDamage(target, 0.5, fighter, "BREACH!");
        target.knockdownUntil = Math.max(target.knockdownUntil, performance.now() + 700);
      }
      fighter.z = 0;
    }, 330);
  }

  function toggleMouthMonsters(fighter) {
    fighter.controllingMouth = !fighter.controllingMouth;
    if (fighter.controllingMouth) {
      spawnExtraMouths(fighter);
      setBubble(fighter, "Mouth monsters!", false, 1100);
      playEffect("mouth");
    } else {
      game.helpers = game.helpers.filter((helper) => !(helper.kind === "mouth" && helper.owner === fighter && !helper.main));
    }
    renderControls(true);
  }

  function spawnMainMouth(fighter) {
    game.helpers.push({
      kind: "mouth",
      main: true,
      owner: fighter,
      index: 0,
      x: fighter.x - fighter.facing * 56,
      y: fighter.y + 24,
      z: fighter.z,
      facing: fighter.facing,
      action: "",
      actionUntil: 0,
      speedUntil: 0,
      flyUntil: 0
    });
  }

  function spawnExtraMouths(fighter) {
    game.helpers = game.helpers.filter((helper) => !(helper.kind === "mouth" && helper.owner === fighter && !helper.main));
    const count = helperCountFor(fighter, "mouth");
    for (let i = 0; i < count; i += 1) {
      game.helpers.push({
        kind: "mouth",
        main: false,
        owner: fighter,
        index: i + 1,
        x: fighter.x - fighter.facing * (70 + i * 26),
        y: fighter.y + (i % 2 ? 42 : -35),
        z: fighter.z,
        facing: fighter.facing,
        action: "",
        actionUntil: 0,
        speedUntil: 0,
        flyUntil: 0
      });
    }
  }

  function mouthAction(fighter, action) {
    if (!fighter.controllingMouth) return;
    const target = opponentOf(fighter);
    const mouths = game.helpers.filter((helper) => helper.kind === "mouth" && helper.owner === fighter);
    if (!mouths.length) return;
    showPowerCue(fighter, `Mouth ${action}`, 720);
    mouths.forEach((mouth) => {
      mouth.facing = Math.sign(target.x - mouth.x) || fighter.facing;
      mouth.action = action;
      mouth.actionUntil = performance.now() + 520;
      if (action === "jump") mouth.speedUntil = performance.now() + 1800;
      if (action === "fly") {
        mouth.flyUntil = performance.now() + 2600;
        mouth.z = 90;
      }
      if (action === "bite" || action === "fly") {
        mouth.x += mouth.facing * 62;
      }
    });
    if (action === "bite" || action === "fly") {
      const hits = mouths.some((mouth) => distancePoint(mouth.x, mouth.y, target.x, target.y) < 78 && Math.abs(mouth.z - target.z) < 80);
      if (hits && canBeHit(target)) {
        applyDamage(target, 1, fighter, "BITE!");
        playEffect("mouth");
      } else {
        showComicText("CHOMP", fighter.x + fighter.facing * 80, fighter.y - fighter.z - 90, "#d61f2f");
      }
    }
    if (action === "kick") {
      const hits = mouths.some((mouth) => distancePoint(mouth.x, mouth.y, target.x, target.y) < 86);
      if (hits && canBeHit(target)) {
        target.knockdownUntil = performance.now() + 5000;
        setBubble(target, target.character.role === "villain" ? "Oh, that hurts!" : "Please don't do that!", true, 1100);
        playEffect("whack");
      }
    }
  }

  function simpleProjectilePower(fighter, label, color, damage) {
    const target = opponentOf(fighter);
    faceAttackTarget(fighter, target, WIDTH);
    const startX = fighter.x + fighter.facing * 35;
    const startY = fighter.y - fighter.z - 75;
    const endY = target.y - target.z - 72;
    addFlashLine(startX, startY, target.x, endY, color, 7, 250);
    hitHelpersAlongLine(fighter, startX, startY, target.x, endY, 52);
    if (canBeHit(target)) applyDamage(target, damage, fighter, label);
    playEffect("laser");
  }

  function hitHelpersNear(fighter, range) {
    const opponent = opponentOf(fighter);
    game.helpers = game.helpers.filter((helper) => {
      if (helper.owner !== opponent) return true;
      if (distancePoint(fighter.x + fighter.facing * 45, fighter.y, helper.x, helper.y) < range + 25) {
        return !destroyHelper(helper, "WHACK!");
      }
      return true;
    });
  }

  function hitHelpersInFront(fighter, range, yRange = 120, zRange = 120, label = "POOF!") {
    const opponent = opponentOf(fighter);
    game.helpers = game.helpers.filter((helper) => {
      if (helper.owner !== opponent) return true;
      const dx = helper.x - fighter.x;
      if (Math.sign(dx) !== fighter.facing && Math.abs(dx) > 32) return true;
      if (Math.abs(dx) < range && Math.abs(helper.y - fighter.y) < yRange && Math.abs(helper.z - fighter.z) < zRange) {
        return !destroyHelper(helper, label);
      }
      return true;
    });
  }

  function hitHelpersNearTarget(fighter, x, y, range, label = "POOF!") {
    const opponent = opponentOf(fighter);
    game.helpers = game.helpers.filter((helper) => {
      if (helper.owner !== opponent) return true;
      if (distancePoint(helper.x, helper.y, x, y) < range) {
        return !destroyHelper(helper, label);
      }
      return true;
    });
  }

  function hitHelpersAlongLine(fighter, x1, y1, x2, y2, radius = 54) {
    const opponent = opponentOf(fighter);
    game.helpers = game.helpers.filter((helper) => {
      if (helper.owner !== opponent) return true;
      const helperY = helper.y - helper.z - 42;
      if (distancePointToSegment(helper.x, helperY, x1, y1, x2, y2) < radius) {
        return !destroyHelper(helper, "POOF!");
      }
      return true;
    });
  }

  function hitHelpersAtProjectile(fighter, x, screenY, groundY, radius = 56, label = "POOF!") {
    const opponent = opponentOf(fighter);
    let hit = false;
    game.helpers = game.helpers.filter((helper) => {
      if (helper.owner !== opponent) return true;
      const helperY = helper.y - helper.z - 42;
      const close = Math.abs(helper.x - x) < radius && Math.abs(helperY - screenY) < radius && Math.abs(helper.y - groundY) < 92;
      if (!close) return true;
      hit = true;
      return !destroyHelper(helper, label);
    });
    return hit;
  }

  function destroyHelper(helper, label = "POOF!") {
    showComicText(helper.kind === "ghostBat" ? "BAT POOF!" : label, helper.x, helper.y - helper.z - 60, "#111");
    game.effects.push({
      kind: "circle",
      x: helper.x,
      y: helper.y - helper.z - 34,
      r: helper.kind === "ghostBat" ? 44 : 36,
      color: helper.kind === "ghostBat" ? "#c8b9ff" : "#ffd84a",
      born: performance.now(),
      until: performance.now() + 300
    });
    playEffect(helper.kind === "ghostBat" ? "whoosh" : "whack");
    return true;
  }

  function canBeHit(target) {
    const now = performance.now();
    return target.health > 0 && now >= target.dodgeUntil && now >= target.undergroundUntil;
  }

  function tunedDamageAmount(target, amount, source) {
    if (target && target.id === "kingDock" && source && source.damageBonusUntil > performance.now()) {
      amount += 0.5;
    }
    if (game && game.mode === "story" && source && source.isBoss && target && target.side === "p1") {
      return Math.min(amount, bossTuning().maxDamage);
    }
    return amount;
  }

  function applyDamage(target, amount, source, label) {
    if (target.shieldHits > 0) {
      target.shieldHits -= 1;
      showComicText("BLOCK", target.x, target.y - target.z - 100, "#111");
      playEffect("shield");
      return;
    }
    amount = tunedDamageAmount(target, amount, source);
    const oldHealth = target.health;
    target.health = Math.max(0, Math.round((target.health - amount) * 2) / 2);
    const actualLost = Math.max(0, oldHealth - target.health);
    reveal(target);
    const hitColor = source && source.character && source.character.accent ? source.character.accent : "#111";
    showComicText(label, target.x, target.y - target.z - 100, hitColor);
    if (actualLost > 0) {
      triggerHitFeedback(target, source, actualLost);
      playEffect(actualLost >= 1 ? "bigHit" : "hit");
    }
    const hitLine = target.character.role === "villain" ? "Oh, that hurts. How dare you!" : (Math.random() < 0.5 ? "Please don't do that!" : "Stop right there!");
    setBubble(target, hitLine, true, 1300);
    maybeStealKingDockHeart(target, source, actualLost);
    maybeSpawnKingDockBox(target, source, actualLost);
    maybeReduceBossHelpers(target, oldHealth);
  }

  function triggerHitFeedback(target, source, amount) {
    const now = performance.now();
    const sourceX = source && Number.isFinite(source.x) ? source.x : target.x - target.facing * 70;
    const sourceY = source && Number.isFinite(source.y) ? source.y : target.y;
    const dx = Math.sign(target.x - sourceX) || -target.facing || 1;
    const dy = Math.sign(target.y - sourceY) || 0;
    const force = amount >= 1 ? 30 : 18;
    target.x = clamp(target.x + dx * force, 84, WIDTH - 84);
    target.y = clamp(target.y + dy * force * 0.4, 245, HEIGHT - 86);
    target.hitFlashUntil = now + (amount >= 1 ? 430 : 320);
    target.hitShakeUntil = now + 320;
    target.hurtUntil = now + 520;
    game.screenShakeUntil = Math.max(game.screenShakeUntil || 0, now + (amount >= 1 ? 260 : 160));
    game.screenShakePower = Math.max(game.screenShakePower || 0, amount >= 1 ? 8 : 4);
    addFlashLine(
      target.x - dx * 44,
      target.y - target.z - 70,
      target.x + dx * 30,
      target.y - target.z - 48,
      amount >= 1 ? "#d91f2e" : "#ffd84a",
      amount >= 1 ? 9 : 6,
      190
    );
  }

  function maybeStealKingDockHeart(target, source, amount) {
    if (!game || target.id !== "kingDock" || !source || source.side !== "p1" || amount <= 0) return;
    const now = performance.now();
    const maxHealth = source.maxHealth || source.health;
    const healed = Math.min(amount, Math.max(0, maxHealth - source.health));
    if (healed > 0) source.health = Math.min(maxHealth, Math.round((source.health + healed) * 2) / 2);
    game.effects.push({
      kind: "heartSteal",
      fromX: target.x,
      fromY: target.y - target.z - 120,
      toX: source.x,
      toY: source.y - source.z - 112,
      amount,
      born: now,
      until: now + 850
    });
    showComicText("HEART STEAL!", source.x, source.y - source.z - 126, "#ff5fa8");
    playEffect("shield");
  }

  function maybeSpawnKingDockBox(target, source, amount) {
    const now = performance.now();
    if (!game || target.id !== "kingDock" || target.health <= 0) return;
    if (!source || source.side !== "p1") return;
    if (amount <= 0) return;
    const count = amount >= 1 ? 3 : 2;
    const spread = 74 + Math.random() * 28;
    const angleStart = Math.random() * Math.PI * 2;
    for (let i = 0; i < count; i += 1) {
      const angle = angleStart + (Math.PI * 2 * i) / count;
      const x = clamp(target.x + Math.cos(angle) * spread, 110, WIDTH - 110);
      const y = clamp(target.y + 24 + Math.sin(angle) * spread * 0.58, 250, HEIGHT - 132);
      spawnKingDockRewardBox(x, y, now + i * 35, { drop: false, boobyTrap: false, specialPrize: true });
    }
    trimRewardBoxes(16);
  }

  function spawnKingDockRewardBox(x, y, now, options = {}) {
    const boxCount = game.kingDockBoxCount || 0;
    const item = options.item || KING_DOCK_PRIZES[boxCount % KING_DOCK_PRIZES.length].id;
    game.kingDockBoxCount = boxCount + 1;
    game.pickups.push({
      kind: "rewardBox",
      item,
      x,
      y,
      z: options.drop ? 430 : 70,
      vz: options.drop ? -70 : 250,
      born: now,
      until: now + (options.drop ? 18000 : 15000),
      boobyTrap: options.boobyTrap !== false,
      specialPrize: !!options.specialPrize,
      droppedByKing: !!options.drop
    });
    if (options.boobyTrap !== false) spawnKingDockBoxTraps(x, y, now);
    showComicText(options.drop ? "DROP BOX!" : options.specialPrize ? "SPECIAL PRIZE!" : "BOX!", x, y - (options.drop ? 126 : 82), "#ffd84a");
    playEffect("shield");
  }

  function activeRewardBoxCount() {
    if (!game || !game.pickups) return 0;
    return game.pickups.filter((pickup) => pickup.kind === "rewardBox").length;
  }

  function trimRewardBoxes(limit) {
    if (!game || !game.pickups) return;
    const boxes = game.pickups.filter((pickup) => pickup.kind === "rewardBox");
    if (boxes.length <= limit) return;
    const toRemove = boxes
      .sort((a, b) => a.born - b.born)
      .slice(0, boxes.length - limit);
    game.pickups = game.pickups.filter((pickup) => !toRemove.includes(pickup));
  }

  function spawnKingDockBoxTraps(boxX, boxY, now) {
    const firstSide = Math.random() < 0.5 ? -1 : 1;
    const pitX = clamp(boxX + firstSide * (70 + Math.random() * 36), 115, WIDTH - 115);
    const pitY = clamp(boxY + (Math.random() * 64 - 32), 245, HEIGHT - 130);
    const batX = clamp(boxX - firstSide * (48 + Math.random() * 54), 115, WIDTH - 115);
    const batY = clamp(boxY + (Math.random() * 76 - 38), 245, HEIGHT - 130);
    game.pickups.push({
      kind: "pitTrap",
      x: pitX,
      y: pitY,
      z: 0,
      r: 48,
      born: now,
      armedAt: now + 850,
      until: now + 9000,
      triggered: false
    }, {
      kind: "fallingBatTrap",
      x: batX,
      y: batY,
      z: 0,
      born: now,
      hitAt: now + 1250,
      until: now + 9000,
      hit: false
    });
    showComicText("TRAPS!", boxX, boxY - 118, "#7d43d6");
  }

  function collectRewardBox(fighter, pickup) {
    const now = performance.now();
    if (pickup.item === "ironSword") {
      fighter.damageBonusUntil = now + 22000;
      setBubble(fighter, "Iron sword!", false, 1000);
      showComicText("IRON SWORD!", fighter.x, fighter.y - fighter.z - 112, "#d9edf2");
      playEffect("laser");
      return;
    }
    if (pickup.item === "armor") {
      fighter.shieldHits = Math.max(fighter.shieldHits, 3);
      setBubble(fighter, "Armor!", false, 1000);
      showComicText("ARMOR!", fighter.x, fighter.y - fighter.z - 112, "#ffd84a");
      playEffect("shield");
      return;
    }
    if (pickup.item === "heart") {
      fighter.health = Math.min(fighter.maxHealth, Math.round((fighter.health + 1) * 2) / 2);
      setBubble(fighter, "Heart prize!", false, 1000);
      showComicText("HEART +1!", fighter.x, fighter.y - fighter.z - 112, "#ff5fa8");
      playEffect("win");
      return;
    }
    if (pickup.item === "speed") {
      fighter.speedBoostUntil = now + 14000;
      setBubble(fighter, "Speed prize!", false, 1000);
      showComicText("SPEED!", fighter.x, fighter.y - fighter.z - 112, "#70f0ff");
      playEffect("speed");
      return;
    }
    if (pickup.item === "powerRefill") {
      fighterPowers(fighter).forEach((power) => {
        if (power.noRefill) return;
        fighter.charges[power.id] = maxChargesForPower(power);
        fighter.cooldowns[power.id] = 0;
      });
      setBubble(fighter, "Power prize!", false, 1000);
      showComicText("POWER UP!", fighter.x, fighter.y - fighter.z - 112, "#a98bff");
      playEffect("shield");
      renderControls(true);
      return;
    }
    const prize = kingDockPrizeFor(pickup.item);
    setBubble(fighter, prize.bubble, false, 1000);
    showComicText(prize.label, fighter.x, fighter.y - fighter.z - 112, prize.color);
    playEffect("shield");
  }

  function kingDockPrizeFor(item) {
    return KING_DOCK_PRIZES.find((prize) => prize.id === item) || KING_DOCK_PRIZES[0];
  }

  function maybeReduceBossHelpers(target, oldHealth) {
    if (!target.isBoss || (target.id !== "mayor" && target.id !== "yapping")) return;
    const wholeLostBefore = Math.floor(target.maxHealth - oldHealth);
    const wholeLostAfter = Math.floor(target.maxHealth - target.health);
    if (wholeLostAfter <= wholeLostBefore) return;
    const losses = wholeLostAfter - wholeLostBefore;
    for (let i = 0; i < losses; i += 1) {
      target.helperPenaltyNow += 1;
      target.helperPenaltyNext += 1;
      removeOneHelper(target);
    }
  }

  function removeOneHelper(owner) {
    const index = game.helpers.findIndex((helper) => helper.owner === owner && !helper.main);
    if (index >= 0) game.helpers.splice(index, 1);
  }

  function opponentOf(fighter) {
    return fighter.side === "p1" ? game.p2 : game.p1;
  }

  function finishByKnockout(winner) {
    if (!game || game.gameOver) return;
    if (game.mode === "story") {
      if (winner.side === "p1") completeStoryLevelByWin();
      else finishGame(false, "Game Over", "The boss knocked you out.");
    } else {
      finishGame(true, "Game Complete", `${winner.name} wins by knockout.`);
    }
  }

  function finishLevelByTimer() {
    if (!game || game.gameOver) return;
    let winner = null;
    if (game.p1.health > game.p2.health) winner = game.p1;
    if (game.p2.health > game.p1.health) winner = game.p2;
    if (!winner) {
      scheduleNextLevel("Tie! Replay the level.", () => startLevel(game.level));
      return;
    }

    if (game.mode === "story") {
      if (winner.side !== "p1") {
        finishGame(false, "Game Over", "The boss had more hearts when time ran out.");
        return;
      }
      completeStoryLevelByWin();
    } else {
      game.scores[winner.side] += 1;
      game.carry.p1 = game.p1.health;
      game.carry.p2 = game.p2.health;
      if (game.level >= 3) {
        const finalWinner = game.scores.p1 >= game.scores.p2 ? game.p1 : game.p2;
        finishGame(true, "Game Complete", `${finalWinner.name} wins Two Player Mode.`);
      } else {
        scheduleNextLevel(`${winner.name} wins Level ${game.level}`, () => startLevel(game.level + 1));
      }
    }
  }

  function completeStoryLevelByWin() {
    game.carry.p1 = game.p1.health;
    maybeUnlockAfterLevel();
    if (game.level >= game.worldEndLevel) {
      const title = game.world === "abandonedDesert" ? "King of the Battle!" : game.world === "waterWorld" ? "Water World Complete!" : "Game Complete";
      finishGame(true, title, worldCompleteText());
      return;
    }
    const nextLevel = game.level + 1;
    const nextOpponentId = game.mode === "story" ? storyBossIdForLevel(nextLevel) : game.p2Id;
    game.carry.p2 = fighterMaxHealthForLevel(nextOpponentId, nextLevel, game.mode === "story");
    scheduleNextLevel(`Level ${game.level} complete`, () => startLevel(nextLevel));
  }

  function scheduleNextLevel(text, callback) {
    game.transitionText = text;
    game.transitionUntil = performance.now() + 2200;
    setTimeout(() => {
      if (!game || game.gameOver) return;
      game.p1.helperPenaltyNow = game.p1.helperPenaltyNext;
      game.p2.helperPenaltyNow = game.p2.helperPenaltyNext;
      callback();
    }, 2250);
  }

  function maybeUnlockAfterLevel() {
    if (game.bossId === "mayor" && game.level === 1 && game.attemptNumber === 1 && game.p1.health >= 2) {
      if (unlockCharacter("phantom")) game.unlocks.push("phantom");
    }
  }

  function worldCompleteText() {
    if (game.world === "waterWorld") return "You beat Water World Levels 11, 12, 13, and 14.";
    if (game.world === "abandonedDesert") return "You beat King Dock and became King of the Battle.";
    if (game.world === "candyland") return "You beat Candyland Levels 4, 5, and 6.";
    return "You beat Superville Levels 1, 2, and 3.";
  }

  function finishGame(won, title, text) {
    game.gameOver = true;
    stopBattleMusic();
    if (won) playWinSound();
    else playLoseSound();

    if (game.mode === "story") updateSuperchargedPackageProgress(won);
    if (game.mode === "story") updateDesertWorldProgress(won);

    if (won && game.mode === "story") {
      if (game.bossId === "mayor" && game.attemptNumber <= 3) {
        if (unlockCharacter("crayon")) game.unlocks.push("crayon");
      }
      if (game.bossId === "yapping" && game.p1.health >= 1) {
        if (unlockCharacter("hoodie")) game.unlocks.push("hoodie");
      }
      if (game.bossId === "yapping" && game.world === "superville" && game.level >= 3) {
        if (unlockWorld("candyland")) game.unlocks.push("world:candyland");
      }
      if (game.bossId === "kingDock" && game.world === "abandonedDesert" && game.level >= 10) {
        awardTrophy("kingOfBattle");
        game.unlocks.push("trophy:kingOfBattle");
        if (unlockWorld("waterWorld")) game.unlocks.push("world:waterWorld");
      }
    }

    setTimeout(() => {
      els.views.result.classList.toggle("win-result", won);
      els.views.result.classList.toggle("lose-result", !won);
      els.resultTitle.textContent = won && title === "Game Complete" ? "You Win!" : title;
      els.resultText.textContent = won && title === "Game Complete" ? `Game complete! ${text}` : text;
      els.unlockList.innerHTML = "";
      game.unlocks.forEach((id) => els.unlockList.append(createUnlockItem(id)));
      showView("result");
    }, 950);
  }

  function updateSuperchargedPackageProgress(won) {
    const currentStreak = Math.max(0, Number(progress.mayorWinStreak) || 0);
    if (won && game.bossId === "mayor") {
      progress.mayorWinStreak = currentStreak + 1;
      if (progress.mayorWinStreak >= 2 && unlockPackage("supercharged")) {
        game.unlocks.push("package:supercharged");
      } else {
        saveProgress();
      }
      return;
    }
    if (currentStreak > 0) {
      progress.mayorWinStreak = 0;
      saveProgress();
    }
  }

  function updateDesertWorldProgress(won) {
    if (!game || game.mode !== "story" || game.world !== "candyland") return;
    if (!won) return;
    const currentWins = Math.max(0, Number(progress.candylandWinStreak) || 0);
    progress.candylandWinStreak = currentWins + 1;
    const unlockedNow = progress.candylandWinStreak >= 2 && unlockWorld("abandonedDesert");
    if (unlockedNow) game.unlocks.push("world:abandonedDesert");
    else saveProgress();
  }

  function createUnlockItem(unlockId) {
    if (typeof unlockId === "string" && unlockId.startsWith("world:")) {
      return createWorldUnlockItem(unlockId.slice(6));
    }
    if (typeof unlockId === "string" && unlockId.startsWith("package:")) {
      return createPackageUnlockItem(unlockId.slice(8));
    }
    if (typeof unlockId === "string" && unlockId.startsWith("trophy:")) {
      return createTrophyUnlockItem(unlockId.slice(7));
    }
    const id = CHARACTERS[unlockId] ? unlockId : CHARACTER_ORDER.find((key) => CHARACTERS[key].name === unlockId);
    const item = document.createElement("div");
    item.className = "unlock-item";
    if (!id) {
      item.textContent = `New Character Unlocked: ${unlockId}`;
      return item;
    }

    const character = CHARACTERS[id];
    const canvas = document.createElement("canvas");
    canvas.width = 180;
    canvas.height = 152;
    const text = document.createElement("div");
    text.className = "unlock-copy";
    const eyebrow = document.createElement("span");
    eyebrow.textContent = "New Character Unlocked";
    const name = document.createElement("strong");
    name.textContent = character.name;
    const powers = document.createElement("p");
    powers.textContent = `Powers: ${character.powers.map((power) => power.name).join(", ")}.`;
    text.append(eyebrow, name, powers);
    item.append(canvas, text);
    requestAnimationFrame(() => drawPortrait(canvas.getContext("2d"), id, false, false));
    return item;
  }

  function createWorldUnlockItem(worldId) {
    const world = WORLDS[worldId];
    const item = document.createElement("div");
    item.className = "unlock-item";
    if (!world) {
      item.textContent = `New World Unlocked: ${worldId}`;
      return item;
    }
    const canvas = document.createElement("canvas");
    canvas.width = 180;
    canvas.height = 104;
    const text = document.createElement("div");
    text.className = "unlock-copy";
    const eyebrow = document.createElement("span");
    eyebrow.textContent = "New World Unlocked";
    const name = document.createElement("strong");
    name.textContent = world.name;
    const powers = document.createElement("p");
    powers.textContent = `${world.levels} are open in Story Mode.`;
    text.append(eyebrow, name, powers);
    item.append(canvas, text);
    requestAnimationFrame(() => drawWorldCard(canvas.getContext("2d"), worldId, false));
    return item;
  }

  function createPackageUnlockItem(packageId) {
    const pack = PACKAGES[packageId];
    const item = document.createElement("div");
    item.className = "unlock-item";
    if (!pack) {
      item.textContent = `New Package Unlocked: ${packageId}`;
      return item;
    }
    const canvas = document.createElement("canvas");
    canvas.width = 180;
    canvas.height = 104;
    const text = document.createElement("div");
    text.className = "unlock-copy";
    const eyebrow = document.createElement("span");
    eyebrow.textContent = "New Package Unlocked";
    const name = document.createElement("strong");
    name.textContent = pack.name;
    const powers = document.createElement("p");
    powers.textContent = pack.effect;
    text.append(eyebrow, name, powers);
    item.append(canvas, text);
    requestAnimationFrame(() => drawPackageCard(canvas.getContext("2d"), packageId, false));
    return item;
  }

  function createTrophyUnlockItem(trophyId) {
    const trophy = TROPHIES[trophyId];
    const item = document.createElement("div");
    item.className = "unlock-item trophy-item";
    if (!trophy) {
      item.textContent = `Trophy Earned: ${trophyId}`;
      return item;
    }
    const canvas = document.createElement("canvas");
    canvas.width = 180;
    canvas.height = 104;
    const text = document.createElement("div");
    text.className = "unlock-copy";
    const eyebrow = document.createElement("span");
    eyebrow.textContent = trophy.eyebrow;
    const name = document.createElement("strong");
    name.textContent = trophy.name;
    const powers = document.createElement("p");
    powers.textContent = trophy.description;
    text.append(eyebrow, name, powers);
    item.append(canvas, text);
    requestAnimationFrame(() => drawTrophyCard(canvas.getContext("2d"), trophyId));
    return item;
  }

  function restartCurrentLevel() {
    if (!game) return;
    game.carry = Object.assign({}, game.levelStartCarry);
    els.pauseOverlay.classList.add("hidden");
    startLevel(game.level);
  }

  function pauseGame() {
    if (!game || game.gameOver) return;
    game.paused = true;
    game.pauseStarted = performance.now();
    els.pauseOverlay.classList.remove("hidden");
  }

  function resumeGame() {
    if (!game) return;
    const pausedFor = game.pauseStarted ? performance.now() - game.pauseStarted : 0;
    game.paused = false;
    game.pauseStarted = 0;
    game.endsAt += pausedFor;
    els.pauseOverlay.classList.add("hidden");
  }

  function renderHud() {
    if (!game) return;
    const remaining = Math.max(0, (game.endsAt - performance.now()) / 1000);
    const supercharged = isSuperchargedLevel(game.level) ? `<br><span class="timer-note">Supercharged</span>` : "";
    const hudHtml = `
      ${hudPanel(game.p1)}
      <div class="timer-chip">${formatClock(remaining)}<br><span style="font-size:12px">Level ${game.level}</span><br><span style="font-size:11px">${levelDifficultyLabel(game.level)}</span>${supercharged}</div>
      ${hudPanel(game.p2)}
    `;
    if (hudHtml !== lastHudHtml) {
      els.hud.innerHTML = hudHtml;
      lastHudHtml = hudHtml;
    }
  }

  function hudPanel(fighter) {
    const badge = fighter.supercharged ? `<span class="hud-badge">SUPER</span>` : "";
    const bonus = fighter.damageBonusUntil > performance.now() ? `<span class="hud-badge">SWORD</span>` : "";
    const armor = fighter.shieldHits > 0 ? `<span class="hud-badge">ARMOR</span>` : "";
    const manyHearts = fighter.maxHealth > 10 ? " many-hearts huge-hearts" : fighter.maxHealth > 5 ? " many-hearts" : "";
    return `
      <div class="hud-panel${fighter.supercharged ? " supercharged" : ""}">
        <div class="hud-name">${escapeHtml(fighter.name)}${badge}${bonus}${armor}</div>
        ${healthBarHtml(fighter)}
        <div class="heart-row${manyHearts}">${Array.from({ length: fighter.maxHealth }, (_, index) => heartHtml(fighter.health, index)).join("")}</div>
      </div>
    `;
  }

  function healthBarHtml(fighter) {
    const percent = clamp(fighter.health / Math.max(1, fighter.maxHealth), 0, 1) * 100;
    const tone = percent > 55 ? "green" : percent > 25 ? "yellow" : "red";
    return `
      <div class="health-wrap">
        <div class="health-bar ${tone}" aria-label="${escapeHtml(fighter.name)} health">
          <div class="health-fill" style="width:${percent}%"></div>
        </div>
        <span class="health-text">${formatHealth(fighter.health)}/${formatHealth(fighter.maxHealth)}</span>
      </div>
    `;
  }

  function formatHealth(value) {
    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  function heartHtml(health, index) {
    const fill = clamp(health - index, 0, 1) * 100;
    return `<div class="heart"><div class="heart-fill" style="width:${fill}%"></div></div>`;
  }

  function renderControls(force) {
    if (!game || (!force && performance.now() - lastControlsRender < 500)) return;
    lastControlsRender = performance.now();
    els.controlDock.innerHTML = "";
    els.controlDock.append(controlPanel(game.p1));
    if (game.mode === "two") els.controlDock.append(controlPanel(game.p2));
    renderAnimalChooser();
  }

  function controlPanel(fighter) {
    const panel = document.createElement("div");
    panel.className = `control-panel ${fighter.side === "p2" ? "p2" : "p1"}`;
    const title = document.createElement("p");
    title.className = "panel-title";
    title.textContent = fighter.side === "p1" ? "Player 1" : "Player 2";
    panel.append(title);

    const dpad = document.createElement("div");
    dpad.className = "dpad";
    dpad.append(
      holdButton("up", "Up", fighter.side, "up", "arrowUp"),
      holdButton("left", "Left", fighter.side, "left", "arrowLeft"),
      holdButton("down", "Down", fighter.side, "down", "arrowDown"),
      holdButton("right", "Right", fighter.side, "right", "arrowRight")
    );

    const actions = document.createElement("div");
    actions.className = "actions";
    const mainActions = document.createElement("div");
    mainActions.className = "main-actions";
    mainActions.append(
      tapButton("Walk", "walk", () => { fighter.moveMode = "walk"; renderControls(true); }, fighter.moveMode === "walk"),
      tapButton("Run", "run", () => { fighter.moveMode = "run"; renderControls(true); }, fighter.moveMode === "run"),
      tapButton("Jump", "jump", () => performBasic(fighter, "jump")),
      tapButton("Punch", "punch", () => performBasic(fighter, "punch")),
      tapButton("Kick", "kick", () => performBasic(fighter, "kick"))
    );
    actions.append(mainActions);

    const utilityDrawer = document.createElement("details");
    utilityDrawer.className = "utility-drawer";
    utilityDrawer.open = !isCompactControls() || fighter.utilityDrawerOpen;
    utilityDrawer.addEventListener("toggle", () => { fighter.utilityDrawerOpen = utilityDrawer.open; });
    utilityDrawer.append(summaryControl("More", "dodge"));
    const utilityRow = document.createElement("div");
    utilityRow.className = "utility-row";
    utilityRow.append(
      tapButton("Duck", "duck", () => performBasic(fighter, "duck")),
      tapButton("Dodge", "dodge", () => performBasic(fighter, "dodge")),
      tapButton("Hide", "hide", () => performBasic(fighter, "hide"))
    );
    utilityDrawer.append(utilityRow);
    actions.append(utilityDrawer);

    const powerRow = document.createElement("div");
    powerRow.className = "power-row";
    fighterPowers(fighter).forEach((power) => {
      powerRow.append(powerButton(fighter, power));
    });
    if (fighter.controllingBots) {
      powerRow.append(
        holdButton("", "Bot Up", fighter.side, "botUp", "arrowUp"),
        holdButton("", "Bot Down", fighter.side, "botDown", "arrowDown"),
        holdButton("", "Bot Left", fighter.side, "botLeft", "arrowLeft"),
        holdButton("", "Bot Right", fighter.side, "botRight", "arrowRight"),
        tapButton("Chainsaw", "saw", () => robotChainsaw(fighter))
      );
    }
    if (fighter.controllingMouth) {
      powerRow.append(
        tapButton("Bite", "mouth", () => mouthAction(fighter, "bite")),
        tapButton("Kick", "kick", () => mouthAction(fighter, "kick")),
        tapButton("Jump", "jump", () => mouthAction(fighter, "jump")),
        tapButton("Fly", "fly", () => mouthAction(fighter, "fly"))
      );
    }
    const powerDrawer = document.createElement("details");
    powerDrawer.className = "power-drawer";
    powerDrawer.open = !isCompactControls() || fighter.powerDrawerOpen || fighter.controllingBots || fighter.controllingMouth;
    powerDrawer.addEventListener("toggle", () => { fighter.powerDrawerOpen = powerDrawer.open; });
    powerDrawer.append(summaryControl("Powers", "bolt"), powerRow);
    actions.append(powerDrawer);
    panel.append(dpad, actions);
    return panel;
  }

  function isCompactControls() {
    return window.matchMedia("(max-width: 820px), (max-height: 520px)").matches;
  }

  function renderAnimalChooser() {
    const choosers = [game.p1, game.p2].filter((fighter) =>
      fighter && ((fighter.id === "freddy" && fighter.animalCategory) || (fighter.id === "benji" && fighter.sharkChooserOpen))
    );
    els.animalChooser.innerHTML = "";
    els.animalChooser.classList.toggle("hidden", choosers.length === 0);
    if (!choosers.length) return;

    choosers.forEach((fighter) => {
      const section = document.createElement("section");
      section.className = "animal-choice-section";
      const title = document.createElement("div");
      title.className = "animal-choice-title";
      title.textContent = fighter.id === "benji"
        ? `${fighter.side === "p1" ? "Player 1" : "Player 2"}: Choose Shark`
        : `${fighter.side === "p1" ? "Player 1" : "Player 2"}: Choose ${FREDDY_CATEGORY_NAMES[fighter.animalCategory]}`;
      const list = document.createElement("div");
      list.className = "animal-choice-list";
      const buttons = fighter.id === "benji" ? benjiSharkButtons(fighter) : freddyAnimalButtons(fighter);
      buttons.forEach((button) => list.append(button));
      section.append(title, list);
      els.animalChooser.append(section);
    });
  }

  function freddyAnimalButtons(fighter) {
    const animals = FREDDY_ANIMALS[fighter.animalCategory] || [];
    return animals.map((animalForm) => {
      const selected = fighter.animalForm && fighter.animalForm.name === animalForm.name;
      return tapButton(animalForm.name, animalForm.feature, () => transformFreddy(fighter, animalForm), selected);
    });
  }

  function benjiSharkButtons(fighter) {
    const now = performance.now();
    const buttons = [];
    if (fighter.sharkForm) {
      buttons.push(tapButton("Back to Benji", "teleport", () => transformBenjiBack(fighter), false));
    }
    BENJI_SHARKS.forEach((sharkForm) => {
      const selected = fighter.sharkForm && fighter.sharkForm.name === sharkForm.name;
      const button = tapButton(sharkForm.name, "shark", () => transformBenjiShark(fighter, sharkForm), selected);
      if (!fighter.sharkForm && fighter.sharkCooldownUntil > now) {
        button.disabled = true;
        button.append(smallNote(`${Math.ceil((fighter.sharkCooldownUntil - now) / 1000)}s`));
      }
      buttons.push(button);
    });
    return buttons;
  }

  function holdButton(className, label, side, key, icon) {
    const button = baseControlButton(label, icon || key);
    if (className) button.classList.add(className);
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      buttonInput[side][key] = true;
      button.classList.add("active");
      initAudio();
    });
    const stop = () => {
      buttonInput[side][key] = false;
      button.classList.remove("active");
    };
    button.addEventListener("pointerup", stop);
    button.addEventListener("pointercancel", stop);
    button.addEventListener("pointerleave", stop);
    return button;
  }

  function tapButton(label, icon, handler, active = false) {
    const button = baseControlButton(label, icon);
    if (active) button.classList.add("active");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      initAudio();
      handler();
    });
    return button;
  }

  function powerButton(fighter, power) {
    const button = baseControlButton(power.name, power.icon);
    if (power.noRecharge) {
      const activeCategory = (fighter.id === "freddy" && fighter.animalCategory === power.id.replace("freddy", "").toLowerCase()) ||
        (fighter.id === "benji" && power.id === "benjiSharks" && fighter.sharkChooserOpen);
      if (activeCategory) button.classList.add("active");
      if (fighter.id === "benji" && power.id === "benjiSharks" && !fighter.sharkForm && fighter.sharkCooldownUntil > performance.now()) {
        button.append(smallNote(`${Math.ceil((fighter.sharkCooldownUntil - performance.now()) / 1000)}s`));
      }
      button.addEventListener("click", (event) => {
        event.preventDefault();
        initAudio();
        usePower(fighter, power.id);
      });
      return button;
    }
    const now = performance.now();
    const cd = fighter.cooldowns[power.id] > now ? Math.ceil((fighter.cooldowns[power.id] - now) / 1000) : 0;
    const charges = fighter.charges[power.id] || 0;
    if (cd) {
      button.disabled = true;
      button.append(smallNote(`${cd}s`));
    } else {
      button.append(smallNote(`${charges}/${maxChargesForPower(power)}`));
    }
    button.addEventListener("click", (event) => {
      event.preventDefault();
      initAudio();
      usePower(fighter, power.id);
    });
    return button;
  }

  function smallNote(text) {
    const span = document.createElement("span");
    span.className = "cooldown";
    span.textContent = text;
    return span;
  }

  function baseControlButton(label, icon) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `control-button${label.length <= 4 ? " icon-only" : ""}`;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const text = document.createElement("span");
    text.textContent = label;
    button.append(canvas, text);
    requestAnimationFrame(() => drawIcon(canvas.getContext("2d"), icon));
    return button;
  }

  function summaryControl(label, icon) {
    const summary = document.createElement("summary");
    summary.className = `control-button drawer-summary${label.length <= 4 ? " icon-only" : ""}`;
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const text = document.createElement("span");
    text.textContent = label;
    summary.append(canvas, text);
    requestAnimationFrame(() => drawIcon(canvas.getContext("2d"), icon));
    return summary;
  }

  function drawGame() {
    if (!game) return;
    const now = performance.now();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.save();
    if (game.screenShakeUntil > now) {
      const remaining = clamp((game.screenShakeUntil - now) / 260, 0, 1);
      const power = (game.screenShakePower || 0) * remaining;
      ctx.translate((Math.random() - 0.5) * power, (Math.random() - 0.5) * power);
    } else {
      game.screenShakePower = 0;
    }
    drawBackground();

    const drawable = [
      ...game.obstacles.map((obstacle) => ({ kind: "obstacle", y: obstacle.y, item: obstacle })),
      ...game.pickups.map((pickup) => ({ kind: "pickup", y: pickup.y, item: pickup })),
      ...game.helpers.map((helper) => ({ kind: "helper", y: helper.y, item: helper })),
      { kind: "fighter", y: game.p1.y, item: game.p1 },
      { kind: "fighter", y: game.p2.y, item: game.p2 }
    ].sort((a, b) => a.y - b.y);

    drawable.forEach((entry) => {
      if (entry.kind === "obstacle") drawObstacle(entry.item, false);
      if (entry.kind === "pickup") drawPickup(entry.item);
      if (entry.kind === "helper") drawHelper(entry.item);
      if (entry.kind === "fighter") drawFighter(entry.item);
    });

    drawEffects();
    drawBubbles();
    drawForegroundFrame();
    if (game.transitionText && performance.now() < game.transitionUntil) {
      drawTransitionText(game.transitionText);
    }
    if (game.dangerWarningText && performance.now() < game.dangerWarningUntil) {
      drawDangerWarning(game.dangerWarningText);
    }
    ctx.restore();
  }

  function drawBackground() {
    ctx.save();
    const level = game ? game.level : 1;
    const world = worldIdForLevel(level);
    if (world === "waterWorld") {
      drawWaterWorldBackground(level);
      ctx.restore();
      return;
    }
    if (world === "abandonedDesert") {
      drawDesertBackground(level);
      ctx.restore();
      return;
    }
    if (world === "candyland") {
      drawCandylandBackground(level);
      ctx.restore();
      return;
    }
    const levelLook = {
      1: { sky: "#86d7ff", grass: "#66c153", field: "#9fe36f", path: "rgba(255,255,255,0.58)", tint: "rgba(255,255,255,0)" },
      2: { sky: "#9eb8ff", grass: "#5db052", field: "#88cf61", path: "rgba(255,255,255,0.46)", tint: "rgba(126,67,214,0.12)" },
      3: { sky: "#5b456c", grass: "#4c8e47", field: "#6ea94e", path: "rgba(255,255,255,0.34)", tint: "rgba(217,31,46,0.18)" }
    }[level] || { sky: "#86d7ff", grass: "#66c153", field: "#9fe36f", path: "rgba(255,255,255,0.58)", tint: "rgba(255,255,255,0)" };
    ctx.fillStyle = "#fffaf0";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = levelLook.field;
    roundRect(ctx, 48, 96, WIDTH - 96, HEIGHT - 144, 8);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.fillStyle = levelLook.sky;
    ctx.fillRect(56, 104, WIDTH - 112, 115);
    drawCloud(185, 145, 1.1);
    drawCloud(790, 135, 0.9);
    if (level >= 2) drawCloud(1015, 132, 1.2);
    if (level >= 3) drawStormMarks();
    drawHouse(120, 172, "#f5d15a", false);
    drawHouse(280, 170, "#ff9277", false);
    drawHouse(455, 164, "#6aa5ff", true);
    drawHouse(790, 165, "#ffed9d", false);
    drawMansion(965, 162);

    ctx.fillStyle = levelLook.grass;
    ctx.fillRect(56, 216, WIDTH - 112, HEIGHT - 264);
    drawStream();
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    for (let i = 0; i < 20; i += 1) {
      ctx.beginPath();
      ctx.arc(90 + i * 72, 455 + Math.sin(i) * 28, 23, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = levelLook.path;
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(54, 650);
    ctx.bezierCurveTo(320, 560, 600, 590, 754, 452);
    ctx.bezierCurveTo(915, 308, 1055, 305, 1226, 245);
    ctx.stroke();
    ctx.fillStyle = levelLook.tint;
    ctx.fillRect(56, 104, WIDTH - 112, HEIGHT - 160);
    ctx.restore();
  }

  function drawWaterWorldBackground(level) {
    const stage = stageLevelFor(level);
    const deep = level >= 14;
    ctx.fillStyle = deep ? "#063a78" : "#0f8ed6";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = deep ? "#0b5aa0" : "#4bc4f5";
    roundRect(ctx, 48, 96, WIDTH - 96, HEIGHT - 144, 8);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 8;
    ctx.stroke();

    const bands = [
      deep ? "#075089" : "#78ddff",
      deep ? "#0c6aaa" : "#43bcea",
      deep ? "#0a4c84" : "#229ad4"
    ];
    bands.forEach((color, index) => {
      ctx.fillStyle = color;
      const y = 104 + index * 122;
      ctx.beginPath();
      ctx.moveTo(56, y);
      for (let x = 56; x <= WIDTH - 56; x += 80) {
        ctx.quadraticCurveTo(x + 40, y + 22 + Math.sin((x + level * 30) / 85) * 8, x + 80, y);
      }
      ctx.lineTo(WIDTH - 56, y + 135);
      ctx.lineTo(56, y + 135);
      ctx.closePath();
      ctx.fill();
    });

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    for (let i = 0; i < 34; i += 1) {
      const x = 84 + ((i * 89 + level * 23) % 1110);
      const y = 150 + ((i * 47) % 452);
      ctx.beginPath();
      ctx.arc(x, y, 5 + (i % 4) * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    drawWaterCoral(120, 595, 1.1, "#ff5fa8");
    drawWaterCoral(1030, 575, 0.95, "#ffd84a");
    drawWaterSeaweed(240, 610, 1);
    drawWaterSeaweed(910, 612, 1.15);
    for (let i = 0; i < 8; i += 1) {
      drawTinyFish(180 + i * 130, 210 + (i % 4) * 76, i % 2 ? -1 : 1, i % 3 === 0 ? "#ffd84a" : "#fffef7");
    }
    if (stage >= 2) {
      drawFloatingBuoy(650, 166);
      drawTinyFish(1090, 260, -1, "#ff8a58");
    }
    if (stage >= 3) drawWaterStormMarks();

    ctx.strokeStyle = "rgba(255,255,255,0.52)";
    ctx.lineWidth = 12;
    for (let y = 245; y < 660; y += 90) {
      ctx.beginPath();
      ctx.moveTo(72, y);
      for (let x = 72; x < WIDTH - 72; x += 92) {
        ctx.quadraticCurveTo(x + 46, y - 18, x + 92, y);
      }
      ctx.stroke();
    }
  }

  function drawWaterCoral(x, y, scale, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = color;
    ctx.lineWidth = 4;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * 18, 0);
      ctx.quadraticCurveTo(i * 28, -30, i * 10, -58);
      ctx.lineTo(i * 28, -45);
      ctx.quadraticCurveTo(i * 34, -28, i * 18, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawWaterSeaweed(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#1aa870";
    ctx.lineWidth = 3;
    for (let i = 0; i < 5; i += 1) {
      const offset = (i - 2) * 13;
      ctx.beginPath();
      ctx.ellipse(offset, -36, 8, 44, Math.sin(i) * 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawTinyFish(x, y, facing, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(facing, 1);
    ctx.fillStyle = color;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-21, 0);
    ctx.lineTo(-39, -12);
    ctx.lineTo(-39, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(9, -3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawFloatingBuoy(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.fillRect(-25, -7, 50, 14);
    ctx.strokeRect(-25, -7, 50, 14);
    ctx.restore();
  }

  function drawWaterStormMarks() {
    ctx.save();
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 5;
    for (let i = 0; i < 7; i += 1) {
      const x = 150 + i * 155;
      const y = 135 + (i % 3) * 34;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 18, y + 28);
      ctx.lineTo(x + 8, y + 26);
      ctx.lineTo(x - 12, y + 58);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDesertBackground(level) {
    const stage = stageLevelFor(level);
    const levelLook = {
      1: { sky: "#f8c56d", sand: "#e7bb68", field: "#f2ce82", tint: "rgba(255,255,255,0)" },
      2: { sky: "#e99b5d", sand: "#dba85f", field: "#edc06f", tint: "rgba(146,82,35,0.11)" },
      3: { sky: "#a76065", sand: "#c99055", field: "#dfad64", tint: "rgba(98,37,51,0.18)" }
    }[stage];

    ctx.fillStyle = "#fff3d6";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = levelLook.field;
    roundRect(ctx, 48, 96, WIDTH - 96, HEIGHT - 144, 8);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.fillStyle = levelLook.sky;
    ctx.fillRect(56, 104, WIDTH - 112, 122);
    drawDesertSun(165, 148, stage);
    drawMesa(330, 207, 1.05, "#b86f47");
    drawMesa(760, 211, 0.92, "#965444");
    drawMesa(1070, 210, 1.12, "#b56848");
    drawDustCloud(585, 154, 1);
    if (stage >= 2) drawDustCloud(985, 143, 0.88);

    ctx.fillStyle = levelLook.sand;
    ctx.fillRect(56, 226, WIDTH - 112, HEIGHT - 274);
    drawSandLines(stage);
    drawDesertStream();

    for (let i = 0; i < 12; i += 1) {
      const x = 92 + ((i * 97) % 1080);
      const y = 300 + (i % 5) * 58;
      const scale = 0.55 + (i % 3) * 0.12;
      if (i % 2 === 0) drawCactus(x, y, scale, false);
      else drawDesertRock(x, y + 16, scale);
    }

    drawDesertBones(stage);
    drawRollingHay(level, stage);

    ctx.strokeStyle = "rgba(255,245,207,0.58)";
    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(54, 650);
    ctx.bezierCurveTo(270, 590, 530, 606, 740, 468);
    ctx.bezierCurveTo(910, 352, 1050, 332, 1226, 258);
    ctx.stroke();
    ctx.strokeStyle = "rgba(117,74,38,0.32)";
    ctx.lineWidth = 5;
    ctx.setLineDash([24, 18]);
    ctx.stroke();
    ctx.setLineDash([]);

    if (stage >= 3) drawDustStormMarks();
    ctx.fillStyle = levelLook.tint;
    ctx.fillRect(56, 104, WIDTH - 112, HEIGHT - 160);
  }

  function drawDesertSun(x, y, stage) {
    ctx.save();
    ctx.fillStyle = stage >= 3 ? "#ff785a" : "#ffd65a";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawMesa(x, y, scale, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = color;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-95, 18);
    ctx.lineTo(-68, -38);
    ctx.lineTo(-18, -38);
    ctx.lineTo(10, -8);
    ctx.lineTo(72, -8);
    ctx.lineTo(102, 18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawDustCloud(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "rgba(255,237,193,0.78)";
    ctx.strokeStyle = "rgba(23,18,22,0.42)";
    ctx.lineWidth = 3;
    [-42, -12, 22, 52].forEach((cx, index) => {
      ctx.beginPath();
      ctx.ellipse(cx, Math.sin(index) * 4, 34, 13, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawSandLines(stage) {
    ctx.save();
    ctx.strokeStyle = stage >= 3 ? "rgba(93,50,41,0.26)" : "rgba(130,83,43,0.22)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 18; i += 1) {
      const y = 250 + i * 23;
      ctx.beginPath();
      ctx.moveTo(72 + (i % 3) * 34, y);
      ctx.bezierCurveTo(250, y - 16, 390, y + 15, 560, y);
      ctx.bezierCurveTo(790, y - 19, 940, y + 15, 1190, y - 3);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDesertStream() {
    ctx.save();
    ctx.fillStyle = "#54b9d6";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(58, 616);
    ctx.bezierCurveTo(280, 594, 444, 642, 652, 618);
    ctx.bezierCurveTo(840, 598, 1000, 632, 1220, 604);
    ctx.lineTo(1220, 660);
    ctx.lineTo(58, 660);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(255,238,170,0.4)";
    ctx.fillRect(58, 598, WIDTH - 116, 18);
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = 4;
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.moveTo(105 + i * 220, 635 + Math.sin(i) * 7);
      ctx.bezierCurveTo(160 + i * 220, 616, 215 + i * 220, 650, 280 + i * 220, 632);
      ctx.stroke();
    }
    ctx.fillStyle = "#171216";
    ctx.font = "900 14px Trebuchet MS";
    ctx.fillText("DESERT STREAM", 82, 648);
    ctx.restore();
  }

  function drawCactus(x, y, scale, foreground) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.fillStyle = foreground ? "rgba(35,137,88,0.9)" : "#238958";
    roundRect(ctx, -14, -86, 28, 108, 14);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-12, -46);
    ctx.lineTo(-46, -46);
    ctx.lineTo(-46, -16);
    ctx.moveTo(12, -62);
    ctx.lineTo(48, -62);
    ctx.lineTo(48, -30);
    ctx.stroke();
    ctx.fillStyle = "#ffe65a";
    ctx.beginPath();
    ctx.arc(-6, -93, 6, 0, Math.PI * 2);
    ctx.arc(9, -94, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawDesertRock(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#a46d4b";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-38, 20);
    ctx.lineTo(-22, -9);
    ctx.lineTo(20, -20);
    ctx.lineTo(44, 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawDesertBones(stage) {
    const bones = [
      [180, 548, 0.72, -0.18],
      [365, 394, 0.58, 0.22],
      [690, 528, 0.68, 0.14],
      [1035, 480, 0.6, -0.26],
      [1120, 330, 0.5, 0.18]
    ];
    bones.forEach(([x, y, scale, angle], index) => {
      if (index === 2 || (stage >= 2 && index === 4)) drawDesertSkull(x, y - 4, scale * 0.88, angle);
      else drawDesertBone(x, y, scale, angle);
    });
  }

  function drawDesertBone(x, y, scale, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#fff3d6";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    roundRect(ctx, -42, -8, 84, 16, 8);
    ctx.fill();
    ctx.stroke();
    [-44, 44].forEach((end) => {
      ctx.beginPath();
      ctx.arc(end, -10, 11, 0, Math.PI * 2);
      ctx.arc(end, 10, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawDesertSkull(x, y, scale, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#fff3d6";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, -10, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, -18, 10, 36, 25, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-11, -12, 6, 0, Math.PI * 2);
    ctx.arc(11, -12, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -2);
    ctx.lineTo(-5, 8);
    ctx.lineTo(5, 8);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * 9, 14);
      ctx.lineTo(i * 9, 32);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawRollingHay(level, stage) {
    const now = performance.now() / 1000;
    const speed = 55 + stage * 18;
    for (let i = 0; i < 4; i += 1) {
      const y = 310 + i * 72 + Math.sin(now * 1.3 + i) * 8;
      const x = 70 + ((now * speed + i * 310 + level * 29) % (WIDTH + 160)) - 80;
      const angle = now * (1.8 + stage * 0.35) + i;
      drawHayBall(x, y, 0.42 + (i % 2) * 0.12, angle);
    }
  }

  function drawHayBall(x, y, scale, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.fillStyle = "#c48a3d";
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#f2d37f";
    ctx.lineWidth = 5;
    for (let i = 0; i < 6; i += 1) {
      ctx.beginPath();
      ctx.arc(0, 0, 10 + i * 5, i * 0.8, i * 0.8 + Math.PI * 1.2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawDustStormMarks() {
    ctx.save();
    ctx.strokeStyle = "rgba(89,48,37,0.62)";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    [[620, 126], [960, 178], [1080, 124]].forEach(([x, y], index) => {
      ctx.beginPath();
      ctx.moveTo(x - 60, y + index * 12);
      ctx.bezierCurveTo(x - 20, y - 28, x + 40, y + 34, x + 86, y - 4);
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawCandylandBackground(level) {
    const stage = stageLevelFor(level);
    const levelLook = {
      1: { sky: "#ffcfe9", grass: "#9cec62", field: "#ffe6f3", tint: "rgba(255,255,255,0)" },
      2: { sky: "#ffaddb", grass: "#83df57", field: "#ffd2eb", tint: "rgba(160,48,210,0.09)" },
      3: { sky: "#b466dd", grass: "#69cf4f", field: "#ffbddf", tint: "rgba(106,20,128,0.18)" }
    }[stage];

    ctx.fillStyle = "#fff4fb";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = levelLook.field;
    roundRect(ctx, 48, 96, WIDTH - 96, HEIGHT - 144, 8);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 8;
    ctx.stroke();

    ctx.fillStyle = levelLook.sky;
    ctx.fillRect(56, 104, WIDTH - 112, 115);
    drawCandyCloud(180, 145, 1.05);
    drawCandyCloud(735, 136, 0.9);
    drawCandyCloud(1035, 132, 1.12);
    drawCandyHouse(100, 176, "#ff70b7", "#ffe65a");
    drawCandyHouse(330, 172, "#a75cff", "#ffb347");
    drawCandyHouse(890, 176, "#ff595e", "#f8f0ff");
    drawLollipop(575, 202, 0.8, "#ff477e", "#fff26b");
    drawLollipop(1110, 196, 0.72, "#6bd8ff", "#ff70b7");

    ctx.fillStyle = levelLook.grass;
    ctx.fillRect(56, 216, WIDTH - 112, HEIGHT - 264);
    ctx.fillStyle = "#f7ffe8";
    ctx.beginPath();
    ctx.arc(170, 470, 180, Math.PI, 0);
    ctx.arc(520, 462, 230, Math.PI, 0);
    ctx.arc(940, 468, 250, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = "rgba(23,18,22,0.22)";
    ctx.lineWidth = 4;
    ctx.stroke();

    for (let i = 0; i < 18; i += 1) {
      const x = 95 + (i * 67) % 1080;
      const y = 285 + (i % 5) * 54 + Math.sin(i) * 8;
      const color = ["#ff477e", "#ffe65a", "#6bd8ff", "#a75cff", "#49d275"][i % 5];
      if (i % 3 === 0) drawLollipop(x, y, 0.38 + (i % 2) * 0.12, color, "#fffaf0");
      else drawGumdrop(x, y + 22, 0.62 + (i % 2) * 0.12, color);
    }

    drawCandyStream();
    ctx.strokeStyle = "rgba(255,255,255,0.66)";
    ctx.lineWidth = 22;
    ctx.beginPath();
    ctx.moveTo(54, 650);
    ctx.bezierCurveTo(275, 560, 595, 590, 755, 452);
    ctx.bezierCurveTo(915, 308, 1060, 305, 1226, 245);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,112,183,0.78)";
    ctx.lineWidth = 7;
    ctx.setLineDash([18, 16]);
    ctx.stroke();
    ctx.setLineDash([]);
    if (stage >= 3) drawCandyLightning();
    ctx.fillStyle = levelLook.tint;
    ctx.fillRect(56, 104, WIDTH - 112, HEIGHT - 160);
  }

  function drawCandyCloud(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#fff6fb";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-35, 4, 25, 0, Math.PI * 2);
    ctx.arc(-8, -12, 32, 0, Math.PI * 2);
    ctx.arc(28, 2, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ff9acc";
    ctx.beginPath();
    ctx.arc(-18, 1, 5, 0, Math.PI * 2);
    ctx.arc(12, -7, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCandyHouse(x, y, color, roof) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 120, 68);
    ctx.strokeRect(x, y, 120, 68);
    ctx.fillStyle = roof;
    ctx.beginPath();
    ctx.moveTo(x - 10, y);
    ctx.lineTo(x + 60, y - 48);
    ctx.lineTo(x + 130, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffaf0";
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.arc(x + 24 + i * 34, y + 24, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawLollipop(x, y, scale, color, stripe) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(0, 34);
    ctx.lineTo(0, 100);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = stripe;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0.25, Math.PI * 1.28);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 11, Math.PI * 1.28, Math.PI * 2.15);
    ctx.stroke();
    ctx.restore();
  }

  function drawGumdrop(x, y, scale, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = color;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-30, 20);
    ctx.bezierCurveTo(-30, -12, -12, -34, 0, -34);
    ctx.bezierCurveTo(15, -34, 32, -12, 30, 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.beginPath();
    ctx.arc(-9, -13, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCandyStream() {
    ctx.save();
    ctx.fillStyle = "#53cdfa";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(58, 606);
    ctx.bezierCurveTo(280, 580, 440, 635, 654, 610);
    ctx.bezierCurveTo(820, 590, 1000, 624, 1220, 596);
    ctx.lineTo(1220, 660);
    ctx.lineTo(58, 660);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.78)";
    ctx.lineWidth = 4;
    for (let i = 0; i < 6; i += 1) {
      ctx.beginPath();
      ctx.moveTo(95 + i * 190, 628 + Math.sin(i) * 8);
      ctx.bezierCurveTo(145 + i * 190, 610, 205 + i * 190, 648, 265 + i * 190, 628);
      ctx.stroke();
    }
    ctx.fillStyle = "#171216";
    ctx.font = "900 16px Trebuchet MS";
    ctx.fillText("CANDY STREAM", 82, 646);
    ctx.restore();
  }

  function drawCandyLightning() {
    ctx.save();
    ctx.strokeStyle = "#5b0d79";
    ctx.lineWidth = 5;
    [[660, 112], [1130, 110]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 30, y + 52);
      ctx.lineTo(x + 4, y + 48);
      ctx.lineTo(x - 34, y + 102);
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawStormMarks() {
    ctx.save();
    ctx.strokeStyle = "#f04b58";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(640, 110);
    ctx.lineTo(610, 162);
    ctx.lineTo(644, 158);
    ctx.lineTo(606, 212);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(1120, 112);
    ctx.lineTo(1092, 154);
    ctx.lineTo(1124, 151);
    ctx.lineTo(1088, 205);
    ctx.stroke();
    ctx.restore();
  }

  function drawStream() {
    ctx.save();
    ctx.fillStyle = "#45a6db";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(58, 606);
    ctx.bezierCurveTo(280, 580, 440, 635, 654, 610);
    ctx.bezierCurveTo(820, 590, 1000, 624, 1220, 596);
    ctx.lineTo(1220, 660);
    ctx.lineTo(58, 660);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = 4;
    for (let i = 0; i < 6; i += 1) {
      ctx.beginPath();
      ctx.moveTo(95 + i * 190, 628 + Math.sin(i) * 8);
      ctx.bezierCurveTo(145 + i * 190, 610, 205 + i * 190, 648, 265 + i * 190, 628);
      ctx.stroke();
    }
    ctx.fillStyle = "#171216";
    ctx.font = "900 16px Trebuchet MS";
    ctx.fillText("STREAM", 82, 646);
    ctx.restore();
  }

  function drawForegroundFrame() {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 10;
    ctx.strokeRect(42, 90, WIDTH - 84, HEIGHT - 132);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.strokeRect(56, 104, WIDTH - 112, HEIGHT - 160);
    ctx.restore();
  }

  function drawHouse(x, y, color, blue) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 110, 70);
    ctx.strokeRect(x, y, 110, 70);
    ctx.fillStyle = blue ? "#247bd9" : "#f45a3c";
    ctx.beginPath();
    ctx.moveTo(x - 8, y);
    ctx.lineTo(x + 55, y - 42);
    ctx.lineTo(x + 118, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 18, y + 24, 24, 24);
    ctx.strokeRect(x + 18, y + 24, 24, 24);
    ctx.restore();
  }

  function drawMansion(x, y) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.fillStyle = "#d8c0ff";
    ctx.fillRect(x, y - 22, 185, 94);
    ctx.strokeRect(x, y - 22, 185, 94);
    ctx.fillStyle = "#7d43d6";
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 22);
    ctx.lineTo(x + 92, y - 78);
    ctx.lineTo(x + 195, y - 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 4; i += 1) {
      ctx.fillRect(x + 22 + i * 38, y + 2, 22, 28);
      ctx.strokeRect(x + 22 + i * 38, y + 2, 22, 28);
    }
    ctx.fillStyle = "#171216";
    ctx.font = "900 16px Trebuchet MS";
    ctx.fillText("MAYOR", x + 63, y + 55);
    ctx.restore();
  }

  function drawCloud(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-35, 4, 25, 0, Math.PI * 2);
    ctx.arc(-8, -12, 32, 0, Math.PI * 2);
    ctx.arc(28, 2, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawObstacle(obstacle, foreground) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    if (obstacle.desert && obstacle.type === "tree") {
      drawCactus(obstacle.x, obstacle.y + 16, 0.78, foreground);
      ctx.restore();
      return;
    }
    if (obstacle.desert && obstacle.type === "bench") {
      drawHayBaleObstacle(obstacle);
      ctx.restore();
      return;
    }
    if (obstacle.type === "tree") {
      ctx.fillStyle = "#7b4d25";
      ctx.fillRect(obstacle.x - 10, obstacle.y - 14, 20, 76);
      ctx.strokeRect(obstacle.x - 10, obstacle.y - 14, 20, 76);
      ctx.fillStyle = foreground ? "rgba(28,132,61,0.85)" : "#1c843d";
      ctx.beginPath();
      ctx.arc(obstacle.x - 28, obstacle.y - 30, obstacle.r * 0.65, 0, Math.PI * 2);
      ctx.arc(obstacle.x + 20, obstacle.y - 42, obstacle.r * 0.73, 0, Math.PI * 2);
      ctx.arc(obstacle.x + 2, obstacle.y - 78, obstacle.r * 0.62, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillStyle = "#a26034";
      ctx.fillRect(obstacle.x - obstacle.w / 2, obstacle.y - 12, obstacle.w, 24);
      ctx.strokeRect(obstacle.x - obstacle.w / 2, obstacle.y - 12, obstacle.w, 24);
      ctx.beginPath();
      ctx.moveTo(obstacle.x - obstacle.w / 3, obstacle.y + 12);
      ctx.lineTo(obstacle.x - obstacle.w / 2, obstacle.y + 52);
      ctx.moveTo(obstacle.x + obstacle.w / 3, obstacle.y + 12);
      ctx.lineTo(obstacle.x + obstacle.w / 2, obstacle.y + 52);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawHayBaleObstacle(obstacle) {
    ctx.save();
    ctx.translate(obstacle.x, obstacle.y);
    ctx.fillStyle = "#c78d3f";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    roundRect(ctx, -obstacle.w / 2, -22, obstacle.w, 44, 12);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#f5d885";
    ctx.lineWidth = 4;
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.moveTo(-obstacle.w / 2 + 18, i * 8);
      ctx.bezierCurveTo(-20, i * 8 - 14, 22, i * 8 + 14, obstacle.w / 2 - 18, i * 8);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawRewardBox(pickup) {
    ctx.save();
    ctx.translate(pickup.x, pickup.y - pickup.z);
    const pulse = Math.sin(performance.now() / 110) * 3;
    const prize = kingDockPrizeFor(pickup.item);
    ctx.fillStyle = prize.color;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(ctx, -24 - pulse * 0.2, -38 - pulse * 0.2, 48 + pulse * 0.4, 42 + pulse * 0.4, 7);
    ctx.fill();
    ctx.stroke();
    ctx.textAlign = "center";
    if (pickup.boobyTrap) {
      ctx.fillStyle = "#d91f2e";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 4;
      roundRect(ctx, -39, -62, 78, 20, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fffaf0";
      ctx.font = "900 10px Trebuchet MS";
      ctx.fillText("BOOBY TRAP", 0, -48);
      ctx.fillStyle = "#171216";
      ctx.font = "900 24px Trebuchet MS";
      ctx.fillText("!", 0, -12);
    } else {
      if (pickup.specialPrize) {
        ctx.fillStyle = "#171216";
        ctx.font = "900 10px Trebuchet MS";
        ctx.fillText("PRIZE", 0, -48);
      }
      ctx.fillStyle = "#171216";
      ctx.font = "900 24px Trebuchet MS";
      ctx.fillText("?", 0, -11);
    }
    ctx.fillStyle = "rgba(255,255,255,0.45)";
    ctx.fillRect(-18, -32, 36, 8);
    ctx.strokeStyle = "rgba(23,18,22,0.35)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-30, 8);
    ctx.lineTo(30, 8);
    ctx.stroke();
    ctx.restore();
  }

  function drawPickup(pickup) {
    if (pickup.kind === "rewardBox") {
      drawRewardBox(pickup);
      return;
    }
    if (pickup.kind === "pitTrap") {
      drawPitTrap(pickup);
      return;
    }
    if (pickup.kind === "fallingBatTrap") drawFallingBatTrap(pickup);
  }

  function drawPitTrap(pickup) {
    const now = performance.now();
    const armed = now >= pickup.armedAt;
    const pulse = Math.sin(now / 120) * 3;
    ctx.save();
    ctx.translate(pickup.x, pickup.y);
    ctx.globalAlpha = pickup.triggered ? 0.88 : armed ? 0.72 : 0.42;
    ctx.fillStyle = pickup.triggered ? "#171216" : "#5a4335";
    ctx.strokeStyle = armed ? "#d91f2e" : "#171216";
    ctx.lineWidth = armed ? 5 : 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, pickup.r + pulse, 18 + pulse * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * 13, -12);
      ctx.lineTo(i * 7 + Math.sin(now / 180 + i) * 8, 10);
      ctx.stroke();
    }
    if (!pickup.triggered) {
      ctx.fillStyle = "#ffd84a";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 3;
      ctx.font = "900 18px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.strokeText("!", 0, -24);
      ctx.fillText("!", 0, -24);
    }
    ctx.restore();
  }

  function drawFallingBatTrap(pickup) {
    const now = performance.now();
    const fall = clamp((now - (pickup.hitAt - 900)) / 900, 0, 1);
    const batY = pickup.hit ? pickup.y - 54 : 88 + (pickup.y - 88) * fall - 60;
    ctx.save();
    ctx.globalAlpha = pickup.hit ? 0.25 : 0.68;
    ctx.fillStyle = "#7d43d6";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(pickup.x, pickup.y + 2, 42 - fall * 10, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (!pickup.hit) {
      ctx.fillStyle = "#ffd84a";
      ctx.font = "900 17px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("BAT!", pickup.x, pickup.y - 28);
    }
    ctx.restore();

    ctx.save();
    ctx.translate(pickup.x, batY);
    ctx.scale(0.54, 0.54);
    drawTrapGhostBat(pickup.hit);
    ctx.restore();
  }

  function drawTrapGhostBat(hit) {
    const flap = Math.sin(performance.now() / 90) * 8;
    ctx.save();
    ctx.globalAlpha = hit ? 0.35 : 0.82;
    ctx.fillStyle = "#b7a6ff";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.bezierCurveTo(-20, -38 - flap, -46, -22 + flap, -58, 0);
    ctx.lineTo(-34, 8);
    ctx.lineTo(-16, 5);
    ctx.lineTo(0, -8);
    ctx.lineTo(16, 5);
    ctx.lineTo(34, 8);
    ctx.lineTo(58, 0);
    ctx.bezierCurveTo(46, -22 + flap, 20, -38 - flap, 0, -18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ede8ff";
    ctx.beginPath();
    ctx.ellipse(0, -13, 16, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#7d43d6";
    ctx.beginPath();
    ctx.arc(-6, -17, 3, 0, Math.PI * 2);
    ctx.arc(6, -17, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawFighter(fighter) {
    const now = performance.now();
    ctx.save();
    if (fighter.undergroundUntil > now) {
      drawUndergroundMound(fighter.x, fighter.y, fighter.character.accent);
      ctx.restore();
      drawPowerCue(fighter);
      return;
    }
    const alpha = fighter.hiddenUntil > now ? 0.17 : 1;
    const hitWiggle = now < fighter.hitShakeUntil ? Math.sin(now / 25) * 5 : 0;
    const hitBounce = now < fighter.hitShakeUntil ? Math.cos(now / 36) * 2 : 0;
    if (now < fighter.knockdownUntil) {
      ctx.translate(fighter.x + hitWiggle, fighter.y - fighter.z + hitBounce);
      ctx.rotate(-Math.PI / 2 * fighter.facing);
    } else {
      ctx.translate(fighter.x + hitWiggle, fighter.y - fighter.z + hitBounce);
    }
    ctx.globalAlpha = alpha;
    if (now < fighter.hitFlashUntil) {
      ctx.filter = Math.floor(now / 55) % 2 === 0 ? "brightness(1.7) saturate(1.3)" : "brightness(0.92)";
      ctx.shadowColor = "#fff7b0";
      ctx.shadowBlur = 18;
    }
    if (fighter.supercharged) drawSuperchargeAura(ctx);
    ctx.scale(fighter.facing, 1);
    const scale = 1;
    if (fighter.id === "mayor") drawMayor(ctx, fighter, scale);
    else if (fighter.id === "tats") drawTats(ctx, fighter, scale);
    else if (fighter.id === "fary") drawFary(ctx, fighter, scale);
    else if (fighter.id === "apple") drawApple(ctx, fighter, scale);
    else if (fighter.id === "yapping") drawYapping(ctx, fighter, scale);
    else if (fighter.id === "freddy") drawFreddy(ctx, fighter, scale);
    else if (fighter.id === "benji") drawBenji(ctx, fighter, scale);
    else if (fighter.id === "frost") drawFrost(ctx, fighter, scale);
    else if (fighter.id === "ness") drawNess(ctx, fighter, scale);
    else if (fighter.id === "crayon") drawCrayon(ctx, fighter, scale);
    else if (fighter.id === "hoodie") drawHoodie(ctx, fighter, scale);
    else if (fighter.id === "phantom") drawPhantom(ctx, fighter, scale);
    else if (fighter.id === "kingDock") drawKingDock(ctx, fighter, scale);
    ctx.restore();

    if (isWaterWorldActive() && fighter.id !== "kingDock") drawWaterWorldGear(fighter, now);
    if (now < fighter.hitFlashUntil) drawHitStar(fighter, now);

    if (fighter.shieldHits > 0) {
      ctx.save();
      ctx.strokeStyle = "rgba(73, 217, 255, 0.8)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(fighter.x, fighter.y - fighter.z - 55, 62, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    drawPowerCue(fighter);
  }

  function drawWaterWorldGear(fighter, now) {
    const active = now < fighter.waterFormUntil || now < fighter.waterWalkUntil || activeBenjiShark(fighter) || activeFreddyAnimal(fighter);
    ctx.save();
    ctx.globalAlpha = active ? 0.8 : 0.42;
    ctx.strokeStyle = active ? "#fffef7" : "#78d8ff";
    ctx.fillStyle = active ? "rgba(120,216,255,0.22)" : "rgba(120,216,255,0.12)";
    ctx.lineWidth = active ? 5 : 3;
    ctx.beginPath();
    ctx.ellipse(fighter.x, fighter.y + 5, 46, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (now < fighter.waterWalkUntil) {
      ctx.fillStyle = "rgba(190,245,255,0.78)";
      ctx.strokeStyle = "#146e8f";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(fighter.x - 25, fighter.y + 15, 26, 8, -0.12, 0, Math.PI * 2);
      ctx.ellipse(fighter.x + 25, fighter.y + 15, 26, 8, 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawHitStar(fighter, now) {
    const progress = clamp((fighter.hitFlashUntil - now) / 430, 0, 1);
    const rays = 8;
    ctx.save();
    ctx.translate(fighter.x, fighter.y - fighter.z - 62);
    ctx.rotate(now / 80);
    ctx.strokeStyle = fighter.isBoss ? "#ffd84a" : "#d91f2e";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i < rays; i += 1) {
      const angle = (Math.PI * 2 * i) / rays;
      const radius = (i % 2 === 0 ? 36 : 18) * progress;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawUndergroundMound(x, y, color) {
    ctx.save();
    ctx.translate(x, y + 10);
    ctx.fillStyle = "#7b4d25";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 58, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.arc(i * 26, -8 + Math.abs(i) * 4, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSuperchargeAura(c) {
    c.save();
    const pulse = Math.sin(performance.now() / 95) * 6;
    c.globalAlpha = 0.86;
    c.strokeStyle = "#ffd84a";
    c.fillStyle = "rgba(255,216,74,0.14)";
    c.lineWidth = 5;
    c.beginPath();
    c.ellipse(0, -58, 62 + pulse, 96 + pulse, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.strokeStyle = "#50d8ff";
    c.lineWidth = 4;
    for (let i = -1; i <= 1; i += 1) {
      const x = i * 34 + Math.sin(performance.now() / 130 + i) * 5;
      c.beginPath();
      c.moveTo(x, -150);
      c.lineTo(x - 16, -103);
      c.lineTo(x + 10, -108);
      c.lineTo(x - 12, -58);
      c.stroke();
    }
    c.restore();
  }

  function drawPowerCue(fighter) {
    const now = performance.now();
    if (!fighter.powerCue || fighter.powerCueUntil <= now) return;
    const duration = Math.max(1, fighter.powerCueUntil - fighter.powerCueBorn);
    const progress = clamp((now - fighter.powerCueBorn) / duration, 0, 1);
    const pulse = Math.sin(now / 75) * 4;
    const x = fighter.x;
    const y = fighter.y - fighter.z - 60;
    const color = fighter.character.accent || fighter.character.color || "#111";
    const label = fighter.powerCue.toUpperCase();

    ctx.save();
    ctx.globalAlpha = clamp(0.95 - progress * 0.45, 0, 1);
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.setLineDash([12, 8]);
    ctx.beginPath();
    ctx.arc(x, y, 66 + pulse + progress * 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.font = `${label.length > 18 ? 15 : 17}px Trebuchet MS`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const w = Math.min(250, ctx.measureText(label).width + 26);
    const labelX = clamp(x - w / 2, 18, WIDTH - w - 18);
    const labelY = clamp(y - 98, 84, HEIGHT - 64);
    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    roundRect(ctx, labelX, labelY, w, 28, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillText(label, labelX + w / 2, labelY + 15);
    ctx.restore();
  }

  function setupLine(ctx, color, width = 10) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  function drawHead(ctx, x, y, r, color) {
    ctx.save();
    setupLine(ctx, color, 7);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - 8, y - 3, 2.8, 0, Math.PI * 2);
    ctx.arc(x + 8, y - 3, 2.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y + 6, 9, 0.1, Math.PI - 0.1);
    ctx.stroke();
    ctx.restore();
  }

  function drawEvilHead(ctx, x, y, r, color, options = {}) {
    ctx.save();
    setupLine(ctx, color, 7);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x - 17, y - 13);
    ctx.lineTo(x - 5, y - 7);
    ctx.moveTo(x + 17, y - 13);
    ctx.lineTo(x + 5, y - 7);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(x - 9, y - 1, 4.4, 2.5, -0.28, 0, Math.PI * 2);
    ctx.ellipse(x + 9, y - 1, 4.4, 2.5, 0.28, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x - 9, y + 12);
    ctx.quadraticCurveTo(x + 2, y + 5, x + 14, y + 13);
    ctx.stroke();

    if (options.mustache) drawCrookedMustache(ctx, x, y + 8);
    ctx.restore();
  }

  function drawCrookedMustache(ctx, x, y) {
    ctx.save();
    ctx.strokeStyle = "#5b3018";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x - 3, y);
    ctx.bezierCurveTo(x - 13, y - 8, x - 26, y - 2, x - 31, y + 5);
    ctx.bezierCurveTo(x - 21, y + 1, x - 14, y + 7, x - 6, y + 4);
    ctx.moveTo(x + 3, y);
    ctx.bezierCurveTo(x + 14, y - 2, x + 25, y + 6, x + 31, y - 2);
    ctx.bezierCurveTo(x + 20, y + 12, x + 11, y + 5, x + 5, y + 7);
    ctx.stroke();
    ctx.restore();
  }

  function drawMayor(ctx, fighter) {
    const color = CHARACTERS.mayor.color;
    const accent = CHARACTERS.mayor.accent;
    setupLine(ctx, color, 10);
    drawEvilHead(ctx, 0, -112, 24, color, { mustache: true });
    ctx.beginPath();
    ctx.moveTo(0, -88);
    ctx.lineTo(0, -25);
    ctx.stroke();
    drawArms(ctx, fighter, color);
    ctx.beginPath();
    ctx.moveTo(0, -25);
    ctx.lineTo(-22, 35);
    ctx.moveTo(0, -25);
    ctx.lineTo(22, 35);
    ctx.stroke();
    setupLine(ctx, accent, 10);
    ctx.beginPath();
    ctx.moveTo(-22, 35);
    ctx.lineTo(-50, 62);
    ctx.moveTo(22, 35);
    ctx.lineTo(58, 58);
    ctx.stroke();
    if (isFlying(fighter)) {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.ellipse(-50, 78, 13, 30, -0.4, 0, Math.PI * 2);
      ctx.ellipse(58, 75, 13, 30, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = color;
    ctx.font = "900 32px Trebuchet MS";
    ctx.fillText("M", -15, -42);
  }

  function drawTats(ctx, fighter) {
    const color = CHARACTERS.tats.color;
    setupLine(ctx, color, 10);
    drawHead(ctx, 0, -112, 24, color);
    drawCloudMuscle(ctx, -58, -58, 1.2);
    drawCloudMuscle(ctx, 58, -58, 1.2);
    ctx.beginPath();
    ctx.moveTo(0, -88);
    ctx.lineTo(0, -20);
    ctx.stroke();
    drawTatsArms(ctx, fighter, color);
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(-23, 46);
    ctx.moveTo(0, -20);
    ctx.lineTo(28, 46);
    ctx.stroke();
  }

  function drawTatsArms(ctx, fighter, color) {
    const punching = fighter.action === "punch" || fighter.action === "giantPunch";
    const kicking = fighter.action === "kick";
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = "rgba(120, 201, 255, 0.22)";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (punching) {
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.moveTo(0, -70);
      ctx.lineTo(48, -72);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(55, -72, 28, 22, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = fighter.action === "giantPunch" ? 22 : 17;
      ctx.beginPath();
      ctx.moveTo(72, -72);
      ctx.lineTo(fighter.action === "giantPunch" ? 132 : 104, -76);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(fighter.action === "giantPunch" ? 148 : 118, -76, fighter.action === "giantPunch" ? 29 : 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.moveTo(0, -70);
      ctx.lineTo(-38, -45);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-48, -42, 24, 19, 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.lineWidth = 17;
      ctx.beginPath();
      ctx.moveTo(0, -70);
      ctx.lineTo(-42, -48);
      ctx.moveTo(0, -70);
      ctx.lineTo(42, -48);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-52, -45, 27, 23, 0.2, 0, Math.PI * 2);
      ctx.ellipse(52, -45, 27, 23, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(-72, -40);
      ctx.lineTo(-88, -24);
      ctx.moveTo(72, -40);
      ctx.lineTo(88, -24);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-92, -21, 11, 0, Math.PI * 2);
      ctx.arc(92, -21, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    if (kicking) {
      ctx.lineWidth = 13;
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(72, 15);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawCloudMuscle(ctx, x, y, s) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(s, s);
    ctx.strokeStyle = CHARACTERS.tats.color;
    ctx.lineWidth = 8;
    ctx.fillStyle = "rgba(120,201,255,0.2)";
    ctx.beginPath();
    ctx.arc(-22, 0, 22, 0, Math.PI * 2);
    ctx.arc(2, -16, 24, 0, Math.PI * 2);
    ctx.arc(30, 2, 22, 0, Math.PI * 2);
    ctx.arc(5, 14, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawFary(ctx, fighter) {
    const color = CHARACTERS.fary.color;
    setupLine(ctx, color, 8);
    ctx.fillStyle = "rgba(255,137,198,0.42)";
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(-32, -62, 28, 48, -0.25, 0, Math.PI * 2);
    ctx.ellipse(32, -62, 28, 48, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawHead(ctx, 0, -112, 22, color);
    ctx.beginPath();
    ctx.moveTo(0, -90);
    ctx.lineTo(0, -22);
    ctx.stroke();
    drawArms(ctx, fighter, color);
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(-22, 44);
    ctx.moveTo(0, -22);
    ctx.lineTo(24, 44);
    ctx.stroke();
  }

  function drawApple(ctx, fighter) {
    if (fighter.supercharged) {
      drawCheetahRacer(ctx, fighter);
      return;
    }
    const color = CHARACTERS.apple.color;
    setupLine(ctx, color, 9);
    drawHead(ctx, 0, -112, 23, color);
    ctx.beginPath();
    ctx.arc(-2, -142, 11, 0.1, Math.PI * 1.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -88);
    ctx.lineTo(0, -22);
    ctx.stroke();
    drawArms(ctx, fighter, color);
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(-23, 44);
    ctx.moveTo(0, -22);
    ctx.lineTo(28, 44);
    ctx.stroke();
  }

  function drawCheetahRacer(ctx, fighter) {
    const yellow = "#f5c242";
    const black = "#171216";
    ctx.save();
    setupLine(ctx, yellow, 9);

    ctx.strokeStyle = yellow;
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(10, -36);
    ctx.bezierCurveTo(48, -43, 56, -12, 32, 12);
    ctx.stroke();
    ctx.fillStyle = black;
    ctx.beginPath();
    ctx.arc(34, 10, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = yellow;
    ctx.strokeStyle = black;
    ctx.lineWidth = 4;
    roundRect(ctx, -20, -88, 40, 66, 12);
    ctx.fill();
    ctx.stroke();
    drawCheetahSpots(ctx, [
      [-10, -74, 4], [9, -68, 3.6], [-3, -54, 3.8],
      [12, -42, 4], [-11, -34, 3.6]
    ]);

    drawCheetahRacerHead(ctx, yellow, black);

    drawArms(ctx, fighter, yellow);
    drawCheetahSpots(ctx, [[-29, -53, 3], [28, -55, 3], [39, -44, 3]]);
    if (fighter.action === "punch" || fighter.action === "power") drawCheetahClawMarks(ctx, black);

    setupLine(ctx, yellow, 9);
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(-25, 44);
    ctx.moveTo(0, -22);
    ctx.lineTo(28, 44);
    ctx.stroke();
    drawCheetahSpots(ctx, [[-16, 10, 3], [18, 13, 3], [25, 31, 3]]);
    ctx.restore();
  }

  function drawCheetahRacerHead(ctx, yellow, black) {
    ctx.fillStyle = yellow;
    ctx.strokeStyle = black;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, -112, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-18, -131);
    ctx.lineTo(-28, -152);
    ctx.lineTo(-7, -137);
    ctx.moveTo(18, -131);
    ctx.lineTo(28, -152);
    ctx.lineTo(7, -137);
    ctx.fill();
    ctx.stroke();

    drawCheetahSpots(ctx, [[-9, -125, 3], [9, -128, 3], [0, -137, 3], [-15, -111, 2.7], [14, -109, 2.7]]);
    ctx.fillStyle = black;
    ctx.beginPath();
    ctx.arc(-8, -115, 2.8, 0, Math.PI * 2);
    ctx.arc(8, -115, 2.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, -105, 8, 0.12, Math.PI - 0.12);
    ctx.stroke();
  }

  function drawCheetahSpots(ctx, spots) {
    const previous = ctx.fillStyle;
    ctx.fillStyle = "#171216";
    spots.forEach(([x, y, r]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = previous;
  }

  function drawCheetahClawMarks(ctx, black) {
    ctx.save();
    ctx.strokeStyle = black;
    ctx.lineWidth = 4;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.moveTo(96, -84 + i * 8);
      ctx.lineTo(118, -94 + i * 8);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawYapping(ctx, fighter) {
    const color = CHARACTERS.yapping.color;
    setupLine(ctx, color, 9);
    drawEvilHead(ctx, 0, -112, 23, color);
    ctx.beginPath();
    ctx.moveTo(0, -88);
    ctx.lineTo(0, -22);
    ctx.stroke();
    drawArms(ctx, fighter, color);
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(-24, 44);
    ctx.moveTo(0, -22);
    ctx.lineTo(30, 44);
    ctx.stroke();
    ctx.fillStyle = "#d61f2f";
    ctx.fillRect(16, -115, 18, 9);
  }

  function drawFreddy(ctx, fighter) {
    const animalForm = activeFreddyAnimal(fighter);
    if (animalForm) {
      drawFreddyAnimal(ctx, animalForm, fighter);
      return;
    }
    const shirt = CHARACTERS.freddy.color;
    setupLine(ctx, "#17633c", 8);
    ctx.fillStyle = "#17633c";
    roundRect(ctx, -20, -84, 40, 66, 9);
    ctx.fill();
    ctx.stroke();

    drawFreddyHead(ctx);

    ctx.strokeStyle = "#17633c";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-15, -70);
    ctx.lineTo(-42, -43);
    ctx.moveTo(15, -70);
    ctx.lineTo(43, -44);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-10, -20);
    ctx.lineTo(-24, 40);
    ctx.moveTo(10, -20);
    ctx.lineTo(26, 40);
    ctx.stroke();
    drawFreddyShoe(ctx, -29, 48);
    drawFreddyShoe(ctx, 31, 48);

    ctx.fillStyle = "#0f4a2b";
    ctx.font = "900 21px Trebuchet MS";
    ctx.fillText("F", -7, -45);
  }

  function drawFreddyHead(ctx) {
    ctx.save();
    ctx.strokeStyle = "#17633c";
    ctx.lineWidth = 6;
    ctx.fillStyle = "#f6d2a6";
    ctx.beginPath();
    ctx.arc(0, -112, 23, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f0cf62";
    ctx.beginPath();
    ctx.moveTo(-23, -126);
    ctx.quadraticCurveTo(-10, -150, 6, -134);
    ctx.quadraticCurveTo(18, -146, 24, -122);
    ctx.lineTo(18, -117);
    ctx.quadraticCurveTo(0, -128, -20, -116);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#7b5b35";
    ctx.beginPath();
    ctx.arc(-8, -113, 3, 0, Math.PI * 2);
    ctx.arc(8, -113, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#17633c";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, -105, 8, 0.15, Math.PI - 0.15);
    ctx.stroke();
    ctx.restore();
  }

  function drawFreddyShoe(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = "#101010";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    roundRect(ctx, x - 16, y - 6, 32, 13, 5);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(x - 7 + i * 5, y - 4);
      ctx.lineTo(x - 10 + i * 5, y + 4);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBenji(ctx, fighter) {
    const sharkForm = activeBenjiShark(fighter);
    if (sharkForm) {
      drawBenjiShark(ctx, sharkForm);
      return;
    }
    const shirt = CHARACTERS.benji.color;
    setupLine(ctx, shirt, 8);
    ctx.fillStyle = "#9b9ea5";
    roundRect(ctx, -20, -84, 40, 66, 8);
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-14, -68);
    ctx.lineTo(-42, -44);
    ctx.moveTo(14, -68);
    ctx.lineTo(42, -44);
    ctx.stroke();

    ctx.strokeStyle = "#111";
    ctx.beginPath();
    ctx.moveTo(-10, -20);
    ctx.lineTo(-24, 42);
    ctx.moveTo(10, -20);
    ctx.lineTo(26, 42);
    ctx.stroke();
    drawPlainShoe(ctx, -28, 48);
    drawPlainShoe(ctx, 30, 48);
    drawBenjiHead(ctx);
  }

  function drawFrost(ctx, fighter) {
    const color = CHARACTERS.frost.color;
    const accent = CHARACTERS.frost.accent;
    setupLine(ctx, color, 9);
    drawHead(ctx, 0, -112, 23, color);
    ctx.fillStyle = "rgba(108,240,194,0.22)";
    ctx.strokeStyle = accent;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-28, -88);
    ctx.lineTo(0, -105);
    ctx.lineTo(28, -88);
    ctx.lineTo(12, -96);
    ctx.lineTo(0, -82);
    ctx.lineTo(-12, -96);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    setupLine(ctx, color, 9);
    ctx.beginPath();
    ctx.moveTo(0, -88);
    ctx.lineTo(0, -22);
    ctx.stroke();
    drawArms(ctx, fighter, color);
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(-28, 48);
    ctx.moveTo(0, -22);
    ctx.lineTo(28, 48);
    ctx.stroke();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-26, 48);
    ctx.lineTo(-52, 62);
    ctx.moveTo(28, 48);
    ctx.lineTo(54, 62);
    ctx.stroke();
  }

  function drawNess(ctx, fighter) {
    const color = CHARACTERS.ness.color;
    const accent = CHARACTERS.ness.accent;
    setupLine(ctx, color, 8);
    ctx.fillStyle = "rgba(107,216,255,0.28)";
    ctx.strokeStyle = accent;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-28, -82);
    ctx.lineTo(-56, -24);
    ctx.lineTo(-18, -42);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    setupLine(ctx, color, 9);
    drawHead(ctx, 0, -112, 23, color);
    ctx.beginPath();
    ctx.moveTo(0, -88);
    ctx.lineTo(0, -22);
    ctx.stroke();
    drawArms(ctx, fighter, color);
    ctx.beginPath();
    ctx.moveTo(0, -22);
    ctx.lineTo(-24, 48);
    ctx.moveTo(0, -22);
    ctx.lineTo(28, 48);
    ctx.stroke();
    if (fighter.action === "kick") {
      ctx.strokeStyle = accent;
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(10, -20);
      ctx.lineTo(92, 12);
      ctx.stroke();
    }
    ctx.fillStyle = accent;
    ctx.font = "900 24px Trebuchet MS";
    ctx.fillText("N", -9, -42);
  }

  function drawBenjiHead(ctx) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.fillStyle = "#f2c99d";
    ctx.beginPath();
    ctx.arc(0, -112, 23, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#b68a45";
    ctx.beginPath();
    ctx.moveTo(-23, -126);
    ctx.quadraticCurveTo(-16, -150, -2, -135);
    ctx.quadraticCurveTo(9, -148, 24, -125);
    ctx.lineTo(18, -117);
    ctx.quadraticCurveTo(3, -129, -20, -116);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#2f74d0";
    ctx.beginPath();
    ctx.arc(-8, -113, 3.4, 0, Math.PI * 2);
    ctx.arc(8, -113, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, -104, 7, 0.12, Math.PI - 0.12);
    ctx.stroke();
    ctx.restore();
  }

  function drawPlainShoe(ctx, x, y) {
    ctx.save();
    ctx.fillStyle = "#111";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    roundRect(ctx, x - 15, y - 6, 30, 13, 5);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawBenjiShark(ctx, sharkForm) {
    const style = benjiSharkStyle(sharkForm);
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = style.body;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    drawRealShark(ctx, sharkForm, style);
    drawAnimalNameTag(ctx, sharkForm.name);
    ctx.restore();
  }

  function drawFreddyAnimal(ctx, animalForm, fighter) {
    ctx.save();
    const style = animalVisualStyle(animalForm);
    const small = animalForm.small;
    const scale = small ? 0.72 : 1;
    ctx.scale(scale, scale);
    ctx.translate(0, small ? -28 : 0);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = style.body;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (animalForm.category === "fish") {
      drawRealFish(ctx, animalForm, style);
    } else if (animalForm.category === "bird" || animalForm.fly) {
      drawRealBird(ctx, animalForm, style);
    } else if (animalForm.category === "reptile" || animalForm.category === "amphibian") {
      drawRealReptile(ctx, animalForm, style);
    } else if (animalForm.category === "insect") {
      drawRealInsect(ctx, animalForm, style);
    } else {
      drawRealMammal(ctx, animalForm, style);
    }

    drawAnimalNameTag(ctx, animalForm.name);
    ctx.restore();
  }

  function animalVisualStyle(animalForm) {
    const base = {
      mammal: "#9c6b3e",
      reptile: "#2c9b55",
      bird: "#4f8fd8",
      amphibian: "#5cbc6e",
      fish: "#45a6db",
      insect: "#d8a22f"
    };
    const colors = {
      Gorilla: ["#3e352f", "#6e5a4a"], Lion: ["#c9933e", "#8b5424"], Bear: ["#6b442a", "#a57a56"],
      Cheetah: ["#d5a13b", "#171216"], Wolf: ["#7d8588", "#d8d8d8"], Tiger: ["#e4862d", "#171216"],
      Elephant: ["#8b9398", "#d9dde0"], "Woolly Mammoth": ["#7a4a2a", "#d8c29b"], Rhino: ["#8b8d82", "#d9dde0"],
      Kangaroo: ["#b7773e", "#e2b176"], Bat: ["#2f2836", "#5a4d66"], Monkey: ["#8a5735", "#d9a46a"], Dolphin: ["#4e9ec9", "#d5f4ff"],
      Snake: ["#47743b", "#d7c34a"], Cobra: ["#4f6f2a", "#e0cf6a"], Python: ["#6b5735", "#b99a5e"],
      Crocodile: ["#335f35", "#7ba45d"], Alligator: ["#274f31", "#81a96a"], Turtle: ["#4f7a45", "#8a6b3d"], Tortoise: ["#6f6a3f", "#9b814d"],
      Chameleon: ["#42a657", "#f5d24b"], Gecko: ["#55bd79", "#f6e77b"], Iguana: ["#3f9a63", "#96c85c"], "Komodo Dragon": ["#796f54", "#b7a982"],
      "T. Rex": ["#6e7f3c", "#d7c066"], Lizard: ["#49a05f", "#b8e086"], Frog: ["#43aa53", "#f3e16d"], Toad: ["#8b8752", "#d7c97b"],
      "Tree Frog": ["#56c768", "#f7f28a"], Bullfrog: ["#5c8d45", "#d6c982"], Salamander: ["#2f6f4f", "#ffcf54"], Newt: ["#3f755a", "#f28c30"],
      Axolotl: ["#f4a8bf", "#fbdce6"], "Fire Salamander": ["#171216", "#ffd12f"], "Poison Dart Frog": ["#2a79d8", "#111"], "Glass Frog": ["#8fe090", "#eaffde"],
      Mudpuppy: ["#8a5c4c", "#d19a75"], Caecilian: ["#5b4f64", "#d7ccd8"],
      Archerfish: ["#d6c18a", "#4f3728"], Shark: ["#7f929e", "#f6f7f8"], Swordfish: ["#5b84a3", "#e6f7ff"], Pufferfish: ["#e0b84f", "#774d28"],
      "Electric Eel": ["#577052", "#f4d44e"], Clownfish: ["#f47b20", "#ffffff"], Goldfish: ["#ef8a24", "#ffd36a"], Anglerfish: ["#3c3444", "#f4d44e"],
      Stingray: ["#58798d", "#d9eef5"], "Flying Fish": ["#5fa7ce", "#d9f7ff"], Seahorse: ["#d89038", "#ffe1a3"], Tuna: ["#518aa9", "#d9eef5"],
      Ant: ["#4a231c", "#7e3027"], Bee: ["#f1c232", "#171216"], Wasp: ["#e2b92e", "#171216"], Butterfly: ["#ff89c6", "#8542d8"],
      Mantis: ["#63a54b", "#d2ed88"], Beetle: ["#326a55", "#171216"], Grasshopper: ["#6aaa44", "#d4ec82"], Dragonfly: ["#45a6db", "#d9f7ff"],
      Firefly: ["#576b36", "#f5ef6a"], Mosquito: ["#6d7078", "#d9eef5"], Cricket: ["#5c6c36", "#c6d783"], Ladybug: ["#d91f2e", "#171216"]
    };
    const picked = colors[animalForm.name] || [base[animalForm.category] || "#17633c", "#fff"];
    return { body: picked[0], accent: picked[1], ink: "#171216" };
  }

  function benjiSharkStyle(sharkForm) {
    const colors = {
      "Great White Shark": ["#7f929e", "#f6f7f8"],
      "Hammerhead Shark": ["#8b9499", "#e8eef2"],
      "Tiger Shark": ["#6f8489", "#30383b"],
      "Mako Shark": ["#4d83a7", "#d9f3ff"],
      "Whale Shark": ["#526d80", "#ffffff"]
    };
    const picked = colors[sharkForm.name] || ["#7f929e", "#f6f7f8"];
    return { body: picked[0], accent: picked[1], ink: "#171216" };
  }

  function drawRealShark(ctx, sharkForm, style) {
    const name = sharkForm.name;
    ctx.fillStyle = style.body;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.ellipse(0, -56, name === "Whale Shark" ? 72 : 64, name === "Whale Shark" ? 30 : 24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = style.accent;
    ctx.beginPath();
    ctx.ellipse(8, -46, name === "Whale Shark" ? 54 : 44, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = style.body;
    ctx.beginPath();
    ctx.moveTo(-55, -56);
    ctx.lineTo(-98, -86);
    ctx.lineTo(-90, -55);
    ctx.lineTo(-98, -25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-7, -79);
    ctx.lineTo(16, -126);
    ctx.lineTo(28, -78);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-4, -37);
    ctx.lineTo(-26, 2);
    ctx.lineTo(20, -34);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    if (name === "Hammerhead Shark") {
      ctx.beginPath();
      ctx.ellipse(57, -63, 42, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      drawAnimalEye(ctx, 28, -68);
      drawAnimalEye(ctx, 86, -68);
    } else {
      ctx.beginPath();
      ctx.arc(57, -60, name === "Whale Shark" ? 24 : 21, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      drawAnimalEye(ctx, 64, -66);
    }

    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.moveTo(68, -51);
    ctx.lineTo(91, -45);
    ctx.lineTo(70, -40);
    ctx.stroke();

    ctx.fillStyle = "#fff";
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.moveTo(70 + i * 6, -49);
      ctx.lineTo(73 + i * 6, -42);
      ctx.lineTo(67 + i * 6, -42);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    if (name === "Tiger Shark") drawStripes(ctx, 2, -60, 82, 30);
    if (name === "Whale Shark") drawWhaleSharkSpots(ctx);
    if (name === "Mako Shark") {
      ctx.strokeStyle = "#d9f3ff";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-42, -69);
      ctx.quadraticCurveTo(10, -88, 60, -73);
      ctx.stroke();
    }
  }

  function drawWhaleSharkSpots(ctx) {
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 12; i += 1) {
      ctx.beginPath();
      ctx.arc(-36 + (i % 6) * 16, -70 + Math.floor(i / 6) * 18, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawRealMammal(ctx, animalForm, style) {
    const name = animalForm.name;
    if (name === "Dolphin") return drawRealFish(ctx, animalForm, style);
    if (name === "Bat") return drawRealBat(ctx, style);
    if (name === "Gorilla") return drawRealGorilla(ctx, style);
    ctx.fillStyle = style.body;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(-8, -58, animalForm.strong ? 60 : 50, animalForm.strong ? 34 : 27, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(47, -80, animalForm.strong ? 24 : 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (["Lion", "Tiger", "Wolf", "Bear", "Cheetah"].includes(name)) drawPointyEars(ctx);
    drawAnimalEye(ctx, 56, -84);
    drawAnimalLegs(ctx, animalForm.strong ? 10 : 7);
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-58, -58);
    ctx.quadraticCurveTo(-88, -78, -95, -42);
    ctx.stroke();
    if (name === "Lion") drawMane(ctx, style.accent);
    if (name === "Tiger") drawStripes(ctx, -8, -58, 58, 34);
    if (name === "Cheetah") drawSpots(ctx, -18, -62, 7);
    if (name === "Elephant" || name === "Woolly Mammoth") drawElephantParts(ctx, style, name === "Woolly Mammoth");
    if (name === "Rhino") drawRhinoHorn(ctx);
    if (name === "Kangaroo") drawKangarooParts(ctx);
    if (name === "Monkey") drawMonkeyTail(ctx);
  }

  function drawRealGorilla(ctx, style) {
    ctx.fillStyle = style.body;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.ellipse(0, -62, 45, 54, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = style.accent;
    ctx.beginPath();
    ctx.ellipse(0, -72, 24, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = style.body;
    ctx.beginPath();
    ctx.arc(0, -123, 27, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawAnimalEye(ctx, -8, -128);
    drawAnimalEye(ctx, 10, -128);
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(-34, -80);
    ctx.lineTo(-82, -18);
    ctx.moveTo(34, -80);
    ctx.lineTo(82, -18);
    ctx.stroke();
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-18, -20);
    ctx.lineTo(-38, 40);
    ctx.moveTo(18, -20);
    ctx.lineTo(38, 40);
    ctx.stroke();
  }

  function drawRealBat(ctx, style) {
    ctx.fillStyle = style.body;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-8, -80);
    ctx.lineTo(-92, -112);
    ctx.lineTo(-72, -76);
    ctx.lineTo(-104, -48);
    ctx.lineTo(-32, -54);
    ctx.lineTo(0, -72);
    ctx.lineTo(32, -54);
    ctx.lineTo(104, -48);
    ctx.lineTo(72, -76);
    ctx.lineTo(92, -112);
    ctx.lineTo(8, -80);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, -67, 20, 29, 0, 0, Math.PI * 2);
    ctx.arc(0, -105, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawAnimalEye(ctx, -6, -108);
    drawAnimalEye(ctx, 8, -108);
  }

  function drawRealBird(ctx, animalForm, style) {
    const name = animalForm.name;
    ctx.fillStyle = style.body;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 5;
    if (name === "Ostrich") {
      ctx.beginPath();
      ctx.ellipse(-12, -50, 42, 35, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(25, -75);
      ctx.lineTo(45, -132);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(48, -140, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      drawBirdLegs(ctx, 50);
    } else if (name === "Penguin") {
      ctx.beginPath();
      ctx.ellipse(0, -68, 34, 55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.ellipse(4, -58, 20, 36, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      drawBirdLegs(ctx, 12);
    } else {
      ctx.beginPath();
      ctx.ellipse(0, -62, 36, 42, -0.2, 0, Math.PI * 2);
      ctx.ellipse(-42, -62, 42, 18, -0.42, 0, Math.PI * 2);
      ctx.ellipse(36, -62, 44, 16, 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      drawBirdLegs(ctx, 28);
      if (name === "Hummingbird") drawWingBlur(ctx);
    }
    ctx.fillStyle = style.body;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(34, -86, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f0cf62";
    ctx.beginPath();
    ctx.moveTo(51, -88);
    ctx.lineTo(name === "Woodpecker" ? 92 : 74, -82);
    ctx.lineTo(51, -75);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    drawAnimalEye(ctx, 41, -91);
    if (name === "Parrot") drawFeatherStripe(ctx, "#d91f2e");
    if (name === "Owl") drawOwlFace(ctx);
  }

  function drawRealFish(ctx, animalForm, style) {
    const name = animalForm.name;
    ctx.fillStyle = style.body;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 5;
    if (name === "Electric Eel") {
      ctx.beginPath();
      ctx.ellipse(0, -54, 78, 15, 0.06, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = style.accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-48, -54);
      ctx.lineTo(-18, -68);
      ctx.lineTo(12, -52);
      ctx.lineTo(45, -64);
      ctx.stroke();
    } else if (name === "Stingray") {
      ctx.beginPath();
      ctx.ellipse(0, -56, 62, 31, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-54, -52);
      ctx.quadraticCurveTo(-96, -54, -116, -34);
      ctx.stroke();
    } else if (name === "Seahorse") {
      ctx.beginPath();
      ctx.ellipse(10, -66, 28, 42, -0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-8, -28);
      ctx.bezierCurveTo(-34, -18, -25, 13, -2, 4);
      ctx.stroke();
    } else {
      const wide = name === "Pufferfish";
      ctx.beginPath();
      ctx.ellipse(0, -54, wide ? 42 : 58, wide ? 36 : 25, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-50, -54);
      ctx.lineTo(-84, -78);
      ctx.lineTo(-82, -30);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-8, -78);
      ctx.lineTo(14, -110);
      ctx.lineTo(24, -78);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    if (name === "Shark") drawSharkParts(ctx);
    if (name === "Swordfish") drawSwordfishBill(ctx);
    if (name === "Clownfish") drawClownfishStripes(ctx);
    if (name === "Anglerfish") drawAnglerLight(ctx, style.accent);
    if (name === "Flying Fish") drawFlyingFishWings(ctx);
    if (animalForm.waterShot) drawArcherfishWater(ctx);
    drawAnimalEye(ctx, 25, -62);
  }

  function drawRealReptile(ctx, animalForm, style) {
    const name = animalForm.name;
    ctx.fillStyle = style.body;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 5;
    if (["Snake", "Cobra", "Python", "Caecilian"].includes(name)) {
      ctx.beginPath();
      ctx.ellipse(0, -42, 72, 17, 0, 0, Math.PI * 2);
      ctx.arc(64, -44, 17, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      if (name === "Cobra") drawCobraHood(ctx, style.accent);
    } else if (["Turtle", "Tortoise"].includes(name)) {
      ctx.beginPath();
      ctx.ellipse(-8, -52, 52, 30, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = style.accent;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-45, -52);
      ctx.lineTo(28, -52);
      ctx.moveTo(-16, -76);
      ctx.lineTo(-16, -27);
      ctx.stroke();
    } else if (animalForm.category === "amphibian" && animalForm.jump) {
      drawRealFrog(ctx, animalForm, style);
      return;
    } else {
      ctx.beginPath();
      ctx.ellipse(0, -48, name === "T. Rex" ? 60 : 68, name === "T. Rex" ? 38 : 20, 0, 0, Math.PI * 2);
      ctx.arc(58, -58, name === "T. Rex" ? 30 : 19, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.lineWidth = name === "T. Rex" ? 10 : 6;
      ctx.beginPath();
      ctx.moveTo(-30, -32);
      ctx.lineTo(-48, 22);
      ctx.moveTo(24, -32);
      ctx.lineTo(46, 24);
      ctx.moveTo(-62, -48);
      ctx.quadraticCurveTo(-104, -38, -122, -24);
      ctx.stroke();
      if (["Crocodile", "Alligator", "Komodo Dragon"].includes(name)) drawToothyMouth(ctx);
    }
    drawAnimalEye(ctx, 65, -62);
  }

  function drawRealFrog(ctx, animalForm, style) {
    ctx.fillStyle = style.body;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(0, -55, 47, 30, 0, 0, Math.PI * 2);
    ctx.arc(-22, -82, 12, 0, Math.PI * 2);
    ctx.arc(22, -82, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-28, -35);
    ctx.lineTo(-72, 18);
    ctx.moveTo(28, -35);
    ctx.lineTo(72, 18);
    ctx.stroke();
    if (animalForm.name === "Poison Dart Frog") drawSpots(ctx, 0, -55, 8);
  }

  function drawRealInsect(ctx, animalForm, style) {
    const name = animalForm.name;
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = 5;
    if (name === "Butterfly") drawButterflyWings(ctx, style);
    else if (name === "Dragonfly") drawDragonflyWings(ctx);
    else if (animalForm.fly) drawSmallWings(ctx);
    ctx.fillStyle = style.body;
    ctx.beginPath();
    ctx.ellipse(0, -58, 24, 34, 0, 0, Math.PI * 2);
    ctx.ellipse(0, -96, 17, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (["Bee", "Wasp"].includes(name)) drawInsectStripes(ctx);
    if (name === "Ladybug") drawSpots(ctx, 0, -58, 7);
    if (name === "Beetle") drawShellLine(ctx);
    ctx.strokeStyle = style.ink;
    ctx.lineWidth = name === "Mantis" ? 6 : 4;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.moveTo(-17, -62 + i * 12);
      ctx.lineTo(-56, -78 + i * 20);
      ctx.moveTo(17, -62 + i * 12);
      ctx.lineTo(56, -78 + i * 20);
      ctx.stroke();
    }
    if (name === "Grasshopper" || name === "Cricket") {
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(-12, -38);
      ctx.lineTo(-58, 28);
      ctx.moveTo(12, -38);
      ctx.lineTo(58, 28);
      ctx.stroke();
    }
    drawAnimalEye(ctx, -6, -99);
    drawAnimalEye(ctx, 8, -99);
  }

  function drawAnimalEye(ctx, x, y) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(x + 1, y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawAnimalLegs(ctx, width) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(-34, -34);
    ctx.lineTo(-45, 36);
    ctx.moveTo(12, -34);
    ctx.lineTo(25, 38);
    ctx.stroke();
  }

  function drawPointyEars(ctx) {
    ctx.beginPath();
    ctx.moveTo(43, -102);
    ctx.lineTo(34, -119);
    ctx.lineTo(57, -106);
    ctx.moveTo(60, -101);
    ctx.lineTo(72, -117);
    ctx.lineTo(72, -95);
    ctx.fill();
    ctx.stroke();
  }

  function drawMane(ctx, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i < 12; i += 1) {
      const a = (i / 12) * Math.PI * 2;
      const r = i % 2 ? 29 : 37;
      const x = 48 + Math.cos(a) * r;
      const y = -80 + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawStripes(ctx, x, y, w, h) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.moveTo(x + i * 18, y - h / 2 + 5);
      ctx.lineTo(x + i * 12 - 8, y + h / 2 - 4);
      ctx.stroke();
    }
  }

  function drawSpots(ctx, x, y, count) {
    ctx.fillStyle = "#171216";
    for (let i = 0; i < count; i += 1) {
      ctx.beginPath();
      ctx.arc(x - 28 + (i % 4) * 19, y - 12 + Math.floor(i / 4) * 20, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawElephantParts(ctx, style, mammoth) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.fillStyle = style.body;
    ctx.beginPath();
    ctx.ellipse(32, -86, 20, 28, -0.45, 0, Math.PI * 2);
    ctx.ellipse(61, -86, 20, 28, 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(65, -72);
    ctx.quadraticCurveTo(92, -47, 66, -19);
    ctx.stroke();
    ctx.strokeStyle = "#f5f0dc";
    ctx.beginPath();
    ctx.moveTo(59, -67);
    ctx.quadraticCurveTo(80, -47, 98, -63);
    ctx.moveTo(51, -66);
    ctx.quadraticCurveTo(62, -44, 43, -31);
    ctx.stroke();
    if (mammoth) {
      ctx.strokeStyle = style.accent;
      ctx.lineWidth = 4;
      for (let i = -4; i <= 4; i += 1) {
        ctx.beginPath();
        ctx.moveTo(i * 14, -86);
        ctx.lineTo(i * 14 - 7, -30);
        ctx.stroke();
      }
    }
  }

  function drawRhinoHorn(ctx) {
    ctx.fillStyle = "#e8e1cf";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(66, -86);
    ctx.lineTo(105, -95);
    ctx.lineTo(72, -73);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawKangarooParts(ctx) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-54, -48);
    ctx.quadraticCurveTo(-105, -18, -112, 34);
    ctx.moveTo(12, -32);
    ctx.lineTo(58, 42);
    ctx.moveTo(-18, -34);
    ctx.lineTo(-36, 28);
    ctx.stroke();
  }

  function drawMonkeyTail(ctx) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-58, -60);
    ctx.bezierCurveTo(-112, -98, -112, -24, -76, -34);
    ctx.stroke();
  }

  function drawBirdLegs(ctx, spread) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-8, -24);
    ctx.lineTo(-spread / 2, 38);
    ctx.moveTo(8, -24);
    ctx.lineTo(spread / 2, 38);
    ctx.stroke();
  }

  function drawWingBlur(ctx) {
    ctx.strokeStyle = "rgba(120, 201, 255, 0.85)";
    ctx.lineWidth = 4;
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.ellipse(-42, -68, 58, 10 + i * 4, -0.5, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function drawFeatherStripe(ctx, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(-23, -70);
    ctx.lineTo(22, -55);
    ctx.stroke();
  }

  function drawOwlFace(ctx) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(27, -89, 10, 0, Math.PI * 2);
    ctx.arc(43, -89, 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawSharkParts(ctx) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(28, -48);
    ctx.lineTo(56, -44);
    ctx.lineTo(34, -36);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  function drawSwordfishBill(ctx) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(50, -55);
    ctx.lineTo(112, -61);
    ctx.stroke();
  }

  function drawClownfishStripes(ctx) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 9;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * 25, -76);
      ctx.lineTo(i * 20, -34);
      ctx.stroke();
    }
  }

  function drawAnglerLight(ctx, color) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(15, -78);
    ctx.quadraticCurveTo(32, -118, 58, -104);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(62, -104, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawFlyingFishWings(ctx) {
    ctx.fillStyle = "rgba(217,247,255,0.72)";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(-8, -74, 48, 12, -0.5, 0, Math.PI * 2);
    ctx.ellipse(-8, -38, 48, 12, 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawArcherfishWater(ctx) {
    ctx.strokeStyle = "#45a6db";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(52, -54);
    ctx.lineTo(82, -61);
    ctx.stroke();
  }

  function drawCobraHood(ctx, color) {
    ctx.fillStyle = color;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(54, -44, 30, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawToothyMouth(ctx) {
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 4; i += 1) {
      ctx.beginPath();
      ctx.moveTo(66 + i * 8, -47);
      ctx.lineTo(70 + i * 8, -36);
      ctx.lineTo(62 + i * 8, -36);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  function drawButterflyWings(ctx, style) {
    ctx.fillStyle = style.accent;
    ctx.beginPath();
    ctx.ellipse(-34, -82, 34, 45, -0.3, 0, Math.PI * 2);
    ctx.ellipse(34, -82, 34, 45, 0.3, 0, Math.PI * 2);
    ctx.ellipse(-28, -40, 24, 28, 0.4, 0, Math.PI * 2);
    ctx.ellipse(28, -40, 24, 28, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawDragonflyWings(ctx) {
    ctx.fillStyle = "rgba(217,247,255,0.75)";
    ctx.beginPath();
    ctx.ellipse(-34, -82, 46, 12, -0.2, 0, Math.PI * 2);
    ctx.ellipse(34, -82, 46, 12, 0.2, 0, Math.PI * 2);
    ctx.ellipse(-34, -60, 46, 12, 0.2, 0, Math.PI * 2);
    ctx.ellipse(34, -60, 46, 12, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawSmallWings(ctx) {
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.ellipse(-24, -80, 18, 28, -0.35, 0, Math.PI * 2);
    ctx.ellipse(24, -80, 18, 28, 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawInsectStripes(ctx) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    for (let i = -1; i <= 1; i += 1) {
      ctx.beginPath();
      ctx.moveTo(-18, -58 + i * 13);
      ctx.lineTo(18, -58 + i * 13);
      ctx.stroke();
    }
  }

  function drawShellLine(ctx) {
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -89);
    ctx.lineTo(0, -25);
    ctx.stroke();
  }

  function drawAnimalNameTag(ctx, name) {
    ctx.fillStyle = "#171216";
    ctx.font = name.length > 13 ? "900 12px Trebuchet MS" : "900 14px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(name, 0, -128);
  }

  function drawCrayon(ctx, fighter) {
    const color = CHARACTERS.crayon.color;
    setupLine(ctx, color, 9);
    drawHead(ctx, 0, -112, 23, color);
    ctx.fillStyle = "#f5d129";
    ctx.beginPath();
    ctx.moveTo(-20, -144);
    ctx.lineTo(20, -144);
    ctx.lineTo(0, -174);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -88);
    ctx.lineTo(0, -20);
    ctx.stroke();
    drawArms(ctx, fighter, color);
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(-25, 44);
    ctx.moveTo(0, -20);
    ctx.lineTo(28, 44);
    ctx.stroke();
  }

  function drawHoodie(ctx, fighter) {
    const color = CHARACTERS.hoodie.color;
    setupLine(ctx, color, 9);
    ctx.fillStyle = "#1f1f29";
    ctx.strokeStyle = "#49d9ff";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, -112, 31, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawHead(ctx, 0, -112, 19, "#49d9ff");
    setupLine(ctx, color, 12);
    ctx.beginPath();
    ctx.moveTo(0, -88);
    ctx.lineTo(0, -18);
    ctx.stroke();
    drawArms(ctx, fighter, "#49d9ff");
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(-24, 44);
    ctx.moveTo(0, -18);
    ctx.lineTo(28, 44);
    ctx.stroke();
  }

  function drawPhantom(ctx, fighter) {
    const color = CHARACTERS.phantom.color;
    setupLine(ctx, color, 8);
    ctx.fillStyle = "rgba(235,227,206,0.8)";
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-36, -82);
    ctx.quadraticCurveTo(0, -150, 38, -82);
    ctx.lineTo(28, 48);
    ctx.lineTo(10, 28);
    ctx.lineTo(-8, 48);
    ctx.lineTo(-26, 28);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(-10, -100, 4, 0, Math.PI * 2);
    ctx.arc(12, -100, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawKingDock(ctx, fighter) {
    const color = CHARACTERS.kingDock.color;
    const accent = CHARACTERS.kingDock.accent;
    ctx.save();
    const hugeScale = ctx.canvas && ctx.canvas.width <= 320 ? 1.14 : 1.62;
    ctx.scale(hugeScale, hugeScale);
    setupLine(ctx, color, 13);
    ctx.fillStyle = "rgba(255,105,180,0.18)";
    ctx.beginPath();
    ctx.ellipse(0, -54, 56, 72, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawKingDockBodySplatters(ctx);
    if (isWaterWorldActive()) drawKingDockWaterSuitBody(ctx);

    drawKingDockHead(ctx, color, accent);
    if (isWaterWorldActive()) drawKingDockWaterHelmet(ctx);

    setupLine(ctx, color, 16);
    ctx.beginPath();
    ctx.moveTo(-34, -72);
    ctx.lineTo(-82, -26);
    ctx.lineTo(-98, 20);
    ctx.moveTo(34, -72);
    ctx.lineTo(82, -26);
    ctx.lineTo(98, 20);
    ctx.stroke();
    if (fighter.action === "punch" || fighter.action === "power" || fighter.action === "kingLaser") {
      ctx.beginPath();
      ctx.moveTo(34, -72);
      ctx.lineTo(112, -70);
      ctx.lineTo(138, -48);
      ctx.stroke();
    }
    if (fighter.laserHandUntil > performance.now() || fighter.action === "kingLaser") drawKingLaserCannon(ctx);

    setupLine(ctx, color, 15);
    ctx.beginPath();
    ctx.moveTo(-28, 12);
    ctx.lineTo(-72, 62);
    ctx.moveTo(28, 12);
    ctx.lineTo(72, 62);
    ctx.stroke();
    if (isWaterWorldActive()) drawKingDockFlippers(ctx);
    drawKingDockLimbSplatters(ctx);

    ctx.fillStyle = accent;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, -105);
    ctx.lineTo(8, -184);
    ctx.lineTo(24, -104);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f3f3f3";
    ctx.beginPath();
    ctx.moveTo(5, -178);
    ctx.lineTo(13, -118);
    ctx.lineTo(-5, -118);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawKingLaserCannon(ctx) {
    ctx.save();
    ctx.translate(137, -49);
    ctx.rotate(0.08);
    ctx.fillStyle = "#171216";
    ctx.strokeStyle = "#ffd84a";
    ctx.lineWidth = 4;
    roundRect(ctx, -8, -20, 60, 30, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(54, -5, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff2a8";
    ctx.beginPath();
    ctx.arc(54, -5, 6 + Math.sin(performance.now() / 90) * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawKingDockHead(ctx, color, accent) {
    ctx.save();
    ctx.fillStyle = "#8a5a33";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-22, -138);
    ctx.bezierCurveTo(-44, -168, -66, -150, -54, -120);
    ctx.lineTo(-31, -123);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(22, -138);
    ctx.bezierCurveTo(44, -168, 66, -150, 54, -120);
    ctx.lineTo(31, -123);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    drawKingBattleCrown(ctx);
    setupLine(ctx, color, 8);
    ctx.beginPath();
    ctx.arc(0, -112, 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-33, -116, 13, 0, Math.PI * 2);
    ctx.arc(33, -116, 13, 0, Math.PI * 2);
    ctx.stroke();
    drawKingDockHeadSplatters(ctx);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = accent;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-22, -128);
    ctx.lineTo(-8, -119);
    ctx.moveTo(22, -128);
    ctx.lineTo(8, -119);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-12, -110, 5, 3, -0.25, 0, Math.PI * 2);
    ctx.ellipse(12, -110, 5, 3, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-16, -92);
    ctx.quadraticCurveTo(0, -104, 18, -92);
    ctx.stroke();
    ctx.restore();
  }

  function drawKingDockWaterSuitBody(ctx) {
    ctx.save();
    ctx.fillStyle = "rgba(74, 196, 245, 0.62)";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(ctx, -48, -106, 96, 104, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#146e8f";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    roundRect(ctx, -62, -82, 18, 74, 8);
    ctx.fill();
    ctx.stroke();
    roundRect(ctx, 44, -82, 18, 74, 8);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#fffef7";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-36, -100);
    ctx.lineTo(36, -8);
    ctx.moveTo(36, -100);
    ctx.lineTo(-36, -8);
    ctx.stroke();
    ctx.restore();
  }

  function drawKingDockWaterHelmet(ctx) {
    ctx.save();
    ctx.globalAlpha = 0.58;
    ctx.fillStyle = "#bdf4ff";
    ctx.strokeStyle = "#146e8f";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(0, -116, 54, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-54, -111);
    ctx.lineTo(-78, -86);
    ctx.moveTo(54, -111);
    ctx.lineTo(78, -86);
    ctx.stroke();
    ctx.fillStyle = "#78d8ff";
    ctx.beginPath();
    ctx.arc(-87, -80, 12, 0, Math.PI * 2);
    ctx.arc(87, -80, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawKingDockFlippers(ctx) {
    ctx.save();
    ctx.fillStyle = "#146e8f";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(-82, 69, 28, 12, -0.2, 0, Math.PI * 2);
    ctx.ellipse(82, 69, 28, 12, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawKingBattleCrown(ctx) {
    ctx.save();
    ctx.fillStyle = "#ffd84a";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-40, -132);
    ctx.lineTo(-34, -166);
    ctx.lineTo(-15, -143);
    ctx.lineTo(0, -174);
    ctx.lineTo(15, -143);
    ctx.lineTo(34, -166);
    ctx.lineTo(40, -132);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ff5fa8";
    [-34, 0, 34].forEach((x, index) => {
      ctx.beginPath();
      ctx.arc(x, index === 1 ? -173 : -166, index === 1 ? 6 : 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    roundRect(ctx, -43, -137, 86, 13, 5);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawKingDockBodySplatters(ctx) {
    drawKingDockSplatterMarks(ctx, [
      [-32, -88, 10, 7, -0.2],
      [16, -84, 7, 5, 0.35],
      [-8, -57, 12, 8, 0.15],
      [33, -42, 9, 6, -0.3],
      [-39, -22, 8, 5, 0.28],
      [10, -12, 6, 4, 0.1],
      [0, -94, 4, 3, 0],
      [44, -68, 5, 4, 0.2]
    ]);
  }

  function drawKingDockHeadSplatters(ctx) {
    drawKingDockSplatterMarks(ctx, [
      [-18, -124, 7, 5, -0.25],
      [18, -118, 5, 4, 0.2],
      [0, -101, 6, 4, 0.1],
      [-36, -113, 4, 3, 0],
      [33, -129, 4, 3, 0.2]
    ]);
  }

  function drawKingDockLimbSplatters(ctx) {
    drawKingDockSplatterMarks(ctx, [
      [-74, -24, 6, 4, 0.2],
      [84, -32, 5, 4, -0.2],
      [-96, 18, 5, 3, 0.1],
      [94, 15, 6, 4, 0.25],
      [-54, 42, 7, 4, -0.25],
      [55, 45, 6, 4, 0.15]
    ]);
  }

  function drawKingDockSplatterMarks(ctx, marks) {
    ctx.save();
    ctx.fillStyle = "#b51422";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 2;
    marks.forEach(([x, y, rx, ry, rotate]) => {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, rotate, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + rx * 1.1, y - ry * 1.2, Math.max(2, ry * 0.45), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawArms(ctx, fighter, color) {
    setupLine(ctx, color, 9);
    const punch = fighter.action === "punch" || fighter.action === "giantPunch";
    const kick = fighter.action === "kick";
    if (punch) {
      ctx.beginPath();
      ctx.moveTo(0, -70);
      ctx.lineTo(78, -74);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(88, -74, fighter.action === "giantPunch" ? 22 : 11, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -70);
      ctx.lineTo(-36, -46);
      ctx.stroke();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.lineTo(-38, -42);
    ctx.moveTo(0, -70);
    ctx.lineTo(40, -42);
    ctx.stroke();
    if (kick) {
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.lineTo(70, 15);
      ctx.stroke();
    }
  }

  function drawHelper(helper) {
    ctx.save();
    ctx.translate(helper.x, helper.y - helper.z);
    ctx.scale(helper.facing || 1, 1);
    if (helper.kind === "bot") drawBot(helper);
    if (helper.kind === "mouth") drawMouth(helper);
    if (helper.kind === "ghostBat") drawGhostBat(helper);
    ctx.restore();
  }

  function drawBot(helper) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.fillStyle = "#b6c1c8";
    roundRect(ctx, -20, -48, 40, 45, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.fillRect(-9, -37, 7, 8);
    ctx.fillRect(5, -37, 7, 8);
    ctx.strokeRect(-9, -37, 7, 8);
    ctx.strokeRect(5, -37, 7, 8);
    ctx.strokeStyle = "#171216";
    ctx.beginPath();
    ctx.moveTo(-20, -26);
    ctx.lineTo(-42, -18);
    ctx.moveTo(20, -26);
    ctx.lineTo(42, -18);
    ctx.stroke();
    if (helper.action === "chainsaw" && helper.actionUntil > performance.now()) {
      ctx.fillStyle = "#171216";
      ctx.beginPath();
      for (let i = 0; i < 8; i += 1) {
        ctx.lineTo(40 + i * 6, -26 + (i % 2 ? 18 : 0));
      }
      ctx.lineTo(88, -12);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = "#171216";
      ctx.beginPath();
      ctx.arc(-46, -18, 5, 0, Math.PI * 2);
      ctx.arc(46, -18, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#ff7a19";
    ctx.beginPath();
    ctx.moveTo(-10, -2);
    ctx.lineTo(0, 28);
    ctx.lineTo(10, -2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawMouth(helper) {
    ctx.save();
    const biting = (helper.action === "bite" || helper.action === "fly") && helper.actionUntil > performance.now();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.fillStyle = "#d61f2f";
    ctx.beginPath();
    ctx.ellipse(0, -32, biting ? 42 : 35, biting ? 27 : 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * 13, -52);
      ctx.lineTo(i * 13 + 5, -35);
      ctx.lineTo(i * 13 - 5, -35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#ff7aa2";
    ctx.beginPath();
    ctx.ellipse(5, -22, 18, 7, 0.2, 0, Math.PI * 2);
    ctx.fill();
    if (helper.action === "kick" && helper.actionUntil > performance.now()) {
      ctx.strokeStyle = "#d61f2f";
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(20, -12);
      ctx.lineTo(62, 6);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawGhostBat(helper) {
    ctx.save();
    const now = performance.now();
    const flap = Math.sin(now / 95 + helper.phase);
    const biting = helper.action === "bite" && helper.actionUntil > now;
    ctx.globalAlpha = 0.72;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.fillStyle = "#b7a6ff";
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.bezierCurveTo(-18, -48 - flap * 8, -44, -34 + flap * 6, -58, -10);
    ctx.lineTo(-34, -2);
    ctx.lineTo(-18, 2);
    ctx.lineTo(0, -12);
    ctx.lineTo(18, 2);
    ctx.lineTo(34, -2);
    ctx.lineTo(58, -10);
    ctx.bezierCurveTo(44, -34 + flap * 6, 18, -48 - flap * 8, 0, -24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ede8ff";
    ctx.beginPath();
    ctx.ellipse(0, -20, 18, biting ? 20 : 17, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#7d43d6";
    ctx.beginPath();
    ctx.arc(-7, -25, 3, 0, Math.PI * 2);
    ctx.arc(7, -25, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-8, -12);
    ctx.quadraticCurveTo(0, biting ? 0 : -6, 8, -12);
    ctx.stroke();
    ctx.restore();
  }

  function drawEffects() {
    const now = performance.now();
    game.effects.forEach((effect) => {
      const progress = 1 - (effect.until - now) / (effect.until - effect.born);
      ctx.save();
      ctx.globalAlpha = clamp(1 - progress * 0.75, 0, 1);
      if (effect.kind === "text") {
        ctx.translate(effect.x, effect.y - progress * 22);
        ctx.rotate(Math.sin(progress * Math.PI) * 0.06);
        ctx.fillStyle = effect.color;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5;
        ctx.font = "900 28px Trebuchet MS";
        ctx.textAlign = "center";
        ctx.strokeText(effect.text, 0, 0);
        ctx.fillText(effect.text, 0, 0);
      } else if (effect.kind === "freddyDuplicate") {
        const fake = {
          id: "freddy",
          character: CHARACTERS.freddy,
          animalForm: effect.animalForm,
          action: "",
          actionUntil: 0,
          facing: effect.facing,
          shieldHits: 0,
          hiddenUntil: 0,
          knockdownUntil: 0,
          z: effect.z || 0
        };
        ctx.globalAlpha = clamp(0.62 - progress * 0.4, 0, 0.62);
        ctx.translate(effect.x, effect.y - (effect.z || 0));
        ctx.scale(effect.facing || 1, 1);
        drawFreddy(ctx, fake);
      } else if (effect.kind === "line") {
        ctx.strokeStyle = effect.color;
        ctx.lineWidth = effect.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(effect.x1, effect.y1);
        ctx.lineTo(effect.x2, effect.y2);
        ctx.stroke();
      } else if (effect.kind === "circle") {
        ctx.strokeStyle = effect.color;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.arc(effect.x, effect.y, effect.r * progress, 0, Math.PI * 2);
        ctx.stroke();
      } else if (effect.kind === "waterBurst") {
        ctx.strokeStyle = effect.color;
        ctx.fillStyle = effect.color;
        ctx.lineWidth = 5;
        for (let i = 0; i < 14; i += 1) {
          const angle = i * 0.9 + progress * 2;
          const r = 18 + progress * (34 + (i % 3) * 12);
          ctx.beginPath();
          ctx.arc(effect.x + Math.cos(angle) * r, effect.y + Math.sin(angle) * r * 0.55, 5 + (i % 2) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.ellipse(effect.x, effect.y + 18, 62 * progress, 18 * progress, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (effect.kind === "icePath") {
        ctx.fillStyle = "rgba(180, 242, 255, 0.72)";
        ctx.strokeStyle = "#146e8f";
        ctx.lineWidth = 4;
        for (let i = -2; i <= 2; i += 1) {
          ctx.beginPath();
          ctx.ellipse(effect.x + i * 38, effect.y + Math.sin(i) * 6, 34 + progress * 12, 13, 0.08 * i, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      } else if (effect.kind === "gust") {
        ctx.strokeStyle = "#88d8ff";
        ctx.lineWidth = 7;
        for (let i = 0; i < 4; i += 1) {
          ctx.beginPath();
          ctx.moveTo(effect.x + effect.facing * 15, effect.y + i * 18 - 28);
          ctx.bezierCurveTo(
            effect.x + effect.facing * 70,
            effect.y + i * 20 - 52,
            effect.x + effect.facing * 145,
            effect.y + i * 20 - 4,
            effect.x + effect.facing * 205,
            effect.y + i * 16 - 28
          );
          ctx.stroke();
        }
      } else if (effect.kind === "splash") {
        ctx.fillStyle = effect.color;
        for (let i = 0; i < 12; i += 1) {
          ctx.beginPath();
          ctx.arc(effect.x + effect.facing * (i * 15 + progress * 40), effect.y + Math.sin(i) * 34, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (effect.kind === "tornado") {
        ctx.strokeStyle = effect.color;
        ctx.lineWidth = 8;
        for (let i = 0; i < 5; i += 1) {
          ctx.beginPath();
          ctx.ellipse(effect.x, effect.y + i * 18, 34 + i * 8, 8, progress * 7 + i, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (effect.kind === "iceBlock") {
        const target = effect.target;
        if (target) {
          ctx.globalAlpha = 0.58;
          ctx.fillStyle = "#78d8ff";
          ctx.strokeStyle = "#146e8f";
          ctx.lineWidth = 6;
          roundRect(ctx, target.x - 54, target.y - target.z - 152, 108, 158, 10);
          ctx.fill();
          ctx.stroke();
          ctx.globalAlpha = 0.75;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(target.x - 34, target.y - target.z - 126);
          ctx.lineTo(target.x + 16, target.y - target.z - 146);
          ctx.moveTo(target.x - 22, target.y - target.z - 70);
          ctx.lineTo(target.x + 38, target.y - target.z - 95);
          ctx.stroke();
        }
      } else if (effect.kind === "burrow") {
        ctx.strokeStyle = effect.color;
        ctx.lineWidth = 18;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(effect.x1, effect.y1 + 6);
        ctx.bezierCurveTo(effect.x1 + (effect.x2 - effect.x1) * 0.35, effect.y1 + 58, effect.x2 - (effect.x2 - effect.x1) * 0.25, effect.y2 + 58, effect.x2, effect.y2 + 6);
        ctx.stroke();
        ctx.strokeStyle = "#171216";
        ctx.lineWidth = 4;
        ctx.stroke();
      } else if (effect.kind === "poisonStorm") {
        ctx.fillStyle = effect.color;
        ctx.strokeStyle = "#171216";
        ctx.lineWidth = 3;
        effect.drops.forEach((drop) => {
          const fall = clamp((now - (drop.hitAt - 560)) / 560, 0, 1);
          const y = 110 + (drop.y - 110) * fall;
          ctx.globalAlpha = drop.hit ? 0.15 : 0.82;
          ctx.beginPath();
          ctx.ellipse(drop.x, y, 8, 16, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });
      } else if (effect.kind === "heartSteal") {
        const x = effect.fromX + (effect.toX - effect.fromX) * progress;
        const y = effect.fromY + (effect.toY - effect.fromY) * progress - Math.sin(progress * Math.PI) * 38;
        ctx.globalAlpha = clamp(0.95 - progress * 0.25, 0, 1);
        ctx.translate(x, y);
        ctx.rotate(Math.sin(progress * Math.PI * 2) * 0.12);
        ctx.scale(0.88 + progress * 0.34, 0.88 + progress * 0.34);
        drawFlyingHeart(ctx, effect.amount);
      } else if (effect.kind === "giantLaserWarn") {
        ctx.globalAlpha = 0.35 + Math.sin(now / 80) * 0.18;
        ctx.strokeStyle = effect.color;
        ctx.lineWidth = 14;
        ctx.setLineDash([22, 16]);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(effect.x1, effect.y1);
        ctx.lineTo(effect.x2, effect.y2);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (effect.kind === "giantLaserBeam") {
        const width = 34 + Math.sin(progress * Math.PI) * 28;
        ctx.globalAlpha = 0.92;
        ctx.strokeStyle = "#fff2a8";
        ctx.lineWidth = width + 18;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(effect.x1, effect.y1);
        ctx.lineTo(effect.x2, effect.y2);
        ctx.stroke();
        ctx.strokeStyle = effect.color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(effect.x1, effect.y1);
        ctx.lineTo(effect.x2, effect.y2);
        ctx.stroke();
        ctx.strokeStyle = "#7d43d6";
        ctx.lineWidth = 9;
        ctx.beginPath();
        ctx.moveTo(effect.x1, effect.y1 - 24);
        ctx.lineTo(effect.x2, effect.y2 - 24);
        ctx.moveTo(effect.x1, effect.y1 + 24);
        ctx.lineTo(effect.x2, effect.y2 + 24);
        ctx.stroke();
      } else if (effect.kind === "axeProjectile") {
        ctx.translate(effect.x, effect.y);
        ctx.rotate((now - effect.born) / 80 * effect.facing);
        drawAxeShape(ctx, effect.hit);
      }
      ctx.restore();
    });
  }

  function drawFlyingHeart(c, amount = 1) {
    c.save();
    c.fillStyle = "#ff5fa8";
    c.strokeStyle = "#171216";
    c.lineWidth = 4;
    c.beginPath();
    c.moveTo(0, 18);
    c.bezierCurveTo(-34, -8, -24, -42, 0, -24);
    c.bezierCurveTo(24, -42, 34, -8, 0, 18);
    c.closePath();
    c.fill();
    c.stroke();
    c.fillStyle = "#ffd6e6";
    c.beginPath();
    c.arc(-8, -17, 5, 0, Math.PI * 2);
    c.fill();
    if (amount < 1) {
      c.fillStyle = "#171216";
      c.font = "900 14px Trebuchet MS";
      c.textAlign = "center";
      c.textBaseline = "middle";
      c.fillText("1/2", 0, -4);
    }
    c.restore();
  }

  function drawAxeShape(c, cracked = false) {
    c.save();
    c.strokeStyle = "#171216";
    c.lineWidth = 5;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(-28, 20);
    c.lineTo(24, -24);
    c.stroke();
    c.fillStyle = cracked ? "#ffd84a" : "#d9edf2";
    c.beginPath();
    c.moveTo(18, -30);
    c.lineTo(44, -22);
    c.lineTo(30, 6);
    c.lineTo(12, -6);
    c.closePath();
    c.fill();
    c.stroke();
    c.fillStyle = "#8a5a33";
    c.beginPath();
    c.arc(-28, 20, 6, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.restore();
  }

  function drawBubbles() {
    [game.p1, game.p2].forEach((fighter) => {
      if (!fighter.bubble) return;
      const x = fighter.x + fighter.facing * 82;
      const y = fighter.y - fighter.z - 160;
      drawBubble(fighter.bubble.text, x, y, fighter.bubble.spiky);
    });
  }

  function drawBubble(text, x, y, spiky) {
    ctx.save();
    const lines = wrapText(text, 20);
    const w = Math.max(130, Math.min(250, lines.reduce((max, line) => Math.max(max, line.length), 0) * 10 + 34));
    const h = 32 + lines.length * 20;
    ctx.translate(clamp(x, 95, WIDTH - 95 - w), clamp(y, 100, HEIGHT - 160));
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    if (spiky) {
      ctx.beginPath();
      const points = 15;
      for (let i = 0; i < points; i += 1) {
        const a = (i / points) * Math.PI * 2;
        const rx = (w / 2) * (i % 2 ? 0.82 : 1);
        const ry = (h / 2) * (i % 2 ? 0.82 : 1);
        const px = w / 2 + Math.cos(a) * rx;
        const py = h / 2 + Math.sin(a) * ry;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      roundRect(ctx, 0, 0, w, h, 18);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#171216";
    ctx.font = "900 17px Trebuchet MS";
    ctx.textAlign = "center";
    lines.forEach((line, index) => {
      ctx.fillText(line, w / 2, 28 + index * 20);
    });
    ctx.restore();
  }

  function drawTransitionText(text) {
    ctx.save();
    const isLevelTitle = /^Level \d+/.test(text);
    const levelMatch = isLevelTitle ? text.match(/^Level (\d+):?\s*(.*)$/) : null;
    const levelNumber = levelMatch ? Number(levelMatch[1]) : 0;
    const levelLabel = levelMatch && levelMatch[2] ? levelMatch[2] : "";
    const boxW = isLevelTitle ? 720 : 520;
    const boxH = isLevelTitle ? 214 : 128;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = isLevelTitle ? 8 : 6;
    roundRect(ctx, WIDTH / 2 - boxW / 2, HEIGHT / 2 - boxH / 2, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.font = isLevelTitle ? "900 74px Trebuchet MS" : "900 42px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(isLevelTitle ? `Level ${levelNumber}` : text, WIDTH / 2, HEIGHT / 2 - (isLevelTitle ? 26 : -14));
    if (isLevelTitle) {
      ctx.fillStyle = "#171216";
      ctx.font = "900 30px Trebuchet MS";
      ctx.fillText(levelLabel, WIDTH / 2, HEIGHT / 2 + 24);
      ctx.font = "900 18px Trebuchet MS";
      const bossHearts = game && game.p2 ? `${game.p2.maxHealth} boss hearts` : "Boss powers up";
      ctx.fillText(`${bossHearts} - Get Ready!`, WIDTH / 2, HEIGHT / 2 + 62);
    }
    ctx.restore();
  }

  function drawDangerWarning(text) {
    ctx.save();
    const progress = clamp(1 - (game.dangerWarningUntil - performance.now()) / 4200, 0, 1);
    const pulse = Math.sin(performance.now() / 80) * 5;
    const boxW = 760;
    const boxH = 118;
    const x = WIDTH / 2 - boxW / 2;
    const y = 112 + pulse;
    ctx.globalAlpha = clamp(1 - progress * 0.35, 0, 1);
    ctx.fillStyle = "rgba(23,18,22,0.88)";
    ctx.strokeStyle = "#d91f2e";
    ctx.lineWidth = 8;
    roundRect(ctx, x, y, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.font = "900 34px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("WARNING", WIDTH / 2, y + 43);
    ctx.fillStyle = "#fffaf0";
    ctx.font = "900 24px Trebuchet MS";
    ctx.fillText(text, WIDTH / 2, y + 82);
    ctx.restore();
  }

  function drawPortrait(pctx, id, locked, supercharged = false) {
    pctx.clearRect(0, 0, pctx.canvas.width, pctx.canvas.height);
    const character = CHARACTERS[id];
    pctx.fillStyle = locked ? "#d7d2cb" : "#fffaf0";
    pctx.fillRect(0, 0, pctx.canvas.width, pctx.canvas.height);
    drawPortraitBackground(pctx, id, locked, supercharged);
    const fake = createFighter(id, "p1", false, pctx.canvas.width / 2, pctx.canvas.height - 48, 1);
    fake.supercharged = supercharged;
    fake.z = 0;
    pctx.save();
    pctx.translate(fake.x, fake.y);
    pctx.scale(0.88, 0.88);
    if (locked) pctx.globalAlpha = 0.4;
    if (id === "mayor") drawMayor(pctx, fake);
    else if (id === "tats") drawTats(pctx, fake);
    else if (id === "fary") drawFary(pctx, fake);
    else if (id === "apple") drawApple(pctx, fake);
    else if (id === "yapping") drawYapping(pctx, fake);
    else if (id === "freddy") drawFreddy(pctx, fake);
    else if (id === "benji") drawBenji(pctx, fake);
    else if (id === "frost") drawFrost(pctx, fake);
    else if (id === "ness") drawNess(pctx, fake);
    else if (id === "crayon") drawCrayon(pctx, fake);
    else if (id === "hoodie") drawHoodie(pctx, fake);
    else if (id === "phantom") drawPhantom(pctx, fake);
    else if (id === "kingDock") drawKingDock(pctx, fake);
    pctx.restore();
    pctx.fillStyle = locked ? "#171216" : character.accent;
    pctx.globalAlpha = locked ? 0.25 : 0.18;
    pctx.fillRect(0, 0, pctx.canvas.width, pctx.canvas.height);
    pctx.globalAlpha = 1;
  }

  function drawPortraitBackground(pctx, id, locked, supercharged = false) {
    if (locked) return;
    const w = pctx.canvas.width;
    const h = pctx.canvas.height;
    pctx.save();
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 4;
    if (id === "tats") {
      for (let i = 0; i < 9; i += 1) drawMiniMuscle(pctx, (i * 47) % w, 30 + (i % 4) * 38);
    } else if (id === "fary") {
      pctx.fillStyle = "#ffb8d9";
      for (let i = 0; i < 12; i += 1) {
        pctx.beginPath();
        pctx.ellipse((i * 37) % w, 24 + (i % 5) * 34, 12, 20, i, 0, Math.PI * 2);
        pctx.fill();
      }
    } else if (id === "apple") {
      pctx.fillStyle = supercharged ? "#f5c242" : "#f58b21";
      for (let i = 0; i < 13; i += 1) {
        const x = (i * 35) % w;
        const y = 20 + (i % 5) * 35;
        pctx.beginPath();
        pctx.arc(x, y, 12, 0, Math.PI * 2);
        pctx.fill();
        if (supercharged) {
          pctx.fillStyle = "#171216";
          pctx.beginPath();
          pctx.arc(x - 4, y - 3, 2.2, 0, Math.PI * 2);
          pctx.arc(x + 5, y + 4, 2.2, 0, Math.PI * 2);
          pctx.fill();
          pctx.fillStyle = "#f5c242";
        }
      }
    } else if (id === "mayor") {
      for (let i = 0; i < 9; i += 1) drawMiniGear(pctx, (i * 48) % w, 32 + (i % 4) * 42);
    } else if (id === "yapping") {
      for (let i = 0; i < 9; i += 1) drawMiniMouth(pctx, (i * 50) % w, 30 + (i % 4) * 42);
    } else if (id === "freddy") {
      pctx.fillStyle = "#17633c";
      for (let i = 0; i < 11; i += 1) {
        const x = (i * 39) % w;
        const y = 24 + (i % 5) * 34;
        pctx.beginPath();
        pctx.arc(x, y, 9, 0, Math.PI * 2);
        pctx.arc(x + 13, y - 5, 7, 0, Math.PI * 2);
        pctx.fill();
      }
    } else if (id === "benji") {
      pctx.fillStyle = "#45a6db";
      for (let i = 0; i < 8; i += 1) {
        const x = (i * 48) % w;
        const y = 28 + (i % 4) * 40;
        pctx.beginPath();
        pctx.moveTo(x, y + 18);
        pctx.lineTo(x + 18, y - 12);
        pctx.lineTo(x + 34, y + 18);
        pctx.closePath();
        pctx.fill();
        pctx.stroke();
      }
    } else if (id === "frost") {
      for (let i = 0; i < 10; i += 1) drawMiniIce(pctx, (i * 42) % w, 28 + (i % 4) * 42);
    } else if (id === "ness") {
      pctx.fillStyle = "#6bd8ff";
      for (let i = 0; i < 9; i += 1) {
        const x = (i * 46) % w;
        const y = 25 + (i % 4) * 44;
        pctx.beginPath();
        pctx.moveTo(x, y + 28);
        pctx.lineTo(x + 12, y);
        pctx.lineTo(x + 25, y + 28);
        pctx.moveTo(x + 12, y + 6);
        pctx.lineTo(x + 12, y + 44);
        pctx.stroke();
      }
    }
    pctx.restore();
  }

  function drawMiniIce(pctx, x, y) {
    pctx.save();
    pctx.fillStyle = "rgba(120,216,255,0.65)";
    pctx.strokeStyle = "#146e8f";
    pctx.lineWidth = 3;
    pctx.beginPath();
    pctx.moveTo(x, y + 18);
    pctx.lineTo(x + 11, y - 8);
    pctx.lineTo(x + 28, y + 3);
    pctx.lineTo(x + 18, y + 28);
    pctx.closePath();
    pctx.fill();
    pctx.stroke();
    pctx.restore();
  }

  function drawWorldCard(pctx, id, locked) {
    const w = pctx.canvas.width;
    const h = pctx.canvas.height;
    pctx.clearRect(0, 0, w, h);
    pctx.save();
    pctx.fillStyle = locked ? "#d7d2cb" : id === "waterWorld" ? "#bcecff" : id === "abandonedDesert" ? "#f2cf86" : id === "candyland" ? "#ffe1f1" : "#d9f4ff";
    pctx.fillRect(0, 0, w, h);
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 4;
    if (id === "waterWorld") {
      pctx.fillStyle = "#44bdea";
      pctx.fillRect(0, 0, w, h);
      pctx.fillStyle = "#0f8ed6";
      for (let y = 20; y < h; y += 28) {
        pctx.beginPath();
        pctx.moveTo(0, y);
        for (let x = 0; x < w; x += 42) {
          pctx.quadraticCurveTo(x + 21, y - 10, x + 42, y);
        }
        pctx.lineTo(w, y + 20);
        pctx.lineTo(0, y + 20);
        pctx.closePath();
        pctx.fill();
      }
      pctx.fillStyle = "#fffef7";
      for (let i = 0; i < 10; i += 1) {
        pctx.beginPath();
        pctx.arc(22 + i * 24, 36 + (i % 3) * 24, 4 + (i % 2) * 3, 0, Math.PI * 2);
        pctx.fill();
      }
      pctx.fillStyle = "#ffd84a";
      pctx.strokeStyle = "#171216";
      pctx.lineWidth = 3;
      pctx.beginPath();
      pctx.moveTo(98, 42);
      pctx.lineTo(104, 14);
      pctx.lineTo(122, 34);
      pctx.lineTo(136, 14);
      pctx.lineTo(144, 42);
      pctx.closePath();
      pctx.fill();
      pctx.stroke();
      drawTinyCardFish(pctx, 52, 102, 1, "#fffef7");
      drawTinyCardFish(pctx, 204, 86, -1, "#ffd84a");
    } else if (id === "abandonedDesert") {
      pctx.fillStyle = "#e7a45d";
      pctx.fillRect(0, 0, w, 58);
      pctx.fillStyle = "#eac071";
      pctx.fillRect(0, 58, w, h - 58);
      pctx.fillStyle = "#ffd65a";
      pctx.beginPath();
      pctx.arc(38, 33, 18, 0, Math.PI * 2);
      pctx.fill();
      pctx.stroke();
      pctx.fillStyle = "#9c5a43";
      pctx.beginPath();
      pctx.moveTo(78, 58);
      pctx.lineTo(104, 22);
      pctx.lineTo(148, 22);
      pctx.lineTo(178, 58);
      pctx.closePath();
      pctx.fill();
      pctx.stroke();
      for (let i = 0; i < 4; i += 1) {
        const x = 42 + i * 56;
        pctx.strokeStyle = "#171216";
        pctx.lineWidth = 3;
        pctx.fillStyle = "#238958";
        roundRect(pctx, x - 5, 72, 10, 48, 5);
        pctx.fill();
        pctx.stroke();
        pctx.beginPath();
        pctx.moveTo(x - 5, 91);
        pctx.lineTo(x - 20, 91);
        pctx.lineTo(x - 20, 106);
        pctx.moveTo(x + 5, 84);
        pctx.lineTo(x + 21, 84);
        pctx.lineTo(x + 21, 101);
        pctx.stroke();
      }
      for (let i = 0; i < 3; i += 1) {
        const x = 70 + i * 68;
        pctx.fillStyle = "#c48a3d";
        pctx.beginPath();
        pctx.arc(x, 126, 15, 0, Math.PI * 2);
        pctx.fill();
        pctx.stroke();
      }
      drawCardBone(pctx, 35, 128, 0.52, -0.2);
      drawCardSkull(pctx, 222, 122, 0.5, 0.16);
    } else if (id === "candyland") {
      pctx.fillStyle = "#ffc1e2";
      pctx.fillRect(0, 0, w, 58);
      pctx.fillStyle = "#9ce85d";
      pctx.fillRect(0, 58, w, h - 58);
      for (let i = 0; i < 6; i += 1) {
        const x = 26 + i * 42;
        const color = ["#ff477e", "#ffe65a", "#6bd8ff", "#a75cff", "#49d275", "#ffb347"][i];
        if (i % 2 === 0) drawCardLollipop(pctx, x, 44 + (i % 3) * 9, 0.62, color);
        else drawCardGumdrop(pctx, x, 105 + (i % 2) * 7, 0.58, color);
      }
      pctx.fillStyle = "#53cdfa";
      pctx.beginPath();
      pctx.moveTo(0, 126);
      pctx.bezierCurveTo(50, 116, 96, 139, 150, 125);
      pctx.bezierCurveTo(190, 115, 220, 136, w, 121);
      pctx.lineTo(w, h);
      pctx.lineTo(0, h);
      pctx.closePath();
      pctx.fill();
      pctx.stroke();
    } else {
      pctx.fillStyle = "#86d7ff";
      pctx.fillRect(0, 0, w, 58);
      pctx.fillStyle = "#7ed35b";
      pctx.fillRect(0, 58, w, h - 58);
      drawCardHouse(pctx, 18, 47, "#f5d15a", "#f45a3c");
      drawCardHouse(pctx, 95, 43, "#6aa5ff", "#247bd9");
      drawCardHouse(pctx, 176, 48, "#d8c0ff", "#7d43d6");
      drawCardTree(pctx, 48, 116, 0.7);
      drawCardTree(pctx, 208, 114, 0.75);
      pctx.fillStyle = "#45a6db";
      pctx.beginPath();
      pctx.moveTo(0, 126);
      pctx.bezierCurveTo(70, 118, 124, 139, 190, 124);
      pctx.bezierCurveTo(220, 117, 238, 125, w, 116);
      pctx.lineTo(w, h);
      pctx.lineTo(0, h);
      pctx.closePath();
      pctx.fill();
      pctx.stroke();
    }

    if (locked) {
      pctx.fillStyle = "rgba(255,255,255,0.6)";
      pctx.fillRect(0, 0, w, h);
      pctx.fillStyle = "#171216";
      pctx.font = "900 22px Trebuchet MS";
      pctx.textAlign = "center";
      pctx.fillText("LOCKED", w / 2, h / 2 + 8);
    }
    pctx.restore();
  }

  function drawPackageCard(pctx, id, locked) {
    const w = pctx.canvas.width;
    const h = pctx.canvas.height;
    pctx.clearRect(0, 0, w, h);
    pctx.save();
    pctx.fillStyle = locked ? "#d7d2cb" : "#fff0b8";
    pctx.fillRect(0, 0, w, h);
    pctx.fillStyle = locked ? "#bbb2a8" : "#ffd84a";
    pctx.fillRect(0, 0, w, 52);
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 4;
    pctx.strokeRect(0, 0, w, h);

    pctx.fillStyle = "#171216";
    pctx.font = "900 18px Trebuchet MS";
    pctx.textAlign = "center";
    pctx.fillText("SUPERCHARGED", w / 2, 32);

    const heartCount = id === "supercharged" ? 10 : 5;
    for (let i = 0; i < heartCount; i += 1) {
      const row = i < 5 ? 0 : 1;
      const col = i % 5;
      drawPackageHeart(pctx, 55 + col * 37, 82 + row * 32, locked);
    }

    pctx.strokeStyle = locked ? "#6d6564" : "#50d8ff";
    pctx.lineWidth = 5;
    for (let i = 0; i < 4; i += 1) {
      const x = 26 + i * 67;
      pctx.beginPath();
      pctx.moveTo(x, 56);
      pctx.lineTo(x + 18, 78);
      pctx.lineTo(x + 4, 78);
      pctx.lineTo(x + 22, 110);
      pctx.stroke();
    }

    if (locked) {
      pctx.fillStyle = "rgba(255,255,255,0.62)";
      pctx.fillRect(0, 0, w, h);
      pctx.fillStyle = "#171216";
      pctx.font = "900 22px Trebuchet MS";
      pctx.fillText("LOCKED", w / 2, h / 2 + 8);
    }
    pctx.restore();
  }

  function drawTrophyCard(pctx, id) {
    const w = pctx.canvas.width;
    const h = pctx.canvas.height;
    pctx.clearRect(0, 0, w, h);
    pctx.save();
    pctx.fillStyle = "#171216";
    pctx.fillRect(0, 0, w, h);
    pctx.fillStyle = "#7d43d6";
    pctx.fillRect(0, 0, w, 36);
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 4;
    pctx.strokeRect(0, 0, w, h);
    pctx.translate(w / 2, 56);
    pctx.fillStyle = "#ffd84a";
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 5;
    pctx.beginPath();
    pctx.moveTo(-54, 24);
    pctx.lineTo(-42, -18);
    pctx.lineTo(-16, 10);
    pctx.lineTo(0, -28);
    pctx.lineTo(16, 10);
    pctx.lineTo(42, -18);
    pctx.lineTo(54, 24);
    pctx.closePath();
    pctx.fill();
    pctx.stroke();
    pctx.fillStyle = "#ff5fa8";
    [-42, 0, 42].forEach((x) => {
      pctx.beginPath();
      pctx.arc(x, -20, 7, 0, Math.PI * 2);
      pctx.fill();
      pctx.stroke();
    });
    pctx.fillStyle = "#fffef7";
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 3;
    roundRect(pctx, -74, 27, 148, 26, 8);
    pctx.fill();
    pctx.stroke();
    pctx.fillStyle = "#171216";
    pctx.font = "900 13px Trebuchet MS";
    pctx.textAlign = "center";
    pctx.fillText(id === "kingOfBattle" ? "KING OF THE BATTLE" : "BATTLE CROWN", 0, 45);
    pctx.restore();
  }

  function drawPackageHeart(pctx, x, y, locked) {
    pctx.save();
    pctx.translate(x, y);
    pctx.fillStyle = locked ? "#e9dae0" : "#ff5fa8";
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 3;
    pctx.beginPath();
    pctx.moveTo(0, 18);
    pctx.bezierCurveTo(-24, -2, -25, -21, -8, -21);
    pctx.bezierCurveTo(0, -21, 5, -16, 9, -9);
    pctx.bezierCurveTo(13, -16, 18, -21, 26, -21);
    pctx.bezierCurveTo(43, -21, 42, -2, 18, 18);
    pctx.bezierCurveTo(11, 24, 7, 27, 0, 18);
    pctx.fill();
    pctx.stroke();
    pctx.restore();
  }

  function drawCardLollipop(pctx, x, y, scale, color) {
    pctx.save();
    pctx.translate(x, y);
    pctx.scale(scale, scale);
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 4;
    pctx.lineCap = "round";
    pctx.beginPath();
    pctx.moveTo(0, 22);
    pctx.lineTo(0, 70);
    pctx.stroke();
    pctx.fillStyle = color;
    pctx.beginPath();
    pctx.arc(0, 0, 24, 0, Math.PI * 2);
    pctx.fill();
    pctx.stroke();
    pctx.strokeStyle = "#fffaf0";
    pctx.lineWidth = 5;
    pctx.beginPath();
    pctx.arc(0, 0, 13, 0.2, Math.PI * 1.35);
    pctx.stroke();
    pctx.restore();
  }

  function drawCardGumdrop(pctx, x, y, scale, color) {
    pctx.save();
    pctx.translate(x, y);
    pctx.scale(scale, scale);
    pctx.fillStyle = color;
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 4;
    pctx.beginPath();
    pctx.moveTo(-24, 18);
    pctx.bezierCurveTo(-24, -9, -8, -30, 0, -30);
    pctx.bezierCurveTo(12, -30, 25, -8, 24, 18);
    pctx.closePath();
    pctx.fill();
    pctx.stroke();
    pctx.restore();
  }

  function drawTinyCardFish(pctx, x, y, facing, color) {
    pctx.save();
    pctx.translate(x, y);
    pctx.scale(facing, 1);
    pctx.fillStyle = color;
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 3;
    pctx.beginPath();
    pctx.ellipse(0, 0, 22, 11, 0, 0, Math.PI * 2);
    pctx.fill();
    pctx.stroke();
    pctx.beginPath();
    pctx.moveTo(-20, 0);
    pctx.lineTo(-36, -11);
    pctx.lineTo(-36, 11);
    pctx.closePath();
    pctx.fill();
    pctx.stroke();
    pctx.fillStyle = "#171216";
    pctx.beginPath();
    pctx.arc(8, -3, 3, 0, Math.PI * 2);
    pctx.fill();
    pctx.restore();
  }

  function drawCardHouse(pctx, x, y, color, roof) {
    pctx.save();
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 3;
    pctx.fillStyle = color;
    pctx.fillRect(x, y, 52, 37);
    pctx.strokeRect(x, y, 52, 37);
    pctx.fillStyle = roof;
    pctx.beginPath();
    pctx.moveTo(x - 5, y);
    pctx.lineTo(x + 26, y - 23);
    pctx.lineTo(x + 57, y);
    pctx.closePath();
    pctx.fill();
    pctx.stroke();
    pctx.restore();
  }

  function drawCardTree(pctx, x, y, scale) {
    pctx.save();
    pctx.translate(x, y);
    pctx.scale(scale, scale);
    pctx.fillStyle = "#7b4d25";
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 3;
    pctx.fillRect(-6, -2, 12, 42);
    pctx.strokeRect(-6, -2, 12, 42);
    pctx.fillStyle = "#1c843d";
    pctx.beginPath();
    pctx.arc(-18, -14, 22, 0, Math.PI * 2);
    pctx.arc(16, -18, 24, 0, Math.PI * 2);
    pctx.arc(0, -40, 22, 0, Math.PI * 2);
    pctx.fill();
    pctx.stroke();
    pctx.restore();
  }

  function drawCardBone(pctx, x, y, scale, angle) {
    pctx.save();
    pctx.translate(x, y);
    pctx.rotate(angle);
    pctx.scale(scale, scale);
    pctx.fillStyle = "#fff3d6";
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 3;
    pctx.lineCap = "round";
    roundRect(pctx, -34, -6, 68, 12, 6);
    pctx.fill();
    pctx.stroke();
    [-35, 35].forEach((end) => {
      pctx.beginPath();
      pctx.arc(end, -8, 8, 0, Math.PI * 2);
      pctx.arc(end, 8, 8, 0, Math.PI * 2);
      pctx.fill();
      pctx.stroke();
    });
    pctx.restore();
  }

  function drawCardSkull(pctx, x, y, scale, angle) {
    pctx.save();
    pctx.translate(x, y);
    pctx.rotate(angle);
    pctx.scale(scale, scale);
    pctx.fillStyle = "#fff3d6";
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 3;
    pctx.beginPath();
    pctx.arc(0, -8, 24, 0, Math.PI * 2);
    pctx.fill();
    pctx.stroke();
    roundRect(pctx, -14, 8, 28, 20, 5);
    pctx.fill();
    pctx.stroke();
    pctx.fillStyle = "#171216";
    pctx.beginPath();
    pctx.arc(-8, -10, 4, 0, Math.PI * 2);
    pctx.arc(8, -10, 4, 0, Math.PI * 2);
    pctx.fill();
    pctx.restore();
  }

  function drawMiniMuscle(pctx, x, y) {
    pctx.save();
    pctx.strokeStyle = "#1478cf";
    pctx.lineWidth = 4;
    pctx.beginPath();
    pctx.arc(x, y, 13, 0, Math.PI * 2);
    pctx.arc(x + 14, y - 6, 15, 0, Math.PI * 2);
    pctx.arc(x + 30, y, 12, 0, Math.PI * 2);
    pctx.stroke();
    pctx.restore();
  }

  function drawMiniGear(pctx, x, y) {
    pctx.save();
    pctx.strokeStyle = "#6b28c7";
    pctx.lineWidth = 4;
    pctx.beginPath();
    pctx.rect(x, y, 24, 18);
    pctx.moveTo(x + 4, y);
    pctx.lineTo(x + 2, y - 10);
    pctx.moveTo(x + 20, y);
    pctx.lineTo(x + 26, y - 10);
    pctx.stroke();
    pctx.restore();
  }

  function drawMiniMouth(pctx, x, y) {
    pctx.save();
    pctx.fillStyle = "#d61f2f";
    pctx.strokeStyle = "#171216";
    pctx.lineWidth = 3;
    pctx.beginPath();
    pctx.ellipse(x, y, 22, 12, 0, 0, Math.PI * 2);
    pctx.fill();
    pctx.stroke();
    pctx.fillStyle = "#fff";
    for (let i = -1; i <= 1; i += 1) {
      pctx.beginPath();
      pctx.moveTo(x + i * 12, y - 12);
      pctx.lineTo(x + i * 12 + 4, y);
      pctx.lineTo(x + i * 12 - 4, y);
      pctx.fill();
    }
    pctx.restore();
  }

  function drawIcon(ictx, icon) {
    ictx.clearRect(0, 0, 32, 32);
    ictx.save();
    ictx.strokeStyle = "#171216";
    ictx.fillStyle = "#fff";
    ictx.lineWidth = 3;
    ictx.lineCap = "round";
    ictx.lineJoin = "round";
    const c = ictx;
    if (icon === "arrowUp") {
      c.beginPath(); c.moveTo(16, 6); c.lineTo(8, 16); c.moveTo(16, 6); c.lineTo(24, 16); c.moveTo(16, 7); c.lineTo(16, 26); c.stroke();
    } else if (icon === "arrowDown") {
      c.beginPath(); c.moveTo(16, 26); c.lineTo(8, 16); c.moveTo(16, 26); c.lineTo(24, 16); c.moveTo(16, 25); c.lineTo(16, 6); c.stroke();
    } else if (icon === "arrowLeft") {
      c.beginPath(); c.moveTo(6, 16); c.lineTo(16, 8); c.moveTo(6, 16); c.lineTo(16, 24); c.moveTo(7, 16); c.lineTo(26, 16); c.stroke();
    } else if (icon === "arrowRight") {
      c.beginPath(); c.moveTo(26, 16); c.lineTo(16, 8); c.moveTo(26, 16); c.lineTo(16, 24); c.moveTo(25, 16); c.lineTo(6, 16); c.stroke();
    } else if (icon === "fist" || icon === "punch") {
      c.strokeRect(8, 10, 16, 13); c.beginPath(); c.moveTo(10, 10); c.lineTo(10, 5); c.moveTo(16, 10); c.lineTo(16, 5); c.moveTo(22, 10); c.lineTo(22, 6); c.stroke();
    } else if (icon === "kick") {
      c.beginPath(); c.moveTo(11, 6); c.lineTo(17, 18); c.lineTo(27, 20); c.stroke();
    } else if (icon === "jump" || icon === "takeoff") {
      c.beginPath(); c.arc(16, 8, 4, 0, Math.PI * 2); c.moveTo(16, 12); c.lineTo(16, 22); c.moveTo(16, 22); c.lineTo(9, 28); c.moveTo(16, 22); c.lineTo(24, 27); c.stroke();
    } else if (icon === "duck") {
      c.beginPath(); c.arc(13, 18, 5, 0, Math.PI * 2); c.moveTo(18, 20); c.lineTo(27, 20); c.stroke();
    } else if (icon === "dodge" || icon === "speed") {
      c.beginPath(); c.moveTo(5, 10); c.lineTo(21, 10); c.moveTo(11, 17); c.lineTo(27, 17); c.moveTo(5, 24); c.lineTo(19, 24); c.stroke();
    } else if (icon === "hide") {
      c.beginPath(); c.arc(16, 12, 8, Math.PI, 0); c.moveTo(8, 12); c.lineTo(8, 27); c.moveTo(24, 12); c.lineTo(24, 27); c.stroke();
    } else if (icon === "tree") {
      c.beginPath();
      c.moveTo(16, 27);
      c.lineTo(16, 13);
      c.moveTo(16, 13);
      c.lineTo(7, 23);
      c.moveTo(16, 13);
      c.lineTo(25, 23);
      c.stroke();
      c.beginPath();
      c.arc(10, 11, 7, 0, Math.PI * 2);
      c.arc(20, 10, 8, 0, Math.PI * 2);
      c.arc(16, 4, 7, 0, Math.PI * 2);
      c.stroke();
    } else if (icon === "duplicate") {
      c.strokeRect(6, 10, 12, 14);
      c.strokeRect(14, 7, 12, 14);
      c.beginPath();
      c.moveTo(7, 5);
      c.lineTo(7, 2);
      c.moveTo(7, 2);
      c.lineTo(12, 2);
      c.moveTo(25, 27);
      c.lineTo(25, 30);
      c.moveTo(25, 30);
      c.lineTo(20, 30);
      c.stroke();
    } else if (icon === "teleport") {
      c.beginPath();
      c.arc(10, 16, 6, 0, Math.PI * 2);
      c.arc(22, 16, 6, 0, Math.PI * 2);
      c.moveTo(13, 8);
      c.lineTo(20, 8);
      c.lineTo(17, 4);
      c.moveTo(19, 24);
      c.lineTo(12, 24);
      c.lineTo(15, 28);
      c.stroke();
    } else if (icon === "boots") {
      c.beginPath(); c.ellipse(11, 18, 5, 11, -0.4, 0, Math.PI * 2); c.ellipse(22, 18, 5, 11, 0.4, 0, Math.PI * 2); c.stroke();
    } else if (icon === "bot") {
      c.strokeRect(9, 8, 14, 14); c.beginPath(); c.moveTo(12, 8); c.lineTo(9, 4); c.moveTo(20, 8); c.lineTo(24, 4); c.stroke();
    } else if (icon === "box") {
      c.strokeRect(7, 10, 18, 16);
      c.beginPath();
      c.moveTo(7, 15);
      c.lineTo(16, 19);
      c.lineTo(25, 15);
      c.moveTo(16, 19);
      c.lineTo(16, 26);
      c.moveTo(16, 3);
      c.lineTo(16, 8);
      c.moveTo(16, 8);
      c.lineTo(12, 5);
      c.moveTo(16, 8);
      c.lineTo(20, 5);
      c.stroke();
    } else if (icon === "laser") {
      c.strokeRect(5, 15, 12, 6); c.beginPath(); c.moveTo(18, 18); c.lineTo(29, 18); c.stroke();
    } else if (icon === "smash") {
      c.beginPath(); c.arc(16, 18, 9, 0, Math.PI * 2); c.moveTo(4, 28); c.lineTo(28, 28); c.stroke();
    } else if (icon === "wing" || icon === "fly" || icon === "bird" || icon === "fast-fly") {
      c.beginPath(); c.ellipse(11, 16, 7, 12, -0.3, 0, Math.PI * 2); c.ellipse(22, 16, 7, 12, 0.3, 0, Math.PI * 2); c.stroke();
    } else if (icon === "bat") {
      c.beginPath();
      c.moveTo(16, 18);
      c.bezierCurveTo(8, 4, 3, 13, 2, 24);
      c.lineTo(10, 20);
      c.lineTo(16, 26);
      c.lineTo(22, 20);
      c.lineTo(30, 24);
      c.bezierCurveTo(29, 13, 24, 4, 16, 18);
      c.closePath();
      c.stroke();
      c.beginPath();
      c.arc(13, 16, 1.5, 0, Math.PI * 2);
      c.arc(19, 16, 1.5, 0, Math.PI * 2);
      c.stroke();
    } else if (icon === "mammal" || icon === "claws" || icon === "gorilla" || icon === "heavy" || icon === "charge") {
      c.beginPath(); c.ellipse(14, 18, 10, 8, 0, 0, Math.PI * 2); c.arc(23, 12, 6, 0, Math.PI * 2); c.moveTo(9, 23); c.lineTo(6, 29); c.moveTo(18, 24); c.lineTo(21, 29); c.stroke();
    } else if (icon === "reptile" || icon === "slither" || icon === "squeeze") {
      c.beginPath(); c.moveTo(3, 20); c.bezierCurveTo(8, 8, 18, 28, 29, 12); c.stroke(); c.beginPath(); c.arc(27, 12, 4, 0, Math.PI * 2); c.stroke();
    } else if (icon === "amphibian") {
      c.beginPath(); c.arc(16, 17, 9, 0, Math.PI * 2); c.moveTo(8, 20); c.lineTo(3, 27); c.moveTo(24, 20); c.lineTo(29, 27); c.moveTo(10, 10); c.lineTo(6, 6); c.moveTo(22, 10); c.lineTo(26, 6); c.stroke();
    } else if (icon === "fish" || icon === "shark" || icon === "water-shot" || icon === "fast-swim" || icon === "swim" || icon === "glide" || icon === "stab" || icon === "zap" || icon === "puff") {
      c.beginPath(); c.ellipse(15, 17, 10, 6, 0, 0, Math.PI * 2); c.moveTo(5, 17); c.lineTo(1, 11); c.lineTo(1, 23); c.closePath(); c.moveTo(25, 17); c.lineTo(30, 15); c.stroke();
      if (icon === "shark") {
        c.beginPath(); c.moveTo(14, 11); c.lineTo(18, 3); c.lineTo(20, 12); c.stroke();
      }
    } else if (icon === "insect" || icon === "small") {
      c.beginPath(); c.ellipse(16, 18, 7, 10, 0, 0, Math.PI * 2); c.arc(16, 7, 5, 0, Math.PI * 2); c.moveTo(9, 15); c.lineTo(3, 10); c.moveTo(23, 15); c.lineTo(29, 10); c.moveTo(9, 21); c.lineTo(3, 25); c.moveTo(23, 21); c.lineTo(29, 25); c.stroke();
    } else if (icon === "tail" || icon === "bite" || icon === "peck") {
      c.beginPath(); c.arc(14, 14, 8, 0, Math.PI * 2); c.moveTo(22, 15); c.lineTo(30, 12); c.lineTo(24, 20); c.stroke();
    } else if (icon === "run" || icon === "dash" || icon === "fast") {
      c.beginPath(); c.moveTo(4, 10); c.lineTo(21, 10); c.moveTo(9, 17); c.lineTo(28, 17); c.moveTo(4, 24); c.lineTo(20, 24); c.stroke();
    } else if (icon === "splash") {
      for (let i = 0; i < 6; i += 1) { c.beginPath(); c.arc(8 + i * 4, 10 + (i % 3) * 5, 2 + (i % 2), 0, Math.PI * 2); c.stroke(); }
    } else if (icon === "tornado") {
      c.beginPath(); c.ellipse(16, 10, 11, 4, 0, 0, Math.PI * 2); c.ellipse(16, 17, 8, 4, 0, 0, Math.PI * 2); c.ellipse(16, 24, 4, 3, 0, 0, Math.PI * 2); c.stroke();
    } else if (icon === "bolt") {
      c.beginPath(); c.moveTo(19, 3); c.lineTo(9, 17); c.lineTo(17, 17); c.lineTo(12, 29); c.lineTo(25, 13); c.lineTo(17, 13); c.closePath(); c.stroke();
    } else if (icon === "freeze") {
      c.strokeRect(8, 7, 16, 19);
      c.beginPath();
      c.moveTo(4, 16);
      c.lineTo(28, 16);
      c.moveTo(16, 3);
      c.lineTo(16, 29);
      c.moveTo(8, 8);
      c.lineTo(24, 24);
      c.moveTo(24, 8);
      c.lineTo(8, 24);
      c.stroke();
    } else if (icon === "dig") {
      c.beginPath();
      c.moveTo(9, 6);
      c.lineTo(23, 20);
      c.moveTo(19, 16);
      c.lineTo(26, 9);
      c.moveTo(6, 25);
      c.bezierCurveTo(10, 20, 22, 20, 27, 25);
      c.stroke();
    } else if (icon === "poison") {
      c.beginPath();
      c.ellipse(16, 19, 9, 10, 0, 0, Math.PI * 2);
      c.moveTo(16, 4);
      c.lineTo(9, 17);
      c.moveTo(16, 4);
      c.lineTo(23, 17);
      c.stroke();
      c.beginPath();
      c.arc(13, 18, 1.5, 0, Math.PI * 2);
      c.arc(19, 18, 1.5, 0, Math.PI * 2);
      c.stroke();
    } else if (icon === "axe") {
      c.beginPath();
      c.moveTo(6, 27);
      c.lineTo(22, 8);
      c.stroke();
      c.beginPath();
      c.moveTo(20, 6);
      c.lineTo(29, 9);
      c.lineTo(25, 20);
      c.lineTo(17, 15);
      c.closePath();
      c.stroke();
    } else if (icon === "sword") {
      c.beginPath();
      c.moveTo(8, 26);
      c.lineTo(24, 5);
      c.moveTo(18, 16);
      c.lineTo(25, 23);
      c.moveTo(14, 20);
      c.lineTo(8, 14);
      c.stroke();
    } else if (icon === "mouth") {
      c.beginPath(); c.ellipse(16, 17, 12, 8, 0, 0, Math.PI * 2); c.stroke(); c.beginPath(); c.moveTo(9, 13); c.lineTo(12, 19); c.lineTo(15, 13); c.lineTo(18, 19); c.lineTo(21, 13); c.stroke();
    } else if (icon === "saw") {
      c.beginPath(); c.moveTo(4, 18); for (let i = 0; i < 6; i += 1) c.lineTo(8 + i * 4, i % 2 ? 24 : 12); c.lineTo(30, 18); c.stroke();
    } else if (icon === "shield") {
      c.beginPath(); c.moveTo(16, 4); c.lineTo(27, 9); c.lineTo(24, 23); c.lineTo(16, 29); c.lineTo(8, 23); c.lineTo(5, 9); c.closePath(); c.stroke();
    } else if (icon === "crayon") {
      c.beginPath(); c.moveTo(8, 24); c.lineTo(22, 10); c.lineTo(27, 15); c.lineTo(13, 29); c.closePath(); c.stroke(); c.moveTo(22, 10); c.lineTo(24, 5); c.lineTo(27, 15); c.stroke();
    } else {
      c.beginPath(); c.arc(16, 16, 10, 0, Math.PI * 2); c.stroke();
    }
    ictx.restore();
  }

  function formatClock(totalSeconds) {
    const seconds = Math.max(0, Math.ceil(totalSeconds));
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function distancePoint(x1, y1, x2, y2) {
    return Math.hypot(x1 - x2, y1 - y2);
  }

  function distancePointToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSq = dx * dx + dy * dy;
    if (!lengthSq) return distancePoint(px, py, x1, y1);
    const t = clamp(((px - x1) * dx + (py - y1) * dy) / lengthSq, 0, 1);
    return distancePoint(px, py, x1 + dx * t, y1 + dy * t);
  }

  function isInFront(attacker, target, range) {
    const dx = target.x - attacker.x;
    if (Math.sign(dx) !== attacker.facing && Math.abs(dx) > 32) return false;
    return Math.abs(dx) < range && Math.abs(target.y - attacker.y) < 82 && Math.abs(target.z - attacker.z) < 90;
  }

  function faceAttackTarget(attacker, target, range) {
    const side = attackTargetSide(attacker, target, range);
    if (side) attacker.facing = side;
  }

  function attackTargetSide(attacker, target, range) {
    let best = null;
    const consider = (x, y, z = 0) => {
      const dx = x - attacker.x;
      if (Math.abs(dx) < 6 || Math.abs(dx) > range) return;
      if (Math.abs(y - attacker.y) > 120 || Math.abs(z - attacker.z) > 110) return;
      const score = Math.abs(dx);
      if (!best || score < best.score) best = { side: dx < 0 ? -1 : 1, score };
    };
    if (target && target.health > 0) consider(target.x, target.y, target.z);
    if (game && game.helpers) {
      game.helpers.forEach((helper) => {
        if (helper.owner === attacker) return;
        consider(helper.x, helper.y, helper.z);
      });
    }
    return best ? best.side : 0;
  }

  function obstacleDistance(fighter, obstacle) {
    if (obstacle.type === "tree") return distancePoint(fighter.x, fighter.y, obstacle.x, obstacle.y);
    const cx = clamp(fighter.x, obstacle.x - obstacle.w / 2, obstacle.x + obstacle.w / 2);
    const cy = clamp(fighter.y, obstacle.y - obstacle.h / 2, obstacle.y + obstacle.h / 2);
    return distancePoint(fighter.x, fighter.y, cx, cy);
  }

  function wrapText(text, maxChars) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = "";
    words.forEach((word) => {
      if ((line + " " + word).trim().length > maxChars && line) {
        lines.push(line);
        line = word;
      } else {
        line = (line + " " + word).trim();
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  }

  function initAudio() {
    if (!audio.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audio.ctx = new AudioContext();
    }
    if (audio.ctx && audio.ctx.state === "suspended") audio.ctx.resume();
  }

  function playTone(freq, duration, type = "square", gain = 0.08) {
    if (!audio.ctx || audio.volume <= 0) return;
    const osc = audio.ctx.createOscillator();
    const g = audio.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain * audio.volume;
    g.gain.exponentialRampToValueAtTime(0.0001, audio.ctx.currentTime + duration);
    osc.connect(g);
    g.connect(audio.ctx.destination);
    osc.start();
    osc.stop(audio.ctx.currentTime + duration);
  }

  function playEffect(type) {
    if (type === "pow") playTone(170, 0.08, "square", 0.12);
    else if (type === "whack") { playTone(120, 0.07, "sawtooth", 0.12); setTimeout(() => playTone(90, 0.08, "square", 0.09), 70); }
    else if (type === "hit") { playTone(150, 0.07, "square", 0.1); setTimeout(() => playTone(245, 0.05, "triangle", 0.06), 60); }
    else if (type === "bigHit") { playTone(105, 0.11, "sawtooth", 0.13); setTimeout(() => playTone(70, 0.12, "square", 0.1), 80); }
    else if (type === "laser") playTone(520, 0.16, "sawtooth", 0.09);
    else if (type === "splash") playTone(310, 0.12, "triangle", 0.08);
    else if (type === "boom") playTone(70, 0.22, "sawtooth", 0.12);
    else if (type === "fly" || type === "whoosh") playTone(380, 0.12, "sine", 0.06);
    else if (type === "speed") playTone(700, 0.12, "square", 0.08);
    else if (type === "shield") playTone(440, 0.12, "triangle", 0.06);
    else if (type === "bot") playTone(160, 0.12, "square", 0.08);
    else if (type === "mouth") playTone(95, 0.14, "sawtooth", 0.1);
    else playTone(210, 0.04, "square", 0.04);
  }

  function startBattleMusic() {
    stopBattleMusic();
    if (!audio.ctx || audio.volume <= 0) return;
    const pattern = [92, 92, 92, 116, 116, 116, 92, 92, 92, 92, 70, 70, 78, 78];
    audio.musicTimer = setInterval(() => {
      if (!game || game.paused || game.gameOver || audio.volume <= 0) return;
      const freq = pattern[audio.musicStep % pattern.length];
      playTone(freq, 0.12, "sawtooth", 0.035);
      audio.musicStep += 1;
    }, 170);
  }

  function stopBattleMusic() {
    if (audio.musicTimer) clearInterval(audio.musicTimer);
    audio.musicTimer = null;
  }

  function playWinSound() {
    if (!audio.ctx || audio.volume <= 0) return;
    [330, 392, 523, 659].forEach((freq, i) => setTimeout(() => playTone(freq, 0.18, "square", 0.08), i * 130));
    speakText("Hooray! Hooray!", 1.25, 1.4);
  }

  function playLoseSound() {
    if (!audio.ctx || audio.volume <= 0) return;
    [220, 165, 130].forEach((freq, i) => setTimeout(() => playTone(freq, 0.25, "sawtooth", 0.08), i * 260));
  }

  function speakMayor(text) {
    if (!("speechSynthesis" in window) || audio.volume <= 0) return;
    if (!/ha ha|beat|take|scared|bank|bots|flying|laser|how dare/i.test(text)) return;
    speakText(text, 0.58, 0.86);
  }

  function speakText(text, pitch, rate) {
    if (!("speechSynthesis" in window) || audio.volume <= 0) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = clamp(audio.volume, 0, 1);
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  function wireEvents() {
    els.storyButton.addEventListener("click", () => openSelect("story"));
    els.twoPlayerButton.addEventListener("click", () => openSelect("two"));
    els.howToButton.addEventListener("click", openHowTo);
    document.querySelectorAll("[data-back-menu]").forEach((button) => button.addEventListener("click", showMainMenu));
    els.startBattleButton.addEventListener("click", startBattle);
    els.sendLinkButton.addEventListener("click", sendLink);
    els.pauseButton.addEventListener("click", pauseGame);
    els.resumeButton.addEventListener("click", resumeGame);
    els.restartButton.addEventListener("click", restartCurrentLevel);
    els.playAgainButton.addEventListener("click", () => openSelect(selectState.mode));
    els.menuButton.addEventListener("click", showMainMenu);
    els.volumeSlider.addEventListener("input", () => {
      initAudio();
      audio.volume = Number(els.volumeSlider.value);
      if (audio.volume > 0 && game && !audio.musicTimer) startBattleMusic();
      if (audio.volume <= 0) stopBattleMusic();
    });
    window.addEventListener("keydown", (event) => {
      keys[event.code] = true;
      if (!game) return;
      if (event.code === "Space") {
        event.preventDefault();
        performBasic(game.p1, "jump");
      }
      if (event.code === "KeyJ") performBasic(game.p1, "punch");
      if (event.code === "KeyK") performBasic(game.p1, "kick");
      if (event.code === "KeyL") performBasic(game.p1, "dodge");
      if (event.code === "KeyH") performBasic(game.p1, "hide");
      if (event.code === "Slash" && game.mode === "two") performBasic(game.p2, "punch");
      if (event.code === "Period" && game.mode === "two") performBasic(game.p2, "kick");
      if (event.code === "Enter" && game.mode === "two") performBasic(game.p2, "jump");
      if (event.code === "Escape") pauseGame();
    });
    window.addEventListener("keyup", (event) => {
      keys[event.code] = false;
    });
    window.addEventListener("pointerup", clearHoldInputs);
    window.addEventListener("pointercancel", clearHoldInputs);
    window.addEventListener("blur", clearHoldInputs);
    window.addEventListener("pointerdown", initAudio, { once: true });
  }

  function clearHoldInputs() {
    buttonInput.p1.left = false;
    buttonInput.p1.right = false;
    buttonInput.p1.up = false;
    buttonInput.p1.down = false;
    buttonInput.p1.botLeft = false;
    buttonInput.p1.botRight = false;
    buttonInput.p1.botUp = false;
    buttonInput.p1.botDown = false;
    buttonInput.p2.left = false;
    buttonInput.p2.right = false;
    buttonInput.p2.up = false;
    buttonInput.p2.down = false;
    buttonInput.p2.botLeft = false;
    buttonInput.p2.botRight = false;
    buttonInput.p2.botUp = false;
    buttonInput.p2.botDown = false;
  }

  function applyUrlSelection() {
    const url = new URL(location.href);
    const p1 = url.searchParams.get("p1");
    const p2 = url.searchParams.get("p2");
    const world = url.searchParams.get("world");
    if (p1 && CHARACTERS[p1]) selectState.p1 = p1;
    if (p2 && CHARACTERS[p2]) selectState.p2 = p2;
    if (world && WORLDS[world] && isWorldUnlocked(world)) selectState.world = world;
    if (url.searchParams.get("mode") === "two-player") {
      selectState.mode = "two";
    }
  }

  applyUrlSelection();
  wireEvents();
  renderMainCharacters();
  if (new URL(location.href).searchParams.get("mode") === "two-player") openSelect("two");
  rafId = requestAnimationFrame(loop);
})();
