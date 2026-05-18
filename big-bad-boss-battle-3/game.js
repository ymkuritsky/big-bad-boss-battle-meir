(() => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const heroes = {
    tats: { name: "Super Tats", color: "#1478cf", accent: "#78c9ff", hp: 5, firstPower: "Giant Punch" },
    fary: { name: "Mom Fary", color: "#8542d8", accent: "#ff89c6", hp: 5, firstPower: "Wing Gust" },
    apple: { name: "Super Appie Juice", color: "#f18319", accent: "#ffcf54", hp: 5, firstPower: "Apple Juice Shot" },
    freddy: { name: "Freddy", color: "#17633c", accent: "#f0cf62", hp: 5, firstPower: "Mammal" },
    benji: { name: "Benji", color: "#6f737a", accent: "#45a6db", hp: 5, firstPower: "Tornado" },
    frost: { name: "Mr. 67", color: "#146e8f", accent: "#6cf0c2", hp: 5, firstPower: "Freeze Block" },
    ness: { name: "Super Ness", color: "#c73583", accent: "#6bd8ff", hp: 5, firstPower: "Super Kick" },
    crayon: { name: "Captain Crayonstorm", color: "#21a36c", accent: "#f5d129", hp: 5, firstPower: "Crayon Barrage" },
    hoodie: { name: "Zap Hoodie", color: "#1f1f29", accent: "#49d9ff", hp: 5, firstPower: "Zip Zap" },
    mayer: { name: "Mischievous Mayer", color: "#6b28c7", accent: "#f08318", hp: 5, firstPower: "Mischief Zap" },
    yonatan: { name: "Yapping Yonatan", color: "#f07918", accent: "#d61f2f", hp: 5, firstPower: "Yap Blast" }
  };

  const levels = {
    1: {
      title: "Level 1 Classroom",
      intro: "The Math Monster and Evil LA are waiting in the classroom.",
      start: "Level 1 started in the classroom. Fight the Math Monster and Evil LA!"
    },
    2: {
      title: "Level 2 Cafeteria",
      intro: "Food Monster Fiasco is stomping around the cafeteria.",
      start: "Level 2 started in the cafeteria. Dodge garbage and fight Food Monster Fiasco!"
    },
    3: {
      title: "Level 3 Gym",
      intro: "The Crazy Ball is rolling around the gym.",
      start: "Level 3 started in the gym. Watch out when The Crazy Ball rolls!"
    },
    4: {
      title: "Level 4 Airplane Attacker",
      intro: "The Airplane Attacker is circling outside the school.",
      start: "Level 4 started. The Airplane Attacker dives at you from above!"
    },
    5: {
      title: "Level 5 Paper Pusher",
      intro: "The Paper Pusher is waiting outside by the school yard.",
      start: "Level 5 started. The Paper Pusher tries to push you across the floor!"
    },
    6: {
      title: "Level 6 Wing Whacker",
      intro: "The Wing Whacker is flapping around outside in the wind.",
      start: "Level 6 started. The Wing Whacker swings its paper wings!"
    },
    7: {
      title: "Level 7 Art Archer",
      intro: "The Art Archer is waiting in the art room.",
      start: "Level 7 started in the art room. Paintbrushes come in slowly, so move up or down to dodge before you attack!"
    },
    8: {
      title: "Level 8 Librarian Launcher",
      intro: "The Librarian Launcher is guarding the library.",
      start: "Level 8 started in the library. BO-OK-S books come in slowly, so move up or down to dodge before you attack!"
    },
    9: {
      title: "Level 9 Field Trip Terror",
      intro: "The Field Trip Terror is roaring in the parking lot.",
      start: "Level 9 started in the parking lot. Do not get trapped by the stop sign!"
    },
    10: {
      title: "Level 10 Robot Principal's Office",
      intro: "The Robot Principal is waiting inside the principal's office.",
      start: "Level 10 started in the principal's office. Fight the Robot Principal!"
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
      board: "LEVEL 4: OUTSIDE",
      note: "DODGE THE DIVE!",
      maxHp: 7
    },
    5: {
      target: "pusher",
      name: "Paper Pusher",
      type: "paper",
      hpKey: "pusherHp",
      action: "paperPush",
      color: "#7146d9",
      accent: "#9edcff",
      board: "LEVEL 5: SCHOOL YARD",
      note: "DON'T GET PUSHED!",
      maxHp: 7
    },
    6: {
      target: "whacker",
      name: "Wing Whacker",
      type: "paper",
      hpKey: "whackerHp",
      action: "wingWhack",
      color: "#18a66a",
      accent: "#fffef7",
      board: "LEVEL 6: WINDY OUTSIDE",
      note: "WATCH THE WINGS!",
      maxHp: 7
    },
    7: {
      target: "archer",
      name: "Art Archer",
      type: "archer",
      hpKey: "archerHp",
      action: "paintbrushArrow",
      color: "#ef4fa3",
      accent: "#ffd84a",
      board: "LEVEL 7: ART ROOM",
      note: "PAINTBRUSH ARROWS!",
      maxHp: 7
    },
    8: {
      target: "librarian",
      name: "Librarian Launcher",
      type: "librarian",
      hpKey: "librarianHp",
      action: "bookLaunch",
      color: "#6a4b2b",
      accent: "#9edcff",
      board: "LEVEL 8: LIBRARY",
      note: "BOOKS ARE FLYING!",
      maxHp: 7
    },
    9: {
      target: "bus",
      name: "Field Trip Terror",
      type: "bus",
      hpKey: "busHp",
      action: "busStop",
      color: "#ffd84a",
      accent: "#d91f2e",
      board: "LEVEL 9: PARKING LOT",
      note: "STOP SIGN TRAP!",
      maxHp: 7
    },
    10: {
      target: "principal",
      name: "Robot Principal",
      type: "principal",
      hpKey: "principalHp",
      action: "principalWarning",
      color: "#6f737a",
      accent: "#49d9ff",
      board: "LEVEL 10: PRINCIPAL'S OFFICE",
      note: "OFFICE BOSS!",
      maxHp: 7
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
    levels[level] = {
      title: `Level ${level} Robot Principal Rematch`,
      intro: `More Robot Principals are waiting in level ${level}.`,
      start: `Level ${level} started. Robot Principal uses ${trick.label.toLowerCase()} tricks!`
    };
    bossLevels[level] = {
      target: "principal",
      name: level === 30 ? "Final Robot Principal" : `Robot Principal ${level}`,
      type: "principal",
      hpKey: "principalHp",
      action: trick.action,
      color: level === 30 ? "#d91f2e" : "#6f737a",
      accent: level === 30 ? "#ffd84a" : "#49d9ff",
      board: `LEVEL ${level}: ROBOT PRINCIPAL`,
      note: trick.note,
      maxHp: 7
    };
  }

  const powerUps = {
    homeworkShield: {
      name: "Homework Shield",
      unlock: "Beat Math Monster",
      description: "Blocks one boss hit."
    },
    poetryBlast: {
      name: "Poetry Blast",
      unlock: "Beat Evil LA",
      description: "Does a strong word attack."
    }
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
    powerButton: document.getElementById("powerButton")
  };

  const state = {
    started: false,
    won: false,
    lost: false,
    level: 1,
    heroId: "tats",
    heroHp: 6,
    mathHp: 7,
    evilHp: 6,
    foodHp: 7,
    crazyBallHp: 7,
    airplaneHp: 7,
    pusherHp: 7,
    whackerHp: 7,
    archerHp: 7,
    librarianHp: 7,
    busHp: 7,
    principalHp: 7,
    earnedPowers: new Set(),
    mathRewarded: false,
    evilRewarded: false,
    heroX: 235,
    heroY: 410,
    action: "",
    playerAction: "",
    playerTarget: "",
    trappedUntil: 0,
    knockedDownUntil: 0,
    hiddenUntil: 0,
    jumpingUntil: 0,
    laneDodgeUntil: 0,
    laneDodgeDirection: "",
    projectileLane: "middle",
    bossPressureStep: 0,
    tick: 0
  };

  const progress = {
    unlockedLevel: Number(localStorage.getItem("bbb3UnlockedLevel") || "1")
  };

  function resetGame() {
    state.started = false;
    state.won = false;
    state.lost = false;
    state.heroHp = heroes[state.heroId].hp;
    state.mathHp = 7;
    state.evilHp = 6;
    state.foodHp = 7;
    state.crazyBallHp = 7;
    state.airplaneHp = 7;
    state.pusherHp = 7;
    state.whackerHp = 7;
    state.archerHp = 7;
    state.librarianHp = 7;
    state.busHp = 7;
    state.principalHp = currentBossMaxHp();
    state.earnedPowers = new Set();
    state.mathRewarded = false;
    state.evilRewarded = false;
    state.heroX = 235;
    state.heroY = 410;
    state.action = "";
    state.playerAction = "";
    state.playerTarget = "";
    state.trappedUntil = 0;
    state.knockedDownUntil = 0;
    state.hiddenUntil = 0;
    state.jumpingUntil = 0;
    state.laneDodgeUntil = 0;
    state.laneDodgeDirection = "";
    state.projectileLane = "middle";
    state.bossPressureStep = 0;
    state.tick = 0;
    els.statusText.textContent = levels[state.level].intro;
    setAttacks(true);
    updateHud();
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
    els.statusText.textContent = levels[state.level].start;
    setAttacks(false);
    updateLevelLocks();
    updateHud();
    draw();
  }

  function attack(kind) {
    if (!state.started || state.won || state.lost) {
      els.statusText.textContent = "Press Start Level first, then you can punch, kick, and use powers.";
      return;
    }
    if (kind === "jump" || kind === "hide") {
      useDefenseMove(kind);
      return;
    }
    const target = currentTarget();
    state.playerTarget = target;
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
    const damage = kind === "power" ? usePowerDamage() : kind === "kick" ? 2 : 1;
    damageBoss(target, damage);
    checkPowerRewards();

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

    const shieldBlocked = kind === "power" && state.heroId === "fary" && state.earnedPowers.has("homeworkShield");
    const blocked = shieldBlocked;
    const laneDodged = canLaneDodge(target) && Date.now() < state.laneDodgeUntil && dodgeBeatsLane(state.laneDodgeDirection, state.projectileLane);
    const dodged = Date.now() < state.hiddenUntil || Date.now() < state.jumpingUntil || laneDodged;
    applyBossPower(target, blocked, dodged);
    const bossAction = state.action;
    const bossDamage = bossDamageForAction(bossAction);
    state.heroHp = Math.max(0, state.heroHp - (blocked || dodged ? 0 : bossDamage));
    if (state.heroHp === 0) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = "The school bosses won this round. Reset for a rematch.";
      setAttacks(true);
      updateHud();
      draw();
      return;
    }

    state.action = blocked ? `${kind}-${target}` : bossAction;
    const bossName = currentBossName(target);
    els.statusText.textContent = `${attackName(kind)} hit ${bossName} for ${heartText(damage)}. ${bossCounterText(target, blocked, dodged, laneDodged, bossAction, bossDamage)}`;
    updateHud();
    draw();
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
  }

  function applyBossPower(target, blocked, avoided = false) {
    if (blocked) {
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
    if (kind === "power") return heroes[state.heroId].firstPower;
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
    if (target === "math") return "Math Monster threw Number Nets.";
    if (target === "evil") return "Evil LA shot letters.";
    if (target === "food") return "Food Monster Fiasco shot garbage.";
    if (target === "airplane") return "Airplane Attacker flew high, bent its wings, and dove down.";
    if (target === "pusher") return "Paper Pusher rushed forward.";
    if (target === "whacker") return "Wing Whacker bent its wings and swung hard.";
    if (target === "archer") return "Art Archer shot paintbrush arrows.";
    if (target === "librarian") return "Librarian Launcher launched books.";
    if (target === "bus") return "Field Trip Terror flashed its stop sign.";
    if (target === "principal") {
      if (bossAction === "principalWarning") return "Robot Principal stomped around the office.";
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
    if (target === "math") {
      return "Math Monster used Number Nets and caught you for 5 seconds!";
    }
    if (target === "evil") {
      return "Evil LA shot letters at you and knocked you down!";
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
      if (bossAction === "principalWarning") return "Robot Principal stomped around the office. No big power yet!";
      if (bossAction === "principalMultiply") return "Robot Principal multiplied into extra copies!";
      if (bossAction === "principalGiant") return "Robot Principal turned giant!";
      if (bossAction === "principalFar") return "Robot Principal attacked from farther away!";
      if (bossAction === "principalSpin") return "Robot Principal spun around the office!";
      return "Robot Principal fired a principal laser from the office!";
    }
    return bossAction === "ballRollHit" ? "The Crazy Ball rolled on top of you and attacked!" : "The Crazy Ball rolled by and missed!";
  }

  function currentTarget() {
    if (state.level === 1) {
      return state.mathHp > 0 ? "math" : "evil";
    }
    if (state.level === 2) return "food";
    if (state.level === 3) return "crazyBall";
    return bossLevels[state.level].target;
  }

  function currentBossHp() {
    if (state.level === 1) return state.mathHp + state.evilHp;
    if (state.level === 2) return state.foodHp;
    if (state.level === 3) return state.crazyBallHp;
    return state[bossLevels[state.level].hpKey];
  }

  function currentBossMaxHp() {
    if (state.level === 1) return 13;
    if (state.level === 2) return 7;
    if (state.level === 3) return 7;
    if (state.level >= 4) return bossLevels[state.level].maxHp || 5;
    return 7;
  }

  function levelWinText() {
    if (state.level === 1) return "You beat the Math Monster and Evil LA!";
    if (state.level === 2) return "You beat Food Monster Fiasco!";
    if (state.level === 3) return "You beat The Crazy Ball in the gym!";
    return `You beat ${bossLevels[state.level].name}!`;
  }

  function currentBossName(target = currentTarget()) {
    if (target === "math") return "Math Monster";
    if (target === "evil") return "Evil LA";
    if (target === "food") return "Food Monster Fiasco";
    if (target === "crazyBall") return "The Crazy Ball";
    if (target === "principal") return bossLevels[state.level].name;
    return Object.values(bossLevels).find((boss) => boss.target === target).name;
  }

  function currentBossPosition(target = currentTarget()) {
    if (target === "math") return { x: 900, y: 355 };
    if (target === "evil") return { x: 1045, y: 410 };
    if (target === "food") return { x: 950, y: 390 };
    if (target === "crazyBall") return { x: 950, y: 390 };
    return { x: 950, y: 380 };
  }

  function isCloseEnoughToAttack(kind, target) {
    const boss = currentBossPosition(target);
    const dx = Math.abs(state.heroX - boss.x);
    const dy = Math.abs(state.heroY - boss.y);
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
      els.statusText.textContent = "Power-up earned: Homework Shield!";
      renderPowers();
    }
    if (!state.evilRewarded && state.evilHp === 0) {
      state.evilRewarded = true;
      state.earnedPowers.add("poetryBlast");
      els.statusText.textContent = "Power-up earned: Poetry Blast!";
      renderPowers();
    }
  }

  function chooseHero(id) {
    state.heroId = id;
    state.heroHp = heroes[id].hp;
    document.querySelectorAll(".hero-choice").forEach((button) => {
      button.classList.toggle("selected", button.dataset.hero === id);
    });
    els.statusText.textContent = `${heroes[id].name} is ready for Big Bad Boss Battle 3.`;
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

  function canPlayLevel(level) {
    return level <= progress.unlockedLevel;
  }

  function unlockNextLevel() {
    if (state.level < 30 && progress.unlockedLevel < state.level + 1) {
      progress.unlockedLevel = state.level + 1;
      localStorage.setItem("bbb3UnlockedLevel", String(progress.unlockedLevel));
      els.statusText.textContent = `${levelWinText()} Level ${progress.unlockedLevel} unlocked!`;
    }
  }

  function advanceAfterWin() {
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

  function moveHero(direction) {
    if (!state.started || state.won || state.lost) {
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
    const target = currentTarget();
    if (handleBossPressureWhileMoving(target, direction)) {
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
    draw();
  }

  function handleBossPressureWhileMoving(target, direction) {
    if (!bossPressuresWhileMoving(target) || isCloseEnoughToAttack("kick", target)) {
      state.bossPressureStep = 0;
      return false;
    }
    state.bossPressureStep += 1;
    if (canLaneDodge(target)) {
      state.projectileLane = nextProjectileLane();
    }
    const laneDodged = canLaneDodge(target) && direction && dodgeBeatsLane(direction, state.projectileLane);
    const jumpOrHideDodged = Date.now() < state.hiddenUntil || Date.now() < state.jumpingUntil;
    const dodged = laneDodged || jumpOrHideDodged;
    const canHitThisMove = canLaneDodge(target) ? !laneDodged : state.bossPressureStep % 3 === 0;
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
    const damage = bossDamageForAction(bossAction);
    state.heroHp = Math.max(0, state.heroHp - damage);
    if (state.heroHp === 0) {
      state.lost = true;
      state.action = "lost";
      els.statusText.textContent = "The school bosses won this round. Reset for a rematch.";
      setAttacks(true);
      return true;
    }
    els.statusText.textContent = `${bossPowerText(target, false, bossAction)} You lost ${heartText(damage)}. Get closer to stop the attacks!`;
    return true;
  }

  function bossPressuresWhileMoving(target) {
    return target === "airplane" || target === "pusher" || target === "whacker" || target === "archer" || target === "librarian" || target === "bus";
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
    els.levelEyebrow.textContent = `Level ${state.level}`;
    els.selectedHeroName.textContent = hero.name;
    renderHeartMeter(els.heroHearts, hero.name, state.heroHp, hero.hp);
    renderHeartMeter(els.bossHearts, state.level === 1 ? "Bosses" : currentBossName(), currentBossHp(), currentBossMaxHp());
    updatePowerButton();
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
      if (hp >= index) {
        heart.classList.add("full");
      } else if (hp > index - 1) {
        heart.classList.add("half");
      } else {
        heart.classList.add("empty");
      }
      heart.textContent = "♥";
      hearts.append(heart);
    }
    element.append(name, hearts);
  }

  function updatePowerButton() {
    const hero = heroes[state.heroId];
    els.powerButton.textContent = hero ? hero.firstPower : "Use Power-Up";
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
    els.powerButton.disabled = disabled;
  }

  function draw() {
    state.tick += 1;
    drawSchool();
    drawHealthBars();
    drawHero(state.heroX, state.heroY);
    if (state.level === 1) {
      if (state.mathHp > 0) drawMathMonster(900, 355);
      if (state.evilHp > 0) drawEvilLa(1045, 410);
    } else if (state.level === 2 && state.foodHp > 0) {
      drawFoodMonsterFiasco(950, 390);
    } else if (state.level === 3 && state.crazyBallHp > 0) {
      drawCrazyBall(950, 390);
    } else if (state.level >= 4 && currentBossHp() > 0) {
      drawBossCharacter(950, 380, bossLevels[state.level]);
    }
    drawAction();
  }

  function drawSchool() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    if (state.level >= 4) {
      drawBossLevelRoom(w, h);
      return;
    }
    ctx.fillStyle = "#9edcff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#f7edd0";
    ctx.fillRect(0, 155, w, 400);
    ctx.fillStyle = "#8ccf8b";
    ctx.fillRect(0, 555, w, 165);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 8;
    ctx.strokeRect(0, 155, w, 400);

    ctx.fillStyle = "#fffef7";
    for (let x = 70; x < w; x += 210) {
      roundRect(x, 195, 120, 92, 8);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + 60, 195);
      ctx.lineTo(x + 60, 287);
      ctx.moveTo(x, 241);
      ctx.lineTo(x + 120, 241);
      ctx.stroke();
    }

    ctx.fillStyle = "#2f6f52";
    roundRect(410, 205, 430, 160, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "900 36px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(boardTitle(), 625, 270);
    ctx.font = "900 28px Trebuchet MS";
    ctx.fillText(boardNote(), 625, 318);

    if (state.level === 2) {
      drawCafeteriaTables();
    } else if (state.level === 3) {
      drawGymLines();
    } else if (state.level >= 4) {
      drawPaperOutsideDetails();
    }

    ctx.fillStyle = "#b86a32";
    ctx.fillRect(545, 455, 160, 100);
    ctx.strokeRect(545, 455, 160, 100);
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.arc(680, 505, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
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
    if (state.level === 1) return "LEVEL 1: CLASSROOM";
    if (state.level === 2) return "LEVEL 2: CAFETERIA";
    if (state.level === 3) return "LEVEL 3: GYM";
    return bossLevels[state.level].board;
  }

  function boardNote() {
    if (state.level === 1) return "2 + 2 = BOSS?";
    if (state.level === 2) return "TODAY'S LUNCH: TROUBLE";
    if (state.level === 3) return "DODGE THE ROLL!";
    return bossLevels[state.level].note;
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
    drawHeartBar(50, 44, 430, hero.name.toUpperCase(), state.heroHp, hero.hp, hero.accent);
    drawHeartBar(800, 44, 430, state.level === 1 ? "SCHOOL BOSSES" : currentBossName().toUpperCase(), currentBossHp(), currentBossMaxHp(), "#d91f2e");
    drawLabel(`FIGHTING: ${currentBossName().toUpperCase()}`, 365, 122, "#ffd84a", 550);
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
      const heartX = x + index * (size + gap);
      const fillAmount = clamp(hp - index, 0, 1);
      ctx.save();
      ctx.font = `900 ${size}px Trebuchet MS`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#171216";
      ctx.fillStyle = "#f1dada";
      ctx.strokeText("♥", heartX, y);
      ctx.fillText("♥", heartX, y);
      if (fillAmount > 0) {
        ctx.beginPath();
        ctx.rect(heartX - 2, y - size, (size + 6) * fillAmount, size * 1.45);
        ctx.clip();
        ctx.fillStyle = color;
        ctx.strokeText("♥", heartX, y);
        ctx.fillText("♥", heartX, y);
      }
      ctx.restore();
    }
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
    ctx.fillText("÷", -28, 48);
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
    } else {
      drawPlayerAttack(state.playerAction, false);
      if (state.action === "numberNet") {
        drawNumberNet(state.heroX, state.heroY);
        drawImpact("NUMBER NET!", 650, 215, "#7146d9");
      } else if (state.action === "letterShot") {
        drawLetterShot(state.heroX, state.heroY);
        drawImpact("LETTER SHOT!", 650, 215, "#d91f2e");
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
      } else if (state.action.startsWith("principal")) {
        drawPrincipalAttack(state.heroX, state.heroY, state.action);
        drawImpact("PRINCIPAL!", 650, 215, "#6f737a");
      } else {
        drawImpact("BLOCKED!", 650, 215, "#18a66a");
      }
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
    ctx.fillText("1 2 + 7 ÷", x, y - 68);
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
      button.textContent = level === 30 ? "Level 30 Final Robot Principal" : `Level ${level} Robot Principal`;
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
  document.querySelectorAll(".hero-choice").forEach((button) => {
    button.addEventListener("click", () => chooseHero(button.dataset.hero));
  });
  els.punchButton.addEventListener("click", () => attack("punch"));
  els.kickButton.addEventListener("click", () => attack("kick"));
  els.jumpButton.addEventListener("click", () => attack("jump"));
  els.hideButton.addEventListener("click", () => attack("hide"));
  els.powerButton.addEventListener("click", () => attack("power"));
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
    if (event.key === "1") attack("punch");
    if (event.key === "2") attack("kick");
    if (event.key === "3") attack("power");
  });

  resetGame();
})();

