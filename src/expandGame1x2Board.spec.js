import expandGame1x2Board from "./expandGame1x2Board.js";
import { SROW, MSYS, RSYS } from "./systemType.js";

describe("expandGame1x2Board", () => {
  it("srow", () => {
    const rows = expandGame1x2Board({
      row: ["1", "X", "2", "X", "1", "X", "2", "X", "1", "X", "2", "X", "1"],
      systemType: SROW
    });

    expect(rows).toEqual([
      "1",
      "X",
      "2",
      "X",
      "1",
      "X",
      "2",
      "X",
      "1",
      "X",
      "2",
      "X",
      "1"
    ]);
  });

  it("msys", () => {
    const rows = expandGame1x2Board({
      row: ["1X", "1", "X", "1", "1", "12", "X", "X", "2", "2", "1", "X", "1"],
      systemType: MSYS
    });

    expect(rows).toEqual([
      ["1", "1", "X", "1", "1", "1", "X", "X", "2", "2", "1", "X", "1"],
      ["1", "1", "X", "1", "1", "2", "X", "X", "2", "2", "1", "X", "1"],
      ["X", "1", "X", "1", "1", "1", "X", "X", "2", "2", "1", "X", "1"],
      ["X", "1", "X", "1", "1", "2", "X", "X", "2", "2", "1", "X", "1"]
    ]);
  });

  it("rsys", () => {
    const rows = expandGame1x2Board({
      row: [
        "1",
        "X",
        "X",
        "X",
        "X",
        "X",
        "1X",
        "12",
        "1X",
        "1X",
        "1X",
        "1X",
        "1X"
      ],
      systemType: RSYS,
      systemNum: 33
    });

    expect(rows).toEqual();
  });
});
/**
 
srow
{
    "boardProps": [],
    "systemType": [
      "SROW"
    ],
    "systemNum": 1,
    "boardData": [
      "1",
      "X",
      "2",
      "X",
      "1",
      "X",
      "2",
      "X",
      "1",
      "X",
      "2",
      "X",
      "1"
    ]
  }
 
  rsys
  {
  "boardProps": [],
  "systemType": [
    "RSYS"
  ],
  "systemNum": 33,
  "boardData": [
    "1",
    "X",
    "X",
    "X",
    "X",
    "X",
    "1X",
    "12",
    "1X",
    "1X",
    "1X",
    "1X",
    "1X"
  ]
}
 
msys
{
  "boardProps": [
    "WEIGHTEDQP"
  ],
  "systemType": [
    "MSYS"
  ],
  "systemNum": 2,
  "boardData": [
    "1X",
    "1",
    "X",
    "1",
    "1",
    "12",
    "X",
    "X",
    "2",
    "2",
    "1",
    "X",
    "1"
  ]
}
 
usys
[
  {
    "boardProps": [],
    "systemType": [
      "USYS"
    ],
    "systemNum": 59,
    "boardData": [
      "1",
      "1X",
      "X",
      "2",
      "X",
      "1X",
      "X2",
      "X2",
      "2",
      "1X",
      "1X",
      "X2",
      "X"
    ]
  },
  {
    "boardProps": [],
    "systemType": [
      "UROW"
    ],
    "systemNum": 0,
    "boardData": [
      "0",
      "1",
      "0",
      "0",
      "0",
      "X",
      "X",
      "2",
      "0",
      "X",
      "X",
      "X",
      "0"
    ]
  }
]
 
 */
