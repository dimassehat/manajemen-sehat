function calculateIdeal() {
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const calories = parseInt(document.getElementById('calories').value);
    const sugar = parseInt(document.getElementById('sugar').value);
    const water = parseInt(document.getElementById('water').value);
    const sleep = parseInt(document.getElementById('sleep').value);

    // If any field is empty
    if (!gender || !weight || !height || !age || !activity || !calories || !sugar || !water || !sleep) {
        document.getElementById('result').innerText = "Masukkan data yang valid!";
        return;
    }

    let warningMessage = "";
    let message = "";

    // BMI Calculation
    const heightInMeters = height / 100;
    const BMI = weight / (heightInMeters * heightInMeters);
    let bmiStatus = "";
    let bmiColor = ""; // To hold the color class for BMI status

    if (BMI < 18.5) {
        bmiStatus = "Underweight";
        bmiColor = "yellow";  // Yellow color for Underweight
    } else if (BMI >= 18.5 && BMI < 24.9) {
        bmiStatus = "Normal";
        bmiColor = "green";  // Green color for Normal
    } else if (BMI >= 25 && BMI < 29.9) {
        bmiStatus = "Overweight";
        bmiColor = "orange"; // Orange color for Overweight
    } else {
        bmiStatus = "Obese";
        bmiColor = "red";  // Red color for Obese
    }

    let bmiMessage = `Status BMI Anda: ${bmiStatus}`;
    if (bmiStatus === "Obese" || bmiStatus === "Overweight") {
        bmiMessage = `Status BMI Anda: ${bmiStatus}. Disarankan untuk menjaga pola makan dan berolahraga secara teratur.`;
    }

    // BMR Calculation
    let BMR;
    if (gender === "male") {
        BMR = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        BMR = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // TDEE Calculation
    const TDEE = BMR * activity;
    let tdeeMessage = `Kebutuhan Kalori Anda (TDEE): ${TDEE.toFixed(2)} kkal/hari.`;

    // Calories for different scenarios
    const caloriesToLoseWeight = TDEE - 500; // For weight loss: 500 kcal less
    const caloriesToGainWeight = TDEE + 500; // For weight gain: 500 kcal more
    const caloriesForRest = BMR; // For resting: BMR calories only

    let additionalCaloriesMessage = `
        Jika kamu ingin menurunkan berat badan, kamu membutuhkan ${caloriesToLoseWeight.toFixed(2)} kkal/hari.<br>
        Jika hari ini kamu hanya rebahan, maka kebutuhan kalori kamu adalah ${caloriesForRest.toFixed(2)} kkal/hari.<br>
        Jika kamu ingin menaikkan berat badan, kamu membutuhkan ${caloriesToGainWeight.toFixed(2)} kkal/hari.
    `;

    if (age >= 1 && age <= 4 && activity > 1.3) {
        warningMessage += "Untuk usia 1-4 tahun, disarankan hanya melakukan aktivitas minimal bergerak. ";
    }
    
    // Usia 5-17 tahun: hanya boleh memilih aktivitas ringan atau sedang, tidak disarankan memilih aktivitas minimal bergerak, berat, atau ekstrim
    if (age >= 5 && age <= 17) {
        if (activity === 1.2) {
            warningMessage += "Untuk usia 5-17 tahun, disarankan untuk tidak memilih aktivitas minimal bergerak. ";
        }
        if (activity === 1.9 || activity === 1.725 ) {
            warningMessage += "Untuk usia 5-17 tahun, pilih aktivitas ringan atau sedang saja. Aktivitas berat atau ekstrim tidak disarankan. ";
        }
    }
    
    // Usia 18-64 tahun: bisa memilih aktivitas ringan, sedang, berat, ekstrim, tapi tidak disarankan memilih minimal bergerak
    if (age >= 18 && age <= 64 && activity === 1.2) {
        warningMessage += "Untuk usia 18-64 tahun, disarankan untuk tidak memilih aktivitas minimal bergerak. ";
    }
    
    // Usia 65+: hanya boleh memilih aktivitas minimal bergerak
    if (age >= 65 && activity !== 1.2) {
        warningMessage += "Untuk usia lansia (65+), disarankan hanya memilih aktivitas minimal bergerak. ";
    }

    // Sugar intake validation
    const maxSugar = age <= 10 ? 24 : 30;
    if (sugar < 0 || sugar > maxSugar) {
        warningMessage += `Asupan gula Anda harus antara 0 dan ${maxSugar} gram per hari. `;
    }

    // Water intake validation
    let minWater, maxWater;
    if (age <= 1) {
        minWater = 1150; maxWater = 1300;
    } else if (age <= 2) {
        minWater = 1350; maxWater = 1500;
    } else if (age <= 4) {
        minWater = 1600; maxWater = 1800;
    } else if (age <= 10) {
        minWater = 2000; maxWater = 2500;
    } else if (age <= 14) {
        minWater = 2200; maxWater = 2700;
    } else if (age <= 18) {
        minWater = 2200; maxWater = 2700;
    } else {
        minWater = 2400; maxWater = 2600;
    }
    if (water < minWater || water > maxWater) {
        warningMessage += `Asupan air Anda harus antara ${minWater} ml dan ${maxWater} ml per hari. `;
    }

    // Sleep duration validation
    let minSleep, maxSleep;
    if (age >= 65) {
        minSleep = 7; maxSleep = 8;
    } else if (age >= 18) {
        minSleep = 7; maxSleep = 9;
    } else if (age >= 14) {
        minSleep = 8; maxSleep = 10;
    } else if (age >= 6) {
        minSleep = 9; maxSleep = 11;
    } else if (age >= 1) {
        minSleep = 11; maxSleep = 14;
    }
    if (sleep < minSleep || sleep > maxSleep) {
        warningMessage += `Durasi tidur Anda harus antara ${minSleep} hingga ${maxSleep} jam per hari. `;
    }

    // Display validation message or success message
    if (warningMessage) {
        message = `
            <div class="${bmiColor}">${bmiMessage}</div>
            <div>BMR Anda: ${BMR.toFixed(2)} kkal/hari</div>
            <div>${tdeeMessage}</div>
            <div>${additionalCaloriesMessage}</div>
            <div class="warning">${warningMessage.replace(/\./g, '.<br>')}</div>
        `;
    } else {
        // No warnings, success message in green
        message = `
            <div class="${bmiColor}">${bmiMessage}</div>
            <div>BMR Anda: ${BMR.toFixed(2)} kkal/hari</div>
            <div>${tdeeMessage}</div>
            <div>${additionalCaloriesMessage}</div>
            <div class="success">Semua kebutuhan aktivitas Anda telah terpenuhi dengan baik!</div>
        `;
    }

    document.getElementById('result').innerHTML = message;
}





