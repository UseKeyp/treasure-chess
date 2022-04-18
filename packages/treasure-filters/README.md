<h1 align="center"><img width="600" style="border-radius: 30px;" src="https://github.com/treasure-chess/treasure-chess/blob/main/github-header.png?raw=true"/></h1>
<h1 align="center">Welcome to @treasure-chess/treasure-filters 👋</h1>
<p align="center">
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/treasurechess_" target="_blank">
    <img alt="Twitter: treasurechess_" src="https://img.shields.io/twitter/follow/treasurechess_.svg?style=social" />
  </a>
</p>

**Almost all of the code & tooling for Treasure Chess has been open sourced**. We hope you find these resources useful. Happy hacking!

- App tooling using RedwoodJs 👉 https://github.com/pi0neerpat/redwood-devops-example
- Code specific to Treasure Chess (smart contracts, achievements, card generation, etc.) is on our organization page: https://github.com/treasure-chess

## Usage

```js
import filters from '@treasure-chess/treasure-filters'

const sortedAchievements = filters.achievementList.sort(
  (a, b) => b.points - a.points
)
```

## Show your support

Give a ⭐️ if this project helped you!

## Contributors ✨

👤 **Treasure Chess Community <maintainers@niftychess.com>**

- Website: https://treasurechess.com
- Twitter: [@treasurechess\_](https://twitter.com/treasurechess_)
- GitHub: [@Treasure-Chess](https://github.com/Treasure-Chess)

## 📝 License

Copyright © 2022 Nifty Chess, Inc.<br />
This project is [MIT](https://github.com/Treasure-Chess/chess-achievements/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
