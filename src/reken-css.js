/*
    example:
    data-class="p:3 mx:2 my:1 br:1 "

    ar:a aspect-ratio
    ar:s
    ar:v
    ai align-items fs:fe:b:c:s;
    ac: align-content: fs;c;fe;a;b
    as: align-self: auto, flex-start, flex-end, center, stretch, baseline


    bg:background-color: h200,80,10,.5 r100 blue green yellow black 
    br:border-radius
    bw:border-width
    bs:border-style
    box-sizing: border-box //defualt
    box decoration break clone, slice

    c: cleat l,r,both,none.
    c container set screen breakpoints
    col columuns 1-10
    col:a auto, sp1-12 f=full,  st1-13 sta en1-13 a 
    d:display block:b,inline-block:ib, inline:i, flex:f inline-flex:if grid:g inline-grid:ig contents c; none:n list-item li (table:t inline-table:it table-column-group:tcg more..)
    fc:font-color
    ff:font-family;
    fs:font-size
    fl:float r, l, n,
    fb: flex-basis 1/2 1/3-2/3 1/4-3/4 1/6-5/6 1/12-11/12 full 0-7
    fd: flex-direction: row, row-reverse, column, column-reverse
    fw: flex-wrap wrap wrap-reverse, nowrap
    f:1 flex: 1 1 0% // grow and shrink ignore initial size
    f:a flex: 1 1 auto //grow and shrink ignore use initial size
    f:i flex: 0 1 auto shrink not grow use initial size
    f:n flex: none; prevent growing shrinking.
    fg: flex-grow:1 / 0
    fs: flex-shrink:1 / 0
    fo: flex-order: number f=first -9999 last=last 9999 n=none 0
    g:gap0-7
    gy:
    gx:
    gfr: row, column, dense, row dense, column dense
    gac: auto, mn , mx fr
    gar: auto, mn , mx fr
    gc:1-12 grid-template-columns: repeat(12, minmax(0, 1fr)); n=none 
    gr:1-6 grid-template-rows: repeat(1, minmax(0, 1fr)); n=none 
    h:height
    
    i inset: t:0r: https://tailwindcss.com/docs/top-right-bottom-left
    is: inset -0-7 2/4 f a
    isx:
    isy:
    ist:
    isl:
    isr:
    isb:

    jc: justify-content: fs;c;fe;a;b
    ji: start,end,center,stretch
    js: auto, start, end, center, stretch
    m: margin
    mxw:
    miw:
    of: object-fit contain, cover, fill, none, scale-dwon
    op: object-position. bottom center left left-bottom, left-top right right-bottom right-top top
    o: overflow: auto hidden clip visible scroll 
    ox
    oy
    ob over-scroll auto, contain none
    oby
    obx
    p: padding:1-7
    py: padding-top padding-bottom
    px: padding-left padding-right
    pt:
    pr:
    pb:
    pl:
    pos:static fixed absolute relative sticky
    row:a auto, sp1-6 f=full,  st1-7 sta en1-7 a 

    v: visibility: visible, hidden, collapse
    w:width
    z-index: >0 a

    

snack
    flex:
    f
    
    h:hover
    f:focus
    a:active
    md:
*/
let darkMode = false;

function colorValue(v) {
    if (v.startsWith('hsl') || v.startsWith('rgb')) return v;
    return ({
        'inherit':'inherit',
        'current':'currentColor',
        'transparent':'transparent',
        'black':darkMode?'rgb(255 255 255)':'rgb(0 0 0)',
        'white':darkMode?'rgb(0 0 0)':'rgb(255 255 255)',
        'slate-50':'rgb(248 250 252)',
        'slate-100':'rgb(241 245 249)',
        'slate-200':'rgb(226 232 240)',
        'slate-300':'rgb(203 213 225)',
        'slate-400':'rgb(148 163 184)',
        'slate-500':'rgb(100 116 139)',
        'slate-600':'rgb(71 85 105)',
        'slate-700':'rgb(51 65 85)',
        'slate-800':'rgb(30 41 59)',
        'slate-900':'rgb(15 23 42)',
        'gray-50':'rgb(249 250 251)',
        'gray-100':'rgb(243 244 246)',
        'gray-200':'rgb(229 231 235)',
        'gray-300':'rgb(209 213 219)',
        'gray-400':'rgb(156 163 175)',
        'gray-500':'rgb(107 114 128)',
        'gray-600':'rgb(75 85 99)',
        'gray-700':'rgb(55 65 81)',
        'gray-800':'rgb(31 41 55)',
        'gray-900':'rgb(17 24 39)',
        'zinc-50':'rgb(250 250 250)',
        'zinc-100':'rgb(244 244 245)',
        'zinc-200':'rgb(228 228 231)',
        'zinc-300':'rgb(212 212 216)',
        'zinc-400':'rgb(161 161 170)',
        'zinc-500':'rgb(113 113 122)',
        'zinc-600':'rgb(82 82 91)',
        'zinc-700':'rgb(63 63 70)',
        'zinc-800':'rgb(39 39 42)',
        'zinc-900':'rgb(24 24 27)',
        'neutral-50':'rgb(250 250 250)',
        'neutral-100':'rgb(245 245 245)',
        'neutral-200':'rgb(229 229 229)',
        'neutral-300':'rgb(212 212 212)',
        'neutral-400':'rgb(163 163 163)',
        'neutral-500':'rgb(115 115 115)',
        'neutral-600':'rgb(82 82 82)',
        'neutral-700':'rgb(64 64 64)',
        'neutral-800':'rgb(38 38 38)',
        'neutral-900':'rgb(23 23 23)',
        'stone-50':'rgb(250 250 249)',
        'stone-100':'rgb(245 245 244)',
        'stone-200':'rgb(231 229 228)',
        'stone-300':'rgb(214 211 209)',
        'stone-400':'rgb(168 162 158)',
        'stone-500':'rgb(120 113 108)',
        'stone-600':'rgb(87 83 78)',
        'stone-700':'rgb(68 64 60)',
        'stone-800':'rgb(41 37 36)',
        'stone-900':'rgb(28 25 23)',
        'red-50':'rgb(254 242 242)',
        'red-100':'rgb(254 226 226)',
        'red-200':'rgb(254 202 202)',
        'red-300':'rgb(252 165 165)',
        'red-400':'rgb(248 113 113)',
        'red-500':'rgb(239 68 68)',
        'red-600':'rgb(220 38 38)',
        'red-700':'rgb(185 28 28)',
        'red-800':'rgb(153 27 27)',
        'red-900':'rgb(127 29 29)',
        'orange-50':'rgb(255 247 237)',
        'orange-100':'rgb(255 237 213)',
        'orange-200':'rgb(254 215 170)',
        'orange-300':'rgb(253 186 116)',
        'orange-400':'rgb(251 146 60)',
        'orange-500':'rgb(249 115 22)',
        'orange-600':'rgb(234 88 12)',
        'orange-700':'rgb(194 65 12)',
        'orange-800':'rgb(154 52 18)',
        'orange-900':'rgb(124 45 18)',
        'amber-50':'rgb(255 251 235)',
        'amber-100':'rgb(254 243 199)',
        'amber-200':'rgb(253 230 138)',
        'amber-300':'rgb(252 211 77)',
        'amber-400':'rgb(251 191 36)',
        'amber-500':'rgb(245 158 11)',
        'amber-600':'rgb(217 119 6)',
        'amber-700':'rgb(180 83 9)',
        'amber-800':'rgb(146 64 14)',
        'amber-900':'rgb(120 53 15)',
        'yellow-50':'rgb(254 252 232)',
        'yellow-100':'rgb(254 249 195)',
        'yellow-200':'rgb(254 240 138)',
        'yellow-300':'rgb(253 224 71)',
        'yellow-400':'rgb(250 204 21)',
        'yellow-500':'rgb(234 179 8)',
        'yellow-600':'rgb(202 138 4)',
        'yellow-700':'rgb(161 98 7)',
        'yellow-800':'rgb(133 77 14)',
        'yellow-900':'rgb(113 63 18)',
        'lime-50':'rgb(247 254 231)',
        'lime-100':'rgb(236 252 203)',
        'lime-200':'rgb(217 249 157)',
        'lime-300':'rgb(190 242 100)',
        'lime-400':'rgb(163 230 53)',
        'lime-500':'rgb(132 204 22)',
        'lime-600':'rgb(101 163 13)',
        'lime-700':'rgb(77 124 15)',
        'lime-800':'rgb(63 98 18)',
        'lime-900':'rgb(54 83 20)',
        'green-50':'rgb(240 253 244)',
        'green-100':'rgb(220 252 231)',
        'green-200':'rgb(187 247 208)',
        'green-300':'rgb(134 239 172)',
        'green-400':'rgb(74 222 128)',
        'green-500':'rgb(34 197 94)',
        'green-600':'rgb(22 163 74)',
        'green-700':'rgb(21 128 61)',
        'green-800':'rgb(22 101 52)',
        'green-900':'rgb(20 83 45)',
        'emerald-50':'rgb(236 253 245)',
        'emerald-100':'rgb(209 250 229)',
        'emerald-200':'rgb(167 243 208)',
        'emerald-300':'rgb(110 231 183)',
        'emerald-400':'rgb(52 211 153)',
        'emerald-500':'rgb(16 185 129)',
        'emerald-600':'rgb(5 150 105)',
        'emerald-700':'rgb(4 120 87)',
        'emerald-800':'rgb(6 95 70)',
        'emerald-900':'rgb(6 78 59)',
        'teal-50':'rgb(240 253 250)',
        'teal-100':'rgb(204 251 241)',
        'teal-200':'rgb(153 246 228)',
        'teal-300':'rgb(94 234 212)',
        'teal-400':'rgb(45 212 191)',
        'teal-500':'rgb(20 184 166)',
        'teal-600':'rgb(13 148 136)',
        'teal-700':'rgb(15 118 110)',
        'teal-800':'rgb(17 94 89)',
        'teal-900':'rgb(19 78 74)',
        'cyan-50':'rgb(236 254 255)',
        'cyan-100':'rgb(207 250 254)',
        'cyan-200':'rgb(165 243 252)',
        'cyan-300':'rgb(103 232 249)',
        'cyan-400':'rgb(34 211 238)',
        'cyan-500':'rgb(6 182 212)',
        'cyan-600':'rgb(8 145 178)',
        'cyan-700':'rgb(14 116 144)',
        'cyan-800':'rgb(21 94 117)',
        'cyan-900':'rgb(22 78 99)',
        'sky-50':'rgb(240 249 255)',
        'sky-100':'rgb(224 242 254)',
        'sky-200':'rgb(186 230 253)',
        'sky-300':'rgb(125 211 252)',
        'sky-400':'rgb(56 189 248)',
        'sky-500':'rgb(14 165 233)',
        'sky-600':'rgb(2 132 199)',
        'sky-700':'rgb(3 105 161)',
        'sky-800':'rgb(7 89 133)',
        'sky-900':'rgb(12 74 110)',
        'blue-50':'rgb(239 246 255)',
        'blue-100':'rgb(219 234 254)',
        'blue-200':'rgb(191 219 254)',
        'blue-300':'rgb(147 197 253)',
        'blue-400':'rgb(96 165 250)',
        'blue-500':'rgb(59 130 246)',
        'blue-600':'rgb(37 99 235)',
        'blue-700':'rgb(29 78 216)',
        'blue-800':'rgb(30 64 175)',
        'blue-900':'rgb(30 58 138)',
        'indigo-50':'rgb(238 242 255)',
        'indigo-100':'rgb(224 231 255)',
        'indigo-200':'rgb(199 210 254)',
        'indigo-300':'rgb(165 180 252)',
        'indigo-400':'rgb(129 140 248)',
        'indigo-500':'rgb(99 102 241)',
        'indigo-600':'rgb(79 70 229)',
        'indigo-700':'rgb(67 56 202)',
        'indigo-800':'rgb(55 48 163)',
        'indigo-900':'rgb(49 46 129)',
        'violet-50':'rgb(245 243 255)',
        'violet-100':'rgb(237 233 254)',
        'violet-200':'rgb(221 214 254)',
        'violet-300':'rgb(196 181 253)',
        'violet-400':'rgb(167 139 250)',
        'violet-500':'rgb(139 92 246)',
        'violet-600':'rgb(124 58 237)',
        'violet-700':'rgb(109 40 217)',
        'violet-800':'rgb(91 33 182)',
        'violet-900':'rgb(76 29 149)',
        'purple-50':'rgb(250 245 255)',
        'purple-100':'rgb(243 232 255)',
        'purple-200':'rgb(233 213 255)',
        'purple-300':'rgb(216 180 254)',
        'purple-400':'rgb(192 132 252)',
        'purple-500':'rgb(168 85 247)',
        'purple-600':'rgb(147 51 234)',
        'purple-700':'rgb(126 34 206)',
        'purple-800':'rgb(107 33 168)',
        'purple-900':'rgb(88 28 135)',
        'fuchsia-50':'rgb(253 244 255)',
        'fuchsia-100':'rgb(250 232 255)',
        'fuchsia-200':'rgb(245 208 254)',
        'fuchsia-300':'rgb(240 171 252)',
        'fuchsia-400':'rgb(232 121 249)',
        'fuchsia-500':'rgb(217 70 239)',
        'fuchsia-600':'rgb(192 38 211)',
        'fuchsia-700':'rgb(162 28 175)',
        'fuchsia-800':'rgb(134 25 143)',
        'fuchsia-900':'rgb(112 26 117)',
        'pink-50':'rgb(253 242 248)',
        'pink-100':'rgb(252 231 243)',
        'pink-200':'rgb(251 207 232)',
        'pink-300':'rgb(249 168 212)',
        'pink-400':'rgb(244 114 182)',
        'pink-500':'rgb(236 72 153)',
        'pink-600':'rgb(219 39 119)',
        'pink-700':'rgb(190 24 93)',
        'pink-800':'rgb(157 23 77)',
        'pink-900':'rgb(131 24 67)',
        'rose-50':'rgb(255 241 242)',
        'rose-100':'rgb(255 228 230)',
        'rose-200':'rgb(254 205 211)',
        'rose-300':'rgb(253 164 175)',
        'rose-400':'rgb(251 113 133)',
        'rose-500':'rgb(244 63 94)',
        'rose-600':'rgb(225 29 72)',
        'rose-700':'rgb(190 18 60)',
        'rose-800':'rgb(159 18 57)',
        'rose-900':'rgb(136 19 55)',
        'custom-50':'var(--custom-color-50)',
        'custom-100':'var(--custom-color-100)',
        'custom-200':'var(--custom-color-200)',
        'custom-300':'var(--custom-color-300)',
        'custom-400':'var(--custom-color-400)',
        'custom-500':'var(--custom-color-500)',
        'custom-600':'var(--custom-color-600)',
        'custom-700':'var(--custom-color-700)',
        'custom-800':'var(--custom-color-800)',
        'custom-900':'var(--custom-color-900)',
    })[v]
}

const lightness = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const getCustomHSLColors = (r,g,b) => {
    let [h,s,l] = RGBToHSL(r,g,b)
    let colors = [];
    for (l of lightness) {
        colors.push(`hsl(${parseInt(h)},${parseInt(s)}%,${parseInt((darkMode?l:1000-l)/1000*100)}%)`);
    }
    return colors;
}

const getCustomOklchColors = (r,g,b) => {
    console.log("RGB",r,g,b);
    let [l,c,h] = rgbToOklch(r,g,b)
    console.log("LCH",l,c,h);
    let colors = [];
    for (l of lightness) {
        colors.push(`oklch(${(darkMode?l:1000-l)/10}% 0.2 ${h})`);
    }
    return colors;
}

const getCustomOklchColors2 = (l,c,h) => {
    let colors = [];
    for (l of lightness) {
        colors.push(`oklch(${(darkMode?l:1000-l)/10}% 0.2 ${h})`);
    }
    return colors;
}


const setCustomColors = (r,g,b) => {
   const colors = getCustomHSLColors(r,g,b);
//    const colors = getCustomOklchColors(r,g,b);
    // const colors = getCustomOklchColors2(0.95,0.1,264);
    colors.forEach((c,i)=>{
        document.documentElement.style.setProperty(`--custom-color-${lightness[i]}`, c);
    })
}

const RGBToHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };


  function rgbToLinearRGB(rgb) {
    return rgb.map(val => {
        if (val <= 0.04045) {
            return val / 12.92;
        } else {
            return Math.pow((val + 0.055) / 1.055, 2.4);
        }
    });
}

function linearRGBToXYZ(rgb) {
    const transformationMatrix = [
        [0.4124, 0.3576, 0.1805],
        [0.2126, 0.7152, 0.0722],
        [0.0193, 0.1192, 0.9505]
    ];
    
    let xyz = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        xyz[i] = transformationMatrix[i][0] * rgb[0] + transformationMatrix[i][1] * rgb[1] + transformationMatrix[i][2] * rgb[2];
    }
    return xyz;
}

function xyzToLab(xyz) {
    const refWhite = [0.95047, 1.00000, 1.08883]; // D65 reference white
    let f = xyz.map((val, i) => {
        let ratio = val / refWhite[i];
        if (ratio > 0.008856) {
            return Math.pow(ratio, 1 / 3);
        } else {
            return (903.3 * ratio + 16) / 116;
        }
    });
    
    return [(116 * f[1] - 16), 500 * (f[0] - f[1]), 200 * (f[1] - f[2])];
}

function labToLch(lab) {
    const c = Math.sqrt(lab[1] * lab[1] + lab[2] * lab[2]);
    let h = Math.atan2(lab[2], lab[1]);
    h = h * 180 / Math.PI;
    if (h < 0) h += 360;
    return [lab[0], c, h];
}

function rgbToOklch(r,g,b) {
    const rgb = [r/255, g/255, b/255]
 
    const linearRgb = rgbToLinearRGB(rgb);
    const xyz = linearRGBToXYZ(linearRgb);
    const lab = xyzToLab(xyz);
    return labToLch(lab);
}

const rgbValue = [1, 0, 0];
const oklchValue = rgbToOklch(rgbValue);
console.log(oklchValue);  

function spacingValue(v) {
    return v=='px'?'1px':v=='0'?'0px':v/4+'rem';
}
function marginValue(v) {
    if (v=='a')
        return 'auto'
    return spacingValue(v)
}
function dimensionValue(v, k) {
    if (v.indexOf('vh')>0||v.indexOf('vw')>0||v.indexOf('ch')>0)
        return v;
    if (v.startsWith('s')) return screenValues(v,k)
    if (['min','max','fit'].indexOf(v)>=0) return v+'-content';
    return positionValue(v,k)
}
function positionValue(v) {
    if (v=='a') return 'auto';
    if (v=='f') return '100%';
    if (v.indexOf('/')>0) {
        const [a,b] = v.split('/')
        return (parseInt(a)/parseInt(b)*100)+'%'
    }    
    return spacingValue(v);
}
function screenValues(v,k) {
    switch (v) {
        case 's': return `100v${k.startsWith('h')?'h':'w'}`;
        case 'sp': return '65ch';
        case 'ssm': return '640px';
        case 'smd': return '768px';
        case 'slg': return '1024px';
        case 'sxl': return '1280px';
        case 's2xl': return '1536px';
    }
}
function displayValue(v) {
    const map = {'b':'block','ib':'inline-block','i':'inline','f':'flex','if':'inline-flex','t':'table','g':'grid','ig':'inline-grid','c':'contents','li':'list-item','n':'none'};
    return map[v]
}

function overflowValue(v) {
    return ({
        'a':'auto','h':'hidden','c':'clip','v':'visible','s':'scroll'
    })[v]??'auto';
}
function justifyItemsValue(v) {
    return ({
        'fs':'start','fe':'end','c':'center','s':'stretch',
    })[v]??'start';
}
function alignItemsValue(v) {
    return ({
        'bl':'baseline',
    })[v]??justifyItemsValue(v);
}
function justifyValue(v) {
    return ({
        'fs':'flex-start','fe':'flex-end','c':'center','b':'space-between','a':'space-around','e':'space-evenly',
    })[v]??'flex-start';
}
function alignSelfValue(v) {
    return ({
        'fs':'flex-start','fe':'flex-end','c':'center','bl':'baseline','s':'stretch','a':'auto'
    })[v]??'auto';
}
function justifySelfValue(v) {
    return ({
        'fs':'flex-start','fe':'flex-end','c':'center','s':'stretch','a':'auto'
    })[v]??'auto';
}
function placeSelfValue(v) {
    return ({
        'ps':'start','pe':'end','c':'center','s':'stretch','a':'auto'
    })[v]??'auto';
}
function alignContentValue(v) {
    return ({
        'bl':'baseline',
    })[v]??justifyValue(v);
}
function placeContentValue(v) {
    return ({
        's':'stretch',
    })[v]??alignContentValue(v);
}
function placeItemValue(v) {
    return ({
        'ps':'start','pe':'end','c':'center','s':'stretch','b':'baseline'
    })[v]??'center';
}
function fontsizeValue(v) {
    return ({
        '2xs':'0.625','xs':'0.75','sm':'0.875','md':'1','lg':'1.125','xl':'1.25',
        '2xl':'1.5','3xl':'1.875','4xl':'2.25','5xl':'3','6xl':'3.75',
        '7xl':'4.5','8xl':'6','9xl':'8'
    })[v]??'fs';
}
function lineHeightValue(v) {
    return ({
        '3':'.75rem','4':'0.875rem','5':'1.25rem','6':'1.5rem','7':'1.75rem',
        '8':'2rem','9':'2.25rem','10':'2.5rem','none':'1','tight':'1.25' ,
        'snug':'1.375','normal':'1.5','relaxed':'1.625','loose':'2'
    })[v]??'fs';
}
function borderRadiusValue(v) {
    return ({
        'none':'0px','sm':'0.125rem','':'0.25rem','md':'0.375rem','lg':'0.5rem',
        'xl':'0.75rem','2xl':'1rem','3xl':'1.5rem','full':'9999px','f':'9999px','c':'50%',
    })[v]??'0.25rem';
}
const boxShadowValue = (v) => (
    ({
        'sm':'0 1px 2px 0 rgb(0 0 0 / 0.05)',
        '':'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md':'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg':'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl':'0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl':'0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner':'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'none':'box-shadow: 0 0 #0000'
    })[v??'']
)
const blurValue = (v) => (
    ({
        'none': 0,
        'sm': 4,
        'md':12,
        'lg':16,
        'xl':24,
        '2xl':40,
        '3xl':64
    })[v]??8
)
const gridColumnValue = (v) => {
    if (v.startsWith('sp')) {
        v = v.substring(2)
        if (isNaN(v)) {
            v = 'full'
            return ': 1 / -1'
        }
        return `:span ${v} / span ${v}`
    }
    if (v.startsWith('s')) {
        v = v.substring(1)
        if (isNaN(v))
            v = 'auto'
        return `-start: ${v}`
    }
    if (v.startsWith('e')) {
        v = v.substring(1)
        if (isNaN(v))
            v = 'auto'
        return `-end: ${v}`
    }
    if (v.startsWith('a')) {
        return ': auto'
    }
}

const gradientDirectionValue = (v) => (
    ({
        'tt': 'to top',
        'ttr': 'to top right',
        'tr': 'to right',
        'tbr': 'to bottom right',
        'tb': 'to bottom',
        'tbl': 'to bottom left',
        'tl': 'to left',
        'ttl': 'to top left',

    })[v]??'to bottom'
)

const radialDirectionValue = (v) => (
    ({
        'cs': 'closest-side,',
        'cc': 'closest-corner,',
        'fs': 'farthest-side,',
        'fc': 'farthest-corner,',
        'et': 'ellipse at top,',
        'eb': 'ellipse at bottom,',
        'er': 'ellipse at right,',
        'el': 'ellipse at left,',
        'ct': 'circle at top,',
        'cb': 'circle at bottom,',
        'cr': 'circle at right,',
        'cl': 'circle at left,',
    })[v]??''
)
const transformValue = (v) => (v/100)??1;
const degreeValue = (v) => (v??0)+'deg';
const animationValue = (v) => (
    ({
        'n': 'none',
        'spin': 'spin 1s linear infinite;',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
        'bounce': 'bounce 1s infinite;',
    })[v]??'none')

const transitionPropertyValue = (v) => (
    ({
        'n': 'none', 
        'a': 'all;'+transitionVar,
        '': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;'+transitionVar,
        'c': 'color, background-color, border-color, text-decoration-color, fill, stroke;'+transitionVar,
        'o': 'opacity;'+transitionVar,
        's': 'box-shadow;'+transitionVar,
        't': 'transform;'+transitionVar,
    })[v??'']??'none')
const transitionVar = "transition-duration:var(--rkns-trans-duration);transition-timing-function:var(--rkns-trans-timing)";

    // '--rkns-trans-duration:150ms;',
    // '--rkns-trans-timing: cubic-bezier(0.4, 0, 0.2, 1);'
    // --rkns-tr-property
    // 'trpd': --rkns-tr-duration
    // 'trpt': --rkns-tr-timing
    // 'trpde' --rkns-tr-delay 

const transformVar = "transform: scale(var(--rkns-scaleX), var(--rkns-scaleY)) translate(var(--rkns-translateX),var(--rkns-translateY)) rotate(var(--rkns-rotate)) skew(var(--rkns-skewX), var(--rkns-skewY));"

const fontFamilyValue = (v) => (
    ({
        'sans':'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        'serif':'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        'mono':'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        'system': 'system-ui, sans-serif',
        'transitional': "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
        'old-style': "Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
        'humanist': "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
        "geometric-humanist": "Avenir, 'Avenir Next LT Pro', Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
        "classic-humanist": "Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif",
        "neo-grotesque": "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
        'monospace-slab-serif': "'Nimbus Mono PS', 'Courier New', 'Cutive Mono', monospace",
        'monospace-code': "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
        'industrial': "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif",
        'rounded-sans': "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
        'slab-serif': "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif",
        'antique': "Superclarendon, 'Bookman Old Style', 'URW Bookman', 'URW Bookman L', 'Georgia Pro', Georgia, serif",
        'didone': "Didot, 'Bodoni MT', 'Noto Serif Display', 'URW Palladio L', P052, Sylfaen, serif",
        'handwritten': "'Segoe Print', 'Bradley Hand', Chilanka, TSCu_Comic, casual, cursive"
    })[v??'sans'])

const rkncssMapping = {
    'ac': {t:"align-content:${sv};",vc:alignContentValue},
    'ai': {t:"align-items:${sv};",vc:alignItemsValue},
    'an': {t:"animation:${sv};",vc:animationValue},
    'as': {t:"align-self:${sv};",vc:alignSelfValue},
    'b': {t:"bottom:${sv};",vc:positionValue},
    'bc': {t:"border-color:${sv};",vc:colorValue},
    'bcx': {t:"border-left-color:${sv};border-right-color:${sv};",vc:colorValue},
    'bcl': {t:"border-left-color:${sv}",vc:colorValue},
    'bcr': {t:"border-right-color:${sv};",vc:colorValue},
    'bcy': {t:"border-top-color:${sv};border-bottom-color:${sv};",vc:colorValue},
    'bct': {t:"border-top-color:${sv};",vc:colorValue},
    'bcb': {t:"border-bottom-color:${sv};",vc:colorValue},
    'bgc': {t:"background-color: ${sv};",vc:colorValue},
    'bglg': {t:"background-image: linear-gradient(${sv}, var(--rkns-gradient-stops));",vc:gradientDirectionValue},
    'bggf': {t:"--rkns-gradient-from:${sv};--rkns-gradient-stops:var(--rkns-gradient-from),var(--rkns-gradient-to);",vc:colorValue},
    'bggt': {t:"--rkns-gradient-to:${sv};--rkns-gradient-stops:var(--rkns-gradient-from),var(--rkns-gradient-to);",vc:colorValue},
    'bggv': {t:"--rkns-gradient-via:${sv};--rkns-gradient-stops:var(--rkns-gradient-from),var(--rkns-gradient-via),var(--rkns-gradient-to);",vc:colorValue},
    'bgrg': {t:"background-image: radial-gradient(${sv}var(--rkns-gradient-from),var(--rkns-gradient-to));",vc:radialDirectionValue},
    'blur': {t:"filter: blur(${sv}px);",vc:blurValue},
    'br': {t:"border-radius: ${sv};",vc:borderRadiusValue},
    'brt': {t:"border-top-left-radius:${sv};border-top-right-radius:${sv};",vc:borderRadiusValue},
    'brb': {t:"border-bottom-left-radius:${sv};border-bottom-right-radius:${sv};",vc:borderRadiusValue},
    'brr': {t:"border-top-right-radius:${sv};border-bottom-right-radius:${sv};",vc:borderRadiusValue},
    'brl': {t:"border-bottom-left-radius:${sv};border-top-left-radius:${sv};",vc:borderRadiusValue},
    'brtr': {t:"border-top-right-radius:${sv};",vc:borderRadiusValue},
    'brtl': {t:"border-top-left-radius:${sv};",vc:borderRadiusValue},
    'brbr': {t:"border-bottom-right-radius:${sv};",vc:borderRadiusValue},
    'brbl': {t:"border-bottom-left-radius:${sv};",vc:borderRadiusValue},
    'bs':{t:"border-style:${sv};",vc:(v)=>v},
    'bw': {t:"border-width:${sv}px;",vc:(v)=>v},
    'bwx': {t:"border-left-width:${sv}px;border-right-width:${sv}px;",vc:(v)=>v},
    'bwl': {t:"border-left-width:${sv}px;",vc:(v)=>v},
    'bwr': {t:"border-right-width:${sv}px;",vc:(v)=>v},
    'bwy': {t:"border-top-width:${sv}px;border-bottom-width:${sv}px;",vc:(v)=>v},
    'bwt': {t:"border-top-width:${sv}px;",vc:(v)=>v},
    'bwb': {t:"border-bottom-width:${sv}px;",vc:(v)=>v},
    'bxs': {t:"box-shadow:${sv};",vc:boxShadowValue},
    'c': {t:"cursor:${sv};",vc:(v)=>v},
    'd': {t:"display:${sv};",vc:displayValue},
    'fc': {t:"color:${sv};",vc:colorValue},
    'ff': {t:"font-family:${sv};",vc:fontFamilyValue},
    'fl': {t:"flex:${sv};",vc:(v)=>({'1':'1 1 0%','a':'1 1 auto','i':'0 1 auto','n':'none'})[v??'0 1 auto']},
    'flb': {t:"flex-basis:${sv};",vc:positionValue},
    'fld': {t:"flex-direction:${sv};",vc:(v)=>({'r':'row','rr':'row-reverse','c':'column','cr':'column-reverse'})[v??'row']},
    'flg': {t:"flex-grow:${sv};",vc:(v)=>({'0':'0','1':'1'})[v??'1']},
    'flo': {t:"flex-order:${sv};",vc:(v)=>({'f':'-9999','l':'9999','1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'11':11,'12':12})[v??'-9999']},
    'fls': {t:"flex-shrink:${sv};",vc:(v)=>({'0':'0','1':'1'})[v??'1']},
    'flw': {t:"flex-wrap:${sv};",vc:(v)=>({'w':'wrap','r':'wrap-reverse','n':'nowrap'})[v??'nowrap']},
    'fs': {t:"font-size:${sv}rem;",vc:fontsizeValue},
    'fw': {t:"font-weight:${sv};",vc:(v)=>v??400},
    'g': {t:"gap:${sv};",vc:spacingValue},
    'grac': {t:"grid-auto-columns:${sv};",vc:(v)=>({'a':'auto','min':'min-content','max':'max-content','fr':'minmax(0, 1fr)','cd':'column dense'})[v??'a']}, 
    'grar': {t:"grid-auto-rows:${sv};",vc:(v)=>({'a':'auto','min':'min-content','max':'max-content','fr':'minmax(0, 1fr)','cd':'column dense'})[v??'a']}, 
    'grc': {t:"grid-column${sv};",vc:gridColumnValue}, 
    'grr': {t:"grid-row${sv};",vc:gridColumnValue}, 
    'grf': {t:"grid-auto-flow:${sv};",vc:(v)=>({'r':'row','c':'column','d':'dense','rd':'row dense','cd':'column dense'})[v??'column']},
    'grtc': {t:"grid-template-columns: repeat(${sv},minmax(0,1fr));",vc:(v)=>v}, 
    'grtr': {t:"grid-template-rows: repeat(${sv},minmax(0,1fr));",vc:(v)=>v}, 
    'gx': {t:"column-gap:${sv};",vc:spacingValue},    
    'gy': {t:"row-gap:${sv};",vc:spacingValue},
    'h': {t:"height:${sv};",vc:dimensionValue},
    'i': {t:"top:${sv};right:${sv};bottom:${sv};left:${sv};",vc:positionValue},
    'ix': {t:"right:${sv};left:${sv};",vc:positionValue},
    'iy': {t:"top:${sv};bottom:${sv};",vc:positionValue},
    'jc': {t:"justify-content:${sv};",vc:justifyValue},
    'ji': {t:"justify-items:${sv};",vc:justifyItemsValue},
    'js': {t:"justify-self:${sv};",vc:justifySelfValue},
    'min-h': {t:"min-height: ${sv};",vc:dimensionValue},
    'max-h': {t:"max-height: ${sv};",vc:dimensionValue},
    'l': {t:"left:${sv};",vc:positionValue},
    'lh': {t:"line-height:${sv};",vc:lineHeightValue},
    'm': {t:"margin:${sv};",vc:marginValue},
    'mx': {t:"margin-left:${sv};margin-right:${sv};",vc:marginValue},
    'my': {t:"margin-top:${sv};margin-bottom:${sv};",vc:marginValue},
    'mt': {t:"margin-top:${sv};",vc:marginValue},
    'mr': {t:"margin-right:${sv};",vc:marginValue},
    'mb': {t:"margin-bottom:${sv};",vc:marginValue},
    'ml': {t:"margin-left:${sv};",vc:marginValue},
    'obf': {t:"object-fit:${sv};",vc:(v)=>({'cn':'contain','cv':'cover','f':'fill','n':'none','sd':'scale-down'})[v??'n']},
    'obp': {t:"object-position:${sv};",vc:(v)=>({'b':'bottom','c':'center','lb':'left-bottom','lt':'left-top','r':'right','rb':'right-bottom','rt':'right-top','t':'top'})[v??'c']},
    'op': {t:"opacity:${sv};",vc:(v)=>parseInt(v)/100},
    'olc': {t:"outline-color: ${sv};",vc:colorValue},
    'olw': {t:"outline-width:${sv}px;",vc:(v)=>v??0},
    'ols':{t:"outline-style:${sv};",vc:(v)=>v},
    'olo':{t:"outline-offset:${sv}px;",vc:(v)=>v},
    'ov': {t:"overflow:${sv};",vc:overflowValue},
    'ox': {t:"overflow-x:${sv};",vc:overflowValue}, 
    'oy': {t:"overflow-y:${sv};",vc:overflowValue},
    'ord': {t:"order:${sv};", vc:(v)=>v??'-1'},
    'p': {t:"padding:${sv};",vc:spacingValue},
    'pb': {t:"padding-bottom:${sv};",vc:spacingValue},
    'pc': {t:"place-content:${sv};",vc:placeContentValue},
    'pi': {t:"place-items:${sv};",vc:placeItemValue},
    'pl': {t:"padding-left:${sv};",vc:spacingValue},
    'pos': {t:"position:${sv};",vc:(v)=>({'':'static','f':'fixed','a':'absolute','r':'relative','s':'sticky'})[v??'']},
    'pr': {t:"padding-right:${sv};",vc:spacingValue},
    'ps': {t:"place-self:${sv};",vc:placeSelfValue},
    'pt': {t:"padding-top:${sv};",vc:spacingValue},
    'px': {t:"padding-left:${sv};padding-right:${sv};",vc:spacingValue},
    'py': {t:"padding-top:${sv};padding-bottom:${sv};",vc:spacingValue},
    'r': {t:"right:${sv};",vc:positionValue},
    'rc': {t:"--rkns-ring-color:${sv};", vc:colorValue},
    'ri': {t:"--rkns-ring-inset:${sv};",vc:(v)=>v??'inset'},
    'ro': {t:"--rkns-ring-offset-width:${sv}px;", vc:(v)=>v??''},
//    'rw': {t:"box-shadow: var(--rkns-ring-inset) 0 0 0 calc(${sv}px + var(--rkns-ring-offset-width)) var(--rkns-ring-color)",vc:(v)=>v??0},
    'rw': {t:"box-shadow: var(--rkns-ring-inset) 0 0 0 calc(${sv}px + var(--rkns-ring-offset-width)) var(--rkns-ring-color);",vc:(v)=>v??0},
    'spx': {t:"margin-left:${sv};",vc:spacingValue},
    'spy': {t:"margin-top:${sv};",vc:spacingValue},
    't': {t:"top:${sv};",vc:positionValue},
    'ta': {t:"text-align:${sv};",vc:(v)=>({'l':'left','c':'center','r':'right','j':'justify','s':'start','e':'end'})[v]??'center'},
    'td': {t:"text-decoration-line:${sv};",vc:(v)=>({'u':'underline','o':'overline','lt':'line-through','n':'none'})[v]??'none'},
    'tdc': {t:"text-decoration-color:${sv};",vc:colorValue},
    'tds': {t:"text-decoration-style:${sv};",vc:(v)=>v},
    'ti': {t:"text-indent:${sv};",vc:spacingValue},
    'tsc': {t:"--rkns-scaleX:${sv};--rkns-scaleY:${sv};"+transformVar,vc:transformValue},
    'tscx': {t:"--rkns-scaleX:${sv};"+transformVar,vc:transformValue},
    'tscy': {t:"--rkns-scaleY:${sv};"+transformVar,vc:transformValue},
    'to': {t:"text-overflow:${sv};",vc:(v)=>({'e':'ellipsis','c':'clip'})[v]??'\"'+v+'\"'},
    'ttr': {t:"--rkns-translateX:${sv};--rkns-translateY:${sv};"+transformVar,vc:positionValue},
    'ttrx': {t:"--rkns-translateX:${sv};"+transformVar,vc:positionValue},
    'ttry': {t:"--rkns-translateY:${sv};"+transformVar,vc:positionValue},
    'trp': {t:"transition-property:${sv};",vc:transitionPropertyValue},
    'trd': {t:"transition-duration:${sv};--rkns-trans-duration:${sv};",vc:(v)=>v+'ms'},
    'trt': {t:"transition-timing-function:${sv};--rkns-trans-timing:${sv};",vc:(v)=>({'l':'linear','i':'cubic-bezier(0.4, 0, 1, 1)','o':'cubic-bezier(0, 0, 0.2, 1)','io':'cubic-bezier(0.4, 0, 0.2, 1)'})[v??'i']??'linear'},
    'trde':{t:"transition-delay:${sv};--rkns-trans-duration:${sv};",vc:(v)=>v+'ms'},
    'tro': {t:"--rkns-rotate:${sv};"+transformVar,vc:degreeValue},
    'tsk': {t:"--rkns-skewX:${sv};--rkns-skewY:${sv};"+transformVar,vc:degreeValue},
    'tskx': {t:"--rkns-skewX:${sv};"+transformVar,vc:degreeValue},
    'tsky': {t:"--rkns-skewY:${sv};"+transformVar,vc:degreeValue},
    'tt': {t:"text-transform:${sv};",vc:(v)=>({'u':'uppercase','l':'lowercase','c':'capitalize','n':'none'})[v]??'none'},
    'v': {t:"visibility:${sv};",vc:(v)=>({'v':'visible','h':'hidden','c':'collapse'})[v??'visible']},
    'va': {t:"vertical-align:${sv};",vc:(v)=>({'bs':'baseline','t':'top','m':'middle','b':'bottom','tt':'text-top','tb':'text-bottom','sub':'sub','s':'super'})[v??'baseline']},
    'w':  {t:"width: ${sv};",vc:dimensionValue},
    'ws': {t:"white-space:${sv};",vc:(v)=>({'nw':'nowrap','n':'normal','p':'pre','pl':'pre-line','pw':'pre-wrap'})[v??'normal']},
    'min-w': {t:"min-width: ${sv};",vc:dimensionValue},
    'max-w': {t:"max-width: ${sv};",vc:dimensionValue},
    'z': {t:"z-index: ${sv};",vc:(v)=>v??'auto'},
}
const pseudos = {
    'ac': 'active',
    'fc': 'focus',
    'fcv': 'focus-visible',
    'fcw': 'focus-within',
    'hv': 'hover',
    'tr': 'target',
    'vs': 'visited',
    'da': 'disabled',
    'va': 'valid',
    'iv': 'invalid',
    'fc': 'first-child',
    'lc': 'last-child'
}
const breakpoints = {
    'xs':'480px',
    'sm':'640px',
    'md':'768px',
    'lg':'1024px',
    'xl': '1280',
    '2xl': '1536px'
}


let _CSSID = 0;
const classNames = {}

function uniqueID() {
    return 'css' + _CSSID++; 
}

function rknCSS(rkncss) {
    let defs = rkncss.trim().split(' ');
    return parseStyleRules(defs)[''][''].join('')
}
function parseStyleRules(definitions) {
    allStyles={}
    definitions.forEach((def)=> {
        let defParts = def.split(':');
        // Make standardize array with 0=screensize, 1=pseudo, 2=csskey, 3=cssvalue
        switch (defParts.length) {
            case 0:
            break
            case 1:
                defParts.unshift('');
                defParts.unshift('');
                defParts.push('');      
            break
            case 2:
                defParts.unshift('');
                defParts.unshift('');
            break;
            case 3:
                if (typeof breakpoints[defParts[0]]!='undefined') {
                    defParts.splice(1,0,'');
                }
                else {
                    defParts.unshift('');
                }
            case 4:
                break;
            default:
                defParts = defPars.slice(-4);
        }
        if (typeof allStyles[defParts[0]]=='undefined')
            allStyles[defParts[0]]={}
        if (typeof allStyles[defParts[0]][defParts[1]]=='undefined')
            allStyles[defParts[0]][defParts[1]] = []
 
        let styles = allStyles[defParts[0]][defParts[1]];
        defParts.shift();
        defParts.shift();

        const style = parseStyleRule(defParts)
        if (style!='')
            styles.push(style)
    })
    return allStyles
}

function parseStyleRule([style, styleValue]) {
    if (rkncssMapping[style]) {
        const sv = rkncssMapping[style].vc(styleValue, style);
        return rkncssMapping[style].t.replace(/\${sv}/g, sv);
    }
    else
        return `${style}:${styleValue};`;
}

function processDataCSS() {
    // (Re)set styles
    const styleDefinition = [
        'body,blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre,button {margin:0;}',
        'h1,h2,h3,h4,h5,h6 {  font-size: inherit;  font-weight: inherit;}',
        'ol,ul,menu{list-style:none;margin:0;padding:0;}',
        'img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle;}',
        'img,video{max-width: 100%;height: auto;}',
        '*,::before,::after{border-width:0;border-style:solid;border-color:currentColor;box-sizing:border-box;}',
//        'button:focus{outline:1pxdotted;outline:5px auto -webkit-focus-ring-color;}',
        '*:not(input):not(textarea){user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;}',
        ':root{--rkns-gradient-from:transparent;--rkns-gradient-to:transparent; --rkns-gradient-via:transparent;--rkns-scaleX:1;--rkns-scaleY:1;--rkns-translateX:0;--rkns-translateY:0;--rkns-rotate:0deg;--rkns-skewX:0deg;--rkns-skewY:0deg;--rkns-trans-duration:150ms;--rkns-trans-timing: cubic-bezier(0.4, 0, 0.2, 1);--rkns-ring-color:rgb(147 197 253);--rkns-ring-inset:;--rkns-ring-offset-width:0px;}',
        '@keyframes spin {',
            'from {',
              'transform: rotate(0deg);',
            '}',
            'to {',
              'transform: rotate(360deg);',
            '}',
        '}',
        '@keyframes ping {',
            '75%, 100% {',
              'transform: scale(2);',
              'opacity: 0;',
            '}',
        '}',
        '@keyframes pulse {',
            '0%, 100% {',
              'opacity: 1;',
            '}',
            '50% {',
              'opacity: .5;',
            '}',
        '}',
        '@keyframes bounce {',
            '0%, 100% {',
                'transform: translateY(-25%);',
                'animation-timing-function: cubic-bezier(0.8, 0, 1, 1);',
            '}',
            '50% {',
                'transform: translateY(0);',
                'animation-timing-function: cubic-bezier(0, 0, 0.2, 1);',
          '}',
        '}',
    ]

//    if (typeof rkn_server_generated == 'undefined') {

    {
    console.time("data-css")
    console.log('Processing HTML elements:',document.querySelectorAll('[data-css]').length)
    document.querySelectorAll('[data-css]').forEach(
        ((elem, key, parent) => {
            const classes = elem.dataset.css;
            let defs = classes.trim().split(' ');
            const classHash = defs.join('');
            let className = classNames[classHash];
            if (typeof className === 'undefined') {
                className = uniqueID();
                classNames[classHash]= className;
                const styleLines = parseStyleRules(defs)
                for (screenSize of Object.keys(styleLines)) {
                    if (screenSize != "") {
                        styleDefinition.push(`@media (min-width: ${breakpoints[screenSize]}) {`);
                    }
                    for (pseudo of Object.keys(styleLines[screenSize])) {
                        styleDefinition.push(`.${className}${pseudo==''?'':':'+pseudos[pseudo]}\{`)
                        for (const line of styleLines[screenSize][pseudo]) {
                            styleDefinition.push(line);
                        }
                        styleDefinition.push('}')    
                    }
                    if (screenSize != "") {
                        styleDefinition.push('}');
                    }
                }
            }
            elem.classList.add(className)
            elem.removeAttribute('data-css')
        })
    )
    console.timeEnd("data-css")
//    console.log(styleDefinition.join('\n'))
    const html = document.querySelector('html');
    const head = html.querySelector('head');
    const styleElement = document.createElement('style');
    styleElement.textContent=styleDefinition.join('\n');
    head.appendChild(styleElement)
    }
}
function initRekenCSS() {
    processDataCSS();
}
