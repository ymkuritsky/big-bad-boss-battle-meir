# Big Bad Boss Battle

Meir's comic boss battle game.

Live game:
https://big-bad-boss-battle-meir.vercel.app

Local game:
http://127.0.0.1:4173

## Version 1

Version 1 is playable and deployed.

Main features:
- Story Mode with Superville Levels 1-3, unlockable Candyland Levels 4-6, unlockable Abandoned Desert Levels 7-10, and unlockable Water World Levels 11-14
- Two Player Mode on the same device
- Each world starts easy, gets harder, then ends with a super hard boss level
- Pink heart health system
- Comic speech bubbles and action words
- Park battle arena with stream, trees, benches, houses, and the Mayor mansion
- Candyland arena with lollipops, gumdrops, candy houses, and a candy stream
- Abandoned Desert arena with sand, cactuses, hay bales, rolling hay balls, bones, skulls, and a desert stream
- Water World arena with waves, bubbles, seaweed, coral, fish, and water everywhere
- Abandoned Desert unlock: beat Candyland Levels 4, 5, and 6 twice. The wins do not have to be in a row
- Abandoned Desert difficulty climbs from Level 7 to Level 8 to Level 9, all harder than Level 6
- Level 9 shows a danger warning that King Dock is coming next
- Level 10 special boss: King Dock, a very huge pink gorilla with purple eyes, an angry mouth, two brown horns, red battle splatters all over him, a sword sticking out of his head, one giant hand laser, and 10 hearts
- At the start of Level 10, King Dock pauses, says "Who is responsible?", and then begins attacking
- Level 10 player fighters start with 10 hearts
- Hitting King Dock makes one of his hearts fly back to the player and heal them up to their max hearts
- King Dock can summon up to seven Rack Creatures at a time; the creatures are weak and disappear from any hit
- Beating King Dock earns the "King of the Battle" crown trophy
- Beating King Dock in Abandoned Desert unlocks Water World Levels 11-14
- In Water World, King Dock returns in a water suit
- Benji's five shark forms work anywhere in Water World
- Freddy can still use fish forms, and the other fighters get water-themed powers like Mr. 67's Ice Feet
- Every hit on King Dock pops out special prize boxes; jump onto a prize box to get an iron sword damage boost, armor, a heart, speed, or a power refill
- King Dock trap boxes have small booby traps nearby, including pit cracks and Rack Creatures dropping from above
- King Dock can also drop trap boxes from above for no reason; they fall down with booby traps around them
- Trap boxes say "BOOBY TRAP" on them
- Supercharged Package unlock: beat Mischievous Mayor two times in a row
- Supercharged Candyland fighters get 5 hearts on Levels 4 and 5, then 10 hearts on Level 6
- Candyland villains keep their Level 3 power instead of upgrading each level
- Supercharged names include Cheetah Racer, Mega Mommy, Ultimate Freddy, and Super Dad
- Ultimate Freddy gets Super Giant Punch in Candyland when Supercharged is unlocked
- New unlocked characters: Mr. 67 and Super Ness
- Mr. 67 powers: Freeze Block, Burrow Strike, Poison Storm, plus Super Axe Throw in Level 10 or when supercharged
- Super Ness powers: Super Kick, Super Hide, Tree Climb
- Touch buttons for iPad-style play
- Keyboard movement on computer
- Big health bars that turn green, yellow, then red
- Flash, knockback, shake, and sound when a fighter gets hit
- Clear win and lose screens with a big Play Again button

## Characters

Playable characters:
- Mischievous Mayor
- Super Tats
- Mom Fary
- Super Appie Juice
- Yapping Yonatan
- Freddy
- Benji
- Mr. 67
- Super Ness
- Captain Crayonstorm
- Zap Hoodie
- The Homework Phantom

Story bosses:
- Mischievous Mayor
- Yapping Yonatan
- King Dock in Abandoned Desert and Water World

## Benji

Benji has brownish-blonde hair, blue eyes, black pants, and a gray shirt.

Powers:
- Tornado
- Teleport
- Sharks

Shark forms:
- Great White Shark
- Hammerhead Shark
- Tiger Shark
- Mako Shark
- Whale Shark

## Deployment

The game is deployed on Vercel:
https://big-bad-boss-battle-meir.vercel.app

GitHub Pages backup link:
https://ymkuritsky.github.io/big-bad-boss-battle-meir/

GitHub repo:
https://github.com/ymkuritsky/big-bad-boss-battle-meir

Old Netlify link:
https://big-bad-boss-battle-meir.netlify.app

Vercel should deploy the main game files:
- `index.html`
- `styles.css`
- `game.js`
- `vercel.json`
- `package.json`

## How To Update The Game Later

1. Make the change in `index.html`, `styles.css`, or `game.js`.
2. Test the game on the computer.
3. Save the change to GitHub.
4. GitHub Pages will automatically update the GitHub game link.
5. Vercel will also automatically update the Vercel link after GitHub is connected to Vercel.

Simple test command:

```sh
npm run check
```

If the check says nothing, that means the game script is okay.

## GitHub Auto Deploy

This folder is ready for GitHub and has the remote set to:
https://github.com/ymkuritsky/big-bad-boss-battle-meir.git

GitHub Pages publishes this game directly from the `main` branch because the game is a simple website.

Current GitHub setup:

- Repository: https://github.com/ymkuritsky/big-bad-boss-battle-meir
- Pages source: `main` branch, `/root` folder
- Pages game link: https://ymkuritsky.github.io/big-bad-boss-battle-meir/

To also finish Vercel automatic deployment, connect GitHub to the Vercel account, then connect the Vercel project to this same GitHub repository.
