# RescuEX AI 🛡️⚡

An autonomous, zero-touch, voice-activated emergency chaining engine designed to act as a fail-safe lifeline when victims are completely incapacitated.

🌐 **Live Demo:** (https://9bf1623e-0875-4e1e-b5a2-f49348dc0efe-00-1cg2xy8wyuvwx.pike.replit.dev/)

---

## 📌 Problem Statement
In high-stakes emergencies (e.g., road accidents, physical assaults, cardiac arrests), panic and physical trauma often leave victims unable to perform manual smartphone interactions. Existing safety applications fail under these conditions because they require physical unlocking, manual navigation, or assume the victim can speak clearly to emergency dispatchers. There is a critical survival vulnerability when a victim is physically immobilized or unresponsive.

## 💡 The Solution
**RescuEX AI** bridges this gap by introducing a client-side emergency automation pipeline that completely eliminates the need for manual touch or verbal dialogue during an active crisis. Once armed, a simple verbal distress trigger (**"Help! Help!"**) transitions the web architecture into a high-priority Emergency Mode, automating location tracking, cellular calling, and voice broadcasting simultaneously.

---

## ⚙️ Core Architecture & Features

### 1. Hardware-Level Web API Integration
* **Web Speech API:** Utilizes low-latency continuous speech recognition layers to monitor background audio streams for localized distress keywords without server-side processing overhead.
* **HTML5 Geolocation API:** Executes immediate, high-accuracy background GPS coordinate locking upon trigger activation.

### 2. 12-Cycle Fail-Safe Call Loop
* Engineered with asynchronous JavaScript interval logic linked directly with native `tel:` URI protocols. 
* If the primary emergency contact is busy, unreachable, or switched off, the system automatically switches to the backup contact. It executes an alternating **12-cycle rotation loop** between the two numbers to ensure the communication chain never breaks.

### 3. Automated Voice Broadcast Engine
* The moment the responder answers the cellular call, the client architecture loops a localized, pre-recorded emergency audio broadcast (`emergency.mp3`) at maximum hardware volume over the audio channel, effectively speaking for the victim.

### 4. Defensive UX/UI Controls
* **Cyber-Mint High-Contrast Theme:** Styled with accessible CSS3 neon green configurations optimized for high visibility in high-stress scenarios.
* **Workspace Optimization Switch ('Done' Button):** Validates and stores the contact configurations while hiding the mobile keyboard layer to ensure zero interface clutter.
* **State-Reset Utility ('Restart' Button):** Clears active loop counters, terminates background audio broadcasts, and flushes memory states to re-arm the voice trigger engine back to its default state securely.

---

## 🛠️ Tech Stack
* **Frontend Architecture:** HTML5 (Semantic Layouts)
* **Styling Layer:** CSS3 (Flexbox, Neon High-Contrast Keyframes)
* **Logic Engine:** Vanilla JavaScript (ES6+, Web Speech API, Geolocation API, Asynchronous Loops)
* **Environment:** Replit Deployment Pipeline

---

## 🚀 Local Installation & Setup

To run this repository locally or audit the codebase:

1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/RescuEX-AI.git](https://github.com/YOUR_USERNAME/RescuEX-AI.git)
