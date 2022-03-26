const yogRulesList = {
    1: {
        title: "Ruchaka Yoga",
        planets: "Ma",
        inHouse: [1, 4, 7, 10],
        disposition: ["UNCHA", "MOOLTRIKON", "SWAGRIHA"]
    },
    2: {
        title: "Bhadra Yoga",
        planets: "Me",
        inHouse: [1, 4, 7, 10],
        disposition: ["UNCHA", "MOOLTRIKON", "SWAGRIHA"]
    },
    3: {
        title: "Hamsa Yoga",
        planets: "Ju",
        inHouse: [1, 4, 7, 10],
        disposition: ["UNCHA", "MOOLTRIKON", "SWAGRIHA"]
    },
    4: {
        title: "Malavya Yoga",
        planets: "Ve",
        inHouse: [1, 4, 7, 10],
    },
    5: {
        title: "Shasha Yoga",
        planets: "Sa",
        inHouse: [1, 4, 7, 10],
        disposition: ["UNCHA", "MOOLTRIKON", "SWAGRIHA"]
    },
    6: {
        title: "Gaj Kesari Yoga",
        planets: ["Mo", "Ju"],
        aspect: "quad",
        enhanceif: {
            disposition: ["UNCHA", "MOOLTRIKON", "SWAGRIHA"]
        },
        excludeif: {
            disposition: "retrograde"
        }
    },
    7: {
        title: "Lakshmi Yoga",
        planets: ["L9", "L1"],
        disposition: ["UNCHA", "MOOLTRIKON", "SWAGRIHA"],
        aspect: ["together", "opposite"]
    },
    8: {
        title: "Harsha Vipreet Raj Yoga",
        planets: ["L6"],
        inHouse: [8, 12]
    },
    9: {
        title: "Sarala Vipreet Raj Yoga",
        planets: ["L8"],
        inHouse: [6, 8, 12]
    },
    10: {
        title: "Vimala Vipreet Raj Yoga",
        planets: ["L12"],
        inHouse: [6, 8, 12]
    },
    11: {
        title: "Neecha Bhanga Raj Yoga",
        planetsByDisposition: ["NEECHA", ["UNCHA", "MOOLTRIKON", "SWAGRIHA"]],
        aspect: ["together", "opposite"]
    },
    12: {
        title: "Kalanidhi Yoga",
        planets: ["Ju", "Me"],
        disposition: ["UNCHA", "MOOLTRIKON", "SWAGRIHA"],
        inHouse: [2]
    },
    13: {
        title: "Kalanidhi Yoga",
        planets: ["Ju", "Ve"],
        disposition: ["UNCHA", "MOOLTRIKON", "SWAGRIHA"],
        inHouse: [2]
    },
    14: {
        title: "Gola Yoga",
        planetsAll7WithSignsCount: 1
    },
    15: {
        title: "Yuga Yoga",
        planetsAll7WithSignsCount: 2
    },
    16: {
        title: "Soola Yoga",
        planetsAll7WithSignsCount: 3
    },
    17: {
        title: "Kedaara Yoga",
        planetsAll7WithSignsCount: 4
    },
    18: {
        title: "Paasa Yoga",
        planetsAll7WithSignsCount: 5
    },
    19: {
        title: "Damini Yoga",
        planetsAll7WithSignsCount: 6
    },
    20: {
        title: "Veena Yoga",
        planetsAll7WithSignsCount: 7
    },
    21: {
        title: "Musala Yoga",
        planetsAll7InSigns: [2,5,8,11]
    },
    22: {
        title: "Nala Yoga",
        planetsAll7InSigns: [3,6,9,12]
    },
    23: {
        title: "Rajju Yoga",
        planetsAll7InSigns: [1,4,7,10]
    },
    24: {
        title: "Ardha Chandra Yoga",
        planetsAll7InHouses: [2,5,8,11]
    },
    25: {
        title: "Ardha Chandra Yoga",
        planetsAll7InHouses: [3,6,9,12]
    },
    26: {
        title: "Chaapa Yoga",
        planetsAll7InHouses: [1,2,3,4,10,11,12]
    },
    27: {
        title: "Chakra Yoga",
        planetsAll7InHouses: [1,3,5,7,9,11]
    },
    28: {
        title: "Chatra Yoga",
        planetsAll7InHouses: [1,7,8,9,10,11,12]
    },
    29: {
        title: "Danda Yoga",
        planetsAll7InHouses: [1,10,11,12]
    },
    30: {
        title: "Gada Yoga",
        planetsAll7InHouses: [1,4]
    },
    31: {
        title: "Gada Yoga",
        planetsAll7InHouses: [4,7]
    },
    32: {
        title: "Gada Yoga",
        planetsAll7InHouses: [7,10]
    },
    33: {
        title: "Gada Yoga",
        planetsAll7InHouses: [1,10]
    },
    34: {
        title: "Hala Yoga",
        planetsAll7InHouses: [2,6,10]
    },
    35: {
        title: "Hala Yoga",
        planetsAll7InHouses: [3,7,11]
    },
    36: {
        title: "Hala Yoga",
        planetsAll7InHouses: [4,8,12]
    },
    37: {
        title: "Kamala Yoga",
        planetsAll7InHouses: [1,4,7,10]
    },
    38: {
        title: "Koota Yoga",
        planetsAll7InHouses: [4,5,6,7,8,9,10]
    },
    39: {
        title: "Nauka Yoga",
        planetsAll7InHouses: [1,2,3,4,5,6,7]
    },
    40: {
        title: "Sakata Yoga",
        planetsAll7InHouses: [1,7]
    },
    41: {
        title: "Samudra Yoga",
        planetsAll7InHouses: [2,4,6,8,10,12]
    },
    42: {
        title: "Sara Yoga",
        planetsAll7InHouses: [4,5,6,7]
    },
    43: {
        title: "Shakti Yoga",
        planetsAll7InHouses: [7,8,9,10]
    },
    44: {
        title: "Sringataka Yoga",
        planetsAll7InHouses: [1,5,9]
    },
    45: {
        title: "Vapi Yoga",
        planetsAll7InHouses: [2,5,8,11]
    },
    46: {
        title: "Vapi Yoga",
        planetsAll7InHouses: [3,6,9,12]
    },
    47: {
        title: "Vihaga Yoga",
        planetsAll7InHouses: [4,10]
    },
    48: {
        title: "Yoopa Yoga",
        planetsAll7InHouses: [1,2,3,4]
    }
}

export {yogRulesList}