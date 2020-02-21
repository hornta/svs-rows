import convertFromBitmap from "./convertFromBitmap.js";

describe("convertFromBitmap", () => {
  describe("singles", () => {
    it("1", () => {
      const row = convertFromBitmap("1111111111111");

      expect(row).toEqual([
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1"
      ]);
    });

    it("X", () => {
      const rows = convertFromBitmap("2222222222222");
      expect(rows).toEqual([
        "X",
        "X",
        "X",
        "X",
        "X",
        "X",
        "X",
        "X",
        "X",
        "X",
        "X",
        "X",
        "X"
      ]);
    });

    it("2", () => {
      const rows = convertFromBitmap("4444444444444");
      expect(rows).toEqual([
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2"
      ]);
    });
  });

  describe("varying lengths", () => {
    it("2", () => {
      const row = convertFromBitmap("44");
      expect(row).toEqual(["2", "2"]);
    });

    it("20", () => {
      // 20 chars
      const row = convertFromBitmap("44444444444444444444");
      expect(row).toEqual([
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2",
        "2"
      ]);
    });

    it("0", () => {
      const row = convertFromBitmap("");
      expect(row).toEqual([]);
    });
  });

  describe("half hedge", () => {
    it("1X", () => {
      const row = convertFromBitmap("311");
      expect(row).toEqual(["1X", "1", "1"]);
    });

    it("12", () => {
      const row = convertFromBitmap("511");
      expect(row).toEqual(["12", "1", "1"]);
    });

    it("X2", () => {
      const row = convertFromBitmap("611");
      expect(row).toEqual(["X2", "1", "1"]);
    });
  });

  describe("full hedge", () => {
    it("1X2", () => {
      const row = convertFromBitmap("7777777777777");
      expect(row).toEqual([
        "1X2",
        "1X2",
        "1X2",
        "1X2",
        "1X2",
        "1X2",
        "1X2",
        "1X2",
        "1X2",
        "1X2",
        "1X2",
        "1X2",
        "1X2"
      ]);
    });
  });
});
