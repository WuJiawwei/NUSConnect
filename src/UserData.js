let UserData = JSON.parse(localStorage.getItem('UserData')) || {};

const updateUserData = (data) => {
    UserData = data;
    localStorage.setItem('UserData', JSON.stringify(UserData));
}

const updateFieldInUserData = (dataToUpdate) => {
    const updatedUserData = {
        ...UserData,
        ...dataToUpdate
    };
    updateUserData(updatedUserData);
}

const removeDataFromBrowser = () => {
    UserData = {};
    localStorage.setItem('UserData', JSON.stringify(UserData));
}

export { UserData, updateUserData, removeDataFromBrowser, updateFieldInUserData };