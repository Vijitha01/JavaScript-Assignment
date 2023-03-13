// How do you solve this problem. How can we wait for till the function execution is completed, so that we can have correct email at line 10
function getData(uId) {
    return new Promise((resolve,reject) => {
    setTimeout(() => {
    console.log("Fetched the data!");
    resolve("skc@gmail.com");
    }, 4000);
    });
    }
    
    console.log("start");
    getData("skc").then((email) => {
    console.log("Email id of the user id is: " + email);
    console.log("end");
    });