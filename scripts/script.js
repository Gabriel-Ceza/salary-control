/*INSS*/
const grossSalary = document.getElementById('gross-salary');
const calculateBtn = document.getElementById('calculate');
const radiobtns = document.querySelectorAll('input[name="insalubrity"]');

const getInsalubrityValue = () => {
    for (const btn of radiobtns) {
      if (btn.checked) {
        if (btn.value === '0') {
          return 0;
        } else if (btn.value === '20') {
          return 264;
        } else {
          return 528;
        }
      }
    }
    return 0;
  };  

const insalubrityPerCent = (netSalary) => {
    return getInsalubrityValue()/netSalary;
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

calculateBtn.addEventListener('click', () => {
  const netSalary = grossSalary.value - getInsalubrityValue();
  const insalubrityPercent = insalubrityPerCent(netSalary);
  const inssPercent = getInssPerCent(netSalary);

  console.log("Net Salary:", netSalary);
  console.log("Insalubrity Percentage:", insalubrityPercent);
  console.log("INSS Percentage:", inssPercent);
})

