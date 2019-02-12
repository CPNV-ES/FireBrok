exports.newUser = functions.auth.user().onCreate((event) => {
    const user = event.data; // The firebase user
    const id = user.uid;
    const displayName = user.displayName;

    return admin.database().ref("/users/"+id).set({
        name: displayName,
        email: user.email
    }); 
});