export default [

    // --------------------- Cubicle stage -------------------------------------

    //Stage 1's initial conditions
    {
      player:{X:100,Y:100},
      walls:[
        // bottom long room
        {X:780, Y:550,scale:{w:2,h:0.5},type:'wallH'},

        // cubicle
        {X:550, Y:200,scale:{w:1.5,h:0.5},type:'wallH'},
        {X:550, Y:200,scale:{w:0.7,h:0.9},type:'wallV'},

        // top left
        {X:100, Y:150,scale:{w:0.7,h:0.5},type:'wallH'},
        {X:200, Y:50,scale:{w:0.2,h:0.6},type:'wallV'},

        // long from left
        {X:280, Y:470,scale:{w:2,h:0.5},type:'wallH'},

        // long from right section
        {X:800, Y:350,scale:{w:2,h:0.5},type:'wallH'},
        {X:525, Y:368,scale:{w:0.2,h:0.3},type:'wallV'},
        // top right U
        {X:950, Y:200,scale:{w:0.35,h:0.5},type:'wallH'},
        {X:900, Y:152,scale:{w:0.2,h:0.6},type:'wallV'},
        {X:1000, Y:152,scale:{w:0.2,h:0.6},type:'wallV'},

        //left small door room
        {X:200, Y:186,scale:{w:0.2,h:0.48},type:'wallV'},
        {X:200, Y:311,scale:{w:0.2,h:0.48},type:'wallV'},
        {X:100, Y:350,scale:{w:0.7,h:0.4},type:'wallH'}
      ],
      computers:[
        {X:100,Y:210},
        {X:950,Y:170},
        {X:490,Y:235},
        {X:600,Y:155},
        {X:555,Y:380},
        {X:615,Y:580}
      ],
      targets:6,
      exit:{X:1060,Y:580},
      //Point 1's values will always be smaller. Keep that in mind for structure;
      guards:[
          {X:225, Y:270,patrol:{point1:{X:225, Y:180},point2:{X:225, Y:330}}},
          {X:325, Y:270,patrol:{point1:{X:325, Y:200},point2:{X:325, Y:370}}},
          {X:240, Y:160,patrol:{point1:{X:240, Y:160},point2:{X:490, Y:160}}},
          {X:550, Y:60,patrol:{point1:{X:550, Y:25},point2:{X:550, Y:90}}},
          {X:750, Y:110,patrol:{point1:{X:600, Y:110},point2:{X:760, Y:110}}},
          {X:800, Y:150,patrol:{point1:{X:800, Y:150},point2:{X:800, Y:300}}},
          {X:900, Y:60,patrol:{point1:{X:870, Y:60},point2:{X:1020, Y:60}}},
          {X:400, Y:430,patrol:{point1:{X:430, Y:430},point2:{X:650, Y:430}}},
          {X:400, Y:600,patrol:{point1:{X:380, Y:600},point2:{X:565, Y:600}}},
          {X:1050, Y:410,patrol:{point1:{X:1050, Y:410},point2:{X:1050, Y:510}}}
      ]
    },

    //Stage 2's initial conditions
    {//Player starting location
    player: {X:300,Y:580},
    walls:[
    //Big bottom room
    {X:1020, Y:120,scale:{w:0.4,h:0.5},type:'wallH'},
    {X:960, Y:140,scale:{w:0.25,h:0.5},type:'wallV'},
    {X:960, Y:411.5,scale:{w:0.25,h:1},type:'wallV'},
    {X:885, Y:500,scale:{w:0.5,h:0.5},type:'wallH'},
    {X:700, Y:500,scale:{w:0.35,h:0.5},type:'wallH'},
    {X:560, Y:502,scale:{w:0.25,h:0.5},type:'wallH'},
    {X:530, Y:590,scale:{w:0.25,h:1},type:'wallV'},
    //Top long room
    {X:960, Y:0,scale:{w:0.25,h:0.5},type:'wallV'},
    {X:550, Y:100,scale:{w:2,h:0.5},type:'wallH'},
    {X:100, Y:100,scale:{w:0.75,h:0.5},type:'wallH'},
    //Left Side Room
    {X:196.5, Y:178,scale:{w:0.25,h:0.7},type:'wallV'},
    {X:90, Y:350,scale:{w:0.82,h:0.45},type:'wallH'},
    //Main Room walls
    {X:540, Y:290,scale:{w:0.7,h:0.8},type:'wallV'},
    {X:440, Y:290,scale:{w:0.7,h:0.8},type:'wallV'},
    {X:640, Y:290,scale:{w:0.7,h:0.8},type:'wallV'},
    {X:740, Y:290,scale:{w:0.7,h:0.7},type:'wallV'},
    //Left bottom corner room
    {X:90, Y:502,scale:{w:0.82,h:0.45},type:'wallH'},
    {X:300, Y:502,scale:{w:0.42,h:0.45},type:'wallH'},
    {X:490, Y:502,scale:{w:0.25,h:0.5},type:'wallH'}
    ],
    //Locations of computers
    computers:[
    {X:100,Y:160},
    {X:1050,Y:150},
    {X:560,Y:570},
    {X:500,Y:580},
    {X:1000,Y:30}],
    targets:5,
    exit:{
        X:1060,
        Y:60,
    },
    //Point 1's values will always be smaller. Keep that in mind for structure;
    guards:[
        {X:400, Y:60,patrol:{point1:{X:100, Y:60},point2:{X:900, Y:60}}},
        {X:900, Y:150,patrol:{point1:{X:900, Y:100},point2:{X:900, Y:450}}},
        {X:400, Y:300,patrol:{point1:{X:400, Y:150},point2:{X:400, Y:500}}},
        {X:900, Y:450,patrol:{point1:{X:50, Y:450},point2:{X:900, Y:450}}},
        {X:590, Y:310,patrol:{point1:{X:590, Y:150},point2:{X:590, Y:450}}},
        {X:790, Y:580,patrol:{point1:{X:790, Y:250},point2:{X:790, Y:580}}},
        {X:1030, Y:250,patrol:{point1:{X:790, Y:250},point2:{X:1030, Y:250}}},
        {X:900, Y:580,patrol:{point1:{X:650, Y:580},point2:{X:1040, Y:580}}}
    ]},

    // --------------------- Older prototype level ---------------------------

    //Stage 2 (temporary)
    {
    player: {X:300,Y:400},
    walls:[
    {X:540, Y:320,scale:{w:0.7,h:0.7},type:'wallV'},
    {X:440, Y:320,scale:{w:0.7,h:0.7},type:'wallV'},
    {X:640, Y:320,scale:{w:0.7,h:0.7},type:'wallV'},
    {X:740, Y:320,scale:{w:0.7,h:0.5},type:'wallV'}],
    computers:[
        {X:100,Y:160},
        {X:1050,Y:150},
        {X:560,Y:570}],
    targets:3,
    exit:{
        X:300,
        Y:300,
    },
    guards:[
        {X:400, Y:60,patrol:{point1:{X:100, Y:60},point2:{X:600, Y:60}}},
        {X:900, Y:150,patrol:{point1:{X:900, Y:100},point2:{X:900, Y:450}}},
        {X:400, Y:300,patrol:{point1:{X:400, Y:150},point2:{X:400, Y:500}}},
    ]}



]
