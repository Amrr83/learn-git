// --- 1. การจัดการสถานะ (State & Storage) ---
const checkAuth = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        renderDashboard();
    } else {
        renderLogin();
    }
};

// --- 2. การเปลี่ยนหน้า (Rendering) ---
const app = document.getElementById('app');

function renderLogin() {
    app.innerHTML = `
        <div class="login-screen">
            <div class="card" style="width: 300px; text-align: center;">
                <h2>Pro Login</h2>
                <input type="text" id="user" placeholder="Username (admin)" style="width: 90%; padding: 10px; margin-bottom: 10px;">
                <input type="password" id="pass" placeholder="Password (1234)" style="width: 90%; padding: 10px; margin-bottom: 15px;">
                <button onclick="handleLogin()" class="btn-primary" style="width: 100%;">Login</button>
            </div>
        </div>
    `;
}

function renderDashboard() {
    app.innerHTML = `
        <div class="dashboard-screen">
            <header class="header">
                <h2>My Personal Dashboard</h2>
                <button onclick="handleLogout()" class="btn-danger">Logout</button>
            </header>

            <div class="widget-grid">
                <div class="card clock-widget">
                    <span class="material-icons-round">schedule</span>
                    <h1 id="clock">00:00:00</h1>
                    <p>วันปัจจุบัน: <span id="date">...</span></p>
                </div>

                <div class="card">
                    <h3>Counter Widget</h3>
                    <p>สะสมแต้มปัจจุบันของคุณ</p>
                    <h1 id="counter-val">0</h1>
                    <button onclick="updateCounter(1)" class="btn-primary">+</button>
                    <button onclick="updateCounter(-1)" class="btn-primary">-</button>
                </div>

                <div class="card">
                    <h3>Quick Tasks</h3>
                    <div class="todo-input-group">
                        <input type="text" id="todoInput" placeholder="เพิ่มงานใหม่...">
                        <button onclick="addTodo()" class="btn-primary">Add</button>
                    </div>
                    <ul id="todoList" class="todo-list"></ul>
                </div>
            </div>
        </div>
    `;
    // หลังจากวาดหน้าเสร็จ ให้เริ่มการทำงานของ Widget ทันที
    startClock();
    initTodo();
}

// --- 3. ฟังก์ชันการทำงานของหน้าเว็บ ---

// ระบบ Login
function handleLogin() {
    const u = document.getElementById('user').value;
    const p = document.getElementById('pass').value;

    if (u === 'admin' && p === '1234') {
        localStorage.setItem('isLoggedIn', 'true'); // บันทึกลงเครื่อง
        renderDashboard();
    } else {
        alert('รหัสผ่านผิด!');
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn'); // ลบข้อมูลออกจากเครื่อง
    renderLogin();
}

// --- 4. ฟังก์ชันของ Widgets ---

// Widget: นาฬิกา
function startClock() {
    const update = () => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleTimeString('th-TH');
        document.getElementById('date').innerText = now.toLocaleDateString('th-TH');
    };
    setInterval(update, 1000);
    update();
}

// Widget: Counter
let count = 0;
function updateCounter(val) {
    count += val;
    document.getElementById('counter-val').innerText = count;
}

// Widget: Todo List
let todos = JSON.parse(localStorage.getItem('myTodos')) || [];

function initTodo() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach((task, index) => {
        list.innerHTML += `
            <li class="todo-item">
                ${task}
                <button onclick="deleteTodo(${index})" class="btn-danger">Delete</button>
            </li>
        `;
    });
}

function addTodo() {
    const input = document.getElementById('todoInput');
    if (input.value !== '') {
        todos.push(input.value);
        localStorage.setItem('myTodos', JSON.stringify(todos)); // บันทึก To-do ลงเครื่องด้วย
        input.value = '';
        initTodo();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('myTodos', JSON.stringify(todos));
    initTodo();
}

// รันครั้งแรกตอนเปิดหน้าเว็บ
checkAuth();