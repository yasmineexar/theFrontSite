let Offres = (Wishes = undefined);
const cardContainer = $("#card-body");
const wishContainer = $("#wish-container");
const userid = document.querySelector("[name=userid]").content;

const postWish = (id) => {
  let xhr = new XMLHttpRequest();
  xhr.open("post", "\\offre/wish");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    console.log(xhr.response);
  };
  xhr.send(JSON.stringify({ Id_offre: id }));
};

const Postuler = (Id_offre) => {
  let xhr = new XMLHttpRequest();
  xhr.open("post", "\\postulation");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    console.log(xhr.response);
  };
  xhr.send(JSON.stringify({ Id_offre }));
};
$(document).on("click", (event) => {
  const data = $(event.target).data();
  console.log(data);
  if (data.toggle == "addwish") {
    event.target.classList.toggle("fa-heart-o");
    event.target.classList.toggle("fa-heart");
    let offre = Offres.filter((e) => e.Id_offre == data.target);
    showWishes(offre);
    postWish(data.target);
  } else if (data.toggle == "postuler") {
    if (
      confirm(
        `\nTu es sur le point d\'envoyer ta candidature à l\'entreprise qui a publié cette offre. \n \nEs-tu sur de vouloir continuer ?`
      )
    ) {
      event.target.classList.toggle("fa-pencil-square-o");
      event.target.classList.toggle("fa-download");
      Postuler(data.target);
    }
  } else if (data.toggle == "deletewish") {
    let xhr = new XMLHttpRequest();
    xhr.open("delete", "\\offre/wish/" + data.target);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      window.location.reload();
    };
    xhr.send();
  } else if (data.toggle == "deletepost") {
    let xhr = new XMLHttpRequest();
    xhr.open("delete", "/postulation");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      window.location.reload();
    };
    xhr.send(JSON.stringify({id:data.target}));
  }
});

const getOffres = () => {
  let xhr = new XMLHttpRequest();
  xhr.open("get", "\\offre?json=ture");
  xhr.responseType = "json";
  xhr.onload = () => {
    console.log(xhr.response);
    Offres = xhr.response;
    Wishes = Offres.filter((e) => e.isWish);
    showCards(Offres);
    showWishes(Wishes);
  };
  xhr.send();
};

const showCards = (o) => {
  cardContainer.append(o.map((e) => card(e)).join(""));
};

const showWishes = (o) => {
  wishContainer.append(o.map((e) => wishitem(e)).join(""));
};

const wishitem = (r) => {
  return `
    <tr class="cart-row">
        <td class="cart-item-image"><a href="\\entreprise/${
          r.id
        }"> <img width="40px" height="40px" src="/upload/logo/${
    r.Entreprise.Logo
  }" class="img-thumbnail rounded-circle navbar-brand pdp" alt="User">
        </a></td>
        <td class="cart-item-title">${r.Titre}</td>
        <td>${r.postulationstate ? r.postulationstate : "favoris"}</td>
        <td class="cart-item-icon">
          ${
            r.postulationstate
              ? `<a href="\\postulation/download/${r.Id_offre}"><i class="fa fa-download"></i></a>`
              : `<button><i class="fa fa-pencil-square-o" data-toggle="postuler" data-target="${r.Id_offre}"></i></button>`
          }
            
        </td>
        <td>
            <button><i class="fa fa-trash-o" aria-hidden="true" data-toggle="${
              r.postulationstate ? `deletepost` : `deletewish`
            }" data-target="${r.Id_offre}"></i></button>
        </td>
    </tr>`;
};

getOffres();
