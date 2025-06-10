document.addEventListener("DOMContentLoaded", () => {
  // Drug Database (Mock Data)
  const drugDatabase = {
    paracetamol: {
      name: "Paracetamol",
      type: "Analgesic/Antipyretic",
      uses: [
        "Pain relief (headaches, toothaches, muscle aches)",
        "Reducing fever",
        "Cold and flu symptoms",
        "Post-operative pain management",
      ],
      dosage: {
        adults: "500mg-1000mg every 4-6 hours (max 4000mg/day)",
        children: "10-15mg/kg every 4-6 hours",
        elderly: "Reduced dose may be required",
      },
      sideEffects: [
        "Rare: Skin rash, blood disorders",
        "Overdose: Liver damage",
        "Very rare: Severe allergic reactions",
      ],
      precautions: [
        "Do not exceed recommended dose",
        "Avoid alcohol while taking this medication",
        "Consult doctor if symptoms persist",
        "Check other medications for paracetamol content",
      ],
      contraindications: ["Severe liver disease", "Known hypersensitivity to paracetamol"],
    },
    ibuprofen: {
      name: "Ibuprofen",
      type: "NSAID (Non-Steroidal Anti-Inflammatory Drug)",
      uses: [
        "Pain relief and inflammation reduction",
        "Fever reduction",
        "Arthritis and joint pain",
        "Menstrual pain",
        "Dental pain",
      ],
      dosage: {
        adults: "200mg-400mg every 4-6 hours (max 1200mg/day)",
        children: "5-10mg/kg every 6-8 hours",
        elderly: "Start with lower doses",
      },
      sideEffects: [
        "Common: Stomach upset, nausea",
        "Less common: Dizziness, headache",
        "Rare: Stomach ulcers, kidney problems",
        "Very rare: Severe allergic reactions",
      ],
      precautions: [
        "Take with food to reduce stomach irritation",
        "Avoid if you have stomach ulcers",
        "Monitor blood pressure if hypertensive",
        "Stay hydrated",
      ],
      contraindications: [
        "Active peptic ulcer",
        "Severe heart failure",
        "Severe kidney disease",
        "Third trimester of pregnancy",
      ],
    },
    amoxicillin: {
      name: "Amoxicillin",
      type: "Antibiotic (Penicillin)",
      uses: [
        "Bacterial infections of ear, nose, throat",
        "Respiratory tract infections",
        "Urinary tract infections",
        "Skin and soft tissue infections",
        "Dental infections",
      ],
      dosage: {
        adults: "250mg-500mg every 8 hours",
        children: "20-40mg/kg/day divided into 3 doses",
        severe: "Up to 1000mg every 8 hours for severe infections",
      },
      sideEffects: [
        "Common: Nausea, diarrhea, stomach upset",
        "Less common: Skin rash, vomiting",
        "Rare: Severe allergic reactions",
        "Very rare: Liver problems",
      ],
      precautions: [
        "Complete the full course even if feeling better",
        "Take with food if stomach upset occurs",
        "Inform doctor of any allergies",
        "May reduce effectiveness of oral contraceptives",
      ],
      contraindications: [
        "Allergy to penicillin or amoxicillin",
        "History of severe allergic reactions to antibiotics",
      ],
    },
    omeprazole: {
      name: "Omeprazole",
      type: "Proton Pump Inhibitor (PPI)",
      uses: [
        "Gastroesophageal reflux disease (GERD)",
        "Peptic ulcers",
        "Zollinger-Ellison syndrome",
        "Prevention of NSAID-induced ulcers",
        "H. pylori eradication (with antibiotics)",
      ],
      dosage: {
        adults: "20mg-40mg once daily before breakfast",
        maintenance: "10mg-20mg daily",
        severe: "Up to 80mg daily in divided doses",
      },
      sideEffects: [
        "Common: Headache, nausea, diarrhea",
        "Less common: Dizziness, constipation",
        "Rare: Vitamin B12 deficiency (long-term use)",
        "Very rare: Severe allergic reactions",
      ],
      precautions: [
        "Take before meals for best effect",
        "Long-term use may affect bone density",
        "May interact with other medications",
        "Regular monitoring for long-term use",
      ],
      contraindications: ["Known hypersensitivity to omeprazole", "Concurrent use with certain HIV medications"],
    },
  }

  // Search suggestions
  const searchSuggestions = [
    "Paracetamol",
    "Ibuprofen",
    "Amoxicillin",
    "Omeprazole",
    "Aspirin",
    "Metformin",
    "Lisinopril",
    "Atorvastatin",
    "Amlodipine",
    "Simvastatin",
    "Levothyroxine",
    "Warfarin",
  ]

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active")
        hamburger.classList.remove("active")
      }

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Enhanced Search Functionality
  const searchBar = document.querySelector(".search-bar input")
  const searchButton = document.querySelector(".search-bar button")
  const searchContainer = document.querySelector(".search-container")

  // Create suggestions dropdown
  const suggestionsDiv = document.createElement("div")
  suggestionsDiv.className = "search-suggestions"
  searchContainer.appendChild(suggestionsDiv)

  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()
    if (query.length > 0) {
      const matches = searchSuggestions.filter((drug) => drug.toLowerCase().includes(query))
      showSuggestions(matches)
    } else {
      hideSuggestions()
    }
  })

  searchBar.addEventListener("blur", () => {
    setTimeout(() => hideSuggestions(), 200)
  })

  function showSuggestions(suggestions) {
    if (suggestions.length > 0) {
      suggestionsDiv.innerHTML = suggestions
        .map((suggestion) => `<div class="search-suggestion">${suggestion}</div>`)
        .join("")
      suggestionsDiv.style.display = "block"

      // Add click handlers to suggestions
      suggestionsDiv.querySelectorAll(".search-suggestion").forEach((item) => {
        item.addEventListener("click", () => {
          searchBar.value = item.textContent
          hideSuggestions()
          handleSearch()
        })
      })
    } else {
      hideSuggestions()
    }
  }

  function hideSuggestions() {
    suggestionsDiv.style.display = "none"
  }

  searchButton.addEventListener("click", handleSearch)
  searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  })

  function handleSearch() {
    const searchTerm = searchBar.value.trim().toLowerCase()
    if (searchTerm) {
      showLoading()

      setTimeout(() => {
        hideLoading()
        const results = findDrugs(searchTerm)
        showSearchResults(results, searchTerm)
        searchBar.value = ""
        hideSuggestions()
      }, 1000)
    }
  }

  function findDrugs(query) {
    const results = []

    // Check exact matches first
    if (drugDatabase[query]) {
      results.push(drugDatabase[query])
    }

    // Check partial matches
    Object.values(drugDatabase).forEach((drug) => {
      if (drug.name.toLowerCase().includes(query) && !results.includes(drug)) {
        results.push(drug)
      }
    })

    // Add some mock results for other searches
    if (results.length === 0) {
      results.push({
        name: searchBar.value.charAt(0).toUpperCase() + searchBar.value.slice(1),
        type: "Medication",
        uses: ["Information not available in demo"],
        note: "This is a demo version. Full drug information would be available in the complete application.",
      })
    }

    return results
  }

  function showSearchResults(results, query) {
    const modal = document.getElementById("searchModal")
    const resultsContainer = document.getElementById("searchResults")

    let html = `<h2>Search Results for "${query}"</h2>`

    if (results.length > 0) {
      html += '<div class="search-results-grid">'
      results.forEach((drug) => {
        html += `
          <div class="search-result-card" onclick="showDrugDetails('${drug.name.toLowerCase()}')">
            <h4>${drug.name}</h4>
            <p><strong>Type:</strong> ${drug.type}</p>
            <p><strong>Primary Use:</strong> ${Array.isArray(drug.uses) ? drug.uses[0] : drug.uses}</p>
            ${drug.note ? `<p><em>${drug.note}</em></p>` : ""}
            <p style="color: var(--primary-color); font-weight: 500;">Click for detailed information →</p>
          </div>
        `
      })
      html += "</div>"
    } else {
      html += "<p>No results found. Please try a different search term.</p>"
    }

    resultsContainer.innerHTML = html
    modal.style.display = "block"
  }

  // Learn More Buttons - Enhanced with detailed modals
  const learnMoreButtons = document.querySelectorAll(".learn-more")
  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const drugName = this.parentElement.querySelector("h3").textContent.toLowerCase()
      showDrugDetails(drugName)
    })
  })

  window.showDrugDetails = (drugName) => {
    const drug = drugDatabase[drugName]
    if (!drug) {
      showSuccessMessage("Drug information not available in demo version.")
      return
    }

    const modal = document.getElementById("drugModal")
    const detailsContainer = document.getElementById("drugDetails")

    const html = `
      <div class="drug-detail-header">
        <h2>${drug.name}</h2>
        <span class="drug-type">${drug.type}</span>
      </div>
      
      <div class="drug-info-grid">
        <div class="info-section">
          <h3><i class="fas fa-pills"></i> Uses</h3>
          <ul>
            ${drug.uses.map((use) => `<li>${use}</li>`).join("")}
          </ul>
        </div>
        
        <div class="info-section">
          <h3><i class="fas fa-prescription"></i> Dosage</h3>
          <table class="dosage-table">
            <tr><th>Patient Group</th><th>Recommended Dose</th></tr>
            ${Object.entries(drug.dosage)
              .map(
                ([group, dose]) =>
                  `<tr><td>${group.charAt(0).toUpperCase() + group.slice(1)}</td><td>${dose}</td></tr>`,
              )
              .join("")}
          </table>
        </div>
        
        <div class="info-section">
          <h3><i class="fas fa-exclamation-triangle"></i> Side Effects</h3>
          <ul>
            ${drug.sideEffects.map((effect) => `<li>${effect}</li>`).join("")}
          </ul>
        </div>
        
        <div class="info-section">
          <h3><i class="fas fa-shield-alt"></i> Precautions</h3>
          <ul>
            ${drug.precautions.map((precaution) => `<li>${precaution}</li>`).join("")}
          </ul>
        </div>
      </div>
      
      <div class="warning-box">
        <h4><i class="fas fa-ban"></i> Contraindications</h4>
        <ul>
          ${drug.contraindications.map((contra) => `<li>${contra}</li>`).join("")}
        </ul>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p><strong>Disclaimer:</strong> This information is for educational purposes only. Always consult with a healthcare professional before starting any medication.</p>
      </div>
    `

    detailsContainer.innerHTML = html
    modal.style.display = "block"
  }

  // Enhanced Contact Form with Validation
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    const formFields = {
      name: contactForm.elements[0],
      email: contactForm.elements[1],
      subject: contactForm.elements[2],
      message: contactForm.elements[3],
    }

    // Add error message elements
    Object.values(formFields).forEach((field) => {
      const errorDiv = document.createElement("div")
      errorDiv.className = "error-message"
      field.parentElement.appendChild(errorDiv)
    })

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateForm()) {
        showLoading()

        setTimeout(() => {
          hideLoading()
          showSuccessMessage(
            `Thank you for your message, ${formFields.name.value}! We've received your inquiry and will get back to you at ${formFields.email.value} soon. - GenuineMeds Team`,
          )
          contactForm.reset()
          clearFormErrors()
        }, 2000)
      }
    })

    function validateForm() {
      let isValid = true
      clearFormErrors()

      // Name validation
      if (!formFields.name.value.trim()) {
        showFieldError(formFields.name, "Name is required")
        isValid = false
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formFields.email.value.trim()) {
        showFieldError(formFields.email, "Email is required")
        isValid = false
      } else if (!emailRegex.test(formFields.email.value)) {
        showFieldError(formFields.email, "Please enter a valid email address")
        isValid = false
      }

      // Message validation
      if (!formFields.message.value.trim()) {
        showFieldError(formFields.message, "Message is required")
        isValid = false
      } else if (formFields.message.value.trim().length < 10) {
        showFieldError(formFields.message, "Message must be at least 10 characters long")
        isValid = false
      }

      return isValid
    }

    function showFieldError(field, message) {
      field.parentElement.classList.add("error")
      field.parentElement.querySelector(".error-message").textContent = message
    }

    function clearFormErrors() {
      Object.values(formFields).forEach((field) => {
        field.parentElement.classList.remove("error")
        field.parentElement.querySelector(".error-message").textContent = ""
      })
    }
  }

  // Enhanced Newsletter Subscription
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const emailInput = this.querySelector("input")
      const email = emailInput.value.trim()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!email) {
        showSuccessMessage("Please enter your email address.")
        return
      }

      if (!emailRegex.test(email)) {
        showSuccessMessage("Please enter a valid email address.")
        return
      }

      showLoading()

      setTimeout(() => {
        hideLoading()
        showSuccessMessage(
          `Thank you for subscribing to our newsletter with ${email}! You'll receive our latest health updates and drug information.`,
        )
        emailInput.value = ""
      }, 1500)
    })
  }

  // Modal functionality
  const modals = document.querySelectorAll(".modal")
  const closeButtons = document.querySelectorAll(".close")

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".modal").style.display = "none"
    })
  })

  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })
  })

  // Utility functions
  function showLoading() {
    document.getElementById("loadingSpinner").style.display = "flex"
  }

  function hideLoading() {
    document.getElementById("loadingSpinner").style.display = "none"
  }

  function showSuccessMessage(message) {
    const modal = document.getElementById("successModal")
    const messageElement = document.getElementById("successMessage")
    messageElement.textContent = message
    modal.style.display = "block"
  }

  // Scroll Animation for Elements
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".drug-card, .feature, .about-content > div")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("fade-in")
      }
    })
  }

  // Add fade-in class for CSS animation
  const style = document.createElement("style")
  style.textContent = `
    .fade-in {
      animation: fadeIn 1s ease forwards;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .drug-card, .feature, .about-content > div {
      opacity: 0;
    }
  `
  document.head.appendChild(style)

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on load

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Add scrolled class styles
  const headerStyle = document.createElement("style")
  headerStyle.textContent = `
    header.scrolled {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      background-color: rgba(255, 255, 255, 0.95);
      transition: all 0.3s ease;
    }
  `
  document.head.appendChild(headerStyle)

  // CTA Button Animation
  const ctaButton = document.querySelector(".cta-button")
  if (ctaButton) {
    ctaButton.addEventListener("click", () => {
      const searchSection = document.getElementById("search")
      if (searchSection) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = searchSection.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        setTimeout(() => {
          document.querySelector(".search-bar input").focus()
        }, 1000)
      }
    })
  }

  // Add click functionality to search examples
  const searchExamples = document.querySelector(".search-examples")
  searchExamples.addEventListener("click", (e) => {
    const text = e.target.textContent
    const popularSearches = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Aspirin"]
    if (popularSearches.includes(text)) {
      searchBar.value = text
      handleSearch()
    }
  })
})
