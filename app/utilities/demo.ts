type DemoDataType = {
  [year: number]: {
    [month: number]: {
      targets: {
        cleaning: number;
        exercise: number;
        meditation: number;
        money: number;
        veg: number;
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
        cleaning: 5,
        exercise: 10,
        meditation: 15,
        money: 20,
        veg: 25,
      },
      achievements: {
        1: [2, 4],
        2: [1, 2, 4],
        3: [1, 2, 3, 4],
        4: [3],
        5: [2],
        6: [1, 2, 3, 4],
        7: [0, 1, 2, 3, 4],
        8: [2, 4],
        9: [0],
        10: [1, 2, 3, 4],
        11: [1, 3, 4],
        12: [1],
        13: [],
        14: [2, 4],
        15: [2, 3],
        16: [0, 1, 2, 3, 4],
        17: [],
        18: [3],
        19: [2, 4],
        20: [2, 3, 4],
        21: [1],
        22: [0],
        23: [3, 4],
        24: [2, 4],
        25: [2, 3],
        26: [1, 2],
        27: [2],
        28: [1, 3, 4],
        29: [],
        30: [1, 2, 3, 4],
        31: [0, 1, 3],
      },
    },
  },
};
