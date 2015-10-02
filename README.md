# Snake.js

## Summary

This is a remake of the classic Snake arcade game using JavaScript, jQuery and
CSS. I added a twist by including a computer AI that competes for apples.

## Features

- JavaScript and jQuery back-end, HTML/CSS front-end
- Implements core gameplay using events handling and DOM manipulation
- Smooth rendering engine only redraws changing portions of the screen

## How It Works

The Computer AI calculates its next move by sorting the adjacent cardinal
coordinates of its 'head' according to their distance from the apple, using the
[Manhattan method](https://en.wikipedia.org/wiki/Taxicab_geometry) as a
heuristic. It doesn't evaluate unsafe coordinates, i.e. ones that would cause it
to run into itself, out of range, or into another player.

The board is rendered in pure HTML/CSS. The rendering engine works by applying
`$.removeClass` and `$.addClass` to dynamic elements (the apple and snakes) in
sync with player movement. This keeps the animation smooth, even as the game speeds up.

## License

Snake.js is released under the [MIT License](/LICENSE).

---
Developed by [Chris Sloop](http://chrissloop.com)
