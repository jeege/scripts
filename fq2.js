const Fanqie = (function(){
    const charset = [["D","在","主","特","家","军","然","表","场","4","要","只","v","和","?","6","别","还","g","现","儿","岁","?","?","此","象","月","3","出","战","工","相","o","男","直","失","世","F","都","平","文","什","V","O","将","真","T","那","当","?","会","立","些","u","是","十","张","学","气","大","爱","两","命","全","后","东","性","通","被","1","它","乐","接","而","感","车","山","公","了","常","以","何","可","话","先","p","i","叫","轻","M","士","w","着","变","尔","快","l","个","说","少","色","里","安","花","远","7","难","师","放","t","报","认","面","道","S","?","克","地","度","I","好","机","U","民","写","把","万","同","水","新","没","书","电","吃","像","斯","5","为","y","白","几","日","教","看","但","第","加","候","作","上","拉","住","有","法","r","事","应","位","利","你","声","身","国","问","马","女","他","Y","比","父","x","A","H","N","s","X","边","美","对","所","金","活","回","意","到","z","从","j","知","又","内","因","点","Q","三","定","8","R","b","正","或","夫","向","德","听","更","?","得","告","并","本","q","过","记","L","让","打","f","人","就","者","去","原","满","体","做","经","K","走","如","孩","c","G","给","使","物","?","最","笑","部","?","员","等","受","k","行","一","条","果","动","光","门","头","见","往","自","解","成","处","天","能","于","名","其","发","总","母","的","死","手","入","路","进","心","来","h","时","力","多","开","已","许","d","至","由","很","界","n","小","与","Z","想","代","么","分","生","口","再","妈","望","次","西","风","种","带","J","?","实","情","才","这","?","E","我","神","格","长","觉","间","年","眼","无","不","亲","关","结","0","友","信","下","却","重","己","老","2","音","字","m","呢","明","之","前","高","P","B","目","太","e","9","起","稜","她","也","W","用","方","子","英","每","理","便","四","数","期","中","C","外","样","a","海","们","任"],["s","?","作","口","在","他","能","并","B","士","4","U","克","才","正","们","字","声","高","全","尔","活","者","动","其","主","报","多","望","放","h","w","次","年","?","中","3","特","于","十","入","要","男","同","G","面","分","方","K","什","再","教","本","己","结","1","等","世","N","?","说","g","u","期","Z","外","美","M","行","给","9","文","将","两","许","张","友","0","英","应","向","像","此","白","安","少","何","打","气","常","定","间","花","见","孩","它","直","风","数","使","道","第","水","已","女","山","解","d","P","的","通","关","性","叫","儿","L","妈","问","回","神","来","S","","四","望","前","国","些","O","v","l","A","心","平","自","无","军","光","代","是","好","却","c","得","种","就","意","先","立","z","子","过","Y","j","表","","么","所","接","了","名","金","受","J","满","眼","没","部","那","m","每","车","度","可","R","斯","经","现","门","明","V","如","走","命","y","6","E","战","很","上","f","月","西","7","长","夫","想","话","变","海","机","x","到","W","一","成","生","信","笑","但","父","开","内","东","马","日","小","而","后","带","以","三","几","为","认","X","死","员","目","位","之","学","远","人","音","呢","我","q","乐","象","重","对","个","被","别","F","也","书","稜","D","写","还","因","家","发","时","i","或","住","德","当","o","l","比","觉","然","吃","去","公","a","老","亲","情","体","太","b","万","C","电","理","?","失","力","更","拉","物","着","原","她","工","实","色","感","记","看","出","相","路","大","你","候","2","和","?","与","p","样","新","只","便","最","不","进","T","r","做","格","母","总","爱","身","师","轻","知","往","加","从","?","天","e","H","?","听","场","由","快","边","让","把","任","8","条","头","事","至","起","点","真","手","这","难","都","界","用","法","n","处","下","又","Q","告","地","5","k","t","岁","有","会","果","利","民"]]

    const CODE = [[58344, 58715], [58345, 58716]]
    function le(e, r) {
        return (e << (r %= 32) | e >>> 32 - r) >>> 0
    }
    function be(e) {
        if (0 <= e && e < 16) {
            return 2043430169
        } else if (e >= 16 && e < 64) {
            return 2055708042
        }
        console.error('invalid j for constant Tj')
    }
    function de(e, r, t, n) {
        if ( 0 <= e && e < 16) {
            return (r ^ t ^ n) >>> 0
        } else if (16 <= e && e < 64) {
            return (r & t | r & n | t & n) >>> 0
        }
        console.error('invalid j for bool function FF')
        return 0
    }
    function pe(e, r, t, n) {
        if (0 <= e && e < 16) {
            return  (r ^ t ^ n) >>> 0
        } else if (16 <= e && e < 64) {
            return  (r & t | ~r & n) >>> 0
        }
        console.error('invalid j for bool function GG')
        return  0
    }
    const sm3 = {
        reset() {
            this.reg = [1937774191,1226093241,388252375,3666478592,2842636476,372324522,3817729613,2969243214]
            this.chunk = []
            this.size = 0
        },
        _fill() {
            n = 8 * this.size
            a = this.chunk.push(128) % 64;
            for (64 - a < 8 && (a -= 64); a < 56; a++) {
                this.chunk.push(0)
            }
            for (let i = 0; i < 4; i++) {
                const f = Math.floor(n / 4294967296);
                this.chunk.push(f >>> 8 * (3 - i) & 255)
            }
            for (i = 0; i < 4; i++){
                this.chunk.push(n >>> 8 * (3 - i) & 255)
            }
        },
        _compress(t) {
            if (t < 64)
                console.error('compress error: not enough data');
            else {
                for (var i = function(e) {
                    for (var r = new Array(132), t = 0; t < 16; t++) {
                        r[t] = e[4 * t] << 24,
                        r[t] |= e[4 * t + 1] << 16,
                        r[t] |= e[4 * t + 2] << 8,
                        r[t] |= e[4 * t + 3],
                        r[t] >>>= 0;
                    }
                    for (var n = 16; n < 68; n++) {
                        var a = r[n - 16] ^ r[n - 9] ^ le(r[n - 3], 15);
                        a = a ^ le(a, 15) ^ le(a, 23),
                        r[n] = (a ^ le(r[n - 13], 7) ^ r[n - 6]) >>> 0
                    }
                    for (n = 0; n < 64; n++) {
                        r[n + 68] = (r[n] ^ r[n + 4]) >>> 0;
                    }
                    return r
                }(t), f = this.reg.slice(0), o = 0; o < 64; o++) {
                    var c = le(f[0], 12) + f[4] + le(be(o), o)
                        , s = ((c = le(c = (4294967295 & c) >>> 0, 7)) ^ le(f[0], 12)) >>> 0
                        , u = de(o, f[0], f[1], f[2]);
                    u = (4294967295 & (u = u + f[3] + s + i[o + 68])) >>> 0;
                    var l = pe(o, f[4], f[5], f[6]);
                    l = (4294967295 & (l = l + f[7] + c + i[o])) >>> 0,
                    f[3] = f[2],
                    f[2] = le(f[1], 9),
                    f[1] = f[0],
                    f[0] = u,
                    f[7] = f[6],
                    f[6] = le(f[5], 19),
                    f[5] = f[4],
                    f[4] = (l ^ le(l, 9) ^ le(l, 17)) >>> 0
                }
                for (var b = 0; b < 8; b++) {
                    this.reg[b] = (this.reg[b] ^ f[b]) >>> 0
                }
            }
        },
        write(data) {
            if (typeof data === 'string') {
                const str = encodeURIComponent(data).replace(/%([0-9A-F]{2})/g, ((e, r)  =>{
                    return String.fromCharCode("0x" + r)
                }))
                data = new Array(str.length);
                Array.prototype.forEach.call(str, ((char, index) => {
                    data[index] = char.charCodeAt(0)
                }))
            } 
            this.size += data.length;
            let i = 64 - this.chunk.length;
            if (data.length < i) {
                this.chunk = this.chunk.concat(data);
            } else {
                for (this.chunk = this.chunk.concat(data.slice(0, i)); this.chunk.length >= 64; ) {
                    this._compress(this.chunk)
                    if (i < data.length) {
                        this.chunk = data.slice(i, Math.min(i + 64, data.length))
                    } else {
                        this.chunk = []
                    }
                    i += 64
                }
            }
        },
        sum(str, mode) {
            if (str) {
                this.reset()
                this.write(str)
            }
            this._fill()
            for (let i = 0; i < this.chunk.length; i += 64) {
                this._compress(this.chunk.slice(i, i + 64))
            }
            let result = null;
            if ('hex' == mode) {
                result = '';
                for (i = 0; i < 8; i++) {
                    result += this.reg[i].toString(16).padLeft(8, '0');
                }
            } else {
                for (result = new Array(32), i = 0; i < 8; i++) {
                    let o = this.reg[i];
                    result[4 * i + 3] = (255 & o) >>> 0
                    o >>>= 8
                    result[4 * i + 2] = (255 & o) >>> 0
                    o >>>= 8
                    result[4 * i + 1] = (255 & o) >>> 0
                    o >>>= 8
                    result[4 * i] = (255 & o) >>> 0
                }
            }
            this.reset()
            return result;
        },
    }

    function initArr(flag) {
        let lm1 = flag
        // console.dir(lm1)
        const arr = Array.from({length: 256}, (_, index) => index)
        let _i = 0
        for (let i = 0; i < 256; i++) {
            const c = lm1.charCodeAt(i % lm1.length)
            _i = _i + arr[i] + c
            let tmp = ''
            if (_i < 256) {
                tmp = arr[_i]
                arr[_i] = arr[i]
                arr[i] = tmp
            } else {
                _i = _i % 256
                tmp = arr[_i]
                arr[_i] = arr[i]
                arr[i] = tmp
            }
        }
        return arr
    }

    function base64Ua(str, mode) {
        mode = mode || 's3'
        const key = { s0: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            s1 : "Dkdpgh4ZKsQB80/Mfvw36XI1R25+WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
            s2: "Dkdpgh4ZKsQB80/Mfvw36XI1R25-WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
            s3: "ckdp1h4ZKsUB80/Mfvw36XIgR25+WQAlEi7NLboqYTOPuzmFjJnryx9HVGDaStCe",
            s4: "Dkdpgh2ZmsQB80/MfvV36XI1R45-WUAlEixNLwoqYTOPuzKFjJnry79HbGcaStCe"
        }[mode]
        const len = str.length
        let res = ''
        for (let i = 0; i < len; i += 3) {
            const v1 = str.charCodeAt(i) << 16
            const v2 = str.charCodeAt(i + 1) << 8
            const v3 = v1 ^ v2
            const v4 = v3 ^ str.charCodeAt(i + 2)

            const k1 = (v4 & 16515072) >> 18
            const k2 = (v4 & 258048) >> 12
            const k3 = (v4 & 4032) >> 6
            const k4 = v4 & 63
            res += (key[k1] + key[k2] + key[k3] + key[k4])
        }
        return res
    }
    function uaEndoce(ua) {
        const arr = initArr("\u0000\u0001\u000e")
        // const arr = initArr("\u0000\u0001\f")
        let result = ''
        let _i = 0
        for(let i = 1; i < 256; i++) {
            let charIndex = ua.charCodeAt(i - 1)
            if (charIndex) {
                _i = _i + arr[i]
                _i > 255 && (_i = _i - 256)
                const tmp = arr[i]
                arr[i] = arr[_i]
                arr[_i] = tmp
                let t = arr[i] + arr[_i]
                result += String.fromCharCode(charIndex ^ arr[t > 255 ? t - 256 : t])
            }
        }
        return result
    }


    function get_flat_1(t) {
        return String.fromCharCode(((t & 255) & 170) | (3 & 85),((t & 255) & 85) | (3 & 170),  (((t >> 8) & 255) & 170) | (66 & 85),
        (((t >> 8) & 255) & 85) | (66 & 170))
    }
    function dateToArr(t) {
        return [(t >> 24 ) & 255, (t >> 16) & 255, (t >> 8) & 255, t & 255]
    }

    function get_flat_2(itemId, token, ua) {
        // const t2 = dateToArr(Date.now() - 64)
        // const t1 = dateToArr(Date.now() - 74)
        const t2 = dateToArr(Date.now())
        // const t2 = dateToArr(1734621380129)
        const t1 = dateToArr(1000)
        
        const suffix = 'bds'
        const param = `itemId=${itemId}&msToken=${encodeURIComponent(token)}${suffix}`
        const params_arr = sm3.sum(sm3.sum(param))
        // console.log('params', JSON.stringify(params_arr)) ok
        const suffix_arr = sm3.sum(sm3.sum(suffix))
        // console.log('suffix_arr', JSON.stringify(suffix_arr)) ok
        // console.log('b', base64Ua(uaEndoce(ua)))
        const ua_arr = sm3.sum(base64Ua(uaEndoce(ua)))
        // console.log('ua_arr', JSON.stringify(ua_arr)) ok
        const flat_arr = [65, t2[0], 0, 0, 0, params_arr[21], suffix_arr[21], ua_arr[23], t2[1], 0, 1, 0, params_arr[22], suffix_arr[22], ua_arr[24], t2[2], 0, 0, 0, t2[3], 0, 0, 14, t1[0], t1[1], t1[2], t1[3], 3]
        const flat_end = flat_arr.reduce((res, item) => res ^ item)
        // console.log('inArr', JSON.stringify([...flat_arr, flat_end]))
        const flat_2_in = String.fromCharCode(...flat_arr, flat_end)

        const arr2 =  initArr('\u0083')
        const index_arr = [24, 47, 38, 130, 51, 71, 32, 182, 70, 206, 75, 252, 74, 199, 113, 234, 246, 176, 175, 27, 242, 192, 152, 113, 137, 209, 77, 254, 116]
        // console.dir(flat_2_in)
        return Array.from(flat_2_in).map((i, _index) => {
            return String.fromCharCode(flat_2_in.charCodeAt(_index) ^ arr2[index_arr[_index]])
        }).join('')
    }
    function get_a_bogus(itemId, token, ua) {
        // const t = Date.now()
        const t = Date.now()
        const flat_1 = get_flat_1(t) 
        const flat_2 = get_flat_2(itemId, token, ua)
        // console.dir(flat_1)
        // console.dir(flat_2)
        return base64Ua(flat_1 + flat_2, 's4')
    }
    function get_token() {
        const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        for (let i = 0; i < 128; i++) {
            result += str[Math.floor(Math.random() * str.length)];
        }
        return result
    }

    const uaList = [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
    ];

    function decodeContent(content, mode) {
        let result = '';
        for (i in content) {
            let char = content[i]
            let uni = content.charCodeAt(i)
            if (uni >= CODE[mode][0] && uni <= CODE[mode][1]) {
                let uni2 = uni - CODE[mode][0]
                if (uni2 >= 0 && uni2 < charset[mode].length && charset[mode][uni2] != '?') {
                    result += charset[mode][uni2]
                } else {
                    result += char
                }
            } else {
                result += char
            }
        }
        return result
    }
    function getContent(itemId) {
        const token = get_token();
        const randomUA = uaList[Math.floor(Math.random() * uaList.length)]
        const a_bogus = get_a_bogus(itemId, token, randomUA);
        // console.log(itemId, token, a_bogus)
        return {
            url: `https://fanqienovel.com/api/reader/full?itemId=${itemId}&msToken=${encodeURIComponent(token)}&a_bogus=${a_bogus}`,
            headers: {
                'User-Agent': randomUA,
                'Cookie': 'novel_web_id=7935254455971014023'
            }
        }
    }
    return {
        getContent,
        decodeContent
    }
})()
