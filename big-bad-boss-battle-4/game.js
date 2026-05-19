(() => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const HEARTS_PER_FIGHTER = 8;

  const heroes = {
    tats: { name: "Super Tats", color: "#1478cf", accent: "#78c9ff", hp: HEARTS_PER_FIGHTER, firstPower: "Giant Punch" },
    fary: { name: "Mom Fary", color: "#8542d8", accent: "#ff89c6", hp: HEARTS_PER_FIGHTER, firstPower: "Wing Gust" },
    apple: { name: "Super Appie Juice", color: "#f18319", accent: "#ffcf54", hp: HEARTS_PER_FIGHTER, firstPower: "Apple Juice Shot" },
    freddy: { name: "Freddy", color: "#17633c", accent: "#f0cf62", hp: HEARTS_PER_FIGHTER, firstPower: "Sneak Trick" },
    benji: { name: "Benji", color: "#6f737a", accent: "#45a6db", hp: HEARTS_PER_FIGHTER, firstPower: "Tornado" },
    frost: { name: "Mr. 67", color: "#146e8f", accent: "#6cf0c2", hp: HEARTS_PER_FIGHTER, firstPower: "Freeze Block" },
    ness: { name: "Super Ness", color: "#c73583", accent: "#6bd8ff", hp: HEARTS_PER_FIGHTER, firstPower: "Super Kick" },
    crayon: { name: "Captain Crayonstorm", color: "#21a36c", accent: "#f5d129", hp: HEARTS_PER_FIGHTER, firstPower: "Crayon Barrage" },
    hoodie: { name: "Zap Hoodie", color: "#1f1f29", accent: "#49d9ff", hp: HEARTS_PER_FIGHTER, firstPower: "Zip Zap" },
    mayer: { name: "Mischievous Mayer", color: "#6b28c7", accent: "#f08318", hp: HEARTS_PER_FIGHTER, firstPower: "Flying Boots" },
    yonatan: { name: "Yapping Yonatan", color: "#f07918", accent: "#d61f2f", hp: HEARTS_PER_FIGHTER, firstPower: "Mouth Monsters" }
  };

  const travelStops = [
    "Florida", "Florida",
    "New York", "New York",
    "Antarctica", "Antarctica",
    "Paris", "Paris",
    "Phoenix", "Phoenix",
    "Russia", "Russia",
    "China", "China",
    "Canada", "Canada",
    "Africa Savanna", "Africa Savanna",
    "Washington D.C.", "Washington D.C.",
    "Iran Palace", "Iran Palace", "Iran Palace", "Iran Palace",
    "Israel", "Israel",
    "Egyptian Palace", "Egyptian Palace", "Egyptian Palace", "Egyptian Palace"
  ];

  const levels = {
    1: {
      title: "Level 1 Florida",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 1 started in Florida. Fight the boss you chose!"
    },
    2: {
      title: "Level 2 Florida",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 2 stayed in Florida. Fight the boss you chose!"
    },
    3: {
      title: "Level 3 New York",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 3 started in New York. The boss is a little quicker now!"
    },
    4: {
      title: "Level 4 New York",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 4 stayed in New York. The boss hits a little harder!"
    },
    5: {
      title: "Level 5 Antarctica",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 5 started in Antarctica. Run across the ice and find the Penguin Treasure!"
    },
    6: {
      title: "Level 6 Antarctica",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 6 stayed in Antarctica. The boss chases faster while you hunt Penguin Treasure!"
    },
    7: {
      title: "Level 7 Paris",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 7 started in Paris. Choose your boss and move close to attack!"
    },
    8: {
      title: "Level 8 Paris",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 8 stayed in Paris. The boss powers are getting sharper!"
    },
    9: {
      title: "Level 9 Phoenix",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 9 started in Phoenix. Find 2 desert scavenger hunt treasures!"
    },
    10: {
      title: "Level 10 Phoenix",
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: "Level 10 stayed in Phoenix. Find 3 treasures, with the last one behind the boss!"
    }
  };

  const bossLevels = {
    4: {
      target: "airplane",
      name: "Airplane Attacker",
      type: "paper",
      hpKey: "airplaneHp",
      action: "airplaneAttack",
      color: "#f15b42",
      accent: "#ffd84a",
      board: "LEVEL 4: TREETOPS",
      note: "DODGE THE DIVE!",
      maxHp: HEARTS_PER_FIGHTER
    },
    5: {
      target: "pusher",
      name: "Paper Pusher",
      type: "paper",
      hpKey: "pusherHp",
      action: "paperPush",
      color: "#7146d9",
      accent: "#9edcff",
      board: "LEVEL 5: LEAF TRAIL",
      note: "DON'T GET PUSHED!",
      maxHp: HEARTS_PER_FIGHTER
    },
    6: {
      target: "whacker",
      name: "Wing Whacker",
      type: "paper",
      hpKey: "whackerHp",
      action: "wingWhack",
      color: "#18a66a",
      accent: "#fffef7",
      board: "LEVEL 6: WINDY CANOPY",
      note: "WATCH THE WINGS!",
      maxHp: HEARTS_PER_FIGHTER
    },
    7: {
      target: "archer",
      name: "Art Archer",
      type: "archer",
      hpKey: "archerHp",
      action: "paintbrushArrow",
      color: "#ef4fa3",
      accent: "#ffd84a",
      board: "LEVEL 7: PAINTED VINES",
      note: "PAINTBRUSH ARROWS!",
      maxHp: HEARTS_PER_FIGHTER
    },
    8: {
      target: "librarian",
      name: "Librarian Launcher",
      type: "librarian",
      hpKey: "librarianHp",
      action: "bookLaunch",
      color: "#6a4b2b",
      accent: "#9edcff",
      board: "LEVEL 8: BOOK NEST",
      note: "BOOKS ARE FLYING!",
      maxHp: HEARTS_PER_FIGHTER
    },
    9: {
      target: "bus",
      name: "Field Trip Terror",
      type: "bus",
      hpKey: "busHp",
      action: "busStop",
      color: "#ffd84a",
      accent: "#d91f2e",
      board: "LEVEL 9: FOREST TRAIL",
      note: "STOP SIGN TRAP!",
      maxHp: HEARTS_PER_FIGHTER
    },
    10: {
      target: "principal",
      name: "Robot Principal",
      type: "principal",
      hpKey: "principalHp",
      action: "principalWarning",
      color: "#6f737a",
      accent: "#49d9ff",
      board: "LEVEL 10: TREE FORT",
      note: "TREE FORT BOSS!",
      maxHp: HEARTS_PER_FIGHTER
    }
  };

  const robotTricks = [
    { action: "principalMultiply", note: "MULTIPLY MODE!", label: "MULTIPLY" },
    { action: "principalGiant", note: "GIANT MODE!", label: "GIANT" },
    { action: "principalFar", note: "FAR ATTACK!", label: "FAR" },
    { action: "principalLaser", note: "LASER OFFICE!", label: "LASER" },
    { action: "principalSpin", note: "SPIN ATTACK!", label: "SPIN" }
  ];

  for (let level = 11; level <= 30; level += 1) {
    const trick = robotTricks[(level - 11) % robotTricks.length];
    const place = travelStops[level - 1];
    levels[level] = {
      title: `Level ${level} ${place}`,
      intro: "Who do you want to choose: Mischievous Mayer, Yapping Yonatan, or Ice Boss?",
      start: `Level ${level} started in ${place}. Fight the boss you chose and get ready for stronger powers!`
    };
    bossLevels[level] = {
      target: "principal",
      name: level === 30 ? "Final Robot Principal" : `Robot Principal ${level}`,
      type: "principal",
      hpKey: "principalHp",
      action: trick.action,
      color: level === 30 ? "#d91f2e" : "#6f737a",
      accent: level === 30 ? "#ffd84a" : "#49d9ff",
      board: `LEVEL ${level}: DEEP FOREST ROBOT`,
      note: trick.note,
      maxHp: HEARTS_PER_FIGHTER
    };
  }

  levels[15].start = "Level 15 started in Canada. Fight clue guards to earn the first half of the treasure map!";
  levels[16].start = "Level 16 stayed in Canada. Finish the map, find the X, and dig up the Canada star treasure!";
  levels[17].start = "Level 17 started in Africa Savanna. Your normal-looking heroes temporarily get their animal powers back!";
  levels[18].start = "Level 18 stayed in Africa Savanna. Use the animal powers one more time before they switch back!";
  levels[19].start = "Level 19 started inside the White House in Washington D.C. Protect President Trump for two minutes!";
  levels[20].start = "Level 20 stayed inside the White House in Washington D.C. Protect President Trump for three minutes!";
  for (let level = 21; level <= 24; level += 1) {
    levels[level].start = `Level ${level} started inside the Iran palace. Run over charge-ups to get stronger during the fight!`;
  }
  levels[25].start = "Level 25 started in Israel by the wall. Run through wall openings, escape the villain, and win before the 2-minute timer ends!";
  levels[26].start = "Level 26 stayed in Israel by the wall. This rematch has a 3-minute timer and the villain chases harder!";
  for (let level = 27; level <= 30; level += 1) {
    levels[level].start = `Level ${level} started inside the Egyptian palace. Grab Egyptian charge-ups while you fight!`;
  }

  const powerUps = {
    homeworkShield: {
      name: "Homework Shield",
      unlock: "Beat Mischievous Mayer",
      description: "Blocks one boss hit."
    },
    poetryBlast: {
      name: "Poetry Blast",
      unlock: "Beat Yapping Yonatan",
      description: "Does a strong word attack."
    }
  };

  const elephantPowers = [
    { id: "elephantTrunkGrab", name: "Giant Punch", damage: 3 },
    { id: "elephantForestStomp", name: "Super Stomp", damage: 2 },
    { id: "elephantTuskShield", name: "Gorilla Jump", damage: 0 }
  ];

  const parrotPowers = [
    { id: "parrotScream", name: "Wing Gust", damage: 0 },
    { id: "parrotWingBlast", name: "Fly", damage: 1.5 },
    { id: "parrotHealingFeather", name: "Takeoff Jump", damage: 0 }
  ];

  const cheetahPowers = [
    { id: "cheetahSpeed", name: "Apple Juice Shot", damage: 0.5 },
    { id: "cheetahTailGrab", name: "Apple Juice Tornado", damage: 0.5 },
    { id: "cheetahClaws", name: "Apple Juice Lightning", damage: 0.5 }
  ];

  const polarPowers = [
    { id: "polarTeeth", name: "Tornado", damage: 1.5 },
    { id: "polarIceChunk", name: "Teleport", damage: 1 },
    { id: "polarIceTornado", name: "Ice Shield", damage: 0.5 }
  ];

  const monkeyPowers = [
    { id: "bananaStorm", name: "Freeze Block", damage: 1.5 },
    { id: "bananaShoot", name: "Burrow Strike", damage: 1 },
    { id: "bananaSlip", name: "Poison Storm", damage: 0.5 }
  ];

  const fennecPowers = [
    { id: "fennecLove", name: "Multiplication", damage: 1 },
    { id: "fennecSneakBite", name: "Turn Into Any Animal", damage: 1 },
    { id: "fennecPounce", name: "Sneak Trick", damage: 0 }
  ];

  const mayerPowers = [
    { id: "mayerBigBock", name: "Flying Boots", damage: 0.5 },
    { id: "mayerFlyUp", name: "Mayor Bots", damage: 0 },
    { id: "mayerRoosterFlyers", name: "Laser Ray", damage: 1 }
  ];

  const yonatanPowers = [
    { id: "yonatanJaw", name: "Mouth Monsters", damage: 1 },
    { id: "yonatanChomper", name: "Yap Blast", damage: 1 },
    { id: "yonatanTailSwipe", name: "Super Yap", damage: 0.5 },
    { id: "yonatanAlligatorMonsters", name: "Mega Mouth Monster", damage: 1 }
  ];

  const animalPowerNames = {
    elephantTrunkGrab: "Elephant Trunk Grab",
    elephantForestStomp: "Elephant Smash",
    elephantTuskShield: "Tusk Shield",
    parrotScream: "Loud Parrot Screech",
    parrotWingBlast: "Wing Blast",
    parrotHealingFeather: "Healing Feather",
    cheetahSpeed: "Super Speed Run",
    cheetahTailGrab: "Tail Grab",
    cheetahClaws: "Claw Scratch",
    polarTeeth: "Teeth Attack",
    polarIceChunk: "Ice Chunk",
    polarIceTornado: "Ice Tornado",
    bananaStorm: "Poisonous Banana Storm",
    bananaShoot: "Banana Shoot",
    bananaSlip: "Banana Peel Slip",
    fennecLove: "Fennec Love",
    fennecSneakBite: "Sneak Bite",
    fennecPounce: "Pounce",
    mayerBigBock: "Super Big Bock",
    mayerFlyUp: "Fly Up",
    mayerRoosterFlyers: "Chicken Rooster Flyers",
    yonatanJaw: "Crocodile Jaw",
    yonatanChomper: "Crocodile Chomper",
    yonatanTailSwipe: "Tail Swipe",
    yonatanAlligatorMonsters: "Alligator Monsters"
  };

  const els = {
    statusText: document.getElementById("statusText"),
    selectedHeroName: document.getElementById("selectedHeroName"),
    heroHearts: document.getElementById("heroHearts"),
    bossHearts: document.getElementById("bossHearts"),
    powerInventory: document.getElementById("powerInventory"),
    levelEyebrow: document.getElementById("levelEyebrow"),
    startButton: document.getElementById("startButton"),
    resetButton: document.getElementById("resetButton"),
    punchButton: document.getElementById("punchButton"),
    kickButton: document.getElementById("kickButton"),
    jumpButton: document.getElementById("jumpButton"),
    hideButton: document.getElementById("hideButton"),
    powerButtons: Array.from(document.querySelectorAll(".power-slot"))
  };

  const state = {
    started: false,
    won: false,
    lost: false,
    level: 1,
    heroId: "tats",
    heroHp: HEARTS_PER_FIGHTER,
    mathHp: HEARTS_PER_FIGHTER,
    evilHp: HEARTS_PER_FIGHTER,
    iceHp: HEARTS_PER_FIGHTER,
    foodHp: HEARTS_PER_FIGHTER,
    crazyBallHp: HEARTS_PER_FIGHTER,
    airplaneHp: HEARTS_PER_FIGHTER,
    pusherHp: HEARTS_PER_FIGHTER,
    whackerHp: HEARTS_PER_FIGHTER,
    archerHp: HEARTS_PER_FIGHTER,
    librarianHp: HEARTS_PER_FIGHTER,
    busHp: HEARTS_PER_FIGHTER,
    principalHp: HEARTS_PER_FIGHTER,
    earnedPowers: new Set(),
    mathRewarded: false,
    evilRewarded: false,
    iceRewarded: false,
    heroX: 235,
    heroY: 410,
    mazeBossX: 940,
    mazeBossY: 430,
    treasurePart: 1,
    treasureBossX: 90,
    treasureBossY: 410,
    treasurePowerX: 250,
    scavengerFound: new Set(),
    scavengerBossReady: false,
    canadaHits: {},
    protectPresidentHp: 5,
    protectStartedAt: 0,
    protectDurationMs: 120000,
    protectInterval: null,
    protectHazards: [],
    nextHazardId: 1,
    palaceChargesCollected: new Set(),
    levelStartedAt: 0,
    levelDurationMs: 120000,
    levelTimerInterval: null,
    israelStartedAt: 0,
    israelDurationMs: 120000,
    israelInterval: null,
    israelVillainX: 980,
    israelVillainY: 410,
    action: "",
    playerAction: "",
    playerTarget: "",
    chosenBossTarget: "math",
    trappedUntil: 0,
    knockedDownUntil: 0,
    hiddenUntil: 0,
    jumpingUntil: 0,
    laneDodgeUntil: 0,
    laneDodgeDirection: "",
    projectileLane: "middle",
    bossPressureStep: 0,
    trunkGrabUntil: 0,
    trunkGrabTarget: "",
    powerSilenceUntil: 0,
    powerSilenceTarget: "",
    cheetahPowerStep: 0,
    polarPowerStep: 0,
    iceTornadoUntil: 0,
    iceTornadoTarget: "",
    monkeyPowerStep: 0,
    bananaSlipUntil: 0,
    bananaSlipTarget: "",
    fennecLoveUntil: 0,
    fennecLoveTarget: "",
    fennecPowerStep: 0,
    fennecPounceTarget: "",
    mayerPowerStep: 0,
    mayerBockUntil: 0,
    mayerBockTarget: "",
    yonatanPowerStep: 0,
    yonatanChomperUntil: 0,
    yonatanChomperTarget: "",
    prizeDrops: [],
    bowShots: 0,
    armorBlocks: 0,
    timedShieldUntil: 0,
    specialPowerCharges: 0,
    lastDefenseText: "",
    nextDropId: 1,
    tick: 0
  };

  const progress = {
    unlockedLevel: Number(localStorage.getItem("bbb4UnlockedLevel") || "1")
  };

  function resetGame() {
    clearLevelTimer();
    state.started = false;
    state.won = false;
    state.lost = false;
    state.heroHp = heroes[state.heroId].hp;
    if (isWhiteHouseProtectLevel()) {
      state.heroHp = 6;
    }
    state.mathHp = HEARTS_PER_FIGHTER;
    state.evilHp = HEARTS_PER_FIGHTER;
    state.iceHp = HEARTS_PER_FIGHTER;
    state.foodHp = HEARTS_PER_FIGHTER;
    state.crazyBallHp = HEARTS_PER_FIGHTER;
    state.airplaneHp = HEARTS_PER_FIGHTER;
    state.pusherHp = HEARTS_PER_FIGHTER;
    state.whackerHp = HEARTS_PER_FIGHTER;
    state.archerHp = HEARTS_PER_FIGHTER;
    state.librarianHp = HEARTS_PER_FIGHTER;
    state.busHp = HEARTS_PER_FIGHTER;
    state.principalHp = currentBossMaxHp();
    state.earnedPowers = new Set();
    state.mathRewarded = false;
    state.evilRewarded = false;
    state.iceRewarded = false;
    state.heroX = 235;
    state.heroY = 410;
    if (isStatueMazeLevel()) {
      resetStatueMazePositions();
    } else if (isAntarcticaTreasureLevel()) {
      resetAntarcticaTreasurePositions();
    } else if (isPhoenixScavengerLevel()) {
      resetPhoenixScavengerPositions();
    } else if (isCanadaTreasureMapLevel()) {
      resetCanadaTreasurePositions();
    }
    state.action = "";
    state.playerAction = "";
    state.playerTarget = "";
    state.chosenBossTarget = chooseAliveLevelOneTarget(state.chosenBossTarget);
    state.trappedUntil = 0;
    state.knockedDownUntil = 0;
    state.hiddenUntil = 0;
    state.jumpingUntil = 0;
    state.laneDodgeUntil = 0;
    state.laneDodgeDirection = "";
    state.projectileLane = "middle";
    state.bossPressureStep = 0;
    state.trunkGrabUntil = 0;
    state.trunkGrabTarget = "";
    state.powerSilenceUntil = 0;
    state.powerSilenceTarget = "";
    state.cheetahPowerStep = 0;
    state.polarPowerStep = 0;
    state.iceTornadoUntil = 0;
    state.iceTornadoTarget = "";
    state.monkeyPowerStep = 0;
    state.bananaSlipUntil = 0;
    state.bananaSlipTarget = "";
    state.fennecLoveUntil = 0;
    state.fennecLoveTarget = "";
    state.fennecPowerStep = 0;
    state.fennecPounceTarget = "";
    state.mayerPowerStep = 0;
    state.mayerBockUntil = 0;
    state.mayerBockTarget = "";
    state.yonatanPowerStep = 0;
    state.yonatanChomperUntil = 0;
    state.yonatanChomperTarget = "";
    state.prizeDrops = [];
    state.scavengerFound = new Set();
    state.scavengerBossReady = false;
    state.canadaHits = {};
    resetWhiteHouseProtect(false);
    state.palaceChargesCollected = new Set();
    state.levelStartedAt = 0;
    state.levelDurationMs = levelTimerDuration();
    resetIsraelWallFight(false);
    state.bowShots = 0;
    state.armorBlocks = 0;
    state.timedShieldUntil = 0;
    state.specialPowerCharges = 0;
    state.lastDefenseText = "";
    state.nextDropId = 1;
    state.tick = 0;
    els.statusText.textContent = preStartLevelText();
    setAttacks(true);
    updateHud();
    updateBossTargetChoices();
    updateLevelLocks();
    renderPowers();
    draw();
  }

  function startLevel() {
    if (!canPlayLevel(state.level)) {
      els.statusText.textContent = `Beat Level ${state.level - 1} to unlock Level ${state.level}.`;
      updateLevelLocks();
      return;
    }
    state.started = true;
    state.won = false;
    state.lost = false;
    if (isStatueMazeLevel()) {
      resetStatueMazePositions();
      els.statusText.textContent = `${levels[state.level].start} Use the arrows to escape through the Statue of Liberty maze. Get to EXIT at the head!`;
      setAttacks(true);
    } else if (isAntarcticaTreasureLevel()) {
      resetAntarcticaTreasurePositions();
      els.statusText.textContent = `${levels[state.level].start} Use arrows to run, dodge boss powers, and cross 3 icy screens.`;
      setAttacks(true);
    } else if (isPhoenixScavengerLevel()) {
      resetPhoenixScavengerPositions();
      els.statusText.textContent = `${levels[state.level].start} Use arrows to search the desert. Some pieces are behind cactus and rocks.`;
      setAttacks(false);
    } else if (isCanadaTreasureMapLevel()) {
      resetCanadaTreasurePositions();
      els.statusText.textContent = `${levels[state.level].start} Use arrows to find clue guards, then punch or kick them to earn map pieces.`;
      setAttacks(false);
    } else if (isWhiteHouseProtectLevel()) {
      resetWhiteHouseProtect(true);
      els.statusText.textContent = `${levels[state.level].start} Protect President Trump until the timer runs out. Punch, kick, or use powers to knock dangers away.`;
      setAttacks(false);
    } else if (isIsraelWallFightLevel()) {
      resetIsraelWallFight(true);
      els.statusText.textContent = `${levels[state.level].start} If time runs out, you win only if you have more hearts than the villain.`;
      setAttacks(false);
    } else {
      els.statusText.textContent = levels[state.level].start;
      setAttacks(false);
    }
    startLevelTimer();
    updateLevelLocks();
    updateHud();
    updateBossTargetChoices();
    draw();
  }

  function attack(kind, powerSlot = null) {
    state.lastDefenseText = "";
    if (!state.started || state.won || state.lost) {
      els.statusText.textContent = "Press Start Level first, then you can punch, kick, and use powers.";
      return;
    }
    if (isStatueMazeLevel()) {
      els.statusText.textContent = "This level is a Statue of Liberty maze. Use the arrow buttons or keyboard arrows to reach EXIT.";
      draw();
      return;
    }
    if (isAntarcticaTreasureLevel()) {
      attackAntarcticaTreasure(kind, powerSlot);
      return;
    }
    if (isPhoenixScavengerLevel()) {
      attackPhoenixBoss(kind);
      return;
    }
    if (isCanadaTreasureMapLevel()) {
      attackCanadaTreasure(kind);
      return;
    }
    if (isWhiteHouseProtectLevel()) {
      attackWhiteHouseProtect(kind);
      return;
    }
    if (isIsraelWallFightLevel()) {
      attackIsraelWallFight(kind);
      return;
    }
    if (kind === "jump" || kind === "hide") {
      useDefenseMove(kind);
      return;
    }
    state.chosenBossTarget = chooseAliveLevelOneTarget(state.chosenBossTarget);
    const target = currentTarget();
    state.playerTarget = target;
    if (kind === "power" && state.heroId === "tats") {
      elephantPowerAttack(target, powerSlot);
      return;
    }
    if (kind === "power" && state.heroId === "fary") {
      parrotPowerAttack(target, powerSlot);
      return;
    }
    if (kind === "power" && state.heroId === "apple") {
      cheetahPowerAttack(target, powerSlot);
      return;
    }
    if (kind === "power" && state.heroId === "freddy") {
      fennecPowerAttack(target, powerSlot);
      return;
    }
    if (kind === "power" && state.heroId === "benji") {
      polarPowerAttack(target, powerSlot);
      return;
    }
    if (kind === "power" && state.heroId === "frost") {
      monkeyPowerAttack(target, powerSlot);
      return;
    }
    if (kind === "power" && state.heroId === "mayer") {
      mayerPowerAttack(target, powerSlot);
      return;
    }
    if (kind === "power" && state.heroId === "yonatan") {
      yonatanPowerAttack(target, powerSlot);
      return;
    }
    if (kind === "power" && mustReachBossForPower(target) && !isCloseEnoughToAttack("kick", target)) {
      state.action = "miss";
      state.playerAction = kind;
      els.statusText.textContent = `${currentBossName(target)} is too far away for ${attackName(kind)}. Dodge the shots, get closer, then use it.`;
      draw();
      return;
    }
    if ((kind === "punch" || kind === "kick") && !isCloseEnoughToAttack(kind, target)) {
      state.action = "miss";
      state.playerAction = kind;
      els.statusText.textContent = `${attackName(kind)} missed because ${currentBossName(target)} is too far away. Move closer and try again.`;
      draw();
      return;
    }
    state.playerAction = kind;
    const damage = heroAttackDamage(kind === "power" ? usePowerDamage() : kind === "kick" ? 2 : 1);
    damageBoss(target, damage);
    checkPowerRewards();
    updateBossTargetChoices();

    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = levelWinText();
      if (advanceAfterWin()) {
        return;
      }
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }

    if (isBossInTrunk(target)) {
      state.action = "trunkGrab";
      els.statusText.textContent = `${attackName(kind)} hit ${currentBossName(target)} while Giant Punch knocked them back. They cannot hit back yet!`;
      updateHud();
      draw();
      return;
    }

    if (isBossPowerSilenced(target)) {
      state.action = "parrotScream";
      els.statusText.textContent = `${attackName(kind)} hit ${currentBossName(target)} while Wing Gust is blocking their powers. They cannot use a special attack yet!`;
      updateHud();
      draw();
      return;
    }

    if (isBossInIceTornado(target)) {
      state.action = "polarIceTornado";
      els.statusText.textContent = `${attackName(kind)} hit ${currentBossName(target)} while Ice Shield is blocking them. They cannot hit back yet!`;
      updateHud();
      draw();
      return;
    }

    if (isBossSlippingOnBanana(target)) {
      state.action = "bananaSlip";
      els.statusText.textContent = `${attackName(kind)} hit ${currentBossName(target)} while Poison Storm is making them dizzy. They cannot hit back yet!`;
      updateHud();
      draw();
      return;
    }

    if (isBossInFennecLove(target)) {
      state.action = "fennecLove";
      els.statusText.textContent = `${attackName(kind)} hit ${currentBossName(target)} while they are on the floor saying "I love you." They cannot hit back yet!`;
      updateHud();
      draw();
      return;
    }

    if (isBossBocked(target)) {
      state.action = "mayerBigBock";
      els.statusText.textContent = `${attackName(kind)} hit ${currentBossName(target)} while Flying Boots has them on the floor.`;
      updateHud();
      draw();
      return;
    }

    if (isBossChomped(target)) {
      state.action = "yonatanChomper";
      els.statusText.textContent = `${attackName(kind)} hit ${currentBossName(target)} while the floor is broken from Yap Blast.`;
      updateHud();
      draw();
      return;
    }

    const shieldBlocked = kind === "power" && state.heroId === "fary" && state.earnedPowers.has("homeworkShield");
    const blocked = shieldBlocked;
    const laneDodged = canLaneDodge(target) && Date.now() < state.laneDodgeUntil && dodgeBeatsLane(state.laneDodgeDirection, state.projectileLane);
    const dodged = Date.now() < state.hiddenUntil || Date.now() < state.jumpingUntil || laneDodged;
    applyBossPower(target, blocked, dodged);
    const bossAction = state.action;
    const bossDamage = bossDamageForAction(bossAction);
    const takenDamage = blocked || dodged ? 0 : takeHeroDamage(bossDamage);
    if (state.heroHp === 0) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = "The world bosses won this round. Reset for a rematch.";
      setAttacks(true);
      updateHud();
      draw();
      return;
    }

    state.action = blocked ? `${kind}-${target}` : bossAction;
    const bossName = currentBossName(target);
    els.statusText.textContent = `${attackName(kind)} hit ${bossName} for ${heartText(damage)}. ${bossCounterText(target, blocked, dodged, laneDodged, bossAction, takenDamage)}`;
    updateHud();
    draw();
  }

  function elephantPowerAttack(target, powerSlot = 0) {
    const power = powerForCurrentLevel(elephantPowers[Number.isInteger(powerSlot) ? powerSlot : 0] || elephantPowers[0]);
    if (power.id === "elephantTrunkGrab") {
      elephantTrunkGrab(target);
      return;
    }
    state.playerAction = "power";
    state.playerTarget = target;
    state.action = power.id;
    if (power.id === "elephantTuskShield") {
      state.armorBlocks += 2;
      els.statusText.textContent = "Gorilla Jump! Super Tats is protected from the next 2 boss hits.";
      updateHud();
      draw();
      return;
    }
    if (!isPowerCloseEnough(power.id, target)) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for Super Stomp. Move close, then stomp!`;
      draw();
      return;
    }
    damageBoss(target, heroAttackDamage(power.damage));
    checkPowerRewards();
    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `Super Stomp finished the fight. ${levelWinText()}`;
      if (advanceAfterWin()) return;
      setAttacks(true);
      updateHud();
      draw();
      return;
    }
    finishAnimalPowerCounter(target, power);
  }

  function elephantTrunkGrab(target) {
    state.playerAction = "power";
    if (!isPowerCloseEnough("elephantTrunkGrab", target)) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for Giant Punch. Move close, then punch!`;
      draw();
      return;
    }
    state.trunkGrabUntil = Date.now() + 30000;
    state.trunkGrabTarget = target;
    state.action = "trunkGrab";
    const damage = 3;
    damageBoss(target, damage);
    checkPowerRewards();
    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `Super Tats landed a giant punch on ${currentBossName(target)}. ${levelWinText()}`;
      if (advanceAfterWin()) {
        return;
      }
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }
    els.statusText.textContent = `Giant Punch! Super Tats hit ${currentBossName(target)} with a huge superhero punch for ${heartText(damage)}. They cannot hit back for 30 seconds.`;
    updateHud();
    draw();
  }

  function isBossInTrunk(target) {
    return state.trunkGrabTarget === target && Date.now() < state.trunkGrabUntil;
  }

  function parrotPowerAttack(target, powerSlot = 0) {
    const power = powerForCurrentLevel(parrotPowers[Number.isInteger(powerSlot) ? powerSlot : 0] || parrotPowers[0]);
    if (power.id === "parrotScream") {
      parrotPowerScream(target);
      return;
    }
    state.playerAction = "power";
    state.playerTarget = target;
    state.action = power.id;
    if (power.id === "parrotHealingFeather") {
      state.heroHp = Math.min(HEARTS_PER_FIGHTER, state.heroHp + 2);
      els.statusText.textContent = "Takeoff Jump! Mom Fary got 2 hearts back.";
      updateHud();
      draw();
      return;
    }
    if (!isPowerCloseEnough(power.id, target)) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for Wing Blast. Move close, then use it!`;
      draw();
      return;
    }
    damageBoss(target, heroAttackDamage(power.damage));
    checkPowerRewards();
    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `Fly finished the fight. ${levelWinText()}`;
      if (advanceAfterWin()) return;
      setAttacks(true);
      updateHud();
      draw();
      return;
    }
    finishAnimalPowerCounter(target, power);
  }

  function parrotPowerScream(target) {
    state.playerAction = "power";
    if (!isPowerCloseEnough("parrotScream", target)) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for Wing Gust. Move close, then gust!`;
      draw();
      return;
    }
    state.powerSilenceUntil = Date.now() + 30000;
    state.powerSilenceTarget = target;
    state.action = "parrotScream";
    els.statusText.textContent = `Wing Gust! Mom Fary blasted a wing gust so strong that ${currentBossName(target)} lost their powers for 30 seconds. They can still move, but no special powers!`;
    updateHud();
    draw();
  }

  function isBossPowerSilenced(target) {
    return state.powerSilenceTarget === target && Date.now() < state.powerSilenceUntil;
  }

  function pickPower(powers, stepKey, slot) {
    let power;
    if (Number.isInteger(slot) && slot >= 0 && slot < powers.length) {
      power = powers[slot];
    } else {
      power = powers[state[stepKey] % powers.length];
      state[stepKey] += 1;
    }
    return powerForCurrentLevel(power);
  }

  function powerForCurrentLevel(power) {
    const animalName = animalPowerNames[power.id];
    if (!isAfricaSavannaPowerLevel() || !animalName) return power;
    return { ...power, name: animalName };
  }

  function powerNeedsClose(powerId) {
    if (powerId === "cheetahTailGrab" || powerId === "cheetahClaws") {
      return isAfricaSavannaPowerLevel();
    }
    return [
      "elephantTrunkGrab",
      "elephantForestStomp",
      "parrotScream",
      "fennecPounce",
      "mayerBigBock",
      "yonatanJaw",
      "yonatanTailSwipe"
    ].includes(powerId);
  }

  function isPowerCloseEnough(powerId, target) {
    if (!powerNeedsClose(powerId)) return true;
    if (powerId === "cheetahSpeed") return isCloseEnoughToCheetahDash(target);
    return isCloseEnoughToAttack("kick", target);
  }

  function cheetahPowerAttack(target, powerSlot = 0) {
    const power = pickPower(cheetahPowers, "cheetahPowerStep", powerSlot);
    state.playerAction = "power";
    state.playerTarget = target;
    state.action = power.id;
    updatePowerButton();

    if (!isPowerCloseEnough(power.id, target)) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for ${power.name}. Run closer, then use the power!`;
      draw();
      return;
    }

    if (power.id === "cheetahSpeed") {
      const boss = currentBossPosition(target);
      state.heroX = clamp(boss.x - 245, 120, 1080);
      state.heroY = clamp(boss.y + 18, 270, 470);
    }

    damageBoss(target, power.damage);
    checkPowerRewards();
    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `${power.name} finished the fight for ${heartText(power.damage)}. ${levelWinText()}`;
      if (advanceAfterWin()) {
        return;
      }
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }

    if (isBossInTrunk(target)) {
      els.statusText.textContent = `${power.name} hit for ${heartText(power.damage)} while Giant Punch stunned ${currentBossName(target)}.`;
      updateHud();
      draw();
      return;
    }

    if (isBossPowerSilenced(target)) {
      els.statusText.textContent = `${power.name} hit for ${heartText(power.damage)} while Wing Gust is blocking ${currentBossName(target)}'s powers.`;
      updateHud();
      draw();
      return;
    }

    const laneDodged = canLaneDodge(target) && Date.now() < state.laneDodgeUntil && dodgeBeatsLane(state.laneDodgeDirection, state.projectileLane);
    const dodged = Date.now() < state.hiddenUntil || Date.now() < state.jumpingUntil || laneDodged;
    applyBossPower(target, false, dodged);
    const bossAction = state.action;
    const bossDamage = bossDamageForAction(bossAction);
    const takenDamage = dodged ? 0 : takeHeroDamage(bossDamage);
    if (state.heroHp === 0) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = "The world bosses won this round. Reset for a rematch.";
      setAttacks(true);
      updateHud();
      draw();
      return;
    }
    state.action = power.id;
    els.statusText.textContent = `${power.name} hit ${currentBossName(target)} for ${heartText(power.damage)}. ${bossCounterText(target, false, dodged, laneDodged, bossAction, takenDamage)}`;
    updateHud();
    draw();
  }

  function isCloseEnoughToCheetahDash(target) {
    const boss = currentBossPosition(target);
    const dx = Math.abs(state.heroX - boss.x);
    const dy = Math.abs(state.heroY - boss.y);
    return dx <= 430 && dy <= 190;
  }

  function fennecPowerAttack(target, powerSlot = 0) {
    const power = pickPower(fennecPowers, "fennecPowerStep", powerSlot);
    state.playerAction = "power";
    state.playerTarget = target;
    state.action = power.id;
    updatePowerButton();

    const closeEnough = state.fennecPounceTarget === target || isPowerCloseEnough(power.id, target);
    if (!closeEnough) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for ${power.name}. Move close with Freddy, then use it!`;
      draw();
      return;
    }

    if (power.id === "fennecLove") {
      state.fennecLoveUntil = Date.now() + 10000;
      state.fennecLoveTarget = target;
    }
    if (power.id === "fennecPounce") {
      state.fennecPounceTarget = target;
      const boss = currentBossPosition(target);
      state.heroX = clamp(boss.x - 18, 120, 1080);
      state.heroY = clamp(boss.y - 128, 270, 470);
    }

    const damage = power.damage;
    damageBoss(target, damage);
    checkPowerRewards();
    updateBossTargetChoices();
    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `${power.name} finished the fight. ${levelWinText()}`;
      if (advanceAfterWin()) {
        return;
      }
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }

    if (power.id === "fennecLove") {
      els.statusText.textContent = `Multiplication! Freddy made extra Freddys that surrounded ${currentBossName(target)} for 10 seconds and took away ${heartText(damage)}.`;
      updateHud();
      draw();
      return;
    }
    if (power.id === "fennecSneakBite") {
      els.statusText.textContent = `Turn Into Any Animal! Freddy changed forms and surprised ${currentBossName(target)} for ${heartText(damage)}.`;
      updateHud();
      draw();
      return;
    }
    els.statusText.textContent = `Sneak Trick! Freddy sneaked onto the boss's head. Now any attack can hit for a short time.`;
    updateHud();
    draw();
  }

  function isBossInFennecLove(target) {
    return state.fennecLoveTarget === target && Date.now() < state.fennecLoveUntil;
  }

  function polarPowerAttack(target, powerSlot = 0) {
    const power = pickPower(polarPowers, "polarPowerStep", powerSlot);
    state.playerAction = "power";
    state.playerTarget = target;
    state.action = power.id;
    updatePowerButton();

    if (!isPowerCloseEnough(power.id, target)) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for ${power.name}. Move close with Benji, then use it!`;
      draw();
      return;
    }

    if (power.id === "polarIceTornado") {
      state.iceTornadoUntil = Date.now() + 10000;
      state.iceTornadoTarget = target;
    }

    damageBoss(target, power.damage);
    checkPowerRewards();
    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `${power.name} finished the fight for ${heartText(power.damage)}. ${levelWinText()}`;
      if (advanceAfterWin()) {
        return;
      }
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }

    if (isBossInTrunk(target)) {
      els.statusText.textContent = `${power.name} hit for ${heartText(power.damage)} while Giant Punch stunned ${currentBossName(target)}.`;
      updateHud();
      draw();
      return;
    }

    if (isBossPowerSilenced(target)) {
      els.statusText.textContent = `${power.name} hit for ${heartText(power.damage)} while Wing Gust is blocking ${currentBossName(target)}'s powers.`;
      updateHud();
      draw();
      return;
    }

    if (isBossInIceTornado(target)) {
      els.statusText.textContent = `${power.name} hit for ${heartText(power.damage)}. Ice Shield blocks ${currentBossName(target)} for 10 seconds!`;
      updateHud();
      draw();
      return;
    }

    const laneDodged = canLaneDodge(target) && Date.now() < state.laneDodgeUntil && dodgeBeatsLane(state.laneDodgeDirection, state.projectileLane);
    const dodged = Date.now() < state.hiddenUntil || Date.now() < state.jumpingUntil || laneDodged;
    applyBossPower(target, false, dodged);
    const bossAction = state.action;
    const bossDamage = bossDamageForAction(bossAction);
    const takenDamage = dodged ? 0 : takeHeroDamage(bossDamage);
    if (state.heroHp === 0) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = "The world bosses won this round. Reset for a rematch.";
      setAttacks(true);
      updateHud();
      draw();
      return;
    }
    state.action = power.id;
    els.statusText.textContent = `${power.name} hit ${currentBossName(target)} for ${heartText(power.damage)}. ${bossCounterText(target, false, dodged, laneDodged, bossAction, takenDamage)}`;
    updateHud();
    draw();
  }

  function isBossInIceTornado(target) {
    return state.iceTornadoTarget === target && Date.now() < state.iceTornadoUntil;
  }

  function monkeyPowerAttack(target, powerSlot = 0) {
    const power = pickPower(monkeyPowers, "monkeyPowerStep", powerSlot);
    state.playerAction = "power";
    state.playerTarget = target;
    state.action = power.id;
    updatePowerButton();

    if (!isPowerCloseEnough(power.id, target)) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for ${power.name}. Move close with Mr. 67, then use the power!`;
      draw();
      return;
    }

    if (power.id === "bananaSlip") {
      state.bananaSlipUntil = Date.now() + 6000;
      state.bananaSlipTarget = target;
    }

    damageBoss(target, power.damage);
    checkPowerRewards();
    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `${power.name} finished the fight for ${heartText(power.damage)}. ${levelWinText()}`;
      if (advanceAfterWin()) {
        return;
      }
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }

    if (isBossInTrunk(target)) {
      els.statusText.textContent = `${power.name} hit for ${heartText(power.damage)} while Giant Punch stunned ${currentBossName(target)}.`;
      updateHud();
      draw();
      return;
    }

    if (isBossPowerSilenced(target)) {
      els.statusText.textContent = `${power.name} hit for ${heartText(power.damage)} while Wing Gust is blocking ${currentBossName(target)}'s powers.`;
      updateHud();
      draw();
      return;
    }

    if (isBossInIceTornado(target)) {
      els.statusText.textContent = `${power.name} hit for ${heartText(power.damage)} while Ice Shield is blocking ${currentBossName(target)}.`;
      updateHud();
      draw();
      return;
    }

    if (isBossSlippingOnBanana(target)) {
      els.statusText.textContent = `${power.name} hit for ${heartText(power.damage)}. ${currentBossName(target)} got dizzy from Poison Storm and cannot hit back for a few seconds!`;
      updateHud();
      draw();
      return;
    }

    const laneDodged = canLaneDodge(target) && Date.now() < state.laneDodgeUntil && dodgeBeatsLane(state.laneDodgeDirection, state.projectileLane);
    const dodged = Date.now() < state.hiddenUntil || Date.now() < state.jumpingUntil || laneDodged;
    applyBossPower(target, false, dodged);
    const bossAction = state.action;
    const bossDamage = bossDamageForAction(bossAction);
    const takenDamage = dodged ? 0 : takeHeroDamage(bossDamage);
    if (state.heroHp === 0) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = "The world bosses won this round. Reset for a rematch.";
      setAttacks(true);
      updateHud();
      draw();
      return;
    }
    state.action = power.id;
    els.statusText.textContent = `${power.name} hit ${currentBossName(target)} for ${heartText(power.damage)}. ${bossCounterText(target, false, dodged, laneDodged, bossAction, takenDamage)}`;
    updateHud();
    draw();
  }

  function isBossSlippingOnBanana(target) {
    return state.bananaSlipTarget === target && Date.now() < state.bananaSlipUntil;
  }

  function mayerPowerAttack(target, powerSlot = 0) {
    const power = pickPower(mayerPowers, "mayerPowerStep", powerSlot);
    state.playerAction = "power";
    state.playerTarget = target;
    state.action = power.id;
    updatePowerButton();

    if (!isPowerCloseEnough(power.id, target)) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for ${power.name}. Move close, then use it!`;
      draw();
      return;
    }

    if (power.id === "mayerFlyUp") {
      state.jumpingUntil = Date.now() + 1000;
      state.heroY = clamp(state.heroY - 48, 270, 470);
    }
    if (power.id === "mayerBigBock") {
      state.mayerBockUntil = Date.now() + 4500;
      state.mayerBockTarget = target;
    }

    damageBoss(target, power.damage);
    checkPowerRewards();
    updateBossTargetChoices();
    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `${power.name} finished the fight. ${levelWinText()}`;
      if (advanceAfterWin()) return;
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }
    if (power.id === "mayerBigBock" || power.id === "mayerFlyUp") {
      els.statusText.textContent = power.id === "mayerBigBock"
        ? `Flying Boots! Mischievous Mayer launches a fast hit and ${currentBossName(target)} loses ${heartText(power.damage)}.`
        : "Mayor Bots! Mischievous Mayer called a quick bot shield.";
      updateHud();
      draw();
      return;
    }
    finishAnimalPowerCounter(target, power);
  }

  function yonatanPowerAttack(target, powerSlot = 0) {
    const power = pickPower(yonatanPowers, "yonatanPowerStep", powerSlot);
    state.playerAction = "power";
    state.playerTarget = target;
    state.action = power.id;
    updatePowerButton();

    if (!isPowerCloseEnough(power.id, target)) {
      state.action = "miss";
      els.statusText.textContent = `${currentBossName(target)} is too far away for ${power.name}. Move close, then use it!`;
      draw();
      return;
    }

    if (power.id === "yonatanChomper") {
      state.yonatanChomperUntil = Date.now() + 4500;
      state.yonatanChomperTarget = target;
    }

    damageBoss(target, power.damage);
    checkPowerRewards();
    updateBossTargetChoices();
    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `${power.name} finished the fight. ${levelWinText()}`;
      if (advanceAfterWin()) return;
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }
    if (power.id === "yonatanChomper") {
      els.statusText.textContent = `Yap Blast! Half the floor fell and ${currentBossName(target)} lost ${heartText(power.damage)}.`;
      updateHud();
      draw();
      return;
    }
    finishAnimalPowerCounter(target, power);
  }

  function finishAnimalPowerCounter(target, power) {
    if (isBossInTrunk(target) || isBossPowerSilenced(target) || isBossInIceTornado(target) || isBossSlippingOnBanana(target) || isBossInFennecLove(target) || isBossBocked(target) || isBossChomped(target)) {
      els.statusText.textContent = `${power.name} hit ${currentBossName(target)} for ${heartText(power.damage)}. They cannot hit back yet!`;
      updateHud();
      draw();
      return;
    }
    const laneDodged = canLaneDodge(target) && Date.now() < state.laneDodgeUntil && dodgeBeatsLane(state.laneDodgeDirection, state.projectileLane);
    const dodged = Date.now() < state.hiddenUntil || Date.now() < state.jumpingUntil || laneDodged;
    applyBossPower(target, false, dodged);
    const bossAction = state.action;
    const bossDamage = bossDamageForAction(bossAction);
    const takenDamage = dodged ? 0 : takeHeroDamage(bossDamage);
    if (state.heroHp === 0) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = "The world bosses won this round. Reset for a rematch.";
      setAttacks(true);
      updateHud();
      draw();
      return;
    }
    state.action = power.id;
    els.statusText.textContent = `${power.name} hit ${currentBossName(target)} for ${heartText(power.damage)}. ${bossCounterText(target, false, dodged, laneDodged, bossAction, takenDamage)}`;
    updateHud();
    draw();
  }

  function isBossBocked(target) {
    return state.mayerBockTarget === target && Date.now() < state.mayerBockUntil;
  }

  function isBossChomped(target) {
    return state.yonatanChomperTarget === target && Date.now() < state.yonatanChomperUntil;
  }

  function useDefenseMove(kind) {
    const now = Date.now();
    state.playerAction = kind;
    if (kind === "jump") {
      state.jumpingUntil = now + 1400;
      state.heroY = clamp(state.heroY - 42, 270, 470);
      state.action = "heroJump";
      els.statusText.textContent = "Jump! The next boss hit can miss while you are in the air.";
    } else {
      state.hiddenUntil = now + 1800;
      state.action = "heroHide";
      els.statusText.textContent = "Hide! The next boss hit can miss while you are hidden.";
    }
    updateHud();
    draw();
  }

  function damageBoss(target, damage) {
    if (target === "math") {
      state.mathHp = Math.max(0, state.mathHp - damage);
    } else if (target === "evil") {
      state.evilHp = Math.max(0, state.evilHp - damage);
    } else if (target === "ice") {
      state.iceHp = Math.max(0, state.iceHp - damage);
    } else if (target === "food") {
      state.foodHp = Math.max(0, state.foodHp - damage);
    } else if (target === "crazyBall") {
      state.crazyBallHp = Math.max(0, state.crazyBallHp - damage);
    } else if (target === "airplane") {
      state.airplaneHp = Math.max(0, state.airplaneHp - damage);
    } else if (target === "pusher") {
      state.pusherHp = Math.max(0, state.pusherHp - damage);
    } else if (target === "whacker") {
      state.whackerHp = Math.max(0, state.whackerHp - damage);
    } else if (target === "archer") {
      state.archerHp = Math.max(0, state.archerHp - damage);
    } else if (target === "librarian") {
      state.librarianHp = Math.max(0, state.librarianHp - damage);
    } else if (target === "bus") {
      state.busHp = Math.max(0, state.busHp - damage);
    } else if (target === "principal") {
      state.principalHp = Math.max(0, state.principalHp - damage);
    }
    maybeDropPrize(target, damage);
  }

  function maybeDropPrize(target, damage) {
    if (state.level < 16 || damage <= 0 || state.prizeDrops.length >= 3 || Math.random() > prizeDropChance()) {
      return;
    }
    const boss = currentBossPosition(target);
    const types = ["donut", "bow", "armor", "shield"];
    const type = types[(state.nextDropId + state.level) % types.length];
    state.prizeDrops.push({
      id: state.nextDropId,
      type,
      x: clamp(boss.x - 160 - state.prizeDrops.length * 46, 180, 1020),
      y: clamp(boss.y + 70 + (state.prizeDrops.length % 2) * 34, 285, 470)
    });
    state.nextDropId += 1;
  }

  function prizeDropChance() {
    if (state.level >= 25) return 0.75;
    if (state.level >= 20) return 0.58;
    return 0.42;
  }

  function collectNearbyPrizes() {
    const collected = [];
    state.prizeDrops = state.prizeDrops.filter((drop) => {
      const near = Math.abs(state.heroX - drop.x) <= 80 && Math.abs(state.heroY - drop.y) <= 80;
      if (near) collected.push(drop);
      return !near;
    });
    if (!collected.length) return "";
    return collected.map(applyPrize).join(" ");
  }

  function applyPrize(drop) {
    if (drop.type === "donut") {
      state.heroHp = Math.min(HEARTS_PER_FIGHTER, state.heroHp + 3);
      return "Magical Donut healed 3 hearts.";
    }
    if (drop.type === "bow") {
      state.bowShots += 3;
      return "Big bow and arrow earned: your next 3 attacks are stronger.";
    }
    if (drop.type === "armor") {
      state.armorBlocks += 2;
      return "Iron armor earned: it blocks the next 2 hits.";
    }
    state.armorBlocks += 4;
    return "Giant shield earned: it blocks the next 4 hits.";
  }

  function palaceChargeUps() {
    if (!isPalaceChargeLevel()) return [];
    const egypt = isEgyptianPalaceLevel();
    return [
      { id: `charge-heart-${state.level}`, type: "heart", x: 315, y: 420, label: egypt ? "Ankh Heart" : "Ruby Heart", color: "#d91f2e" },
      { id: `charge-power-${state.level}`, type: "power", x: 575, y: 340, label: egypt ? "Scarab Power" : "Palace Power", color: "#ffd84a" },
      { id: `charge-shield-${state.level}`, type: "shield", x: 800, y: 440, label: egypt ? "Pyramid Shield" : "Golden Shield", color: "#45a6db" },
      { id: `charge-speed-${state.level}`, type: "speed", x: 1010, y: 360, label: egypt ? "Pharaoh Boost" : "Royal Boost", color: "#18a66a" }
    ];
  }

  function collectNearbyPalaceChargeUps() {
    if (!isPalaceChargeLevel()) return "";
    const collected = [];
    palaceChargeUps().forEach((charge) => {
      if (state.palaceChargesCollected.has(charge.id)) return;
      const near = Math.abs(state.heroX - charge.x) <= 70 && Math.abs(state.heroY - charge.y) <= 74;
      if (!near) return;
      state.palaceChargesCollected.add(charge.id);
      collected.push(applyPalaceCharge(charge));
    });
    return collected.join(" ");
  }

  function applyPalaceCharge(charge) {
    if (charge.type === "heart") {
      state.heroHp = Math.min(currentHeroMaxHp(), state.heroHp + (isEgyptianPalaceLevel() ? 5 : 4));
      return `${charge.label} healed ${isEgyptianPalaceLevel() ? 5 : 4} hearts.`;
    }
    if (charge.type === "power") {
      state.specialPowerCharges += 1;
      state.bowShots += 3;
      return `${charge.label} gave you a special power charge and 3 stronger attacks.`;
    }
    if (charge.type === "shield") {
      state.timedShieldUntil = Date.now() + 60000;
      state.armorBlocks += 3;
      return `${charge.label} protects you for 1 minute.`;
    }
    state.specialPowerCharges += 1;
    state.heroHp = Math.min(currentHeroMaxHp(), state.heroHp + 4);
    return `${charge.label} gave a special power charge and 4 hearts.`;
  }

  function heroAttackDamage(baseDamage) {
    if (state.specialPowerCharges > 0) {
      state.specialPowerCharges -= 1;
      return baseDamage + 4;
    }
    if (state.bowShots <= 0) return baseDamage;
    state.bowShots -= 1;
    return baseDamage + 2;
  }

  function takeHeroDamage(amount) {
    if (amount <= 0) return 0;
    if (Date.now() < state.timedShieldUntil) {
      state.lastDefenseText = "Your 1-minute shield protected you, so you lost no hearts.";
      return 0;
    }
    if (state.armorBlocks > 0) {
      state.armorBlocks -= 1;
      state.lastDefenseText = "Your armor or giant shield blocked it, so you lost no hearts.";
      return 0;
    }
    state.heroHp = Math.max(0, state.heroHp - amount);
    return amount;
  }

  function applyBossPower(target, blocked, avoided = false) {
    if (isBossPowerSilenced(target)) {
      state.action = "parrotScream";
      return;
    }
    if (isBossInIceTornado(target)) {
      state.action = "polarIceTornado";
      return;
    }
    if (isBossSlippingOnBanana(target)) {
      state.action = "bananaSlip";
      return;
    }
    if (isBossInFennecLove(target)) {
      state.action = "fennecLove";
      return;
    }
    if (isBossBocked(target)) {
      state.action = "mayerBigBock";
      return;
    }
    if (isBossChomped(target)) {
      state.action = "yonatanChomper";
      return;
    }
    if (blocked) {
      return;
    }
    if (isChinaShootLevel()) {
      state.action = state.level === 13 ? "madeInChinaBlock" : "chineseChickenShot";
      if (!avoided) {
        state.heroX = clamp(state.heroX - 38, 120, 560);
        if (state.action === "chineseChickenShot") {
          state.heroY = clamp(state.heroY + 18, 270, 470);
        }
      }
      return;
    }
    if (target === "math") {
      if (!avoided) state.trappedUntil = Date.now() + 5000;
      state.action = "numberNet";
    } else if (target === "evil") {
      if (!avoided) {
        state.knockedDownUntil = Date.now() + 1200;
        state.heroY = clamp(state.heroY + 38, 270, 470);
      }
      state.action = "letterShot";
    } else if (target === "ice") {
      if (!avoided) {
        state.trappedUntil = Date.now() + 2200;
        state.heroX = clamp(state.heroX - 34, 120, 560);
      }
      state.action = "iceBossFreeze";
    } else if (target === "food") {
      if (!avoided) state.heroY = clamp(state.heroY + 28, 270, 470);
      state.action = "garbageShot";
    } else if (target === "crazyBall") {
      const hit = Math.random() < 0.65;
      state.action = hit ? "ballRollHit" : "ballRollMiss";
      if (hit && !avoided) {
        state.heroX = clamp(state.heroX - 45, 120, 560);
      }
    } else if (target === "airplane") {
      if (!avoided) state.heroY = clamp(state.heroY + 24, 270, 470);
      state.action = "airplaneAttack";
    } else if (target === "pusher") {
      if (!avoided) state.heroX = clamp(state.heroX - 62, 120, 560);
      state.action = "paperPush";
    } else if (target === "whacker") {
      if (!avoided) {
        state.heroX = clamp(state.heroX - 28, 120, 560);
        state.heroY = clamp(state.heroY + 18, 270, 470);
      }
      state.action = "wingWhack";
    } else if (target === "archer") {
      if (!avoided) state.heroY = clamp(state.heroY + 18, 270, 470);
      state.action = "paintbrushArrow";
    } else if (target === "librarian") {
      if (!avoided) state.heroX = clamp(state.heroX - 35, 120, 560);
      state.action = "bookLaunch";
    } else if (target === "bus") {
      if (!avoided) state.trappedUntil = Date.now() + 1800;
      state.action = "busStop";
    } else if (target === "principal") {
      const action = bossLevels[state.level].action;
      state.action = action;
      if (avoided) {
        return;
      }
      if (action === "principalMultiply") {
        state.heroX = clamp(state.heroX - 30, 120, 560);
      } else if (action === "principalGiant") {
        state.heroY = clamp(state.heroY + 34, 270, 470);
      } else if (action === "principalFar") {
        state.heroX = clamp(state.heroX - 50, 120, 560);
      } else if (action === "principalLaser") {
        state.knockedDownUntil = Date.now() + 1400;
        state.heroY = clamp(state.heroY + 30, 270, 470);
      } else if (action === "principalSpin") {
        state.heroX = clamp(state.heroX - 24, 120, 560);
        state.heroY = clamp(state.heroY + 24, 270, 470);
      }
    }
  }

  function attackName(kind) {
    if (kind === "power") return currentPowerName();
    return kind === "kick" ? "Kick" : "Punch";
  }

  function heartText(amount) {
    if (amount === 0.5) return "half a heart";
    if (amount === 1.5) return "one and a half hearts";
    return `${amount} ${amount === 1 ? "heart" : "hearts"}`;
  }

  function bossCounterText(target, blocked, dodged, laneDodged, bossAction, bossDamage) {
    if (blocked) {
      return "Homework Shield blocked the boss counterattack.";
    }
    if (dodged) {
      if (laneDodged) {
        return `${bossAttackText(target, bossAction)} It aimed ${laneName(state.projectileLane)}. Your ${state.laneDodgeDirection} dodge made it miss and explode on the wall.`;
      }
      return `${bossAttackText(target, bossAction)} Your jump or hide made it miss, so you lost no hearts.`;
    }
    if (state.lastDefenseText) {
      return `${bossPowerText(target, false, bossAction)} ${state.lastDefenseText}`;
    }
    if (bossDamage === 0) {
      return bossPowerText(target, false, bossAction);
    }
    return `${bossPowerText(target, false, bossAction)} You lost ${heartText(bossDamage)}.`;
  }

  function bossDamageForAction(bossAction) {
    if (bossAction === "ballRollMiss" || bossAction === "principalWarning") {
      return 0;
    }
    if (state.level >= 30) {
      return 1.5;
    }
    if (state.level >= 21) {
      return 1;
    }
    if (state.level >= 11) {
      return 0.75;
    }
    return 0.5;
  }

  function canLaneDodge(target) {
    return target === "archer" || target === "librarian";
  }

  function mustReachBossForPower(target) {
    return target === "archer" || target === "librarian";
  }

  function bossAttackText(target, bossAction = state.action) {
    if (bossAction === "madeInChinaBlock") return `${currentBossName(target)} shot blocks that say MADE IN CHINA.`;
    if (bossAction === "chineseChickenShot") return `${currentBossName(target)} shot flying pieces of Chinese chicken.`;
    if (target === "math") return "Mischievous Mayer rushed in with a mischief strike.";
    if (target === "evil") return "Yapping Yonatan blasted a huge yap attack.";
    if (target === "ice") return "Ice Boss stomped and sent freezing blue ice at you.";
    if (target === "food") return "Food Monster Fiasco shot garbage.";
    if (target === "airplane") return "Airplane Attacker flew high, bent its wings, and dove down.";
    if (target === "pusher") return "Paper Pusher rushed forward.";
    if (target === "whacker") return "Wing Whacker bent its wings and swung hard.";
    if (target === "archer") return "Art Archer shot paintbrush arrows.";
    if (target === "librarian") return "Librarian Launcher launched books.";
    if (target === "bus") return "Field Trip Terror flashed its stop sign.";
    if (target === "principal") {
      if (bossAction === "principalWarning") return "Robot Principal stomped around the tree fort.";
      if (bossAction === "principalMultiply") return "Robot Principal tried to multiply.";
      if (bossAction === "principalGiant") return "Robot Principal tried to turn giant.";
      if (bossAction === "principalFar") return "Robot Principal fired from farther away.";
      if (bossAction === "principalSpin") return "Robot Principal tried a spin attack.";
      return "Robot Principal fired a principal laser.";
    }
    return bossAction === "ballRollHit" ? "The Crazy Ball rolled toward you." : "The Crazy Ball rolled by.";
  }

  function bossPowerText(target, blocked, bossAction = state.action) {
    if (blocked) {
      return "Homework Shield blocked the boss power!";
    }
    if (bossAction === "madeInChinaBlock") {
      return `${currentBossName(target)} used Made in China Block Shot!`;
    }
    if (bossAction === "chineseChickenShot") {
      return `${currentBossName(target)} used Chinese Chicken Shot!`;
    }
    if (target === "math") {
      return "Mischievous Mayer used Mischief Trap and caught you for 5 seconds!";
    }
    if (target === "evil") {
      return "Yapping Yonatan used Yap Blast and knocked you down!";
    }
    if (target === "ice") {
      return "Ice Boss used Freeze Stomp and froze the ground under you!";
    }
    if (target === "food") {
      return "Food Monster Fiasco shot garbage and took away half a heart!";
    }
    if (target === "airplane") {
      return "Airplane Attacker flew high, bent its wings, and attacked from the air!";
    }
    if (target === "pusher") {
      return "Paper Pusher shoved you backward and took half a heart!";
    }
    if (target === "whacker") {
      return "Wing Whacker bent its wings and whacked you!";
    }
    if (target === "archer") {
      return "Art Archer shot paintbrush arrows at you!";
    }
    if (target === "librarian") {
      return "Librarian Launcher launched books at you!";
    }
    if (target === "bus") {
      return "Field Trip Terror drove around you and stopped you with its stop sign!";
    }
    if (target === "principal") {
      if (bossAction === "principalWarning") return "Robot Principal stomped around the tree fort. No big power yet!";
      if (bossAction === "principalMultiply") return "Robot Principal multiplied into extra copies!";
      if (bossAction === "principalGiant") return "Robot Principal turned giant!";
      if (bossAction === "principalFar") return "Robot Principal attacked from farther away!";
      if (bossAction === "principalSpin") return "Robot Principal spun around the tree fort!";
      return "Robot Principal fired a principal laser from the tree fort!";
    }
    return bossAction === "ballRollHit" ? "The Crazy Ball rolled on top of you and attacked!" : "The Crazy Ball rolled by and missed!";
  }

  function bossHpFor(target) {
    if (target === "evil") return state.evilHp;
    if (target === "ice") return state.iceHp;
    return state.mathHp;
  }

  function currentTarget() {
    if (state.chosenBossTarget === "evil") return "evil";
    if (state.chosenBossTarget === "ice") return "ice";
    return "math";
  }

  function currentBossHp() {
    if (isWhiteHouseProtectLevel()) return state.protectPresidentHp;
    return bossHpFor(currentTarget());
  }

  function currentBossMaxHp() {
    if (isWhiteHouseProtectLevel()) return 5;
    return HEARTS_PER_FIGHTER;
  }

  function levelWinText() {
    if (isWhiteHouseProtectLevel()) return `You protected President Trump in Level ${state.level}!`;
    return `You beat ${currentBossName()} in Level ${state.level}!`;
  }

  function currentBossName(target = currentTarget()) {
    if (isWhiteHouseProtectLevel()) return "President Trump";
    if (target === "math" || target === "evil" || target === "ice") return selectedBossName(target);
    if (target === "food") return "Food Monster Fiasco";
    if (target === "crazyBall") return "The Crazy Ball";
    if (target === "principal") return bossLevels[state.level].name;
    return "World Boss";
  }

  function selectedBossName(target = currentTarget()) {
    if (target === "evil") return "Yapping Yonatan";
    if (target === "ice") return "Ice Boss";
    return "Mischievous Mayer";
  }

  function preStartLevelText() {
    const boss = selectedBossName();
    const base = `You are fighting ${boss} in Level ${state.level}.`;
    return `${base} ${specialWorldText() || "Regular fight: move close enough for punches and kicks, use powers, and beat the boss."} Press Start Level ${state.level} when ready.`;
  }

  function specialWorldText() {
    if (isStatueMazeLevel()) {
      return "Special world: Statue of Liberty maze. Your character is a face in the maze, and the boss chases from behind. Use arrows to reach EXIT at the head.";
    }
    if (isAntarcticaTreasureLevel()) {
      return "Special world: Penguin Treasure hunt. Run across 3 icy screens, dodge icy shots, use powers to push the boss back, then open the treasure chest.";
    }
    if (isPhoenixScavengerLevel()) {
      return state.level === 9
        ? "Special world: Phoenix scavenger hunt. Find 2 desert treasures hidden around the sand."
        : "Special world: Phoenix scavenger hunt. Find 3 treasures; the last treasure is behind the boss.";
    }
    if (isCanadaTreasureMapLevel()) {
      return state.level === 15
        ? "Special world: Canada treasure map. Beat clue guards to earn the first half of the map."
        : "Special world: Canada treasure map. Finish the map, find the X, beat the boss, and dig up the Canada star treasure.";
    }
    if (isWhiteHouseProtectLevel()) {
      return `Special world: White House protection. Protect President Trump from dangers while ${boss} causes trouble.`;
    }
    if (isIsraelWallFightLevel()) {
      return "Special world: Israel wall fight. Run through wall openings to escape, attack the villain, or finish with more hearts when time runs out.";
    }
    if (isIranPalaceLevel()) {
      return "Special world: Iran palace. Grab charge-ups around the palace while you fight.";
    }
    if (isEgyptianPalaceLevel()) {
      return "Special world: Egyptian palace. Grab Egyptian charge-ups while you fight through the final palace levels.";
    }
    if (isAfricaSavannaPowerLevel()) {
      return "Special world: Africa Savanna. Your heroes look normal but temporarily get their animal powers back.";
    }
    if (isChinaShootLevel()) {
      return "Special world: China shooting level. The villain mostly attacks by shooting Made in China blocks or Chinese chicken pieces.";
    }
    return "";
  }

  function currentBossPosition(target = currentTarget()) {
    if (isWhiteHouseProtectLevel()) return presidentPosition();
    if (isIsraelWallFightLevel()) return { x: state.israelVillainX, y: state.israelVillainY };
    if (isStatueMazeLevel()) return { x: state.mazeBossX, y: state.mazeBossY };
    if (isAntarcticaTreasureLevel()) return { x: state.treasureBossX, y: state.treasureBossY };
    if (isPhoenixScavengerLevel()) return { x: 955, y: 410 };
    if (target === "math") return { x: 940, y: 355 };
    if (target === "evil") return { x: 990, y: 410 };
    if (target === "ice") return { x: 965, y: 390 };
    if (target === "food") return { x: 950, y: 390 };
    if (target === "crazyBall") return { x: 950, y: 390 };
    return { x: 950, y: 380 };
  }

  function isCloseEnoughToAttack(kind, target) {
    const boss = currentBossPosition(target);
    const dx = Math.abs(state.heroX - boss.x);
    const dy = Math.abs(state.heroY - boss.y);
    if (state.heroId === "freddy" && state.fennecPounceTarget === target) return true;
    const range = kind === "kick" ? 270 : 230;
    return dx <= range && dy <= 180;
  }

  function usePowerDamage() {
    if (state.earnedPowers.has("poetryBlast")) {
      state.earnedPowers.delete("poetryBlast");
      renderPowers();
      return 4;
    }
    const heroPowerDamage = {
      tats: 3,
      fary: 2,
      apple: 3,
      freddy: 2,
      benji: 2,
      frost: 2,
      ness: 3,
      crayon: 3,
      hoodie: 2,
      mayer: 3,
      yonatan: 2
    };
    return heroPowerDamage[state.heroId] || 2;
  }

  function checkPowerRewards() {
    if (!state.mathRewarded && state.mathHp === 0) {
      state.mathRewarded = true;
      state.earnedPowers.add("homeworkShield");
      els.statusText.textContent = "Power-up earned: Homework Shield from Mischievous Mayer!";
      renderPowers();
    }
    if (!state.evilRewarded && state.evilHp === 0) {
      state.evilRewarded = true;
      state.earnedPowers.add("poetryBlast");
      els.statusText.textContent = "Power-up earned: Poetry Blast from Yapping Yonatan!";
      renderPowers();
    }
    if (!state.iceRewarded && state.iceHp === 0) {
      state.iceRewarded = true;
      state.earnedPowers.add("homeworkShield");
      els.statusText.textContent = "Power-up earned: Ice Shield from Ice Boss!";
      renderPowers();
    }
  }

  function chooseHero(id) {
    state.heroId = id;
    state.heroHp = heroes[id].hp;
    document.querySelectorAll(".hero-choice").forEach((button) => {
      button.classList.toggle("selected", button.dataset.hero === id);
    });
    els.statusText.textContent = `${heroes[id].name} is ready. ${preStartLevelText()}`;
    updatePowerButton();
    updateHud();
    draw();
  }

  function chooseLevel(level) {
    const requestedLevel = Number(level);
    if (!canPlayLevel(requestedLevel)) {
      els.statusText.textContent = `Level ${requestedLevel} is locked. Beat Level ${requestedLevel - 1} first.`;
      updateLevelLocks();
      return;
    }
    state.level = requestedLevel;
    document.querySelectorAll(".level-choice").forEach((button) => {
      button.classList.toggle("selected", Number(button.dataset.level) === state.level);
    });
    els.startButton.textContent = `Start Level ${state.level}`;
    resetGame();
  }

  function chooseBossTarget(target) {
    if (state.started && !state.won && !state.lost) {
      els.statusText.textContent = "Finish this fight or press Reset before choosing a different boss.";
      return;
    }
    const hp = bossHpFor(target);
    if (hp <= 0) {
      els.statusText.textContent = `${currentBossName(target)} is already defeated. Pick a different boss.`;
      updateBossTargetChoices();
      return;
    }
    state.chosenBossTarget = target;
    state.playerTarget = target;
    els.statusText.textContent = preStartLevelText();
    updateBossTargetChoices();
    updateHud();
    draw();
  }

  function updateBossTargetChoices() {
    const targetSelects = document.querySelectorAll(".boss-target-select");
    if (!targetSelects.length) return;
    const showPicker = !state.started || state.won || state.lost;
    targetSelects.forEach((targetSelect) => {
      targetSelect.classList.toggle("hidden", !showPicker);
      targetSelect.querySelectorAll(".target-choice").forEach((button) => {
        const target = button.dataset.target;
        const hp = bossHpFor(target);
        const defeated = hp <= 0 && state.started;
        button.disabled = !showPicker || defeated;
        button.classList.toggle("defeated", defeated);
        button.classList.toggle("selected", target === state.chosenBossTarget && showPicker);
        if (target === "math") button.textContent = "Choose Mischievous Mayer";
        else if (target === "evil") button.textContent = "Choose Yapping Yonatan";
        else button.textContent = "Choose Ice Boss";
      });
    });
  }

  function canPlayLevel(level) {
    return level <= progress.unlockedLevel;
  }

  function unlockNextLevel() {
    if (state.level < 30 && progress.unlockedLevel < state.level + 1) {
      progress.unlockedLevel = state.level + 1;
      localStorage.setItem("bbb4UnlockedLevel", String(progress.unlockedLevel));
      els.statusText.textContent = `${levelWinText()} Level ${progress.unlockedLevel} unlocked!`;
    }
  }

  function advanceAfterWin() {
    clearLevelTimer();
    if (state.level >= 30) {
      return false;
    }
    const completedText = levelWinText();
    const nextLevel = state.level + 1;
    unlockNextLevel();
    state.level = nextLevel;
    document.querySelectorAll(".level-choice").forEach((button) => {
      button.classList.toggle("selected", Number(button.dataset.level) === state.level);
    });
    els.startButton.textContent = `Start Level ${state.level}`;
    resetGame();
    els.statusText.textContent = `${completedText} Level ${state.level} unlocked! Press Start Level ${state.level}.`;
    updateHud();
    updateLevelLocks();
    draw();
    return true;
  }

  function updateLevelLocks() {
    document.querySelectorAll(".level-choice").forEach((button) => {
      const level = Number(button.dataset.level);
      const locked = !canPlayLevel(level);
      button.disabled = locked;
      button.classList.toggle("locked", locked);
      button.classList.toggle("selected", level === state.level);
      const baseLabel = button.dataset.label || button.textContent.replace(" Locked", "");
      button.dataset.label = baseLabel;
      button.textContent = locked ? `${baseLabel} Locked` : baseLabel;
    });
    els.startButton.disabled = !canPlayLevel(state.level);
  }

  function levelTimerDuration() {
    return state.level % 2 === 1 ? 120000 : 180000;
  }

  function startLevelTimer() {
    clearLevelTimer();
    state.levelDurationMs = levelTimerDuration();
    state.levelStartedAt = Date.now();
    state.levelTimerInterval = setInterval(tickLevelTimer, 1000);
  }

  function clearLevelTimer() {
    if (state.levelTimerInterval) {
      clearInterval(state.levelTimerInterval);
      state.levelTimerInterval = null;
    }
  }

  function tickLevelTimer() {
    if (!state.started || state.won || state.lost) {
      clearLevelTimer();
      return;
    }
    if (levelRemainingMs() <= 0) {
      if (isWhiteHouseProtectLevel() || isIsraelWallFightLevel()) {
        updateHud();
        draw();
        return;
      }
      loseByTimer();
      return;
    }
    updateHud();
    draw();
  }

  function levelRemainingMs() {
    if (!state.levelStartedAt) return state.levelDurationMs;
    return Math.max(0, state.levelDurationMs - (Date.now() - state.levelStartedAt));
  }

  function levelTimerText() {
    const totalSeconds = Math.ceil(levelRemainingMs() / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function loseByTimer() {
    clearLevelTimer();
    state.lost = true;
    state.action = "lost";
    els.statusText.textContent = `Time ran out in Level ${state.level}. Start again and beat the level before the timer ends.`;
    setAttacks(true);
    updateHud();
    draw();
  }

  function isStatueMazeLevel() {
    return state.level === 3 || state.level === 4;
  }

  function isAntarcticaTreasureLevel() {
    return state.level === 5 || state.level === 6;
  }

  function isPhoenixScavengerLevel() {
    return state.level === 9 || state.level === 10;
  }

  function isChinaShootLevel() {
    return state.level === 13 || state.level === 14;
  }

  function isCanadaTreasureMapLevel() {
    return state.level === 15 || state.level === 16;
  }

  function isAfricaSavannaPowerLevel() {
    return state.level === 17 || state.level === 18;
  }

  function isWhiteHouseProtectLevel() {
    return state.level === 19 || state.level === 20;
  }

  function isPalaceChargeLevel() {
    return isIranPalaceLevel() || isEgyptianPalaceLevel();
  }

  function isIranPalaceLevel() {
    return state.level >= 21 && state.level <= 24;
  }

  function isEgyptianPalaceLevel() {
    return state.level >= 27 && state.level <= 30;
  }

  function isIsraelWallFightLevel() {
    return state.level === 25 || state.level === 26;
  }

  function resetStatueMazePositions() {
    state.heroX = 214;
    state.heroY = 470;
    state.mazeBossX = state.level === 4 ? 150 : 155;
    state.mazeBossY = 470;
  }

  function resetAntarcticaTreasurePositions() {
    state.heroX = 210;
    state.heroY = 410;
    state.treasurePart = 1;
    state.treasureBossX = state.level === 6 ? 95 : 55;
    state.treasureBossY = 410;
    state.treasurePowerX = 320;
  }

  function resetPhoenixScavengerPositions() {
    state.heroX = 210;
    state.heroY = 418;
    state.scavengerFound = new Set();
    state.scavengerBossReady = false;
  }

  function resetCanadaTreasurePositions() {
    state.heroX = 210;
    state.heroY = 418;
    state.scavengerFound = new Set();
    state.scavengerBossReady = false;
    state.canadaHits = {};
  }

  function resetWhiteHouseProtect(startTimer) {
    if (state.protectInterval) {
      clearInterval(state.protectInterval);
      state.protectInterval = null;
    }
    state.protectPresidentHp = 5;
    state.protectDurationMs = state.level === 20 ? 180000 : 120000;
    state.protectStartedAt = startTimer ? Date.now() : 0;
    state.protectHazards = [];
    state.nextHazardId = 1;
    if (isWhiteHouseProtectLevel()) {
      state.heroX = 250;
      state.heroY = 420;
    }
    if (startTimer) {
      spawnProtectHazard();
      state.protectInterval = setInterval(tickWhiteHouseProtect, 1000);
    }
  }

  function resetIsraelWallFight(startTimer) {
    if (state.israelInterval) {
      clearInterval(state.israelInterval);
      state.israelInterval = null;
    }
    state.israelDurationMs = state.level === 26 ? 180000 : 120000;
    state.israelStartedAt = startTimer ? Date.now() : 0;
    state.heroX = isIsraelWallFightLevel() ? 205 : state.heroX;
    state.heroY = isIsraelWallFightLevel() ? 420 : state.heroY;
    state.israelVillainX = state.level === 26 ? 890 : 980;
    state.israelVillainY = 410;
    if (startTimer) {
      state.israelInterval = setInterval(tickIsraelWallFight, 1000);
    }
  }

  function moveHero(direction) {
    state.lastDefenseText = "";
    if (!state.started || state.won || state.lost) {
      return;
    }
    if (isStatueMazeLevel()) {
      moveHeroInStatueMaze(direction);
      return;
    }
    if (isAntarcticaTreasureLevel()) {
      moveHeroInAntarcticaTreasure(direction);
      return;
    }
    if (isPhoenixScavengerLevel()) {
      moveHeroInPhoenixScavenger(direction);
      return;
    }
    if (isCanadaTreasureMapLevel()) {
      moveHeroInCanadaTreasure(direction);
      return;
    }
    if (isWhiteHouseProtectLevel()) {
      moveHeroInWhiteHouseProtect(direction);
      return;
    }
    if (isIsraelWallFightLevel()) {
      moveHeroInIsraelWallFight(direction);
      return;
    }
    if (Date.now() < state.trappedUntil) {
      els.statusText.textContent = "Number Nets caught you. Wait 5 seconds or keep fighting from there!";
      draw();
      return;
    }
    const step = 34;
    if (direction === "left") state.heroX -= step;
    if (direction === "right") state.heroX += step;
    if (direction === "up") state.heroY -= step;
    if (direction === "down") state.heroY += step;
    state.heroX = clamp(state.heroX, 120, 1080);
    state.heroY = clamp(state.heroY, 270, 470);
    state.playerAction = "";
    const prizeText = [collectNearbyPrizes(), collectNearbyPalaceChargeUps()].filter(Boolean).join(" ");
    const target = currentTarget();
    if (handleBossPressureWhileMoving(target, direction)) {
      if (prizeText) els.statusText.textContent = `${els.statusText.textContent} ${prizeText}`;
      updateHud();
      draw();
      return;
    } else if (canLaneDodge(target) && (direction === "up" || direction === "down")) {
      state.laneDodgeUntil = Date.now() + 4500;
      state.laneDodgeDirection = direction;
      state.action = target === "archer" ? "paintbrushDodge" : "bookDodge";
      els.statusText.textContent = `Hero moved ${direction} and has time to dodge the slow ${target === "archer" ? "paintbrushes" : "BO-OK-S books"}. Get close and attack!`;
    } else if (bossPressuresWhileMoving(target) && isCloseEnoughToAttack("kick", target)) {
      state.action = "";
      els.statusText.textContent = `Hero moved ${direction}. You reached ${currentBossName(target)}, so the far-away attacks stopped. Now fight!`;
    } else {
      state.action = "";
      els.statusText.textContent = `Hero moved ${direction}.`;
    }
    if (prizeText) els.statusText.textContent = `${els.statusText.textContent} ${prizeText}`;
    draw();
  }

  function moveHeroInStatueMaze(direction) {
    const step = 34;
    let nextX = state.heroX;
    let nextY = state.heroY;
    if (direction === "left") nextX -= step;
    if (direction === "right") nextX += step;
    if (direction === "up") nextY -= step;
    if (direction === "down") nextY += step;
    nextX = clamp(nextX, 145, 850);
    nextY = clamp(nextY, 120, 505);

    if (isInsideStatuePath(nextX, nextY)) {
      state.heroX = nextX;
      state.heroY = nextY;
      els.statusText.textContent = `You moved ${direction} inside the Statue of Liberty maze. Keep going to EXIT!`;
    } else {
      els.statusText.textContent = "That is a statue wall. Try another arrow through the maze.";
    }

    chaseHeroInStatueMaze();
    state.action = "";
    state.playerAction = "";

    if (reachedStatueExit()) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `You reached EXIT at the Statue of Liberty head. ${levelWinText()}`;
      if (advanceAfterWin()) {
        return;
      }
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }

    if (mazeBossCaughtHero()) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = `${currentBossName()} caught you inside the Statue of Liberty maze. Reset for a rematch.`;
      setAttacks(true);
      updateHud();
      draw();
      return;
    }

    updateHud();
    draw();
  }

  function isInsideStatuePath(x, y) {
    return statueMazePaths().some((rect) => x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h);
  }

  function statueMazePaths() {
    return [
      { x: 155, y: 392, w: 435, h: 116 },
      { x: 470, y: 250, w: 122, h: 258 },
      { x: 470, y: 250, w: 330, h: 104 },
      { x: 690, y: 150, w: 120, h: 204 },
      { x: 620, y: 118, w: 230, h: 102 }
    ];
  }

  function chaseHeroInStatueMaze() {
    const speed = state.level === 4 ? 17 : 13;
    const dx = state.heroX - state.mazeBossX;
    const dy = state.heroY - state.mazeBossY;
    const distance = Math.hypot(dx, dy) || 1;
    state.mazeBossX += (dx / distance) * speed;
    state.mazeBossY += (dy / distance) * speed;
    state.mazeBossX = clamp(state.mazeBossX, 150, 940);
    state.mazeBossY = clamp(state.mazeBossY, 130, 500);
  }

  function reachedStatueExit() {
    return state.heroX >= 700 && state.heroX <= 825 && state.heroY >= 120 && state.heroY <= 190;
  }

  function mazeBossCaughtHero() {
    return Math.hypot(state.heroX - state.mazeBossX, state.heroY - state.mazeBossY) < 46;
  }

  function moveHeroInAntarcticaTreasure(direction) {
    const step = direction === "right" ? 48 : 36;
    if (direction === "left") state.heroX -= step;
    if (direction === "right") state.heroX += step;
    if (direction === "up") state.heroY -= step;
    if (direction === "down") state.heroY += step;
    state.heroX = clamp(state.heroX, 105, 1125);
    state.heroY = clamp(state.heroY, 315, 465);

    chaseHeroInAntarctica(direction);
    state.treasurePowerX -= direction === "right" ? 54 : 28;
    if (state.treasurePowerX < 90) state.treasurePowerX = 850;

    const dodgedPower = Math.abs(state.heroX - state.treasurePowerX) < 62 && Math.abs(state.heroY - projectileTreasureY()) > 54;
    const hitPower = Math.abs(state.heroX - state.treasurePowerX) < 58 && Math.abs(state.heroY - projectileTreasureY()) <= 54;

    if (state.heroX >= 1110) {
      if (state.treasurePart >= 3) {
        els.statusText.textContent = "You reached the Penguin Treasure chest. Press punch, kick, or a power to open it!";
        state.heroX = 1090;
        updateHud();
        draw();
        return;
      }
      state.treasurePart += 1;
      state.heroX = 170;
      state.treasureBossX = state.level === 6 ? 80 : 45;
      state.treasurePowerX = 650;
      els.statusText.textContent = `You passed to Antarctica screen ${state.treasurePart}. Keep running toward the Penguin Treasure!`;
      updateHud();
      draw();
      return;
    }

    if (hitPower && (Date.now() < state.hiddenUntil || Date.now() < state.jumpingUntil)) {
      state.action = "";
      els.statusText.textContent = "Your jump or hide made the icy power miss. Keep running toward the Penguin Treasure!";
    } else if (hitPower) {
      takeHeroDamage(0.5);
      state.action = "iceBossFreeze";
      els.statusText.textContent = `${currentBossName()} shot an icy power across the snow. You lost half a heart. Keep going!`;
    } else if (dodgedPower) {
      state.action = "";
      els.statusText.textContent = `Nice dodge. The boss power slid past you on the ice. Screen ${state.treasurePart} of 3.`;
    } else {
      state.action = "";
      els.statusText.textContent = `Run through Antarctica screen ${state.treasurePart} of 3. The boss is chasing you!`;
    }

    if (treasureBossCaughtHero() || state.heroHp === 0) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = `${currentBossName()} caught you before you found Penguin Treasure. Reset for a rematch.`;
      setAttacks(true);
    }
    updateHud();
    draw();
  }

  function attackAntarcticaTreasure(kind, powerSlot = null) {
    if (kind === "jump" || kind === "hide") {
      useAntarcticaDefense(kind);
      return;
    }
    state.playerAction = kind;
    state.playerTarget = currentTarget();
    const atChest = isAtPenguinTreasureChest();
    if (atChest && state.treasurePart >= 3) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = `${attackName(kind)} opened the Penguin Treasure chest. ${levelWinText()}`;
      if (advanceAfterWin()) return;
      setAttacks(true);
      updateLevelLocks();
      updateHud();
      draw();
      return;
    }

    if (kind === "power") {
      useAntarcticaPower(powerSlot);
      return;
    }

    if (isCloseEnoughToAntarcticaBoss(kind)) {
      const push = kind === "kick" ? 150 : 105;
      state.treasureBossX = clamp(state.treasureBossX - push, 35, 1060);
      state.action = kind === "kick" ? "kick" : "punch";
      els.statusText.textContent = `${attackName(kind)} knocked the chasing boss back on the ice. Keep running toward the Penguin Treasure!`;
    } else {
      state.action = "miss";
      els.statusText.textContent = `${attackName(kind)} missed. Get closer to the chasing boss or reach the Penguin Treasure chest.`;
    }
    updateHud();
    draw();
  }

  function useAntarcticaDefense(kind) {
    const now = Date.now();
    state.playerAction = kind;
    if (kind === "jump") {
      state.jumpingUntil = now + 1400;
      state.heroY = clamp(state.heroY - 42, 315, 465);
      state.action = "heroJump";
      els.statusText.textContent = "Jump! You hopped over the icy power for a moment.";
    } else {
      state.hiddenUntil = now + 1800;
      state.action = "heroHide";
      els.statusText.textContent = "Hide! You ducked behind the snow so the icy power can miss.";
    }
    updateHud();
    draw();
  }

  function useAntarcticaPower(powerSlot = null) {
    const powerName = currentPowerName();
    const powerPush = 210 + (Number.isInteger(powerSlot) ? powerSlot * 30 : 0);
    state.treasureBossX = clamp(state.treasureBossX - powerPush, 35, 1060);
    state.treasurePowerX = 920;
    state.action = "power";
    els.statusText.textContent = `${powerName}! Your power blasted across Antarctica, pushed the chasing boss back, and cleared the icy shot. Keep going to the Penguin Treasure!`;
    updatePowerButton();
    updateHud();
    draw();
  }

  function isAtPenguinTreasureChest() {
    return state.treasurePart >= 3 && state.heroX >= 1010 && state.heroY >= 345 && state.heroY <= 465;
  }

  function isCloseEnoughToAntarcticaBoss(kind) {
    const range = kind === "kick" ? 235 : 190;
    return Math.abs(state.heroX - state.treasureBossX) <= range && Math.abs(state.heroY - state.treasureBossY) <= 125;
  }

  function chaseHeroInAntarctica(direction) {
    const speed = state.level === 6 ? 32 : 25;
    const boost = direction === "left" ? 16 : 0;
    const dx = state.heroX - state.treasureBossX;
    const dy = state.heroY - state.treasureBossY;
    const distance = Math.hypot(dx, dy) || 1;
    state.treasureBossX += (dx / distance) * (speed + boost);
    state.treasureBossY += (dy / distance) * speed * 0.58;
    state.treasureBossX = clamp(state.treasureBossX, 35, 1060);
    state.treasureBossY = clamp(state.treasureBossY, 315, 465);
  }

  function treasureBossCaughtHero() {
    return Math.hypot(state.heroX - state.treasureBossX, state.heroY - state.treasureBossY) < 74;
  }

  function projectileTreasureY() {
    return 340 + ((state.treasurePart + state.tick) % 3) * 52;
  }

  function phoenixPieces() {
    if (state.level === 9) {
      return [
        { id: "cactusFlower", label: "Cactus Flower", x: 330, y: 438, hidden: false },
        { id: "sunStone", label: "Sun Stone", x: 735, y: 432, hidden: true, cover: "cactus" }
      ];
    }
    return [
      { id: "scorpionCoin", label: "Scorpion Coin", x: 315, y: 438, hidden: false },
      { id: "redRockKey", label: "Red Rock Key", x: 710, y: 434, hidden: true, cover: "rock" },
      { id: "bossTreasure", label: "Boss Treasure", x: 955, y: 410, boss: true }
    ];
  }

  function moveHeroInPhoenixScavenger(direction) {
    const step = 38;
    if (direction === "left") state.heroX -= step;
    if (direction === "right") state.heroX += step;
    if (direction === "up") state.heroY -= step;
    if (direction === "down") state.heroY += step;
    state.heroX = clamp(state.heroX, 125, 1085);
    state.heroY = clamp(state.heroY, 318, 470);

    const foundPiece = collectPhoenixPiece();
    if (foundPiece) {
      els.statusText.textContent = `Found ${foundPiece.label}! ${phoenixProgressText()}`;
    } else {
      els.statusText.textContent = `Search the Phoenix desert. ${phoenixProgressText()}`;
    }

    if (phoenixCanWinWithoutBoss()) {
      winPhoenixScavenger("You found every Level 9 desert treasure.");
      return;
    }

    if (state.level === 10 && phoenixReadyForBossTreasure()) {
      state.scavengerBossReady = true;
      els.statusText.textContent = "The last treasure is behind the boss. Move close and hit the boss to get it!";
    }

    updateHud();
    draw();
  }

  function collectPhoenixPiece() {
    const piece = phoenixPieces().find((item) => !item.boss && !state.scavengerFound.has(item.id) && Math.abs(state.heroX - item.x) < 62 && Math.abs(state.heroY - item.y) < 70);
    if (!piece) return null;
    state.scavengerFound.add(piece.id);
    return piece;
  }

  function phoenixReadyForBossTreasure() {
    return phoenixPieces().filter((piece) => !piece.boss).every((piece) => state.scavengerFound.has(piece.id));
  }

  function phoenixCanWinWithoutBoss() {
    return state.level === 9 && phoenixReadyForBossTreasure();
  }

  function phoenixProgressText() {
    const pieces = phoenixPieces();
    const found = pieces.filter((piece) => state.scavengerFound.has(piece.id)).length;
    return `${found} of ${pieces.length} checklist pieces found.`;
  }

  function attackPhoenixBoss(kind) {
    if (kind === "jump" || kind === "hide") {
      useDefenseMove(kind);
      return;
    }
    if (state.level !== 10 || !state.scavengerBossReady) {
      els.statusText.textContent = "This is a scavenger hunt. Find the checklist pieces first.";
      draw();
      return;
    }
    if (!isCloseEnoughToAttack(kind === "kick" ? "kick" : "punch", currentTarget())) {
      state.action = "miss";
      state.playerAction = kind;
      els.statusText.textContent = "The boss is guarding the last treasure. Move closer, then hit the boss.";
      draw();
      return;
    }
    state.scavengerFound.add("bossTreasure");
    state.playerAction = kind;
    state.action = "win";
    winPhoenixScavenger(`${attackName(kind)} knocked the boss away and revealed the Boss Treasure.`);
  }

  function winPhoenixScavenger(message) {
    state.won = true;
    state.action = "win";
    els.statusText.textContent = `${message} ${levelWinText()}`;
    if (advanceAfterWin()) return;
    setAttacks(true);
    updateLevelLocks();
    updateHud();
    draw();
  }

  function canadaMapPieces() {
    if (state.level === 15) {
      return [
        { id: "pineClue", label: "Pine Tree Clue", x: 390, y: 408, guard: "snow carrot" },
        { id: "lakeClue", label: "Frozen Lake Clue", x: 735, y: 426, guard: "ice monster" }
      ];
    }
    return [
      { id: "mapCorner", label: "Map Corner", x: 350, y: 410, guard: "snow carrot" },
      { id: "xClue", label: "X Clue", x: 690, y: 430, guard: "ice monster" },
      { id: "canadaStar", label: "Canada Star Treasure", x: 970, y: 410, boss: true }
    ];
  }

  function moveHeroInCanadaTreasure(direction) {
    const step = 38;
    if (direction === "left") state.heroX -= step;
    if (direction === "right") state.heroX += step;
    if (direction === "up") state.heroY -= step;
    if (direction === "down") state.heroY += step;
    state.heroX = clamp(state.heroX, 125, 1085);
    state.heroY = clamp(state.heroY, 318, 470);
    state.action = "";
    state.playerAction = "";

    if (state.level === 16 && canadaReadyForBossTreasure()) {
      state.scavengerBossReady = true;
      els.statusText.textContent = "The treasure map is finished. The boss came out and is guarding the Canada star. Move close and hit the boss!";
    } else {
      els.statusText.textContent = `Explore Canada for clue guards. ${canadaProgressText()}`;
    }
    updateHud();
    draw();
  }

  function attackCanadaTreasure(kind) {
    if (kind === "jump" || kind === "hide") {
      useDefenseMove(kind);
      return;
    }
    const guard = canadaNearestGuard();
    if (guard) {
      state.playerAction = kind;
      state.action = kind;
      const hits = (state.canadaHits[guard.id] || 0) + (kind === "kick" ? 2 : 1);
      state.canadaHits[guard.id] = hits;
      if (hits >= 2) {
        state.scavengerFound.add(guard.id);
        els.statusText.textContent = `You beat the ${guard.guard} and earned ${guard.label}. ${canadaProgressText()}`;
        if (state.level === 15 && canadaReadyForBossTreasure()) {
          winCanadaTreasure("You finished the first half of the Canada treasure map.");
          return;
        }
        if (state.level === 16 && canadaReadyForBossTreasure()) {
          state.scavengerBossReady = true;
          els.statusText.textContent = "The second half of the map is finished. The boss came out by the X. Hit the boss to dig up the Canada star!";
        }
      } else {
        els.statusText.textContent = `${attackName(kind)} hit the ${guard.guard}. Hit it one more time to win this map clue.`;
      }
      updateHud();
      draw();
      return;
    }

    if (state.level === 16 && state.scavengerBossReady) {
      const boss = canadaBossTreasurePiece();
      if (Math.abs(state.heroX - boss.x) <= 245 && Math.abs(state.heroY - boss.y) <= 165) {
        state.scavengerFound.add("canadaStar");
        state.playerAction = kind;
        state.action = "win";
        winCanadaTreasure(`${attackName(kind)} knocked the boss away. You dug where the X marks the spot and found the Canada star treasure.`);
        return;
      }
      state.action = "miss";
      state.playerAction = kind;
      els.statusText.textContent = "The boss is guarding the Canada star. Move closer, then hit the boss.";
      draw();
      return;
    }

    state.action = "miss";
    state.playerAction = kind;
    els.statusText.textContent = "Move close to a snow carrot or ice monster clue guard, then punch or kick it.";
    draw();
  }

  function canadaNearestGuard() {
    return canadaMapPieces().find((piece) => !piece.boss && !state.scavengerFound.has(piece.id) && Math.abs(state.heroX - piece.x) <= 155 && Math.abs(state.heroY - piece.y) <= 130);
  }

  function canadaReadyForBossTreasure() {
    return canadaMapPieces().filter((piece) => !piece.boss).every((piece) => state.scavengerFound.has(piece.id));
  }

  function canadaBossTreasurePiece() {
    return canadaMapPieces().find((piece) => piece.boss) || { x: 970, y: 410 };
  }

  function canadaProgressText() {
    const pieces = canadaMapPieces().filter((piece) => !piece.boss);
    const found = pieces.filter((piece) => state.scavengerFound.has(piece.id)).length;
    const half = state.level === 15 ? "first half" : "second half";
    return `${found} of ${pieces.length} ${half} map pieces found.`;
  }

  function winCanadaTreasure(message) {
    state.won = true;
    state.action = "win";
    els.statusText.textContent = `${message} ${levelWinText()}`;
    if (advanceAfterWin()) return;
    setAttacks(true);
    updateLevelLocks();
    updateHud();
    draw();
  }

  function moveHeroInWhiteHouseProtect(direction) {
    const step = 42;
    if (direction === "left") state.heroX -= step;
    if (direction === "right") state.heroX += step;
    if (direction === "up") state.heroY -= step;
    if (direction === "down") state.heroY += step;
    state.heroX = clamp(state.heroX, 110, 1080);
    state.heroY = clamp(state.heroY, 305, 470);
    state.action = "";
    state.playerAction = "";
    const nearby = nearestProtectHazard(110);
    els.statusText.textContent = nearby
      ? "Move close and punch, kick, or use a power to knock the danger away from President Trump."
      : `Protect President Trump. ${protectTimeText()} left.`;
    updateHud();
    draw();
  }

  function attackWhiteHouseProtect(kind) {
    if (kind === "jump" || kind === "hide") {
      useDefenseMove(kind);
      return;
    }
    state.playerAction = kind;
    const range = kind === "power" ? 210 : kind === "kick" ? 165 : 135;
    const hazard = nearestProtectHazard(range);
    if (!hazard) {
      state.action = "miss";
      els.statusText.textContent = "No danger is close enough. Move near a danger, then knock it away.";
      draw();
      return;
    }
    state.protectHazards = state.protectHazards.filter((item) => item.id !== hazard.id);
    state.action = "protectBlock";
    els.statusText.textContent = `${attackName(kind)} knocked away the ${hazard.label}. Keep President Trump safe for ${protectTimeText()}.`;
    updateHud();
    draw();
  }

  function tickWhiteHouseProtect() {
    if (!state.started || state.won || state.lost || !isWhiteHouseProtectLevel()) return;
    if (protectRemainingMs() <= 0) {
      winWhiteHouseProtect();
      return;
    }
    if (state.protectHazards.length < (state.level === 20 ? 4 : 3)) {
      spawnProtectHazard();
    }
    const president = presidentPosition();
    state.protectHazards.forEach((hazard) => {
      const speed = state.level === 20 ? hazard.speed + 8 : hazard.speed;
      const dx = president.x - hazard.x;
      const dy = president.y - hazard.y;
      const distance = Math.hypot(dx, dy) || 1;
      hazard.x += (dx / distance) * speed;
      hazard.y += (dy / distance) * speed;
    });
    const hits = state.protectHazards.filter((hazard) => Math.hypot(hazard.x - president.x, hazard.y - president.y) < 62);
    if (hits.length) {
      state.protectPresidentHp = Math.max(0, state.protectPresidentHp - hits.length);
      state.protectHazards = state.protectHazards.filter((hazard) => !hits.includes(hazard));
      state.action = "presidentHit";
      els.statusText.textContent = `A danger got through. President Trump lost ${hits.length} heart${hits.length === 1 ? "" : "s"}. Protect him for ${protectTimeText()}.`;
    } else {
      els.statusText.textContent = `Protect President Trump. ${protectTimeText()} left.`;
    }
    if (state.protectPresidentHp <= 0) {
      loseWhiteHouseProtect();
      return;
    }
    updateHud();
    draw();
  }

  function spawnProtectHazard() {
    const lanes = [
      { x: 1050, y: 330, label: "flying paper stack", color: "#fffef7" },
      { x: 990, y: 470, label: "rolling chair", color: "#6f737a" },
      { x: 760, y: 305, label: "falling picture frame", color: "#ffd84a" },
      { x: 1120, y: 405, label: "danger ball", color: "#d91f2e" }
    ];
    const lane = lanes[(state.nextHazardId + state.level + state.protectHazards.length) % lanes.length];
    state.protectHazards.push({
      id: state.nextHazardId,
      x: lane.x,
      y: lane.y,
      label: lane.label,
      color: lane.color,
      speed: 34 + (state.nextHazardId % 3) * 8
    });
    state.nextHazardId += 1;
  }

  function nearestProtectHazard(range) {
    let best = null;
    let bestDistance = Infinity;
    state.protectHazards.forEach((hazard) => {
      const distance = Math.hypot(hazard.x - state.heroX, hazard.y - state.heroY);
      if (distance <= range && distance < bestDistance) {
        best = hazard;
        bestDistance = distance;
      }
    });
    return best;
  }

  function presidentPosition() {
    const wiggle = state.started ? Math.sin((Date.now() - state.protectStartedAt) / 650) * 34 : 0;
    return { x: 615 + wiggle, y: 405 };
  }

  function protectRemainingMs() {
    if (state.levelStartedAt) return levelRemainingMs();
    if (!state.protectStartedAt) return state.protectDurationMs;
    return Math.max(0, state.protectDurationMs - (Date.now() - state.protectStartedAt));
  }

  function protectTimeText() {
    const totalSeconds = Math.ceil(protectRemainingMs() / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function winWhiteHouseProtect() {
    clearLevelTimer();
    if (state.protectInterval) {
      clearInterval(state.protectInterval);
      state.protectInterval = null;
    }
    state.won = true;
    state.action = "win";
    els.statusText.textContent = `Time ran out and President Trump stayed safe. ${levelWinText()}`;
    if (advanceAfterWin()) return;
    setAttacks(true);
    updateLevelLocks();
    updateHud();
    draw();
  }

  function loseWhiteHouseProtect() {
    clearLevelTimer();
    if (state.protectInterval) {
      clearInterval(state.protectInterval);
      state.protectInterval = null;
    }
    state.lost = true;
    state.action = "lost";
    els.statusText.textContent = "President Trump ran out of protection hearts. Start the level again and knock dangers away faster.";
    setAttacks(true);
    updateHud();
    draw();
  }

  function moveHeroInIsraelWallFight(direction) {
    const step = 44;
    if (direction === "left") state.heroX -= step;
    if (direction === "right") state.heroX += step;
    if (direction === "up") state.heroY -= step;
    if (direction === "down") state.heroY += step;
    state.heroX = clamp(state.heroX, 110, 1085);
    state.heroY = clamp(state.heroY, 310, 470);
    if (isAtIsraelWallOpening()) {
      state.heroX = state.heroX < 640 ? 1010 : 170;
      state.action = "wallEscape";
      els.statusText.textContent = `You slipped through the wall opening and came out the other side. ${israelTimeText()} left.`;
    } else {
      state.action = "";
      els.statusText.textContent = `Run through wall openings, attack the villain, or escape with more hearts. ${israelTimeText()} left.`;
    }
    chaseHeroInIsrael();
    checkIsraelVillainHitHero();
    updateHud();
    draw();
  }

  function attackIsraelWallFight(kind) {
    if (kind === "jump" || kind === "hide") {
      useDefenseMove(kind);
      return;
    }
    const target = currentTarget();
    if (!isCloseEnoughToAttack(kind === "kick" ? "kick" : "punch", target)) {
      state.action = "miss";
      state.playerAction = kind;
      els.statusText.textContent = "The villain is too far. Use the wall openings to escape and get a better angle.";
      draw();
      return;
    }
    state.playerAction = kind;
    state.playerTarget = target;
    const damage = heroAttackDamage(kind === "power" ? usePowerDamage() : kind === "kick" ? 2 : 1);
    damageBoss(target, damage);
    if (currentBossHp() <= 0) {
      winIsraelWallFight(`You defeated the villain before time ran out.`);
      return;
    }
    state.action = kind;
    els.statusText.textContent = `${attackName(kind)} hit ${currentBossName(target)}. Keep going or finish with more hearts when time runs out. ${israelTimeText()} left.`;
    chaseHeroInIsrael();
    checkIsraelVillainHitHero();
    updateHud();
    draw();
  }

  function tickIsraelWallFight() {
    if (!state.started || state.won || state.lost || !isIsraelWallFightLevel()) return;
    if (israelRemainingMs() <= 0) {
      finishIsraelByHearts();
      return;
    }
    chaseHeroInIsrael();
    checkIsraelVillainHitHero();
    if (!state.won && !state.lost) {
      els.statusText.textContent = `Israel wall fight: ${israelTimeText()} left. You need more hearts than the villain if time runs out.`;
      updateHud();
      draw();
    }
  }

  function chaseHeroInIsrael() {
    const speed = state.level === 26 ? 28 : 22;
    const dx = state.heroX - state.israelVillainX;
    const dy = state.heroY - state.israelVillainY;
    const distance = Math.hypot(dx, dy) || 1;
    state.israelVillainX += (dx / distance) * speed;
    state.israelVillainY += (dy / distance) * speed * 0.55;
    state.israelVillainX = clamp(state.israelVillainX, 115, 1080);
    state.israelVillainY = clamp(state.israelVillainY, 310, 470);
  }

  function checkIsraelVillainHitHero() {
    if (Math.hypot(state.heroX - state.israelVillainX, state.heroY - state.israelVillainY) >= 58) return;
    takeHeroDamage(0.5);
    state.heroX = clamp(state.heroX - 85, 110, 1085);
    state.action = "israelTag";
    if (state.heroHp <= 0) {
      loseIsraelWallFight("The villain caught you too many times.");
    }
  }

  function finishIsraelByHearts() {
    if (state.heroHp > currentBossHp()) {
      winIsraelWallFight("Time ran out and you escaped with more hearts than the villain.");
    } else {
      loseIsraelWallFight("Time ran out, but you did not have more hearts than the villain.");
    }
  }

  function winIsraelWallFight(message) {
    clearLevelTimer();
    if (state.israelInterval) {
      clearInterval(state.israelInterval);
      state.israelInterval = null;
    }
    state.won = true;
    state.action = "win";
    els.statusText.textContent = `${message} ${levelWinText()}`;
    if (advanceAfterWin()) return;
    setAttacks(true);
    updateLevelLocks();
    updateHud();
    draw();
  }

  function loseIsraelWallFight(message) {
    clearLevelTimer();
    if (state.israelInterval) {
      clearInterval(state.israelInterval);
      state.israelInterval = null;
    }
    state.lost = true;
    state.action = "lost";
    els.statusText.textContent = `${message} Start again and use the wall openings to escape.`;
    setAttacks(true);
    updateHud();
    draw();
  }

  function isAtIsraelWallOpening() {
    const nearLeftOpening = state.heroX >= 405 && state.heroX <= 515 && state.heroY >= 340 && state.heroY <= 452;
    const nearRightOpening = state.heroX >= 755 && state.heroX <= 865 && state.heroY >= 340 && state.heroY <= 452;
    return nearLeftOpening || nearRightOpening;
  }

  function israelRemainingMs() {
    if (state.levelStartedAt) return levelRemainingMs();
    if (!state.israelStartedAt) return state.israelDurationMs;
    return Math.max(0, state.israelDurationMs - (Date.now() - state.israelStartedAt));
  }

  function israelTimeText() {
    const totalSeconds = Math.ceil(israelRemainingMs() / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  function handleBossPressureWhileMoving(target, direction) {
    if (!bossPressuresWhileMoving(target) || isCloseEnoughToAttack("kick", target)) {
      state.bossPressureStep = 0;
      return false;
    }
    if (isBossPowerSilenced(target)) {
      state.action = "parrotScream";
      els.statusText.textContent = `${currentBossName(target)} tried to use a power, but Wing Gust is still blocking it. Keep moving closer!`;
      return true;
    }
    if (isBossInIceTornado(target)) {
      state.action = "polarIceTornado";
      els.statusText.textContent = `${currentBossName(target)} is blocked by Benji's Ice Shield. Keep moving closer!`;
      return true;
    }
    if (isBossSlippingOnBanana(target)) {
      state.action = "bananaSlip";
      els.statusText.textContent = `${currentBossName(target)} is dizzy from Poison Storm. Keep moving closer!`;
      return true;
    }
    if (isBossInFennecLove(target)) {
      state.action = "fennecLove";
      els.statusText.textContent = `${currentBossName(target)} is still on the floor saying "I love you." Keep moving closer!`;
      return true;
    }
    if (isBossBocked(target)) {
      state.action = "mayerBigBock";
      els.statusText.textContent = `${currentBossName(target)} is still knocked down from Flying Boots. Keep moving closer!`;
      return true;
    }
    if (isBossChomped(target)) {
      state.action = "yonatanChomper";
      els.statusText.textContent = `${currentBossName(target)} is stuck by the broken floor from Yap Blast. Keep moving closer!`;
      return true;
    }
    state.bossPressureStep += 1;
    if (canLaneDodge(target)) {
      state.projectileLane = nextProjectileLane();
    }
    const laneDodged = canLaneDodge(target) && direction && dodgeBeatsLane(direction, state.projectileLane);
    const jumpOrHideDodged = Date.now() < state.hiddenUntil || Date.now() < state.jumpingUntil;
    const dodged = laneDodged || jumpOrHideDodged;
    const canHitThisMove = canLaneDodge(target) ? !laneDodged : state.bossPressureStep % bossPressureInterval() === 0;
    applyBossPower(target, false, dodged || !canHitThisMove);
    const bossAction = state.action;
    if (laneDodged) {
      state.action = target === "archer" ? "paintbrushDodge" : "bookDodge";
      damageBoss(target, 1);
      checkPowerRewards();
      if (currentBossHp() === 0) {
        state.won = true;
        state.action = "win";
        els.statusText.textContent = `${bossAttackText(target, bossAction)} Your dodge made it explode on the wall and take away 1 boss heart. ${levelWinText()}`;
        if (advanceAfterWin()) {
          return true;
        }
        setAttacks(true);
        return true;
      }
      els.statusText.textContent = `${bossAttackText(target, bossAction)} Your ${direction} dodge made it miss, explode on the wall, and take away 1 boss heart. Keep moving closer!`;
      return true;
    }
    if (jumpOrHideDodged) {
      els.statusText.textContent = `${bossAttackText(target, bossAction)} Your jump or hide made it miss. Keep moving closer!`;
      return true;
    }
    if (!canHitThisMove) {
      els.statusText.textContent = `${bossAttackText(target, bossAction)} It is aiming ${laneName(state.projectileLane)} and coming slowly. ${dodgeHint(state.projectileLane)}`;
      return true;
    }
    const damage = takeHeroDamage(bossDamageForAction(bossAction));
    if (state.heroHp === 0) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = "The world bosses won this round. Reset for a rematch.";
      setAttacks(true);
      return true;
    }
    els.statusText.textContent = state.lastDefenseText
      ? `${bossPowerText(target, false, bossAction)} ${state.lastDefenseText} Get closer to stop the attacks!`
      : `${bossPowerText(target, false, bossAction)} You lost ${heartText(damage)}. Get closer to stop the attacks!`;
    return true;
  }

  function bossPressuresWhileMoving(target) {
    return target === "airplane" || target === "pusher" || target === "whacker" || target === "archer" || target === "librarian" || target === "bus";
  }

  function bossPressureInterval() {
    if (state.level >= 25) return 1;
    if (state.level >= 16) return 2;
    return 3;
  }

  function nextProjectileLane() {
    return ["up", "middle", "down"][state.bossPressureStep % 3];
  }

  function dodgeBeatsLane(direction, lane) {
    if (lane === "up") return direction === "down";
    if (lane === "down") return direction === "up";
    return direction === "up" || direction === "down";
  }

  function laneName(lane) {
    if (lane === "up") return "high";
    if (lane === "down") return "low";
    return "middle";
  }

  function dodgeHint(lane) {
    if (lane === "up") return "Go down to dodge it!";
    if (lane === "down") return "Go up to dodge it!";
    return "Go up or down to dodge it!";
  }

  function updateHud() {
    const hero = heroes[state.heroId];
    els.levelEyebrow.textContent = state.started ? `Level ${state.level} | Time ${levelTimerText()}` : `Level ${state.level}`;
    els.selectedHeroName.textContent = hero.name;
    renderHeartMeter(els.heroHearts, hero.name, state.heroHp, currentHeroMaxHp());
    renderHeartMeter(els.bossHearts, currentBossName(), currentBossHp(), currentBossMaxHp());
    renderPrizeStatus();
    updatePowerButton();
    updateBossTargetChoices();
  }

  function currentHeroMaxHp() {
    return isWhiteHouseProtectLevel() ? 6 : heroes[state.heroId].hp;
  }

  function renderPrizeStatus() {
    const active = [];
    if (state.bowShots > 0) active.push(`Bow x${state.bowShots}`);
    if (state.armorBlocks > 0) active.push(`Shield x${state.armorBlocks}`);
    if (state.specialPowerCharges > 0) active.push(`Special x${state.specialPowerCharges}`);
    if (Date.now() < state.timedShieldUntil) active.push(`1-min shield ${timedShieldSeconds()}s`);
    if (!active.length) return;
    const prizeLine = document.createElement("small");
    prizeLine.className = "prize-status";
    prizeLine.textContent = active.join(" | ");
    els.heroHearts.append(prizeLine);
  }

  function timedShieldSeconds() {
    return Math.max(0, Math.ceil((state.timedShieldUntil - Date.now()) / 1000));
  }

  function renderHeartMeter(element, label, hp, maxHp) {
    element.textContent = "";
    const name = document.createElement("strong");
    name.textContent = `${label}: ${heartText(hp)}`;
    const hearts = document.createElement("span");
    hearts.className = "heart-icons";
    const wholeHearts = Math.ceil(maxHp);
    for (let index = 1; index <= wholeHearts; index += 1) {
      const heart = document.createElement("span");
      heart.className = "heart";
      const fill = document.createElement("span");
      fill.className = "heart-fill";
      if (hp >= index) {
        heart.classList.add("full");
        fill.style.width = "100%";
      } else if (hp > index - 1) {
        heart.classList.add("half");
        fill.style.width = `${Math.round((hp - (index - 1)) * 100)}%`;
      } else {
        heart.classList.add("empty");
        fill.style.width = "0%";
      }
      heart.append(fill);
      hearts.append(heart);
    }
    element.append(name, hearts);
  }

  function updatePowerButton() {
    const powers = powerNamesForHero();
    const disabled = !state.started || state.won || state.lost;
    els.powerButtons.forEach((button, index) => {
      const name = powers[index];
      button.classList.toggle("hidden", !name);
      button.disabled = disabled || !name;
      if (name) button.textContent = `${index + 1}. ${name}`;
    });
  }

  function currentPowerName() {
    const hero = heroes[state.heroId];
    if (!hero) return "Use Power-Up";
    if (state.heroId === "apple") return powerForCurrentLevel(cheetahPowers[state.cheetahPowerStep % cheetahPowers.length]).name;
    if (state.heroId === "benji") return powerForCurrentLevel(polarPowers[state.polarPowerStep % polarPowers.length]).name;
    if (state.heroId === "frost") return powerForCurrentLevel(monkeyPowers[state.monkeyPowerStep % monkeyPowers.length]).name;
    if (state.heroId === "freddy") return powerForCurrentLevel(fennecPowers[state.fennecPowerStep % fennecPowers.length]).name;
    if (state.heroId === "mayer") return powerForCurrentLevel(mayerPowers[state.mayerPowerStep % mayerPowers.length]).name;
    if (state.heroId === "yonatan") return powerForCurrentLevel(yonatanPowers[state.yonatanPowerStep % yonatanPowers.length]).name;
    return hero.firstPower;
  }

  function powerNamesForHero() {
    const hero = heroes[state.heroId];
    if (!hero) return ["Use Power-Up"];
    if (state.heroId === "tats") return elephantPowers.map((power) => powerForCurrentLevel(power).name);
    if (state.heroId === "fary") return parrotPowers.map((power) => powerForCurrentLevel(power).name);
    if (state.heroId === "apple") return cheetahPowers.map((power) => powerForCurrentLevel(power).name);
    if (state.heroId === "benji") return polarPowers.map((power) => powerForCurrentLevel(power).name);
    if (state.heroId === "frost") return monkeyPowers.map((power) => powerForCurrentLevel(power).name);
    if (state.heroId === "freddy") return fennecPowers.map((power) => powerForCurrentLevel(power).name);
    if (state.heroId === "mayer") return mayerPowers.map((power) => powerForCurrentLevel(power).name);
    if (state.heroId === "yonatan") return yonatanPowers.map((power) => powerForCurrentLevel(power).name);
    return [hero.firstPower, "World Power", "Shield Power"];
  }

  function chooseAliveLevelOneTarget(target) {
    if (target === "evil" && state.evilHp > 0) return "evil";
    if (target === "ice" && state.iceHp > 0) return "ice";
    if (target === "math" && state.mathHp > 0) return "math";
    if (state.mathHp > 0) return "math";
    if (state.evilHp > 0) return "evil";
    return "ice";
  }

  function renderPowers() {
    els.powerInventory.innerHTML = "";
    Object.entries(powerUps).forEach(([id, power]) => {
      const pill = document.createElement("span");
      const earned = state.earnedPowers.has(id);
      pill.className = `power-pill ${earned ? "earned" : "locked"}`;
      pill.textContent = earned ? `${power.name} earned` : `${power.name} locked`;
      pill.title = `${power.unlock}. ${power.description}`;
      els.powerInventory.append(pill);
    });
  }

  function setAttacks(disabled) {
    els.punchButton.disabled = disabled;
    els.kickButton.disabled = disabled;
    els.jumpButton.disabled = disabled;
    els.hideButton.disabled = disabled;
    const powers = powerNamesForHero();
    els.powerButtons.forEach((button, index) => {
      button.disabled = disabled || !powers[index];
    });
    updatePowerButton();
  }

  function draw() {
    state.tick += 1;
    drawSchool();
    drawHealthBars();
    if (isStatueMazeLevel()) {
      drawMazeFacePlayer(state.heroX, state.heroY);
    } else {
      drawHero(state.heroX, state.heroY);
    }
    if (isAntarcticaTreasureLevel() && state.started) {
      drawMiniMazeBoss(state.treasureBossX, state.treasureBossY);
      drawAntarcticaBossPower();
    } else if (isCanadaTreasureMapLevel() && state.started) {
      drawCanadaGuardsAndTreasure();
    } else if (isWhiteHouseProtectLevel()) {
      drawPresidentTrump();
      drawProtectHazards();
    } else if (isIsraelWallFightLevel()) {
      drawIsraelVillain();
    } else if (!state.started) {
      drawMischievousMayerBoss(900, 365);
      drawYappingYonatanBoss(1045, 420);
      drawIceBoss(970, 405);
    } else if (currentBossHp() > 0) {
      if (isStatueMazeLevel()) {
        drawMiniMazeBoss(state.mazeBossX, state.mazeBossY);
      } else if (isCanadaTreasureMapLevel()) {
        // The boss waits hidden until the Canada map is finished.
      } else if (currentTarget() === "math") {
        drawMischievousMayerBoss(940, 365);
      } else if (currentTarget() === "evil") {
        drawYappingYonatanBoss(990, 420);
      } else {
        drawIceBoss(965, 390);
      }
    }
    drawPrizeDrops();
    drawPalaceChargeUps();
    drawAction();
  }

  function drawSchool() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    drawTravelScene(w, h);
  }

  function drawTravelScene(w, h) {
    const place = travelStops[state.level - 1] || "World Trip";
    if (isStatueMazeLevel()) {
      drawStatueMazeScene(w, h);
      return;
    }
    if (isAntarcticaTreasureLevel()) {
      drawAntarcticaTreasureScene(w, h);
      return;
    }
    if (isPhoenixScavengerLevel()) {
      drawPhoenixScavengerScene(w, h);
      return;
    }
    if (isCanadaTreasureMapLevel()) {
      drawCanadaTreasureScene(w, h);
      return;
    }
    if (isWhiteHouseProtectLevel()) {
      drawWhiteHouseProtectScene(w, h);
      return;
    }
    if (isPalaceChargeLevel()) {
      drawPalaceChargeScene(w, h);
      return;
    }
    if (isIsraelWallFightLevel()) {
      drawIsraelWallFightScene(w, h);
      return;
    }
    if (place === "Florida") {
      drawFloridaBeachScene(w, h);
      return;
    }
    const theme = placeTheme(place);
    ctx.fillStyle = theme.sky;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = theme.ground;
    ctx.fillRect(0, 455, w, 265);
    ctx.fillStyle = theme.road;
    ctx.fillRect(0, 548, w, 82);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 548);
    ctx.lineTo(w, 548);
    ctx.moveTo(0, 630);
    ctx.lineTo(w, 630);
    ctx.stroke();
    drawTravelLandmarks(place, w, h);
    drawTravelBoard(place);
  }

  function drawFloridaBeachScene(w, h) {
    ctx.fillStyle = "#7edbff";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "#35aee8";
    ctx.fillRect(0, 295, w, 160);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.78)";
    ctx.lineWidth = 5;
    for (let y = 324; y <= 420; y += 34) {
      ctx.beginPath();
      for (let x = -30; x <= w + 30; x += 70) {
        const waveY = y + Math.sin((x + state.tick * 3) / 42) * 6;
        if (x === -30) ctx.moveTo(x, waveY);
        else ctx.quadraticCurveTo(x - 35, waveY - 9, x, waveY);
      }
      ctx.stroke();
    }

    ctx.fillStyle = "#f1c96f";
    ctx.fillRect(0, 455, w, h - 455);
    ctx.fillStyle = "#e5b85f";
    ctx.fillRect(0, 548, w, 82);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 455);
    ctx.lineTo(w, 455);
    ctx.moveTo(0, 548);
    ctx.lineTo(w, 548);
    ctx.moveTo(0, 630);
    ctx.lineTo(w, 630);
    ctx.stroke();

    drawPalmTree(95, 455, 0.9);
    drawPalmTree(1130, 455, 0.82);
    drawPalmTree(1040, 515, 0.55);
    drawBeachShells();
    drawTravelBoard("Florida Beach");
  }

  function drawPalmTree(x, groundY, scale) {
    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#9a642d";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-14, 0);
    ctx.quadraticCurveTo(5, -80, 22, -178);
    ctx.quadraticCurveTo(43, -86, 29, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(23, 18, 22, 0.35)";
    ctx.lineWidth = 3;
    for (let y = -18; y > -152; y -= 26) {
      ctx.beginPath();
      ctx.moveTo(-6, y);
      ctx.lineTo(28, y - 12);
      ctx.stroke();
    }
    ctx.translate(24, -180);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#1f9a55";
    ctx.lineWidth = 5;
    [-2.5, -1.7, -0.9, -0.25, 0.55, 1.35, 2.15].forEach((angle) => {
      ctx.save();
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.ellipse(0, -54, 18, 76, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });
    ctx.fillStyle = "#8a4c2c";
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.arc(-12 + i * 12, -4 + (i % 2) * 8, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBeachShells() {
    const shells = [
      [175, 604, "#ff9fc0"], [252, 666, "#fff0b8"], [410, 590, "#f7a66e"],
      [742, 676, "#fbdce8"], [860, 606, "#fff0b8"], [1018, 648, "#ff9fc0"]
    ];
    shells.forEach(([x, y, color], index) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(index % 2 ? -0.2 : 0.18);
      ctx.fillStyle = color;
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 15, Math.PI, Math.PI * 2);
      ctx.lineTo(15, 8);
      ctx.lineTo(-15, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "rgba(23, 18, 22, 0.45)";
      ctx.lineWidth = 2;
      [-8, 0, 8].forEach((sx) => {
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(sx, 7);
        ctx.stroke();
      });
      ctx.restore();
    });
  }

  function drawStatueMazeScene(w, h) {
    ctx.fillStyle = "#9edcff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#2d86c9";
    ctx.fillRect(0, 455, w, 265);
    ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
    for (let y = 492; y < h; y += 42) {
      ctx.beginPath();
      for (let x = -40; x <= w + 40; x += 82) {
        const waveY = y + Math.sin((x + state.tick * 2) / 50) * 5;
        if (x === -40) ctx.moveTo(x, waveY);
        else ctx.quadraticCurveTo(x - 42, waveY - 7, x, waveY);
      }
      ctx.stroke();
    }

    ctx.save();
    ctx.fillStyle = "#7ec7b4";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    roundRect(255, 500, 545, 72, 12);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(360, 500);
    ctx.lineTo(465, 185);
    ctx.quadraticCurveTo(528, 124, 620, 174);
    ctx.lineTo(725, 500);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#5db09c";
    ctx.beginPath();
    ctx.moveTo(485, 280);
    ctx.quadraticCurveTo(540, 330, 512, 500);
    ctx.moveTo(575, 260);
    ctx.quadraticCurveTo(650, 360, 635, 500);
    ctx.stroke();
    ctx.fillStyle = "#83d6c2";
    ctx.beginPath();
    ctx.moveTo(545, 170);
    ctx.lineTo(468, 328);
    ctx.lineTo(416, 306);
    ctx.lineTo(500, 188);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#7ec7b4";
    ctx.beginPath();
    ctx.moveTo(617, 205);
    ctx.lineTo(736, 250);
    ctx.lineTo(724, 302);
    ctx.lineTo(610, 258);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#8ad8c4";
    ctx.beginPath();
    ctx.arc(546, 128, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let spike = 0; spike < 7; spike += 1) {
      const angle = -Math.PI * 0.95 + spike * Math.PI * 0.31;
      const sx = 546 + Math.cos(angle) * 58;
      const sy = 128 + Math.sin(angle) * 58;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(546 + Math.cos(angle) * 98, 128 + Math.sin(angle) * 98);
      ctx.lineTo(546 + Math.cos(angle + 0.12) * 62, 128 + Math.sin(angle + 0.12) * 62);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(526, 125, 5, 0, Math.PI * 2);
    ctx.arc(566, 125, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(546, 146, 16, 0.15, Math.PI - 0.15);
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(395, 140);
    ctx.lineTo(430, 78);
    ctx.lineTo(465, 140);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#6bc6b5";
    roundRect(692, 272, 70, 115, 7);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.font = "900 20px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("JULY", 727, 318);
    ctx.fillText("4", 727, 348);

    ctx.fillStyle = "rgba(223,248,239,0.94)";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    statueMazePaths().forEach((rect) => {
      roundRect(rect.x, rect.y, rect.w, rect.h, 8);
      ctx.fill();
      ctx.stroke();
    });
    ctx.fillStyle = "#8ad8c4";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    roundRect(690, 112, 155, 82, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#dff8ef";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    roundRect(704, 124, 124, 58, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.font = "900 31px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("EXIT", 766, 163);
    ctx.restore();

    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    roundRect(870, 105, 330, 96, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#2f6f52";
    ctx.font = "900 28px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${state.level}: STATUE MAZE`, 1035, 145);
    ctx.font = "900 20px Trebuchet MS";
    ctx.fillText("REACH EXIT AT THE HEAD", 1035, 176);
  }

  function drawMazeFacePlayer(x, y) {
    const hero = heroes[state.heroId] || heroes.tats;
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = hero.accent;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, 27, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = hero.color;
    ctx.beginPath();
    ctx.ellipse(0, -23, 30, 14, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    if (state.heroId === "apple") {
      ctx.fillStyle = "#ff4d3d";
      ctx.beginPath();
      ctx.arc(0, -36, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#1f7f45";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(4, -44);
      ctx.quadraticCurveTo(18, -52, 22, -38);
      ctx.stroke();
    } else if (state.heroId === "fary") {
      ctx.fillStyle = "#ff89c6";
      ctx.beginPath();
      ctx.moveTo(-30, -6);
      ctx.lineTo(-56, -28);
      ctx.lineTo(-38, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(30, -6);
      ctx.lineTo(56, -28);
      ctx.lineTo(38, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (state.heroId === "frost") {
      ctx.fillStyle = "#9be8ff";
      ctx.beginPath();
      ctx.moveTo(-12, -36);
      ctx.lineTo(0, -58);
      ctx.lineTo(12, -36);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (state.heroId === "mayer") {
      ctx.fillStyle = "#ffd84a";
      ctx.beginPath();
      ctx.moveTo(-20, -32);
      ctx.lineTo(-10, -52);
      ctx.lineTo(0, -32);
      ctx.lineTo(12, -52);
      ctx.lineTo(22, -32);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (state.heroId === "yonatan") {
      ctx.fillStyle = "#fffef7";
      ctx.beginPath();
      ctx.arc(0, -36, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-9, -3, 4, 0, Math.PI * 2);
    ctx.arc(9, -3, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 9, 9, 0.15, Math.PI - 0.15);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    roundRect(-38, 31, 76, 24, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = hero.color;
    ctx.font = "900 10px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(hero.name.split(" ")[0].toUpperCase(), 0, 47);
    ctx.restore();
  }

  function drawMiniMazeBoss(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(0.38, 0.38);
    if (currentTarget() === "evil") {
      drawYappingHero();
    } else if (currentTarget() === "ice") {
      drawIceBoss(0, 0);
    } else {
      drawMayorHero();
    }
    ctx.restore();
  }

  function drawAntarcticaTreasureScene(w, h) {
    ctx.fillStyle = "#bfefff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#e9fbff";
    ctx.fillRect(0, 430, w, h - 430);
    ctx.fillStyle = "#cce7f5";
    ctx.fillRect(0, 548, w, 82);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 430);
    ctx.lineTo(w, 430);
    ctx.moveTo(0, 548);
    ctx.lineTo(w, 548);
    ctx.moveTo(0, 630);
    ctx.lineTo(w, 630);
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    for (let x = -60; x < w; x += 220) {
      ctx.beginPath();
      ctx.moveTo(x, 430);
      ctx.lineTo(x + 105, 230 - (state.treasurePart % 2) * 24);
      ctx.lineTo(x + 220, 430);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    drawPenguin(905, 440, 0.72);
    drawPenguin(985, 468, 0.55);
    drawTreasureChest(1090, 405);

    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    roundRect(375, 88, 540, 116, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#146e8f";
    ctx.font = "900 30px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${state.level}: ANTARCTICA TREASURE`, 645, 132);
    ctx.font = "900 21px Trebuchet MS";
    ctx.fillText(`SCREEN ${state.treasurePart} OF 3 - FIND PENGUIN TREASURE`, 645, 170);
  }

  function drawPenguin(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#171216";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 30, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.ellipse(0, 10, 19, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(21, -5);
    ctx.lineTo(0, 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(-9, -18, 5, 0, Math.PI * 2);
    ctx.arc(9, -18, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-9, -18, 2, 0, Math.PI * 2);
    ctx.arc(9, -18, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawTreasureChest(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#8a4c2c";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(-52, -24, 104, 64, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.fillRect(-8, -24, 16, 64);
    ctx.fillRect(-52, 0, 104, 12);
    ctx.strokeRect(-8, -24, 16, 64);
    ctx.strokeRect(-52, 0, 104, 12);
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 17px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("PENGUIN", 0, -45);
    ctx.fillText("TREASURE", 0, -28);
    ctx.restore();
  }

  function drawAntarcticaBossPower() {
    ctx.save();
    const y = projectileTreasureY();
    ctx.strokeStyle = "#45a6db";
    ctx.fillStyle = "#9be8ff";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(state.treasurePowerX - 58, y);
    ctx.lineTo(state.treasurePowerX + 34, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(state.treasurePowerX + 34, y);
    ctx.lineTo(state.treasurePowerX + 8, y - 22);
    ctx.lineTo(state.treasurePowerX + 8, y + 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawPhoenixScavengerScene(w, h) {
    ctx.fillStyle = "#9edcff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#e7b85d";
    ctx.fillRect(0, 430, w, h - 430);
    ctx.fillStyle = "#b77938";
    ctx.fillRect(0, 548, w, 82);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 430);
    ctx.lineTo(w, 430);
    ctx.moveTo(0, 548);
    ctx.lineTo(w, 548);
    ctx.moveTo(0, 630);
    ctx.lineTo(w, 630);
    ctx.stroke();

    ctx.fillStyle = "#c77f3d";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    for (let x = -40; x < w; x += 250) {
      ctx.beginPath();
      ctx.moveTo(x, 430);
      ctx.lineTo(x + 110, 270);
      ctx.lineTo(x + 240, 430);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    drawCactus(180, 430, 0.85);
    drawCactus(735, 430, 0.75);
    drawDesertRock(710, 455, 1);
    drawDesertRock(1015, 470, 0.82);
    drawPhoenixPieces();
    drawScavengerList();
  }

  function drawCactus(x, groundY, scale) {
    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#1f9a55";
    ctx.lineWidth = 5;
    roundRect(-16, -118, 32, 118, 14);
    ctx.fill();
    ctx.stroke();
    roundRect(-62, -82, 24, 72, 12);
    ctx.fill();
    ctx.stroke();
    roundRect(40, -98, 24, 84, 12);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-38, -48);
    ctx.lineTo(-16, -48);
    ctx.moveTo(16, -64);
    ctx.lineTo(40, -64);
    ctx.stroke();
    ctx.restore();
  }

  function drawDesertRock(x, y, scale) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#8a5a3d";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 62, 34, -0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawPhoenixPieces() {
    phoenixPieces().forEach((piece) => {
      if (state.scavengerFound.has(piece.id)) return;
      if (piece.boss) {
        drawTreasureStar(piece.x + 78, piece.y + 22, "#ffd84a", "BOSS");
      } else if (piece.hidden) {
        const label = piece.cover === "rock" ? "HIDDEN" : "PEEK";
        drawTreasureStar(piece.x + 42, piece.y - 42, "#fff0b8", label);
      } else {
        drawTreasureStar(piece.x, piece.y - 34, "#ffd84a", "ITEM");
      }
    });
  }

  function drawTreasureStar(x, y, color, label) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const angle = -Math.PI / 2 + i * Math.PI / 5;
      const radius = i % 2 === 0 ? 24 : 11;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.font = "900 9px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(label, 0, 4);
    ctx.restore();
  }

  function drawScavengerList() {
    const pieces = phoenixPieces();
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(370, 78, 545, 150, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#b77938";
    ctx.font = "900 27px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`PHOENIX SCAVENGER HUNT`, 642, 116);
    ctx.textAlign = "left";
    ctx.font = "900 18px Trebuchet MS";
    pieces.forEach((piece, index) => {
      const found = state.scavengerFound.has(piece.id);
      ctx.fillStyle = found ? "#18a66a" : "#171216";
      const extra = piece.boss ? " - behind boss" : piece.hidden ? " - hidden" : "";
      ctx.fillText(`${found ? "YES" : "NO"} ${piece.label}${extra}`, 405, 150 + index * 28);
    });
  }

  function drawCanadaTreasureScene(w, h) {
    ctx.fillStyle = "#bfefff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#e9fbff";
    ctx.fillRect(0, 425, w, h - 425);
    ctx.fillStyle = "#cce7f5";
    ctx.fillRect(0, 548, w, 82);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 425);
    ctx.lineTo(w, 425);
    ctx.moveTo(0, 548);
    ctx.lineTo(w, 548);
    ctx.moveTo(0, 630);
    ctx.lineTo(w, 630);
    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    for (let x = -60; x < w; x += 240) {
      ctx.beginPath();
      ctx.moveTo(x, 425);
      ctx.lineTo(x + 120, 235);
      ctx.lineTo(x + 240, 425);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    drawMapleTree(145, 425, 0.9);
    drawMapleTree(1040, 430, 0.75);
    drawCanadaMapPanel();
  }

  function drawWhiteHouseProtectScene(w, h) {
    ctx.fillStyle = "#dce9f8";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#f7f1e4";
    ctx.fillRect(0, 230, w, 270);
    ctx.fillStyle = "#8a4c2c";
    ctx.fillRect(0, 500, w, h - 500);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.strokeRect(0, 230, w, 270);
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    for (let x = 100; x <= 1040; x += 180) {
      roundRect(x, 260, 82, 122, 6);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 41, 260);
      ctx.lineTo(x + 41, 382);
      ctx.moveTo(x, 321);
      ctx.lineTo(x + 82, 321);
      ctx.stroke();
    }
    ctx.fillStyle = "#2e5fa3";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(500, 360, 280, 78, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.fillRect(520, 382, 238, 12);
    ctx.fillStyle = "#fff";
    ctx.fillRect(520, 398, 238, 12);
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 20px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("WHITE HOUSE", 640, 333);

    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    roundRect(370, 84, 560, 122, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#2e5fa3";
    ctx.font = "900 29px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${state.level}: WASHINGTON D.C.`, 650, 125);
    ctx.fillStyle = "#d91f2e";
    ctx.font = "900 21px Trebuchet MS";
    ctx.fillText(`PROTECT PRESIDENT TRUMP - TIME ${protectTimeText()}`, 650, 160);
    ctx.fillStyle = "#171216";
    ctx.font = "900 17px Trebuchet MS";
    ctx.fillText("Keep the dangers from reaching him.", 650, 186);
  }

  function drawIsraelWallFightScene(w, h) {
    ctx.fillStyle = "#9edcff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#dfc18d";
    ctx.fillRect(0, 455, w, h - 455);
    ctx.fillStyle = "#b77938";
    ctx.fillRect(0, 548, w, 82);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 455);
    ctx.lineTo(w, 455);
    ctx.moveTo(0, 548);
    ctx.lineTo(w, 548);
    ctx.moveTo(0, 630);
    ctx.lineTo(w, 630);
    ctx.stroke();

    ctx.fillStyle = "#c9aa78";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    for (let y = 205; y <= 435; y += 48) {
      for (let x = 170; x <= 1020; x += 92) {
        const offset = (Math.floor(y / 48) % 2) * 46;
        roundRect(x + offset, y, 84, 42, 4);
        ctx.fill();
        ctx.stroke();
      }
    }
    ctx.fillStyle = "#1f7f45";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(410, 342, 94, 114, 8);
    ctx.fill();
    ctx.stroke();
    roundRect(770, 342, 94, 114, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    roundRect(345, 70, 590, 128, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#2f6f52";
    ctx.font = "900 30px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${state.level}: ISRAEL WALL FIGHT`, 640, 112);
    ctx.fillStyle = "#171216";
    ctx.font = "900 19px Trebuchet MS";
    ctx.fillText(`TIMER ${israelTimeText()} - WIN BY DEFEATING OR HAVING MORE HEARTS`, 640, 150);
    ctx.fillStyle = "#d91f2e";
    ctx.font = "900 17px Trebuchet MS";
    ctx.fillText("GREEN OPENINGS TELEPORT YOU THROUGH THE WALL", 640, 178);
  }

  function drawIsraelVillain() {
    ctx.save();
    ctx.translate(state.israelVillainX, state.israelVillainY);
    ctx.scale(0.48, 0.48);
    if (currentTarget() === "evil") {
      drawYappingHero();
    } else if (currentTarget() === "ice") {
      drawIceBoss(0, 0);
    } else {
      drawMayorHero();
    }
    ctx.restore();
  }

  function drawPresidentTrump() {
    const position = presidentPosition();
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.fillStyle = "#1f3f8f";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(-25, -62, 50, 72, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.lineTo(13, -14);
    ctx.lineTo(0, 16);
    ctx.lineTo(-13, -14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f2c99d";
    ctx.beginPath();
    ctx.arc(0, -92, 31, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f0b84c";
    ctx.beginPath();
    ctx.ellipse(0, -118, 35, 14, -0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-10, -95, 3.5, 0, Math.PI * 2);
    ctx.arc(10, -95, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -83, 10, 0.1, Math.PI - 0.1);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    roundRect(-77, -168, 154, 38, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.font = "900 14px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("PROTECT ME!", 0, -144);
    ctx.restore();
  }

  function drawProtectHazards() {
    state.protectHazards.forEach((hazard) => {
      ctx.save();
      ctx.translate(hazard.x, hazard.y);
      ctx.strokeStyle = "#171216";
      ctx.fillStyle = hazard.color;
      ctx.lineWidth = 5;
      if (hazard.label === "rolling chair") {
        roundRect(-34, -22, 68, 44, 8);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(-22, 30, 8, 0, Math.PI * 2);
        ctx.arc(22, 30, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (hazard.label === "falling picture frame") {
        roundRect(-38, -30, 76, 60, 4);
        ctx.fill();
        ctx.stroke();
        ctx.strokeRect(-22, -16, 44, 32);
      } else if (hazard.label === "flying paper stack") {
        for (let i = 0; i < 3; i += 1) {
          roundRect(-34 + i * 12, -22 - i * 8, 58, 38, 4);
          ctx.fill();
          ctx.stroke();
        }
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#fffef7";
        ctx.font = "900 18px Trebuchet MS";
        ctx.textAlign = "center";
        ctx.fillText("!", 0, 7);
      }
      ctx.restore();
    });
  }

  function drawMapleTree(x, groundY, scale) {
    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#8a4c2c";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(-18, -95, 36, 95, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    [-48, -18, 18, 48, 0].forEach((lx, index) => {
      ctx.beginPath();
      ctx.ellipse(lx, -118 - (index % 2) * 18, 34, 45, lx / 90, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawCanadaMapPanel() {
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    roundRect(380, 76, 530, 150, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.font = "900 29px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${state.level}: CANADA MAP`, 645, 116);
    ctx.font = "900 18px Trebuchet MS";
    ctx.fillStyle = "#171216";
    ctx.fillText(canadaProgressText().toUpperCase(), 645, 148);
    drawMapFragment(470, 180, state.scavengerFound.has("pineClue") || state.scavengerFound.has("mapCorner"));
    drawMapFragment(590, 180, state.scavengerFound.has("lakeClue") || state.scavengerFound.has("xClue"));
    drawMapFragment(710, 180, state.level === 16 && state.scavengerBossReady);
    if (state.level === 16 && state.scavengerBossReady) {
      ctx.strokeStyle = "#d91f2e";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(810, 157);
      ctx.lineTo(858, 205);
      ctx.moveTo(858, 157);
      ctx.lineTo(810, 205);
      ctx.stroke();
      drawTreasureStar(835, 180, "#ffd84a", "STAR");
    }
  }

  function drawMapFragment(x, y, active) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = active ? "#f0d49a" : "#c8d0d8";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-44, -25);
    ctx.lineTo(42, -18);
    ctx.lineTo(36, 28);
    ctx.lineTo(-40, 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = active ? "#8a4c2c" : "#6f737a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-22, 6);
    ctx.quadraticCurveTo(2, -18, 24, 10);
    ctx.stroke();
    ctx.restore();
  }

  function drawCanadaGuardsAndTreasure() {
    canadaMapPieces().forEach((piece) => {
      if (piece.boss) {
        if (!state.scavengerBossReady) return;
        drawTreasureStar(piece.x + 75, piece.y + 40, "#ffd84a", "X");
        drawCurrentChosenBoss(piece.x, piece.y);
        return;
      }
      if (state.scavengerFound.has(piece.id)) {
        drawTreasureStar(piece.x, piece.y - 48, "#f0d49a", "MAP");
        return;
      }
      if (piece.guard === "snow carrot") {
        drawSnowCarrot(piece.x, piece.y);
      } else {
        drawIceMonster(piece.x, piece.y);
      }
      const hits = state.canadaHits[piece.id] || 0;
      ctx.fillStyle = "#171216";
      ctx.font = "900 15px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(`${piece.label}: ${hits}/2 hits`, piece.x, piece.y - 82);
    });
  }

  function drawCurrentChosenBoss(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(0.55, 0.55);
    if (currentTarget() === "evil") {
      drawYappingHero();
    } else if (currentTarget() === "ice") {
      drawIceBoss(0, 0);
    } else {
      drawMayorHero();
    }
    ctx.restore();
  }

  function drawSnowCarrot(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#f18319";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -58);
    ctx.lineTo(42, 26);
    ctx.lineTo(-34, 24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#1f9a55";
    [-18, 0, 18].forEach((lx) => {
      ctx.beginPath();
      ctx.ellipse(lx, -66, 10, 25, lx / 35, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-10, -24, 4, 0, Math.PI * 2);
    ctx.arc(10, -24, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, -8, 12, 0.15, Math.PI - 0.15);
    ctx.stroke();
    ctx.restore();
  }

  function drawIceMonster(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#9be8ff";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-42, 28);
    ctx.lineTo(-55, -18);
    ctx.lineTo(-18, -64);
    ctx.lineTo(22, -58);
    ctx.lineTo(58, -12);
    ctx.lineTo(40, 32);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-15, -22, 5, 0, Math.PI * 2);
    ctx.arc(17, -22, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-18, 3);
    ctx.lineTo(20, 0);
    ctx.stroke();
    ctx.restore();
  }

  function drawRussiaBackground() {
    ctx.fillStyle = "#dbe5ef";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    [[105, 455, 185, 92], [330, 455, 150, 72], [980, 455, 210, 96]].forEach(([x, y, w, h]) => {
      roundRect(x, y - h, w, h, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#d91f2e";
      ctx.beginPath();
      ctx.moveTo(x - 6, y - h);
      ctx.lineTo(x + w / 2, y - h - 42);
      ctx.lineTo(x + w + 6, y - h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#dbe5ef";
    });
    ctx.fillStyle = "#5b5b63";
    ctx.strokeStyle = "#171216";
    [[560, 455, 130, 72], [720, 455, 150, 88]].forEach(([x, y, w, h]) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + w / 2, y - h * 1.5, x + w, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#171216";
      roundRect(x + w * 0.38, y - 38, w * 0.24, 38, 6);
      ctx.fill();
      ctx.fillStyle = "#5b5b63";
    });
  }

  function drawChinaBackground() {
    ctx.save();
    ctx.fillStyle = "#cf3e32";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    [135, 1000].forEach((x) => {
      roundRect(x, 255, 88, 145, 8);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x - 18, 255);
      ctx.lineTo(x + 44, 210);
      ctx.lineTo(x + 106, 255);
      ctx.closePath();
      ctx.fillStyle = "#f0b84c";
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#cf3e32";
      ctx.fillRect(x + 28, 400, 32, 62);
      ctx.strokeRect(x + 28, 400, 32, 62);
    });
    ctx.strokeStyle = "#8b6a44";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(250, 410);
    ctx.quadraticCurveTo(405, 345, 560, 390);
    ctx.quadraticCurveTo(720, 440, 920, 360);
    ctx.stroke();
    ctx.lineWidth = 5;
    for (let x = 270; x <= 900; x += 78) {
      ctx.fillStyle = "#c9a15a";
      roundRect(x, 355 + Math.sin(x / 65) * 26, 46, 54, 5);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#d91f2e";
    ctx.strokeStyle = "#171216";
    [[450, 212], [610, 230], [780, 205]].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.moveTo(x, y - 30);
      ctx.lineTo(x, y + 34);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x, y + 48, 24, 32, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawAfricaSavannaBackground(w) {
    ctx.save();
    ctx.fillStyle = "#f5b84c";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(1070, 145, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#b88b2e";
    for (let x = -30; x < w; x += 190) {
      ctx.beginPath();
      ctx.moveTo(x, 455);
      ctx.quadraticCurveTo(x + 92, 380, x + 190, 455);
      ctx.closePath();
      ctx.fill();
    }
    drawAcaciaTree(130, 455, 0.95);
    drawAcaciaTree(1010, 455, 0.82);
    drawTallGrass(300, 520);
    drawTallGrass(760, 525);
    ctx.restore();
  }

  function drawAcaciaTree(x, groundY, scale) {
    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#70481f";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-16, 0);
    ctx.lineTo(6, -142);
    ctx.lineTo(28, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#3f7f35";
    [[-62, -160, 70, 34], [0, -185, 92, 40], [76, -154, 72, 34]].forEach(([cx, cy, rx, ry]) => {
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawTallGrass(x, y) {
    ctx.save();
    ctx.strokeStyle = "#49752e";
    ctx.lineWidth = 5;
    for (let i = 0; i < 12; i += 1) {
      ctx.beginPath();
      ctx.moveTo(x + i * 15, y);
      ctx.lineTo(x + i * 15 + (i % 2 ? 14 : -12), y - 50 - (i % 3) * 9);
      ctx.stroke();
    }
    ctx.restore();
  }

  function placeTheme(place) {
    if (place === "Antarctica" || place === "Iceland") return { sky: "#bfefff", ground: "#f5fbff", road: "#cce7f5" };
    if (place === "Russia") return { sky: "#bcd8ff", ground: "#dbe5ef", road: "#6f737a" };
    if (place === "China") return { sky: "#ffd6b0", ground: "#78b56a", road: "#b77938" };
    if (place === "Africa Savanna") return { sky: "#ffcf7a", ground: "#d9b94b", road: "#8a6a28" };
    if (place === "Paris" || place === "Rome" || place === "London") return { sky: "#bcd8ff", ground: "#78b56a", road: "#b68a58" };
    if (place === "New York" || place === "Tokyo" || place === "Robot City") return { sky: "#9edcff", ground: "#8c9aa3", road: "#4a4d56" };
    if (place === "Egypt" || place === "Dubai" || place === "Grand Canyon") return { sky: "#9edcff", ground: "#e7b85d", road: "#b77938" };
    if (place === "Phoenix") return { sky: "#9edcff", ground: "#e7b85d", road: "#b77938" };
    if (place === "Hawaii" || place === "Florida" || place === "Candy Coast") return { sky: "#7edbff", ground: "#66c36f", road: "#e5c16c" };
    if (place === "Moon Base" || place === "Space Museum") return { sky: "#18152b", ground: "#b7bcc8", road: "#7a8191" };
    if (place === "Volcano Island") return { sky: "#ff9d6c", ground: "#5b3932", road: "#2d2528" };
    return { sky: "#86d6ff", ground: "#3fa65c", road: "#7a4a24" };
  }

  function drawTravelLandmarks(place, w, h) {
    if (place === "New York" || place === "Tokyo" || place === "Robot City") {
      for (let x = 35; x < w; x += 140) {
        ctx.fillStyle = ["#5e6b78", "#7c8791", "#4d5662"][Math.floor(x / 140) % 3];
        roundRect(x, 210 + (x % 4) * 22, 82, 245, 4);
        ctx.fill();
        ctx.stroke();
      }
      return;
    }
    if (place === "Paris") {
      drawEiffelTower();
      return;
    }
    if (place === "Antarctica" || place === "Iceland") {
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      for (let x = 70; x < w; x += 210) {
        ctx.beginPath();
        ctx.moveTo(x, 455);
        ctx.lineTo(x + 82, 290);
        ctx.lineTo(x + 164, 455);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      return;
    }
    if (place === "Egypt") {
      ctx.fillStyle = "#d99b42";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(95, 455);
      ctx.lineTo(235, 245);
      ctx.lineTo(375, 455);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      return;
    }
    if (place === "Russia") {
      drawRussiaBackground();
      return;
    }
    if (place === "China") {
      drawChinaBackground();
      return;
    }
    if (place === "Africa Savanna") {
      drawAfricaSavannaBackground(w);
      return;
    }
    for (let x = 35; x < w; x += 170) {
      drawForestTree(x, 455, 0.75 + (x % 3) * 0.1);
    }
  }

  function drawTravelBoard(place) {
    ctx.fillStyle = "#2f6f52";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    roundRect(390, 205, 500, 160, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "900 34px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${state.level}: ${place.toUpperCase()}`, 640, 270);
    ctx.font = "900 25px Trebuchet MS";
    ctx.fillText(boardNote(), 640, 318);
  }

  function drawEiffelTower() {
    ctx.save();
    ctx.translate(128, 118);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#6f737a";
    ctx.lineWidth = 8;
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(28, 337);
    ctx.lineTo(122, 30);
    ctx.lineTo(216, 337);
    ctx.lineTo(168, 337);
    ctx.lineTo(122, 190);
    ctx.lineTo(76, 337);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#fffef7";
    ctx.lineWidth = 5;
    [82, 142, 205, 268].forEach((y) => {
      ctx.beginPath();
      ctx.moveTo(62, y);
      ctx.lineTo(182, y);
      ctx.stroke();
    });
    ctx.beginPath();
    ctx.moveTo(78, 305);
    ctx.quadraticCurveTo(122, 250, 166, 305);
    ctx.stroke();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(122, 30);
    ctx.lineTo(122, -34);
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.font = "900 24px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("PARIS", 122, 374);
    ctx.restore();

    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    for (let x = 505; x <= 1120; x += 150) {
      roundRect(x, 365, 92, 90, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#bcd8ff";
      for (let wx = x + 14; wx <= x + 58; wx += 22) {
        ctx.fillRect(wx, 385, 12, 16);
        ctx.fillRect(wx, 417, 12, 16);
      }
      ctx.fillStyle = "#fffef7";
    }
  }

  function drawForestScene(w, h) {
    ctx.fillStyle = "#86d6ff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#3fa65c";
    ctx.fillRect(0, 455, w, 265);
    ctx.fillStyle = "#7a4a24";
    ctx.fillRect(0, 548, w, 82);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 548);
    ctx.lineTo(w, 548);
    ctx.moveTo(0, 630);
    ctx.lineTo(w, 630);
    ctx.stroke();

    for (let x = 35; x < w; x += 150) {
      drawForestTree(x, 455, 0.9 + (x % 3) * 0.12);
    }
    for (let x = 100; x < w; x += 230) {
      drawForestTree(x, 505, 0.65);
    }

    ctx.fillStyle = "#2f6f52";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    roundRect(390, 205, 480, 160, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "900 34px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`FOREST ${state.level}`, 630, 270);
    ctx.font = "900 25px Trebuchet MS";
    ctx.fillText(boardNote(), 630, 318);

    ctx.fillStyle = "#5f3a1b";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(545, 460, 170, 80, 18);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.arc(680, 500, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  function drawForestTree(x, groundY, scale) {
    ctx.save();
    ctx.translate(x, groundY);
    ctx.scale(scale, scale);
    ctx.fillStyle = "#6b3f1f";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(-16, -120, 32, 120, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#1f7f45";
    ctx.beginPath();
    ctx.arc(-34, -132, 44, 0, Math.PI * 2);
    ctx.arc(14, -158, 54, 0, Math.PI * 2);
    ctx.arc(58, -126, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawPrizeDrops() {
    state.prizeDrops.forEach((drop) => {
      ctx.save();
      ctx.translate(drop.x, drop.y);
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      if (drop.type === "donut") {
        ctx.fillStyle = "#ffb74d";
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#3fa65c";
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#ff5fa8";
        for (let sprinkle = 0; sprinkle < 6; sprinkle += 1) {
          ctx.fillRect(-14 + sprinkle * 5, -10 + (sprinkle % 3) * 8, 7, 3);
        }
      } else if (drop.type === "bow") {
        ctx.strokeStyle = "#8a4c2c";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.arc(-8, 0, 24, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
        ctx.strokeStyle = "#171216";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-8, -24);
        ctx.lineTo(-8, 24);
        ctx.moveTo(-30, 0);
        ctx.lineTo(30, 0);
        ctx.stroke();
      } else if (drop.type === "armor") {
        ctx.fillStyle = "#b8c4ce";
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(26, -12);
        ctx.lineTo(18, 24);
        ctx.lineTo(0, 32);
        ctx.lineTo(-18, 24);
        ctx.lineTo(-26, -12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillStyle = "#49d9ff";
        ctx.beginPath();
        ctx.moveTo(0, -32);
        ctx.quadraticCurveTo(32, -18, 24, 22);
        ctx.quadraticCurveTo(0, 38, -24, 22);
        ctx.quadraticCurveTo(-32, -18, 0, -32);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = "#171216";
      ctx.font = "900 12px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("PICK", 0, 48);
      ctx.restore();
    });
  }

  function drawPalaceChargeScene(w, h) {
    const egypt = isEgyptianPalaceLevel();
    ctx.fillStyle = egypt ? "#f3cc73" : "#c8e3ff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = egypt ? "#e6b85c" : "#f6e3bd";
    ctx.fillRect(0, 180, w, 320);
    ctx.fillStyle = egypt ? "#b77938" : "#8a4c2c";
    ctx.fillRect(0, 500, w, h - 500);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.strokeRect(0, 180, w, 320);

    if (egypt) {
      drawEgyptianPalaceDetails(w);
    } else {
      drawIranPalaceDetails(w);
    }

    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    roundRect(360, 70, 560, 126, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = egypt ? "#b77938" : "#8a4c2c";
    ctx.font = "900 30px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${state.level}: ${egypt ? "EGYPTIAN PALACE" : "IRAN PALACE"}`, 640, 112);
    ctx.fillStyle = "#171216";
    ctx.font = "900 20px Trebuchet MS";
    ctx.fillText("RUN OVER CHARGE-UPS TO GET THEM", 640, 150);
    ctx.fillStyle = "#18a66a";
    ctx.font = "900 18px Trebuchet MS";
    ctx.fillText(`${state.palaceChargesCollected.size} CHARGE-UP${state.palaceChargesCollected.size === 1 ? "" : "S"} COLLECTED`, 640, 176);
  }

  function drawIranPalaceDetails(w) {
    ctx.fillStyle = "#6fb0d8";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    for (let x = 80; x < w; x += 210) {
      roundRect(x, 245, 86, 190, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#f6e3bd";
      ctx.beginPath();
      ctx.arc(x + 43, 245, 43, Math.PI, 0);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#6fb0d8";
    }
    ctx.fillStyle = "#2e91de";
    ctx.beginPath();
    ctx.arc(640, 260, 96, Math.PI, 0);
    ctx.lineTo(736, 430);
    ctx.lineTo(544, 430);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 18px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("PALACE", 640, 340);
  }

  function drawEgyptianPalaceDetails(w) {
    ctx.fillStyle = "#d99b42";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    for (let x = 60; x < w; x += 180) {
      roundRect(x, 225, 62, 230, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#2e91de";
      ctx.fillRect(x + 8, 255, 46, 22);
      ctx.fillRect(x + 8, 330, 46, 22);
      ctx.fillStyle = "#d99b42";
    }
    ctx.fillStyle = "#c98738";
    ctx.beginPath();
    ctx.moveTo(455, 455);
    ctx.lineTo(640, 230);
    ctx.lineTo(825, 455);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.font = "900 25px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("EGYPT", 640, 374);
  }

  function drawPalaceChargeUps() {
    palaceChargeUps().forEach((charge) => {
      if (state.palaceChargesCollected.has(charge.id)) return;
      ctx.save();
      ctx.translate(charge.x, charge.y);
      ctx.fillStyle = charge.color;
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      ctx.beginPath();
      for (let i = 0; i < 10; i += 1) {
        const angle = -Math.PI / 2 + i * Math.PI / 5;
        const radius = i % 2 === 0 ? 30 : 14;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fffef7";
      ctx.font = "900 15px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("CHARGE", 0, 5);
      ctx.fillStyle = "#171216";
      ctx.font = "900 11px Trebuchet MS";
      ctx.fillText(charge.label.toUpperCase(), 0, 48);
      ctx.restore();
    });
  }

  function drawBossLevelRoom(w, h) {
    if (state.level === 7) {
      drawArtRoom(w, h);
      return;
    }
    if (state.level === 8) {
      drawLibraryRoom(w, h);
      return;
    }
    if (state.level === 9) {
      drawParkingLot(w, h);
      return;
    }
    if (state.level >= 10) {
      drawPrincipalOffice(w, h);
      return;
    }
    ctx.fillStyle = "#8ed8ff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fffef7";
    for (let x = 80; x <= 1080; x += 260) {
      ctx.beginPath();
      ctx.arc(x, 120, 44, 0, Math.PI * 2);
      ctx.arc(x + 52, 108, 58, 0, Math.PI * 2);
      ctx.arc(x + 108, 122, 42, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#8ccf8b";
    ctx.fillRect(0, 500, w, 220);
    ctx.fillStyle = "#d6a35a";
    ctx.fillRect(0, 540, w, 72);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 540);
    ctx.lineTo(w, 540);
    ctx.moveTo(0, 612);
    ctx.lineTo(w, 612);
    ctx.stroke();

    ctx.fillStyle = "#f7edd0";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    roundRect(70, 295, 260, 205, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.beginPath();
    ctx.moveTo(44, 302);
    ctx.lineTo(200, 205);
    ctx.lineTo(356, 302);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    for (let x = 115; x <= 255; x += 90) {
      roundRect(x, 338, 54, 58, 5);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#2f6f52";
    roundRect(420, 215, 420, 150, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "900 36px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(boardTitle(), 630, 276);
    ctx.font = "900 28px Trebuchet MS";
    ctx.fillText(boardNote(), 630, 322);
    drawPaperOutsideDetails();
  }

  function drawRoomBoard() {
    ctx.fillStyle = "#2f6f52";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    roundRect(420, 215, 420, 150, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "900 34px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(boardTitle(), 630, 276);
    ctx.font = "900 27px Trebuchet MS";
    ctx.fillText(boardNote(), 630, 322);
  }

  function drawArtRoom(w, h) {
    ctx.fillStyle = "#fff4d6";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#e3c38a";
    ctx.fillRect(0, 500, w, 220);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    for (let x = 90; x <= 1040; x += 210) {
      ctx.fillStyle = ["#ef4fa3", "#2e91de", "#18a66a", "#ffd84a"][Math.floor(x / 210) % 4];
      roundRect(x, 250, 96, 130, 8);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#b86a32";
    roundRect(120, 430, 220, 54, 8);
    ctx.fill();
    ctx.stroke();
    drawRoomBoard();
  }

  function drawLibraryRoom(w, h) {
    ctx.fillStyle = "#f1e0c3";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#8a4c2c";
    ctx.fillRect(0, 500, w, 220);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    for (let x = 70; x <= 1080; x += 220) {
      ctx.fillStyle = "#6a4b2b";
      roundRect(x, 195, 140, 290, 8);
      ctx.fill();
      ctx.stroke();
      for (let y = 235; y <= 420; y += 58) {
        ctx.fillStyle = "#ffd84a";
        ctx.fillRect(x + 18, y, 24, 42);
        ctx.fillStyle = "#2e91de";
        ctx.fillRect(x + 52, y, 24, 42);
        ctx.fillStyle = "#d91f2e";
        ctx.fillRect(x + 86, y, 24, 42);
      }
    }
    drawRoomBoard();
  }

  function drawParkingLot(w, h) {
    ctx.fillStyle = "#8ed8ff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#525b63";
    ctx.fillRect(0, 300, w, 420);
    ctx.strokeStyle = "#ffd84a";
    ctx.lineWidth = 8;
    for (let x = 70; x <= 1130; x += 180) {
      ctx.beginPath();
      ctx.moveTo(x, 520);
      ctx.lineTo(x + 92, 520);
      ctx.stroke();
    }
    drawRoomBoard();
  }

  function drawPrincipalOffice(w, h) {
    ctx.fillStyle = "#c9d7e8";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#8b5a3a";
    ctx.fillRect(0, 510, w, 210);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.fillStyle = "#fffef7";
    roundRect(90, 230, 180, 120, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.font = "900 24px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("RULES", 180, 300);
    ctx.fillStyle = "#7c3f18";
    roundRect(450, 438, 360, 74, 8);
    ctx.fill();
    ctx.stroke();
    drawRoomBoard();
  }

  function drawCafeteriaTables() {
    ctx.fillStyle = "#c46a34";
    for (let x = 110; x <= 1010; x += 300) {
      roundRect(x, 390, 180, 46, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#8a4c2c";
      ctx.fillRect(x + 18, 436, 22, 64);
      ctx.fillRect(x + 140, 436, 22, 64);
      ctx.strokeRect(x + 18, 436, 22, 64);
      ctx.strokeRect(x + 140, 436, 22, 64);
      ctx.fillStyle = "#c46a34";
    }
  }

  function boardTitle() {
    return `LEVEL ${state.level}: ${(travelStops[state.level - 1] || "WORLD TRIP").toUpperCase()}`;
  }

  function boardNote() {
    if (state.level <= 2) return "FLORIDA BEACH FIGHT!";
    if (state.level <= 4) return "STATUE MAZE ESCAPE!";
    if (state.level <= 6) return "PENGUIN TREASURE!";
    if (state.level <= 8) return "EIFFEL TOWER FIGHT!";
    if (state.level <= 10) return "DESERT SCAVENGER HUNT!";
    if (state.level <= 12) return "RUSSIA CAVE FIGHT!";
    if (state.level <= 14) return "CHINA SHOOTING POWERS!";
    if (state.level <= 16) return "CANADA MAP TREASURE!";
    if (state.level <= 18) return "ANIMAL POWERS RETURN!";
    if (state.level <= 20) return "WHITE HOUSE PROTECTION!";
    if (state.level <= 24) return "PALACE CHARGE-UPS!";
    if (state.level <= 26) return "WALL ESCAPE FIGHT!";
    if (state.level <= 30) return "EGYPTIAN CHARGE-UPS!";
    if (state.level >= 16) return "BOSSES DROP PRIZES!";
    return "MAYER OR YONATAN!";
  }

  function drawPaperOutsideDetails() {
    ctx.save();
    ctx.strokeStyle = "#c8d0d8";
    ctx.lineWidth = 4;
    for (let x = 110; x <= 1080; x += 160) {
      ctx.beginPath();
      ctx.moveTo(x, 390);
      ctx.lineTo(x + 64, 365);
      ctx.lineTo(x + 126, 390);
      ctx.stroke();
    }
    ctx.fillStyle = "#fffef7";
    for (let x = 165; x <= 1035; x += 210) {
      ctx.save();
      ctx.translate(x, 475);
      ctx.rotate(-0.12);
      roundRect(-42, -28, 84, 56, 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  function drawGymLines() {
    ctx.save();
    ctx.strokeStyle = "#f4c84a";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(625, 485, 105, 0, Math.PI * 2);
    ctx.moveTo(0, 485);
    ctx.lineTo(canvas.width, 485);
    ctx.moveTo(625, 365);
    ctx.lineTo(625, 555);
    ctx.stroke();
    ctx.strokeStyle = "#2e7bc7";
    ctx.lineWidth = 5;
    ctx.strokeRect(95, 380, 175, 140);
    ctx.strokeRect(980, 380, 175, 140);
    ctx.fillStyle = "#171216";
    ctx.font = "900 22px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("GYM", 625, 525);
    ctx.restore();
  }

  function drawHealthBars() {
    const hero = heroes[state.heroId];
    drawHeartBar(50, 44, 430, hero.name.toUpperCase(), state.heroHp, currentHeroMaxHp(), hero.accent);
    drawHeartBar(800, 44, 430, currentBossName().toUpperCase(), currentBossHp(), currentBossMaxHp(), "#d91f2e");
    drawLabel(state.started ? `TIME: ${levelTimerText()}` : `TIMER: ${levelTimerDuration() / 60000}:00`, 510, 44, "#fffef7", 260);
    drawLabel(isWhiteHouseProtectLevel() ? `PROTECTING: ${currentBossName().toUpperCase()}` : `FIGHTING: ${currentBossName().toUpperCase()}`, 365, 122, "#ffd84a", 550);
  }

  function drawHeartBar(x, y, width, label, hp, maxHp, color) {
    ctx.save();
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    roundRect(x, y, width, 78, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.font = "900 22px Trebuchet MS";
    ctx.textAlign = "left";
    ctx.fillText(label, x + 16, y + 29);
    drawCanvasHearts(x + 18, y + 63, hp, maxHp, color);
    ctx.restore();
  }

  function drawCanvasHearts(x, y, hp, maxHp, color) {
    const total = Math.ceil(maxHp);
    const size = total > 18 ? 14 : total > 13 ? 18 : total > 10 ? 22 : 30;
    const gap = total > 18 ? 2 : total > 13 ? 3 : total > 10 ? 4 : 8;
    for (let index = 0; index < total; index += 1) {
      const heartX = x + index * (size + gap) + size * 0.5;
      const fillAmount = clamp(hp - index, 0, 1);
      ctx.save();
      ctx.lineWidth = Math.max(2, size * 0.1);
      ctx.strokeStyle = "#171216";
      ctx.fillStyle = "#f1dada";
      drawHeartPath(heartX, y - size * 0.35, size * 0.52);
      ctx.fill();
      ctx.stroke();
      if (fillAmount > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(heartX - size * 0.8, y - size * 1.1, size * 1.6 * fillAmount, size * 1.7);
        ctx.clip();
        ctx.fillStyle = color;
        drawHeartPath(heartX, y - size * 0.35, size * 0.52);
        ctx.fill();
        ctx.restore();
      }
      drawHeartPath(heartX, y - size * 0.35, size * 0.52);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawHeartPath(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size);
    ctx.bezierCurveTo(x - size * 1.45, y, x - size, y - size, x, y - size * 0.45);
    ctx.bezierCurveTo(x + size, y - size, x + size * 1.45, y, x, y + size);
    ctx.closePath();
  }

  function drawHero(x, y) {
    ctx.save();
    ctx.translate(x, y);
    if (Date.now() < state.jumpingUntil) {
      ctx.translate(0, -42);
    }
    if (Date.now() < state.hiddenUntil) {
      ctx.globalAlpha = 0.38;
    }
    ctx.scale(0.9, 0.9);
    if (state.heroId === "tats") drawTatsHero();
    else if (state.heroId === "fary") drawFaryHero();
    else if (state.heroId === "apple") drawAppleHero();
    else if (state.heroId === "freddy") drawFreddyHero();
    else if (state.heroId === "benji") drawBenjiHero();
    else if (state.heroId === "frost") drawFrostHero();
    else if (state.heroId === "ness") drawNessHero();
    else if (state.heroId === "crayon") drawCrayonHero();
    else if (state.heroId === "hoodie") drawHoodieHero();
    else if (state.heroId === "mayer") drawMayorHero();
    else if (state.heroId === "yonatan") drawYappingHero();
    ctx.restore();
  }

  function setupHeroLine(color, width = 9) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  function drawHeroHead(x, y, r, color) {
    ctx.save();
    setupHeroLine(color, 7);
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

  function drawEvilHeroHead(x, y, r, color, mustache = false) {
    ctx.save();
    setupHeroLine(color, 7);
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
    if (mustache) {
      ctx.strokeStyle = "#5b3018";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(x - 3, y + 8);
      ctx.bezierCurveTo(x - 14, y, x - 27, y + 6, x - 32, y + 13);
      ctx.moveTo(x + 3, y + 8);
      ctx.bezierCurveTo(x + 14, y + 6, x + 25, y + 14, x + 31, y + 6);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawHeroArms(color, bulky = false) {
    setupHeroLine(color, bulky ? 14 : 9);
    ctx.beginPath();
    ctx.moveTo(0, -70);
    ctx.lineTo(-38, -42);
    ctx.moveTo(0, -70);
    ctx.lineTo(40, -42);
    ctx.stroke();
    if (bulky) {
      ctx.fillStyle = "rgba(120,201,255,0.2)";
      ctx.beginPath();
      ctx.ellipse(-52, -45, 24, 19, 0.2, 0, Math.PI * 2);
      ctx.ellipse(52, -45, 24, 19, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  function drawStickBody(color) {
    setupHeroLine(color, 9);
    ctx.beginPath();
    ctx.moveTo(0, -88);
    ctx.lineTo(0, -22);
    ctx.moveTo(0, -22);
    ctx.lineTo(-24, 44);
    ctx.moveTo(0, -22);
    ctx.lineTo(28, 44);
    ctx.stroke();
  }

  function drawCloudMuscleShape(x, y, color, fill) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = color;
    ctx.fillStyle = fill;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(-22, 0, 22, 0, Math.PI * 2);
    ctx.arc(2, -16, 24, 0, Math.PI * 2);
    ctx.arc(30, 2, 22, 0, Math.PI * 2);
    ctx.arc(5, 14, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawAnimalLegs(color) {
    setupHeroLine(color, 10);
    ctx.beginPath();
    ctx.moveTo(-22, -18);
    ctx.lineTo(-38, 44);
    ctx.moveTo(22, -18);
    ctx.lineTo(38, 44);
    ctx.stroke();
  }

  function drawAnimalEyes() {
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-11, -113, 4, 0, Math.PI * 2);
    ctx.arc(11, -113, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawAnimalBadge(label, fill = "#fffef7") {
    ctx.fillStyle = fill;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, -55, 18, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.font = "900 15px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(label, 0, -50);
  }

  function drawElephantHero() {
    const color = "#3f8fd2";
    setupHeroLine(color, 8);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -55, 44, 54, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -116, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-38, -114, 24, 32, -0.25, 0, Math.PI * 2);
    ctx.ellipse(38, -114, 24, 32, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#78c9ff";
    ctx.beginPath();
    ctx.ellipse(-39, -114, 13, 20, -0.25, 0, Math.PI * 2);
    ctx.ellipse(39, -114, 13, 20, 0.25, 0, Math.PI * 2);
    ctx.fill();
    drawAnimalEyes();
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(0, -94);
    ctx.quadraticCurveTo(8, -55, -16, -34);
    ctx.quadraticCurveTo(-27, -24, -12, -17);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.moveTo(-9, -96);
    ctx.lineTo(-22, -78);
    ctx.lineTo(-11, -82);
    ctx.closePath();
    ctx.moveTo(9, -96);
    ctx.lineTo(22, -78);
    ctx.lineTo(11, -82);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    drawHeroArms(color, true);
    drawAnimalLegs(color);
    drawAnimalBadge("T", "#78c9ff");
  }

  function drawPurpleParrotHero() {
    const color = "#8542d8";
    setupHeroLine(color, 7);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -58, 34, 56, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#b26dff";
    ctx.beginPath();
    ctx.ellipse(-42, -62, 26, 58, -0.55, 0, Math.PI * 2);
    ctx.ellipse(42, -62, 26, 58, 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#ff89c6";
    ctx.lineWidth = 4;
    [-48, -38, 38, 48].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, -95);
      ctx.quadraticCurveTo(x * 0.9, -55, x * 0.72, -16);
      ctx.stroke();
    });
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, -116, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawAnimalEyes();
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.moveTo(0, -106);
    ctx.lineTo(30, -99);
    ctx.lineTo(0, -88);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ff89c6";
    ctx.beginPath();
    ctx.moveTo(-13, -18);
    ctx.lineTo(0, 24);
    ctx.lineTo(13, -18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    drawAnimalLegs(color);
    drawAnimalBadge("MF", "#ff89c6");
  }

  function drawCheetahHero() {
    const color = "#f5b62a";
    setupHeroLine(color, 8);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -56, 38, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -116, 27, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-18, -140, 10, 0, Math.PI * 2);
    ctx.arc(18, -140, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawAnimalEyes();
    ctx.fillStyle = "#171216";
    [
      [-22, -84], [-4, -72], [18, -88], [-16, -52], [8, -40], [25, -62],
      [-13, -126], [13, -126], [-30, -32], [31, -24]
    ].forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.ellipse(0, -100, 13, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    setupHeroLine(color, 8);
    ctx.beginPath();
    ctx.moveTo(34, -44);
    ctx.quadraticCurveTo(75, -58, 58, -18);
    ctx.stroke();
    drawHeroArms(color);
    drawAnimalLegs(color);
    drawAnimalBadge("AJ", "#ffcf54");
  }

  function drawFoxHero() {
    const color = "#f4c338";
    setupHeroLine(color, 8);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -58, 34, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-28, -126);
    ctx.lineTo(-18, -164);
    ctx.lineTo(0, -128);
    ctx.lineTo(18, -164);
    ctx.lineTo(30, -126);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff4c8";
    ctx.beginPath();
    ctx.moveTo(-22, -127);
    ctx.lineTo(-17, -151);
    ctx.lineTo(-7, -127);
    ctx.closePath();
    ctx.moveTo(8, -127);
    ctx.lineTo(17, -151);
    ctx.lineTo(24, -127);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -116, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawAnimalEyes();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.moveTo(-16, -100);
    ctx.lineTo(0, -82);
    ctx.lineTo(16, -100);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    setupHeroLine(color, 9);
    ctx.beginPath();
    ctx.moveTo(28, -38);
    ctx.quadraticCurveTo(88, -4, 50, 34);
    ctx.stroke();
    ctx.strokeStyle = "#fffef7";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(61, 18);
    ctx.quadraticCurveTo(69, 27, 50, 34);
    ctx.stroke();
    drawHeroArms(color);
    drawAnimalLegs(color);
    drawAnimalBadge("F", "#fff4c8");
  }

  function drawPolarBearHero() {
    const color = "#dfe5ea";
    setupHeroLine("#171216", 7);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -56, 42, 54, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -116, 30, 0, Math.PI * 2);
    ctx.arc(-22, -140, 11, 0, Math.PI * 2);
    ctx.arc(22, -140, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawAnimalEyes();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(0, -104, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.ellipse(0, -101, 16, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(0, -104, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#45a6db";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-14, -80);
    ctx.lineTo(14, -80);
    ctx.stroke();
    drawHeroArms(color, true);
    drawAnimalLegs(color);
    drawAnimalBadge("B", "#45a6db");
  }

  function drawMonkeyHero() {
    const color = "#6b6f8e";
    setupHeroLine(color, 8);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -58, 32, 48, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -116, 27, 0, Math.PI * 2);
    ctx.arc(-28, -116, 12, 0, Math.PI * 2);
    ctx.arc(28, -116, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawAnimalEyes();
    ctx.fillStyle = "#9b7045";
    ctx.beginPath();
    ctx.ellipse(0, -104, 16, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.ellipse(16, -72, 14, 5, 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    setupHeroLine(color, 8);
    ctx.beginPath();
    ctx.moveTo(28, -38);
    ctx.quadraticCurveTo(86, -65, 60, -16);
    ctx.quadraticCurveTo(45, 10, 76, 8);
    ctx.stroke();
    drawHeroArms(color);
    drawAnimalLegs(color);
    drawAnimalBadge("67", "#6cf0c2");
  }

  function drawEvilMischiefHero() {
    const color = "#6b28c7";
    setupHeroLine(color, 8);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -58, 36, 52, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, -116, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.beginPath();
    ctx.arc(-8, -145, 8, 0, Math.PI * 2);
    ctx.arc(4, -150, 9, 0, Math.PI * 2);
    ctx.arc(15, -144, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-17, -124);
    ctx.lineTo(-4, -116);
    ctx.moveTo(17, -124);
    ctx.lineTo(4, -116);
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.moveTo(0, -108);
    ctx.lineTo(28, -101);
    ctx.lineTo(0, -92);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#8e55e8";
    ctx.beginPath();
    ctx.ellipse(-30, -60, 17, 34, -0.55, 0, Math.PI * 2);
    ctx.ellipse(30, -60, 17, 34, 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#f08318";
    ctx.lineWidth = 4;
    for (let feather = -18; feather <= 18; feather += 12) {
      ctx.beginPath();
      ctx.moveTo(feather, -11);
      ctx.lineTo(feather * 1.35, 20);
      ctx.stroke();
    }
    drawHeroArms(color);
    drawAnimalLegs(color);
    drawAnimalBadge("M", "#f08318");
  }

  function drawAlligatorHero() {
    const color = "#1f8f4d";
    setupHeroLine(color, 8);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, -58, 42, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, -116, 48, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#32b863";
    ctx.beginPath();
    ctx.ellipse(12, -120, 55, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    for (let tooth = -24; tooth <= 24; tooth += 12) {
      ctx.beginPath();
      ctx.moveTo(tooth, -102);
      ctx.lineTo(tooth + 6, -90);
      ctx.lineTo(tooth + 12, -102);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    drawAnimalEyes();
    ctx.fillStyle = "#145e35";
    [-24, -6, 12, 30].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x, -136, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    setupHeroLine(color, 8);
    ctx.beginPath();
    ctx.moveTo(38, -46);
    ctx.quadraticCurveTo(86, -32, 70, 22);
    ctx.stroke();
    drawHeroArms(color);
    drawAnimalLegs(color);
    drawTinyAlligator(-68, 35);
    drawTinyAlligator(78, 38);
    drawAnimalBadge("Y", "#d61f2f");
  }

  function drawTinyAlligator(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#2aa85d";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 28, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(-8, -4, 3, 0, Math.PI * 2);
    ctx.arc(8, -4, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawTatsHero() {
    const color = heroes.tats.color;
    drawHeroHead(0, -112, 24, color);
    drawCloudMuscleShape(-58, -58, color, "rgba(120,201,255,0.2)");
    drawCloudMuscleShape(58, -58, color, "rgba(120,201,255,0.2)");
    drawStickBody(color);
    drawHeroArms(color, true);
  }

  function drawFaryHero() {
    const color = heroes.fary.color;
    ctx.fillStyle = "rgba(255,137,198,0.42)";
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(-32, -62, 28, 48, -0.25, 0, Math.PI * 2);
    ctx.ellipse(32, -62, 28, 48, 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawHeroHead(0, -112, 22, color);
    drawStickBody(color);
    drawHeroArms(color);
  }

  function drawAppleHero() {
    const color = heroes.apple.color;
    drawHeroHead(0, -112, 23, color);
    setupHeroLine(color, 8);
    ctx.beginPath();
    ctx.arc(-2, -142, 11, 0.1, Math.PI * 1.4);
    ctx.stroke();
    drawStickBody(color);
    drawHeroArms(color);
  }

  function drawFreddyHero() {
    setupHeroLine("#17633c", 8);
    ctx.fillStyle = "#17633c";
    roundRect(-20, -84, 40, 66, 9);
    ctx.fill();
    ctx.stroke();
    drawPersonHead("#17633c", "#f0cf62", "#7b5b35");
    drawHeroArms("#17633c");
    drawLegsAndShoes("#17633c");
    ctx.fillStyle = "#0f4a2b";
    ctx.font = "900 21px Trebuchet MS";
    ctx.fillText("F", -7, -45);
  }

  function drawBenjiHero() {
    setupHeroLine("#6f737a", 8);
    ctx.fillStyle = "#9b9ea5";
    roundRect(-20, -84, 40, 66, 8);
    ctx.fill();
    ctx.stroke();
    drawHeroArms("#171216");
    drawLegsAndShoes("#171216");
    drawPersonHead("#171216", "#b68a45", "#2f74d0");
  }

  function drawPersonHead(outline, hair, eye) {
    ctx.save();
    ctx.strokeStyle = outline;
    ctx.lineWidth = 6;
    ctx.fillStyle = "#f2c99d";
    ctx.beginPath();
    ctx.arc(0, -112, 23, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = hair;
    ctx.beginPath();
    ctx.moveTo(-23, -126);
    ctx.quadraticCurveTo(-12, -150, 6, -134);
    ctx.quadraticCurveTo(18, -146, 24, -122);
    ctx.lineTo(18, -117);
    ctx.quadraticCurveTo(0, -128, -20, -116);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = eye;
    ctx.beginPath();
    ctx.arc(-8, -113, 3.4, 0, Math.PI * 2);
    ctx.arc(8, -113, 3.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = outline;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, -104, 7, 0.12, Math.PI - 0.12);
    ctx.stroke();
    ctx.restore();
  }

  function drawLegsAndShoes(color) {
    setupHeroLine(color, 8);
    ctx.beginPath();
    ctx.moveTo(-10, -20);
    ctx.lineTo(-24, 42);
    ctx.moveTo(10, -20);
    ctx.lineTo(26, 42);
    ctx.stroke();
    ctx.fillStyle = "#111";
    roundRect(-44, 42, 30, 13, 5);
    ctx.fill();
    ctx.stroke();
    roundRect(16, 42, 30, 13, 5);
    ctx.fill();
    ctx.stroke();
  }

  function drawFrostHero() {
    const color = heroes.frost.color;
    const accent = heroes.frost.accent;
    drawHeroHead(0, -112, 23, color);
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
    drawStickBody(color);
    drawHeroArms(color);
  }

  function drawNessHero() {
    const color = heroes.ness.color;
    const accent = heroes.ness.accent;
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
    drawHeroHead(0, -112, 23, color);
    drawStickBody(color);
    drawHeroArms(color);
    ctx.fillStyle = accent;
    ctx.font = "900 24px Trebuchet MS";
    ctx.fillText("N", -9, -42);
  }

  function drawCrayonHero() {
    const color = heroes.crayon.color;
    drawHeroHead(0, -112, 23, color);
    ctx.fillStyle = heroes.crayon.accent;
    ctx.beginPath();
    ctx.moveTo(-20, -144);
    ctx.lineTo(20, -144);
    ctx.lineTo(0, -174);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    drawStickBody(color);
    drawHeroArms(color);
  }

  function drawHoodieHero() {
    const color = heroes.hoodie.color;
    ctx.fillStyle = color;
    ctx.strokeStyle = heroes.hoodie.accent;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(0, -112, 31, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    drawHeroHead(0, -112, 19, heroes.hoodie.accent);
    drawStickBody(color);
    drawHeroArms(heroes.hoodie.accent);
  }

  function drawMayorHero() {
    const color = heroes.mayer.color;
    drawEvilHeroHead(0, -112, 24, color, true);
    drawStickBody(color);
    drawHeroArms(color);
    ctx.fillStyle = heroes.mayer.accent;
    ctx.font = "900 32px Trebuchet MS";
    ctx.fillText("M", -15, -42);
  }

  function drawYappingHero() {
    const color = heroes.yonatan.color;
    drawEvilHeroHead(0, -112, 23, color);
    drawStickBody(color);
    drawHeroArms(color);
    ctx.fillStyle = heroes.yonatan.accent;
    ctx.fillRect(16, -115, 18, 9);
  }

  function drawMischievousMayerBoss(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1.2, 1.2);
    drawMayorHero();
    ctx.restore();
  }

  function drawYappingYonatanBoss(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1.18, 1.18);
    drawYappingHero();
    ctx.restore();
  }

  function drawIceBoss(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 8;
    ctx.lineJoin = "round";
    ctx.fillStyle = "#55bff2";
    ctx.beginPath();
    ctx.ellipse(0, -34, 72, 92, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#9be8ff";
    ctx.beginPath();
    ctx.ellipse(0, -102, 54, 45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d9fbff";
    [-28, 0, 28].forEach((xPoint) => {
      ctx.beginPath();
      ctx.moveTo(xPoint - 15, -138);
      ctx.lineTo(xPoint, -184);
      ctx.lineTo(xPoint + 15, -138);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    });
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(-26, -114);
    ctx.lineTo(-8, -103);
    ctx.moveTo(26, -114);
    ctx.lineTo(8, -103);
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-18, -96, 5, 0, Math.PI * 2);
    ctx.arc(18, -96, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-22, -76);
    ctx.quadraticCurveTo(0, -91, 24, -75);
    ctx.stroke();
    setupHeroLine("#2480c2", 13);
    ctx.beginPath();
    ctx.moveTo(-58, -44);
    ctx.lineTo(-112, 14);
    ctx.moveTo(58, -44);
    ctx.lineTo(112, 14);
    ctx.moveTo(-34, 42);
    ctx.lineTo(-60, 112);
    ctx.moveTo(34, 42);
    ctx.lineTo(60, 112);
    ctx.stroke();
    ctx.fillStyle = "#d9fbff";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    [-112, 112, -60, 60].forEach((xPoint, index) => {
      const yPoint = index < 2 ? 14 : 112;
      ctx.beginPath();
      ctx.arc(xPoint, yPoint, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 24px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("ICE", 0, -22);
    ctx.restore();
  }

  function drawMathMonster(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 8;
    ctx.fillStyle = "#7146d9";
    ctx.beginPath();
    ctx.arc(0, -98, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#7d43d6";
    roundRect(-62, -50, 124, 142, 18);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(-60, -18);
    ctx.lineTo(-118, 38);
    ctx.moveTo(60, -18);
    ctx.lineTo(118, 38);
    ctx.moveTo(-36, 88);
    ctx.lineTo(-60, 148);
    ctx.moveTo(36, 88);
    ctx.lineTo(60, 148);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(-18, -106, 12, 0, Math.PI * 2);
    ctx.arc(18, -106, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-16, -106, 4, 0, Math.PI * 2);
    ctx.arc(16, -106, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffd84a";
    ctx.font = "900 34px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("7", -32, -72);
    ctx.fillText("+", 24, -70);
    ctx.fillText("12", -24, -8);
    ctx.fillText("-", 34, -8);
    ctx.fillText("ÃƒÂ·", -28, 48);
    ctx.fillText("3", 30, 50);
    ctx.fillText("=", 0, 82);
    ctx.restore();
  }

  function drawEvilLa(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.fillStyle = "#d91f2e";
    ctx.beginPath();
    ctx.ellipse(-18, 0, 70, 82, -0.2, 0, Math.PI * 2);
    ctx.ellipse(48, 8, 62, 74, 0.2, 0, Math.PI * 2);
    ctx.ellipse(8, -42, 66, 52, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 34px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("LA", -18, -18);
    ctx.fillText("A B C", 22, 22);
    ctx.font = "900 22px Trebuchet MS";
    ctx.fillText("poem", 4, 54);
    ctx.fillText("rhyme", 30, -50);
    ctx.fillText("words", -46, 36);
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.moveTo(-58, -26);
    ctx.lineTo(-24, -36);
    ctx.moveTo(34, -36);
    ctx.lineTo(66, -22);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(-38, -14, 13, 0, Math.PI * 2);
    ctx.arc(44, -10, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-34, -14, 5, 0, Math.PI * 2);
    ctx.arc(40, -10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-34, 70);
    ctx.quadraticCurveTo(4, 48, 44, 70);
    ctx.stroke();
    ctx.restore();
  }

  function drawFoodMonsterFiasco(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 9;
    ctx.fillStyle = "#4b2f24";
    roundRect(-72, -20, 52, 190, 18);
    ctx.fill();
    ctx.stroke();
    roundRect(24, -20, 52, 190, 18);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#1f1f29";
    roundRect(-96, 150, 92, 36, 10);
    ctx.fill();
    ctx.stroke();
    roundRect(4, 150, 92, 36, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#74c043";
    ctx.beginPath();
    ctx.arc(-28, -46, 24, 0, Math.PI * 2);
    ctx.arc(44, -50, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 25px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("TRASH", 8, -42);
    drawGarbageCan(-142, 10);
    ctx.restore();
  }

  function drawGarbageCan(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#6f737a";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    roundRect(-26, -30, 52, 72, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#c8d0d8";
    ctx.fillRect(-36, -42, 72, 18);
    ctx.strokeRect(-36, -42, 72, 18);
    ctx.restore();
  }

  function drawCrazyBall(x, y) {
    ctx.save();
    ctx.translate(x, y);
    const wobble = Math.sin(state.tick * 0.35) * 6;
    ctx.rotate(wobble * 0.01);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 8;
    ctx.fillStyle = "#2e7bc7";
    ctx.beginPath();
    ctx.arc(0, 0, 74, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#fffef7";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, 58, -0.8, 0.8);
    ctx.arc(0, 0, 58, Math.PI - 0.8, Math.PI + 0.8);
    ctx.moveTo(-60, 0);
    ctx.lineTo(60, 0);
    ctx.stroke();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(-45, -30);
    ctx.lineTo(-10, -42);
    ctx.moveTo(14, -42);
    ctx.lineTo(48, -30);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(-28, -16, 13, 0, Math.PI * 2);
    ctx.arc(30, -16, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-24, -16, 5, 0, Math.PI * 2);
    ctx.arc(26, -16, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-38, 34);
    ctx.quadraticCurveTo(0, 60, 40, 34);
    ctx.stroke();
    ctx.restore();
  }

  function drawBossCharacter(x, y, boss) {
    if (boss.type === "archer") {
      drawArtArcher(x, y, boss);
      return;
    }
    if (boss.type === "librarian") {
      drawLibrarianLauncher(x, y, boss);
      return;
    }
    if (boss.type === "bus") {
      drawFieldTripTerror(x, y, boss);
      return;
    }
    if (boss.type === "principal") {
      drawRobotPrincipal(x, y, boss);
      return;
    }
    ctx.save();
    ctx.translate(x, y);
    const bob = Math.sin(state.tick * 0.25) * 10;
    ctx.translate(0, bob);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.fillStyle = boss.accent;
    ctx.beginPath();
    ctx.moveTo(-130, 24);
    ctx.lineTo(120, -64);
    ctx.lineTo(52, 24);
    ctx.lineTo(8, 92);
    ctx.lineTo(-18, 36);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = boss.color;
    ctx.beginPath();
    ctx.moveTo(-18, 36);
    ctx.lineTo(120, -64);
    ctx.lineTo(52, 24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-18, 36);
    ctx.lineTo(44, 20);
    ctx.moveTo(8, 92);
    ctx.lineTo(36, 28);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(32, -14, 13, 0, Math.PI * 2);
    ctx.arc(70, -26, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(36, -14, 5, 0, Math.PI * 2);
    ctx.arc(66, -26, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(34, 22);
    ctx.quadraticCurveTo(62, 42, 90, 8);
    ctx.stroke();
    ctx.restore();
  }

  function drawArtArcher(x, y, boss) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.fillStyle = "#f7c18b";
    ctx.beginPath();
    ctx.arc(0, -90, 44, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = boss.color;
    roundRect(-50, -48, 100, 132, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(-15, -97, 10, 0, Math.PI * 2);
    ctx.arc(18, -97, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-12, -97, 4, 0, Math.PI * 2);
    ctx.arc(15, -97, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#7c3f18";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(-90, -18, 55, -1.2, 1.2);
    ctx.stroke();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-90, -72);
    ctx.lineTo(-90, 36);
    ctx.moveTo(-88, -18);
    ctx.lineTo(-170, -18);
    ctx.stroke();
    ctx.fillStyle = "#18a66a";
    roundRect(-178, -26, 70, 16, 4);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawLibrarianLauncher(x, y, boss) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(0, -90, 44, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = boss.color;
    roundRect(-54, -48, 108, 140, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.fillRect(-28, -106, 18, 7);
    ctx.fillRect(12, -106, 18, 7);
    ctx.strokeStyle = "#ffd84a";
    ctx.lineWidth = 6;
    for (let i = 0; i < 4; i += 1) {
      ctx.strokeRect(-118 + i * 24, -8 + i * 8, 46, 34);
    }
    ctx.restore();
  }

  function drawFieldTripTerror(x, y, boss) {
    ctx.save();
    ctx.translate(x - 50, y + 20);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.fillStyle = boss.color;
    roundRect(-145, -90, 270, 130, 16);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    for (let i = 0; i < 4; i += 1) {
      roundRect(-112 + i * 52, -62, 36, 34, 4);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-82, 44, 26, 0, Math.PI * 2);
    ctx.arc(74, 44, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(18, -4, 13, 0, Math.PI * 2);
    ctx.arc(62, -4, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.font = "900 22px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("STOP", 156, -36);
    ctx.strokeRect(130, -62, 52, 52);
    ctx.restore();
  }

  function drawRobotPrincipal(x, y, boss) {
    ctx.save();
    ctx.translate(x, y);
    const scale = state.level >= 11 && boss.action === "principalGiant" ? 1.25 : state.level === 30 ? 1.35 : 1;
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.fillStyle = boss.color;
    roundRect(-58, -122, 116, 90, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = boss.accent;
    roundRect(-70, -34, 140, 132, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(-24, -82, 13, 0, Math.PI * 2);
    ctx.arc(24, -82, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.beginPath();
    ctx.arc(-24, -82, 5, 0, Math.PI * 2);
    ctx.arc(24, -82, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-70, 10);
    ctx.lineTo(-126, -18);
    ctx.moveTo(70, 10);
    ctx.lineTo(126, -18);
    ctx.moveTo(-38, 98);
    ctx.lineTo(-58, 154);
    ctx.moveTo(38, 98);
    ctx.lineTo(58, 154);
    ctx.stroke();
    if (state.level >= 11 && boss.action === "principalMultiply") {
      ctx.globalAlpha = 0.5;
      ctx.translate(-150, 20);
      roundRect(-42, -72, 84, 84, 12);
      ctx.fill();
      ctx.stroke();
      ctx.translate(300, 0);
      roundRect(-42, -72, 84, 84, 12);
      ctx.fill();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  function drawAction() {
    if (!state.action) return;
    ctx.save();
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    if (state.action === "win") {
      drawImpact("YOU WIN!", 640, 230, "#18a66a");
    } else if (state.action === "lost") {
      drawImpact("TRY AGAIN!", 640, 230, "#d91f2e");
    } else if (state.action === "miss") {
      drawPlayerAttack(state.playerAction, true);
      drawImpact("TOO FAR!", 650, 215, "#d91f2e");
    } else if (state.action === "heroJump") {
      drawDefenseMove("jump");
      drawImpact("JUMP!", 650, 215, "#2e91de");
    } else if (state.action === "heroHide") {
      drawDefenseMove("hide");
      drawImpact("HIDE!", 650, 215, "#6f737a");
    } else if (state.action === "wallEscape") {
      drawImpact("WALL ESCAPE!", 650, 215, "#2f6f52");
    } else if (state.action === "israelTag") {
      drawImpact("RUN!", 650, 215, "#d91f2e");
    } else {
      if (!isSpecialPowerAction(state.action)) {
        drawPlayerAttack(state.playerAction, false);
      }
      if (state.action === "numberNet") {
        drawNumberNet(state.heroX, state.heroY);
        drawImpact("MISCHIEF!", 650, 215, "#7146d9");
      } else if (state.action === "letterShot") {
        drawLetterShot(state.heroX, state.heroY);
        drawImpact("YAP BLAST!", 650, 215, "#d91f2e");
      } else if (state.action === "iceBossFreeze") {
        drawIceBossFreeze(state.heroX, state.heroY);
        drawImpact("FREEZE!", 650, 215, "#45a6db");
      } else if (state.action === "madeInChinaBlock") {
        drawMadeInChinaBlocks(state.heroX, state.heroY);
        drawImpact("BLOCK SHOT!", 650, 215, "#d91f2e");
      } else if (state.action === "chineseChickenShot") {
        drawChineseChickenShot(state.heroX, state.heroY);
        drawImpact("CHICKEN SHOT!", 650, 215, "#f18319");
      } else if (state.action === "protectBlock") {
        drawProtectBurst();
        drawImpact("PROTECTED!", 650, 215, "#18a66a");
      } else if (state.action === "presidentHit") {
        drawImpact("PROTECT HIM!", 650, 215, "#d91f2e");
      } else if (state.action === "garbageShot") {
        drawGarbageShot(state.heroX, state.heroY);
        drawImpact("GARBAGE HIT!", 650, 215, "#d91f2e");
      } else if (state.action === "ballRollHit") {
        drawBallRoll(state.heroX, state.heroY, true);
        drawImpact("ROLLED!", 650, 215, "#2e7bc7");
      } else if (state.action === "ballRollMiss") {
        drawBallRoll(state.heroX, state.heroY, false);
        drawImpact("MISSED!", 650, 215, "#18a66a");
      } else if (state.action === "airplaneAttack") {
        drawPaperAttack(state.heroX, state.heroY, bossLevels[4]);
        drawImpact("AIR ATTACK!", 650, 215, "#f15b42");
      } else if (state.action === "paperPush") {
        drawPaperPush(state.heroX, state.heroY);
        drawImpact("PUSHED!", 650, 215, "#7146d9");
      } else if (state.action === "wingWhack") {
        drawWingWhack(state.heroX, state.heroY);
        drawImpact("WHACK!", 650, 215, "#18a66a");
      } else if (state.action === "paintbrushArrow") {
        drawPaintbrushArrow(state.heroX, state.heroY, false);
        drawImpact("PAINT ARROW!", 650, 215, "#ef4fa3");
      } else if (state.action === "paintbrushDodge") {
        drawPaintbrushArrow(state.heroX, state.heroY, true);
        drawImpact("DODGE!", 650, 215, "#18a66a");
      } else if (state.action === "bookLaunch") {
        drawBookLaunch(state.heroX, state.heroY, false);
        drawImpact("BOOKS!", 650, 215, "#6a4b2b");
      } else if (state.action === "bookDodge") {
        drawBookLaunch(state.heroX, state.heroY, true);
        drawImpact("DODGE!", 650, 215, "#18a66a");
      } else if (state.action === "busStop") {
        drawBusStopAttack(state.heroX, state.heroY);
        drawImpact("STOPPED!", 650, 215, "#d91f2e");
      } else if (state.action === "trunkGrab") {
        drawTrunkGrabEffect();
        drawImpact("GIANT PUNCH!", 650, 215, "#3f8fd2");
      } else if (state.action === "elephantForestStomp") {
        drawElephantStompEffect();
        drawImpact("SUPER STOMP!", 650, 215, "#3f8fd2");
      } else if (state.action === "elephantTuskShield") {
        drawElephantShieldEffect();
        drawImpact("GORILLA JUMP!", 650, 215, "#3f8fd2");
      } else if (state.action === "parrotScream") {
        drawParrotScreamEffect();
        drawImpact("WING GUST!", 650, 215, "#8542d8");
      } else if (state.action === "parrotWingBlast") {
        drawParrotWingBlastEffect();
        drawImpact("FLY!", 650, 215, "#8542d8");
      } else if (state.action === "parrotHealingFeather") {
        drawParrotHealingEffect();
        drawImpact("TAKEOFF JUMP!", 650, 215, "#8542d8");
      } else if (state.action === "cheetahSpeed") {
        drawCheetahPowerEffect("speed");
        drawImpact("JUICE SHOT!", 650, 215, "#f18319");
      } else if (state.action === "cheetahTailGrab") {
        drawCheetahPowerEffect("tail");
        drawImpact("JUICE TORNADO!", 650, 215, "#f18319");
      } else if (state.action === "cheetahClaws") {
        drawCheetahPowerEffect("claws");
        drawImpact("JUICE LIGHTNING!", 650, 215, "#f18319");
      } else if (state.action === "fennecLove") {
        drawFreddyMultiplicationEffect();
        drawImpact("MULTIPLY!", 650, 215, "#f083bd");
      } else if (state.action === "fennecSneakBite") {
        drawFreddyAnimalMorphEffect();
        drawImpact("ANIMAL FORM!", 650, 215, "#f0cf62");
      } else if (state.action === "fennecPounce") {
        drawFennecPounceEffect();
        drawImpact("SNEAK TRICK!", 650, 215, "#f0cf62");
      } else if (state.action === "polarTeeth") {
        drawPolarPowerEffect("teeth");
        drawImpact("TORNADO!", 650, 215, "#45a6db");
      } else if (state.action === "polarIceChunk") {
        drawPolarPowerEffect("chunk");
        drawImpact("TELEPORT!", 650, 215, "#45a6db");
      } else if (state.action === "polarIceTornado") {
        drawPolarPowerEffect("tornado");
        drawImpact("ICE SHIELD!", 650, 215, "#45a6db");
      } else if (state.action === "bananaStorm") {
        drawMonkeyPowerEffect("storm");
        drawImpact("FREEZE BLOCK!", 650, 215, "#45a6db");
      } else if (state.action === "bananaShoot") {
        drawMonkeyPowerEffect("shoot");
        drawImpact("BURROW STRIKE!", 650, 215, "#6cf0c2");
      } else if (state.action === "bananaSlip") {
        drawMonkeyPowerEffect("slip");
        drawImpact("POISON STORM!", 650, 215, "#a4c43a");
      } else if (state.action === "mayerBigBock") {
        drawMayerPowerEffect("bock");
        drawImpact("FLYING BOOTS!", 650, 215, "#6b28c7");
      } else if (state.action === "mayerFlyUp") {
        drawMayerPowerEffect("fly");
        drawImpact("MAYOR BOTS!", 650, 215, "#f08318");
      } else if (state.action === "mayerRoosterFlyers") {
        drawMayerPowerEffect("flyers");
        drawImpact("LASER RAY!", 650, 215, "#f08318");
      } else if (state.action === "yonatanJaw") {
        drawYonatanPowerEffect("jaw");
        drawImpact("MOUTH MONSTER!", 650, 215, "#1f8f4d");
      } else if (state.action === "yonatanChomper") {
        drawYonatanPowerEffect("chomper");
        drawImpact("YAP BLAST!", 650, 215, "#1f8f4d");
      } else if (state.action === "yonatanTailSwipe") {
        drawYonatanPowerEffect("jaw");
        drawImpact("SUPER YAP!", 650, 215, "#1f8f4d");
      } else if (state.action === "yonatanAlligatorMonsters") {
        drawYonatanPowerEffect("monsters");
        drawImpact("MONSTERS!", 650, 215, "#1f8f4d");
      } else if (state.action.startsWith("principal")) {
        drawPrincipalAttack(state.heroX, state.heroY, state.action);
        drawImpact("PRINCIPAL!", 650, 215, "#6f737a");
      } else {
        drawImpact("BLOCKED!", 650, 215, "#18a66a");
      }
    }
    ctx.restore();
  }

  function isSpecialPowerAction(action) {
    return [
      "trunkGrab", "elephantForestStomp", "elephantTuskShield", "parrotScream",
      "parrotWingBlast", "parrotHealingFeather", "cheetahSpeed", "cheetahTailGrab", "cheetahClaws",
      "fennecLove", "fennecSneakBite", "fennecPounce", "polarTeeth", "polarIceChunk",
      "polarIceTornado", "bananaStorm", "bananaShoot", "bananaSlip", "mayerBigBock",
      "mayerFlyUp", "mayerRoosterFlyers", "yonatanJaw", "yonatanChomper",
      "yonatanTailSwipe", "yonatanAlligatorMonsters"
    ].includes(action);
  }

  function drawIceBossFreeze(x, y) {
    ctx.save();
    ctx.strokeStyle = "#45a6db";
    ctx.fillStyle = "rgba(155, 232, 255, 0.55)";
    ctx.lineWidth = 7;
    for (let shard = 0; shard < 7; shard += 1) {
      const sx = x - 88 + shard * 29;
      const height = 42 + (shard % 3) * 18;
      ctx.beginPath();
      ctx.moveTo(sx - 13, y + 58);
      ctx.lineTo(sx, y + 58 - height);
      ctx.lineTo(sx + 13, y + 58);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(835, 330);
    ctx.quadraticCurveTo(690, 250, x + 20, y - 70);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 24px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("ICE STOMP", x, y - 125);
    ctx.restore();
  }

  function drawParrotScreamEffect() {
    const boss = currentBossPosition(state.powerSilenceTarget || state.playerTarget || currentTarget());
    ctx.save();
    ctx.strokeStyle = "#8542d8";
    ctx.fillStyle = "rgba(255, 137, 198, 0.22)";
    ctx.lineWidth = 8;
    for (let index = 0; index < 4; index += 1) {
      ctx.beginPath();
      ctx.arc(state.heroX + 54, state.heroY - 96, 56 + index * 48, -0.45, 0.45);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(state.heroX + 64, state.heroY - 108);
    ctx.quadraticCurveTo(620, 150, boss.x - 60, boss.y - 96);
    ctx.quadraticCurveTo(650, 245, state.heroX + 64, state.heroY - 54);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#fffef7";
    ctx.lineWidth = 5;
    roundRect(boss.x - 118, boss.y - 166, 150, 44, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#8542d8";
    ctx.font = "900 20px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("NO POWERS", boss.x - 43, boss.y - 138);
    ctx.restore();
  }

  function drawElephantStompEffect() {
    const boss = currentBossPosition(state.playerTarget || currentTarget());
    ctx.save();
    ctx.strokeStyle = "#1478cf";
    ctx.fillStyle = "rgba(20, 120, 207, 0.18)";
    ctx.lineWidth = 8;
    for (let ring = 0; ring < 4; ring += 1) {
      ctx.beginPath();
      ctx.ellipse(boss.x - 85, boss.y + 40, 78 + ring * 38, 24 + ring * 12, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = "#78c9ff";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(boss.x - 178, boss.y - 140, 180, 58, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.font = "900 24px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("STOMP!", boss.x - 88, boss.y - 102);
    ctx.restore();
  }

  function drawElephantShieldEffect() {
    ctx.save();
    ctx.strokeStyle = "#1478cf";
    ctx.fillStyle = "rgba(120, 201, 255, 0.26)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(state.heroX, state.heroY - 78, 88, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(state.heroX, state.heroY - 148);
    ctx.lineTo(state.heroX + 54, state.heroY - 118);
    ctx.lineTo(state.heroX + 40, state.heroY - 42);
    ctx.lineTo(state.heroX, state.heroY - 18);
    ctx.lineTo(state.heroX - 40, state.heroY - 42);
    ctx.lineTo(state.heroX - 54, state.heroY - 118);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawParrotWingBlastEffect() {
    const boss = currentBossPosition(state.playerTarget || currentTarget());
    ctx.save();
    ctx.strokeStyle = "#8542d8";
    ctx.lineWidth = 9;
    for (let gust = 0; gust < 4; gust += 1) {
      ctx.beginPath();
      ctx.moveTo(state.heroX + 70, state.heroY - 140 + gust * 36);
      ctx.quadraticCurveTo(610, state.heroY - 205 + gust * 26, boss.x - 90, boss.y - 120 + gust * 18);
      ctx.stroke();
    }
    ctx.fillStyle = "#ff89c6";
    ctx.font = "900 26px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("WING BLAST", boss.x - 95, boss.y - 165);
    ctx.restore();
  }

  function drawParrotHealingEffect() {
    ctx.save();
    ctx.strokeStyle = "#8542d8";
    ctx.fillStyle = "#ff89c6";
    ctx.lineWidth = 5;
    for (let feather = 0; feather < 6; feather += 1) {
      const x = state.heroX - 80 + feather * 32;
      const y = state.heroY - 155 + (feather % 2) * 26;
      ctx.beginPath();
      ctx.ellipse(x, y, 10, 34, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    drawHeartShape(state.heroX, state.heroY - 112, 24);
    ctx.restore();
  }

  function drawTrunkGrabEffect() {
    const boss = currentBossPosition(state.trunkGrabTarget || state.playerTarget || currentTarget());
    ctx.save();
    ctx.strokeStyle = "#3f8fd2";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(state.heroX + 12, state.heroY - 92);
    ctx.quadraticCurveTo(620, 210, boss.x - 72, boss.y - 82);
    ctx.stroke();
    ctx.fillStyle = "#78c9ff";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(boss.x - 72, boss.y - 82, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 24px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("HELD", boss.x - 72, boss.y - 122);
    ctx.restore();
  }

  function drawCheetahPowerEffect(kind) {
    const boss = currentBossPosition(state.playerTarget || currentTarget());
    ctx.save();
    if (kind === "speed") {
      ctx.strokeStyle = "#ffcf54";
      ctx.lineWidth = 8;
      for (let streak = 0; streak < 6; streak += 1) {
        ctx.beginPath();
        ctx.moveTo(state.heroX - 175 - streak * 18, state.heroY - 112 + streak * 18);
        ctx.lineTo(state.heroX - 38 - streak * 10, state.heroY - 130 + streak * 14);
        ctx.stroke();
      }
      ctx.fillStyle = "#171216";
      ctx.font = "900 22px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("0.5 HEART", boss.x - 82, boss.y - 128);
    } else if (kind === "tail") {
      ctx.strokeStyle = "#f18319";
      ctx.lineWidth = 15;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(state.heroX - 56, state.heroY - 70);
      ctx.quadraticCurveTo(610, 470, boss.x - 92, boss.y - 48);
      ctx.stroke();
      ctx.fillStyle = "#ffcf54";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(boss.x - 92, boss.y - 48, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      for (let slash = 0; slash < 3; slash += 1) {
        ctx.beginPath();
        ctx.moveTo(boss.x - 122 + slash * 28, boss.y - 118);
        ctx.lineTo(boss.x - 164 + slash * 28, boss.y - 22);
        ctx.stroke();
      }
      ctx.fillStyle = "#ffcf54";
      ctx.font = "900 24px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("SCRATCH", boss.x - 112, boss.y - 136);
    }
    ctx.restore();
  }

  function drawFennecLoveEffect() {
    const boss = currentBossPosition(state.fennecLoveTarget || state.playerTarget || currentTarget());
    ctx.save();
    ctx.strokeStyle = "#f083bd";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(state.heroX + 58, state.heroY - 116);
    ctx.quadraticCurveTo(650, 140, boss.x - 94, boss.y - 118);
    ctx.stroke();
    ctx.fillStyle = "#f083bd";
    [-38, 0, 38].forEach((offset, index) => {
      drawHeartShape(boss.x - 100 + offset, boss.y - 150 - index * 18, 17);
    });
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(boss.x - 190, boss.y - 224, 210, 66, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#f083bd";
    ctx.font = "900 27px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("I love you", boss.x - 85, boss.y - 182);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(boss.x - 170, boss.y + 48);
    ctx.lineTo(boss.x + 20, boss.y + 18);
    ctx.stroke();
    ctx.restore();
  }

  function drawFennecSneakBiteEffect() {
    const boss = currentBossPosition(state.playerTarget || currentTarget());
    ctx.save();
    ctx.strokeStyle = "rgba(240, 207, 98, 0.9)";
    ctx.lineWidth = 5;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(state.heroX - 70, state.heroY - 92);
    ctx.quadraticCurveTo(590, 505, boss.x - 108, boss.y - 72);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    for (let tooth = 0; tooth < 4; tooth += 1) {
      const x = boss.x - 132 + tooth * 20;
      const y = boss.y - 102 + (tooth % 2) * 16;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 10, y + 25);
      ctx.lineTo(x + 20, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#171216";
    ctx.font = "900 22px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("1 HEART", boss.x - 90, boss.y - 136);
    ctx.restore();
  }

  function drawFennecPounceEffect() {
    const boss = currentBossPosition(state.fennecPounceTarget || state.playerTarget || currentTarget());
    ctx.save();
    ctx.strokeStyle = "#f0cf62";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(boss.x - 18, boss.y - 148, 42, Math.PI, Math.PI * 1.9);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(boss.x - 154, boss.y - 218, 164, 48, 10);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#17633c";
    ctx.font = "900 20px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("ON HEAD", boss.x - 72, boss.y - 188);
    ctx.restore();
  }

  function drawHeartShape(x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, size);
    ctx.bezierCurveTo(-size * 1.45, 0, -size, -size, 0, -size * 0.45);
    ctx.bezierCurveTo(size, -size, size * 1.45, 0, 0, size);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawFreddyMultiplicationEffect() {
    const boss = currentBossPosition(state.fennecLoveTarget || state.playerTarget || currentTarget());
    ctx.save();
    const hero = heroes.freddy;
    [[-170, 5], [-115, -85], [-45, -20], [-220, -60]].forEach(([dx, dy], index) => {
      ctx.save();
      ctx.translate(boss.x + dx, boss.y + dy);
      ctx.globalAlpha = 0.82 - index * 0.08;
      ctx.fillStyle = hero.color;
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 4;
      roundRect(-18, -54, 36, 58, 8);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = hero.accent;
      ctx.beginPath();
      ctx.arc(0, -72, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#171216";
      ctx.font = "900 16px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(`x${index + 2}`, 0, -104);
      ctx.restore();
    });
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(boss.x - 260, boss.y - 210, 220, 54, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#17633c";
    ctx.font = "900 24px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("MORE FREDDYS!", boss.x - 150, boss.y - 176);
    ctx.restore();
  }

  function drawFreddyAnimalMorphEffect() {
    const boss = currentBossPosition(state.playerTarget || currentTarget());
    ctx.save();
    const animals = [
      ["FOX", "#f0cf62", boss.x - 245, boss.y - 130],
      ["BEAR", "#d9fbff", boss.x - 175, boss.y - 190],
      ["CHEETAH", "#f18319", boss.x - 100, boss.y - 130]
    ];
    animals.forEach(([label, color, x, y], index) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(x, y, 42, 30, index * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#171216";
      ctx.font = "900 12px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(label, x, y + 5);
    });
    ctx.strokeStyle = "#f0cf62";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(state.heroX + 70, state.heroY - 90);
    ctx.quadraticCurveTo(610, 225, boss.x - 80, boss.y - 85);
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    roundRect(boss.x - 270, boss.y - 250, 240, 52, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#17633c";
    ctx.font = "900 20px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("ANY ANIMAL!", boss.x - 150, boss.y - 216);
    ctx.restore();
  }

  function drawPolarPowerEffect(kind) {
    const boss = currentBossPosition(state.playerTarget || state.iceTornadoTarget || currentTarget());
    ctx.save();
    if (kind === "teeth") {
      ctx.fillStyle = "#fffef7";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 4;
      for (let bite = 0; bite < 3; bite += 1) {
        const x = boss.x - 135 + bite * 36;
        const y = boss.y - 124 + bite * 24;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 18, y + 38);
        ctx.lineTo(x + 36, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y + 58);
        ctx.lineTo(x + 18, y + 20);
        ctx.lineTo(x + 36, y + 58);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = "#45a6db";
      ctx.font = "900 22px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("3 x 0.5", boss.x - 86, boss.y - 152);
    } else if (kind === "chunk") {
      ctx.fillStyle = "#9edcff";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(boss.x - 170, boss.y - 128);
      ctx.lineTo(boss.x - 108, boss.y - 174);
      ctx.lineTo(boss.x - 32, boss.y - 132);
      ctx.lineTo(boss.x - 52, boss.y - 62);
      ctx.lineTo(boss.x - 142, boss.y - 52);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "#fffef7";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(boss.x - 124, boss.y - 152);
      ctx.lineTo(boss.x - 104, boss.y - 70);
      ctx.moveTo(boss.x - 70, boss.y - 122);
      ctx.lineTo(boss.x - 140, boss.y - 98);
      ctx.stroke();
    } else {
      ctx.strokeStyle = "#45a6db";
      ctx.lineWidth = 9;
      for (let loop = 0; loop < 4; loop += 1) {
        ctx.beginPath();
        ctx.ellipse(boss.x - 82, boss.y - 76 + loop * 20, 104 - loop * 12, 24, -0.18, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(158, 220, 255, 0.28)";
      ctx.beginPath();
      ctx.ellipse(boss.x - 82, boss.y - 38, 116, 130, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fffef7";
      ctx.font = "900 22px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("TRAPPED 10", boss.x - 82, boss.y - 178);
    }
    ctx.restore();
  }

  function drawMonkeyPowerEffect(kind) {
    const boss = currentBossPosition(state.playerTarget || state.bananaSlipTarget || currentTarget());
    ctx.save();
    if (kind === "storm") {
      ctx.fillStyle = "#ffd84a";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 4;
      for (let drop = 0; drop < 3; drop += 1) {
        const x = boss.x - 168 + drop * 54;
        const y = boss.y - 164 + drop * 42;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-0.65 + drop * 0.35);
        ctx.beginPath();
        ctx.ellipse(0, 0, 16, 38, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
      ctx.fillStyle = "#6ca122";
      ctx.font = "900 22px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("3 x 0.5", boss.x - 92, boss.y - 186);
    } else if (kind === "shoot") {
      ctx.strokeStyle = "#ffd84a";
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(state.heroX + 56, state.heroY - 112);
      ctx.quadraticCurveTo(650, 190, boss.x - 88, boss.y - 88);
      ctx.stroke();
      ctx.fillStyle = "#ffd84a";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      ctx.save();
      ctx.translate(boss.x - 88, boss.y - 88);
      ctx.rotate(-0.5);
      ctx.beginPath();
      ctx.ellipse(0, 0, 20, 48, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    } else {
      ctx.fillStyle = "#ffd84a";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      ctx.save();
      ctx.translate(boss.x - 92, boss.y + 42);
      ctx.rotate(1.25);
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 54, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.strokeStyle = "#6ca122";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.arc(boss.x - 82, boss.y - 46, 76, 0.15, Math.PI * 1.35);
      ctx.stroke();
      ctx.fillStyle = "#fffef7";
      ctx.font = "900 22px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("SLIPPING", boss.x - 82, boss.y - 138);
    }
    ctx.restore();
  }

  function drawMayerPowerEffect(kind) {
    const boss = currentBossPosition(state.playerTarget || state.mayerBockTarget || currentTarget());
    ctx.save();
    if (kind === "bock") {
      ctx.strokeStyle = "#6b28c7";
      ctx.lineWidth = 9;
      for (let ring = 0; ring < 3; ring += 1) {
        ctx.beginPath();
        ctx.arc(boss.x - 82, boss.y - 70, 70 + ring * 36, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = "#fffef7";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      roundRect(boss.x - 190, boss.y - 190, 210, 58, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#6b28c7";
      ctx.font = "900 26px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("BOCK!", boss.x - 85, boss.y - 152);
    } else if (kind === "fly") {
      ctx.strokeStyle = "#f08318";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(state.heroX - 70, state.heroY - 60);
      ctx.quadraticCurveTo(state.heroX, state.heroY - 190, state.heroX + 70, state.heroY - 60);
      ctx.stroke();
      ctx.fillStyle = "#fffef7";
      ctx.font = "900 22px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("1 SECOND", state.heroX, state.heroY - 174);
    } else {
      for (let bot = 0; bot < 3; bot += 1) {
        drawRoosterFlyer(boss.x - 200 + bot * 70, boss.y - 170 + bot * 30);
      }
    }
    ctx.restore();
  }

  function drawRoosterFlyer(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = "#c9ced6";
    ctx.lineWidth = 4;
    roundRect(-22, -14, 44, 34, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d91f2e";
    ctx.beginPath();
    ctx.arc(-6, -22, 8, 0, Math.PI * 2);
    ctx.arc(6, -24, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.moveTo(20, -2);
    ctx.lineTo(42, 6);
    ctx.lineTo(20, 14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawYonatanPowerEffect(kind) {
    const boss = currentBossPosition(state.playerTarget || state.yonatanChomperTarget || currentTarget());
    ctx.save();
    if (kind === "jaw") {
      ctx.strokeStyle = "#1f8f4d";
      ctx.fillStyle = "#fffef7";
      ctx.lineWidth = 6;
      for (let tooth = 0; tooth < 6; tooth += 1) {
        const x = boss.x - 170 + tooth * 26;
        ctx.beginPath();
        ctx.moveTo(x, boss.y - 132);
        ctx.lineTo(x + 13, boss.y - 92);
        ctx.lineTo(x + 26, boss.y - 132);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    } else if (kind === "chomper") {
      ctx.fillStyle = "#4b321f";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(640, 548);
      ctx.lineTo(1240, 548);
      ctx.lineTo(1120, 638);
      ctx.lineTo(690, 630);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fffef7";
      ctx.font = "900 24px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("HALF THE FLOOR FELL!", 930, 590);
    } else if (kind === "tail") {
      ctx.strokeStyle = "#1f8f4d";
      ctx.lineWidth = 18;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(boss.x - 30, boss.y + 10);
      ctx.quadraticCurveTo(730, 545, state.heroX + 70, state.heroY - 30);
      ctx.stroke();
    } else {
      drawTinyAlligator(boss.x - 205, boss.y - 54);
      drawTinyAlligator(boss.x - 150, boss.y - 8);
      drawTinyAlligator(boss.x - 95, boss.y - 48);
    }
    ctx.restore();
  }

  function drawPlayerAttack(kind, missed) {
    if (!kind) return;
    const boss = currentBossPosition(state.playerTarget || currentTarget());
    const startX = state.heroX + 58;
    const startY = state.heroY - 76;
    const endX = missed ? state.heroX + 190 : boss.x - 70;
    const endY = missed ? state.heroY - 100 : boss.y - 66;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (kind === "punch") {
      ctx.strokeStyle = missed ? "rgba(217,31,46,0.55)" : "#ffd84a";
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.fillStyle = "#ffd84a";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(endX, endY, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (kind === "kick") {
      ctx.strokeStyle = missed ? "rgba(217,31,46,0.55)" : "#2e91de";
      ctx.lineWidth = 16;
      ctx.beginPath();
      ctx.arc(state.heroX + 95, state.heroY - 42, 74, -0.8, 0.35);
      ctx.stroke();
      ctx.fillStyle = "#2e91de";
      ctx.strokeStyle = "#171216";
      ctx.lineWidth = 5;
      roundRect(endX - 28, endY - 12, 56, 24, 10);
      ctx.fill();
      ctx.stroke();
    } else if (kind === "power") {
      ctx.strokeStyle = "#7146d9";
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(650, 150, endX, endY);
      ctx.stroke();
      ctx.fillStyle = "#fffef7";
      ctx.strokeStyle = "#7146d9";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(endX, endY, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#7146d9";
      ctx.font = "900 18px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("POWER", endX, endY + 6);
    }
    if (missed) {
      ctx.fillStyle = "#d91f2e";
      ctx.font = "900 28px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("MISS", endX + 38, endY - 18);
    }
    ctx.restore();
  }

  function drawDefenseMove(kind) {
    ctx.save();
    ctx.strokeStyle = kind === "jump" ? "#2e91de" : "#6f737a";
    ctx.fillStyle = kind === "jump" ? "rgba(46,145,222,0.18)" : "rgba(111,115,122,0.28)";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(state.heroX, state.heroY - 74, kind === "jump" ? 82 : 68, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawNumberNet(x, y) {
    ctx.save();
    ctx.strokeStyle = "#7146d9";
    ctx.lineWidth = 5;
    for (let i = -70; i <= 70; i += 28) {
      ctx.beginPath();
      ctx.moveTo(x - 84, y - 128 + i);
      ctx.lineTo(x + 84, y - 18 + i);
      ctx.moveTo(x + 84, y - 128 + i);
      ctx.lineTo(x - 84, y - 18 + i);
      ctx.stroke();
    }
    ctx.fillStyle = "#ffd84a";
    ctx.font = "900 24px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("1 2 + 7 ÃƒÂ·", x, y - 68);
    ctx.restore();
  }

  function drawLetterShot(x, y) {
    ctx.save();
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ["A", "B", "LA", "Z"].forEach((letter, index) => {
      const lx = 820 - index * 80;
      const ly = 300 + index * 18;
      ctx.beginPath();
      ctx.arc(lx, ly, 26, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#d91f2e";
      ctx.font = "900 24px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(letter, lx, ly + 8);
      ctx.fillStyle = "#fffef7";
    });
    ctx.strokeStyle = "#d91f2e";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(795, 338);
    ctx.lineTo(x + 70, y - 70);
    ctx.stroke();
    ctx.restore();
  }

  function drawMadeInChinaBlocks(x, y) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    [
      [840, 315, -0.14],
      [735, 360, 0.12],
      [620, 405, -0.08]
    ].forEach(([bx, by, angle], index) => {
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(angle);
      ctx.fillStyle = ["#f0b84c", "#d99b42", "#ffd36d"][index];
      roundRect(-48, -30, 96, 60, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#d91f2e";
      ctx.font = "900 12px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("MADE IN", 0, -3);
      ctx.fillText("CHINA", 0, 17);
      ctx.restore();
      ctx.strokeStyle = "#d91f2e";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(bx + 70, by - 10);
      ctx.lineTo(bx + 125, by - 22);
      ctx.stroke();
    });
    ctx.strokeStyle = "#d91f2e";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(845, 318);
    ctx.lineTo(x + 74, y - 70);
    ctx.stroke();
    ctx.restore();
  }

  function drawChineseChickenShot(x, y) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    [
      [830, 318, 0.1],
      [730, 372, -0.22],
      [620, 425, 0.18]
    ].forEach(([cx, cy, angle], index) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.fillStyle = ["#f18319", "#ffad42", "#d66b1f"][index];
      ctx.beginPath();
      ctx.ellipse(0, 0, 34, 22, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#ffe0a6";
      ctx.beginPath();
      ctx.arc(-28, 3, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(30, -5, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.strokeStyle = "#f18319";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(cx + 48, cy - 8);
      ctx.lineTo(cx + 103, cy - 22);
      ctx.stroke();
    });
    ctx.strokeStyle = "#f18319";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(830, 322);
    ctx.lineTo(x + 76, y - 68);
    ctx.stroke();
    ctx.restore();
  }

  function drawProtectBurst() {
    ctx.save();
    ctx.strokeStyle = "#18a66a";
    ctx.fillStyle = "rgba(24, 166, 106, 0.18)";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(state.heroX + 52, state.heroY - 82, 72, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#18a66a";
    ctx.font = "900 22px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("BLOCKED", state.heroX + 52, state.heroY - 82);
    ctx.restore();
  }

  function drawBallRoll(x, y, hit) {
    ctx.save();
    ctx.strokeStyle = hit ? "#2e7bc7" : "#18a66a";
    ctx.fillStyle = "#2e7bc7";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(925, 392);
    ctx.quadraticCurveTo(705, 510, x + (hit ? 42 : 120), y + (hit ? 28 : 84));
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + (hit ? 88 : 170), y + (hit ? 5 : 75), 38, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "#fffef7";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x + (hit ? 88 : 170), y + (hit ? 5 : 75), 29, -0.8, 0.8);
    ctx.moveTo(x + (hit ? 58 : 140), y + (hit ? 5 : 75));
    ctx.lineTo(x + (hit ? 118 : 200), y + (hit ? 5 : 75));
    ctx.stroke();
    ctx.restore();
  }

  function drawPaperAttack(x, y, boss) {
    ctx.save();
    ctx.strokeStyle = boss.color;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(910, 250);
    ctx.lineTo(x + 76, y - 78);
    ctx.stroke();
    ctx.fillStyle = boss.accent;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x + 100, y - 116);
    ctx.lineTo(x + 200, y - 150);
    ctx.lineTo(x + 170, y - 92);
    ctx.lineTo(x + 145, y - 48);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawPaperPush(x, y) {
    ctx.save();
    ctx.strokeStyle = "#7146d9";
    ctx.lineWidth = 9;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.moveTo(x + 145 + i * 34, y - 82 + i * 12);
      ctx.lineTo(x + 70 + i * 12, y - 48 + i * 12);
      ctx.stroke();
    }
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 28px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("PUSH", x + 180, y - 22);
    ctx.restore();
  }

  function drawWingWhack(x, y) {
    ctx.save();
    ctx.strokeStyle = "#18a66a";
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.arc(x + 130, y - 62, 84, -1.2, 1.8);
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.font = "900 26px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("WING", x + 172, y - 94);
    ctx.restore();
  }

  function drawPaintbrushArrow(x, y, dodged = false) {
    ctx.save();
    const shotY = projectileY();
    const wallX = 138;
    const hitX = x + 78;
    [0, 1, 2].forEach((index) => {
      const offset = index * 18;
      const brushX = dodged ? wallX + offset * 0.2 : hitX + offset;
      const brushY = shotY + (index - 1) * 18;
      drawFlyingPaintbrush(brushX, brushY, index);
    });
    if (dodged) {
      drawWallBurst(wallX - 18, shotY, "#ef4fa3");
      ctx.fillStyle = "#18a66a";
      ctx.font = "900 24px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(`${state.laneDodgeDirection.toUpperCase()} DODGE`, x + 165, y - 130);
    } else {
      ctx.fillStyle = "#d91f2e";
      ctx.font = "900 22px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(`${laneName(state.projectileLane).toUpperCase()} SHOT`, hitX + 30, shotY - 42);
    }
    ctx.restore();
  }

  function drawFlyingPaintbrush(x, y, index) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.18 + index * 0.1);
    ctx.strokeStyle = ["#ff9ad0", "#ef4fa3", "#ff9ad0"][index];
    ctx.lineWidth = 5;
    for (let streak = 0; streak < 3; streak += 1) {
      ctx.globalAlpha = 0.45 - streak * 0.1;
      ctx.beginPath();
      ctx.moveTo(22 + streak * 18, -10 + streak * 8);
      ctx.lineTo(78 + streak * 18, -18 + streak * 8);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.fillStyle = index === 1 ? "#18a66a" : "#2e91de";
    roundRect(-42, -8, 92, 16, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.arc(-50, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawBookLaunch(x, y, dodged = false) {
    ctx.save();
    const shotY = projectileY();
    const wallX = 130;
    const hitX = x + 72;
    ["BO", "OK", "S"].forEach((book, index) => {
      const bx = dodged ? wallX + index * 32 : hitX + index * 32;
      const by = shotY - 24 + (index - 1) * 18;
      drawFlyingBook(bx, by, book, index);
    });
    if (dodged) {
      drawWallBurst(wallX - 18, shotY, "#6a4b2b");
      ctx.fillStyle = "#18a66a";
      ctx.font = "900 24px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(`${state.laneDodgeDirection.toUpperCase()} DODGE`, x + 165, y - 130);
    } else {
      ctx.fillStyle = "#d91f2e";
      ctx.font = "900 22px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText(`${laneName(state.projectileLane).toUpperCase()} SHOT`, hitX + 45, shotY - 52);
    }
    ctx.restore();
  }

  function projectileY() {
    if (state.projectileLane === "up") return 315;
    if (state.projectileLane === "down") return 445;
    return 380;
  }

  function drawWallBurst(x, y, color) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i < 12; i += 1) {
      const angle = (Math.PI * 2 * i) / 12;
      const radius = i % 2 === 0 ? 38 : 15;
      const px = x + Math.cos(angle) * radius;
      const py = y + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 18px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("BOOM", x, y + 6);
    ctx.restore();
  }

  function drawFlyingBook(x, y, text, index) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.25 + index * 0.22);
    ctx.strokeStyle = ["#d91f2e", "#2e91de", "#7146d9"][index];
    ctx.lineWidth = 5;
    for (let streak = 0; streak < 3; streak += 1) {
      ctx.globalAlpha = 0.42 - streak * 0.1;
      ctx.beginPath();
      ctx.moveTo(76 + streak * 15, 12 + streak * 8);
      ctx.lineTo(124 + streak * 15, 4 + streak * 8);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 5;
    ctx.fillStyle = ["#d91f2e", "#2e91de", "#ffd84a"][index];
    roundRect(0, 0, 70, 44, 6);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(23,18,22,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(35, 4);
    ctx.lineTo(35, 40);
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.font = "900 14px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(text, 35, 28);
    ctx.restore();
  }

  function drawBusStopAttack(x, y) {
    ctx.save();
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    ctx.fillStyle = "#d91f2e";
    ctx.beginPath();
    for (let i = 0; i < 8; i += 1) {
      const angle = Math.PI / 8 + i * Math.PI / 4;
      const radius = 44;
      const px = x + 130 + Math.cos(angle) * radius;
      const py = y - 86 + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.font = "900 22px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText("STOP", x + 130, y - 78);
    ctx.restore();
  }

  function drawPrincipalAttack(x, y, action) {
    ctx.save();
    ctx.strokeStyle = "#49d9ff";
    ctx.lineWidth = 9;
    if (action === "principalWarning") {
      ctx.fillStyle = "#ffd84a";
      ctx.font = "900 28px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("DETENTION?", x + 190, y - 90);
    } else if (action === "principalMultiply") {
      drawImpact("x3", x + 190, y - 80, "#49d9ff");
    } else if (action === "principalGiant") {
      ctx.fillStyle = "#d91f2e";
      ctx.font = "900 34px Trebuchet MS";
      ctx.textAlign = "center";
      ctx.fillText("BIG ROBOT!", x + 190, y - 90);
    } else if (action === "principalFar") {
      ctx.beginPath();
      ctx.moveTo(1040, 205);
      ctx.lineTo(x + 60, y - 90);
      ctx.stroke();
    } else if (action === "principalSpin") {
      ctx.beginPath();
      ctx.arc(x + 138, y - 64, 72, 0, Math.PI * 1.7);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(890, 280);
      ctx.lineTo(x + 70, y - 78);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawGarbageShot(x, y) {
    ctx.save();
    ctx.fillStyle = "#6f737a";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ["core", "bag", "can"].forEach((item, index) => {
      const gx = 820 - index * 80;
      const gy = 310 + index * 24;
      if (item === "core") {
        ctx.fillStyle = "#74c043";
        ctx.beginPath();
        ctx.arc(gx, gy, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillStyle = item === "bag" ? "#5b5b63" : "#c8d0d8";
        roundRect(gx - 24, gy - 18, 48, 36, 8);
        ctx.fill();
        ctx.stroke();
      }
    });
    ctx.strokeStyle = "#d91f2e";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(790, 348);
    ctx.lineTo(x + 70, y - 70);
    ctx.stroke();
    ctx.restore();
  }

  function drawImpact(text, x, y, color) {
    ctx.save();
    ctx.font = "900 58px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = color;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function drawLabel(text, x, y, color, width = 360) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "#fffef7";
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 6;
    roundRect(0, -48, width, 74, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font = "900 30px Trebuchet MS";
    ctx.textAlign = "left";
    ctx.fillText(text, 18, -1);
    ctx.restore();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function addRobotPrincipalLevelButtons() {
    const levelSelect = document.querySelector(".level-select");
    for (let level = 11; level <= 30; level += 1) {
      const button = document.createElement("button");
      button.className = "level-choice";
      button.dataset.level = String(level);
      button.textContent = `Level ${level} ${travelStops[level - 1]}`;
      button.dataset.label = button.textContent;
      levelSelect.append(button);
    }
  }

  addRobotPrincipalLevelButtons();
  els.startButton.addEventListener("click", startLevel);
  els.resetButton.addEventListener("click", resetGame);
  document.querySelectorAll(".level-choice").forEach((button) => {
    button.addEventListener("click", () => chooseLevel(button.dataset.level));
  });
  document.querySelectorAll(".target-choice").forEach((button) => {
    button.addEventListener("click", () => chooseBossTarget(button.dataset.target));
  });
  document.querySelectorAll(".hero-choice").forEach((button) => {
    button.addEventListener("click", () => chooseHero(button.dataset.hero));
  });
  els.punchButton.addEventListener("click", () => attack("punch"));
  els.kickButton.addEventListener("click", () => attack("kick"));
  els.jumpButton.addEventListener("click", () => attack("jump"));
  els.hideButton.addEventListener("click", () => attack("hide"));
  els.powerButtons.forEach((button) => {
    button.addEventListener("click", () => attack("power", Number(button.dataset.powerSlot)));
  });
  document.querySelectorAll(".move-button").forEach((button) => {
    button.addEventListener("click", () => moveHero(button.dataset.move));
  });
  document.addEventListener("keydown", (event) => {
    const moves = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right"
    };
    if (moves[event.key]) {
      event.preventDefault();
      moveHero(moves[event.key]);
    }
    if (event.key === "1") attack("power", 0);
    if (event.key === "2") attack("power", 1);
    if (event.key === "3") attack("power", 2);
    if (event.key === "4") attack("power", 3);
    if (event.key.toLowerCase() === "j") attack("punch");
    if (event.key.toLowerCase() === "k") attack("kick");
    if (event.key === " " || event.key.toLowerCase() === "w") {
      event.preventDefault();
      attack("jump");
    }
    if (event.key.toLowerCase() === "h") attack("hide");
  });

  resetGame();
})();
