
(function () {
    function detectAnkiPlatform() {
        // AnkiMobile (iOS)
        if (window.anki && window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cb !== undefined) {
            return "AnkiMobile";
        }
        // AnkiWeb (浏览器)
        else if (document.querySelector("span.align-middle") && document.querySelector("span.align-middle").textContent.includes("AnkiWeb")) {
            return "AnkiWeb";
        }
        // AnkiDroid (Android)
        else if (typeof AnkiDroidJS !== "undefined") {
            return "AnkiDroid";
        }
        // Anki Desktop (桌面版)
        else if (typeof pycmd !== "undefined") {
            return "AnkiDesktop";
        }
        return "Unknown";
    }

    const PLATFORM = detectAnkiPlatform();

    const api = (function () {
        if (PLATFORM === "AnkiDroid") {
            return new AnkiDroidJS({ version: "0.0.3", developer: "5175248@qq.com" });
        }
        return null;
    })();


    function showAnswer() {
        switch (PLATFORM) {
            case "AnkiMobile":
                window.webkit.messageHandlers.cb.postMessage("showAnswer");
                break;
            case "AnkiDroid":
                api.ankiShowAnswer();
                break;
            case "AnkiDesktop":
                pycmd("ans");
                break;
            case "AnkiWeb":
                document.querySelector('#ansarea button').click()
                break;
        }
    }

    async function stopSpeak() {
        if (PLATFORM === "AnkiDroid") {
            await api.ankiTtsStop()
        } else if (('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window)) {
            const synth = window.speechSynthesis;
            synth.cancel();
        }
    }

    async function speak(text, rate) {
        await stopSpeak();
        let lang = "en_US"
        if (/[\u4e00-\u9fa5]/.test(text)) {
            lang = "zh_CN"
        }
        if (PLATFORM === "AnkiDroid") {
            await api.ankiTtsSetLanguage(lang)
            await api.ankiTtsSetSpeechRate(rate)
            await api.ankiTtsSpeak(text)
        } else if (('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window)) {
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = rate;
            const voices = synth.getVoices();
            utterance.voice = voices.find(voice => voice.lang === lang);
            synth.speak(utterance);
        }
    }


    // 检测浏览器 Web Speech API 支持情况
    function hasWebSpeech() {
        return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    }

    // 获取 Web Speech API 构造函数
    function getWebSpeechRecognition() {
        return window.SpeechRecognition || window.webkitSpeechRecognition;
    }


    /**
     * 启动语音输入
     * @param {Object} options
     * @param {string} [options.lang='zh-CN'] - 识别语言，如 'en-US'、'zh-CN'
     * @param {Function} [options.onStart] - 开始识别时的回调
     * @param {Function} [options.onResult] - 识别成功回调，参数为识别文本
     * @param {Function} [options.onError] - 识别出错回调，参数为错误信息
     * @param {Function} [options.onEnd] - 识别结束时的回调
     * @returns {Promise<string>} - 识别结果文本
     */
    async function startVoiceInput(options) {
        options = options || {};
        var lang = options.lang || 'zh-CN';
        var onStart = options.onStart || function () { };
        var onResult = options.onResult || function () { };
        var onError = options.onError || function () { };
        var onEnd = options.onEnd || function () { };

        // ===== AnkiDroid：使用原生 STT API =====
        if (PLATFORM === 'AnkiDroid') {
            try {
                onStart();

                // 设置识别语言
                await api.ankiSttSetLanguage(lang);

                // 启动识别，返回 Promise<string>
                var text = await api.ankiSttStart();

                // 如果返回空字符串，说明用户取消或未识别到
                if (text && text.trim()) {
                    onResult(text.trim());
                } else {
                    onError('未识别到语音，请重试。');
                }

                onEnd();
                return text;
            } catch (err) {
                onError('AnkiDroid 语音识别失败：' + (err.message || err));
                onEnd();
                return '';
            }
        }

        // ===== 其他平台：使用 Web Speech API =====
        if (hasWebSpeech()) {
            return new Promise(function (resolve, reject) {
                var SpeechRecognition = getWebSpeechRecognition();
                var recognition = new SpeechRecognition();

                recognition.lang = lang;
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                recognition.onstart = function () {
                    onStart();
                };

                recognition.onresult = function (event) {
                    var transcript = event.results[0][0].transcript;
                    onResult(transcript);
                    resolve(transcript);
                };

                recognition.onerror = function (event) {
                    onError('Web Speech 识别出错：' + event.error);
                    reject(event.error);
                };

                recognition.onend = function () {
                    onEnd();
                };

                recognition.start();
            });
        }

        // ===== 不支持语音识别的平台 =====
        var msg = '当前平台不支持语音识别。AnkiDroid 请使用系统键盘的语音输入，其他平台请使用 Chrome/Edge/Safari。';
        onError(msg);
        onEnd();
        return '';
    }


    window.ankiUtil = {
        api: api,
        PLATFORM: PLATFORM,
        isAnkiMobile: function () {
            return PLATFORM === "AnkiMobile";
        },
        isAnkiWeb: function () {
            return PLATFORM === "AnkiWeb";
        },
        isAnkiDroid: function () {
            return PLATFORM === "AnkiDroid";
        },
        isAnkiDesktop: function () {
            return PLATFORM === "AnkiDesktop";
        },
        showAnswer: showAnswer,
        speak: speak,
        stopSpeak: stopSpeak,
        hasVoiceInput: hasWebSpeech() || PLATFORM === 'AnkiDroid',
        startVoiceInput: startVoiceInput
    };
})();