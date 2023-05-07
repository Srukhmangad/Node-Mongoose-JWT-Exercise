const bcrypt = require("bcrypt");


async function encryption() {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    let password = "1234";
    password = await bcrypt.hash(password, salt);
    console.log(password);

    const compare = await bcrypt.compare("1234",password)
    console.log(compare)
    //password is going to get stored in my database
  }