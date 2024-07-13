let UserData = JSON.parse(localStorage.getItem('UserData')) || {};

const updateUserData = (data) => {
    UserData = data;
    localStorage.setItem('UserData', JSON.stringify(UserData));
    // using local storage allows for data to be retained, even if the page is reloaded
}

export {UserData, updateUserData};

// need to use local storage