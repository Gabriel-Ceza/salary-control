const grossSalary = document.getElementById("gross-salary-input");
const calculateBtn = document.getElementById("calculate");
const radiobtns = document.querySelectorAll('input[name="insalubrity"]');
const form = document.getElementById("basic-form");
const showBaseSalary = document.getElementById('show-base-salary');
const showInsalubrity = document.getElementById('show-insalubrity');
const showInss = document.getElementById('show-inss');
const showIr = document.getElementById('show-ir');
const showNetSalary = document.getElementById('show-net-salary');

const getInsalubrityValue = () => {
  for (const btn of radiobtns) {
    if (btn.checked) {
      if (btn.value === "0") {
        return 0.00;
      } else if (btn.value === "20") {
        return 264.00;
      } else {
        return 528.00;
      }
    }
  }
  return 0;
};

const insalubrityPerCent = (baseSalary) => {
  return getInsalubrityValue() / baseSalary;
};

const getInssPerCent = (grossSalary) => {
  if (grossSalary <= 1320) {
    const inssPerCent = 0.075;
    return inssPerCent;
  } else if (grossSalary >= 1320.01 && grossSalary <= 2571.29) {
    const inssPerCent = 0.09 - 19.8 / grossSalary;
    return inssPerCent;
  } else if (grossSalary >= 2571.3 && grossSalary <= 3856.94) {
    const inssPerCent = 0.12 - 96.94 / grossSalary;
    return inssPerCent;
  } else if (grossSalary >= 3856.95 && grossSalary <= 7507.49) {
    const inssPerCent = 0.14 - 174.08 / grossSalary;
    return inssPerCent;
  } else {
    const inssPerCent = 876.95 / grossSalary;
    return inssPerCent;
  }
};

const getIrPerCent = (irBase) => {
  if (irBase < 1903.99) {
    return 0;
  } else if (irBase >= 1903.99 && irBase <= 2826.65) {
    return (irBase * 0.075 - 142.80) / grossSalary.value;
  } else if (irBase >= 2826.66 && irBase <= 3751.05) {
    return (irBase * 0.15 - 354.8) / grossSalary.value
  } else if (irBase >= 3751.06 && irBase <= 4664.68) {
    return (irBase * 0.225 - 636.13) / grossSalary.value
  } else if (irBase >= 4664.68) {
    return (irBase * 0.275 - 869.36) / grossSalary.value
  }
};

calculateBtn.addEventListener("click", (e) => {
  const baseSalary = grossSalary.value - getInsalubrityValue();

  const baseInss = grossSalary.value;
  const inssPercent =
    getInssPerCent(baseInss) * 100 > 0 ? getInssPerCent(baseInss) : 0;
  const inssValue = inssPercent * grossSalary.value;

  const irBase = grossSalary.value - inssValue;
  const irPercent = getIrPerCent(irBase) * 100 > 0 ? getIrPerCent(irBase) : 0;
  const irValue = irPercent * grossSalary.value;

  const netSalary = grossSalary.value - inssValue - irValue;

  showBaseSalary.innerText = baseSalary.toLocaleString('pt-br');
  showInsalubrity.innerText = getInsalubrityValue().toLocaleString('pt-br');
  showInss.innerText = inssValue.toLocaleString('pt-br');
  showIr.innerText = irValue.toLocaleString('pt-br');
  showNetSalary.innerText = netSalary.toLocaleString('pt-br');
  
  e.preventDefault();
});
