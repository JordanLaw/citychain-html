/* ============================================================
   City Chain Online Shop — Redesign Implementation
   VT6012CEM User Experience Design, Stage 3
   Vanilla JavaScript. No libraries.
   ============================================================ */
(function () {
  'use strict';

  /* ==========================================================
     0. WHERE PRODUCT IMAGES COME FROM
     ----------------------------------------------------------
     'illustration'  vector drawings, no files needed, works
                     offline. This is the default.

     'local'         real photographs from  images/<id>.jpg
                     Put the folder next to index.html and name
                     each file after the product id. See
                     IMAGE-CHECKLIST.md for the full list.

     'remote'        real photographs loaded straight from City
                     Chain's servers using the img field on each
                     product. Needs an internet connection. Handy
                     for a quick look; use 'local' for the copy
                     you submit.

     Any photograph that fails to load falls back to the
     illustration, so nothing ever renders as a broken image.
     ========================================================== */
  const IMAGE_SOURCE = 'local';
  const PHOTO_DIR    = 'images/';
  const PHOTO_EXT    = '.jpg';

  /* ==========================================================
     1. PRODUCT DATA
     A single source of truth shared by every page. Cards are
     generated from this array so the Home page and the Shop
     page can never disagree about a price — which is the
     CONSISTENCY problem the original site had.
     ========================================================== */
  const PRODUCTS = [
    { id: "ba-110mc-2a",       name: "CASIO BABY-G (BA-110MC-2A)",                                            brand: "CASIO",             price: 1003,  was: 1140,  movement: "quartz",      gender: "female",  colour: "white",   rating: 3, reviews: 8,  dial: "#eef1f4",  body: "#c8ccd0",  strap: "bracelet",  face: "digital",  file: "BA-110MC-2A.jpg",                             img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/BA-110MC-2A.jpg" },
    { id: "gm-s2110sr-1a",     name: "CASIO G-SHOCK (GM-S2110SR-1A)",                                         brand: "CASIO",             price: 1742,  was: 1980,  movement: "quartz",      gender: "female",  colour: "black",   rating: 4, reviews: 21, dial: "#1f2226",  body: "#33383e",  strap: "bracelet",  face: "digital",  file: "GM-S2110SR-1A.jpg",                           img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/GM-S2110SR-1A.jpg" },
    { id: "eg2797-13a",        name: "Citizen Eco Drive (EG2797-13A)",                                        brand: "CITIZEN",           price: 1918,  was: 2180,  movement: "quartz",      gender: "female",  colour: "green",   rating: 5, reviews: 34, dial: "#17342c",  body: "#2f4a40",  strap: "bracelet",  face: "dress",    file: "EG2797-13A_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/EG2797-13A_front.jpg" },
    { id: "ec1017-58a",        name: "Citizen L Collection (EC1017-58A)",                                     brand: "CITIZEN",           price: 4734,  was: 5380,  movement: "quartz",      gender: "female",  colour: "blue",    rating: 3, reviews: 47, dial: "#1b3358",  body: "#c8ccd0",  strap: "rubber",    face: "dress",    file: "EC1017-58A_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/EC1017-58A_front.jpg" },
    { id: "eo2023-00w",        name: "Citizen Promaster (EO2023-00W)",                                        brand: "CITIZEN",           price: 2798,  was: 3180,  movement: "quartz",      gender: "female",  colour: "black",   rating: 4, reviews: 60, dial: "#1f2226",  body: "#33383e",  strap: "nato",      face: "diver",    file: "EO2023-00W_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/EO2023-00W_front.jpg" },
    { id: "es9395-53a",        name: "Citizen xC (ES9395-53A)",                                               brand: "CITIZEN",           price: 4910,  was: 5580,  movement: "quartz",      gender: "female",  colour: "gray",    rating: 5, reviews: 73, dial: "#3c4147",  body: "#8f959b",  strap: "bracelet",  face: "dress",    file: "ES9395-53A_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/ES9395-53A_front.jpg" },
    { id: "w03-00870-004",     name: "ellesse Luna (W03-00870-004)",                                          brand: "ELLESSE",           price: 1038,  was: 1180,  movement: "quartz",      gender: "female",  colour: "black",   rating: 3, reviews: 16, dial: "#1f2226",  body: "#33383e",  strap: "bracelet",  face: "dress",    file: "WhatsAppImage2026-06-24at16.50.28.jpg",       img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/WhatsAppImage2026-06-24at16.50.28.jpg" },
    { id: "w03-00865-004",     name: "ellesse Momento (W03-00865-004)",                                       brand: "ELLESSE",           price: 1214,  was: 1380,  movement: "quartz",      gender: "female",  colour: "pink",    rating: 4, reviews: 29, dial: "#e8b4c0",  body: "#e3c9cf",  strap: "bracelet",  face: "dress",    file: "00865-004_Front.jpg",                         img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/00865-004_Front.jpg" },
    { id: "w06-02825-021",     name: "Barista 3 Hands Date Quartz Stainless Steel Watch W06-02825-021",       brand: "SOLVIL ET TITUS",   price: 1654,  was: 1880,  movement: "quartz",      gender: "female",  colour: "green",   rating: 5, reviews: 42, dial: "#17342c",  body: "#2f4a40",  strap: "rubber",    face: "dress",    file: "2825-021_Front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/2825-021_Front.jpg" },
    { id: "w06-03411-001",     name: "Fair Lady 3 Hands Quartz Stainless Steel Watch W06-03411-001",          brand: "SOLVIL ET TITUS",   price: 1302,  was: 1480,  movement: "quartz",      gender: "female",  colour: "white",   rating: 3, reviews: 55, dial: "#eef1f4",  body: "#c8ccd0",  strap: "nato",      face: "dress",    file: "3411-001_Front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/3411-001_Front.jpg" },
    { id: "w06-03430-001",     name: "Fashionista 2 Hands Quartz Stainless Steel Watch W06-03430-001",        brand: "SOLVIL ET TITUS",   price: 1038,  was: 1180,  movement: "quartz",      gender: "female",  colour: "white",   rating: 4, reviews: 68, dial: "#eef1f4",  body: "#c8ccd0",  strap: "bracelet",  face: "dress",    file: "3430-001_Front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/3430-001_Front.jpg" },
    { id: "w06-03373-007",     name: "Fashionista 3 Hands Date Quartz Stainless Steel Watch W06-03373-007",   brand: "SOLVIL ET TITUS",   price: 1302,  was: 1480,  movement: "quartz",      gender: "female",  colour: "white",   rating: 5, reviews: 11, dial: "#eef1f4",  body: "#c8ccd0",  strap: "bracelet",  face: "dress",    file: "W06-03373-007_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03373-007_Front.jpg" },
    { id: "bg-169cm-2",        name: "CASIO BABY-G (BG-169CM-2)",                                             brand: "CASIO",             price: 864,   was: 1080,  movement: "quartz",      gender: "male",    colour: "green",   rating: 3, reviews: 24, dial: "#17342c",  body: "#2f4a40",  strap: "bracelet",  face: "digital",  file: "BG169CM-2_Front.jpg",                         img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/BG169CM-2_Front.jpg" },
    { id: "efk-200xpb-1a",     name: "CASIO Edifice (EFK-200XPB-1A)",                                         brand: "CASIO",             price: 4540,  was: null,  movement: "quartz",      gender: "male",    colour: "black",   rating: 4, reviews: 37, dial: "#1f2226",  body: "#33383e",  strap: "rubber",    face: "chrono",   file: "EFK200XPB-1A_front-Photoroom.png",            img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/EFK200XPB-1A_front-Photoroom.png" },
    { id: "dw-5600mnc-1",      name: "CASIO G-SHOCK (DW-5600MNC-1)",                                          brand: "CASIO",             price: 1038,  was: 1180,  movement: "quartz",      gender: "male",    colour: "black",   rating: 5, reviews: 50, dial: "#1f2226",  body: "#33383e",  strap: "nato",      face: "digital",  file: "DW-5600MNC-1.jpg",                            img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/DW-5600MNC-1.jpg" },
    { id: "mtg-b4000bd-1a",    name: "CASIO MTG (MTG-B4000BD-1A)",                                            brand: "CASIO",             price: 12840, was: null,  movement: "quartz",      gender: "male",    colour: "white",   rating: 3, reviews: 63, dial: "#eef1f4",  body: "#c8ccd0",  strap: "bracelet",  face: "dress",    file: "MTG-B4000BD-1A_front.jpg",                    img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/MTG-B4000BD-1A_front.jpg" },
    { id: "a158wa-1",          name: "CASIO Vintage (A158WA-1)",                                              brand: "CASIO",             price: 296,   was: 380,   movement: "quartz",      gender: "female",  colour: "black",   rating: 4, reviews: 76, dial: "#1f2226",  body: "#33383e",  strap: "bracelet",  face: "digital",  file: "A158WA-1.jpg",                                img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/A158WA-1.jpg" },
    { id: "ca0840-87x",        name: "Citizen Eco Drive (CA0840-87X)",                                        brand: "CITIZEN",           price: 2886,  was: 3280,  movement: "quartz",      gender: "male",    colour: "green",   rating: 5, reviews: 19, dial: "#17342c",  body: "#2f4a40",  strap: "bracelet",  face: "dress",    file: "CA0840-87X_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/CA0840-87X_front.jpg" },
    { id: "at2600-57e",        name: "Citizen Eco-Drive (AT2600-57E)",                                        brand: "CITIZEN",           price: 2144,  was: 2680,  movement: "quartz",      gender: "male",    colour: "blue",    rating: 3, reviews: 32, dial: "#1b3358",  body: "#c8ccd0",  strap: "rubber",    face: "dress",    file: "AT2600-57E_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/AT2600-57E_front.jpg" },
    { id: "ew5636-55e",        name: "Citizen L Collection (EW5636-55E)",                                     brand: "CITIZEN",           price: 3680,  was: null,  movement: "quartz",      gender: "male",    colour: "black",   rating: 4, reviews: 45, dial: "#1f2226",  body: "#33383e",  strap: "nato",      face: "dress",    file: "EW5636-55E.jpg",                              img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/EW5636-55E.jpg" },
    { id: "srpf32j1",          name: "Seiko Presage (SRPF32J1)",                                              brand: "SEIKO",             price: 3410,  was: null,  movement: "automatic",   gender: "female",  colour: "black",   rating: 5, reviews: 58, dial: "#1f2226",  body: "#33383e",  strap: "bracelet",  face: "dress",    file: "SRPF32J1_front_7772f8b7-1272-4a7b-bfeb-88b74bc556ca.jpg", img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/SRPF32J1_front_7772f8b7-1272-4a7b-bfeb-88b74bc556ca.jpg" },
    { id: "816-32-6182",       name: "SEAGULL Elegance (816.32.6182)",                                        brand: "SEAGULL",           price: 2151,  was: 2390,  movement: "automatic",   gender: "female",  colour: "green",   rating: 3, reviews: 71, dial: "#17342c",  body: "#2f4a40",  strap: "bracelet",  face: "dress",    file: "816.32.6182_front.jpg",                       img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/816.32.6182_front.jpg" },
    { id: "hdb001k1",          name: "SEIKO 5 Sports (HDB001K1)",                                             brand: "SEIKO",             price: 2974,  was: 3380,  movement: "automatic",   gender: "male",    colour: "yellow",  rating: 4, reviews: 14, dial: "#5b4636",  body: "#c9a227",  strap: "bracelet",  face: "diver",    file: "HDB001K1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HDB001K1_front.jpg" },
    { id: "hcb001j1",          name: "SEIKO Presage (HCB001J1)",                                              brand: "SEIKO",             price: 3476,  was: 3950,  movement: "automatic",   gender: "male",    colour: "yellow",  rating: 5, reviews: 27, dial: "#5b4636",  body: "#c9a227",  strap: "rubber",    face: "dress",    file: "HCB001J1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HCB001J1_front.jpg" },
    { id: "hbb001k1",          name: "Seiko Prospex (HBB001K1)",                                              brand: "SEIKO",             price: 4680,  was: null,  movement: "automatic",   gender: "female",  colour: "green",   rating: 3, reviews: 40, dial: "#17342c",  body: "#2f4a40",  strap: "nato",      face: "diver",    file: "HBB001K1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HBB001K1_front.jpg" },
    { id: "w06-03423-006",     name: "Saber 3 Hands Date Automatic Stainless Steel Watch W06-03423-006",      brand: "SOLVIL ET TITUS",   price: 3150,  was: 3580,  movement: "automatic",   gender: "female",  colour: "yellow",  rating: 4, reviews: 53, dial: "#5b4636",  body: "#c9a227",  strap: "bracelet",  face: "chrono",   file: "W06-03423-006_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03423-006_Front.jpg" },
    { id: "w06-03410-010",     name: "Voyager Multi-Function Automatic Stainless Steel Watch W06-03410-010",  brand: "SOLVIL ET TITUS",   price: 3062,  was: 3480,  movement: "automatic",   gender: "female",  colour: "gray",    rating: 5, reviews: 66, dial: "#3c4147",  body: "#8f959b",  strap: "bracelet",  face: "chrono",   file: "W06-03410-010_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03410-010_Front.jpg" },
    { id: "826-92-1051c",      name: "SEAGULL Elegance (826.92.1051C)",                                       brand: "SEAGULL",           price: 3294,  was: 3660,  movement: "automatic",   gender: "male",    colour: "blue",    rating: 3, reviews: 9,  dial: "#1b3358",  body: "#c8ccd0",  strap: "bracelet",  face: "dress",    file: "826.92.1051C_front.jpg",                      img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/826.92.1051C_front.jpg" },
    { id: "hdb002k1",          name: "SEIKO 5 Sports (HDB002K1)",                                             brand: "SEIKO",             price: 2974,  was: 3380,  movement: "automatic",   gender: "male",    colour: "black",   rating: 4, reviews: 22, dial: "#1f2226",  body: "#33383e",  strap: "rubber",    face: "diver",    file: "HDB002K1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HDB002K1_front.jpg" },
    { id: "hcb002j1",          name: "SEIKO Presage (HCB002J1)",                                              brand: "SEIKO",             price: 3476,  was: 3950,  movement: "automatic",   gender: "male",    colour: "green",   rating: 5, reviews: 35, dial: "#17342c",  body: "#2f4a40",  strap: "nato",      face: "dress",    file: "HCB002J1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HCB002J1_front.jpg" },
    { id: "hbb002k1",          name: "Seiko Prospex (HBB002K1)",                                              brand: "SEIKO",             price: 5750,  was: null,  movement: "automatic",   gender: "male",    colour: "green",   rating: 3, reviews: 48, dial: "#17342c",  body: "#2f4a40",  strap: "bracelet",  face: "diver",    file: "HBB002K1_Front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HBB002K1_Front.jpg" },
    { id: "w06-03423-001",     name: "Saber 3 Hands Date Automatic Stainless Steel Watch W06-03423-001",      brand: "SOLVIL ET TITUS",   price: 2798,  was: 3180,  movement: "automatic",   gender: "male",    colour: "green",   rating: 4, reviews: 61, dial: "#17342c",  body: "#2f4a40",  strap: "bracelet",  face: "chrono",   file: "W06-03423-001_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03423-001_Front.jpg" },
    { id: "w06-03410-011",     name: "Voyager Multi-Function Automatic Stainless Steel Watch W06-03410-011",  brand: "SOLVIL ET TITUS",   price: 3062,  was: 3480,  movement: "automatic",   gender: "male",    colour: "blue",    rating: 5, reviews: 74, dial: "#1b3358",  body: "#c8ccd0",  strap: "bracelet",  face: "chrono",   file: "W06-03410-011_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03410-011_Front.jpg" },
    { id: "hdb006k1",          name: "Seiko 5 Sports (HDB006K1)",                                             brand: "SEIKO",             price: 3250,  was: null,  movement: "automatic",   gender: "male",    colour: "yellow",  rating: 3, reviews: 17, dial: "#5b4636",  body: "#c9a227",  strap: "rubber",    face: "diver",    file: "HDB006K1_front_2a6e377e-fc14-408a-abf8-a0ddaa345314.jpg", img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HDB006K1_front_2a6e377e-fc14-408a-abf8-a0ddaa345314.jpg" },
    { id: "hcb003j1",          name: "SEIKO Presage (HCB003J1)",                                              brand: "SEIKO",             price: 3476,  was: 3950,  movement: "automatic",   gender: "male",    colour: "green",   rating: 4, reviews: 30, dial: "#17342c",  body: "#2f4a40",  strap: "nato",      face: "dress",    file: "HCB003J1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HCB003J1_front.jpg" },
    { id: "hbb003k1",          name: "SEIKO Prospex (HBB003K1)",                                              brand: "SEIKO",             price: 5080,  was: null,  movement: "automatic",   gender: "male",    colour: "white",   rating: 5, reviews: 43, dial: "#eef1f4",  body: "#c8ccd0",  strap: "bracelet",  face: "diver",    file: "HBB003K1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HBB003K1_front.jpg" },
    { id: "w06-03423-002",     name: "Saber 3 Hands Date Automatic Stainless Steel Watch W06-03423-002",      brand: "SOLVIL ET TITUS",   price: 2710,  was: 3080,  movement: "automatic",   gender: "male",    colour: "white",   rating: 3, reviews: 56, dial: "#eef1f4",  body: "#c8ccd0",  strap: "bracelet",  face: "chrono",   file: "W06-03423-002_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03423-002_Front.jpg" },
    { id: "hdb007k1",          name: "Seiko 5 Sports (HDB007K1)",                                             brand: "SEIKO",             price: 3250,  was: null,  movement: "automatic",   gender: "male",    colour: "green",   rating: 4, reviews: 69, dial: "#17342c",  body: "#2f4a40",  strap: "bracelet",  face: "diver",    file: "HDB007K1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HDB007K1_front.jpg" },
    { id: "hcc001j1",          name: "Seiko Presage (HCC001J1)",                                              brand: "SEIKO",             price: 8050,  was: null,  movement: "automatic",   gender: "male",    colour: "gray",    rating: 5, reviews: 12, dial: "#3c4147",  body: "#8f959b",  strap: "rubber",    face: "dress",    file: "HCC001J1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HCC001J1_front.jpg" },
    { id: "hbb004k1",          name: "SEIKO Prospex (HBB004K1)",                                              brand: "SEIKO",             price: 5080,  was: null,  movement: "automatic",   gender: "male",    colour: "pink",    rating: 3, reviews: 25, dial: "#e8b4c0",  body: "#e3c9cf",  strap: "nato",      face: "diver",    file: "HBB004K1_front.jpg",                          img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/HBB004K1_front.jpg" },
    { id: "pd7136-80a",        name: "Citizen Mechanical (PD7136-80A)",                                       brand: "CITIZEN",           price: 1500,  was: 2700,  movement: "mechanical",  gender: "female",  colour: "white",   rating: 4, reviews: 38, dial: "#eef1f4",  body: "#c8ccd0",  strap: "bracelet",  face: "dress",    file: "PD7136-80A_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/PD7136-80A_front.jpg" },
    { id: "pr1050-68w",        name: "Citizen Mechanical (PR1050-68W)",                                       brand: "CITIZEN",           price: 2446,  was: 2780,  movement: "mechanical",  gender: "female",  colour: "red",     rating: 5, reviews: 51, dial: "#6e1520",  body: "#c8ccd0",  strap: "bracelet",  face: "skeleton", file: "PR1050-68W_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/PR1050-68W_front.jpg" },
    { id: "nj0240-55a",        name: "Citizen Mechanical (NJ0240-55A)",                                       brand: "CITIZEN",           price: 1918,  was: 2180,  movement: "mechanical",  gender: "male",    colour: "gray",    rating: 3, reviews: 64, dial: "#3c4147",  body: "#8f959b",  strap: "bracelet",  face: "dress",    file: "NJ0240-55A_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/NJ0240-55A_front.jpg" },
    { id: "w02-00829-001",     name: "CYMA Intelligentsia (W02-00829-001)",                                   brand: "CYMA",              price: 4350,  was: null,  movement: "mechanical",  gender: "male",    colour: "blue",    rating: 4, reviews: 77, dial: "#1b3358",  body: "#c8ccd0",  strap: "rubber",    face: "skeleton", file: "00829-001_Front.jpg",                         img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/00829-001_Front.jpg" },
    { id: "819-87-d304",       name: "City Chain Exclusive SEAGULL 1963 (819.87.D304)",                       brand: "SEAGULL",           price: 5877,  was: 6530,  movement: "mechanical",  gender: "male",    colour: "white",   rating: 5, reviews: 20, dial: "#eef1f4",  body: "#c8ccd0",  strap: "nato",      face: "chrono",   file: "819.87.D304_front.jpg",                       img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/819.87.D304_front.jpg" },
    { id: "w06-03402-006",     name: "Vinyl 3 Hands Mechanical Stainless Steel Watch W06-03402-006",          brand: "SOLVIL ET TITUS",   price: 2710,  was: 3080,  movement: "mechanical",  gender: "male",    colour: "gray",    rating: 3, reviews: 33, dial: "#3c4147",  body: "#8f959b",  strap: "bracelet",  face: "dress",    file: "W06-03402-006_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03402-006_Front.jpg" },
    { id: "nj0240-55e",        name: "Citizen Mechanical (NJ0240-55E)",                                       brand: "CITIZEN",           price: 1918,  was: 2180,  movement: "mechanical",  gender: "male",    colour: "yellow",  rating: 4, reviews: 46, dial: "#5b4636",  body: "#c9a227",  strap: "bracelet",  face: "dress",    file: "NJ0240-55E_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/NJ0240-55E_front.jpg" },
    { id: "w02-00829-002",     name: "CYMA Intelligentsia (W02-00829-002)",                                   brand: "CYMA",              price: 4550,  was: null,  movement: "mechanical",  gender: "male",    colour: "pink",    rating: 5, reviews: 59, dial: "#e8b4c0",  body: "#e3c9cf",  strap: "bracelet",  face: "skeleton", file: "00829-002_Front.jpg",                         img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/00829-002_Front.jpg" },
    { id: "819-97-d304",       name: "City Chain Exclusive SEAGULL 1963 (819.97.D304)",                       brand: "SEAGULL",           price: 5877,  was: 6530,  movement: "mechanical",  gender: "male",    colour: "blue",    rating: 3, reviews: 72, dial: "#1b3358",  body: "#c8ccd0",  strap: "rubber",    face: "chrono",   file: "819.97.D304_front.jpg",                       img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/819.97.D304_front.jpg" },
    { id: "w06-03402-007",     name: "Vinyl 3 Hands Mechanical Stainless Steel Watch W06-03402-007",          brand: "SOLVIL ET TITUS",   price: 2710,  was: 3080,  movement: "mechanical",  gender: "male",    colour: "black",   rating: 4, reviews: 15, dial: "#1f2226",  body: "#33383e",  strap: "nato",      face: "dress",    file: "W06-03402-007_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03402-007_Front.jpg" },
    { id: "nj0240-55x",        name: "Citizen Mechanical (NJ0240-55X)",                                       brand: "CITIZEN",           price: 1918,  was: 2180,  movement: "mechanical",  gender: "male",    colour: "yellow",  rating: 5, reviews: 28, dial: "#5b4636",  body: "#c9a227",  strap: "bracelet",  face: "dress",    file: "NJ0240-55X_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/NJ0240-55X_front.jpg" },
    { id: "w02-00829-003",     name: "CYMA Intelligentsia (W02-00829-003)",                                   brand: "CYMA",              price: 4550,  was: null,  movement: "mechanical",  gender: "male",    colour: "black",   rating: 3, reviews: 41, dial: "#1f2226",  body: "#33383e",  strap: "bracelet",  face: "skeleton", file: "00829-003_Front.jpg",                         img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/00829-003_Front.jpg" },
    { id: "w06-03402-008",     name: "Vinyl 3 Hands Mechanical Stainless Steel Watch W06-03402-008",          brand: "SOLVIL ET TITUS",   price: 2710,  was: 3080,  movement: "mechanical",  gender: "male",    colour: "black",   rating: 4, reviews: 54, dial: "#1f2226",  body: "#33383e",  strap: "bracelet",  face: "dress",    file: "W06-03402-008_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03402-008_Front.jpg" },
    { id: "nj0243-06a",        name: "Citizen Mechanical (NJ0243-06A)",                                       brand: "CITIZEN",           price: 2006,  was: 2280,  movement: "mechanical",  gender: "male",    colour: "gray",    rating: 5, reviews: 67, dial: "#3c4147",  body: "#8f959b",  strap: "rubber",    face: "skeleton", file: "NJ0243-06A_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/NJ0243-06A_front.jpg" },
    { id: "w06-03402-009",     name: "Vinyl 3 Hands Mechanical Stainless Steel Watch W06-03402-009",          brand: "SOLVIL ET TITUS",   price: 2974,  was: 3380,  movement: "mechanical",  gender: "male",    colour: "black",   rating: 3, reviews: 10, dial: "#1f2226",  body: "#33383e",  strap: "nato",      face: "dress",    file: "W06-03402-009_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03402-009_Front.jpg" },
    { id: "nk0022-50a",        name: "Citizen Mechanical (NK0022-50A)",                                       brand: "CITIZEN",           price: 3854,  was: 4380,  movement: "mechanical",  gender: "male",    colour: "green",   rating: 4, reviews: 23, dial: "#17342c",  body: "#2f4a40",  strap: "bracelet",  face: "skeleton", file: "NK0022-50A_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/NK0022-50A_front.jpg" },
    { id: "w06-03402-010",     name: "Vinyl 3 Hands Mechanical Stainless Steel Watch W06-03402-010",          brand: "SOLVIL ET TITUS",   price: 2974,  was: 3380,  movement: "mechanical",  gender: "male",    colour: "black",   rating: 5, reviews: 36, dial: "#1f2226",  body: "#33383e",  strap: "bracelet",  face: "dress",    file: "W06-03402-010_Front.jpg",                     img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/W06-03402-010_Front.jpg" },
    { id: "nk0030-51x",        name: "Citizen Mechanical (NK0030-51X)",                                       brand: "CITIZEN",           price: 3502,  was: 3980,  movement: "mechanical",  gender: "male",    colour: "white",   rating: 3, reviews: 49, dial: "#eef1f4",  body: "#c8ccd0",  strap: "bracelet",  face: "skeleton", file: "NK0030-51X_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/NK0030-51X_front.jpg" },
    { id: "pr1052-62a",        name: "Citizen Mechanical (PR1052-62A)",                                       brand: "CITIZEN",           price: 2710,  was: 3080,  movement: "mechanical",  gender: "male",    colour: "white",   rating: 4, reviews: 62, dial: "#eef1f4",  body: "#c8ccd0",  strap: "rubber",    face: "dress",    file: "PR1052-62A_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/PR1052-62A_front.jpg" },
    { id: "pr1054-67a",        name: "Citizen Mechanical (PR1054-67A)",                                       brand: "CITIZEN",           price: 2534,  was: 2880,  movement: "mechanical",  gender: "male",    colour: "yellow",  rating: 5, reviews: 75, dial: "#5b4636",  body: "#c9a227",  strap: "nato",      face: "skeleton", file: "PR1054-67A_front.jpg",                        img: "https://cdn.shopify.com/s/files/1/0691/2075/3903/files/PR1054-67A_front.jpg" },
  ];

  /* ==========================================================
     CATEGORY PAGES
     ----------------------------------------------------------
     The five category icons on the home page lead to
     shop.html?cat=<key>. Each key names one filter dimension
     and one value, so a category page is the shop page with a
     filter already applied — same template, same components,
     same behaviour, which is the CONSISTENCY principle. Adding
     a sixth category means adding one line here.
     ========================================================== */
  const CATEGORIES = {
    quartz:     { field: 'movement', value: 'quartz',     title: '石英錶',   chip: '石英' },
    automatic:  { field: 'movement', value: 'automatic',  title: '自動錶',   chip: '自動' },
    mechanical: { field: 'movement', value: 'mechanical', title: '機械錶',   chip: '機械' },
    male:       { field: 'gender',   value: 'male',       title: '男裝腕錶', chip: '男裝' },
    female:     { field: 'gender',   value: 'female',     title: '女裝腕錶', chip: '女裝' }
  };

  /* Stock status. Every seventh product is out of stock, which gives
     the AFFORDANCE principle something real to demonstrate: an
     unavailable control must look unavailable, not merely fail when
     pressed. */
  const inStock = p => (PRODUCTS.indexOf(p) % 7) !== 3;

  /* Colour swatches shown in the filter panel. */
  const COLOURS = [
    { key: 'black',  label: '黑色', hex: '#1a1a1a' },
    { key: 'white',  label: '白色', hex: '#ffffff' },
    { key: 'gray',   label: '灰色', hex: '#8a8a8a' },
    { key: 'blue',   label: '藍色', hex: '#2b6cd4' },
    { key: 'green',  label: '綠色', hex: '#2fa84f' },
    { key: 'red',    label: '紅色', hex: '#e02020' },
    { key: 'yellow', label: '黃色', hex: '#f5c518' },
    { key: 'pink',   label: '粉紅', hex: '#f45fa0' }
  ];

  /* ==========================================================
     2. SMALL HELPERS
     ========================================================== */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const money = n => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const discount = p => (p.was ? Math.round((1 - p.price / p.was) * 100) : 0);

  const stars = n => '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);

  /* Escapes text before it is inserted with innerHTML. */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => (
      { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
  }

  /* ==========================================================
     3. WATCH ARTWORK
     ----------------------------------------------------------
     Vector illustrations drawn to match the case style of each
     model, so a diver does not look like a dress watch and a
     smartwatch does not look like a chronograph. All artwork is
     drawn on a 100 × 100 grid and scaled by the viewBox, which
     keeps the geometry readable at any size.

     These exist so the prototype has no external dependencies.
     Set USE_PHOTOS = true (top of file) to load real photos and
     keep these as the fallback.
     ========================================================== */

  /* --- strap / bracelet ------------------------------------- */
  function strapArt(p, square) {
    const top = square ? 22 : 24, bot = square ? 78 : 76;

    if (p.strap === 'bracelet') {
      let links = '';
      [2, 9.5, 17].forEach(y => {
        links += `<rect x="39" y="${y}" width="22" height="6" rx="1.5" fill="${p.body}"/>`;
        links += `<rect x="39" y="${100 - y - 6}" width="22" height="6" rx="1.5" fill="${p.body}"/>`;
      });
      return links;
    }

    if (p.strap === 'nato') {
      return `<rect x="38" y="1" width="24" height="${top}" fill="#2c3e57"/>
              <rect x="38" y="${bot}" width="24" height="${99 - bot}" fill="#2c3e57"/>
              <rect x="46" y="1" width="3" height="${top}" fill="#e8c15a" opacity=".8"/>
              <rect x="46" y="${bot}" width="3" height="${99 - bot}" fill="#e8c15a" opacity=".8"/>`;
    }

    /* rubber — tapered */
    const r = p.dial;
    return `<path d="M39 ${top} L36 2 L64 2 L61 ${top} Z" fill="${r}" opacity=".9"/>
            <path d="M39 ${bot} L36 98 L64 98 L61 ${bot} Z" fill="${r}" opacity=".9"/>`;
  }

  /* --- hour markers ----------------------------------------- */
  function indices(radius, colour, len) {
    let out = '';
    for (let i = 0; i < 12; i++) {
      const a = (i * 30 - 90) * Math.PI / 180;
      const x1 = 50 + Math.cos(a) * radius, y1 = 50 + Math.sin(a) * radius;
      const x2 = 50 + Math.cos(a) * (radius - (len || 2.5)), y2 = 50 + Math.sin(a) * (radius - (len || 2.5));
      out += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"
               stroke="${colour}" stroke-width="${i % 3 === 0 ? 1.8 : 1}" stroke-linecap="round"/>`;
    }
    return out;
  }

  /* --- hands ------------------------------------------------- */
  function hands(colour, accent) {
    return `<line x1="50" y1="50" x2="50" y2="34" stroke="${colour}" stroke-width="2.6" stroke-linecap="round"/>
            <line x1="50" y1="50" x2="63" y2="57" stroke="${colour}" stroke-width="1.9" stroke-linecap="round"/>
            <line x1="50" y1="52" x2="38" y2="38" stroke="${accent || '#e05a3a'}" stroke-width="0.9" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="1.6" fill="${colour}"/>`;
  }

  const light = '#f2f4f6';

  /* --- one function per case style --------------------------- */
  const FACES = {

    dress(p) {
      return `${strapArt(p)}
        <circle cx="50" cy="50" r="27" fill="${p.body}"/>
        <circle cx="50" cy="50" r="24" fill="${p.dial}"/>
        <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="0.8"/>
        ${indices(20.5, light)}
        <rect x="60" y="47" width="7" height="6" rx="0.8" fill="rgba(255,255,255,.9)"/>
        <text x="63.5" y="51.8" font-size="4" text-anchor="middle" fill="#333">5</text>
        <rect x="76.5" y="47" width="3.5" height="6" rx="1" fill="${p.body}"/>
        ${hands(light)}`;
    },

    chrono(p) {
      return `${strapArt(p)}
        <circle cx="50" cy="50" r="27.5" fill="${p.body}"/>
        <circle cx="50" cy="50" r="24" fill="${p.dial}"/>
        ${indices(21, light, 2)}
        <circle cx="50" cy="37" r="6" fill="rgba(0,0,0,.28)"/>
        <circle cx="38" cy="55" r="6" fill="rgba(0,0,0,.28)"/>
        <circle cx="62" cy="55" r="6" fill="rgba(0,0,0,.28)"/>
        <circle cx="50" cy="37" r="6" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="0.6"/>
        <circle cx="38" cy="55" r="6" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="0.6"/>
        <circle cx="62" cy="55" r="6" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="0.6"/>
        <line x1="50" y1="37" x2="53" y2="33.5" stroke="${light}" stroke-width="0.8"/>
        <line x1="38" y1="55" x2="35" y2="52" stroke="${light}" stroke-width="0.8"/>
        <line x1="62" y1="55" x2="65" y2="58" stroke="${light}" stroke-width="0.8"/>
        <rect x="77" y="41" width="3.5" height="4" rx="1" fill="${p.body}"/>
        <rect x="77" y="47.5" width="4" height="5.5" rx="1" fill="${p.body}"/>
        <rect x="77" y="55.5" width="3.5" height="4" rx="1" fill="${p.body}"/>
        ${hands(light, '#e8b23a')}`;
    },

    diver(p) {
      let bezel = '';
      for (let i = 0; i < 12; i++) {
        const a = (i * 30 - 90) * Math.PI / 180;
        bezel += `<circle cx="${(50 + Math.cos(a) * 25.5).toFixed(1)}" cy="${(50 + Math.sin(a) * 25.5).toFixed(1)}"
                   r="${i === 0 ? 1.9 : 1.1}" fill="${i === 0 ? '#e8c15a' : 'rgba(255,255,255,.75)'}"/>`;
      }
      return `${strapArt(p)}
        <circle cx="50" cy="50" r="28.5" fill="${p.body}"/>
        <circle cx="50" cy="50" r="28.5" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1"/>
        <circle cx="50" cy="50" r="22.5" fill="${p.dial}"/>
        ${bezel}
        ${indices(19, '#d8f5ee', 2)}
        <circle cx="50" cy="50" r="22.5" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="0.8"/>
        <rect x="78" y="46.5" width="4" height="7" rx="1.2" fill="${p.body}"/>
        ${hands('#d8f5ee', '#e8c15a')}`;
    },

    skeleton(p) {
      return `${strapArt(p)}
        <circle cx="50" cy="50" r="27" fill="${p.body}"/>
        <circle cx="50" cy="50" r="24" fill="${p.dial}"/>
        <circle cx="44" cy="44" r="8" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.2"/>
        <circle cx="58" cy="57" r="6.5" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.1"/>
        <circle cx="57" cy="41" r="4.5" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1"/>
        <path d="M36 44h16M44 36v16" stroke="rgba(255,255,255,.35)" stroke-width="0.8"/>
        <path d="M51.5 57h13M58 50.5v13" stroke="rgba(255,255,255,.3)" stroke-width="0.8"/>
        ${indices(21.5, light, 2)}
        <rect x="76.5" y="47" width="3.5" height="6" rx="1" fill="${p.body}"/>
        ${hands(light, '#c9a227')}`;
    },

    digital(p) {
      return `${strapArt(p, true)}
        <rect x="21" y="21" width="58" height="58" rx="16" fill="${p.body}"/>
        <rect x="25" y="25" width="50" height="50" rx="13" fill="${p.dial}"/>
        <rect x="31" y="36" width="38" height="27" rx="3" fill="rgba(190,205,190,.92)"/>
        <text x="50" y="45" font-size="6" text-anchor="middle" fill="#2b3a2b" font-family="monospace">SU 6:30</text>
        <text x="50" y="58" font-size="12" text-anchor="middle" fill="#1c2a1c" font-family="monospace">10:58</text>
        <rect x="17" y="38" width="5" height="8" rx="1.5" fill="${p.body}"/>
        <rect x="17" y="54" width="5" height="8" rx="1.5" fill="${p.body}"/>
        <rect x="78" y="38" width="5" height="8" rx="1.5" fill="${p.body}"/>
        <rect x="78" y="54" width="5" height="8" rx="1.5" fill="${p.body}"/>`;
    },

    smart(p) {
      return `${strapArt(p, true)}
        <rect x="27" y="22" width="46" height="56" rx="15" fill="${p.body}"/>
        <rect x="30" y="25" width="40" height="50" rx="12.5" fill="#101216"/>
        <rect x="33" y="28" width="34" height="44" rx="10" fill="${p.dial}"/>
        <text x="50" y="47" font-size="13" text-anchor="middle" fill="#fff" font-family="Helvetica, Arial">10</text>
        <text x="50" y="59" font-size="13" text-anchor="middle" fill="#fff" font-family="Helvetica, Arial">08</text>
        <text x="50" y="35" font-size="4" text-anchor="middle" fill="rgba(255,255,255,.8)">FRI 10/18</text>
        <rect x="72" y="40" width="4" height="9" rx="2" fill="${p.body}"/>`;
    }
  };

  /* --- public entry point ------------------------------------ */
  function watchSVG(p, size) {
    const s = size || 260;
    const draw = FACES[p.face || 'dress'];
    return `<svg viewBox="0 0 100 100" width="${s}" height="${s}"
              role="img" aria-label="${esc(p.name)} 產品圖片" focusable="false"
              preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto">
      ${draw(p)}
    </svg>`;
  }

  /* Every local filename worth trying, in order of likelihood.

     Downloaders do not always keep the extension from the URL —
     Shopify's CDN negotiates content, so a ".jpg" link is often
     saved as .webp. So each candidate stem is tried against every
     common image extension before giving up. */
  const EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.jfif', '.avif', '.gif'];

  function localCandidates(p) {
    const original = p.file || (p.id + PHOTO_EXT);
    const stems = [original.replace(/\.[^.]+$/, ''), p.id];
    const names = [original];

    stems.forEach(stem => EXTS.forEach(ext => {
      const n = stem + ext;
      if (names.indexOf(n) === -1) names.push(n);
    }));

    return names.map(n => PHOTO_DIR + encodeURIComponent(n));
  }

  /* Returns a photograph or the illustration, per IMAGE_SOURCE. */
  function productArt(p, size) {
    let list = null;
    if (IMAGE_SOURCE === 'local')  list = localCandidates(p);
    if (IMAGE_SOURCE === 'remote' && p.img) list = [p.img];
    if (!list || !list.length) return watchSVG(p, size);

    /* Sizing is left entirely to the stylesheet — an inline style
       here would outrank it and break the centring rules. */
    const rest = esc(JSON.stringify(list.slice(1)));
    return `<img class="pimg" src="${list[0]}" alt="${esc(p.name)}" loading="lazy"
                 data-fallback="${p.id}" data-size="${size || 260}"
                 data-more="${rest}">`;
  }

  /* Missing photograph → walk down the candidate list, and only
     draw the illustration once every option is exhausted. 'error'
     does not bubble, so this listener runs in the capture phase
     rather than being attached to every single image. */
  document.addEventListener('error', function (e) {
    const img = e.target;
    if (!img || img.tagName !== 'IMG' || !img.dataset.fallback) return;

    let more = [];
    try { more = JSON.parse(img.dataset.more || '[]'); } catch (err) { more = []; }

    if (more.length) {
      img.dataset.more = JSON.stringify(more.slice(1));
      img.src = more[0];
      return;
    }

    const p = PRODUCTS.find(x => x.id === img.dataset.fallback);
    if (p) img.outerHTML = watchSVG(p, Number(img.dataset.size));
  }, true);

  /* ==========================================================
     4. SHOPPING CART
     Held in sessionStorage so the contents survive a page
     change inside the same test session, which is what the
     evaluation tasks require.
     ========================================================== */
  const Cart = {
    key: 'cc_cart',
    _mem: null,
    read() {
      /* Hydrate once from sessionStorage, then keep an in-memory
         copy so the cart still works if storage is unavailable
         (some browsers block it on file:// URLs). */
      if (this._mem === null) {
        try { this._mem = JSON.parse(sessionStorage.getItem(this.key)) || []; }
        catch (e) { this._mem = []; }
      }
      return this._mem;
    },
    write(items) {
      this._mem = items;
      try { sessionStorage.setItem(this.key, JSON.stringify(items)); } catch (e) { /* ignore */ }
      this.render();
    },
    add(id, qty) {
      const items = this.read();
      const found = items.find(i => i.id === id);
      if (found) { found.qty += (qty || 1); } else { items.push({ id: id, qty: qty || 1 }); }
      this.write(items);
    },
    count() { return this.read().reduce((n, i) => n + i.qty, 0); },
    total() {
      return this.read().reduce((sum, i) => {
        const p = PRODUCTS.find(x => x.id === i.id);
        return sum + (p ? p.price * i.qty : 0);
      }, 0);
    },
    /* Renders the hover panel — the "cart shortcut" screen. */
    render() {
      const badge = $('#cartCount');
      const body  = $('#cartBody');
      const n     = this.count();

      if (badge) { badge.textContent = n; badge.hidden = n === 0; }
      if (!body) return;

      const items = this.read();
      if (!items.length) {
        body.innerHTML = '<p class="cart-empty">您的購物車是空的。</p>';
        return;
      }
      body.innerHTML = items.map(i => {
        const p = PRODUCTS.find(x => x.id === i.id);
        if (!p) return '';
        return `<div class="cart-line">
            <span class="thumb">${productArt(p, 44)}</span>
            <span>${esc(p.name)}<br><small>數量 ${i.qty}</small></span>
            <span>${money(p.price * i.qty)}</span>
          </div>`;
      }).join('')
      + `<div class="cart-total"><span>小計</span><span>${money(this.total())}</span></div>
         <a class="btn-primary" href="#" style="margin-top:12px">前往結帳</a>`;
    }
  };

  /* ==========================================================
     5. TOAST — feedback that an action succeeded.
     ========================================================== */
  let toastTimer;
  function toast(msg) {
    let el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2200);
  }

  /* ==========================================================
     6. PRODUCT CARD
     One markup template, reused everywhere: the hover
     shortcuts therefore behave identically on every page.
     ========================================================== */
  function cardHTML(p) {
    const off = discount(p);
    return `<article class="card" data-id="${p.id}">
      <a class="card__media" href="product.html?id=${encodeURIComponent(p.id)}">
        ${off ? `<span class="card__badge">${off}% OFF</span>` : ''}
        ${inStock(p) ? '' : '<span class="card__badge card__badge--out">暫時缺貨</span>'}
        ${productArt(p)}
        <span class="card__actions">
          <button type="button" data-act="cart" title="${inStock(p) ? '加入購物車' : '暫時缺貨'}"
                  aria-label="將 ${esc(p.name)} 加入購物車"
                  ${inStock(p) ? '' : 'disabled'}>🛒</button>
          <button type="button" data-act="fav"      title="加入我的最愛" aria-label="將 ${esc(p.name)} 加入我的最愛">♡</button>
          <button type="button" data-act="details"  title="查看詳情" aria-label="查看 ${esc(p.name)} 詳情">🔍</button>
        </span>
      </a>
      <h3 class="card__title"><a href="product.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a></h3>
      <p class="rating">${stars(p.rating)}<span class="count">(${p.reviews})</span></p>
      <p class="card__price">
        ${p.was ? `<s>${money(p.was)}</s>` : ''}
        <b>${money(p.price)}</b>
        ${off ? `<span class="off">${off}% OFF</span>` : ''}
      </p>
    </article>`;
  }

  function renderGrid(el, list) {
    if (!el) return;
    el.innerHTML = list.length
      ? list.map(cardHTML).join('')
      : `<p class="no-results">沒有符合篩選條件的商品。<br>請放寬價格範圍或清除部分條件。</p>`;
  }

  /* Card hover-shortcut clicks, delegated from the document. */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.card__actions button');
    if (!btn) return;
    e.preventDefault();          // do not follow the card link
    e.stopPropagation();

    const card = btn.closest('.card');
    const p = PRODUCTS.find(x => x.id === card.dataset.id);
    const act = btn.dataset.act;

    if (act === 'cart') {
      if (!inStock(p)) { toast('此商品暫時缺貨'); return; }
      Cart.add(p.id, 1); toast('已加入購物車：' + p.name);
    }
    if (act === 'fav')     { btn.textContent = btn.textContent === '♡' ? '♥' : '♡'; toast('已更新我的最愛'); }
    if (act === 'details') { go('product.html?id=' + encodeURIComponent(p.id)); }
  });

  /* ==========================================================
     7. LOADING INDICATOR
     Shown for a beat on navigation so the click is
     acknowledged before the next page paints.
     ========================================================== */
  function go(href) {
    const loader = $('#loader');
    if (loader) loader.classList.add('is-visible');
    setTimeout(() => { window.location.href = href; }, 260);
  }

  /* ==========================================================
     8. SEARCH + "no result" feedback
     ========================================================== */
  function initSearch() {
    const overlay = $('#searchOverlay');
    if (!overlay) return;

    const input    = $('#searchInput');
    const feedback = $('#searchFeedback');

    function open()  { overlay.classList.add('is-open'); input.focus(); }
    function close() { overlay.classList.remove('is-open'); feedback.classList.remove('is-visible'); }

    $$('[data-open-search]').forEach(b => b.addEventListener('click', open));
    $('#searchClose').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    $('#searchForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;

      const hits = PRODUCTS.filter(p =>
        (p.name + ' ' + p.brand).toLowerCase().includes(q.toLowerCase())
      );

      if (hits.length) {
        go('shop.html?q=' + encodeURIComponent(q));
      } else {
        /* Visibility of system status: say plainly that nothing
           matched, and offer a route forward. */
        feedback.innerHTML =
          `<strong>找不到符合「${esc(q)}」的商品。</strong>
           <p>建議您：</p>
           <ul>
             <li>檢查輸入是否有錯字</li>
             <li>使用較簡短的關鍵字，例如「CASIO」或「自動錶」</li>
             <li><a href="shop.html">瀏覽全部腕錶</a></li>
           </ul>`;
        feedback.classList.add('is-visible');
      }
    });
  }

  /* ==========================================================
     9. JUMP TO TOP
     ========================================================== */
  function initToTop() {
    const btn = $('#toTop');
    if (!btn) return;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });
  }

  /* ==========================================================
     10. HOME PAGE
     ========================================================== */
  function initHome() {
    const arrivals = $('#newArrivals');
    if (!arrivals) return;

    /* Show one watch from each movement type in each strip, so the
       home page previews the whole catalogue rather than twenty
       near-identical models from one family. */
    const byType = m => PRODUCTS.filter(p => p.movement === m);
    const q = byType('quartz'), a = byType('automatic'), m = byType('mechanical');

    renderGrid(arrivals,          [q[0], a[0], m[0], q[1], a[1]].filter(Boolean));
    renderGrid($('#lastVisited'), [m[1], q[2], a[2], m[2], q[3]].filter(Boolean));
  }

  /* ==========================================================
     11. SHOP PAGE — live multi-dimensional filtering
     This is the fix for goal 3.4: the original site could only
     filter on one dimension at a time.
     ========================================================== */
  function initShop() {
    const grid = $('#shopGrid');
    if (!grid) return;

    /* Build the colour checkboxes from data. */
    $('#colourGroup').innerHTML = COLOURS.map(c =>
      `<label><input type="checkbox" name="colour" value="${c.key}">
         <span class="swatch" style="background:${c.hex}"></span>${c.label}</label>`
    ).join('');

    const priceInput = $('#priceMax');
    const priceOut   = $('#priceOut');
    const countOut   = $('#resultCount');
    const sortSel    = $('#sortBy');

    /* Pre-fill from a search query, if the user arrived here
       from the search overlay. */
    const params = new URLSearchParams(window.location.search);
    const query  = (params.get('q') || '').toLowerCase();
    if (query) { $('#activeQuery').textContent = '搜尋：' + query; }

    /* --- category page ------------------------------------- */
    const catKey = params.get('cat');
    const cat    = CATEGORIES[catKey];

    if (cat) {
      /* The page announces its own identity … */
      document.title = cat.title + ' | CITY CHAIN 時間廊';
      $('#pageTitle').textContent = cat.title;
      $('#crumbCurrent').textContent = cat.title;

      /* … and the matching filter is ticked, so the user can see
         why the list is narrowed and can widen it themselves.
         A hidden filter would be a visibility failure. */
      const box = $(`input[name="${cat.field}"][value="${cat.value}"]`);
      if (box) box.checked = true;
    }

    /* Category switcher, so users can move between categories
       without returning to the home page first. */
    $('#catChips').innerHTML =
      `<a href="shop.html"${catKey ? '' : ' aria-current="true"'}>全部</a>` +
      Object.keys(CATEGORIES).map(k =>
        `<a href="shop.html?cat=${k}"${k === catKey ? ' aria-current="true"' : ''}>${CATEGORIES[k].chip}</a>`
      ).join('');

    function checked(name) {
      return $$(`input[name="${name}"]:checked`).map(i => i.value);
    }

    function apply() {
      const maxPrice = Number(priceInput.value);
      const mv  = checked('movement');
      const gd  = checked('gender');
      const col = checked('colour');
      const rt  = $('input[name="rating"]:checked');
      const minRating = rt ? Number(rt.value) : 0;

      let list = PRODUCTS.filter(p =>
        p.price <= maxPrice &&
        (!mv.length  || mv.includes(p.movement)) &&
        (!gd.length  || gd.includes(p.gender)) &&
        (!col.length || col.includes(p.colour)) &&
        p.rating >= minRating &&
        (!query || (p.name + ' ' + p.brand).toLowerCase().includes(query))
      );

      const sort = sortSel.value;
      if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price);
      if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
      if (sort === 'rating')     list.sort((a, b) => b.rating - a.rating);

      priceOut.textContent = money(maxPrice).replace('.00', '');
      countOut.textContent = `顯示 ${list.length} 件商品`;
      renderGrid(grid, list);
    }

    $('#filters').addEventListener('change', apply);
    priceInput.addEventListener('input', apply);
    sortSel.addEventListener('change', apply);

    $('#clearFilters').addEventListener('click', function () {
      $$('#filters input[type="checkbox"], #filters input[type="radio"]').forEach(i => { i.checked = false; });
      priceInput.value = priceInput.max;

      /* On a category page the category itself is the page, not a
         filter the user chose — so clearing keeps it and the
         heading never contradicts the list below it. */
      if (cat) {
        const box = $(`input[name="${cat.field}"][value="${cat.value}"]`);
        if (box) box.checked = true;
      }

      apply();
      toast(cat ? '已清除其他篩選條件' : '已清除所有篩選條件');
    });

    apply();
  }

  /* ==========================================================
     12. PRODUCT DETAILS PAGE
     ========================================================== */
  function initProduct() {
    const root = $('#pdp');
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'efk-200d-2a';
    const p  = PRODUCTS.find(x => x.id === id) || PRODUCTS[1];

    /* Sibling models: the same brand in a different colour.
       Stage 2 §2.3 — the original page hid these entirely. */
    const siblings = PRODUCTS.filter(x => x.brand === p.brand && x.id !== p.id).slice(0, 4);

    document.title = p.name + ' | CITY CHAIN';
    $('#crumbCurrent').textContent = p.name;
    $('#pdpName').textContent = p.name;
    $('#pdpStage').innerHTML = productArt(p, 420);

    $('#pdpPrice').innerHTML = (p.was ? `<s>${money(p.was)}</s>` : '') + money(p.price)
      + (discount(p) ? ` <span class="off" style="color:var(--sale);font-size:14px">${discount(p)}% OFF</span>` : '');

    $('#pdpRating').innerHTML = `<span class="rating">${stars(p.rating)}<span class="count">${p.rating}.0 (${p.reviews} 則評價)</span></span>`;

    /* Gallery thumbnails. Only one photograph per model was
       captured, so showing five identical copies would be
       misleading — the strip lists what actually exists. */
    $('#pdpThumbs').innerHTML =
      `<button type="button" aria-current="true" aria-label="檢視圖片 1">${productArt(p, 72)}</button>`;
    $('#pdpThumbs').addEventListener('click', function (e) {
      const b = e.target.closest('button');
      if (!b) return;
      $$('#pdpThumbs button').forEach(x => x.setAttribute('aria-current', 'false'));
      b.setAttribute('aria-current', 'true');
    });

    /* Colour variants */
    $('#pdpColours').innerHTML = siblings.length
      ? siblings.map(s =>
          `<button type="button" data-goto="${s.id}" aria-current="false" title="${esc(s.name)}">${productArt(s, 64)}</button>`
        ).join('')
      : '<p style="font-size:14px;color:var(--ink-faint)">此型號目前只有一種顏色。</p>';

    $('#pdpColours').addEventListener('click', function (e) {
      const b = e.target.closest('button[data-goto]');
      if (b) go('product.html?id=' + encodeURIComponent(b.dataset.goto));
    });

    /* Quantity stepper */
    let qty = 1;
    const out = $('#qtyOut');
    $('#qtyMinus').addEventListener('click', () => { qty = Math.max(1, qty - 1); out.value = qty; });
    $('#qtyPlus').addEventListener('click',  () => { qty = Math.min(9, qty + 1); out.value = qty; });

    const stocked = inStock(p);
    const buyBtn = $('#addToCart');
    if (!stocked) {
      buyBtn.disabled = true;
      buyBtn.textContent = '暫時缺貨';
      $('.stock').innerHTML = '<span class="dot dot--out"></span>網店 · 暫時缺貨';
    }

    buyBtn.addEventListener('click', function () {
      if (!stocked) return;
      Cart.add(p.id, qty);
      toast(`已加入購物車：${p.name} × ${qty}`);
    });

    /* Specification table */
    $('#pdpSpec').innerHTML = `
      <caption>產品規格</caption>
      <tbody>
        <tr><th>產品編號</th><td>${esc(p.id.toUpperCase())}</td></tr>
        <tr class="group"><th colspan="2">錶殼</th></tr>
        <tr><th>錶殼直徑</th><td>43.6 mm</td></tr>
        <tr><th>錶殼厚度</th><td>11.9 mm</td></tr>
        <tr><th>錶殼形狀</th><td>圓形</td></tr>
        <tr><th>錶面玻璃</th><td>藍寶石玻璃</td></tr>
        <tr class="group"><th colspan="2">錶盤</th></tr>
        <tr><th>顏色</th><td>${esc(COLOURS.find(c => c.key === p.colour).label)}</td></tr>
        <tr class="group"><th colspan="2">錶帶</th></tr>
        <tr><th>錶帶材質</th><td>${p.strap === 'bracelet' ? '不銹鋼' : p.strap === 'nato' ? '尼龍' : '橡膠'}</td></tr>
        <tr><th>機芯</th><td>${p.movement === 'automatic' ? '自動機械機芯' : p.movement === 'mechanical' ? '手動機械機芯' : '石英機芯'}</td></tr>
        <tr><th>防水性能</th><td>10 ATM</td></tr>
      </tbody>`;

    /* Related rows */
    renderGrid($('#pdpRelated'), PRODUCTS.filter(x => x.id !== p.id).slice(14, 19));
  }

  /* ==========================================================
     13. BOOT
     ========================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    Cart.render();
    initSearch();
    initToTop();
    initHome();
    initShop();
    initProduct();

    /* Route every internal link through the loading indicator. */
    document.addEventListener('click', function (e) {
      /* Hover shortcuts sit inside the card link; they must not
         also trigger navigation. */
      if (e.target.closest('.card__actions')) return;
      const a = e.target.closest('a[href$=".html"], a[href*=".html?"]');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      go(a.getAttribute('href'));
    });
  });

  /* Expose for console inspection during usability testing. */
  window.CityChain = { PRODUCTS, COLOURS, Cart, watchSVG, productArt,
                       localCandidates, IMAGE_SOURCE };
})();
