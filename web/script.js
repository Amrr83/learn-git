const loginForm = document.getElementById('loginForm');
const loginPage = document.getElementById('login-page');
const dashboardPage = document.getElementById('dashboard-page');
const logoutBtn = document.getElementById('logoutBtn');
const errorMsg = document.getElementById('error-msg');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    // ตรวจสอบข้อมูล (Simple Mockup)
    if (user === "admin" && pass === "1234") {
        // อนิเมชั่นเปลี่ยนหน้าเล็กน้อย
        loginPage.style.opacity = '0';
        setTimeout(() => {
            loginPage.classList.add('hidden');
            dashboardPage.classList.remove('hidden');
            dashboardPage.style.opacity = '0';
            setTimeout(() => dashboardPage.style.opacity = '1', 50);
        }, 300);
    } else {
        errorMsg.textContent = "ชื่อผู้ใช้หรือรหัสผ่านผิด!";
        errorMsg.style.color = "#e11d48";
    }
});

logoutBtn.addEventListener('click', () => {
    location.reload(); // วิธีที่ง่ายที่สุดในการ Reset ทุกอย่างคือการโหลดหน้าใหม่
});