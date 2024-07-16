let UserData = JSON.parse(localStorage.getItem('UserData')) || {};

const updateUserData = (data) => {
    UserData = data;
    localStorage.setItem('UserData', JSON.stringify(UserData));
    // using local storage allows for data to be retained, even if the page is reloaded
}

const updateFieldInUserData = (dataToUpdate) => {
    const updatedUserData = {
        ...UserData,
        ...dataToUpdate
    };
    updateUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
}

const removeDataFromBrowser = () => {
    UserData = {}
    localStorage.setItem('UserData', JSON.stringify(UserData));
}

export {UserData, updateUserData, removeDataFromBrowser, updateFieldInUserData};