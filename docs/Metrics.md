To fetch the metrics, simply hit the /metrics endpoint. There is also type querystring params which you can pass "business" to get insights. Here are the dev deployment endpoints:

Prometheus: https://treasure-chess-dev-4.vercel.app/api/metrics
Business: https://treasure-chess-dev-4.vercel.app/api/metrics?type=business

For the staging and production environments, the endpoints for these would look like this:

Business: http://treasure-chess-api:8080/metrics?type=business

Here's an sample response from business metrics:

```json
{
  "member": {
    "count": {
      "total": 2,
      "withoutAddress": 29,
      "minted": {}
    }
  },
  "treasure": {
    "count": {
      "total": 13,
      "rarity": {
        "Good": 12,
        "Great": 1,
        "Ultra": 0,
        "Mythic": 0
      },
      "achievements": {
        "Player": 3,
        "1500+ Winner": 0,
        "Played 750+": 0,
        "Played 1500+": 1,
        "Played 2000+": 0,
        "Big Winner": 0,
        "Mythic Winner": 0,
        "Defeat a NM": 0,
        "Defeat an IM": 0,
        "Criss Cross": 0,
        "Utter Disrespect": 0,
        "Strongest Opponent": 0,
        "Jousting": 0,
        "Triple Digit Club": 0,
        "Defeat a GM": 0,
        "Excessive": 0,
        "Ultramarathoners": 0,
        "Fool's Mate": 0,
        "Opening Expert": 0,
        "Leveled Field": 0,
        "Don't Blink": 0,
        "Hello m'lady": 0,
        "Horse Farmer": 0,
        "Holy Promotion": 0,
        "God-Mode Glitch": 0,
        "The Sneaky Pawn": 0,
        "Cutting it Close": 0,
        "The Underdog": 1,
        "Déjà Vu": 0,
        "Checkin' You Out": 8,
        "750+ Winner": 4,
        "Pawn Shy": 9,
        "Pawn Shopper": 2,
        "A Minor Problem": 0,
        "Mr. Marathon Man": 0,
        "Pawn Hoarder": 0,
        "Winner": 5
      }
    }
  },
  "marketSale": {
    "sales": {
      "total": 0,
      "platformFees": 0,
      "minterEarnings": 0,
      "minterEarningsFirstSale": 0,
      "minterEarningsResidual": 0,
      "rarity": {
        "Good": {
          "total": null,
          "average": null
        },
        "Great": {
          "total": null,
          "average": null
        },
        "Ultra": {
          "total": null,
          "average": null
        },
        "Mythic": {
          "total": null,
          "average": null
        }
      },
      "achievements": {
        "1500+ Winner": {
          "total": null,
          "average": null
        },
        "Played 750+": {
          "total": null,
          "average": null
        },
        "Played 2000+": {
          "total": null,
          "average": null
        },
        "Played 1500+": {
          "total": null,
          "average": null
        },
        "750+ Winner": {
          "total": null,
          "average": null
        },
        "Mythic Winner": {
          "total": null,
          "average": null
        },
        "Strongest Opponent": {
          "total": null,
          "average": null
        },
        "Defeat a GM": {
          "total": null,
          "average": null
        },
        "Defeat an IM": {
          "total": null,
          "average": null
        },
        "Defeat a NM": {
          "total": null,
          "average": null
        },
        "Criss Cross": {
          "total": null,
          "average": null
        },
        "Jousting": {
          "total": null,
          "average": null
        },
        "Utter Disrespect": {
          "total": null,
          "average": null
        },
        "Big Winner": {
          "total": null,
          "average": null
        },
        "Triple Digit Club": {
          "total": null,
          "average": null
        },
        "Ultramarathoners": {
          "total": null,
          "average": null
        },
        "Don't Blink": {
          "total": null,
          "average": null
        },
        "Fool's Mate": {
          "total": null,
          "average": null
        },
        "Excessive": {
          "total": null,
          "average": null
        },
        "Player": {
          "total": null,
          "average": null
        },
        "Opening Expert": {
          "total": null,
          "average": null
        },
        "Horse Farmer": {
          "total": null,
          "average": null
        },
        "Leveled Field": {
          "total": null,
          "average": null
        },
        "The Sneaky Pawn": {
          "total": null,
          "average": null
        },
        "Holy Promotion": {
          "total": null,
          "average": null
        },
        "God-Mode Glitch": {
          "total": null,
          "average": null
        },
        "Cutting it Close": {
          "total": null,
          "average": null
        },
        "The Underdog": {
          "total": null,
          "average": null
        },
        "Déjà Vu": {
          "total": null,
          "average": null
        },
        "Pawn Shopper": {
          "total": null,
          "average": null
        },
        "Pawn Shy": {
          "total": null,
          "average": null
        },
        "Checkin' You Out": {
          "total": null,
          "average": null
        },
        "Mr. Marathon Man": {
          "total": null,
          "average": null
        },
        "A Minor Problem": {
          "total": null,
          "average": null
        },
        "Pawn Hoarder": {
          "total": null,
          "average": null
        },
        "Hello m'lady": {
          "total": null,
          "average": null
        },
        "Winner": {
          "total": null,
          "average": null
        }
      }
    },
    "count": {
      "total": 4,
      "isClosed": {
        "true": 3,
        "false": 1
      },
      "rarity": {
        "Good": 0,
        "Great": 0,
        "Ultra": 0,
        "Mythic": 0
      },
      "status": {
        "PENDING_LISTED": 1,
        "LISTED": 0,
        "PENDING_SOLD": 0,
        "SOLD": 0,
        "PENDING_DELISTED": 0,
        "DELISTED": 3
      },
      "achievements": {
        "1500+ Winner": 0,
        "Played 750+": 0,
        "Played 2000+": 0,
        "Played 1500+": 0,
        "750+ Winner": 0,
        "Mythic Winner": 0,
        "Strongest Opponent": 0,
        "Defeat a GM": 0,
        "Defeat an IM": 0,
        "Defeat a NM": 0,
        "Criss Cross": 0,
        "Jousting": 0,
        "Utter Disrespect": 0,
        "Big Winner": 0,
        "Triple Digit Club": 0,
        "Ultramarathoners": 0,
        "Don't Blink": 0,
        "Fool's Mate": 0,
        "Excessive": 0,
        "Player": 0,
        "Opening Expert": 0,
        "Horse Farmer": 0,
        "Leveled Field": 0,
        "The Sneaky Pawn": 0,
        "Holy Promotion": 0,
        "God-Mode Glitch": 0,
        "Cutting it Close": 0,
        "The Underdog": 0,
        "Déjà Vu": 0,
        "Pawn Shopper": 0,
        "Pawn Shy": 0,
        "Checkin' You Out": 0,
        "Mr. Marathon Man": 0,
        "A Minor Problem": 0,
        "Pawn Hoarder": 0,
        "Hello m'lady": 0,
        "Winner": 0
      }
    }
  },
  "mintPurchase": {
    "sales": {
      "total": 36
    },
    "count": {
      "total": 12,
      "orderStatus": {
        "COMPLETE": 12,
        "RESERVATION": 0
      },
      "status": {
        "COMPLETE": 12,
        "PENDING": 0,
        "FAILED": 0
      },
      "paymentType": {
        "WYRE": 0,
        "MINTCREDIT": 12
      },
      "txStatus": {
        "SUBMITTED": 0,
        "COMPLETE": 12,
        "FAILED": 0
      }
    }
  },
  "chainData": {
    "treasureAddress": "0xc9234371D7943C0A333AB1eE4e9E6583323efD5d",
    "marketAddress": "0x0f3E90A31a9f903C70FC139840e28076aE0514F0",
    "totalSupply": "25",
    "networkName": "mumbai"
  }
}
```
