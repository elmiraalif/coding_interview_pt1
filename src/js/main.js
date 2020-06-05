// fetch the data using fetch api in js
fetch("http://sandbox.bittsdevelopment.com/code1/fetchemployees.php#")
  // get the json format
  .then((response) => response.json())
  //   convert json to a javascript object
  .then((data) => {
    dataLength = Object.keys(data).length;
    getEmployees(data, dataLength);
  })
  .catch((err) => console.log(err));

// the function to create the interface
function getEmployees(employees, numberOfEmployees) {
  // grab the #wrapper from the html
  let wrapper = document.querySelector("#wrapper");

  for (var i = 1; i <= numberOfEmployees; i++) {
    // fetch the information from the API
    // create an object for each employee to get access to the details
    let employee = {
      employeeId: employees[i].employeeid,
      firstName: employees[i].employeefname,
      lastName: employees[i].employeelname,
      employeeBio: employees[i].employeebio,
      employeeRoles: employees[i].roles,
      isFeatured: employees[i].employeeisfeatured,
    };

    // DOM MANIPULATION
    //  1. create a div with the class of "box"
    let box = document.createElement("div");
    box.className = "box";
    // append the box to the wrapper
    wrapper.appendChild(box);

    // 2. create a div with the class portrait (child of box)
    let portrait = document.createElement("div");
    portrait.className = "portrait";
    box.appendChild(portrait);

    // 3. the image inside the portrait
    let image = document.createElement("img");
    let imageUrl = `http://sandbox.bittsdevelopment.com/code1/employeepics/${i}.jpg`;
    // set the src & alt attributes of the image
    image.setAttribute("src", imageUrl);
    image.setAttribute("alt", `The portrait of ${employee.firstName}`);
    // console.log(imageUrl);
    portrait.appendChild(image);

    // 4. Create an h2 for the employee names (child of the box)
    let fullName = document.createElement("h2");
    fullName.textContent = employee.firstName + " " + employee.lastName;
    box.appendChild(fullName);

    // 5. create an h3 for the bio (child of the box)
    let bio = document.createElement("h3");
    // how much of the text to be displayed on the card
    //if the characters are more than 50, refer to the employee page using a link
    if (employee.employeeBio.length > 50) {
      bio.innerHTML = employee.employeeBio.substring(0, 50) + ` <a href="/${employee.employeeId}">READ MORE ...</a>`;
    } else {
      bio.innerHTML = employee.employeeBio;
    }
    box.appendChild(bio);

    // 6. create a roles div (child of the box)
    let roles = document.createElement("div");
    roles.className = "roles";
    box.appendChild(roles);

    // here we need as many as roles that each employee has
    // looping through the object of employee roles
    Object.keys(employee.employeeRoles).forEach(function (role) {
      // create role cells inside the roles div (child of roles)
      let roleCell = document.createElement("div");
      roleCell.className = "role-cell";
      roles.appendChild(roleCell);

      // console.log(role); // key
      // console.log(employeeRoles[role].rolename); // value
      // get the role names and set them as the text with a class of role-cell
      let roleName = employee.employeeRoles[role].rolename;
      roleCell.innerHTML = roleName;
      roleCell.className = "role-cell";

      // set the styling condition (background colors for the corresponding roles)
      roleCell.style.background = employee.employeeRoles[role].rolecolor;
    });

    // 7. create the crown for featured employees
    console.log(employee.isFeatured);
    // set conditions for featured employees
    if (employee.isFeatured === "1") {
      // create an "is-featured" div (child of the box)
      let isFeatured = document.createElement("div");
      isFeatured.className = "is-featured";
      box.appendChild(isFeatured);

      //the image of the crown (child of isFeatured)
      let crown = document.createElement("img");
      crown.setAttribute("src", "src/images/crown.png");
      isFeatured.appendChild(crown);
      // console.log(isFeatured);
    }

    //
    // console.log(box);
  }
}

/* This is how the dom tree should look like:
      <div class="box">
        <div class="portrait">
          <img class="portrait-img" src="" alt="" />
        </div>
        <h2></h2>
        <h3></h3>
        <div class="roles">
          <div class="role-cell"></div>
        </div>
        <div class="is-featured">
          <img src="">
        </div>
      </div> 
*/
