export function constructLoginDataMail(email: string, password: string) {
  return `
  <!doctype html>
<html ⚡4email lang="en" data-css-strict>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <style amp-custom>
    * {
      color: #323232;
      font-family: 'Arial';
    }

    .container {
      height: 100%;
      padding: 0 40px;
      display: flex;
      flex-direction: column;
    }
    
    .logo-container {
      padding: 15px 0px;
    }

    .brand-name {
      color: #323232;
      font-weight: 500;
    }

    .divider {
      background-color: #00ad7c;
      height: 3.5px; 
      display: block;
    }

    .title {
      color: #323232;
      font-size: 25px;
      text-align: center;
      margin-top: 55px;
    }

    .paragraph {
      display: block;
      font-size: 17px;
      margin-top: 30px;
      margin-right: 40px;
      margin-left: 40px;
    }

    .login-data-container {
      width: fit-content;
      margin: auto;
      margin-top: 60px;   
      display: flex;
      flex-direction: column;
      gap: 30px;
      border: 2px solid whitesmoke;
      padding: 4% 5%;
      border-radius: 10px
    }  

    .data-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  </style>
</head>
<body>
  <main class="container">
    <div class="logo-container">
      <h1 class="brand-name">
        Green Summary
      </h1>
    </div>

    <div class="divider" />

    <h1 class="title">
      Tus datos para iniciar sesión
    </h1>

    <p class="paragraph">
      A continuación se presentan tus datos que puedes utilizar para iniciar sesión en la plataforma <i>Green Summary</i>.
    </p>

    <section class="login-data-container">
      <div class="data-container">
        <b>Correo electrónico</b>
        <i>${email}</i>
      </div>

      <div class="data-container">
        <b>Contraseña</b>
        <i>${password}</i>
      </div>
    </section>
  </main>
</body>
</html>
  `
}
