import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { addToFavorite, getFavIngr, getFavDrink } from './DB';
import { getCocktailById, getIngrById } from '../getCocktails';
import { renderDrinkMarkup, renderIngredientsMarkup } from '../markupTools';
import {
  getDatabase,
  ref,
  set,
  remove,
  child,
  get,
  onValue,
} from 'firebase/database';
import { save, load } from '../Vitalik/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyARB7IoC0JprBpfrU3Ehfw4t6yt6QUbzT0',
  authDomain: 'cocktails-teamproject.firebaseapp.com',
  projectId: 'cocktails-teamproject',
  storageBucket: 'cocktails-teamproject.appspot.com',
  messagingSenderId: '738965521166',
  appId: '1:738965521166:web:18b2c801811c2fb026cd5f',
  databaseURL:
    'https://cocktails-teamproject-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Database
export const database = getDatabase(app);

// Initialize Auth module
const auth = getAuth(app);

// Refs
const authBtnRef = document.querySelector('.auth-btn');
const regFormRef = document.querySelector('#registration-form');
const regBtnRef = document.querySelector('.registration-btn');
const signinBthRef = document.querySelector('.signin-btn');
const logoutBtnRef = document.querySelector('.logout-btn');
const regFormTitleRef = document.querySelector('.reg-form-title');
const cocktailsListRef = document.querySelector('.cocktails__list');
const searchFailRef = document.querySelector('.not-found');
const cocktailsTitleRef = document.querySelector('.cocktails__title');

// Registry buttons logic
regBtnRef.addEventListener('click', onRegClick);
signinBthRef.addEventListener('click', onSignInClick);
logoutBtnRef.addEventListener('click', onLogOutClick);

function onRegClick(e) {
  e.preventDefault();

  const email = regFormRef.elements.email.value;
  const password = regFormRef.elements.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      console.log(userCredential);
      console.log('registration successful');
      const user = userCredential.user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
}

function onSignInClick(e) {
  e.preventDefault();
  const email = regFormRef.elements.email.value;
  const password = regFormRef.elements.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      console.log('success sign in');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

function onLogOutClick(e) {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('sign out successful');
    })
    .catch(error => {
      // An error happened.
    });
}

let uid = '';
onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    console.log('sign changed', uid);
    onSignIn();
  } else {
    // User is signed out
    console.log('signed out');
    onSignOut();
    uid = '';
  }
});

function onSignOut() {
  regFormTitleRef.textContent = 'Success! ✔';
  regFormTitleRef.classList.add('success-auth');
  document.querySelector('.reg-form').style.display = 'none';
  setTimeout(() => {
    document.querySelector('.back-drop-reg').classList.add('is-hide');
    regFormTitleRef.textContent = 'Please log in or create new account';
    regFormTitleRef.classList.remove('success-auth');
    document.querySelector('.reg-form').style.display = 'block';
  }, 1000);
}

function onSignIn() {
  regFormTitleRef.textContent = `Success! ✔`;
  regFormTitleRef.classList.add('success-auth');
  document.querySelector('.reg-form').style.display = 'none';
  setTimeout(() => {
    document.querySelector('.back-drop-reg').classList.add('is-hide');
    regFormTitleRef.textContent = 'Please log in or create new account';
    regFormTitleRef.classList.remove('success-auth');
    document.querySelector('.reg-form').style.display = 'block';
  }, 1000);
}

//Add, remove, render favorites
const cocktailsRef = document.querySelector('.cocktails.section');
const linkFavDrinkRef = document.querySelector('.js-fav-cocktail');
const linkFavIngrRef = document.querySelector('.js-fav-ingr');
const modalIngrRef = document.querySelector('.modal__ingredients');

cocktailsRef.addEventListener('click', onAddDrinkClick);
modalIngrRef.addEventListener('click', onAddIngrClick);
cocktailsListRef.addEventListener('click', onAddIngrClick);

function onAddDrinkClick(e) {
  if (e.target.classList.contains('btn-add') && uid) {
    // const drinkID = event.target.parentNode.previousElementSibling.dataset.id;
    // addToFavorite(drinkID, uid);
    //new

    synchronizeFavDrinks(uid);
  }
}

function onAddIngrClick(e) {
  if (e.target.classList.contains('btn-add-fav') && uid) {
    synchronizeFavIngr(uid);
  }
}

// On page change

linkFavDrinkRef.addEventListener('click', e => {
  e.preventDefault();

  getFavDrink(uid)
    .then(async drinkIdArr => {
      let arrayToRender = [];

      const arrayOfPromises = drinkIdArr[0].map(async drinkId => {
        return await getCocktailById(drinkId);
      });

      const drinks = await Promise.all(arrayOfPromises);

      drinks.map(({ drinks }) => {
        arrayToRender.push(drinks[0]);
      });
      console.log(arrayToRender);
      document.querySelector('.hero').style.display = 'none';
      cocktailsTitleRef.innerHTML = 'Favorite cocktails';
      cocktailsListRef.innerHTML = renderDrinkMarkup(arrayToRender);
      const allAddBtn = document.querySelectorAll('.btn-add');

      allAddBtn.forEach(addbtn => {
        addbtn.textContent = 'Remove';
      });
    })
    .catch(res => {
      console.log(res);
      cocktailsListRef.innerHTML = '';
      searchFailRef.classList.remove('is-hidden');
      cocktailsTitleRef.classList.add('is-hidden');
    });
});

linkFavIngrRef.addEventListener('click', e => {
  e.preventDefault();

  getFavIngr(uid)
    .then(async ingrIdArr => {
      let arrayToRender = [];

      const arrayOfPromises = ingrIdArr[0].map(async ingrId => {
        return await getIngrById(ingrId);
      });

      const ingridients = await Promise.all(arrayOfPromises);

      ingridients.map(({ ingredients }) => {
        arrayToRender.push(ingredients[0]);
      });

      document.querySelector('.hero').style.display = 'none';
      cocktailsTitleRef.innerHTML = 'Favorite ingredients';
      cocktailsListRef.innerHTML = renderIngredientsMarkup(arrayToRender);
      const allAddBtn = document.querySelectorAll('.btn-add-fav');

      allAddBtn.forEach(addbtn => {
        addbtn.textContent = 'Remove';
      });
    })
    .catch(res => {
      console.log(res);
      cocktailsListRef.innerHTML = '';
      searchFailRef.classList.remove('is-hidden');
      cocktailsTitleRef.classList.add('is-hidden');
    });
});

authBtnRef.addEventListener('click', onAuthBtnClick);

function onAuthBtnClick() {
  document.querySelector('.back-drop-reg').classList.remove('is-hide');
}

document.querySelector('.reg-close-btn').addEventListener('click', () => {
  document.querySelector('.back-drop-reg').classList.add('is-hide');
});

//DataBase methods

function synchronizeFavDrinks(uid) {
  set(ref(database, 'favorite/' + uid), {
    savedDrinks: load('cocktails'),
  });
}

// function getFavDrinks(uid) {
//   const db = ref(database, 'favorite/' + uid);
//   return onValue(db, snapshot => {
//     console.log(snapshot.val());
//   });
// }

function synchronizeFavIngr(uid) {
  set(ref(database, 'favoriteIngr/' + uid), {
    savedIngr: load('ingridients'),
  });
}
