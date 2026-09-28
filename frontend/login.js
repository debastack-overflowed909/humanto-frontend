

        // Form state configuration
        let currentMode = 'signin'; // 'signin', 'signup', 'magic'
        let isVerified = false;
        let holdTimer = null;
        let holdProgressInterval = null;
        let holdStartTime = 0;
        const HOLD_DURATION = 1000; // 1 second hold

        // Toggle Password Visibility
        function togglePasswordVisibility() {
            const passwordInput = document.getElementById('input-password');
            const toggleIcon = document.getElementById('toggle-password-icon');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.className = 'ph ph-eye-slash text-base';
            } else {
                passwordInput.type = 'password';
                toggleIcon.className = 'ph ph-eye text-base';
            }
        }

        // Mode Switcher Logic
        function switchTab(mode) {
            currentMode = mode;
            
            // Element references
            const tabSignin = document.getElementById('tab-signin');
            const tabSignup = document.getElementById('tab-signup');
            const tabMagic = document.getElementById('tab-magic');
            
            const fieldName = document.getElementById('field-name');
            const fieldPassword = document.getElementById('field-password');
            const fieldRemember = document.getElementById('field-remember');
            const ssoContainer = document.getElementById('sso-container');
            const dividerContainer = document.getElementById('divider-container');
            const strengthMeter = document.getElementById('strength-meter');
            
            const heading = document.getElementById('form-heading');
            const subheading = document.getElementById('form-subheading');
            const submitBtnText = document.getElementById('submit-btn-text');

            // Reset tab styling
            [tabSignin, tabSignup, tabMagic].forEach(tab => {
                tab.className = "flex-1 py-2 px-3 rounded-xl transition-all duration-200 text-warm-600 hover:text-warm-900";
            });

            // Active Tab styling
            const activeTab = mode === 'signin' ? tabSignin : (mode === 'signup' ? tabSignup : tabMagic);
            activeTab.className = "flex-1 py-2 px-3 rounded-xl transition-all duration-200 bg-white text-warm-900 shadow-sm font-semibold";

            // Update content based on selected mode
            if (mode === 'signin') {
                heading.textContent = "Sign in to Humanto";
                subheading.textContent = "Enter your details to access your employee portal";
                submitBtnText.textContent = "Sign In";
                
                fieldName.classList.add('hidden');
                fieldPassword.classList.remove('hidden');
                fieldRemember.classList.remove('hidden');
                ssoContainer.classList.remove('hidden');
                dividerContainer.classList.remove('hidden');
                strengthMeter.classList.add('hidden');

            } else if (mode === 'signup') {
                heading.textContent = "Join your workplace";
                subheading.textContent = "Create an account linked to your company domain";
                submitBtnText.textContent = "Create Account";

                fieldName.classList.remove('hidden');
                fieldPassword.classList.remove('hidden');
                fieldRemember.classList.add('hidden');
                ssoContainer.classList.remove('hidden');
                dividerContainer.classList.remove('hidden');
                strengthMeter.classList.remove('hidden');

            } else if (mode === 'magic') {
                heading.textContent = "Sign in with Magic Link";
                subheading.textContent = "We’ll send a secure passwordless login link to your inbox";
                submitBtnText.textContent = "Send Magic Link";

                fieldName.classList.add('hidden');
                fieldPassword.classList.add('hidden');
                fieldRemember.classList.add('hidden');
                ssoContainer.classList.add('hidden');
                dividerContainer.classList.add('hidden');
                strengthMeter.classList.add('hidden');
            }
        }

        // Password Strength Evaluator for Sign Up
        function checkPasswordStrength(password) {
            if (currentMode !== 'signup') return;

            const m1 = document.getElementById('meter-1');
            const m2 = document.getElementById('meter-2');
            const m3 = document.getElementById('meter-3');
            const mText = document.getElementById('meter-text');

            let score = 0;
            if (password.length >= 6) score++;
            if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
            if (password.length >= 12 && /[^A-Za-z0-9]/.test(password)) score++;

            // Reset meters
            m1.className = "h-full w-1/3 rounded-full bg-warm-300 transition-all duration-300";
            m2.className = "h-full w-1/3 rounded-full bg-warm-300 transition-all duration-300";
            m3.className = "h-full w-1/3 rounded-full bg-warm-300 transition-all duration-300";

            if (password.length === 0) {
                mText.textContent = "Enter a strong password";
                return;
            }

            if (score === 1) {
                m1.className = "h-full w-1/3 rounded-full bg-amber-500 transition-all duration-300";
                mText.textContent = "Weak password";
                mText.className = "text-[11px] text-amber-600 font-medium";
            } else if (score === 2) {
                m1.className = "h-full w-1/3 rounded-full bg-blue-500 transition-all duration-300";
                m2.className = "h-full w-1/3 rounded-full bg-blue-500 transition-all duration-300";
                mText.textContent = "Medium password";
                mText.className = "text-[11px] text-blue-600 font-medium";
            } else if (score >= 3) {
                m1.className = "h-full w-1/3 rounded-full bg-emerald-500 transition-all duration-300";
                m2.className = "h-full w-1/3 rounded-full bg-emerald-500 transition-all duration-300";
                m3.className = "h-full w-1/3 rounded-full bg-emerald-500 transition-all duration-300";
                mText.textContent = "Strong & secure password";
                mText.className = "text-[11px] text-emerald-600 font-medium";
            }
        }

        // Press-and-Hold Human Verification Security Widget Logic
        function startHold() {
            if (isVerified) return;

            const progressBar = document.getElementById('hold-progress');
            holdStartTime = Date.now();

            holdProgressInterval = setInterval(() => {
                const elapsed = Date.now() - holdStartTime;
                const percentage = Math.min((elapsed / HOLD_DURATION) * 100, 100);
                progressBar.style.width = `${percentage}%`;

                if (elapsed >= HOLD_DURATION) {
                    completeVerification();
                }
            }, 20);
        }

        function endHold() {
            if (isVerified) return;
            clearInterval(holdProgressInterval);
            const progressBar = document.getElementById('hold-progress');
            progressBar.style.width = '0%';
        }

        function completeVerification() {
            clearInterval(holdProgressInterval);
            isVerified = true;

            const holdBtn = document.getElementById('hold-btn');
            const holdLabel = document.getElementById('hold-label');
            const statusText = document.getElementById('security-status');
            const submitBtn = document.getElementById('submit-btn');

            holdBtn.className = "w-full h-9 bg-emerald-50 border border-emerald-300 rounded-xl relative overflow-hidden flex items-center justify-center font-semibold text-xs text-emerald-800";
            holdLabel.innerHTML = `<i class="ph ph-check-circle-fill text-emerald-600 text-base"></i> Verified Human`;
            statusText.textContent = "Passed security check";
            statusText.className = "text-[11px] text-emerald-600 font-medium";

            // Enable submit button
            submitBtn.disabled = false;
        }

        // Toast Notification System
        function showToast(title, message, isError = false) {
            const toast = document.getElementById('toast-notification');
            const toastTitle = document.getElementById('toast-title');
            const toastMsg = document.getElementById('toast-msg');
            const toastIcon = document.getElementById('toast-icon');

            toastTitle.textContent = title;
            toastMsg.textContent = message;

            if (isError) {
                toastIcon.className = "ph ph-warning-circle text-rose-500 text-xl shrink-0 mt-0.5";
            } else {
                toastIcon.className = "ph ph-check-circle text-emerald-400 text-xl shrink-0 mt-0.5";
            }

            toast.classList.remove('hidden');

            setTimeout(() => {
                toast.classList.add('hidden');
            }, 4000);
        }

        // SSO Handler
        function handleSSO(provider) {
            showToast(`Authenticating with ${provider}...`, "Redirecting to single sign-on provider portal.");
        }

        // Forgot password flow
        function triggerForgotPassword(e) {
            e.preventDefault();
            const email = document.getElementById('input-email').value;
            if (!email) {
                showToast("Email required", "Please enter your work email to reset your password.", true);
            } else {
                showToast("Reset link sent!", `Password reset instructions sent to ${email}`);
            }
        }

        // Form Submit Handler
        // function handleFormSubmit(e) {
        //     e.preventDefault();

        //     if (!isVerified) {
        //         showToast("Verification needed", "Please hold down the human verification button.", true);
        //         return;
        //     }

        //     const email = document.getElementById('input-email').value;
        //     const submitBtn = document.getElementById('submit-btn');

        //     // Set loading state
        //     submitBtn.disabled = true;
        //     submitBtn.innerHTML = `<i class="ph ph-circle-notch animate-spin text-lg"></i> Processing...`;

        //     setTimeout(() => {
        //         submitBtn.disabled = false;
        //         submitBtn.innerHTML = `<span id="submit-btn-text">Sign In</span> <i class="ph ph-arrow-right text-base"></i>`;

        //         if (currentMode === 'signin') {
        //             showToast("Welcome back!", `Successfully logged in as ${email}`);
        //         } else if (currentMode === 'signup') {
        //             showToast("Account created!", "Please check your inbox to verify your email.");
        //         } else {
        //             showToast("Magic Link sent!", `Check ${email} to sign in instantly.`);
        //         }
        //     }, 1200);
        // }

     async function handleFormSubmit(e) {
    e.preventDefault();

       console.log("FORM SUBMITTED");
    console.log("EMAIL:", document.getElementById("input-email").value);
    console.log("PASSWORD:", document.getElementById("input-password").value);


    if (!isVerified) {
        showToast(
            "Verification needed",
            "Please hold down the human verification button.",
            true
        );
        return;
    }

    const email = document.getElementById("input-email").value;
    const password = document.getElementById("input-password").value;

    const url = currentMode === "signup"
    ? "http://localhost:3000/auth/signup"
    : "http://localhost:3000/auth/login";


    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        console.log("SERVER RESPONCE:",data);
        console.log("JWT TOKEN:", data.token);
        localStorage.setItem("token",data.token);

        if (currentMode === "signin") {
            getProtectedData();
        }

        showToast("Success", data.message);

    } catch (error) {
        console.log(error);
        showToast("Error", "Could not connect to server.", true);
    }
}
    
async function getProtectedData() {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/protected", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    console.log("PROTECTED DATA:", data);
}


const logoutButton = document.getElementById("logoutBtn");

if (localStorage.getItem("token")) {
    logoutButton.style.display = "block";
} else {
    logoutButton.style.display = "none";
}

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    console.log("Logged out");
});s