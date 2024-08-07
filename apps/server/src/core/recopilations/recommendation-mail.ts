export function constructRecommendationMail(
  recopilationName: string,
  recopilationStartDate: Date,
  categoriesList: string[]
) {
  return `
  <main style="height: 100%; padding: 0 40px; display: flex; flex-direction: column; color: #323232; font-family: 'Arial';">
    <div style="padding: 15px 0px; color: #323232; font-family: 'Arial';">
      <h1 style="color: #323232; font-weight: 500; font-family: 'Arial';">
        Green Summary
      </h1>
    </div>

    <div style="background-color: #00ad7c; height: 3.5px; display: block; color: #323232; font-family: 'Arial';"></div>

    <h1 style="color: #323232; font-size: 25px; text-align: center; margin-top: 55px; font-family: 'Arial';">
      Se te ha invitado a que aportes información para la recopilación titulada <i>${recopilationName}</i>:
    </h1>

    <p style="display: block; font-size: 17px; margin-top: 30px; margin-right: 40px; margin-left: 40px; color: #323232; font-family: 'Arial';">
      Esta recopilación estará disponible a partir del ${new Intl.DateTimeFormat('es-US', { dateStyle: 'full' }).format(recopilationStartDate)}, desde ese momento podrás subir tu información a la plataforma. <br/>
      Las siguientes categorías están recomendadas para ser respondidas por usted:
    </p>

    <section style="width: fit-content; margin: auto; margin-top: 60px; display: flex; flex-direction: column; gap: 30px; border: 2px solid whitesmoke; padding: 2% 6% 0% 3%; border-radius: 10px; color: #323232; font-family: 'Arial';">
      <ul style="font-size: 20px; color: #323232; font-family: 'Arial';">
        ${categoriesList.map(
          (c) =>
            `<li style="color: #323232; font-family: 'Arial'; margin-bottom: 25px;">
                  ${c}
              </li>`
        )}    
      
      </ul>
    </section>
  </main>`
}
