import axios from "axios";
import fs from "fs";

const findDraw = async ({ product, drawNumber }) => {
  return axios.get(
    "https://api.spela.svenskaspel.se/draw/" + product + "/draws/" + drawNumber
  );
};

const updateResults = async (product, firstDraw, lastDraw, { skip }) => {
  let resultsJson;
  try {
    resultsJson = fs.readFileSync("./" + product + "_results.json", "utf-8");
    resultsJson = JSON.parse(resultsJson);
  } catch (e) {}
  if (!resultsJson) {
    resultsJson = { results: {}, firstDraw: firstDraw, lastDraw: lastDraw };
  }
  let lastProcessedDraw = resultsJson.lastDraw;

  const list = [];
  for (var i = firstDraw; i <= lastDraw; i++) {
    list.push(i);
  }

  const errored = {};

  for await (const i of list) {
    if (skip && skip.includes(i)) {
      continue;
    }
    if (resultsJson.results[i]) {
      continue;
    }

    lastProcessedDraw = i;
    try {
      const response = await axios.get(
        "https://api.spela.svenskaspel.se/draw/" +
          product +
          "/draws/" +
          i +
          "/result"
      );
      console.log("received result for drawnumber " + i);
      resultsJson.results[i] = response.data.result;
    } catch (e) {
      if (errored[product]) {
        errored[product].push(i);
      } else {
        errored[product] = [i];
      }
      console.log(
        "Något fick fel med hämtning av drawNumber " + i + " : " + product
      );
    }
  }

  resultsJson.lastDraw = lastProcessedDraw;
  fs.writeFile(
    "./" + product + "_results.json",
    JSON.stringify(resultsJson),
    function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    }
  );
};

const downloadResults = () => {
  updateResults("stryktipset", 4267, 4637, {});
  updateResults("europatipset", 1221, 1950, { skip: [1794, 1729] });
  updateResults("topptipsetextra", 481, 1208, {});
  updateResults("topptipsetstryk", 273, 647, { skip: [512, 513, 514, 515] });
  updateResults("topptipset", 78, 1340, { skip: [1317, 1340] }); // corrupted: 1317, 1340
  updateResults("bomben", 6684, 12279, {
    skip: [
      7152,
      7482,
      7893,
      7894,
      8802,
      8816,
      8817,
      8818,
      9376,
      9377,
      9378,
      9379,
      9380,
      9381,
      9382,
      9383,
      9385
    ]
  });
  updateResults("powerplay", 432, 2245, {
    skip: [1263, 1681, 1682, 1683, 1684, 1685, 1941]
  });
  updateResults("challenge", 1, 1810, {
    skip: [152, 370]
  });
  updateResults("maltipset", 1560, 1930, {
    skip: []
  });
  // corrupted: 59283, 59284, 59285, 59286, 59287, 59288, 59289, 59290, 59291, 59292, 59293
  updateResults("matchen", 54374, 84261, {
    skip: [
      59282,
      59283,
      59284,
      59285,
      59286,
      59287,
      59288,
      59289,
      59290,
      59291,
      59292,
      59293,
      67374,
      67402,
      67403,
      67404,
      67405,
      67406,
      74094,
      74095,
      74096,
      74097,
      74098,
      74099,
      74100,
      74101,
      74102,
      79210,
      79212,
      79213,
      79216,
      79217,
      79218,
      79220,
      79229,
      79380,
      79381,
      79382,
      79383,
      79384,
      79385,
      79386,
      79387,
      79388,
      79389,
      79390,
      79391,
      79392,
      79393,
      79394,
      79395,
      79396,
      79397,
      79400,
      79401,
      79402,
      79403,
      79404,
      79405,
      79407,
      79409,
      79410,
      79411,
      79412,
      79413,
      79416,
      79417,
      79418,
      79420,
      79421,
      79432,
      79434,
      79435,
      79448,
      79456,
      79457,
      79458,
      79459,
      79460,
      79461,
      79462,
      79463,
      79464,
      79465,
      79499,
      79519,
      79520,
      79542,
      79543,
      79544,
      79545,
      79546,
      79547,
      79548,
      79552,
      79588,
      79590,
      79637,
      79641,
      79663,
      79688,
      79689,
      79690,
      79691,
      79692,
      79693,
      79694,
      79695,
      79696,
      79697,
      79698,
      79699,
      79700,
      79701,
      79702,
      79703,
      79732,
      79756,
      79789,
      79799,
      79800,
      79801,
      79822,
      79833,
      79834,
      79835,
      79879,
      79880,
      79881,
      79928,
      79929,
      79930,
      79935,
      79937,
      79939,
      79940,
      79941,
      79942,
      79943,
      79944,
      79958,
      79986,
      79987,
      80022,
      80032,
      80046,
      80047,
      80052,
      80053,
      80064,
      80065,
      80084,
      80107,
      80124,
      80125,
      80126,
      80139,
      80205,
      80206,
      80207,
      80208,
      80212,
      80213,
      80214,
      80215,
      80220,
      80221,
      80222,
      80225,
      80226,
      80227,
      80228,
      80281,
      80294,
      80295,
      80321,
      80325,
      80331,
      80351,
      80357,
      80411,
      80414,
      80419,
      80420,
      80421,
      80422,
      80423,
      80424,
      80425,
      80446,
      80447,
      80449,
      80451,
      80452,
      80455,
      80470,
      80471,
      80472,
      80528,
      80539,
      80540,
      80554,
      80572,
      80573,
      80574,
      80575,
      80592,
      80593,
      80595,
      80602,
      80614,
      80615,
      80616,
      80617,
      80624,
      80696,
      80708,
      80709,
      80730,
      80765,
      80874,
      80897,
      80901,
      80912,
      80993,
      81156,
      81157,
      81158,
      81176,
      81177,
      81285,
      81297,
      81379,
      81411,
      81412,
      81413,
      81547,
      81576,
      81578,
      81586,
      81672,
      81705,
      81706,
      81707,
      81708,
      81709,
      81710,
      81711,
      81712,
      81713,
      81714,
      81715,
      81716,
      81718,
      81720,
      81722,
      81724,
      81726,
      81728,
      81730,
      81737,
      81743,
      81750,
      81752,
      81757,
      81793,
      82118,
      82119,
      82202,
      82263,
      82292,
      82327,
      82381,
      82382,
      82383,
      82384,
      82385,
      82602,
      82628,
      82629,
      82650,
      82659,
      82689,
      82712,
      82719,
      82722,
      82785,
      83025,
      83026,
      83027,
      83028,
      83029,
      83030,
      83031,
      83032,
      83033,
      83034,
      83035,
      83036,
      83037,
      83038,
      83039,
      83040,
      83041,
      83042,
      83043,
      83044,
      83045,
      83046,
      83047,
      83048,
      83049,
      83050,
      83208,
      83240,
      83294,
      83295,
      83296,
      83416,
      83462,
      83463,
      83494,
      83496,
      83497,
      83499,
      83523,
      83528,
      83529,
      83540,
      83541,
      83663,
      83674,
      83695,
      83706,
      83740,
      83776,
      83777,
      83778,
      83813,
      83884,
      83885
    ]
  });
};

downloadResults();

// (async () => {
//   const results = {};
//   for await (const error of errored) {
//     try {
//       const response = await findDraw({
//         product: "matchen",
//         drawNumber: error
//       });
//       if (results[response.status]) {
//         results[response.status].push(error);
//       } else {
//         results[response.status] = [error];
//       }
//     } catch (e) {
//       if (results[e.response.status]) {
//         results[e.response.status].push(error);
//       } else {
//         results[e.response.status] = [error];
//       }
//     }
//   }

//   console.log(JSON.stringify(results, null, 2));
// })();
