import expandScoreBoard from "./expandScoreBoard.js";

describe("expandScoreBoard", () => {
  it("expands single row correctly", () => {
    const board = {
      boardData: [["0"], ["1"], ["2"], ["3"], ["4"], ["5"]]
    };

    const rows = expandScoreBoard([]);

    expect(rows).toEqual(["0", "1", "2", "3", "4", "5"]);
  });

  it("expands into multiple rows", () => {
    const board = {
      boardData: [["0", "5"], ["0"], ["7"], ["5", "F"], ["2"], ["2"]]
    };

    const rows = expandScoreBoard(board);

    expect(rows).toEqual(
      ["0", "0", "7", "5", "2", "2"],
      ["5", "0", "7", "5", "2", "2"],
      ["0", "0", "7", "F", "2", "2"],
      ["5", "0", "7", "F", "2", "2"]
    );
  });
});

// expertenBoardData
/**


{
  "eventResults": [
    [
      [
        "0",
        "1"
      ],
      [
        "1",
        "0"
      ],
      [
        "2",
        "1"
      ]
    ],
    [
      [
        "2",
        "1"
      ],
      [
        "3",
        "1"
      ]
    ],
    [
      [
        "0",
        "2"
      ],
      [
        "1",
        "1"
      ],
      [
        "2",
        "0"
      ],
      [
        "2",
        "1"
      ]
    ]
  ]
}


scoreBoard
{
  "boardProps": [],
  "systemType": [
    "RSYS"
  ],
  "systemNum": 0,
  "rowPriceMulti": 1,
  "boardData": [
    [
      "0",
      "1"
    ],
    [
      "0",
      "1"
    ],
    [
      "0",
      "1"
    ],
    [
      "0",
      "1"
    ],
    [
      "0",
      "1"
    ],
    [
      "0",
      "1"
    ]
  ],
  "rSysData": [
    [
      "AWAY"
    ],
    [
      "DRAW"
    ],
    [
      "HOME"
    ]
  ]
}

scoreboard w/o xperten
{
  "boardProps": [],
  "systemType": [
    "MSYS"
  ],
  "systemNum": 0,
  "rowPriceMulti": 1,
  "boardData": [
    [
      "0"
    ],
    [
      "0"
    ],
    [
      "0"
    ],
    [
      "0"
    ],
    [
      "1"
    ],
    [
      "1"
    ]
  ]
}

 */
