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
    hoodie: { name: "Zap Hoodie", color: "#1f1f29", accent: "#49d9ff", hp: 5, firstPower: "Zip Zap" }
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
    }
  };

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
    powerButton: document.getElementById("powerButton")
  };

  const state = {
    started: false,
    won: false,
    lost: false,
    level: 1,
    heroId: "tats",
    heroHp: 6,
    mathHp: 6,
    evilHp: 4,
    foodHp: 5,
    crazyBallHp: 5,
    earnedPowers: new Set(),
    mathRewarded: false,
    evilRewarded: false,
    heroX: 235,
    heroY: 410,
    action: "",
    trappedUntil: 0,
    knockedDownUntil: 0,
    tick: 0
  };

  function resetGame() {
    state.started = false;
    state.won = false;
    state.lost = false;
    state.heroHp = heroes[state.heroId].hp;
    state.mathHp = 5;
    state.evilHp = 5;
    state.foodHp = 5;
    state.crazyBallHp = 5;
    state.earnedPowers = new Set();
    state.mathRewarded = false;
    state.evilRewarded = false;
    state.heroX = 235;
    state.heroY = 410;
    state.action = "";
    state.trappedUntil = 0;
    state.knockedDownUntil = 0;
    state.tick = 0;
    els.statusText.textContent = levels[state.level].intro;
    setAttacks(true);
    updateHud();
    renderPowers();
    draw();
  }

  function startLevel() {
    state.started = true;
    state.won = false;
    state.lost = false;
    els.statusText.textContent = levels[state.level].start;
    setAttacks(false);
    updateHud();
    draw();
  }

  function attack(kind) {
    if (!state.started || state.won || state.lost) {
      return;
    }
    const target = currentTarget();
    const damage = kind === "power" ? usePowerDamage() : kind === "kick" ? 2 : 1;
    if (target === "math") {
      state.mathHp = Math.max(0, state.mathHp - damage);
    } else if (target === "evil") {
      state.evilHp = Math.max(0, state.evilHp - damage);
    } else if (target === "food") {
      state.foodHp = Math.max(0, state.foodHp - damage);
    } else if (target === "crazyBall") {
      state.crazyBallHp = Math.max(0, state.crazyBallHp - damage);
    }
    checkPowerRewards();

    if (currentBossHp() === 0) {
      state.won = true;
      state.action = "win";
      els.statusText.textContent = levelWinText();
      setAttacks(true);
      updateHud();
      draw();
      return;
    }

    const blocked = kind === "power" && state.earnedPowers.has("homeworkShield");
    applyBossPower(target, blocked);
    const bossAction = state.action;
    const bossDamage = target === "food" ? 0.5 : target === "crazyBall" && bossAction === "ballRollMiss" ? 0 : 1;
    state.heroHp = Math.max(0, state.heroHp - (blocked ? 0 : bossDamage));
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
    const bossName = target === "math" ? "Math Monster" : target === "evil" ? "Evil LA" : target === "food" ? "Food Monster Fiasco" : "The Crazy Ball";
    els.statusText.textContent = `You used ${kind}. ${bossName} got hit, then ${bossPowerText(target, blocked, bossAction)}`;
    updateHud();
    draw();
  }

  function applyBossPower(target, blocked) {
    if (blocked) {
      return;
    }
    if (target === "math") {
      state.trappedUntil = Date.now() + 5000;
      state.action = "numberNet";
    } else if (target === "evil") {
      state.knockedDownUntil = Date.now() + 1200;
      state.heroY = clamp(state.heroY + 38, 270, 470);
      state.action = "letterShot";
    } else if (target === "food") {
      state.heroY = clamp(state.heroY + 28, 270, 470);
      state.action = "garbageShot";
    } else {
      const hit = Math.random() < 0.65;
      state.action = hit ? "ballRollHit" : "ballRollMiss";
      if (hit) {
        state.heroX = clamp(state.heroX - 45, 120, 560);
      }
    }
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
    return bossAction === "ballRollHit" ? "The Crazy Ball rolled on top of you and attacked!" : "The Crazy Ball rolled by and missed!";
  }

  function currentTarget() {
    if (state.level === 1) {
      return state.mathHp > 0 ? "math" : "evil";
    }
    return state.level === 2 ? "food" : "crazyBall";
  }

  function currentBossHp() {
    if (state.level === 1) return state.mathHp + state.evilHp;
    if (state.level === 2) return state.foodHp;
    return state.crazyBallHp;
  }

  function currentBossMaxHp() {
    return state.level === 1 ? 10 : 5;
  }

  function levelWinText() {
    if (state.level === 1) return "You beat the Math Monster and Evil LA!";
    if (state.level === 2) return "You beat Food Monster Fiasco!";
    return "You beat The Crazy Ball in the gym!";
  }

  function usePowerDamage() {
    if (state.earnedPowers.has("poetryBlast")) {
      state.earnedPowers.delete("poetryBlast");
      renderPowers();
      return 4;
    }
    return 3;
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
    els.statusText.textContent = `${heroes[id].name} is ready for Big Bad Boss Battle 2.`;
    updatePowerButton();
    updateHud();
    draw();
  }

  function chooseLevel(level) {
    state.level = Number(level);
    document.querySelectorAll(".level-choice").forEach((button) => {
      button.classList.toggle("selected", Number(button.dataset.level) === state.level);
    });
    els.startButton.textContent = `Start Level ${state.level}`;
    resetGame();
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
    state.heroX = clamp(state.heroX, 120, 560);
    state.heroY = clamp(state.heroY, 270, 470);
    state.action = "";
    els.statusText.textContent = `Hero moved ${direction}.`;
    draw();
  }

  function updateHud() {
    const hero = heroes[state.heroId];
    els.levelEyebrow.textContent = `Level ${state.level}`;
    els.selectedHeroName.textContent = hero.name;
    els.heroHearts.textContent = `${hero.name}: ${state.heroHp} hearts`;
    els.bossHearts.textContent = `${state.level === 1 ? "Bosses" : state.level === 2 ? "Food Monster" : "Crazy Ball"}: ${currentBossHp()} hearts`;
    updatePowerButton();
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
    }
    drawAction();
  }

  function drawSchool() {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
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
    ctx.fillText(state.level === 1 ? "LEVEL 1: CLASSROOM" : state.level === 2 ? "LEVEL 2: CAFETERIA" : "LEVEL 3: GYM", 625, 270);
    ctx.font = "900 28px Trebuchet MS";
    ctx.fillText(state.level === 1 ? "2 + 2 = BOSS?" : state.level === 2 ? "TODAY'S LUNCH: TROUBLE" : "DODGE THE ROLL!", 625, 318);

    if (state.level === 2) {
      drawCafeteriaTables();
    } else if (state.level === 3) {
      drawGymLines();
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
    drawBar(50, 44, 430, hero.name.toUpperCase(), state.heroHp, hero.hp, hero.accent);
    drawBar(800, 44, 430, state.level === 1 ? "SCHOOL BOSSES" : state.level === 2 ? "FOOD MONSTER FIASCO" : "THE CRAZY BALL", currentBossHp(), currentBossMaxHp(), "#d91f2e");
    drawLabel(levels[state.level].title.toUpperCase(), 420, 122, "#ffd84a", 440);
  }

  function drawBar(x, y, width, label, hp, maxHp, color) {
    const pct = Math.max(0, hp) / Math.max(1, maxHp);
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
    ctx.fillStyle = "#f1dada";
    roundRect(x + 16, y + 42, width - 32, 18, 5);
    ctx.fill();
    ctx.fillStyle = color;
    roundRect(x + 16, y + 42, (width - 32) * pct, 18, 5);
    ctx.fill();
    ctx.restore();
  }

  function drawHero(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(0, -58, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    const hero = heroes[state.heroId];
    ctx.fillStyle = hero.color;
    roundRect(-38, -18, 76, 88, 12);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-14, -62, 5, 0, Math.PI * 2);
    ctx.arc(14, -62, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, -50, 18, 0, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-38, 6);
    ctx.lineTo(-82, 32);
    ctx.moveTo(38, 6);
    ctx.lineTo(82, -18);
    ctx.moveTo(-24, 70);
    ctx.lineTo(-44, 112);
    ctx.moveTo(24, 70);
    ctx.lineTo(44, 112);
    ctx.stroke();
    ctx.fillStyle = hero.accent;
    ctx.font = "900 20px Trebuchet MS";
    ctx.textAlign = "center";
    ctx.fillText(hero.name.toUpperCase().slice(0, 12), 0, 26);
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
    ctx.fillText("÷", -28, 48);
    ctx.fillText("3", 30, 50);
    ctx.fillText("=", 0, 82);
    drawLabel("MATH MONSTER", -156, -124, "#7d43d6", 300);
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
    drawLabel("EVIL LA", -96, -126, "#d91f2e", 190);
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
    drawLabel("FOOD MONSTER FIASCO", -220, -130, "#d91f2e", 390);
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
    drawLabel("THE CRAZY BALL", -170, -112, "#2e7bc7", 330);
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
    } else {
      ctx.strokeStyle = "#ffd84a";
      ctx.beginPath();
      ctx.moveTo(state.heroX + 80, state.heroY - 80);
      ctx.lineTo(805, 320);
      ctx.stroke();
      ctx.strokeStyle = "#d91f2e";
      ctx.beginPath();
      ctx.moveTo(state.level === 2 ? 880 : 900, 305);
      ctx.quadraticCurveTo(670, 220, state.heroX + 60, state.heroY - 80);
      ctx.stroke();
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
      } else {
        drawImpact("BOSS HIT!", 650, 215, "#d91f2e");
      }
    }
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
