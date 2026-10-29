const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function handler(req, res) {

    /* ==========================================
       ONLY ALLOW POST
    ========================================== */

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed."
        });

    }


    /* ==========================================
       GET DATA
    ========================================== */

    let body;

    try {
        body = typeof req.body === "string"
            ? JSON.parse(req.body || "{}")
            : (req.body || {});
    } catch {
        return res.status(400).json({
            error: "Invalid request data."
        });
    }

    const {
        name,
        email,
        subject,
        message
    } = body;


    /* ==========================================
       VALIDATION
    ========================================== */

    if (
        !name ||
        !email ||
        !subject ||
        !message
    ) {

        return res.status(400).json({
            error: "Please fill in all fields."
        });

    }


    /* ==========================================
       BASIC EMAIL VALIDATION
    ========================================== */

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        return res.status(400).json({
            error: "Please enter a valid email address."
        });

    }


    /* ==========================================
       LIMIT INPUT
    ========================================== */

    if (name.length > 100) {

        return res.status(400).json({
            error: "Name is too long."
        });

    }

    if (email.length > 150) {

        return res.status(400).json({
            error: "Email is too long."
        });

    }

    if (subject.length > 200) {

        return res.status(400).json({
            error: "Subject is too long."
        });

    }

    if (message.length > 5000) {

        return res.status(400).json({
            error: "Message is too long."
        });

    }


    /* ==========================================
       ESCAPE HTML
    ========================================== */

    const escapeHTML = (value) => {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    };


    const safeName = escapeHTML(name);
    const safeEmail = escapeHTML(email);
    const safeSubject = escapeHTML(subject);
    const safeMessage = escapeHTML(message)
        .replace(/\n/g, "<br>");


    /* ==========================================
       SEND EMAIL
    ========================================== */

    try {

        const { data, error } = await resend.emails.send({

            /*
             * IMPORTANT:
             * This sender must be an address/domain
             * that Resend allows you to send from.
             */

            from: "NJFON Website <onboarding@resend.dev>",

            to: [
                "neymarjuniorfansofnepal.njfn@gmail.com"
            ],

            replyTo: email,

            subject:
                "NJFON Contact: " + subject,

            html: `

                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 700px;
                    margin: auto;
                    padding: 30px;
                    color: #111;
                ">

                    <h2>
                        New NJFON Website Message
                    </h2>

                    <hr>

                    <p>
                        <strong>Name:</strong>
                        ${safeName}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        ${safeEmail}
                    </p>

                    <p>
                        <strong>Subject:</strong>
                        ${safeSubject}
                    </p>

                    <h3>
                        Message
                    </h3>

                    <p style="
                        line-height: 1.7;
                    ">
                        ${safeMessage}
                    </p>

                    <hr>

                    <p style="
                        color: #777;
                        font-size: 12px;
                    ">
                        Sent from the NJFON website.
                    </p>

                </div>

            `

        });


        if (error) {

            console.error(error);

            return res.status(500).json({
                error: "Email could not be sent."
            });

        }


        return res.status(200).json({
            success: true,
            message: "Message sent successfully."
        });

    }


    catch (error) {

        console.error(error);

        return res.status(500).json({
            error: "Something went wrong while sending the message."
        });

    }

};