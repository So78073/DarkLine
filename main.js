document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const registerLink = document.getElementById("register-link");
  const loginLink = document.getElementById("login-link");

  const loginAPI = "https://gastwave.vercel.app/login";
  const registerAPI = "https://gastwave.vercel.app/register";

  async function submitToAPI(url, data, isRegister = false) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Resposta da API:", result);

      if (response.ok) {
        if (isRegister) {
          // Mostra mensagem de sucesso e redireciona para login
          alert("Registro realizado com sucesso! Redirecionando para login...");
          switchToLoginForm();
        } else {
          alert("Login realizado com sucesso!");
        }
      } else {
        alert(`Erro: ${result.message || "Algo deu errado"}`);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao conectar com a API.");
    }
  }

  function handleFormSubmit(event, apiURL, isRegister = false) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Dados enviados:", data);
    submitToAPI(apiURL, data, isRegister);
  }

  function switchToLoginForm() {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  }

  function switchToRegisterForm() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  }

  loginForm.addEventListener("submit", (event) => {
    handleFormSubmit(event, loginAPI);
  });

  registerForm.addEventListener("submit", (event) => {
    handleFormSubmit(event, registerAPI, true); // Passa "true" para indicar que é um registro
  });

  registerLink.addEventListener("click", (e) => {
    e.preventDefault();
    switchToRegisterForm();
  });

  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    switchToLoginForm();
  });
});
