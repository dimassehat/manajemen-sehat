function calculateNeeds() {
    const physicalActivity = document.getElementById('physical-activity').value;
    const steps = document.getElementById('steps').value;
    const calories = document.getElementById('calories').value;
    const carbsPercentage = document.getElementById('carbs').value;
    const sugar = document.getElementById('sugar').value;
    const water = document.getElementById('water').value;
    const sleep = document.getElementById('sleep').value;

    let resultText = '';
    let hasWarnings = false;

    // Reset notification message
    document.getElementById('notification').innerHTML = '';

    if (!physicalActivity || !steps || !calories || !carbsPercentage || !sugar || !water || !sleep) {
        document.getElementById('notification').innerHTML = "Silakan isi semua bidang sebelum menghitung.";
        return;
    }

    // Convert values to appropriate types
    const physicalActivityValue = parseFloat(physicalActivity);
    const stepsValue = parseInt(steps);
    const caloriesValue = parseFloat(calories);
    const carbsPercentageValue = parseFloat(carbsPercentage);
    const sugarValue = parseFloat(sugar);
    const waterValue = parseFloat(water);
    const sleepValue = parseFloat(sleep);

    // Individual requirement checks
    if (physicalActivityValue < 5) {
        resultText += `<p class="warning">Anda masih membutuhkan minimal ${(5 - physicalActivityValue).toFixed(2)} km lagi untuk memenuhi kebutuhan aktivitas fisik.</p>`;
        hasWarnings = true;
    } else if (physicalActivityValue > 15) {
        resultText += `<p class="excess">Anda telah melebihi batas aktivitas fisik sebesar ${(physicalActivityValue - 15).toFixed(2)} km.</p>`;
        hasWarnings = true;
    }

    if (stepsValue < 7000) {
        resultText += `<p class="warning">Anda masih membutuhkan minimal ${7000 - stepsValue} langkah lagi.</p>`;
        hasWarnings = true;
    } else if (stepsValue > 10000) {
        resultText += `<p class="excess">Anda telah melebihi batas langkah sebanyak ${stepsValue - 10000} langkah.</p>`;
        hasWarnings = true;
    }

    if (caloriesValue < 2200) {
        resultText += `<p class="warning">Anda masih membutuhkan minimal ${(2200 - caloriesValue).toFixed(2)} kalori.</p>`;
        hasWarnings = true;
    } else if (caloriesValue > 3200) {
        resultText += `<p class="excess">Anda telah melebihi batas kalori sebesar ${(caloriesValue - 3200).toFixed(2)} kalori.</p>`;
        hasWarnings = true;
    }

    if (carbsPercentageValue < 45 || carbsPercentageValue > 65) {
        resultText += `<p class="warning">Persentase karbohidrat harus antara 45% dan 65% dari asupan kalori harian Anda.</p>`;
        hasWarnings = true;
    }

    if (sugarValue < 6) {
        resultText += `<p class="warning">Anda masih membutuhkan minimal ${(6 - sugarValue).toFixed(2)} sdt gula lagi.</p>`;
        hasWarnings = true;
    } else if (sugarValue > 10) {
        resultText += `<p class="excess">Anda telah melebihi batas konsumsi gula sebesar ${(sugarValue - 10).toFixed(2)} sdt.</p>`;
        hasWarnings = true;
    }

    if (waterValue < 4) {
        resultText += `<p class="warning">Anda masih membutuhkan minimal ${(4 - waterValue).toFixed(2)} liter air lagi.</p>`;
        hasWarnings = true;
    } else if (waterValue > 8) {
        resultText += `<p class="excess">Anda telah melebihi batas asupan air sebesar ${(waterValue - 8).toFixed(2)} liter.</p>`;
        hasWarnings = true;
    }

    if (sleepValue < 7) {
        resultText += `<p class="warning">Anda masih membutuhkan minimal ${(7 - sleepValue).toFixed(2)} jam tidur lagi.</p>`;
        hasWarnings = true;
    } else if (sleepValue > 10) {
        resultText += `<p class="excess">Anda telah melebihi batas tidur sebanyak ${(sleepValue - 10).toFixed(2)} jam.</p>`;
        hasWarnings = true;
    }

    if (!hasWarnings) {
        resultText += `<p class="success">Selamat! Anda telah memenuhi semua kebutuhan harian Anda.</p>`;
    }

    document.getElementById('result').innerHTML = resultText;
}

function resetForm() {
    document.getElementById('activity-form').reset();
    document.getElementById('result').innerHTML = '';
    document.getElementById('notification').innerHTML = '';
}