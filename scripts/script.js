/*INSS*/
const grossSalary = document.getElementById('gross-salary');
const insalubritysBtn = document.getElementsByName('insalubrity');
const calculateBtn = document.getElementById('calculate');

const getInsalubrityValue = () => {
    for (const btn of insalubritysBtn) {
        if (btn.checked === true && btn.value === '0') {
            const value = 0;
            return value;    
        } else if (btn.checked === true && btn.value === '20') {
            const value = 264;
            return value;    
        } else {
            const value = 528;
            return value;    
        }        
    }
}

const netSalary = grossSalary.value - (grossSalary.value - getInsalubrityValue());

const insalubrityPerCent = (netSalary) => {
    getInsalubrityValue()/netSalary;
}

const getInssPerCent = (netSalary) => {
    if (netSalary <= 1320) {
        const inssPerCent = 0.075;
        return inssPerCent;
    } else if (netSalary >= 1320.01 && netSalary <= 2571.29) {
        const inssPerCent = 0.09 - (19.8/netSalary);
        return inssPerCent
    } else if (netSalary >= 2571.30 && netSalary <= 3856.94) {
        const inssPerCent = 0.12 - (96.94/netSalary);
        return inssPerCent
    } else if (netSalary >= 3856.95 && netSalary <= 7507.49) {
        const inssPerCent = 0.14 - (174.08/netSalary);
        return inssPerCent
    } else {
        const inssPerCent = 876.95/netSalary;
        return inssPerCent
    }
}

