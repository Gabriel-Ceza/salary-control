const netSalaryInput = document.getElementById("net-salary-input");
const calculateBtn = document.getElementById("calculate");
const radiobtns = document.querySelectorAll('input[name="insalubrity"]');
const form = document.getElementById("basic-form");
const showBaseSalary = document.getElementById('show-base-salary');
const showInsalubrity = document.getElementById('show-insalubrity');
const showInss = document.getElementById('show-inss');
const showIr = document.getElementById('show-ir');
const showGrossSalary = document.getElementById('show-gross-salary');

form.addEventListener('submit', (e) => {
  e.preventDefault();
})

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

// const insalubrityPerCent = (baseSalary) => {
//   return getInsalubrityValue() / baseSalary;
// };

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
    getInss(inssBase) * 100 > 0 ? getInss(inssBase) : 0;

    const irBase = initialValue - inss;
    const ir = getIr(irBase) * 100 > 0 ? getIr(irBase) : 0;

    const netSalaryTry = initialValue - inss - ir;    
    const netSalaryTryToFixed = parseFloat(netSalaryTry.toFixed(2));
    return [netSalaryTryToFixed, inss, ir];
}

calculateBtn.addEventListener("click", (e) => {
  const inputValue = parseFloat(netSalaryInput.value);
  for (let initialValue = inputValue; initialValue < 10000; initialValue += 0.01) {
    const [netSalaryTryToFixed, inss, ir] = getValues(initialValue);
    if (netSalaryTryToFixed === inputValue) {
      showBaseSalary.innerText = (initialValue - getInsalubrityValue()).toLocaleString(2);
      showInsalubrity.innerText = getInsalubrityValue().toLocaleString('pt-br');
      showInss.innerText = inss.toLocaleString('pt-br');
      showIr.innerText = ir.toLocaleString('pt-br');
      showGrossSalary.innerText = initialValue.toLocaleString('pt-br');
      e.preventDefault();   
      break;    
    }    
  e.preventDefault();
  }
});
