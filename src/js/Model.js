const MODEL = {
  card: `
    <div class="card">
      <h3 class="card__title">{Title}</h3>
      <div class="card__poster">
        <img src="{Poster}">
      </div>
      <p class="card__year">{Year}</p>
      <p class="card__rating">
        <span class="star"></span>{Rating}
      </p>
    </div>`,
};

export default MODEL;
