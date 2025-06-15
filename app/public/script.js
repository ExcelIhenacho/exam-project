// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initializeHeader()
  initializeMobileMenu()
  initializeSmoothScrolling()
  initializeAnimations()
  initializeProductFiltering()
  initializeSkinTypeQuiz()
  initializeNewsletterForm()
  initializeBioPopup()

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()
})

// Header Functionality
function initializeHeader() {
  const header = document.getElementById("header")

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }

  window.addEventListener("scroll", handleScroll)
  handleScroll() // Run once on load
}

// Mobile Menu Functionality
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const mobileNav = document.getElementById("mobileNav")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  const menuIcon = mobileMenuBtn.querySelector("i")

  function toggleMobileMenu() {
    const isActive = mobileNav.classList.contains("active")

    if (isActive) {
      mobileNav.classList.remove("active")
      menuIcon.classList.remove("fa-times")
      menuIcon.classList.add("fa-bars")
    } else {
      mobileNav.classList.add("active")
      menuIcon.classList.remove("fa-bars")
      menuIcon.classList.add("fa-times")
    }
  }

  function closeMobileMenu() {
    mobileNav.classList.remove("active")
    menuIcon.classList.remove("fa-times")
    menuIcon.classList.add("fa-bars")
  }

  mobileMenuBtn.addEventListener("click", toggleMobileMenu)

  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
      closeMobileMenu()
    }
  })
}

// Smooth Scrolling Functionality
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.getElementById("header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Animation on Scroll
function initializeAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll")

  function checkAnimations() {
    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition && !element.classList.contains("animated")) {
        element.classList.add("animated")
      }
    })
  }

  // Throttle scroll events for better performance
  let ticking = false
  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkAnimations()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener("scroll", handleScroll)
  checkAnimations() // Run once on load
}

// Product Filtering Functionality
function initializeProductFiltering() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const productCards = document.querySelectorAll(".product-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((b) => b.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      productCards.forEach((card) => {
        const cardType = card.getAttribute("data-type")

        if (filter === "all" || cardType === filter) {
          card.style.display = "block"
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"

          // Animate in
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 10)
        } else {
          // Animate out
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"

          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// Skin Type Quiz Functionality
function initializeSkinTypeQuiz() {
  const quiz = document.getElementById("skinTypeQuiz")
  const questionContainer = document.getElementById("questionContainer")
  const quizResults = document.getElementById("quizResults")
  const questionText = document.getElementById("questionText")
  const optionsContainer = document.getElementById("optionsContainer")
  const questionCounter = document.getElementById("questionCounter")
  const questionPercentage = document.getElementById("questionPercentage")
  const progressBar = document.getElementById("progressBar")
  const skinTypeResult = document.getElementById("skinTypeResult")
  const skinTypeDescription = document.getElementById("skinTypeDescription")
  const recommendationsList = document.getElementById("recommendationsList")
  const retakeQuizBtn = document.getElementById("retakeQuiz")

  let currentQuestion = 0
  let scores = {
    dry: 0,
    oily: 0,
    combination: 0,
    sensitive: 0,
    normal: 0,
  }

  const questions = [
    {
      text: "How does your skin feel after cleansing?",
      options: [
        {
          text: "Tight and dry",
          points: { dry: 3, oily: 0, combination: 1, sensitive: 1, normal: 0 },
        },
        {
          text: "Comfortable and balanced",
          points: { dry: 0, oily: 0, combination: 1, sensitive: 0, normal: 3 },
        },
        {
          text: "Still oily, especially in the T-zone",
          points: { dry: 0, oily: 3, combination: 2, sensitive: 0, normal: 0 },
        },
        {
          text: "Irritated or slightly red",
          points: { dry: 1, oily: 0, combination: 0, sensitive: 3, normal: 0 },
        },
      ],
    },
    {
      text: "By mid-day, how does your skin look?",
      options: [
        {
          text: "Flaky or feels tight",
          points: { dry: 3, oily: 0, combination: 0, sensitive: 1, normal: 0 },
        },
        {
          text: "Shiny all over",
          points: { dry: 0, oily: 3, combination: 1, sensitive: 0, normal: 0 },
        },
        {
          text: "Shiny only in the T-zone",
          points: { dry: 0, oily: 1, combination: 3, sensitive: 0, normal: 1 },
        },
        {
          text: "Looks the same as in the morning",
          points: { dry: 0, oily: 0, combination: 0, sensitive: 0, normal: 3 },
        },
      ],
    },
    {
      text: "How often do you experience breakouts?",
      options: [
        {
          text: "Rarely or never",
          points: { dry: 2, oily: 0, combination: 0, sensitive: 1, normal: 3 },
        },
        {
          text: "Occasionally, usually during stress or hormonal changes",
          points: { dry: 1, oily: 1, combination: 2, sensitive: 1, normal: 2 },
        },
        {
          text: "Frequently, especially in the T-zone",
          points: { dry: 0, oily: 2, combination: 3, sensitive: 0, normal: 0 },
        },
        {
          text: "Often, and my skin gets irritated easily",
          points: { dry: 0, oily: 1, combination: 1, sensitive: 3, normal: 0 },
        },
      ],
    },
  ]

  const recommendations = {
    dry: ["Hydrating Serum", "Rich Moisturizer", "Gentle Cream Cleanser"],
    oily: ["Oil-Free Moisturizer", "Salicylic Acid Cleanser", "Clay Mask"],
    combination: ["Balancing Toner", "Lightweight Gel Moisturizer", "Gentle Foaming Cleanser"],
    sensitive: ["Calming Rose Toner", "Fragrance-Free Moisturizer", "Gentle Milk Cleanser"],
    normal: ["Daily SPF 50 Moisturizer", "Vitamin C Serum", "Hydrating Cleanser"],
  }

  function updateQuizProgress() {
    const percentage = Math.round(((currentQuestion + 1) / questions.length) * 100)
    progressBar.style.width = `${percentage}%`
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`
    questionPercentage.textContent = `${percentage}%`
  }

  function updateQuizQuestion() {
    const question = questions[currentQuestion]
    questionText.textContent = question.text

    // Clear previous options
    optionsContainer.innerHTML = ""

    // Add new options
    question.options.forEach((option) => {
      const button = document.createElement("button")
      button.className = "option"
      button.textContent = option.text
      button.addEventListener("click", () => handleAnswer(option.points))
      optionsContainer.appendChild(button)
    })

    updateQuizProgress()
  }

  function handleAnswer(points) {
    // Update scores
    Object.keys(points).forEach((key) => {
      scores[key] += points[key]
    })

    currentQuestion++

    if (currentQuestion < questions.length) {
      updateQuizQuestion()
    } else {
      showResults()
    }
  }

  function getSkinType() {
    const maxScore = Math.max(scores.dry, scores.oily, scores.combination, scores.sensitive, scores.normal)

    if (scores.dry === maxScore) return "dry"
    if (scores.oily === maxScore) return "oily"
    if (scores.combination === maxScore) return "combination"
    if (scores.sensitive === maxScore) return "sensitive"
    return "normal"
  }

  function showResults() {
    const skinType = getSkinType()
    const skinTypeCapitalized = skinType.charAt(0).toUpperCase() + skinType.slice(1)

    questionContainer.classList.add("hidden")
    quizResults.classList.remove("hidden")

    skinTypeResult.textContent = `Your Skin Type: ${skinTypeCapitalized}`
    skinTypeDescription.textContent = `Based on your answers, you likely have ${skinType} skin. Here are some product recommendations for your skin type:`

    // Clear previous recommendations
    recommendationsList.innerHTML = ""

    // Add new recommendations
    recommendations[skinType].forEach((product) => {
      const li = document.createElement("li")
      li.textContent = product
      recommendationsList.appendChild(li)
    })
  }

  function resetQuiz() {
    currentQuestion = 0
    scores = {
      dry: 0,
      oily: 0,
      combination: 0,
      sensitive: 0,
      normal: 0,
    }

    questionContainer.classList.remove("hidden")
    quizResults.classList.add("hidden")

    updateQuizQuestion()
  }

  // Initialize quiz
  updateQuizQuestion()

  // Retake quiz button
  retakeQuizBtn.addEventListener("click", resetQuiz)
}

// Newsletter Form Functionality
function initializeNewsletterForm() {
  const form = document.getElementById("newsletterForm")
  const emailInput = document.getElementById("emailInput")
  const formMessage = document.getElementById("formMessage")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()

    if (!email) {
      showFormMessage("Please enter your email address.", "error")
      return
    }

    if (!isValidEmail(email)) {
      showFormMessage("Please enter a valid email address.", "error")
      return
    }

    // Simulate form submission
    showFormMessage("Thank you for subscribing! You will receive our newsletter soon.", "success")
    emailInput.value = ""
  })

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function showFormMessage(message, type) {
    formMessage.textContent = message
    formMessage.className = `form-message ${type}`
    formMessage.style.display = "block"

    setTimeout(() => {
      formMessage.style.display = "none"
    }, 5000)
  }
}

// Bio Popup Functionality
function initializeBioPopup() {
  const bioTrigger = document.getElementById("bioTrigger")
  const bioPopup = document.getElementById("bioPopup")

  if (bioTrigger && bioPopup) {
    bioTrigger.addEventListener("mouseenter", () => {
      bioPopup.style.opacity = "1"
      bioPopup.style.visibility = "visible"
      bioPopup.style.transform = "translateY(0)"
    })

    bioTrigger.addEventListener("mouseleave", () => {
      bioPopup.style.opacity = "0"
      bioPopup.style.visibility = "hidden"
      bioPopup.style.transform = "translateY(10px)"
    })
  }
}

// Add to Cart Functionality (Basic)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart") || e.target.closest(".add-to-cart")) {
    e.preventDefault()

    // Get product name from the card
    const productCard = e.target.closest(".product-card")
    const productName = productCard.querySelector("h3").textContent

    // Show a simple alert (in a real app, this would add to cart)
    alert(`${productName} has been added to your cart!`)

    // Add visual feedback
    const button = e.target.closest(".add-to-cart")
    const originalText = button.innerHTML

    button.innerHTML = '<i class="fas fa-check"></i> Added!'
    button.style.backgroundColor = "#10b981"

    setTimeout(() => {
      button.innerHTML = originalText
      button.style.backgroundColor = ""
    }, 2000)
  }
})

// Keyboard Navigation Support
document.addEventListener("keydown", (e) => {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    const mobileNav = document.getElementById("mobileNav")
    const mobileMenuBtn = document.getElementById("mobileMenuBtn")
    const menuIcon = mobileMenuBtn.querySelector("i")

    if (mobileNav.classList.contains("active")) {
      mobileNav.classList.remove("active")
      menuIcon.classList.remove("fa-times")
      menuIcon.classList.add("fa-bars")
    }
  }
})

// Performance Optimization: Lazy Loading Images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize lazy loading if supported
if ("IntersectionObserver" in window) {
  initializeLazyLoading()
}

// Error Handling for Images
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+"
      e.target.alt = "Image not found"
    }
  },
  true,
)

// Console welcome message
console.log("%cWelcome to Luminous Skin Care! 🌟", "color: #e11d48; font-size: 16px; font-weight: bold;")
console.log("Built with love using HTML, CSS, and JavaScript")
