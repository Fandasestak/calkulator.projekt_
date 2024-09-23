function premiumBtn(){
    window.location.href = "http://127.0.0.1:5500/Zpremium.html";
}
function create() {
    window.location.href = "http://127.0.0.1:5500/Zcreateaccount.html";
}
function login() {
    window.location.href = "http://127.0.0.1:5500/Zlogin.html";
}
// kalkulacka
let currentNumber = '';
    let previousNumber = '';
    let operator = '';

    function appendNumber(number) {
        currentNumber += number;
        document.getElementById('display').value = currentNumber;
    }

    function setOperator(op) {
        if (currentNumber === '') return;
        operator = op;
        previousNumber = currentNumber;
        currentNumber = '';
        document.getElementById('display').value = '';
    }

    function calculate() {
        if (previousNumber === '' || currentNumber === '') return;
        let result;
        const prev = parseFloat(previousNumber);
        const current = parseFloat(currentNumber);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentNumber = result;
        operator = '';
        previousNumber = '';
        document.getElementById('display').value = result;
    }

    function clearDisplay() {
        currentNumber = '';
        previousNumber = '';
        operator = '';
        document.getElementById('display').value = '';
    }
function copyText() {
    var input = document.getElementById("display");
    input.select();
            input.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(input.value).then(function() {
                alert("the number has been copied: " + input.value);
            }, function(err) {
                console.error('Nepodařilo se zkopírovat text: ', err);
            });
}
// 
// to-do list 
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        showTodoContainer(username);
        loadTasks();
    }
});

function loginUsername() {
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();
    if (username === '') return;
    localStorage.setItem('username', username);
    showTodoContainer(username);
    loadTasks();
}

function showTodoContainer(username) {
    document.getElementById('loginContainer').style.display = 'none';
    const todoContainer = document.getElementById('todoContainer');
    todoContainer.style.display = 'block';
    document.getElementById('welcomeMessage').textContent = `Welcome, ${username}!`;
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    if (task === '') return;
    const li = document.createElement('li');
    li.textContent = task;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add("delete");
    deleteButton.onclick = () => {
        li.remove();
        saveTasks();
    };
    li.appendChild(deleteButton);
    document.getElementById('taskList').appendChild(li);
    taskInput.value = '';
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.toggle("delete");
        deleteButton.onclick = () => {
            li.remove();
            saveTasks();
        };
        li.appendChild(deleteButton);
        document.getElementById('taskList').appendChild(li);
    });
}

function resetUsername() {
    localStorage.removeItem('username');
    document.getElementById('todoContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
}
// stopwach 
let stopwatchInterval;
        let startTime = 0;
        let updatedTime = 0;
        let difference = 0;
        let paused = true;

        function startStopwatch() {
            if (paused) {
                paused = false;
                startTime = new Date().getTime() - difference;
                stopwatchInterval = setInterval(() => {
                    updatedTime = new Date().getTime();
                    difference = updatedTime - startTime;
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                    const milliseconds = Math.floor((difference % 1000));
                    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
                    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
                    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
                    document.getElementById('milliseconds').innerText = String(milliseconds).padStart(3, '0');
                }, 1);
            }
        }

function stopStopwatch() {
            paused = true;
            clearInterval(stopwatchInterval);
}

function resetStopwatch() {
        paused = true;
        clearInterval(stopwatchInterval);
        startTime = 0;
        updatedTime = 0;
        difference = 0;
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        document.getElementById('milliseconds').innerText = '000';
}
// scroll-bar 
function smoothScroll(event, target) {
    event.preventDefault();
    const targetElement = document.querySelector(target);
    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Doba scrollování v milisekundách (2 sekundy)
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
// převod měn 
function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    const rates = {
        USD: { USD: 1, EUR: 0.85, CZK: 22, GBP: 0.74, JPY: 110, AUD: 1.34, CAD: 1.25, CHF: 0.91, CNY: 6.45, INR: 74, RUB: 73, BRL: 5.2, ZAR: 14.5, SGD: 1.34, MXN: 20, KRW: 1130, THB: 32, VND: 23000, SAR: 3.75, AED: 3.67 },
        EUR: { USD: 1.18, EUR: 1, CZK: 26, GBP: 0.86, JPY: 129, AUD: 1.58, CAD: 1.47, CHF: 1.08, CNY: 7.57, INR: 86.8, RUB: 85.9, BRL: 6.1, ZAR: 17.1, SGD: 1.58, MXN: 23.6, KRW: 1330, THB: 37.6, VND: 27050, SAR: 4.4, AED: 4.35 },
        CZK: { USD: 0.045, EUR: 0.038, CZK: 1, GBP: 0.033, JPY: 4.96, AUD: 0.061, CAD: 0.057, CHF: 0.041, CNY: 0.29, INR: 3.34, RUB: 3.3, BRL: 0.23, ZAR: 0.66, SGD: 0.061, MXN: 0.91, KRW: 51, THB: 1.45, VND: 1040, SAR: 0.17, AED: 0.17 },
        GBP: { USD: 1.35, EUR: 1.17, CZK: 30.4, GBP: 1, JPY: 151, AUD: 1.84, CAD: 1.71, CHF: 1.26, CNY: 8.83, INR: 101, RUB: 99.7, BRL: 7.1, ZAR: 19.7, SGD: 1.84, MXN: 27.5, KRW: 1550, THB: 43.8, VND: 31450, SAR: 5.1, AED: 5 },
        JPY: { USD: 0.0091, EUR: 0.0078, CZK: 0.2, GBP: 0.0067, JPY: 1, AUD: 0.012, CAD: 0.011, CHF: 0.0083, CNY: 0.059, INR: 0.68, RUB: 0.67, BRL: 0.047, ZAR: 0.13, SGD: 0.012, MXN: 0.18, KRW: 10, THB: 0.29, VND: 21, SAR: 0.037, AED: 0.036 },
        AUD: { USD: 0.75, EUR: 0.63, CZK: 16.5, GBP: 0.54, JPY: 83, AUD: 1, CAD: 0.92, CHF: 0.68, CNY: 4.82, INR: 55.3, RUB: 54.5, BRL: 3.85, ZAR: 10.8, SGD: 1.34, MXN: 15, KRW: 1065, THB: 22.6, VND: 16380, SAR: 2.8, AED: 2.75 },
        CAD: { USD: 0.8, EUR: 0.68, CZK: 17.6, GBP: 0.58, JPY: 89, AUD: 1.08, CAD: 1, CHF: 0.74, CNY: 5.24, INR: 60.2, RUB: 59.4, BRL: 4.2, ZAR: 11.7, SGD: 1.46, MXN: 16.3, KRW: 1157, THB: 24.5, VND: 17750, SAR: 3.05, AED: 2.99 },
        CHF: { USD: 1.1, EUR: 0.93, CZK: 24.5, GBP: 0.84, JPY: 130, AUD: 1.48, CAD: 1.35, CHF: 1, CNY: 7.1, INR: 82, RUB: 81, BRL: 5.7, ZAR: 15.8, SGD: 1.97, MXN: 22, KRW: 1562, THB: 33.2, VND: 24000, SAR: 4.1, AED: 4 },
        CNY: { USD: 0.16, EUR: 0.13, CZK: 3.5, GBP: 0.11, JPY: 18.2, AUD: 0.21, CAD: 0.19, CHF: 0.14, CNY: 1, INR: 11.5, RUB: 11.4, BRL: 0.8, ZAR: 2.22, SGD: 0.28, MXN: 3.1, KRW: 219, THB: 4.66, VND: 3370, SAR: 0.57, AED: 0.56 },
        INR: { USD: 0.013, EUR: 0.012, CZK: 0.3, GBP: 0.0099, JPY: 1.51, AUD: 0.018, CAD: 0.017, CHF: 0.012, CNY: 0.087, INR: 1, RUB: 0.99, BRL: 0.07, ZAR: 0.19, SGD: 0.024, MXN: 0.27, KRW: 19, THB: 0.4, VND: 29, SAR: 0.049, AED: 0.048 },
        RUB: { USD: 0.014, EUR: 0.012, CZK: 0.3, GBP: 0.01, JPY: 1.54, AUD: 0.019, CAD: 0.017, CHF: 0.012, CNY: 0.088, INR: 1.01, RUB: 1, BRL: 0.071, ZAR: 0.2, SGD: 0.024, MXN: 0.28, KRW: 19.3, THB: 0.41, VND: 29.3, SAR: 0.05, AED: 0.049 },
        BRL: { USD: 0.19, EUR: 0.16, CZK: 4.1, GBP: 0.14, JPY: 21.6, AUD: 0.25, CAD: 0.23, CHF: 0.17, CNY: 1.2, INR: 14.3, RUB: 14, BRL: 1, ZAR: 2.81, SGD: 0.35, MXN: 4.1, KRW: 288, THB: 6.11, VND: 4420, SAR: 0.75, AED: 0.74 },
        ZAR: { USD: 0.068, EUR: 0.057, CZK: 1.5, GBP: 0.049, JPY: 7.8, AUD: 0.092, CAD: 0.085, CHF: 0.062, CNY: 0.43, INR: 5.15, RUB: 5, BRL: 0.36, ZAR: 1, SGD: 0.13, MXN: 1.5, KRW: 105, THB: 2.22, VND: 1600, SAR: 0.27, AED: 0.26 },
        SGD: { USD: 0.75, EUR: 0.63, CZK: 16.5, GBP: 0.54, JPY: 83, AUD: 1, CAD: 0.92, CHF: 0.68, CNY: 4.82, INR: 55.3, RUB: 54.5, BRL: 3.85, ZAR: 10.8, SGD: 1.34, MXN: 15, KRW: 1065, THB: 22.6, VND: 16380, SAR: 2.8, AED: 2.75 },
        MXN: { USD: 0.051, EUR: 0.043, CZK: 1.1, GBP: 0.036, JPY: 5.6, AUD: 0.067, CAD: 0.062, CHF: 0.046, CNY: 0.33, INR: 3.78, RUB: 3.7, BRL: 0.27, ZAR: 0.75, SGD: 0.067, MXN: 1, KRW: 71, THB: 1.6, VND: 1160, SAR: 0.19, AED: 0.18 },
        KRW: { USD: 0.00089, EUR: 0.00077, CZK: 0.02, GBP: 0.00064, JPY: 0.9, AUD: 0.011, CAD: 0.01, CHF: 0.0074, CNY: 0.053, INR: 0.61, RUB: 0.6, BRL: 0.042, ZAR: 0.12, SGD: 0.011, MXN: 0.014, KRW: 1, THB: 0.022, VND: 1.6, SAR: 0.0027, AED: 0.0026 },
        THB: { USD: 0.03, EUR: 0.026, CZK: 0.68, GBP: 0.022, JPY: 3.1, AUD: 0.037, CAD: 0.034, CHF: 0.025, CNY: 0.18, INR: 2.07, RUB: 2, BRL: 0.14, ZAR: 0.39, SGD: 0.037, MXN: 0.45, KRW: 31, THB: 1, VND: 73, SAR: 0.012, AED: 0.011 },
        VND: { USD: 0.000043, EUR: 0.000037, CZK: 0.00096, GBP: 0.000031, JPY: 0.045, AUD: 0.00054, CAD: 0.00051, CHF: 0.00037, CNY: 0.0026, INR: 0.03, RUB: 0.029, BRL: 0.002, ZAR: 0.008, SGD: 0.00037, MXN: 0.000043, KRW: 0.64, THB: 0.014, VND: 1, SAR: 0.00016, AED: 0.00015 },
        SAR: { USD: 0.27, EUR: 0.23, CZK: 5.8, GBP: 0.2, JPY: 31, AUD: 0.37, CAD: 0.34, CHF: 0.25, CNY: 1.8, INR: 20.7, RUB: 20.2, BRL: 1.44, ZAR: 3.9, SGD: 0.37, MXN: 0.47, KRW: 32, THB: 0.94, VND: 671, SAR: 1, AED: 0.98 },
        AED: { USD: 0.27, EUR: 0.23, CZK: 5.8, GBP: 0.2, JPY: 31, AUD: 0.37, CAD: 0.34, CHF: 0.25, CNY: 1.8, INR: 20.7, RUB: 20.2, BRL: 1.44, ZAR: 3.9, SGD: 0.37, MXN: 0.47, KRW: 32, THB: 0.94, VND: 671, SAR: 1, AED: 1 }
    };

    if (isNaN(amount)) {
        document.getElementById('result').innerText = 'Zadejte platnou částku';
        return;
    }

    const convertedAmount = amount * rates[fromCurrency][toCurrency];
    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
}