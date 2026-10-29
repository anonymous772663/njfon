/* =========================================================
   NJFON MEMBERSHIP
   Shared cursor + membership form submission
========================================================= */

(() => {
    /* =========================
       SHARED DOT + TRAIL CURSOR
    ========================== */

    const cursor = document.querySelector(".cursor");
    const trails = [...document.querySelectorAll(".cursor-trail")];

    if (cursor && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = innerWidth / 2;
        let mouseY = innerHeight / 2;

        const positions = trails.map(() => ({
            x: mouseX,
            y: mouseY
        }));

        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        }, { passive: true });

        function animateCursor() {
            let prevX = mouseX;
            let prevY = mouseY;

            trails.forEach((trail, index) => {
                const point = positions[index];
                const speed = Math.max(0.12, 0.28 - index * 0.025);

                point.x += (prevX - point.x) * speed;
                point.y += (prevY - point.y) * speed;

                trail.style.left = `${point.x}px`;
                trail.style.top = `${point.y}px`;

                prevX = point.x;
                prevY = point.y;
            });

            requestAnimationFrame(animateCursor);
        }

        animateCursor();
    }


    /* =========================
       MEMBERSHIP FORM
    ========================== */

    const form = document.getElementById("membershipForm");
    const button = document.getElementById("membershipSubmit");
    const buttonText = document.getElementById("membershipButtonText");
    const message = document.getElementById("membershipMessage");

    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        button.disabled = true;
        buttonText.textContent = "SUBMITTING...";
        message.textContent = "";
        message.className = "membership-message";

        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            address: formData.get("address"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            bloodGroup: formData.get("bloodGroup"),
            message: formData.get("message")
        };

        try {
            const response = await fetch("/api/membership", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            /*
             * Read the response as text first.
             * This prevents "Unexpected end of JSON input"
             * when the server returns an empty/non-JSON response.
             */
            const responseText = await response.text();

            let result = {};

            try {
                result = responseText
                    ? JSON.parse(responseText)
                    : {};
            } catch {
                throw new Error(
                    `Server returned an invalid response (${response.status}).`
                );
            }

            if (!response.ok) {
                throw new Error(
                    result.error ||
                    "Unable to submit your membership application."
                );
            }

            message.textContent =
                "APPLICATION SENT SUCCESSFULLY. WE'LL CONTACT YOU SOON.";

            message.classList.add("success");

            form.reset();

        } catch (error) {
            console.error("Membership form error:", error);

            message.textContent =
                error.message ||
                "Something went wrong. Please try again.";

            message.classList.add("error");

        } finally {
            button.disabled = false;
            buttonText.textContent = "SUBMIT APPLICATION";
        }
    });
})();
