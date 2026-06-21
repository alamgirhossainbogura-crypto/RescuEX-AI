// State Management
let primaryNo = '';
let backupNo = '';
let isArmed = false;
let isEmergencyActive = false;
let callCycleCount = 0;
let callIntervalInstance = null;
let recognition = null;

// DOM Elements
const primaryInput = document.getElementById('primaryContact');
const backupInput = document.getElementById('backupContact');
const btnDone = document.getElementById('btnDone');
const btnManualTrigger = document.getElementById('btnManualTrigger');
const btnRestart = document.getElementById('btnRestart');
const statusIndicator = document.getElementById('statusIndicator');
const locationDisplay = document.getElementById('locationDisplay');
const emergencyAudio = document.getElementById('emergencyAudio');
const configSection = document.getElementById('configSection');

// 1. Initial Permission Sync & Setup
btnDone.addEventListener('click', () => {
    primaryNo = primaryInput.value.trim();
    backupNo = backupInput.value.trim();

    if (!primaryNo || !backupNo) {
        alert('Please fill in both primary and backup emergency numbers.');
        return;
    }

    // Hide configurations & keyboard layer optimization
    configSection.style.display = 'none';
    btnRestart.style.display = 'block';
    
    // Arm the Voice Engine
    initVoiceRecognition();
});

// 2. Web Speech API - Voice Trigger Integration
function initVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        statusIndicator.innerText = "Speech API Not Supported";
        return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        isArmed = true;
        statusIndicator.className = "status-mode mode-listening";
        statusIndicator.innerText = "System: Armed & Listening ('Help! Help!')";
    };

    recognition.onresult = (event) => {
        const lastResultIndex = event.results.length - 1;
        const spokenText = event.results[lastResultIndex][0].transcript.toLowerCase();
        
        // Match the critical distress trigger
        if (spokenText.includes('help help') || spokenText.includes('help')) {
            triggerEmergencyPipeline();
        }
    };

    recognition.onerror = () => {
        if (isArmed && !isEmergencyActive) recognition.start(); // Auto-restart on error to ensure uptime
    };

    recognition.onend = () => {
        if (isArmed && !isEmergencyActive) recognition.start(); // Keep alive loop
    };

    recognition.start();
}

// 3. Main Emergency Automation Pipeline
function triggerEmergencyPipeline() {
    if (isEmergencyActive) return;
    isEmergencyActive = true;
    isArmed = false;

    if (recognition) recognition.stop();

    // UI Feedback Transformation
    statusIndicator.className = "status-mode mode-emergency";
    statusIndicator.innerText = "⚠️ Emergency Mode Active";

    // Action A: HTML5 Geolocation Tracking
    executeLiveGPSTracking();

    // Action B: Max Hardware Volume Audio Broadcast Loop
    emergencyAudio.volume = 1.0;
    emergencyAudio.play().catch(err => console.log("Audio playback interaction bypass required:", err));

    // Action C: 12-Cycle Fail-Safe Call Loop Execution
    executeFailSafeCallLoop();
}

// Manual Bypass Option
btnManualTrigger.addEventListener('click', () => {
    // Allows instant trigger even if numbers aren't pre-configured
    primaryNo = primaryNo || primaryInput.value.trim() || '911'; 
    backupNo = backupNo || backupInput.value.trim() || '911';
    triggerEmergencyPipeline();
});

// 4. HTML5 Geolocation Coordinate Locking
function executeLiveGPSTracking() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                locationDisplay.innerHTML = `<strong>LOCKED GPS:</strong> ${lat.toFixed(5)}, ${lon.toFixed(5)}`;
            },
            () => {
                locationDisplay.innerText = "GPS Error: Satellites unreachable or permission denied.";
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    } else {
        locationDisplay.innerText = "GPS Error: Geolocation not supported by device.";
    }
}

// 5. 12-Cycle Fail-Safe Alternating Call Loop Logic
function executeFailSafeCallLoop() {
    callCycleCount = 0;
    
    // Immediate first execution
    attemptNativeCellularCall();

    // Setup asynchronous JavaScript interval logic (e.g., every 30 seconds transitions to next contact)
    callIntervalInstance = setInterval(() => {
        callCycleCount++;
        if (callCycleCount >= 12) {
            clearInterval(callIntervalInstance);
            statusIndicator.innerText = "Call Loop Finished (12 Cycles)";
            return;
        }
        attemptNativeCellularCall();
    }, 30000); 
}

function attemptNativeCellularCall() {
    // Alternates strictly between Primary (Even) and Backup (Odd) sequences
    const targetNumber = (callCycleCount % 2 === 0) ? primaryNo : backupNo;
    console.log(`Routing Emergency Sequence to: ${targetNumber}`);
    
    // Linking client web layout directly to native device layer protocols
    window.location.href = `tel:${targetNumber}`;
}

// 6. State-Reset Utility
btnRestart.addEventListener('click', () => {
    isEmergencyActive = false;
    isArmed = false;
    callCycleCount = 0;
    
    if (callIntervalInstance) clearInterval(callIntervalInstance);
    
    emergencyAudio.pause();
    emergencyAudio.currentTime = 0;
    
    locationDisplay.innerText = "GPS: Waiting for activation...";
    statusIndicator.className = "status-mode mode-idle";
    statusIndicator.innerText = "System: Disarmed";
    
    configSection.style.display = 'block';
    btnRestart.style.display = 'none';
});
