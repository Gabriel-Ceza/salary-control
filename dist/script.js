const netSalaryInput = document.getElementById("net-salary-input");
const calculateBtn = document.getElementById("calculate");
const radiobtns = document.querySelectorAll('input[name="insalubrity"]');
const form = document.getElementById("basic-form");
const showBaseSalary = document.getElementById('show-base-salary');
const showInsalubrity = document.getElementById('show-insalubrity');
const showInss = document.getElementById('show-inss');
const showIr = document.getElementById('show-ir');
const showGrossSalary = document.getElementById('show-gross-salary');

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

const getInss = (baseInss) => {
  if (baseInss <= 1320) {
    return  baseInss * 0.075;
  } else if (baseInss >= 1320.01 && baseInss <= 2571.29) {
    return  baseInss * 0.09 - 19.8  ;
  } else if (baseInss >= 2571.3 && baseInss <= 3856.94) {
    return  baseInss * 0.12 - 96.94;
  } else if (baseInss >= 3856.95 && baseInss <= 7507.49) {
    return baseInss * 0.14 - 174.08;
  } else {
    return 876.95;
  }
};

const getIr = (irBase) => {
  if (irBase < 1903.99) {
    return 0;
  } else if (irBase >= 1903.99 && irBase <= 2826.65) {
    return (irBase * 0.075 - 142.80);
  } else if (irBase >= 2826.66 && irBase <= 3751.05) {
    return (irBase * 0.15 - 354.8);
  } else if (irBase >= 3751.06 && irBase <= 4664.68) {
    return (irBase * 0.225 - 636.13);
  } else if (irBase >= 4664.69) {
    return (irBase * 0.275 - 869.36);
  }
};

const getValues = (initialValue) => {
    const inssBase = initialValue;
    const inss =
    getInss(inssBase) * 100 > 0 ? getInss(inssBase) : 0.00;

    const irBase = initialValue - inss;
    const ir = getIr(irBase) * 100 > 0 ? getIr(irBase) : 0.00;

    const netSalaryTry = initialValue - inss - ir;    
    const netSalaryTryToFixed = parseFloat(netSalaryTry.toFixed(2));
    const baseSalary = parseFloat(initialValue - getInsalubrityValue());
    return [netSalaryTryToFixed, inss, ir, baseSalary];
}

calculateBtn.addEventListener("click", (e) => {
  const inputValue = parseFloat(netSalaryInput.value);
  const maxValue = parseFloat((inputValue + inputValue/0.74).toFixed(2));
  for (let initialValue = inputValue; initialValue < maxValue; initialValue += 0.01) {
    const [netSalaryTryToFixed, inss, ir, baseSalary] = getValues(initialValue);
    if (netSalaryTryToFixed === inputValue) {    
      showBaseSalary.innerText = baseSalary.toLocaleString('pt-br', { minimumFractionDigits: 2 });
      showInsalubrity.innerText = getInsalubrityValue().toLocaleString('pt-br', { minimumFractionDigits: 2 });
      showInss.innerText = parseFloat(inss.toFixed(2)).toLocaleString('pt-br', { minimumFractionDigits: 2 });
      showIr.innerText = parseFloat(ir.toFixed(2)).toLocaleString('pt-br', { minimumFractionDigits: 2 });
      showGrossSalary.innerText = initialValue.toLocaleString('pt-br', { minimumFractionDigits: 2 });
      break;    
    }    
  }
  e.preventDefault();
});
