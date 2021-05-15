# DICE-UI-vector-shape-to-SVG

This is a tool that converts `DiceUIVectorShapeAsset`s to SVGs.
It takes EBX files which have been converted to XML as input;
you can generate these XML files using the [Frosty Editor](https://frostytoolsuite.com/downloads.html) (`Tools > Export EBX to XML`).
This will export the whole game so I recommend copying just the vector assets to a separate folder.


## Usage

1. Ensure you have [Node.js](https://nodejs.org/) installed
2. Clone the repo
3. Open a terminal in the project root
4. Run the following to install dependencies
```
npm install
```
5. Run the script
```
node src --input=path/to/input/folder --output=path/to/output/folder
```


## Limitations

There are some features of DICE's proprietary format that don't translate directly to available SVG features which I have yet to come up with solutions for.

### Per-corner alpha

There are 2 assets in [MEC] that do not have the same `Alpha` value for every corner:

- `UI/Art/HUD/FocusGradient`
- `UI/Art/Map/shadow`

I couldn't figure out a way to create a mask where the gradients between all the points were correct.

### Unimplemented Features

Below is a list of features I haven't bothered implementing as they are not used anywhere in [MEC]:

- Per-corner `Color` & `CornerType`
- `SpecifyInnerOuterWidths` & `InnerWidth` & `OuterWidth`
- Different `StartCapType` & `EndCapType`


## Contributing

If you think you can contribute something to this project, please follow [this guide](https://github.com/firstcontributions/first-contributions/blob/master/README.md)!


<!--- Glossary -->

[MEC]: # "Mirror's Edge Catalyst"
