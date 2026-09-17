
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
    
    const api = (function() {
        if (PLATFORM === "AnkiDroid") {
            return new AnkiDroidJS({ version: "0.0.3", developer: "5175248@qq.com"});
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

    async function speek(text) {
        let lang = "en_US"
        if (/[\u4e00-\u9fa5]/.test(text)) {
            lang = "zh_CN"
        }
        if (PLATFORM === "AnkiDroid") {
            await api.ankiTtsSetLanguage(lang)
            await api.ankiTtsSpeak(text)
        } else if (('speechSynthesis' in window) && ('SpeechSynthesisUtterance' in window)){
            const synth = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            const voices = synth.getVoices();
            utterance.voice = voices.find(voice => voice.lang === lang);
            synth.speak(utterance);
        }
    }


    window.ankiUtil = {
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
        speek: speek
    };
})();



