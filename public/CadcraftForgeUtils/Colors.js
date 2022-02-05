let Colors = {};

// ***************************************************************************************
// *********************** Color **********************************************************

Colors.Grey = () => { return GetGrey(); };
Colors.Gray = () => { return GetGrey(); };
Colors.GreyColor = () => { return GetGrey(); };


Colors.GetColorByRGB = (red, green, blue, roughness = 0.5, metalness = 0.5) => {

    let rgbText = 'rgb(' + red + ', ' + green + ', ' + + blue + ')';

    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(rgbText),
        flatShading: false,
        side: THREE.DoubleSide,
        roughness: roughness,
        metalness: metalness
    });

    return material;
};


Colors.GetColorByRAL = (ralName, roughness = 0.5, metalness = 0.3) => {

    ralName = ralName.toLowerCase();
    if (ralName.includes('ral'))
        ralName = ralName.replace('ral', '').trim();

    let rgb = ConvertRalToRGB(ralName);

    let rgbText = 'rgb(' + rgb.Red + ', ' + rgb.Green + ', ' + + rgb.Blue + ')';

    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(rgbText),
        flatShading: false,
        roughness: roughness,
        metalness: metalness,
        side: THREE.DoubleSide,
        name: 'RAL ' + ralName
    });

    
    return material;
};



Colors.GetColorByNCS = (ncs, roughness = 0.8, metalness = 0.5) => {
    var hsv, rgb, hex;

    let returnrgb = ncsToRgb(ncs);//hsv2rgb(hsv[0], hsv[1] * 0.01, hsv[2] * 0.01);

  
    let rgbText = 'rgb(' + returnrgb.red + ', ' + returnrgb.green + ', ' + + returnrgb.blue + ')';

    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(rgbText),
        flatShading: false,
        side: THREE.DoubleSide,
        roughness: roughness,
        metalness: metalness,
        name: ncs
    });

    return material;

};


Colors.ColorlessGrey = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(165, 167, 170)"),
        opacity: 0.2,
        transparent: true
    });
    return material;
};


Colors.Anodized = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(165, 167, 170)"),
        roughness: 0.5,
        metalness: 0.5,
        name: 'Anodisoitu'
    });

    return material;
};


function GetGrey() {

   
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(165, 167, 170)"),
        flatShading: false,
        roughness: 0.5,
        metalness: 0.5
    });

    return material;
}

Colors.WhiteColor = () => { return GetWhite(); };
Colors.White = () => { return GetWhite(); };
function GetWhite() {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(255, 255, 255)"),
        flatShading: false,
        roughness: 0.5,
        metalness: 0.5,
        side: THREE.DoubleSide
    });
    return material;
}

Colors.Black = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(40,40,40)"),
        roughness: 0.5,
        metalness: 0.5,
        flatShading: false
    });

    return material;
};

Colors.Red = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(255,0,0)"),
        flatShading: false,
        roughness: 0.5,
        metalness: 0.5,
        side: THREE.DoubleSide
    });

    return material;
};

Colors.Green = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(0,128,0)"),
        flatShading: false,
        roughness: 0.5,
        metalness: 0.5,
        side: THREE.DoubleSide
    });

    return material;
};


Colors.Yellow = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(255,255,0)"),
        flatShading: false,
        roughness: 0.5,
        metalness: 0.5,
        side: THREE.DoubleSide
    });

    return material;
};

Colors.Blue = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(0,0,255)"),
        flatShading: false,
        roughness: 0.5,
        metalness: 0.5,
        side: THREE.DoubleSide
    });

    return material;
};

Colors.Glass = () => {
    const material = new THREE.MeshStandardMaterial({
        opacity: 0.2,
        transparent: true
    });
    return material;
};

//Colors.Invisible = () => {
//    const material = new THREE.MeshStandardMaterial({
//        opacity: 0.0,
//        transparent: true,
//        shininess: 1
//    });
//    return material;
//};

Colors.SmookeGlass = () => {
    const material = new THREE.MeshStandardMaterial({
        opacity: 0.7,
        transparent: true
       //shininess: 150
    });
    return material;
};

Colors.SandColor = () => {
    let material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(245,245,220)"),
        roughness: 0.5,
        metalness: 0.5,
        flatShading: false
    });
    return material;
};


Colors.RedClear = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(255,0,0)"),
        opacity: 0.95,
        transparent: true//,
        //shininess: 150
    });
    return material;
};



Colors.MattBlack = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(69, 69, 71)"),
        flatShading: false,
        roughness:1,
        metalness: 0.3,
        side: THREE.DoubleSide
    });
    return material;
};

Colors.Brass = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(181, 166,66)"),
        flatShading: false,
        roughness: 0.5,
        metalness: 0.5,
        side: THREE.DoubleSide
    });
    return material;
};

Colors.Steel = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(224, 225,219)"),
        side: THREE.DoubleSide,
        roughness: 0.5,
        metalness: 0.8,
        flatShading: false
    });
    return material;
};

Colors.Aluminium = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(224, 224,225)"),
        side: THREE.DoubleSide,
        roughness: 0.8,
        metalness: 0.5,
        flatShading: false
    });
    return material;
};

Colors.Silver = () => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("rgb(211,211,211)"),
        flatShading: false,
        side: THREE.DoubleSide
    });
    return material;
};



function ncsToRgb(ncs) {
    var black, chroma, bc, percent, black1, chroma1, red1, green1, factor1, blue1, red2, green2, blue2, max, factor2, grey, r, g, b;
    ncs = w3trim(ncs).toUpperCase();
    ncs = ncs.replace("(", "");
    ncs = ncs.replace(")", "");
    ncs = ncs.replace("NCS", "NCS ");
    ncs = ncs.replace(/  /g, " ");
    if (ncs.indexOf("NCS") == -1) { ncs = "NCS " + ncs; }
    ncs = ncs.match(/^(?:NCS|NCS\sS)\s(\d{2})(\d{2})-(N|[A-Z])(\d{2})?([A-Z])?$/);
    if (ncs === null) return false;
    black = parseInt(ncs[1], 10);
    chroma = parseInt(ncs[2], 10);
    bc = ncs[3];
    if (bc != "N" && bc != "Y" && bc != "R" && bc != "B" && bc != "G") { return false; }
    percent = parseInt(ncs[4], 10) || 0;
    if (bc !== 'N') {
        black1 = (1.05 * black - 5.25);
        chroma1 = chroma;
        if (bc === 'Y' && percent <= 60) {
            red1 = 1;
        } else if ((bc === 'Y' && percent > 60) || (bc === 'R' && percent <= 80)) {
            if (bc === 'Y') {
                factor1 = percent - 60;
            } else {
                factor1 = percent + 40;
            }
            red1 = ((Math.sqrt(14884 - Math.pow(factor1, 2))) - 22) / 100;
        } else if ((bc === 'R' && percent > 80) || (bc === 'B')) {
            red1 = 0;
        } else if (bc === 'G') {
            factor1 = (percent - 170);
            red1 = ((Math.sqrt(33800 - Math.pow(factor1, 2))) - 70) / 100;
        }
        if (bc === 'Y' && percent <= 80) {
            blue1 = 0;
        } else if ((bc === 'Y' && percent > 80) || (bc === 'R' && percent <= 60)) {
            if (bc === 'Y') {
                factor1 = (percent - 80) + 20.5;
            } else {
                factor1 = (percent + 20) + 20.5;
            }
            blue1 = (104 - (Math.sqrt(11236 - Math.pow(factor1, 2)))) / 100;
        } else if ((bc === 'R' && percent > 60) || (bc === 'B' && percent <= 80)) {
            if (bc === 'R') {
                factor1 = (percent - 60) - 60;
            } else {
                factor1 = (percent + 40) - 60;
            }
            blue1 = ((Math.sqrt(10000 - Math.pow(factor1, 2))) - 10) / 100;
        } else if ((bc === 'B' && percent > 80) || (bc === 'G' && percent <= 40)) {
            if (bc === 'B') {
                factor1 = (percent - 80) - 131;
            } else {
                factor1 = (percent + 20) - 131;
            }
            blue1 = (122 - (Math.sqrt(19881 - Math.pow(factor1, 2)))) / 100;
        } else if (bc === 'G' && percent > 40) {
            blue1 = 0;
        }
        if (bc === 'Y') {
            green1 = (85 - 17 / 20 * percent) / 100;
        } else if (bc === 'R' && percent <= 60) {
            green1 = 0;
        } else if (bc === 'R' && percent > 60) {
            factor1 = (percent - 60) + 35;
            green1 = (67.5 - (Math.sqrt(5776 - Math.pow(factor1, 2)))) / 100;
        } else if (bc === 'B' && percent <= 60) {
            factor1 = (1 * percent - 68.5);
            green1 = (6.5 + (Math.sqrt(7044.5 - Math.pow(factor1, 2)))) / 100;
        } else if ((bc === 'B' && percent > 60) || (bc === 'G' && percent <= 60)) {
            green1 = 0.9;
        } else if (bc === 'G' && percent > 60) {
            factor1 = (percent - 60);
            green1 = (90 - (1 / 8 * factor1)) / 100;
        }
        factor1 = (red1 + green1 + blue1) / 3;
        red2 = ((factor1 - red1) * (100 - chroma1) / 100) + red1;
        green2 = ((factor1 - green1) * (100 - chroma1) / 100) + green1;
        blue2 = ((factor1 - blue1) * (100 - chroma1) / 100) + blue1;
        if (red2 > green2 && red2 > blue2) {
            max = red2;
        } else if (green2 > red2 && green2 > blue2) {
            max = green2;
        } else if (blue2 > red2 && blue2 > green2) {
            max = blue2;
        } else {
            max = (red2 + green2 + blue2) / 3;
        }
        factor2 = 1 / max;
        r = parseInt((red2 * factor2 * (100 - black1) / 100) * 255, 10);
        g = parseInt((green2 * factor2 * (100 - black1) / 100) * 255, 10);
        b = parseInt((blue2 * factor2 * (100 - black1) / 100) * 255, 10);
        if (r > 255) { r = 255; }
        if (g > 255) { g = 255; }
        if (b > 255) { b = 255; }
        if (r < 0) { r = 0; }
        if (g < 0) { g = 0; }
        if (b < 0) { b = 0; }
    } else {
        grey = parseInt((1 - black / 100) * 255, 10);
        if (grey > 255) { grey = 255; }
        if (grey < 0) { grey = 0; }
        r = grey;
        g = grey;
        b = grey;
    }
    return {
        red: r,
        green: g,
        blue: b
    };
}

function w3trim(x) {
    return x.replace(/^\s+|\s+$/g, '');
}


function ConvertRalToRGB(ralName){

    let ralList = '1018;248,243,053;;2000;237,118,014;;6014;071,064,046;;7034;143,139,102;; 6018; 087, 166, 057;; 3005; 094, 033, 041;; 7040; 157, 161, 170;; 9006; 165, 165, 165;; 5021; 037, 109, 123;;' +
        ' 5000; 042, 046, 075;; 2002; 203, 040, 033;; 7022; 051, 047, 044;; 5002; 032, 033, 079;; 6016; 030, 089, 069;; 5018; 063, 136, 143;; 4006; 160, 052, 114;; 1023; 250, 210, 001;; 9016; 246, 246, 246;; ' +
        '3020; 204, 006, 005;; 2009; 245, 064, 033;; 7043; 078, 084, 082;; 7042; 141, 148, 141;; 6024; 048, 132, 070;; 5017; 006, 057, 113;; 9017; 030, 030, 030;; 3013; 161, 035, 018;; 8028; 078, 059, 049;; ' +
        '4010; 215, 045, 109;; 7047; 208, 208, 208;; 7046; 130, 137, 143;; 7045; 144, 144, 144;; 7010; 076, 081, 074;; 1037; 243, 159, 024;; 1016; 237, 255, 033;; 3018; 213, 048, 050;; 7030; 139, 140, 122;; ' +
        '5011; 035, 026, 036;; 7000; 120, 133, 139;; 7015; 067, 071, 080;; 5015; 034, 113, 179;; 7001; 138, 149, 151;; 7044; 202, 196, 176;; 1003; 229, 190, 001;; 9003; 244, 244, 244;; 4008; 140, 086, 138;; ' +
        '3001; 165, 032, 025;; 2010; 216, 075, 032;; 7004; 150, 153, 146;; 6032; 049, 127, 067;; 8002; 108, 059, 042;; 5005; 030, 045, 110;; 9004; 040, 040, 040;; 8014; 056, 044, 030;; 5003; 029, 030, 051;; ' +
        '1002; 198, 166, 100;; 2012; 235, 106, 014;; 3022; 217, 080, 048;; 1017; 245, 208, 051;; 3003; 155, 017, 030;; 3017; 230, 050, 068;; 6011; 088, 114, 070;; 6013; 108, 113, 086;; 4002; 146, 043, 062;; ' +
        '4001; 222, 076, 138;; 2001; 201, 060, 032;; 8012; 089, 035, 033;; 3027; 197, 029, 052;; 1021; 243, 218, 011;; 7039; 108, 105, 096;; 4007; 074, 025, 044;; 3004; 117, 021, 030;; 6037; 036, 231, 017;; ' +
        '3028; 231, 037, 018;; 9010; 255, 255, 255;; 2004; 244, 070, 017;; 7036; 127, 118, 121;; 6028; 044, 085, 069;; 5014; 096, 111, 140;; 7032; 184, 183, 153;; 3032; 114, 020, 034;; 3033; 180, 076, 067;; ' +
        '2013; 195, 088, 049;; 1036; 112, 083, 053;; 1035; 106, 093, 077;; 4011; 134, 115, 161;; 6036; 022, 053, 055;; 5026; 016, 044, 084;; 7048; 137, 129, 118;; 9022; 156, 156, 156;; 6035; 028, 084, 045;; ' +
        '5025; 042, 100, 120;; 9023; 130, 130, 130;; 8029; 118, 060, 040;; 4012; 108, 104, 129;; 6000; 049, 102, 080;; 1034; 239, 169, 074;; 2003; 255, 117, 020;; 6019; 189, 236, 182;; 4009; 164, 125, 144;; ' +
        '6034; 127, 181, 181;; 5024; 093, 155, 155;; 9018; 215, 215, 215;; 6021; 137, 172, 118;; 8025; 117, 092, 072;; 1013; 234, 230, 202;; 3009; 100, 036, 036;; 3031; 179, 036, 040;; 8023; 166, 094, 046;; ' +
        '6026; 001, 093, 082;; 1020; 153, 153, 080;; 7002; 126, 123, 082;; 6003; 066, 070, 050;; 6022; 037, 034, 027;; 8008; 111, 079, 040;; 1024; 174, 160, 075;; 8001; 149, 095, 032;; 5020; 029, 051, 074;; ' +
        '8011; 091, 058, 041;; 5022; 037, 040, 080;; 7005; 100, 107, 099;; 7003; 108, 112, 089;; 6005; 047, 069, 056;; 6033; 073, 126, 118;; 6029; 032, 096, 061;; 1028; 244, 169, 000;; 6017; 076, 145, 065;; ' +
        '1006; 228, 160, 016;; 8016; 076, 047, 039;; 6038; 000, 247, 000;; 1026; 255, 255, 000;; 3024; 248, 000, 000;; 2005; 255, 035, 001;; 2007; 255, 164, 032;; 3026; 254, 000, 000;; 3015; 234, 137, 154;; ' +
        '1015; 230, 214, 144;; 7035; 215, 215, 215;; 6027; 132, 195, 190;; 5012; 059, 131, 189;; 1012; 199, 180, 070;; 6002; 045, 087, 044;; 7008; 106, 095, 049;; 9005; 010, 010, 010;; 1014; 225, 204, 079;;' +
        ' 7011; 067, 075, 077;; 1005; 169, 131, 007;; 4003; 222, 076, 138;; 9002; 231, 235, 218;; 6006; 062, 059, 050;; 8019; 064, 058, 058;; 5008; 038, 037, 045;; 1019; 158, 151, 100;; 9007; 143, 143, 143;; ' +
        '7009; 077, 086, 069;; 8000; 130, 108, 052;; 5001; 031, 052, 056;; 1000; 190, 189, 127;; 6010; 053, 104, 045;; 7024; 071, 074, 081;; 9011; 028, 028, 028;; 7026; 047, 053, 059;; 1004; 205, 164, 052;; ' +
        '5010; 014, 041, 075;; 3000; 175, 043, 030;; 6009; 049, 055, 043;; 6025; 061, 100, 045;; 8007; 089, 053, 031;; 6001; 040, 114, 051;; 7037; 125, 127, 120;; 5023; 073, 103, 141;; 2011; 236, 124, 038;; ' +
        '1033; 243, 165, 005;; 1007; 220, 156, 000;; 1027; 157, 145, 001;; 9001; 250, 244, 227;; 3016; 179, 040, 033;; 8004; 142, 064, 042;; 7023; 104, 108, 094;; 5013; 037, 041, 074;; 8003; 115, 066, 034;; ' +
        '4004; 110, 028, 052;; 6020; 046, 058, 035;; 8017; 069, 050, 046;; 8015; 099, 058, 052;; 7033; 125, 132, 113;; 3002; 162, 035, 029;; 5019; 027, 085, 131;; 6008; 057, 053, 042;; 3011; 120, 031, 025;; ' +
        '7013; 070, 069, 049;; 1011; 138, 102, 066;; 1032; 214, 174, 001;; 5007; 062, 095, 138;; 2008; 247, 094, 037;; 6007; 052, 059, 041;; 4005; 108, 070, 117;; 7031; 071, 075, 078;; 6004; 031, 058, 061;; ' +
        '3007; 065, 034, 039;; 6015; 059, 060, 054;; 7021; 035, 040, 043;; 6012; 052, 062, 064;; 8022; 033, 033, 033;; 5004; 032, 033, 079;; 3012; 193, 135, 107;; 7006; 109, 101, 082;; 8024; 121, 085, 061;; ' +
        '1001; 194, 176, 120;; 7012; 078, 087, 084;; 5009; 002, 086, 105;; 3014; 211, 110, 112;; 7016; 041, 049, 051;; 7038; 195, 195, 195;; ';

    let ralRows = ralList.split(';;');

    let foundRow;
    ralRows.forEach((item) => {
        if (item.includes(ralName)) {
            foundRow = item;
        }
    });

    let numbers = foundRow.split(';')[1].split(',');
    return {
        Red: numbers[0].trim(),
        Green: numbers[1].trim(),
        Blue: numbers[2].trim()
    };



};

export default Colors;