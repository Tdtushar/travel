/* =========================================
   KRISHNA TRAVELERS INDIA
   JAVASCRIPT
========================================= */


/* =========================================
   BASIC SETTINGS
========================================= */

// WhatsApp number.
// IMPORTANT:
// Use country code without + or spaces.
const WHATSAPP_NUMBER = "918587994018";


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

        navbar.classList.toggle("active");

        if (navbar.classList.contains("active")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });


    // Close menu after clicking a navigation link.

    const navLinks = navbar.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            menuToggle.textContent = "☰";

        });

    });

}


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");


window.addEventListener("scroll", () => {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   SET MINIMUM TRAVEL DATE
========================================= */

const startDate =
    document.getElementById("startDate");

const endDate =
    document.getElementById("endDate");


const today =
    new Date().toISOString().split("T")[0];


if (startDate) {

    startDate.min = today;

}


if (endDate) {

    endDate.min = today;

}


/* =========================================
   KEEP RETURN DATE AFTER START DATE
========================================= */

if (startDate && endDate) {

    startDate.addEventListener("change", () => {

        endDate.min = startDate.value;

        if (
            endDate.value &&
            endDate.value < startDate.value
        ) {

            endDate.value = "";

        }

    });

}


/* =========================================
   TOUR ENQUIRY BUTTONS
========================================= */

const tourButtons =
    document.querySelectorAll(".tour-enquiry");


tourButtons.forEach(button => {

    button.addEventListener("click", () => {

        const tourName =
            button.getAttribute("data-tour");

        const destinationField =
            document.getElementById("destination");

        if (destinationField) {

            destinationField.value = tourName;

        }

        const enquirySection =
            document.getElementById("enquiry");

        if (enquirySection) {

            enquirySection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================================
   VEHICLE ENQUIRY BUTTONS
========================================= */

const vehicleButtons =
    document.querySelectorAll(".vehicle-enquiry");


vehicleButtons.forEach(button => {

    button.addEventListener("click", () => {

        const vehicleName =
            button.getAttribute("data-vehicle");

        const vehicleSelect =
            document.getElementById("vehicle");

        if (vehicleSelect) {

            const options =
                Array.from(vehicleSelect.options);

            const matchingOption =
                options.find(
                    option =>
                        option.textContent.trim() === vehicleName
                );

            if (matchingOption) {

                vehicleSelect.value =
                    matchingOption.value;

            } else {

                vehicleSelect.value = "Not Sure";

            }

        }

        const enquirySection =
            document.getElementById("enquiry");

        if (enquirySection) {

            enquirySection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =========================================
   TRAVEL ENQUIRY FORM
========================================= */

const travelForm =
    document.getElementById("travelForm");


if (travelForm) {

    travelForm.addEventListener("submit", function(event) {

        event.preventDefault();


        /* -------------------------------------
           GET FORM VALUES
        ------------------------------------- */

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const people =
            document.getElementById("people").value;

        const from =
            document.getElementById("from").value.trim();

        const destination =
            document.getElementById("destination").value.trim();

        const travelDate =
            document.getElementById("startDate").value;

        const returnDate =
            document.getElementById("endDate").value;

        const vehicle =
            document.getElementById("vehicle").value;

        const message =
            document.getElementById("message").value.trim();


        /* -------------------------------------
           BASIC VALIDATION
        ------------------------------------- */

        if (
            !name ||
            !phone ||
            !people ||
            !from ||
            !destination ||
            !travelDate
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;

        }


        /* -------------------------------------
           FORMAT DATES
        ------------------------------------- */

        const formattedTravelDate =
            formatDate(travelDate);

        const formattedReturnDate =
            returnDate
                ? formatDate(returnDate)
                : "Not specified";


        /* -------------------------------------
           CREATE WHATSAPP MESSAGE
        ------------------------------------- */

        let whatsappMessage =

`*NEW TRAVEL ENQUIRY*
--------------------------------

*Customer Details*

Name: ${name}

Phone: ${phone}

Email: ${email || "Not provided"}

Number of Travellers: ${people}


*Trip Details*

Starting Point: ${from}

Destination: ${destination}

Travel Date: ${formattedTravelDate}

Return Date: ${formattedReturnDate}

Preferred Vehicle: ${vehicle || "Not specified"}


*Additional Requirements*

${message || "No additional requirements provided."}

--------------------------------
Enquiry received from Krishna Travelers India website.`;


        /* -------------------------------------
           OPEN WHATSAPP
        ------------------------------------- */

        const encodedMessage =
            encodeURIComponent(whatsappMessage);


        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    });

}


/* =========================================
   DATE FORMATTER
========================================= */

function formatDate(dateString) {

    if (!dateString) {

        return "Not specified";

    }


    const date =
        new Date(dateString + "T00:00:00");


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================
   PHONE NUMBER INPUT
========================================= */

const phoneInput =
    document.getElementById("phone");


if (phoneInput) {

    phoneInput.addEventListener("input", () => {

        /*
         * Keep the field reasonably clean.
         * Allows:
         * numbers
         * +
         * spaces
         * hyphen
         */

        phoneInput.value =
            phoneInput.value.replace(
                /[^0-9+\-\s]/g,
                ""
            );

    });

}


/* =========================================
   NAVBAR SHADOW ON SCROLL
========================================= */

const header =
    document.getElementById("header");


window.addEventListener("scroll", () => {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.style.boxShadow =
            "0 5px 25px rgba(0,0,0,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});


/* =========================================
   PREVENT END DATE BEFORE START DATE
========================================= */

if (startDate && endDate) {

    endDate.addEventListener("change", () => {

        if (
            startDate.value &&
            endDate.value &&
            endDate.value < startDate.value
        ) {

            alert(
                "Return date cannot be before the travel date."
            );

            endDate.value = "";

        }

    });

}


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "Krishna Travelers India website loaded successfully."
);