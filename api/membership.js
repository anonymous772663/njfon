const { Resend } = require("resend");

const resend =
    new Resend(
        process.env.RESEND_API_KEY
    );


module.exports = async function handler(
    req,
    res
) {

    /* ================================
       ONLY POST
    ================================= */

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method not allowed."
        });

    }


    /* ================================
       GET DATA
    ================================= */

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
        address,
        email,
        phone,
        bloodGroup,
        message
    } = body;


    /* ================================
       REQUIRED FIELDS
    ================================= */

    if (
        !name ||
        !address ||
        !email ||
        !phone ||
        !bloodGroup
    ) {

        return res.status(400).json({
            error:
                "Please fill in all required fields."
        });

    }


    /* ================================
       EMAIL VALIDATION
    ================================= */

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(email)) {

        return res.status(400).json({
            error:
                "Please enter a valid email address."
        });

    }


    /* ================================
       LENGTH LIMITS
    ================================= */

    if (name.length > 100) {

        return res.status(400).json({
            error: "Name is too long."
        });

    }


    if (address.length > 250) {

        return res.status(400).json({
            error: "Address is too long."
        });

    }


    if (email.length > 150) {

        return res.status(400).json({
            error: "Email is too long."
        });

    }


    if (phone.length > 30) {

        return res.status(400).json({
            error: "Phone number is too long."
        });

    }


    if (message && message.length > 3000) {

        return res.status(400).json({
            error: "Message is too long."
        });

    }


    /* ================================
       ESCAPE HTML
    ================================= */

    const escapeHTML = value => {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    };


    const safeName =
        escapeHTML(name);

    const safeAddress =
        escapeHTML(address);

    const safeEmail =
        escapeHTML(email);

    const safePhone =
        escapeHTML(phone);

    const safeBloodGroup =
        escapeHTML(bloodGroup);

    const safeMessage =
        escapeHTML(message)
            .replace(/\n/g, "<br>");


    /* ================================
       SEND EMAIL
    ================================= */

    try {

        const { data, error } =
            await resend.emails.send({

                from:
                    "NJFON Website <onboarding@resend.dev>",

                to: [
                    "neymarjuniorfansofnepal.njfn@gmail.com"
                ],

                replyTo:
                    email,

                subject:
                    "NJFON Membership Application - " +
                    name,

                html: `

                    <div style="
                        font-family:Arial,sans-serif;
                        max-width:700px;
                        margin:auto;
                        padding:30px;
                        color:#111;
                    ">

                        <h2>
                            New NJFON Membership Application
                        </h2>

                        <hr>

                        <p>
                            <strong>Full Name:</strong><br>
                            ${safeName}
                        </p>

                        <p>
                            <strong>Address:</strong><br>
                            ${safeAddress}
                        </p>

                        <p>
                            <strong>Email:</strong><br>
                            ${safeEmail}
                        </p>

                        <p>
                            <strong>Phone:</strong><br>
                            ${safePhone}
                        </p>

                        <p>
                            <strong>Blood Group:</strong><br>
                            ${safeBloodGroup}
                        </p>

                        <h3>
                            Message
                        </h3>

                        <p style="
                            line-height:1.7;
                        ">
                            ${
                                safeMessage ||
                                "No message provided."
                            }
                        </p>

                        <hr>

                        <p style="
                            color:#777;
                            font-size:12px;
                        ">
                            Submitted through the
                            Neymar Junior Fans of Nepal
                            website.
                        </p>

                    </div>

                `

            });


        if (error) {

            console.error(error);

            return res.status(500).json({
                error:
                    "Membership email could not be sent."
            });

        }


        return res.status(200).json({

            success: true,

            message:
                "Membership application sent successfully."

        });

    }


    catch (error) {

        console.error(error);

        return res.status(500).json({

            error:
                "Something went wrong while sending the application."

        });

    }

};