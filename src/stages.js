export default [
    //Stage 1's initial conditions
    {//Player starting location
    player: {X:300,Y:500},
    walls:[
    //Big bottom room    
    {X:1020, Y:120,scale:{w:0.4,h:0.5},type:'wallH'},
    {X:960, Y:140,scale:{w:0.25,h:0.5},type:'wallV'},
    {X:960, Y:430,scale:{w:0.25,h:1},type:'wallV'},
    {X:885, Y:500,scale:{w:0.5,h:0.5},type:'wallH'},
    {X:700, Y:500,scale:{w:0.35,h:0.5},type:'wallH'},
    {X:560, Y:500,scale:{w:0.25,h:0.5},type:'wallH'},
    {X:530, Y:590,scale:{w:0.25,h:1},type:'wallV'},
    //Top long room
    {X:960, Y:0,scale:{w:0.25,h:0.5},type:'wallV'},
    {X:550, Y:100,scale:{w:2,h:0.5},type:'wallH'},
    {X:100, Y:100,scale:{w:0.75,h:0.5},type:'wallH'},
    //Side Room
    {X:180, Y:180,scale:{w:0.25,h:0.7},type:'wallV'},
    {X:90, Y:350,scale:{w:0.7,h:0.4},type:'wallH'},
    //Main Room walls
    {X:540, Y:320,scale:{w:0.7,h:0.7},type:'wallV'},
    {X:440, Y:320,scale:{w:0.7,h:0.7},type:'wallV'},
    {X:640, Y:320,scale:{w:0.7,h:0.7},type:'wallV'},
    {X:740, Y:320,scale:{w:0.7,h:0.5},type:'wallV'}],
    //Locations of computers
    computers:[
    {X:100,Y:160},
    {X:1050,Y:150},
    {X:560,Y:570}],
    targets:3,
    exit:{
        X:1060,
        Y:60,
    }},
    //Stage 2
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
    }}
]