function logout() {
  localStorage.removeItem("token")
  window.location.href = "index.html"
}

function getActivePage() {
  const page = window.location.pathname.split("/").pop() || "dashboard.html"
  return page
}

function renderSidebar() {
  const active = getActivePage()

  const links = [
    { href: "dashboard.html", icon: "bi-speedometer2", label: "Dashboard" },
    { href: "lista.html", icon: "bi-list-ul", label: "Produtos" },
    { href: "cadastro.html", icon: "bi-plus-circle", label: "Cadastro" },
    { href: "config.html", icon: "bi-gear", label: "Config" },
    { href: "perfil.html", icon: "bi-person-circle", label: "Perfil" }
  ]

  const navLinks = links.map((link) => `
    <a
      href="${link.href}"
      class="sidebar-link${active === link.href ? " active" : ""}"
    >
      <i class="bi ${link.icon}"></i>
      ${link.label}
    </a>
  `).join("")

  const container = document.getElementById("sidebar-container")

  if (!container) return

  container.innerHTML = `
    <div class="sidebar-overlay" id="sidebarOverlay"></div>

    <aside class="sidebar" id="sidebar">
      <a href="dashboard.html" class="sidebar-brand">
        <i class="bi bi-shop me-2"></i>
        Meli Helper
      </a>

      <nav class="sidebar-nav">
        ${navLinks}
      </nav>

      <div class="sidebar-footer">
        <a
          href="http://localhost:3000/docs"
          target="_blank"
          class="sidebar-link"
        >
          <i class="bi bi-file-earmark-code"></i>
          API
        </a>

        <button
          type="button"
          class="sidebar-link logout border-0 bg-transparent text-start w-100"
          onclick="logout()"
        >
          <i class="bi bi-box-arrow-right"></i>
          Sair
        </button>
      </div>
    </aside>
  `

  const sidebar = document.getElementById("sidebar")
  const overlay = document.getElementById("sidebarOverlay")
  const toggle = document.getElementById("sidebarToggle")

  function closeSidebar() {
    sidebar?.classList.remove("open")
    overlay?.classList.remove("show")
  }

  function openSidebar() {
    sidebar?.classList.add("open")
    overlay?.classList.add("show")
  }

  toggle?.addEventListener("click", () => {
    if (sidebar?.classList.contains("open")) {
      closeSidebar()
    } else {
      openSidebar()
    }
  })

  overlay?.addEventListener("click", closeSidebar)

  sidebar?.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", closeSidebar)
  })
}

function injectMobileTopbar() {
  const main = document.querySelector(".main-content")

  if (!main || document.getElementById("sidebarToggle")) return

  const topbar = document.createElement("div")
  topbar.className = "mobile-topbar"
  topbar.innerHTML = `
    <button
      type="button"
      class="btn btn-dark"
      id="sidebarToggle"
      aria-label="Abrir menu"
    >
      <i class="bi bi-list fs-5"></i>
    </button>
    <span class="fw-bold text-dark">Meli Helper</span>
  `

  main.prepend(topbar)
}

document.addEventListener("DOMContentLoaded", () => {
  injectMobileTopbar()
  renderSidebar()
})
