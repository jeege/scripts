
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

    // 保存当前语音识别的停止函数
    var currentVoiceStop = null;

    function hasWebSpeech() {
        return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    }

    function getWebSpeechRecognition() {
        return window.SpeechRecognition || window.webkitSpeechRecognition;
    }

    /**
     * 启动语音输入
     * @param {Object} options
     * @param {string} [options.lang='zh-CN']
     * @param {Function} [options.onStart]
     * @param {Function} [options.onResult]
     * @param {Function} [options.onError]
     * @param {Function} [options.onEnd]
     * @returns {Promise<string>}
     */
    async function startVoiceInput(options) {
        options = options || {};
        var lang = options.lang || 'zh-CN';
        var onStart = options.onStart || function () { };
        var onResult = options.onResult || function () { };
        var onError = options.onError || function () { };
        var onEnd = options.onEnd || function () { };

        // 如果已有正在进行的识别，先停止
        if (currentVoiceStop) {
            try { currentVoiceStop(); } catch (e) { }
            currentVoiceStop = null;
        }

        // ===== AnkiDroid 原生 STT =====
        if (PLATFORM === 'AnkiDroid') {
            try {
                onStart();
                if (api.ankiSttSetLanguage) {
                    await api.ankiSttSetLanguage(lang);
                }

                // 保存停止函数：尝试调用 AnkiDroid 可能提供的停止方法
                currentVoiceStop = function () {
                    try {
                        if (api.ankiSttStop) {
                            api.ankiSttStop();
                        } else if (api.ankiSttCancel) {
                            api.ankiSttCancel();
                        } else if (api.ankiSttStopListening) {
                            api.ankiSttStopListening();
                        }
                    } catch (e) { /* 忽略 */ }
                };

                var text = await api.ankiSttStart();
                console.log(text);
                if (text && text.trim()) {
                    onResult(text.trim());
                } else {
                    onError('未识别到语音，请重试。');
                }
                onEnd();
                currentVoiceStop = null;
                return text;
            } catch (err) {
                onError('AnkiDroid 语音识别失败：' + (err.message || err));
                onEnd();
                currentVoiceStop = null;
                return '';
            }
        }

        // ===== Web Speech API =====
        if (hasWebSpeech()) {
            return new Promise(function (resolve, reject) {
                var SpeechRecognition = getWebSpeechRecognition();
                var recognition = new SpeechRecognition();

                recognition.lang = lang;
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                // 保存停止函数
                currentVoiceStop = function () {
                    try { recognition.stop(); } catch (e) { }
                    try { recognition.abort(); } catch (e) { }
                    currentVoiceStop = null;
                };

                recognition.onstart = function () {
                    onStart();
                };

                recognition.onresult = function (event) {
                    var transcript = event.results[0][0].transcript;
                    onResult(transcript);
                    currentVoiceStop = null;
                    resolve(transcript);
                };

                recognition.onerror = function (event) {
                    onError('Web Speech 识别出错：' + event.error);
                    currentVoiceStop = null;
                    reject(event.error);
                };

                recognition.onend = function () {
                    onEnd();
                    currentVoiceStop = null;
                };

                recognition.start();
            });
        }

        // ===== 不支持 =====
        var msg = '当前平台不支持语音识别。AnkiDroid 请使用系统键盘的语音输入，其他平台请使用 Chrome/Edge/Safari。';
        onError(msg);
        onEnd();
        return '';
    }

    /**
     * 停止当前语音输入
     */
    function stopVoiceInput() {
        if (currentVoiceStop) {
            try { currentVoiceStop(); } catch (e) { }
            currentVoiceStop = null;
        }
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
        startVoiceInput: startVoiceInput,
        stopVoiceInput: stopVoiceInput
    };
})();