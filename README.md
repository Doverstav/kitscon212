# KitsCon 21.2

This repo contains a demo showcased at KitsCon 21.2. It's simple website which implements the drunken bishop algorithm, with some variations on the algorithm and some alternative visualisations.

## Potential areas of interest

For the implementation of the walk algorithms, look inside the `pieces` folder. `bishop.ts` is the original drunken bishop algorithm, and the other pieces are variants on the algorithm, using other chess pieces for the movement logic.

If you're interested in how the visual representation was implemented, take a look in the `board` folder.

`App.tsx` is a bit of a mess and was hastily thrown together to get some quick inputs, so there's no real need to make a deep dive into what's happening there 😇