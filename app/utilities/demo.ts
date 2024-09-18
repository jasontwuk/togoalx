type DemoDataType = {
  [year: number]: {
    [month: number]: {
      targets: {
        money: number;
        exercise: number;
        veg: number;
        meditation: number;
        cleaning: number;
      };
      achievements: {
        [day: number]: number[];
      };
    };
  };
};

export const demoData: DemoDataType = {
  2024: {
    8: {
      targets: {
        money: 5,
        exercise: 18,
        veg: 22,
        meditation: 30,
        cleaning: 8,
      },
      achievements: {
        1: [2],
        2: [1, 2],
        3: [1, 2, 3, 4],
        4: [3],
        5: [2],
        6: [0, 2, 3],
        7: [0, 1, 2, 3, 4],
        8: [2, 4],
        9: [0],
        10: [1, 2],
        11: [1, 3, 4],
        12: [1],
        13: [],
        14: [0, 1, 2],
        15: [2, 3],
        16: [0, 1, 2],
        17: [],
        18: [3],
        19: [0, 2],
        20: [2, 3],
        21: [1],
        22: [0],
        23: [3],
        24: [2],
        25: [2, 3],
        26: [1, 2],
        27: [2],
        28: [1, 3],
        29: [],
        30: [1, 2, 3, 4],
        31: [0, 1, 3],
      },
    },
  },
};
