(() => {
  const characters = {
    smiley: {
      id: "smiley",
      name: "Smiley Bone",
      color: "#fffef7",
      accent: "#ffd84a",
      line: "Smiley Bone is ready to pick a mystery box!"
    },
    phony: {
      id: "phony",
      name: "Phony",
      color: "#e8e0d8",
      accent: "#7d43d6",
      line: "Phony says this board is probably suspicious."
    },
    grandmaBen: {
      id: "grandmaBen",
      name: "Grandma Ben",
      color: "#ffe1c7",
      accent: "#18a66a",
      line: "Grandma Ben says nobody messes with Thursday."
    }
  };

  const mysteryBoxes = [
    { id: "a1", label: "A1", title: "Lucky Tiny Harbor", text: "the Tiny Harbor Guard, who drops a bonus snack when beaten.", theme: "harbor", villain: "tinyGuard" },
    { id: "a2", label: "A2", title: "Fog Box", text: "the Fog Phantom, a sneaky villain hiding in the mist.", theme: "fog", villain: "fogPhantom" },
    { id: "a3", label: "A3", title: "Bone Island", text: "the Bone Island Trickster, who tries to confuse the bones.", theme: "island", villain: "boneTrickster" },
    { id: "a4", label: "A4", title: "Stormy Sea", text: "the Storm Bell Bully, who rings the battleship warning bell.", theme: "storm", villain: "stormBully" },
    { id: "a5", label: "A5", title: "Secret Dock", text: "King Dock, hiding under the secret dock with one of his old traps.", theme: "dock", villain: "kingDock" },
    { id: "b1", label: "B1", title: "Rat Creature Alley", text: "A huge black rat creature stomps out with a black face and heavy feet.", theme: "deep", villain: "ratCreature" },
    { id: "b2", label: "B2", title: "Submarine Door", text: "the Submarine Sneak, who pops out through a squeaky submarine door.", theme: "submarine", villain: "subSneak" },
    { id: "b3", label: "B3", title: "Lord of Locusts", text: "The green Lord of Locusts appears with buzzing locusts coming out everywhere.", theme: "locust", villain: "locustLord" },
    { id: "b4", label: "B4", title: "Wrong Turn Wave", text: "the Wave Wizard, who uses a giant wave to send heroes the wrong way.", theme: "wave", villain: "waveWizard" },
    { id: "b5", label: "B5", title: "Rat Creature Pack", text: "Two black rat creatures block the way and dare you to pick another box.", theme: "deep", villain: "ratPack" },
    { id: "c1", label: "C1", title: "Quiet Square", text: "the Quiet Sneak, who waits silently before jumping out.", theme: "quiet", villain: "quietSneak" },
    { id: "c2", label: "C2", title: "Mystery Splash", text: "the Splash Gobbler, who jumps out of the water with a huge splash.", theme: "splash", villain: "splashGobbler" },
    { id: "c3", label: "C3", title: "Thursday Box", text: "the Thursday Trickster, who hums like he knows every secret.", theme: "thursday", villain: "thursdayTrickster" },
    { id: "c4", label: "C4", title: "MIM's Fire Breath", text: "MIM the giant red dragon rises near the bottom of the board and shoots fire breath.", theme: "storm", villain: "mim" },
    { id: "c5", label: "C5", title: "Bartlebee's Deep Water", text: "Bartlebee, the mega rat creature, waits very far down with a giant club in his hand.", theme: "deep", villain: "bartlebee" }
  ];

  const state = {
    character: null,
    revealed: new Set()
  };

  const els = {
    views: {
      character: document.getElementById("characterView"),
      board: document.getElementById("boardView"),
      scene: document.getElementById("sceneView")
    },
    resetButton: document.getElementById("resetButton"),
    battleGrid: document.getElementById("battleGrid"),
    playerCanvas: document.getElementById("playerCanvas"),
    playerName: document.getElementById("playerName"),
    playerLine: document.getElementById("playerLine"),
    sceneCanvas: document.getElementById("sceneCanvas"),
    sceneTitle: document.getElementById("sceneTitle"),
    sceneText: document.getElementById("sceneText"),
    backToBoardButton: document.getElementById("backToBoardButton"),
    newCharacterButton: document.getElementById("newCharacterButton")
  };

  const sceneCtx = els.sceneCanvas.getContext("2d");

  function showView(name) {
    Object.entries(els.views).forEach(([key, view]) => view.classList.toggle("active", key === name));
  }

  function chooseCharacter(id) {
    state.character = characters[id];
    els.playerName.textContent = state.character.name;
    els.playerLine.textContent = state.character.line;
    drawBone(els.playerCanvas.getContext("2d"), state.character, 1);
    renderBoard();
    showView("board");
  }

  function renderBoard() {
    els.battleGrid.innerHTML = "";
    mysteryBoxes.forEach((box) => {
      const button = document.createElement("button");
      button.className = `cell-button${state.revealed.has(box.id) ? " revealed" : ""}`;
      button.type = "button";
      button.textContent = state.revealed.has(box.id) ? "!" : box.label;
      button.addEventListener("click", () => revealBox(box));
      els.battleGrid.append(button);
    });
  }

  function revealBox(box) {
    state.revealed.add(box.id);
    els.sceneTitle.textContent = "Mystery Box Opened";
    els.sceneText.textContent = `${state.character.name} found ${box.text}`;
    drawScene(box);
    showView("scene");
  }

  function resetGame() {
    state.character = null;
    state.revealed.clear();
    showView("character");
    drawCharacterCards();
  }

  function drawCharacterCards() {
    document.querySelectorAll(".character-card").forEach((card) => {
      const id = card.dataset.character;
      const canvas = card.querySelector("canvas");
      if (id === "grandmaBen") {
        drawGrandmaBen(canvas.getContext("2d"), characters[id], 1);
      } else {
        drawBone(canvas.getContext("2d"), characters[id], id === "phony" ? 0.94 : 1);
      }
    });
  }

  function drawBone(ctx, character, scale = 1) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2 + 18);
    ctx.scale(scale, scale);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#171216";
    ctx.fillStyle = character.color;
    boneShape(ctx);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-22, -18, 5, 0, Math.PI * 2);
    ctx.arc(22, -18, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (character.id === "smiley") {
      ctx.arc(0, -6, 30, 0.15, Math.PI - 0.15);
    } else {
      ctx.moveTo(-26, 18);
      ctx.quadraticCurveTo(0, 8, 26, 18);
      ctx.moveTo(-35, -36);
      ctx.lineTo(-9, -28);
      ctx.moveTo(35, -36);
      ctx.lineTo(9, -28);
    }
    ctx.stroke();
    ctx.fillStyle = character.accent;
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 48, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawGrandmaBen(ctx, character, scale = 1) {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2 + 22);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#171216";
    ctx.lineWidth = 7;
    ctx.fillStyle = character.color;
    ctx.beginPath();
    ctx.ellipse(-70, 50, 30, 52, -0.55, 0, Math.PI * 2);
    ctx.ellipse(70, 50, 30, 52, 0.55, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.arc(-82, 88, 22, 0, Math.PI * 2);
    ctx.arc(82, 88, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = character.accent;
    roundRect(ctx, -46, 38, 92, 66, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = character.color;
    ctx.beginPath();
    ctx.arc(0, -18, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(-32, -50, 26, 0, Math.PI * 2);
    ctx.arc(0, -62, 30, 0, Math.PI * 2);
    ctx.arc(32, -50, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fffef7";
    ctx.beginPath();
    ctx.arc(-20, -20, 15, 0, Math.PI * 2);
    ctx.arc(20, -20, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#171216";
    ctx.beginPath();
    ctx.arc(-16, -20, 4, 0, Math.PI * 2);
    ctx.arc(16, -20, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-28, 16);
    ctx.quadraticCurveTo(0, 30, 28, 16);
    ctx.stroke();
    ctx.fillStyle = "#ffd84a";
    ctx.beginPath();
    ctx.moveTo(56, 36);
    ctx.lineTo(96, -8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(96, -8, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function boneShape(ctx) {
    ctx.beginPath();
    ctx.moveTo(-58, -20);
    ctx.bezierCurveTo(-98, -70, -42, -100, -16, -68);
    ctx.bezierCurveTo(8, -104, 76, -74, 48, -24);
    ctx.lineTo(46, 58);
    ctx.bezierCurveTo(78, 98, 12, 120, -10, 84);
    ctx.bezierCurveTo(-36, 118, -96, 86, -58, 48);
    ctx.closePath();
  }

  function drawScene(box) {
    const c = sceneCtx;
    const w = c.canvas.width;
    const h = c.canvas.height;
    c.clearRect(0, 0, w, h);
    const colors = sceneColors(box.theme);
    c.fillStyle = colors.sky;
    c.fillRect(0, 0, w, h);
    c.fillStyle = colors.water;
    c.fillRect(0, h * 0.54, w, h * 0.46);
    c.strokeStyle = "rgba(255,255,255,0.7)";
    c.lineWidth = 5;
    for (let y = h * 0.6; y < h; y += 48) {
      c.beginPath();
      for (let x = 0; x <= w; x += 70) {
        c.quadraticCurveTo(x + 35, y + Math.sin((x + y) / 60) * 10, x + 70, y);
      }
      c.stroke();
    }
    drawShip(c, 220, 370, colors.accent);
    drawMysteryBox(c, 760, 355, box.label, colors.accent);
    if (box.villain) {
      drawVillain(c, box.villain, 910, 390);
    }
    c.save();
    c.translate(380, 432);
    c.scale(0.85, 0.85);
    if (state.character.id === "grandmaBen") {
      drawGrandmaBen(c, state.character, 1);
    } else {
      drawBone(c, state.character, 1);
    }
    c.restore();
    drawComicLabel(c, "Mystery Box Opened", 66, 120, colors.accent);
  }

  function sceneColors(theme) {
    const map = {
      storm: { sky: "#363650", water: "#234560", accent: "#ffd84a" },
      fog: { sky: "#dbe1e8", water: "#91a7ba", accent: "#7d43d6" },
      island: { sky: "#8ed8ff", water: "#177bd1", accent: "#18a66a" },
      deep: { sky: "#111827", water: "#071d42", accent: "#ff5fa8" },
      locust: { sky: "#9fe37c", water: "#267d43", accent: "#d8ff49" },
      thursday: { sky: "#ffe8a8", water: "#68c7ff", accent: "#d91f2e" }
    };
    return map[theme] || { sky: "#8ed8ff", water: "#177bd1", accent: "#ffd84a" };
  }

  function drawVillain(c, villain, x, y) {
    c.save();
    c.translate(x, y);
    c.strokeStyle = "#171216";
    c.lineWidth = 7;
    c.lineCap = "round";
    if (villain === "kingDock") {
      drawKingDock(c);
    } else if (villain === "mim") {
      drawMim(c);
    } else if (villain === "locustLord") {
      drawLocustLord(c);
    } else if (villain === "ratCreature") {
      drawRatCreature(c, 1);
    } else if (villain === "ratPack") {
      c.save();
      c.translate(-70, 18);
      drawRatCreature(c, 0.78);
      c.restore();
      c.save();
      c.translate(70, -4);
      drawRatCreature(c, 0.92);
      c.restore();
    } else if (villain === "bartlebee") {
      drawBartlebee(c);
    } else {
      drawVillainSignal(c);
    }
    c.restore();
  }

  function drawKingDock(c) {
    c.fillStyle = "#7a4a22";
    roundRect(c, -70, -58, 140, 132, 18);
    c.fill();
    c.stroke();
    c.fillStyle = "#ffd84a";
    c.beginPath();
    c.moveTo(-62, -70);
    c.lineTo(-34, -112);
    c.lineTo(0, -74);
    c.lineTo(34, -112);
    c.lineTo(62, -70);
    c.closePath();
    c.fill();
    c.stroke();
    c.fillStyle = "#fffef7";
    c.fillRect(-45, -25, 28, 28);
    c.fillRect(17, -25, 28, 28);
    c.strokeRect(-45, -25, 28, 28);
    c.strokeRect(17, -25, 28, 28);
    c.fillStyle = "#171216";
    c.fillRect(-35, -15, 10, 10);
    c.fillRect(27, -15, 10, 10);
    c.beginPath();
    c.moveTo(-32, 34);
    c.lineTo(32, 20);
    c.stroke();
    drawComicLabel(c, "KING DOCK", -150, -130, "#ffd84a");
  }

  function drawMim(c) {
    c.fillStyle = "#d91f2e";
    c.beginPath();
    c.ellipse(0, 0, 92, 62, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.beginPath();
    c.moveTo(-62, -34);
    c.lineTo(-150, -86);
    c.lineTo(-116, 0);
    c.closePath();
    c.moveTo(62, -34);
    c.lineTo(150, -86);
    c.lineTo(116, 0);
    c.closePath();
    c.fill();
    c.stroke();
    c.fillStyle = "#ffd84a";
    c.beginPath();
    c.moveTo(-30, -55);
    c.lineTo(-12, -108);
    c.lineTo(6, -56);
    c.lineTo(30, -108);
    c.lineTo(34, -52);
    c.fill();
    c.stroke();
    c.fillStyle = "#fffef7";
    c.beginPath();
    c.arc(-28, -8, 13, 0, Math.PI * 2);
    c.arc(28, -8, 13, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = "#171216";
    c.beginPath();
    c.arc(-25, -8, 5, 0, Math.PI * 2);
    c.arc(25, -8, 5, 0, Math.PI * 2);
    c.fill();
    drawComicLabel(c, "MIM", -72, -132, "#d91f2e");
  }

  function drawLocustLord(c) {
    c.fillStyle = "#18a66a";
    c.beginPath();
    c.ellipse(0, 0, 74, 94, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = "#d8ff49";
    c.beginPath();
    c.arc(-26, -28, 15, 0, Math.PI * 2);
    c.arc(26, -28, 15, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = "#171216";
    c.beginPath();
    c.arc(-26, -28, 5, 0, Math.PI * 2);
    c.arc(26, -28, 5, 0, Math.PI * 2);
    c.fill();
    for (let i = 0; i < 8; i += 1) {
      const angle = (i / 8) * Math.PI * 2;
      drawLocust(c, Math.cos(angle) * 120, Math.sin(angle) * 74 - 8, 0.55);
    }
    c.beginPath();
    c.moveTo(-34, 32);
    c.quadraticCurveTo(0, 54, 34, 32);
    c.stroke();
    drawComicLabel(c, "LORD OF LOCUSTS", -218, -142, "#18a66a");
  }

  function drawLocust(c, x, y, scale) {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    c.fillStyle = "#d8ff49";
    c.beginPath();
    c.ellipse(0, 0, 32, 16, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.beginPath();
    c.moveTo(-18, 0);
    c.lineTo(-44, -18);
    c.moveTo(18, 0);
    c.lineTo(44, -18);
    c.stroke();
    c.restore();
  }

  function drawRatCreature(c, scale) {
    c.save();
    c.scale(scale, scale);
    c.fillStyle = "#050505";
    c.beginPath();
    c.ellipse(0, 10, 92, 76, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.beginPath();
    c.arc(-54, -52, 34, 0, Math.PI * 2);
    c.arc(54, -52, 34, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = "#141414";
    c.beginPath();
    c.ellipse(0, -16, 68, 55, 0, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = "#fffef7";
    c.beginPath();
    c.arc(-24, -22, 10, 0, Math.PI * 2);
    c.arc(24, -22, 10, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#171216";
    c.beginPath();
    c.arc(-21, -22, 4, 0, Math.PI * 2);
    c.arc(21, -22, 4, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#ff5fa8";
    c.beginPath();
    c.arc(0, 8, 10, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  function drawBartlebee(c) {
    c.save();
    c.translate(0, -18);
    c.rotate(0.18);
    c.fillStyle = "#7a4a22";
    c.strokeStyle = "#171216";
    c.lineWidth = 7;
    roundRect(c, 82, -118, 36, 178, 16);
    c.fill();
    c.stroke();
    c.fillStyle = "#5a3519";
    c.beginPath();
    c.arc(100, -132, 38, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.restore();

    c.save();
    c.translate(0, 16);
    drawRatCreature(c, 1.28);
    c.strokeStyle = "#171216";
    c.lineWidth = 10;
    c.beginPath();
    c.moveTo(70, -26);
    c.lineTo(116, -86);
    c.stroke();
    c.restore();

    drawComicLabel(c, "BARTLEBEE", -168, -160, "#ff5fa8");
  }

  function drawVillainSignal(c) {
    c.fillStyle = "#ff5fa8";
    c.beginPath();
    c.arc(0, 0, 78, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    c.fillStyle = "#171216";
    c.font = "900 86px Trebuchet MS";
    c.textAlign = "center";
    c.fillText("!", 0, 30);
  }

  function drawShip(c, x, y, color) {
    c.save();
    c.translate(x, y);
    c.fillStyle = color;
    c.strokeStyle = "#171216";
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(-120, 24);
    c.lineTo(105, 24);
    c.lineTo(142, -16);
    c.lineTo(-150, -16);
    c.closePath();
    c.fill();
    c.stroke();
    c.fillStyle = "#fffef7";
    c.fillRect(-86, -62, 120, 46);
    c.strokeRect(-86, -62, 120, 46);
    c.fillStyle = "#171216";
    c.fillRect(-45, -90, 18, 28);
    c.restore();
  }

  function drawMysteryBox(c, x, y, label, color) {
    c.save();
    c.translate(x, y);
    c.rotate(-0.04);
    c.fillStyle = "#fffef7";
    c.strokeStyle = "#171216";
    c.lineWidth = 8;
    roundRect(c, -92, -92, 184, 184, 12);
    c.fill();
    c.stroke();
    c.fillStyle = color;
    c.font = "900 58px Trebuchet MS";
    c.textAlign = "center";
    c.fillText(label, 0, -4);
    c.restore();
  }

  function drawComicLabel(c, text, x, y, color) {
    c.save();
    c.translate(x, y);
    c.fillStyle = "#fffef7";
    c.strokeStyle = "#171216";
    c.lineWidth = 6;
    roundRect(c, 0, -50, 520, 78, 8);
    c.fill();
    c.stroke();
    c.fillStyle = color;
    c.font = "900 34px Trebuchet MS";
    c.textAlign = "left";
    c.fillText(text.toUpperCase(), 22, 0);
    c.restore();
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

  document.querySelectorAll(".character-card").forEach((card) => {
    card.addEventListener("click", () => chooseCharacter(card.dataset.character));
  });
  els.resetButton.addEventListener("click", resetGame);
  els.backToBoardButton.addEventListener("click", () => {
    renderBoard();
    showView("board");
  });
  els.newCharacterButton.addEventListener("click", () => showView("character"));

  drawCharacterCards();
})();
